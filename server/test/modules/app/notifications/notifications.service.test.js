import { jest } from "@jest/globals";

// Notificaciones (DEC-072): siempre del usuario de la sesión; la campana, de
// la obra elegida más las de ninguna obra. Un aviso con clave se da una vez:
// el repetido no se crea ni se registra como error.

const prismaMock = {
  tbl_notifications: {
    count: jest.fn(async () => 0),
    findMany: jest.fn(async () => []),
    updateMany: jest.fn(),
    create: jest.fn(async ({ data }) => ({ not_id: 1, ...data })),
  },
};
const emit = jest.fn();

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));
jest.unstable_mockModule("../../../../src/common/configs/socket.manager.js", () => ({ getIO: () => ({ to: () => ({ emit }) }) }));
jest.unstable_mockModule("../../../../src/common/utils/pagination.utils.js", () => ({
  paginate: jest.fn(async (model, args) => {
    await model.findMany(args);
    return { results: [], total: 0, page: 1, limit: 10, totalPages: 0 };
  }),
}));

const { getNotificationCount, insertNotification, listNotifications, markAllAsRead } = await import(
  "../../../../src/modules/app/notifications/notifications.service.js"
);

beforeEach(() => jest.clearAllMocks());

describe("alcance por obra", () => {
  it("con una obra: las de esa obra y las de ninguna", async () => {
    await getNotificationCount({ userId: 2, scope: { all: false, wrkId: 8 } });
    expect(prismaMock.tbl_notifications.count).toHaveBeenCalledWith({
      where: { use_id: 2, OR: [{ wrk_id: 8 }, { wrk_id: null }], not_is_read: false },
    });
  });

  it("con Ver todo: todas las del usuario", async () => {
    await listNotifications({ userId: 2, scope: { all: true, wrkId: null } });
    expect(prismaMock.tbl_notifications.findMany.mock.calls[0][0].where).toEqual({ use_id: 2 });
  });

  it("sin obra válida: solo las de ninguna obra", async () => {
    await markAllAsRead({ userId: 2, scope: { all: false, wrkId: null } });
    expect(prismaMock.tbl_notifications.updateMany.mock.calls[0][0].where).toEqual({ use_id: 2, wrk_id: null, not_is_read: false });
  });
});

describe("insertNotification", () => {
  it("guarda la obra y la clave, y avisa por socket", async () => {
    const created = await insertNotification({ userId: 2, title: "T", message: "M", wrkId: 4, key: "CONTRACT_EXPIRING:30:2026-11-01" });
    expect(prismaMock.tbl_notifications.create.mock.calls[0][0].data).toMatchObject({ use_id: 2, wrk_id: 4, not_key: "CONTRACT_EXPIRING:30:2026-11-01" });
    expect(created).toMatchObject({ not_id: 1 });
    expect(emit).toHaveBeenCalledWith("newNotification", created);
  });

  it("sin obra ni clave quedan en null, como las de siempre", async () => {
    await insertNotification({ userId: 2, title: "T", message: "M" });
    expect(prismaMock.tbl_notifications.create.mock.calls[0][0].data).toMatchObject({ wrk_id: null, not_key: null });
  });

  it("un aviso con clave repetida devuelve null sin registrar error", async () => {
    const error = jest.spyOn(console, "error").mockImplementation(() => {});
    prismaMock.tbl_notifications.create.mockRejectedValueOnce(Object.assign(new Error("dup"), { code: "P2002" }));
    await expect(insertNotification({ userId: 2, title: "T", key: "K" })).resolves.toBeNull();
    expect(error).not.toHaveBeenCalled();
    expect(emit).not.toHaveBeenCalled();
    error.mockRestore();
  });
});

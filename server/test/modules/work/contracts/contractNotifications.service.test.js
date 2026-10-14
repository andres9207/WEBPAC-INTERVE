import { jest } from "@jest/globals";

// Notificación de un acto del contrato a los responsables de su obra
// (ADR-0027, catálogo de operaciones críticas). Corre después del COMMIT y
// sin garantía de entrega: si falla, el acto ya está hecho y nunca lanza.

const state = { contract: null, managers: [] };
const prismaMock = {
  tbl_contracts: { findUnique: jest.fn(async () => state.contract) },
  tbl_work_managers: { findMany: jest.fn(async () => state.managers) },
};
const insertNotification = jest.fn(async ({ userId }) => ({ not_id: userId }));
const logger = { info: jest.fn(), warn: jest.fn(), error: jest.fn() };

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));
jest.unstable_mockModule("../../../../src/common/configs/winston.config.js", () => ({ default: logger }));
jest.unstable_mockModule("../../../../src/modules/app/notifications/notifications.service.js", () => ({ insertNotification }));

const { notifyWorkManagers, contractLabel } = await import("../../../../src/modules/work/contracts/contractNotifications.service.js");

const CONTRACT = { ctr_id: 30, ctr_number: "C-30", ctr_name: "Estructura", wrk_id: 4, tbl_works: { wrk_code: "OB-4", wrk_name: "Torre" } };
const notify = () =>
  notifyWorkManagers({
    ctrId: 30,
    actorId: 9,
    title: "Contrato suspendido",
    action: "suspend",
    type: "warning",
    data: { ccpId: 310 },
    buildMessage: (c) => `El contrato ${contractLabel(c)} fue suspendido.`,
  });

beforeEach(() => {
  jest.clearAllMocks();
  state.contract = CONTRACT;
  state.managers = [{ use_id: 2 }, { use_id: 5 }];
});

describe("notifyWorkManagers", () => {
  it("notifica a cada responsable activo de la obra, con usuario activo, salvo al autor", async () => {
    await expect(notify()).resolves.toBe(2);

    expect(prismaMock.tbl_work_managers.findMany.mock.calls[0][0].where).toEqual({
      wrk_id: 4,
      sta_id: 1,
      use_id: { not: 9 },
      tbl_users: { sta_id: 1 },
    });
    expect(insertNotification.mock.calls.map(([n]) => n.userId)).toEqual([2, 5]);
    expect(insertNotification.mock.calls[0][0]).toEqual({
      userId: 2,
      title: "Contrato suspendido",
      message: "El contrato C-30 (obra OB-4) fue suspendido.",
      type: "warning",
      module: "contracts",
      action: "suspend",
      data: { ctrId: 30, wrkId: 4, ccpId: 310 },
    });
  });

  it("sin responsables no notifica a nadie", async () => {
    state.managers = [];
    await expect(notify()).resolves.toBe(0);
    expect(insertNotification).not.toHaveBeenCalled();
  });

  it("si la BD falla, lo deja en el log y no lanza: el acto ya está confirmado", async () => {
    prismaMock.tbl_work_managers.findMany.mockRejectedValueOnce(new Error("conexión perdida"));
    await expect(notify()).resolves.toBe(0);
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('No se pudo notificar "suspend" del contrato 30: conexión perdida'));
  });

  it("cuenta solo las notificaciones que se guardaron", async () => {
    insertNotification.mockResolvedValueOnce(null);
    await expect(notify()).resolves.toBe(1);
  });
});

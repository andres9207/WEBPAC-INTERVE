import { jest } from "@jest/globals";

// Regresión directa del fix de IDOR: get_basic_information / update_account /
// update_password deben tomar el sujeto de req.user (JWT verificado), nunca
// de req.query/req.body. Si alguien vuelve a leer useId de la petición, estos
// tests fallan de inmediato.

const mockGetBasicInformation = jest.fn();
const mockUpdateAccount = jest.fn();
const mockUpdatePassword = jest.fn();

jest.unstable_mockModule("./auth.service.js", () => ({
  getBasicInformation: mockGetBasicInformation,
  updateAccount: mockUpdateAccount,
  updatePassword: mockUpdatePassword,
}));

const {
  getSettlementController,
  updateAccountController,
  updatePasswordController,
} = await import("./auth.controller.js");

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("auth.controller — el sujeto siempre sale de req.user", () => {
  it("getSettlementController usa req.user.useId, ignora useId del query string", async () => {
    mockGetBasicInformation.mockResolvedValue({ name: "Real" });
    const req = { user: { useId: 1 }, query: { useId: 999 } };
    const res = buildRes();

    await getSettlementController(req, res, jest.fn());

    expect(mockGetBasicInformation).toHaveBeenCalledWith({ useId: 1 });
  });

  it("updateAccountController usa req.user.useId, ignora useId del body", async () => {
    mockUpdateAccount.mockResolvedValue();
    const req = {
      user: { useId: 1 },
      body: { name: "a", lastName: "b", username: "c", email: "d@d.com", useId: 999 },
    };
    const res = buildRes();

    await updateAccountController(req, res, jest.fn());

    expect(mockUpdateAccount).toHaveBeenCalledWith({
      name: "a",
      lastName: "b",
      username: "c",
      email: "d@d.com",
      useId: 1,
    });
  });

  it("updatePasswordController usa req.user.useId, ignora useId del body", async () => {
    mockUpdatePassword.mockResolvedValue();
    const req = {
      user: { useId: 1 },
      body: { currentPassword: "x", newPassword: "y", useId: 999 },
    };
    const res = buildRes();

    await updatePasswordController(req, res, jest.fn());

    expect(mockUpdatePassword).toHaveBeenCalledWith({
      currentPassword: "x",
      newPassword: "y",
      useId: 1,
    });
  });

  it("delega al next(err) si el service lanza, sin responder el error directamente", async () => {
    const error = new Error("boom");
    mockUpdateAccount.mockRejectedValue(error);
    const req = { user: { useId: 1 }, body: { name: "a", lastName: "b", username: "c", email: "d@d.com" } };
    const res = buildRes();
    const next = jest.fn();

    await updateAccountController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
  });
});

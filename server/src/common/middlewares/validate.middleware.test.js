import { jest } from "@jest/globals";

const mockValidationResult = jest.fn();

jest.unstable_mockModule("express-validator", () => ({
  validationResult: mockValidationResult,
}));

const { validate } = await import("./validate.middleware.js");

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("validate middleware", () => {
  it("llama a next() cuando no hay errores de validación", () => {
    mockValidationResult.mockReturnValue({ isEmpty: () => true, array: () => [] });
    const res = buildRes();
    const next = jest.fn();

    validate({}, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it("responde 400 con los errores mapeados cuando la validación falla", () => {
    mockValidationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => [{ path: "email", msg: "El correo no es válido." }],
    });
    const res = buildRes();
    const next = jest.fn();

    validate({}, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Datos inválidos.",
      errors: [{ field: "email", message: "El correo no es válido." }],
    });
  });
});

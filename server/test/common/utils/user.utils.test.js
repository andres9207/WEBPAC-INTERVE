const { userFullName } = await import("../../../src/common/utils/user.utils.js");

describe("userFullName", () => {
  it("une nombre y apellido", () => {
    expect(userFullName({ use_name: "Juan Pablo", use_last_name: "Ospina" })).toBe("Juan Pablo Ospina");
  });

  it("tolera apellido vacío o nulo", () => {
    expect(userFullName({ use_name: "Ana", use_last_name: null })).toBe("Ana");
  });

  it("sin autor (NULL) o sin nombre devuelve null, para que el cliente muestre su propio texto", () => {
    expect(userFullName(null)).toBeNull();
    expect(userFullName({ use_name: "", use_last_name: null })).toBeNull();
  });
});

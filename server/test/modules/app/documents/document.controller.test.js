import { jest } from "@jest/globals";

// El autor de la auditoría de documentos sale del JWT (req.user), nunca del
// body: antes docCreateBy/docUpdateBy/usuAct llegaban del cliente.

const mockSave = jest.fn();
const mockDelete = jest.fn();

jest.unstable_mockModule("../../../../src/modules/app/documents/document.service.js", () => ({
  paginationModuleDocs: jest.fn(),
  saveModuleDoc: mockSave,
  deleteModuleDoc: mockDelete,
}));

const { saveModuleDoc, deleteModuleDoc } = await import(
  "../../../../src/modules/app/documents/document.controller.js"
);

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("document.controller — autor desde req.user", () => {
  it("saveModuleDoc ignora docCreateBy/docUpdateBy del body", async () => {
    mockSave.mockResolvedValue({ id: 1 });
    const req = { user: { useId: 7 }, body: { nombre: "a.pdf", docCreateBy: 999, docUpdateBy: 999 } };

    await saveModuleDoc(req, buildRes(), jest.fn());

    expect(mockSave).toHaveBeenCalledWith(expect.objectContaining({ docCreateBy: 7, docUpdateBy: 7 }));
  });

  it("deleteModuleDoc ignora usuAct del body", async () => {
    mockDelete.mockResolvedValue({});
    const req = { user: { useId: 7 }, body: { id: 3, usuAct: 999 } };

    await deleteModuleDoc(req, buildRes(), jest.fn());

    expect(mockDelete).toHaveBeenCalledWith({ id: 3, usuAct: 7 });
  });
});

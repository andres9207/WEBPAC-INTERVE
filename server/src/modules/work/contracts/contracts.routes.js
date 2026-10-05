import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import {
  paginationContractsSchema,
  getContractSchema,
  selectContractWorksSchema,
  getContractFormOptionsSchema,
  getContractFieldsSchema,
  saveContractSchema,
  deleteContractSchema,
  createAmendmentSchema,
  createLiquidationSchema,
  updateConceptSchema,
  suspendContractSchema,
} from "./contracts.validation.js";
import {
  paginationContractsController,
  getContractController,
  selectContractWorksController,
  getContractFormOptionsController,
  getContractFieldsController,
  saveContractController,
  deleteContractController,
  createAmendmentController,
  createLiquidationController,
  updateConceptController,
  suspendContractController,
} from "./contracts.controller.js";

// Contratos (DEC-035), montados en /api/work/contracts. Pipeline de
// ENDPOINT_STANDARD: verifyToken → requirePermission → esquema → validate →
// controller. Cada acto sobre los conceptos tiene su endpoint y su permiso
// (ADR-0016, "Seguridad"): el tipo de concepto nunca llega como parámetro.
const can = PERMISSIONS.work.contracts;
const contractsRoutes = express.Router();

contractsRoutes.post("/pagination_contracts", verifyToken, requirePermission(can.view), paginationContractsSchema, validate, paginationContractsController);
contractsRoutes.get("/get_contract", verifyToken, requirePermission(can.view), getContractSchema, validate, getContractController);
// Obras activas, y etapas y proveedores de una obra, para el formulario.
contractsRoutes.get("/select_contract_works", verifyToken, requirePermission(can.view), selectContractWorksSchema, validate, selectContractWorksController);
contractsRoutes.get(
  "/get_contract_form_options",
  verifyToken,
  requirePermission(can.view),
  getContractFormOptionsSchema,
  validate,
  getContractFormOptionsController
);
// Descriptores de los campos configurables de un tipo (ADR-0006, decisión 5),
// para el formulario de contrato y el de otrosí.
contractsRoutes.get("/get_contract_fields", verifyToken, requirePermission(can.view), getContractFieldsSchema, validate, getContractFieldsController);
// save_contract sirve crear (ctrId 0, con el valor inicial) y editar la cabecera.
contractsRoutes.post(
  "/save_contract",
  verifyToken,
  requirePermission((req) => (Number(req.body.ctrId) > 0 ? can.edit : can.create)),
  saveContractSchema,
  validate,
  saveContractController
);
contractsRoutes.put("/delete_contract", verifyToken, requirePermission(can.delete), deleteContractSchema, validate, deleteContractController);
contractsRoutes.post("/create_amendment", verifyToken, requirePermission(can.createAmendment), createAmendmentSchema, validate, createAmendmentController);
contractsRoutes.post(
  "/create_liquidation",
  verifyToken,
  requirePermission(can.createLiquidation),
  createLiquidationSchema,
  validate,
  createLiquidationController
);
contractsRoutes.put("/update_concept", verifyToken, requirePermission(can.editConcept), updateConceptSchema, validate, updateConceptController);
// Suspender (ADR-0017, DEC-039). No hay ruta de levantar: lo hace
// create_amendment sobre un contrato suspendido, con el permiso liftSuspension.
contractsRoutes.post("/suspend_contract", verifyToken, requirePermission(can.suspend), suspendContractSchema, validate, suspendContractController);

export default contractsRoutes;

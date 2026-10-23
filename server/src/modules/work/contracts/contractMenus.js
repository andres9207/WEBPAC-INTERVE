import { prisma } from "../../../common/configs/prismaClient.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { INVOICE_MODES } from "../../billing/invoices/invoiceMenus.js";

/**
 * Menús de contratos (DEC-077): uno por tipo de proveedor, como los de
 * facturas (DEC-074), sin lista fija en el código.
 *
 * Un tipo aparece como entrada propia en el menú "Contratos" con su casilla
 * (`pvt_contract_menu`), que exige que facture con contrato: solo esos
 * admiten contratos. El listado de un menú muestra los contratos firmados bajo
 * el tipo (`tbl_contracts.pvt_id`). "Todos" sigue siendo el listado general.
 * Desmarcar la casilla solo oculta la entrada. Ver contratos es un solo
 * permiso (`work.contracts.view`): quien lo tiene ve todos los menús.
 */

const MENU_SELECT = Object.freeze({ pvt_id: true, pvt_name: true, pvt_contract_menu: true, sta_id: true });

const toMenuDto = (row) => ({
  pvtId: row.pvt_id,
  name: row.pvt_name,
  menu: Boolean(row.pvt_contract_menu),
});

/** Entradas del menú "Contratos": tipos activos con la casilla, por nombre. */
export const listContractMenus = async () => {
  const rows = await prisma.tbl_provider_types.findMany({
    where: { sta_id: ACTIVE_STATUS, pvt_contract_menu: true },
    select: MENU_SELECT,
    orderBy: { pvt_name: "asc" },
  });
  return rows.map(toMenuDto);
};

/**
 * Un menú por su tipo, también oculto o inactivo: sus contratos siguen
 * existiendo. 404 si el tipo no existe, está eliminado o no admite contratos.
 */
export const getContractMenu = async ({ pvtId }) => {
  const row = await prisma.tbl_provider_types.findFirst({
    where: { pvt_id: Number(pvtId), sta_id: { not: DELETED_STATUS }, pvt_invoice_mode: INVOICE_MODES.CONTRACT },
    select: MENU_SELECT,
  });
  if (!row) throw Object.assign(new Error("No se encontró el menú de contratos."), { statusCode: 404 });
  return toMenuDto(row);
};

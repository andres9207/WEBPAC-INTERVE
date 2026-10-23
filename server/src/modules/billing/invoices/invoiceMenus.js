import { prisma } from "../../../common/configs/prismaClient.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";

/**
 * Menús de facturas (DEC-074): uno por tipo de proveedor, sin lista fija en
 * el código.
 *
 * Cada tipo de proveedor declara su forma de facturar (`pvt_invoice_mode`):
 *
 *   SIMPLE     la factura simple: sin contrato, imputada a una etapa de la obra
 *   CONTRACT   anticipo, normal, liquidación y devolución de retenido contra un
 *              contrato firmado bajo el tipo
 *   (null)     el tipo no factura
 *
 * y si aparece como entrada propia en el menú "Facturas" (`pvt_invoice_menu`,
 * que exige forma). Desmarcarla solo oculta la entrada: las facturas siguen en
 * los expedientes y en su dirección.
 *
 * La factura guarda el tipo de su menú (`tbl_invoices.pvt_id`): el de su
 * contrato, o el tipo simple de la asignación del proveedor desde cuyo menú se
 * registra. Las FK compuestas impiden que contradiga al contrato o a la
 * asignación. Ver facturas es un solo permiso (`billing.invoices.view`): quien
 * lo tiene ve todos los menús.
 */

export const INVOICE_MODES = Object.freeze({ SIMPLE: "SIMPLE", CONTRACT: "CONTRACT" });

export const isContractMode = (mode) => mode === INVOICE_MODES.CONTRACT;
export const isSimpleMode = (mode) => mode === INVOICE_MODES.SIMPLE;

/** Tipo de una asignación (`tbl_work_provider_types`) con forma de facturar simple. */
export const SIMPLE_TYPE_WHERE = Object.freeze({ tbl_provider_types: { pvt_invoice_mode: INVOICE_MODES.SIMPLE } });

const MENU_SELECT = Object.freeze({ pvt_id: true, pvt_name: true, pvt_invoice_mode: true, pvt_invoice_menu: true, sta_id: true });

const toMenuDto = (row) => ({
  pvtId: row.pvt_id,
  name: row.pvt_name,
  mode: row.pvt_invoice_mode,
  menu: Boolean(row.pvt_invoice_menu),
});

/** Entradas del menú "Facturas": tipos activos con la casilla, por nombre. */
export const listInvoiceMenus = async () => {
  const rows = await prisma.tbl_provider_types.findMany({
    where: { sta_id: ACTIVE_STATUS, pvt_invoice_menu: true },
    select: MENU_SELECT,
    orderBy: { pvt_name: "asc" },
  });
  return rows.map(toMenuDto);
};

/**
 * Un menú por su tipo, también oculto o inactivo: sus facturas siguen
 * existiendo. 404 si el tipo no existe, está eliminado o no factura.
 */
export const getInvoiceMenu = async ({ pvtId }) => {
  const row = await prisma.tbl_provider_types.findFirst({
    where: { pvt_id: Number(pvtId), sta_id: { not: DELETED_STATUS }, pvt_invoice_mode: { not: null } },
    select: MENU_SELECT,
  });
  if (!row) throw Object.assign(new Error("No se encontró el menú de facturas."), { statusCode: 404 });
  return toMenuDto(row);
};

import { prisma } from "../../../common/configs/prismaClient.js";
import { getEffectivePermissionIds, hasEffectivePermission } from "../../../common/services/effectivePermissions.service.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { listInvoiceMenus } from "../../billing/invoices/invoiceMenus.js";
import { userFullName } from "../../../common/utils/user.utils.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";

const PAGE_SELECT = {
  pag_id: true,
  pag_description: true,
  pag_parent: true,
  pag_url: true,
  pag_icon: true,
  pag_order: true,
  pag_name: true,
  pag_type: true,
};

const toParent = (p) => ({
  id: p.pag_id,
  pag_description: p.pag_description,
  toa: p.pag_url,
  icon: p.pag_icon,
  pag_order: p.pag_order,
  label: p.pag_name,
  // 3: grupo plegable (migración 0093).
  collapsible: p.pag_type === 3,
});

const toChild = (p) => ({
  pag_id: p.pag_id,
  pag_description: p.pag_description,
  padre: p.pag_parent,
  toa: p.pag_url,
  icon: p.pag_icon,
  pag_order: p.pag_order,
  label: p.pag_name,
});

// Grupo "Facturas" (migración 0069). Sus entradas no son páginas: una por
// tipo de proveedor con la casilla del menú (DEC-074).
const BILLING_PAGE_ID = 18;

/**
 * Entradas del grupo Facturas: los menús de los tipos de proveedor, por
 * nombre, si el usuario puede ver facturas. Sin ninguna, el grupo no se
 * muestra (vacío, el sidebar lo dibujaría como una página sin dirección).
 */
const withInvoiceMenus = async (datos, { per, idu }) => {
  if (!datos.padres.some((p) => p.id === BILLING_PAGE_ID)) return datos;
  const seesInvoices = await hasEffectivePermission({ useId: idu, proId: per, perId: PERMISSIONS.billing.invoices.view });
  const menus = seesInvoices ? await listInvoiceMenus() : [];
  if (menus.length === 0) return { ...datos, padres: datos.padres.filter((p) => p.id !== BILLING_PAGE_ID) };
  const entries = menus.map((menu, index) => ({
    pag_id: `invoices-${menu.pvtId}`,
    pag_description: menu.name,
    padre: BILLING_PAGE_ID,
    toa: `billing/invoices/${menu.pvtId}`,
    icon: "invoice",
    pag_order: index + 1,
    label: menu.name,
  }));
  return { ...datos, hijos: [...datos.hijos.filter((h) => h.padre !== BILLING_PAGE_ID), ...entries] };
};

export const getMenu = async (args) => withInvoiceMenus(await getPagesMenu(args), args);

const getPagesMenu = async ({ per, idu }) => {
  const datos = { padres: [], hijos: [] };

  // tbl_user_pages reemplaza el viejo CSV tbl_users.use_pages (ver
  // database/migrations/0005_create_user_pages.sql) — páginas puntuales
  // asignadas a este usuario, distintas de las de su perfil.
  const userPages = await prisma.tbl_user_pages.findMany({
    where: { use_id: idu },
    select: { pag_id: true },
  });
  const pageIds = userPages.map((up) => up.pag_id);

  if (pageIds.length > 0) {
    const padres = await prisma.tbl_pages.findMany({
      where: { pag_parent: 0, pag_id: { in: pageIds } },
      select: PAGE_SELECT,
      orderBy: { pag_order: "asc" },
    });

    if (padres.length > 0) {
      datos.padres = padres.map(toParent);

      const hijos = await prisma.tbl_pages.findMany({
        where: { pag_parent: { not: 0 }, pag_id: { in: pageIds } },
        select: PAGE_SELECT,
        orderBy: { pag_order: "asc" },
      });

      if (hijos.length > 0) datos.hijos = hijos.map(toChild);
    }
  } else {
    const padres = await prisma.tbl_pages.findMany({
      where: { pag_parent: 0, tbl_page_permissions: { some: { pro_id: per } } },
      select: PAGE_SELECT,
      orderBy: { pag_order: "asc" },
    });

    if (padres.length > 0) {
      datos.padres = padres.map(toParent);

      const hijos = await prisma.tbl_pages.findMany({
        where: { pag_parent: { not: 0 }, tbl_page_permissions: { some: { pro_id: per } } },
        select: PAGE_SELECT,
        orderBy: { pag_order: "asc" },
      });

      if (hijos.length > 0) datos.hijos = hijos.map(toChild);
    }
  }

  return datos;
};

export const getProfiles = async () => {
  const profiles = await prisma.tbl_profiles.findMany({
    where: { sta_id: ACTIVE_STATUS },
    select: { pro_id: true, pro_name: true },
    orderBy: { pro_name: "asc" },
  });

  return profiles.map((p) => ({ value: p.pro_id, label: p.pro_name }));
};

// El JWT y el estado activo (sta_id = 1) ya los verificó el middleware
// verifyToken (authjwt.middleware.js) antes de llegar aquí — esa es la única
// verificación de sesión del sistema. Esta función solo arma la respuesta a
// partir del useId ya autenticado, sin repetir el chequeo con otro criterio.
export const getSessionInfo = async ({ useId }) => {
  const userData = await prisma.tbl_users.findUnique({
    where: { use_id: Number(useId) },
    select: {
      use_id: true,
      use_user: true,
      use_name: true,
      use_last_name: true,
      use_email: true,
      use_theme_mode: true,
      pro_id: true,
      tbl_profiles: { select: { pro_name: true } },
    },
  });

  if (!userData) {
    const error = new Error("Autorización inválida");
    error.statusCode = 401;
    throw error;
  }

  const fullName = userFullName(userData) ?? "";

  // Perfil más excepciones individuales, que conceden o niegan — ver
  // effectivePermissions.service.js.
  const permissions = await getEffectivePermissionIds({ useId, proId: userData.pro_id });

  return {
    useId: userData.use_id,
    username: userData.use_user,
    fullName,
    email: userData.use_email,
    proId: userData.pro_id,
    profileName: userData.tbl_profiles?.pro_name ?? null,
    themeMode: userData.use_theme_mode,
    permissions,
  };
};

export const getUserPermissions = async ({ useId, proId }) => {
  // Efectivo, no las filas de tbl_user_permissions: una fila puede negar un
  // permiso (DEC-067).
  const permissionIds = await getEffectivePermissionIds({ useId, proId });
  const permissions = permissionIds.map((perId) => ({ perId }));

  // tbl_user_pages reemplaza el FIND_IN_SET sobre el viejo CSV
  // tbl_users.use_pages (ver database/migrations/0005_create_user_pages.sql).
  const pageRows = await prisma.tbl_user_pages.findMany({
    where: { use_id: Number(useId) },
    select: { tbl_pages: { select: { pag_url: true } } },
  });
  const windows = pageRows.map((p) => ({ path: p.tbl_pages.pag_url }));

  return { permissions, windows };
};

export const getStatusesByScope = async ({ scope, excludesKeys = [] }) => {
  const statuses = await prisma.tbl_status.findMany({
    where: {
      sta_id: { not: DELETED_STATUS },
      sta_scope: scope,
      ...(excludesKeys && excludesKeys.length > 0 ? { sta_key: { notIn: excludesKeys } } : {}),
    },
    select: { sta_id: true, sta_key: true, sta_name: true, sta_color: true },
    orderBy: { sta_order: "asc" },
  });

  return statuses.map((s) => ({ value: s.sta_id, key: s.sta_key, label: s.sta_name, sta_color: s.sta_color }));
};

import {
  getConnection,
  releaseConnection,
  executeQuery,
} from "../../../common/configs/db.config.js";
import { getEffectivePermissionIds } from "../../../common/services/effectivePermissions.service.js";

export const getMenu = async ({ per, idu }) => {
  let connection = null;
  try {
    connection = await getConnection();

    const rowsv = await executeQuery(
      `SELECT use_pages AS ven FROM tbl_users WHERE use_id = ? LIMIT 1`,
      [idu],
      connection
    );
    const ven = rowsv[0]?.ven;

    const datos = { padres: [], hijos: [] };

    let rows, rows2;

    if (ven && ven.trim() !== "") {
      rows = await executeQuery(
        `SELECT v.pag_id id, v.pag_description, v.pag_url toa, v.pag_icon icon, v.pag_order, v.pag_name label FROM tbl_pages v WHERE pag_parent = 0 AND v.pag_id IN(${ven}) ORDER BY v.pag_order`,
        [],
        connection
      );

      if (rows.length > 0) {
        datos.padres = rows;

        rows2 = await executeQuery(
          `SELECT v.pag_id, v.pag_description, v.pag_parent padre, v.pag_url toa, v.pag_icon icon, v.pag_order, v.pag_name label FROM tbl_pages v WHERE pag_parent != 0 AND v.pag_id IN(${ven}) ORDER BY v.pag_order`,
          [],
          connection
        );

        if (rows2.length > 0) {
          datos.hijos = rows2;
        }
      }
    } else {
      rows = await executeQuery(
        `SELECT v.pag_id id, v.pag_description, v.pag_url toa, v.pag_icon icon, v.pag_order, v.pag_name label FROM tbl_pages v JOIN tbl_page_permissions p ON v.pag_id = p.pag_id WHERE pag_parent = 0 AND p.pro_id = ? ORDER BY v.pag_order`,
        [per],
        connection
      );

      if (rows.length > 0) {
        datos.padres = rows;

        rows2 = await executeQuery(
          `SELECT v.pag_id, v.pag_description, v.pag_parent padre, v.pag_url toa, v.pag_icon icon, v.pag_order, v.pag_name label FROM tbl_pages v JOIN tbl_page_permissions p ON v.pag_id = p.pag_id WHERE pag_parent != 0 AND p.pro_id = ? ORDER BY v.pag_order`,
          [per],
          connection
        );

        if (rows2.length > 0) {
          datos.hijos = rows2;
        }
      }
    }

    return datos;
  } finally {
    releaseConnection(connection);
  }
};

export const getProfiles = async () => {
  let connection = null;
  try {
    connection = await getConnection();

    return await executeQuery(
      `SELECT pro_id value, pro_name label FROM tbl_profiles WHERE sta_id = 1 ORDER BY label`,
      [],
      connection
    );
  } finally {
    releaseConnection(connection);
  }
};

// El JWT y el estado activo (sta_id = 1) ya los verificó el middleware
// verifyToken (authjwt.middleware.js) antes de llegar aquí — esa es la única
// verificación de sesión del sistema. Esta función solo arma la respuesta a
// partir del useId ya autenticado, sin repetir el chequeo con otro criterio.
export const getSessionInfo = async ({ useId }) => {
  let connection = null;
  try {
    connection = await getConnection();

    const rows = await executeQuery(
      `SELECT
         u.use_id AS useId,
         u.use_user AS username,
         u.use_name AS name,
         u.use_last_name AS lastName,
         u.use_email AS email,
         u.pro_id AS proId,
         p.pro_name AS profileName
       FROM tbl_users u
       LEFT JOIN tbl_profiles p ON u.pro_id = p.pro_id
       WHERE u.use_id = ? LIMIT 1`,
      [useId],
      connection
    );

    if (!rows || rows.length === 0) {
      const error = new Error("Autorización inválida");
      error.statusCode = 401;
      throw error;
    }

    const userData = rows[0];

    const fullName = [userData.name, userData.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();

    // Unión de los permisos del perfil y las excepciones individuales —
    // ver effectivePermissions.service.js.
    const permissions = await getEffectivePermissionIds({ useId, proId: userData.proId });

    return {
      useId: userData.useId,
      username: userData.username,
      fullName,
      email: userData.email,
      proId: userData.proId,
      profileName: userData.profileName,
      permissions,
    };
  } finally {
    releaseConnection(connection);
  }
};

export const getUserPermissions = async ({ useId }) => {
  let connection = null;
  try {
    connection = await getConnection();

    const permissions = await executeQuery(
      `SELECT per_id perId FROM tbl_user_permissions WHERE use_id = ?`,
      [useId],
      connection
    );

    const windows = await executeQuery(
      `SELECT v.pag_url AS path
       FROM tbl_pages v
       JOIN tbl_users u ON FIND_IN_SET(v.pag_id, u.use_pages) > 0
       WHERE u.use_id = ?`,
      [useId],
      connection
    );

    return { permissions, windows };
  } finally {
    releaseConnection(connection);
  }
};

export const getStatusesByScope = async ({ scope, excludesKeys = [] }) => {
  let connection = null;
  try {
    connection = await getConnection();

    const whereConditions = ['sta_id != 3', 'sta_scope = ?'];
    const params = [scope];

    if (excludesKeys && excludesKeys.length > 0) {
      whereConditions.push(`sta_key NOT IN (${excludesKeys.map(() => '?').join(',')})`);
      params.push(...excludesKeys);
    }

    const whereClause = `WHERE ${whereConditions.join(" AND ")}`;

    return await executeQuery(
      `SELECT sta_id value, sta_name label, sta_color FROM tbl_status ${whereClause} ORDER BY sta_order ASC`,
      params,
      connection
    );
  } finally {
    releaseConnection(connection);
  }
};

export const getModules = async () => {
  let connection = null;
  try {
    connection = await getConnection();

    return await executeQuery(
      `SELECT mod_id id, mod_nombre nombre FROM tbl_modulos`,
      [],
      connection
    );
  } finally {
    releaseConnection(connection);
  }
};

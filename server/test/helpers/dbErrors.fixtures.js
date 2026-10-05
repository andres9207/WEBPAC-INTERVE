// Errores de concurrencia con la forma CAPTURADA contra MySQL real
// (Prisma 7 + adapter mariadb), no supuesta. Una primera versión esperaba
// `cause.code === 1213`, y un interbloqueo real, que trae
// `originalCode: "1213"` sin `code`, pasaba de largo y respondía 500.
// Cada llamada crea un error nuevo.

export const realDeadlock = () =>
  Object.assign(new Error("Raw query failed. Code: `1213`"), {
    code: "P2010",
    meta: {
      driverAdapterError: {
        name: "DriverAdapterError",
        cause: {
          originalCode: "1213",
          originalMessage: "Deadlock found when trying to get lock; try restarting transaction",
          kind: "TransactionWriteConflict",
        },
      },
    },
  });

export const realLockWaitTimeout = () =>
  Object.assign(new Error("Raw query failed. Code: `1205`"), {
    code: "P2010",
    meta: {
      driverAdapterError: {
        name: "DriverAdapterError",
        cause: {
          originalCode: "1205",
          originalMessage: "Lock wait timeout exceeded; try restarting transaction",
          kind: "mysql",
          code: 1205,
          message: "Lock wait timeout exceeded; try restarting transaction",
          state: "HY000",
        },
      },
    },
  });

// Duplicado capturado contra MySQL real: update de tbl_profiles con el
// nombre de otro perfil. El índice viene en `constraint.index`; el valor,
// solo en el texto de MySQL.
export const realUniqueViolation = (index = "uq_profiles_pro_name", value = "Superadmin", table = "tbl_profiles") =>
  Object.assign(new Error(`\nInvalid \`prisma.${table}.update()\` invocation:\n\n\nUnique constraint failed on the constraint: \`${index}\``), {
    code: "P2002",
    name: "PrismaClientKnownRequestError",
    meta: {
      driverAdapterError: {
        name: "DriverAdapterError",
        cause: {
          originalCode: "1062",
          originalMessage: `Duplicate entry '${value}' for key '${table}.${index}'`,
          kind: "UniqueConstraintViolation",
          constraint: { index },
          table,
        },
      },
      modelName: table,
    },
  });

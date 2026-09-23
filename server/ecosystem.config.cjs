// Extensión .cjs a propósito: package.json tiene "type": "module", y PM2 carga
// este archivo con require(), que no entiende ESM.
//
// instances: 1 / exec_mode: "fork" es intencional, no un valor por defecto
// olvidado: Socket.IO guarda las salas de usuario (`user:<userId>`) en
// memoria del proceso. Con "cluster"/instances > 1 sin un adapter compartido
// (p. ej. Redis), un usuario conectado al worker A nunca recibiría los
// eventos emitidos desde el worker B — las notificaciones en tiempo real se
// perderían de forma silenciosa e intermitente.
module.exports = {
  apps: [
    {
      name: "webpac-interve-api",
      script: "server.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
      },
      autorestart: true,
      max_memory_restart: "500M",
      out_file: "logs/pm2-out.log",
      error_file: "logs/pm2-error.log",
      merge_logs: true,
      time: true,
    },
  ],
};

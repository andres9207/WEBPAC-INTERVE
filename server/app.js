import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import helmetMiddleware from "./src/common/middlewares/helmet.middleware.js";
import { defaultRateLimit } from "./src/common/middlewares/rateLimit.middleware.js";
import httpLogger from "./src/common/middlewares/httpLogger.middleware.js";
import compressionMiddleware from "./src/common/middlewares/compression.middleware.js";
import cleanRequestData from "./src/common/middlewares/cleanRequestData.middleware.js";
import errorMiddleware from "./src/common/middlewares/error.middleware.js";
import { isOriginAllowed } from "./src/common/configs/cors.config.js";
import mainRoutes from "./src/modules/main.routes.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(helmetMiddleware);
app.use(httpLogger);

// ✅ CORS — antes de todo
app.use(cors({
  origin: function (origin, callback) {
    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por políticas de CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // Sin encabezados de identidad propios (currenuserapp, currentpermissionsuserapp):
  // el usuario sale solo de la cookie de sesión httpOnly, nunca del cliente.
  allowedHeaders: ['Content-Type', 'Authorization', 'Idempotency-Key']
}));


app.options('*', cors()); // ✅ preflight explícito

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compressionMiddleware);
app.use(cleanRequestData);
app.use(fileUpload({
  createParentPath: true,
  safeFileNames: true,
  preserveExtension: true,
}));

app.use("/", express.static(path.join(__dirname, "../dist")));
app.use("/api", defaultRateLimit, mainRoutes);
// Una ruta /api inexistente responde 404 en JSON: antes caía en el fallback
// de la SPA de abajo y devolvía 200 con el HTML de index.html, así que el
// cliente recibía un "éxito" donde esperaba JSON.
app.use("/api", (req, res) => {
  res.status(404).json({ success: false, message: "Recurso no encontrado." });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
app.use(errorMiddleware);

export { app };
import express from "express";
import authRoutes from "./auth/auth.routes.js";
import appRoutes from "./app/general/app.routes.js";
import moduleDocsRoutes from "./app/documents/document.routes.js";
import notificationsRoutes from "./app/notifications/notifications.routes.js";

// security
import usersRoutes from "./security/users/users.routes.js";
import profilesRoutes from "./security/profiles/profiles.routes.js";
import permissionsRoutes from "./security/permissions/permissions.routes.js";

// admin
import identityDocumentsRoutes from "./admin/identityDocuments/identityDocuments.routes.js";
import providerTypesRoutes from "./admin/providerTypes/providerTypes.routes.js";
import addressTypesRoutes from "./admin/addressTypes/addressTypes.routes.js";
import insurersRoutes from "./admin/insurers/insurers.routes.js";
import supervisionTypesRoutes from "./admin/supervisionTypes/supervisionTypes.routes.js";
import constructionCompaniesRoutes from "./admin/constructionCompanies/constructionCompanies.routes.js";
import contractTypesRoutes from "./admin/contractTypes/contractTypes.routes.js";
import worksRoutes from "./work/works/works.routes.js";
import providersRoutes from "./work/providers/providers.routes.js";

const mainRoutes = express.Router();

mainRoutes.use("/app/documents", moduleDocsRoutes);

// App
mainRoutes.use("/auth", authRoutes);
mainRoutes.use("/app", appRoutes);
mainRoutes.use("/app/notifications", notificationsRoutes);

// Security
mainRoutes.use("/security/profiles", profilesRoutes);
mainRoutes.use("/security/users", usersRoutes);
mainRoutes.use("/security/permissions", permissionsRoutes);

// Admin
mainRoutes.use("/admin/identityDocuments", identityDocumentsRoutes);
mainRoutes.use("/admin/providerTypes", providerTypesRoutes);
mainRoutes.use("/admin/addressTypes", addressTypesRoutes);
mainRoutes.use("/admin/insurers", insurersRoutes);
mainRoutes.use("/admin/supervisionTypes", supervisionTypesRoutes);
mainRoutes.use("/admin/constructionCompanies", constructionCompaniesRoutes);
mainRoutes.use("/admin/contractTypes", contractTypesRoutes);
mainRoutes.use("/work/works", worksRoutes);
mainRoutes.use("/work/providers", providersRoutes);

export default mainRoutes;

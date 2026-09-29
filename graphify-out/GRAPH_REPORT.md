# Graph Report - WEBPAC-INTERVE  (2026-09-29)

## Corpus Check
- 308 files · ~94,557 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 1404 nodes · 3014 edges · 104 communities (77 shown, 27 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b5be2f67`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- transaction.service.test.js
- auth.service.js
- dependencies
- server/package.json
- @mui/material
- authContext.jsx
- profiles.service.js
- NotificationSection/index.jsx
- showError
- users.routes.js
- auth.routes.js
- idempotency.service.js
- client/package.json
- @tabler/icons-react
- validation.utils.js
- session.service.js
- master.service.js
- compilerOptions
- MainCard
- MainLayout/index.jsx
- react
- `tbl_users`
- app.js
- permissions.routes.js
- ref_prop_types
- react-router-dom
- transaction.service.js
- masterRouter.utils.test.js
- auth.controller.test.js
- mailerService.js
- identityDocuments.service.js
- masterRouter.utils.js
- ProfilePage.jsx
- DocumentManagement.jsx
- AuthenticationRoutes.jsx
- users.service.js
- audit.service.js
- usersApi.js
- ref_jest_globals
- eslint.config.mjs
- devDependencies
- MasterPage.jsx
- src/index.jsx
- UserDialog.jsx
- scripts
- providerTypes.service.js
- useConfig
- handleFirebase.js
- server.js
- app.routes.js
- document.routes.js
- seed.js
- notifications.routes.js
- session.service.test.js
- transaction.mock.js
- scripts
- winston.config.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- formatTime.js
- extends
- ProfileSection/index.jsx
- browserslist
- volta
- volta
- users.service.test.js
- `tbl_identity_documents`
- StatusTabs.jsx
- app.service.js
- auth.service.test.js
- profiles.controller.test.js
- master.service.test.js
- permissions.controller.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 71 edges
2. `react` - 51 edges
3. `ComponentsOverrides()` - 27 edges
4. `useAuth()` - 27 edges
5. `writeAudit()` - 23 edges
6. `@tabler/icons-react` - 23 edges
7. `showError()` - 21 edges
8. `react-router-dom` - 20 edges
9. `withLockedTransaction()` - 19 edges
10. `auditContext()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `PrivateRoute()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/routes/PrivateRoute.jsx → client/src/contexts/authContext.jsx
- `HorizontalBar()` --calls--> `MenuList()`  [EXTRACTED]
  client/src/layout/MainLayout/HorizontalBar.jsx → client/src/layout/MainLayout/MenuList/index.jsx
- `MenuList()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/layout/MainLayout/MenuList/index.jsx → client/src/contexts/authContext.jsx
- `createMasterService()` --calls--> `withTransaction()`  [EXTRACTED]
  server/src/common/services/master.service.js → server/src/common/services/transaction.service.js
- `createSession()` --calls--> `withTransaction()`  [EXTRACTED]
  server/src/common/services/session.service.js → server/src/common/services/transaction.service.js

## Import Cycles
- None detected.

## Communities (104 total, 27 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.06
Nodes (40): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Avatar() (+32 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "transaction.service.test.js"
Cohesion: 0.08
Nodes (27): ref_fs, ref_path, ref_url, concurrencyError(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT (+19 more)

### Community 3 - "auth.service.js"
Cohesion: 0.10
Nodes (30): bcrypt, writeAudit(), revokeSession(), backoff(), runTransaction(), withTransaction(), comparePassword(), hashPassword() (+22 more)

### Community 4 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+27 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+26 more)

### Community 6 - "@mui/material"
Cohesion: 0.26
Nodes (10): client_src_assets_images_logo_interve, PrivateRoute(), AppBar(), ElevationScroll(), Logo(), AuthCardWrapper(), AuthWrapper1, ForgotPassword() (+2 more)

### Community 7 - "authContext.jsx"
Cohesion: 0.11
Nodes (27): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), App() (+19 more)

### Community 8 - "profiles.service.js"
Cohesion: 0.13
Nodes (17): AUDIT_ENTITIES, AUDIT_OPERATIONS, newOperationId(), withLockedTransaction(), deleteModuleDoc(), auditPermissionChanges(), ADR-0013, ADR-0027 (+9 more)

### Community 9 - "NotificationSection/index.jsx"
Cohesion: 0.15
Nodes (17): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), refreshSession(), NotificationSection(), SocketContext, SocketProvider() (+9 more)

### Community 10 - "showError"
Cohesion: 0.18
Nodes (21): getModulesAPI(), saveProfileAPI(), getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), defaultConfig, showError(), showSuccess() (+13 more)

### Community 11 - "users.routes.js"
Cohesion: 0.33
Nodes (7): ADR-0001, countUsersController(), deleteUserController(), ADR-0027, paginationUsersController(), saveUserController(), usersRoutes

### Community 12 - "auth.routes.js"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "idempotency.service.js"
Cohesion: 0.15
Nodes (18): prisma, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused() (+10 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (21): axios, moment, name, packageManager, private, version, apexcharts, @emotion/react (+13 more)

### Community 15 - "@tabler/icons-react"
Cohesion: 0.12
Nodes (14): admin, icons, dashboard, icons, menuItems, icons, other, icons (+6 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.16
Nodes (16): express-validator, createMasterSchemas(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0009, ADR-0027, nullable (+8 more)

### Community 17 - "session.service.js"
Cohesion: 0.08
Nodes (32): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+24 more)

### Community 18 - "master.service.js"
Cohesion: 0.15
Nodes (17): ADR-0003, ADR-0013, ACTIVE_STATUS, capitalize(), createMasterService(), DELETED_STATUS, httpError(), INACTIVE_STATUS (+9 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "MainCard"
Cohesion: 0.12
Nodes (22): closedMixin(), MiniDrawerStyled, openedMixin(), DashboardDefault, appDrawerWidth, drawerWidth, gridSpacing, CardGrid() (+14 more)

### Community 21 - "MainLayout/index.jsx"
Cohesion: 0.31
Nodes (6): Footer(), MainLayout(), MainContentStyled, Breadcrumbs(), BTitle(), @mui/icons-material

### Community 22 - "react"
Cohesion: 0.11
Nodes (11): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigProvider(), useLocalStorage(), Typography(), lodash (+3 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (15): compression, cookie-parser, cors, express, express-fileupload, express-rate-limit, helmet, __dirname (+7 more)

### Community 25 - "permissions.routes.js"
Cohesion: 0.21
Nodes (14): PERMISSIONS, getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController() (+6 more)

### Community 26 - "ref_prop_types"
Cohesion: 0.26
Nodes (5): ConfirmDialog(), BInputLabel, InputLabel(), TableActions(), ref_prop_types

### Community 27 - "react-router-dom"
Cohesion: 0.25
Nodes (15): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), LogoSection() (+7 more)

### Community 28 - "transaction.service.js"
Cohesion: 0.13
Nodes (16): @prisma/adapter-mariadb, @prisma/client, adapter, describeTarget(), ADR-0013, ADR-0027, testConnection(), buildLockPlan() (+8 more)

### Community 29 - "masterRouter.utils.test.js"
Cohesion: 0.13
Nodes (11): config, emit, forged, serviceMock, mockReq(), mockDelete, mockSave, forgedAuthor (+3 more)

### Community 30 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "identityDocuments.service.js"
Cohesion: 0.16
Nodes (13): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, nitCheckDigit(), identityDocumentsRoutes (+5 more)

### Community 33 - "masterRouter.utils.js"
Cohesion: 0.15
Nodes (19): getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers(), createMasterRouter() (+11 more)

### Community 34 - "ProfilePage.jsx"
Cohesion: 0.18
Nodes (21): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), useAuth(), DataTable(), FilterPopper(), normalizeOptions() (+13 more)

### Community 35 - "DocumentManagement.jsx"
Cohesion: 0.23
Nodes (15): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+7 more)

### Community 36 - "AuthenticationRoutes.jsx"
Cohesion: 0.19
Nodes (10): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router (+2 more)

### Community 37 - "users.service.js"
Cohesion: 0.18
Nodes (13): assertAssignableProfile(), assertIdentification(), AUDITED_USER_FIELDS, checkIfUserExists(), ADR-0008, ADR-0013, ADR-0027, parsePageIds() (+5 more)

### Community 38 - "audit.service.js"
Cohesion: 0.18
Nodes (15): auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0013, ADR-0027, protect(), REDACTED (+7 more)

### Community 39 - "usersApi.js"
Cohesion: 0.10
Nodes (8): getStatusesByScopeAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient, CACHE_PENDING, STATUS_CACHE, ref_axios

### Community 40 - "ref_jest_globals"
Cohesion: 0.11
Nodes (7): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload

### Community 41 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 43 - "MasterPage.jsx"
Cohesion: 0.07
Nodes (28): addressTypesApi, getAddressTypesSelectAPI, identityDocumentsApi, getProviderTypesSelectAPI, providerTypesApi, createMasterApi(), AddressTypePage, IdentityDocumentPage (+20 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "UserDialog.jsx"
Cohesion: 0.27
Nodes (10): getIdentityDocumentsSelectAPI, getProfilesAPI(), saveUserAPI(), showInfo(), showObligatorios(), DIAN_WEIGHTS, identificationFormatError(), nitCheckDigit() (+2 more)

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "providerTypes.service.js"
Cohesion: 0.19
Nodes (10): ADR-0006, defineMaster(), addressTypesRoutes, addressTypesConfig, addressTypesService, ADR-0009, providerTypesRoutes, ADR-0010 (+2 more)

### Community 48 - "useConfig"
Cohesion: 0.29
Nodes (8): ConfigContext, useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 49 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 50 - "server.js"
Cohesion: 0.24
Nodes (9): ref_http, node-cron, app, server, cronJobs, registeredTasks, startCronJobs(), stopCronJobs() (+1 more)

### Community 51 - "app.routes.js"
Cohesion: 0.26
Nodes (9): getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001, getStatusesByScopeSchema (+1 more)

### Community 52 - "document.routes.js"
Cohesion: 0.31
Nodes (7): deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema, paginationDocsSchema, saveDocSchema

### Community 53 - "seed.js"
Cohesion: 0.20
Nodes (8): ADDRESS_TYPES, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES, VIEW_PERMISSIONS

### Community 54 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 55 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 56 - "transaction.mock.js"
Cohesion: 0.13
Nodes (13): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0008, prismaMock, ADR-0010, prismaMock (+5 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 59 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "ProfileSection/index.jsx"
Cohesion: 0.44
Nodes (6): Header(), ProfileSection(), HeaderAvatar(), MobileSearch(), SearchSection(), Transitions()

### Community 70 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 71 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 73 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 88 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 89 - "`tbl_identity_documents`"
Cohesion: 0.22
Nodes (7): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_status`, `tbl_users`

### Community 93 - "StatusTabs.jsx"
Cohesion: 1.00
Nodes (3): chipBg(), chipText(), StatusTabs()

### Community 94 - "app.service.js"
Cohesion: 0.27
Nodes (6): getEffectivePermissionIds(), getMenu(), getSessionInfo(), PAGE_SELECT, toChild(), toParent()

### Community 95 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 98 - "profiles.controller.test.js"
Cohesion: 0.40
Nodes (3): forgedAuthor, ADR-0013, profilesServiceMock

### Community 100 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 101 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

## Knowledge Gaps
- **429 isolated node(s):** `getAddressTypesSelectAPI`, `icons`, `COLUMNS`, `FILTERS`, `FORM_FIELDS` (+424 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 560 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `react` to `profiles.service.js`, `server/package.json`?**
  _High betweenness centrality (0.381) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `authContext.jsx`, `NotificationSection/index.jsx`, `showError`, `client/package.json`, `MainCard`, `MainLayout/index.jsx`, `react`, `ref_prop_types`, `react-router-dom`, `ProfilePage.jsx`, `DocumentManagement.jsx`, `AuthenticationRoutes.jsx`, `usersApi.js`, `MasterPage.jsx`, `UserDialog.jsx`, `useConfig`, `ProfileSection/index.jsx`, `StatusTabs.jsx`?**
  _High betweenness centrality (0.286) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `ProfilePage.jsx`, `DocumentManagement.jsx`, `ProfileSection/index.jsx`, `AuthenticationRoutes.jsx`, `@mui/material`, `authContext.jsx`, `usersApi.js`, `NotificationSection/index.jsx`, `showError`, `MasterPage.jsx`, `UserDialog.jsx`, `client/package.json`, `useConfig`, `MainLayout/index.jsx`, `ref_prop_types`, `react-router-dom`, `StatusTabs.jsx`?**
  _High betweenness centrality (0.192) - this node is a cross-community bridge._
- **What connects `getAddressTypesSelectAPI`, `icons`, `COLUMNS` to the rest of the system?**
  _429 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0567287784679089 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `transaction.service.test.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08367071524966262 - nodes in this community are weakly interconnected._
# Graph Report - WEBPAC-INTERVE  (2026-09-29)

## Corpus Check
- 292 files · ~91,651 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 1353 nodes · 2917 edges · 101 communities (78 shown, 23 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `24bd3637`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- images.js
- auth.service.js
- dependencies
- server/package.json
- httpCliente.js
- authContext.jsx
- profiles.service.js
- showError
- UsersPage.jsx
- masterRouter.utils.js
- auth.routes.js
- idempotency.service.js
- client/package.json
- @tabler/icons-react
- validation.utils.js
- session.service.js
- master.service.js
- compilerOptions
- Shadow.jsx
- react-router-dom
- react
- `tbl_users`
- app.js
- permissions.routes.js
- @mui/material
- MainLayout/index.jsx
- transaction.service.js
- users.controller.test.js
- auth.controller.test.js
- mailerService.js
- identityDocuments.service.js
- profiles.routes.js
- ProfilePage.jsx
- DocumentManagement.jsx
- SocketProvider.jsx
- users.service.js
- audit.service.js
- authjwt.middleware.test.js
- ref_jest_globals
- eslint.config.mjs
- devDependencies
- useAuth
- src/index.jsx
- UserDialog.jsx
- scripts
- socket.js
- transaction.service.test.js
- error.middleware.js
- server.js
- app.routes.js
- document.routes.js
- prismaClient.js
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
- GenericFormSection.jsx
- extends
- DebouncedInput.jsx
- browserslist
- volta
- volta
- users.service.test.js
- `tbl_identity_documents`
- StatusTabs.jsx
- users.routes.js
- auth.service.test.js
- NotificationSection/index.jsx
- seed.js
- master.service.test.js
- permissions.controller.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 71 edges
2. `react` - 51 edges
3. `ComponentsOverrides()` - 27 edges
4. `writeAudit()` - 23 edges
5. `useAuth()` - 23 edges
6. `@tabler/icons-react` - 23 edges
7. `showError()` - 21 edges
8. `react-router-dom` - 20 edges
9. `auditContext()` - 19 edges
10. `withLockedTransaction()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `PrivateRoute()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/routes/PrivateRoute.jsx → client/src/contexts/authContext.jsx
- `MasterDialog` --calls--> `GenericFormSection`  [EXTRACTED]
  client/src/ui-component/extended/MasterDialog.jsx → client/src/ui-component/extended/GenericFormSection.jsx
- `MasterDialog` --calls--> `newIdempotencyKey()`  [EXTRACTED]
  client/src/ui-component/extended/MasterDialog.jsx → client/src/utils/idempotency.js
- `MasterPage()` --calls--> `MasterDialog`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/ui-component/extended/MasterDialog.jsx

## Import Cycles
- None detected.

## Communities (101 total, 23 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.05
Nodes (43): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), Alert() (+35 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "images.js"
Cohesion: 0.23
Nodes (8): ref_fs, ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 3 - "auth.service.js"
Cohesion: 0.10
Nodes (28): bcrypt, ref_crypto, writeAudit(), getEffectivePermissionIds(), comparePassword(), hashPassword(), deriveKey(), generateResetCode() (+20 more)

### Community 4 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+27 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+26 more)

### Community 6 - "httpCliente.js"
Cohesion: 0.18
Nodes (10): getStatusesByScopeAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient, CACHE_PENDING, STATUS_CACHE, StatusChip() (+2 more)

### Community 7 - "authContext.jsx"
Cohesion: 0.07
Nodes (39): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), App() (+31 more)

### Community 8 - "profiles.service.js"
Cohesion: 0.13
Nodes (17): AUDIT_ENTITIES, AUDIT_OPERATIONS, newOperationId(), withLockedTransaction(), auditPermissionChanges(), ADR-0013, ADR-0027, updateProfilePermissions() (+9 more)

### Community 9 - "showError"
Cohesion: 0.21
Nodes (17): getModulesAPI(), saveProfileAPI(), getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), defaultConfig, showError(), showSuccess() (+9 more)

### Community 10 - "UsersPage.jsx"
Cohesion: 0.23
Nodes (3): deleteUserAPI(), paginationUsersAPI(), UsersPage()

### Community 11 - "masterRouter.utils.js"
Cohesion: 0.20
Nodes (10): jsonwebtoken, verifyToken(), validate(), ACCESS_COOKIE_NAME, createMasterControllers(), createMasterRouter(), config, emit (+2 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "idempotency.service.js"
Cohesion: 0.13
Nodes (20): prisma, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused() (+12 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (22): axios, moment, name, packageManager, private, version, apexcharts, @emotion/react (+14 more)

### Community 15 - "@tabler/icons-react"
Cohesion: 0.10
Nodes (21): ProfileSection(), HeaderAvatar(), MobileSearch(), SearchSection(), admin, icons, dashboard, icons (+13 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.17
Nodes (15): express-validator, createMasterSchemas(), idArray(), idempotencyKeyRule(), ADR-0001, ADR-0027, nullable, optionalId() (+7 more)

### Community 17 - "session.service.js"
Cohesion: 0.16
Nodes (19): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+11 more)

### Community 18 - "master.service.js"
Cohesion: 0.13
Nodes (19): ADR-0003, ADR-0013, ADR-0027, ACTIVE_STATUS, capitalize(), createMasterService(), DELETED_STATUS, httpError() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "Shadow.jsx"
Cohesion: 0.18
Nodes (14): DashboardDefault, gridSpacing, CardGrid(), CardSecondaryAction(), SubCard(), Avatar(), Dashboard(), testCards (+6 more)

### Community 21 - "react-router-dom"
Cohesion: 0.27
Nodes (13): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), MenuList() (+5 more)

### Community 22 - "react"
Cohesion: 0.13
Nodes (12): ConfigContext, ConfigProvider(), useConfig(), useLocalStorage(), ElevationScroll(), HorizontalBar(), ImageList(), srcset() (+4 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (15): compression, cookie-parser, cors, express, express-fileupload, express-rate-limit, helmet, __dirname (+7 more)

### Community 25 - "permissions.routes.js"
Cohesion: 0.21
Nodes (14): PERMISSIONS, getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController() (+6 more)

### Community 26 - "@mui/material"
Cohesion: 0.18
Nodes (9): PrivateRoute(), AppBar(), ElevationScroll(), ConfirmDialog(), BInputLabel, InputLabel(), TableActions(), @mui/material (+1 more)

### Community 27 - "MainLayout/index.jsx"
Cohesion: 0.19
Nodes (14): handlerDrawerOpen(), Footer(), Header(), MainLayout(), LogoSection(), MainContentStyled, Sidebar(), closedMixin() (+6 more)

### Community 28 - "transaction.service.js"
Cohesion: 0.22
Nodes (12): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+4 more)

### Community 29 - "users.controller.test.js"
Cohesion: 0.14
Nodes (10): mockReq(), mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock, forgedAuthor, ADR-0013 (+2 more)

### Community 30 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "identityDocuments.service.js"
Cohesion: 0.15
Nodes (14): defineMaster(), DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, nitCheckDigit() (+6 more)

### Community 33 - "profiles.routes.js"
Cohesion: 0.23
Nodes (10): deleteProfileController(), getModulesController(), ADR-0027, paginationProfilesController(), saveProfileController(), profilesRoutes, deleteProfileSchema, getModulesSchema (+2 more)

### Community 34 - "ProfilePage.jsx"
Cohesion: 0.22
Nodes (12): deleteProfileAPI(), paginationProfilesAPI(), headerStyle, MainCard(), DataTable(), FilterPopper(), normalizeOptions(), SocketDropdownFilter() (+4 more)

### Community 35 - "DocumentManagement.jsx"
Cohesion: 0.09
Nodes (18): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+10 more)

### Community 36 - "SocketProvider.jsx"
Cohesion: 0.21
Nodes (10): refreshSession(), SocketContext, SocketProvider(), TooltipLongText(), pathSocket, STATUS_OPTIONS, toNlBr(), truncateText() (+2 more)

### Community 37 - "users.service.js"
Cohesion: 0.19
Nodes (12): assertAssignableProfile(), assertIdentification(), AUDITED_USER_FIELDS, checkIfUserExists(), ADR-0008, ADR-0013, ADR-0027, parsePageIds() (+4 more)

### Community 38 - "audit.service.js"
Cohesion: 0.20
Nodes (14): auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0013, ADR-0027, protect(), REDACTED (+6 more)

### Community 39 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 40 - "ref_jest_globals"
Cohesion: 0.11
Nodes (7): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload

### Community 41 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 43 - "useAuth"
Cohesion: 0.14
Nodes (15): identityDocumentsApi, useAuth(), IdentityDocumentPage, ProfilesPage, UsersPage, MasterPage(), NO_FILTERS, STATUS_NAMES (+7 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "UserDialog.jsx"
Cohesion: 0.17
Nodes (15): getIdentityDocumentsSelectAPI, getProfilesAPI(), saveUserAPI(), createMasterApi(), showInfo(), showObligatorios(), fallbackUuid(), idempotencyConfig() (+7 more)

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "socket.js"
Cohesion: 0.31
Nodes (8): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), isSessionActive()

### Community 48 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (8): ref_url, ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout()

### Community 49 - "error.middleware.js"
Cohesion: 0.28
Nodes (11): concurrencyError(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS, driverCause(), driverErrorCode() (+3 more)

### Community 50 - "server.js"
Cohesion: 0.24
Nodes (9): ref_http, node-cron, app, server, cronJobs, registeredTasks, startCronJobs(), stopCronJobs() (+1 more)

### Community 51 - "app.routes.js"
Cohesion: 0.26
Nodes (9): getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001, getStatusesByScopeSchema (+1 more)

### Community 52 - "document.routes.js"
Cohesion: 0.23
Nodes (9): IDEMPOTENCY_HEADER, deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema, DOC_TYPES, paginationDocsSchema (+1 more)

### Community 53 - "prismaClient.js"
Cohesion: 0.14
Nodes (11): @prisma/adapter-mariadb, @prisma/client, adapter, describeTarget(), ADR-0013, ADR-0027, testConnection(), getMenu() (+3 more)

### Community 54 - "notifications.routes.js"
Cohesion: 0.20
Nodes (14): getIO(), getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount() (+6 more)

### Community 55 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 56 - "transaction.mock.js"
Cohesion: 0.19
Nodes (9): lockedIdsOf(), transactionRawMocks(), ADR-0008, prismaMock, mockGetEffectivePermissionIds, mockGetIO, prismaMock, ctx (+1 more)

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

### Community 66 - "GenericFormSection.jsx"
Cohesion: 0.38
Nodes (8): useSocket(), findOption(), flattenOptions(), GenericFormSection, PendingDropdownField(), RequiredLabel(), RequiredLabel(), SelectSocket()

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

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
Cohesion: 0.40
Nodes (4): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_status`

### Community 93 - "StatusTabs.jsx"
Cohesion: 1.00
Nodes (3): chipBg(), chipText(), StatusTabs()

### Community 94 - "users.routes.js"
Cohesion: 0.26
Nodes (9): ADR-0001, requirePermission(), hasEffectivePermission(), countUsersController(), deleteUserController(), ADR-0027, paginationUsersController(), saveUserController() (+1 more)

### Community 95 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 96 - "NotificationSection/index.jsx"
Cohesion: 0.35
Nodes (9): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), getTimeAgo(), ListItemWrapper(), NotificationList() (+1 more)

### Community 97 - "seed.js"
Cohesion: 0.25
Nodes (6): IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, STATUSES, VIEW_PERMISSIONS

### Community 100 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 101 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

## Knowledge Gaps
- **412 isolated node(s):** `STATUS_TABS`, `STATUS_NAMES`, `NO_FILTERS`, `COLUMNS`, `FILTERS` (+407 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 536 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `profiles.service.js`, `server/package.json`?**
  _High betweenness centrality (0.444) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `httpCliente.js`, `authContext.jsx`, `showError`, `UsersPage.jsx`, `client/package.json`, `@tabler/icons-react`, `Shadow.jsx`, `react-router-dom`, `react`, `MainLayout/index.jsx`, `ProfilePage.jsx`, `DocumentManagement.jsx`, `SocketProvider.jsx`, `useAuth`, `UserDialog.jsx`, `GenericFormSection.jsx`, `DebouncedInput.jsx`, `StatusTabs.jsx`, `NotificationSection/index.jsx`?**
  _High betweenness centrality (0.302) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `overrides/index.js`, `httpCliente.js`, `authContext.jsx`, `showError`, `UsersPage.jsx`, `client/package.json`, `@tabler/icons-react`, `react-router-dom`, `@mui/material`, `MainLayout/index.jsx`, `ProfilePage.jsx`, `DocumentManagement.jsx`, `SocketProvider.jsx`, `useAuth`, `UserDialog.jsx`, `GenericFormSection.jsx`, `DebouncedInput.jsx`, `StatusTabs.jsx`, `NotificationSection/index.jsx`?**
  _High betweenness centrality (0.232) - this node is a cross-community bridge._
- **What connects `STATUS_TABS`, `STATUS_NAMES`, `NO_FILTERS` to the rest of the system?**
  _412 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.052982456140350874 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `auth.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10099573257467995 - nodes in this community are weakly interconnected._
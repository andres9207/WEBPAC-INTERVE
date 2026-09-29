# Graph Report - WEBPAC-INTERVE  (2026-09-29)

## Corpus Check
- 315 files · ~95,777 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 1429 nodes · 3061 edges · 103 communities (72 shown, 31 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b220b698`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- transaction.service.test.js
- auth.service.js
- dependencies
- server/package.json
- withAlpha
- authContext.jsx
- profiles.service.js
- SocketProvider.jsx
- react
- NotificationSection/index.jsx
- auth.routes.js
- idempotency.service.js
- client/package.json
- menu-items/index.js
- users.routes.js
- session.service.js
- master.service.js
- compilerOptions
- @mui/material
- themes/index.jsx
- ConfigContext.jsx
- `tbl_users`
- app.js
- permissions.routes.js
- ref_prop_types
- MainLayout/index.jsx
- transaction.service.js
- users.controller.test.js
- identityDocuments.service.js
- mailerService.js
- identityDocuments.formats.js
- profiles.routes.js
- useAuth
- ProfileDialog.jsx
- authjwt.middleware.test.js
- users.service.js
- audit.service.js
- ProfilePage.jsx
- ref_jest_globals
- eslint.config.mjs
- devDependencies
- MainRoutes.jsx
- src/index.jsx
- UserDialog.jsx
- scripts
- main.routes.js
- DebouncedInput.jsx
- handleFirebase.js
- server.js
- app.routes.js
- masterRouter.utils.js
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
- formatTime.js
- extends
- idempotency.service.test.js
- browserslist
- volta
- volta
- users.service.test.js
- `tbl_identity_documents`
- permissions.service.test.js
- EasyCrop.jsx
- auth.service.test.js
- permissions.controller.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 71 edges
2. `react` - 51 edges
3. `useAuth()` - 29 edges
4. `ComponentsOverrides()` - 27 edges
5. `writeAudit()` - 23 edges
6. `@tabler/icons-react` - 23 edges
7. `showError()` - 21 edges
8. `react-router-dom` - 20 edges
9. `withLockedTransaction()` - 19 edges
10. `auditContext()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `MenuList()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/layout/MainLayout/MenuList/index.jsx → client/src/contexts/authContext.jsx
- `createMasterService()` --calls--> `diffFields()`  [EXTRACTED]
  server/src/common/services/master.service.js → server/src/common/services/audit.service.js
- `createMasterService()` --calls--> `newOperationId()`  [EXTRACTED]
  server/src/common/services/master.service.js → server/src/common/services/audit.service.js
- `createMasterService()` --calls--> `writeAudit()`  [EXTRACTED]
  server/src/common/services/master.service.js → server/src/common/services/audit.service.js

## Import Cycles
- None detected.

## Communities (103 total, 31 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (24): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "transaction.service.test.js"
Cohesion: 0.08
Nodes (27): ref_fs, ref_path, ref_url, concurrencyError(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT (+19 more)

### Community 3 - "auth.service.js"
Cohesion: 0.10
Nodes (28): bcrypt, ref_crypto, backoff(), runTransaction(), withTransaction(), comparePassword(), hashPassword(), deriveKey() (+20 more)

### Community 4 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+27 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+26 more)

### Community 6 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 7 - "authContext.jsx"
Cohesion: 0.07
Nodes (42): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), App() (+34 more)

### Community 8 - "profiles.service.js"
Cohesion: 0.13
Nodes (16): AUDIT_ENTITIES, newOperationId(), withLockedTransaction(), auditPermissionChanges(), ADR-0013, ADR-0027, updateProfilePermissions(), updateUserPermissions() (+8 more)

### Community 9 - "SocketProvider.jsx"
Cohesion: 0.21
Nodes (10): refreshSession(), SocketContext, SocketProvider(), TooltipLongText(), pathSocket, STATUS_OPTIONS, toNlBr(), truncateText() (+2 more)

### Community 10 - "react"
Cohesion: 0.17
Nodes (19): getBasicInformationAPI(), updateAccountAPI(), showError(), showSuccess(), Accordion(), BaseDialog(), findOption(), flattenOptions() (+11 more)

### Community 11 - "NotificationSection/index.jsx"
Cohesion: 0.35
Nodes (9): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), useSocket(), FilterPopper(), normalizeOptions() (+1 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (27): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+19 more)

### Community 13 - "idempotency.service.js"
Cohesion: 0.15
Nodes (18): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+10 more)

### Community 14 - "client/package.json"
Cohesion: 0.10
Nodes (20): axios, moment, name, packageManager, private, version, apexcharts, @emotion/react (+12 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.11
Nodes (13): admin, icons, dashboard, icons, menuItems, icons, other, icons (+5 more)

### Community 16 - "users.routes.js"
Cohesion: 0.13
Nodes (20): express-validator, createMasterSchemas(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0009, ADR-0027, nullable (+12 more)

### Community 17 - "session.service.js"
Cohesion: 0.08
Nodes (35): ADR-0001, jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed() (+27 more)

### Community 18 - "master.service.js"
Cohesion: 0.14
Nodes (18): ADR-0013, ACTIVE_STATUS, capitalize(), createMasterService(), DELETED_STATUS, httpError(), INACTIVE_STATUS, ADR-0003 (+10 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "@mui/material"
Cohesion: 0.20
Nodes (14): gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard(), Avatar(), SamplePage(), ColorBox() (+6 more)

### Community 21 - "themes/index.jsx"
Cohesion: 0.33
Nodes (6): createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor, Typography()

### Community 22 - "ConfigContext.jsx"
Cohesion: 0.27
Nodes (7): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage()

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (14): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+6 more)

### Community 25 - "permissions.routes.js"
Cohesion: 0.21
Nodes (14): PERMISSIONS, getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController() (+6 more)

### Community 26 - "ref_prop_types"
Cohesion: 0.25
Nodes (6): ConfirmDialog(), DataTable(), BInputLabel, InputLabel(), TableActions(), ref_prop_types

### Community 27 - "MainLayout/index.jsx"
Cohesion: 0.09
Nodes (40): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), setParentOpenedMenu(), useMenuCollapse() (+32 more)

### Community 28 - "transaction.service.js"
Cohesion: 0.27
Nodes (9): buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES, toSortedIds() (+1 more)

### Community 29 - "users.controller.test.js"
Cohesion: 0.14
Nodes (10): mockReq(), mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock, forgedAuthor, ADR-0013 (+2 more)

### Community 30 - "identityDocuments.service.js"
Cohesion: 0.38
Nodes (5): identityDocumentsRoutes, identityDocumentsConfig, identityDocumentsService, ADR-0008, ADR-0013

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "identityDocuments.formats.js"
Cohesion: 0.24
Nodes (8): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, nitCheckDigit(), ADR-0008

### Community 33 - "profiles.routes.js"
Cohesion: 0.23
Nodes (10): deleteProfileController(), getModulesController(), ADR-0027, paginationProfilesController(), saveProfileController(), profilesRoutes, deleteProfileSchema, getModulesSchema (+2 more)

### Community 34 - "useAuth"
Cohesion: 0.21
Nodes (13): useAuth(), PrivateRoute(), MasterPage(), NO_FILTERS, STATUS_NAMES, STATUS_TABS, chipBg(), chipText() (+5 more)

### Community 35 - "ProfileDialog.jsx"
Cohesion: 0.18
Nodes (19): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), getModulesAPI(), saveProfileAPI(), showPromise() (+11 more)

### Community 36 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 37 - "users.service.js"
Cohesion: 0.18
Nodes (13): assertAssignableProfile(), assertIdentification(), AUDITED_USER_FIELDS, checkIfUserExists(), ADR-0008, ADR-0013, ADR-0027, parsePageIds() (+5 more)

### Community 38 - "audit.service.js"
Cohesion: 0.19
Nodes (16): auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0013, ADR-0027, protect(), REDACTED (+8 more)

### Community 39 - "ProfilePage.jsx"
Cohesion: 0.14
Nodes (17): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient, LastModifiedCell() (+9 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.10
Nodes (10): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, baseConfig, config (+2 more)

### Community 41 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 43 - "MainRoutes.jsx"
Cohesion: 0.05
Nodes (35): addressTypesApi, getAddressTypesSelectAPI, identityDocumentsApi, getInsurersSelectAPI, insurersApi, getProviderTypesSelectAPI, providerTypesApi, createMasterApi() (+27 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "UserDialog.jsx"
Cohesion: 0.12
Nodes (15): getIdentityDocumentsSelectAPI, getProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), saveUserAPI(), updatePasswordAPI(), defaultConfig, showInfo() (+7 more)

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "main.routes.js"
Cohesion: 0.13
Nodes (15): ADR-0006, ADR-0018, defineMaster(), addressTypesRoutes, addressTypesConfig, addressTypesService, ADR-0009, insurersRoutes (+7 more)

### Community 49 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 50 - "server.js"
Cohesion: 0.24
Nodes (9): ref_http, node-cron, app, server, cronJobs, registeredTasks, startCronJobs(), stopCronJobs() (+1 more)

### Community 51 - "app.routes.js"
Cohesion: 0.26
Nodes (9): getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001, getStatusesByScopeSchema (+1 more)

### Community 52 - "masterRouter.utils.js"
Cohesion: 0.16
Nodes (16): verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, isSessionActive(), createMasterControllers(), createMasterRouter() (+8 more)

### Community 53 - "prismaClient.js"
Cohesion: 0.08
Nodes (22): @prisma/adapter-mariadb, @prisma/client, ADDRESS_TYPES, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES (+14 more)

### Community 54 - "notifications.routes.js"
Cohesion: 0.18
Nodes (15): express, getIO(), getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes (+7 more)

### Community 55 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 56 - "transaction.mock.js"
Cohesion: 0.14
Nodes (12): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0008, prismaMock, ADR-0003, prismaMock (+4 more)

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
Cohesion: 0.20
Nodes (8): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_status`, `tbl_users`

### Community 93 - "permissions.service.test.js"
Cohesion: 0.50
Nodes (3): mockGetEffectivePermissionIds, mockGetIO, prismaMock

### Community 95 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 101 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

## Knowledge Gaps
- **440 isolated node(s):** `getInsurersSelectAPI`, `icons`, `COLUMNS`, `FILTERS`, `FORM_FIELDS` (+435 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 574 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `profiles.service.js`, `server/package.json`?**
  _High betweenness centrality (0.383) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `useAuth`, `ProfileDialog.jsx`, `withAlpha`, `authContext.jsx`, `ProfilePage.jsx`, `SocketProvider.jsx`, `react`, `NotificationSection/index.jsx`, `MainRoutes.jsx`, `UserDialog.jsx`, `client/package.json`, `DebouncedInput.jsx`, `themes/index.jsx`, `ref_prop_types`, `MainLayout/index.jsx`, `EasyCrop.jsx`?**
  _High betweenness centrality (0.263) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `useAuth`, `ProfileDialog.jsx`, `authContext.jsx`, `ProfilePage.jsx`, `SocketProvider.jsx`, `NotificationSection/index.jsx`, `MainRoutes.jsx`, `UserDialog.jsx`, `client/package.json`, `DebouncedInput.jsx`, `@mui/material`, `themes/index.jsx`, `ConfigContext.jsx`, `ref_prop_types`, `MainLayout/index.jsx`, `EasyCrop.jsx`?**
  _High betweenness centrality (0.198) - this node is a cross-community bridge._
- **What connects `getInsurersSelectAPI`, `icons`, `COLUMNS` to the rest of the system?**
  _440 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08325624421831637 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `transaction.service.test.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08367071524966262 - nodes in this community are weakly interconnected._
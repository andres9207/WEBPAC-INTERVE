# Graph Report - WEBPAC-INTERVE  (2026-09-29)

## Corpus Check
- 324 files · ~97,583 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 1455 nodes · 3128 edges · 111 communities (77 shown, 34 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d5c1202b`
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
- AuthForgotPassword.jsx
- httpCliente.js
- NotificationSection/index.jsx
- showError
- profiles.service.js
- auth.routes.js
- idempotency.service.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- session.service.js
- master.service.js
- compilerOptions
- @mui/material
- themes/index.jsx
- ConfigContext.jsx
- `tbl_users`
- app.js
- permissions.controller.test.js
- react
- MainLayout/index.jsx
- DocumentManagement.jsx
- users.controller.test.js
- requests/index.js
- mailerService.js
- transaction.service.js
- seed.js
- AddressTypePage.jsx
- UserDialog.jsx
- authjwt.middleware.test.js
- users.service.js
- audit.service.js
- useAuth
- ref_jest_globals
- eslint.config.mjs
- devDependencies
- MainRoutes.jsx
- src/index.jsx
- InsurerPage.jsx
- scripts
- permissions.routes.js
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
- profiles.controller.js
- browserslist
- volta
- volta
- users.service.test.js
- `tbl_status`
- authContext.jsx
- SupervisionTypePage.jsx
- auth.service.test.js
- App.jsx
- password-strength.js
- auth.controller.test.js
- Default/index.jsx
- idempotency.service.test.js
- profiles.service.test.js
- InputLabel.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 72 edges
2. `react` - 52 edges
3. `useAuth()` - 31 edges
4. `ComponentsOverrides()` - 27 edges
5. `@tabler/icons-react` - 24 edges
6. `writeAudit()` - 23 edges
7. `showError()` - 21 edges
8. `MasterPage()` - 21 edges
9. `react-router-dom` - 20 edges
10. `withLockedTransaction()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `MenuList()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/layout/MainLayout/MenuList/index.jsx → client/src/contexts/authContext.jsx
- `createMasterService()` --calls--> `withTransaction()`  [EXTRACTED]
  server/src/common/services/master.service.js → server/src/common/services/transaction.service.js
- `createSession()` --calls--> `withTransaction()`  [EXTRACTED]
  server/src/common/services/session.service.js → server/src/common/services/transaction.service.js
- `revokeSession()` --calls--> `withTransaction()`  [EXTRACTED]
  server/src/common/services/session.service.js → server/src/common/services/transaction.service.js

## Import Cycles
- None detected.

## Communities (111 total, 34 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "transaction.service.test.js"
Cohesion: 0.08
Nodes (27): ref_fs, ref_path, ref_url, concurrencyError(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT (+19 more)

### Community 3 - "auth.service.js"
Cohesion: 0.11
Nodes (28): bcrypt, ref_crypto, writeAudit(), withTransaction(), comparePassword(), hashPassword(), deriveKey(), generateResetCode() (+20 more)

### Community 4 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+27 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+26 more)

### Community 6 - "withAlpha"
Cohesion: 0.20
Nodes (12): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+4 more)

### Community 7 - "AuthForgotPassword.jsx"
Cohesion: 0.29
Nodes (10): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, strengthColor(), ForgotPassword(), STEPS (+2 more)

### Community 8 - "httpCliente.js"
Cohesion: 0.29
Nodes (6): instance, NO_REFRESH_URLS, refreshClient, refreshSession(), ref_axios, js-cookie

### Community 9 - "NotificationSection/index.jsx"
Cohesion: 0.11
Nodes (25): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+17 more)

### Community 10 - "showError"
Cohesion: 0.17
Nodes (20): getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), defaultConfig, showError(), showInfo(), showObligatorios(), showSuccess() (+12 more)

### Community 11 - "profiles.service.js"
Cohesion: 0.13
Nodes (17): AUDIT_ENTITIES, AUDIT_OPERATIONS, newOperationId(), withLockedTransaction(), auditPermissionChanges(), ADR-0013, ADR-0027, updateProfilePermissions() (+9 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "idempotency.service.js"
Cohesion: 0.15
Nodes (18): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+10 more)

### Community 14 - "client/package.json"
Cohesion: 0.10
Nodes (20): axios, moment, name, packageManager, private, version, apexcharts, @emotion/react (+12 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.11
Nodes (13): admin, icons, dashboard, icons, menuItems, icons, other, icons (+5 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.09
Nodes (28): express-validator, createMasterSchemas(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0009, ADR-0027, nullable (+20 more)

### Community 17 - "session.service.js"
Cohesion: 0.10
Nodes (27): ADR-0001, jsonwebtoken, ACCESS_COOKIE_NAME, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001 (+19 more)

### Community 18 - "master.service.js"
Cohesion: 0.16
Nodes (20): ACTIVE_STATUS, capitalize(), createMasterService(), DELETED_STATUS, httpError(), INACTIVE_STATUS, ADR-0003, ADR-0013 (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "@mui/material"
Cohesion: 0.22
Nodes (15): ProfileSection(), gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard(), Avatar(), SamplePage() (+7 more)

### Community 21 - "themes/index.jsx"
Cohesion: 0.23
Nodes (10): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), Typography() (+2 more)

### Community 22 - "ConfigContext.jsx"
Cohesion: 0.47
Nodes (4): config, ConfigContext, ConfigProvider(), useLocalStorage()

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (14): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+6 more)

### Community 25 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 26 - "react"
Cohesion: 0.15
Nodes (8): ConfirmDialog(), DataTable(), STATUS_NAMES, TableActions(), ref_prop_types, react, react-easy-crop, @tabler/icons-react

### Community 27 - "MainLayout/index.jsx"
Cohesion: 0.06
Nodes (53): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), client_src_assets_images_logo_interve, useConfig(), setParentOpenedMenu() (+45 more)

### Community 28 - "DocumentManagement.jsx"
Cohesion: 0.32
Nodes (11): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+3 more)

### Community 29 - "users.controller.test.js"
Cohesion: 0.14
Nodes (10): mockReq(), mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock, forgedAuthor, ADR-0013 (+2 more)

### Community 30 - "requests/index.js"
Cohesion: 0.30
Nodes (5): getAddressTypesSelectAPI, getInsurersSelectAPI, getProviderTypesSelectAPI, getSupervisionTypesSelectAPI, createMasterApi()

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "transaction.service.js"
Cohesion: 0.21
Nodes (11): ADR-0027, backoff(), buildLockPlan(), ISOLATION_LEVEL, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+3 more)

### Community 33 - "seed.js"
Cohesion: 0.18
Nodes (9): ADDRESS_TYPES, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES, SUPERVISION_TYPES (+1 more)

### Community 34 - "AddressTypePage.jsx"
Cohesion: 0.29
Nodes (5): addressTypesApi, AddressTypePage, COLUMNS, FORM_FIELDS, ADR-0009

### Community 35 - "UserDialog.jsx"
Cohesion: 0.12
Nodes (18): getIdentityDocumentsSelectAPI, getModulesAPI(), getProfilesAPI(), saveProfileAPI(), saveUserAPI(), genericRequest, STATUS_OPTIONS, fallbackUuid() (+10 more)

### Community 36 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 37 - "users.service.js"
Cohesion: 0.18
Nodes (13): assertAssignableProfile(), assertIdentification(), AUDITED_USER_FIELDS, checkIfUserExists(), ADR-0008, ADR-0013, ADR-0027, parsePageIds() (+5 more)

### Community 38 - "audit.service.js"
Cohesion: 0.20
Nodes (14): auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0013, ADR-0027, protect(), REDACTED (+6 more)

### Community 39 - "useAuth"
Cohesion: 0.14
Nodes (25): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), useAuth(), PrivateRoute(), LastModifiedCell() (+17 more)

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
Cohesion: 0.12
Nodes (13): identityDocumentsApi, providerTypesApi, IdentityDocumentPage, ProfilesPage, ProviderTypePage, UsersPage, COLUMNS, FORM_FIELDS (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "InsurerPage.jsx"
Cohesion: 0.29
Nodes (5): insurersApi, InsurerPage, COLUMNS, FORM_FIELDS, ADR-0003

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "permissions.routes.js"
Cohesion: 0.05
Nodes (47): ADR-0006, ADR-0011, ADR-0018, PERMISSIONS, defineMaster(), addressTypesRoutes, addressTypesConfig, addressTypesService (+39 more)

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
Cohesion: 0.22
Nodes (14): express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers(), createMasterRouter() (+6 more)

### Community 53 - "prismaClient.js"
Cohesion: 0.13
Nodes (14): @prisma/adapter-mariadb, @prisma/client, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection() (+6 more)

### Community 54 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 55 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 56 - "transaction.mock.js"
Cohesion: 0.12
Nodes (15): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0008, prismaMock, ADR-0003, prismaMock (+7 more)

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

### Community 68 - "profiles.controller.js"
Cohesion: 0.16
Nodes (15): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), getIO(), setIO() (+7 more)

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

### Community 89 - "`tbl_status`"
Cohesion: 0.18
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_status` (+1 more)

### Community 93 - "authContext.jsx"
Cohesion: 0.33
Nodes (6): loginAPI(), logoutAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), AuthProvider(), getStoredUser()

### Community 94 - "SupervisionTypePage.jsx"
Cohesion: 0.29
Nodes (5): supervisionTypesApi, SupervisionTypePage, COLUMNS, FORM_FIELDS, ADR-0007

### Community 95 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 100 - "App.jsx"
Cohesion: 0.43
Nodes (5): App(), AuthContext, NavigationScroll(), SocketProvider(), react-toastify

### Community 101 - "password-strength.js"
Cohesion: 0.48
Nodes (5): defaultColor, hasMixed(), hasNumber(), hasSpecial(), strengthIndicator()

### Community 104 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 105 - "Default/index.jsx"
Cohesion: 0.47
Nodes (4): DashboardDefault, CardGrid(), Dashboard(), testCards

## Knowledge Gaps
- **447 isolated node(s):** `getSupervisionTypesSelectAPI`, `icons`, `COLUMNS`, `FORM_FIELDS`, `ADR-0007` (+442 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 585 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **34 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `profiles.service.js`, `server/package.json`?**
  _High betweenness centrality (0.419) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `UserDialog.jsx`, `withAlpha`, `useAuth`, `AuthForgotPassword.jsx`, `NotificationSection/index.jsx`, `showError`, `Default/index.jsx`, `InputLabel.jsx`, `client/package.json`, `DebouncedInput.jsx`, `themes/index.jsx`, `react`, `MainLayout/index.jsx`, `DocumentManagement.jsx`?**
  _High betweenness centrality (0.246) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `UserDialog.jsx`, `App.jsx`, `useAuth`, `AuthForgotPassword.jsx`, `NotificationSection/index.jsx`, `showError`, `MainRoutes.jsx`, `client/package.json`, `DebouncedInput.jsx`, `@mui/material`, `themes/index.jsx`, `ConfigContext.jsx`, `MainLayout/index.jsx`, `DocumentManagement.jsx`, `authContext.jsx`?**
  _High betweenness centrality (0.229) - this node is a cross-community bridge._
- **What connects `getSupervisionTypesSelectAPI`, `icons`, `COLUMNS` to the rest of the system?**
  _447 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `transaction.service.test.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08367071524966262 - nodes in this community are weakly interconnected._
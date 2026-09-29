# Graph Report - WEBPAC-INTERVE  (2026-09-29)

## Corpus Check
- 300 files · ~93,019 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 1379 nodes · 2964 edges · 101 communities (76 shown, 25 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `04f117f3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- transaction.service.test.js
- auth.service.js
- dependencies
- server/package.json
- ForgotPassword.jsx
- authContext.jsx
- permissions.service.js
- ProfileDialog.jsx
- usersApi.js
- masterRouter.utils.js
- auth.routes.js
- idempotency.service.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- session.service.js
- profiles.service.js
- compilerOptions
- @mui/material
- ref_prop_types
- react
- `tbl_users`
- app.js
- permissions.routes.js
- DataTable.jsx
- MainLayout/index.jsx
- transaction.service.js
- users.controller.test.js
- auth.controller.test.js
- mailerService.js
- master.service.js
- profiles.routes.js
- ProfilePage.jsx
- DocumentManagement.jsx
- AuthenticationRoutes.jsx
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
- useConfig
- handleFirebase.js
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
- themes/index.jsx
- extends
- ProfileSection/index.jsx
- browserslist
- volta
- volta
- users.service.test.js
- `tbl_identity_documents`
- StatusTabs.jsx
- InputLabel.jsx
- auth.service.test.js
- master.service.test.js
- permissions.controller.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 71 edges
2. `react` - 51 edges
3. `ComponentsOverrides()` - 27 edges
4. `useAuth()` - 25 edges
5. `writeAudit()` - 23 edges
6. `@tabler/icons-react` - 23 edges
7. `showError()` - 21 edges
8. `react-router-dom` - 20 edges
9. `withLockedTransaction()` - 19 edges
10. `auditContext()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `HorizontalBar()` --calls--> `MenuList()`  [EXTRACTED]
  client/src/layout/MainLayout/HorizontalBar.jsx → client/src/layout/MainLayout/MenuList/index.jsx
- `MenuList()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/layout/MainLayout/MenuList/index.jsx → client/src/contexts/authContext.jsx
- `MenuList()` --calls--> `NavGroup()`  [EXTRACTED]
  client/src/layout/MainLayout/MenuList/index.jsx → client/src/layout/MainLayout/MenuList/NavGroup/index.jsx
- `createMasterService()` --calls--> `withTransaction()`  [EXTRACTED]
  server/src/common/services/master.service.js → server/src/common/services/transaction.service.js
- `createSession()` --calls--> `withTransaction()`  [EXTRACTED]
  server/src/common/services/session.service.js → server/src/common/services/transaction.service.js

## Import Cycles
- None detected.

## Communities (101 total, 25 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.06
Nodes (39): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Avatar() (+31 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "transaction.service.test.js"
Cohesion: 0.08
Nodes (27): ref_fs, ref_path, ref_url, concurrencyError(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT (+19 more)

### Community 3 - "auth.service.js"
Cohesion: 0.11
Nodes (28): bcrypt, writeAudit(), getEffectivePermissionIds(), withTransaction(), comparePassword(), hashPassword(), deriveKey(), generateResetCode() (+20 more)

### Community 4 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+27 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+26 more)

### Community 6 - "ForgotPassword.jsx"
Cohesion: 0.33
Nodes (8): client_src_assets_images_logo_interve, AppBar(), ElevationScroll(), Logo(), AuthCardWrapper(), AuthWrapper1, ForgotPassword(), Login()

### Community 7 - "authContext.jsx"
Cohesion: 0.06
Nodes (49): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getNotificationCountAPI(), markAllAsReadAPI() (+41 more)

### Community 8 - "permissions.service.js"
Cohesion: 0.17
Nodes (11): AUDIT_ENTITIES, newOperationId(), withLockedTransaction(), deleteModuleDoc(), auditPermissionChanges(), ADR-0013, ADR-0027, updateProfilePermissions() (+3 more)

### Community 9 - "ProfileDialog.jsx"
Cohesion: 0.20
Nodes (13): getModulesAPI(), saveProfileAPI(), getProviderTypesSelectAPI, createMasterApi(), showSuccess(), BaseDialog(), MasterDialog, fallbackUuid() (+5 more)

### Community 10 - "usersApi.js"
Cohesion: 0.17
Nodes (12): getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), Accordion(), findOption(), flattenOptions(), GenericFormSection, PendingDropdownField() (+4 more)

### Community 11 - "masterRouter.utils.js"
Cohesion: 0.14
Nodes (16): jsonwebtoken, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), ACCESS_COOKIE_NAME, createMasterControllers(), createMasterRouter() (+8 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "idempotency.service.js"
Cohesion: 0.15
Nodes (18): ref_crypto, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused() (+10 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (22): axios, moment, name, packageManager, private, version, apexcharts, @emotion/react (+14 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.11
Nodes (13): admin, icons, dashboard, icons, menuItems, icons, other, icons (+5 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.20
Nodes (12): express-validator, createMasterSchemas(), idArray(), idempotencyKeyRule(), ADR-0001, ADR-0027, nullable, optionalId() (+4 more)

### Community 17 - "session.service.js"
Cohesion: 0.11
Nodes (26): ADR-0001, AUDIT_OPERATIONS, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken() (+18 more)

### Community 18 - "profiles.service.js"
Cohesion: 0.14
Nodes (16): DEFAULT_ROWS, MAX_ROWS, paginate(), resolvePagination(), toInt(), USER_NAME_SELECT, userFullName(), getSessionInfo() (+8 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "@mui/material"
Cohesion: 0.22
Nodes (15): appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard(), Avatar(), SamplePage() (+7 more)

### Community 21 - "ref_prop_types"
Cohesion: 0.23
Nodes (11): setParentOpenedMenu(), useMenuCollapse(), NavCollapse(), NavGroup(), NavItem(), Breadcrumbs(), BTitle(), @mui/icons-material (+3 more)

### Community 22 - "react"
Cohesion: 0.12
Nodes (6): ConfigProvider(), useLocalStorage(), lodash, react, ref_react_currency_input_field, react-easy-crop

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.14
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "permissions.routes.js"
Cohesion: 0.21
Nodes (14): PERMISSIONS, getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController() (+6 more)

### Community 26 - "DataTable.jsx"
Cohesion: 0.80
Nodes (3): ConfirmDialog(), DataTable(), TableActions()

### Community 27 - "MainLayout/index.jsx"
Cohesion: 0.20
Nodes (17): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), Footer(), Header(), MainLayout() (+9 more)

### Community 28 - "transaction.service.js"
Cohesion: 0.21
Nodes (11): ADR-0027, backoff(), buildLockPlan(), ISOLATION_LEVEL, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+3 more)

### Community 29 - "users.controller.test.js"
Cohesion: 0.14
Nodes (10): mockReq(), mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock, forgedAuthor, ADR-0013 (+2 more)

### Community 30 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "master.service.js"
Cohesion: 0.14
Nodes (17): ADR-0003, ADR-0006, ADR-0013, ACTIVE_STATUS, capitalize(), createMasterService(), defineMaster(), DELETED_STATUS (+9 more)

### Community 33 - "profiles.routes.js"
Cohesion: 0.18
Nodes (13): getIO(), IDEMPOTENCY_HEADER, insertNotification(), deleteProfileController(), getModulesController(), ADR-0027, paginationProfilesController(), saveProfileController() (+5 more)

### Community 34 - "ProfilePage.jsx"
Cohesion: 0.17
Nodes (18): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), showError(), FilterPopper(), normalizeOptions() (+10 more)

### Community 35 - "DocumentManagement.jsx"
Cohesion: 0.14
Nodes (12): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+4 more)

### Community 36 - "AuthenticationRoutes.jsx"
Cohesion: 0.22
Nodes (9): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), Loadable() (+1 more)

### Community 37 - "users.service.js"
Cohesion: 0.11
Nodes (20): DIAN_WEIGHTS, GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, nitCheckDigit(), assertAssignableProfile(), assertIdentification() (+12 more)

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
Cohesion: 0.08
Nodes (28): identityDocumentsApi, providerTypesApi, useAuth(), DashboardDefault, IdentityDocumentPage, MainRoutes, ProfilesPage, ProviderTypePage (+20 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "UserDialog.jsx"
Cohesion: 0.22
Nodes (11): getIdentityDocumentsSelectAPI, getProfilesAPI(), saveUserAPI(), defaultConfig, showInfo(), showObligatorios(), DIAN_WEIGHTS, identificationFormatError() (+3 more)

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "socket.js"
Cohesion: 0.31
Nodes (8): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), isSessionActive()

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
Cohesion: 0.15
Nodes (14): express, providerTypesRoutes, providerTypesConfig, providerTypesService, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController() (+6 more)

### Community 52 - "document.routes.js"
Cohesion: 0.26
Nodes (8): deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema, DOC_TYPES, paginationDocsSchema, saveDocSchema

### Community 53 - "prismaClient.js"
Cohesion: 0.09
Nodes (19): @prisma/adapter-mariadb, @prisma/client, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES (+11 more)

### Community 54 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 55 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 56 - "transaction.mock.js"
Cohesion: 0.15
Nodes (11): lockedIdsOf(), transactionRawMocks(), ADR-0008, prismaMock, ADR-0010, prismaMock, mockGetEffectivePermissionIds, mockGetIO (+3 more)

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

### Community 66 - "themes/index.jsx"
Cohesion: 0.29
Nodes (7): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ThemeCustomization(), buildPalette(), Typography()

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "ProfileSection/index.jsx"
Cohesion: 0.50
Nodes (5): ProfileSection(), HeaderAvatar(), MobileSearch(), SearchSection(), Transitions()

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
Cohesion: 0.25
Nodes (6): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_status`, `tbl_users`

### Community 93 - "StatusTabs.jsx"
Cohesion: 1.00
Nodes (3): chipBg(), chipText(), StatusTabs()

### Community 95 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 100 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 101 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

## Knowledge Gaps
- **421 isolated node(s):** `getProviderTypesSelectAPI`, `icons`, `COLUMNS`, `FILTERS`, `FORM_FIELDS` (+416 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 549 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `react` to `profiles.service.js`, `server/package.json`?**
  _High betweenness centrality (0.422) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `ForgotPassword.jsx`, `authContext.jsx`, `ProfileDialog.jsx`, `usersApi.js`, `client/package.json`, `ref_prop_types`, `react`, `DataTable.jsx`, `MainLayout/index.jsx`, `ProfilePage.jsx`, `DocumentManagement.jsx`, `AuthenticationRoutes.jsx`, `useAuth`, `UserDialog.jsx`, `useConfig`, `themes/index.jsx`, `ProfileSection/index.jsx`, `StatusTabs.jsx`, `InputLabel.jsx`?**
  _High betweenness centrality (0.253) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `themes/index.jsx`, `DocumentManagement.jsx`, `ProfileSection/index.jsx`, `AuthenticationRoutes.jsx`, `ForgotPassword.jsx`, `authContext.jsx`, `ProfilePage.jsx`, `ProfileDialog.jsx`, `usersApi.js`, `useAuth`, `UserDialog.jsx`, `client/package.json`, `useConfig`, `ref_prop_types`, `DataTable.jsx`, `MainLayout/index.jsx`, `StatusTabs.jsx`?**
  _High betweenness centrality (0.249) - this node is a cross-community bridge._
- **What connects `getProviderTypesSelectAPI`, `icons`, `COLUMNS` to the rest of the system?**
  _421 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.058384547848990345 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `transaction.service.test.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08367071524966262 - nodes in this community are weakly interconnected._
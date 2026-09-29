# Graph Report - WEBPAC-INTERVE  (2026-09-29)

## Corpus Check
- 290 files · ~91,004 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 1348 nodes · 2912 edges · 97 communities (73 shown, 24 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `38bfcda3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- transaction.service.test.js
- auth.service.js
- dependencies
- server/package.json
- ProfilePage.jsx
- authContext.jsx
- audit.service.js
- UserDialog.jsx
- UsersPage.jsx
- masterRouter.utils.js
- auth.routes.js
- idempotency.service.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- session.service.js
- master.service.js
- compilerOptions
- Shadow.jsx
- withAlpha
- themes/index.jsx
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
- colorUtils.js
- DocumentManagement.jsx
- SocketProvider.jsx
- users.service.js
- SimpleBar.jsx
- authjwt.middleware.test.js
- ref_jest_globals
- eslint.config.mjs
- devDependencies
- IdentityDocumentPage.jsx
- src/index.jsx
- identification.js
- scripts
- socket.js
- permissions.service.test.js
- EasyCrop.jsx
- server.js
- app.routes.js
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
- extends
- DebouncedInput.jsx
- browserslist
- volta
- volta
- `tbl_identity_documents`
- users.routes.js
- auth.service.test.js
- useAuth
- seed.js
- master.service.test.js
- permissions.controller.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 71 edges
2. `react` - 51 edges
3. `ComponentsOverrides()` - 27 edges
4. `writeAudit()` - 23 edges
5. `@tabler/icons-react` - 23 edges
6. `useAuth()` - 21 edges
7. `showError()` - 21 edges
8. `react-router-dom` - 20 edges
9. `auditContext()` - 19 edges
10. `MainCard()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `insertNotification()` --calls--> `getIO()`  [EXTRACTED]
  server/src/modules/app/notifications/notifications.service.js → server/src/common/configs/socket.manager.js
- `UserDialog` --calls--> `identificationFormatError()`  [EXTRACTED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/utils/identification.js
- `UserDialog` --indirect_call--> `getProfilesAPI()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/api/requests/profilesApi.js
- `UsersPage()` --calls--> `UserDialog`  [EXTRACTED]
  client/src/views/security/users/UsersPage.jsx → client/src/views/security/users/components/UserDialog.jsx

## Import Cycles
- None detected.

## Communities (97 total, 24 thin omitted)

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
Nodes (25): bcrypt, REDACTED, comparePassword(), hashPassword(), deriveKey(), generateResetCode(), hashResetCode(), ADR-0001 (+17 more)

### Community 4 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+27 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+26 more)

### Community 6 - "ProfilePage.jsx"
Cohesion: 0.14
Nodes (17): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient, LastModifiedCell() (+9 more)

### Community 7 - "authContext.jsx"
Cohesion: 0.06
Nodes (43): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), App() (+35 more)

### Community 8 - "audit.service.js"
Cohesion: 0.11
Nodes (26): AUDIT_ENTITIES, auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0013, ADR-0027, newOperationId() (+18 more)

### Community 9 - "UserDialog.jsx"
Cohesion: 0.12
Nodes (35): getIdentityDocumentsSelectAPI(), saveIdentityDocumentAPI(), getModulesAPI(), getProfilesAPI(), saveProfileAPI(), getBasicInformationAPI(), saveUserAPI(), updateAccountAPI() (+27 more)

### Community 10 - "UsersPage.jsx"
Cohesion: 0.23
Nodes (3): deleteUserAPI(), paginationUsersAPI(), UsersPage()

### Community 11 - "masterRouter.utils.js"
Cohesion: 0.14
Nodes (17): jsonwebtoken, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, ACCESS_COOKIE_NAME, createMasterControllers() (+9 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "idempotency.service.js"
Cohesion: 0.13
Nodes (20): ref_crypto, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused() (+12 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (23): axios, moment, name, packageManager, private, version, apexcharts, @emotion/react (+15 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.11
Nodes (13): admin, icons, dashboard, icons, menuItems, icons, other, icons (+5 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.15
Nodes (16): express-validator, createMasterSchemas(), idArray(), idempotencyKeyRule(), ADR-0001, ADR-0027, nullable, optionalId() (+8 more)

### Community 17 - "session.service.js"
Cohesion: 0.12
Nodes (24): ADR-0001, AUDIT_OPERATIONS, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken() (+16 more)

### Community 18 - "master.service.js"
Cohesion: 0.12
Nodes (22): ADR-0003, ACTIVE_STATUS, capitalize(), createMasterService(), DELETED_STATUS, httpError(), INACTIVE_STATUS, ADR-0013 (+14 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "Shadow.jsx"
Cohesion: 0.18
Nodes (14): DashboardDefault, gridSpacing, CardGrid(), CardSecondaryAction(), SubCard(), Avatar(), Dashboard(), testCards (+6 more)

### Community 21 - "withAlpha"
Cohesion: 0.33
Nodes (7): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), withAlpha()

### Community 22 - "themes/index.jsx"
Cohesion: 0.19
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage(), createCustomShadow() (+2 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.14
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "permissions.routes.js"
Cohesion: 0.21
Nodes (14): PERMISSIONS, getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController() (+6 more)

### Community 26 - "@mui/material"
Cohesion: 0.16
Nodes (11): ConfirmDialog(), DataTable(), BInputLabel, InputLabel(), chipBg(), chipText(), StatusTabs(), TableActions() (+3 more)

### Community 27 - "MainLayout/index.jsx"
Cohesion: 0.11
Nodes (33): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), setParentOpenedMenu(), useMenuCollapse() (+25 more)

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
Cohesion: 0.16
Nodes (13): defineMaster(), DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, nitCheckDigit() (+5 more)

### Community 33 - "profiles.routes.js"
Cohesion: 0.22
Nodes (11): getIO(), deleteProfileController(), getModulesController(), ADR-0027, paginationProfilesController(), saveProfileController(), profilesRoutes, deleteProfileSchema (+3 more)

### Community 34 - "colorUtils.js"
Cohesion: 0.48
Nodes (4): buildPalette(), defaultColor, extendPaletteWithChannels(), hexToRgbChannel()

### Community 35 - "DocumentManagement.jsx"
Cohesion: 0.09
Nodes (18): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+10 more)

### Community 36 - "SocketProvider.jsx"
Cohesion: 0.15
Nodes (16): refreshSession(), SocketContext, SocketProvider(), useSocket(), FilterPopper(), normalizeOptions(), SocketDropdownFilter(), RequiredLabel() (+8 more)

### Community 37 - "users.service.js"
Cohesion: 0.18
Nodes (13): assertAssignableProfile(), assertIdentification(), AUDITED_USER_FIELDS, checkIfUserExists(), ADR-0008, ADR-0013, ADR-0027, parsePageIds() (+5 more)

### Community 38 - "SimpleBar.jsx"
Cohesion: 0.47
Nodes (5): RootStyle, SimpleBarScroll(), SimpleBarStyle, react-device-detect, simplebar-react

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

### Community 43 - "IdentityDocumentPage.jsx"
Cohesion: 0.24
Nodes (9): changeStatusIdentityDocumentAPI(), deleteIdentityDocumentAPI(), paginationIdentityDocumentsAPI(), IdentityDocumentPage, ProfilesPage, UsersPage, IdentityDocumentPage(), initialFilters (+1 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "identification.js"
Cohesion: 0.67
Nodes (3): DIAN_WEIGHTS, identificationFormatError(), nitCheckDigit()

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "socket.js"
Cohesion: 0.31
Nodes (8): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), isSessionActive()

### Community 48 - "permissions.service.test.js"
Cohesion: 0.50
Nodes (3): mockGetEffectivePermissionIds, mockGetIO, prismaMock

### Community 50 - "server.js"
Cohesion: 0.24
Nodes (9): ref_http, node-cron, app, server, cronJobs, registeredTasks, startCronJobs(), stopCronJobs() (+1 more)

### Community 51 - "app.routes.js"
Cohesion: 0.26
Nodes (9): getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001, getStatusesByScopeSchema (+1 more)

### Community 53 - "prismaClient.js"
Cohesion: 0.13
Nodes (14): @prisma/adapter-mariadb, @prisma/client, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection() (+6 more)

### Community 54 - "notifications.routes.js"
Cohesion: 0.22
Nodes (13): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), insertNotification() (+5 more)

### Community 55 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 56 - "transaction.mock.js"
Cohesion: 0.16
Nodes (10): lockedIdsOf(), transactionRawMocks(), ADR-0008, prismaMock, ctx, prismaMock, baseUser, ctx (+2 more)

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

### Community 89 - "`tbl_identity_documents`"
Cohesion: 0.40
Nodes (4): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_status`

### Community 94 - "users.routes.js"
Cohesion: 0.20
Nodes (9): express, identityDocumentsRoutes, mainRoutes, countUsersController(), paginationUsersController(), usersRoutes, deleteUserSchema, listUsersSchema (+1 more)

### Community 95 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 96 - "useAuth"
Cohesion: 0.18
Nodes (16): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), useAuth(), NotificationSection(), ProfileSection(), HeaderAvatar() (+8 more)

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
- **408 isolated node(s):** `DIAN_WEIGHTS`, `ADR-0008`, `ACTIVE_STATUS`, `INACTIVE_STATUS`, `DELETED_STATUS` (+403 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 532 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `master.service.js`, `server/package.json`?**
  _High betweenness centrality (0.444) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `useAuth`, `colorUtils.js`, `DocumentManagement.jsx`, `DebouncedInput.jsx`, `SocketProvider.jsx`, `ProfilePage.jsx`, `authContext.jsx`, `SimpleBar.jsx`, `UserDialog.jsx`, `UsersPage.jsx`, `IdentityDocumentPage.jsx`, `client/package.json`, `EasyCrop.jsx`, `Shadow.jsx`, `withAlpha`, `themes/index.jsx`, `MainLayout/index.jsx`?**
  _High betweenness centrality (0.280) - this node is a cross-community bridge._
- **Why does `react` connect `@mui/material` to `useAuth`, `DocumentManagement.jsx`, `SocketProvider.jsx`, `DebouncedInput.jsx`, `ProfilePage.jsx`, `authContext.jsx`, `UserDialog.jsx`, `UsersPage.jsx`, `IdentityDocumentPage.jsx`, `client/package.json`, `EasyCrop.jsx`, `themes/index.jsx`, `MainLayout/index.jsx`?**
  _High betweenness centrality (0.264) - this node is a cross-community bridge._
- **What connects `DIAN_WEIGHTS`, `ADR-0008`, `ACTIVE_STATUS` to the rest of the system?**
  _408 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `transaction.service.test.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08367071524966262 - nodes in this community are weakly interconnected._
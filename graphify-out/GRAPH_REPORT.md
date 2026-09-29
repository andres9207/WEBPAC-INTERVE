# Graph Report - WEBPAC-INTERVE  (2026-09-29)

## Corpus Check
- 269 files · ~80,561 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 1264 nodes · 2703 edges · 88 communities (68 shown, 20 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 62 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d8f514b8`
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
- permissions.service.js
- ProfileDialog.jsx
- usersApi.js
- document.routes.js
- auth.routes.js
- idempotency.service.js
- client/package.json
- @mui/material
- validation.utils.js
- session.service.js
- users.service.js
- compilerOptions
- themes/index.jsx
- UserDialog.jsx
- ConfigContext.jsx
- `tbl_users`
- app.js
- permissions.routes.js
- menu-items/index.js
- withAlpha
- prismaClient.js
- users.controller.test.js
- auth.controller.test.js
- mailerService.js
- socket.js
- profiles.routes.js
- audit.service.js
- DocumentManagement.jsx
- SocketProvider.jsx
- authjwt.middleware.js
- users.routes.js
- authjwt.middleware.test.js
- ref_jest_globals
- eslint.config.mjs
- devDependencies
- GenericFormSection.jsx
- src/index.jsx
- permissions.controller.test.js
- scripts
- transaction.service.js
- handleFirebase.js
- formatTime.js
- server.js
- main.routes.js
- transaction.mock.js
- app.service.js
- notifications.routes.js
- session.service.test.js
- auth.service.test.js
- scripts
- winston.config.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- users.service.test.js
- extends
- DebouncedInput.jsx
- browserslist
- volta
- volta

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 69 edges
2. `react` - 49 edges
3. `ComponentsOverrides()` - 27 edges
4. `@tabler/icons-react` - 21 edges
5. `writeAudit()` - 21 edges
6. `react-router-dom` - 20 edges
7. `useAuth()` - 19 edges
8. `MainCard()` - 19 edges
9. `compilerOptions` - 17 edges
10. `useConfig()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `App()` --calls--> `SocketProvider()`  [EXTRACTED]
  client/src/App.jsx → client/src/socket/SocketProvider.jsx
- `App()` --calls--> `ThemeCustomization()`  [EXTRACTED]
  client/src/App.jsx → client/src/themes/index.jsx
- `UserDialog` --indirect_call--> `getProfilesAPI()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/api/requests/profilesApi.js
- `saveProfileAPI()` --calls--> `idempotencyConfig()`  [EXTRACTED]
  client/src/api/requests/profilesApi.js → client/src/utils/idempotency.js

## Import Cycles
- None detected.

## Communities (88 total, 20 thin omitted)

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
Cohesion: 0.19
Nodes (18): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), useAuth(), DataTable(), FilterPopper() (+10 more)

### Community 7 - "authContext.jsx"
Cohesion: 0.06
Nodes (47): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), App() (+39 more)

### Community 8 - "permissions.service.js"
Cohesion: 0.22
Nodes (9): newOperationId(), withLockedTransaction(), auditPermissionChanges(), ADR-0013, ADR-0027, updateProfilePermissions(), updateUserPermissions(), deleteProfile() (+1 more)

### Community 9 - "ProfileDialog.jsx"
Cohesion: 0.24
Nodes (15): getModulesAPI(), saveProfileAPI(), getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), showError(), showSuccess(), Accordion() (+7 more)

### Community 10 - "usersApi.js"
Cohesion: 0.12
Nodes (6): genericRequest, instance, NO_REFRESH_URLS, refreshClient, ref_axios, js-cookie

### Community 11 - "document.routes.js"
Cohesion: 0.33
Nodes (5): requirePermission(), hasEffectivePermission(), deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc()

### Community 12 - "auth.routes.js"
Cohesion: 0.18
Nodes (21): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+13 more)

### Community 13 - "idempotency.service.js"
Cohesion: 0.13
Nodes (20): ref_crypto, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused() (+12 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (22): axios, moment, name, packageManager, private, version, apexcharts, @emotion/react (+14 more)

### Community 15 - "@mui/material"
Cohesion: 0.05
Nodes (71): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI() (+63 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.13
Nodes (16): express-validator, idempotencyKeyRule(), ADR-0001, ADR-0027, nullable, optionalId(), optionalText(), paginationRules() (+8 more)

### Community 17 - "session.service.js"
Cohesion: 0.16
Nodes (19): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+11 more)

### Community 18 - "users.service.js"
Cohesion: 0.09
Nodes (27): AUDIT_ENTITIES, AUDIT_OPERATIONS, DEFAULT_ROWS, MAX_ROWS, paginate(), resolvePagination(), toInt(), USER_NAME_SELECT (+19 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "themes/index.jsx"
Cohesion: 0.33
Nodes (6): createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor, Typography()

### Community 21 - "UserDialog.jsx"
Cohesion: 0.31
Nodes (7): getProfilesAPI(), saveUserAPI(), defaultConfig, showInfo(), showObligatorios(), UserDialog, react-toastify

### Community 22 - "ConfigContext.jsx"
Cohesion: 0.27
Nodes (7): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage()

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.14
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "permissions.routes.js"
Cohesion: 0.21
Nodes (14): PERMISSIONS, idArray(), getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController() (+6 more)

### Community 26 - "menu-items/index.js"
Cohesion: 0.15
Nodes (11): dashboard, icons, menuItems, icons, other, icons, pages, icons (+3 more)

### Community 27 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 28 - "prismaClient.js"
Cohesion: 0.13
Nodes (13): @prisma/adapter-mariadb, @prisma/client, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, STATUSES, VIEW_PERMISSIONS, adapter (+5 more)

### Community 29 - "users.controller.test.js"
Cohesion: 0.14
Nodes (10): mockReq(), mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock, forgedAuthor, ADR-0013 (+2 more)

### Community 30 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "socket.js"
Cohesion: 0.31
Nodes (7): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO()

### Community 33 - "profiles.routes.js"
Cohesion: 0.27
Nodes (9): IDEMPOTENCY_HEADER, deleteProfileController(), getModulesController(), ADR-0027, paginationProfilesController(), deleteProfileSchema, getModulesSchema, paginationProfilesSchema (+1 more)

### Community 34 - "audit.service.js"
Cohesion: 0.21
Nodes (15): auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0013, ADR-0027, protect(), SENSITIVE_FIELDS (+7 more)

### Community 35 - "DocumentManagement.jsx"
Cohesion: 0.23
Nodes (15): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+7 more)

### Community 36 - "SocketProvider.jsx"
Cohesion: 0.21
Nodes (10): refreshSession(), SocketContext, SocketProvider(), TooltipLongText(), pathSocket, STATUS_OPTIONS, toNlBr(), truncateText() (+2 more)

### Community 37 - "authjwt.middleware.js"
Cohesion: 0.50
Nodes (4): jsonwebtoken, verifyToken(), ACCESS_COOKIE_NAME, isSessionActive()

### Community 38 - "users.routes.js"
Cohesion: 0.22
Nodes (8): validate(), countUsersController(), deleteUserController(), ADR-0001, ADR-0027, paginationUsersController(), saveUserController(), mockValidationResult

### Community 39 - "authjwt.middleware.test.js"
Cohesion: 0.33
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 40 - "ref_jest_globals"
Cohesion: 0.15
Nodes (6): ref_jest_globals, prismaMock, prismaMock, txMock, prismaMock, payload

### Community 41 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 43 - "GenericFormSection.jsx"
Cohesion: 0.38
Nodes (8): useSocket(), findOption(), flattenOptions(), GenericFormSection, PendingDropdownField(), RequiredLabel(), RequiredLabel(), SelectSocket()

### Community 44 - "src/index.jsx"
Cohesion: 0.18
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "transaction.service.js"
Cohesion: 0.22
Nodes (12): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+4 more)

### Community 48 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 50 - "server.js"
Cohesion: 0.24
Nodes (9): ref_http, node-cron, app, server, cronJobs, registeredTasks, startCronJobs(), stopCronJobs() (+1 more)

### Community 51 - "main.routes.js"
Cohesion: 0.14
Nodes (16): moduleDocsRoutes, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+8 more)

### Community 52 - "transaction.mock.js"
Cohesion: 0.24
Nodes (7): lockedIdsOf(), transactionRawMocks(), mockGetEffectivePermissionIds, mockGetIO, prismaMock, ctx, prismaMock

### Community 53 - "app.service.js"
Cohesion: 0.27
Nodes (6): getEffectivePermissionIds(), getMenu(), getSessionInfo(), PAGE_SELECT, toChild(), toParent()

### Community 54 - "notifications.routes.js"
Cohesion: 0.19
Nodes (15): express, getIO(), getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, getNotificationCount() (+7 more)

### Community 55 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 56 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

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

### Community 66 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

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

## Knowledge Gaps
- **365 isolated node(s):** `__filename`, `__dirname`, `compat`, `target`, `useDefineForClassFields` (+360 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 478 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `users.service.js`, `server/package.json`?**
  _High betweenness centrality (0.444) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `DocumentManagement.jsx`, `DebouncedInput.jsx`, `SocketProvider.jsx`, `ProfilePage.jsx`, `authContext.jsx`, `ProfileDialog.jsx`, `GenericFormSection.jsx`, `client/package.json`, `themes/index.jsx`, `UserDialog.jsx`, `withAlpha`?**
  _High betweenness centrality (0.299) - this node is a cross-community bridge._
- **Why does `react` connect `@mui/material` to `DocumentManagement.jsx`, `SocketProvider.jsx`, `DebouncedInput.jsx`, `ProfilePage.jsx`, `authContext.jsx`, `ProfileDialog.jsx`, `GenericFormSection.jsx`, `client/package.json`, `themes/index.jsx`, `UserDialog.jsx`, `ConfigContext.jsx`?**
  _High betweenness centrality (0.238) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `compat` to the rest of the system?**
  _365 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `transaction.service.test.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08367071524966262 - nodes in this community are weakly interconnected._
# Graph Report - WEBPAC-INTERVE  (2026-09-29)

## Corpus Check
- 284 files · ~86,777 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 1328 nodes · 2855 edges · 93 communities (68 shown, 25 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 69 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `aeb9ab1b`
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
- profiles.service.js
- AccountSettings.jsx
- usersApi.js
- document.routes.js
- auth.routes.js
- idempotency.service.js
- client/package.json
- ref_prop_types
- users.routes.js
- session.service.js
- identityDocuments.service.js
- compilerOptions
- MainCard
- UserDialog.jsx
- themes/index.jsx
- `tbl_users`
- app.js
- permissions.routes.js
- @mui/material
- withAlpha
- transaction.service.js
- profiles.controller.test.js
- auth.controller.test.js
- mailerService.js
- identityDocuments.routes.js
- profiles.routes.js
- audit.service.js
- DocumentManagement.jsx
- SocketProvider.jsx
- users.service.js
- validate.middleware.js
- authjwt.middleware.test.js
- ref_jest_globals
- eslint.config.mjs
- devDependencies
- IdentityDocumentPage.jsx
- src/index.jsx
- NotificationSection/index.jsx
- scripts
- SimpleBar.jsx
- handleFirebase.js
- formatTime.js
- server.js
- app.routes.js
- profiles.service.test.js
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
- users.controller.test.js
- `tbl_identity_documents`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 71 edges
2. `react` - 51 edges
3. `ComponentsOverrides()` - 27 edges
4. `@tabler/icons-react` - 23 edges
5. `writeAudit()` - 21 edges
6. `useAuth()` - 21 edges
7. `showError()` - 21 edges
8. `withLockedTransaction()` - 20 edges
9. `react-router-dom` - 20 edges
10. `MainCard()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `saveIdentityDocumentAPI()` --calls--> `idempotencyConfig()`  [EXTRACTED]
  client/src/api/requests/identityDocumentsApi.js → client/src/utils/idempotency.js
- `MenuList()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/layout/MainLayout/MenuList/index.jsx → client/src/contexts/authContext.jsx
- `IdentityDocumentPage()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/views/admin/identityDocuments/IdentityDocumentPage.jsx → client/src/contexts/authContext.jsx
- `IdentityDocumentPage()` --calls--> `showError()`  [EXTRACTED]
  client/src/views/admin/identityDocuments/IdentityDocumentPage.jsx → client/src/services/ToastService.js

## Import Cycles
- None detected.

## Communities (93 total, 25 thin omitted)

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
Nodes (27): bcrypt, writeAudit(), withTransaction(), comparePassword(), hashPassword(), deriveKey(), generateResetCode(), hashResetCode() (+19 more)

### Community 4 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+27 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+26 more)

### Community 6 - "ProfilePage.jsx"
Cohesion: 0.16
Nodes (20): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), useAuth(), IdentityDocumentPage, ProfilesPage (+12 more)

### Community 7 - "authContext.jsx"
Cohesion: 0.06
Nodes (44): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), App() (+36 more)

### Community 8 - "profiles.service.js"
Cohesion: 0.13
Nodes (16): AUDIT_ENTITIES, newOperationId(), withLockedTransaction(), auditPermissionChanges(), ADR-0013, ADR-0027, updateProfilePermissions(), updateUserPermissions() (+8 more)

### Community 9 - "AccountSettings.jsx"
Cohesion: 0.24
Nodes (14): getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), showSuccess(), Accordion(), BaseDialog(), findOption(), flattenOptions() (+6 more)

### Community 10 - "usersApi.js"
Cohesion: 0.14
Nodes (5): genericRequest, instance, NO_REFRESH_URLS, refreshClient, ref_axios

### Community 11 - "document.routes.js"
Cohesion: 0.21
Nodes (10): requirePermission(), hasEffectivePermission(), IDEMPOTENCY_HEADER, deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema (+2 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "idempotency.service.js"
Cohesion: 0.11
Nodes (20): ref_crypto, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused() (+12 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (21): axios, moment, name, packageManager, private, version, apexcharts, @emotion/react (+13 more)

### Community 15 - "ref_prop_types"
Cohesion: 0.06
Nodes (54): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), setParentOpenedMenu(), useMenuCollapse() (+46 more)

### Community 16 - "users.routes.js"
Cohesion: 0.12
Nodes (16): express-validator, idempotencyKeyRule(), ADR-0001, ADR-0027, nullable, optionalText(), paginationRules(), requiredId() (+8 more)

### Community 17 - "session.service.js"
Cohesion: 0.10
Nodes (27): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+19 more)

### Community 18 - "identityDocuments.service.js"
Cohesion: 0.12
Nodes (20): DEFAULT_ROWS, MAX_ROWS, paginate(), resolvePagination(), toInt(), USER_NAME_SELECT, userFullName(), deleteIdentityDocument() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "MainCard"
Cohesion: 0.12
Nodes (22): closedMixin(), MiniDrawerStyled, openedMixin(), DashboardDefault, appDrawerWidth, drawerWidth, gridSpacing, CardGrid() (+14 more)

### Community 21 - "UserDialog.jsx"
Cohesion: 0.19
Nodes (16): getIdentityDocumentsSelectAPI(), getModulesAPI(), getProfilesAPI(), saveProfileAPI(), saveUserAPI(), defaultConfig, showInfo(), showObligatorios() (+8 more)

### Community 22 - "themes/index.jsx"
Cohesion: 0.18
Nodes (12): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage(), createCustomShadow() (+4 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (15): compression, cookie-parser, cors, express, express-fileupload, express-rate-limit, helmet, __dirname (+7 more)

### Community 25 - "permissions.routes.js"
Cohesion: 0.19
Nodes (15): PERMISSIONS, idArray(), getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController() (+7 more)

### Community 26 - "@mui/material"
Cohesion: 0.21
Nodes (6): ConfirmDialog(), DataTable(), TableActions(), @mui/material, react, react-easy-crop

### Community 27 - "withAlpha"
Cohesion: 0.23
Nodes (10): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), defaultColor, extendPaletteWithChannels() (+2 more)

### Community 28 - "transaction.service.js"
Cohesion: 0.08
Nodes (25): @prisma/adapter-mariadb, @prisma/client, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, STATUSES, VIEW_PERMISSIONS (+17 more)

### Community 29 - "profiles.controller.test.js"
Cohesion: 0.16
Nodes (8): mockReq(), forgedAuthor, serviceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock

### Community 30 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "identityDocuments.routes.js"
Cohesion: 0.21
Nodes (11): deleteIdentityDocumentController(), getIdentityDocumentsSelectController(), ADR-0027, paginationIdentityDocumentsController(), saveIdentityDocumentController(), identityDocumentsRoutes, deleteIdentityDocumentSchema, getIdentityDocumentsSelectSchema (+3 more)

### Community 33 - "profiles.routes.js"
Cohesion: 0.20
Nodes (13): getIO(), optionalId(), insertNotification(), deleteProfileController(), getModulesController(), ADR-0027, paginationProfilesController(), saveProfileController() (+5 more)

### Community 34 - "audit.service.js"
Cohesion: 0.13
Nodes (20): ADR-0001, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0013, ADR-0027 (+12 more)

### Community 35 - "DocumentManagement.jsx"
Cohesion: 0.32
Nodes (11): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+3 more)

### Community 36 - "SocketProvider.jsx"
Cohesion: 0.15
Nodes (16): refreshSession(), SocketContext, SocketProvider(), useSocket(), FilterPopper(), normalizeOptions(), SocketDropdownFilter(), RequiredLabel() (+8 more)

### Community 37 - "users.service.js"
Cohesion: 0.18
Nodes (13): assertAssignableIdentityDocument(), assertAssignableProfile(), AUDITED_USER_FIELDS, checkIfUserExists(), ADR-0008, ADR-0013, ADR-0027, parsePageIds() (+5 more)

### Community 39 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 40 - "ref_jest_globals"
Cohesion: 0.14
Nodes (8): ref_jest_globals, prismaMock, prismaMock, txMock, prismaMock, forged, ADR-0013, permissionsServiceMock

### Community 41 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 43 - "IdentityDocumentPage.jsx"
Cohesion: 0.32
Nodes (9): deleteIdentityDocumentAPI(), paginationIdentityDocumentsAPI(), saveIdentityDocumentAPI(), STATUS_OPTIONS, EMPTY_FORM, IdentityDocumentDialog, ADR-0008, IdentityDocumentPage() (+1 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "NotificationSection/index.jsx"
Cohesion: 0.67
Nodes (5): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection()

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "SimpleBar.jsx"
Cohesion: 0.47
Nodes (5): RootStyle, SimpleBarScroll(), SimpleBarStyle, react-device-detect, simplebar-react

### Community 48 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 50 - "server.js"
Cohesion: 0.24
Nodes (9): ref_http, node-cron, app, server, cronJobs, registeredTasks, startCronJobs(), stopCronJobs() (+1 more)

### Community 51 - "app.routes.js"
Cohesion: 0.26
Nodes (9): getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001, getStatusesByScopeSchema (+1 more)

### Community 53 - "app.service.js"
Cohesion: 0.27
Nodes (6): getEffectivePermissionIds(), getMenu(), getSessionInfo(), PAGE_SELECT, toChild(), toParent()

### Community 54 - "notifications.routes.js"
Cohesion: 0.19
Nodes (14): verifyToken(), isSessionActive(), getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes (+6 more)

### Community 55 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 56 - "auth.service.test.js"
Cohesion: 0.13
Nodes (13): lockedIdsOf(), transactionRawMocks(), createArgs, prismaMock, activeUser, mockComparePassword, mockHashPassword, mockRevokeSession (+5 more)

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

### Community 88 - "users.controller.test.js"
Cohesion: 0.33
Nodes (4): forgedAuthor, ADR-0013, mockRevokeSession, usersServiceMock

### Community 89 - "`tbl_identity_documents`"
Cohesion: 0.40
Nodes (4): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_status`

## Knowledge Gaps
- **395 isolated node(s):** `icons`, `initialFilters`, `EMPTY_FORM`, `ADR-0008`, `ADR-0008` (+390 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 518 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `profiles.service.js`, `server/package.json`?**
  _High betweenness centrality (0.433) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `DocumentManagement.jsx`, `DebouncedInput.jsx`, `SocketProvider.jsx`, `ProfilePage.jsx`, `authContext.jsx`, `AccountSettings.jsx`, `IdentityDocumentPage.jsx`, `NotificationSection/index.jsx`, `client/package.json`, `ref_prop_types`, `SimpleBar.jsx`, `MainCard`, `UserDialog.jsx`, `themes/index.jsx`, `withAlpha`?**
  _High betweenness centrality (0.271) - this node is a cross-community bridge._
- **Why does `react` connect `@mui/material` to `DocumentManagement.jsx`, `SocketProvider.jsx`, `DebouncedInput.jsx`, `ProfilePage.jsx`, `authContext.jsx`, `AccountSettings.jsx`, `IdentityDocumentPage.jsx`, `NotificationSection/index.jsx`, `client/package.json`, `ref_prop_types`, `UserDialog.jsx`, `themes/index.jsx`?**
  _High betweenness centrality (0.221) - this node is a cross-community bridge._
- **What connects `icons`, `initialFilters`, `EMPTY_FORM` to the rest of the system?**
  _395 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `transaction.service.test.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08367071524966262 - nodes in this community are weakly interconnected._
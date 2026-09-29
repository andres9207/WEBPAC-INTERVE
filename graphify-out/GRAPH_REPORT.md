# Graph Report - WEBPAC-INTERVE  (2026-09-29)

## Corpus Check
- 316 files · ~96,233 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 1430 nodes · 3082 edges · 110 communities (81 shown, 29 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6366bc86`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- transaction.service.js
- auth.service.js
- dependencies
- server/package.json
- withAlpha
- AuthForgotPassword.jsx
- usersApi.js
- App.jsx
- showError
- NotificationSection/index.jsx
- auth.routes.js
- idempotency.service.js
- client/package.json
- MasterPage.jsx
- validation.utils.js
- session.service.js
- master.service.js
- compilerOptions
- ref_prop_types
- themes/index.jsx
- ConfigContext.jsx
- `tbl_users`
- app.js
- permissions.routes.js
- DataTable.jsx
- react
- react-router-dom
- users.controller.test.js
- requests/index.js
- mailerService.js
- AuthenticationRoutes.jsx
- profiles.routes.js
- document.routes.js
- ProfileDialog.jsx
- authjwt.middleware.test.js
- users.service.js
- audit.service.js
- ProfilePage.jsx
- ref_jest_globals
- eslint.config.mjs
- devDependencies
- useAuth
- src/index.jsx
- UserDialog.jsx
- scripts
- main.routes.js
- DebouncedInput.jsx
- handleFirebaseDocs.js
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
- DocumentManagement.jsx
- extends
- socket.js
- browserslist
- volta
- volta
- users.service.test.js
- `tbl_identity_documents`
- authContext.jsx
- @mui/material
- auth.service.test.js
- ToastService.js
- StatusChip.jsx
- auth.controller.test.js
- Default/index.jsx
- ImageList.jsx
- master.service.test.js
- SearchSection/index.jsx
- addressTypes.service.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 72 edges
2. `react` - 52 edges
3. `useAuth()` - 29 edges
4. `ComponentsOverrides()` - 27 edges
5. `@tabler/icons-react` - 24 edges
6. `writeAudit()` - 23 edges
7. `showError()` - 21 edges
8. `MasterPage()` - 20 edges
9. `react-router-dom` - 20 edges
10. `auditContext()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `MasterPage()` --calls--> `showError()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/services/ToastService.js
- `MasterPage()` --calls--> `showSuccess()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/services/ToastService.js
- `MasterPage()` --calls--> `MainCard()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/ui-component/cards/MainCard.jsx
- `MasterPage()` --calls--> `DataTable()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/ui-component/extended/DataTable.jsx

## Import Cycles
- None detected.

## Communities (110 total, 29 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "transaction.service.js"
Cohesion: 0.06
Nodes (37): ref_fs, ref_path, @prisma/client, ref_url, concurrencyError(), errorMiddleware(), isMySqlCode(), ADR-0027 (+29 more)

### Community 3 - "auth.service.js"
Cohesion: 0.10
Nodes (27): bcrypt, backoff(), runTransaction(), withTransaction(), comparePassword(), hashPassword(), deriveKey(), generateResetCode() (+19 more)

### Community 4 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+27 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+26 more)

### Community 6 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 7 - "AuthForgotPassword.jsx"
Cohesion: 0.18
Nodes (15): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), defaultColor, AnimateButton(), CustomFormControl, hasMixed(), hasNumber() (+7 more)

### Community 8 - "usersApi.js"
Cohesion: 0.13
Nodes (7): updatePasswordAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient, ref_axios, js-cookie

### Community 9 - "App.jsx"
Cohesion: 0.09
Nodes (24): refreshSession(), App(), AuthContext, NavigationScroll(), AuthenticationRoutes, router, MainRoutes, SocketContext (+16 more)

### Community 10 - "showError"
Cohesion: 0.31
Nodes (12): getBasicInformationAPI(), updateAccountAPI(), showError(), Accordion(), findOption(), flattenOptions(), GenericFormSection, PendingDropdownField() (+4 more)

### Community 11 - "NotificationSection/index.jsx"
Cohesion: 0.67
Nodes (5): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection()

### Community 12 - "auth.routes.js"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "idempotency.service.js"
Cohesion: 0.11
Nodes (20): ref_crypto, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused() (+12 more)

### Community 14 - "client/package.json"
Cohesion: 0.10
Nodes (20): axios, moment, name, packageManager, private, version, apexcharts, @emotion/react (+12 more)

### Community 15 - "MasterPage.jsx"
Cohesion: 0.11
Nodes (15): admin, icons, dashboard, icons, menuItems, icons, other, icons (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.19
Nodes (13): express-validator, createMasterSchemas(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0009, ADR-0027, nullable (+5 more)

### Community 17 - "session.service.js"
Cohesion: 0.11
Nodes (26): ADR-0001, AUDIT_OPERATIONS, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken() (+18 more)

### Community 18 - "master.service.js"
Cohesion: 0.11
Nodes (27): newOperationId(), ACTIVE_STATUS, capitalize(), createMasterService(), DELETED_STATUS, httpError(), INACTIVE_STATUS, ADR-0003 (+19 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "ref_prop_types"
Cohesion: 0.18
Nodes (14): gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard(), Avatar(), SamplePage(), ColorBox() (+6 more)

### Community 21 - "themes/index.jsx"
Cohesion: 0.26
Nodes (9): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+1 more)

### Community 22 - "ConfigContext.jsx"
Cohesion: 0.32
Nodes (5): ConfigContext, ConfigProvider(), useLocalStorage(), BInputLabel, InputLabel()

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.14
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "permissions.routes.js"
Cohesion: 0.15
Nodes (17): PERMISSIONS, getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController() (+9 more)

### Community 26 - "DataTable.jsx"
Cohesion: 0.80
Nodes (3): ConfirmDialog(), DataTable(), TableActions()

### Community 27 - "react"
Cohesion: 0.18
Nodes (17): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), setParentOpenedMenu(), useMenuCollapse(), ElevationScroll() (+9 more)

### Community 28 - "react-router-dom"
Cohesion: 0.30
Nodes (9): client_src_assets_images_logo_interve, AppBar(), ElevationScroll(), Logo(), AuthCardWrapper(), AuthWrapper1, ForgotPassword(), Login() (+1 more)

### Community 29 - "users.controller.test.js"
Cohesion: 0.14
Nodes (10): mockReq(), mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock, forgedAuthor, ADR-0013 (+2 more)

### Community 30 - "requests/index.js"
Cohesion: 0.22
Nodes (8): addressTypesApi, getAddressTypesSelectAPI, identityDocumentsApi, getInsurersSelectAPI, insurersApi, getProviderTypesSelectAPI, providerTypesApi, createMasterApi()

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "AuthenticationRoutes.jsx"
Cohesion: 0.24
Nodes (8): MinimalLayout(), ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), Loadable(), Loader()

### Community 33 - "profiles.routes.js"
Cohesion: 0.18
Nodes (13): getIO(), IDEMPOTENCY_HEADER, insertNotification(), deleteProfileController(), getModulesController(), ADR-0027, paginationProfilesController(), saveProfileController() (+5 more)

### Community 34 - "document.routes.js"
Cohesion: 0.26
Nodes (8): deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema, DOC_TYPES, paginationDocsSchema, saveDocSchema

### Community 35 - "ProfileDialog.jsx"
Cohesion: 0.29
Nodes (10): getModulesAPI(), saveProfileAPI(), BaseDialog(), MasterDialog, fallbackUuid(), idempotencyConfig(), ADR-0027, newIdempotencyKey() (+2 more)

### Community 36 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 37 - "users.service.js"
Cohesion: 0.09
Nodes (26): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, nitCheckDigit(), identityDocumentsRoutes (+18 more)

### Community 38 - "audit.service.js"
Cohesion: 0.11
Nodes (25): AUDIT_ENTITIES, auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0013, ADR-0027, protect() (+17 more)

### Community 39 - "ProfilePage.jsx"
Cohesion: 0.22
Nodes (15): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), ProfilesPage, UsersPage, LastModifiedCell(), SearchInput() (+7 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.17
Nodes (6): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock

### Community 41 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 43 - "useAuth"
Cohesion: 0.10
Nodes (24): useAuth(), AddressTypePage, IdentityDocumentPage, InsurerPage, ProviderTypePage, PrivateRoute(), MasterPage(), AddressTypePage() (+16 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "UserDialog.jsx"
Cohesion: 0.33
Nodes (8): getIdentityDocumentsSelectAPI, getProfilesAPI(), saveUserAPI(), DIAN_WEIGHTS, identificationFormatError(), nitCheckDigit(), ADR-0008, UserDialog

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "main.routes.js"
Cohesion: 0.12
Nodes (17): ADR-0006, ADR-0018, express, defineMaster(), addressTypesRoutes, addressTypesConfig, addressTypesService, ADR-0009 (+9 more)

### Community 49 - "handleFirebaseDocs.js"
Cohesion: 0.18
Nodes (10): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+2 more)

### Community 50 - "server.js"
Cohesion: 0.24
Nodes (9): ref_http, node-cron, app, server, cronJobs, registeredTasks, startCronJobs(), stopCronJobs() (+1 more)

### Community 51 - "app.routes.js"
Cohesion: 0.26
Nodes (9): getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001, getStatusesByScopeSchema (+1 more)

### Community 52 - "masterRouter.utils.js"
Cohesion: 0.14
Nodes (16): jsonwebtoken, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), ACCESS_COOKIE_NAME, createMasterControllers(), createMasterRouter() (+8 more)

### Community 53 - "prismaClient.js"
Cohesion: 0.08
Nodes (21): @prisma/adapter-mariadb, ADDRESS_TYPES, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES (+13 more)

### Community 54 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 55 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 56 - "transaction.mock.js"
Cohesion: 0.13
Nodes (13): lockedIdsOf(), transactionRawMocks(), ADR-0008, prismaMock, ADR-0003, prismaMock, ADR-0010, prismaMock (+5 more)

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

### Community 66 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (8): paginationDocsApi(), showPromise(), DocumentManagement(), FileRow(), getFileIcon(), getFileSize(), formatNotificationDateTime(), date-fns

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "socket.js"
Cohesion: 0.31
Nodes (8): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), isSessionActive()

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

### Community 93 - "authContext.jsx"
Cohesion: 0.33
Nodes (6): loginAPI(), logoutAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), AuthProvider(), getStoredUser()

### Community 94 - "@mui/material"
Cohesion: 0.15
Nodes (17): handlerDrawerOpen(), Footer(), Header(), ProfileSection(), MainLayout(), LogoSection(), MainContentStyled, Sidebar() (+9 more)

### Community 95 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 100 - "ToastService.js"
Cohesion: 0.31
Nodes (6): defaultConfig, showInfo(), showObligatorios(), showSuccess(), PermissionsDrawer(), react-toastify

### Community 101 - "StatusChip.jsx"
Cohesion: 0.38
Nodes (4): getStatusesByScopeAPI(), CACHE_PENDING, STATUS_CACHE, StatusChip()

### Community 104 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 105 - "Default/index.jsx"
Cohesion: 0.47
Nodes (4): DashboardDefault, CardGrid(), Dashboard(), testCards

### Community 106 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 107 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 108 - "SearchSection/index.jsx"
Cohesion: 0.70
Nodes (4): HeaderAvatar(), MobileSearch(), SearchSection(), material-ui-popup-state

## Knowledge Gaps
- **437 isolated node(s):** `STATUS_NAMES`, `STATUS_TABS`, `COLUMNS`, `FORM_FIELDS`, `ADR-0009` (+432 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 571 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `master.service.js`, `server/package.json`?**
  _High betweenness centrality (0.412) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `withAlpha`, `AuthForgotPassword.jsx`, `App.jsx`, `showError`, `NotificationSection/index.jsx`, `client/package.json`, `MasterPage.jsx`, `ref_prop_types`, `themes/index.jsx`, `ConfigContext.jsx`, `DataTable.jsx`, `react`, `react-router-dom`, `AuthenticationRoutes.jsx`, `ProfileDialog.jsx`, `ProfilePage.jsx`, `useAuth`, `UserDialog.jsx`, `DebouncedInput.jsx`, `DocumentManagement.jsx`, `ToastService.js`, `StatusChip.jsx`, `Default/index.jsx`, `ImageList.jsx`, `SearchSection/index.jsx`?**
  _High betweenness centrality (0.246) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `AuthForgotPassword.jsx`, `App.jsx`, `showError`, `NotificationSection/index.jsx`, `client/package.json`, `MasterPage.jsx`, `ref_prop_types`, `themes/index.jsx`, `ConfigContext.jsx`, `DataTable.jsx`, `react-router-dom`, `AuthenticationRoutes.jsx`, `ProfileDialog.jsx`, `ProfilePage.jsx`, `useAuth`, `UserDialog.jsx`, `DebouncedInput.jsx`, `DocumentManagement.jsx`, `authContext.jsx`, `@mui/material`, `ToastService.js`, `StatusChip.jsx`, `SearchSection/index.jsx`?**
  _High betweenness centrality (0.210) - this node is a cross-community bridge._
- **What connects `STATUS_NAMES`, `STATUS_TABS`, `COLUMNS` to the rest of the system?**
  _437 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `transaction.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0636734693877551 - nodes in this community are weakly interconnected._
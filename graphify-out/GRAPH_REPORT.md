# Graph Report - WEBPAC-INTERVE  (2026-10-01)

## Corpus Check
- 367 files · ~117,884 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 1687 nodes · 3751 edges · 136 communities (94 shown, 42 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 71 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `06a0be50`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- images.js
- auth.service.js
- dependencies
- server/package.json
- withAlpha
- AuthForgotPassword.jsx
- ProfilePage.jsx
- WorkFormPage.jsx
- showError
- audit.service.js
- auth.routes.js
- useAuth
- client/package.json
- @tabler/icons-react
- validation.utils.js
- session.service.js
- constant.js
- compilerOptions
- MainCard
- themes/index.jsx
- ConfigContext.jsx
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- react
- document.routes.js
- masterRouter.utils.test.js
- requests/index.js
- mailerService.js
- users.service.js
- seed.js
- idempotency.service.js
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- notifications.routes.js
- UserDialog.jsx
- @mui/material
- ref_jest_globals
- eslint.config.mjs
- devDependencies
- usersApi.js
- src/index.jsx
- NotificationSection/index.jsx
- scripts
- main.routes.js
- authContext.jsx
- identityDocuments.service.js
- server.js
- app.routes.js
- constants.js
- master.service.js
- error.middleware.js
- session.service.test.js
- transaction.mock.js
- scripts
- WorkDetailPage.jsx
- winston.config.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- DebouncedInput.jsx
- extends
- formatNumber.js
- browserslist
- volta
- volta
- users.service.test.js
- `tbl_status`
- SupervisionTypePage.jsx
- auth.service.test.js
- masterRouter.utils.js
- AppBar.jsx
- `tbl_works`
- term.utils.js
- react-router-dom
- transaction.service.js
- `tbl_address_types`
- `tbl_works`
- `tbl_identity_documents`
- `tbl_insurers`
- `tbl_provider_types`
- formatTime.js
- AddressTypePage.jsx
- ProviderTypePage.jsx
- socket.js
- providerTypes.service.js
- addressTypes.service.js
- works.service.test.js
- ImageList.jsx
- permissions.routes.js
- transaction.service.test.js
- handleFirebase.js
- App.jsx
- prisma
- permissions.controller.test.js
- MainRoutes.jsx
- authjwt.middleware.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 81 edges
2. `react` - 58 edges
3. `useAuth()` - 41 edges
4. `@tabler/icons-react` - 31 edges
5. `writeAudit()` - 29 edges
6. `MasterPage()` - 28 edges
7. `ComponentsOverrides()` - 27 edges
8. `showError()` - 27 edges
9. `showSuccess()` - 25 edges
10. `WorkFormPage()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `Section()` --calls--> `SubCard()`  [EXTRACTED]
  client/src/views/work/works/WorkFormPage.jsx → client/src/ui-component/cards/SubCard.jsx
- `WorkFormPage()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/views/work/works/WorkFormPage.jsx → client/src/contexts/authContext.jsx
- `WorkFormPage()` --calls--> `showError()`  [EXTRACTED]
  client/src/views/work/works/WorkFormPage.jsx → client/src/services/ToastService.js

## Import Cycles
- None detected.

## Communities (136 total, 42 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "images.js"
Cohesion: 0.23
Nodes (8): ref_fs, ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 3 - "auth.service.js"
Cohesion: 0.10
Nodes (28): bcrypt, ref_crypto, backoff(), runTransaction(), withTransaction(), comparePassword(), hashPassword(), deriveKey() (+20 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+26 more)

### Community 6 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 7 - "AuthForgotPassword.jsx"
Cohesion: 0.23
Nodes (13): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber(), hasSpecial() (+5 more)

### Community 8 - "ProfilePage.jsx"
Cohesion: 0.25
Nodes (13): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), LastModifiedCell(), SearchInput(), chipBg(), chipText() (+5 more)

### Community 9 - "WorkFormPage.jsx"
Cohesion: 0.24
Nodes (15): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), EditableList(), EMPTY_FORM, moneyRules(), rowKey() (+7 more)

### Community 10 - "showError"
Cohesion: 0.20
Nodes (21): getModulesAPI(), saveProfileAPI(), getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), showError(), showSuccess(), Accordion() (+13 more)

### Community 11 - "audit.service.js"
Cohesion: 0.10
Nodes (31): ADR-0013, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0027 (+23 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (27): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+19 more)

### Community 13 - "useAuth"
Cohesion: 0.12
Nodes (21): constructionCompaniesApi, contractTypesApi, useAuth(), ConstructionCompanyPage, ContractTypePage, PrivateRoute(), MasterPage(), STATUS_NAMES (+13 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+13 more)

### Community 15 - "@tabler/icons-react"
Cohesion: 0.10
Nodes (17): admin, icons, dashboard, icons, menuItems, icons, other, icons (+9 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.15
Nodes (17): express-validator, createMasterSchemas(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0001, ADR-0027, nullable (+9 more)

### Community 17 - "session.service.js"
Cohesion: 0.11
Nodes (25): ADR-0001, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME (+17 more)

### Community 18 - "constant.js"
Cohesion: 0.20
Nodes (10): closedMixin(), MiniDrawerStyled, openedMixin(), DashboardDefault, appDrawerWidth, drawerWidth, gridSpacing, CardGrid() (+2 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "MainCard"
Cohesion: 0.24
Nodes (12): CardSecondaryAction(), headerStyle, MainCard(), SubCard(), Avatar(), SamplePage(), ColorBox(), UIColor() (+4 more)

### Community 21 - "themes/index.jsx"
Cohesion: 0.21
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 22 - "ConfigContext.jsx"
Cohesion: 0.60
Nodes (3): ConfigContext, ConfigProvider(), useLocalStorage()

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.12
Nodes (14): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, ref_url, __dirname (+6 more)

### Community 25 - "works.service.js"
Cohesion: 0.10
Nodes (42): toMoney(), ACTIVE_STATUS, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted(), assertHeader() (+34 more)

### Community 26 - "works.routes.js"
Cohesion: 0.14
Nodes (16): moneyRule(), changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, saveWorkController (+8 more)

### Community 27 - "react"
Cohesion: 0.17
Nodes (20): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), Footer(), Header() (+12 more)

### Community 28 - "document.routes.js"
Cohesion: 0.20
Nodes (10): requirePermission(), hasEffectivePermission(), deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema, DOC_TYPES (+2 more)

### Community 29 - "masterRouter.utils.test.js"
Cohesion: 0.08
Nodes (17): config, emit, forged, serviceMock, mockReq(), mockDelete, mockSave, forgedAuthor (+9 more)

### Community 30 - "requests/index.js"
Cohesion: 0.31
Nodes (4): getAddressTypesSelectAPI, getInsurersSelectAPI, getProviderTypesSelectAPI, createMasterApi()

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "users.service.js"
Cohesion: 0.18
Nodes (13): assertAssignableProfile(), assertIdentification(), AUDITED_USER_FIELDS, checkIfUserExists(), ADR-0008, ADR-0013, ADR-0027, parsePageIds() (+5 more)

### Community 33 - "seed.js"
Cohesion: 0.18
Nodes (9): ADDRESS_TYPES, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES, SUPERVISION_TYPES (+1 more)

### Community 34 - "idempotency.service.js"
Cohesion: 0.14
Nodes (19): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+11 more)

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.23
Nodes (15): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+7 more)

### Community 37 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 38 - "UserDialog.jsx"
Cohesion: 0.22
Nodes (11): getIdentityDocumentsSelectAPI, getProfilesAPI(), saveUserAPI(), defaultConfig, showInfo(), showObligatorios(), DIAN_WEIGHTS, identificationFormatError() (+3 more)

### Community 39 - "@mui/material"
Cohesion: 0.11
Nodes (20): getStatusesByScopeAPI(), ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable(), BInputLabel, InputLabel() (+12 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.09
Nodes (9): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, ctx (+1 more)

### Community 41 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 43 - "usersApi.js"
Cohesion: 0.14
Nodes (6): genericRequest, instance, NO_REFRESH_URLS, refreshClient, axios, js-cookie

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "NotificationSection/index.jsx"
Cohesion: 0.24
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), ProfileSection(), HeaderAvatar(), MobileSearch() (+4 more)

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "main.routes.js"
Cohesion: 0.12
Nodes (17): ADR-0018, express, defineMaster(), contractTypesRoutes, contractTypesConfig, contractTypesService, ADR-0006, insurersRoutes (+9 more)

### Community 48 - "authContext.jsx"
Cohesion: 0.33
Nodes (6): loginAPI(), logoutAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), AuthProvider(), getStoredUser()

### Community 49 - "identityDocuments.service.js"
Cohesion: 0.16
Nodes (13): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, nitCheckDigit(), identityDocumentsRoutes (+5 more)

### Community 50 - "server.js"
Cohesion: 0.24
Nodes (9): ref_http, node-cron, app, server, cronJobs, registeredTasks, startCronJobs(), stopCronJobs() (+1 more)

### Community 51 - "app.routes.js"
Cohesion: 0.26
Nodes (9): getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001, getStatusesByScopeSchema (+1 more)

### Community 52 - "constants.js"
Cohesion: 0.12
Nodes (19): SocketContext, useSocket(), FilterPopper(), normalizeOptions(), SocketDropdownFilter(), SearchSelect(), SelectSocket(), TooltipLongText() (+11 more)

### Community 53 - "master.service.js"
Cohesion: 0.14
Nodes (23): ACTIVE_STATUS, capitalize(), createMasterService(), DELETED_STATUS, httpError(), INACTIVE_STATUS, ADR-0004, ADR-0027 (+15 more)

### Community 54 - "error.middleware.js"
Cohesion: 0.28
Nodes (11): concurrencyError(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS, driverCause(), driverErrorCode() (+3 more)

### Community 55 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 56 - "transaction.mock.js"
Cohesion: 0.08
Nodes (23): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+15 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkDetailPage.jsx"
Cohesion: 0.18
Nodes (14): worksApi, WorkDetailPage, WorksPage, fTerm(), fMoneyText(), fDateOnly(), DataList(), Figure() (+6 more)

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

### Community 68 - "formatNumber.js"
Cohesion: 0.23
Nodes (3): MoneyField(), moneyInputText(), parseMoneyInput()

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
Cohesion: 0.16
Nodes (10): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+2 more)

### Community 94 - "SupervisionTypePage.jsx"
Cohesion: 0.29
Nodes (5): supervisionTypesApi, SupervisionTypePage, COLUMNS, FORM_FIELDS, ADR-0007

### Community 95 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 100 - "masterRouter.utils.js"
Cohesion: 0.11
Nodes (23): jsonwebtoken, getIO(), verifyToken(), validate(), IDEMPOTENCY_HEADER, ACCESS_COOKIE_NAME, createMasterControllers(), createMasterRouter() (+15 more)

### Community 101 - "AppBar.jsx"
Cohesion: 0.21
Nodes (11): client_src_assets_images_interve, LoginPage, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthCardWrapper() (+3 more)

### Community 105 - "term.utils.js"
Cohesion: 0.33
Nodes (10): ADR-0015, moneyText(), addTerm(), dateOnlyText(), daysInMonth(), TERM_UNITS, toDateOnly(), auditableValue() (+2 more)

### Community 106 - "react-router-dom"
Cohesion: 0.16
Nodes (13): setParentOpenedMenu(), useMenuCollapse(), MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+5 more)

### Community 108 - "transaction.service.js"
Cohesion: 0.11
Nodes (17): @prisma/adapter-mariadb, @prisma/client, adapter, describeTarget(), ADR-0013, ADR-0027, testConnection(), buildLockPlan() (+9 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 118 - "AddressTypePage.jsx"
Cohesion: 0.29
Nodes (5): addressTypesApi, AddressTypePage, COLUMNS, FORM_FIELDS, ADR-0009

### Community 119 - "ProviderTypePage.jsx"
Cohesion: 0.29
Nodes (5): providerTypesApi, ProviderTypePage, COLUMNS, FORM_FIELDS, ADR-0010

### Community 120 - "socket.js"
Cohesion: 0.29
Nodes (8): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), isSessionActive()

### Community 121 - "providerTypes.service.js"
Cohesion: 0.38
Nodes (5): ADR-0006, providerTypesRoutes, ADR-0010, providerTypesConfig, providerTypesService

### Community 122 - "addressTypes.service.js"
Cohesion: 0.47
Nodes (4): addressTypesRoutes, addressTypesConfig, addressTypesService, ADR-0009

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 124 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 125 - "permissions.routes.js"
Cohesion: 0.19
Nodes (15): ADR-0011, PERMISSIONS, getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController() (+7 more)

### Community 128 - "transaction.service.test.js"
Cohesion: 0.26
Nodes (7): ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout()

### Community 129 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 130 - "App.jsx"
Cohesion: 0.21
Nodes (10): refreshSession(), App(), AuthContext, NavigationScroll(), SocketProvider(), DateField(), toDate(), date-fns (+2 more)

### Community 131 - "prisma"
Cohesion: 0.24
Nodes (7): prisma, getEffectivePermissionIds(), getMenu(), getSessionInfo(), PAGE_SELECT, toChild(), toParent()

### Community 132 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 134 - "MainRoutes.jsx"
Cohesion: 0.12
Nodes (14): identityDocumentsApi, insurersApi, IdentityDocumentPage, InsurerPage, ProfilesPage, UsersPage, WorkFormPage, COLUMNS (+6 more)

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

## Knowledge Gaps
- **496 isolated node(s):** `EMPTY_FORM`, `axios`, `@azure/identity`, `bcrypt`, `compression` (+491 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 672 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `master.service.js`, `server/package.json`?**
  _High betweenness centrality (0.214) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `withAlpha`, `AuthForgotPassword.jsx`, `ProfilePage.jsx`, `WorkFormPage.jsx`, `showError`, `useAuth`, `client/package.json`, `@tabler/icons-react`, `constant.js`, `MainCard`, `themes/index.jsx`, `react`, `DocumentManagement.jsx`, `UserDialog.jsx`, `NotificationSection/index.jsx`, `constants.js`, `WorkDetailPage.jsx`, `DebouncedInput.jsx`, `formatNumber.js`, `AppBar.jsx`, `react-router-dom`, `ImageList.jsx`?**
  _High betweenness centrality (0.162) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `App.jsx`, `MainRoutes.jsx`, `AuthForgotPassword.jsx`, `ProfilePage.jsx`, `WorkFormPage.jsx`, `showError`, `useAuth`, `client/package.json`, `@tabler/icons-react`, `themes/index.jsx`, `ConfigContext.jsx`, `DocumentManagement.jsx`, `UserDialog.jsx`, `@mui/material`, `NotificationSection/index.jsx`, `authContext.jsx`, `constants.js`, `WorkDetailPage.jsx`, `DebouncedInput.jsx`, `AppBar.jsx`, `react-router-dom`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **What connects `EMPTY_FORM`, `axios`, `@azure/identity` to the rest of the system?**
  _496 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `auth.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0990990990990991 - nodes in this community are weakly interconnected._
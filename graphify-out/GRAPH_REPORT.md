# Graph Report - WEBPAC-INTERVE  (2026-09-30)

## Corpus Check
- 356 files · ~111,126 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 1641 nodes · 3577 edges · 128 communities (91 shown, 37 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 72 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `80001425`
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
- authContext.jsx
- UsersPage.jsx
- constants.js
- showError
- users.service.js
- auth.routes.js
- useAuth
- client/package.json
- menu-items/index.js
- validation.utils.js
- session.service.js
- master.service.js
- compilerOptions
- MainCard
- themes/index.jsx
- react
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- MainLayout/index.jsx
- DocumentManagement.jsx
- masterRouter.utils.test.js
- requests/index.js
- mailerService.js
- error.middleware.js
- seed.js
- idempotency.service.js
- UserDialog.jsx
- authjwt.middleware.test.js
- transaction.service.test.js
- audit.service.js
- @mui/material
- ref_jest_globals
- eslint.config.mjs
- devDependencies
- IdentityDocumentPage.jsx
- src/index.jsx
- NotificationSection/index.jsx
- scripts
- permissions.routes.js
- DebouncedInput.jsx
- identityDocuments.service.js
- server.js
- app.routes.js
- masterRouter.utils.js
- prismaClient.js
- profiles.routes.js
- session.service.test.js
- transaction.mock.js
- scripts
- WorksPage.jsx
- winston.config.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- ConstructionCompanyPage.jsx
- extends
- writeAudit
- browserslist
- volta
- volta
- users.service.test.js
- `tbl_status`
- WorkDialog.jsx
- MainRoutes.jsx
- auth.service.test.js
- insurers.service.js
- AuthenticationRoutes.jsx
- auth.controller.test.js
- MenuList/index.jsx
- ForgotPassword.jsx
- transaction.service.js
- `tbl_address_types`
- `tbl_works`
- `tbl_identity_documents`
- `tbl_insurers`
- `tbl_provider_types`
- formatTime.js
- ProfilePage.jsx
- users.routes.js
- handleFirebase.js
- ContractTypePage.jsx
- GenericFormSection.jsx
- works.service.test.js
- ImageList.jsx
- permissions.controller.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 74 edges
2. `react` - 53 edges
3. `useAuth()` - 39 edges
4. `writeAudit()` - 29 edges
5. `ComponentsOverrides()` - 27 edges
6. `MasterPage()` - 26 edges
7. `@tabler/icons-react` - 26 edges
8. `withLockedTransaction()` - 24 edges
9. `auditContext()` - 23 edges
10. `showError()` - 23 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `WorkDialog` --calls--> `getContractTypesSelectAPI`  [EXTRACTED]
  client/src/views/work/works/components/WorkDialog.jsx → client/src/api/requests/contractTypesApi.js
- `MenuList()` --calls--> `useGetMenuMaster()`  [EXTRACTED]
  client/src/layout/MainLayout/MenuList/index.jsx → client/src/api/menu.js
- `MenuList()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/layout/MainLayout/MenuList/index.jsx → client/src/contexts/authContext.jsx
- `MenuList()` --calls--> `NavGroup()`  [EXTRACTED]
  client/src/layout/MainLayout/MenuList/index.jsx → client/src/layout/MainLayout/MenuList/NavGroup/index.jsx

## Import Cycles
- None detected.

## Communities (128 total, 37 thin omitted)

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
Nodes (27): bcrypt, ref_crypto, backoff(), runTransaction(), withTransaction(), comparePassword(), hashPassword(), deriveKey() (+19 more)

### Community 4 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+27 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+27 more)

### Community 6 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 7 - "authContext.jsx"
Cohesion: 0.09
Nodes (32): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), genericRequest (+24 more)

### Community 8 - "UsersPage.jsx"
Cohesion: 0.21
Nodes (5): deleteUserAPI(), paginationUsersAPI(), SearchInput(), statusTabsWithCounts(), UsersPage()

### Community 9 - "constants.js"
Cohesion: 0.22
Nodes (9): SocketContext, TooltipLongText(), pathSocket, STATUS_OPTIONS, STATUS_TABS, toNlBr(), truncateText(), urlSocket (+1 more)

### Community 10 - "showError"
Cohesion: 0.24
Nodes (14): getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), defaultConfig, showError(), showInfo(), showObligatorios(), showSuccess() (+6 more)

### Community 11 - "users.service.js"
Cohesion: 0.18
Nodes (13): assertAssignableProfile(), assertIdentification(), AUDITED_USER_FIELDS, checkIfUserExists(), ADR-0008, ADR-0013, ADR-0027, parsePageIds() (+5 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "useAuth"
Cohesion: 0.12
Nodes (17): useAuth(), InsurerPage, ProviderTypePage, PrivateRoute(), MasterPage(), AddressTypePage(), COLUMNS, FORM_FIELDS (+9 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (22): axios, moment, name, packageManager, private, version, apexcharts, @emotion/react (+14 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, dashboard, icons, menuItems, icons, other, icons (+6 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.15
Nodes (17): express-validator, createMasterSchemas(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0001, ADR-0027, nullable (+9 more)

### Community 17 - "session.service.js"
Cohesion: 0.10
Nodes (29): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+21 more)

### Community 18 - "master.service.js"
Cohesion: 0.11
Nodes (28): ADR-0003, ADR-0013, AUDIT_ENTITIES, ACTIVE_STATUS, capitalize(), createMasterService(), DELETED_STATUS, httpError() (+20 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "MainCard"
Cohesion: 0.14
Nodes (19): ProfileSection(), closedMixin(), MiniDrawerStyled, openedMixin(), appDrawerWidth, drawerWidth, gridSpacing, CardSecondaryAction() (+11 more)

### Community 21 - "themes/index.jsx"
Cohesion: 0.21
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 22 - "react"
Cohesion: 0.18
Nodes (5): ConfigContext, ConfigProvider(), useLocalStorage(), react, react-easy-crop

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (15): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, ref_url, __dirname (+7 more)

### Community 25 - "works.service.js"
Cohesion: 0.09
Nodes (49): moneyText(), toMoney(), ACTIVE_STATUS, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted() (+41 more)

### Community 26 - "works.routes.js"
Cohesion: 0.13
Nodes (17): IDEMPOTENCY_HEADER, moneyRule(), changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController (+9 more)

### Community 27 - "MainLayout/index.jsx"
Cohesion: 0.20
Nodes (20): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), useConfig(), setParentOpenedMenu(), useMenuCollapse(), Footer() (+12 more)

### Community 28 - "DocumentManagement.jsx"
Cohesion: 0.23
Nodes (15): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+7 more)

### Community 29 - "masterRouter.utils.test.js"
Cohesion: 0.08
Nodes (17): config, emit, forged, serviceMock, mockReq(), mockDelete, mockSave, forgedAuthor (+9 more)

### Community 30 - "requests/index.js"
Cohesion: 0.20
Nodes (9): addressTypesApi, getAddressTypesSelectAPI, getInsurersSelectAPI, insurersApi, getProviderTypesSelectAPI, providerTypesApi, getSupervisionTypesSelectAPI, supervisionTypesApi (+1 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "error.middleware.js"
Cohesion: 0.28
Nodes (11): concurrencyError(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS, driverCause(), driverErrorCode() (+3 more)

### Community 33 - "seed.js"
Cohesion: 0.18
Nodes (9): ADDRESS_TYPES, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES, SUPERVISION_TYPES (+1 more)

### Community 34 - "idempotency.service.js"
Cohesion: 0.14
Nodes (19): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+11 more)

### Community 35 - "UserDialog.jsx"
Cohesion: 0.33
Nodes (8): getIdentityDocumentsSelectAPI, getProfilesAPI(), saveUserAPI(), DIAN_WEIGHTS, identificationFormatError(), nitCheckDigit(), ADR-0008, UserDialog

### Community 36 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 37 - "transaction.service.test.js"
Cohesion: 0.26
Nodes (7): ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout()

### Community 38 - "audit.service.js"
Cohesion: 0.20
Nodes (14): AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0027, protect(), REDACTED (+6 more)

### Community 39 - "@mui/material"
Cohesion: 0.18
Nodes (12): ConfirmDialog(), DataTable(), BInputLabel, InputLabel(), STATUS_NAMES, chipBg(), chipText(), StatusTabs() (+4 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.09
Nodes (9): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, ctx (+1 more)

### Community 41 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 43 - "IdentityDocumentPage.jsx"
Cohesion: 0.25
Nodes (6): identityDocumentsApi, IdentityDocumentPage, COLUMNS, FORM_FIELDS, IdentityDocumentPage(), ADR-0008

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "NotificationSection/index.jsx"
Cohesion: 0.22
Nodes (14): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+6 more)

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "permissions.routes.js"
Cohesion: 0.07
Nodes (38): ADR-0006, ADR-0011, PERMISSIONS, defineMaster(), addressTypesRoutes, addressTypesConfig, addressTypesService, ADR-0009 (+30 more)

### Community 49 - "identityDocuments.service.js"
Cohesion: 0.16
Nodes (13): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, nitCheckDigit(), identityDocumentsRoutes (+5 more)

### Community 50 - "server.js"
Cohesion: 0.24
Nodes (9): ref_http, node-cron, app, server, cronJobs, registeredTasks, startCronJobs(), stopCronJobs() (+1 more)

### Community 51 - "app.routes.js"
Cohesion: 0.26
Nodes (9): getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001, getStatusesByScopeSchema (+1 more)

### Community 52 - "masterRouter.utils.js"
Cohesion: 0.27
Nodes (10): verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), deleteModuleDoc(), paginationModuleDocs() (+2 more)

### Community 53 - "prismaClient.js"
Cohesion: 0.16
Nodes (10): adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), getMenu(), PAGE_SELECT (+2 more)

### Community 54 - "profiles.routes.js"
Cohesion: 0.11
Nodes (25): express, getIO(), getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes (+17 more)

### Community 55 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 56 - "transaction.mock.js"
Cohesion: 0.08
Nodes (23): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+15 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorksPage.jsx"
Cohesion: 0.14
Nodes (5): WorksPage, fMoneyText(), COLUMNS, ADR-0011, WorksPage()

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

### Community 66 - "ConstructionCompanyPage.jsx"
Cohesion: 0.22
Nodes (7): constructionCompaniesApi, getConstructionCompaniesSelectAPI, ConstructionCompanyPage, COLUMNS, ConstructionCompanyPage(), FORM_FIELDS, ADR-0004

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "writeAudit"
Cohesion: 0.19
Nodes (14): newOperationId(), writeAudit(), getEffectivePermissionIds(), withLockedTransaction(), updateAccount(), updatePassword(), auditPermissionChanges(), ADR-0013 (+6 more)

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

### Community 93 - "WorkDialog.jsx"
Cohesion: 0.19
Nodes (15): getWorkManagersSelectAPI(), worksApi, EditableList(), EMPTY_FORM, INTEGER, ADR-0011, MONEY, ROLE_OPTIONS (+7 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.14
Nodes (13): AddressTypePage, DashboardDefault, ProfilesPage, SupervisionTypePage, UsersPage, CardGrid(), COLUMNS, FORM_FIELDS (+5 more)

### Community 95 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 100 - "insurers.service.js"
Cohesion: 0.38
Nodes (5): ADR-0018, insurersRoutes, insurersConfig, insurersService, ADR-0003

### Community 101 - "AuthenticationRoutes.jsx"
Cohesion: 0.19
Nodes (10): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), MainRoutes (+2 more)

### Community 104 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 105 - "MenuList/index.jsx"
Cohesion: 0.22
Nodes (9): getMenuAPI(), getStatusesByScopeAPI(), ElevationScroll(), HorizontalBar(), getIconByName(), MenuList(), CACHE_PENDING, STATUS_CACHE (+1 more)

### Community 106 - "ForgotPassword.jsx"
Cohesion: 0.33
Nodes (8): client_src_assets_images_logo_interve, AppBar(), ElevationScroll(), Logo(), AuthCardWrapper(), AuthWrapper1, ForgotPassword(), Login()

### Community 108 - "transaction.service.js"
Cohesion: 0.18
Nodes (11): @prisma/client, buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+3 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 117 - "formatTime.js"
Cohesion: 0.15
Nodes (3): LastModifiedCell(), fDateTime(), date-fns

### Community 118 - "ProfilePage.jsx"
Cohesion: 0.35
Nodes (8): deleteProfileAPI(), getModulesAPI(), paginationProfilesAPI(), saveProfileAPI(), BaseDialog(), fieldsConfig, ProfileDialog, ProfilesPage()

### Community 119 - "users.routes.js"
Cohesion: 0.23
Nodes (10): ADR-0001, countUsersController(), deleteUserController(), ADR-0027, paginationUsersController(), saveUserController(), usersRoutes, deleteUserSchema (+2 more)

### Community 120 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 121 - "ContractTypePage.jsx"
Cohesion: 0.22
Nodes (7): contractTypesApi, getContractTypesSelectAPI, ContractTypePage, COLUMNS, ContractTypePage(), FORM_FIELDS, ADR-0006

### Community 122 - "GenericFormSection.jsx"
Cohesion: 0.42
Nodes (7): findOption(), flattenOptions(), GenericFormSection, PendingDropdownField(), RequiredLabel(), RequiredLabel(), SelectSocket()

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 124 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 125 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

## Knowledge Gaps
- **491 isolated node(s):** `icons`, `STATUS_NAMES`, `COLUMNS`, `FORM_FIELDS`, `ADR-0006` (+486 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 664 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **37 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `master.service.js`, `server/package.json`?**
  _High betweenness centrality (0.367) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `withAlpha`, `authContext.jsx`, `UsersPage.jsx`, `constants.js`, `showError`, `useAuth`, `client/package.json`, `MainCard`, `themes/index.jsx`, `react`, `MainLayout/index.jsx`, `DocumentManagement.jsx`, `UserDialog.jsx`, `NotificationSection/index.jsx`, `DebouncedInput.jsx`, `WorkDialog.jsx`, `MainRoutes.jsx`, `AuthenticationRoutes.jsx`, `MenuList/index.jsx`, `ForgotPassword.jsx`, `ProfilePage.jsx`, `GenericFormSection.jsx`, `ImageList.jsx`?**
  _High betweenness centrality (0.232) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `authContext.jsx`, `UsersPage.jsx`, `constants.js`, `showError`, `client/package.json`, `MainCard`, `themes/index.jsx`, `MainLayout/index.jsx`, `DocumentManagement.jsx`, `UserDialog.jsx`, `@mui/material`, `NotificationSection/index.jsx`, `DebouncedInput.jsx`, `WorkDialog.jsx`, `MainRoutes.jsx`, `AuthenticationRoutes.jsx`, `MenuList/index.jsx`, `ForgotPassword.jsx`, `ProfilePage.jsx`, `GenericFormSection.jsx`?**
  _High betweenness centrality (0.206) - this node is a cross-community bridge._
- **What connects `icons`, `STATUS_NAMES`, `COLUMNS` to the rest of the system?**
  _491 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `auth.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
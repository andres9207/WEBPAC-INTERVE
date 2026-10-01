# Graph Report - WEBPAC-INTERVE  (2026-10-01)

## Corpus Check
- 357 files · ~112,556 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 1644 nodes · 3613 edges · 130 communities (93 shown, 37 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 72 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `05fb6abb`
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
- @mui/material
- ProfilePage.jsx
- constants.js
- MasterPage.jsx
- users.service.js
- auth.routes.js
- useAuth
- client/package.json
- @tabler/icons-react
- validation.utils.js
- session.service.js
- profiles.service.js
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
- master.service.js
- ref_prop_types
- ref_jest_globals
- eslint.config.mjs
- devDependencies
- IdentityDocumentPage.jsx
- App.jsx
- SocketProvider.jsx
- scripts
- masterRouter.utils.js
- authContext.jsx
- identityDocuments.service.js
- server.js
- app.routes.js
- document.routes.js
- userFullName
- notifications.routes.js
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
- authjwt.middleware.js
- browserslist
- volta
- volta
- users.service.test.js
- `tbl_status`
- WorkDialog.jsx
- MainRoutes.jsx
- auth.service.test.js
- profiles.routes.js
- AuthenticationRoutes.jsx
- auth.controller.test.js
- StatusChip.jsx
- InsurerPage.jsx
- transaction.service.js
- `tbl_address_types`
- `tbl_works`
- `tbl_identity_documents`
- `tbl_insurers`
- `tbl_provider_types`
- formatTime.js
- AddressTypePage.jsx
- ProviderTypePage.jsx
- handleFirebase.js
- providerTypes.service.js
- master.service.test.js
- works.service.test.js
- ImageList.jsx
- permissions.routes.js
- StatusTabs.jsx
- profiles.service.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 75 edges
2. `react` - 54 edges
3. `useAuth()` - 39 edges
4. `writeAudit()` - 29 edges
5. `MasterPage()` - 28 edges
6. `ComponentsOverrides()` - 27 edges
7. `@tabler/icons-react` - 27 edges
8. `withLockedTransaction()` - 24 edges
9. `showError()` - 23 edges
10. `showSuccess()` - 23 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `createMasterRouter()` --indirect_call--> `verifyToken()`  [INFERRED]
  server/src/common/utils/masterRouter.utils.js → server/src/common/middlewares/authjwt.middleware.js
- `UserDialog` --calls--> `BaseDialog()`  [EXTRACTED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/BaseDialog.jsx
- `WorkDialog` --calls--> `BaseDialog()`  [EXTRACTED]
  client/src/views/work/works/components/WorkDialog.jsx → client/src/ui-component/extended/BaseDialog.jsx
- `MasterPage()` --calls--> `DataTable()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/ui-component/extended/DataTable.jsx

## Import Cycles
- None detected.

## Communities (130 total, 37 thin omitted)

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
Cohesion: 0.11
Nodes (28): bcrypt, writeAudit(), getEffectivePermissionIds(), withTransaction(), comparePassword(), hashPassword(), deriveKey(), generateResetCode() (+20 more)

### Community 4 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+27 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+26 more)

### Community 6 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 7 - "@mui/material"
Cohesion: 0.21
Nodes (14): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber(), hasSpecial() (+6 more)

### Community 8 - "ProfilePage.jsx"
Cohesion: 0.16
Nodes (11): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), genericRequest, SearchInput(), StatusChip(), statusTabsWithCounts() (+3 more)

### Community 9 - "constants.js"
Cohesion: 0.36
Nodes (5): TooltipLongText(), STATUS_OPTIONS, STATUS_TABS, toNlBr(), truncateText()

### Community 10 - "MasterPage.jsx"
Cohesion: 0.20
Nodes (21): getModulesAPI(), saveProfileAPI(), getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), showError(), showSuccess(), Accordion() (+13 more)

### Community 11 - "users.service.js"
Cohesion: 0.10
Nodes (24): AUDIT_ENTITIES, AUDIT_OPERATIONS, newOperationId(), withLockedTransaction(), auditPermissionChanges(), ADR-0013, ADR-0027, updateProfilePermissions() (+16 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "useAuth"
Cohesion: 0.18
Nodes (15): contractTypesApi, useAuth(), ContractTypePage, PrivateRoute(), MasterPage(), AddressTypePage(), ConstructionCompanyPage(), COLUMNS (+7 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (22): axios, moment, name, packageManager, private, version, apexcharts, @emotion/react (+14 more)

### Community 15 - "@tabler/icons-react"
Cohesion: 0.09
Nodes (25): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), ProfileSection(), HeaderAvatar(), MobileSearch() (+17 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.12
Nodes (21): express-validator, createMasterSchemas(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0001, ADR-0027, nullable (+13 more)

### Community 17 - "session.service.js"
Cohesion: 0.11
Nodes (25): ADR-0001, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME (+17 more)

### Community 18 - "profiles.service.js"
Cohesion: 0.18
Nodes (15): countByStatus(), DEFAULT_ROWS, MAX_ROWS, paginate(), resolvePagination(), searchWhere(), toInt(), ADR-0013 (+7 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "MainCard"
Cohesion: 0.16
Nodes (18): closedMixin(), MiniDrawerStyled, openedMixin(), appDrawerWidth, drawerWidth, gridSpacing, CardSecondaryAction(), headerStyle (+10 more)

### Community 21 - "themes/index.jsx"
Cohesion: 0.21
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 22 - "react"
Cohesion: 0.11
Nodes (9): ConfigContext, ConfigProvider(), useLocalStorage(), ElevationScroll(), HorizontalBar(), lodash, react, ref_react_currency_input_field (+1 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.12
Nodes (14): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, ref_url, __dirname (+6 more)

### Community 25 - "works.service.js"
Cohesion: 0.09
Nodes (49): moneyText(), toMoney(), ACTIVE_STATUS, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted() (+41 more)

### Community 26 - "works.routes.js"
Cohesion: 0.13
Nodes (17): IDEMPOTENCY_HEADER, moneyRule(), changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController (+9 more)

### Community 27 - "MainLayout/index.jsx"
Cohesion: 0.17
Nodes (23): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), setParentOpenedMenu(), useMenuCollapse() (+15 more)

### Community 28 - "DocumentManagement.jsx"
Cohesion: 0.23
Nodes (15): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+7 more)

### Community 29 - "masterRouter.utils.test.js"
Cohesion: 0.08
Nodes (17): config, emit, forged, serviceMock, mockReq(), mockDelete, mockSave, forgedAuthor (+9 more)

### Community 30 - "requests/index.js"
Cohesion: 0.36
Nodes (3): getAddressTypesSelectAPI, getProviderTypesSelectAPI, createMasterApi()

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
Cohesion: 0.15
Nodes (18): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+10 more)

### Community 35 - "UserDialog.jsx"
Cohesion: 0.22
Nodes (11): getIdentityDocumentsSelectAPI, getProfilesAPI(), saveUserAPI(), defaultConfig, showInfo(), showObligatorios(), DIAN_WEIGHTS, identificationFormatError() (+3 more)

### Community 36 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 37 - "transaction.service.test.js"
Cohesion: 0.26
Nodes (7): ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout()

### Community 38 - "master.service.js"
Cohesion: 0.13
Nodes (22): ADR-0013, auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0027, protect(), REDACTED (+14 more)

### Community 39 - "ref_prop_types"
Cohesion: 0.24
Nodes (9): ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable(), BInputLabel, InputLabel(), TableActions() (+1 more)

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
Cohesion: 0.29
Nodes (5): identityDocumentsApi, IdentityDocumentPage, COLUMNS, FORM_FIELDS, ADR-0008

### Community 44 - "App.jsx"
Cohesion: 0.14
Nodes (14): App(), client_src_assets_scss_style, AuthContext, container, root, NavigationScroll(), reportWebVitals(), router (+6 more)

### Community 45 - "SocketProvider.jsx"
Cohesion: 0.19
Nodes (13): refreshSession(), SocketContext, SocketProvider(), useSocket(), FilterPopper(), normalizeOptions(), SocketDropdownFilter(), RequiredLabel() (+5 more)

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (28): ADR-0018, express, validate(), defineMaster(), createMasterControllers(), createMasterRouter(), addressTypesRoutes, addressTypesConfig (+20 more)

### Community 48 - "authContext.jsx"
Cohesion: 0.20
Nodes (11): loginAPI(), logoutAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), instance, NO_REFRESH_URLS, refreshClient, AuthProvider() (+3 more)

### Community 49 - "identityDocuments.service.js"
Cohesion: 0.16
Nodes (13): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, nitCheckDigit(), identityDocumentsRoutes (+5 more)

### Community 50 - "server.js"
Cohesion: 0.24
Nodes (9): ref_http, node-cron, app, server, cronJobs, registeredTasks, startCronJobs(), stopCronJobs() (+1 more)

### Community 51 - "app.routes.js"
Cohesion: 0.26
Nodes (9): getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001, getStatusesByScopeSchema (+1 more)

### Community 52 - "document.routes.js"
Cohesion: 0.33
Nodes (6): requirePermission(), hasEffectivePermission(), deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes

### Community 53 - "userFullName"
Cohesion: 0.19
Nodes (8): USER_NAME_SELECT, userFullName(), getMenu(), getSessionInfo(), PAGE_SELECT, toChild(), toParent(), selectWorkManagers()

### Community 54 - "notifications.routes.js"
Cohesion: 0.20
Nodes (14): getIO(), getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount() (+6 more)

### Community 55 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 56 - "transaction.mock.js"
Cohesion: 0.10
Nodes (19): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+11 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorksPage.jsx"
Cohesion: 0.14
Nodes (5): worksApi, WorksPage, fMoneyText(), COLUMNS, ADR-0011

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
Cohesion: 0.29
Nodes (5): constructionCompaniesApi, ConstructionCompanyPage, COLUMNS, FORM_FIELDS, ADR-0004

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "authjwt.middleware.js"
Cohesion: 0.23
Nodes (11): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+3 more)

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
Cohesion: 0.18
Nodes (18): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), EditableList(), EMPTY_FORM, INTEGER, ADR-0011 (+10 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.15
Nodes (12): supervisionTypesApi, DashboardDefault, ProfilesPage, SupervisionTypePage, UsersPage, CardGrid(), COLUMNS, FORM_FIELDS (+4 more)

### Community 95 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 100 - "profiles.routes.js"
Cohesion: 0.23
Nodes (10): deleteProfileController(), getModulesController(), ADR-0027, paginationProfilesController(), saveProfileController(), profilesRoutes, deleteProfileSchema, getModulesSchema (+2 more)

### Community 101 - "AuthenticationRoutes.jsx"
Cohesion: 0.13
Nodes (18): client_src_assets_images_logo_interve, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+10 more)

### Community 104 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 105 - "StatusChip.jsx"
Cohesion: 0.40
Nodes (3): getStatusesByScopeAPI(), CACHE_PENDING, STATUS_CACHE

### Community 106 - "InsurerPage.jsx"
Cohesion: 0.25
Nodes (6): getInsurersSelectAPI, insurersApi, InsurerPage, COLUMNS, FORM_FIELDS, ADR-0003

### Community 108 - "transaction.service.js"
Cohesion: 0.10
Nodes (20): @prisma/adapter-mariadb, @prisma/client, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection() (+12 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 117 - "formatTime.js"
Cohesion: 0.16
Nodes (3): LastModifiedCell(), fDateTime(), date-fns

### Community 118 - "AddressTypePage.jsx"
Cohesion: 0.29
Nodes (5): addressTypesApi, AddressTypePage, COLUMNS, FORM_FIELDS, ADR-0009

### Community 119 - "ProviderTypePage.jsx"
Cohesion: 0.29
Nodes (5): providerTypesApi, ProviderTypePage, COLUMNS, FORM_FIELDS, ADR-0010

### Community 120 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 121 - "providerTypes.service.js"
Cohesion: 0.38
Nodes (5): ADR-0006, providerTypesRoutes, ADR-0010, providerTypesConfig, providerTypesService

### Community 122 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 124 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 125 - "permissions.routes.js"
Cohesion: 0.14
Nodes (18): ADR-0011, PERMISSIONS, getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController() (+10 more)

### Community 128 - "StatusTabs.jsx"
Cohesion: 1.00
Nodes (3): chipBg(), chipText(), StatusTabs()

## Knowledge Gaps
- **492 isolated node(s):** `instance`, `refreshClient`, `NO_REFRESH_URLS`, `STATUS_NAMES`, `COLUMNS` (+487 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 665 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **37 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `react` to `profiles.service.js`, `server/package.json`?**
  _High betweenness centrality (0.227) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `StatusTabs.jsx`, `withAlpha`, `ProfilePage.jsx`, `constants.js`, `MasterPage.jsx`, `useAuth`, `client/package.json`, `@tabler/icons-react`, `MainCard`, `themes/index.jsx`, `react`, `MainLayout/index.jsx`, `DocumentManagement.jsx`, `UserDialog.jsx`, `ref_prop_types`, `SocketProvider.jsx`, `WorkDialog.jsx`, `MainRoutes.jsx`, `AuthenticationRoutes.jsx`, `StatusChip.jsx`, `formatTime.js`, `ImageList.jsx`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `StatusTabs.jsx`, `UserDialog.jsx`, `AuthenticationRoutes.jsx`, `ref_prop_types`, `ProfilePage.jsx`, `StatusChip.jsx`, `MasterPage.jsx`, `@mui/material`, `SocketProvider.jsx`, `client/package.json`, `@tabler/icons-react`, `authContext.jsx`, `themes/index.jsx`, `MainLayout/index.jsx`, `DocumentManagement.jsx`, `WorkDialog.jsx`, `MainRoutes.jsx`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `instance`, `refreshClient`, `NO_REFRESH_URLS` to the rest of the system?**
  _492 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `auth.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10960960960960961 - nodes in this community are weakly interconnected._
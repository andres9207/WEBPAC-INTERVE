# Graph Report - WEBPAC-INTERVE  (2026-10-01)

## Corpus Check
- 366 files · ~117,711 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 1683 nodes · 3766 edges · 126 communities (86 shown, 40 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 71 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `08a75678`
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
- ProfilePage.jsx
- WorkFormPage.jsx
- UserDialog.jsx
- profiles.service.js
- auth.routes.js
- useAuth
- client/package.json
- @tabler/icons-react
- validation.utils.js
- session.service.js
- Sidebar/index.jsx
- compilerOptions
- @mui/material
- themes/index.jsx
- react
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- react-router-dom
- masterRouter.utils.js
- masterRouter.utils.test.js
- requests/index.js
- mailerService.js
- users.service.js
- seed.js
- idempotency.service.js
- ForgotPassword.jsx
- constructionCompanies.service.js
- supervisionTypes.service.js
- audit.service.js
- DataTable.jsx
- ref_jest_globals
- eslint.config.mjs
- devDependencies
- users.controller.test.js
- src/index.jsx
- NotificationSection/index.jsx
- scripts
- main.routes.js
- authContext.jsx
- identityDocuments.service.js
- server.js
- app.routes.js
- document.routes.js
- master.service.js
- permissions.controller.test.js
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
- idempotency.service.test.js
- browserslist
- volta
- volta
- users.service.test.js
- `tbl_status`
- SupervisionTypePage.jsx
- auth.service.test.js
- profiles.routes.js
- AuthenticationRoutes.jsx
- `tbl_works`
- MainRoutes.jsx
- transaction.service.js
- `tbl_address_types`
- `tbl_works`
- `tbl_identity_documents`
- `tbl_insurers`
- `tbl_provider_types`
- formatTime.js
- AddressTypePage.jsx
- ProviderTypePage.jsx
- providerTypes.service.js
- master.service.test.js
- works.service.test.js
- ImageList.jsx
- permissions.routes.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 80 edges
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
- `createMasterRouter()` --indirect_call--> `verifyToken()`  [INFERRED]
  server/src/common/utils/masterRouter.utils.js → server/src/common/middlewares/authjwt.middleware.js
- `App()` --calls--> `AuthProvider()`  [EXTRACTED]
  client/src/App.jsx → client/src/contexts/authContext.jsx
- `App()` --calls--> `NavigationScroll()`  [EXTRACTED]
  client/src/App.jsx → client/src/layout/NavigationScroll.jsx
- `App()` --calls--> `ThemeCustomization()`  [EXTRACTED]
  client/src/App.jsx → client/src/themes/index.jsx

## Import Cycles
- None detected.

## Communities (126 total, 40 thin omitted)

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
Cohesion: 0.10
Nodes (31): bcrypt, auditMisuse(), buildRows(), writeAudit(), writeAuditEvent(), getEffectivePermissionIds(), withTransaction(), comparePassword() (+23 more)

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
Cohesion: 0.22
Nodes (14): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber(), hasSpecial() (+6 more)

### Community 8 - "ProfilePage.jsx"
Cohesion: 0.21
Nodes (15): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), SearchInput(), CACHE_PENDING, STATUS_CACHE (+7 more)

### Community 9 - "WorkFormPage.jsx"
Cohesion: 0.05
Nodes (46): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), refreshSession(), App(), AuthContext, NavigationScroll() (+38 more)

### Community 10 - "UserDialog.jsx"
Cohesion: 0.05
Nodes (60): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+52 more)

### Community 11 - "profiles.service.js"
Cohesion: 0.13
Nodes (16): AUDIT_ENTITIES, newOperationId(), withLockedTransaction(), auditPermissionChanges(), ADR-0013, ADR-0027, updateProfilePermissions(), updateUserPermissions() (+8 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (27): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+19 more)

### Community 13 - "useAuth"
Cohesion: 0.11
Nodes (20): constructionCompaniesApi, contractTypesApi, identityDocumentsApi, useAuth(), ConstructionCompanyPage, IdentityDocumentPage, PrivateRoute(), MasterPage() (+12 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+13 more)

### Community 15 - "@tabler/icons-react"
Cohesion: 0.10
Nodes (20): ProfileSection(), HeaderAvatar(), MobileSearch(), SearchSection(), admin, icons, dashboard, icons (+12 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.19
Nodes (12): express-validator, createMasterSchemas(), emailRule(), idempotencyKeyRule(), ADR-0001, ADR-0027, nullable, optionalId() (+4 more)

### Community 17 - "session.service.js"
Cohesion: 0.06
Nodes (47): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), getIO() (+39 more)

### Community 18 - "Sidebar/index.jsx"
Cohesion: 0.19
Nodes (11): LogoSection(), Sidebar(), closedMixin(), MiniDrawerStyled, openedMixin(), DashboardDefault, appDrawerWidth, drawerWidth (+3 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "@mui/material"
Cohesion: 0.17
Nodes (17): gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard(), Avatar(), BInputLabel, InputLabel() (+9 more)

### Community 21 - "themes/index.jsx"
Cohesion: 0.21
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 22 - "react"
Cohesion: 0.13
Nodes (10): getMenuAPI(), ConfigContext, ConfigProvider(), useLocalStorage(), ElevationScroll(), HorizontalBar(), getIconByName(), MenuList() (+2 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (54): ADR-0015, moneyText(), toMoney(), addTerm(), dateOnlyText(), daysInMonth(), TERM_UNITS, toDateOnly() (+46 more)

### Community 26 - "works.routes.js"
Cohesion: 0.14
Nodes (16): moneyRule(), changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, saveWorkController (+8 more)

### Community 27 - "react-router-dom"
Cohesion: 0.22
Nodes (18): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), useConfig(), setParentOpenedMenu(), useMenuCollapse(), Footer() (+10 more)

### Community 28 - "masterRouter.utils.js"
Cohesion: 0.23
Nodes (10): requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), paginationUsersController(), usersRoutes, deleteUserSchema (+2 more)

### Community 29 - "masterRouter.utils.test.js"
Cohesion: 0.11
Nodes (13): config, emit, forged, serviceMock, mockReq(), mockDelete, mockSave, forgedAuthor (+5 more)

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
Cohesion: 0.15
Nodes (18): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+10 more)

### Community 35 - "ForgotPassword.jsx"
Cohesion: 0.33
Nodes (8): client_src_assets_images_logo_interve, AppBar(), ElevationScroll(), Logo(), AuthCardWrapper(), AuthWrapper1, ForgotPassword(), Login()

### Community 36 - "constructionCompanies.service.js"
Cohesion: 0.47
Nodes (4): constructionCompaniesRoutes, constructionCompaniesConfig, constructionCompaniesService, ADR-0004

### Community 37 - "supervisionTypes.service.js"
Cohesion: 0.47
Nodes (4): supervisionTypesRoutes, ADR-0007, supervisionTypesConfig, supervisionTypesService

### Community 38 - "audit.service.js"
Cohesion: 0.13
Nodes (17): ADR-0001, AUDIT_OPERATIONS, diffFields(), ADR-0001, ADR-0027, protect(), REDACTED, SENSITIVE_FIELDS (+9 more)

### Community 39 - "DataTable.jsx"
Cohesion: 0.56
Nodes (6): ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable(), TableActions()

### Community 40 - "ref_jest_globals"
Cohesion: 0.11
Nodes (8): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, ctx, prismaMock

### Community 41 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 43 - "users.controller.test.js"
Cohesion: 0.33
Nodes (4): forgedAuthor, ADR-0013, mockRevokeSession, usersServiceMock

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), useSocket(), FilterPopper(), normalizeOptions() (+2 more)

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "main.routes.js"
Cohesion: 0.12
Nodes (17): ADR-0018, express, defineMaster(), addressTypesRoutes, addressTypesConfig, addressTypesService, ADR-0009, contractTypesRoutes (+9 more)

### Community 48 - "authContext.jsx"
Cohesion: 0.52
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

### Community 52 - "document.routes.js"
Cohesion: 0.23
Nodes (9): IDEMPOTENCY_HEADER, deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema, DOC_TYPES, paginationDocsSchema (+1 more)

### Community 53 - "master.service.js"
Cohesion: 0.10
Nodes (27): ADR-0013, prisma, ACTIVE_STATUS, capitalize(), createMasterService(), DELETED_STATUS, httpError(), INACTIVE_STATUS (+19 more)

### Community 54 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 55 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 56 - "transaction.mock.js"
Cohesion: 0.10
Nodes (19): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+11 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkDetailPage.jsx"
Cohesion: 0.18
Nodes (14): worksApi, WorksPage, fTerm(), fMoneyText(), fDateOnly(), DataList(), Figure(), initials() (+6 more)

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

### Community 89 - "`tbl_status`"
Cohesion: 0.16
Nodes (10): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+2 more)

### Community 94 - "SupervisionTypePage.jsx"
Cohesion: 0.25
Nodes (6): supervisionTypesApi, SupervisionTypePage, COLUMNS, FORM_FIELDS, SupervisionTypePage(), ADR-0007

### Community 95 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 100 - "profiles.routes.js"
Cohesion: 0.26
Nodes (10): deleteProfileController(), getModulesController(), ADR-0027, paginationProfilesController(), saveProfileController(), profilesRoutes, deleteProfileSchema, getModulesSchema (+2 more)

### Community 101 - "AuthenticationRoutes.jsx"
Cohesion: 0.18
Nodes (11): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router (+3 more)

### Community 106 - "MainRoutes.jsx"
Cohesion: 0.14
Nodes (12): insurersApi, ContractTypePage, InsurerPage, ProfilesPage, UsersPage, WorkDetailPage, WorkFormPage, COLUMNS (+4 more)

### Community 108 - "transaction.service.js"
Cohesion: 0.10
Nodes (19): @prisma/adapter-mariadb, @prisma/client, adapter, describeTarget(), ADR-0013, ADR-0027, testConnection(), backoff() (+11 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 117 - "formatTime.js"
Cohesion: 0.16
Nodes (3): LastModifiedCell(), fDateTime(), SHORT_MONTHS

### Community 118 - "AddressTypePage.jsx"
Cohesion: 0.25
Nodes (6): addressTypesApi, AddressTypePage, AddressTypePage(), COLUMNS, FORM_FIELDS, ADR-0009

### Community 119 - "ProviderTypePage.jsx"
Cohesion: 0.25
Nodes (6): providerTypesApi, ProviderTypePage, COLUMNS, FORM_FIELDS, ProviderTypePage(), ADR-0010

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
Cohesion: 0.18
Nodes (16): ADR-0011, PERMISSIONS, idArray(), getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController() (+8 more)

## Knowledge Gaps
- **492 isolated node(s):** `name`, `version`, `private`, `@emotion/react`, `@emotion/react` (+487 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 666 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `profiles.service.js`, `server/package.json`?**
  _High betweenness centrality (0.225) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `withAlpha`, `AuthForgotPassword.jsx`, `ProfilePage.jsx`, `WorkFormPage.jsx`, `UserDialog.jsx`, `useAuth`, `client/package.json`, `@tabler/icons-react`, `Sidebar/index.jsx`, `themes/index.jsx`, `react`, `react-router-dom`, `ForgotPassword.jsx`, `DataTable.jsx`, `NotificationSection/index.jsx`, `WorkDetailPage.jsx`, `DebouncedInput.jsx`, `AuthenticationRoutes.jsx`, `formatTime.js`, `ImageList.jsx`?**
  _High betweenness centrality (0.189) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `AuthForgotPassword.jsx`, `ProfilePage.jsx`, `WorkFormPage.jsx`, `UserDialog.jsx`, `useAuth`, `client/package.json`, `@tabler/icons-react`, `Sidebar/index.jsx`, `@mui/material`, `themes/index.jsx`, `react-router-dom`, `ForgotPassword.jsx`, `DataTable.jsx`, `NotificationSection/index.jsx`, `authContext.jsx`, `WorkDetailPage.jsx`, `DebouncedInput.jsx`, `AuthenticationRoutes.jsx`, `MainRoutes.jsx`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _492 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `transaction.service.test.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08367071524966262 - nodes in this community are weakly interconnected._
# Graph Report - WEBPAC-INTERVE  (2026-10-01)

## Corpus Check
- 387 files · ~134,844 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 1867 nodes · 4366 edges · 134 communities (93 shown, 41 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 80 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `64f1b642`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- transaction.service.test.js
- auth.service.js
- dependencies
- server/package.json
- providers.service.js
- AuthForgotPassword.jsx
- ProfilePage.jsx
- WorkFormPage.jsx
- showSuccess
- audit.service.js
- auth.routes.js
- ConstructionCompanyPage.jsx
- client/package.json
- menu-items/index.js
- validation.utils.js
- session.service.js
- constant.js
- compilerOptions
- MainCard
- providers.routes.js
- ConfigContext.jsx
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- MainLayout/index.jsx
- providers.service.test.js
- users.controller.test.js
- requests/index.js
- mailerService.js
- users.service.js
- seed.js
- idempotency.service.js
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- notifications.routes.js
- showError
- @mui/material
- ref_jest_globals
- eslint.config.mjs
- devDependencies
- ContactsEditor.jsx
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
- MenuList/index.jsx
- InsurerPage.jsx
- transaction.mock.js
- scripts
- useAuth
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
- MainRoutes.jsx
- auth.service.test.js
- masterRouter.utils.js
- AuthenticationRoutes.jsx
- `tbl_providers`
- auth.controller.test.js
- react-router-dom
- Default/index.jsx
- master.service.test.js
- `tbl_works`
- masterRouter.utils.test.js
- `tbl_insurers`
- idempotency.service.test.js
- permissions.service.test.js
- AddressTypePage.jsx
- ProviderTypePage.jsx
- authjwt.middleware.js
- ContractTypePage.jsx
- EasyCrop.jsx
- works.service.test.js
- ImageList.jsx
- permissions.routes.js
- WorkProviderDialog.jsx
- prismaClient.js
- IdentityDocumentPage.jsx
- authjwt.middleware.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 89 edges
2. `react` - 66 edges
3. `useAuth()` - 49 edges
4. `showError()` - 39 edges
5. `writeAudit()` - 35 edges
6. `showSuccess()` - 35 edges
7. `@tabler/icons-react` - 35 edges
8. `withLockedTransaction()` - 32 edges
9. `auditContext()` - 30 edges
10. `MasterPage()` - 29 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `insertNotification()` --calls--> `getIO()`  [EXTRACTED]
  server/src/modules/app/notifications/notifications.service.js → server/src/common/configs/socket.manager.js
- `ContactDialog()` --calls--> `BaseDialog()`  [EXTRACTED]
  client/src/ui-component/extended/ContactsEditor.jsx → client/src/ui-component/extended/BaseDialog.jsx
- `ContactDialog()` --calls--> `SelectSocket()`  [EXTRACTED]
  client/src/ui-component/extended/ContactsEditor.jsx → client/src/ui-component/extended/SelectSocket.jsx

## Import Cycles
- None detected.

## Communities (134 total, 41 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.05
Nodes (46): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow() (+38 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "transaction.service.test.js"
Cohesion: 0.08
Nodes (29): ref_fs, ref_path, ref_url, concurrencyError(), errorMiddleware(), isMySqlCode(), ADR-0012, ADR-0027 (+21 more)

### Community 3 - "auth.service.js"
Cohesion: 0.09
Nodes (34): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+26 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+26 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (52): ACTIVE_STATUS, applyContacts(), assertAddressTypes(), assertAssignmentDate(), assertContacts(), assertIdentification(), assertProviderAssignable(), assertWorkAssignable() (+44 more)

### Community 7 - "AuthForgotPassword.jsx"
Cohesion: 0.22
Nodes (14): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber(), hasSpecial() (+6 more)

### Community 8 - "ProfilePage.jsx"
Cohesion: 0.28
Nodes (12): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), SearchInput(), chipBg(), chipText(), StatusTabs() (+4 more)

### Community 9 - "WorkFormPage.jsx"
Cohesion: 0.26
Nodes (14): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), EditableList(), EMPTY_FORM, moneyRules(), rowKey() (+6 more)

### Community 10 - "showSuccess"
Cohesion: 0.10
Nodes (32): getModulesAPI(), getProfilesAPI(), saveProfileAPI(), getBasicInformationAPI(), saveUserAPI(), updateAccountAPI(), updatePasswordAPI(), genericRequest (+24 more)

### Community 11 - "audit.service.js"
Cohesion: 0.11
Nodes (30): AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0013, ADR-0027, newOperationId() (+22 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "ConstructionCompanyPage.jsx"
Cohesion: 0.25
Nodes (6): constructionCompaniesApi, ConstructionCompanyPage, COLUMNS, ConstructionCompanyPage(), FORM_FIELDS, ADR-0004

### Community 14 - "client/package.json"
Cohesion: 0.10
Nodes (20): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+12 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (14): admin, icons, dashboard, icons, menuItems, icons, other, icons (+6 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.13
Nodes (19): express-validator, createMasterSchemas(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0001, ADR-0027, nullable (+11 more)

### Community 17 - "session.service.js"
Cohesion: 0.08
Nodes (31): ADR-0001, ref_crypto, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken() (+23 more)

### Community 18 - "constant.js"
Cohesion: 0.39
Nodes (5): closedMixin(), MiniDrawerStyled, openedMixin(), appDrawerWidth, drawerWidth

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "MainCard"
Cohesion: 0.19
Nodes (15): gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard(), Avatar(), AuthCardWrapper(), SamplePage() (+7 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.10
Nodes (29): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+21 more)

### Community 22 - "ConfigContext.jsx"
Cohesion: 0.47
Nodes (4): config, ConfigContext, ConfigProvider(), useLocalStorage()

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (57): ADR-0015, @prisma/client, MONEY_SCALE, moneyText(), toMoney(), addTerm(), dateOnlyText(), daysInMonth() (+49 more)

### Community 26 - "works.routes.js"
Cohesion: 0.14
Nodes (17): moneyRule(), changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, saveWorkController (+9 more)

### Community 27 - "MainLayout/index.jsx"
Cohesion: 0.27
Nodes (11): handlerDrawerOpen(), useConfig(), Footer(), Header(), ProfileSection(), MainLayout(), LogoSection(), MainContentStyled (+3 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.17
Nodes (10): ALL, contact(), ctx, existingRow, input(), ADR-0012, prismaMock, state (+2 more)

### Community 29 - "users.controller.test.js"
Cohesion: 0.09
Nodes (16): mockReq(), mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock, forgedAuthor, ADR-0013 (+8 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "users.service.js"
Cohesion: 0.09
Nodes (23): bcrypt, hashPassword(), DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008 (+15 more)

### Community 33 - "seed.js"
Cohesion: 0.18
Nodes (9): ADDRESS_TYPES, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES, SUPERVISION_TYPES (+1 more)

### Community 34 - "idempotency.service.js"
Cohesion: 0.14
Nodes (19): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+11 more)

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.09
Nodes (18): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+10 more)

### Community 37 - "notifications.routes.js"
Cohesion: 0.22
Nodes (13): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), insertNotification() (+5 more)

### Community 38 - "showError"
Cohesion: 0.17
Nodes (23): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), ADR-0012, providersApi, getProviderTypesSelectAPI, showError(), SelectSocket(), DIAN_WEIGHTS (+15 more)

### Community 39 - "@mui/material"
Cohesion: 0.12
Nodes (20): ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable(), BInputLabel, InputLabel(), STATUS_NAMES (+12 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.11
Nodes (9): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, forged, ADR-0013 (+1 more)

### Community 41 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 43 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "main.routes.js"
Cohesion: 0.08
Nodes (24): ADR-0018, defineMaster(), addressTypesRoutes, addressTypesConfig, addressTypesService, ADR-0009, constructionCompaniesRoutes, constructionCompaniesConfig (+16 more)

### Community 48 - "authContext.jsx"
Cohesion: 0.13
Nodes (18): loginAPI(), logoutAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), instance, NO_REFRESH_URLS, refreshClient, refreshSession() (+10 more)

### Community 49 - "identityDocuments.service.js"
Cohesion: 0.38
Nodes (5): identityDocumentsRoutes, identityDocumentsConfig, identityDocumentsService, ADR-0008, ADR-0013

### Community 50 - "server.js"
Cohesion: 0.24
Nodes (9): ref_http, node-cron, app, server, cronJobs, registeredTasks, startCronJobs(), stopCronJobs() (+1 more)

### Community 51 - "app.routes.js"
Cohesion: 0.26
Nodes (9): getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001, getStatusesByScopeSchema (+1 more)

### Community 52 - "constants.js"
Cohesion: 0.15
Nodes (15): SocketContext, useSocket(), FilterPopper(), normalizeOptions(), SocketDropdownFilter(), TooltipLongText(), pathSocket, STATUS_TABS (+7 more)

### Community 53 - "master.service.js"
Cohesion: 0.13
Nodes (25): ACTIVE_STATUS, capitalize(), createMasterService(), DELETED_STATUS, httpError(), INACTIVE_STATUS, ADR-0004, ADR-0027 (+17 more)

### Community 54 - "MenuList/index.jsx"
Cohesion: 0.36
Nodes (5): getMenuAPI(), ElevationScroll(), HorizontalBar(), getIconByName(), MenuList()

### Community 55 - "InsurerPage.jsx"
Cohesion: 0.25
Nodes (6): insurersApi, InsurerPage, COLUMNS, FORM_FIELDS, InsurerPage(), ADR-0003

### Community 56 - "transaction.mock.js"
Cohesion: 0.10
Nodes (18): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+10 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "useAuth"
Cohesion: 0.10
Nodes (33): getStatusesByScopeAPI(), worksApi, useAuth(), ProvidersPage, WorksPage, PrivateRoute(), DataList(), Figure() (+25 more)

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

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.12
Nodes (15): supervisionTypesApi, router, MainRoutes, ProfilesPage, ProviderDetailPage, ProviderFormPage, SupervisionTypePage, UsersPage (+7 more)

### Community 95 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 100 - "masterRouter.utils.js"
Cohesion: 0.12
Nodes (25): express, getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers() (+17 more)

### Community 101 - "AuthenticationRoutes.jsx"
Cohesion: 0.12
Nodes (18): client_src_assets_images_interve, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+10 more)

### Community 104 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 105 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 106 - "react-router-dom"
Cohesion: 0.33
Nodes (10): endpoints, initialState, useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), NavCollapse(), NavGroup(), NavItem() (+2 more)

### Community 108 - "Default/index.jsx"
Cohesion: 0.47
Nodes (4): DashboardDefault, CardGrid(), Dashboard(), testCards

### Community 112 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 114 - "masterRouter.utils.test.js"
Cohesion: 0.33
Nodes (4): config, emit, forged, serviceMock

### Community 117 - "permissions.service.test.js"
Cohesion: 0.50
Nodes (3): mockGetEffectivePermissionIds, mockGetIO, prismaMock

### Community 118 - "AddressTypePage.jsx"
Cohesion: 0.25
Nodes (6): addressTypesApi, AddressTypePage, AddressTypePage(), COLUMNS, FORM_FIELDS, ADR-0009

### Community 119 - "ProviderTypePage.jsx"
Cohesion: 0.25
Nodes (6): providerTypesApi, ProviderTypePage, COLUMNS, FORM_FIELDS, ProviderTypePage(), ADR-0010

### Community 120 - "authjwt.middleware.js"
Cohesion: 0.23
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 121 - "ContractTypePage.jsx"
Cohesion: 0.25
Nodes (6): contractTypesApi, ContractTypePage, COLUMNS, ContractTypePage(), FORM_FIELDS, ADR-0006

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 124 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 125 - "permissions.routes.js"
Cohesion: 0.13
Nodes (20): ADR-0011, ADR-0012, PERMISSIONS, supervisionTypesRoutes, ADR-0007, supervisionTypesConfig, supervisionTypesService, getAllPagesController() (+12 more)

### Community 130 - "WorkProviderDialog.jsx"
Cohesion: 0.31
Nodes (8): getProvidersSelectAPI(), workProvidersApi, DateField(), toDate(), ADR-0012, today(), WorkProviderDialog(), date-fns

### Community 131 - "prismaClient.js"
Cohesion: 0.13
Nodes (13): @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), getEffectivePermissionIds() (+5 more)

### Community 134 - "IdentityDocumentPage.jsx"
Cohesion: 0.25
Nodes (6): identityDocumentsApi, IdentityDocumentPage, COLUMNS, FORM_FIELDS, IdentityDocumentPage(), ADR-0008

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

## Knowledge Gaps
- **543 isolated node(s):** `ADR-0012`, `work`, `EMPTY`, `FIELDS`, `ADR-0009` (+538 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 736 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `master.service.js`, `server/package.json`?**
  _High betweenness centrality (0.209) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `WorkProviderDialog.jsx`, `AuthForgotPassword.jsx`, `ProfilePage.jsx`, `WorkFormPage.jsx`, `showSuccess`, `client/package.json`, `constant.js`, `MainCard`, `MainLayout/index.jsx`, `DocumentManagement.jsx`, `showError`, `ContactsEditor.jsx`, `NotificationSection/index.jsx`, `constants.js`, `MenuList/index.jsx`, `useAuth`, `DebouncedInput.jsx`, `formatNumber.js`, `AuthenticationRoutes.jsx`, `react-router-dom`, `Default/index.jsx`, `EasyCrop.jsx`, `ImageList.jsx`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **Why does `react` connect `@mui/material` to `overrides/index.js`, `WorkProviderDialog.jsx`, `AuthForgotPassword.jsx`, `ProfilePage.jsx`, `WorkFormPage.jsx`, `showSuccess`, `client/package.json`, `ConfigContext.jsx`, `MainLayout/index.jsx`, `DocumentManagement.jsx`, `showError`, `ContactsEditor.jsx`, `NotificationSection/index.jsx`, `authContext.jsx`, `constants.js`, `MenuList/index.jsx`, `useAuth`, `DebouncedInput.jsx`, `MainRoutes.jsx`, `AuthenticationRoutes.jsx`, `react-router-dom`, `EasyCrop.jsx`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `ADR-0012`, `work`, `EMPTY` to the rest of the system?**
  _543 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05063291139240506 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `transaction.service.test.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07804878048780488 - nodes in this community are weakly interconnected._
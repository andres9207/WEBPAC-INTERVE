# Graph Report - WEBPAC-INTERVE  (2026-10-02)

## Corpus Check
- 389 files · ~137,477 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 1887 nodes · 4449 edges · 130 communities (90 shown, 40 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 79 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4ce6ed32`
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
- showSuccess
- WorkFormPage.jsx
- UserDialog.jsx
- audit.service.js
- auth.routes.js
- profiles.routes.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- session.service.js
- Sidebar/index.jsx
- compilerOptions
- @mui/material
- providers.routes.js
- react
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- handleFirebase.js
- providers.service.test.js
- users.controller.test.js
- requests/index.js
- mailerService.js
- transaction.service.js
- WorksPage.jsx
- idempotency.service.js
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- notifications.routes.js
- showError
- ref_prop_types
- ref_jest_globals
- eslint.config.mjs
- devDependencies
- ContactsEditor.jsx
- src/index.jsx
- NotificationSection/index.jsx
- scripts
- insurers.service.js
- authContext.jsx
- session.service.test.js
- server.js
- app.routes.js
- constants.js
- users.service.js
- SupervisionTypePage.jsx
- useAuth
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
- MainRoutes.jsx
- auth.service.test.js
- masterRouter.utils.js
- AuthenticationRoutes.jsx
- `tbl_providers`
- auth.controller.test.js
- react-router-dom
- ProvidersPage.jsx
- master.service.test.js
- `tbl_works`
- permissions.controller.test.js
- `tbl_insurers`
- InputLabel.jsx
- ProviderTypePage.jsx
- providerTypes.service.js
- works.service.test.js
- themes/index.jsx
- permissions.routes.js
- WorkProviderDialog.jsx
- prismaClient.js
- IdentityDocumentPage.jsx
- authjwt.middleware.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 91 edges
2. `react` - 67 edges
3. `useAuth()` - 49 edges
4. `showError()` - 41 edges
5. `@tabler/icons-react` - 36 edges
6. `showSuccess()` - 35 edges
7. `writeAudit()` - 35 edges
8. `MasterPage()` - 32 edges
9. `withLockedTransaction()` - 32 edges
10. `auditContext()` - 30 edges

## Surprising Connections (you probably didn't know these)
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `MasterPage()` --calls--> `showError()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/services/ToastService.js
- `MasterPage()` --calls--> `showSuccess()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/services/ToastService.js
- `MasterPage()` --calls--> `MainCard()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/ui-component/cards/MainCard.jsx
- `MasterPage()` --calls--> `ConfirmDialog()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/ui-component/extended/ConfirmDialog.jsx

## Import Cycles
- None detected.

## Communities (130 total, 40 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.06
Nodes (39): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Avatar() (+31 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "transaction.service.test.js"
Cohesion: 0.08
Nodes (29): ref_fs, ref_path, ref_url, concurrencyError(), errorMiddleware(), isMySqlCode(), ADR-0012, ADR-0027 (+21 more)

### Community 3 - "auth.service.js"
Cohesion: 0.10
Nodes (29): bcrypt, ref_crypto, REDACTED, backoff(), runTransaction(), withTransaction(), comparePassword(), hashPassword() (+21 more)

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
Cohesion: 0.18
Nodes (15): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), defaultColor, AnimateButton(), CustomFormControl, hasMixed(), hasNumber() (+7 more)

### Community 8 - "showSuccess"
Cohesion: 0.18
Nodes (20): deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), paginationUsersAPI(), defaultConfig (+12 more)

### Community 9 - "WorkFormPage.jsx"
Cohesion: 0.24
Nodes (15): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), EditableList(), EMPTY_FORM, moneyRules(), rowKey() (+7 more)

### Community 10 - "UserDialog.jsx"
Cohesion: 0.14
Nodes (17): getBasicInformationAPI(), saveUserAPI(), updateAccountAPI(), updatePasswordAPI(), Accordion(), BaseDialog(), findOption(), flattenOptions() (+9 more)

### Community 11 - "audit.service.js"
Cohesion: 0.08
Nodes (40): AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0013, ADR-0027, newOperationId() (+32 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "profiles.routes.js"
Cohesion: 0.19
Nodes (13): getIO(), IDEMPOTENCY_HEADER, insertNotification(), deleteProfileController(), getModulesController(), ADR-0027, paginationProfilesController(), saveProfileController() (+5 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+13 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (14): admin, icons, dashboard, icons, menuItems, icons, other, icons (+6 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.18
Nodes (14): express-validator, createMasterSchemas(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0001, ADR-0027, nullable (+6 more)

### Community 17 - "session.service.js"
Cohesion: 0.08
Nodes (35): ADR-0001, jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed() (+27 more)

### Community 18 - "Sidebar/index.jsx"
Cohesion: 0.20
Nodes (11): LogoSection(), Sidebar(), closedMixin(), MiniDrawerStyled, openedMixin(), DashboardDefault, appDrawerWidth, drawerWidth (+3 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "@mui/material"
Cohesion: 0.19
Nodes (15): gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard(), Avatar(), AuthCardWrapper(), SamplePage() (+7 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.10
Nodes (29): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+21 more)

### Community 22 - "react"
Cohesion: 0.13
Nodes (8): ConfigProvider(), useLocalStorage(), FilterPopper(), normalizeOptions(), SocketDropdownFilter(), lodash-es, react, react-easy-crop

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (63): ADR-0015, @prisma/client, MONEY_SCALE, moneyText(), sumMoney(), toMoney(), addTerm(), dateOnlyText() (+55 more)

### Community 26 - "works.routes.js"
Cohesion: 0.13
Nodes (18): moneyRule(), changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, saveWorkController (+10 more)

### Community 27 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 28 - "providers.service.test.js"
Cohesion: 0.17
Nodes (10): ALL, contact(), ctx, existingRow, input(), ADR-0012, prismaMock, state (+2 more)

### Community 29 - "users.controller.test.js"
Cohesion: 0.09
Nodes (16): mockReq(), mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock, forgedAuthor, ADR-0013 (+8 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "transaction.service.js"
Cohesion: 0.27
Nodes (9): buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES, toSortedIds() (+1 more)

### Community 33 - "WorksPage.jsx"
Cohesion: 0.25
Nodes (7): getWorksSummaryAPI(), worksApi, WorksPage, WorksSummary(), COLUMNS, ADR-0011, WorksPage()

### Community 34 - "idempotency.service.js"
Cohesion: 0.12
Nodes (18): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+10 more)

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.24
Nodes (14): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+6 more)

### Community 37 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 38 - "showError"
Cohesion: 0.17
Nodes (23): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), ADR-0012, providersApi, getProviderTypesSelectAPI, showError(), SelectSocket(), DIAN_WEIGHTS (+15 more)

### Community 39 - "ref_prop_types"
Cohesion: 0.16
Nodes (17): ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable(), ROWS_PER_PAGE_OPTIONS, STATUS_NAMES, filterOptions (+9 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.15
Nodes (5): ref_jest_globals, prismaMock, mockValidationResult, ctx, prismaMock

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
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), ProfileSection(), HeaderAvatar(), MobileSearch() (+2 more)

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "insurers.service.js"
Cohesion: 0.38
Nodes (5): ADR-0018, insurersRoutes, insurersConfig, insurersService, ADR-0003

### Community 48 - "authContext.jsx"
Cohesion: 0.21
Nodes (10): loginAPI(), logoutAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), App(), AuthContext, AuthProvider(), getStoredUser() (+2 more)

### Community 49 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 50 - "server.js"
Cohesion: 0.24
Nodes (9): ref_http, node-cron, app, server, cronJobs, registeredTasks, startCronJobs(), stopCronJobs() (+1 more)

### Community 51 - "app.routes.js"
Cohesion: 0.26
Nodes (9): getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001, getStatusesByScopeSchema (+1 more)

### Community 52 - "constants.js"
Cohesion: 0.11
Nodes (18): genericRequest, instance, NO_REFRESH_URLS, refreshClient, refreshSession(), SocketContext, SocketProvider(), TooltipLongText() (+10 more)

### Community 53 - "users.service.js"
Cohesion: 0.07
Nodes (41): ACTIVE_STATUS, capitalize(), createMasterService(), DELETED_STATUS, httpError(), INACTIVE_STATUS, ADR-0004, ADR-0027 (+33 more)

### Community 54 - "SupervisionTypePage.jsx"
Cohesion: 0.25
Nodes (6): supervisionTypesApi, SupervisionTypePage, COLUMNS, FORM_FIELDS, SupervisionTypePage(), ADR-0007

### Community 55 - "useAuth"
Cohesion: 0.09
Nodes (22): addressTypesApi, contractTypesApi, insurersApi, useAuth(), AddressTypePage, ContractTypePage, InsurerPage, PrivateRoute() (+14 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.10
Nodes (19): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+11 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkDetailPage.jsx"
Cohesion: 0.11
Nodes (25): getStatusesByScopeAPI(), useSocket(), DataList(), Figure(), Pending(), CACHE_PENDING, STATUS_CACHE, StatusChip() (+17 more)

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
Cohesion: 0.11
Nodes (16): constructionCompaniesApi, AuthenticationRoutes, router, ConstructionCompanyPage, MainRoutes, ProfilesPage, ProviderDetailPage, ProviderFormPage (+8 more)

### Community 95 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 100 - "masterRouter.utils.js"
Cohesion: 0.12
Nodes (22): express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), deleteModuleDoc() (+14 more)

### Community 101 - "AuthenticationRoutes.jsx"
Cohesion: 0.13
Nodes (17): client_src_assets_images_interve, MinimalLayout(), ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), AppBar() (+9 more)

### Community 104 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 105 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 106 - "react-router-dom"
Cohesion: 0.18
Nodes (20): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), Footer() (+12 more)

### Community 108 - "ProvidersPage.jsx"
Cohesion: 0.33
Nodes (4): ProvidersPage, COLUMNS, ADR-0012, ProvidersPage()

### Community 112 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 114 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 119 - "ProviderTypePage.jsx"
Cohesion: 0.25
Nodes (6): providerTypesApi, ProviderTypePage, COLUMNS, FORM_FIELDS, ProviderTypePage(), ADR-0010

### Community 121 - "providerTypes.service.js"
Cohesion: 0.38
Nodes (5): ADR-0006, providerTypesRoutes, ADR-0010, providerTypesConfig, providerTypesService

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 124 - "themes/index.jsx"
Cohesion: 0.15
Nodes (15): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, useConfig(), ElevationScroll(), HorizontalBar() (+7 more)

### Community 125 - "permissions.routes.js"
Cohesion: 0.06
Nodes (41): ADR-0011, ADR-0012, PERMISSIONS, defineMaster(), addressTypesRoutes, addressTypesConfig, addressTypesService, ADR-0009 (+33 more)

### Community 130 - "WorkProviderDialog.jsx"
Cohesion: 0.18
Nodes (13): getProvidersSelectAPI(), workProvidersApi, DateField(), toDate(), SearchSelect(), STATUS_OPTIONS, ADR-0012, today() (+5 more)

### Community 131 - "prismaClient.js"
Cohesion: 0.08
Nodes (23): @prisma/adapter-mariadb, ADDRESS_TYPES, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES (+15 more)

### Community 134 - "IdentityDocumentPage.jsx"
Cohesion: 0.25
Nodes (6): identityDocumentsApi, IdentityDocumentPage, COLUMNS, FORM_FIELDS, IdentityDocumentPage(), ADR-0008

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

## Knowledge Gaps
- **546 isolated node(s):** `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS`, `COLUMNS`, `ADR-0011`, `LEVEL_COLORS` (+541 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 739 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `audit.service.js`, `server/package.json`?**
  _High betweenness centrality (0.210) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `WorkProviderDialog.jsx`, `AuthForgotPassword.jsx`, `showSuccess`, `WorkFormPage.jsx`, `UserDialog.jsx`, `client/package.json`, `Sidebar/index.jsx`, `react`, `WorksPage.jsx`, `DocumentManagement.jsx`, `showError`, `ref_prop_types`, `ContactsEditor.jsx`, `NotificationSection/index.jsx`, `constants.js`, `useAuth`, `WorkDetailPage.jsx`, `DebouncedInput.jsx`, `formatNumber.js`, `AuthenticationRoutes.jsx`, `react-router-dom`, `ProvidersPage.jsx`, `InputLabel.jsx`, `themes/index.jsx`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `WorkProviderDialog.jsx`, `AuthForgotPassword.jsx`, `showSuccess`, `WorkFormPage.jsx`, `UserDialog.jsx`, `client/package.json`, `Sidebar/index.jsx`, `WorksPage.jsx`, `DocumentManagement.jsx`, `showError`, `ref_prop_types`, `ContactsEditor.jsx`, `NotificationSection/index.jsx`, `authContext.jsx`, `constants.js`, `WorkDetailPage.jsx`, `DebouncedInput.jsx`, `MainRoutes.jsx`, `AuthenticationRoutes.jsx`, `react-router-dom`, `ProvidersPage.jsx`, `themes/index.jsx`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS`, `COLUMNS` to the rest of the system?**
  _546 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.058384547848990345 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `transaction.service.test.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07804878048780488 - nodes in this community are weakly interconnected._
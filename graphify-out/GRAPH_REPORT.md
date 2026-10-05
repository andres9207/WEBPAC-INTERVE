# Graph Report - WEBPAC-INTERVE  (2026-10-05)

## Corpus Check
- 453 files · ~182,931 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 2367 nodes · 5912 edges · 142 communities (92 shown, 50 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 98 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d4d23ff1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- contractConcepts.service.js
- auth.service.js
- dependencies
- server/package.json
- providers.service.js
- seed.demo.js
- ToastService.js
- eslint.config.mjs
- contractSuspensions.service.js
- contractConcepts.service.test.js
- auditContext
- authjwt.middleware.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- permissions.constants.js
- auth.controller.test.js
- compilerOptions
- AuthenticationRoutes.jsx
- providers.routes.js
- master.service.test.js
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- DebouncedInput.jsx
- providers.service.test.js
- contracts.controller.test.js
- session.service.js
- mailerService.js
- contracts.routes.js
- audit.service.js
- prismaClient.js
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- getIO
- ProviderFormPage.jsx
- constants.js
- ref_jest_globals
- ConceptDialog.jsx
- devDependencies
- src/index.jsx
- @mui/material
- scripts
- volta
- react-router-dom
- server.js
- app.routes.js
- WorkFormPage.jsx
- users.service.js
- `tbl_contract_type_fields`
- contractFields.js
- transaction.mock.js
- scripts
- useAuth
- winston.config.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- MainLayout/index.jsx
- extends
- transaction.service.test.js
- Sidebar/index.jsx
- NotificationSection/index.jsx
- authContext.jsx
- EasyCrop.jsx
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- useConfig
- images.js
- `tbl_contracts`
- notifications.routes.js
- contracts.service.js
- users.service.test.js
- `tbl_works`
- `tbl_insurers`
- ContactsEditor.jsx
- uniqueConstraints.constants.test.js
- browserslist
- error.middleware.js
- session.service.test.js
- `tbl_providers`
- works.service.test.js
- status.service.test.js
- masterRouter.utils.js
- seed.js
- FilterPopper.jsx
- uniqueConstraints.constants.js
- contractSuspensions.service.test.js
- WorksPage.jsx
- authjwt.middleware.test.js
- react
- `tbl_work_stages`
- volta

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 103 edges
2. `react` - 78 edges
3. `useAuth()` - 61 edges
4. `showError()` - 53 edges
5. `writeAudit()` - 46 edges
6. `showSuccess()` - 45 edges
7. `withLockedTransaction()` - 44 edges
8. `auditContext()` - 39 edges
9. `@tabler/icons-react` - 39 edges
10. `MasterPage()` - 35 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `ContractFormPage()` --indirect_call--> `previewContractEndDateAPI()`  [INFERRED]
  client/src/views/work/contracts/ContractFormPage.jsx → client/src/api/requests/contractsApi.js
- `ConceptDialog()` --calls--> `getContractFieldsAPI()`  [EXTRACTED]
  client/src/views/work/contracts/components/ConceptDialog.jsx → client/src/api/requests/contractsApi.js
- `suspendContractAPI()` --calls--> `idempotencyConfig()`  [EXTRACTED]
  client/src/api/requests/contractsApi.js → client/src/utils/idempotency.js
- `WorkFormPage()` --indirect_call--> `previewWorkEndDateAPI()`  [INFERRED]
  client/src/views/work/works/WorkFormPage.jsx → client/src/api/requests/worksApi.js

## Import Cycles
- None detected.

## Communities (142 total, 50 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.05
Nodes (43): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), ThemeCustomization(), Alert() (+35 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "contractConcepts.service.js"
Cohesion: 0.20
Nodes (26): activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget(), configuredConcept(), createAmendment() (+18 more)

### Community 3 - "auth.service.js"
Cohesion: 0.08
Nodes (36): bcrypt, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+28 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (32): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+24 more)

### Community 6 - "providers.service.js"
Cohesion: 0.06
Nodes (70): nit(), DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, nitCheckDigit() (+62 more)

### Community 7 - "seed.demo.js"
Cohesion: 0.09
Nodes (30): ref_node_crypto, ADDRESS_TYPE, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC, log() (+22 more)

### Community 8 - "ToastService.js"
Cohesion: 0.10
Nodes (28): deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), paginationUsersAPI(), saveUserAPI() (+20 more)

### Community 9 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 10 - "contractSuspensions.service.js"
Cohesion: 0.08
Nodes (46): ADR-0026, @prisma/client, MONEY_SCALE, sumMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL (+38 more)

### Community 11 - "contractConcepts.service.test.js"
Cohesion: 0.22
Nodes (4): ctx, ADR-0016, prismaMock, state

### Community 12 - "auditContext"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "authjwt.middleware.js"
Cohesion: 0.14
Nodes (14): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+6 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+13 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (14): admin, icons, dashboard, icons, menuItems, icons, other, icons (+6 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.12
Nodes (20): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0001, ADR-0009 (+12 more)

### Community 17 - "permissions.constants.js"
Cohesion: 0.09
Nodes (28): ADR-0011, ADR-0006, ADR-0012, ADR-0016, ADR-0017, PERMISSIONS, providerTypesRoutes, ADR-0006 (+20 more)

### Community 18 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthenticationRoutes.jsx"
Cohesion: 0.12
Nodes (19): client_src_assets_images_interve, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+11 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 22 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.10
Nodes (51): diffFields(), writeAudit(), withLockedTransaction(), toMoney(), updateAccount(), deleteUser(), deleteContract(), changeProviderStatus() (+43 more)

### Community 26 - "works.routes.js"
Cohesion: 0.13
Nodes (19): changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, previewWorkEndDateController, saveWorkController (+11 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.17
Nodes (10): ALL, contact(), ctx, existingRow, input(), ADR-0012, prismaMock, state (+2 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.06
Nodes (25): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+17 more)

### Community 30 - "session.service.js"
Cohesion: 0.11
Nodes (26): IDEMPOTENCY_HEADER, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME (+18 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.08
Nodes (37): moneyRule(), percentRule(), ACT_FIELDS, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController, createLiquidationController, deleteContractController (+29 more)

### Community 33 - "audit.service.js"
Cohesion: 0.13
Nodes (17): ADR-0001, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0013, ADR-0027, protect() (+9 more)

### Community 34 - "prismaClient.js"
Cohesion: 0.10
Nodes (18): @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), getEffectivePermissionIds() (+10 more)

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 37 - "getIO"
Cohesion: 0.14
Nodes (16): getIO(), FIELD_ATTRIBUTES, getContractTypeFieldsController, pickField(), saveContractTypeFieldsController, insertNotification(), deleteProfileController(), getModulesController() (+8 more)

### Community 38 - "ProviderFormPage.jsx"
Cohesion: 0.08
Nodes (44): suspendContractAPI(), getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi (+36 more)

### Community 39 - "constants.js"
Cohesion: 0.12
Nodes (15): reasonsApi, ReasonPage, TooltipLongText(), ADR-0017, REASON_SCOPE_OPTIONS, reasonScopeName(), STATUS_TABS, TERM_UNIT_NAMES (+7 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (15): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, payload, prismaMock, activeUser, mockComparePassword (+7 more)

### Community 41 - "ConceptDialog.jsx"
Cohesion: 0.08
Nodes (34): getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), Accordion(), BaseDialog(), findOption(), flattenOptions(), GenericFormSection (+26 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "@mui/material"
Cohesion: 0.09
Nodes (33): appDrawerWidth, gridSpacing, CardGrid(), CardSecondaryAction(), headerStyle, MainCard(), SubCard(), ACTION_TONES (+25 more)

### Community 46 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart, pm2:start (+5 more)

### Community 48 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 49 - "react-router-dom"
Cohesion: 0.44
Nodes (8): useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), NavCollapse(), NavGroup(), NavItem(), @mui/icons-material, react-router-dom

### Community 50 - "server.js"
Cohesion: 0.19
Nodes (11): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, registeredTasks (+3 more)

### Community 51 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 52 - "WorkFormPage.jsx"
Cohesion: 0.08
Nodes (45): getConstructionCompaniesSelectAPI, contractConceptsApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016 (+37 more)

### Community 53 - "users.service.js"
Cohesion: 0.06
Nodes (63): ADR-0013, ADR-0027, ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, newOperationId(), canonical(), EXCLUDED_FROM_FINGERPRINT (+55 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "contractFields.js"
Cohesion: 0.21
Nodes (12): CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, resolveFields() (+4 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.08
Nodes (21): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+13 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "useAuth"
Cohesion: 0.08
Nodes (47): getStatusesByScopeAPI(), useAuth(), ContractsPage, PrivateRoute(), showError(), showSuccess(), useSocket(), DataList() (+39 more)

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

### Community 66 - "MainLayout/index.jsx"
Cohesion: 0.29
Nodes (7): Footer(), MainLayout(), MainContentStyled, Breadcrumbs(), BTitle(), Loadable(), Loader()

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "transaction.service.test.js"
Cohesion: 0.19
Nodes (11): ref_path, ref_url, status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT (+3 more)

### Community 70 - "Sidebar/index.jsx"
Cohesion: 0.24
Nodes (11): endpoints, handlerDrawerOpen(), initialState, getMenuAPI(), getIconByName(), MenuList(), Sidebar(), closedMixin() (+3 more)

### Community 71 - "NotificationSection/index.jsx"
Cohesion: 0.24
Nodes (13): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), Header(), NotificationSection(), ProfileSection(), HeaderAvatar() (+5 more)

### Community 73 - "authContext.jsx"
Cohesion: 0.05
Nodes (51): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), contractTypesApi, getContractTypeFieldsAPI() (+43 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.10
Nodes (16): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+8 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.05
Nodes (48): addressTypesApi, constructionCompaniesApi, identityDocumentsApi, getInsurersSelectAPI, insurersApi, providerTypesApi, supervisionTypesApi, createMasterApi() (+40 more)

### Community 100 - "useConfig"
Cohesion: 0.29
Nodes (8): ConfigContext, useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 101 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 104 - "`tbl_contracts`"
Cohesion: 0.06
Nodes (26): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+18 more)

### Community 105 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 108 - "contracts.service.js"
Cohesion: 0.09
Nodes (48): moneyText(), FIELD_GROUPS, assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditableContract() (+40 more)

### Community 112 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 116 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 117 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (8): created, DATABASE, declared, dropped, inDatabase, MIGRATIONS, sql, withMessage

### Community 118 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 119 - "error.middleware.js"
Cohesion: 0.24
Nodes (15): ADR-0012, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS (+7 more)

### Community 120 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 124 - "status.service.test.js"
Cohesion: 0.33
Nodes (4): ref_fs, catalog, expected, prismaMock

### Community 125 - "masterRouter.utils.js"
Cohesion: 0.06
Nodes (42): ADR-0018, express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), defineMaster(), createMasterControllers() (+34 more)

### Community 130 - "seed.js"
Cohesion: 0.17
Nodes (10): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES (+2 more)

### Community 131 - "FilterPopper.jsx"
Cohesion: 0.60
Nodes (4): FilterPopper(), normalizeOptions(), SocketDropdownFilter(), lodash-es

### Community 132 - "uniqueConstraints.constants.js"
Cohesion: 0.50
Nodes (3): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES

### Community 133 - "contractSuspensions.service.test.js"
Cohesion: 0.07
Nodes (18): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, ADR-0006, prismaMock, state, ctx (+10 more)

### Community 136 - "WorksPage.jsx"
Cohesion: 0.13
Nodes (9): getWorksSummaryAPI(), WorksPage, MoneyField(), moneyInputText(), parseMoneyInput(), WorksSummary(), COLUMNS, ADR-0011 (+1 more)

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 142 - "react"
Cohesion: 0.18
Nodes (7): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigProvider(), useLocalStorage(), react

### Community 151 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **662 isolated node(s):** `ADR-0006`, `ADR-0016`, `ADR-0017`, `filterOptions`, `EMPTY_FORM` (+657 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 929 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **50 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `FilterPopper.jsx`, `ToastService.js`, `WorksPage.jsx`, `client/package.json`, `react`, `AuthenticationRoutes.jsx`, `DebouncedInput.jsx`, `DocumentManagement.jsx`, `ProviderFormPage.jsx`, `constants.js`, `ConceptDialog.jsx`, `react-router-dom`, `WorkFormPage.jsx`, `useAuth`, `MainLayout/index.jsx`, `Sidebar/index.jsx`, `NotificationSection/index.jsx`, `authContext.jsx`, `EasyCrop.jsx`, `useConfig`, `ContactsEditor.jsx`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `overrides/index.js`, `FilterPopper.jsx`, `ToastService.js`, `WorksPage.jsx`, `client/package.json`, `AuthenticationRoutes.jsx`, `DebouncedInput.jsx`, `DocumentManagement.jsx`, `ProviderFormPage.jsx`, `ConceptDialog.jsx`, `@mui/material`, `react-router-dom`, `WorkFormPage.jsx`, `useAuth`, `MainLayout/index.jsx`, `Sidebar/index.jsx`, `NotificationSection/index.jsx`, `authContext.jsx`, `EasyCrop.jsx`, `MainRoutes.jsx`, `useConfig`, `ContactsEditor.jsx`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `users.service.js`, `server/package.json`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **What connects `ADR-0006`, `ADR-0016`, `ADR-0017` to the rest of the system?**
  _662 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05403508771929825 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `auth.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0782608695652174 - nodes in this community are weakly interconnected._
# Graph Report - WEBPAC-INTERVE  (2026-10-06)

## Corpus Check
- 480 files · ~201,871 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 2557 nodes · 6549 edges · 147 communities (91 shown, 56 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 103 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `56b87a95`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- invoices.service.js
- writeAudit
- dependencies
- server/package.json
- providers.service.js
- seed.demo.js
- contractTypeFields.service.js
- eslint.config.mjs
- contractTerms.js
- invoices.routes.js
- auth.routes.js
- ProviderFormPage.jsx
- client/package.json
- menu-items/index.js
- validation.utils.js
- permissions.constants.js
- constants.js
- compilerOptions
- AuthForgotPassword.jsx
- auditContext
- withAlpha
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- DebouncedInput.jsx
- providers.service.test.js
- request.mock.js
- session.service.js
- mailerService.js
- contracts.routes.js
- invoices.service.test.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- socket.js
- @mui/material
- InvoiceFormPage.jsx
- ref_jest_globals
- showSuccess
- devDependencies
- src/index.jsx
- MainLayout/index.jsx
- scripts
- volta
- `tbl_invoices`
- server.js
- app.routes.js
- ContractFormPage.jsx
- withLockedTransaction
- `tbl_contract_type_fields`
- contracts.service.test.js
- transaction.mock.js
- scripts
- useAuth
- winston.config.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- contracts.controller.test.js
- extends
- insurers.service.js
- auth.service.test.js
- providerTypes.service.js
- ContractsPage.jsx
- EasyCrop.jsx
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- masterRouter.utils.test.js
- FilterPopper.jsx
- `tbl_providers`
- getIO
- contracts.service.js
- users.service.test.js
- `tbl_works`
- `tbl_insurers`
- WorkFormPage.jsx
- permissions.controller.test.js
- browserslist
- error.middleware.js
- `tbl_providers`
- works.service.test.js
- masterRouter.utils.js
- `tbl_contract_suspensions`
- seed.js
- `tbl_work_providers`
- contractSuspensions.service.test.js
- `tbl_identity_documents`
- authjwt.middleware.test.js
- `tbl_contract_concepts`
- InputLabel.jsx
- themes/index.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- volta

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 112 edges
2. `react` - 84 edges
3. `useAuth()` - 69 edges
4. `showError()` - 64 edges
5. `writeAudit()` - 51 edges
6. `showSuccess()` - 51 edges
7. `withLockedTransaction()` - 50 edges
8. `auditContext()` - 43 edges
9. `@tabler/icons-react` - 43 edges
10. `MasterPage()` - 36 edges

## Surprising Connections (you probably didn't know these)
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `MasterPage()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/contexts/authContext.jsx
- `MasterPage()` --calls--> `showError()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/services/ToastService.js
- `MasterPage()` --calls--> `showSuccess()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/services/ToastService.js
- `MasterPage()` --calls--> `MainCard()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/ui-component/cards/MainCard.jsx

## Import Cycles
- None detected.

## Communities (147 total, 56 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "invoices.service.js"
Cohesion: 0.08
Nodes (61): ADR-0023, approveInvoice(), assertContractStillAdmits(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditable() (+53 more)

### Community 3 - "writeAudit"
Cohesion: 0.06
Nodes (48): ADR-0013, bcrypt, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0027 (+40 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (32): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+24 more)

### Community 6 - "providers.service.js"
Cohesion: 0.07
Nodes (61): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), identificationError(), assertIdentification(), applyProviderTypes() (+53 more)

### Community 7 - "seed.demo.js"
Cohesion: 0.09
Nodes (23): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+15 more)

### Community 8 - "contractTypeFields.service.js"
Cohesion: 0.14
Nodes (23): enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, resolveFields() (+15 more)

### Community 9 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 10 - "contractTerms.js"
Cohesion: 0.09
Nodes (31): ADR-0021, ADR-0026, @prisma/client, MONEY_SCALE, sumMoney(), auditable(), findOpenSuspension(), ADR-0017 (+23 more)

### Community 11 - "invoices.routes.js"
Cohesion: 0.12
Nodes (24): approveInvoiceController, cancelInvoiceController, getInvoiceController, getInvoiceFormOptionsController, INVOICE_FIELDS, notify(), paginationInvoicesController, pick() (+16 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.10
Nodes (27): jsonwebtoken, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+19 more)

### Community 13 - "ProviderFormPage.jsx"
Cohesion: 0.11
Nodes (34): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, getProviderTypesSelectAPI, SelectSocket() (+26 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (23): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+15 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.12
Nodes (20): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+12 more)

### Community 17 - "permissions.constants.js"
Cohesion: 0.05
Nodes (47): ADR-0006, ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0020, PERMISSIONS, defineMaster() (+39 more)

### Community 18 - "constants.js"
Cohesion: 0.10
Nodes (21): reasonsApi, refreshSession(), ReasonPage, SocketContext, SocketProvider(), TooltipLongText(), INVOICE_TYPE_OPTIONS, ADR-0017 (+13 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.06
Nodes (40): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), App() (+32 more)

### Community 21 - "auditContext"
Cohesion: 0.10
Nodes (33): auditContext(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS (+25 more)

### Community 22 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (60): ADR-0004, toMoney(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS (+52 more)

### Community 26 - "works.routes.js"
Cohesion: 0.13
Nodes (19): changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, previewWorkEndDateController, saveWorkController (+11 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.17
Nodes (10): ALL, contact(), ctx, existingRow, input(), ADR-0012, prismaMock, state (+2 more)

### Community 29 - "request.mock.js"
Cohesion: 0.06
Nodes (22): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+14 more)

### Community 30 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.08
Nodes (38): moneyRule(), percentRule(), ACT_FIELDS, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController, createLiquidationController, deleteContractController (+30 more)

### Community 33 - "invoices.service.test.js"
Cohesion: 0.14
Nodes (4): ctx, ADR-0020, prismaMock, state

### Community 34 - "`tbl_contracts`"
Cohesion: 0.20
Nodes (8): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contract_types`, `tbl_work_providers`

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 37 - "socket.js"
Cohesion: 0.27
Nodes (9): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), ACCESS_COOKIE_NAME (+1 more)

### Community 38 - "@mui/material"
Cohesion: 0.09
Nodes (22): ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable(), MoneyField(), TableActions(), fMoneyText() (+14 more)

### Community 39 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (33): suspendContractAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, invoiceTransitionsApi, ADR-0017, getReasonsSelectAPI() (+25 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (14): ref_crypto, ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload (+6 more)

### Community 41 - "showSuccess"
Cohesion: 0.07
Nodes (48): deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), getBasicInformationAPI(), paginationUsersAPI() (+40 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "MainLayout/index.jsx"
Cohesion: 0.06
Nodes (59): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI() (+51 more)

### Community 46 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart, pm2:start (+5 more)

### Community 48 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "server.js"
Cohesion: 0.19
Nodes (11): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, registeredTasks (+3 more)

### Community 51 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.10
Nodes (39): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017, previewContractEndDateAPI() (+31 more)

### Community 53 - "withLockedTransaction"
Cohesion: 0.04
Nodes (80): ADR-0027, @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection() (+72 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "contracts.service.test.js"
Cohesion: 0.20
Nodes (6): ctx, ADR-0015, ADR-0017, prismaMock, state, storedContract

### Community 56 - "transaction.mock.js"
Cohesion: 0.07
Nodes (25): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+17 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "useAuth"
Cohesion: 0.10
Nodes (52): getStatusesByScopeAPI(), contractsApi, workProvidersApi, useAuth(), InvoicesPage, PrivateRoute(), showError(), useSocket() (+44 more)

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

### Community 66 - "contracts.controller.test.js"
Cohesion: 0.22
Nodes (7): conceptsServiceMock, contractsServiceMock, emit, getEffectivePermissionIds, ADR-0015, ADR-0016, suspensionsServiceMock

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "insurers.service.js"
Cohesion: 0.38
Nodes (5): ADR-0018, insurersRoutes, insurersConfig, insurersService, ADR-0003

### Community 70 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 71 - "providerTypes.service.js"
Cohesion: 0.38
Nodes (5): providerTypesRoutes, ADR-0006, ADR-0010, providerTypesConfig, providerTypesService

### Community 73 - "ContractsPage.jsx"
Cohesion: 0.10
Nodes (23): contractTypesApi, getContractTypeFieldsAPI(), getContractTypesSelectAPI, saveContractTypeFieldsAPI(), ContractsPage, ContractTypePage, CONTRACT_STATE_TABS, ContractTypeFieldsDialog() (+15 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.23
Nodes (7): `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies`, `tbl_status`, `tbl_users`

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.03
Nodes (66): addressTypesApi, constructionCompaniesApi, identityDocumentsApi, getInsurersSelectAPI, insurersApi, providerTypesApi, supervisionTypesApi, getWorksSummaryAPI() (+58 more)

### Community 100 - "masterRouter.utils.test.js"
Cohesion: 0.33
Nodes (4): config, emit, forged, serviceMock

### Community 101 - "FilterPopper.jsx"
Cohesion: 0.60
Nodes (4): FilterPopper(), normalizeOptions(), SocketDropdownFilter(), lodash-es

### Community 104 - "`tbl_providers`"
Cohesion: 0.22
Nodes (7): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_providers`, `tbl_provider_classifications`, `tbl_identity_documents`, `tbl_provider_types`

### Community 105 - "getIO"
Cohesion: 0.11
Nodes (24): getIO(), IDEMPOTENCY_HEADER, FIELD_ATTRIBUTES, getContractTypeFieldsController, pickField(), saveContractTypeFieldsController, getNotificationCountController(), listNotificationsController() (+16 more)

### Community 108 - "contracts.service.js"
Cohesion: 0.07
Nodes (79): ADR-0006, ADR-0016, newOperationId(), moneyText(), dateOnlyText(), userFullName(), activeSequence(), amendmentResult() (+71 more)

### Community 112 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 116 - "WorkFormPage.jsx"
Cohesion: 0.09
Nodes (34): getAddressTypesSelectAPI, getConstructionCompaniesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), previewWorkEndDateAPI(), useEndDatePreview(), channelsOf(), ContactDialog() (+26 more)

### Community 117 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 118 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 119 - "error.middleware.js"
Cohesion: 0.05
Nodes (46): ref_fs, ref_path, ref_url, DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage() (+38 more)

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 125 - "masterRouter.utils.js"
Cohesion: 0.12
Nodes (25): express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), getContractTypeFieldsSchema (+17 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.25
Nodes (6): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`

### Community 130 - "seed.js"
Cohesion: 0.17
Nodes (10): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES (+2 more)

### Community 131 - "`tbl_work_providers`"
Cohesion: 0.18
Nodes (8): `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers`, `tbl_work_contacts`, `tbl_address_types`, `tbl_works`

### Community 133 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (20): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+12 more)

### Community 134 - "`tbl_identity_documents`"
Cohesion: 0.50
Nodes (3): `tbl_users`, `tbl_identity_documents`, `tbl_users`

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 139 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 142 - "themes/index.jsx"
Cohesion: 0.21
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 155 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **704 isolated node(s):** `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS`, `TABS`, `CONTRACT_STATE_FILTER`, `ADR-0015` (+699 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 994 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **56 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0006` connect `contracts.service.js` to `ContractFormPage.jsx`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `InputLabel.jsx`, `ProviderFormPage.jsx`, `client/package.json`, `themes/index.jsx`, `constants.js`, `AuthForgotPassword.jsx`, `withAlpha`, `DebouncedInput.jsx`, `DocumentManagement.jsx`, `InvoiceFormPage.jsx`, `showSuccess`, `MainLayout/index.jsx`, `ContractFormPage.jsx`, `useAuth`, `ContractsPage.jsx`, `EasyCrop.jsx`, `MainRoutes.jsx`, `FilterPopper.jsx`, `WorkFormPage.jsx`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `react` connect `@mui/material` to `DocumentManagement.jsx`, `FilterPopper.jsx`, `InvoiceFormPage.jsx`, `showSuccess`, `ContractsPage.jsx`, `src/index.jsx`, `MainLayout/index.jsx`, `client/package.json`, `themes/index.jsx`, `ProviderFormPage.jsx`, `constants.js`, `WorkFormPage.jsx`, `AuthForgotPassword.jsx`, `ContractFormPage.jsx`, `EasyCrop.jsx`, `useAuth`, `DebouncedInput.jsx`, `MainRoutes.jsx`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **What connects `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS`, `TABS` to the rest of the system?**
  _704 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `invoices.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0763888888888889 - nodes in this community are weakly interconnected._
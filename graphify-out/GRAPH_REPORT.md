# Graph Report - WEBPAC-INTERVE  (2026-10-06)

## Corpus Check
- 486 files · ~208,495 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 2629 nodes · 6804 edges · 159 communities (103 shown, 56 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 104 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f25b786a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- updateInvoice
- writeAudit
- dependencies
- server/package.json
- providers.service.js
- seed.demo.js
- contractTypeFields.service.js
- usersApi.js
- money.utils.js
- invoices.routes.js
- auditContext
- ToastService.js
- client/package.json
- @tabler/icons-react
- status.constants.js
- permissions.constants.js
- constants.js
- compilerOptions
- AuthForgotPassword.jsx
- providers.routes.js
- NotificationSection/index.jsx
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- @mui/material
- providers.service.test.js
- masterRouter.utils.test.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- invoices.service.test.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- newIdempotencyKey
- socket.js
- react
- SuspendDialog.jsx
- ref_jest_globals
- showError
- devDependencies
- App.jsx
- react-router-dom
- scripts
- volta
- `tbl_invoices`
- server.js
- main.routes.js
- ContractFormPage.jsx
- users.service.js
- `tbl_contract_type_fields`
- InvoiceFormPage.jsx
- transaction.mock.js
- scripts
- WorkDetailPage.jsx
- winston.config.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- contracts.controller.test.js
- extends
- invoiceTerms.js
- auth.service.test.js
- httpCliente.js
- ContractsPage.jsx
- getIO
- `tbl_status`
- useAuth
- `tbl_permissions`
- AuthenticationRoutes.jsx
- AppBar.jsx
- `tbl_providers`
- notifications.routes.js
- contracts.service.js
- WorksPage.jsx
- `tbl_works`
- `tbl_insurers`
- WorkFormPage.jsx
- permissions.controller.test.js
- browserslist
- error.middleware.js
- DataTable.jsx
- `tbl_providers`
- works.service.test.js
- contractSuspensions.service.test.js
- masterRouter.utils.js
- `tbl_contract_suspensions`
- handleFirebase.js
- `tbl_work_providers`
- ContactsEditor.jsx
- contracts.service.test.js
- formatTime.js
- ContractTypeFieldsDialog.jsx
- authjwt.middleware.test.js
- session.service.test.js
- InputLabel.jsx
- authContext.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- toMoney
- auth.controller.test.js
- Default/index.jsx
- ImageList.jsx
- master.service.test.js
- volta
- status.service.test.js
- PercentField.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 113 edges
2. `react` - 85 edges
3. `useAuth()` - 71 edges
4. `showError()` - 64 edges
5. `writeAudit()` - 51 edges
6. `showSuccess()` - 51 edges
7. `withLockedTransaction()` - 50 edges
8. `auditContext()` - 43 edges
9. `@tabler/icons-react` - 43 edges
10. `diffFields()` - 37 edges

## Surprising Connections (you probably didn't know these)
- `insertNotification()` --calls--> `getIO()`  [EXTRACTED]
  server/src/modules/app/notifications/notifications.service.js → server/src/common/configs/socket.manager.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `AdvanceAmountsSection()` --calls--> `fPercentText()`  [EXTRACTED]
  client/src/views/billing/invoices/components/AdvanceAmountsSection.jsx → client/src/utils/formatNumber.js
- `AdvanceAmountsSection()` --calls--> `fMoneyText()`  [EXTRACTED]
  client/src/views/billing/invoices/components/AdvanceAmountsSection.jsx → client/src/utils/formatNumber.js

## Import Cycles
- None detected.

## Communities (159 total, 56 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.05
Nodes (43): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), Alert() (+35 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "updateInvoice"
Cohesion: 0.20
Nodes (22): approveInvoice(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditable(), cancelInvoice(), createSimpleInvoice() (+14 more)

### Community 3 - "writeAudit"
Cohesion: 0.04
Nodes (84): ADR-0013, bcrypt, ref_crypto, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0027 (+76 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (32): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+24 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (54): applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderTypes(), assertTypeIds(), assertWorkAssignable(), ASSIGNMENT_IDEMPOTENCY (+46 more)

### Community 7 - "seed.demo.js"
Cohesion: 0.04
Nodes (47): ref_node_crypto, @prisma/adapter-mariadb, ADDRESS_TYPES, CONTRACT_FIELDS, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS (+39 more)

### Community 8 - "contractTypeFields.service.js"
Cohesion: 0.15
Nodes (23): enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, resolveFields() (+15 more)

### Community 9 - "usersApi.js"
Cohesion: 0.15
Nodes (14): getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), Accordion(), BaseDialog(), findOption(), flattenOptions(), GenericFormSection (+6 more)

### Community 10 - "money.utils.js"
Cohesion: 0.11
Nodes (33): @prisma/client, decimal(), HUNDRED, MONEY_SCALE, moneyText(), PERCENT_SCALE, percentOf(), percentText() (+25 more)

### Community 11 - "invoices.routes.js"
Cohesion: 0.13
Nodes (24): approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, getInvoiceFormOptionsController, grantedOf(), INVOICE_FIELDS, notify() (+16 more)

### Community 12 - "auditContext"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "ToastService.js"
Cohesion: 0.15
Nodes (22): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), providersApi, getProviderTypesSelectAPI, defaultConfig, SearchSelect(), SelectSocket(), DIAN_WEIGHTS (+14 more)

### Community 14 - "client/package.json"
Cohesion: 0.06
Nodes (35): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+27 more)

### Community 15 - "@tabler/icons-react"
Cohesion: 0.10
Nodes (18): admin, icons, billing, dashboard, icons, menuItems, icons, other (+10 more)

### Community 16 - "status.constants.js"
Cohesion: 0.11
Nodes (22): ADR-0001, ADR-0009, express-validator, EDITABLE_STATUS_VALUES, STATUS_KEYS, createMasterSchemas(), contactsRules(), emailRule() (+14 more)

### Community 17 - "permissions.constants.js"
Cohesion: 0.05
Nodes (50): ADR-0011, ADR-0012, ADR-0018, ADR-0006, ADR-0016, ADR-0017, ADR-0020, ADR-0024 (+42 more)

### Community 18 - "constants.js"
Cohesion: 0.08
Nodes (26): reasonsApi, InvoicesPage, ReasonPage, SocketContext, TooltipLongText(), INVOICE_STATE_COLORS, INVOICE_STATE_TABS, INVOICE_TYPE_OPTIONS (+18 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.15
Nodes (19): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), FilterPopper(), normalizeOptions(), SocketDropdownFilter(), CustomFormControl (+11 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 22 - "NotificationSection/index.jsx"
Cohesion: 0.24
Nodes (13): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), getTimeAgo(), ListItemWrapper(), NotificationList() (+5 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (61): ADR-0004, sumMoney(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS (+53 more)

### Community 26 - "works.routes.js"
Cohesion: 0.13
Nodes (19): changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, previewWorkEndDateController, saveWorkController (+11 more)

### Community 27 - "@mui/material"
Cohesion: 0.20
Nodes (15): appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard(), Avatar(), SamplePage() (+7 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.17
Nodes (10): ALL, contact(), ctx, existingRow, input(), ADR-0012, prismaMock, state (+2 more)

### Community 29 - "masterRouter.utils.test.js"
Cohesion: 0.06
Nodes (26): config, emit, forged, serviceMock, mockReq(), emit, fieldsServiceMock, mockDelete (+18 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.11
Nodes (25): ADR-0023, countByState(), DETAIL_AUDITED, detailChanges(), detailText(), getInvoiceFormOptions, hasDetail(), IDEMPOTENCY_TARGET (+17 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.08
Nodes (38): moneyRule(), percentRule(), ACT_FIELDS, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController, createLiquidationController, deleteContractController (+30 more)

### Community 33 - "invoices.service.test.js"
Cohesion: 0.13
Nodes (12): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+4 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "newIdempotencyKey"
Cohesion: 0.16
Nodes (21): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012 (+13 more)

### Community 37 - "socket.js"
Cohesion: 0.26
Nodes (9): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+1 more)

### Community 38 - "react"
Cohesion: 0.08
Nodes (17): ConfigContext, ConfigProvider(), useLocalStorage(), ChipMultiSelect(), fold(), ROWS_PER_PAGE_OPTIONS, STATUS_NAMES, filterOptions (+9 more)

### Community 39 - "SuspendDialog.jsx"
Cohesion: 0.16
Nodes (15): suspendContractAPI(), invoiceTransitionsApi, getReasonsSelectAPI(), DateField(), toDate(), ApproveInvoiceDialog(), ADR-0020, today() (+7 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.10
Nodes (8): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, prismaMock

### Community 41 - "showError"
Cohesion: 0.17
Nodes (25): deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), paginationUsersAPI(), saveUserAPI() (+17 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "App.jsx"
Cohesion: 0.12
Nodes (16): refreshSession(), App(), client_src_assets_scss_style, AuthContext, container, root, NavigationScroll(), reportWebVitals() (+8 more)

### Community 45 - "react-router-dom"
Cohesion: 0.14
Nodes (27): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), setParentOpenedMenu(), useMenuCollapse() (+19 more)

### Community 46 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart, pm2:start (+5 more)

### Community 48 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "server.js"
Cohesion: 0.19
Nodes (11): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, registeredTasks (+3 more)

### Community 51 - "main.routes.js"
Cohesion: 0.14
Nodes (15): express, providerTypesRoutes, ADR-0006, ADR-0010, providerTypesConfig, providerTypesService, getMenuController(), getProfilesController() (+7 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.10
Nodes (38): contractConceptsApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+30 more)

### Community 53 - "users.service.js"
Cohesion: 0.06
Nodes (55): ACTIVE_STATUS, INACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027 (+47 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "InvoiceFormPage.jsx"
Cohesion: 0.16
Nodes (22): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, AdvanceAmountsSection(), ADR-0024 (+14 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.07
Nodes (25): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+17 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkDetailPage.jsx"
Cohesion: 0.12
Nodes (41): getStatusesByScopeAPI(), workProvidersApi, InvoiceDetailPage, useSocket(), ContactsList(), ADR-0009, DataList(), Figure() (+33 more)

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

### Community 68 - "invoiceTerms.js"
Cohesion: 0.13
Nodes (21): isContractCreate(), isCreate(), isSimpleCreate(), assertTransition(), cancelTransitionFor(), hasContract(), historyRow(), httpError() (+13 more)

### Community 70 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 71 - "httpCliente.js"
Cohesion: 0.18
Nodes (7): addressTypesApi, getInsurersSelectAPI, genericRequest, instance, NO_REFRESH_URLS, refreshClient, createMasterApi()

### Community 73 - "ContractsPage.jsx"
Cohesion: 0.18
Nodes (11): getContractTypesSelectAPI, ContractsPage, CONTRACT_STATE_COLORS, CONTRACT_STATE_TABS, COLUMNS, ADR-0011, CONTRACT_COLUMNS, CONTRACT_STATE_FILTER (+3 more)

### Community 88 - "getIO"
Cohesion: 0.15
Nodes (15): getIO(), FIELD_ATTRIBUTES, getContractTypeFieldsController, pickField(), saveContractTypeFieldsController, deleteProfileController(), getModulesController(), ADR-0027 (+7 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (14): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+6 more)

### Community 94 - "useAuth"
Cohesion: 0.04
Nodes (62): constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, providerTypesApi, supervisionTypesApi, useAuth(), AddressTypePage (+54 more)

### Community 100 - "AuthenticationRoutes.jsx"
Cohesion: 0.18
Nodes (11): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router (+3 more)

### Community 101 - "AppBar.jsx"
Cohesion: 0.23
Nodes (10): client_src_assets_images_interve, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthCardWrapper(), AuthWrapper1 (+2 more)

### Community 104 - "`tbl_providers`"
Cohesion: 0.22
Nodes (7): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_providers`, `tbl_provider_classifications`, `tbl_identity_documents`, `tbl_provider_types`

### Community 105 - "notifications.routes.js"
Cohesion: 0.22
Nodes (13): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), insertNotification() (+5 more)

### Community 108 - "contracts.service.js"
Cohesion: 0.05
Nodes (110): ADR-0021, ADR-0026, diffFields(), newOperationId(), dateOnlyText(), userFullName(), assertContractStillAdmits(), getInvoice() (+102 more)

### Community 112 - "WorksPage.jsx"
Cohesion: 0.18
Nodes (10): getWorksSummaryAPI(), worksApi, WorksPage, MoneyField(), moneyInputText(), parseMoneyInput(), WorksSummary(), COLUMNS (+2 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 116 - "WorkFormPage.jsx"
Cohesion: 0.14
Nodes (22): getConstructionCompaniesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), previewWorkEndDateAPI(), useEndDatePreview(), EditableList(), contactsToForm(), contactsToPayload() (+14 more)

### Community 117 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 118 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 119 - "error.middleware.js"
Cohesion: 0.05
Nodes (47): ref_fs, ref_path, ref_url, DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage() (+39 more)

### Community 120 - "DataTable.jsx"
Cohesion: 0.34
Nodes (9): ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable(), TableActions(), MANAGER_ROLE_OPTIONS, ManagersTable() (+1 more)

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 124 - "contractSuspensions.service.test.js"
Cohesion: 0.17
Nodes (5): ctx, initial, ADR-0017, prismaMock, state

### Community 125 - "masterRouter.utils.js"
Cohesion: 0.09
Nodes (30): verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, isSessionActive(), createMasterControllers(), createMasterRouter() (+22 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.25
Nodes (6): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`

### Community 130 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 131 - "`tbl_work_providers`"
Cohesion: 0.18
Nodes (8): `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers`, `tbl_work_contacts`, `tbl_address_types`, `tbl_works`

### Community 132 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 133 - "contracts.service.test.js"
Cohesion: 0.07
Nodes (21): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+13 more)

### Community 136 - "ContractTypeFieldsDialog.jsx"
Cohesion: 0.31
Nodes (9): getContractTypeFieldsAPI(), saveContractTypeFieldsAPI(), ContractTypeFieldsDialog(), DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006, toggle(), toRow() (+1 more)

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 139 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 142 - "authContext.jsx"
Cohesion: 0.43
Nodes (7): loginAPI(), logoutAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), AuthProvider(), getStoredUser(), js-cookie

### Community 150 - "toMoney"
Cohesion: 0.38
Nodes (7): isBlank(), toMoney(), contractAdvanceBalances(), createContractInvoice(), getContractAdvance(), positiveMoney(), resolveDetail()

### Community 151 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 152 - "Default/index.jsx"
Cohesion: 0.47
Nodes (4): DashboardDefault, CardGrid(), Dashboard(), testCards

### Community 153 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 154 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 155 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 156 - "status.service.test.js"
Cohesion: 0.40
Nodes (3): catalog, expected, prismaMock

### Community 157 - "PercentField.jsx"
Cohesion: 0.83
Nodes (3): PercentField(), toText(), toValue()

## Knowledge Gaps
- **728 isolated node(s):** `ADR-0017`, `TABS`, `ADR-0020`, `EMPTY_FORM`, `DOCUMENT_FIELDS` (+723 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1011 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **56 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `ContactsEditor.jsx`, `ContractTypeFieldsDialog.jsx`, `usersApi.js`, `InputLabel.jsx`, `ToastService.js`, `client/package.json`, `@tabler/icons-react`, `constants.js`, `AuthForgotPassword.jsx`, `NotificationSection/index.jsx`, `Default/index.jsx`, `ImageList.jsx`, `PercentField.jsx`, `newIdempotencyKey`, `react`, `SuspendDialog.jsx`, `showError`, `react-router-dom`, `ContractFormPage.jsx`, `InvoiceFormPage.jsx`, `WorkDetailPage.jsx`, `ContractsPage.jsx`, `useAuth`, `AuthenticationRoutes.jsx`, `AppBar.jsx`, `WorksPage.jsx`, `WorkFormPage.jsx`, `DataTable.jsx`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Why does `lodash` connect `react` to `users.service.js`, `server/package.json`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `ADR-0007` connect `useAuth` to `works.service.js`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **What connects `ADR-0017`, `TABS`, `ADR-0020` to the rest of the system?**
  _728 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.052982456140350874 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `writeAudit` be split into smaller, more focused modules?**
  _Cohesion score 0.03939507094846901 - nodes in this community are weakly interconnected._
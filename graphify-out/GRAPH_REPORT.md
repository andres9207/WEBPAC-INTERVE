# Graph Report - WEBPAC-INTERVE  (2026-10-23)

## Corpus Check
- 630 files · ~327,961 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3640 nodes · 9973 edges · 215 communities (119 shown, 96 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 135 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9654100e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- users.service.js
- PoliciesTab.jsx
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- workScopeOf
- providers.routes.js
- ConceptDialog.jsx
- prismaClient.js
- auditContext
- seed.demo.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- contracts.service.js
- invoices.service.test.js
- compilerOptions
- ContractsPage.jsx
- invoices.service.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- httpCliente.js
- getIO
- contracts.controller.test.js
- contractPolicies.service.js
- mailerService.js
- contracts.routes.js
- expirationNotice.service.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- audit.service.js
- contractReports.service.js
- cron/index.js
- useMenuCollapse.js
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorkChartsTab.jsx
- scripts
- seed.volume.js
- `tbl_invoices`
- withAlpha
- master.service.test.js
- contractSuspensions.service.test.js
- ref_jest_globals
- `tbl_contract_type_fields`
- eslint.config.mjs
- transaction.mock.js
- scripts
- contractFields.js
- session.service.test.js
- compilerOptions
- excelJS.js
- AuthForgotPassword.jsx
- permission
- devDependencies
- transaction.service.test.js
- notifications.service.js
- addressTypes.contacts.js
- @mui/material
- `tbl_contract_status_history`
- socket.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- usersApi.js
- contractConcepts.service.test.js
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- formatTime.js
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- error.middleware.test.js
- ContactsEditor.jsx
- status.constants.js
- transaction.service.js
- serviceWorker.jsx
- `tbl_providers`
- profiles.service.js
- constants.js
- writeAudit
- uniqueConstraints.constants.test.js
- handleFirebase.js
- works.service.test.js
- dashboard.controller.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- images.js
- `tbl_user_permissions`
- AuthenticationRoutes.jsx
- auth.controller.test.js
- moneyText
- winston.config.js
- decisionReferences.guard.test.js
- contractNotifications.service.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- App.jsx
- works.controller.test.js
- expirationNotice.service.test.js
- `tbl_users`
- balanceReconciliation.service.test.js
- extends
- permissions.routes.js
- ImageList.jsx
- DebouncedInput.jsx
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- browserslist
- WorkDetailPage.jsx
- volta
- EasyCrop.jsx
- InputLabel.jsx
- contractEndDateReconciliation.service.test.js
- app.routes.js
- volta
- MainLayout/index.jsx
- `tbl_invoices`
- `tbl_invoices`
- dashboard.measure.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 141 edges
2. `react` - 107 edges
3. `showError()` - 84 edges
4. `useAuth()` - 77 edges
5. `workScopeOf()` - 62 edges
6. `writeAudit()` - 60 edges
7. `withLockedTransaction()` - 59 edges
8. `dateOnlyText()` - 59 edges
9. `@tabler/icons-react` - 57 edges
10. `showSuccess()` - 55 edges

## Surprising Connections (you probably didn't know these)
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `previewWorkEndDate()` --calls--> `addTerm()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/term.utils.js

## Import Cycles
- None detected.

## Communities (215 total, 96 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "users.service.js"
Cohesion: 0.13
Nodes (18): ADR-0001, identificationError(), identityDocumentsService, assertAssignableProfile(), assertIdentification(), AUDITED_USER_FIELDS, checkIfUserExists(), deleteUser() (+10 more)

### Community 3 - "PoliciesTab.jsx"
Cohesion: 0.08
Nodes (33): getInsurersSelectAPI, configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, PolicyTypePage, PercentField(), toText() (+25 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (32): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+24 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (57): ADR-0009, providerTypesService, applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes() (+49 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (50): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, client_src_api_requests_invoicesapi_previewcontractinvoiceapi (+42 more)

### Community 8 - "workScopeOf"
Cohesion: 0.08
Nodes (49): sendExport(), workScopeOf(), exportFormatRule(), accessOf(), approveInvoiceController, cancelInvoiceController, deleteInvoiceController, exportInvoicesController (+41 more)

### Community 9 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.08
Nodes (45): contractConceptsApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+37 more)

### Community 11 - "prismaClient.js"
Cohesion: 0.19
Nodes (16): adapter, describeTarget(), testConnection(), resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType() (+8 more)

### Community 12 - "auditContext"
Cohesion: 0.13
Nodes (24): THEME_MODES, auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController() (+16 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.07
Nodes (28): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+20 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (23): name, packageManager, private, version, apexcharts, axios, @emotion/react, @emotion/styled (+15 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.10
Nodes (26): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0027 (+18 more)

### Community 17 - "contracts.service.js"
Cohesion: 0.07
Nodes (46): containsFilter(), dateRangeFilter(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS, paginate(), resolvePagination() (+38 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "ContractsPage.jsx"
Cohesion: 0.13
Nodes (18): exportContractsAPI(), ContractsPage, download(), downloadExport(), errorMessage(), EXPORT_FORMATS, ExportButton(), ExportDialog() (+10 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (115): ADR-0013, ADR-0017, ADR-0021, ADR-0023, ADR-0027, renderExport(), server_src_common_utils_money_utils_percentfor, isBillingType() (+107 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.05
Nodes (99): ADR-0002, ADR-0011, scopeWhere(), sumMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL (+91 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (54): ADR-0004, ADR-0007, ALL, assertAnyInScope(), assertInScope(), httpError(), inScope(), scopeOf() (+46 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.09
Nodes (19): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+11 more)

### Community 27 - "httpCliente.js"
Cohesion: 0.06
Nodes (48): getWorkDashboardAPI(), ADR-0002, getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), providersApi, getMyWorksSelectAPI() (+40 more)

### Community 28 - "getIO"
Cohesion: 0.12
Nodes (18): getIO(), configurePolicyTypeBaseController, configurePolicyTypeBase(), httpError(), FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController (+10 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.05
Nodes (35): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+27 more)

### Community 30 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (105): main(), diffFields(), newOperationId(), canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused() (+97 more)

### Community 31 - "mailerService.js"
Cohesion: 0.18
Nodes (11): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+3 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.06
Nodes (61): getEffectivePermissionIds(), optionalDate(), getUserPermissions(), updateUserPermissions(), ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS, CONTRACT_FIELDS (+53 more)

### Community 33 - "expirationNotice.service.js"
Cohesion: 0.08
Nodes (37): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+29 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "audit.service.js"
Cohesion: 0.12
Nodes (16): AUDIT_ENTITIES, auditMisuse(), buildRows(), ADR-0027, protect(), REDACTED, SENSITIVE_FIELDS, STANDALONE_EVENTS (+8 more)

### Community 38 - "contractReports.service.js"
Cohesion: 0.08
Nodes (33): findExportRows(), approvedOf(), contractInvoicesForReport(), contractsBalances(), ADVANCE_COLUMNS, advanceTotals(), authored(), balanceFields() (+25 more)

### Community 39 - "cron/index.js"
Cohesion: 0.13
Nodes (15): ref_http, node-cron, app, server, verifyStatusCatalog(), cronJobs, ADR-0017, registeredTasks (+7 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.06
Nodes (48): ADR-0003, ADR-0016, ADR-0024, ADR-0025, ADR-0026, ADR-0011, ADR-0012, ADR-0017 (+40 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.08
Nodes (67): fMoneyText(), fPercentText(), FigureRow(), InvoiceAmounts(), LiquidationRetention(), contractRows(), DrillDownDialog(), invoiceRows() (+59 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "seed.volume.js"
Cohesion: 0.16
Nodes (17): addDays(), ALL_FIELDS, concept(), dbName, END_DATES, firstActive(), main(), nit() (+9 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "withAlpha"
Cohesion: 0.15
Nodes (16): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), buildPalette(), defaultColor (+8 more)

### Community 51 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 52 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 53 - "ref_jest_globals"
Cohesion: 0.04
Nodes (26): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+18 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "contractFields.js"
Cohesion: 0.26
Nodes (10): AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+2 more)

### Community 59 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "AuthForgotPassword.jsx"
Cohesion: 0.12
Nodes (22): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI() (+14 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "notifications.service.js"
Cohesion: 0.18
Nodes (16): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+8 more)

### Community 70 - "addressTypes.contacts.js"
Cohesion: 0.38
Nodes (6): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesService

### Community 71 - "@mui/material"
Cohesion: 0.05
Nodes (68): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), getWorksSummaryAPI(), filterParams(), isEmptyValue(), NO_FILTERS (+60 more)

### Community 88 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (88): addressTypesApi, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, insurersApi, providerTypesApi (+80 more)

### Community 100 - "works.routes.js"
Cohesion: 0.10
Nodes (25): canViewAllWorks(), managedWhere(), resolveWorkScope(), selectMyWorks(), changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS (+17 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "usersApi.js"
Cohesion: 0.13
Nodes (16): getBusinessRulesAPI(), saveBusinessRulesAPI(), getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), ProfileSection(), Accordion(), findOption() (+8 more)

### Community 108 - "contractConcepts.service.test.js"
Cohesion: 0.17
Nodes (6): ctx, ADR-0016, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.09
Nodes (33): express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers(), createMasterRouter() (+25 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.06
Nodes (75): contractPoliciesApi, suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, getModulesAPI(), getProfilesAPI(), saveProfileAPI(), checkProviderIdentificationAPI() (+67 more)

### Community 117 - "export.service.js"
Cohesion: 0.07
Nodes (46): exceljs, pdfkit, addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+38 more)

### Community 118 - "formatTime.js"
Cohesion: 0.10
Nodes (17): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+9 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): ALL, CONCEPTS, CONTRACT, INVOICES, OWN, prismaMock

### Community 123 - "error.middleware.test.js"
Cohesion: 0.39
Nodes (5): REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 125 - "status.constants.js"
Cohesion: 0.15
Nodes (19): ADR-0015, prisma, INACTIVE_STATUS, STATUS_IDS, findUsersWithPermission(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES (+11 more)

### Community 129 - "transaction.service.js"
Cohesion: 0.11
Nodes (20): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+12 more)

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "profiles.service.js"
Cohesion: 0.10
Nodes (21): USER_NAME_SELECT, userFullName(), getMenu(), getSessionInfo(), PAGE_SELECT, toChild(), toParent(), AUDIT_SELECT (+13 more)

### Community 133 - "constants.js"
Cohesion: 0.06
Nodes (52): getDashboardSummaryAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), useSchemePalette(), InvoicesPage, TooltipLongText(), CONTRACT_INVOICE_TYPES, INVOICE_STATE_COLORS (+44 more)

### Community 134 - "writeAudit"
Cohesion: 0.06
Nodes (53): bcrypt, ref_crypto, ACTIVE_STATUS, writeAudit(), baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS (+45 more)

### Community 136 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 137 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "dashboard.controller.js"
Cohesion: 0.32
Nodes (5): getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes, ADR-0002

### Community 151 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 153 - "AuthenticationRoutes.jsx"
Cohesion: 0.11
Nodes (21): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 154 - "auth.controller.test.js"
Cohesion: 0.25
Nodes (6): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, mockUpdateThemeMode, sessionMock

### Community 155 - "moneyText"
Cohesion: 0.05
Nodes (90): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, moneyText(), PERCENT_SCALE, percentOf() (+82 more)

### Community 156 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 157 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 159 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 173 - "App.jsx"
Cohesion: 0.12
Nodes (17): App(), ThemedToastContainer(), config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext, ConfigContext (+9 more)

### Community 174 - "works.controller.test.js"
Cohesion: 0.29
Nodes (5): emit, getEffectivePermissionIds, SCOPE, serviceMock, workScopeOf

### Community 175 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 176 - "`tbl_users`"
Cohesion: 0.31
Nodes (7): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 181 - "permissions.routes.js"
Cohesion: 0.15
Nodes (16): getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController(), permissionsRoutes (+8 more)

### Community 183 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 194 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 197 - "WorkDetailPage.jsx"
Cohesion: 0.06
Nodes (71): contractsApi, exportContractAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, InvoiceDetailPage, ContactsList(), ADR-0009 (+63 more)

### Community 198 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 202 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 203 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 204 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 206 - "MainLayout/index.jsx"
Cohesion: 0.12
Nodes (29): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), getStatusesByScopeAPI(), useConfig(), Footer() (+21 more)

### Community 219 - "dashboard.measure.js"
Cohesion: 0.36
Nodes (8): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain()

## Knowledge Gaps
- **1018 isolated node(s):** `TABS`, `axios`, `@azure/identity`, `bcrypt`, `compression` (+1013 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1414 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **96 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0002` connect `workDashboard.service.js` to `constants.js`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `PoliciesTab.jsx`, `constants.js`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `client/package.json`, `ContractsPage.jsx`, `AuthenticationRoutes.jsx`, `httpCliente.js`, `App.jsx`, `WorkChartsTab.jsx`, `withAlpha`, `ImageList.jsx`, `DebouncedInput.jsx`, `AuthForgotPassword.jsx`, `WorkDetailPage.jsx`, `EasyCrop.jsx`, `InputLabel.jsx`, `MainLayout/index.jsx`, `useAuth`, `usersApi.js`, `showError`, `formatTime.js`, `ContactsEditor.jsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `axios` connect `client/package.json` to `httpCliente.js`, `server/package.json`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **What connects `TABS`, `axios`, `@azure/identity` to the rest of the system?**
  _1018 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `users.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.13157894736842105 - nodes in this community are weakly interconnected._
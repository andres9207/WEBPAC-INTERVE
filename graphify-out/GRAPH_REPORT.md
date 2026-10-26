# Graph Report - WEBPAC-INTERVE  (2026-10-26)

## Corpus Check
- 671 files · ~375,257 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4108 nodes · 11546 edges · 227 communities (126 shown, 101 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 154 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8d3c2c41`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- ProviderDetailPage.jsx
- master.service.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- workScopeOf
- contracts.controller.js
- ConceptDialog.jsx
- validation.utils.js
- auth.routes.js
- seed.demo.js
- client/package.json
- UserDialog.jsx
- main.routes.js
- WorkDetailPage.jsx
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- App.jsx
- `tbl_users`
- app.js
- works.service.js
- contractSuspensions.service.test.js
- contractSuspensions.service.js
- contractPolicies.service.js
- invoices.controller.test.js
- constant.js
- advanceFilters.js
- providers.routes.js
- DocumentManagement.jsx
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- dateOnlyText
- WorkDataForm.jsx
- cron/index.js
- withLockedTransaction
- permissions.constants.js
- devDependencies
- src/index.jsx
- socket.js
- scripts
- app.routes.js
- `tbl_invoices`
- @tabler/icons-react
- updateInvoice
- decimal
- ref_jest_globals
- `tbl_contract_type_fields`
- invoiceFollowUps.service.js
- transaction.mock.js
- scripts
- dashboard.service.test.js
- constants.js
- compilerOptions
- excelJS.js
- dashboard.service.js
- permission
- devDependencies
- transaction.service.test.js
- WorkChartsTab.jsx
- money.utils.js
- statements.routes.js
- `tbl_contract_status_history`
- invoiceGlosses.service.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- httpCliente.js
- getEffectivePermissionIds
- transaction.service.js
- `tbl_works`
- `tbl_policies`
- @mui/material
- export.service.js
- uniqueConstraints.constants.test.js
- error.middleware.js
- contracts.service.js
- `tbl_providers`
- error.middleware.test.js
- MainCard
- policyTypes.service.test.js
- images.js
- AuthForgotPassword.jsx
- `tbl_providers`
- expirationNotice.service.test.js
- AdvanceBars.jsx
- writeAudit
- contractReports.service.js
- seed.volume.js
- works.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- contractNotifications.service.test.js
- app.service.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- decisionReferences.guard.test.js
- GeneralDashboard.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- WorkSummaryTab.jsx
- session.service.test.js
- invoiceFollowUps.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- showError
- react-router-dom
- master.service.test.js
- liquidationTerms.js
- contracts.controller.test.js
- requestedDetailChanges
- contractEndDateReconciliation.service.test.js
- winston.config.js
- status.constants.js
- `tbl_invoices`
- `tbl_invoices`
- `tbl_statements`
- workDashboard.service.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- workDashboard.service.test.js
- statements.service.test.js
- contractLiquidation.service.test.js
- runIdempotent
- `tbl_works`
- DebouncedInput.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 147 edges
2. `react` - 117 edges
3. `showError()` - 98 edges
4. `workScopeOf()` - 84 edges
5. `writeAudit()` - 80 edges
6. `useAuth()` - 79 edges
7. `withLockedTransaction()` - 77 edges
8. `dateOnlyText()` - 77 edges
9. `moneyText()` - 68 edges
10. `showSuccess()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `previewWorkEndDate()` --calls--> `addTerm()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/term.utils.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `balances()` --calls--> `advanceBalances()`  [EXTRACTED]
  server/test/modules/billing/invoices/advanceFilters.test.js → server/src/modules/billing/invoices/advanceTerms.js

## Import Cycles
- None detected.

## Communities (227 total, 101 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DateTimePickerToolbar() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "ProviderDetailPage.jsx"
Cohesion: 0.08
Nodes (41): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, workProvidersApi, getProviderTypesSelectAPI, ContactsList() (+33 more)

### Community 3 - "master.service.js"
Cohesion: 0.10
Nodes (32): capitalize(), createMasterService(), defineMaster(), httpError(), ADR-0003, ADR-0004, ADR-0013, ADR-0027 (+24 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (62): assertInScope(), identificationError(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope() (+54 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.04
Nodes (81): exportInvoicesAPI(), getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI() (+73 more)

### Community 8 - "workScopeOf"
Cohesion: 0.05
Nodes (84): workScopeOf(), server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_contract_pairs, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, server_src_modules_billing_invoices_invoicemenus_listinvoicemenus, approveInvoiceController, cancelInvoiceController (+76 more)

### Community 9 - "contracts.controller.js"
Cohesion: 0.05
Nodes (80): ADR-0027, auditContext(), moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), CONTRACT_REPORTS (+72 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (49): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), previewContractConceptAPI(), previewContractEndDateAPI(), DateField(), toDate() (+41 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.14
Nodes (17): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0027 (+9 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.06
Nodes (42): ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC, ADR-0002 (+34 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (43): compat, __dirname, __filename, browserslist, development, production, eslintConfig, extends (+35 more)

### Community 15 - "UserDialog.jsx"
Cohesion: 0.08
Nodes (31): getStatusesByScopeAPI(), deleteProfileAPI(), getProfilesAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), saveUserAPI(), genericRequest (+23 more)

### Community 16 - "main.routes.js"
Cohesion: 0.06
Nodes (53): express, getIO(), verifyToken(), requirePermission(), validate(), IDEMPOTENCY_HEADER, createMasterControllers(), createMasterRouter() (+45 more)

### Community 17 - "WorkDetailPage.jsx"
Cohesion: 0.11
Nodes (29): changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, useEndDatePreview(), EditableList(), STATUS, STATUS_OPTIONS (+21 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (23): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+15 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.15
Nodes (18): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+10 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (72): ADR-0023, server_src_common_utils_money_utils_percentfor, server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_money_columns, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_percent_columns, server_src_modules_billing_invoices_contractinvoiceterms_contractdraftof, server_src_modules_billing_invoices_contractinvoiceterms_contractpairsdto (+64 more)

### Community 22 - "App.jsx"
Cohesion: 0.13
Nodes (17): refreshSession(), App(), ThemedToastContainer(), CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext, NavigationScroll() (+9 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (54): ADR-0007, ADR-0009, PROGRESS_WARNING, defineContacts(), FIELDS, httpError(), ADR-0009, optionalText() (+46 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.04
Nodes (33): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+25 more)

### Community 27 - "contractSuspensions.service.js"
Cohesion: 0.12
Nodes (27): reasonsRoutes, ADR-0017, REASON_SCOPES, reasonsConfig, reasonsService, assertContractStillAdmits(), CANCEL_TARGET, cancelContract() (+19 more)

### Community 28 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (43): insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, policyBaseValue(), conceptLabel(), contractInvoices(), ADR-0017 (+35 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "constant.js"
Cohesion: 0.18
Nodes (15): appDrawerWidth, gridSpacing, CardSecondaryAction(), SubCard(), Avatar(), ContractBalanceCards(), DashboardCards(), Indicator() (+7 more)

### Community 31 - "advanceFilters.js"
Cohesion: 0.12
Nodes (18): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+10 more)

### Community 32 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 33 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "dateOnlyText"
Cohesion: 0.09
Nodes (47): addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), TERM_UNITS, termProgress(), toDateOnly() (+39 more)

### Community 38 - "WorkDataForm.jsx"
Cohesion: 0.15
Nodes (21): getAddressTypesSelectAPI, getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY (+13 more)

### Community 39 - "cron/index.js"
Cohesion: 0.13
Nodes (15): ref_http, node-cron, app, server, verifyStatusCatalog(), cronJobs, ADR-0017, registeredTasks (+7 more)

### Community 40 - "withLockedTransaction"
Cohesion: 0.28
Nodes (17): diffFields(), withLockedTransaction(), updateAccount(), assertUniqueNumber(), assertValues(), auditable(), changeStatementStatus(), createStatement() (+9 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (48): ADR-0012, ADR-0017, ADR-0019, ADR-0020, ADR-0024, ADR-0025, ADR-0026, ADR-0011 (+40 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.12
Nodes (18): client_src_assets_scss_style, config, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals() (+10 more)

### Community 45 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "@tabler/icons-react"
Cohesion: 0.08
Nodes (29): getWorksSummaryAPI(), admin, icons, billing, dashboard, icons, menuItems, icons (+21 more)

### Community 51 - "updateInvoice"
Cohesion: 0.14
Nodes (34): adjustableAmount(), approveInvoice(), assertContractAdmitsCancel(), assertStage(), assertStatement(), assertUniqueNumber(), assertWork(), auditable() (+26 more)

### Community 52 - "decimal"
Cohesion: 0.12
Nodes (37): @prisma/client, decimal(), ratioPercent(), ratioText(), roundMoney(), roundRatio(), advanceBalances(), appliedPct() (+29 more)

### Community 53 - "ref_jest_globals"
Cohesion: 0.06
Nodes (20): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+12 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "invoiceFollowUps.service.js"
Cohesion: 0.11
Nodes (35): USER_NAME_SELECT, AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027 (+27 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (34): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+26 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 59 - "constants.js"
Cohesion: 0.03
Nodes (71): cancelContractAPI(), contractLiquidationApi, contractsApi, exportContractsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractMenuAPI(), ADR-0006 (+63 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "dashboard.service.js"
Cohesion: 0.16
Nodes (25): captured, explain(), main(), measure(), parseParams(), percentile(), plain(), scopeWhere() (+17 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "WorkChartsTab.jsx"
Cohesion: 0.14
Nodes (33): AdvanceFilter(), invoiceRows(), advanceDrill(), Advances(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState() (+25 more)

### Community 70 - "money.utils.js"
Cohesion: 0.09
Nodes (26): HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ROUNDING, toMoney(), toPercent() (+18 more)

### Community 71 - "statements.routes.js"
Cohesion: 0.11
Nodes (25): sendExport(), exportFormatRule(), handleExport(), changeStatementStatusController, deleteStatementController, exportStatementController, getStatementController, getStatementReportController (+17 more)

### Community 88 - "invoiceGlosses.service.js"
Cohesion: 0.19
Nodes (26): assertNotCancelled(), auditable(), AUDITED, createGloss(), deleteGloss(), findLockedInvoice(), findLockedOpen(), findStatement() (+18 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (101): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, getPermissionsCatalogAPI(), providersApi, reasonsApi, statementsApi (+93 more)

### Community 100 - "works.routes.js"
Cohesion: 0.12
Nodes (24): changeWorkStateController, changeWorkStatusController, deleteWorkController, exportWorksController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController (+16 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "httpCliente.js"
Cohesion: 0.10
Nodes (30): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient (+22 more)

### Community 108 - "getEffectivePermissionIds"
Cohesion: 0.23
Nodes (9): getEffectivePermissionIds(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes, ADR-0002, getUserPermissions(), updateUserPermissions() (+1 more)

### Community 112 - "transaction.service.js"
Cohesion: 0.21
Nodes (11): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+3 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "@mui/material"
Cohesion: 0.06
Nodes (60): getBusinessRulesAPI(), saveBusinessRulesAPI(), contractPoliciesApi, invoiceTransitionsApi, configurePolicyTypeBaseAPI(), getModulesAPI(), saveProfileAPI(), getReasonsSelectAPI() (+52 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (52): exceljs, ref_node_fs, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument() (+44 more)

### Community 118 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "contracts.service.js"
Cohesion: 0.06
Nodes (92): ADR-0006, inScope(), AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError() (+84 more)

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "MainCard"
Cohesion: 0.36
Nodes (9): headerStyle, MainCard(), AttentionCard(), Empty(), InvoicesCard(), ProvidersCard(), StagesCard(), WorkSummaryTab() (+1 more)

### Community 125 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 129 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 130 - "AuthForgotPassword.jsx"
Cohesion: 0.13
Nodes (22): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider() (+14 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 133 - "AdvanceBars.jsx"
Cohesion: 0.18
Nodes (14): useSchemePalette(), CONTRACT_ADVANCE_FILTER_OPTIONS, InvoicesByWorkCard(), PolicyStatusCard(), ADVANCE_LEVELS, AdvanceBar(), AdvanceLegend(), matchesAdvanceFilter() (+6 more)

### Community 134 - "writeAudit"
Cohesion: 0.04
Nodes (79): ADR-0001, ADR-0004, bcrypt, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0013, ADR-0027 (+71 more)

### Community 136 - "contractReports.service.js"
Cohesion: 0.07
Nodes (59): findExportRows(), moneyText(), sumMoney(), toLiquidateOf(), approvalSnapshot(), approvedOf(), balancesOf(), contractBalances() (+51 more)

### Community 137 - "seed.volume.js"
Cohesion: 0.11
Nodes (29): ref_node_crypto, addDays(), ALL_FIELDS, concept(), dbName, END_DATES, firstActive(), main() (+21 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 151 - "expirationNotice.service.js"
Cohesion: 0.07
Nodes (42): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+34 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 157 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 159 - "app.service.test.js"
Cohesion: 0.22
Nodes (6): BILLING, CONTRACTS, DASHBOARD, HOME, prismaMock, state

### Community 173 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 175 - "GeneralDashboard.jsx"
Cohesion: 0.16
Nodes (21): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, client_src_hooks_useinvoicemenus_useinvoicemenus, DashboardDefault, invoicePath(), AlertsCard(), Empty() (+13 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "WorkSummaryTab.jsx"
Cohesion: 0.14
Nodes (24): client_src_views_dashboard_default_work_advancebars_matchesadvancelegend, contractRows(), daysOpenText(), DrillDownDialog(), followUpRows(), followUpsDrill(), num, useDrillDown() (+16 more)

### Community 181 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 183 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 194 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 197 - "showError"
Cohesion: 0.05
Nodes (86): exportContractAPI(), exportStatementAPI(), getStatementReportAPI(), getStatementsSelectAPI(), showError(), useSocket(), BaseDialog(), DataList() (+78 more)

### Community 198 - "react-router-dom"
Cohesion: 0.05
Nodes (61): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), client_src_assets_images_interadminpro, useConfig(), setParentOpenedMenu() (+53 more)

### Community 199 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 201 - "liquidationTerms.js"
Cohesion: 0.13
Nodes (15): percentOf(), condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025 (+7 more)

### Community 202 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 203 - "requestedDetailChanges"
Cohesion: 0.28
Nodes (9): isBillingType(), detailChanges(), detailText(), hasDetail(), isSimpleType(), requestedDetailChanges(), SNAPSHOT_AMOUNTS, storedAmount() (+1 more)

### Community 204 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 211 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 212 - "status.constants.js"
Cohesion: 0.07
Nodes (46): ADR-0015, adapter, describeTarget(), prisma, testConnection(), ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS (+38 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "workDashboard.service.js"
Cohesion: 0.08
Nodes (48): percentText(), ADVANCE_LEVELS, advanceBar(), advanceLevel(), balancesOf(), byUrgency(), conceptLabel(), contractPolicies() (+40 more)

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (5): assertInvoiceVisible, ctx, prismaMock, SCOPE, state

### Community 221 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 222 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): percent(), ALL, CONCEPTS, CONTRACT, OWN, prismaMock

### Community 223 - "statements.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, OTHER, OWN, prismaMock, state

### Community 224 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 225 - "runIdempotent"
Cohesion: 0.13
Nodes (17): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent(), deleteModuleDoc() (+9 more)

## Knowledge Gaps
- **1131 isolated node(s):** `instance`, `refreshClient`, `NO_REFRESH_URLS`, `RETRY_503_HINT`, `axios` (+1126 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1567 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **101 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0012` connect `permissions.constants.js` to `ProviderDetailPage.jsx`?**
  _High betweenness centrality (0.189) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `ProviderDetailPage.jsx`, `AuthForgotPassword.jsx`, `AdvanceBars.jsx`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `client/package.json`, `UserDialog.jsx`, `WorkDetailPage.jsx`, `App.jsx`, `constant.js`, `DocumentManagement.jsx`, `WorkDataForm.jsx`, `GeneralDashboard.jsx`, `@tabler/icons-react`, `WorkSummaryTab.jsx`, `constants.js`, `withAlpha`, `WorkChartsTab.jsx`, `showError`, `react-router-dom`, `useAuth`, `httpCliente.js`, `DebouncedInput.jsx`, `MainCard`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Why does `react` connect `@mui/material` to `AuthForgotPassword.jsx`, `ProviderDetailPage.jsx`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `client/package.json`, `UserDialog.jsx`, `WorkDetailPage.jsx`, `App.jsx`, `DocumentManagement.jsx`, `WorkDataForm.jsx`, `src/index.jsx`, `GeneralDashboard.jsx`, `@tabler/icons-react`, `WorkSummaryTab.jsx`, `constants.js`, `WorkChartsTab.jsx`, `showError`, `react-router-dom`, `useAuth`, `httpCliente.js`, `DebouncedInput.jsx`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **What connects `instance`, `refreshClient`, `NO_REFRESH_URLS` to the rest of the system?**
  _1131 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08686868686868687 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `ProviderDetailPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07764876632801161 - nodes in this community are weakly interconnected._
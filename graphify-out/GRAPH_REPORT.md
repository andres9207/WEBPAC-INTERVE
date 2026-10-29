# Graph Report - WEBPAC-INTERVE  (2026-10-29)

## Corpus Check
- 696 files · ~406,860 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4379 nodes · 12451 edges · 248 communities (136 shown, 112 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 161 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f54d61c0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- WorkContracts.jsx
- providers.routes.js
- dependencies
- server/package.json
- providers.service.js
- constants.js
- workScopeOf
- InvoiceFormPage.jsx
- ContractsPage.jsx
- ProviderTypePage.jsx
- auth.routes.js
- statements.service.js
- client/package.json
- @mui/material
- advanceTerms.js
- moneyText
- invoices.service.test.js
- compilerOptions
- main.routes.js
- invoices.service.js
- contractInvoiceTerms.js
- `tbl_users`
- themes/index.jsx
- contracts.service.js
- contractConcepts.service.test.js
- AuthForgotPassword.jsx
- contractConcepts.service.js
- invoices.controller.test.js
- withLockedTransaction
- menu-items/index.js
- react-router-dom
- showError
- `tbl_contract_concepts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- WorkChartsTab.jsx
- contracts.controller.js
- cron/index.js
- works.service.js
- app.routes.js
- devDependencies
- statements.routes.js
- handleFirebaseDocs.js
- scripts
- app.js
- `tbl_contracts`
- contractPolicies.service.js
- GeneralDashboard.jsx
- decimal
- workDashboard.service.js
- `tbl_contract_type_fields`
- WorksPage.jsx
- transaction.mock.js
- scripts
- WorkSummaryTab.jsx
- simpleInvoiceTerms.js
- compilerOptions
- excelJS.js
- permissions.constants.js
- permission
- devDependencies
- transaction.service.test.js
- writeAudit
- seed.demo.js
- contractEndDateReconciliation.service.test.js
- `tbl_contract_status_history`
- approveInvoice
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- contractLiquidation.service.test.js
- statements.service.test.js
- notifications.service.js
- `tbl_works`
- `tbl_policies`
- ContractDetailPage.jsx
- export.service.js
- works.service.test.js
- error.middleware.js
- status.constants.js
- `tbl_providers`
- advanceFilters.js
- balanceReconciliation.service.js
- eslint.config.mjs
- contractSuspensions.service.test.js
- useConfig.js
- `tbl_providers`
- liquidationTerms.js
- glossFields.js
- contracts.controller.test.js
- WorkCosts.jsx
- workDashboard.service.test.js
- invoiceFollowUps.service.test.js
- MenuList/index.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- src/index.jsx
- `tbl_user_permissions`
- validation.utils.js
- mailerService.js
- health.service.js
- dashboard.service.test.js
- importCase.guard.test.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_users`
- balanceReconciliation.service.test.js
- serviceWorker.jsx
- app.service.test.js
- AuthContext.jsx
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- workDashboard.utils.js
- MainLayout/index.jsx
- contractFields.js
- decisionReferences.guard.test.js
- dashboardDetail.service.test.js
- seed.js
- session.service.test.js
- funciones.js
- ref_jest_globals
- contractReports.service.js
- `tbl_invoices`
- `tbl_invoices`
- users.service.js
- `tbl_statements`
- invoiceEvidence.service.test.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- uniqueConstraints.constants.test.js
- permissions.controller.test.js
- error.middleware.test.js
- extends
- `tbl_works`
- contractNotifications.service.test.js
- `tbl_status`
- users.service.test.js
- NotificationSection/index.jsx
- `tbl_users`
- `tbl_work_stages`
- browserslist
- winston.config.js
- DebouncedInput.jsx
- volta
- EasyCrop.jsx
- `tbl_invoice_status_history`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 153 edges
2. `react` - 119 edges
3. `showError()` - 103 edges
4. `workScopeOf()` - 92 edges
5. `moneyText()` - 87 edges
6. `dateOnlyText()` - 86 edges
7. `writeAudit()` - 80 edges
8. `useAuth()` - 79 edges
9. `withLockedTransaction()` - 77 edges
10. `fMoneyText()` - 67 edges

## Surprising Connections (you probably didn't know these)
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `advanceTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `controlTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js

## Import Cycles
- None detected.

## Communities (248 total, 112 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "WorkContracts.jsx"
Cohesion: 0.20
Nodes (20): AlertChips(), contractAlertOptions(), fPercentText(), ADVANCE_LEVELS, AdvanceFilter(), matchesAdvanceFilter(), matchesAdvanceLegend(), ContractCard() (+12 more)

### Community 3 - "providers.routes.js"
Cohesion: 0.09
Nodes (31): IDEMPOTENCY_HEADER, ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS (+23 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+26 more)

### Community 6 - "providers.service.js"
Cohesion: 0.06
Nodes (71): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), DIAN_WEIGHTS, GENERIC_FORMAT, IDENTIFICATION_FORMATS (+63 more)

### Community 7 - "constants.js"
Cohesion: 0.06
Nodes (44): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), client_src_hooks_useinvoicemenus_usecanviewinvoices, client_src_hooks_useinvoicemenus_useinvoicemenu, LinkedFilterNotice(), TooltipLongText(), CONTRACT_ALERT_OPTIONS (+36 more)

### Community 8 - "workScopeOf"
Cohesion: 0.04
Nodes (94): workScopeOf(), CONTRACT_PAIRS, CONTRACT_TAX_FIELDS, getInvoiceEvidence(), httpError(), isApproval(), snapshotOf(), server_src_modules_billing_invoices_invoicemenus_getinvoicemenu (+86 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (63): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoicesApi (+55 more)

### Community 10 - "ContractsPage.jsx"
Cohesion: 0.05
Nodes (63): contractConceptsApi, contractLiquidationApi, contractsApi, exportContractsAPI(), getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI() (+55 more)

### Community 11 - "ProviderTypePage.jsx"
Cohesion: 0.13
Nodes (18): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, INVOICE_MODE_OPTIONS, invoiceModeName(), DATA_TYPE_NAMES, GROUP_NAMES (+10 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.08
Nodes (59): assertInScope(), statementGlosses(), statementsGlosses(), statementsWithGlosses(), statementInvoices(), statementsInvoices(), toListDto(), affectingValueOf() (+51 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (22): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+14 more)

### Community 15 - "@mui/material"
Cohesion: 0.06
Nodes (45): getWorksSummaryAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, ACTION_TONES, ActionButton(), toneOf() (+37 more)

### Community 16 - "advanceTerms.js"
Cohesion: 0.21
Nodes (13): @prisma/client, appliedPct(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits(), balancesDto(), httpError(), ADR-0024 (+5 more)

### Community 17 - "moneyText"
Cohesion: 0.17
Nodes (26): moneyText(), ratioPercent(), ratioText(), sumMoney(), advanceBar(), advanceLevel(), balancesOf(), byProviderTypeBlock() (+18 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (22): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+14 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "main.routes.js"
Cohesion: 0.05
Nodes (61): express, jsonwebtoken, socket.io, supertest, authenticateHandshake(), getCookieValue(), init(), allowedHosts (+53 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (70): ADR-0021, ADR-0023, ADR-0026, server_src_modules_billing_invoices_invoicemenus_issimplemode, server_src_modules_billing_invoices_invoicemenus_simple_type_where, admittedContractsWhere(), admittedTypes(), amountRange() (+62 more)

### Community 22 - "contractInvoiceTerms.js"
Cohesion: 0.12
Nodes (28): server_src_common_utils_money_utils_percentfor, toPercent(), assertContractTotal(), blank(), composeContractInvoice(), CONTRACT_FORMULA_VERSION, CONTRACT_TAX_MONEY_COLUMNS, CONTRACT_TAX_PERCENT_COLUMNS (+20 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "themes/index.jsx"
Cohesion: 0.21
Nodes (9): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor (+1 more)

### Community 25 - "contracts.service.js"
Cohesion: 0.05
Nodes (65): ADR-0006, FIELD_GROUPS, contractsWithPendingAdvanceWhere(), daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), ADR-0015, runEndDateReconciliation() (+57 more)

### Community 26 - "contractConcepts.service.test.js"
Cohesion: 0.07
Nodes (21): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+13 more)

### Community 27 - "AuthForgotPassword.jsx"
Cohesion: 0.07
Nodes (34): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage (+26 more)

### Community 28 - "contractConcepts.service.js"
Cohesion: 0.07
Nodes (87): main(), newOperationId(), runIdempotent(), typeAppliesAiu(), withContractAiu(), resolveContractTypeFields(), assertContractStillAdmits(), CANCEL_TARGET (+79 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "withLockedTransaction"
Cohesion: 0.11
Nodes (51): withLockedTransaction(), assertNotCancelled(), auditable(), AUDITED, closeFollowUp(), deleteFollowUp(), findLockedInvoice(), findLockedOpen() (+43 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 32 - "react-router-dom"
Cohesion: 0.05
Nodes (62): getWorkDashboardAPI(), providersApi, exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), getMyWorksSelectAPI(), pickWork(), useWorkFilterField() (+54 more)

### Community 33 - "showError"
Cohesion: 0.05
Nodes (101): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), suspendContractAPI(), getIdentityDocumentsSelectAPI, getInsurersSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI() (+93 more)

### Community 34 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "WorkChartsTab.jsx"
Cohesion: 0.15
Nodes (35): MainCard(), fMoneyText(), glossRows(), invoiceRows(), advanceDrill(), Advances(), CardTitle(), clickableChartSx (+27 more)

### Community 38 - "contracts.controller.js"
Cohesion: 0.05
Nodes (75): auditContext(), moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), getContractMenu(), ACT_FIELDS (+67 more)

### Community 39 - "cron/index.js"
Cohesion: 0.11
Nodes (17): ref_http, node-cron, app, server, describeTarget(), testConnection(), verifyStatusCatalog(), cronJobs (+9 more)

### Community 40 - "works.service.js"
Cohesion: 0.07
Nodes (60): ADR-0007, diffFields(), containsFilter(), dateRangeFilter(), filtersWhere(), idFilter(), paginationStatements(), listWorkTypesSelect() (+52 more)

### Community 41 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "statements.routes.js"
Cohesion: 0.09
Nodes (34): sendExport(), exportFormatRule(), handleExport(), STATEMENT_GLOSS_FILTERS, STATEMENT_VOUCHER_FILTERS, changeStatementStatusController, deleteStatementController, exportStatementController (+26 more)

### Community 45 - "handleFirebaseDocs.js"
Cohesion: 0.21
Nodes (8): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), deleteDocApi(), firebase

### Community 46 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+11 more)

### Community 48 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (11): `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_work_provider_types`, `tbl_contract_types` (+3 more)

### Community 50 - "contractPolicies.service.js"
Cohesion: 0.08
Nodes (38): AUDIT_ENTITIES, policyExpiringDays(), insuredValue(), POLICY_BASE_NAMES, policyBaseValue(), configurePolicyTypeBase(), httpError(), ADR-0019 (+30 more)

### Community 51 - "GeneralDashboard.jsx"
Cohesion: 0.11
Nodes (30): getDashboardDetailAPI(), getDashboardSummaryAPI(), ADR-0002, client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenus, ContractBalanceCards(), DashboardCards(), Indicator() (+22 more)

### Community 52 - "decimal"
Cohesion: 0.11
Nodes (33): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), percentText(), RATIO_SCALE (+25 more)

### Community 53 - "workDashboard.service.js"
Cohesion: 0.04
Nodes (103): ADR-0002, ADR-0011, scopeWhere(), DEFAULT_ROWS, MAX_ROWS, paginate(), resolvePagination(), toInt() (+95 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "WorksPage.jsx"
Cohesion: 0.08
Nodes (32): getAddressTypesSelectAPI, getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, ADR-0019, policyTypesApi, getSupervisionTypesSelectAPI, exportWorksAPI(), getWorkFilterManagersAPI() (+24 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.04
Nodes (38): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+30 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkSummaryTab.jsx"
Cohesion: 0.20
Nodes (20): contractRows(), daysOpenText(), followUpRows(), followUpsDrill(), num, initialsOf(), MANAGER_ROLE_NAMES, plural() (+12 more)

### Community 59 - "simpleInvoiceTerms.js"
Cohesion: 0.22
Nodes (14): previewSimpleInvoice(), blank(), composeSimpleInvoice(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023, ADR-0026 (+6 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "permissions.constants.js"
Cohesion: 0.04
Nodes (58): ADR-0012, ADR-0019, ADR-0025, ADR-0011, ADR-0016, ADR-0018, PERMISSIONS, defineMaster() (+50 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, @eslint/js, globals, jest, nodemon, pm2, prisma (+1 more)

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (18): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+10 more)

### Community 68 - "writeAudit"
Cohesion: 0.03
Nodes (92): ref_crypto, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0013, ADR-0027, protect(), REDACTED (+84 more)

### Community 70 - "seed.demo.js"
Cohesion: 0.05
Nodes (52): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+44 more)

### Community 71 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 88 - "approveInvoice"
Cohesion: 0.11
Nodes (46): isBillingType(), adjustableAmount(), approveInvoice(), assertContractAdmitsCancel(), assertNoReleasedGlossLinks(), assertReleasesNoGlosses(), assertStage(), assertUniqueNumber() (+38 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.02
Nodes (103): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, deleteProfileAPI(), paginationProfilesAPI(), reasonsApi (+95 more)

### Community 100 - "works.routes.js"
Cohesion: 0.08
Nodes (34): canViewAllWorks(), selectMyWorks(), paginationProvidersController, changeWorkStateController, changeWorkStatusController, deleteWorkController, exportWorksController, getWorkController (+26 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "ContractDetailPage.jsx"
Cohesion: 0.04
Nodes (105): getStatusesByScopeAPI(), contractPoliciesApi, exportContractAPI(), previewContractConceptAPI(), changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi (+97 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (58): exceljs, pdfkit, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument() (+50 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.19
Nodes (18): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0012 (+10 more)

### Community 120 - "status.constants.js"
Cohesion: 0.07
Nodes (42): captured, explain(), main(), measure(), parseParams(), percentile(), plain(), adapter (+34 more)

### Community 123 - "advanceFilters.js"
Cohesion: 0.11
Nodes (22): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+14 more)

### Community 124 - "balanceReconciliation.service.js"
Cohesion: 0.25
Nodes (12): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations() (+4 more)

### Community 125 - "eslint.config.mjs"
Cohesion: 0.13
Nodes (13): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 129 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 130 - "useConfig.js"
Cohesion: 0.20
Nodes (11): config, ConfigContext, ConfigProvider(), useConfig(), useLocalStorage(), ElevationScroll(), HorizontalBar(), ImageList() (+3 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "liquidationTerms.js"
Cohesion: 0.14
Nodes (13): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+5 more)

### Community 133 - "glossFields.js"
Cohesion: 0.23
Nodes (10): ref_node_fs, CONTRACT_LINES, BY_TYPE, fieldAmount(), glossFieldFor(), glossFieldsFor(), NOT_A_FIELD, OTHER_FIELD (+2 more)

### Community 134 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 136 - "WorkCosts.jsx"
Cohesion: 0.16
Nodes (20): useSchemePalette(), AdvanceBar(), AdvanceLegend(), num, pendingStripes(), swatchSx, CardTitle(), clickableChartSx (+12 more)

### Community 137 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): percent(), ALL, CONCEPTS, CONTRACT, OWN, prismaMock

### Community 140 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 142 - "MenuList/index.jsx"
Cohesion: 0.24
Nodes (9): getMenuAPI(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts, setContractMenus(), work (+1 more)

### Community 151 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 153 - "validation.utils.js"
Cohesion: 0.09
Nodes (25): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+17 more)

### Community 154 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 155 - "health.service.js"
Cohesion: 0.33
Nodes (5): DB_TIMEOUT_MS, getHealth(), SERVICE_NAME, withTimeout(), prismaMock

### Community 156 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 157 - "importCase.guard.test.js"
Cohesion: 0.18
Nodes (15): ref_child_process, clientRoots, entries(), files(), gitMismatches, listing, lookup(), mismatches (+7 more)

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "expirationNotice.service.js"
Cohesion: 0.10
Nodes (35): BUSINESS_RULES, DEFAULT_EXPIRING_DAYS, MAX_RULE_DAYS, MIN_RULE_DAYS, getBusinessRulesController, saveBusinessRulesController, FIELD_BY_KEY, getBusinessRules() (+27 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.23
Nodes (9): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoice_glosses`, `tbl_invoices` (+1 more)

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 181 - "app.service.test.js"
Cohesion: 0.22
Nodes (6): BILLING, CONTRACTS, DASHBOARD, HOME, prismaMock, state

### Community 183 - "AuthContext.jsx"
Cohesion: 0.07
Nodes (34): uploadFile(), loginAPI(), logoutAPI(), updateThemeModeAPI(), verifyTokenAPI(), paginationDocsApi(), saveDocApi(), getPermissionsCatalogAPI() (+26 more)

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

### Community 197 - "workDashboard.utils.js"
Cohesion: 0.15
Nodes (12): Metric(), barPercent(), CONTRACT_STATE_CHART_COLORS, GLOSS_CHART_COLORS, INVOICE_TYPE_COLORS, MENU_CHART_COLORS, menuColor(), MONTH_NAMES (+4 more)

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.13
Nodes (25): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), Footer(), Header() (+17 more)

### Community 199 - "contractFields.js"
Cohesion: 0.20
Nodes (13): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+5 more)

### Community 201 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 202 - "dashboardDetail.service.test.js"
Cohesion: 0.25
Nodes (4): ALL, EVERYTHING, OWN, prismaMock

### Community 203 - "seed.js"
Cohesion: 0.14
Nodes (12): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+4 more)

### Community 204 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 211 - "ref_jest_globals"
Cohesion: 0.05
Nodes (19): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+11 more)

### Community 212 - "contractReports.service.js"
Cohesion: 0.05
Nodes (56): getEffectivePermissionIds(), findExportRows(), renderExport(), getDashboardDetailController, getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes (+48 more)

### Community 217 - "users.service.js"
Cohesion: 0.07
Nodes (40): ADR-0001, ADR-0004, INACTIVE_STATUS, capitalize(), createMasterService(), httpError(), ADR-0003, ADR-0004 (+32 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "invoiceEvidence.service.test.js"
Cohesion: 0.40
Nodes (3): prismaMock, state, user

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (6): assertInvoiceVisible, ctx, getInvoice, prismaMock, SCOPE, state

### Community 221 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 222 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 224 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 226 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 227 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 233 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 235 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 237 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 241 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 242 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 244 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 251 - "`tbl_invoice_status_history`"
Cohesion: 0.50
Nodes (3): `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`

## Knowledge Gaps
- **1195 isolated node(s):** `MENU_COLUMNS`, `GLOSS_COLUMNS`, `GLOSS_FIELD_COLUMNS`, `name`, `version` (+1190 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1639 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **112 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0012` connect `permissions.constants.js` to `providers.routes.js`, `ContractDetailPage.jsx`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `useConfig.js`, `WorkContracts.jsx`, `constants.js`, `WorkCosts.jsx`, `InvoiceFormPage.jsx`, `ContractsPage.jsx`, `ProviderTypePage.jsx`, `client/package.json`, `MenuList/index.jsx`, `themes/index.jsx`, `AuthForgotPassword.jsx`, `react-router-dom`, `showError`, `WorkChartsTab.jsx`, `GeneralDashboard.jsx`, `WorksPage.jsx`, `AuthContext.jsx`, `WorkSummaryTab.jsx`, `withAlpha`, `MainLayout/index.jsx`, `useAuth`, `NotificationSection/index.jsx`, `DebouncedInput.jsx`, `ContractDetailPage.jsx`, `EasyCrop.jsx`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `MENU_COLUMNS`, `GLOSS_COLUMNS`, `GLOSS_FIELD_COLUMNS` to the rest of the system?**
  _1195 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `providers.routes.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0859465737514518 - nodes in this community are weakly interconnected._
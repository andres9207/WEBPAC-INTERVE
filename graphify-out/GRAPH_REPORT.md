# Graph Report - WEBPAC-INTERVE  (2026-10-29)

## Corpus Check
- 698 files · ~409,633 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4424 nodes · 12525 edges · 252 communities (141 shown, 111 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 163 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ddaa4ce5`
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
- invoices.routes.js
- InvoiceFormPage.jsx
- ContractDetailPage.jsx
- WorkScopeContext.jsx
- auth.routes.js
- statements.service.js
- client/package.json
- @mui/material
- PoliciesTab.jsx
- workDashboard.service.js
- invoices.service.test.js
- compilerOptions
- permissions.constants.js
- invoices.service.js
- contractInvoiceTerms.js
- `tbl_users`
- simpleInvoiceTerms.js
- contracts.service.js
- contractSuspensions.service.test.js
- AuthenticationRoutes.jsx
- contractConcepts.service.js
- invoices.controller.test.js
- invoiceGlosses.service.js
- menu-items/index.js
- NotificationSection/index.jsx
- showError
- `tbl_contract_concepts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- WorkChartsTab.jsx
- contracts.controller.js
- cron/index.js
- works.service.js
- auth.service.js
- devDependencies
- useWorkScope
- fMoneyText
- scripts
- usersApi.js
- `tbl_contracts`
- StatementsPage.jsx
- GeneralDashboard.jsx
- decimal
- dashboard.service.js
- `tbl_contract_type_fields`
- app.routes.js
- transaction.mock.js
- scripts
- WorkSummaryTab.jsx
- AuthForgotPassword.jsx
- compilerOptions
- excelJS.js
- contractSuspensions.service.js
- permission
- devDependencies
- ref_fs
- withLockedTransaction
- seed.demo.js
- contractEndDateReconciliation.service.test.js
- `tbl_contract_status_history`
- invoiceTerms.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- masterRouter.utils.js
- statements.service.test.js
- notifications.service.js
- `tbl_works`
- `tbl_policies`
- WorkDetailPage.jsx
- export.service.js
- works.service.test.js
- error.middleware.js
- app.service.js
- `tbl_providers`
- advanceFilters.js
- effectivePermissions.service.js
- session.service.js
- themes/index.jsx
- ImageList.jsx
- `tbl_providers`
- runIdempotent
- ci-summary.mjs
- contracts.controller.test.js
- WorkCosts.jsx
- providerTypeFields.service.js
- invoiceEvidence.service.js
- eslint.config.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- App.jsx
- `tbl_user_permissions`
- workScopeOf
- mailerService.js
- prismaClient.js
- MenuList/index.jsx
- importCase.guard.test.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_users`
- balanceReconciliation.service.test.js
- serviceWorker.jsx
- workScope.service.js
- DocumentManagement.jsx
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- WorkPoliciesTab.jsx
- MainLayout/index.jsx
- auth.service.test.js
- glossFields.js
- dashboardDetail.service.test.js
- react-router-dom
- session.service.test.js
- validation.utils.js
- ref_jest_globals
- contractPolicies.service.js
- `tbl_invoices`
- `tbl_invoices`
- users.service.js
- `tbl_statements`
- writeAudit
- invoiceGlosses.service.test.js
- seed.js
- uniqueConstraints.constants.test.js
- workDashboard.service.test.js
- transaction.service.test.js
- extends
- `tbl_works`
- dashboard.measure.js
- `tbl_status`
- decisionReferences.guard.test.js
- contractLiquidation.service.test.js
- `tbl_users`
- `tbl_work_stages`
- contractCancellation.service.test.js
- master.service.test.js
- policyTypes.service.test.js
- expirationNotice.service.test.js
- volta
- dashboard.service.test.js
- addressTypes.service.js
- DebouncedInput.jsx
- `tbl_invoice_status_history`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 153 edges
2. `react` - 119 edges
3. `showError()` - 103 edges
4. `workScopeOf()` - 93 edges
5. `moneyText()` - 87 edges
6. `dateOnlyText()` - 86 edges
7. `writeAudit()` - 80 edges
8. `useAuth()` - 79 edges
9. `withLockedTransaction()` - 77 edges
10. `fMoneyText()` - 67 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `balances()` --calls--> `advanceBalances()`  [EXTRACTED]
  server/test/modules/billing/invoices/advanceFilters.test.js → server/src/modules/billing/invoices/advanceTerms.js
- `advanceTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `controlTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js

## Import Cycles
- None detected.

## Communities (252 total, 111 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (24): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "WorkContracts.jsx"
Cohesion: 0.14
Nodes (31): useSchemePalette(), AlertChips(), contractAlertOptions(), fPercentText(), ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter(), AdvanceLegend() (+23 more)

### Community 3 - "providers.routes.js"
Cohesion: 0.08
Nodes (34): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, exportProvidersController, getProviderController, INPUT_FIELDS (+26 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.04
Nodes (54): @azure/identity, compression, cookie-parser, cors, cross-env, dayjs, excel4node, express-fileupload (+46 more)

### Community 6 - "providers.service.js"
Cohesion: 0.06
Nodes (74): addDays(), ALL_FIELDS, concept(), dbName, END_DATES, firstActive(), main(), nit() (+66 more)

### Community 7 - "constants.js"
Cohesion: 0.04
Nodes (64): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), providerTypesApi, reasonsApi, refreshSession(), client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_usecanviewinvoices (+56 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.04
Nodes (81): server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, server_src_modules_billing_invoices_invoicemenus_listinvoicemenus, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController, deleteInvoiceController, deleteInvoiceFollowUpController (+73 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (62): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoicesApi (+54 more)

### Community 10 - "ContractDetailPage.jsx"
Cohesion: 0.04
Nodes (76): contractConceptsApi, contractLiquidationApi, contractsApi, exportContractAPI(), exportContractsAPI(), getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI() (+68 more)

### Community 11 - "WorkScopeContext.jsx"
Cohesion: 0.06
Nodes (41): exportProvidersAPI(), providersApi, getProviderTypeFieldsAPI(), saveProviderTypeFieldsAPI(), getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient (+33 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.05
Nodes (83): httpError(), renderDocument(), renderWith(), containsFilter(), countByStatus(), dateRangeFilter(), DEFAULT_ROWS, filtersWhere() (+75 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (43): asWarnings(), compat, __dirname, __filename, isOff(), browserslist, development, production (+35 more)

### Community 15 - "@mui/material"
Cohesion: 0.06
Nodes (48): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS (+40 more)

### Community 16 - "PoliciesTab.jsx"
Cohesion: 0.08
Nodes (30): contractPoliciesApi, getInsurersSelectAPI, configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, PolicyTypePage, POLICY_BASE_OPTIONS (+22 more)

### Community 17 - "workDashboard.service.js"
Cohesion: 0.07
Nodes (64): findExportRows(), renderExport(), moneyText(), sumMoney(), BUSINESS_RULES, DEFAULT_EXPIRING_DAYS, MAX_RULE_DAYS, MIN_RULE_DAYS (+56 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.05
Nodes (36): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+28 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "permissions.constants.js"
Cohesion: 0.05
Nodes (51): ADR-0011, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020, ADR-0024, ADR-0025 (+43 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.06
Nodes (77): ADR-0021, ADR-0023, server_src_modules_billing_invoices_invoicemenus_issimplemode, server_src_modules_billing_invoices_invoicemenus_simple_type_where, admittedContractsWhere(), admittedTypes(), amountRange(), approveInvoice() (+69 more)

### Community 22 - "contractInvoiceTerms.js"
Cohesion: 0.11
Nodes (31): server_src_common_utils_money_utils_percentfor, toPercent(), assertContractTotal(), blank(), composeContractInvoice(), composeWith(), CONTRACT_FORMULA_VERSION, CONTRACT_LINES (+23 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "simpleInvoiceTerms.js"
Cohesion: 0.10
Nodes (27): isBlank(), toMoney(), isBillingType(), adjustableAmount(), approvalSnapshot(), detailChanges(), detailText(), isSimpleType() (+19 more)

### Community 25 - "contracts.service.js"
Cohesion: 0.05
Nodes (66): ADR-0002, ADR-0006, ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, CONTRACT_ADVANCE_FILTERS, contractsWithPendingAdvanceWhere(), daysBetween() (+58 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.05
Nodes (28): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+20 more)

### Community 27 - "AuthenticationRoutes.jsx"
Cohesion: 0.12
Nodes (19): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+11 more)

### Community 28 - "contractConcepts.service.js"
Cohesion: 0.09
Nodes (65): typeAppliesAiu(), withContractAiu(), resolveContractTypeFields(), assertContractStillAdmits(), createContractInvoice(), activeSequence(), amendmentResult(), assertBalancesHold() (+57 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "invoiceGlosses.service.js"
Cohesion: 0.19
Nodes (29): assertFieldFor(), assertNotCancelled(), assertReleaser(), auditable(), AUDITED, createGloss(), deleteGloss(), findLockedInvoice() (+21 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.09
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 32 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 33 - "showError"
Cohesion: 0.07
Nodes (77): cancelContractAPI(), suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, getModulesAPI(), getProfilesAPI(), saveProfileAPI(), checkProviderIdentificationAPI() (+69 more)

### Community 34 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "WorkChartsTab.jsx"
Cohesion: 0.15
Nodes (30): invoiceRows(), advanceDrill(), Advances(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf() (+22 more)

### Community 38 - "contracts.controller.js"
Cohesion: 0.05
Nodes (70): auditContext(), optionalDate(), CONTRACT_REPORTS, ACT_FIELDS, cancelContractController, cancelPolicyController, CONCEPT_FIELDS, CONTRACT_FIELDS (+62 more)

### Community 39 - "cron/index.js"
Cohesion: 0.18
Nodes (10): node-cron, cronJobs, ADR-0017, registeredTasks, startCronJobs(), wrapHandler(), contractBalanceReconciliationJob, contractEndDateReconciliationJob (+2 more)

### Community 40 - "works.service.js"
Cohesion: 0.06
Nodes (74): ADR-0007, addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS (+66 more)

### Community 41 - "auth.service.js"
Cohesion: 0.07
Nodes (38): bcrypt, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+30 more)

### Community 42 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+6 more)

### Community 44 - "useWorkScope"
Cohesion: 0.09
Nodes (26): getDashboardDetailAPI(), getWorkDashboardAPI(), ADR-0002, useWorkScope(), EMPTY_FILTERS, ROWS_BY_KIND, SEARCH_HINTS, SearchField() (+18 more)

### Community 45 - "fMoneyText"
Cohesion: 0.24
Nodes (13): fTerm(), fMoneyText(), fDateOnly(), InvoiceDetailPanel(), glossRows(), WorkHero(), ConceptsTab(), money() (+5 more)

### Community 46 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+11 more)

### Community 48 - "usersApi.js"
Cohesion: 0.13
Nodes (16): getBusinessRulesAPI(), saveBusinessRulesAPI(), getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), ProfileSection(), Accordion(), findOption() (+8 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (11): `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_work_provider_types`, `tbl_contract_types` (+3 more)

### Community 50 - "StatementsPage.jsx"
Cohesion: 0.08
Nodes (40): getAddressTypesSelectAPI, exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), useWorkFilterField(), StatementsPage, ActionButton(), toneOf() (+32 more)

### Community 51 - "GeneralDashboard.jsx"
Cohesion: 0.17
Nodes (21): getDashboardSummaryAPI(), client_src_hooks_useinvoicemenus_useinvoicemenus, headerStyle, MainCard(), AlertsCard(), Empty(), LatestInvoicesCard(), num (+13 more)

### Community 52 - "decimal"
Cohesion: 0.09
Nodes (48): @prisma/client, decimal(), HUNDRED, MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent(), ratioText() (+40 more)

### Community 53 - "dashboard.service.js"
Cohesion: 0.08
Nodes (41): scopeWhere(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002, notDeleted (+33 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (35): express-validator, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state (+27 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkSummaryTab.jsx"
Cohesion: 0.18
Nodes (22): contractRows(), daysOpenText(), DrillDownDialog(), followUpRows(), followUpsDrill(), num, useDrillDown(), Metric() (+14 more)

### Community 59 - "AuthForgotPassword.jsx"
Cohesion: 0.15
Nodes (20): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider() (+12 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "contractSuspensions.service.js"
Cohesion: 0.16
Nodes (24): ADR-0017, REASON_SCOPES, reasonsService, CANCEL_TARGET, cancelContract(), ADR-0027, text(), notifyLiquidated() (+16 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-sonarjs, globals, jest, nodemon, pm2 (+2 more)

### Community 66 - "ref_fs"
Cohesion: 0.12
Nodes (13): ref_fs, ref_url, ALLOWED, files(), lines, SRC, catalog, expected (+5 more)

### Community 68 - "withLockedTransaction"
Cohesion: 0.07
Nodes (41): ADR-0013, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0001, ADR-0027, newOperationId() (+33 more)

### Community 70 - "seed.demo.js"
Cohesion: 0.10
Nodes (21): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+13 more)

### Community 71 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 88 - "invoiceTerms.js"
Cohesion: 0.11
Nodes (22): isContractCreate(), isCreate(), isSimpleCreate(), cancelTransitionFor(), GLOSS_FILTER_NAMES, GLOSS_FILTERS, hasContract(), httpError() (+14 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (88): addressTypesApi, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI() (+80 more)

### Community 100 - "works.routes.js"
Cohesion: 0.08
Nodes (37): sendExport(), handleExport(), handleExport(), handleExport(), handleExport(), changeWorkStateController, changeWorkStatusController, deleteWorkController (+29 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "masterRouter.utils.js"
Cohesion: 0.05
Nodes (59): EDITABLE_STATUS_VALUES, verifyToken(), requirePermission(), validate(), IDEMPOTENCY_HEADER, createMasterControllers(), createMasterRouter(), createMasterSchemas() (+51 more)

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "notifications.service.js"
Cohesion: 0.25
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), getNotificationCount(), listNotifications(), markAllAsRead(), markAsRead() (+4 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "WorkDetailPage.jsx"
Cohesion: 0.05
Nodes (68): getProviderTypesSelectAPI, changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), ContactsList(), ADR-0009, DataList(), Figure() (+60 more)

### Community 117 - "export.service.js"
Cohesion: 0.10
Nodes (43): pdfkit, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+35 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.06
Nodes (21): exceljs, COLUMNS, ROWS, concept(), contract(), prismaMock, contract, contractBalances (+13 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.19
Nodes (18): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0012 (+10 more)

### Community 120 - "app.service.js"
Cohesion: 0.08
Nodes (26): hasEffectivePermission(), assertModeUnchangedInUse(), httpError(), ADR-0010, providerTypesConfig, providerTypesService, getMenu(), getPagesMenu() (+18 more)

### Community 123 - "advanceFilters.js"
Cohesion: 0.12
Nodes (15): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance, ADR-0024 (+7 more)

### Community 124 - "effectivePermissions.service.js"
Cohesion: 0.23
Nodes (11): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS, findBalanceViolations() (+3 more)

### Community 125 - "session.service.js"
Cohesion: 0.07
Nodes (40): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), getIO() (+32 more)

### Community 129 - "themes/index.jsx"
Cohesion: 0.15
Nodes (13): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage(), createCustomShadow() (+5 more)

### Community 130 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "runIdempotent"
Cohesion: 0.16
Nodes (16): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent(), deleteModuleDoc() (+8 more)

### Community 133 - "ci-summary.mjs"
Cohesion: 0.22
Nodes (14): args, buildSection(), cell(), COLORS, kb(), lintSection(), number(), pie() (+6 more)

### Community 134 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 136 - "WorkCosts.jsx"
Cohesion: 0.24
Nodes (9): CardTitle(), clickableChartSx, drillLinkSx, INVOICE_NOUN, ADR-0002, MENU_COLORS, menuColor(), num (+1 more)

### Community 137 - "providerTypeFields.service.js"
Cohesion: 0.12
Nodes (27): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+19 more)

### Community 140 - "invoiceEvidence.service.js"
Cohesion: 0.15
Nodes (14): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+6 more)

### Community 142 - "eslint.config.js"
Cohesion: 0.40
Nodes (5): ref_eslint_js, ref_eslint_plugin_sonarjs, globals, asWarnings(), isOff()

### Community 151 - "App.jsx"
Cohesion: 0.13
Nodes (16): App(), ThemedToastContainer(), client_src_assets_scss_style, AuthContext, container, root, NavigationScroll(), reportWebVitals() (+8 more)

### Community 153 - "workScopeOf"
Cohesion: 0.08
Nodes (44): getEffectivePermissionIds(), workScopeOf(), getDashboardDetailController, getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes, ADR-0002 (+36 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 155 - "prismaClient.js"
Cohesion: 0.12
Nodes (16): ref_http, @prisma/adapter-mariadb, app, server, adapter, describeTarget(), prisma, testConnection() (+8 more)

### Community 156 - "MenuList/index.jsx"
Cohesion: 0.20
Nodes (11): getMenuAPI(), ElevationScroll(), HorizontalBar(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts (+3 more)

### Community 157 - "importCase.guard.test.js"
Cohesion: 0.18
Nodes (15): ref_child_process, clientRoots, entries(), files(), gitMismatches, listing, lookup(), mismatches (+7 more)

### Community 159 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "expirationNotice.service.js"
Cohesion: 0.12
Nodes (28): getBusinessRulesController, saveBusinessRulesController, getBusinessRules(), httpError(), saveBusinessRules(), toDto(), alertsOf(), contractAlertWheres() (+20 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.23
Nodes (9): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoice_glosses`, `tbl_invoices` (+1 more)

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 181 - "workScope.service.js"
Cohesion: 0.18
Nodes (14): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+6 more)

### Community 183 - "DocumentManagement.jsx"
Cohesion: 0.14
Nodes (18): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+10 more)

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

### Community 197 - "WorkPoliciesTab.jsx"
Cohesion: 0.11
Nodes (24): getWorksSummaryAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), SubCard(), ACTION_TONES, Avatar(), ContractBalanceCards() (+16 more)

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.19
Nodes (15): handlerDrawerOpen(), useConfig(), Footer(), Header(), ThemeModeSection(), MainLayout(), MainLayoutContent(), ScopedOutlet() (+7 more)

### Community 199 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 201 - "glossFields.js"
Cohesion: 0.26
Nodes (10): BY_TYPE, fieldAmount(), GLOSS_FIELD_NAMES, glossFieldFor(), glossFieldsFor(), glossPair(), NOT_A_FIELD, OTHER_FIELD (+2 more)

### Community 202 - "dashboardDetail.service.test.js"
Cohesion: 0.25
Nodes (4): ALL, EVERYTHING, OWN, prismaMock

### Community 203 - "react-router-dom"
Cohesion: 0.31
Nodes (10): endpoints, initialState, useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), NavCollapse(), NavGroup(), NavItem() (+2 more)

### Community 204 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 206 - "validation.utils.js"
Cohesion: 0.19
Nodes (11): ADR-0009, contactsRules(), emailRule(), exportFormatRule(), ADR-0027, moneyRule(), nullable, percentRule() (+3 more)

### Community 211 - "ref_jest_globals"
Cohesion: 0.06
Nodes (16): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, payload, prismaMock, forged (+8 more)

### Community 212 - "contractPolicies.service.js"
Cohesion: 0.04
Nodes (88): percentOf(), percentText(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, policyBaseValue(), policyCounts() (+80 more)

### Community 217 - "users.service.js"
Cohesion: 0.09
Nodes (28): ADR-0004, defineMaster(), DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008 (+20 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "writeAudit"
Cohesion: 0.16
Nodes (32): diffFields(), writeAudit(), assertNotCancelled(), auditable(), AUDITED, closeFollowUp(), deleteFollowUp(), findLockedInvoice() (+24 more)

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (6): assertInvoiceVisible, ctx, getInvoice, prismaMock, SCOPE, state

### Community 221 - "seed.js"
Cohesion: 0.14
Nodes (12): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+4 more)

### Community 222 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 224 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): percent(), ALL, CONCEPTS, CONTRACT, OWN, prismaMock

### Community 226 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 227 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 233 - "dashboard.measure.js"
Cohesion: 0.36
Nodes (8): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain()

### Community 235 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 237 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 241 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 242 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 243 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 244 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 245 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 246 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 247 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 251 - "`tbl_invoice_status_history`"
Cohesion: 0.50
Nodes (3): `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`

## Knowledge Gaps
- **1216 isolated node(s):** `COLORS`, `RULE_COLORS`, `args`, `sections`, `__filename` (+1211 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1663 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **111 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.246) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `withLockedTransaction`, `server/package.json`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `themes/index.jsx`, `WorkContracts.jsx`, `ImageList.jsx`, `constants.js`, `WorkCosts.jsx`, `InvoiceFormPage.jsx`, `ContractDetailPage.jsx`, `WorkScopeContext.jsx`, `client/package.json`, `PoliciesTab.jsx`, `App.jsx`, `AuthenticationRoutes.jsx`, `MenuList/index.jsx`, `menu-items/index.js`, `NotificationSection/index.jsx`, `showError`, `WorkChartsTab.jsx`, `useWorkScope`, `fMoneyText`, `usersApi.js`, `StatementsPage.jsx`, `GeneralDashboard.jsx`, `DocumentManagement.jsx`, `WorkSummaryTab.jsx`, `AuthForgotPassword.jsx`, `withAlpha`, `WorkPoliciesTab.jsx`, `MainLayout/index.jsx`, `react-router-dom`, `useAuth`, `WorkDetailPage.jsx`, `DebouncedInput.jsx`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **What connects `COLORS`, `RULE_COLORS`, `args` to the rest of the system?**
  _1216 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08325624421831637 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `WorkContracts.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1408199643493761 - nodes in this community are weakly interconnected._
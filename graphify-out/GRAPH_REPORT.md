# Graph Report - WEBPAC-INTERVE  (2026-10-29)

## Corpus Check
- 698 files · ~409,381 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4411 nodes · 12516 edges · 253 communities (141 shown, 112 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 163 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ef75b98d`
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
- ConceptDialog.jsx
- NewProviderDialog.jsx
- auth.routes.js
- statements.service.js
- client/package.json
- @mui/material
- ContractsPage.jsx
- workDashboard.service.js
- invoices.service.test.js
- compilerOptions
- master.service.js
- invoices.service.js
- moneyText
- `tbl_users`
- approveInvoice
- contracts.service.js
- contractConcepts.service.test.js
- AuthenticationRoutes.jsx
- contractConcepts.service.js
- invoices.controller.test.js
- invoiceGlosses.service.js
- menu-items/index.js
- WorkScopeContext.jsx
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
- ProfilePage.jsx
- fMoneyText
- scripts
- app.js
- `tbl_contracts`
- StatementReportDialog.jsx
- GeneralDashboard.jsx
- decimal
- dateOnlyText
- `tbl_contract_type_fields`
- express
- transaction.mock.js
- scripts
- fDateOnly
- AuthForgotPassword.jsx
- compilerOptions
- excelJS.js
- permissions.constants.js
- permission
- devDependencies
- ref_fs
- audit.service.js
- seed.demo.js
- contractEndDateReconciliation.service.test.js
- `tbl_contract_status_history`
- invoiceTerms.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- idempotency.service.js
- statements.service.test.js
- notifications.service.js
- `tbl_works`
- `tbl_policies`
- ContractDetailPage.jsx
- export.service.js
- works.service.test.js
- error.middleware.js
- getEffectivePermissionIds
- `tbl_providers`
- advanceFilters.js
- contractEndDateReconciliation.service.js
- getIO
- contractSuspensions.service.test.js
- useConfig.js
- `tbl_providers`
- liquidationTerms.js
- ci-summary.mjs
- contracts.controller.test.js
- WorkCosts.jsx
- contractFields.js
- invoiceFollowUps.service.test.js
- eslint.config.mjs
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- src/index.jsx
- `tbl_user_permissions`
- statements.routes.js
- mailerService.js
- health.service.js
- updateProvider
- importCase.guard.test.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_users`
- balanceReconciliation.service.test.js
- serviceWorker.jsx
- httpError
- DocumentManagement.jsx
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- themes/index.jsx
- MainCard
- MainLayout/index.jsx
- auth.service.test.js
- glossFields.js
- dashboardDetail.service.test.js
- paginationStatementGroups
- session.service.test.js
- text
- ref_jest_globals
- contractPolicies.service.js
- `tbl_invoices`
- `tbl_invoices`
- identityDocuments.service.js
- `tbl_statements`
- invoiceFollowUps.service.js
- invoiceGlosses.service.test.js
- floatingPoint.guard.test.js
- uniqueConstraints.constants.test.js
- app.service.test.js
- transaction.service.test.js
- extends
- `tbl_works`
- contractNotifications.service.test.js
- `tbl_status`
- users.service.test.js
- contractLiquidation.service.test.js
- `tbl_users`
- `tbl_work_stages`
- browserslist
- winston.config.js
- pagination.utils.js
- httpError
- EasyCrop.jsx
- dashboard.service.test.js
- addressTypes.contacts.js
- DebouncedInput.jsx
- volta
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
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `advanceTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `controlTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `createMasterRouter()` --indirect_call--> `validate()`  [INFERRED]
  server/src/common/utils/masterRouter.utils.js → server/src/common/middlewares/validate.middleware.js
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js

## Import Cycles
- None detected.

## Communities (253 total, 112 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "WorkContracts.jsx"
Cohesion: 0.16
Nodes (24): AlertChips(), contractAlertOptions(), ADVANCE_LEVELS, AdvanceFilter(), AdvanceLegend(), matchesAdvanceFilter(), matchesAdvanceLegend(), num (+16 more)

### Community 3 - "providers.routes.js"
Cohesion: 0.08
Nodes (35): canViewAllWorks(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, exportProvidersController, getProviderController (+27 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+26 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (30): ADR-0009, INACTIVE_STATUS, ASSIGNMENT_IDEMPOTENCY, ASSIGNMENT_LIST_SELECT, AUDITED_HEADER, CLASSIFICATIONS_SELECT, contactsHelper, EXISTING_SELECT (+22 more)

### Community 7 - "constants.js"
Cohesion: 0.05
Nodes (53): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, client_src_hooks_useinvoicemenus_useinvoicemenu, PolicyTypePage (+45 more)

### Community 8 - "workScopeOf"
Cohesion: 0.05
Nodes (87): workScopeOf(), CONTRACT_PAIRS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController, deleteInvoiceController (+79 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (60): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, previewContractInvoiceAPI() (+52 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.09
Nodes (41): getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), previewContractConceptAPI(), previewContractEndDateAPI(), useEndDatePreview(), TERM_UNIT_OPTIONS, ConceptDialog() (+33 more)

### Community 11 - "NewProviderDialog.jsx"
Cohesion: 0.08
Nodes (38): checkProviderIdentificationAPI(), exportProvidersAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, getProviderTypeFieldsAPI() (+30 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.12
Nodes (32): statementGlosses(), statementsGlosses(), statementInvoices(), STATEMENT_GLOSS_FILTERS, STATEMENT_VOUCHER_FILTERS, affectingValueOf(), amountColumnsOf(), amountTotalsOf() (+24 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (23): name, packageManager, private, version, apexcharts, axios, @emotion/react, @emotion/styled (+15 more)

### Community 15 - "@mui/material"
Cohesion: 0.06
Nodes (54): getAddressTypesSelectAPI, getStatusesByScopeAPI(), HeaderAvatar(), MobileSearch(), SearchSection(), WorkSection(), ActionButton(), toneOf() (+46 more)

### Community 16 - "ContractsPage.jsx"
Cohesion: 0.07
Nodes (34): contractConceptsApi, contractLiquidationApi, contractsApi, exportContractsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractMenuAPI(), ADR-0006 (+26 more)

### Community 17 - "workDashboard.service.js"
Cohesion: 0.14
Nodes (33): sumMoney(), ADVANCE_LEVELS, advanceBar(), advanceLevel(), alertsOf(), balancesOf(), byProviderTypeBlock(), byUrgency() (+25 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (22): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+14 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "master.service.js"
Cohesion: 0.05
Nodes (59): verifyToken(), capitalize(), createMasterService(), defineMaster(), httpError(), ADR-0003, ADR-0004, ADR-0013 (+51 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.05
Nodes (72): ADR-0021, ADR-0023, server_src_common_utils_money_utils_percentfor, containsFilter(), dateRangeFilter(), filtersWhere(), idFilter(), matchesContractAdvance() (+64 more)

### Community 22 - "moneyText"
Cohesion: 0.08
Nodes (55): moneyText(), percentOf(), percentText(), toMoney(), toPercent(), assertContractTotal(), blank(), composeContractInvoice() (+47 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "approveInvoice"
Cohesion: 0.13
Nodes (38): isBillingType(), approveInvoice(), assertContractAdmitsCancel(), assertNoReleasedGlossLinks(), assertReleasesNoGlosses(), assertStage(), assertUniqueNumber(), assertWork() (+30 more)

### Community 25 - "contracts.service.js"
Cohesion: 0.04
Nodes (79): ADR-0002, ADR-0006, FIELD_GROUPS, typeAppliesAiu(), contractsWithPendingAdvanceWhere(), getInvoiceFormOptions(), advanceWhereOf(), assertContractType() (+71 more)

### Community 26 - "contractConcepts.service.test.js"
Cohesion: 0.06
Nodes (25): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+17 more)

### Community 27 - "AuthenticationRoutes.jsx"
Cohesion: 0.11
Nodes (20): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+12 more)

### Community 28 - "contractConcepts.service.js"
Cohesion: 0.08
Nodes (86): main(), diffFields(), newOperationId(), writeAudit(), runIdempotent(), withLockedTransaction(), withContractAiu(), REASON_SCOPES (+78 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "invoiceGlosses.service.js"
Cohesion: 0.19
Nodes (28): glossFieldFor(), assertFieldFor(), assertNotCancelled(), assertReleaser(), auditable(), AUDITED, createGloss(), deleteGloss() (+20 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.08
Nodes (18): admin, icons, billing, dashboard, icons, menuItems, icons, other (+10 more)

### Community 32 - "WorkScopeContext.jsx"
Cohesion: 0.09
Nodes (34): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient (+26 more)

### Community 33 - "showError"
Cohesion: 0.05
Nodes (88): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), contractPoliciesApi, suspendContractAPI(), getIdentityDocumentsSelectAPI, getInsurersSelectAPI, invoiceFollowUpsApi (+80 more)

### Community 34 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "WorkChartsTab.jsx"
Cohesion: 0.10
Nodes (48): useSchemePalette(), fPercentText(), AdvanceBar(), advanceDrill(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState() (+40 more)

### Community 38 - "contracts.controller.js"
Cohesion: 0.05
Nodes (78): auditContext(), moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), CONTRACT_REPORTS, ACT_FIELDS (+70 more)

### Community 39 - "cron/index.js"
Cohesion: 0.13
Nodes (15): ref_http, node-cron, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog(), cronJobs (+7 more)

### Community 40 - "works.service.js"
Cohesion: 0.06
Nodes (72): ADR-0007, ALL, assertAnyInScope(), assertInScope(), httpError(), inScope(), scopeOf(), WORK_HEADER (+64 more)

### Community 41 - "auth.service.js"
Cohesion: 0.06
Nodes (50): bcrypt, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME (+42 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "ProfilePage.jsx"
Cohesion: 0.15
Nodes (21): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+13 more)

### Community 45 - "fMoneyText"
Cohesion: 0.17
Nodes (16): getWorksSummaryAPI(), ACTION_TONES, fTerm(), fMoneyText(), ContractBalanceCards(), DashboardCards(), Indicator(), ADR-0002 (+8 more)

### Community 46 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+11 more)

### Community 48 - "app.js"
Cohesion: 0.12
Nodes (14): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, app, __dirname (+6 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (11): `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_work_provider_types`, `tbl_contract_types` (+3 more)

### Community 50 - "StatementReportDialog.jsx"
Cohesion: 0.14
Nodes (21): exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), download(), downloadExport(), errorMessage(), EXPORT_FORMATS, ExportButton() (+13 more)

### Community 51 - "GeneralDashboard.jsx"
Cohesion: 0.07
Nodes (33): getDashboardDetailAPI(), getDashboardSummaryAPI(), ADR-0002, client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenus, DashboardDefault, SHORT_MONTHS, AlertsCard() (+25 more)

### Community 52 - "decimal"
Cohesion: 0.08
Nodes (50): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent() (+42 more)

### Community 53 - "dateOnlyText"
Cohesion: 0.10
Nodes (44): scopeWhere(), dateOnlyText(), todayDateOnly(), policyExpiringDays(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock() (+36 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "express"
Cohesion: 0.12
Nodes (17): express, supertest, STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController() (+9 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.04
Nodes (36): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+28 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "fDateOnly"
Cohesion: 0.21
Nodes (24): fDateOnly(), contractRows(), daysOpenText(), DrillDownDialog(), followUpRows(), followUpsDrill(), glossRows(), invoiceRows() (+16 more)

### Community 59 - "AuthForgotPassword.jsx"
Cohesion: 0.20
Nodes (15): forgotPasswordAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber() (+7 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "permissions.constants.js"
Cohesion: 0.09
Nodes (27): ADR-0011, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020, ADR-0024, ADR-0025 (+19 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, @eslint/js, globals, jest, nodemon, pm2, prisma (+1 more)

### Community 66 - "ref_fs"
Cohesion: 0.11
Nodes (15): ref_fs, ref_url, citations, DECISIONS, files(), ROOT, SELF, SOURCES (+7 more)

### Community 68 - "audit.service.js"
Cohesion: 0.04
Nodes (58): ADR-0001, ADR-0004, captured, explain(), main(), measure(), parseParams(), percentile() (+50 more)

### Community 70 - "seed.demo.js"
Cohesion: 0.05
Nodes (63): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+55 more)

### Community 71 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 88 - "invoiceTerms.js"
Cohesion: 0.13
Nodes (17): cancelTransitionFor(), GLOSS_FILTER_NAMES, GLOSS_FILTERS, httpError(), INVOICE_ALERT_NAMES, INVOICE_ALERTS, INVOICE_TRANSITIONS, ADR-0020 (+9 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (102): addressTypesApi, loginAPI(), logoutAPI(), verifyTokenAPI(), constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI (+94 more)

### Community 100 - "works.routes.js"
Cohesion: 0.07
Nodes (40): sendExport(), managedWhere(), resolveWorkScope(), selectMyWorks(), handleExport(), handleExport(), handleExport(), handleExport() (+32 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "idempotency.service.js"
Cohesion: 0.16
Nodes (14): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), IDEMPOTENCY_HEADER, idempotencyMisuse(), keyReused(), requestFingerprint(), deleteModuleDoc() (+6 more)

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "notifications.service.js"
Cohesion: 0.18
Nodes (16): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+8 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "ContractDetailPage.jsx"
Cohesion: 0.06
Nodes (87): exportContractAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), client_src_hooks_useinvoicemenus_usecanviewinvoices, useSocket(), SubCard(), ContactsList(), ADR-0009 (+79 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (57): exceljs, pdfkit, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument() (+49 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.19
Nodes (18): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0012 (+10 more)

### Community 120 - "getEffectivePermissionIds"
Cohesion: 0.09
Nodes (28): requirePermission(), getEffectivePermissionIds(), hasEffectivePermission(), getDashboardDetailController, getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes (+20 more)

### Community 123 - "advanceFilters.js"
Cohesion: 0.12
Nodes (18): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+10 more)

### Community 124 - "contractEndDateReconciliation.service.js"
Cohesion: 0.15
Nodes (18): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), contractBalanceReconciliationJob, contractEndDateReconciliationJob (+10 more)

### Community 125 - "getIO"
Cohesion: 0.07
Nodes (33): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), getIO() (+25 more)

### Community 129 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 130 - "useConfig.js"
Cohesion: 0.22
Nodes (10): ConfigContext, ConfigProvider(), useConfig(), useLocalStorage(), ElevationScroll(), HorizontalBar(), ImageList(), srcset() (+2 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "liquidationTerms.js"
Cohesion: 0.14
Nodes (13): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+5 more)

### Community 133 - "ci-summary.mjs"
Cohesion: 0.22
Nodes (14): args, buildSection(), cell(), COLORS, kb(), lintSection(), number(), pie() (+6 more)

### Community 134 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 136 - "WorkCosts.jsx"
Cohesion: 0.24
Nodes (9): CardTitle(), clickableChartSx, drillLinkSx, INVOICE_NOUN, ADR-0002, MENU_COLORS, menuColor(), num (+1 more)

### Community 137 - "contractFields.js"
Cohesion: 0.13
Nodes (15): AIU_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, ADR-0026 (+7 more)

### Community 140 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 142 - "eslint.config.mjs"
Cohesion: 0.13
Nodes (13): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 151 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 153 - "statements.routes.js"
Cohesion: 0.06
Nodes (47): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), exportFormatRule(), idArray(), idempotencyKeyRule() (+39 more)

### Community 154 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 155 - "health.service.js"
Cohesion: 0.33
Nodes (5): DB_TIMEOUT_MS, getHealth(), SERVICE_NAME, withTimeout(), prismaMock

### Community 156 - "updateProvider"
Cohesion: 0.27
Nodes (14): applyAssignmentTypes(), applyProviderTypes(), assertProviderTypes(), assignmentText(), auditAssignment(), createProvider(), findAssignmentTypeIds(), findLockedAssignment() (+6 more)

### Community 157 - "importCase.guard.test.js"
Cohesion: 0.18
Nodes (15): ref_child_process, clientRoots, entries(), files(), gitMismatches, listing, lookup(), mismatches (+7 more)

### Community 159 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "expirationNotice.service.js"
Cohesion: 0.07
Nodes (44): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+36 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.23
Nodes (9): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoice_glosses`, `tbl_invoices` (+1 more)

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 181 - "httpError"
Cohesion: 0.29
Nodes (14): assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope(), assertTypeIds(), assertWorkAssignable(), assignmentTypeIdsOf(), assignProviderToWork(), changeProviderStatus() (+6 more)

### Community 183 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 194 - "themes/index.jsx"
Cohesion: 0.10
Nodes (24): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig (+16 more)

### Community 197 - "MainCard"
Cohesion: 0.12
Nodes (23): getWorkDashboardAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), Avatar(), TABS (+15 more)

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.10
Nodes (30): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), genericRequest, setParentOpenedMenu(), useMenuCollapse() (+22 more)

### Community 199 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 201 - "glossFields.js"
Cohesion: 0.22
Nodes (10): ref_node_fs, CONTRACT_LINES, BY_TYPE, fieldAmount(), GLOSS_FIELD_NAMES, glossFieldsFor(), NOT_A_FIELD, OTHER_FIELD (+2 more)

### Community 202 - "dashboardDetail.service.test.js"
Cohesion: 0.25
Nodes (4): ALL, EVERYTHING, OWN, prismaMock

### Community 203 - "paginationStatementGroups"
Cohesion: 0.21
Nodes (12): statementsWithGlosses(), compareNumber(), groupKey(), invoiceCounts(), keySet(), optionalText(), paginationStatementGroups(), presenceFilter() (+4 more)

### Community 204 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 206 - "text"
Cohesion: 0.21
Nodes (12): assignmentValuesOf(), checkIdentification(), duplicateError(), findByIdentity(), headerValuesOf(), optionalText(), searchWhereOf(), selectAssignableWorks() (+4 more)

### Community 211 - "ref_jest_globals"
Cohesion: 0.05
Nodes (20): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+12 more)

### Community 212 - "contractPolicies.service.js"
Cohesion: 0.04
Nodes (90): findExportRows(), renderDocument(), renderExport(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, policyBaseValue() (+82 more)

### Community 217 - "identityDocuments.service.js"
Cohesion: 0.14
Nodes (14): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, identityDocumentsRoutes, identityDocumentsConfig (+6 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "invoiceFollowUps.service.js"
Cohesion: 0.08
Nodes (43): USER_NAME_SELECT, userFullName(), AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013 (+35 more)

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (6): assertInvoiceVisible, ctx, getInvoice, prismaMock, SCOPE, state

### Community 221 - "floatingPoint.guard.test.js"
Cohesion: 0.29
Nodes (5): ALLOWED, files(), lines, SRC, text()

### Community 222 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 224 - "app.service.test.js"
Cohesion: 0.22
Nodes (6): BILLING, CONTRACTS, DASHBOARD, HOME, prismaMock, state

### Community 226 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 227 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 233 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 235 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 237 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 241 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 242 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 243 - "pagination.utils.js"
Cohesion: 0.29
Nodes (4): DEFAULT_ROWS, MAX_ROWS, resolvePagination(), toInt()

### Community 244 - "httpError"
Cohesion: 0.38
Nodes (7): assertValues(), changeStatementStatus(), findImmutable(), findLocked(), findStatement(), getStatement(), httpError()

### Community 246 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 247 - "addressTypes.contacts.js"
Cohesion: 0.47
Nodes (5): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText()

### Community 249 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 251 - "`tbl_invoice_status_history`"
Cohesion: 0.50
Nodes (3): `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`

## Knowledge Gaps
- **1205 isolated node(s):** `ADR-0012`, `COLUMNS`, `WORKS_COUNT_COLUMN`, `FILTER_FIELDS`, `NO_LINKED_KEYS` (+1200 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1652 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **112 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.226) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `useConfig.js`, `WorkContracts.jsx`, `constants.js`, `WorkCosts.jsx`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `NewProviderDialog.jsx`, `client/package.json`, `ContractsPage.jsx`, `AuthenticationRoutes.jsx`, `WorkScopeContext.jsx`, `showError`, `WorkChartsTab.jsx`, `ProfilePage.jsx`, `fMoneyText`, `StatementReportDialog.jsx`, `GeneralDashboard.jsx`, `DocumentManagement.jsx`, `fDateOnly`, `AuthForgotPassword.jsx`, `themes/index.jsx`, `MainCard`, `MainLayout/index.jsx`, `useAuth`, `ContractDetailPage.jsx`, `EasyCrop.jsx`, `DebouncedInput.jsx`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `react` connect `@mui/material` to `useConfig.js`, `WorkContracts.jsx`, `constants.js`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `NewProviderDialog.jsx`, `client/package.json`, `ContractsPage.jsx`, `AuthenticationRoutes.jsx`, `WorkScopeContext.jsx`, `showError`, `WorkChartsTab.jsx`, `ProfilePage.jsx`, `fMoneyText`, `StatementReportDialog.jsx`, `GeneralDashboard.jsx`, `DocumentManagement.jsx`, `fDateOnly`, `AuthForgotPassword.jsx`, `themes/index.jsx`, `MainCard`, `MainLayout/index.jsx`, `useAuth`, `ContractDetailPage.jsx`, `EasyCrop.jsx`, `DebouncedInput.jsx`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `ADR-0012`, `COLUMNS`, `WORKS_COUNT_COLUMN` to the rest of the system?**
  _1205 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `providers.routes.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07922705314009662 - nodes in this community are weakly interconnected._
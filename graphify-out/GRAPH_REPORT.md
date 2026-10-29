# Graph Report - WEBPAC-INTERVE  (2026-10-29)

## Corpus Check
- 695 files · ~406,198 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4370 nodes · 12435 edges · 247 communities (137 shown, 110 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 162 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a06ba89b`
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
- ProfilePage.jsx
- auth.routes.js
- statements.service.js
- client/package.json
- @mui/material
- getIO
- workDashboard.service.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- moneyText
- `tbl_users`
- PoliciesTab.jsx
- contracts.service.js
- contractSuspensions.service.test.js
- AuthForgotPassword.jsx
- contractConcepts.service.js
- invoices.controller.test.js
- invoiceGlosses.service.js
- menu-items/index.js
- StatementsPage.jsx
- react
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
- handleFirebase.js
- scripts
- app.js
- `tbl_contracts`
- contractPolicies.service.js
- GeneralDashboard.jsx
- decimal
- dashboard.service.js
- `tbl_contract_type_fields`
- WorksPage.jsx
- transaction.mock.js
- scripts
- WorkSummaryTab.jsx
- pagination.utils.js
- compilerOptions
- excelJS.js
- permissions.constants.js
- permission
- devDependencies
- transaction.service.test.js
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
- AuthenticationRoutes.jsx
- identityDocuments.service.js
- ImageList.jsx
- `tbl_providers`
- liquidationTerms.js
- WorkScopeContext.jsx
- contracts.controller.test.js
- WorkCosts.jsx
- AppBar.jsx
- react-router-dom
- MenuList/index.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- App.jsx
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
- permissions.routes.js
- DocumentManagement.jsx
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- workDashboard.utils.js
- MainLayout/index.jsx
- contractFields.js
- auth.service.test.js
- server.js
- seed.js
- session.service.test.js
- invoiceFollowUps.service.js
- ref_jest_globals
- getEffectivePermissionIds
- `tbl_invoices`
- `tbl_invoices`
- invoiceEvidence.service.js
- `tbl_statements`
- useSummaryDrill.jsx
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- uniqueConstraints.constants.test.js
- addressTypes.contacts.js
- error.middleware.test.js
- extends
- `tbl_works`
- contractNotifications.service.test.js
- `tbl_status`
- users.service.test.js
- NotificationSection/index.jsx
- `tbl_users`
- `tbl_work_stages`
- expirationNotice.service.test.js
- winston.config.js
- DebouncedInput.jsx
- DashboardCards
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
- `controlTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `advanceTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `balances()` --calls--> `advanceBalances()`  [EXTRACTED]
  server/test/modules/billing/invoices/advanceFilters.test.js → server/src/modules/billing/invoices/advanceTerms.js
- `createMasterRouter()` --indirect_call--> `verifyToken()`  [INFERRED]
  server/src/common/utils/masterRouter.utils.js → server/src/common/middlewares/authjwt.middleware.js

## Import Cycles
- None detected.

## Communities (247 total, 110 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (24): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "WorkContracts.jsx"
Cohesion: 0.16
Nodes (28): CONTRACT_STATE_TABS, fPercentText(), ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter(), AdvanceLegend(), matchesAdvanceFilter(), matchesAdvanceLegend() (+20 more)

### Community 3 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): canViewAllWorks(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS (+24 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (63): MAX_ROWS, userFullName(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes() (+55 more)

### Community 7 - "constants.js"
Cohesion: 0.04
Nodes (70): contractsApi, exportContractsAPI(), getContractMenuAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), invoicesApi, useWorkFilterField() (+62 more)

### Community 8 - "workScopeOf"
Cohesion: 0.04
Nodes (88): workScopeOf(), CONTRACT_PAIRS, CONTRACT_TAX_FIELDS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController (+80 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (57): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, ADR-0017 (+49 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (49): contractConceptsApi, contractLiquidationApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006 (+41 more)

### Community 11 - "ProfilePage.jsx"
Cohesion: 0.09
Nodes (26): cancelContractAPI(), suspendContractAPI(), deleteProfileAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), paginationUsersAPI() (+18 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.08
Nodes (57): statementGlosses(), statementsGlosses(), statementsWithGlosses(), statementInvoices(), statementsInvoices(), toListDto(), affectingValueOf(), amountColumnsOf() (+49 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (40): compat, __dirname, __filename, browserslist, development, production, name, packageManager (+32 more)

### Community 15 - "@mui/material"
Cohesion: 0.08
Nodes (33): appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, SubCard(), ACTION_TONES, ActionButton(), toneOf() (+25 more)

### Community 16 - "getIO"
Cohesion: 0.12
Nodes (19): getIO(), configurePolicyTypeBaseController, configurePolicyTypeBase(), httpError(), FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController (+11 more)

### Community 17 - "workDashboard.service.js"
Cohesion: 0.09
Nodes (51): sumMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), termProgress(), toDateOnly() (+43 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (23): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+15 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.07
Nodes (40): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+32 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (101): ADR-0013, ADR-0020, ADR-0023, ADR-0024, server_src_common_utils_money_utils_percentfor, billingBalances(), isBillingType(), CONTRACT_TAX_MONEY_COLUMNS (+93 more)

### Community 22 - "moneyText"
Cohesion: 0.07
Nodes (62): moneyText(), percentOf(), percentText(), toMoney(), toPercent(), assertContractTotal(), blank(), composeContractInvoice() (+54 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "PoliciesTab.jsx"
Cohesion: 0.12
Nodes (23): contractPoliciesApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, complete(), PercentField(), toText() (+15 more)

### Community 25 - "contracts.service.js"
Cohesion: 0.05
Nodes (63): ADR-0002, ADR-0006, FIELD_GROUPS, typeAppliesAiu(), contractsWithPendingAdvanceWhere(), daysBetween(), discrepancyLine(), findEndDateDiscrepancies() (+55 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.05
Nodes (29): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+21 more)

### Community 27 - "AuthForgotPassword.jsx"
Cohesion: 0.16
Nodes (19): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider() (+11 more)

### Community 28 - "contractConcepts.service.js"
Cohesion: 0.08
Nodes (91): diffFields(), newOperationId(), writeAudit(), withLockedTransaction(), withContractAiu(), resolveContractTypeFields(), updateAccount(), updatePassword() (+83 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "invoiceGlosses.service.js"
Cohesion: 0.17
Nodes (32): assertFieldFor(), assertNotCancelled(), assertReleaser(), auditable(), AUDITED, createGloss(), deleteGloss(), findLockedInvoice() (+24 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.09
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 32 - "StatementsPage.jsx"
Cohesion: 0.09
Nodes (30): exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), StatementsPage, download(), downloadExport(), errorMessage(), EXPORT_FORMATS (+22 more)

### Community 33 - "react"
Cohesion: 0.05
Nodes (104): getBusinessRulesAPI(), saveBusinessRulesAPI(), getConstructionCompaniesSelectAPI, getIdentityDocumentsSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI(), getModulesAPI(), checkProviderIdentificationAPI() (+96 more)

### Community 34 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "WorkChartsTab.jsx"
Cohesion: 0.16
Nodes (32): useSchemePalette(), fMoneyText(), glossRows(), invoiceRows(), advanceDrill(), CardTitle(), clickableChartSx, CONTRACT_NOUN (+24 more)

### Community 38 - "contracts.controller.js"
Cohesion: 0.05
Nodes (78): auditContext(), moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), CONTRACT_REPORTS, ACT_FIELDS (+70 more)

### Community 39 - "cron/index.js"
Cohesion: 0.18
Nodes (10): node-cron, cronJobs, ADR-0017, registeredTasks, startCronJobs(), wrapHandler(), contractBalanceReconciliationJob, contractEndDateReconciliationJob (+2 more)

### Community 40 - "works.service.js"
Cohesion: 0.08
Nodes (52): ADR-0007, INACTIVE_STATUS, assertInScope(), PROGRESS_WARNING, selectStatements(), applyManagers(), applyStages(), assertCollectionPermissions() (+44 more)

### Community 41 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "statements.routes.js"
Cohesion: 0.09
Nodes (33): sendExport(), handleExport(), STATEMENT_GLOSS_FILTERS, STATEMENT_VOUCHER_FILTERS, changeStatementStatusController, deleteStatementController, exportStatementController, exportStatementGroupController (+25 more)

### Community 45 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (11): `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_work_provider_types`, `tbl_contract_types` (+3 more)

### Community 50 - "contractPolicies.service.js"
Cohesion: 0.05
Nodes (76): policyExpiringDays(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, policyBaseValue(), ADR-0019 (+68 more)

### Community 51 - "GeneralDashboard.jsx"
Cohesion: 0.20
Nodes (19): getDashboardSummaryAPI(), client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenus, MainCard(), AlertsCard(), Empty(), LatestInvoicesCard(), num (+11 more)

### Community 52 - "decimal"
Cohesion: 0.09
Nodes (46): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent(), ratioText() (+38 more)

### Community 53 - "dashboard.service.js"
Cohesion: 0.07
Nodes (57): scopeWhere(), todayDateOnly(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002 (+49 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "WorksPage.jsx"
Cohesion: 0.07
Nodes (38): getAddressTypesSelectAPI, getContractTypesSelectAPI, getProviderTypeFieldsAPI(), saveProviderTypeFieldsAPI(), getSupervisionTypesSelectAPI, exportWorksAPI(), getWorkFilterManagersAPI(), getWorkFilterProvidersAPI() (+30 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.04
Nodes (38): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+30 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkSummaryTab.jsx"
Cohesion: 0.21
Nodes (20): contractRows(), daysOpenText(), followUpRows(), followUpsDrill(), num, useDrillDown(), initialsOf(), plural() (+12 more)

### Community 59 - "pagination.utils.js"
Cohesion: 0.23
Nodes (18): containsFilter(), countByStatus(), dateRangeFilter(), DEFAULT_ROWS, filtersWhere(), idFilter(), paginate(), resolvePagination() (+10 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "permissions.constants.js"
Cohesion: 0.05
Nodes (36): ADR-0012, ADR-0019, ADR-0025, express, supertest, ADR-0011, ADR-0016, ADR-0018 (+28 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (20): ref_fs, ref_path, ref_url, citations, DECISIONS, files(), ROOT, SELF (+12 more)

### Community 68 - "audit.service.js"
Cohesion: 0.05
Nodes (55): ADR-0001, bcrypt, ref_crypto, AUDIT_ENTITIES, auditMisuse(), buildRows(), ADR-0013, ADR-0027 (+47 more)

### Community 70 - "seed.demo.js"
Cohesion: 0.05
Nodes (55): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+47 more)

### Community 71 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 88 - "invoiceTerms.js"
Cohesion: 0.12
Nodes (23): assertTransition(), cancelTransitionFor(), GLOSS_FILTER_NAMES, GLOSS_FILTERS, glossWhere(), historyRow(), httpError(), INVOICE_ALERT_NAMES (+15 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (94): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), providerTypesApi, reasonsApi (+86 more)

### Community 100 - "works.routes.js"
Cohesion: 0.08
Nodes (36): managedWhere(), resolveWorkScope(), selectMyWorks(), TERM_UNITS, exportFormatRule(), changeWorkStateController, changeWorkStatusController, deleteWorkController (+28 more)

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
Cohesion: 0.05
Nodes (89): getStatusesByScopeAPI(), exportContractAPI(), changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), useWorkScope(), InvoiceDetailPage, showInfo() (+81 more)

### Community 117 - "export.service.js"
Cohesion: 0.05
Nodes (64): exceljs, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+56 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "status.constants.js"
Cohesion: 0.05
Nodes (65): ADR-0004, ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile() (+57 more)

### Community 123 - "advanceFilters.js"
Cohesion: 0.12
Nodes (18): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+10 more)

### Community 124 - "balanceReconciliation.service.js"
Cohesion: 0.25
Nodes (12): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations() (+4 more)

### Community 125 - "AuthenticationRoutes.jsx"
Cohesion: 0.18
Nodes (11): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router (+3 more)

### Community 129 - "identityDocuments.service.js"
Cohesion: 0.15
Nodes (13): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, identityDocumentsRoutes, identityDocumentsConfig (+5 more)

### Community 130 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "liquidationTerms.js"
Cohesion: 0.14
Nodes (13): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+5 more)

### Community 133 - "WorkScopeContext.jsx"
Cohesion: 0.08
Nodes (31): providersApi, getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, RETRY_503_HINT, pickWork(), WorkScopeContext (+23 more)

### Community 134 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 136 - "WorkCosts.jsx"
Cohesion: 0.15
Nodes (13): SERIES_STATES, ADR-0002, CardTitle(), clickableChartSx, DonutWithLegend(), drillLinkSx, INVOICE_NOUN, ADR-0002 (+5 more)

### Community 137 - "AppBar.jsx"
Cohesion: 0.23
Nodes (10): client_src_assets_images_interadminpro, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthCardWrapper(), AuthWrapper1 (+2 more)

### Community 140 - "react-router-dom"
Cohesion: 0.31
Nodes (10): endpoints, initialState, useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), NavCollapse(), NavGroup(), NavItem() (+2 more)

### Community 142 - "MenuList/index.jsx"
Cohesion: 0.21
Nodes (10): getMenuAPI(), ElevationScroll(), HorizontalBar(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts (+2 more)

### Community 151 - "App.jsx"
Cohesion: 0.08
Nodes (26): refreshSession(), App(), ThemedToastContainer(), client_src_assets_scss_style, config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE (+18 more)

### Community 153 - "validation.utils.js"
Cohesion: 0.05
Nodes (48): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers() (+40 more)

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
Cohesion: 0.11
Nodes (33): BUSINESS_RULES, DEFAULT_EXPIRING_DAYS, MAX_RULE_DAYS, MIN_RULE_DAYS, getBusinessRulesController, saveBusinessRulesController, FIELD_BY_KEY, getBusinessRules() (+25 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.23
Nodes (9): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoice_glosses`, `tbl_invoices` (+1 more)

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.14
Nodes (10): @prisma/client, CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients (+2 more)

### Community 179 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 181 - "permissions.routes.js"
Cohesion: 0.23
Nodes (13): getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController(), permissionsRoutes (+5 more)

### Community 183 - "DocumentManagement.jsx"
Cohesion: 0.29
Nodes (12): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), genericRequest, showPromise(), DocumentManagement() (+4 more)

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
Cohesion: 0.14
Nodes (18): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Chip() (+10 more)

### Community 197 - "workDashboard.utils.js"
Cohesion: 0.13
Nodes (14): Metric(), barPercent(), CONTRACT_STATE_CHART_COLORS, GLOSS_CHART_COLORS, INVOICE_TYPE_COLORS, MANAGER_ROLE_NAMES, MENU_CHART_COLORS, menuColor() (+6 more)

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.19
Nodes (15): handlerDrawerOpen(), useConfig(), Footer(), Header(), ThemeModeSection(), MainLayout(), MainLayoutContent(), ScopedOutlet() (+7 more)

### Community 199 - "contractFields.js"
Cohesion: 0.10
Nodes (19): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+11 more)

### Community 201 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 202 - "server.js"
Cohesion: 0.14
Nodes (11): ref_http, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog(), stopCronJobs() (+3 more)

### Community 203 - "seed.js"
Cohesion: 0.14
Nodes (12): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+4 more)

### Community 204 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 206 - "invoiceFollowUps.service.js"
Cohesion: 0.27
Nodes (18): assertNotCancelled(), auditable(), AUDITED, closeFollowUp(), deleteFollowUp(), findLockedInvoice(), findLockedOpen(), FOLLOW_UP_SELECT (+10 more)

### Community 211 - "ref_jest_globals"
Cohesion: 0.04
Nodes (24): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+16 more)

### Community 212 - "getEffectivePermissionIds"
Cohesion: 0.06
Nodes (33): getEffectivePermissionIds(), getDashboardDetailController, getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes, ADR-0002, getDashboardDetailSchema (+25 more)

### Community 217 - "invoiceEvidence.service.js"
Cohesion: 0.21
Nodes (12): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+4 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "useSummaryDrill.jsx"
Cohesion: 0.23
Nodes (10): getDashboardDetailAPI(), getWorkDashboardAPI(), ADR-0002, EMPTY_FILTERS, ROWS_BY_KIND, SEARCH_HINTS, SearchField(), useSummaryDrill() (+2 more)

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (6): assertInvoiceVisible, ctx, getInvoice, prismaMock, SCOPE, state

### Community 221 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 222 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 224 - "addressTypes.contacts.js"
Cohesion: 0.47
Nodes (5): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText()

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

### Community 241 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 242 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 244 - "DashboardCards"
Cohesion: 0.67
Nodes (3): ContractBalanceCards(), DashboardCards(), Indicator()

### Community 251 - "`tbl_invoice_status_history`"
Cohesion: 0.50
Nodes (3): `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`

## Knowledge Gaps
- **1193 isolated node(s):** `MENU_COLUMNS`, `GLOSS_COLUMNS`, `GLOSS_FIELD_COLUMNS`, `LOGO`, `COMPANY_FOOTER` (+1188 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1637 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **110 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0012` connect `permissions.constants.js` to `providers.routes.js`, `ContractDetailPage.jsx`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `ImageList.jsx`, `WorkContracts.jsx`, `WorkScopeContext.jsx`, `constants.js`, `WorkCosts.jsx`, `InvoiceFormPage.jsx`, `AppBar.jsx`, `ProfilePage.jsx`, `react-router-dom`, `ConceptDialog.jsx`, `client/package.json`, `MenuList/index.jsx`, `App.jsx`, `PoliciesTab.jsx`, `AuthForgotPassword.jsx`, `menu-items/index.js`, `StatementsPage.jsx`, `react`, `WorkChartsTab.jsx`, `GeneralDashboard.jsx`, `WorksPage.jsx`, `DocumentManagement.jsx`, `WorkSummaryTab.jsx`, `withAlpha`, `MainLayout/index.jsx`, `useSummaryDrill.jsx`, `useAuth`, `NotificationSection/index.jsx`, `DebouncedInput.jsx`, `ContractDetailPage.jsx`, `AuthenticationRoutes.jsx`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **What connects `MENU_COLUMNS`, `GLOSS_COLUMNS`, `GLOSS_FIELD_COLUMNS` to the rest of the system?**
  _1193 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08325624421831637 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `providers.routes.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08527131782945736 - nodes in this community are weakly interconnected._
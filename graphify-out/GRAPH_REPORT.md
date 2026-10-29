# Graph Report - WEBPAC-INTERVE  (2026-10-29)

## Corpus Check
- 694 files · ~402,869 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4332 nodes · 12365 edges · 241 communities (129 shown, 112 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 161 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f11393c5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- simpleInvoiceTerms.js
- providers.routes.js
- dependencies
- server/package.json
- providers.service.js
- constants.js
- workScopeOf
- InvoiceFormPage.jsx
- ConceptDialog.jsx
- react
- auth.routes.js
- statements.service.js
- client/package.json
- ref_prop_types
- validation.utils.js
- workDashboard.service.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- contractInvoiceTerms.js
- `tbl_users`
- contractPolicies.service.js
- contracts.service.js
- contractConcepts.service.test.js
- AuthForgotPassword.jsx
- contractSuspensions.service.js
- invoices.controller.test.js
- invoiceGlosses.service.js
- menu-items/index.js
- StatementsPage.jsx
- @mui/material
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
- contractReports.service.js
- diffFields
- decimal
- dateOnlyText
- `tbl_contract_type_fields`
- WorksPage.jsx
- transaction.mock.js
- scripts
- toDateOnly
- contractTerms.js
- compilerOptions
- excelJS.js
- permissions.constants.js
- permission
- devDependencies
- decisionReferences.guard.test.js
- writeAudit
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
- contractConcepts.service.js
- `tbl_works`
- `tbl_policies`
- ContractDetailPage.jsx
- export.service.js
- works.service.test.js
- notifications.service.js
- status.constants.js
- `tbl_providers`
- advanceFilters.js
- effectivePermissions.service.js
- AuthenticationRoutes.jsx
- users.service.js
- ImageList.jsx
- `tbl_providers`
- liquidationTerms.js
- showSuccess
- contracts.controller.test.js
- workDashboard.service.test.js
- contractSuspensions.service.test.js
- useMenuCollapse.js
- MenuList/index.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- themes/index.jsx
- `tbl_user_permissions`
- main.routes.js
- mailerService.js
- health.service.js
- dashboard.service.test.js
- browserslist
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_users`
- balanceReconciliation.service.test.js
- serviceWorker.jsx
- seed.volume.js
- master.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- EasyCrop.jsx
- MainLayout/index.jsx
- providerTypeFields.service.js
- auth.service.test.js
- src/index.jsx
- dashboardDetail.service.test.js
- session.service.test.js
- withLockedTransaction
- ref_jest_globals
- getEffectivePermissionIds
- `tbl_invoices`
- `tbl_invoices`
- InputLabel.jsx
- `tbl_statements`
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- invoiceFollowUps.service.test.js
- transaction.service.test.js
- extends
- `tbl_works`
- contractNotifications.service.test.js
- `tbl_status`
- SearchSection/index.jsx
- `tbl_users`
- `tbl_work_stages`
- winston.config.js
- `tbl_invoice_status_history`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 153 edges
2. `react` - 119 edges
3. `showError()` - 103 edges
4. `workScopeOf()` - 92 edges
5. `dateOnlyText()` - 86 edges
6. `moneyText()` - 85 edges
7. `writeAudit()` - 80 edges
8. `useAuth()` - 79 edges
9. `withLockedTransaction()` - 77 edges
10. `fMoneyText()` - 67 edges

## Surprising Connections (you probably didn't know these)
- `balances()` --calls--> `advanceBalances()`  [EXTRACTED]
  server/test/modules/billing/invoices/advanceFilters.test.js → server/src/modules/billing/invoices/advanceTerms.js
- `glossRules()` --calls--> `optionalText()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/validation.utils.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js

## Import Cycles
- None detected.

## Communities (241 total, 112 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "simpleInvoiceTerms.js"
Cohesion: 0.11
Nodes (27): isBillingType(), approvalSnapshot(), detailChanges(), detailText(), isSimpleType(), previewSimpleInvoice(), requestedDetailChanges(), simpleSnapshot() (+19 more)

### Community 3 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): canViewAllWorks(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS (+24 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (64): ADR-0009, identificationError(), assertIdentification(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable() (+56 more)

### Community 7 - "constants.js"
Cohesion: 0.04
Nodes (74): contractsApi, exportContractsAPI(), getContractMenuAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), refreshSession(), client_src_hooks_useinvoicemenus (+66 more)

### Community 8 - "workScopeOf"
Cohesion: 0.04
Nodes (89): workScopeOf(), INVOICE_ADVANCE_FILTERS, CONTRACT_PAIRS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController (+81 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (56): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, previewContractInvoiceAPI() (+48 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (52): getConstructionCompaniesSelectAPI, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), previewContractConceptAPI(), previewContractEndDateAPI(), getContractTypesSelectAPI, getSupervisionTypesSelectAPI (+44 more)

### Community 11 - "react"
Cohesion: 0.08
Nodes (34): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+26 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.08
Nodes (58): containsFilter(), countByStatus(), dateRangeFilter(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS, paginate() (+50 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (33): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+25 more)

### Community 15 - "ref_prop_types"
Cohesion: 0.05
Nodes (84): getDashboardDetailAPI(), getDashboardSummaryAPI(), ADR-0002, getWorksSummaryAPI(), client_src_hooks_useinvoicemenus_useinvoicemenus, appDrawerWidth, gridSpacing, CardSecondaryAction() (+76 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.11
Nodes (21): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0027 (+13 more)

### Community 17 - "workDashboard.service.js"
Cohesion: 0.11
Nodes (42): moneyText(), sumMoney(), ADVANCE_LEVELS, advanceBar(), advanceLevel(), alertsOf(), balancesOf(), byProviderTypeBlock() (+34 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (23): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+15 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.08
Nodes (35): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+27 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.06
Nodes (85): ADR-0013, ADR-0021, ADR-0023, findExportRows(), server_src_modules_billing_invoices_invoicemenus_simple_type_where, adjustableAmount(), admittedContractsWhere(), admittedTypes() (+77 more)

### Community 22 - "contractInvoiceTerms.js"
Cohesion: 0.08
Nodes (48): isBlank(), percentOf(), percentText(), toMoney(), toPercent(), assertContractTotal(), blank(), composeContractInvoice() (+40 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "contractPolicies.service.js"
Cohesion: 0.14
Nodes (28): assertContractStillAdmits(), assertMasters(), assertTypeFree(), auditable(), cancelPolicy(), conceptLabel(), createPolicy(), createPolicyVersion() (+20 more)

### Community 25 - "contracts.service.js"
Cohesion: 0.08
Nodes (58): ADR-0006, ADR-0016, ADR-0018, typeAppliesAiu(), withContractAiu(), resolveContractTypeFields(), CONTRACT_ADVANCE_FILTER_NAMES, contractsWithPendingAdvanceWhere() (+50 more)

### Community 26 - "contractConcepts.service.test.js"
Cohesion: 0.07
Nodes (22): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+14 more)

### Community 27 - "AuthForgotPassword.jsx"
Cohesion: 0.11
Nodes (24): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI() (+16 more)

### Community 28 - "contractSuspensions.service.js"
Cohesion: 0.13
Nodes (30): newOperationId(), reasonsRoutes, ADR-0017, REASON_SCOPES, reasonsConfig, reasonsService, CANCEL_TARGET, cancelContract() (+22 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "invoiceGlosses.service.js"
Cohesion: 0.18
Nodes (30): assertFieldFor(), assertNotCancelled(), assertReleaser(), auditable(), AUDITED, createGloss(), deleteGloss(), findLockedInvoice() (+22 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 32 - "StatementsPage.jsx"
Cohesion: 0.08
Nodes (36): getAddressTypesSelectAPI, exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), StatementsPage, ActionButton(), toneOf(), ConfirmDialog() (+28 more)

### Community 33 - "@mui/material"
Cohesion: 0.03
Nodes (120): deleteFileByPath(), uploadFile(), getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), contractConceptsApi, contractLiquidationApi, contractPoliciesApi (+112 more)

### Community 34 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "WorkChartsTab.jsx"
Cohesion: 0.06
Nodes (83): useSchemePalette(), AlertChips(), contractAlertOptions(), ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter(), AdvanceLegend(), matchesAdvanceFilter() (+75 more)

### Community 38 - "contracts.controller.js"
Cohesion: 0.05
Nodes (78): auditContext(), moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), CONTRACT_REPORTS, ACT_FIELDS (+70 more)

### Community 39 - "cron/index.js"
Cohesion: 0.13
Nodes (15): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+7 more)

### Community 40 - "works.service.js"
Cohesion: 0.07
Nodes (57): ADR-0007, userFullName(), defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), applyManagers() (+49 more)

### Community 41 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "statements.routes.js"
Cohesion: 0.09
Nodes (34): sendExport(), exportFormatRule(), handleExport(), STATEMENT_GLOSS_FILTERS, STATEMENT_VOUCHER_FILTERS, changeStatementStatusController, deleteStatementController, exportStatementController (+26 more)

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

### Community 50 - "contractReports.service.js"
Cohesion: 0.05
Nodes (65): insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, policyBaseValue(), contractPolicies(), policyDto() (+57 more)

### Community 51 - "diffFields"
Cohesion: 0.17
Nodes (23): diffFields(), ALL, assertAnyInScope(), assertInScope(), httpError(), inScope(), scopeOf(), WORK_HEADER (+15 more)

### Community 52 - "decimal"
Cohesion: 0.09
Nodes (45): @prisma/client, decimal(), HUNDRED, MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent(), ratioText() (+37 more)

### Community 53 - "dateOnlyText"
Cohesion: 0.12
Nodes (38): scopeWhere(), dateOnlyText(), todayDateOnly(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock(), invoicesWhere() (+30 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "WorksPage.jsx"
Cohesion: 0.09
Nodes (36): getWorkDashboardAPI(), getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), exportWorksAPI(), getMyWorksSelectAPI(), getWorkFilterManagersAPI() (+28 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "toDateOnly"
Cohesion: 0.18
Nodes (21): addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress(), toDateOnly() (+13 more)

### Community 59 - "contractTerms.js"
Cohesion: 0.10
Nodes (26): server_src_common_utils_money_utils_percentfor, conceptLabel(), contractInvoices(), evaluateLiquidation(), ADR-0017, ADR-0027, liquidationFacts(), blank() (+18 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "permissions.constants.js"
Cohesion: 0.06
Nodes (42): ADR-0012, ADR-0019, ADR-0025, ADR-0026, ADR-0011, ADR-0016, ADR-0018, PERMISSIONS (+34 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "decisionReferences.guard.test.js"
Cohesion: 0.08
Nodes (21): ref_fs, ref_path, ref_url, citations, DECISIONS, files(), ROOT, SELF (+13 more)

### Community 68 - "writeAudit"
Cohesion: 0.08
Nodes (41): ADR-0001, bcrypt, ref_crypto, auditMisuse(), buildRows(), ADR-0013, ADR-0027, protect() (+33 more)

### Community 70 - "seed.demo.js"
Cohesion: 0.10
Nodes (20): ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC, ADR-0002 (+12 more)

### Community 71 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 88 - "invoiceTerms.js"
Cohesion: 0.09
Nodes (26): getDashboardDetailSchema, DETAIL_METRICS, cancelTransitionFor(), GLOSS_FILTER_NAMES, GLOSS_FILTERS, glossWhere(), httpError(), INVOICE_ALERT_NAMES (+18 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (88): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, policyTypesApi, providerTypesApi, supervisionTypesApi, AuthContext (+80 more)

### Community 100 - "works.routes.js"
Cohesion: 0.08
Nodes (35): managedWhere(), resolveWorkScope(), selectMyWorks(), changeWorkStateController, changeWorkStatusController, deleteWorkController, exportWorksController, getWorkController (+27 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "contractConcepts.service.js"
Cohesion: 0.20
Nodes (22): activeSequence(), amendmentResult(), assertBalancesHold(), assertChronology(), assertStartDate(), auditAct(), BALANCE_LIMITS, conceptTarget() (+14 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "ContractDetailPage.jsx"
Cohesion: 0.05
Nodes (96): getStatusesByScopeAPI(), exportContractAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), InvoiceDetailPage, useSocket(), SubCard(), ContactsList() (+88 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (51): exceljs, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+43 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "notifications.service.js"
Cohesion: 0.07
Nodes (44): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+36 more)

### Community 120 - "status.constants.js"
Cohesion: 0.05
Nodes (59): ref_node_fs, @prisma/adapter-mariadb, captured, explain(), main(), measure(), parseParams(), percentile() (+51 more)

### Community 123 - "advanceFilters.js"
Cohesion: 0.10
Nodes (22): amortizes, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance, ADR-0024, matchesContractAdvance() (+14 more)

### Community 124 - "effectivePermissions.service.js"
Cohesion: 0.20
Nodes (12): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), contractBalanceReconciliationJob, insertNotification(), balanceViolations(), CHECKS (+4 more)

### Community 125 - "AuthenticationRoutes.jsx"
Cohesion: 0.10
Nodes (21): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 129 - "users.service.js"
Cohesion: 0.09
Nodes (25): ADR-0004, defineMaster(), DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, ADR-0008, identityDocumentsConfig (+17 more)

### Community 130 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "liquidationTerms.js"
Cohesion: 0.14
Nodes (13): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+5 more)

### Community 133 - "showSuccess"
Cohesion: 0.08
Nodes (43): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, getProviderTypeFieldsAPI() (+35 more)

### Community 134 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 136 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): percent(), ALL, CONCEPTS, CONTRACT, OWN, prismaMock

### Community 137 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 142 - "MenuList/index.jsx"
Cohesion: 0.20
Nodes (11): getMenuAPI(), ElevationScroll(), HorizontalBar(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts (+3 more)

### Community 151 - "themes/index.jsx"
Cohesion: 0.15
Nodes (13): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage(), createCustomShadow() (+5 more)

### Community 153 - "main.routes.js"
Cohesion: 0.05
Nodes (53): express, supertest, getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER (+45 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 155 - "health.service.js"
Cohesion: 0.33
Nodes (5): DB_TIMEOUT_MS, getHealth(), SERVICE_NAME, withTimeout(), prismaMock

### Community 156 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 157 - "browserslist"
Cohesion: 0.27
Nodes (6): browserslist, development, production, volta, node, yarn

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "expirationNotice.service.js"
Cohesion: 0.06
Nodes (51): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+43 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.23
Nodes (9): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoice_glosses`, `tbl_invoices` (+1 more)

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 181 - "seed.volume.js"
Cohesion: 0.14
Nodes (19): ref_node_crypto, nit(), addDays(), ALL_FIELDS, concept(), dbName, END_DATES, firstActive() (+11 more)

### Community 183 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

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

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.15
Nodes (23): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), useConfig(), Footer(), Header(), ThemeModeSection() (+15 more)

### Community 199 - "providerTypeFields.service.js"
Cohesion: 0.12
Nodes (27): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+19 more)

### Community 201 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 202 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 203 - "dashboardDetail.service.test.js"
Cohesion: 0.25
Nodes (4): ALL, EVERYTHING, OWN, prismaMock

### Community 204 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 206 - "withLockedTransaction"
Cohesion: 0.10
Nodes (36): AUDIT_OPERATIONS, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+28 more)

### Community 211 - "ref_jest_globals"
Cohesion: 0.06
Nodes (17): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, payload, hasEffectivePermission, prismaMock (+9 more)

### Community 212 - "getEffectivePermissionIds"
Cohesion: 0.06
Nodes (37): getEffectivePermissionIds(), assertModeUnchangedInUse(), httpError(), ADR-0010, providerTypesConfig, providerTypesService, getDashboardDetailController, getDashboardSummaryController (+29 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (6): assertInvoiceVisible, ctx, getInvoice, prismaMock, SCOPE, state

### Community 221 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 222 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 226 - "transaction.service.test.js"
Cohesion: 0.26
Nodes (8): ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 227 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 233 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 237 - "SearchSection/index.jsx"
Cohesion: 0.60
Nodes (5): HeaderAvatar(), MobileSearch(), SearchSection(), Transitions(), material-ui-popup-state

### Community 242 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 251 - "`tbl_invoice_status_history`"
Cohesion: 0.50
Nodes (3): `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`

## Knowledge Gaps
- **1174 isolated node(s):** `SERVICE_NAME`, `DB_TIMEOUT_MS`, `mainRoutes`, `healthServiceMock`, `app` (+1169 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1617 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **112 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0012` connect `permissions.constants.js` to `providers.routes.js`, `ContractDetailPage.jsx`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `ImageList.jsx`, `server/package.json`, `showSuccess`, `constants.js`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `react`, `client/package.json`, `ref_prop_types`, `MenuList/index.jsx`, `themes/index.jsx`, `AuthForgotPassword.jsx`, `StatementsPage.jsx`, `WorkChartsTab.jsx`, `WorksPage.jsx`, `withAlpha`, `EasyCrop.jsx`, `MainLayout/index.jsx`, `InputLabel.jsx`, `useAuth`, `SearchSection/index.jsx`, `ContractDetailPage.jsx`, `AuthenticationRoutes.jsx`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **What connects `SERVICE_NAME`, `DB_TIMEOUT_MS`, `mainRoutes` to the rest of the system?**
  _1174 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `simpleInvoiceTerms.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10837438423645321 - nodes in this community are weakly interconnected._
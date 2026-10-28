# Graph Report - WEBPAC-INTERVE  (2026-10-28)

## Corpus Check
- 684 files · ~395,376 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4252 nodes · 12131 edges · 240 communities (130 shown, 110 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 158 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9f545713`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- contractInvoiceTerms.js
- workScopeOf
- dependencies
- server/package.json
- providers.service.js
- constants.js
- invoices.routes.js
- InvoiceFormPage.jsx
- ConceptDialog.jsx
- PolicyDialog.jsx
- auth.routes.js
- statements.service.js
- client/package.json
- @mui/material
- main.routes.js
- seed.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- WorkDashboard.jsx
- `tbl_users`
- contracts.service.js
- contractReports.service.js
- contractSuspensions.service.test.js
- WorkDetailPage.jsx
- status.constants.js
- contracts.controller.test.js
- invoiceGlosses.service.js
- menu-items/index.js
- providers.routes.js
- useAuth
- `tbl_contract_concepts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- WorkChartsTab.jsx
- contracts.routes.js
- cron/index.js
- works.service.js
- app.routes.js
- devDependencies
- statements.routes.js
- handleFirebase.js
- scripts
- app.js
- `tbl_contracts`
- workDashboard.service.js
- uniqueConstraints.constants.test.js
- decimal
- dashboard.service.js
- `tbl_contract_type_fields`
- WorkScopeContext.jsx
- transaction.mock.js
- scripts
- WorkContracts.jsx
- contractTerms.js
- compilerOptions
- excelJS.js
- permissions.constants.js
- permission
- devDependencies
- transaction.service.test.js
- auth.service.js
- seed.demo.js
- contractEndDateReconciliation.service.test.js
- `tbl_contract_status_history`
- invoiceEvidence.service.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- contractLiquidation.service.test.js
- statements.service.test.js
- works.controller.test.js
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- works.service.test.js
- error.middleware.js
- policyTypes.service.test.js
- `tbl_providers`
- advanceFilters.js
- effectivePermissions.service.js
- AuthForgotPassword.jsx
- serviceWorker.jsx
- useConfig.js
- `tbl_providers`
- WorkSummaryTab.jsx
- ProviderTypePage.jsx
- dashboard.service.test.js
- workDashboard.utils.js
- workScope.service.test.js
- MenuList/index.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- themes/index.jsx
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- authContext.jsx
- GeneralDashboard.jsx
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_users`
- balanceReconciliation.service.test.js
- contracts.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- MainLayout/index.jsx
- workDashboard.service.test.js
- src/index.jsx
- expirationNotice.service.test.js
- session.service.test.js
- writeAudit
- ref_jest_globals
- app.service.js
- `tbl_invoices`
- `tbl_invoices`
- constant.js
- `tbl_statements`
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- invoiceFollowUps.service.test.js
- master.service.test.js
- error.middleware.test.js
- extends
- `tbl_works`
- contractNotifications.service.test.js
- `tbl_status`
- NotificationSection/index.jsx
- `tbl_users`
- `tbl_work_stages`
- winston.config.js
- decisionReferences.guard.test.js
- browserslist
- floatingPoint.guard.test.js
- EasyCrop.jsx
- `tbl_invoice_status_history`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 152 edges
2. `react` - 118 edges
3. `showError()` - 101 edges
4. `workScopeOf()` - 89 edges
5. `moneyText()` - 85 edges
6. `dateOnlyText()` - 83 edges
7. `writeAudit()` - 80 edges
8. `useAuth()` - 79 edges
9. `withLockedTransaction()` - 77 edges
10. `fMoneyText()` - 67 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `advanceTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `controlTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js

## Import Cycles
- None detected.

## Communities (240 total, 110 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractInvoiceTerms.js"
Cohesion: 0.07
Nodes (62): ref_node_fs, percentOf(), percentText(), roundMoney(), toMoney(), toPercent(), assertContractTotal(), blank() (+54 more)

### Community 3 - "workScopeOf"
Cohesion: 0.06
Nodes (81): getIO(), auditContext(), getEffectivePermissionIds(), IDEMPOTENCY_HEADER, workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002 (+73 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (38): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+30 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (62): identificationError(), assertIdentification(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope() (+54 more)

### Community 7 - "constants.js"
Cohesion: 0.04
Nodes (70): contractsApi, exportContractsAPI(), getContractMenuAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), client_src_hooks_useinvoicemenus_usecanviewinvoices, client_src_hooks_useinvoicemenus_useinvoicemenu (+62 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.04
Nodes (73): optionalText(), CONTRACT_PAIRS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, closeInvoiceFollowUpController, deleteInvoiceFollowUpController, deleteInvoiceGlossController, exportInvoicesController, getContractAdvanceController (+65 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (58): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoicesApi (+50 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (54): contractConceptsApi, contractLiquidationApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006 (+46 more)

### Community 11 - "PolicyDialog.jsx"
Cohesion: 0.09
Nodes (27): getInsurersSelectAPI, configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, PolicyTypePage, complete(), PercentField() (+19 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.11
Nodes (39): assertInScope(), statementGlosses(), statementsGlosses(), statementsInvoices(), affectingValueOf(), amountColumnsOf(), amountTotalsOf(), AUDITED (+31 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (33): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+25 more)

### Community 15 - "@mui/material"
Cohesion: 0.05
Nodes (60): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS (+52 more)

### Community 16 - "main.routes.js"
Cohesion: 0.05
Nodes (56): express, EDITABLE_STATUS_VALUES, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter() (+48 more)

### Community 17 - "seed.js"
Cohesion: 0.11
Nodes (16): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+8 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.05
Nodes (36): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+28 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.06
Nodes (40): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+32 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (112): ADR-0013, ADR-0021, ADR-0023, server_src_common_utils_money_utils_percentfor, CONTRACT_TAX_FIELDS, CONTRACT_TAX_MONEY_COLUMNS, CONTRACT_TAX_PERCENT_COLUMNS, server_src_modules_billing_invoices_invoicemenus_issimplemode (+104 more)

### Community 22 - "WorkDashboard.jsx"
Cohesion: 0.17
Nodes (12): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, DashboardDefault, Dashboard(), ADR-0002, TABS, DASHBOARD_PATH (+4 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "contracts.service.js"
Cohesion: 0.05
Nodes (114): ADR-0006, ADR-0016, ADR-0018, main(), newOperationId(), AIU_FIELDS, enforceFields(), FIELD_GROUPS (+106 more)

### Community 25 - "contractReports.service.js"
Cohesion: 0.06
Nodes (49): findExportRows(), renderExport(), dateRangeFilter(), server_src_modules_billing_invoices_invoicemenus_iscontractmode, approvedOf(), contractIdsByAdvance(), contractInvoicesForReport(), contractsBalances() (+41 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (23): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+15 more)

### Community 27 - "WorkDetailPage.jsx"
Cohesion: 0.06
Nodes (53): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, workProvidersApi, getProviderTypesSelectAPI, changeWorkStateAPI() (+45 more)

### Community 28 - "status.constants.js"
Cohesion: 0.04
Nodes (81): ADR-0004, ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, STATUS_IDS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay() (+73 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.04
Nodes (39): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+31 more)

### Community 30 - "invoiceGlosses.service.js"
Cohesion: 0.17
Nodes (32): ADR-0027, assertFieldFor(), assertNotCancelled(), assertReleaser(), auditable(), AUDITED, createGloss(), deleteGloss() (+24 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 32 - "providers.routes.js"
Cohesion: 0.08
Nodes (23): ADR-0001, ADR-0009, contactsRules(), emailRule(), exportFormatRule(), ADR-0027, nullable, checkIdentificationController (+15 more)

### Community 33 - "useAuth"
Cohesion: 0.06
Nodes (53): deleteFileByPath(), uploadFile(), getBusinessRulesAPI(), saveBusinessRulesAPI(), deleteDocApi(), paginationDocsApi(), saveDocApi(), getModulesAPI() (+45 more)

### Community 34 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "WorkChartsTab.jsx"
Cohesion: 0.13
Nodes (34): matchesAdvanceFilter(), matchesAdvanceLegend(), contractRows(), invoiceRows(), advanceDrill(), Advances(), CardTitle(), clickableChartSx (+26 more)

### Community 38 - "contracts.routes.js"
Cohesion: 0.07
Nodes (43): moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), previewContractConceptController, ADR-0006, ADR-0016 (+35 more)

### Community 39 - "cron/index.js"
Cohesion: 0.17
Nodes (11): node-cron, cronJobs, ADR-0017, registeredTasks, startCronJobs(), stopCronJobs(), wrapHandler(), contractBalanceReconciliationJob (+3 more)

### Community 40 - "works.service.js"
Cohesion: 0.07
Nodes (67): ADR-0007, addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS (+59 more)

### Community 41 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "statements.routes.js"
Cohesion: 0.14
Nodes (21): exportStatementController, exportStatementGroupController, getStatementController, getStatementGroupReportController, getStatementReportController, paginationStatementGroupsController, paginationStatementsController, selectStatementsController (+13 more)

### Community 45 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "app.js"
Cohesion: 0.09
Nodes (19): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, ref_http, app (+11 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (11): `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_work_provider_types`, `tbl_contract_types` (+3 more)

### Community 50 - "workDashboard.service.js"
Cohesion: 0.11
Nodes (46): ADR-0011, moneyText(), sumMoney(), getRuleValues(), ADVANCE_LEVELS, advanceBar(), advanceLevel(), alertsOf() (+38 more)

### Community 51 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 52 - "decimal"
Cohesion: 0.08
Nodes (53): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent() (+45 more)

### Community 53 - "dashboard.service.js"
Cohesion: 0.07
Nodes (49): captured, explain(), main(), measure(), parseParams(), percentile(), plain(), scopeWhere() (+41 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "WorkScopeContext.jsx"
Cohesion: 0.07
Nodes (38): providersApi, exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), getMyWorksSelectAPI(), pickWork(), useWorkFilterField(), useWorkScope() (+30 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (35): express-validator, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state (+27 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkContracts.jsx"
Cohesion: 0.21
Nodes (17): contractAlertOptions(), Metric(), ContractCard(), ContractsTable(), normalize(), num, policyHintOf(), ProgressBar() (+9 more)

### Community 59 - "contractTerms.js"
Cohesion: 0.06
Nodes (65): adapter, prisma, toDateOnly(), REASON_SCOPES, reasonsService, CANCEL_TARGET, cancelContract(), ADR-0027 (+57 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "permissions.constants.js"
Cohesion: 0.07
Nodes (35): ADR-0012, ADR-0019, ADR-0025, ADR-0026, ADR-0011, ADR-0016, ADR-0018, PERMISSIONS (+27 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.13
Nodes (13): ref_fs, ref_path, ref_url, catalog, expected, prismaMock, ADR-0027, loggerMock (+5 more)

### Community 68 - "auth.service.js"
Cohesion: 0.08
Nodes (36): bcrypt, ref_crypto, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS (+28 more)

### Community 70 - "seed.demo.js"
Cohesion: 0.05
Nodes (55): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+47 more)

### Community 71 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 88 - "invoiceEvidence.service.js"
Cohesion: 0.19
Nodes (13): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+5 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.03
Nodes (96): addressTypesApi, getAddressTypesSelectAPI, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, insurersApi (+88 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.08
Nodes (34): sendExport(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope() (+26 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "works.controller.test.js"
Cohesion: 0.29
Nodes (5): emit, getEffectivePermissionIds, SCOPE, serviceMock, workScopeOf

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.05
Nodes (106): cancelContractAPI(), contractPoliciesApi, exportContractAPI(), suspendContractAPI(), invoiceTransitionsApi, getReasonsSelectAPI(), showError(), showSuccess() (+98 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (50): exceljs, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+42 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 123 - "advanceFilters.js"
Cohesion: 0.11
Nodes (18): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+10 more)

### Community 124 - "effectivePermissions.service.js"
Cohesion: 0.20
Nodes (13): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations() (+5 more)

### Community 125 - "AuthForgotPassword.jsx"
Cohesion: 0.07
Nodes (35): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage (+27 more)

### Community 129 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 130 - "useConfig.js"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "WorkSummaryTab.jsx"
Cohesion: 0.21
Nodes (18): MainCard(), daysOpenText(), followUpsDrill(), MANAGER_ROLE_NAMES, plural(), AttentionCard(), attentionOf(), CONTRACT_NOUN (+10 more)

### Community 133 - "ProviderTypePage.jsx"
Cohesion: 0.13
Nodes (18): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, INVOICE_MODE_OPTIONS, invoiceModeName(), DATA_TYPE_NAMES, GROUP_NAMES (+10 more)

### Community 134 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 136 - "workDashboard.utils.js"
Cohesion: 0.10
Nodes (30): ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter(), AdvanceLegend(), num, pendingStripes(), swatchSx, InvoicedByMonth() (+22 more)

### Community 137 - "workScope.service.test.js"
Cohesion: 0.40
Nodes (4): hasEffectivePermission, prismaMock, state, user

### Community 142 - "MenuList/index.jsx"
Cohesion: 0.26
Nodes (8): getMenuAPI(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts, setContractMenus(), work

### Community 151 - "themes/index.jsx"
Cohesion: 0.22
Nodes (9): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor (+1 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 155 - "authContext.jsx"
Cohesion: 0.16
Nodes (15): loginAPI(), logoutAPI(), updateThemeModeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), refreshSession(), App(), ThemedToastContainer() (+7 more)

### Community 157 - "GeneralDashboard.jsx"
Cohesion: 0.18
Nodes (20): client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenus, useSchemePalette(), invoicePath(), AlertsCard(), Empty(), LatestInvoicesCard(), num (+12 more)

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "expirationNotice.service.js"
Cohesion: 0.15
Nodes (23): getBusinessRulesController, saveBusinessRulesController, getBusinessRules(), contractAlertWheres(), CLOSED_STATES, CONTRACT_ALERTS, addDays(), alreadyNotified() (+15 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.23
Nodes (9): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoice_glosses`, `tbl_invoices` (+1 more)

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 183 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (10): ctx, input(), ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock (+2 more)

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
Nodes (22): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), Footer(), Header() (+14 more)

### Community 199 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): percent(), ALL, CONCEPTS, CONTRACT, OWN, prismaMock

### Community 202 - "src/index.jsx"
Cohesion: 0.15
Nodes (13): client_src_assets_scss_style, config, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals() (+5 more)

### Community 203 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 204 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 206 - "writeAudit"
Cohesion: 0.06
Nodes (71): AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0013, ADR-0027, protect() (+63 more)

### Community 211 - "ref_jest_globals"
Cohesion: 0.06
Nodes (15): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, payload, prismaMock, emit (+7 more)

### Community 212 - "app.service.js"
Cohesion: 0.07
Nodes (29): assertModeUnchangedInUse(), httpError(), ADR-0010, providerTypesConfig, providerTypesService, getMenu(), getPagesMenu(), getSessionInfo() (+21 more)

### Community 217 - "constant.js"
Cohesion: 0.15
Nodes (15): MainContentStyled, appDrawerWidth, drawerWidth, gridSpacing, CardSecondaryAction(), Avatar(), DashboardCards(), Indicator() (+7 more)

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

### Community 224 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 226 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 227 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 233 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 237 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 242 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 243 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 245 - "browserslist"
Cohesion: 0.27
Nodes (6): browserslist, development, production, volta, node, yarn

### Community 247 - "floatingPoint.guard.test.js"
Cohesion: 0.29
Nodes (5): ALLOWED, files(), lines, SRC, text()

### Community 251 - "`tbl_invoice_status_history`"
Cohesion: 0.50
Nodes (3): `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`

## Knowledge Gaps
- **1143 isolated node(s):** `MENU_COLUMNS`, `GLOSS_COLUMNS`, `GLOSS_FIELD_COLUMNS`, `num`, `num` (+1138 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1580 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **110 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0012` connect `permissions.constants.js` to `providers.routes.js`, `WorkDetailPage.jsx`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Why does `ADR-0002` connect `workDashboard.utils.js` to `contracts.service.js`, `workDashboard.service.js`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **What connects `MENU_COLUMNS`, `GLOSS_COLUMNS`, `GLOSS_FIELD_COLUMNS` to the rest of the system?**
  _1143 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractInvoiceTerms.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06582952815829528 - nodes in this community are weakly interconnected._
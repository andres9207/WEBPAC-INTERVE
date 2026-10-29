# Graph Report - WEBPAC-INTERVE  (2026-10-29)

## Corpus Check
- 698 files · ~410,476 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4430 nodes · 12538 edges · 251 communities (139 shown, 112 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 164 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d2be876a`
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
- ProvidersPage.jsx
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
- contractTerms.js
- contractConcepts.service.test.js
- ForgotPassword.jsx
- contractPolicies.service.js
- invoices.controller.test.js
- invoiceGlosses.service.js
- menu-items/index.js
- SearchSection/index.jsx
- react
- `tbl_contract_concepts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- MainCard
- contracts.controller.js
- cron/index.js
- works.service.js
- auth.service.js
- devDependencies
- GeneralDashboard.jsx
- master.service.js
- scripts
- approveInvoice
- `tbl_contracts`
- StatementReportDialog.jsx
- app.js
- decimal
- dashboard.service.js
- `tbl_contract_type_fields`
- liquidationTerms.js
- transaction.mock.js
- scripts
- WorkSummaryTab.jsx
- AuthForgotPassword.jsx
- compilerOptions
- excelJS.js
- AuthenticationRoutes.jsx
- permission
- devDependencies
- transaction.service.test.js
- withLockedTransaction
- seed.demo.js
- policyTypes.service.js
- `tbl_contract_status_history`
- invoiceTerms.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- main.routes.js
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
- balanceReconciliation.service.js
- session.service.js
- themes/index.jsx
- useConfig.js
- `tbl_providers`
- App.jsx
- ci-summary.mjs
- contracts.controller.test.js
- fPercentText
- contracts.service.js
- userFullName
- eslint.config.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- src/index.jsx
- `tbl_user_permissions`
- statements.routes.js
- mailerService.js
- health.service.js
- MenuList/index.jsx
- importCase.guard.test.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_users`
- balanceReconciliation.service.test.js
- identityDocuments.service.js
- contractSuspensions.service.test.js
- DocumentManagement.jsx
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- WorkChartsTab.jsx
- MainLayout/index.jsx
- auth.service.test.js
- socket.manager.js
- dashboardDetail.service.test.js
- useGetMenuMaster
- session.service.test.js
- validation.utils.js
- ref_jest_globals
- contractReports.service.js
- `tbl_invoices`
- `tbl_invoices`
- users.service.js
- `tbl_statements`
- audit.service.js
- invoiceGlosses.service.test.js
- invoiceFollowUps.service.test.js
- uniqueConstraints.constants.test.js
- workDashboard.service.test.js
- error.middleware.test.js
- extends
- `tbl_works`
- winston.config.js
- `tbl_status`
- decisionReferences.guard.test.js
- contractLiquidation.service.test.js
- `tbl_users`
- `tbl_work_stages`
- contractCancellation.service.test.js
- master.service.test.js
- contractNotifications.service.test.js
- expirationNotice.service.test.js
- InputLabel.jsx
- dashboard.service.test.js
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
- `ContractsPage()` --indirect_call--> `exportContractsAPI()`  [INFERRED]
  client/src/views/work/contracts/ContractsPage.jsx → client/src/api/requests/contractsApi.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js

## Import Cycles
- None detected.

## Communities (251 total, 112 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DateTimePickerToolbar() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "WorkContracts.jsx"
Cohesion: 0.19
Nodes (19): AlertChips(), contractAlertOptions(), ADVANCE_LEVELS, AdvanceFilter(), matchesAdvanceFilter(), matchesAdvanceLegend(), ContractCard(), ContractsTable() (+11 more)

### Community 3 - "providers.routes.js"
Cohesion: 0.08
Nodes (35): exportFormatRule(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, exportProvidersController, getProviderController (+27 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (38): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+30 more)

### Community 6 - "providers.service.js"
Cohesion: 0.06
Nodes (78): containsFilter(), filtersWhere(), idFilter(), defineContacts(), FIELDS, httpError(), ADR-0009, optionalText() (+70 more)

### Community 7 - "constants.js"
Cohesion: 0.04
Nodes (67): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), providerTypesApi, paginationStatementGroupsAPI(), useWorkFilterField(), client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_usecanviewinvoices (+59 more)

### Community 8 - "workScopeOf"
Cohesion: 0.05
Nodes (81): workScopeOf(), server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController, deleteInvoiceController, deleteInvoiceFollowUpController (+73 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (58): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoicesApi (+50 more)

### Community 10 - "ContractsPage.jsx"
Cohesion: 0.04
Nodes (71): contractConceptsApi, contractLiquidationApi, contractsApi, exportContractsAPI(), getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI() (+63 more)

### Community 11 - "ProvidersPage.jsx"
Cohesion: 0.11
Nodes (21): exportProvidersAPI(), providersApi, getProviderTypeFieldsAPI(), saveProviderTypeFieldsAPI(), ADR-0002, useLinkedFilters(), ProvidersPage, DATA_TYPE_NAMES (+13 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.08
Nodes (59): renderDocument(), dateRangeFilter(), statementsGlosses(), statementsWithGlosses(), statementInvoices(), statementsInvoices(), toListDto(), affectingValueOf() (+51 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (43): asWarnings(), compat, __dirname, __filename, isOff(), browserslist, development, production (+35 more)

### Community 15 - "@mui/material"
Cohesion: 0.04
Nodes (83): getAddressTypesSelectAPI, getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), getWorksSummaryAPI(), filterParams() (+75 more)

### Community 16 - "PoliciesTab.jsx"
Cohesion: 0.13
Nodes (20): contractPoliciesApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, ADR-0019, complete(), PercentField(), toText(), toValue() (+12 more)

### Community 17 - "workDashboard.service.js"
Cohesion: 0.09
Nodes (61): moneyText(), percentText(), sumMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel() (+53 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (22): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+14 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "permissions.constants.js"
Cohesion: 0.07
Nodes (36): ADR-0011, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020, ADR-0024, ADR-0025 (+28 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.05
Nodes (66): ADR-0021, ADR-0023, invoiceAdvanceWhere(), isBillingType(), server_src_modules_billing_invoices_invoicemenus_issimplemode, server_src_modules_billing_invoices_invoicemenus_simple_type_where, admittedContractsWhere(), admittedTypes() (+58 more)

### Community 22 - "contractInvoiceTerms.js"
Cohesion: 0.10
Nodes (33): server_src_common_utils_money_utils_percentfor, assertContractTotal(), blank(), composeContractInvoice(), composeWith(), CONTRACT_FORMULA_VERSION, CONTRACT_LINES, CONTRACT_PAIRS (+25 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "simpleInvoiceTerms.js"
Cohesion: 0.10
Nodes (28): ref_node_fs, percentOf(), toMoney(), toPercent(), BY_TYPE, fieldAmount(), GLOSS_FIELD_NAMES, glossFieldsFor() (+20 more)

### Community 25 - "contractTerms.js"
Cohesion: 0.09
Nodes (32): daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), ADR-0015, runEndDateReconciliation(), derivedEndDate(), previewContractConcept(), previewContractEndDate() (+24 more)

### Community 26 - "contractConcepts.service.test.js"
Cohesion: 0.06
Nodes (25): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+17 more)

### Community 27 - "ForgotPassword.jsx"
Cohesion: 0.21
Nodes (11): client_src_assets_images_interadminpro, LoginPage, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthCardWrapper() (+3 more)

### Community 28 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (96): main(), AUDIT_ENTITIES, AUDIT_OPERATIONS, newOperationId(), runIdempotent(), withContractAiu(), ADR-0017, REASON_SCOPES (+88 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "invoiceGlosses.service.js"
Cohesion: 0.16
Nodes (34): glossFieldFor(), assertFieldFor(), assertNotCancelled(), assertReleaser(), auditable(), AUDITED, createGloss(), deleteGloss() (+26 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 32 - "SearchSection/index.jsx"
Cohesion: 0.60
Nodes (5): HeaderAvatar(), MobileSearch(), SearchSection(), Transitions(), material-ui-popup-state

### Community 33 - "react"
Cohesion: 0.05
Nodes (96): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), suspendContractAPI(), invoiceTransitionsApi, configurePolicyTypeBaseAPI(), getModulesAPI(), getProfilesAPI() (+88 more)

### Community 34 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "MainCard"
Cohesion: 0.27
Nodes (18): MainCard(), invoiceRows(), advanceDrill(), Advances(), CardTitle(), ContractsByState(), Empty(), Glosses() (+10 more)

### Community 38 - "contracts.controller.js"
Cohesion: 0.05
Nodes (78): auditContext(), moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), CONTRACT_REPORTS, ACT_FIELDS (+70 more)

### Community 39 - "cron/index.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+8 more)

### Community 40 - "works.service.js"
Cohesion: 0.08
Nodes (53): ADR-0007, ADR-0009, writeAudit(), assertInScope(), PROGRESS_WARNING, applyManagers(), applyStages(), assertCollectionPermissions() (+45 more)

### Community 41 - "auth.service.js"
Cohesion: 0.10
Nodes (29): bcrypt, backoff(), runTransaction(), withTransaction(), comparePassword(), hashPassword(), deriveKey(), generateResetCode() (+21 more)

### Community 42 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+6 more)

### Community 44 - "GeneralDashboard.jsx"
Cohesion: 0.06
Nodes (53): getDashboardDetailAPI(), getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI() (+45 more)

### Community 45 - "master.service.js"
Cohesion: 0.11
Nodes (27): INACTIVE_STATUS, capitalize(), createMasterService(), defineMaster(), httpError(), ADR-0003, ADR-0004, ADR-0013 (+19 more)

### Community 46 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+11 more)

### Community 48 - "approveInvoice"
Cohesion: 0.15
Nodes (31): adjustableAmount(), approveInvoice(), assertContractAdmitsCancel(), assertNoReleasedGlossLinks(), assertReleasesNoGlosses(), assertStage(), assertUniqueNumber(), assertWork() (+23 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (11): `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_work_provider_types`, `tbl_contract_types` (+3 more)

### Community 50 - "StatementReportDialog.jsx"
Cohesion: 0.15
Nodes (20): exportStatementGroupAPI(), getStatementGroupReportAPI(), download(), downloadExport(), errorMessage(), EXPORT_FORMATS, ExportButton(), ExportDialog() (+12 more)

### Community 51 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 52 - "decimal"
Cohesion: 0.08
Nodes (50): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent() (+42 more)

### Community 53 - "dashboard.service.js"
Cohesion: 0.07
Nodes (54): scopeWhere(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002, notDeleted (+46 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "liquidationTerms.js"
Cohesion: 0.14
Nodes (13): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+5 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkSummaryTab.jsx"
Cohesion: 0.18
Nodes (23): contractRows(), daysOpenText(), followUpRows(), followUpsDrill(), glossRows(), num, useDrillDown(), dashboardTo (+15 more)

### Community 59 - "AuthForgotPassword.jsx"
Cohesion: 0.17
Nodes (17): forgotPasswordAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), DatePicker(), AnimateButton(), CustomFormControl, hasMixed() (+9 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "AuthenticationRoutes.jsx"
Cohesion: 0.19
Nodes (10): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router, MainRoutes (+2 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-sonarjs, globals, jest, nodemon, pm2 (+2 more)

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "withLockedTransaction"
Cohesion: 0.07
Nodes (31): buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES, toSortedIds() (+23 more)

### Community 70 - "seed.demo.js"
Cohesion: 0.04
Nodes (70): ADR-0002, ref_node_crypto, @prisma/adapter-mariadb, captured, explain(), main(), measure(), parseParams() (+62 more)

### Community 71 - "policyTypes.service.js"
Cohesion: 0.17
Nodes (11): ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, configurePolicyTypeBaseController, configurePolicyTypeBase(), httpError(), ADR-0019 (+3 more)

### Community 88 - "invoiceTerms.js"
Cohesion: 0.11
Nodes (21): isContractCreate(), isCreate(), isSimpleCreate(), cancelTransitionFor(), GLOSS_FILTER_NAMES, GLOSS_FILTERS, hasContract(), httpError() (+13 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (98): addressTypesApi, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI() (+90 more)

### Community 100 - "works.routes.js"
Cohesion: 0.08
Nodes (35): canViewAllWorks(), managedWhere(), resolveWorkScope(), selectMyWorks(), changeWorkStateController, changeWorkStatusController, deleteWorkController, exportWorksController (+27 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "main.routes.js"
Cohesion: 0.04
Nodes (67): express, supertest, getIO(), STATUS_KEYS, verifyToken(), requirePermission(), validate(), hasEffectivePermission() (+59 more)

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
Nodes (93): exportContractAPI(), getIdentityDocumentsSelectAPI, changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, InvoiceDetailPage, ProviderDetailPage (+85 more)

### Community 117 - "export.service.js"
Cohesion: 0.09
Nodes (45): pdfkit, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+37 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.06
Nodes (21): exceljs, COLUMNS, ROWS, concept(), contract(), prismaMock, contract, contractBalances (+13 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.19
Nodes (18): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0012 (+10 more)

### Community 120 - "getEffectivePermissionIds"
Cohesion: 0.06
Nodes (37): getEffectivePermissionIds(), assertModeUnchangedInUse(), httpError(), ADR-0010, providerTypesConfig, providerTypesService, getDashboardDetailController, getDashboardSummaryController (+29 more)

### Community 123 - "advanceFilters.js"
Cohesion: 0.11
Nodes (20): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, isAdvance, ADR-0024 (+12 more)

### Community 124 - "balanceReconciliation.service.js"
Cohesion: 0.25
Nodes (12): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations() (+4 more)

### Community 125 - "session.service.js"
Cohesion: 0.15
Nodes (20): ACCESS_COOKIE_NAME, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME (+12 more)

### Community 129 - "themes/index.jsx"
Cohesion: 0.22
Nodes (9): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor (+1 more)

### Community 130 - "useConfig.js"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "App.jsx"
Cohesion: 0.17
Nodes (13): loginAPI(), logoutAPI(), verifyTokenAPI(), refreshSession(), App(), ThemedToastContainer(), AuthContext, AuthProvider() (+5 more)

### Community 133 - "ci-summary.mjs"
Cohesion: 0.17
Nodes (20): args, buildSection(), cell(), COLORS, kb(), lineLink(), lintSection(), number() (+12 more)

### Community 134 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 136 - "fPercentText"
Cohesion: 0.14
Nodes (24): useSchemePalette(), fPercentText(), InvoicesByWorkCard(), PolicyStatusCard(), AdvanceBar(), AdvanceLegend(), num, pendingStripes() (+16 more)

### Community 137 - "contracts.service.js"
Cohesion: 0.06
Nodes (60): ADR-0006, AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+52 more)

### Community 140 - "userFullName"
Cohesion: 0.11
Nodes (19): USER_NAME_SELECT, userFullName(), AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013 (+11 more)

### Community 142 - "eslint.config.js"
Cohesion: 0.40
Nodes (5): ref_eslint_js, ref_eslint_plugin_sonarjs, globals, asWarnings(), isOff()

### Community 151 - "src/index.jsx"
Cohesion: 0.12
Nodes (18): client_src_assets_scss_style, config, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals() (+10 more)

### Community 153 - "statements.routes.js"
Cohesion: 0.09
Nodes (34): sendExport(), handleExport(), STATEMENT_GLOSS_FILTERS, STATEMENT_VOUCHER_FILTERS, changeStatementStatusController, deleteStatementController, exportStatementController, exportStatementGroupController (+26 more)

### Community 154 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 155 - "health.service.js"
Cohesion: 0.33
Nodes (5): DB_TIMEOUT_MS, getHealth(), SERVICE_NAME, withTimeout(), prismaMock

### Community 156 - "MenuList/index.jsx"
Cohesion: 0.31
Nodes (8): getMenuAPI(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts, setContractMenus(), work

### Community 157 - "importCase.guard.test.js"
Cohesion: 0.18
Nodes (15): ref_child_process, clientRoots, entries(), files(), gitMismatches, listing, lookup(), mismatches (+7 more)

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "expirationNotice.service.js"
Cohesion: 0.07
Nodes (45): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+37 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.23
Nodes (9): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoice_glosses`, `tbl_invoices` (+1 more)

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "identityDocuments.service.js"
Cohesion: 0.17
Nodes (11): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, ADR-0008, identityDocumentsRoutes, identityDocumentsConfig, identityDocumentsService (+3 more)

### Community 181 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

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

### Community 194 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 197 - "WorkChartsTab.jsx"
Cohesion: 0.09
Nodes (27): clickableChartSx, CONTRACT_NOUN, dayOf(), drillLinkSx, GLOSS_SEGMENTS, INVOICE_NOUN, INVOICE_STATE_TITLES, Metric() (+19 more)

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.18
Nodes (16): handlerDrawerOpen(), Footer(), Header(), ThemeModeSection(), MainLayout(), MainLayoutContent(), ScopedOutlet(), LogoSection() (+8 more)

### Community 199 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 201 - "socket.manager.js"
Cohesion: 0.26
Nodes (9): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+1 more)

### Community 202 - "dashboardDetail.service.test.js"
Cohesion: 0.25
Nodes (4): ALL, EVERYTHING, OWN, prismaMock

### Community 203 - "useGetMenuMaster"
Cohesion: 0.35
Nodes (8): endpoints, initialState, useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), NavCollapse(), NavGroup(), NavItem()

### Community 204 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 206 - "validation.utils.js"
Cohesion: 0.10
Nodes (22): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0027 (+14 more)

### Community 211 - "ref_jest_globals"
Cohesion: 0.05
Nodes (24): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+16 more)

### Community 212 - "contractReports.service.js"
Cohesion: 0.06
Nodes (54): findExportRows(), renderExport(), insuredValue(), policyBaseValue(), server_src_modules_billing_invoices_invoicemenus_iscontractmode, contractIdsByAdvance(), contractInvoicesForReport(), contractsBalances() (+46 more)

### Community 217 - "users.service.js"
Cohesion: 0.10
Nodes (23): ADR-0004, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), identificationError() (+15 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "audit.service.js"
Cohesion: 0.13
Nodes (32): ADR-0013, auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0027, protect(), REDACTED (+24 more)

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (6): assertInvoiceVisible, ctx, getInvoice, prismaMock, SCOPE, state

### Community 221 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 222 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 224 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): percent(), ALL, CONCEPTS, CONTRACT, OWN, prismaMock

### Community 226 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 227 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 233 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

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

### Community 243 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 244 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 246 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 251 - "`tbl_invoice_status_history`"
Cohesion: 0.50
Nodes (3): `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`

## Knowledge Gaps
- **1218 isolated node(s):** `COLORS`, `RULE_COLORS`, `TEXT_COLORS`, `RULES`, `args` (+1213 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1665 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **112 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.264) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `withLockedTransaction`, `server/package.json`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `themes/index.jsx`, `useConfig.js`, `WorkContracts.jsx`, `App.jsx`, `constants.js`, `fPercentText`, `InvoiceFormPage.jsx`, `ContractsPage.jsx`, `ProvidersPage.jsx`, `client/package.json`, `PoliciesTab.jsx`, `ForgotPassword.jsx`, `MenuList/index.jsx`, `SearchSection/index.jsx`, `react`, `MainCard`, `GeneralDashboard.jsx`, `StatementReportDialog.jsx`, `DocumentManagement.jsx`, `WorkSummaryTab.jsx`, `AuthForgotPassword.jsx`, `AuthenticationRoutes.jsx`, `withAlpha`, `WorkChartsTab.jsx`, `MainLayout/index.jsx`, `useGetMenuMaster`, `useAuth`, `ContractDetailPage.jsx`, `InputLabel.jsx`, `DebouncedInput.jsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **What connects `COLORS`, `RULE_COLORS`, `TEXT_COLORS` to the rest of the system?**
  _1218 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08686868686868687 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `providers.routes.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0782608695652174 - nodes in this community are weakly interconnected._
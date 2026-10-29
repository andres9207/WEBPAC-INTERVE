# Graph Report - WEBPAC-INTERVE  (2026-10-29)

## Corpus Check
- 702 files · ~416,718 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4477 nodes · 12690 edges · 246 communities (134 shown, 112 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 166 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b78e5671`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- fMoneyText
- providers.routes.js
- dependencies
- server/package.json
- providers.service.js
- constants.js
- workScopeOf
- InvoiceFormPage.jsx
- ConceptDialog.jsx
- WorksPage.jsx
- auth.routes.js
- statements.service.js
- client/package.json
- @mui/material
- ContractsPage.jsx
- workDashboard.service.js
- invoices.service.test.js
- compilerOptions
- permissions.constants.js
- invoices.service.js
- contractInvoiceTerms.js
- `tbl_users`
- simpleInvoiceTerms.js
- contracts.service.test.js
- contractSuspensions.service.test.js
- App.jsx
- policyTypes.service.js
- invoices.controller.test.js
- invoiceGlosses.service.js
- menu-items/index.js
- withAlpha
- showError
- `tbl_contract_concepts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- WorkChartsTab.jsx
- contracts.controller.js
- cron/index.js
- works.service.js
- useGetMenuMaster
- devDependencies
- GeneralDashboard.jsx
- MainLayout/index.jsx
- scripts
- AuthenticationRoutes.jsx
- `tbl_contracts`
- StatementsPage.jsx
- app.js
- decimal
- dateOnlyText
- `tbl_contract_type_fields`
- glossFields.js
- transaction.mock.js
- scripts
- WorkSummaryTab.jsx
- AuthForgotPassword.jsx
- compilerOptions
- excelJS.js
- MainCard
- permission
- devDependencies
- ref_fs
- prisma-drift.mjs
- seed.demo.js
- providerTypes.routes.js
- `tbl_contract_status_history`
- invoiceTerms.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- app.routes.js
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
- handleFirebase.js
- useConfig.js
- `tbl_providers`
- WorkCosts.jsx
- ci-summary.mjs
- contracts.controller.test.js
- AdvanceBars.jsx
- contractPolicies.service.js
- MenuList/index.jsx
- eslint.config.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- src/index.jsx
- `tbl_user_permissions`
- statements.routes.js
- mailerService.js
- health.service.js
- NotificationSection/index.jsx
- importCase.guard.test.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- seed.js
- `tbl_users`
- balanceReconciliation.service.test.js
- contractEndDateReconciliation.service.test.js
- winston.config.js
- DocumentManagement.jsx
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- invoiceEvidence.service.test.js
- workDashboard.utils.js
- ForgotPassword.jsx
- decisionReferences.guard.test.js
- SearchSection/index.jsx
- dashboardDetail.service.test.js
- dashboard.service.test.js
- session.service.test.js
- validation.utils.js
- ref_jest_globals
- contracts.service.js
- `tbl_invoices`
- `tbl_invoices`
- writeAudit
- `tbl_statements`
- users.service.test.js
- invoiceGlosses.service.test.js
- invoiceFollowUps.service.test.js
- uniqueConstraints.constants.test.js
- contractFields.js
- transaction.service.test.js
- extends
- `tbl_works`
- InputLabel.jsx
- `tbl_status`
- contractLiquidation.service.test.js
- `tbl_users`
- `tbl_work_stages`
- contractCancellation.service.test.js
- master.service.test.js
- contractNotifications.service.test.js
- DebouncedInput.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 154 edges
2. `react` - 120 edges
3. `showError()` - 104 edges
4. `workScopeOf()` - 94 edges
5. `moneyText()` - 91 edges
6. `dateOnlyText()` - 88 edges
7. `writeAudit()` - 81 edges
8. `useAuth()` - 79 edges
9. `withLockedTransaction()` - 77 edges
10. `fMoneyText()` - 71 edges

## Surprising Connections (you probably didn't know these)
- `selectContractFilterStages()` --calls--> `scopeWhere()`  [EXTRACTED]
  server/src/modules/work/contracts/contracts.service.js → server/src/common/services/workScope.service.js
- `getInvoiceFormOptions()` --calls--> `getContractFormOptions()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.service.js → server/src/modules/work/contracts/contracts.service.js
- `createMasterRouter()` --indirect_call--> `verifyToken()`  [INFERRED]
  server/src/common/utils/masterRouter.utils.js → server/src/common/middlewares/authjwt.middleware.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `glossRules()` --calls--> `optionalText()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/validation.utils.js

## Import Cycles
- None detected.

## Communities (246 total, 112 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (24): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "fMoneyText"
Cohesion: 0.08
Nodes (44): contractPoliciesApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, InvoiceDetailPage, AlertChips(), CONTRACT_STATE_TABS, fMoneyText(), fPercentText() (+36 more)

### Community 3 - "providers.routes.js"
Cohesion: 0.08
Nodes (36): canViewAllWorks(), resolveWorkScope(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, exportProvidersController (+28 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (39): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+31 more)

### Community 6 - "providers.service.js"
Cohesion: 0.05
Nodes (84): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT (+76 more)

### Community 7 - "constants.js"
Cohesion: 0.06
Nodes (43): getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), invoicesApi, client_src_hooks_useinvoicemenus_usecanviewinvoices, client_src_hooks_useinvoicemenus_useinvoicemenu, SocketContext, TooltipLongText(), CONTRACT_ALERT_OPTIONS (+35 more)

### Community 8 - "workScopeOf"
Cohesion: 0.04
Nodes (87): workScopeOf(), server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController, deleteInvoiceController, deleteInvoiceFollowUpController (+79 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (55): exportInvoicesAPI(), getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi (+47 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (50): getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), previewContractConceptAPI(), previewContractEndDateAPI(), useEndDatePreview(), AmountPercentField(), isZero() (+42 more)

### Community 11 - "WorksPage.jsx"
Cohesion: 0.07
Nodes (37): constructionCompaniesApi, getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, ADR-0019, getProviderTypeFieldsAPI(), saveProviderTypeFieldsAPI(), getSupervisionTypesSelectAPI, supervisionTypesApi (+29 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.06
Nodes (80): renderDocument(), capitalize(), createMasterService(), httpError(), ADR-0003, ADR-0004, ADR-0013, ADR-0027 (+72 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (43): asWarnings(), compat, __dirname, __filename, isOff(), browserslist, development, production (+35 more)

### Community 15 - "@mui/material"
Cohesion: 0.04
Nodes (84): getAddressTypesSelectAPI, getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue() (+76 more)

### Community 16 - "ContractsPage.jsx"
Cohesion: 0.08
Nodes (35): contractConceptsApi, contractLiquidationApi, contractsApi, exportContractAPI(), exportContractsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractMenuAPI() (+27 more)

### Community 17 - "workDashboard.service.js"
Cohesion: 0.10
Nodes (50): moneyText(), ratioPercent(), sumMoney(), progressLevel(), termProgress(), ADVANCE_LEVELS, advanceBar(), advanceLevel() (+42 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.05
Nodes (35): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+27 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "permissions.constants.js"
Cohesion: 0.04
Nodes (54): ADR-0011, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020, ADR-0024, ADR-0025 (+46 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (105): ADR-0013, ADR-0021, ADR-0023, findExportRows(), renderExport(), server_src_modules_billing_invoices_invoicemenus_issimplemode, server_src_modules_billing_invoices_invoicemenus_simple_type_where, adjustableAmount() (+97 more)

### Community 22 - "contractInvoiceTerms.js"
Cohesion: 0.10
Nodes (32): server_src_common_utils_money_utils_percentfor, assertContractTotal(), blank(), composeContractInvoice(), composeWith(), CONTRACT_FORMULA_VERSION, CONTRACT_PAIRS, CONTRACT_TAX_FIELDS (+24 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "simpleInvoiceTerms.js"
Cohesion: 0.15
Nodes (15): previewSimpleInvoice(), blank(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023, ADR-0026, SIMPLE_FIELDS (+7 more)

### Community 25 - "contracts.service.test.js"
Cohesion: 0.17
Nodes (9): ctx, input(), ADR-0015, ADR-0017, OTHER, OWN, prismaMock, state (+1 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (23): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+15 more)

### Community 27 - "App.jsx"
Cohesion: 0.11
Nodes (19): refreshSession(), App(), ThemedToastContainer(), config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext (+11 more)

### Community 28 - "policyTypes.service.js"
Cohesion: 0.22
Nodes (11): insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, policyBaseValue(), configurePolicyTypeBase(), httpError() (+3 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "invoiceGlosses.service.js"
Cohesion: 0.13
Nodes (38): assertReleaser(), auditable(), findLockedOpenGloss(), httpError(), ADR-0027, RELEASE_AUDITED, writeGlossRelease(), assertFieldsFor() (+30 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 32 - "withAlpha"
Cohesion: 0.15
Nodes (16): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), buildPalette(), defaultColor (+8 more)

### Community 33 - "showError"
Cohesion: 0.05
Nodes (98): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), suspendContractAPI(), invoiceTransitionsApi, configurePolicyTypeBaseAPI(), getModulesAPI(), getProfilesAPI() (+90 more)

### Community 34 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "WorkChartsTab.jsx"
Cohesion: 0.15
Nodes (29): invoiceRows(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf(), DonutBreakdown(), drillLinkSx (+21 more)

### Community 38 - "contracts.controller.js"
Cohesion: 0.05
Nodes (80): auditContext(), moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), getContractMenu(), CONTRACT_REPORTS (+72 more)

### Community 39 - "cron/index.js"
Cohesion: 0.11
Nodes (18): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+10 more)

### Community 40 - "works.service.js"
Cohesion: 0.06
Nodes (63): ADR-0007, INACTIVE_STATUS, assertInScope(), selectStatements(), applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections() (+55 more)

### Community 41 - "useGetMenuMaster"
Cohesion: 0.28
Nodes (11): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), Header(), ThemeModeSection() (+3 more)

### Community 42 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+6 more)

### Community 44 - "GeneralDashboard.jsx"
Cohesion: 0.05
Nodes (42): getDashboardDetailAPI(), getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, getMyWorksSelectAPI(), genericRequest, instance, NO_REFRESH_URLS (+34 more)

### Community 45 - "MainLayout/index.jsx"
Cohesion: 0.20
Nodes (12): Footer(), MainLayout(), MainLayoutContent(), ScopedOutlet(), MainContentStyled, Sidebar(), closedMixin(), MiniDrawerStyled (+4 more)

### Community 46 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+11 more)

### Community 48 - "AuthenticationRoutes.jsx"
Cohesion: 0.19
Nodes (10): MinimalLayout(), AuthenticationRoutes, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router, MainRoutes (+2 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.12
Nodes (14): `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users` (+6 more)

### Community 50 - "StatementsPage.jsx"
Cohesion: 0.09
Nodes (30): exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), StatementsPage, download(), downloadExport(), errorMessage(), EXPORT_FORMATS (+22 more)

### Community 51 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 52 - "decimal"
Cohesion: 0.07
Nodes (58): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE (+50 more)

### Community 53 - "dateOnlyText"
Cohesion: 0.06
Nodes (84): scopeWhere(), dateOnlyText(), todayDateOnly(), getRuleValues(), policyExpiringDays(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary() (+76 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "glossFields.js"
Cohesion: 0.20
Nodes (12): CONTRACT_LINES, BY_TYPE, byCatalog(), CATALOG_ORDER, fieldAmount(), GLOSS_FIELD_NAMES, GLOSS_LINES_SELECT, glossFieldFor() (+4 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (34): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+26 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkSummaryTab.jsx"
Cohesion: 0.20
Nodes (20): contractRows(), daysOpenText(), followUpRows(), followUpsDrill(), useDrillDown(), initialsOf(), MANAGER_ROLE_NAMES, plural() (+12 more)

### Community 59 - "AuthForgotPassword.jsx"
Cohesion: 0.15
Nodes (20): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider() (+12 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "MainCard"
Cohesion: 0.25
Nodes (14): MainCard(), AlertsCard(), Empty(), LatestInvoicesCard(), num, QuickAccessCard(), UpcomingPoliciesCard(), VALIDITY_COLORS (+6 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-sonarjs, globals, jest, nodemon, pm2 (+2 more)

### Community 66 - "ref_fs"
Cohesion: 0.12
Nodes (13): ref_fs, ref_url, ALLOWED, files(), lines, SRC, catalog, expected (+5 more)

### Community 68 - "prisma-drift.mjs"
Cohesion: 0.18
Nodes (11): columnList(), database, dbForeignKeys, equivalent, isNoise(), prisma, real, rows (+3 more)

### Community 70 - "seed.demo.js"
Cohesion: 0.04
Nodes (78): ADR-0002, ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure() (+70 more)

### Community 71 - "providerTypes.routes.js"
Cohesion: 0.18
Nodes (12): FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, getProviderTypeFieldsSchema, saveProviderTypeFieldsSchema, providerTypesRoutes, assertModeUnchangedInUse() (+4 more)

### Community 88 - "invoiceTerms.js"
Cohesion: 0.09
Nodes (30): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+22 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.02
Nodes (102): addressTypesApi, contractTypesApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), policyTypesApi, exportProvidersAPI(), providerTypesApi (+94 more)

### Community 100 - "works.routes.js"
Cohesion: 0.09
Nodes (33): managedWhere(), selectMyWorks(), changeWorkStateController, changeWorkStatusController, deleteWorkController, exportWorksController, getWorkController, INPUT_FIELDS (+25 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

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
Cohesion: 0.07
Nodes (66): getIdentityDocumentsSelectAPI, changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), ContactsList(), ADR-0009, DataList(), Figure() (+58 more)

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
Cohesion: 0.06
Nodes (38): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+30 more)

### Community 123 - "advanceFilters.js"
Cohesion: 0.11
Nodes (21): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+13 more)

### Community 124 - "balanceReconciliation.service.js"
Cohesion: 0.30
Nodes (10): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS, findBalanceViolations() (+2 more)

### Community 125 - "session.service.js"
Cohesion: 0.06
Nodes (49): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), getIO() (+41 more)

### Community 129 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 130 - "useConfig.js"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "WorkCosts.jsx"
Cohesion: 0.22
Nodes (10): CardTitle(), clickableChartSx, drillLinkSx, INVOICE_NOUN, ADR-0002, MENU_COLORS, menuColor(), num (+2 more)

### Community 133 - "ci-summary.mjs"
Cohesion: 0.17
Nodes (20): args, buildSection(), cell(), COLORS, kb(), lineLink(), lintSection(), number() (+12 more)

### Community 134 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 136 - "AdvanceBars.jsx"
Cohesion: 0.18
Nodes (20): useSchemePalette(), ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter(), AdvanceLegend(), matchesAdvanceFilter(), matchesAdvanceLegend(), num (+12 more)

### Community 137 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (106): main(), newOperationId(), canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint() (+98 more)

### Community 140 - "MenuList/index.jsx"
Cohesion: 0.31
Nodes (8): getMenuAPI(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts, setContractMenus(), work

### Community 142 - "eslint.config.js"
Cohesion: 0.40
Nodes (5): ref_eslint_js, ref_eslint_plugin_sonarjs, globals, asWarnings(), isOff()

### Community 151 - "src/index.jsx"
Cohesion: 0.15
Nodes (14): client_src_assets_scss_style, container, root, reportWebVitals(), checkValidServiceWorker(), isLocalhost, register(), registerValidSW() (+6 more)

### Community 153 - "statements.routes.js"
Cohesion: 0.08
Nodes (35): sendExport(), exportFormatRule(), handleExport(), STATEMENT_GLOSS_FILTERS, STATEMENT_VOUCHER_FILTERS, changeStatementStatusController, deleteStatementController, exportStatementController (+27 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 155 - "health.service.js"
Cohesion: 0.33
Nodes (5): DB_TIMEOUT_MS, getHealth(), SERVICE_NAME, withTimeout(), prismaMock

### Community 156 - "NotificationSection/index.jsx"
Cohesion: 0.50
Nodes (7): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf()

### Community 157 - "importCase.guard.test.js"
Cohesion: 0.20
Nodes (14): clientRoots, entries(), files(), gitMismatches, listing, lookup(), mismatches, realName() (+6 more)

### Community 159 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "seed.js"
Cohesion: 0.11
Nodes (16): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+8 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.20
Nodes (10): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoice_gloss_fields`, `tbl_invoice_glosses` (+2 more)

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 181 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 183 - "DocumentManagement.jsx"
Cohesion: 0.32
Nodes (11): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+3 more)

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 194 - "invoiceEvidence.service.test.js"
Cohesion: 0.40
Nodes (3): prismaMock, state, user

### Community 197 - "workDashboard.utils.js"
Cohesion: 0.15
Nodes (12): Metric(), barPercent(), CONTRACT_STATE_CHART_COLORS, DASHBOARD_PATH, GLOSS_CHART_COLORS, INVOICE_TYPE_COLORS, MENU_CHART_COLORS, menuColor() (+4 more)

### Community 198 - "ForgotPassword.jsx"
Cohesion: 0.19
Nodes (12): client_src_assets_images_interadminpro, LogoSection(), ForgotPasswordPage, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo() (+4 more)

### Community 199 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 201 - "SearchSection/index.jsx"
Cohesion: 0.52
Nodes (5): HeaderAvatar(), MobileSearch(), SearchSection(), Transitions(), material-ui-popup-state

### Community 202 - "dashboardDetail.service.test.js"
Cohesion: 0.25
Nodes (4): ALL, EVERYTHING, OWN, prismaMock

### Community 203 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 204 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 206 - "validation.utils.js"
Cohesion: 0.06
Nodes (44): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter() (+36 more)

### Community 211 - "ref_jest_globals"
Cohesion: 0.05
Nodes (21): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+13 more)

### Community 212 - "contracts.service.js"
Cohesion: 0.03
Nodes (113): ADR-0006, ADR-0027, percentText(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, TERM_UNITS (+105 more)

### Community 217 - "writeAudit"
Cohesion: 0.03
Nodes (114): ADR-0004, bcrypt, ref_crypto, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields() (+106 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.13
Nodes (8): assertContractInScope, assertInvoiceVisible, ctx, getInvoice, prismaMock, SCOPE, state, VALUE_LINE

### Community 221 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 222 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 224 - "contractFields.js"
Cohesion: 0.13
Nodes (15): AIU_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, ADR-0026 (+7 more)

### Community 226 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 227 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

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

## Knowledge Gaps
- **1224 isolated node(s):** `url`, `database`, `prisma`, `statements`, `rows` (+1219 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1674 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **112 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.258) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `writeAudit`, `server/package.json`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `useConfig.js`, `fMoneyText`, `WorkCosts.jsx`, `constants.js`, `AdvanceBars.jsx`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `WorksPage.jsx`, `MenuList/index.jsx`, `client/package.json`, `ContractsPage.jsx`, `App.jsx`, `NotificationSection/index.jsx`, `withAlpha`, `showError`, `WorkChartsTab.jsx`, `useGetMenuMaster`, `GeneralDashboard.jsx`, `MainLayout/index.jsx`, `AuthenticationRoutes.jsx`, `StatementsPage.jsx`, `DocumentManagement.jsx`, `WorkSummaryTab.jsx`, `AuthForgotPassword.jsx`, `MainCard`, `ForgotPassword.jsx`, `SearchSection/index.jsx`, `useAuth`, `InputLabel.jsx`, `ContractDetailPage.jsx`, `DebouncedInput.jsx`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **What connects `url`, `database`, `prisma` to the rest of the system?**
  _1224 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08325624421831637 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `fMoneyText` be split into smaller, more focused modules?**
  _Cohesion score 0.07896575821104122 - nodes in this community are weakly interconnected._
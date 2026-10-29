# Graph Report - WEBPAC-INTERVE  (2026-10-29)

## Corpus Check
- 692 files · ~402,256 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4317 nodes · 12344 edges · 244 communities (135 shown, 109 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 160 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4edad756`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- simpleInvoiceTerms.js
- workScopeOf
- dependencies
- server/package.json
- providers.service.js
- constants.js
- invoices.routes.js
- InvoiceFormPage.jsx
- ConceptDialog.jsx
- PoliciesTab.jsx
- auth.routes.js
- statements.service.js
- client/package.json
- @mui/material
- providers.routes.js
- seed.js
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
- pagination.utils.js
- invoices.controller.test.js
- invoiceGlosses.service.js
- menu-items/index.js
- StatementReportDialog.jsx
- showError
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
- DocumentManagement.jsx
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
- audit.service.js
- seed.demo.js
- contractEndDateReconciliation.service.test.js
- `tbl_contract_status_history`
- invoiceTerms.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- contractLiquidation.service.test.js
- statements.service.test.js
- ContactsEditor.jsx
- `tbl_works`
- `tbl_policies`
- ContractDetailPage.jsx
- export.service.js
- works.service.test.js
- error.middleware.js
- idempotency.service.js
- `tbl_providers`
- advanceFilters.js
- balanceReconciliation.service.js
- AuthenticationRoutes.jsx
- identityDocuments.service.js
- useConfig.js
- `tbl_providers`
- WorkSummaryTab.jsx
- ProviderTypePage.jsx
- contracts.controller.test.js
- workDashboard.utils.js
- contractSuspensions.service.test.js
- react-router-dom
- MenuList/index.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- themes/index.jsx
- `tbl_user_permissions`
- getIO
- mailerService.js
- authContext.jsx
- socket.js
- fDateOnly
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- businessRules.service.js
- `tbl_users`
- balanceReconciliation.service.test.js
- glossFields.js
- contractLiquidation.service.js
- WorkCosts.jsx
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- NotificationSection/index.jsx
- app.service.test.js
- MainLayout/index.jsx
- contractFields.js
- auth.service.test.js
- src/index.jsx
- dashboardDetail.service.test.js
- session.service.test.js
- invoiceFollowUps.service.js
- ref_jest_globals
- app.service.js
- `tbl_invoices`
- `tbl_invoices`
- SimpleBar.jsx
- `tbl_statements`
- permissions.controller.test.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- invoiceFollowUps.service.test.js
- ErrorBoundary.jsx
- error.middleware.test.js
- extends
- `tbl_works`
- contractNotifications.service.test.js
- `tbl_status`
- SearchSection/index.jsx
- `tbl_users`
- `tbl_work_stages`
- winston.config.js
- decisionReferences.guard.test.js
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
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `balances()` --calls--> `advanceBalances()`  [EXTRACTED]
  server/test/modules/billing/invoices/advanceFilters.test.js → server/src/modules/billing/invoices/advanceTerms.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `getUserPermissions()` --calls--> `getEffectivePermissionIds()`  [EXTRACTED]
  server/src/modules/app/general/app.service.js → server/src/common/services/effectivePermissions.service.js
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js

## Import Cycles
- None detected.

## Communities (244 total, 109 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (24): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "simpleInvoiceTerms.js"
Cohesion: 0.13
Nodes (20): hasContractTaxes(), listAmounts(), blank(), composeSimpleInvoice(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023 (+12 more)

### Community 3 - "workScopeOf"
Cohesion: 0.07
Nodes (70): auditContext(), getEffectivePermissionIds(), findExportRows(), renderExport(), workScopeOf(), getDashboardDetailController, getDashboardSummaryController, getWorkDashboardController (+62 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (37): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+29 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (61): assertInScope(), selectStatements(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes() (+53 more)

### Community 7 - "constants.js"
Cohesion: 0.04
Nodes (73): contractsApi, exportContractsAPI(), getContractMenuAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), refreshSession(), client_src_hooks_useinvoicemenus_usecanviewinvoices (+65 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.04
Nodes (88): server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController, deleteInvoiceController, deleteInvoiceFollowUpController, deleteInvoiceGlossController (+80 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (60): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, previewContractInvoiceAPI() (+52 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (53): contractConceptsApi, contractLiquidationApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006 (+45 more)

### Community 11 - "PoliciesTab.jsx"
Cohesion: 0.07
Nodes (35): contractPoliciesApi, getInsurersSelectAPI, insurersApi, configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, PolicyTypePage (+27 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.08
Nodes (50): renderDocument(), statementGlosses(), statementsGlosses(), statementsWithGlosses(), statementInvoices(), STATEMENT_GLOSS_FILTERS, STATEMENT_VOUCHER_FILTERS, affectingValueOf() (+42 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (42): compat, __dirname, __filename, browserslist, development, production, name, packageManager (+34 more)

### Community 15 - "@mui/material"
Cohesion: 0.05
Nodes (62): deleteProfileAPI(), paginationProfilesAPI(), getWorksSummaryAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters(), ProfilesPage (+54 more)

### Community 16 - "providers.routes.js"
Cohesion: 0.05
Nodes (46): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0027 (+38 more)

### Community 17 - "seed.js"
Cohesion: 0.14
Nodes (12): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+4 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.05
Nodes (36): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+28 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.15
Nodes (18): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+10 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.05
Nodes (90): ADR-0013, ADR-0021, ADR-0023, isBillingType(), server_src_modules_billing_invoices_invoicemenus_issimplemode, server_src_modules_billing_invoices_invoicemenus_simple_type_where, admittedContractsWhere(), admittedTypes() (+82 more)

### Community 22 - "contractInvoiceTerms.js"
Cohesion: 0.15
Nodes (25): server_src_common_utils_money_utils_percentfor, toPercent(), assertContractTotal(), blank(), composeContractInvoice(), composeWith(), CONTRACT_FORMULA_VERSION, CONTRACT_PAIRS (+17 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "contractPolicies.service.js"
Cohesion: 0.07
Nodes (98): main(), diffFields(), newOperationId(), writeAudit(), runIdempotent(), createMasterService(), withLockedTransaction(), configurePolicyTypeBase() (+90 more)

### Community 25 - "contracts.service.js"
Cohesion: 0.09
Nodes (41): ADR-0006, ADR-0016, ADR-0018, FIELD_GROUPS, typeAppliesAiu(), contractsWithPendingAdvanceWhere(), server_src_modules_billing_invoices_invoicemenus_iscontractmode, advanceWhereOf() (+33 more)

### Community 26 - "contractConcepts.service.test.js"
Cohesion: 0.07
Nodes (22): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+14 more)

### Community 27 - "AuthForgotPassword.jsx"
Cohesion: 0.19
Nodes (15): forgotPasswordAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), defaultColor, AnimateButton(), CustomFormControl, hasMixed() (+7 more)

### Community 28 - "pagination.utils.js"
Cohesion: 0.17
Nodes (22): containsFilter(), countByStatus(), dateRangeFilter(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS, paginate() (+14 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "invoiceGlosses.service.js"
Cohesion: 0.16
Nodes (33): glossFieldFor(), assertFieldFor(), assertNotCancelled(), assertReleaser(), auditable(), AUDITED, createGloss(), deleteGloss() (+25 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 32 - "StatementReportDialog.jsx"
Cohesion: 0.16
Nodes (17): exportStatementGroupAPI(), getStatementGroupReportAPI(), download(), downloadExport(), errorMessage(), EXPORT_FORMATS, ExportButton(), ExportDialog() (+9 more)

### Community 33 - "showError"
Cohesion: 0.04
Nodes (99): getBusinessRulesAPI(), saveBusinessRulesAPI(), getIdentityDocumentsSelectAPI, invoiceFollowUpsApi, invoiceGlossesApi, invoiceTransitionsApi, getModulesAPI(), getProfilesAPI() (+91 more)

### Community 34 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "WorkChartsTab.jsx"
Cohesion: 0.15
Nodes (34): fMoneyText(), contractRows(), glossRows(), invoiceRows(), advanceDrill(), Advances(), CardTitle(), clickableChartSx (+26 more)

### Community 38 - "contracts.routes.js"
Cohesion: 0.07
Nodes (44): moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), previewContractConceptController, contractsRoutes, ADR-0006 (+36 more)

### Community 39 - "cron/index.js"
Cohesion: 0.11
Nodes (18): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+10 more)

### Community 40 - "works.service.js"
Cohesion: 0.06
Nodes (59): ADR-0007, ADR-0009, PROGRESS_WARNING, defineContacts(), FIELDS, httpError(), ADR-0009, optionalText() (+51 more)

### Community 41 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "statements.routes.js"
Cohesion: 0.09
Nodes (32): sendExport(), exportFormatRule(), handleExport(), changeStatementStatusController, deleteStatementController, exportStatementController, exportStatementGroupController, getStatementController (+24 more)

### Community 45 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (11): `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_work_provider_types`, `tbl_contract_types` (+3 more)

### Community 50 - "workDashboard.service.js"
Cohesion: 0.04
Nodes (113): moneyText(), percentText(), sumMoney(), addTerm(), dateOnlyText(), userFullName(), getRuleValues(), policyExpiringDays() (+105 more)

### Community 51 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 52 - "decimal"
Cohesion: 0.08
Nodes (57): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE (+49 more)

### Community 53 - "dashboard.service.js"
Cohesion: 0.04
Nodes (99): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+91 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "WorkScopeContext.jsx"
Cohesion: 0.07
Nodes (39): getWorkDashboardAPI(), providersApi, paginationStatementGroupsAPI(), getMyWorksSelectAPI(), pickWork(), useWorkFilterField(), useWorkScope(), WorkScopeContext (+31 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (36): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+28 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkContracts.jsx"
Cohesion: 0.15
Nodes (30): useSchemePalette(), AlertChips(), contractAlertOptions(), fPercentText(), ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter(), AdvanceLegend() (+22 more)

### Community 59 - "contractTerms.js"
Cohesion: 0.10
Nodes (28): daysBetween(), findEndDateDiscrepancies(), derivedEndDate(), previewContractConcept(), previewContractEndDate(), blank(), chronologyError(), conceptDraftOf() (+20 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "permissions.constants.js"
Cohesion: 0.05
Nodes (64): ADR-0012, ADR-0019, ADR-0025, ADR-0026, express, ADR-0011, ADR-0016, ADR-0018 (+56 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "audit.service.js"
Cohesion: 0.03
Nodes (92): ADR-0001, ADR-0004, bcrypt, ref_crypto, INACTIVE_STATUS, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse() (+84 more)

### Community 70 - "seed.demo.js"
Cohesion: 0.08
Nodes (33): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+25 more)

### Community 71 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 88 - "invoiceTerms.js"
Cohesion: 0.08
Nodes (30): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+22 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.03
Nodes (66): constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, getSupervisionTypesSelectAPI, supervisionTypesApi, exportWorksAPI() (+58 more)

### Community 100 - "works.routes.js"
Cohesion: 0.07
Nodes (38): hasEffectivePermission(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope() (+30 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "ContactsEditor.jsx"
Cohesion: 0.15
Nodes (17): addressTypesApi, getAddressTypesSelectAPI, AddressTypePage, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS (+9 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "ContractDetailPage.jsx"
Cohesion: 0.06
Nodes (83): getStatusesByScopeAPI(), exportContractAPI(), changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, useSocket(), SubCard() (+75 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (50): exceljs, pdfkit, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument() (+42 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.15
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "idempotency.service.js"
Cohesion: 0.13
Nodes (17): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), IDEMPOTENCY_HEADER, idempotencyMisuse(), keyReused(), requestFingerprint(), revokeSession() (+9 more)

### Community 123 - "advanceFilters.js"
Cohesion: 0.10
Nodes (23): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+15 more)

### Community 124 - "balanceReconciliation.service.js"
Cohesion: 0.25
Nodes (12): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations() (+4 more)

### Community 125 - "AuthenticationRoutes.jsx"
Cohesion: 0.12
Nodes (18): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, router, MainRoutes, AppBar() (+10 more)

### Community 129 - "identityDocuments.service.js"
Cohesion: 0.15
Nodes (13): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, identityDocumentsRoutes, identityDocumentsConfig (+5 more)

### Community 130 - "useConfig.js"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "WorkSummaryTab.jsx"
Cohesion: 0.18
Nodes (18): MainCard(), ContractBalanceCards(), DashboardCards(), Indicator(), initialsOf(), MANAGER_ROLE_NAMES, AttentionCard(), CONTRACT_NOUN (+10 more)

### Community 133 - "ProviderTypePage.jsx"
Cohesion: 0.13
Nodes (18): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, INVOICE_MODE_OPTIONS, invoiceModeName(), DATA_TYPE_NAMES, GROUP_NAMES (+10 more)

### Community 134 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 136 - "workDashboard.utils.js"
Cohesion: 0.15
Nodes (12): Metric(), barPercent(), CONTRACT_STATE_CHART_COLORS, GLOSS_CHART_COLORS, INVOICE_TYPE_COLORS, MENU_CHART_COLORS, menuColor(), MONTH_NAMES (+4 more)

### Community 137 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 140 - "react-router-dom"
Cohesion: 0.34
Nodes (9): endpoints, initialState, useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), NavCollapse(), NavGroup(), NavItem() (+1 more)

### Community 142 - "MenuList/index.jsx"
Cohesion: 0.24
Nodes (9): getMenuAPI(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts, setContractMenus(), work (+1 more)

### Community 151 - "themes/index.jsx"
Cohesion: 0.23
Nodes (10): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), Typography() (+2 more)

### Community 153 - "getIO"
Cohesion: 0.12
Nodes (21): getIO(), configurePolicyTypeBaseController, FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, getNotificationCountController(), listNotificationsController() (+13 more)

### Community 154 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 155 - "authContext.jsx"
Cohesion: 0.06
Nodes (32): loginAPI(), logoutAPI(), verifyTokenAPI(), cancelContractAPI(), suspendContractAPI(), getPermissionsCatalogAPI(), getReasonsSelectAPI(), reasonsApi (+24 more)

### Community 156 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 157 - "fDateOnly"
Cohesion: 0.12
Nodes (34): getDashboardDetailAPI(), getDashboardSummaryAPI(), ADR-0002, client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenus, fDateOnly(), AlertsCard(), Empty() (+26 more)

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "businessRules.service.js"
Cohesion: 0.21
Nodes (13): BUSINESS_RULES, DEFAULT_EXPIRING_DAYS, MAX_RULE_DAYS, MIN_RULE_DAYS, getBusinessRulesController, saveBusinessRulesController, FIELD_BY_KEY, getBusinessRules() (+5 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.23
Nodes (9): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoice_glosses`, `tbl_invoices` (+1 more)

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "glossFields.js"
Cohesion: 0.24
Nodes (9): CONTRACT_LINES, BY_TYPE, fieldAmount(), GLOSS_FIELD_NAMES, glossFieldsFor(), NOT_A_FIELD, OTHER_FIELD, SIMPLE_LINES (+1 more)

### Community 181 - "contractLiquidation.service.js"
Cohesion: 0.26
Nodes (11): conceptLabel(), contractInvoices(), evaluateLiquidation(), ADR-0017, ADR-0027, liquidationFacts(), CONCEPT_TYPE_NAMES, CONCEPT_TYPES (+3 more)

### Community 183 - "WorkCosts.jsx"
Cohesion: 0.22
Nodes (10): CardTitle(), clickableChartSx, drillLinkSx, INVOICE_NOUN, ADR-0002, MENU_COLORS, menuColor(), num (+2 more)

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 194 - "NotificationSection/index.jsx"
Cohesion: 0.21
Nodes (14): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), getTimeAgo() (+6 more)

### Community 197 - "app.service.test.js"
Cohesion: 0.22
Nodes (6): BILLING, CONTRACTS, DASHBOARD, HOME, prismaMock, state

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.18
Nodes (16): handlerDrawerOpen(), Footer(), Header(), ThemeModeSection(), MainLayout(), MainLayoutContent(), ScopedOutlet(), LogoSection() (+8 more)

### Community 199 - "contractFields.js"
Cohesion: 0.10
Nodes (20): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+12 more)

### Community 201 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 202 - "src/index.jsx"
Cohesion: 0.12
Nodes (18): client_src_assets_scss_style, config, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals() (+10 more)

### Community 203 - "dashboardDetail.service.test.js"
Cohesion: 0.25
Nodes (4): ALL, EVERYTHING, OWN, prismaMock

### Community 204 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 206 - "invoiceFollowUps.service.js"
Cohesion: 0.15
Nodes (28): daysInMonth(), PROGRESS_CRITICAL, progressLevel(), termProgress(), toDateOnly(), todayDateOnly(), assertNotCancelled(), auditable() (+20 more)

### Community 211 - "ref_jest_globals"
Cohesion: 0.04
Nodes (26): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+18 more)

### Community 212 - "app.service.js"
Cohesion: 0.11
Nodes (22): assertModeUnchangedInUse(), httpError(), ADR-0010, providerTypesConfig, providerTypesService, getMenu(), getPagesMenu(), getSessionInfo() (+14 more)

### Community 217 - "SimpleBar.jsx"
Cohesion: 0.47
Nodes (5): RootStyle, SimpleBarScroll(), SimpleBarStyle, react-device-detect, simplebar-react

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (6): assertInvoiceVisible, ctx, getInvoice, prismaMock, SCOPE, state

### Community 221 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 222 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 224 - "ErrorBoundary.jsx"
Cohesion: 0.83
Nodes (3): ErrorBoundary(), ErrorMessage(), isStaleDeployError()

### Community 226 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

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

### Community 243 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 251 - "`tbl_invoice_status_history`"
Cohesion: 0.50
Nodes (3): `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`

## Knowledge Gaps
- **1164 isolated node(s):** `ADR-0002`, `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS`, `NO_FIELDS`, `STATUS_TABS` (+1159 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1608 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **109 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0012` connect `permissions.constants.js` to `providers.routes.js`, `ContractDetailPage.jsx`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `useConfig.js`, `WorkSummaryTab.jsx`, `server/package.json`, `ProviderTypePage.jsx`, `constants.js`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `PoliciesTab.jsx`, `react-router-dom`, `client/package.json`, `MenuList/index.jsx`, `themes/index.jsx`, `AuthForgotPassword.jsx`, `authContext.jsx`, `fDateOnly`, `StatementReportDialog.jsx`, `showError`, `WorkChartsTab.jsx`, `DocumentManagement.jsx`, `WorkScopeContext.jsx`, `WorkCosts.jsx`, `WorkContracts.jsx`, `NotificationSection/index.jsx`, `MainLayout/index.jsx`, `SimpleBar.jsx`, `MainRoutes.jsx`, `ErrorBoundary.jsx`, `SearchSection/index.jsx`, `ContactsEditor.jsx`, `ContractDetailPage.jsx`, `AuthenticationRoutes.jsx`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **What connects `ADR-0002`, `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS` to the rest of the system?**
  _1164 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08325624421831637 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `simpleInvoiceTerms.js` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._
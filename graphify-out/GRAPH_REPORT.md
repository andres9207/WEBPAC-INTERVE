# Graph Report - WEBPAC-INTERVE  (2026-10-26)

## Corpus Check
- 669 files · ~374,267 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4093 nodes · 11473 edges · 233 communities (132 shown, 101 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 153 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0a1c8b94`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- contractSuspensions.service.test.js
- master.service.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- contracts.routes.js
- ContractsPage.jsx
- providers.routes.js
- auth.routes.js
- seed.demo.js
- client/package.json
- menu-items/index.js
- idempotency.service.js
- WorkDetailPage.jsx
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- App.jsx
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- contractPolicies.service.js
- getIO
- invoices.controller.test.js
- invoiceTerms.js
- advanceFilters.js
- workScopeOf
- DocumentManagement.jsx
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- statements.service.js
- WorkDataForm.jsx
- cron/index.js
- contractTerms.js
- permissions.constants.js
- devDependencies
- src/index.jsx
- writeAudit
- scripts
- addressTypes.contacts.js
- `tbl_invoices`
- @mui/material
- contractReports.service.test.js
- renderExport
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
- decimal
- statements.routes.js
- `tbl_contract_status_history`
- invoiceGlosses.service.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- httpCliente.js
- floatingPoint.guard.test.js
- serviceWorker.jsx
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- uniqueConstraints.constants.test.js
- error.middleware.js
- contracts.service.js
- `tbl_providers`
- error.middleware.test.js
- extends
- balanceReconciliation.service.js
- images.js
- MenuList/index.jsx
- `tbl_providers`
- users.service.js
- AuthForgotPassword.jsx
- auth.service.js
- contractReports.service.js
- EasyCrop.jsx
- works.service.test.js
- contractSummaryReport.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- advanceTerms.js
- InputLabel.jsx
- contractNotifications.service.test.js
- app.service.js
- `tbl_contract_concepts`
- `tbl_reasons`
- decisionReferences.guard.test.js
- WorkPoliciesTab.jsx
- GeneralDashboard.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- WorkSummaryTab.jsx
- MainCard
- invoiceFollowUps.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- NotificationSection/index.jsx
- ContractDetailPage.jsx
- AuthenticationRoutes.jsx
- master.service.test.js
- liquidationTerms.js
- contracts.controller.test.js
- moneyText
- auth.service.test.js
- react-router-dom
- handleFirebase.js
- status.constants.js
- `tbl_invoices`
- `tbl_invoices`
- SearchSection/index.jsx
- `tbl_statements`
- workDashboard.service.js
- invoiceGlosses.service.test.js
- transaction.service.js
- workDashboard.service.test.js
- statements.service.test.js
- contractLiquidation.service.test.js
- policyTypes.service.test.js
- browserslist
- volta
- `tbl_works`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 147 edges
2. `react` - 117 edges
3. `showError()` - 98 edges
4. `workScopeOf()` - 83 edges
5. `writeAudit()` - 80 edges
6. `useAuth()` - 79 edges
7. `withLockedTransaction()` - 77 edges
8. `dateOnlyText()` - 75 edges
9. `moneyText()` - 66 edges
10. `showSuccess()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `ContractsPage()` --indirect_call--> `exportContractsAPI()`  [INFERRED]
  client/src/views/work/contracts/ContractsPage.jsx → client/src/api/requests/contractsApi.js
- `advanceTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `controlTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `getUserPermissions()` --calls--> `getEffectivePermissionIds()`  [EXTRACTED]
  server/src/modules/app/general/app.service.js → server/src/common/services/effectivePermissions.service.js

## Import Cycles
- None detected.

## Communities (233 total, 101 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (25): Alert(), Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), Chip() (+17 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 3 - "master.service.js"
Cohesion: 0.12
Nodes (31): capitalize(), createMasterService(), httpError(), ADR-0003, ADR-0004, ADR-0013, ADR-0027, containsFilter() (+23 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.04
Nodes (43): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+35 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (60): applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes(), assertTypeIds() (+52 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (53): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), previewContractInvoiceAPI(), previewSimpleInvoiceAPI(), getStatementsSelectAPI() (+45 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.05
Nodes (67): server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_contract_pairs, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, closeInvoiceFollowUpController, deleteInvoiceFollowUpController, deleteInvoiceGlossController, exportInvoicesController (+59 more)

### Community 9 - "contracts.routes.js"
Cohesion: 0.07
Nodes (43): moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), previewContractConceptController, ADR-0006, ADR-0016 (+35 more)

### Community 10 - "ContractsPage.jsx"
Cohesion: 0.04
Nodes (72): contractConceptsApi, contractLiquidationApi, contractsApi, exportContractsAPI(), getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI() (+64 more)

### Community 11 - "providers.routes.js"
Cohesion: 0.08
Nodes (32): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+24 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.05
Nodes (51): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+43 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (34): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+26 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 16 - "idempotency.service.js"
Cohesion: 0.05
Nodes (59): express, STATUS_KEYS, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), canonical(), EXCLUDED_FROM_FINGERPRINT (+51 more)

### Community 17 - "WorkDetailPage.jsx"
Cohesion: 0.08
Nodes (46): getIdentityDocumentsSelectAPI, getProviderTypesSelectAPI, changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, useEndDatePreview(), ContactsList() (+38 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (23): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+15 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.11
Nodes (27): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), setIO(), ACCESS_COOKIE_NAME, baseCookieOptions (+19 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (69): ADR-0023, server_src_common_utils_money_utils_percentfor, server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_money_columns, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_percent_columns, server_src_modules_billing_invoices_contractinvoiceterms_contractdraftof, server_src_modules_billing_invoices_contractinvoiceterms_contractpairsdto (+61 more)

### Community 22 - "App.jsx"
Cohesion: 0.10
Nodes (23): refreshSession(), App(), ThemedToastContainer(), config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext (+15 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.11
Nodes (15): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, allowedHosts (+7 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (52): ADR-0007, assertInScope(), PROGRESS_WARNING, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted() (+44 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.06
Nodes (26): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+18 more)

### Community 27 - "contractPolicies.service.js"
Cohesion: 0.07
Nodes (89): ADR-0006, main(), AUDIT_OPERATIONS, newOperationId(), runIdempotent(), ADR-0017, REASON_SCOPES, reasonsService (+81 more)

### Community 28 - "getIO"
Cohesion: 0.06
Nodes (33): getIO(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, configurePolicyTypeBaseController, ADR-0019, policyTypesRoutes (+25 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "invoiceTerms.js"
Cohesion: 0.10
Nodes (42): approveInvoice(), assertContractAdmitsCancel(), assertStage(), assertStatement(), assertUniqueNumber(), assertWork(), auditable(), cancelInvoice() (+34 more)

### Community 31 - "advanceFilters.js"
Cohesion: 0.11
Nodes (21): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+13 more)

### Community 32 - "workScopeOf"
Cohesion: 0.07
Nodes (72): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, approveInvoiceController, cancelInvoiceController (+64 more)

### Community 33 - "DocumentManagement.jsx"
Cohesion: 0.32
Nodes (11): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "statements.service.js"
Cohesion: 0.13
Nodes (30): INACTIVE_STATUS, statementInvoices(), toListDto(), assertUniqueNumber(), assertValues(), auditable(), AUDITED, changeStatementStatus() (+22 more)

### Community 38 - "WorkDataForm.jsx"
Cohesion: 0.13
Nodes (19): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, identityDocumentsApi, getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), getSupervisionTypesSelectAPI, supervisionTypesApi (+11 more)

### Community 39 - "cron/index.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+8 more)

### Community 40 - "contractTerms.js"
Cohesion: 0.08
Nodes (35): INVOICE_STATES, conceptLabel(), contractInvoices(), evaluateLiquidation(), ADR-0017, ADR-0027, liquidationFacts(), conceptDto() (+27 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.04
Nodes (58): ADR-0012, ADR-0011, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020, ADR-0024 (+50 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "writeAudit"
Cohesion: 0.12
Nodes (25): auditMisuse(), buildRows(), diffFields(), ADR-0013, ADR-0027, protect(), SENSITIVE_FIELDS, STANDALONE_EVENTS (+17 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "addressTypes.contacts.js"
Cohesion: 0.47
Nodes (5): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText()

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "@mui/material"
Cohesion: 0.05
Nodes (70): getAddressTypesSelectAPI, getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), getWorksSummaryAPI(), filterParams() (+62 more)

### Community 51 - "contractReports.service.test.js"
Cohesion: 0.20
Nodes (6): exceljs, COLUMNS, ROWS, concept(), contract(), prismaMock

### Community 52 - "renderExport"
Cohesion: 0.25
Nodes (11): buildExcel(), findExportRows(), httpError(), renderDocument(), renderExport(), renderWith(), exportInvoices(), contractOf() (+3 more)

### Community 53 - "ref_jest_globals"
Cohesion: 0.05
Nodes (23): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, payload, hasEffectivePermission, prismaMock, state (+15 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "invoiceFollowUps.service.js"
Cohesion: 0.11
Nodes (32): AUDIT_ENTITIES, USER_NAME_SELECT, AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013 (+24 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.04
Nodes (39): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+31 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 59 - "constants.js"
Cohesion: 0.05
Nodes (44): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), invoicesApi, client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenu, SocketContext, TooltipLongText() (+36 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "dashboard.service.js"
Cohesion: 0.15
Nodes (26): captured, explain(), main(), measure(), parseParams(), percentile(), plain(), scopeWhere() (+18 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.13
Nodes (13): ref_fs, ref_path, ref_url, catalog, expected, prismaMock, ADR-0027, loggerMock (+5 more)

### Community 68 - "WorkChartsTab.jsx"
Cohesion: 0.11
Nodes (43): ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter(), AdvanceLegend(), matchesAdvanceFilter(), num, pendingStripes(), swatchSx (+35 more)

### Community 70 - "decimal"
Cohesion: 0.11
Nodes (35): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), percentText(), RATIO_SCALE (+27 more)

### Community 71 - "statements.routes.js"
Cohesion: 0.12
Nodes (24): sendExport(), exportFormatRule(), handleExport(), changeStatementStatusController, deleteStatementController, exportStatementController, getStatementController, getStatementReportController (+16 more)

### Community 88 - "invoiceGlosses.service.js"
Cohesion: 0.19
Nodes (27): assertNotCancelled(), auditable(), AUDITED, createGloss(), deleteGloss(), findLockedInvoice(), findLockedOpen(), findStatement() (+19 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.02
Nodes (110): addressTypesApi, constructionCompaniesApi, contractTypesApi, insurersApi, getPermissionsCatalogAPI(), providersApi, reasonsApi, statementsApi (+102 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.09
Nodes (28): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+20 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "httpCliente.js"
Cohesion: 0.12
Nodes (19): getMyWorksSelectAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient, RETRY_503_HINT, pickWork(), WorkScopeContext (+11 more)

### Community 108 - "floatingPoint.guard.test.js"
Cohesion: 0.29
Nodes (5): ALLOWED, files(), lines, SRC, text()

### Community 112 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.04
Nodes (100): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), contractPoliciesApi, suspendContractAPI(), getInsurersSelectAPI, invoiceFollowUpsApi, invoiceGlossesApi (+92 more)

### Community 117 - "export.service.js"
Cohesion: 0.12
Nodes (35): ref_node_fs, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcelDocument(), buildPdf(), buildPdfDocument() (+27 more)

### Community 118 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "contracts.service.js"
Cohesion: 0.07
Nodes (61): getRuleValues(), AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+53 more)

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.29
Nodes (10): ADR-0024, findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), CHECKS, findBalanceViolations() (+2 more)

### Community 129 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 130 - "MenuList/index.jsx"
Cohesion: 0.16
Nodes (16): getMenuAPI(), useConfig(), ElevationScroll(), HorizontalBar(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus (+8 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "users.service.js"
Cohesion: 0.10
Nodes (23): ADR-0001, ADR-0004, hashPassword(), DIAN_WEIGHTS, GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008 (+15 more)

### Community 133 - "AuthForgotPassword.jsx"
Cohesion: 0.16
Nodes (19): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider() (+11 more)

### Community 134 - "auth.service.js"
Cohesion: 0.07
Nodes (32): bcrypt, ref_crypto, REDACTED, backoff(), runTransaction(), withTransaction(), comparePassword(), deriveKey() (+24 more)

### Community 136 - "contractReports.service.js"
Cohesion: 0.10
Nodes (26): ADVANCE_COLUMNS, advanceTotals(), authored(), balanceFields(), CONCEPT_COLUMNS, conceptLabel(), CONTRACT_COLUMNS, CONTRACT_REPORTS (+18 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "contractSummaryReport.test.js"
Cohesion: 0.22
Nodes (6): contract, contractBalances, contractInvoicesForReport, getContract, getContractPolicies, SCOPE

### Community 151 - "expirationNotice.service.js"
Cohesion: 0.07
Nodes (38): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+30 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 155 - "advanceTerms.js"
Cohesion: 0.10
Nodes (36): @prisma/client, ratioPercent(), ratioText(), roundRatio(), appliedPct(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits() (+28 more)

### Community 157 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 159 - "app.service.js"
Cohesion: 0.10
Nodes (20): getMenu(), getPagesMenu(), getSessionInfo(), getUserPermissions(), PAGE_SELECT, toChild(), toParent(), withContractMenus() (+12 more)

### Community 173 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 174 - "WorkPoliciesTab.jsx"
Cohesion: 0.11
Nodes (21): getWorkDashboardAPI(), DashboardDefault, DashboardCards(), Indicator(), ADR-0002, Dashboard(), ADR-0002, TABS (+13 more)

### Community 175 - "GeneralDashboard.jsx"
Cohesion: 0.18
Nodes (19): getDashboardSummaryAPI(), ADR-0002, client_src_hooks_useinvoicemenus_useinvoicemenus, useSchemePalette(), invoicePath(), AlertsCard(), Empty(), LatestInvoicesCard() (+11 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "WorkSummaryTab.jsx"
Cohesion: 0.18
Nodes (23): client_src_views_dashboard_default_work_advancebars_matchesadvancelegend, contractRows(), daysOpenText(), DrillDownDialog(), followUpRows(), followUpsDrill(), num, useDrillDown() (+15 more)

### Community 181 - "MainCard"
Cohesion: 0.17
Nodes (15): MainContentStyled, appDrawerWidth, drawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), Avatar() (+7 more)

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

### Community 194 - "NotificationSection/index.jsx"
Cohesion: 0.19
Nodes (17): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), getTimeAgo() (+9 more)

### Community 197 - "ContractDetailPage.jsx"
Cohesion: 0.06
Nodes (62): exportContractAPI(), exportStatementAPI(), getStatementReportAPI(), useSocket(), SubCard(), DataList(), Figure(), Pending() (+54 more)

### Community 198 - "AuthenticationRoutes.jsx"
Cohesion: 0.11
Nodes (21): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 199 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 201 - "liquidationTerms.js"
Cohesion: 0.14
Nodes (13): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+5 more)

### Community 202 - "contracts.controller.test.js"
Cohesion: 0.13
Nodes (13): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, getEffectivePermissionIds, ADR-0015 (+5 more)

### Community 203 - "moneyText"
Cohesion: 0.23
Nodes (13): moneyText(), isBillingType(), approvalSnapshot(), contractInvoicesForReport(), contractSnapshot(), detailChanges(), detailText(), isSimpleType() (+5 more)

### Community 204 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 206 - "react-router-dom"
Cohesion: 0.16
Nodes (22): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), Footer(), Header() (+14 more)

### Community 211 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 212 - "status.constants.js"
Cohesion: 0.11
Nodes (23): ADR-0015, @prisma/adapter-mariadb, adapter, describeTarget(), prisma, testConnection(), ACTIVE_STATUS, DELETED_STATUS (+15 more)

### Community 217 - "SearchSection/index.jsx"
Cohesion: 0.43
Nodes (6): ProfileSection(), HeaderAvatar(), MobileSearch(), SearchSection(), Transitions(), material-ui-popup-state

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "workDashboard.service.js"
Cohesion: 0.07
Nodes (69): sumMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), TERM_UNITS, termProgress() (+61 more)

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (5): assertInvoiceVisible, ctx, prismaMock, SCOPE, state

### Community 221 - "transaction.service.js"
Cohesion: 0.27
Nodes (9): buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES, toSortedIds() (+1 more)

### Community 222 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): percent(), ALL, CONCEPTS, CONTRACT, OWN, prismaMock

### Community 223 - "statements.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, OTHER, OWN, prismaMock, state

### Community 224 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 225 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 226 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 227 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **1131 isolated node(s):** `WATCHED`, `moneyRules`, `FIELDS`, `FIELDS_BY_NAME`, `FIELDS` (+1126 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1566 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **101 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `server/package.json` to `writeAudit`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `MenuList/index.jsx`, `server/package.json`, `AuthForgotPassword.jsx`, `InvoiceFormPage.jsx`, `EasyCrop.jsx`, `ContractsPage.jsx`, `client/package.json`, `menu-items/index.js`, `WorkDetailPage.jsx`, `App.jsx`, `InputLabel.jsx`, `DocumentManagement.jsx`, `WorkDataForm.jsx`, `WorkPoliciesTab.jsx`, `GeneralDashboard.jsx`, `WorkSummaryTab.jsx`, `MainCard`, `constants.js`, `NotificationSection/index.jsx`, `WorkChartsTab.jsx`, `ContractDetailPage.jsx`, `AuthenticationRoutes.jsx`, `react-router-dom`, `SearchSection/index.jsx`, `useAuth`, `httpCliente.js`, `showError`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Why does `ADR-0008` connect `useAuth` to `users.service.js`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **What connects `WATCHED`, `moneyRules`, `FIELDS` to the rest of the system?**
  _1131 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07918367346938776 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractSuspensions.service.test.js` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
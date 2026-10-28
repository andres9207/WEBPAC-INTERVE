# Graph Report - WEBPAC-INTERVE  (2026-10-28)

## Corpus Check
- 683 files · ~388,396 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4209 nodes · 11975 edges · 244 communities (129 shown, 115 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 157 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8a9b1eb5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- contractInvoiceTerms.js
- writeAudit
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- contracts.controller.js
- ConceptDialog.jsx
- validation.utils.js
- auth.routes.js
- statements.service.js
- client/package.json
- httpCliente.js
- main.routes.js
- transaction.service.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- seed.demo.js
- `tbl_users`
- contracts.service.js
- workDashboard.service.js
- contractSuspensions.service.test.js
- ContractDetailPage.jsx
- pagination.utils.js
- invoices.controller.test.js
- invoiceGlosses.service.js
- menu-items/index.js
- providers.routes.js
- DocumentManagement.jsx
- `tbl_contract_concepts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- app.routes.js
- toMoney
- cron/index.js
- works.service.js
- permissions.constants.js
- devDependencies
- workScopeOf
- users.service.js
- scripts
- app.js
- `tbl_contracts`
- formatTime.js
- uniqueConstraints.constants.test.js
- decimal
- contractLiquidation.service.test.js
- `tbl_contract_type_fields`
- constants.js
- ref_jest_globals
- scripts
- fMoneyText
- WorkScopeContext.jsx
- compilerOptions
- excelJS.js
- WorkContracts.jsx
- permission
- devDependencies
- floatingPoint.guard.test.js
- contractTerms.js
- WorkSummaryTab.jsx
- AdvanceAmountsSection.jsx
- `tbl_contract_status_history`
- invoiceEvidence.service.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- StatementsPage.jsx
- statements.service.test.js
- ContractsPage.jsx
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- works.service.test.js
- error.middleware.js
- contractPolicies.service.js
- `tbl_providers`
- transaction.service.test.js
- MainCard
- contractSummaryReport.test.js
- serviceWorker.jsx
- App.jsx
- `tbl_providers`
- winston.config.js
- invoiceTerms.js
- dashboard.service.test.js
- ContactsEditor.jsx
- contractFields.js
- simpleInvoiceTerms.js
- money.utils.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- AuthForgotPassword.jsx
- contracts.controller.test.js
- SubCard
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- seed.js
- `tbl_users`
- balanceReconciliation.service.test.js
- advanceFilters.js
- decisionReferences.guard.test.js
- workDashboard.utils.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- saveStatement
- @mui/material
- socket.manager.js
- auth.service.test.js
- src/index.jsx
- expirationNotice.service.test.js
- session.service.test.js
- findExportRows
- workScope.service.test.js
- getEffectivePermissionIds
- `tbl_invoices`
- `tbl_invoices`
- ref_prop_types
- `tbl_statements`
- contractEndDateReconciliation.service.test.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- idempotency.service.test.js
- permissions.controller.test.js
- `tbl_invoice_glosses`
- extends
- `tbl_works`
- contractNotifications.service.test.js
- `tbl_status`
- InputLabel.jsx
- requirePermission.middleware.test.js
- `tbl_users`
- `tbl_work_stages`
- validate.middleware.test.js
- audit.service.test.js
- document.service.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 152 edges
2. `react` - 118 edges
3. `showError()` - 100 edges
4. `workScopeOf()` - 87 edges
5. `moneyText()` - 81 edges
6. `writeAudit()` - 80 edges
7. `dateOnlyText()` - 80 edges
8. `useAuth()` - 79 edges
9. `withLockedTransaction()` - 77 edges
10. `showSuccess()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `glossRules()` --calls--> `optionalText()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/validation.utils.js
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `balances()` --calls--> `advanceBalances()`  [EXTRACTED]
  server/test/modules/billing/invoices/advanceFilters.test.js → server/src/modules/billing/invoices/advanceTerms.js
- `getInvoiceFormOptions()` --calls--> `getContractFormOptions()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.service.js → server/src/modules/work/contracts/contracts.service.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx

## Import Cycles
- None detected.

## Communities (244 total, 115 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (24): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractInvoiceTerms.js"
Cohesion: 0.11
Nodes (31): server_src_common_utils_money_utils_percentfor, percentOf(), assertContractTotal(), blank(), composeContractInvoice(), composeWith(), CONTRACT_FORMULA_VERSION, CONTRACT_PAIRS (+23 more)

### Community 3 - "writeAudit"
Cohesion: 0.08
Nodes (45): ADR-0001, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0013, ADR-0027, protect() (+37 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (38): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+30 more)

### Community 6 - "providers.service.js"
Cohesion: 0.06
Nodes (71): ADR-0009, defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), DIAN_WEIGHTS, GENERIC_FORMAT (+63 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.08
Nodes (42): getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoicesApi, previewSimpleInvoiceAPI() (+34 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.04
Nodes (81): moneyRule(), percentRule(), server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController, deleteInvoiceController (+73 more)

### Community 9 - "contracts.controller.js"
Cohesion: 0.06
Nodes (68): auditContext(), optionalDate(), CONTRACT_REPORTS, ACT_FIELDS, cancelContractController, cancelPolicyController, CONCEPT_FIELDS, CONTRACT_FIELDS (+60 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (49): getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), previewContractConceptAPI(), previewContractEndDateAPI(), useEndDatePreview(), AmountPercentField(), isZero() (+41 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.15
Nodes (15): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0027 (+7 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.11
Nodes (35): statementGlosses(), statementsGlosses(), amountColumnsOf(), amountTotalsOf(), AUDITED, buildReport(), compareBy(), exportStatement() (+27 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (40): compat, __dirname, __filename, browserslist, development, production, name, packageManager (+32 more)

### Community 15 - "httpCliente.js"
Cohesion: 0.05
Nodes (46): getStatusesByScopeAPI(), getIdentityDocumentsSelectAPI, deleteProfileAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), paginationUsersAPI() (+38 more)

### Community 16 - "main.routes.js"
Cohesion: 0.05
Nodes (61): express, jsonwebtoken, getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER (+53 more)

### Community 17 - "transaction.service.js"
Cohesion: 0.13
Nodes (23): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027 (+15 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (23): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+15 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.06
Nodes (58): ADR-0013, ADR-0020, ADR-0021, ADR-0023, ADR-0024, ADR-0027, isBillingType(), server_src_modules_billing_invoices_invoicemenus_issimplemode (+50 more)

### Community 22 - "seed.demo.js"
Cohesion: 0.03
Nodes (97): bcrypt, ref_crypto, ref_node_crypto, captured, explain(), main(), measure(), parseParams() (+89 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "contracts.service.js"
Cohesion: 0.09
Nodes (42): ADR-0006, ADR-0016, ADR-0018, dateRangeFilter(), FIELD_GROUPS, typeAppliesAiu(), contractsWithPendingAdvanceWhere(), advanceWhereOf() (+34 more)

### Community 25 - "workDashboard.service.js"
Cohesion: 0.03
Nodes (140): ADR-0011, scopeWhere(), moneyText(), percentText(), ratioPercent(), sumMoney(), toPercent(), todayDateOnly() (+132 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.04
Nodes (33): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+25 more)

### Community 27 - "ContractDetailPage.jsx"
Cohesion: 0.06
Nodes (75): getConstructionCompaniesSelectAPI, exportContractAPI(), getContractTypesSelectAPI, getSupervisionTypesSelectAPI, changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi (+67 more)

### Community 28 - "pagination.utils.js"
Cohesion: 0.27
Nodes (10): containsFilter(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS, resolvePagination(), toInt(), paginationStatements() (+2 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "invoiceGlosses.service.js"
Cohesion: 0.13
Nodes (34): ref_node_fs, GLOSS_FIELD_NAMES, glossFieldFor(), glossFieldsFor(), OTHER_FIELD, assertFieldFor(), assertNotCancelled(), auditable() (+26 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 32 - "providers.routes.js"
Cohesion: 0.09
Nodes (30): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+22 more)

### Community 33 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 34 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 38 - "toMoney"
Cohesion: 0.13
Nodes (33): toMoney(), adjustableAmount(), amountPairOf(), approvedOf(), approveInvoice(), assertContractAdmitsCancel(), assertStage(), assertUniqueNumber() (+25 more)

### Community 39 - "cron/index.js"
Cohesion: 0.11
Nodes (18): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+10 more)

### Community 40 - "works.service.js"
Cohesion: 0.06
Nodes (77): ADR-0007, diffFields(), assertInScope(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING (+69 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (49): ADR-0012, ADR-0017, ADR-0019, ADR-0025, ADR-0026, ADR-0011, ADR-0016, ADR-0018 (+41 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "workScopeOf"
Cohesion: 0.14
Nodes (26): workScopeOf(), changeStatementStatusController, deleteStatementController, exportStatementController, exportStatementGroupController, getStatementController, getStatementGroupReportController, getStatementReportController (+18 more)

### Community 45 - "users.service.js"
Cohesion: 0.06
Nodes (51): ADR-0004, INACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint() (+43 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.12
Nodes (14): `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users` (+6 more)

### Community 50 - "formatTime.js"
Cohesion: 0.09
Nodes (13): exportWorksAPI(), WorksPage, WORK_STATE_OPTIONS, SHORT_MONTHS, initialsOf(), LEVEL_COLORS, WorkCard(), COLUMNS (+5 more)

### Community 51 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 52 - "decimal"
Cohesion: 0.11
Nodes (39): decimal(), ratioText(), roundMoney(), advanceBalances(), appliedPct(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits() (+31 more)

### Community 53 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "constants.js"
Cohesion: 0.05
Nodes (61): getDashboardSummaryAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), providerTypesApi, client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenu, client_src_hooks_useinvoicemenus_useinvoicemenus (+53 more)

### Community 56 - "ref_jest_globals"
Cohesion: 0.04
Nodes (43): ref_jest_globals, baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009 (+35 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "fMoneyText"
Cohesion: 0.16
Nodes (32): fMoneyText(), fPercentText(), LiquidationRetention(), AdvanceBar(), advanceDrill(), Advances(), CardTitle(), clickableChartSx (+24 more)

### Community 59 - "WorkScopeContext.jsx"
Cohesion: 0.07
Nodes (43): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), getProviderTypeFieldsAPI(), saveProviderTypeFieldsAPI(), getMyWorksSelectAPI(), pickWork() (+35 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "WorkContracts.jsx"
Cohesion: 0.16
Nodes (23): AlertChips(), contractAlertOptions(), ADVANCE_LEVELS, AdvanceFilter(), AdvanceLegend(), matchesAdvanceFilter(), matchesAdvanceLegend(), num (+15 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "floatingPoint.guard.test.js"
Cohesion: 0.12
Nodes (14): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+6 more)

### Community 68 - "contractTerms.js"
Cohesion: 0.08
Nodes (32): getInvoice(), conceptLabel(), contractInvoices(), evaluateLiquidation(), ADR-0017, ADR-0027, liquidationFacts(), previewContractConcept() (+24 more)

### Community 70 - "WorkSummaryTab.jsx"
Cohesion: 0.20
Nodes (23): contractRows(), daysOpenText(), DrillDownDialog(), followUpRows(), followUpsDrill(), invoiceRows(), num, useDrillDown() (+15 more)

### Community 71 - "AdvanceAmountsSection.jsx"
Cohesion: 0.14
Nodes (22): getContractAdvanceAPI(), previewContractInvoiceAPI(), AdjustableAmount(), AdvanceAmountsSection(), amountLimit(), cents(), exceeds(), isEmpty() (+14 more)

### Community 88 - "invoiceEvidence.service.js"
Cohesion: 0.14
Nodes (15): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+7 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (87): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, ADR-0019, policyTypesApi, checkProviderIdentificationAPI() (+79 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.07
Nodes (41): sendExport(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope() (+33 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "StatementsPage.jsx"
Cohesion: 0.11
Nodes (24): exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), StatementsPage, download(), downloadExport(), errorMessage(), EXPORT_FORMATS (+16 more)

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "ContractsPage.jsx"
Cohesion: 0.07
Nodes (35): contractConceptsApi, contractLiquidationApi, contractsApi, exportContractsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractMenuAPI(), ADR-0006 (+27 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.06
Nodes (90): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), contractPoliciesApi, suspendContractAPI(), getInsurersSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI() (+82 more)

### Community 117 - "export.service.js"
Cohesion: 0.11
Nodes (39): addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf(), buildPdfDocument() (+31 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "contractPolicies.service.js"
Cohesion: 0.07
Nodes (87): main(), newOperationId(), withLockedTransaction(), withContractAiu(), ADR-0017, REASON_SCOPES, reasonsService, assertContractStillAdmits() (+79 more)

### Community 123 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 124 - "MainCard"
Cohesion: 0.15
Nodes (17): useSchemePalette(), MainCard(), InvoicesByWorkCard(), PolicyStatusCard(), CardTitle(), clickableChartSx, DonutWithLegend(), drillLinkSx (+9 more)

### Community 125 - "contractSummaryReport.test.js"
Cohesion: 0.11
Nodes (12): exceljs, COLUMNS, ROWS, concept(), contract(), prismaMock, contract, contractBalances (+4 more)

### Community 129 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 130 - "App.jsx"
Cohesion: 0.13
Nodes (17): refreshSession(), App(), ThemedToastContainer(), CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext, NavigationScroll() (+9 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 133 - "invoiceTerms.js"
Cohesion: 0.18
Nodes (17): isContractCreate(), isCreate(), isSimpleCreate(), assertTransition(), cancelTransitionFor(), hasContract(), historyRow(), httpError() (+9 more)

### Community 134 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 136 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 137 - "contractFields.js"
Cohesion: 0.13
Nodes (15): AIU_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, ADR-0026 (+7 more)

### Community 140 - "simpleInvoiceTerms.js"
Cohesion: 0.11
Nodes (19): CONTRACT_LINES, BY_TYPE, NOT_A_FIELD, previewSimpleInvoice(), INVOICE_TYPES, blank(), FORMULAS, hasSimpleAmounts() (+11 more)

### Community 142 - "money.utils.js"
Cohesion: 0.08
Nodes (21): HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ROUNDING, roundRatio(), ZERO (+13 more)

### Community 151 - "expirationNotice.service.js"
Cohesion: 0.12
Nodes (31): BUSINESS_RULES, DEFAULT_EXPIRING_DAYS, MAX_RULE_DAYS, MIN_RULE_DAYS, getBusinessRulesController, saveBusinessRulesController, FIELD_BY_KEY, getBusinessRules() (+23 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.25
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), getNotificationCount(), listNotifications(), markAllAsRead(), markAsRead() (+4 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 155 - "AuthForgotPassword.jsx"
Cohesion: 0.06
Nodes (40): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), client_src_assets_images_interadminpro (+32 more)

### Community 156 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 157 - "SubCard"
Cohesion: 0.29
Nodes (9): CardSecondaryAction(), SubCard(), Avatar(), ColorBox(), UIColor(), CustomShadowBox(), ShadowBox(), UtilitiesShadow() (+1 more)

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "seed.js"
Cohesion: 0.14
Nodes (12): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+4 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.14
Nodes (10): @prisma/client, CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients (+2 more)

### Community 179 - "advanceFilters.js"
Cohesion: 0.12
Nodes (16): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+8 more)

### Community 181 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 183 - "workDashboard.utils.js"
Cohesion: 0.17
Nodes (11): Metric(), barPercent(), CONTRACT_STATE_CHART_COLORS, DASHBOARD_PATH, INVOICE_TYPE_COLORS, MANAGER_ROLE_NAMES, MONTH_NAMES, monthLabel() (+3 more)

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

### Community 197 - "saveStatement"
Cohesion: 0.40
Nodes (10): assertUniqueNumber(), assertValues(), auditable(), changeStatementStatus(), createStatement(), deleteStatement(), findImmutable(), findLocked() (+2 more)

### Community 198 - "@mui/material"
Cohesion: 0.07
Nodes (48): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), updateThemeModeAPI(), useConfig(), setParentOpenedMenu() (+40 more)

### Community 199 - "socket.manager.js"
Cohesion: 0.26
Nodes (9): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), ACCESS_COOKIE_NAME (+1 more)

### Community 201 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 202 - "src/index.jsx"
Cohesion: 0.15
Nodes (13): client_src_assets_scss_style, config, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals() (+5 more)

### Community 203 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 204 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 206 - "findExportRows"
Cohesion: 0.33
Nodes (7): findExportRows(), exportInvoices(), statementInvoices(), statementsInvoices(), toListDto(), exportFilterLines(), exportWorks()

### Community 211 - "workScope.service.test.js"
Cohesion: 0.40
Nodes (4): hasEffectivePermission, prismaMock, state, user

### Community 212 - "getEffectivePermissionIds"
Cohesion: 0.06
Nodes (37): getEffectivePermissionIds(), assertModeUnchangedInUse(), httpError(), ADR-0010, providerTypesConfig, providerTypesService, getDashboardSummaryController, getWorkDashboardController (+29 more)

### Community 217 - "ref_prop_types"
Cohesion: 0.07
Nodes (40): getWorkDashboardAPI(), ADR-0002, getWorksSummaryAPI(), gridSpacing, ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog() (+32 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.20
Nodes (5): assertInvoiceVisible, ctx, prismaMock, SCOPE, state

### Community 221 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 224 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 227 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 233 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

## Knowledge Gaps
- **1137 isolated node(s):** `TABS`, `ADR-0012`, `ADR-0012`, `INPUT_FIELDS`, `ASSIGNMENT_FIELDS` (+1132 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1571 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **115 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0017` connect `permissions.constants.js` to `contracts.service.js`, `invoices.service.js`, `InvoiceFormPage.jsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `ADR-0002` connect `MainCard` to `contracts.service.js`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **What connects `TABS`, `ADR-0012`, `ADR-0012` to the rest of the system?**
  _1137 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08325624421831637 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractInvoiceTerms.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10510510510510511 - nodes in this community are weakly interconnected._
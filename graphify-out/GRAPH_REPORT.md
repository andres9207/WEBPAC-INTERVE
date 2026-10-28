# Graph Report - WEBPAC-INTERVE  (2026-10-28)

## Corpus Check
- 684 files · ~393,528 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4243 nodes · 12082 edges · 257 communities (143 shown, 114 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 157 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f1cb5383`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- contractInvoiceTerms.js
- getIO
- dependencies
- server/package.json
- providers.service.js
- constants.js
- invoices.routes.js
- InvoiceFormPage.jsx
- ContractDetailPage.jsx
- validation.utils.js
- auth.routes.js
- statements.service.js
- client/package.json
- react
- main.routes.js
- transaction.service.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- seed.demo.js
- `tbl_users`
- contracts.service.js
- contractReports.service.js
- contractSuspensions.service.test.js
- WorkDetailPage.jsx
- master.service.js
- invoices.controller.test.js
- invoiceGlosses.service.js
- menu-items/index.js
- providers.routes.js
- DocumentManagement.jsx
- `tbl_contract_concepts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- fMoneyText
- contracts.controller.js
- cron/index.js
- works.service.js
- contractPolicies.service.js
- devDependencies
- workScopeOf
- users.service.js
- scripts
- app.js
- `tbl_contracts`
- workDashboard.service.js
- uniqueConstraints.constants.test.js
- advanceTerms.js
- dashboard.service.js
- `tbl_contract_type_fields`
- GeneralDashboard.jsx
- ref_jest_globals
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
- seed.volume.js
- AdvanceAmountsSection.jsx
- `tbl_contract_status_history`
- invoiceEvidence.service.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- formatTime.js
- statements.service.test.js
- WorksPage.jsx
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- works.service.test.js
- error.middleware.js
- dateOnlyText
- `tbl_providers`
- status.constants.js
- effectivePermissions.service.js
- AuthenticationRoutes.jsx
- serviceWorker.jsx
- useConfig
- `tbl_providers`
- WorkSummaryTab.jsx
- ProviderTypePage.jsx
- dashboard.service.test.js
- WorkCosts.jsx
- toDateOnly
- audit.service.js
- MenuList/index.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- themes/index.jsx
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- AuthForgotPassword.jsx
- contracts.controller.test.js
- workDashboard.utils.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- prismaClient.js
- `tbl_users`
- balanceReconciliation.service.test.js
- providerTypeFields.service.js
- eslint.config.mjs
- contracts.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- Sidebar/index.jsx
- MainLayout/index.jsx
- workDashboard.service.test.js
- auth.service.test.js
- src/index.jsx
- expirationNotice.service.test.js
- session.service.test.js
- invoiceFollowUps.service.js
- contractLiquidation.service.test.js
- app.service.js
- `tbl_invoices`
- `tbl_invoices`
- @mui/material
- `tbl_statements`
- permissions.service.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- invoiceFollowUps.service.test.js
- master.service.test.js
- error.middleware.test.js
- extends
- `tbl_works`
- contractNotifications.service.test.js
- `tbl_status`
- users.service.test.js
- NotificationSection/index.jsx
- `tbl_users`
- `tbl_work_stages`
- app.service.test.js
- winston.config.js
- decisionReferences.guard.test.js
- SearchSection/index.jsx
- browserslist
- volta
- floatingPoint.guard.test.js
- EasyCrop.jsx
- addressTypes.contacts.js
- DebouncedInput.jsx
- `tbl_invoice_status_history`
- useMenuCollapse.js
- volta
- requirePermission.middleware.test.js
- validate.middleware.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 152 edges
2. `react` - 118 edges
3. `showError()` - 101 edges
4. `workScopeOf()` - 89 edges
5. `moneyText()` - 82 edges
6. `dateOnlyText()` - 81 edges
7. `writeAudit()` - 80 edges
8. `useAuth()` - 79 edges
9. `withLockedTransaction()` - 77 edges
10. `showSuccess()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `percentQuery()` --calls--> `decimal()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/money.utils.js
- `glossRules()` --calls--> `optionalText()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/validation.utils.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js
- `selectContractFilterStages()` --calls--> `scopeWhere()`  [EXTRACTED]
  server/src/modules/work/contracts/contracts.service.js → server/src/common/services/workScope.service.js

## Import Cycles
- None detected.

## Communities (257 total, 114 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractInvoiceTerms.js"
Cohesion: 0.07
Nodes (53): server_src_common_utils_money_utils_percentfor, toMoney(), toPercent(), assertContractTotal(), blank(), composeContractInvoice(), composeWith(), CONTRACT_FORMULA_VERSION (+45 more)

### Community 3 - "getIO"
Cohesion: 0.09
Nodes (25): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), getIO() (+17 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (32): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+24 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (61): identificationError(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes() (+53 more)

### Community 7 - "constants.js"
Cohesion: 0.05
Nodes (52): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), refreshSession(), App(), ThemedToastContainer(), AuthContext, useWorkFilterField() (+44 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.04
Nodes (89): moneyRule(), percentRule(), CONTRACT_PAIRS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController (+81 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.05
Nodes (60): getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoicesApi, ADR-0017 (+52 more)

### Community 10 - "ContractDetailPage.jsx"
Cohesion: 0.04
Nodes (89): contractConceptsApi, contractLiquidationApi, contractsApi, exportContractAPI(), exportContractsAPI(), getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI() (+81 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.10
Nodes (24): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+16 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.07
Nodes (76): diffFields(), newOperationId(), writeAudit(), withLockedTransaction(), assertInScope(), updateAccount(), updatePassword(), statementGlosses() (+68 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (22): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+14 more)

### Community 15 - "react"
Cohesion: 0.06
Nodes (47): getStatusesByScopeAPI(), deleteProfileAPI(), getProfilesAPI(), paginationProfilesAPI(), deleteUserAPI(), getBasicInformationAPI(), paginationUsersAPI(), saveUserAPI() (+39 more)

### Community 16 - "main.routes.js"
Cohesion: 0.06
Nodes (45): express, STATUS_KEYS, verifyToken(), requirePermission(), validate(), IDEMPOTENCY_HEADER, createMasterControllers(), createMasterRouter() (+37 more)

### Community 17 - "transaction.service.js"
Cohesion: 0.20
Nodes (13): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+5 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (23): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+15 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.11
Nodes (26): AUDIT_OPERATIONS, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME (+18 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (113): ADR-0013, ADR-0021, ADR-0023, dateRangeFilter(), server_src_modules_billing_invoices_invoicemenus_simple_type_where, admittedContractsWhere(), admittedTypes(), amountRange() (+105 more)

### Community 22 - "seed.demo.js"
Cohesion: 0.10
Nodes (20): ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC, ADR-0002 (+12 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "contracts.service.js"
Cohesion: 0.07
Nodes (57): ADR-0006, ADR-0016, ADR-0018, ADR-0026, percentText(), AIU_FIELDS, enforceFields(), FIELD_GROUPS (+49 more)

### Community 25 - "contractReports.service.js"
Cohesion: 0.07
Nodes (51): findExportRows(), moneyText(), sumMoney(), toLiquidateOf(), server_src_modules_billing_invoices_invoicemenus_iscontractmode, contractInvoicesForReport(), valueText(), ADVANCE_COLUMNS (+43 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (23): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+15 more)

### Community 27 - "WorkDetailPage.jsx"
Cohesion: 0.07
Nodes (57): getIdentityDocumentsSelectAPI, getProviderTypesSelectAPI, changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, showInfo(), showObligatorios() (+49 more)

### Community 28 - "master.service.js"
Cohesion: 0.07
Nodes (47): INACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent() (+39 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "invoiceGlosses.service.js"
Cohesion: 0.11
Nodes (42): ref_node_fs, CONTRACT_LINES, BY_TYPE, fieldAmount(), GLOSS_FIELD_NAMES, glossFieldFor(), glossFieldsFor(), NOT_A_FIELD (+34 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 32 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): canViewAllWorks(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS (+24 more)

### Community 33 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 34 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "fMoneyText"
Cohesion: 0.16
Nodes (28): fMoneyText(), contractRows(), invoiceRows(), advanceDrill(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState() (+20 more)

### Community 38 - "contracts.controller.js"
Cohesion: 0.05
Nodes (76): auditContext(), getEffectivePermissionIds(), optionalDate(), getSessionInfo(), getUserPermissions(), CONTRACT_REPORTS, ACT_FIELDS, cancelContractController (+68 more)

### Community 39 - "cron/index.js"
Cohesion: 0.10
Nodes (18): dotenv, ref_http, node-cron, prisma, app, server, STATUS_IDS, verifyStatusCatalog() (+10 more)

### Community 40 - "works.service.js"
Cohesion: 0.08
Nodes (48): ADR-0007, PROGRESS_WARNING, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted(), assertHeader() (+40 more)

### Community 41 - "contractPolicies.service.js"
Cohesion: 0.07
Nodes (38): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ratioPercent() (+30 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "workScopeOf"
Cohesion: 0.11
Nodes (31): workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes, ADR-0002, changeStatementStatusController, deleteStatementController (+23 more)

### Community 45 - "users.service.js"
Cohesion: 0.16
Nodes (15): ADR-0004, assertAssignableProfile(), assertIdentification(), AUDITED_USER_FIELDS, checkIfUserExists(), deleteUser(), forbidden(), ADR-0013 (+7 more)

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
Cohesion: 0.08
Nodes (50): ADR-0011, ADVANCE_LEVELS, advanceBar(), advanceLevel(), alertsOf(), balancesOf(), byUrgency(), conceptLabel() (+42 more)

### Community 51 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 52 - "advanceTerms.js"
Cohesion: 0.07
Nodes (52): ratioText(), roundMoney(), CONTRACT_ADVANCE_FILTERS, invoiceAdvanceWhere(), advanceBalances(), appliedPct(), assertAdvanceCancellable(), assertAdvanceFits() (+44 more)

### Community 53 - "dashboard.service.js"
Cohesion: 0.12
Nodes (27): captured, explain(), main(), measure(), parseParams(), percentile(), plain(), contractsBlock() (+19 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "GeneralDashboard.jsx"
Cohesion: 0.06
Nodes (50): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, RETRY_503_HINT (+42 more)

### Community 56 - "ref_jest_globals"
Cohesion: 0.05
Nodes (39): ref_jest_globals, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state (+31 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkContracts.jsx"
Cohesion: 0.15
Nodes (29): AlertChips(), contractAlertOptions(), fPercentText(), ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter(), AdvanceLegend(), matchesAdvanceFilter() (+21 more)

### Community 59 - "contractTerms.js"
Cohesion: 0.11
Nodes (26): daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation(), previewContractConcept(), previewContractEndDate(), blank(), conceptDraftOf() (+18 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "permissions.constants.js"
Cohesion: 0.05
Nodes (54): ADR-0012, ADR-0019, ADR-0025, ADR-0011, ADR-0016, ADR-0018, PERMISSIONS, defineMaster() (+46 more)

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
Cohesion: 0.11
Nodes (23): bcrypt, ref_crypto, comparePassword(), hashPassword(), deriveKey(), generateResetCode(), hashResetCode(), ADR-0001 (+15 more)

### Community 70 - "seed.volume.js"
Cohesion: 0.10
Nodes (23): ref_node_crypto, nit(), addDays(), ALL_FIELDS, concept(), dbName, END_DATES, firstActive() (+15 more)

### Community 71 - "AdvanceAmountsSection.jsx"
Cohesion: 0.29
Nodes (13): getContractAdvanceAPI(), AdjustableAmount(), AdvanceAmountsSection(), amountLimit(), cents(), exceeds(), isEmpty(), isPositive() (+5 more)

### Community 88 - "invoiceEvidence.service.js"
Cohesion: 0.15
Nodes (14): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+6 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (88): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), policyTypesApi, reasonsApi (+80 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.07
Nodes (39): sendExport(), ALL, assertAnyInScope(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+31 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "formatTime.js"
Cohesion: 0.07
Nodes (25): exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), StatementsPage, download(), downloadExport(), errorMessage(), EXPORT_FORMATS (+17 more)

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "WorksPage.jsx"
Cohesion: 0.09
Nodes (31): getAddressTypesSelectAPI, getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, exportWorksAPI(), createMasterApi(), WorksPage, channelsOf() (+23 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.06
Nodes (86): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), contractPoliciesApi, suspendContractAPI(), getInsurersSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI() (+78 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (51): exceljs, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+43 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "dateOnlyText"
Cohesion: 0.09
Nodes (57): prisma, dateOnlyText(), ADR-0017, REASON_SCOPES, reasonsConfig, reasonsService, CANCEL_TARGET, ADR-0027 (+49 more)

### Community 123 - "status.constants.js"
Cohesion: 0.07
Nodes (32): DELETED_STATUS, amortizes, CONTRACT_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, isAdvance, ADR-0024 (+24 more)

### Community 124 - "effectivePermissions.service.js"
Cohesion: 0.23
Nodes (11): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS, findBalanceViolations() (+3 more)

### Community 125 - "AuthenticationRoutes.jsx"
Cohesion: 0.10
Nodes (21): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 129 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 130 - "useConfig"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "WorkSummaryTab.jsx"
Cohesion: 0.18
Nodes (22): MainCard(), daysOpenText(), DrillDownDialog(), followUpRows(), followUpsDrill(), num, useDrillDown(), initialsOf() (+14 more)

### Community 133 - "ProviderTypePage.jsx"
Cohesion: 0.13
Nodes (18): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, INVOICE_MODE_OPTIONS, invoiceModeName(), DATA_TYPE_NAMES, GROUP_NAMES (+10 more)

### Community 134 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 136 - "WorkCosts.jsx"
Cohesion: 0.18
Nodes (15): useSchemePalette(), InvoicesByWorkCard(), PolicyStatusCard(), CardTitle(), clickableChartSx, DonutWithLegend(), drillLinkSx, INVOICE_NOUN (+7 more)

### Community 137 - "toDateOnly"
Cohesion: 0.24
Nodes (16): addTerm(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), TERM_UNITS, termProgress(), toDateOnly(), todayDateOnly() (+8 more)

### Community 140 - "audit.service.js"
Cohesion: 0.15
Nodes (15): ADR-0001, auditMisuse(), buildRows(), ADR-0013, ADR-0027, protect(), REDACTED, SENSITIVE_FIELDS (+7 more)

### Community 142 - "MenuList/index.jsx"
Cohesion: 0.31
Nodes (8): getMenuAPI(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts, setContractMenus(), work

### Community 151 - "themes/index.jsx"
Cohesion: 0.22
Nodes (9): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor (+1 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.22
Nodes (10): imap-simple, nodemailer, emailApp, nameApp, nameAppMail, checkEmailBounces(), saveToSent(), sendEmail() (+2 more)

### Community 155 - "AuthForgotPassword.jsx"
Cohesion: 0.16
Nodes (19): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider() (+11 more)

### Community 156 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 157 - "workDashboard.utils.js"
Cohesion: 0.14
Nodes (13): Metric(), barPercent(), CONTRACT_STATE_CHART_COLORS, DASHBOARD_PATH, dashboardTo, INVOICE_TYPE_COLORS, MANAGER_ROLE_NAMES, MONTH_NAMES (+5 more)

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "prismaClient.js"
Cohesion: 0.06
Nodes (52): @prisma/adapter-mariadb, ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES (+44 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.23
Nodes (9): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoice_glosses`, `tbl_invoices` (+1 more)

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.14
Nodes (10): @prisma/client, CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients (+2 more)

### Community 179 - "providerTypeFields.service.js"
Cohesion: 0.29
Nodes (13): resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getProviderTypeFields(), httpError(), ADR-0006 (+5 more)

### Community 181 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

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

### Community 197 - "Sidebar/index.jsx"
Cohesion: 0.31
Nodes (7): LogoSection(), MainContentStyled, Sidebar(), closedMixin(), MiniDrawerStyled, openedMixin(), drawerWidth

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.21
Nodes (15): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), Footer(), Header(), ThemeModeSection(), MainLayout() (+7 more)

### Community 199 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): percent(), ALL, CONCEPTS, CONTRACT, OWN, prismaMock

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

### Community 206 - "invoiceFollowUps.service.js"
Cohesion: 0.27
Nodes (18): assertNotCancelled(), auditable(), AUDITED, closeFollowUp(), deleteFollowUp(), findLockedInvoice(), findLockedOpen(), FOLLOW_UP_SELECT (+10 more)

### Community 211 - "contractLiquidation.service.test.js"
Cohesion: 0.08
Nodes (14): payload, hasEffectivePermission, prismaMock, state, user, forged, ADR-0013, permissionsServiceMock (+6 more)

### Community 212 - "app.service.js"
Cohesion: 0.15
Nodes (16): ACTIVE_STATUS, hasEffectivePermission(), getMenu(), getPagesMenu(), PAGE_SELECT, toChild(), toParent(), withContractMenus() (+8 more)

### Community 217 - "@mui/material"
Cohesion: 0.07
Nodes (43): getWorksSummaryAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, SubCard(), ACTION_TONES, ActionButton() (+35 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "permissions.service.js"
Cohesion: 0.22
Nodes (6): AUDIT_ENTITIES, auditPermissionChanges(), ADR-0013, ADR-0027, updateProfilePermissions(), updateUserPermissions()

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

### Community 235 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 237 - "NotificationSection/index.jsx"
Cohesion: 0.50
Nodes (7): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf()

### Community 241 - "app.service.test.js"
Cohesion: 0.22
Nodes (6): BILLING, CONTRACTS, DASHBOARD, HOME, prismaMock, state

### Community 242 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 243 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 244 - "SearchSection/index.jsx"
Cohesion: 0.48
Nodes (6): ProfileSection(), HeaderAvatar(), MobileSearch(), SearchSection(), Transitions(), material-ui-popup-state

### Community 245 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 246 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 247 - "floatingPoint.guard.test.js"
Cohesion: 0.29
Nodes (5): ALLOWED, files(), lines, SRC, text()

### Community 249 - "addressTypes.contacts.js"
Cohesion: 0.47
Nodes (5): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText()

### Community 251 - "`tbl_invoice_status_history`"
Cohesion: 0.50
Nodes (3): `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`

### Community 253 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **1142 isolated node(s):** `ADR-0017`, `MENU_COLUMN`, `STATE_COLUMN`, `num`, `BASE_COLUMNS` (+1137 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1579 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **114 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0012` connect `permissions.constants.js` to `providers.routes.js`, `WorkDetailPage.jsx`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `useConfig`, `WorkSummaryTab.jsx`, `ProviderTypePage.jsx`, `constants.js`, `WorkCosts.jsx`, `InvoiceFormPage.jsx`, `ContractDetailPage.jsx`, `client/package.json`, `react`, `MenuList/index.jsx`, `themes/index.jsx`, `WorkDetailPage.jsx`, `AuthForgotPassword.jsx`, `DocumentManagement.jsx`, `fMoneyText`, `GeneralDashboard.jsx`, `WorkContracts.jsx`, `withAlpha`, `Sidebar/index.jsx`, `MainLayout/index.jsx`, `AdvanceAmountsSection.jsx`, `useAuth`, `formatTime.js`, `NotificationSection/index.jsx`, `WorksPage.jsx`, `SearchSection/index.jsx`, `showError`, `EasyCrop.jsx`, `DebouncedInput.jsx`, `AuthenticationRoutes.jsx`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **What connects `ADR-0017`, `MENU_COLUMN`, `STATE_COLUMN` to the rest of the system?**
  _1142 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractInvoiceTerms.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06939890710382514 - nodes in this community are weakly interconnected._
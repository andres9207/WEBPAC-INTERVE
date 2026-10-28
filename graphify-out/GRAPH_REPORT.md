# Graph Report - WEBPAC-INTERVE  (2026-10-27)

## Corpus Check
- 683 files · ~386,937 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4207 nodes · 11973 edges · 241 communities (132 shown, 109 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 157 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e221ba2d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- money.utils.js
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
- status.constants.js
- main.routes.js
- auth.service.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- seed.demo.js
- `tbl_users`
- contracts.controller.test.js
- dashboard.service.js
- contractSuspensions.service.test.js
- useAuth
- contractReports.service.js
- invoices.controller.test.js
- invoiceGlosses.service.js
- menu-items/index.js
- providers.routes.js
- DocumentManagement.jsx
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- app.routes.js
- NotificationSection/index.jsx
- cron/index.js
- works.service.js
- permissions.constants.js
- devDependencies
- workScopeOf
- users.service.js
- scripts
- app.js
- `tbl_invoices`
- workDashboard.service.js
- uniqueConstraints.constants.test.js
- decimal
- contractLiquidation.service.test.js
- `tbl_contract_type_fields`
- constants.js
- transaction.mock.js
- scripts
- fMoneyText
- httpCliente.js
- compilerOptions
- excelJS.js
- contracts.service.js
- permission
- devDependencies
- transaction.service.test.js
- dateOnlyText
- audit.service.js
- contractPolicies.service.js
- `tbl_contract_status_history`
- invoiceTerms.js
- `tbl_status`
- authContext.jsx
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- formatTime.js
- statements.service.test.js
- MenuList/index.jsx
- `tbl_works`
- `tbl_policies`
- react
- export.service.js
- works.service.test.js
- error.middleware.js
- contractConcepts.service.js
- `tbl_providers`
- error.middleware.test.js
- workDashboard.service.test.js
- notifications.service.test.js
- serviceWorker.jsx
- themes/index.jsx
- `tbl_providers`
- winston.config.js
- contractTerms.js
- expirationNotice.service.js
- NewProviderDialog.jsx
- providerTypeFields.service.js
- simpleInvoiceTerms.js
- liquidationTerms.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- businessRules.service.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- AuthForgotPassword.jsx
- balanceReconciliation.service.js
- ProviderTypePage.jsx
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- PoliciesTab.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- advanceFilters.js
- decisionReferences.guard.test.js
- glossFields.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- App.jsx
- MainLayout/index.jsx
- socket.manager.js
- contractConcepts.service.test.js
- src/index.jsx
- ref_jest_globals
- session.service.test.js
- dashboard.measure.js
- master.service.test.js
- getEffectivePermissionIds
- `tbl_invoices`
- `tbl_invoices`
- @mui/material
- `tbl_statements`
- contractEndDateReconciliation.service.test.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- policyTypes.service.test.js
- permissions.controller.test.js
- `tbl_invoice_glosses`
- extends
- `tbl_works`
- contractNotifications.service.test.js
- auth.service.test.js
- browserslist
- volta
- EasyCrop.jsx
- DebouncedInput.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 152 edges
2. `react` - 118 edges
3. `showError()` - 100 edges
4. `workScopeOf()` - 87 edges
5. `moneyText()` - 81 edges
6. `dateOnlyText()` - 80 edges
7. `writeAudit()` - 80 edges
8. `useAuth()` - 79 edges
9. `withLockedTransaction()` - 77 edges
10. `showSuccess()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `glossRules()` --calls--> `optionalText()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/validation.utils.js
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `selectContractFilterStages()` --calls--> `scopeWhere()`  [EXTRACTED]
  server/src/modules/work/contracts/contracts.service.js → server/src/common/services/workScope.service.js
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js

## Import Cycles
- None detected.

## Communities (241 total, 109 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "money.utils.js"
Cohesion: 0.11
Nodes (35): HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), percentText(), RATIO_SCALE, ROUNDING (+27 more)

### Community 3 - "writeAudit"
Cohesion: 0.15
Nodes (40): diffFields(), writeAudit(), withLockedTransaction(), updateAccount(), updatePassword(), assertNotCancelled(), auditable(), AUDITED (+32 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (57): assertInScope(), identificationError(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope() (+49 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (57): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), previewContractInvoiceAPI(), previewSimpleInvoiceAPI(), AmountPercentField() (+49 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.06
Nodes (45): moneyRule(), percentRule(), canManageFollowUps, canManageGlosses, canView, ADR-0017, approveInvoiceSchema, cancelInvoiceSchema (+37 more)

### Community 9 - "contracts.controller.js"
Cohesion: 0.06
Nodes (71): auditContext(), optionalDate(), contractIdsByAdvance(), ACT_FIELDS, cancelContractController, cancelPolicyController, CONCEPT_FIELDS, CONTRACT_FIELDS (+63 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (48): contractConceptsApi, contractLiquidationApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006 (+40 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.09
Nodes (26): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, IDEMPOTENCY_HEADER, createMasterSchemas(), contactsRules(), emailRule(), idArray() (+18 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.08
Nodes (52): renderDocument(), containsFilter(), countByStatus(), DEFAULT_ROWS, filtersWhere(), idFilter(), paginate(), resolvePagination() (+44 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (34): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+26 more)

### Community 15 - "status.constants.js"
Cohesion: 0.08
Nodes (31): ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, newOperationId(), capitalize(), createMasterService(), defineMaster(), httpError() (+23 more)

### Community 16 - "main.routes.js"
Cohesion: 0.05
Nodes (58): express, jsonwebtoken, getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), nitField() (+50 more)

### Community 17 - "auth.service.js"
Cohesion: 0.08
Nodes (36): bcrypt, ref_crypto, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS (+28 more)

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
Cohesion: 0.05
Nodes (87): ADR-0013, ADR-0020, ADR-0021, ADR-0023, ADR-0024, ADR-0027, dateRangeFilter(), isBillingType() (+79 more)

### Community 22 - "seed.demo.js"
Cohesion: 0.06
Nodes (45): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+37 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 25 - "dashboard.service.js"
Cohesion: 0.10
Nodes (40): scopeWhere(), policyExpiringDays(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002 (+32 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (25): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), row(), ctx, prismaMock, state (+17 more)

### Community 27 - "useAuth"
Cohesion: 0.06
Nodes (84): getStatusesByScopeAPI(), exportContractAPI(), invoicesApi, getWorkManagersSelectAPI(), previewWorkEndDateAPI(), useAuth(), useSocket(), ContactsList() (+76 more)

### Community 28 - "contractReports.service.js"
Cohesion: 0.06
Nodes (44): insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, policyBaseValue(), server_src_modules_billing_invoices_invoicemenus_iscontractmode, contractInvoicesForReport() (+36 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "invoiceGlosses.service.js"
Cohesion: 0.17
Nodes (29): assertFieldFor(), assertNotCancelled(), auditable(), AUDITED, createGloss(), deleteGloss(), findLockedInvoice(), findLockedOpen() (+21 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 32 - "providers.routes.js"
Cohesion: 0.09
Nodes (30): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+22 more)

### Community 33 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 38 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 39 - "cron/index.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+8 more)

### Community 40 - "works.service.js"
Cohesion: 0.08
Nodes (48): ADR-0007, defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), applyManagers(), applyStages() (+40 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.07
Nodes (34): ADR-0012, ADR-0017, ADR-0019, ADR-0025, ADR-0026, ADR-0011, ADR-0016, ADR-0018 (+26 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "workScopeOf"
Cohesion: 0.05
Nodes (75): sendExport(), workScopeOf(), CONTRACT_PAIRS, CONTRACT_TAX_FIELDS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController (+67 more)

### Community 45 - "users.service.js"
Cohesion: 0.06
Nodes (38): ADR-0004, AUDIT_ENTITIES, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint() (+30 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "workDashboard.service.js"
Cohesion: 0.09
Nodes (48): ADR-0011, moneyText(), sumMoney(), ADVANCE_LEVELS, advanceBar(), advanceLevel(), alertsOf(), balancesOf() (+40 more)

### Community 51 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 52 - "decimal"
Cohesion: 0.11
Nodes (39): decimal(), ratioPercent(), ratioText(), roundMoney(), roundRatio(), advanceBalances(), appliedPct(), assertAdvanceCancellable() (+31 more)

### Community 53 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "constants.js"
Cohesion: 0.04
Nodes (65): contractsApi, exportContractsAPI(), getContractMenuAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), refreshSession(), client_src_hooks_useinvoicemenus (+57 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.07
Nodes (26): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+18 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "fMoneyText"
Cohesion: 0.05
Nodes (108): useSchemePalette(), chipBg(), chipText(), StatusTabs(), contractAlertOptions(), fTerm(), fMoneyText(), fPercentText() (+100 more)

### Community 59 - "httpCliente.js"
Cohesion: 0.08
Nodes (35): getWorkDashboardAPI(), ADR-0002, getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, RETRY_503_HINT, pickWork() (+27 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "contracts.service.js"
Cohesion: 0.09
Nodes (44): ADR-0002, ADR-0006, ADR-0016, ADR-0018, typeAppliesAiu(), withContractAiu(), resolveContractTypeFields(), contractsWithPendingAdvanceWhere() (+36 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (18): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+10 more)

### Community 68 - "dateOnlyText"
Cohesion: 0.10
Nodes (42): findExportRows(), renderExport(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel() (+34 more)

### Community 70 - "audit.service.js"
Cohesion: 0.09
Nodes (23): ADR-0001, @prisma/client, adapter, describeTarget(), prisma, testConnection(), auditMisuse(), buildRows() (+15 more)

### Community 71 - "contractPolicies.service.js"
Cohesion: 0.11
Nodes (36): conceptLabel(), contractInvoices(), evaluateLiquidation(), ADR-0017, ADR-0027, liquidationFacts(), assertMasters(), assertTypeFree() (+28 more)

### Community 88 - "invoiceTerms.js"
Cohesion: 0.09
Nodes (29): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+21 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "authContext.jsx"
Cohesion: 0.02
Nodes (103): addressTypesApi, loginAPI(), logoutAPI(), verifyTokenAPI(), constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI (+95 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.08
Nodes (36): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+28 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "formatTime.js"
Cohesion: 0.09
Nodes (19): exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), StatementsPage, STATEMENTS_PATH, statementsPath(), SHORT_MONTHS, GLOSS_COLUMNS (+11 more)

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "MenuList/index.jsx"
Cohesion: 0.18
Nodes (17): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), menuEntries() (+9 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "react"
Cohesion: 0.05
Nodes (95): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), contractPoliciesApi, suspendContractAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoiceTransitionsApi (+87 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (50): exceljs, pdfkit, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument() (+42 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "contractConcepts.service.js"
Cohesion: 0.10
Nodes (53): assertContractStillAdmits(), CANCEL_TARGET, cancelContract(), ADR-0027, text(), activeSequence(), amendmentResult(), assertBalancesHold() (+45 more)

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): percent(), ALL, CONCEPTS, CONTRACT, OWN, prismaMock

### Community 129 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 130 - "themes/index.jsx"
Cohesion: 0.15
Nodes (14): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useConfig(), useLocalStorage() (+6 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 133 - "contractTerms.js"
Cohesion: 0.10
Nodes (26): server_src_common_utils_money_utils_percentfor, daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation(), previewContractEndDate(), CONCEPT_PAIRS, CONTRACT_ALERT_NAMES (+18 more)

### Community 134 - "expirationNotice.service.js"
Cohesion: 0.15
Nodes (22): getRuleValues(), contractAlertWheres(), addDays(), alreadyNotified(), buildNotices(), contractsWithExpiredPoliciesWhere(), contractsWithExpiringPoliciesWhere(), daysUntil() (+14 more)

### Community 136 - "NewProviderDialog.jsx"
Cohesion: 0.08
Nodes (41): getAddressTypesSelectAPI, getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi (+33 more)

### Community 137 - "providerTypeFields.service.js"
Cohesion: 0.13
Nodes (25): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+17 more)

### Community 140 - "simpleInvoiceTerms.js"
Cohesion: 0.14
Nodes (21): hasContractTaxes(), amountsDto(), listAmounts(), previewSimpleInvoice(), blank(), composeSimpleInvoice(), FORMULAS, hasSimpleAmounts() (+13 more)

### Community 142 - "liquidationTerms.js"
Cohesion: 0.14
Nodes (13): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+5 more)

### Community 151 - "businessRules.service.js"
Cohesion: 0.09
Nodes (26): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+18 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 155 - "AuthForgotPassword.jsx"
Cohesion: 0.07
Nodes (35): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage (+27 more)

### Community 156 - "balanceReconciliation.service.js"
Cohesion: 0.30
Nodes (10): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS, findBalanceViolations() (+2 more)

### Community 157 - "ProviderTypePage.jsx"
Cohesion: 0.13
Nodes (19): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, INVOICE_MODE_OPTIONS, INVOICE_MODES, invoiceModeName(), DATA_TYPE_NAMES (+11 more)

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "PoliciesTab.jsx"
Cohesion: 0.14
Nodes (17): getInsurersSelectAPI, getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, ADR-0018, PoliciesDraftEditor(), rowKey(), ADR-0017 (+9 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "advanceFilters.js"
Cohesion: 0.12
Nodes (17): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+9 more)

### Community 181 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 183 - "glossFields.js"
Cohesion: 0.21
Nodes (11): ref_node_fs, CONTRACT_LINES, BY_TYPE, GLOSS_FIELD_NAMES, glossFieldFor(), glossFieldsFor(), NOT_A_FIELD, OTHER_FIELD (+3 more)

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

### Community 197 - "App.jsx"
Cohesion: 0.23
Nodes (9): App(), ThemedToastContainer(), AuthContext, NavigationScroll(), SocketProvider(), ThemeCustomization(), Typography(), @mui/x-date-pickers (+1 more)

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.19
Nodes (15): handlerDrawerOpen(), Footer(), Header(), MainLayout(), MainLayoutContent(), ScopedOutlet(), LogoSection(), MainContentStyled (+7 more)

### Community 199 - "socket.manager.js"
Cohesion: 0.29
Nodes (8): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), isSessionActive()

### Community 201 - "contractConcepts.service.test.js"
Cohesion: 0.17
Nodes (6): ctx, ADR-0016, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 202 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 203 - "ref_jest_globals"
Cohesion: 0.05
Nodes (22): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+14 more)

### Community 204 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 206 - "dashboard.measure.js"
Cohesion: 0.43
Nodes (7): captured, explain(), main(), measure(), parseParams(), percentile(), plain()

### Community 211 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 212 - "getEffectivePermissionIds"
Cohesion: 0.07
Nodes (29): getEffectivePermissionIds(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, getMenu(), getPagesMenu(), getSessionInfo(), getUserPermissions() (+21 more)

### Community 217 - "@mui/material"
Cohesion: 0.05
Nodes (63): updateThemeModeAPI(), getDashboardSummaryAPI(), client_src_hooks_useinvoicemenus_useinvoicemenus, ThemeModeSection(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle (+55 more)

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

### Community 222 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 224 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 227 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 233 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 234 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 235 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 237 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **1135 isolated node(s):** `CONTRACT_TYPES`, `SIMPLE_CAPTURED`, `CONTRACT_CAPTURED`, `TABS`, `ADR-0020` (+1130 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1569 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **109 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0017` connect `permissions.constants.js` to `react`, `invoices.service.js`, `contracts.service.js`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `themes/index.jsx`, `InvoiceFormPage.jsx`, `NewProviderDialog.jsx`, `ConceptDialog.jsx`, `client/package.json`, `useAuth`, `AuthForgotPassword.jsx`, `ProviderTypePage.jsx`, `DocumentManagement.jsx`, `NotificationSection/index.jsx`, `PoliciesTab.jsx`, `constants.js`, `fMoneyText`, `httpCliente.js`, `withAlpha`, `App.jsx`, `MainLayout/index.jsx`, `authContext.jsx`, `formatTime.js`, `EasyCrop.jsx`, `DebouncedInput.jsx`, `MenuList/index.jsx`, `react`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **What connects `CONTRACT_TYPES`, `SIMPLE_CAPTURED`, `CONTRACT_CAPTURED` to the rest of the system?**
  _1135 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `money.utils.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1064102564102564 - nodes in this community are weakly interconnected._
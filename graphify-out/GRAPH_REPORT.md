# Graph Report - WEBPAC-INTERVE  (2026-10-27)

## Corpus Check
- 677 files · ~383,355 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4175 nodes · 11860 edges · 228 communities (123 shown, 105 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 156 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8ad99a72`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- contractInvoiceTerms.js
- invoiceGlosses.service.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- workScopeOf
- ConceptDialog.jsx
- validation.utils.js
- auth.routes.js
- statements.service.js
- client/package.json
- users.service.js
- main.routes.js
- writeAudit
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- ImageList.jsx
- `tbl_users`
- contracts.controller.test.js
- withLockedTransaction
- contractSuspensions.service.test.js
- eslint.config.mjs
- contractReports.service.js
- invoices.controller.test.js
- constants.js
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
- src/index.jsx
- contractPolicies.service.js
- scripts
- app.js
- `tbl_invoices`
- PoliciesTab.jsx
- uniqueConstraints.constants.test.js
- decimal
- contractLiquidation.service.test.js
- `tbl_contract_type_fields`
- advanceFilters.js
- transaction.mock.js
- scripts
- WorkChartsTab.jsx
- InvoicesPage.jsx
- compilerOptions
- excelJS.js
- contracts.service.js
- permission
- devDependencies
- transaction.service.test.js
- contracts.service.test.js
- simpleInvoiceTerms.js
- statements.routes.js
- `tbl_contract_status_history`
- invoiceEvidence.service.js
- `tbl_status`
- authContext.jsx
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- formatTime.js
- statements.service.test.js
- MenuList/index.jsx
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- works.service.test.js
- error.middleware.js
- contractConcepts.service.js
- `tbl_providers`
- error.middleware.test.js
- contractFields.js
- ContactsEditor.jsx
- serviceWorker.jsx
- themes/index.jsx
- `tbl_providers`
- winston.config.js
- session.service.test.js
- AuthForgotPassword.jsx
- SocketProvider.jsx
- seed.demo.js
- floatingPoint.guard.test.js
- extends
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_user_permissions`
- workScope.service.js
- mailerService.js
- browserslist
- balanceReconciliation.service.js
- contractNotifications.service.test.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- DebouncedInput.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- volta
- decisionReferences.guard.test.js
- invoiceFollowUps.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- useAuth
- MainLayout/index.jsx
- workDashboard.service.js
- dashboard.service.test.js
- EasyCrop.jsx
- ref_jest_globals
- users.service.test.js
- app.service.js
- `tbl_invoices`
- `tbl_invoices`
- @mui/material
- `tbl_statements`
- dashboard.service.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- `tbl_works`
- auth.service.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 151 edges
2. `react` - 117 edges
3. `showError()` - 100 edges
4. `workScopeOf()` - 87 edges
5. `dateOnlyText()` - 80 edges
6. `writeAudit()` - 80 edges
7. `useAuth()` - 79 edges
8. `withLockedTransaction()` - 77 edges
9. `moneyText()` - 76 edges
10. `showSuccess()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `getUserPermissions()` --calls--> `getEffectivePermissionIds()`  [EXTRACTED]
  server/src/modules/app/general/app.service.js → server/src/common/services/effectivePermissions.service.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js

## Import Cycles
- None detected.

## Communities (228 total, 105 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractInvoiceTerms.js"
Cohesion: 0.13
Nodes (25): server_src_common_utils_money_utils_percentfor, assertContractTotal(), blank(), composeContractInvoice(), composeWith(), CONTRACT_FORMULA_VERSION, CONTRACT_LINES, CONTRACT_TAX_MONEY_COLUMNS (+17 more)

### Community 3 - "invoiceGlosses.service.js"
Cohesion: 0.19
Nodes (26): assertNotCancelled(), auditable(), AUDITED, createGloss(), deleteGloss(), findLockedInvoice(), findLockedOpen(), findStatement() (+18 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.07
Nodes (67): ADR-0009, defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), identificationError(), assertIdentification() (+59 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (56): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoicesApi (+48 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.04
Nodes (81): CONTRACT_PAIRS, CONTRACT_TAX_FIELDS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController, deleteInvoiceController (+73 more)

### Community 9 - "workScopeOf"
Cohesion: 0.06
Nodes (78): auditContext(), workScopeOf(), moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), CONTRACT_REPORTS (+70 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (49): contractConceptsApi, contractLiquidationApi, exportContractsAPI(), getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI() (+41 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.08
Nodes (29): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0027 (+21 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.06
Nodes (68): capitalize(), createMasterService(), httpError(), ADR-0003, ADR-0004, ADR-0013, ADR-0027, containsFilter() (+60 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+13 more)

### Community 15 - "users.service.js"
Cohesion: 0.09
Nodes (26): ADR-0004, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent() (+18 more)

### Community 16 - "main.routes.js"
Cohesion: 0.07
Nodes (48): express, getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, revokeSession() (+40 more)

### Community 17 - "writeAudit"
Cohesion: 0.08
Nodes (42): ADR-0001, bcrypt, ref_crypto, auditMisuse(), buildRows(), ADR-0013, ADR-0027, protect() (+34 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.05
Nodes (36): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+28 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.11
Nodes (26): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), setIO(), ACCESS_COOKIE_NAME, baseCookieOptions (+18 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.05
Nodes (96): ADR-0013, ADR-0023, dateRangeFilter(), invoiceAdvanceWhere(), server_src_modules_billing_invoices_invoicemenus_simple_type_where, adjustableAmount(), admittedContractsWhere(), admittedTypes() (+88 more)

### Community 22 - "ImageList.jsx"
Cohesion: 0.31
Nodes (6): setParentOpenedMenu(), useMenuCollapse(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 25 - "withLockedTransaction"
Cohesion: 0.07
Nodes (50): AUDIT_ENTITIES, AUDIT_OPERATIONS, newOperationId(), backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER (+42 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (22): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx, prismaMock (+14 more)

### Community 27 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 28 - "contractReports.service.js"
Cohesion: 0.08
Nodes (34): findExportRows(), server_src_modules_billing_invoices_invoicemenus_iscontractmode, contractInvoicesForReport(), ADVANCE_COLUMNS, authored(), balanceFields(), CONCEPT_COLUMNS, conceptLabel() (+26 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "constants.js"
Cohesion: 0.03
Nodes (66): contractsApi, getContractMenuAPI(), policyTypesApi, getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), reasonsApi, PolicyTypePage (+58 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.09
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 32 - "providers.routes.js"
Cohesion: 0.08
Nodes (33): ADR-0012, canViewAllWorks(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController (+25 more)

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
Cohesion: 0.07
Nodes (68): ADR-0007, diffFields(), assertInScope(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING (+60 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (48): ADR-0017, ADR-0019, ADR-0025, ADR-0026, ADR-0011, ADR-0016, ADR-0018, PERMISSIONS (+40 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (54): policyExpiringDays(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, policyBaseValue(), configurePolicyTypeBaseController (+46 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "app.js"
Cohesion: 0.11
Nodes (15): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, allowedHosts (+7 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "PoliciesTab.jsx"
Cohesion: 0.14
Nodes (19): contractPoliciesApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, complete(), PercentField(), toText(), toValue(), ADR-0018 (+11 more)

### Community 51 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 52 - "decimal"
Cohesion: 0.06
Nodes (69): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE (+61 more)

### Community 53 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "advanceFilters.js"
Cohesion: 0.13
Nodes (16): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, isAdvance, ADR-0024 (+8 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkChartsTab.jsx"
Cohesion: 0.05
Nodes (104): useSchemePalette(), MainCard(), AlertChips(), contractAlertOptions(), fPercentText(), InvoicesByWorkCard(), PolicyStatusCard(), ADVANCE_LEVELS (+96 more)

### Community 59 - "InvoicesPage.jsx"
Cohesion: 0.05
Nodes (69): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), getMyWorksSelectAPI(), pickWork() (+61 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "contracts.service.js"
Cohesion: 0.05
Nodes (64): ADR-0006, ADR-0016, ADR-0018, ADR-0027, contractsWithPendingAdvanceWhere(), server_src_modules_billing_invoices_invoicemenus_issimplemode, advanceWhereOf(), CONCEPT_AUDITED (+56 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.13
Nodes (13): ref_fs, ref_path, ref_url, catalog, expected, prismaMock, ADR-0027, loggerMock (+5 more)

### Community 68 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (10): ctx, input(), ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock (+2 more)

### Community 70 - "simpleInvoiceTerms.js"
Cohesion: 0.15
Nodes (16): previewSimpleInvoice(), simpleSnapshot(), blank(), composeSimpleInvoice(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023 (+8 more)

### Community 71 - "statements.routes.js"
Cohesion: 0.09
Nodes (32): sendExport(), exportFormatRule(), handleExport(), changeStatementStatusController, deleteStatementController, exportStatementController, exportStatementGroupController, getStatementController (+24 more)

### Community 88 - "invoiceEvidence.service.js"
Cohesion: 0.19
Nodes (13): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+5 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "authContext.jsx"
Cohesion: 0.02
Nodes (94): addressTypesApi, getStatusesByScopeAPI(), constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, insurersApi (+86 more)

### Community 100 - "works.routes.js"
Cohesion: 0.11
Nodes (26): selectMyWorks(), changeWorkStateController, changeWorkStatusController, deleteWorkController, exportWorksController, getWorkController, INPUT_FIELDS, notify() (+18 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "formatTime.js"
Cohesion: 0.09
Nodes (12): exportStatementGroupAPI(), getStatementGroupReportAPI(), getStatementsSelectAPI(), paginationStatementGroupsAPI(), StatementsPage, SHORT_MONTHS, GLOSS_COLUMNS, INVOICE_COLUMNS (+4 more)

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "MenuList/index.jsx"
Cohesion: 0.24
Nodes (10): getMenuAPI(), ElevationScroll(), HorizontalBar(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts (+2 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.05
Nodes (97): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI(), getModulesAPI() (+89 more)

### Community 117 - "export.service.js"
Cohesion: 0.05
Nodes (59): exceljs, ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile() (+51 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "contractConcepts.service.js"
Cohesion: 0.08
Nodes (74): typeAppliesAiu(), withContractAiu(), resolveContractTypeFields(), ADR-0017, REASON_SCOPES, reasonsService, CANCEL_TARGET, cancelContract() (+66 more)

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "contractFields.js"
Cohesion: 0.12
Nodes (17): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+9 more)

### Community 125 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 129 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 130 - "themes/index.jsx"
Cohesion: 0.15
Nodes (13): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage(), createCustomShadow() (+5 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 133 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 134 - "AuthForgotPassword.jsx"
Cohesion: 0.06
Nodes (41): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), client_src_assets_images_interadminpro (+33 more)

### Community 136 - "SocketProvider.jsx"
Cohesion: 0.20
Nodes (11): refreshSession(), App(), ThemedToastContainer(), AuthContext, NavigationScroll(), SocketContext, SocketProvider(), pathSocket (+3 more)

### Community 137 - "seed.demo.js"
Cohesion: 0.04
Nodes (71): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+63 more)

### Community 140 - "floatingPoint.guard.test.js"
Cohesion: 0.29
Nodes (5): ALLOWED, files(), lines, SRC, text()

### Community 142 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 151 - "expirationNotice.service.js"
Cohesion: 0.06
Nodes (42): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+34 more)

### Community 153 - "workScope.service.js"
Cohesion: 0.11
Nodes (23): ALL, assertAnyInScope(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf(), WORK_HEADER (+15 more)

### Community 154 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 155 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 156 - "balanceReconciliation.service.js"
Cohesion: 0.25
Nodes (12): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations() (+4 more)

### Community 157 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 181 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

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

### Community 194 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 197 - "useAuth"
Cohesion: 0.06
Nodes (96): exportContractAPI(), useAuth(), useSocket(), SubCard(), ActionButton(), ConfirmDialog(), ContactsList(), ADR-0009 (+88 more)

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.17
Nodes (22): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), useConfig(), Footer(), Header(), ThemeModeSection() (+14 more)

### Community 199 - "workDashboard.service.js"
Cohesion: 0.11
Nodes (41): ADR-0011, moneyText(), percentText(), ratioPercent(), sumMoney(), getRuleValues(), ADVANCE_LEVELS, advanceBar() (+33 more)

### Community 201 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 203 - "ref_jest_globals"
Cohesion: 0.04
Nodes (27): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+19 more)

### Community 211 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 212 - "app.service.js"
Cohesion: 0.07
Nodes (29): assertModeUnchangedInUse(), httpError(), ADR-0010, providerTypesConfig, providerTypesService, getMenu(), getPagesMenu(), getSessionInfo() (+21 more)

### Community 217 - "@mui/material"
Cohesion: 0.04
Nodes (69): deleteProfileAPI(), paginationProfilesAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters(), WorkSection(), ProfilesPage (+61 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "dashboard.service.js"
Cohesion: 0.10
Nodes (40): scopeWhere(), todayDateOnly(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002 (+32 more)

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (5): assertInvoiceVisible, ctx, prismaMock, SCOPE, state

### Community 221 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 234 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

## Knowledge Gaps
- **1137 isolated node(s):** `CONTRACT_TYPES`, `SIMPLE_CAPTURED`, `CONTRACT_CAPTURED`, `TABS`, `ADR-0020` (+1132 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1566 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **105 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Why does `ADR-0002` connect `WorkChartsTab.jsx` to `contracts.service.js`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `themes/index.jsx`, `AuthForgotPassword.jsx`, `InvoiceFormPage.jsx`, `SocketProvider.jsx`, `ConceptDialog.jsx`, `client/package.json`, `ImageList.jsx`, `constants.js`, `menu-items/index.js`, `DocumentManagement.jsx`, `NotificationSection/index.jsx`, `DebouncedInput.jsx`, `PoliciesTab.jsx`, `WorkChartsTab.jsx`, `InvoicesPage.jsx`, `withAlpha`, `useAuth`, `MainLayout/index.jsx`, `EasyCrop.jsx`, `authContext.jsx`, `formatTime.js`, `MenuList/index.jsx`, `showError`, `ContactsEditor.jsx`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **What connects `CONTRACT_TYPES`, `SIMPLE_CAPTURED`, `CONTRACT_CAPTURED` to the rest of the system?**
  _1137 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractInvoiceTerms.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1349206349206349 - nodes in this community are weakly interconnected._
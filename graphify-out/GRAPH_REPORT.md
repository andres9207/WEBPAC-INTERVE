# Graph Report - WEBPAC-INTERVE  (2026-10-28)

## Corpus Check
- 683 files · ~386,956 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4207 nodes · 11970 edges · 241 communities (131 shown, 110 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 157 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `72532412`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- moneyText
- writeAudit
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- contracts.routes.js
- ContractsPage.jsx
- validation.utils.js
- auth.routes.js
- statements.service.js
- client/package.json
- identityDocuments.formats.js
- main.routes.js
- auth.service.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- seed.demo.js
- `tbl_users`
- idempotency.service.js
- contractReports.service.js
- contractSuspensions.service.test.js
- ContractDetailPage.jsx
- pagination.utils.js
- contracts.controller.test.js
- eslint.config.mjs
- menu-items/index.js
- providers.routes.js
- DocumentManagement.jsx
- `tbl_contract_concepts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- app.routes.js
- NotificationSection/index.jsx
- cron/index.js
- works.service.js
- permissions.constants.js
- devDependencies
- statements.routes.js
- status.constants.js
- scripts
- app.js
- `tbl_contracts`
- contracts.service.test.js
- uniqueConstraints.constants.test.js
- decimal
- contractLiquidation.service.test.js
- `tbl_contract_type_fields`
- constants.js
- transaction.mock.js
- scripts
- WorkChartsTab.jsx
- httpCliente.js
- compilerOptions
- excelJS.js
- addressTypes.service.js
- permission
- devDependencies
- transaction.service.test.js
- workDashboard.service.js
- invoiceFollowUps.service.test.js
- contractPolicies.service.js
- `tbl_contract_status_history`
- invoiceEvidence.service.test.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- fMoneyText
- statements.service.test.js
- MenuList/index.jsx
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- works.service.test.js
- error.middleware.js
- contracts.service.js
- `tbl_providers`
- error.middleware.test.js
- providerTypes.service.js
- floatingPoint.guard.test.js
- serviceWorker.jsx
- themes/index.jsx
- `tbl_providers`
- winston.config.js
- workScopeOf
- dashboard.service.test.js
- ContactsEditor.jsx
- contractFields.js
- simpleInvoiceTerms.js
- liquidationTerms.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- prismaClient.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- AuthForgotPassword.jsx
- contractEndDateReconciliation.service.js
- works.controller.test.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- PoliciesTab.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- invoiceTerms.js
- decisionReferences.guard.test.js
- ImageList.jsx
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- App.jsx
- MainLayout/index.jsx
- socket.js
- users.service.test.js
- src/index.jsx
- ref_jest_globals
- session.service.test.js
- useMenuCollapse.js
- master.service.test.js
- getEffectivePermissionIds
- `tbl_invoices`
- `tbl_invoices`
- @mui/material
- `tbl_statements`
- contractEndDateReconciliation.service.test.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- SearchSection
- permissions.routes.js
- `tbl_invoice_glosses`
- extends
- `tbl_works`
- contractNotifications.service.test.js
- `tbl_status`
- browserslist
- volta
- `tbl_users`
- `tbl_work_stages`

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
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `balances()` --calls--> `advanceBalances()`  [EXTRACTED]
  server/test/modules/billing/invoices/advanceFilters.test.js → server/src/modules/billing/invoices/advanceTerms.js
- `selectContractFilterStages()` --calls--> `scopeWhere()`  [EXTRACTED]
  server/src/modules/work/contracts/contracts.service.js → server/src/common/services/workScope.service.js
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js

## Import Cycles
- None detected.

## Communities (241 total, 110 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "moneyText"
Cohesion: 0.07
Nodes (61): moneyText(), server_src_common_utils_money_utils_percentfor, percentText(), sumMoney(), toPercent(), advanceBar(), advanceLevel(), balancesOf() (+53 more)

### Community 3 - "writeAudit"
Cohesion: 0.06
Nodes (82): AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0013, ADR-0027, protect(), REDACTED (+74 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (38): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+30 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (58): applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes(), assertTypeIds(), assertWorkAssignable() (+50 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.05
Nodes (67): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoicesApi (+59 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.04
Nodes (70): CONTRACT_PAIRS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, closeInvoiceFollowUpController, deleteInvoiceFollowUpController, deleteInvoiceGlossController, exportInvoicesController, getContractAdvanceController, getInvoiceController (+62 more)

### Community 9 - "contracts.routes.js"
Cohesion: 0.07
Nodes (43): moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), contractsRoutes, ADR-0006, ADR-0016 (+35 more)

### Community 10 - "ContractsPage.jsx"
Cohesion: 0.04
Nodes (84): getConstructionCompaniesSelectAPI, contractConceptsApi, contractLiquidationApi, contractsApi, exportContractsAPI(), getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI() (+76 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.08
Nodes (29): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0027 (+21 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (30): ADR-0001, THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController() (+22 more)

### Community 13 - "statements.service.js"
Cohesion: 0.07
Nodes (60): findExportRows(), assertInScope(), containsFilter(), dateRangeFilter(), filtersWhere(), idFilter(), statementGlosses(), statementsGlosses() (+52 more)

### Community 14 - "client/package.json"
Cohesion: 0.08
Nodes (23): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+15 more)

### Community 15 - "identityDocuments.formats.js"
Cohesion: 0.18
Nodes (10): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, identityDocumentsConfig, assertIdentification() (+2 more)

### Community 16 - "main.routes.js"
Cohesion: 0.08
Nodes (38): express, getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter() (+30 more)

### Community 17 - "auth.service.js"
Cohesion: 0.08
Nodes (36): bcrypt, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+28 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (23): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+15 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.15
Nodes (18): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+10 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.05
Nodes (93): ADR-0013, ADR-0020, ADR-0021, ADR-0023, ADR-0024, ADR-0027, isBillingType(), server_src_modules_billing_invoices_invoicemenus_issimplemode (+85 more)

### Community 22 - "seed.demo.js"
Cohesion: 0.06
Nodes (52): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+44 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "idempotency.service.js"
Cohesion: 0.13
Nodes (17): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), IDEMPOTENCY_HEADER, idempotencyMisuse(), keyReused(), requestFingerprint(), revokeSession() (+9 more)

### Community 25 - "contractReports.service.js"
Cohesion: 0.05
Nodes (81): scopeWhere(), todayDateOnly(), policyExpiringDays(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock(), invoicesWhere() (+73 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (22): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx, prismaMock (+14 more)

### Community 27 - "ContractDetailPage.jsx"
Cohesion: 0.06
Nodes (72): exportContractAPI(), changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, ContactsList(), ADR-0009, DataList() (+64 more)

### Community 28 - "pagination.utils.js"
Cohesion: 0.22
Nodes (11): countByStatus(), DEFAULT_ROWS, MAX_ROWS, paginate(), resolvePagination(), searchWhere(), toInt(), paginationStatements() (+3 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.04
Nodes (39): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+31 more)

### Community 30 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 32 - "providers.routes.js"
Cohesion: 0.09
Nodes (26): ASSIGNMENT_FIELDS, assignProviderController, checkIdentificationController, getProviderController, INPUT_FIELDS, notifyAssignment(), paginationWorkProvidersController, pick() (+18 more)

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

### Community 38 - "NotificationSection/index.jsx"
Cohesion: 0.50
Nodes (7): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf()

### Community 39 - "cron/index.js"
Cohesion: 0.13
Nodes (15): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+7 more)

### Community 40 - "works.service.js"
Cohesion: 0.08
Nodes (50): ADR-0007, ADR-0009, PROGRESS_WARNING, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted() (+42 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.07
Nodes (39): ADR-0012, ADR-0017, ADR-0019, ADR-0025, ADR-0026, ADR-0011, ADR-0016, ADR-0018 (+31 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "statements.routes.js"
Cohesion: 0.10
Nodes (27): sendExport(), handleExport(), exportStatementController, exportStatementGroupController, getStatementController, getStatementGroupReportController, getStatementReportController, handleExport() (+19 more)

### Community 45 - "status.constants.js"
Cohesion: 0.09
Nodes (26): ADR-0004, ACTIVE_STATUS, DELETED_STATUS, identityDocumentsService, deleteModuleDoc(), DOC_CREATE_IDEMPOTENCY, DOC_SELECT, DOC_SORT_FIELDS (+18 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.12
Nodes (14): `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users` (+6 more)

### Community 50 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (10): ctx, input(), ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock (+2 more)

### Community 51 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 52 - "decimal"
Cohesion: 0.08
Nodes (49): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent() (+41 more)

### Community 53 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "constants.js"
Cohesion: 0.05
Nodes (55): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), client_src_hooks_useinvoicemenus_useinvoicemenu, ProviderTypePage (+47 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (34): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+26 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkChartsTab.jsx"
Cohesion: 0.06
Nodes (77): useSchemePalette(), MainCard(), AlertChips(), contractAlertOptions(), InvoicesByWorkCard(), PolicyStatusCard(), ADVANCE_LEVELS, AdvanceBar() (+69 more)

### Community 59 - "httpCliente.js"
Cohesion: 0.06
Nodes (43): getStatusesByScopeAPI(), getWorkDashboardAPI(), ADR-0002, providersApi, getMyWorksSelectAPI(), genericRequest, instance, NO_REFRESH_URLS (+35 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.13
Nodes (13): ref_fs, ref_path, ref_url, catalog, expected, prismaMock, ADR-0027, loggerMock (+5 more)

### Community 68 - "workDashboard.service.js"
Cohesion: 0.05
Nodes (77): ADR-0011, addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), TERM_UNITS, termProgress() (+69 more)

### Community 70 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 71 - "contractPolicies.service.js"
Cohesion: 0.09
Nodes (40): AUDIT_ENTITIES, POLICY_BASE_NAMES, configurePolicyTypeBase(), httpError(), ADR-0019, policyTypesService, conceptLabel(), contractInvoices() (+32 more)

### Community 88 - "invoiceEvidence.service.test.js"
Cohesion: 0.40
Nodes (3): prismaMock, state, user

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (93): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, ADR-0019, policyTypesApi, reasonsApi (+85 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.08
Nodes (32): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+24 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "fMoneyText"
Cohesion: 0.05
Nodes (68): getDashboardSummaryAPI(), exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenus, StatusChip(), invoicePath() (+60 more)

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
Nodes (91): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI(), getModulesAPI() (+83 more)

### Community 117 - "export.service.js"
Cohesion: 0.05
Nodes (59): exceljs, ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile() (+51 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "contracts.service.js"
Cohesion: 0.06
Nodes (95): ADR-0006, ADR-0016, ADR-0018, newOperationId(), runIdempotent(), FIELD_GROUPS, typeAppliesAiu(), withContractAiu() (+87 more)

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "providerTypes.service.js"
Cohesion: 0.38
Nodes (6): assertModeUnchangedInUse(), httpError(), ADR-0010, providerTypesConfig, providerTypesService, server_src_modules_billing_invoices_invoicemenus_invoice_modes

### Community 125 - "floatingPoint.guard.test.js"
Cohesion: 0.29
Nodes (5): ALLOWED, files(), lines, SRC, text()

### Community 129 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 130 - "themes/index.jsx"
Cohesion: 0.17
Nodes (12): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage(), createCustomShadow() (+4 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 133 - "workScopeOf"
Cohesion: 0.08
Nodes (60): auditContext(), workScopeOf(), approveInvoiceController, cancelInvoiceController, createInvoiceGlossController, deleteInvoiceController, followUpAction(), glossAction() (+52 more)

### Community 134 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 136 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 137 - "contractFields.js"
Cohesion: 0.12
Nodes (16): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+8 more)

### Community 140 - "simpleInvoiceTerms.js"
Cohesion: 0.19
Nodes (13): previewSimpleInvoice(), blank(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023, ADR-0026, SIMPLE_FIELDS (+5 more)

### Community 142 - "liquidationTerms.js"
Cohesion: 0.11
Nodes (19): percentOf(), insuredValue(), ADR-0019, ADR-0026, policyBaseValue(), versionDto(), condition(), ADR-0017 (+11 more)

### Community 151 - "prismaClient.js"
Cohesion: 0.06
Nodes (49): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+41 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.35
Nodes (10): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), getNotificationCount(), listNotifications(), markAllAsRead(), markAsRead() (+2 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 155 - "AuthForgotPassword.jsx"
Cohesion: 0.05
Nodes (43): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI() (+35 more)

### Community 156 - "contractEndDateReconciliation.service.js"
Cohesion: 0.20
Nodes (15): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), contractEndDateReconciliationJob, insertNotification(), balanceViolations(), CHECKS (+7 more)

### Community 157 - "works.controller.test.js"
Cohesion: 0.29
Nodes (5): emit, getEffectivePermissionIds, SCOPE, serviceMock, workScopeOf

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "PoliciesTab.jsx"
Cohesion: 0.13
Nodes (20): contractPoliciesApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, complete(), PercentField(), toText(), toValue(), ADR-0018 (+12 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "invoiceTerms.js"
Cohesion: 0.06
Nodes (40): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+32 more)

### Community 181 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 183 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

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

### Community 197 - "App.jsx"
Cohesion: 0.28
Nodes (8): refreshSession(), App(), ThemedToastContainer(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.14
Nodes (25): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), useConfig(), Footer(), Header(), ProfileSection() (+17 more)

### Community 199 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 201 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 202 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 203 - "ref_jest_globals"
Cohesion: 0.06
Nodes (18): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+10 more)

### Community 204 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 211 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 212 - "getEffectivePermissionIds"
Cohesion: 0.07
Nodes (30): getEffectivePermissionIds(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes, ADR-0002, getMenu(), getPagesMenu() (+22 more)

### Community 217 - "@mui/material"
Cohesion: 0.05
Nodes (67): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+59 more)

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

### Community 222 - "SearchSection"
Cohesion: 1.00
Nodes (3): HeaderAvatar(), MobileSearch(), SearchSection()

### Community 224 - "permissions.routes.js"
Cohesion: 0.15
Nodes (16): getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController(), permissionsRoutes (+8 more)

### Community 227 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 233 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 235 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 237 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **1135 isolated node(s):** `axios`, `@azure/identity`, `bcrypt`, `compression`, `cookie-parser` (+1130 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1569 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **110 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@mui/material` connect `@mui/material` to `themes/index.jsx`, `server/package.json`, `InvoiceFormPage.jsx`, `ContactsEditor.jsx`, `ContractsPage.jsx`, `client/package.json`, `ContractDetailPage.jsx`, `AuthForgotPassword.jsx`, `DocumentManagement.jsx`, `NotificationSection/index.jsx`, `PoliciesTab.jsx`, `constants.js`, `ImageList.jsx`, `WorkChartsTab.jsx`, `httpCliente.js`, `withAlpha`, `App.jsx`, `MainLayout/index.jsx`, `useAuth`, `fMoneyText`, `MenuList/index.jsx`, `showError`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Why does `ADR-0017` connect `permissions.constants.js` to `contracts.service.js`, `invoices.service.js`, `InvoiceFormPage.jsx`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **What connects `axios`, `@azure/identity`, `bcrypt` to the rest of the system?**
  _1135 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `moneyText` be split into smaller, more focused modules?**
  _Cohesion score 0.07010402532790593 - nodes in this community are weakly interconnected._
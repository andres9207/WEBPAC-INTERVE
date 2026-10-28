# Graph Report - WEBPAC-INTERVE  (2026-10-28)

## Corpus Check
- 683 files · ~390,108 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4222 nodes · 12018 edges · 250 communities (137 shown, 113 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 157 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `84f47dd2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- moneyText
- audit.service.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- contracts.routes.js
- ConceptDialog.jsx
- validation.utils.js
- auth.routes.js
- statements.service.js
- client/package.json
- httpCliente.js
- getIO
- transaction.service.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- seed.demo.js
- `tbl_users`
- contracts.service.js
- contractPolicies.service.js
- contractSuspensions.service.test.js
- ContractDetailPage.jsx
- profiles.service.js
- invoices.controller.test.js
- invoiceGlosses.service.js
- menu-items/index.js
- providers.routes.js
- DocumentManagement.jsx
- `tbl_contract_concepts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- app.routes.js
- workScopeOf
- cron/index.js
- works.service.js
- master.service.js
- devDependencies
- statements.routes.js
- users.service.js
- scripts
- app.js
- `tbl_contracts`
- workDashboard.service.js
- uniqueConstraints.constants.test.js
- decimal
- contractLiquidation.service.test.js
- `tbl_contract_type_fields`
- react-router-dom
- transaction.mock.js
- scripts
- WorkChartsTab.jsx
- NotificationSection/index.jsx
- compilerOptions
- excelJS.js
- permissions.constants.js
- permission
- devDependencies
- transaction.service.test.js
- auth.service.js
- policyTerms.js
- AdvanceAmountsSection.jsx
- `tbl_contract_status_history`
- invoiceEvidence.service.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- fMoneyText
- statements.service.test.js
- constants.js
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- works.service.test.js
- error.middleware.js
- contractConcepts.service.js
- `tbl_providers`
- error.middleware.test.js
- contractEndDateReconciliation.service.js
- dashboard.service.js
- serviceWorker.jsx
- themes/index.jsx
- `tbl_providers`
- winston.config.js
- SocketProvider.jsx
- dashboard.service.test.js
- ContactsEditor.jsx
- contractFields.js
- eslint.config.mjs
- MenuList/index.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- AuthForgotPassword.jsx
- contracts.controller.test.js
- prismaClient.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- businessRules.service.js
- `tbl_users`
- balanceReconciliation.service.test.js
- advanceFilters.js
- decisionReferences.guard.test.js
- idempotency.service.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- contractConcepts.service.test.js
- MainLayout/index.jsx
- workDashboard.service.test.js
- auth.service.test.js
- src/index.jsx
- expirationNotice.service.test.js
- session.service.test.js
- permissions.service.js
- ref_jest_globals
- status.constants.js
- `tbl_invoices`
- `tbl_invoices`
- @mui/material
- `tbl_statements`
- contractEndDateReconciliation.service.test.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- invoiceFollowUps.service.test.js
- app.service.test.js
- `tbl_invoice_glosses`
- extends
- `tbl_works`
- contractNotifications.service.test.js
- `tbl_status`
- InputLabel.jsx
- dashboard.measure.js
- `tbl_users`
- `tbl_work_stages`
- ImageList.jsx
- addressTypes.contacts.js
- policyTypes.service.test.js
- DebouncedInput.jsx
- browserslist
- volta
- useMenuCollapse.js
- EasyCrop.jsx
- volta

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 152 edges
2. `react` - 118 edges
3. `showError()` - 100 edges
4. `workScopeOf()` - 88 edges
5. `moneyText()` - 83 edges
6. `writeAudit()` - 80 edges
7. `dateOnlyText()` - 80 edges
8. `useAuth()` - 79 edges
9. `withLockedTransaction()` - 77 edges
10. `showSuccess()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `InvoicesPage()` --indirect_call--> `exportInvoicesAPI()`  [INFERRED]
  client/src/views/billing/invoices/InvoicesPage.jsx → client/src/api/requests/invoicesApi.js
- `percentQuery()` --calls--> `decimal()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/money.utils.js
- `glossRules()` --calls--> `optionalText()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/validation.utils.js
- `ContractsPage()` --indirect_call--> `exportContractsAPI()`  [INFERRED]
  client/src/views/work/contracts/ContractsPage.jsx → client/src/api/requests/contractsApi.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js

## Import Cycles
- None detected.

## Communities (250 total, 113 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "moneyText"
Cohesion: 0.07
Nodes (65): ref_node_fs, moneyText(), percentOf(), percentText(), toMoney(), toPercent(), assertContractTotal(), blank() (+57 more)

### Community 3 - "audit.service.js"
Cohesion: 0.18
Nodes (13): auditMisuse(), buildRows(), ADR-0013, ADR-0027, protect(), SENSITIVE_FIELDS, STANDALONE_EVENTS, toText() (+5 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (33): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+25 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (62): ADR-0009, userFullName(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes() (+54 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.05
Nodes (61): exportInvoicesAPI(), getInvoiceContractsSelectAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi (+53 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.04
Nodes (77): CONTRACT_PAIRS, CONTRACT_TAX_FIELDS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController, deleteInvoiceController (+69 more)

### Community 9 - "contracts.routes.js"
Cohesion: 0.08
Nodes (42): moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), ADR-0006, ADR-0016, ADR-0017 (+34 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (52): contractConceptsApi, contractLiquidationApi, exportContractsAPI(), getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI() (+44 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.07
Nodes (42): express-validator, EDITABLE_STATUS_VALUES, requirePermission(), validate(), hasEffectivePermission(), canViewAllWorks(), createMasterControllers(), createMasterRouter() (+34 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.13
Nodes (23): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+15 more)

### Community 13 - "statements.service.js"
Cohesion: 0.09
Nodes (47): statementGlosses(), statementsGlosses(), statementInvoices(), statementsInvoices(), toListDto(), amountColumnsOf(), amountTotalsOf(), assertUniqueNumber() (+39 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+13 more)

### Community 15 - "httpCliente.js"
Cohesion: 0.05
Nodes (46): getStatusesByScopeAPI(), deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), paginationUsersAPI() (+38 more)

### Community 16 - "getIO"
Cohesion: 0.07
Nodes (37): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), getIO(), setIO(), verifyToken() (+29 more)

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
Cohesion: 0.16
Nodes (19): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+11 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.05
Nodes (96): ADR-0013, ADR-0021, ADR-0023, CONTRACT_TAX_MONEY_COLUMNS, CONTRACT_TAX_PERCENT_COLUMNS, server_src_modules_billing_invoices_invoicemenus_issimplemode, server_src_modules_billing_invoices_invoicemenus_simple_type_where, adjustableAmount() (+88 more)

### Community 22 - "seed.demo.js"
Cohesion: 0.06
Nodes (52): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+44 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "contracts.service.js"
Cohesion: 0.05
Nodes (67): ADR-0006, ADR-0016, ADR-0018, findExportRows(), renderExport(), server_src_common_utils_money_utils_percentfor, toDateOnly(), contractsWithPendingAdvanceWhere() (+59 more)

### Community 25 - "contractPolicies.service.js"
Cohesion: 0.04
Nodes (86): sumMoney(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, policyBaseValue(), server_src_modules_billing_invoices_invoicemenus_iscontractmode (+78 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.05
Nodes (27): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+19 more)

### Community 27 - "ContractDetailPage.jsx"
Cohesion: 0.05
Nodes (82): exportContractAPI(), getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), ADR-0012, providersApi, workProvidersApi, getProviderTypesSelectAPI, changeWorkStateAPI() (+74 more)

### Community 28 - "profiles.service.js"
Cohesion: 0.16
Nodes (22): containsFilter(), countByStatus(), dateRangeFilter(), DEFAULT_ROWS, filtersWhere(), idFilter(), paginate(), resolvePagination() (+14 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "invoiceGlosses.service.js"
Cohesion: 0.11
Nodes (49): assertNotCancelled(), auditable(), AUDITED, closeFollowUp(), deleteFollowUp(), findLockedInvoice(), findLockedOpen(), FOLLOW_UP_SELECT (+41 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.09
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

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

### Community 38 - "workScopeOf"
Cohesion: 0.06
Nodes (67): auditContext(), getEffectivePermissionIds(), sendExport(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes (+59 more)

### Community 39 - "cron/index.js"
Cohesion: 0.19
Nodes (10): node-cron, cronJobs, ADR-0017, registeredTasks, startCronJobs(), wrapHandler(), contractBalanceReconciliationJob, contractEndDateReconciliationJob (+2 more)

### Community 40 - "works.service.js"
Cohesion: 0.07
Nodes (59): ADR-0007, addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress() (+51 more)

### Community 41 - "master.service.js"
Cohesion: 0.07
Nodes (33): INACTIVE_STATUS, capitalize(), createMasterService(), defineMaster(), httpError(), ADR-0003, ADR-0004, ADR-0013 (+25 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "statements.routes.js"
Cohesion: 0.14
Nodes (18): invoicesRoutes, canView, statementsRoutes, changeStatementStatusSchema, deleteStatementSchema, exportStatementGroupSchema, exportStatementSchema, getStatementGroupReportSchema (+10 more)

### Community 45 - "users.service.js"
Cohesion: 0.09
Nodes (24): ADR-0001, ADR-0004, USER_NAME_SELECT, DIAN_WEIGHTS, GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008 (+16 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "app.js"
Cohesion: 0.11
Nodes (15): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, allowedHosts (+7 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.12
Nodes (14): `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users` (+6 more)

### Community 50 - "workDashboard.service.js"
Cohesion: 0.11
Nodes (35): ADR-0011, ADVANCE_LEVELS, advanceBar(), advanceLevel(), alertsOf(), balancesOf(), byUrgency(), conceptLabel() (+27 more)

### Community 51 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 52 - "decimal"
Cohesion: 0.07
Nodes (58): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent() (+50 more)

### Community 53 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "react-router-dom"
Cohesion: 0.06
Nodes (56): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, getMyWorksSelectAPI(), pickWork(), useWorkScope(), WorkScopeContext, WorkScopeProvider() (+48 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkChartsTab.jsx"
Cohesion: 0.05
Nodes (101): useSchemePalette(), AlertChips(), contractAlertOptions(), fPercentText(), PolicyStatusCard(), ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter() (+93 more)

### Community 59 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "permissions.constants.js"
Cohesion: 0.10
Nodes (25): ADR-0012, ADR-0019, ADR-0025, ADR-0026, ADR-0011, ADR-0016, ADR-0018, PERMISSIONS (+17 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "auth.service.js"
Cohesion: 0.13
Nodes (20): bcrypt, REDACTED, comparePassword(), hashPassword(), generateResetCode(), ACCOUNT_FIELDS, anonymous(), clearFailedLogins() (+12 more)

### Community 70 - "policyTerms.js"
Cohesion: 0.18
Nodes (17): contractPolicyStatuses(), contractListQuery(), assertPolicyStatus(), CONTRACT_POLICY_STATUS, contractPolicyStatus(), decidingPolicy(), ADR-0002, ADR-0018 (+9 more)

### Community 71 - "AdvanceAmountsSection.jsx"
Cohesion: 0.09
Nodes (37): getContractAdvanceAPI(), previewContractInvoiceAPI(), previewSimpleInvoiceAPI(), AmountPercentField(), isZero(), MoneyField(), complete(), PercentField() (+29 more)

### Community 88 - "invoiceEvidence.service.js"
Cohesion: 0.13
Nodes (16): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+8 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.02
Nodes (108): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), configurePolicyTypeBaseAPI(), ADR-0019 (+100 more)

### Community 100 - "works.routes.js"
Cohesion: 0.10
Nodes (28): managedWhere(), resolveWorkScope(), selectMyWorks(), exportFormatRule(), changeWorkStateController, changeWorkStatusController, deleteWorkController, exportWorksController (+20 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "fMoneyText"
Cohesion: 0.07
Nodes (32): exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), StatementsPage, ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog() (+24 more)

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "constants.js"
Cohesion: 0.05
Nodes (46): contractsApi, getContractMenuAPI(), getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, TooltipLongText(), CONTRACT_ADVANCE_FILTER_OPTIONS (+38 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.07
Nodes (73): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), contractPoliciesApi, suspendContractAPI(), getInsurersSelectAPI, getPolicyTypesSelectAPI, getReasonsSelectAPI() (+65 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (50): exceljs, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+42 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "contractConcepts.service.js"
Cohesion: 0.06
Nodes (107): AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields(), newOperationId(), writeAudit(), runIdempotent(), withLockedTransaction(), assertInScope() (+99 more)

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "contractEndDateReconciliation.service.js"
Cohesion: 0.22
Nodes (13): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), CHECKS, findBalanceViolations(), runBalanceReconciliation() (+5 more)

### Community 125 - "dashboard.service.js"
Cohesion: 0.24
Nodes (17): scopeWhere(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002, notDeleted (+9 more)

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

### Community 133 - "SocketProvider.jsx"
Cohesion: 0.20
Nodes (11): refreshSession(), App(), ThemedToastContainer(), AuthContext, NavigationScroll(), SocketContext, SocketProvider(), pathSocket (+3 more)

### Community 134 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 136 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 137 - "contractFields.js"
Cohesion: 0.26
Nodes (11): AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+3 more)

### Community 140 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 142 - "MenuList/index.jsx"
Cohesion: 0.24
Nodes (10): getMenuAPI(), ElevationScroll(), HorizontalBar(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts (+2 more)

### Community 151 - "expirationNotice.service.js"
Cohesion: 0.19
Nodes (20): todayDateOnly(), contractAlertWheres(), CONTRACT_ALERTS, addDays(), alreadyNotified(), buildNotices(), contractsWithExpiredPoliciesWhere(), contractsWithExpiringPoliciesWhere() (+12 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.21
Nodes (15): express, getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount() (+7 more)

### Community 154 - "mailerService.js"
Cohesion: 0.22
Nodes (10): imap-simple, nodemailer, emailApp, nameApp, nameAppMail, checkEmailBounces(), saveToSent(), sendEmail() (+2 more)

### Community 155 - "AuthForgotPassword.jsx"
Cohesion: 0.06
Nodes (41): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), client_src_assets_images_interadminpro (+33 more)

### Community 156 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 157 - "prismaClient.js"
Cohesion: 0.21
Nodes (9): ref_http, app, server, adapter, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+1 more)

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "businessRules.service.js"
Cohesion: 0.09
Nodes (29): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+21 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "advanceFilters.js"
Cohesion: 0.15
Nodes (14): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+6 more)

### Community 181 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 183 - "idempotency.service.js"
Cohesion: 0.21
Nodes (10): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), IDEMPOTENCY_HEADER, idempotencyMisuse(), keyReused(), requestFingerprint(), deleteModuleDoc() (+2 more)

### Community 190 - "invariants.check.js"
Cohesion: 0.16
Nodes (11): dotenv, prisma, CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS (+3 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 194 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 197 - "contractConcepts.service.test.js"
Cohesion: 0.17
Nodes (6): ctx, ADR-0016, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.16
Nodes (22): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), useConfig(), Footer(), Header(), ThemeModeSection() (+14 more)

### Community 199 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): percent(), ALL, CONCEPTS, CONTRACT, OWN, prismaMock

### Community 201 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 202 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 203 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 204 - "session.service.test.js"
Cohesion: 0.14
Nodes (10): ref_crypto, deriveKey(), hashResetCode(), ADR-0001, verifyResetCode(), dbUser, mockDisconnectSockets, mockIn (+2 more)

### Community 206 - "permissions.service.js"
Cohesion: 0.24
Nodes (5): auditPermissionChanges(), ADR-0013, ADR-0027, updateProfilePermissions(), updateUserPermissions()

### Community 211 - "ref_jest_globals"
Cohesion: 0.05
Nodes (22): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, payload, hasEffectivePermission, prismaMock, state (+14 more)

### Community 212 - "status.constants.js"
Cohesion: 0.07
Nodes (39): prisma, ACTIVE_STATUS, DELETED_STATUS, ALL, assertAnyInScope(), httpError(), inScope(), scopeOf() (+31 more)

### Community 217 - "@mui/material"
Cohesion: 0.07
Nodes (43): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, invoiceTransitionsApi, getAssignableWorksAPI(), getProvidersSelectAPI(), getSupervisionTypesSelectAPI, getWorksSummaryAPI(), defaultConfig (+35 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (6): assertInvoiceVisible, ctx, getInvoice, prismaMock, SCOPE, state

### Community 221 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 222 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 224 - "app.service.test.js"
Cohesion: 0.22
Nodes (6): BILLING, CONTRACTS, DASHBOARD, HOME, prismaMock, state

### Community 227 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 233 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 237 - "dashboard.measure.js"
Cohesion: 0.43
Nodes (7): captured, explain(), main(), measure(), parseParams(), percentile(), plain()

### Community 241 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 242 - "addressTypes.contacts.js"
Cohesion: 0.47
Nodes (5): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText()

### Community 243 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 245 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 246 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 249 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **1141 isolated node(s):** `ADR-0017`, `STATUS_TABS`, `CONTRACT_ALERT_OPTIONS`, `CONTRACT_INVOICE_TYPES`, `TERM_UNIT_NAMES` (+1136 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1576 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **113 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `ADR-0002` connect `WorkChartsTab.jsx` to `contracts.service.js`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `themes/index.jsx`, `SocketProvider.jsx`, `InvoiceFormPage.jsx`, `ContactsEditor.jsx`, `ConceptDialog.jsx`, `client/package.json`, `MenuList/index.jsx`, `httpCliente.js`, `ContractDetailPage.jsx`, `AuthForgotPassword.jsx`, `menu-items/index.js`, `DocumentManagement.jsx`, `react-router-dom`, `WorkChartsTab.jsx`, `NotificationSection/index.jsx`, `withAlpha`, `MainLayout/index.jsx`, `AdvanceAmountsSection.jsx`, `useAuth`, `fMoneyText`, `InputLabel.jsx`, `constants.js`, `ImageList.jsx`, `showError`, `DebouncedInput.jsx`, `EasyCrop.jsx`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **What connects `ADR-0017`, `STATUS_TABS`, `CONTRACT_ALERT_OPTIONS` to the rest of the system?**
  _1141 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `moneyText` be split into smaller, more focused modules?**
  _Cohesion score 0.0656140350877193 - nodes in this community are weakly interconnected._
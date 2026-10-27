# Graph Report - WEBPAC-INTERVE  (2026-10-27)

## Corpus Check
- 677 files · ~381,300 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4145 nodes · 11720 edges · 234 communities (131 shown, 103 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 155 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `98110a6f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- WorksPage.jsx
- AuthenticationRoutes.jsx
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- contracts.routes.js
- ConceptDialog.jsx
- works.routes.js
- auth.routes.js
- statements.service.js
- client/package.json
- users.service.js
- main.routes.js
- auth.service.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- ImageList.jsx
- `tbl_users`
- socket.js
- writeAudit
- contractSuspensions.service.test.js
- NewProviderDialog.jsx
- contractReports.service.js
- contracts.controller.test.js
- PolicyTypePage.jsx
- menu-items/index.js
- providers.routes.js
- DocumentManagement.jsx
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- ExportButton.jsx
- NotificationSection/index.jsx
- cron/index.js
- works.service.js
- permissions.constants.js
- devDependencies
- src/index.jsx
- getIO
- scripts
- app.js
- `tbl_invoices`
- ContractDetailPage.jsx
- uniqueConstraints.constants.test.js
- decimal
- contractLiquidation.service.test.js
- `tbl_contract_type_fields`
- invoiceTerms.js
- transaction.mock.js
- scripts
- WorkChartsTab.jsx
- constants.js
- compilerOptions
- excelJS.js
- contractTerms.js
- permission
- devDependencies
- transaction.service.test.js
- WorkContracts.jsx
- moneyText
- statements.routes.js
- `tbl_contract_status_history`
- invoiceEvidence.service.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScopeOf
- `tbl_provider_types`
- httpCliente.js
- statements.service.test.js
- MenuList/index.jsx
- `tbl_works`
- `tbl_policies`
- @mui/material
- export.service.js
- transaction.service.js
- error.middleware.js
- contracts.service.js
- `tbl_providers`
- error.middleware.test.js
- contractFields.js
- GeneralDashboard.jsx
- serviceWorker.jsx
- themes/index.jsx
- `tbl_providers`
- approveInvoice
- session.service.test.js
- AuthForgotPassword.jsx
- App.jsx
- seed.demo.js
- ForgotPassword.jsx
- extends
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- browserslist
- balanceReconciliation.service.js
- contractNotifications.service.test.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- constant.js
- `tbl_users`
- balanceReconciliation.service.test.js
- contractConcepts.service.test.js
- decisionReferences.guard.test.js
- invoiceFollowUps.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- WorkDetailPage.jsx
- MainLayout/index.jsx
- money.utils.js
- dashboard.service.test.js
- contractEndDateReconciliation.service.test.js
- ref_jest_globals
- liquidationTerms.js
- works.controller.test.js
- users.service.test.js
- app.service.js
- `tbl_invoices`
- `tbl_invoices`
- ref_prop_types
- `tbl_statements`
- workDashboard.service.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- WorkSummaryTab.jsx
- permissions.controller.test.js
- WorkCosts.jsx
- `tbl_works`
- auth.service.test.js
- policyTypes.service.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 150 edges
2. `react` - 117 edges
3. `showError()` - 98 edges
4. `workScopeOf()` - 84 edges
5. `writeAudit()` - 80 edges
6. `dateOnlyText()` - 79 edges
7. `useAuth()` - 79 edges
8. `withLockedTransaction()` - 77 edges
9. `moneyText()` - 71 edges
10. `showSuccess()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `updateThemeMode()` --calls--> `withTransaction()`  [EXTRACTED]
  server/src/modules/auth/auth.service.js → server/src/common/services/transaction.service.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `percentQuery()` --calls--> `decimal()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/money.utils.js

## Import Cycles
- None detected.

## Communities (234 total, 103 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "WorksPage.jsx"
Cohesion: 0.15
Nodes (15): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, exportWorksAPI(), createMasterApi(), WorksPage, WORK_STATE_OPTIONS, WorkDataForm() (+7 more)

### Community 3 - "AuthenticationRoutes.jsx"
Cohesion: 0.19
Nodes (10): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router, MainRoutes (+2 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.04
Nodes (44): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+36 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (63): ADR-0009, userFullName(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope() (+55 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (57): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, ADR-0017 (+49 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.04
Nodes (70): server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_contract_pairs, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, closeInvoiceFollowUpController, deleteInvoiceFollowUpController, deleteInvoiceGlossController, exportInvoicesController (+62 more)

### Community 9 - "contracts.routes.js"
Cohesion: 0.07
Nodes (43): moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), previewContractConceptController, ADR-0006, ADR-0016 (+35 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (52): contractConceptsApi, contractLiquidationApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006 (+44 more)

### Community 11 - "works.routes.js"
Cohesion: 0.09
Nodes (28): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0027 (+20 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.05
Nodes (76): INACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent() (+68 more)

### Community 14 - "client/package.json"
Cohesion: 0.06
Nodes (38): compat, __dirname, __filename, name, packageManager, private, version, volta (+30 more)

### Community 15 - "users.service.js"
Cohesion: 0.09
Nodes (27): ADR-0004, DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, identityDocumentsRoutes (+19 more)

### Community 16 - "main.routes.js"
Cohesion: 0.05
Nodes (55): express, STATUS_KEYS, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers() (+47 more)

### Community 17 - "auth.service.js"
Cohesion: 0.11
Nodes (24): bcrypt, REDACTED, comparePassword(), hashPassword(), deriveKey(), generateResetCode(), hashResetCode(), ADR-0001 (+16 more)

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
Nodes (59): ADR-0013, ADR-0021, ADR-0023, server_src_common_utils_money_utils_percentfor, matchesContractAdvance(), server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_money_columns (+51 more)

### Community 22 - "ImageList.jsx"
Cohesion: 0.31
Nodes (6): setParentOpenedMenu(), useMenuCollapse(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 25 - "writeAudit"
Cohesion: 0.07
Nodes (68): ADR-0001, ref_crypto, AUDIT_ENTITIES, auditMisuse(), buildRows(), ADR-0013, ADR-0027, protect() (+60 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.05
Nodes (27): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+19 more)

### Community 27 - "NewProviderDialog.jsx"
Cohesion: 0.07
Nodes (41): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, getProviderTypeFieldsAPI() (+33 more)

### Community 28 - "contractReports.service.js"
Cohesion: 0.08
Nodes (38): sumMoney(), insuredValue(), policyBaseValue(), toLiquidateOf(), server_src_modules_billing_invoices_invoicemenus_iscontractmode, contractInvoicesForReport(), versionDto(), ADVANCE_COLUMNS (+30 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.04
Nodes (39): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+31 more)

### Community 30 - "PolicyTypePage.jsx"
Cohesion: 0.16
Nodes (14): configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, PolicyTypePage, POLICY_BASE_OPTIONS, policyBaseName(), ConfigureBaseDialog(), ADR-0019 (+6 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.09
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 32 - "providers.routes.js"
Cohesion: 0.07
Nodes (42): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+34 more)

### Community 33 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "ExportButton.jsx"
Cohesion: 0.46
Nodes (6): download(), downloadExport(), errorMessage(), EXPORT_FORMATS, ExportButton(), ExportDialog()

### Community 38 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 39 - "cron/index.js"
Cohesion: 0.11
Nodes (18): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+10 more)

### Community 40 - "works.service.js"
Cohesion: 0.08
Nodes (54): ADR-0007, assertInScope(), defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), selectStatements() (+46 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.06
Nodes (44): ADR-0012, ADR-0017, ADR-0019, ADR-0025, ADR-0026, ADR-0011, ADR-0016, ADR-0018 (+36 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "getIO"
Cohesion: 0.09
Nodes (25): getIO(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, configurePolicyTypeBaseController, configurePolicyTypeBase(), httpError() (+17 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "ContractDetailPage.jsx"
Cohesion: 0.07
Nodes (45): contractPoliciesApi, exportContractAPI(), getInsurersSelectAPI, getPolicyTypesSelectAPI, DateField(), toDate(), fTerm(), TERM_UNIT_OPTIONS (+37 more)

### Community 51 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 52 - "decimal"
Cohesion: 0.09
Nodes (47): @prisma/client, decimal(), ratioText(), roundMoney(), invoiceAdvanceWhere(), advanceBalances(), appliedPct(), assertAdvanceCancellable() (+39 more)

### Community 53 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "invoiceTerms.js"
Cohesion: 0.10
Nodes (25): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, isAdvance, ADR-0024, registered (+17 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (28): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+20 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkChartsTab.jsx"
Cohesion: 0.10
Nodes (35): advanceDrill(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf(), drillLinkSx, Empty() (+27 more)

### Community 59 - "constants.js"
Cohesion: 0.04
Nodes (66): contractsApi, exportContractsAPI(), getContractMenuAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), invoicesApi, client_src_hooks_useinvoicemenus (+58 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "contractTerms.js"
Cohesion: 0.09
Nodes (33): getInvoice(), daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation(), conceptDto(), conceptsDto(), previewContractConcept() (+25 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "WorkContracts.jsx"
Cohesion: 0.16
Nodes (28): AlertChips(), contractAlertOptions(), fPercentText(), ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter(), AdvanceLegend(), matchesAdvanceFilter() (+20 more)

### Community 70 - "moneyText"
Cohesion: 0.10
Nodes (37): moneyText(), percentText(), ratioPercent(), toPercent(), advanceBar(), balancesOf(), costStatus(), executedBlock() (+29 more)

### Community 71 - "statements.routes.js"
Cohesion: 0.12
Nodes (21): sendExport(), exportFormatRule(), handleExport(), exportStatementController, getStatementController, getStatementReportController, handleExport(), paginationStatementsController (+13 more)

### Community 88 - "invoiceEvidence.service.js"
Cohesion: 0.15
Nodes (14): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+6 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (97): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), deleteProfileAPI(), paginationProfilesAPI() (+89 more)

### Community 100 - "workScopeOf"
Cohesion: 0.07
Nodes (67): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, approveInvoiceController, cancelInvoiceController (+59 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "httpCliente.js"
Cohesion: 0.06
Nodes (47): getWorkDashboardAPI(), exportStatementAPI(), getStatementReportAPI(), statementsApi, getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient (+39 more)

### Community 108 - "statements.service.test.js"
Cohesion: 0.18
Nodes (6): ctx, OTHER, OWN, prismaMock, state, statementInvoices

### Community 112 - "MenuList/index.jsx"
Cohesion: 0.24
Nodes (10): getMenuAPI(), ElevationScroll(), HorizontalBar(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts (+2 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "@mui/material"
Cohesion: 0.06
Nodes (75): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), suspendContractAPI(), invoiceTransitionsApi, getModulesAPI(), getProfilesAPI(), saveProfileAPI() (+67 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (58): exceljs, ref_node_fs, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument() (+50 more)

### Community 118 - "transaction.service.js"
Cohesion: 0.22
Nodes (12): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+4 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "contracts.service.js"
Cohesion: 0.04
Nodes (144): ADR-0006, ADR-0016, ADR-0018, ADR-0027, main(), AUDIT_OPERATIONS, diffFields(), newOperationId() (+136 more)

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "contractFields.js"
Cohesion: 0.13
Nodes (15): AIU_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, ADR-0026 (+7 more)

### Community 125 - "GeneralDashboard.jsx"
Cohesion: 0.18
Nodes (18): getDashboardSummaryAPI(), ADR-0002, client_src_hooks_useinvoicemenus_useinvoicemenus, headerStyle, MainCard(), AlertsCard(), Empty(), LatestInvoicesCard() (+10 more)

### Community 129 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 130 - "themes/index.jsx"
Cohesion: 0.15
Nodes (13): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage(), createCustomShadow() (+5 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "approveInvoice"
Cohesion: 0.18
Nodes (26): approveInvoice(), assertContractAdmitsCancel(), assertStage(), assertUniqueNumber(), assertWork(), auditable(), cancelInvoice(), createContractInvoice() (+18 more)

### Community 133 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 134 - "AuthForgotPassword.jsx"
Cohesion: 0.24
Nodes (13): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber(), hasSpecial() (+5 more)

### Community 136 - "App.jsx"
Cohesion: 0.17
Nodes (14): loginAPI(), logoutAPI(), updateThemeModeAPI(), verifyTokenAPI(), refreshSession(), App(), ThemedToastContainer(), AuthContext (+6 more)

### Community 137 - "seed.demo.js"
Cohesion: 0.05
Nodes (63): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+55 more)

### Community 140 - "ForgotPassword.jsx"
Cohesion: 0.22
Nodes (10): client_src_assets_images_interadminpro, LoginPage, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthWrapper1 (+2 more)

### Community 142 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 151 - "expirationNotice.service.js"
Cohesion: 0.07
Nodes (46): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+38 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 155 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 156 - "balanceReconciliation.service.js"
Cohesion: 0.30
Nodes (9): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), balanceViolations(), CHECKS, findBalanceViolations(), runBalanceReconciliation() (+1 more)

### Community 157 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "constant.js"
Cohesion: 0.19
Nodes (14): appDrawerWidth, gridSpacing, CardSecondaryAction(), SubCard(), Avatar(), DashboardCards(), Indicator(), ADR-0002 (+6 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "contractConcepts.service.test.js"
Cohesion: 0.17
Nodes (6): ctx, ADR-0016, ADR-0027, notifyWorkManagers, prismaMock, state

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

### Community 197 - "WorkDetailPage.jsx"
Cohesion: 0.06
Nodes (69): getStatusesByScopeAPI(), changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, InvoiceDetailPage, ContactsList(), ADR-0009 (+61 more)

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.17
Nodes (22): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), useConfig(), Footer(), Header(), ThemeModeSection() (+14 more)

### Community 199 - "money.utils.js"
Cohesion: 0.11
Nodes (18): HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ROUNDING, roundRatio(), toMoney() (+10 more)

### Community 201 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 202 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 203 - "ref_jest_globals"
Cohesion: 0.04
Nodes (27): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+19 more)

### Community 204 - "liquidationTerms.js"
Cohesion: 0.13
Nodes (15): percentOf(), amountPairOf(), condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024 (+7 more)

### Community 206 - "works.controller.test.js"
Cohesion: 0.29
Nodes (5): emit, getEffectivePermissionIds, SCOPE, serviceMock, workScopeOf

### Community 211 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 212 - "app.service.js"
Cohesion: 0.07
Nodes (29): assertModeUnchangedInUse(), httpError(), ADR-0010, providerTypesConfig, providerTypesService, getMenu(), getPagesMenu(), getSessionInfo() (+21 more)

### Community 217 - "ref_prop_types"
Cohesion: 0.10
Nodes (29): getAddressTypesSelectAPI, getWorksSummaryAPI(), ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), channelsOf(), ContactDialog() (+21 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "workDashboard.service.js"
Cohesion: 0.05
Nodes (97): ADR-0011, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+89 more)

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (5): assertInvoiceVisible, ctx, prismaMock, SCOPE, state

### Community 221 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 222 - "WorkSummaryTab.jsx"
Cohesion: 0.20
Nodes (23): contractRows(), daysOpenText(), DrillDownDialog(), followUpRows(), followUpsDrill(), invoiceRows(), num, useDrillDown() (+15 more)

### Community 224 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 226 - "WorkCosts.jsx"
Cohesion: 0.18
Nodes (15): useSchemePalette(), InvoicesByWorkCard(), PolicyStatusCard(), CardTitle(), clickableChartSx, DonutWithLegend(), drillLinkSx, INVOICE_NOUN (+7 more)

### Community 234 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 235 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

## Knowledge Gaps
- **1129 isolated node(s):** `EMPTY_FORM`, `DOCUMENT_FIELDS`, `ADR-0020`, `axios`, `@azure/identity` (+1124 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1568 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **103 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Why does `ADR-0002` connect `WorkCosts.jsx` to `contracts.service.js`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `themes/index.jsx`, `AuthenticationRoutes.jsx`, `WorksPage.jsx`, `server/package.json`, `AuthForgotPassword.jsx`, `InvoiceFormPage.jsx`, `App.jsx`, `ConceptDialog.jsx`, `ForgotPassword.jsx`, `client/package.json`, `ImageList.jsx`, `NewProviderDialog.jsx`, `PolicyTypePage.jsx`, `menu-items/index.js`, `DocumentManagement.jsx`, `ExportButton.jsx`, `NotificationSection/index.jsx`, `constant.js`, `ContractDetailPage.jsx`, `WorkChartsTab.jsx`, `constants.js`, `withAlpha`, `WorkContracts.jsx`, `WorkDetailPage.jsx`, `MainLayout/index.jsx`, `ref_prop_types`, `useAuth`, `WorkSummaryTab.jsx`, `WorkCosts.jsx`, `httpCliente.js`, `MenuList/index.jsx`, `GeneralDashboard.jsx`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **What connects `EMPTY_FORM`, `DOCUMENT_FIELDS`, `ADR-0020` to the rest of the system?**
  _1129 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
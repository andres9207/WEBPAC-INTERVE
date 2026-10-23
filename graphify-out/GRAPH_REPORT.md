# Graph Report - WEBPAC-INTERVE  (2026-10-23)

## Corpus Check
- 642 files · ~348,331 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3826 nodes · 10583 edges · 222 communities (126 shown, 96 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 141 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8e2d8652`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- seed.js
- users.service.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- workScopeOf
- contracts.controller.js
- ConceptDialog.jsx
- validation.utils.js
- auth.routes.js
- seed.demo.js
- client/package.json
- menu-items/index.js
- masterRouter.utils.js
- App.jsx
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- invoiceTerms.js
- `tbl_users`
- app.js
- works.service.js
- contractSuspensions.service.test.js
- contracts.service.js
- contractPolicies.service.js
- invoices.controller.test.js
- getIO
- advanceFilters.js
- providers.routes.js
- DocumentManagement.jsx
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- WorksPage.jsx
- AuthenticationRoutes.jsx
- cron/index.js
- contractTerms.js
- permissions.constants.js
- devDependencies
- src/index.jsx
- fMoneyText
- scripts
- addressTypes.contacts.js
- `tbl_invoices`
- @mui/material
- contractReports.service.test.js
- renderExport
- ref_jest_globals
- `tbl_contract_type_fields`
- writeAudit
- transaction.mock.js
- scripts
- dashboard.service.test.js
- constants.js
- compilerOptions
- excelJS.js
- workScope.service.js
- permission
- devDependencies
- transaction.service.test.js
- WorkChartsTab.jsx
- simpleInvoiceTerms.js
- ProviderTypePage.jsx
- `tbl_contract_status_history`
- session.service.test.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- httpCliente.js
- contractBalances
- contracts.controller.test.js
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- uniqueConstraints.constants.test.js
- error.middleware.js
- contractFields.js
- `tbl_providers`
- error.middleware.test.js
- httpError
- balanceReconciliation.service.js
- images.js
- MenuList/index.jsx
- `tbl_providers`
- invoiceEvidence.service.js
- AuthForgotPassword.jsx
- auth.service.js
- contractReports.service.js
- contractConcepts.service.test.js
- works.service.test.js
- contractSummaryReport.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- decimal
- updateWorkProvider
- contractNotifications.service.test.js
- app.service.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- decisionReferences.guard.test.js
- useConfig.js
- contractEndDateReconciliation.service.test.js
- `tbl_users`
- balanceReconciliation.service.test.js
- createProvider
- identityDocuments.formats.js
- invoiceFollowUps.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- SimpleBar.jsx
- ContractDetailPage.jsx
- ForgotPassword.jsx
- master.service.test.js
- users.service.test.js
- permissions.controller.test.js
- app.routes.js
- auth.service.test.js
- MainLayout/index.jsx
- winston.config.js
- getEffectivePermissionIds
- `tbl_invoices`
- `tbl_invoices`
- NotificationSection/index.jsx
- workDashboard.service.js
- DebouncedInput.jsx
- react-router-dom

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 143 edges
2. `react` - 112 edges
3. `showError()` - 89 edges
4. `useAuth()` - 77 edges
5. `workScopeOf()` - 67 edges
6. `writeAudit()` - 65 edges
7. `dateOnlyText()` - 64 edges
8. `withLockedTransaction()` - 64 edges
9. `showSuccess()` - 58 edges
10. `moneyText()` - 58 edges

## Surprising Connections (you probably didn't know these)
- `percentQuery()` --calls--> `decimal()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/money.utils.js
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `selectContractFilterStages()` --calls--> `scopeWhere()`  [EXTRACTED]
  server/src/modules/work/contracts/contracts.service.js → server/src/common/services/workScope.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `balances()` --calls--> `advanceBalances()`  [EXTRACTED]
  server/test/modules/billing/invoices/advanceFilters.test.js → server/src/modules/billing/invoices/advanceTerms.js

## Import Cycles
- None detected.

## Communities (222 total, 96 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (27): Alert(), Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), Chip() (+19 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "seed.js"
Cohesion: 0.14
Nodes (12): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+4 more)

### Community 3 - "users.service.js"
Cohesion: 0.05
Nodes (68): ADR-0004, INACTIVE_STATUS, AUDIT_OPERATIONS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused() (+60 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.11
Nodes (32): ASSIGNMENT_IDEMPOTENCY, ASSIGNMENT_LIST_SELECT, AUDITED_HEADER, checkIdentification(), CLASSIFICATIONS_SELECT, contactsHelper, duplicateError(), EXISTING_SELECT (+24 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (49): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoicesApi, ADR-0017 (+41 more)

### Community 8 - "workScopeOf"
Cohesion: 0.05
Nodes (71): sendExport(), workScopeOf(), server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_contract_pairs, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController (+63 more)

### Community 9 - "contracts.controller.js"
Cohesion: 0.05
Nodes (73): auditContext(), moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), getContractMenu(), toMenuDto() (+65 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (51): contractConceptsApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016 (+43 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.10
Nodes (24): ADR-0009, express-validator, createMasterSchemas(), contactsRules(), emailRule(), exportFormatRule(), idempotencyKeyRule(), ADR-0027 (+16 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.05
Nodes (57): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+49 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (44): compat, __dirname, __filename, browserslist, development, production, eslintConfig, extends (+36 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 16 - "masterRouter.utils.js"
Cohesion: 0.11
Nodes (26): express, verifyToken(), requirePermission(), validate(), createMasterControllers(), createMasterRouter(), businessRulesRoutes, saveBusinessRulesSchema (+18 more)

### Community 17 - "App.jsx"
Cohesion: 0.12
Nodes (18): App(), ThemedToastContainer(), CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext, NavigationScroll(), SocketProvider() (+10 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.08
Nodes (36): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+28 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (65): ADR-0013, ADR-0021, ADR-0023, ADR-0026, ADR-0027, server_src_common_utils_money_utils_percentfor, server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice (+57 more)

### Community 22 - "invoiceTerms.js"
Cohesion: 0.11
Nodes (38): approveInvoice(), assertContractAdmitsCancel(), assertStage(), assertUniqueNumber(), assertWork(), auditable(), cancelInvoice(), createSimpleInvoice() (+30 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (57): ADR-0007, addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress() (+49 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.05
Nodes (26): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+18 more)

### Community 27 - "contracts.service.js"
Cohesion: 0.06
Nodes (98): ADR-0006, ADR-0017, main(), diffFields(), newOperationId(), withLockedTransaction(), toPercent(), FIELD_GROUPS (+90 more)

### Community 28 - "contractPolicies.service.js"
Cohesion: 0.09
Nodes (33): percentOf(), policyExpiringDays(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, policyBaseValue() (+25 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "getIO"
Cohesion: 0.14
Nodes (15): getIO(), FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, deleteProfileController(), getModulesController(), ADR-0027 (+7 more)

### Community 31 - "advanceFilters.js"
Cohesion: 0.12
Nodes (18): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+10 more)

### Community 32 - "providers.routes.js"
Cohesion: 0.09
Nodes (33): canViewAllWorks(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS (+25 more)

### Community 33 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "WorksPage.jsx"
Cohesion: 0.08
Nodes (36): getAddressTypesSelectAPI, constructionCompaniesApi, getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, identityDocumentsApi, getSupervisionTypesSelectAPI, getWorksSummaryAPI(), worksApi (+28 more)

### Community 38 - "AuthenticationRoutes.jsx"
Cohesion: 0.19
Nodes (10): MinimalLayout(), AuthenticationRoutes, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router, MainRoutes (+2 more)

### Community 39 - "cron/index.js"
Cohesion: 0.11
Nodes (18): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+10 more)

### Community 40 - "contractTerms.js"
Cohesion: 0.07
Nodes (49): ADR-0015, prisma, daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation(), contractLabel(), ADR-0027 (+41 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.04
Nodes (59): ADR-0003, ADR-0011, ADR-0012, ADR-0020, ADR-0016, ADR-0017, ADR-0018, ADR-0019 (+51 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.12
Nodes (18): client_src_assets_scss_style, config, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals() (+10 more)

### Community 45 - "fMoneyText"
Cohesion: 0.07
Nodes (37): contractPoliciesApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, InvoiceDetailPage, fMoneyText(), fPercentText(), SHORT_MONTHS, InvoiceDetailPanel() (+29 more)

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
Nodes (72): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS (+64 more)

### Community 51 - "contractReports.service.test.js"
Cohesion: 0.20
Nodes (6): exceljs, COLUMNS, ROWS, concept(), contract(), prismaMock

### Community 52 - "renderExport"
Cohesion: 0.22
Nodes (10): buildExcel(), findExportRows(), httpError(), renderExport(), renderWith(), approvedOf(), contractIdsByAdvance(), contractsBalances() (+2 more)

### Community 53 - "ref_jest_globals"
Cohesion: 0.06
Nodes (17): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, payload, prismaMock, emit (+9 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "writeAudit"
Cohesion: 0.09
Nodes (39): ADR-0001, AUDIT_ENTITIES, auditMisuse(), buildRows(), ADR-0013, ADR-0027, protect(), REDACTED (+31 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (28): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+20 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "dashboard.service.test.js"
Cohesion: 0.33
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 59 - "constants.js"
Cohesion: 0.04
Nodes (64): contractsApi, exportContractsAPI(), getContractMenuAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), refreshSession(), useWorkFilterField() (+56 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "workScope.service.js"
Cohesion: 0.19
Nodes (13): ALL, assertAnyInScope(), assertInScope(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+5 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "WorkChartsTab.jsx"
Cohesion: 0.06
Nodes (93): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, client_src_hooks_useinvoicemenus_useinvoicemenus, useSchemePalette(), MainCard(), invoicePath(), AlertsCard() (+85 more)

### Community 70 - "simpleInvoiceTerms.js"
Cohesion: 0.16
Nodes (15): previewSimpleInvoice(), blank(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023, ADR-0026, SIMPLE_FIELDS (+7 more)

### Community 71 - "ProviderTypePage.jsx"
Cohesion: 0.13
Nodes (19): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, INVOICE_MODE_OPTIONS, INVOICE_MODES, invoiceModeName(), DATA_TYPE_NAMES (+11 more)

### Community 88 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (75): addressTypesApi, contractTypesApi, insurersApi, getPermissionsCatalogAPI(), configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, reasonsApi (+67 more)

### Community 100 - "works.routes.js"
Cohesion: 0.12
Nodes (22): EDITABLE_STATUS_VALUES, selectMyWorks(), changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController (+14 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "httpCliente.js"
Cohesion: 0.08
Nodes (33): getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, RETRY_503_HINT, pickWork(), useWorkScope(), WorkScopeContext (+25 more)

### Community 108 - "contractBalances"
Cohesion: 0.19
Nodes (15): billingBalances(), isBillingType(), balanceChange(), balancesOf(), contractBalances(), detailChanges(), detailText(), hasDetail() (+7 more)

### Community 112 - "contracts.controller.test.js"
Cohesion: 0.13
Nodes (13): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, getEffectivePermissionIds, ADR-0015 (+5 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.05
Nodes (88): getBusinessRulesAPI(), saveBusinessRulesAPI(), suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, getModulesAPI(), getProfilesAPI(), saveProfileAPI() (+80 more)

### Community 117 - "export.service.js"
Cohesion: 0.15
Nodes (31): pdfkit, addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcelDocument(), buildPdf(), buildPdfDocument(), cellText() (+23 more)

### Community 118 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "contractFields.js"
Cohesion: 0.13
Nodes (15): AIU_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, ADR-0026 (+7 more)

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "httpError"
Cohesion: 0.32
Nodes (13): assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope(), assertTypeIds(), assignmentTypeIdsOf(), assignmentValuesOf(), assignProviderToWork(), changeProviderStatus() (+5 more)

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.18
Nodes (13): ADR-0024, ADR-0025, findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails() (+5 more)

### Community 129 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 130 - "MenuList/index.jsx"
Cohesion: 0.26
Nodes (8): getMenuAPI(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts, setContractMenus(), work

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "invoiceEvidence.service.js"
Cohesion: 0.21
Nodes (12): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+4 more)

### Community 133 - "AuthForgotPassword.jsx"
Cohesion: 0.15
Nodes (20): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider() (+12 more)

### Community 134 - "auth.service.js"
Cohesion: 0.08
Nodes (37): bcrypt, ref_crypto, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS (+29 more)

### Community 136 - "contractReports.service.js"
Cohesion: 0.09
Nodes (30): sumMoney(), contractInvoicesForReport(), ADVANCE_COLUMNS, advanceTotals(), authored(), balanceFields(), CONCEPT_COLUMNS, conceptLabel() (+22 more)

### Community 137 - "contractConcepts.service.test.js"
Cohesion: 0.17
Nodes (6): ctx, ADR-0016, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "contractSummaryReport.test.js"
Cohesion: 0.22
Nodes (6): contract, contractBalances, contractInvoicesForReport, getContract, getContractPolicies, SCOPE

### Community 151 - "expirationNotice.service.js"
Cohesion: 0.12
Nodes (28): BUSINESS_RULES, DEFAULT_EXPIRING_DAYS, MAX_RULE_DAYS, MIN_RULE_DAYS, getBusinessRulesController, saveBusinessRulesController, FIELD_BY_KEY, getBusinessRules() (+20 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 155 - "decimal"
Cohesion: 0.09
Nodes (46): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent() (+38 more)

### Community 156 - "updateWorkProvider"
Cohesion: 0.36
Nodes (9): applyAssignmentTypes(), assertProviderTypes(), assignmentText(), auditAssignment(), findAssignmentTypeIds(), findLockedAssignment(), insertAssignment(), unassignProviderFromWork() (+1 more)

### Community 157 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 159 - "app.service.test.js"
Cohesion: 0.22
Nodes (6): BILLING, CONTRACTS, DASHBOARD, HOME, prismaMock, state

### Community 173 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 174 - "useConfig.js"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 175 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "createProvider"
Cohesion: 0.32
Nodes (8): identificationError(), applyProviderTypes(), assertIdentification(), assertWorkAssignable(), createProvider(), findTypeIds(), masterLocksOf(), updateProvider()

### Community 181 - "identityDocuments.formats.js"
Cohesion: 0.29
Nodes (5): DIAN_WEIGHTS, GENERIC_FORMAT, IDENTIFICATION_FORMATS, ADR-0008, ADR-0008

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

### Community 194 - "SimpleBar.jsx"
Cohesion: 0.47
Nodes (5): RootStyle, SimpleBarScroll(), SimpleBarStyle, react-device-detect, simplebar-react

### Community 197 - "ContractDetailPage.jsx"
Cohesion: 0.07
Nodes (63): exportContractAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), showInfo(), showObligatorios(), ContactsList(), ADR-0009, DataList() (+55 more)

### Community 198 - "ForgotPassword.jsx"
Cohesion: 0.21
Nodes (11): client_src_assets_images_interadminpro, ForgotPasswordPage, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthCardWrapper() (+3 more)

### Community 199 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 201 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 202 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 203 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 204 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 206 - "MainLayout/index.jsx"
Cohesion: 0.20
Nodes (14): handlerDrawerOpen(), Footer(), Header(), ThemeModeSection(), MainLayout(), MainLayoutContent(), ScopedOutlet(), LogoSection() (+6 more)

### Community 211 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 212 - "getEffectivePermissionIds"
Cohesion: 0.15
Nodes (16): getEffectivePermissionIds(), hasEffectivePermission(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, getMenu(), getPagesMenu(), getSessionInfo() (+8 more)

### Community 217 - "NotificationSection/index.jsx"
Cohesion: 0.19
Nodes (16): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), getTimeAgo() (+8 more)

### Community 219 - "workDashboard.service.js"
Cohesion: 0.05
Nodes (87): ADR-0002, ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile() (+79 more)

### Community 232 - "react-router-dom"
Cohesion: 0.36
Nodes (9): endpoints, initialState, useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), NavCollapse(), NavGroup(), NavItem() (+1 more)

## Knowledge Gaps
- **1055 isolated node(s):** `ADR-0017`, `STATUS_TABS`, `CONTRACT_INVOICE_TYPES`, `TERM_UNIT_NAMES`, `ADR-0017` (+1050 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1456 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **96 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `users.service.js`, `server/package.json`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `MenuList/index.jsx`, `AuthForgotPassword.jsx`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `client/package.json`, `menu-items/index.js`, `App.jsx`, `DocumentManagement.jsx`, `WorksPage.jsx`, `AuthenticationRoutes.jsx`, `fMoneyText`, `useConfig.js`, `constants.js`, `SimpleBar.jsx`, `WorkChartsTab.jsx`, `ContractDetailPage.jsx`, `ForgotPassword.jsx`, `ProviderTypePage.jsx`, `MainLayout/index.jsx`, `NotificationSection/index.jsx`, `useAuth`, `DebouncedInput.jsx`, `react-router-dom`, `httpCliente.js`, `showError`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `react` connect `@mui/material` to `MenuList/index.jsx`, `AuthForgotPassword.jsx`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `client/package.json`, `menu-items/index.js`, `App.jsx`, `DocumentManagement.jsx`, `WorksPage.jsx`, `AuthenticationRoutes.jsx`, `src/index.jsx`, `fMoneyText`, `useConfig.js`, `constants.js`, `WorkChartsTab.jsx`, `ContractDetailPage.jsx`, `ProviderTypePage.jsx`, `MainLayout/index.jsx`, `NotificationSection/index.jsx`, `useAuth`, `DebouncedInput.jsx`, `react-router-dom`, `httpCliente.js`, `showError`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **What connects `ADR-0017`, `STATUS_TABS`, `CONTRACT_INVOICE_TYPES` to the rest of the system?**
  _1055 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07619738751814223 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `seed.js` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
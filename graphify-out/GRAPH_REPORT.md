# Graph Report - WEBPAC-INTERVE  (2026-10-26)

## Corpus Check
- 669 files · ~375,106 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4109 nodes · 11546 edges · 237 communities (136 shown, 101 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 154 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4aa25d46`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- NewProviderDialog.jsx
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
- main.routes.js
- WorkDetailPage.jsx
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- themes/index.jsx
- `tbl_users`
- app.js
- works.service.js
- contractSuspensions.service.test.js
- contractConcepts.service.js
- contractPolicies.service.js
- invoices.controller.test.js
- permissions.constants.js
- advanceFilters.js
- providers.routes.js
- DocumentManagement.jsx
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- writeAudit
- WorksPage.jsx
- cron/index.js
- contractTerms.js
- PERMISSIONS
- devDependencies
- src/index.jsx
- audit.service.js
- scripts
- httpCliente.js
- `tbl_invoices`
- @mui/material
- updateInvoice
- advanceTerms.js
- ref_jest_globals
- `tbl_contract_type_fields`
- invoiceFollowUps.service.js
- transaction.mock.js
- scripts
- dashboard.service.test.js
- constants.js
- compilerOptions
- excelJS.js
- dateOnlyText
- permission
- devDependencies
- transaction.service.test.js
- WorkChartsTab.jsx
- moneyText
- statements.routes.js
- `tbl_contract_status_history`
- invoiceGlosses.service.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- WorkScopeContext.jsx
- floatingPoint.guard.test.js
- serviceWorker.jsx
- `tbl_works`
- `tbl_policies`
- react
- export.service.js
- uniqueConstraints.constants.test.js
- error.middleware.js
- contracts.service.js
- `tbl_providers`
- error.middleware.test.js
- extends
- balanceReconciliation.service.js
- images.js
- NavCollapse/index.jsx
- `tbl_providers`
- identityDocuments.service.js
- AdvanceBars.jsx
- auth.service.js
- contractReports.service.js
- providerTypeFields.service.js
- works.service.test.js
- eslint.config.mjs
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- retentionTerms.js
- MenuList/index.jsx
- contractNotifications.service.test.js
- app.service.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- decisionReferences.guard.test.js
- workDashboard.utils.js
- GeneralDashboard.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- WorkSummaryTab.jsx
- session.service.test.js
- invoiceFollowUps.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- ContractDetailPage.jsx
- AuthForgotPassword.jsx
- master.service.test.js
- liquidationTerms.js
- contracts.controller.test.js
- approveInvoice
- contractEndDateReconciliation.service.test.js
- MainLayout/index.jsx
- winston.config.js
- status.constants.js
- `tbl_invoices`
- `tbl_invoices`
- NotificationSection/index.jsx
- `tbl_statements`
- workDashboard.service.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- workDashboard.service.test.js
- statements.service.test.js
- contractLiquidation.service.test.js
- idempotency.service.js
- browserslist
- volta
- `tbl_works`
- users.service.test.js
- invoiceEvidence.service.test.js
- DebouncedInput.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 147 edges
2. `react` - 117 edges
3. `showError()` - 98 edges
4. `workScopeOf()` - 84 edges
5. `writeAudit()` - 80 edges
6. `useAuth()` - 79 edges
7. `dateOnlyText()` - 77 edges
8. `withLockedTransaction()` - 77 edges
9. `moneyText()` - 68 edges
10. `showSuccess()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js

## Import Cycles
- None detected.

## Communities (237 total, 101 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "NewProviderDialog.jsx"
Cohesion: 0.11
Nodes (31): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, workProvidersApi, getProviderTypeFieldsAPI(), getProviderTypesSelectAPI (+23 more)

### Community 3 - "users.service.js"
Cohesion: 0.07
Nodes (42): ADR-0004, capitalize(), createMasterService(), httpError(), ADR-0003, ADR-0004, ADR-0013, ADR-0027 (+34 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (63): identificationError(), assertIdentification(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope() (+55 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (55): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoicesApi (+47 more)

### Community 8 - "workScopeOf"
Cohesion: 0.05
Nodes (81): workScopeOf(), server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_contract_pairs, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, server_src_modules_billing_invoices_invoicemenus_listinvoicemenus, approveInvoiceController, cancelInvoiceController (+73 more)

### Community 9 - "contracts.controller.js"
Cohesion: 0.05
Nodes (81): ADR-0027, auditContext(), moneyRule(), optionalDate(), percentRule(), approvedOf(), contractIdsByAdvance(), contractsBalances() (+73 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (54): contractConceptsApi, contractLiquidationApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006 (+46 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.11
Nodes (23): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+15 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (30): ADR-0001, THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController() (+22 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.06
Nodes (41): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+33 more)

### Community 14 - "client/package.json"
Cohesion: 0.08
Nodes (22): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+14 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 16 - "main.routes.js"
Cohesion: 0.05
Nodes (56): express, getIO(), STATUS_KEYS, verifyToken(), requirePermission(), validate(), IDEMPOTENCY_HEADER, createMasterControllers() (+48 more)

### Community 17 - "WorkDetailPage.jsx"
Cohesion: 0.08
Nodes (37): changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, useEndDatePreview(), showInfo(), showObligatorios(), ContactsList() (+29 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (23): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+15 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.07
Nodes (39): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+31 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (59): ADR-0023, server_src_common_utils_money_utils_percentfor, server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_money_columns, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_percent_columns, server_src_modules_billing_invoices_contractinvoiceterms_contractdraftof, server_src_modules_billing_invoices_contractinvoiceterms_contractpairsdto (+51 more)

### Community 22 - "themes/index.jsx"
Cohesion: 0.20
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.06
Nodes (68): ADR-0007, findExportRows(), httpError(), renderExport(), renderWith(), containsFilter(), dateRangeFilter(), filtersWhere() (+60 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.04
Nodes (33): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+25 more)

### Community 27 - "contractConcepts.service.js"
Cohesion: 0.10
Nodes (67): main(), diffFields(), newOperationId(), runIdempotent(), balanceViolations(), assertContractStillAdmits(), persistProfile(), saveProfile() (+59 more)

### Community 28 - "contractPolicies.service.js"
Cohesion: 0.08
Nodes (31): ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, INVOICE_TYPES, conceptLabel(), contractInvoices(), evaluateLiquidation() (+23 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "permissions.constants.js"
Cohesion: 0.10
Nodes (26): ADR-0012, ADR-0017, ADR-0019, ADR-0020, ADR-0025, ADR-0026, ADR-0011, ADR-0016 (+18 more)

### Community 31 - "advanceFilters.js"
Cohesion: 0.13
Nodes (16): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, isAdvance, ADR-0024, registered (+8 more)

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

### Community 37 - "writeAudit"
Cohesion: 0.10
Nodes (41): writeAudit(), renderDocument(), withLockedTransaction(), assertInScope(), assertUniqueNumber(), assertValues(), auditable(), AUDITED (+33 more)

### Community 38 - "WorksPage.jsx"
Cohesion: 0.10
Nodes (27): getAddressTypesSelectAPI, getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, ADR-0019, policyTypesApi, getSupervisionTypesSelectAPI, exportWorksAPI(), createMasterApi() (+19 more)

### Community 39 - "cron/index.js"
Cohesion: 0.14
Nodes (14): ref_http, node-cron, app, server, verifyStatusCatalog(), cronJobs, ADR-0017, registeredTasks (+6 more)

### Community 40 - "contractTerms.js"
Cohesion: 0.09
Nodes (26): getInvoice(), previewContractConcept(), blank(), chronologyError(), CLOSED_STATES, conceptDraftOf(), CONTRACT_STATES, CONTRACT_TRANSITIONS (+18 more)

### Community 41 - "PERMISSIONS"
Cohesion: 0.07
Nodes (31): PERMISSIONS, nitField(), addressTypesRoutes, addressTypesConfig, addressTypesService, ADR-0009, constructionCompaniesRoutes, constructionCompaniesConfig (+23 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "audit.service.js"
Cohesion: 0.14
Nodes (17): AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0013, ADR-0027, protect(), REDACTED, SENSITIVE_FIELDS (+9 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "httpCliente.js"
Cohesion: 0.11
Nodes (18): instance, NO_REFRESH_URLS, refreshClient, refreshSession(), RETRY_503_HINT, App(), ThemedToastContainer(), AuthContext (+10 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "@mui/material"
Cohesion: 0.07
Nodes (43): getWorksSummaryAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, SubCard(), ACTION_TONES, ActionButton() (+35 more)

### Community 51 - "updateInvoice"
Cohesion: 0.20
Nodes (22): assertStage(), assertStatement(), assertUniqueNumber(), assertWork(), auditable(), createContractInvoice(), createSimpleInvoice(), detailChanges() (+14 more)

### Community 52 - "advanceTerms.js"
Cohesion: 0.19
Nodes (16): ratioPercent(), invoiceAdvanceWhere(), advanceBalances(), appliedPct(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits(), balancesDto() (+8 more)

### Community 53 - "ref_jest_globals"
Cohesion: 0.06
Nodes (18): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+10 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "invoiceFollowUps.service.js"
Cohesion: 0.13
Nodes (33): AUDIT_ENTITIES, AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027 (+25 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (34): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+26 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 59 - "constants.js"
Cohesion: 0.04
Nodes (62): contractsApi, exportContractsAPI(), getContractMenuAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenu (+54 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "dateOnlyText"
Cohesion: 0.12
Nodes (32): ADR-0015, scopeWhere(), dateOnlyText(), policyExpiringDays(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock() (+24 more)

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
Cohesion: 0.15
Nodes (31): invoiceRows(), advanceDrill(), Advances(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf() (+23 more)

### Community 70 - "moneyText"
Cohesion: 0.08
Nodes (46): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, moneyText(), PERCENT_SCALE, percentOf() (+38 more)

### Community 71 - "statements.routes.js"
Cohesion: 0.11
Nodes (25): sendExport(), exportFormatRule(), handleExport(), changeStatementStatusController, deleteStatementController, exportStatementController, getStatementController, getStatementReportController (+17 more)

### Community 88 - "invoiceGlosses.service.js"
Cohesion: 0.19
Nodes (26): assertNotCancelled(), auditable(), AUDITED, createGloss(), deleteGloss(), findLockedInvoice(), findLockedOpen(), findStatement() (+18 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (111): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), deleteProfileAPI(), paginationProfilesAPI() (+103 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.07
Nodes (41): getEffectivePermissionIds(), ALL, assertAnyInScope(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+33 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "WorkScopeContext.jsx"
Cohesion: 0.07
Nodes (43): providersApi, exportStatementAPI(), getStatementReportAPI(), statementsApi, getMyWorksSelectAPI(), pickWork(), useWorkFilterField(), useWorkScope() (+35 more)

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

### Community 116 - "react"
Cohesion: 0.06
Nodes (81): updateThemeModeAPI(), getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), suspendContractAPI(), getInsurersSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI() (+73 more)

### Community 117 - "export.service.js"
Cohesion: 0.05
Nodes (56): exceljs, ref_node_fs, pdfkit, captured, explain(), main(), measure(), parseParams() (+48 more)

### Community 118 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "contracts.service.js"
Cohesion: 0.06
Nodes (62): ADR-0006, AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+54 more)

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.24
Nodes (11): ADR-0024, findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), contractBalanceReconciliationJob, insertNotification(), CHECKS (+3 more)

### Community 129 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 130 - "NavCollapse/index.jsx"
Cohesion: 0.20
Nodes (13): useConfig(), setParentOpenedMenu(), useMenuCollapse(), ElevationScroll(), HorizontalBar(), NavCollapse(), NavGroup(), NavItem() (+5 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "identityDocuments.service.js"
Cohesion: 0.17
Nodes (11): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, ADR-0008, identityDocumentsRoutes, identityDocumentsConfig, identityDocumentsService (+3 more)

### Community 133 - "AdvanceBars.jsx"
Cohesion: 0.22
Nodes (12): useSchemePalette(), CONTRACT_ADVANCE_FILTER_OPTIONS, InvoicesByWorkCard(), PolicyStatusCard(), ADVANCE_LEVELS, AdvanceBar(), AdvanceLegend(), num (+4 more)

### Community 134 - "auth.service.js"
Cohesion: 0.07
Nodes (38): bcrypt, ref_crypto, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS (+30 more)

### Community 136 - "contractReports.service.js"
Cohesion: 0.08
Nodes (34): sumMoney(), toLiquidateOf(), server_src_modules_billing_invoices_invoicemenus_iscontractmode, contractInvoicesForReport(), ADVANCE_COLUMNS, advanceTotals(), authored(), balanceFields() (+26 more)

### Community 137 - "providerTypeFields.service.js"
Cohesion: 0.29
Nodes (13): resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getProviderTypeFields(), httpError(), ADR-0006 (+5 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 151 - "expirationNotice.service.js"
Cohesion: 0.06
Nodes (44): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+36 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 155 - "retentionTerms.js"
Cohesion: 0.22
Nodes (14): ratioText(), revalidateOnApprove(), assertLiquidationCancellable(), assertRefundFits(), assertRetentionFits(), httpError(), ADR-0025, money() (+6 more)

### Community 156 - "MenuList/index.jsx"
Cohesion: 0.31
Nodes (8): getMenuAPI(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts, setContractMenus(), work

### Community 157 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 159 - "app.service.test.js"
Cohesion: 0.22
Nodes (6): BILLING, CONTRACTS, DASHBOARD, HOME, prismaMock, state

### Community 173 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 174 - "workDashboard.utils.js"
Cohesion: 0.15
Nodes (12): DashboardDefault, ADR-0002, CONTRACT_STATE_CHART_COLORS, DASHBOARD_PATH, dashboardTo, INVOICE_TYPE_COLORS, MANAGER_ROLE_NAMES, MONTH_NAMES (+4 more)

### Community 175 - "GeneralDashboard.jsx"
Cohesion: 0.19
Nodes (18): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, client_src_hooks_useinvoicemenus_useinvoicemenus, AlertsCard(), Empty(), LatestInvoicesCard(), num (+10 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "WorkSummaryTab.jsx"
Cohesion: 0.16
Nodes (25): MainCard(), AdvanceFilter(), matchesAdvanceFilter(), client_src_views_dashboard_default_work_advancebars_matchesadvancelegend, contractRows(), daysOpenText(), DrillDownDialog(), followUpRows() (+17 more)

### Community 181 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

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

### Community 197 - "ContractDetailPage.jsx"
Cohesion: 0.05
Nodes (71): getStatusesByScopeAPI(), contractPoliciesApi, exportContractAPI(), DataList(), Figure(), Pending(), SummaryAside(), MoneyField() (+63 more)

### Community 198 - "AuthForgotPassword.jsx"
Cohesion: 0.07
Nodes (40): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), client_src_assets_images_interadminpro, AuthProvider() (+32 more)

### Community 199 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 201 - "liquidationTerms.js"
Cohesion: 0.14
Nodes (13): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+5 more)

### Community 202 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 203 - "approveInvoice"
Cohesion: 0.22
Nodes (17): isBillingType(), approveInvoice(), assertContractAdmitsCancel(), cancelInvoice(), contractBalances(), deleteInvoice(), findImmutable(), findLockedInvoice() (+9 more)

### Community 204 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 206 - "MainLayout/index.jsx"
Cohesion: 0.20
Nodes (16): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), Footer(), Header(), MainLayout(), MainLayoutContent() (+8 more)

### Community 211 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 212 - "status.constants.js"
Cohesion: 0.07
Nodes (38): adapter, describeTarget(), prisma, testConnection(), ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, STATUS_IDS (+30 more)

### Community 217 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "workDashboard.service.js"
Cohesion: 0.06
Nodes (71): percentText(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress() (+63 more)

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (5): assertInvoiceVisible, ctx, prismaMock, SCOPE, state

### Community 221 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 222 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): percent(), ALL, CONCEPTS, CONTRACT, OWN, prismaMock

### Community 223 - "statements.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, OTHER, OWN, prismaMock, state

### Community 224 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 225 - "idempotency.service.js"
Cohesion: 0.38
Nodes (6): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint()

### Community 226 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 227 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 233 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 234 - "invoiceEvidence.service.test.js"
Cohesion: 0.40
Nodes (3): prismaMock, state, user

## Knowledge Gaps
- **1133 isolated node(s):** `CONTRACT_STATE_FILTER`, `POLICIES_EXPIRING_TAB`, `CONTRACT_REPORTS`, `POLICY_REPORT`, `LINKED_KEYS` (+1128 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1569 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **101 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `users.service.js`, `server/package.json`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `NavCollapse/index.jsx`, `NewProviderDialog.jsx`, `AdvanceBars.jsx`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `client/package.json`, `menu-items/index.js`, `WorkDetailPage.jsx`, `themes/index.jsx`, `MenuList/index.jsx`, `DocumentManagement.jsx`, `WorksPage.jsx`, `GeneralDashboard.jsx`, `httpCliente.js`, `WorkSummaryTab.jsx`, `constants.js`, `withAlpha`, `WorkChartsTab.jsx`, `ContractDetailPage.jsx`, `AuthForgotPassword.jsx`, `MainLayout/index.jsx`, `NotificationSection/index.jsx`, `useAuth`, `WorkScopeContext.jsx`, `DebouncedInput.jsx`, `react`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `NavCollapse/index.jsx`, `NewProviderDialog.jsx`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `client/package.json`, `menu-items/index.js`, `WorkDetailPage.jsx`, `themes/index.jsx`, `MenuList/index.jsx`, `DocumentManagement.jsx`, `WorksPage.jsx`, `src/index.jsx`, `workDashboard.utils.js`, `GeneralDashboard.jsx`, `httpCliente.js`, `@mui/material`, `WorkSummaryTab.jsx`, `constants.js`, `WorkChartsTab.jsx`, `ContractDetailPage.jsx`, `AuthForgotPassword.jsx`, `MainLayout/index.jsx`, `NotificationSection/index.jsx`, `useAuth`, `WorkScopeContext.jsx`, `DebouncedInput.jsx`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **What connects `CONTRACT_STATE_FILTER`, `POLICIES_EXPIRING_TAB`, `CONTRACT_REPORTS` to the rest of the system?**
  _1133 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `NewProviderDialog.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10796221322537113 - nodes in this community are weakly interconnected._
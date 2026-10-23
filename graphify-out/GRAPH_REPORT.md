# Graph Report - WEBPAC-INTERVE  (2026-10-23)

## Corpus Check
- 642 files · ~348,930 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3832 nodes · 10601 edges · 218 communities (118 shown, 100 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 141 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `750f9fcd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- contractSuspensions.service.test.js
- users.service.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- contracts.routes.js
- ConceptDialog.jsx
- providers.routes.js
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
- themes/index.jsx
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- contracts.service.js
- contractPolicies.service.js
- contracts.controller.test.js
- drawTable
- invoiceTerms.js
- workScopeOf
- DocumentManagement.jsx
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- document.routes.js
- Loadable.jsx
- cron/index.js
- contractTerms.js
- permissions.constants.js
- devDependencies
- src/index.jsx
- ContractsPage.jsx
- scripts
- addressTypes.service.js
- `tbl_invoices`
- @mui/material
- contractReports.service.test.js
- renderExport
- ref_jest_globals
- `tbl_contract_type_fields`
- withLockedTransaction
- transaction.mock.js
- scripts
- dashboard.service.test.js
- constants.js
- compilerOptions
- excelJS.js
- dashboard.measure.js
- permission
- devDependencies
- transaction.service.test.js
- WorkChartsTab.jsx
- moneyText
- invoices.controller.test.js
- `tbl_contract_status_history`
- providers.controller.test.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- GeneralDashboard.jsx
- floatingPoint.guard.test.js
- serviceWorker.jsx
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- uniqueConstraints.constants.test.js
- error.middleware.js
- contractFields.js
- `tbl_providers`
- error.middleware.test.js
- extends
- balanceReconciliation.service.js
- images.js
- MenuList/index.jsx
- `tbl_providers`
- invoiceEvidence.service.js
- AuthForgotPassword.jsx
- writeAudit
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
- decimal
- InputLabel.jsx
- contractNotifications.service.test.js
- app.service.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- decisionReferences.guard.test.js
- ImageList.jsx
- contractEndDateReconciliation.service.test.js
- `tbl_users`
- balanceReconciliation.service.test.js
- invoiceFollowUps.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- ContractDetailPage.jsx
- AuthenticationRoutes.jsx
- master.service.test.js
- app.routes.js
- auth.service.test.js
- MainLayout/index.jsx
- winston.config.js
- status.constants.js
- `tbl_invoices`
- `tbl_invoices`
- NotificationSection/index.jsx
- workDashboard.service.js
- DebouncedInput.jsx
- useMenuCollapse.js

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
- `advanceTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `controlTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `percentQuery()` --calls--> `decimal()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/money.utils.js
- `balances()` --calls--> `advanceBalances()`  [EXTRACTED]
  server/test/modules/billing/invoices/advanceFilters.test.js → server/src/modules/billing/invoices/advanceTerms.js

## Import Cycles
- None detected.

## Communities (218 total, 100 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 3 - "users.service.js"
Cohesion: 0.06
Nodes (57): ADR-0003, ADR-0004, AUDIT_OPERATIONS, newOperationId(), canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse() (+49 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (66): containsFilter(), filtersWhere(), idFilter(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable() (+58 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (55): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoicesApi, ADR-0017 (+47 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.04
Nodes (66): sendExport(), exportFormatRule(), INVOICE_ADVANCE_FILTERS, server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_contract_pairs, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, server_src_modules_billing_invoices_invoicemenus_listinvoicemenus (+58 more)

### Community 9 - "contracts.routes.js"
Cohesion: 0.07
Nodes (42): moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), getContractMenuController, previewContractConceptController, contractsRoutes (+34 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.08
Nodes (44): getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), previewContractConceptAPI(), previewContractEndDateAPI(), useEndDatePreview(), complete(), PercentField() (+36 more)

### Community 11 - "providers.routes.js"
Cohesion: 0.07
Nodes (37): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+29 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.08
Nodes (31): ADR-0001, jsonwebtoken, THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit() (+23 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.05
Nodes (60): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+52 more)

### Community 14 - "client/package.json"
Cohesion: 0.06
Nodes (39): compat, __dirname, __filename, browserslist, development, production, name, packageManager (+31 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 16 - "masterRouter.utils.js"
Cohesion: 0.07
Nodes (40): express, getIO(), verifyToken(), requirePermission(), validate(), createMasterControllers(), createMasterRouter(), businessRulesRoutes (+32 more)

### Community 17 - "App.jsx"
Cohesion: 0.17
Nodes (14): loginAPI(), logoutAPI(), updateThemeModeAPI(), verifyTokenAPI(), App(), ThemedToastContainer(), AuthContext, AuthProvider() (+6 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.08
Nodes (34): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), ACCESS_COOKIE_NAME (+26 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (104): ADR-0013, ADR-0017, ADR-0021, ADR-0023, ADR-0026, ADR-0027, server_src_common_utils_money_utils_percentfor, billingBalances() (+96 more)

### Community 22 - "themes/index.jsx"
Cohesion: 0.21
Nodes (8): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage(), Typography()

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (50): ADR-0007, INACTIVE_STATUS, assertInScope(), inScope(), PROGRESS_WARNING, applyManagers(), applyStages(), assertCollectionPermissions() (+42 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.06
Nodes (25): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+17 more)

### Community 27 - "contracts.service.js"
Cohesion: 0.05
Nodes (108): ADR-0006, diffFields(), dateRangeFilter(), contractTypesRoutes, contractTypesConfig, contractTypesService, ADR-0006, FIELD_GROUPS (+100 more)

### Community 28 - "contractPolicies.service.js"
Cohesion: 0.11
Nodes (22): POLICY_BASE_NAMES, configurePolicyTypeBase(), httpError(), ADR-0019, policyTypesService, conceptLabel(), getContractPolicies(), ADR-0002 (+14 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+22 more)

### Community 30 - "drawTable"
Cohesion: 0.24
Nodes (13): buildPdf(), buildPdfDocument(), drawFields(), drawSectionTitle(), drawTable(), ensureRoom(), isRight(), newPdf() (+5 more)

### Community 31 - "invoiceTerms.js"
Cohesion: 0.08
Nodes (34): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance, ADR-0024 (+26 more)

### Community 32 - "workScopeOf"
Cohesion: 0.08
Nodes (60): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, approveInvoiceController, cancelInvoiceController (+52 more)

### Community 33 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "document.routes.js"
Cohesion: 0.23
Nodes (9): IDEMPOTENCY_HEADER, deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema, DOC_TYPES, paginationDocsSchema (+1 more)

### Community 39 - "cron/index.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, describeTarget(), testConnection(), verifyStatusCatalog(), cronJobs (+8 more)

### Community 40 - "contractTerms.js"
Cohesion: 0.08
Nodes (51): addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), TERM_UNITS, termProgress(), toDateOnly() (+43 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.08
Nodes (30): ADR-0011, ADR-0012, ADR-0020, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0026 (+22 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "ContractsPage.jsx"
Cohesion: 0.08
Nodes (34): contractConceptsApi, contractPoliciesApi, contractsApi, exportContractsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractMenuAPI(), ADR-0006 (+26 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "@mui/material"
Cohesion: 0.05
Nodes (65): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+57 more)

### Community 51 - "contractReports.service.test.js"
Cohesion: 0.20
Nodes (6): exceljs, COLUMNS, ROWS, concept(), contract(), prismaMock

### Community 52 - "renderExport"
Cohesion: 0.33
Nodes (7): findExportRows(), httpError(), renderDocument(), renderExport(), renderWith(), contractOf(), exportContractReport()

### Community 53 - "ref_jest_globals"
Cohesion: 0.04
Nodes (23): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, dbUser (+15 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "withLockedTransaction"
Cohesion: 0.10
Nodes (36): AUDIT_ENTITIES, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+28 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "dashboard.service.test.js"
Cohesion: 0.33
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 59 - "constants.js"
Cohesion: 0.04
Nodes (56): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenu (+48 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "dashboard.measure.js"
Cohesion: 0.36
Nodes (8): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain()

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
Cohesion: 0.07
Nodes (81): useSchemePalette(), headerStyle, MainCard(), fMoneyText(), fPercentText(), InvoicesByWorkCard(), PolicyStatusCard(), ADVANCE_LEVELS (+73 more)

### Community 70 - "moneyText"
Cohesion: 0.10
Nodes (35): isBlank(), moneyText(), toMoney(), toPercent(), adjustableAmount(), amountPairOf(), approvalSnapshot(), contractInvoicesForReport() (+27 more)

### Community 71 - "invoices.controller.test.js"
Cohesion: 0.22
Nodes (7): emit, followUpsMock, getEffectivePermissionIds, invoicesServiceMock, ADR-0020, SCOPE, workScopeOf

### Community 88 - "providers.controller.test.js"
Cohesion: 0.25
Nodes (6): canViewAllWorks, emit, getEffectivePermissionIds, SCOPE, serviceMock, workScopeOf

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.02
Nodes (109): addressTypesApi, getAddressTypesSelectAPI, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, insurersApi (+101 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.09
Nodes (29): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), managedWhere(), resolveWorkScope(), selectMyWorks(), WORK_HEADER (+21 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "GeneralDashboard.jsx"
Cohesion: 0.06
Nodes (51): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, refreshSession() (+43 more)

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
Cohesion: 0.05
Nodes (91): getBusinessRulesAPI(), saveBusinessRulesAPI(), suspendContractAPI(), getIdentityDocumentsSelectAPI, getInsurersSelectAPI, invoiceTransitionsApi, getPolicyTypesSelectAPI, getModulesAPI() (+83 more)

### Community 117 - "export.service.js"
Cohesion: 0.22
Nodes (17): addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), cellText(), EXCEL_FORMATS, excelValue() (+9 more)

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

### Community 124 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.21
Nodes (13): ADR-0024, ADR-0025, findUsersWithPermission(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), contractBalanceReconciliationJob (+5 more)

### Community 129 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 130 - "MenuList/index.jsx"
Cohesion: 0.23
Nodes (11): getMenuAPI(), ElevationScroll(), HorizontalBar(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts (+3 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "invoiceEvidence.service.js"
Cohesion: 0.15
Nodes (14): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+6 more)

### Community 133 - "AuthForgotPassword.jsx"
Cohesion: 0.22
Nodes (14): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber(), hasSpecial() (+6 more)

### Community 134 - "writeAudit"
Cohesion: 0.08
Nodes (40): bcrypt, ref_crypto, auditMisuse(), buildRows(), ADR-0013, ADR-0027, protect(), REDACTED (+32 more)

### Community 136 - "contractReports.service.js"
Cohesion: 0.10
Nodes (24): ADVANCE_COLUMNS, advanceTotals(), authored(), CONCEPT_COLUMNS, conceptLabel(), CONTRACT_COLUMNS, CONTRACT_REPORTS, contractFields() (+16 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "contractSummaryReport.test.js"
Cohesion: 0.22
Nodes (6): contract, contractBalances, contractInvoicesForReport, getContract, getContractPolicies, SCOPE

### Community 151 - "expirationNotice.service.js"
Cohesion: 0.06
Nodes (44): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+36 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.18
Nodes (11): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+3 more)

### Community 155 - "decimal"
Cohesion: 0.08
Nodes (48): @prisma/client, decimal(), HUNDRED, MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ratioPercent() (+40 more)

### Community 157 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 159 - "app.service.test.js"
Cohesion: 0.22
Nodes (6): BILLING, CONTRACTS, DASHBOARD, HOME, prismaMock, state

### Community 173 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 174 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 175 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

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
Cohesion: 0.14
Nodes (18): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Chip() (+10 more)

### Community 197 - "ContractDetailPage.jsx"
Cohesion: 0.04
Nodes (99): getStatusesByScopeAPI(), exportContractAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), ContactsList(), ADR-0009, DataList(), Figure() (+91 more)

### Community 198 - "AuthenticationRoutes.jsx"
Cohesion: 0.12
Nodes (19): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+11 more)

### Community 199 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 203 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 204 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 206 - "MainLayout/index.jsx"
Cohesion: 0.15
Nodes (24): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), useConfig(), Footer(), Header(), ThemeModeSection() (+16 more)

### Community 211 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 212 - "status.constants.js"
Cohesion: 0.07
Nodes (41): ADR-0015, adapter, prisma, ACTIVE_STATUS, DELETED_STATUS, STATUS_IDS, hasEffectivePermission(), assertModeUnchangedInUse() (+33 more)

### Community 217 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 219 - "workDashboard.service.js"
Cohesion: 0.06
Nodes (68): ADR-0002, scopeOf(), scopeWhere(), percentText(), sumMoney(), todayDateOnly(), policyExpiringDays(), contractsBlock() (+60 more)

## Knowledge Gaps
- **1053 isolated node(s):** `EMPTY_FORM`, `DOCUMENT_FIELDS`, `ADR-0020`, `TAXES_BEFORE_ADVANCE`, `TAXES_AFTER_RETENTION` (+1048 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1454 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **100 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `users.service.js`, `server/package.json`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `MenuList/index.jsx`, `AuthForgotPassword.jsx`, `InvoiceFormPage.jsx`, `EasyCrop.jsx`, `ConceptDialog.jsx`, `client/package.json`, `App.jsx`, `themes/index.jsx`, `InputLabel.jsx`, `DocumentManagement.jsx`, `Loadable.jsx`, `ContractsPage.jsx`, `ImageList.jsx`, `constants.js`, `withAlpha`, `WorkChartsTab.jsx`, `ContractDetailPage.jsx`, `AuthenticationRoutes.jsx`, `MainLayout/index.jsx`, `NotificationSection/index.jsx`, `useAuth`, `DebouncedInput.jsx`, `GeneralDashboard.jsx`, `showError`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Why does `axios` connect `GeneralDashboard.jsx` to `server/package.json`, `client/package.json`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **What connects `EMPTY_FORM`, `DOCUMENT_FIELDS`, `ADR-0020` to the rest of the system?**
  _1053 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractSuspensions.service.test.js` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
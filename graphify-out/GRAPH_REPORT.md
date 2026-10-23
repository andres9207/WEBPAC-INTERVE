# Graph Report - WEBPAC-INTERVE  (2026-10-23)

## Corpus Check
- 642 files · ~347,147 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3819 nodes · 10557 edges · 221 communities (124 shown, 97 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 141 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ee88f102`
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
- auditContext
- seed.demo.js
- client/package.json
- MenuList/index.jsx
- masterRouter.utils.js
- themes/index.jsx
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- updateInvoice
- `tbl_users`
- app.js
- works.service.js
- contractSuspensions.service.test.js
- contractPolicies.service.js
- eslint.config.mjs
- contracts.controller.test.js
- GeneralDashboard.jsx
- advanceFilters.js
- providers.routes.js
- DocumentManagement.jsx
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- ContactsEditor.jsx
- contracts.service.test.js
- cron/index.js
- contracts.service.js
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorkChartsTab.jsx
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
- retentionTerms.js
- permission
- devDependencies
- transaction.service.test.js
- WorkSummaryTab.jsx
- simpleInvoiceTerms.js
- ProviderTypePage.jsx
- `tbl_contract_status_history`
- session.service.test.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- httpCliente.js
- dashboard.measure.js
- invoices.controller.test.js
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- uniqueConstraints.constants.test.js
- error.middleware.js
- contractFields.js
- `tbl_providers`
- error.middleware.test.js
- constant.js
- permissions.service.js
- images.js
- serviceWorker.jsx
- `tbl_providers`
- invoiceTerms.js
- AuthForgotPassword.jsx
- writeAudit
- contractReports.service.js
- SearchSection/index.jsx
- works.service.test.js
- contractSummaryReport.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- dashboard.service.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- decimal
- socket.js
- contractNotifications.service.test.js
- WorkPoliciesTab.jsx
- `tbl_contract_concepts`
- `tbl_reasons`
- decisionReferences.guard.test.js
- useConfig.js
- policyTypes.service.test.js
- `tbl_users`
- balanceReconciliation.service.test.js
- extends
- addTableSheet
- invoiceFollowUps.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- volta
- ContractDetailPage.jsx
- AuthenticationRoutes.jsx
- app.routes.js
- auth.service.test.js
- Sidebar/index.jsx
- winston.config.js
- app.service.js
- `tbl_invoices`
- `tbl_invoices`
- NotificationSection/index.jsx
- browserslist
- workDashboard.service.js
- EasyCrop.jsx
- DebouncedInput.jsx
- react-router-dom

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 143 edges
2. `react` - 112 edges
3. `showError()` - 89 edges
4. `useAuth()` - 77 edges
5. `workScopeOf()` - 66 edges
6. `writeAudit()` - 65 edges
7. `dateOnlyText()` - 64 edges
8. `withLockedTransaction()` - 64 edges
9. `showSuccess()` - 58 edges
10. `moneyText()` - 58 edges

## Surprising Connections (you probably didn't know these)
- `percentQuery()` --calls--> `decimal()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/money.utils.js
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx

## Import Cycles
- None detected.

## Communities (221 total, 97 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (24): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), Chip(), DataGrid() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "seed.js"
Cohesion: 0.11
Nodes (16): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+8 more)

### Community 3 - "users.service.js"
Cohesion: 0.05
Nodes (62): ADR-0004, adapter, prisma, ACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse() (+54 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (66): idFilter(), userFullName(), identificationError(), assertIdentification(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification() (+58 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (49): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoicesApi, ADR-0017 (+41 more)

### Community 8 - "workScopeOf"
Cohesion: 0.05
Nodes (70): workScopeOf(), exportFormatRule(), server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_contract_pairs, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController (+62 more)

### Community 9 - "contracts.controller.js"
Cohesion: 0.05
Nodes (78): getEffectivePermissionIds(), sendExport(), moneyRule(), optionalDate(), percentRule(), getSessionInfo(), getUserPermissions(), handleExport() (+70 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (50): contractConceptsApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016 (+42 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.08
Nodes (29): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+21 more)

### Community 12 - "auditContext"
Cohesion: 0.09
Nodes (31): ADR-0001, THEME_MODES, auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit() (+23 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.04
Nodes (63): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+55 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+13 more)

### Community 15 - "MenuList/index.jsx"
Cohesion: 0.08
Nodes (22): getMenuAPI(), getIconByName(), menuEntries(), MenuList(), admin, icons, billing, client_src_menu_items_billing_setbillingmenus (+14 more)

### Community 16 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (38): express, getIO(), verifyToken(), requirePermission(), validate(), IDEMPOTENCY_HEADER, createMasterControllers(), createMasterRouter() (+30 more)

### Community 17 - "themes/index.jsx"
Cohesion: 0.19
Nodes (11): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor (+3 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (66): ADR-0013, ADR-0021, ADR-0023, server_src_common_utils_money_utils_percentfor, dateRangeFilter(), invoiceAdvanceWhere(), server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice (+58 more)

### Community 22 - "updateInvoice"
Cohesion: 0.12
Nodes (41): isBillingType(), adjustableAmount(), approveInvoice(), assertContractAdmitsCancel(), assertStage(), assertUniqueNumber(), assertWork(), auditable() (+33 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (63): ADR-0007, assertInScope(), containsFilter(), filtersWhere(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING (+55 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (23): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+15 more)

### Community 27 - "contractPolicies.service.js"
Cohesion: 0.08
Nodes (80): ADR-0017, diffFields(), newOperationId(), dateOnlyText(), withContractAiu(), balanceViolations(), assertContractStillAdmits(), activeSequence() (+72 more)

### Community 28 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.04
Nodes (36): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+28 more)

### Community 30 - "GeneralDashboard.jsx"
Cohesion: 0.19
Nodes (20): getDashboardSummaryAPI(), client_src_hooks_useinvoicemenus_useinvoicemenus, useSchemePalette(), MainCard(), invoicePath(), AlertsCard(), Empty(), LatestInvoicesCard() (+12 more)

### Community 31 - "advanceFilters.js"
Cohesion: 0.11
Nodes (21): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, isAdvance, ADR-0024 (+13 more)

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

### Community 37 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 38 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 39 - "cron/index.js"
Cohesion: 0.11
Nodes (18): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+10 more)

### Community 40 - "contracts.service.js"
Cohesion: 0.05
Nodes (81): ADR-0006, ADR-0015, DELETED_STATUS, INACTIVE_STATUS, FIELD_GROUPS, typeAppliesAiu(), contractsWithPendingAdvanceWhere(), daysBetween() (+73 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.07
Nodes (33): ADR-0011, ADR-0012, ADR-0020, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0026 (+25 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.14
Nodes (30): fPercentText(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf(), drillLinkSx, Empty() (+22 more)

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
Nodes (62): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), getWorksSummaryAPI(), filterParams(), isEmptyValue(), NO_FILTERS (+54 more)

### Community 51 - "contractReports.service.test.js"
Cohesion: 0.20
Nodes (6): exceljs, COLUMNS, ROWS, concept(), contract(), prismaMock

### Community 52 - "renderExport"
Cohesion: 0.29
Nodes (10): findExportRows(), httpError(), renderDocument(), renderExport(), renderWith(), exportInvoices(), contractOf(), exportContractReport() (+2 more)

### Community 53 - "ref_jest_globals"
Cohesion: 0.05
Nodes (21): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+13 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "withLockedTransaction"
Cohesion: 0.28
Nodes (20): withLockedTransaction(), assertNotCancelled(), auditable(), AUDITED, closeFollowUp(), deleteFollowUp(), findLockedInvoice(), findLockedOpen() (+12 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.04
Nodes (39): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+31 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "dashboard.service.test.js"
Cohesion: 0.33
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 59 - "constants.js"
Cohesion: 0.03
Nodes (74): getConstructionCompaniesSelectAPI, contractsApi, exportContractsAPI(), getContractMenuAPI(), getContractTypesSelectAPI, exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getSupervisionTypesSelectAPI (+66 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "retentionTerms.js"
Cohesion: 0.24
Nodes (12): assertLiquidationCancellable(), assertRefundFits(), assertRetentionFits(), httpError(), ADR-0025, money(), retentionBalances(), retentionDto() (+4 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "WorkSummaryTab.jsx"
Cohesion: 0.13
Nodes (39): fMoneyText(), fDateOnly(), ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter(), AdvanceLegend(), matchesAdvanceFilter(), num (+31 more)

### Community 70 - "simpleInvoiceTerms.js"
Cohesion: 0.16
Nodes (18): toPercent(), previewSimpleInvoice(), blank(), composeSimpleInvoice(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023 (+10 more)

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
Nodes (89): addressTypesApi, loginAPI(), logoutAPI(), verifyTokenAPI(), constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi (+81 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.09
Nodes (29): ALL, assertAnyInScope(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf(), selectMyWorks() (+21 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "httpCliente.js"
Cohesion: 0.06
Nodes (43): getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, refreshSession(), RETRY_503_HINT, App(), ThemedToastContainer() (+35 more)

### Community 108 - "dashboard.measure.js"
Cohesion: 0.36
Nodes (8): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain()

### Community 112 - "invoices.controller.test.js"
Cohesion: 0.22
Nodes (7): emit, followUpsMock, getEffectivePermissionIds, invoicesServiceMock, ADR-0020, SCOPE, workScopeOf

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.05
Nodes (94): getBusinessRulesAPI(), saveBusinessRulesAPI(), contractPoliciesApi, suspendContractAPI(), getIdentityDocumentsSelectAPI, getInsurersSelectAPI, invoiceTransitionsApi, getPolicyTypesSelectAPI (+86 more)

### Community 117 - "export.service.js"
Cohesion: 0.18
Nodes (23): buildPdf(), buildPdfDocument(), cellText(), drawFields(), drawSectionTitle(), drawTable(), ensureRoom(), EXCEL_FORMATS (+15 more)

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

### Community 124 - "constant.js"
Cohesion: 0.14
Nodes (16): MainContentStyled, appDrawerWidth, drawerWidth, gridSpacing, CardSecondaryAction(), Avatar(), ContractBalanceCards(), DashboardCards() (+8 more)

### Community 125 - "permissions.service.js"
Cohesion: 0.09
Nodes (20): ADR-0024, ADR-0025, findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), getDashboardSummaryController, getWorkDashboardController (+12 more)

### Community 129 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "invoiceTerms.js"
Cohesion: 0.08
Nodes (28): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+20 more)

### Community 133 - "AuthForgotPassword.jsx"
Cohesion: 0.20
Nodes (15): forgotPasswordAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber() (+7 more)

### Community 134 - "writeAudit"
Cohesion: 0.05
Nodes (59): bcrypt, ref_crypto, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0013, ADR-0027 (+51 more)

### Community 136 - "contractReports.service.js"
Cohesion: 0.09
Nodes (31): sumMoney(), approvedOf(), contractInvoicesForReport(), contractsBalances(), ADVANCE_COLUMNS, advanceTotals(), authored(), balanceFields() (+23 more)

### Community 137 - "SearchSection/index.jsx"
Cohesion: 0.52
Nodes (5): HeaderAvatar(), MobileSearch(), SearchSection(), Transitions(), material-ui-popup-state

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "contractSummaryReport.test.js"
Cohesion: 0.22
Nodes (6): contract, contractBalances, contractInvoicesForReport, getContract, getContractPolicies, SCOPE

### Community 151 - "dashboard.service.js"
Cohesion: 0.09
Nodes (45): scopeWhere(), BUSINESS_RULES, getBusinessRulesController, saveBusinessRulesController, FIELD_BY_KEY, getBusinessRules(), getRuleValues(), httpError() (+37 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 155 - "decimal"
Cohesion: 0.09
Nodes (38): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE (+30 more)

### Community 156 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 157 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 159 - "WorkPoliciesTab.jsx"
Cohesion: 0.11
Nodes (21): getWorkDashboardAPI(), ADR-0002, DashboardDefault, Dashboard(), ADR-0002, TABS, CONTRACT_STATE_CHART_COLORS, DASHBOARD_PATH (+13 more)

### Community 173 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 174 - "useConfig.js"
Cohesion: 0.20
Nodes (11): config, ConfigContext, ConfigProvider(), useConfig(), useLocalStorage(), ElevationScroll(), HorizontalBar(), ImageList() (+3 more)

### Community 175 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 181 - "addTableSheet"
Cohesion: 0.43
Nodes (7): addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), excelValue(), sheetName()

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

### Community 194 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 197 - "ContractDetailPage.jsx"
Cohesion: 0.06
Nodes (77): getStatusesByScopeAPI(), exportContractAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, genericRequest, SubCard(), ContactsList() (+69 more)

### Community 198 - "AuthenticationRoutes.jsx"
Cohesion: 0.10
Nodes (21): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 203 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 204 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 206 - "Sidebar/index.jsx"
Cohesion: 0.26
Nodes (10): LogoSection(), Sidebar(), closedMixin(), MiniDrawerStyled, openedMixin(), RootStyle, SimpleBarScroll(), SimpleBarStyle (+2 more)

### Community 211 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 212 - "app.service.js"
Cohesion: 0.08
Nodes (28): hasEffectivePermission(), assertModeUnchangedInUse(), httpError(), ADR-0010, providerTypesConfig, providerTypesService, getMenu(), getPagesMenu() (+20 more)

### Community 217 - "NotificationSection/index.jsx"
Cohesion: 0.24
Nodes (13): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), getTimeAgo() (+5 more)

### Community 218 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 219 - "workDashboard.service.js"
Cohesion: 0.08
Nodes (51): ADR-0002, moneyText(), percentText(), ratioPercent(), ADVANCE_LEVELS, advanceBar(), advanceLevel(), balancesOf() (+43 more)

### Community 232 - "react-router-dom"
Cohesion: 0.17
Nodes (20): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), Footer(), Header() (+12 more)

## Knowledge Gaps
- **1055 isolated node(s):** `CONTRACT_TYPES`, `SIMPLE_CAPTURED`, `CONTRACT_CAPTURED`, `TABS`, `ADR-0020` (+1050 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1456 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **97 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `users.service.js`, `server/package.json`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `AuthForgotPassword.jsx`, `InvoiceFormPage.jsx`, `SearchSection/index.jsx`, `ConceptDialog.jsx`, `client/package.json`, `MenuList/index.jsx`, `themes/index.jsx`, `GeneralDashboard.jsx`, `WorkPoliciesTab.jsx`, `DocumentManagement.jsx`, `ContactsEditor.jsx`, `WorkChartsTab.jsx`, `useConfig.js`, `constants.js`, `WorkSummaryTab.jsx`, `ContractDetailPage.jsx`, `AuthenticationRoutes.jsx`, `ProviderTypePage.jsx`, `Sidebar/index.jsx`, `NotificationSection/index.jsx`, `EasyCrop.jsx`, `useAuth`, `DebouncedInput.jsx`, `react-router-dom`, `httpCliente.js`, `showError`, `constant.js`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `ADR-0003` connect `useAuth` to `permissions.constants.js`, `users.service.js`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **What connects `CONTRACT_TYPES`, `SIMPLE_CAPTURED`, `CONTRACT_CAPTURED` to the rest of the system?**
  _1055 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08244680851063829 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `seed.js` be split into smaller, more focused modules?**
  _Cohesion score 0.11428571428571428 - nodes in this community are weakly interconnected._
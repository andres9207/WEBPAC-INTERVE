# Graph Report - WEBPAC-INTERVE  (2026-10-23)

## Corpus Check
- 636 files · ~339,611 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3757 nodes · 10333 edges · 221 communities (124 shown, 97 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 138 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6949c82c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- contractTerms.js
- contracts.service.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- workScopeOf
- ContractDetailPage.jsx
- providers.routes.js
- auth.routes.js
- seed.demo.js
- client/package.json
- menu-items/index.js
- masterRouter.utils.js
- DocumentManagement.jsx
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- updateInvoice
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- idempotency.service.js
- contractPolicies.service.js
- contracts.controller.test.js
- fDateOnly
- invoiceEvidence.service.js
- contracts.routes.js
- dashboard.measure.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- fMoneyText
- withAlpha
- cron/index.js
- contractFields.js
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorkChartsTab.jsx
- scripts
- contractReports.service.js
- `tbl_invoices`
- AuthForgotPassword.jsx
- WorkPoliciesTab.jsx
- MainCard
- ref_jest_globals
- `tbl_contract_type_fields`
- AppBar.jsx
- transaction.mock.js
- scripts
- dashboard.service.test.js
- constants.js
- compilerOptions
- excelJS.js
- NotificationSection/index.jsx
- permission
- devDependencies
- transaction.service.test.js
- eslint.config.mjs
- simpleInvoiceTerms.js
- WorksPage.jsx
- `tbl_contract_status_history`
- pagination.utils.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- themes/index.jsx
- writeAudit
- contractSuspensions.service.test.js
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- uniqueConstraints.constants.test.js
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- error.middleware.test.js
- @mui/material
- contractEndDateReconciliation.service.js
- images.js
- serviceWorker.jsx
- `tbl_providers`
- invoiceTerms.js
- AuthenticationRoutes.jsx
- auth.service.js
- PoliciesTab.jsx
- auth.service.test.js
- works.service.test.js
- identityDocuments.service.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- prismaClient.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- decimal
- socket.js
- transaction.service.js
- session.service.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- decisionReferences.guard.test.js
- useConfig.js
- billingTerms.js
- `tbl_users`
- balanceReconciliation.service.test.js
- extends
- auth.controller.test.js
- invoiceFollowUps.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- expirationNotice.service.test.js
- WorkDetailPage.jsx
- providers.controller.test.js
- policyTypes.service.test.js
- master.service.test.js
- useMenuCollapse.js
- app.routes.js
- EasyCrop.jsx
- MainLayout/index.jsx
- workScope.service.test.js
- app.service.js
- `tbl_invoices`
- `tbl_invoices`
- permissions.controller.test.js
- browserslist
- volta
- InputLabel.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 142 edges
2. `react` - 110 edges
3. `showError()` - 89 edges
4. `useAuth()` - 77 edges
5. `workScopeOf()` - 66 edges
6. `writeAudit()` - 65 edges
7. `withLockedTransaction()` - 64 edges
8. `dateOnlyText()` - 63 edges
9. `showSuccess()` - 58 edges
10. `@tabler/icons-react` - 58 edges

## Surprising Connections (you probably didn't know these)
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `percentQuery()` --calls--> `decimal()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/money.utils.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `getUserPermissions()` --calls--> `getEffectivePermissionIds()`  [EXTRACTED]
  server/src/modules/app/general/app.service.js → server/src/common/services/effectivePermissions.service.js
- `previewWorkEndDate()` --calls--> `addTerm()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/term.utils.js

## Import Cycles
- None detected.

## Communities (221 total, 97 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractTerms.js"
Cohesion: 0.08
Nodes (38): prisma, contractLabel(), ADR-0027, notifyWorkManagers(), previewContractConcept(), auditable(), findOpenSuspension(), ADR-0017 (+30 more)

### Community 3 - "contracts.service.js"
Cohesion: 0.07
Nodes (91): ADR-0006, main(), newOperationId(), runIdempotent(), toPercent(), FIELD_GROUPS, typeAppliesAiu(), withContractAiu() (+83 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.04
Nodes (43): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+35 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (61): ADR-0009, applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes() (+53 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (59): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoicesApi, ADR-0017 (+51 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.05
Nodes (64): server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_contract_pairs, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, deleteInvoiceController (+56 more)

### Community 9 - "workScopeOf"
Cohesion: 0.08
Nodes (57): auditContext(), getEffectivePermissionIds(), sendExport(), canViewAllWorks(), resolveWorkScope(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController (+49 more)

### Community 10 - "ContractDetailPage.jsx"
Cohesion: 0.04
Nodes (88): contractConceptsApi, contractPoliciesApi, contractsApi, exportContractAPI(), exportContractsAPI(), getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI() (+80 more)

### Community 11 - "providers.routes.js"
Cohesion: 0.07
Nodes (38): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0027 (+30 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.12
Nodes (24): jsonwebtoken, THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController() (+16 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.05
Nodes (54): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+46 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (23): name, packageManager, private, version, apexcharts, axios, @emotion/react, @emotion/styled (+15 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (33): express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), businessRulesRoutes (+25 more)

### Community 17 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

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
Nodes (60): ADR-0021, ADR-0023, server_src_common_utils_money_utils_percentfor, server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_money_columns, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_percent_columns, server_src_modules_billing_invoices_contractinvoiceterms_contractdraftof (+52 more)

### Community 22 - "updateInvoice"
Cohesion: 0.11
Nodes (43): appliedPct(), isBillingType(), adjustableAmount(), approvalSnapshot(), approveInvoice(), assertContractAdmitsCancel(), assertStage(), assertUniqueNumber() (+35 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.12
Nodes (14): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, app, __dirname (+6 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (48): ADR-0007, PROGRESS_WARNING, defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), applyManagers() (+40 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.06
Nodes (25): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+17 more)

### Community 27 - "idempotency.service.js"
Cohesion: 0.09
Nodes (25): getIO(), canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), IDEMPOTENCY_HEADER, idempotencyMisuse(), keyReused(), requestFingerprint() (+17 more)

### Community 28 - "contractPolicies.service.js"
Cohesion: 0.05
Nodes (88): ADR-0002, scopeWhere(), percentOf(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel() (+80 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.04
Nodes (36): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+28 more)

### Community 30 - "fDateOnly"
Cohesion: 0.07
Nodes (47): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, RETRY_503_HINT (+39 more)

### Community 31 - "invoiceEvidence.service.js"
Cohesion: 0.19
Nodes (13): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+5 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.08
Nodes (40): exportFormatRule(), moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), contractsRoutes, ADR-0006 (+32 more)

### Community 33 - "dashboard.measure.js"
Cohesion: 0.36
Nodes (8): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain()

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "fMoneyText"
Cohesion: 0.21
Nodes (23): fMoneyText(), contractRows(), DrillDownDialog(), invoiceRows(), num, useDrillDown(), dashboardTo, initialsOf() (+15 more)

### Community 38 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 39 - "cron/index.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog(), cronJobs (+8 more)

### Community 40 - "contractFields.js"
Cohesion: 0.29
Nodes (9): AIU_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, ADR-0026 (+1 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (49): ADR-0011, ADR-0012, ADR-0016, ADR-0018, ADR-0019, ADR-0017, ADR-0020, ADR-0024 (+41 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.15
Nodes (12): App(), ThemedToastContainer(), client_src_assets_scss_style, container, root, NavigationScroll(), reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.12
Nodes (39): useSchemePalette(), fPercentText(), Advances(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf() (+31 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "contractReports.service.js"
Cohesion: 0.06
Nodes (66): findExportRows(), renderExport(), moneyText(), percentText(), sumMoney(), toMoney(), balancesOf(), contractsBlock() (+58 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "AuthForgotPassword.jsx"
Cohesion: 0.15
Nodes (20): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider() (+12 more)

### Community 51 - "WorkPoliciesTab.jsx"
Cohesion: 0.18
Nodes (14): filterParams(), isEmptyValue(), NO_FILTERS, useListFilters(), ContractBalanceCards(), DashboardCards(), Indicator(), ADR-0002 (+6 more)

### Community 52 - "MainCard"
Cohesion: 0.18
Nodes (16): appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard(), Avatar(), InvoicesByWorkCard() (+8 more)

### Community 53 - "ref_jest_globals"
Cohesion: 0.05
Nodes (19): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, prismaMock (+11 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "AppBar.jsx"
Cohesion: 0.21
Nodes (11): client_src_assets_images_interadminpro, LoginPage, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthCardWrapper() (+3 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (35): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+27 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 59 - "constants.js"
Cohesion: 0.05
Nodes (43): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), refreshSession(), AuthContext, client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenu, SocketContext, SocketProvider() (+35 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 70 - "simpleInvoiceTerms.js"
Cohesion: 0.16
Nodes (13): blank(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023, ADR-0026, SIMPLE_FIELDS, SIMPLE_FORMULA_VERSION (+5 more)

### Community 71 - "WorksPage.jsx"
Cohesion: 0.08
Nodes (31): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, identityDocumentsApi, getProviderTypeFieldsAPI(), saveProviderTypeFieldsAPI(), getSupervisionTypesSelectAPI, getWorksSummaryAPI(), worksApi (+23 more)

### Community 88 - "pagination.utils.js"
Cohesion: 0.20
Nodes (15): containsFilter(), dateRangeFilter(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS, resolvePagination(), toInt() (+7 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (82): addressTypesApi, constructionCompaniesApi, contractTypesApi, insurersApi, getPermissionsCatalogAPI(), providerTypesApi, reasonsApi, supervisionTypesApi (+74 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.09
Nodes (29): ALL, assertAnyInScope(), assertInScope(), httpError(), inScope(), managedWhere(), scopeOf(), selectMyWorks() (+21 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "themes/index.jsx"
Cohesion: 0.21
Nodes (9): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor (+1 more)

### Community 108 - "writeAudit"
Cohesion: 0.04
Nodes (96): ADR-0001, ADR-0004, ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse() (+88 more)

### Community 112 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.07
Nodes (63): getBusinessRulesAPI(), saveBusinessRulesAPI(), suspendContractAPI(), invoiceTransitionsApi, configurePolicyTypeBaseAPI(), getModulesAPI(), getProfilesAPI(), saveProfileAPI() (+55 more)

### Community 117 - "export.service.js"
Cohesion: 0.07
Nodes (46): exceljs, pdfkit, addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+38 more)

### Community 118 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): ALL, CONCEPTS, CONTRACT, INVOICES, OWN, prismaMock

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "@mui/material"
Cohesion: 0.05
Nodes (64): getAddressTypesSelectAPI, getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), ProfilesPage, UsersPage (+56 more)

### Community 125 - "contractEndDateReconciliation.service.js"
Cohesion: 0.16
Nodes (18): ADR-0015, findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), contractBalanceReconciliationJob, insertNotification(), balanceViolations() (+10 more)

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
Cohesion: 0.17
Nodes (17): isContractCreate(), isCreate(), isSimpleCreate(), assertTransition(), cancelTransitionFor(), hasContract(), historyRow(), httpError() (+9 more)

### Community 133 - "AuthenticationRoutes.jsx"
Cohesion: 0.19
Nodes (10): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router, MainRoutes (+2 more)

### Community 134 - "auth.service.js"
Cohesion: 0.11
Nodes (26): bcrypt, REDACTED, withTransaction(), comparePassword(), hashPassword(), deriveKey(), generateResetCode(), hashResetCode() (+18 more)

### Community 136 - "PoliciesTab.jsx"
Cohesion: 0.13
Nodes (22): getInsurersSelectAPI, getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, complete(), PercentField(), toText(), toValue() (+14 more)

### Community 137 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "identityDocuments.service.js"
Cohesion: 0.18
Nodes (11): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, identityDocumentsConfig, identityDocumentsService (+3 more)

### Community 151 - "prismaClient.js"
Cohesion: 0.07
Nodes (40): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+32 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.35
Nodes (10): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), getNotificationCount(), listNotifications(), markAllAsRead(), markAsRead() (+2 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 155 - "decimal"
Cohesion: 0.10
Nodes (39): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent() (+31 more)

### Community 156 - "socket.js"
Cohesion: 0.27
Nodes (9): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), ACCESS_COOKIE_NAME (+1 more)

### Community 157 - "transaction.service.js"
Cohesion: 0.21
Nodes (11): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+3 more)

### Community 159 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 173 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 174 - "useConfig.js"
Cohesion: 0.20
Nodes (11): config, ConfigContext, ConfigProvider(), useConfig(), useLocalStorage(), ElevationScroll(), HorizontalBar(), ImageList() (+3 more)

### Community 175 - "billingTerms.js"
Cohesion: 0.27
Nodes (8): assertBillingFits(), BILLING_TYPES, billingBalances(), billingDto(), httpError(), money(), ZERO, balancesOf()

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 181 - "auth.controller.test.js"
Cohesion: 0.25
Nodes (6): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, mockUpdateThemeMode, sessionMock

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

### Community 194 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 197 - "WorkDetailPage.jsx"
Cohesion: 0.06
Nodes (69): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, getProviderTypesSelectAPI (+61 more)

### Community 198 - "providers.controller.test.js"
Cohesion: 0.25
Nodes (6): canViewAllWorks, emit, getEffectivePermissionIds, SCOPE, serviceMock, workScopeOf

### Community 199 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 201 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 203 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 206 - "MainLayout/index.jsx"
Cohesion: 0.14
Nodes (26): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), Footer(), Header(), ThemeModeSection() (+18 more)

### Community 211 - "workScope.service.test.js"
Cohesion: 0.40
Nodes (4): hasEffectivePermission, prismaMock, state, user

### Community 212 - "app.service.js"
Cohesion: 0.11
Nodes (15): getMenu(), getPagesMenu(), getSessionInfo(), getUserPermissions(), PAGE_SELECT, toChild(), toParent(), withInvoiceMenus() (+7 more)

### Community 217 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 218 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 219 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **1043 isolated node(s):** `axios`, `@azure/identity`, `bcrypt`, `compression`, `cookie-parser` (+1038 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1446 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **97 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Why does `ADR-0002` connect `contractPolicies.service.js` to `contracts.service.js`, `@mui/material`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `AuthenticationRoutes.jsx`, `server/package.json`, `InvoiceFormPage.jsx`, `PoliciesTab.jsx`, `ContractDetailPage.jsx`, `client/package.json`, `DocumentManagement.jsx`, `fDateOnly`, `fMoneyText`, `withAlpha`, `WorkChartsTab.jsx`, `useConfig.js`, `AuthForgotPassword.jsx`, `WorkPoliciesTab.jsx`, `MainCard`, `AppBar.jsx`, `constants.js`, `NotificationSection/index.jsx`, `WorkDetailPage.jsx`, `WorksPage.jsx`, `EasyCrop.jsx`, `MainLayout/index.jsx`, `InputLabel.jsx`, `useAuth`, `themes/index.jsx`, `showError`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **What connects `axios`, `@azure/identity`, `bcrypt` to the rest of the system?**
  _1043 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractTerms.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08416389811738649 - nodes in this community are weakly interconnected._
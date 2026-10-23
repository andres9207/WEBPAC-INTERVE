# Graph Report - WEBPAC-INTERVE  (2026-10-23)

## Corpus Check
- 631 files · ~332,937 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3675 nodes · 10087 edges · 212 communities (117 shown, 95 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 135 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `defc046a`
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
- workScopeOf
- providers.routes.js
- ConceptDialog.jsx
- validation.utils.js
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
- dateOnlyText
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- httpCliente.js
- workDashboard.service.js
- contracts.controller.test.js
- pagination.utils.js
- billingTerms.js
- contracts.routes.js
- expirationNotice.service.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- AuthForgotPassword.jsx
- withAlpha
- cron/index.js
- contractConcepts.service.js
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorkChartsTab.jsx
- scripts
- contractReports.service.js
- `tbl_invoices`
- react-router-dom
- ContractsPage.jsx
- contractSuspensions.service.test.js
- ref_jest_globals
- `tbl_contract_type_fields`
- App.jsx
- transaction.mock.js
- scripts
- dashboard.service.test.js
- session.service.test.js
- compilerOptions
- excelJS.js
- contractSuspensions.service.js
- permission
- devDependencies
- transaction.service.test.js
- httpError
- moneyText
- WorksPage.jsx
- `tbl_contract_status_history`
- socket.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- runIdempotent
- writeAudit
- providerTypeFields.service.js
- `tbl_works`
- `tbl_policies`
- react
- export.service.js
- uniqueConstraints.constants.test.js
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- error.middleware.test.js
- @mui/material
- effectivePermissions.service.js
- images.js
- serviceWorker.jsx
- `tbl_providers`
- invoices.routes.js
- PolicyTypePage.jsx
- auth.service.js
- constants.js
- auth.service.test.js
- works.service.test.js
- invoiceEvidence.service.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- seed.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- decimal
- winston.config.js
- addressTypes.contacts.js
- contractNotifications.service.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- decisionReferences.guard.test.js
- useConfig.js
- ContactsEditor.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- extends
- MenuList/index.jsx
- users.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- invoiceEvidence.service.test.js
- WorkDetailPage.jsx
- permissionsApi.js
- InputLabel.jsx
- app.routes.js
- MainLayout/index.jsx
- app.service.js
- `tbl_invoices`
- `tbl_invoices`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 141 edges
2. `react` - 108 edges
3. `showError()` - 86 edges
4. `useAuth()` - 77 edges
5. `workScopeOf()` - 63 edges
6. `writeAudit()` - 60 edges
7. `withLockedTransaction()` - 59 edges
8. `dateOnlyText()` - 59 edges
9. `@tabler/icons-react` - 56 edges
10. `showSuccess()` - 55 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `getUserPermissions()` --calls--> `getEffectivePermissionIds()`  [EXTRACTED]
  server/src/modules/app/general/app.service.js → server/src/common/services/effectivePermissions.service.js
- `previewWorkEndDate()` --calls--> `addTerm()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/term.utils.js

## Import Cycles
- None detected.

## Communities (212 total, 95 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (24): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractTerms.js"
Cohesion: 0.09
Nodes (34): ADR-0015, ADR-0021, server_src_common_utils_money_utils_percentfor, toDateOnly(), daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation() (+26 more)

### Community 3 - "contracts.service.js"
Cohesion: 0.07
Nodes (68): ADR-0006, diffFields(), POLICY_BASE_NAMES, typeAppliesAiu(), resolveContractTypeFields(), assertContractStillAdmits(), assertMasters(), assertTypeFree() (+60 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (38): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+30 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (41): identificationError(), applyProviderTypes(), assertIdentification(), assertProviderTypes(), ASSIGNMENT_IDEMPOTENCY, ASSIGNMENT_LIST_SELECT, assignmentValuesOf(), AUDITED_HEADER (+33 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.08
Nodes (48): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, client_src_api_requests_invoicesapi_previewcontractinvoiceapi (+40 more)

### Community 8 - "workScopeOf"
Cohesion: 0.07
Nodes (66): auditContext(), getEffectivePermissionIds(), sendExport(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes (+58 more)

### Community 9 - "providers.routes.js"
Cohesion: 0.10
Nodes (26): ASSIGNMENT_FIELDS, assignProviderController, checkIdentificationController, getProviderController, INPUT_FIELDS, notifyAssignment(), paginationWorkProvidersController, pick() (+18 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (51): contractConceptsApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016 (+43 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.08
Nodes (28): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, IDEMPOTENCY_HEADER, createMasterSchemas(), contactsRules(), emailRule(), idArray() (+20 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.05
Nodes (49): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+41 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (40): compat, __dirname, __filename, browserslist, development, production, name, packageManager (+32 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.08
Nodes (18): admin, icons, billing, dashboard, icons, menuItems, icons, other (+10 more)

### Community 16 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (42): express, getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), isSessionActive(), canViewAllWorks() (+34 more)

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
Nodes (97): ADR-0013, ADR-0017, ADR-0023, server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_money_columns (+89 more)

### Community 22 - "dateOnlyText"
Cohesion: 0.08
Nodes (51): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+43 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.09
Nodes (49): ADR-0007, assertInScope(), MAX_ROWS, PROGRESS_WARNING, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections() (+41 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.06
Nodes (25): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+17 more)

### Community 27 - "httpCliente.js"
Cohesion: 0.06
Nodes (44): getWorkDashboardAPI(), ADR-0002, getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), getMyWorksSelectAPI(), genericRequest (+36 more)

### Community 28 - "workDashboard.service.js"
Cohesion: 0.08
Nodes (46): ADR-0011, percentOf(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASES, policyBaseValue(), balancesOf() (+38 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.04
Nodes (41): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+33 more)

### Community 30 - "pagination.utils.js"
Cohesion: 0.21
Nodes (18): containsFilter(), countByStatus(), dateRangeFilter(), DEFAULT_ROWS, filtersWhere(), idFilter(), paginate(), resolvePagination() (+10 more)

### Community 31 - "billingTerms.js"
Cohesion: 0.31
Nodes (7): assertBillingFits(), BILLING_TYPES, billingDto(), httpError(), money(), ZERO, INVOICE_TYPES

### Community 32 - "contracts.routes.js"
Cohesion: 0.08
Nodes (39): moneyRule(), optionalDate(), percentRule(), simpleAmountRules(), previewContractConceptController, contractsRoutes, ADR-0006, ADR-0016 (+31 more)

### Community 33 - "expirationNotice.service.js"
Cohesion: 0.17
Nodes (19): BUSINESS_RULES, getBusinessRulesController, saveBusinessRulesController, getBusinessRules(), getRuleValues(), addDays(), alreadyNotified(), buildNotices() (+11 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "AuthForgotPassword.jsx"
Cohesion: 0.16
Nodes (19): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider() (+11 more)

### Community 38 - "withAlpha"
Cohesion: 0.15
Nodes (16): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), buildPalette(), defaultColor (+8 more)

### Community 39 - "cron/index.js"
Cohesion: 0.13
Nodes (15): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+7 more)

### Community 40 - "contractConcepts.service.js"
Cohesion: 0.11
Nodes (37): AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+29 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (49): ADR-0003, ADR-0016, ADR-0024, ADR-0025, ADR-0011, ADR-0012, ADR-0017, ADR-0018 (+41 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.15
Nodes (13): client_src_assets_scss_style, config, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals() (+5 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.09
Nodes (49): useSchemePalette(), InvoicesByWorkCard(), PolicyStatusCard(), contractRows(), DrillDownDialog(), invoiceRows(), num, useDrillDown() (+41 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "contractReports.service.js"
Cohesion: 0.08
Nodes (37): sumMoney(), billingBalances(), approvedOf(), balancesOf(), contractInvoicesForReport(), contractsBalances(), ADVANCE_COLUMNS, advanceTotals() (+29 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "react-router-dom"
Cohesion: 0.11
Nodes (22): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+14 more)

### Community 51 - "ContractsPage.jsx"
Cohesion: 0.10
Nodes (24): contractsApi, exportContractsAPI(), ContractsPage, download(), downloadExport(), errorMessage(), EXPORT_FORMATS, ExportButton() (+16 more)

### Community 52 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 53 - "ref_jest_globals"
Cohesion: 0.04
Nodes (26): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+18 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "App.jsx"
Cohesion: 0.15
Nodes (15): refreshSession(), App(), ThemedToastContainer(), CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext, NavigationScroll() (+7 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 59 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "contractSuspensions.service.js"
Cohesion: 0.16
Nodes (20): adapter, describeTarget(), testConnection(), contractLabel(), ADR-0027, notifyWorkManagers(), auditable(), findOpenSuspension() (+12 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "httpError"
Cohesion: 0.21
Nodes (20): applyAssignmentTypes(), assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope(), assertTypeIds(), assertWorkAssignable(), assignmentText(), assignmentTypeIdsOf() (+12 more)

### Community 70 - "moneyText"
Cohesion: 0.12
Nodes (30): moneyText(), percentText(), toMoney(), toPercent(), isBillingType(), amountPairOf(), approvalSnapshot(), contractSnapshot() (+22 more)

### Community 71 - "WorksPage.jsx"
Cohesion: 0.09
Nodes (28): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getInsurersSelectAPI, getProviderTypeFieldsAPI(), saveProviderTypeFieldsAPI(), getSupervisionTypesSelectAPI, getWorksSummaryAPI(), worksApi (+20 more)

### Community 88 - "socket.js"
Cohesion: 0.26
Nodes (9): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+1 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (95): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, deleteProfileAPI(), paginationProfilesAPI(), providerTypesApi (+87 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.09
Nodes (29): ALL, assertAnyInScope(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf(), selectMyWorks() (+21 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "runIdempotent"
Cohesion: 0.15
Nodes (17): ACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent() (+9 more)

### Community 108 - "writeAudit"
Cohesion: 0.05
Nodes (66): ADR-0001, ADR-0004, ref_crypto, prisma, DELETED_STATUS, INACTIVE_STATUS, AUDIT_ENTITIES, AUDIT_OPERATIONS (+58 more)

### Community 112 - "providerTypeFields.service.js"
Cohesion: 0.29
Nodes (13): resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getProviderTypeFields(), httpError(), ADR-0006 (+5 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "react"
Cohesion: 0.05
Nodes (91): getBusinessRulesAPI(), saveBusinessRulesAPI(), contractPoliciesApi, suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, getModulesAPI(), getProfilesAPI() (+83 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (51): exceljs, addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf(), buildPdfDocument() (+43 more)

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
Cohesion: 0.06
Nodes (62): HeaderAvatar(), MobileSearch(), SearchSection(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard() (+54 more)

### Community 125 - "effectivePermissions.service.js"
Cohesion: 0.19
Nodes (14): findUsersWithPermission(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), contractBalanceReconciliationJob, insertNotification(), balanceViolations() (+6 more)

### Community 129 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "invoices.routes.js"
Cohesion: 0.12
Nodes (23): exportFormatRule(), invoicesRoutes, ADR-0017, approveInvoiceSchema, cancelInvoiceSchema, contractSelectRules, deleteInvoiceSchema, exportInvoicesSchema (+15 more)

### Community 133 - "PolicyTypePage.jsx"
Cohesion: 0.15
Nodes (15): configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, PolicyTypePage, POLICY_BASE_OPTIONS, policyBaseName(), ConfigureBaseDialog() (+7 more)

### Community 134 - "auth.service.js"
Cohesion: 0.08
Nodes (37): ADR-0027, bcrypt, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS (+29 more)

### Community 136 - "constants.js"
Cohesion: 0.07
Nodes (43): getDashboardSummaryAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), useWorkFilterField(), InvoicesPage, SocketContext, TooltipLongText(), CONTRACT_INVOICE_TYPES (+35 more)

### Community 137 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "invoiceEvidence.service.js"
Cohesion: 0.20
Nodes (13): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+5 more)

### Community 151 - "seed.js"
Cohesion: 0.11
Nodes (16): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+8 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.18
Nodes (16): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+8 more)

### Community 154 - "mailerService.js"
Cohesion: 0.18
Nodes (11): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+3 more)

### Community 155 - "decimal"
Cohesion: 0.09
Nodes (47): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent() (+39 more)

### Community 156 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 157 - "addressTypes.contacts.js"
Cohesion: 0.47
Nodes (5): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText()

### Community 159 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 173 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 174 - "useConfig.js"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 175 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.31
Nodes (7): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 181 - "MenuList/index.jsx"
Cohesion: 0.25
Nodes (13): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), MenuList() (+5 more)

### Community 183 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 194 - "invoiceEvidence.service.test.js"
Cohesion: 0.40
Nodes (3): prismaMock, state, user

### Community 197 - "WorkDetailPage.jsx"
Cohesion: 0.05
Nodes (95): getStatusesByScopeAPI(), exportContractAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), SubCard(), ContactsList(), ADR-0009, DataList() (+87 more)

### Community 203 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 206 - "MainLayout/index.jsx"
Cohesion: 0.20
Nodes (14): handlerDrawerOpen(), Footer(), Header(), ThemeModeSection(), MainLayout(), MainLayoutContent(), ScopedOutlet(), LogoSection() (+6 more)

### Community 212 - "app.service.js"
Cohesion: 0.11
Nodes (15): getMenu(), getPagesMenu(), getSessionInfo(), getUserPermissions(), PAGE_SELECT, toChild(), toParent(), withInvoiceMenus() (+7 more)

## Knowledge Gaps
- **1021 isolated node(s):** `COLUMNS`, `WORKS_COUNT_COLUMN`, `FILTER_FIELDS`, `NO_LINKED_KEYS`, `ADR-0012` (+1016 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1418 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **95 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0002` connect `WorkChartsTab.jsx` to `contracts.service.js`, `workDashboard.service.js`?**
  _High betweenness centrality (0.221) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `server/package.json`, `PolicyTypePage.jsx`, `InvoiceFormPage.jsx`, `constants.js`, `ConceptDialog.jsx`, `client/package.json`, `menu-items/index.js`, `DocumentManagement.jsx`, `httpCliente.js`, `AuthForgotPassword.jsx`, `withAlpha`, `WorkChartsTab.jsx`, `useConfig.js`, `ContactsEditor.jsx`, `react-router-dom`, `ContractsPage.jsx`, `MenuList/index.jsx`, `App.jsx`, `WorkDetailPage.jsx`, `InputLabel.jsx`, `WorksPage.jsx`, `MainLayout/index.jsx`, `useAuth`, `react`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Why does `axios` connect `httpCliente.js` to `server/package.json`, `client/package.json`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **What connects `COLUMNS`, `WORKS_COUNT_COLUMN`, `FILTER_FIELDS` to the rest of the system?**
  _1021 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08325624421831637 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractTerms.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08819345661450925 - nodes in this community are weakly interconnected._
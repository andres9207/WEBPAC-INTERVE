# Graph Report - WEBPAC-INTERVE  (2026-10-23)

## Corpus Check
- 630 files · ~329,990 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3650 nodes · 10018 edges · 212 communities (118 shown, 94 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 135 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3e87fca7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- contractTerms.js
- contractPolicies.service.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- providers.routes.js
- ConceptDialog.jsx
- validation.utils.js
- auditContext
- seed.demo.js
- client/package.json
- menu-items/index.js
- masterRouter.utils.js
- users.service.js
- invoices.service.test.js
- compilerOptions
- audit.service.js
- invoices.service.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contractConcepts.service.test.js
- httpCliente.js
- WorkDataForm.jsx
- invoices.controller.test.js
- contracts.service.js
- mailerService.js
- workScopeOf
- expirationNotice.service.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- status.constants.js
- contractReports.service.js
- cron/index.js
- AuthenticationRoutes.jsx
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorkChartsTab.jsx
- scripts
- constant.js
- `tbl_invoices`
- withAlpha
- constants.js
- contractSuspensions.service.test.js
- ref_jest_globals
- `tbl_contract_type_fields`
- permissions.routes.js
- transaction.mock.js
- scripts
- ContactsEditor.jsx
- session.service.test.js
- compilerOptions
- excelJS.js
- AuthForgotPassword.jsx
- permission
- devDependencies
- transaction.service.test.js
- notifications.service.js
- simpleInvoiceTerms.js
- App.jsx
- `tbl_contract_status_history`
- socket.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- NotificationSection/index.jsx
- runIdempotent
- document.routes.js
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- formatTime.js
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- error.middleware.test.js
- @mui/material
- contractEndDateReconciliation.service.js
- providerTypeFields.service.js
- serviceWorker.jsx
- `tbl_providers`
- userFullName
- PoliciesTab.jsx
- auth.service.js
- uniqueConstraints.constants.test.js
- contracts.controller.test.js
- works.service.test.js
- contracts.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- images.js
- `tbl_user_permissions`
- handleFirebase.js
- auth.controller.test.js
- decimal
- winston.config.js
- decisionReferences.guard.test.js
- contractNotifications.service.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- dashboard.measure.js
- ImageList.jsx
- master.service.test.js
- `tbl_users`
- balanceReconciliation.service.test.js
- extends
- users.service.test.js
- DebouncedInput.jsx
- auth.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- InputLabel.jsx
- WorkDetailPage.jsx
- MainCard.jsx
- contractEndDateReconciliation.service.test.js
- app.routes.js
- floatingPoint.guard.test.js
- react-router-dom
- `tbl_invoices`
- `tbl_invoices`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 141 edges
2. `react` - 108 edges
3. `showError()` - 86 edges
4. `useAuth()` - 77 edges
5. `workScopeOf()` - 63 edges
6. `writeAudit()` - 60 edges
7. `dateOnlyText()` - 59 edges
8. `withLockedTransaction()` - 59 edges
9. `@tabler/icons-react` - 57 edges
10. `showSuccess()` - 55 edges

## Surprising Connections (you probably didn't know these)
- `selectContractFilterStages()` --calls--> `scopeWhere()`  [EXTRACTED]
  server/src/modules/work/contracts/contracts.service.js → server/src/common/services/workScope.service.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js
- `previewWorkEndDate()` --calls--> `addTerm()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/term.utils.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js

## Import Cycles
- None detected.

## Communities (212 total, 94 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (24): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractTerms.js"
Cohesion: 0.10
Nodes (24): ADR-0021, server_src_common_utils_money_utils_percentfor, conceptDto(), conceptsDto(), previewContractConcept(), blank(), CONCEPT_TYPE_NAMES, conceptAmounts() (+16 more)

### Community 3 - "contractPolicies.service.js"
Cohesion: 0.09
Nodes (48): diffFields(), newOperationId(), writeAudit(), withLockedTransaction(), saveBusinessRules(), POLICY_BASE_NAMES, configurePolicyTypeBase(), httpError() (+40 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (54): assertInScope(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertProviderAssignable(), assertProviderTypes(), assertTypeIds(), assertWorkAssignable() (+46 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (69): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, client_src_api_requests_invoicesapi_previewcontractinvoiceapi (+61 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.07
Nodes (51): sendExport(), exportFormatRule(), moneyRule(), percentRule(), accessOf(), approveInvoiceController, cancelInvoiceController, deleteInvoiceController (+43 more)

### Community 9 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (51): contractConceptsApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016 (+43 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.11
Nodes (22): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+14 more)

### Community 12 - "auditContext"
Cohesion: 0.13
Nodes (25): ADR-0001, THEME_MODES, auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit() (+17 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.05
Nodes (52): ADR-0003, ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure() (+44 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (40): compat, __dirname, __filename, browserslist, development, production, name, packageManager (+32 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "masterRouter.utils.js"
Cohesion: 0.07
Nodes (38): getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), businessRulesRoutes (+30 more)

### Community 17 - "users.service.js"
Cohesion: 0.10
Nodes (32): containsFilter(), countByStatus(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS, paginate(), resolvePagination() (+24 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "audit.service.js"
Cohesion: 0.07
Nodes (39): ADR-0013, ref_crypto, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0027, protect(), REDACTED (+31 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.03
Nodes (125): ADR-0017, ADR-0023, ADR-0027, addDays(), ALL_FIELDS, concept(), dbName, END_DATES (+117 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.06
Nodes (71): ADR-0011, scopeWhere(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), TERM_UNITS, termProgress() (+63 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (48): ADR-0004, ADR-0007, PROGRESS_WARNING, defineContacts(), FIELDS, httpError(), ADR-0009, optionalText() (+40 more)

### Community 26 - "contractConcepts.service.test.js"
Cohesion: 0.09
Nodes (16): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+8 more)

### Community 27 - "httpCliente.js"
Cohesion: 0.09
Nodes (38): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, RETRY_503_HINT (+30 more)

### Community 28 - "WorkDataForm.jsx"
Cohesion: 0.10
Nodes (23): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), reasonsApi, getSupervisionTypesSelectAPI, createMasterApi() (+15 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "contracts.service.js"
Cohesion: 0.05
Nodes (113): ADR-0002, main(), dateRangeFilter(), dateOnlyText(), AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn() (+105 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "workScopeOf"
Cohesion: 0.05
Nodes (72): getEffectivePermissionIds(), workScopeOf(), optionalDate(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes, ADR-0002 (+64 more)

### Community 33 - "expirationNotice.service.js"
Cohesion: 0.06
Nodes (40): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+32 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "status.constants.js"
Cohesion: 0.11
Nodes (15): adapter, describeTarget(), prisma, testConnection(), ACTIVE_STATUS, INACTIVE_STATUS, getMenu(), PAGE_SELECT (+7 more)

### Community 38 - "contractReports.service.js"
Cohesion: 0.07
Nodes (47): moneyText(), sumMoney(), approvalSnapshot(), approvedOf(), contractInvoicesForReport(), contractsBalances(), contractSnapshot(), simpleSnapshot() (+39 more)

### Community 39 - "cron/index.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+8 more)

### Community 40 - "AuthenticationRoutes.jsx"
Cohesion: 0.11
Nodes (21): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.08
Nodes (22): ADR-0016, ADR-0024, ADR-0025, ADR-0026, ADR-0011, ADR-0012, ADR-0017, ADR-0018 (+14 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.15
Nodes (13): client_src_assets_scss_style, config, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals() (+5 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.09
Nodes (60): MainCard(), contractRows(), DrillDownDialog(), invoiceRows(), num, useDrillDown(), Advances(), CardTitle() (+52 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "constant.js"
Cohesion: 0.15
Nodes (14): MainContentStyled, closedMixin(), MiniDrawerStyled, openedMixin(), appDrawerWidth, drawerWidth, CardSecondaryAction(), Avatar() (+6 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "withAlpha"
Cohesion: 0.15
Nodes (16): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), buildPalette(), defaultColor (+8 more)

### Community 51 - "constants.js"
Cohesion: 0.12
Nodes (16): refreshSession(), SocketContext, TooltipLongText(), CONTRACT_INVOICE_TYPES, CONTRACT_POLICY_STATUS_LABELS, INVOICE_VIEWS, ADR-0017, pathSocket (+8 more)

### Community 52 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 53 - "ref_jest_globals"
Cohesion: 0.06
Nodes (19): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+11 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "permissions.routes.js"
Cohesion: 0.15
Nodes (16): getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController(), permissionsRoutes (+8 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (28): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+20 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "ContactsEditor.jsx"
Cohesion: 0.16
Nodes (16): addressTypesApi, getAddressTypesSelectAPI, AddressTypePage, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS (+8 more)

### Community 59 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "AuthForgotPassword.jsx"
Cohesion: 0.12
Nodes (22): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI() (+14 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.13
Nodes (13): ref_fs, ref_path, ref_url, catalog, expected, prismaMock, ADR-0027, loggerMock (+5 more)

### Community 68 - "notifications.service.js"
Cohesion: 0.21
Nodes (15): express, getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount() (+7 more)

### Community 70 - "simpleInvoiceTerms.js"
Cohesion: 0.18
Nodes (16): previewSimpleInvoice(), blank(), composeSimpleInvoice(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023, ADR-0026 (+8 more)

### Community 71 - "App.jsx"
Cohesion: 0.16
Nodes (14): App(), ThemedToastContainer(), CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext, NavigationScroll(), SocketProvider() (+6 more)

### Community 88 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (104): constructionCompaniesApi, exportContractAPI(), exportContractsAPI(), contractTypesApi, identityDocumentsApi, insurersApi, exportInvoicesAPI(), getInvoiceFilterProvidersAPI() (+96 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.09
Nodes (30): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+22 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 108 - "runIdempotent"
Cohesion: 0.16
Nodes (16): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent(), deleteModuleDoc() (+8 more)

### Community 112 - "document.routes.js"
Cohesion: 0.23
Nodes (9): IDEMPOTENCY_HEADER, deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema, DOC_TYPES, paginationDocsSchema (+1 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.05
Nodes (80): getBusinessRulesAPI(), saveBusinessRulesAPI(), getIdentityDocumentsSelectAPI, deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI() (+72 more)

### Community 117 - "export.service.js"
Cohesion: 0.07
Nodes (46): exceljs, addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf(), buildPdfDocument() (+38 more)

### Community 118 - "formatTime.js"
Cohesion: 0.09
Nodes (24): deleteFileByPath(), uploadFile(), suspendContractAPI(), deleteDocApi(), paginationDocsApi(), saveDocApi(), getReasonsSelectAPI(), showPromise() (+16 more)

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
Cohesion: 0.07
Nodes (44): invoiceTransitionsApi, getWorksSummaryAPI(), gridSpacing, ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable() (+36 more)

### Community 125 - "contractEndDateReconciliation.service.js"
Cohesion: 0.18
Nodes (17): ADR-0015, findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS (+9 more)

### Community 129 - "providerTypeFields.service.js"
Cohesion: 0.29
Nodes (13): resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getProviderTypeFields(), httpError(), ADR-0006 (+5 more)

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "userFullName"
Cohesion: 0.11
Nodes (19): AUDIT_ENTITIES, USER_NAME_SELECT, userFullName(), getSessionInfo(), AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError() (+11 more)

### Community 133 - "PoliciesTab.jsx"
Cohesion: 0.08
Nodes (34): contractPoliciesApi, getInsurersSelectAPI, configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, PolicyTypePage, BaseDialog() (+26 more)

### Community 134 - "auth.service.js"
Cohesion: 0.08
Nodes (36): bcrypt, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+28 more)

### Community 136 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 137 - "contracts.controller.test.js"
Cohesion: 0.14
Nodes (12): conceptsServiceMock, contractsServiceMock, emit, exportContractReport, exportContractSummary, getEffectivePermissionIds, ADR-0015, ADR-0016 (+4 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 151 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 153 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 154 - "auth.controller.test.js"
Cohesion: 0.25
Nodes (6): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, mockUpdateThemeMode, sessionMock

### Community 155 - "decimal"
Cohesion: 0.07
Nodes (63): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), percentText() (+55 more)

### Community 156 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 157 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 159 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 173 - "dashboard.measure.js"
Cohesion: 0.36
Nodes (8): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain()

### Community 174 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 175 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 176 - "`tbl_users`"
Cohesion: 0.31
Nodes (7): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 181 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 186 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 197 - "WorkDetailPage.jsx"
Cohesion: 0.06
Nodes (73): getStatusesByScopeAPI(), contractsApi, getWorkManagersSelectAPI(), previewWorkEndDateAPI(), genericRequest, useSocket(), SubCard(), ContactsList() (+65 more)

### Community 201 - "MainCard.jsx"
Cohesion: 0.29
Nodes (6): useSchemePalette(), headerStyle, InvoicesByWorkCard(), PolicyStatusCard(), SamplePage(), react-apexcharts

### Community 202 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 203 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 204 - "floatingPoint.guard.test.js"
Cohesion: 0.29
Nodes (5): ALLOWED, files(), lines, SRC, text()

### Community 206 - "react-router-dom"
Cohesion: 0.13
Nodes (28): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), setParentOpenedMenu(), useMenuCollapse() (+20 more)

## Knowledge Gaps
- **1014 isolated node(s):** `ADR-0006`, `ADR-0016`, `ADR-0017`, `ADR-0018`, `CONTRACT_STATE_FILTER` (+1009 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1406 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **94 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0002` connect `contracts.service.js` to `MainCard.jsx`, `workDashboard.service.js`?**
  _High betweenness centrality (0.173) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `PoliciesTab.jsx`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `client/package.json`, `httpCliente.js`, `WorkDataForm.jsx`, `AuthenticationRoutes.jsx`, `WorkChartsTab.jsx`, `ImageList.jsx`, `constant.js`, `withAlpha`, `constants.js`, `DebouncedInput.jsx`, `ContactsEditor.jsx`, `AuthForgotPassword.jsx`, `InputLabel.jsx`, `WorkDetailPage.jsx`, `App.jsx`, `MainCard.jsx`, `react-router-dom`, `useAuth`, `NotificationSection/index.jsx`, `showError`, `formatTime.js`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Why does `axios` connect `client/package.json` to `httpCliente.js`, `server/package.json`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **What connects `ADR-0006`, `ADR-0016`, `ADR-0017` to the rest of the system?**
  _1014 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08325624421831637 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractTerms.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10256410256410256 - nodes in this community are weakly interconnected._
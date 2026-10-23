# Graph Report - WEBPAC-INTERVE  (2026-10-23)

## Corpus Check
- 630 files · ~331,078 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3653 nodes · 10037 edges · 203 communities (108 shown, 95 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 135 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `16e01ce6`
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
- auth.routes.js
- seed.demo.js
- client/package.json
- menu-items/index.js
- masterRouter.utils.js
- users.service.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- constants.js
- money.utils.js
- invoices.controller.test.js
- contracts.service.js
- billingTerms.js
- workScopeOf
- expirationNotice.service.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- getEffectivePermissionIds
- contractReports.service.js
- cron/index.js
- AuthForgotPassword.jsx
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorkChartsTab.jsx
- scripts
- MiniDrawerStyled.jsx
- `tbl_invoices`
- withAlpha
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
- EasyCrop.jsx
- permission
- devDependencies
- uniqueConstraints.constants.test.js
- policyTypes.service.test.js
- simpleInvoiceTerms.js
- themes/index.jsx
- `tbl_contract_status_history`
- socket.manager.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- NotificationSection/index.jsx
- status.constants.js
- browserslist
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- DocumentManagement.jsx
- effectivePermissions.service.js
- workDashboard.service.test.js
- `tbl_providers`
- transaction.service.test.js
- @mui/material
- balanceReconciliation.service.js
- useMenuCollapse.js
- serviceWorker.jsx
- `tbl_providers`
- invoiceEvidence.service.js
- PoliciesTab.jsx
- auth.service.js
- contracts.controller.test.js
- works.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- `tbl_user_permissions`
- handleFirebase.js
- decimal
- winston.config.js
- contractNotifications.service.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- dashboard.service.js
- ImageList.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- extends
- DebouncedInput.jsx
- auth.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- InputLabel.jsx
- WorkDetailPage.jsx
- contractEndDateReconciliation.service.test.js
- app.routes.js
- MainLayout/index.jsx
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
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js

## Import Cycles
- None detected.

## Communities (203 total, 95 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractTerms.js"
Cohesion: 0.07
Nodes (58): ADR-0015, addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), TERM_UNITS, termProgress() (+50 more)

### Community 3 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (61): ADR-0001, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0027, newOperationId() (+53 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (60): ADR-0009, assertInScope(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope() (+52 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (50): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, client_src_api_requests_invoicesapi_previewcontractinvoiceapi (+42 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.06
Nodes (57): sendExport(), exportFormatRule(), moneyRule(), percentRule(), getInvoiceEvidence(), groupOperations(), httpError(), isApproval() (+49 more)

### Community 9 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (51): contractConceptsApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016 (+43 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.10
Nodes (24): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0027 (+16 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.05
Nodes (59): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+51 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (33): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+25 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "masterRouter.utils.js"
Cohesion: 0.06
Nodes (49): express, getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers() (+41 more)

### Community 17 - "users.service.js"
Cohesion: 0.09
Nodes (26): hashPassword(), DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, identityDocumentsRoutes (+18 more)

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
Nodes (91): ADR-0013, ADR-0017, ADR-0021, ADR-0023, renderExport(), isBlank(), server_src_common_utils_money_utils_percentfor, toMoney() (+83 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.09
Nodes (42): ADR-0002, ADR-0011, todayDateOnly(), policyExpiringDays(), balancesOf(), byUrgency(), conceptLabel(), contractPolicies() (+34 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (50): ADR-0004, ADR-0007, PROGRESS_WARNING, defineContacts(), FIELDS, httpError(), ADR-0009, optionalText() (+42 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.06
Nodes (25): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+17 more)

### Community 27 - "constants.js"
Cohesion: 0.04
Nodes (71): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getMyWorksSelectAPI(), instance, NO_REFRESH_URLS (+63 more)

### Community 28 - "money.utils.js"
Cohesion: 0.14
Nodes (15): HUNDRED, MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ROUNDING, toPercent(), ZERO (+7 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "contracts.service.js"
Cohesion: 0.06
Nodes (89): AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+81 more)

### Community 31 - "billingTerms.js"
Cohesion: 0.24
Nodes (9): assertBillingFits(), BILLING_TYPES, billingDto(), httpError(), isBillingType(), money(), ZERO, SNAPSHOT_AMOUNTS (+1 more)

### Community 32 - "workScopeOf"
Cohesion: 0.07
Nodes (65): auditContext(), workScopeOf(), optionalDate(), ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController (+57 more)

### Community 33 - "expirationNotice.service.js"
Cohesion: 0.06
Nodes (41): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+33 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "getEffectivePermissionIds"
Cohesion: 0.16
Nodes (12): getEffectivePermissionIds(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes, ADR-0002, getMenu(), getSessionInfo() (+4 more)

### Community 38 - "contractReports.service.js"
Cohesion: 0.07
Nodes (48): findExportRows(), moneyText(), percentText(), sumMoney(), amountsDto(), approvalSnapshot(), approvedOf(), contractInvoicesForReport() (+40 more)

### Community 39 - "cron/index.js"
Cohesion: 0.10
Nodes (18): dotenv, ref_http, node-cron, prisma, app, server, STATUS_IDS, verifyStatusCatalog() (+10 more)

### Community 40 - "AuthForgotPassword.jsx"
Cohesion: 0.06
Nodes (42): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI() (+34 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.06
Nodes (39): ADR-0016, ADR-0024, ADR-0025, ADR-0026, ADR-0011, ADR-0012, ADR-0017, ADR-0018 (+31 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.08
Nodes (65): useSchemePalette(), MainCard(), fPercentText(), InvoicesByWorkCard(), PolicyStatusCard(), contractRows(), DrillDownDialog(), invoiceRows() (+57 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "MiniDrawerStyled.jsx"
Cohesion: 0.38
Nodes (5): MainContentStyled, closedMixin(), MiniDrawerStyled, openedMixin(), drawerWidth

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 51 - "ContractsPage.jsx"
Cohesion: 0.10
Nodes (24): contractsApi, exportContractsAPI(), ContractsPage, download(), downloadExport(), errorMessage(), EXPORT_FORMATS, ExportButton() (+16 more)

### Community 52 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 53 - "ref_jest_globals"
Cohesion: 0.07
Nodes (13): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, payload, prismaMock, prismaMock (+5 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "App.jsx"
Cohesion: 0.28
Nodes (8): refreshSession(), App(), ThemedToastContainer(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

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

### Community 62 - "EasyCrop.jsx"
Cohesion: 0.27
Nodes (4): volta, node, yarn, react-easy-crop

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "uniqueConstraints.constants.test.js"
Cohesion: 0.05
Nodes (37): ref_fs, ref_path, ref_url, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3 (+29 more)

### Community 68 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 70 - "simpleInvoiceTerms.js"
Cohesion: 0.15
Nodes (17): previewSimpleInvoice(), simpleSnapshot(), blank(), composeSimpleInvoice(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023 (+9 more)

### Community 71 - "themes/index.jsx"
Cohesion: 0.15
Nodes (13): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage(), createCustomShadow() (+5 more)

### Community 88 - "socket.manager.js"
Cohesion: 0.23
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (92): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, providerTypesApi, reasonsApi, supervisionTypesApi (+84 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.08
Nodes (35): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+27 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 108 - "status.constants.js"
Cohesion: 0.06
Nodes (56): ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused() (+48 more)

### Community 112 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.04
Nodes (106): getBusinessRulesAPI(), saveBusinessRulesAPI(), getConstructionCompaniesSelectAPI, contractPoliciesApi, suspendContractAPI(), getContractTypesSelectAPI, getIdentityDocumentsSelectAPI, invoiceTransitionsApi (+98 more)

### Community 117 - "export.service.js"
Cohesion: 0.07
Nodes (46): exceljs, pdfkit, addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+38 more)

### Community 118 - "DocumentManagement.jsx"
Cohesion: 0.29
Nodes (12): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), genericRequest, showPromise(), DocumentManagement() (+4 more)

### Community 119 - "effectivePermissions.service.js"
Cohesion: 0.06
Nodes (45): imap-simple, nodemailer, emailApp, nameApp, nameAppMail, DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES (+37 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): ALL, CONCEPTS, CONTRACT, INVOICES, OWN, prismaMock

### Community 123 - "transaction.service.test.js"
Cohesion: 0.26
Nodes (8): ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "@mui/material"
Cohesion: 0.05
Nodes (71): getAddressTypesSelectAPI, deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS (+63 more)

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.33
Nodes (8): balanceViolations(), CHECKS, findBalanceViolations(), ADR-0024, ADR-0025, runBalanceReconciliation(), violationLine(), contractBalances()

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "invoiceEvidence.service.js"
Cohesion: 0.13
Nodes (20): AUDIT_SELECT, ADR-0013, ADR-0027, SNAPSHOT_BALANCES, SNAPSHOT_PREFIX, assertTransition(), cancelTransitionFor(), historyRow() (+12 more)

### Community 133 - "PoliciesTab.jsx"
Cohesion: 0.09
Nodes (30): getInsurersSelectAPI, configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, PolicyTypePage, POLICY_BASE_OPTIONS, policyBaseName() (+22 more)

### Community 134 - "auth.service.js"
Cohesion: 0.08
Nodes (36): ADR-0027, bcrypt, ref_crypto, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER (+28 more)

### Community 137 - "contracts.controller.test.js"
Cohesion: 0.14
Nodes (12): conceptsServiceMock, contractsServiceMock, emit, exportContractReport, exportContractSummary, getEffectivePermissionIds, ADR-0015, ADR-0016 (+4 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 153 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 155 - "decimal"
Cohesion: 0.10
Nodes (42): @prisma/client, decimal(), ratioPercent(), ratioText(), roundMoney(), roundRatio(), advanceBalances(), appliedPct() (+34 more)

### Community 156 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 159 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 173 - "dashboard.service.js"
Cohesion: 0.15
Nodes (24): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+16 more)

### Community 174 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 176 - "`tbl_users`"
Cohesion: 0.31
Nodes (7): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

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
Cohesion: 0.05
Nodes (83): getStatusesByScopeAPI(), exportContractAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, InvoiceDetailPage, useSocket(), ContactsList() (+75 more)

### Community 202 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 203 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 206 - "MainLayout/index.jsx"
Cohesion: 0.15
Nodes (23): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), Footer(), Header() (+15 more)

## Knowledge Gaps
- **1012 isolated node(s):** `TABS`, `TABS`, `TABS`, `axios`, `@azure/identity` (+1007 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1404 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **95 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0002` connect `workDashboard.service.js` to `@mui/material`, `contracts.service.js`?**
  _High betweenness centrality (0.170) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `PoliciesTab.jsx`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `client/package.json`, `constants.js`, `AuthForgotPassword.jsx`, `WorkChartsTab.jsx`, `ImageList.jsx`, `MiniDrawerStyled.jsx`, `withAlpha`, `ContractsPage.jsx`, `App.jsx`, `DebouncedInput.jsx`, `EasyCrop.jsx`, `InputLabel.jsx`, `WorkDetailPage.jsx`, `themes/index.jsx`, `MainLayout/index.jsx`, `useAuth`, `NotificationSection/index.jsx`, `showError`, `DocumentManagement.jsx`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `ADR-0003` connect `useAuth` to `permissions.constants.js`, `status.constants.js`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `TABS`, `TABS`, `TABS` to the rest of the system?**
  _1012 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractTerms.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07019230769230769 - nodes in this community are weakly interconnected._
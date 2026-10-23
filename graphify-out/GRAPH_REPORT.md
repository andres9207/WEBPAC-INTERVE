# Graph Report - WEBPAC-INTERVE  (2026-10-23)

## Corpus Check
- 631 files · ~332,565 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3672 nodes · 10084 edges · 211 communities (117 shown, 94 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 135 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ecde86e1`
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
- idempotency.service.js
- DocumentManagement.jsx
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- httpCliente.js
- getIO
- invoices.controller.test.js
- contracts.service.js
- billingTerms.js
- workScopeOf
- expirationNotice.service.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- AuthForgotPassword.jsx
- withAlpha
- cron/index.js
- AppBar.jsx
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorkChartsTab.jsx
- scripts
- MainCard
- `tbl_invoices`
- AuthenticationRoutes.jsx
- ExportButton.jsx
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
- volta
- permission
- devDependencies
- contractFields.js
- updateInvoice
- simpleInvoiceTerms.js
- ProviderTypePage.jsx
- `tbl_contract_status_history`
- server.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- WorkSummaryTab.jsx
- users.service.js
- browserslist
- `tbl_works`
- `tbl_policies`
- react
- export.service.js
- NotificationSection/index.jsx
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- transaction.service.test.js
- @mui/material
- balanceReconciliation.service.js
- ProfilePage.jsx
- serviceWorker.jsx
- `tbl_providers`
- invoiceTerms.js
- PoliciesTab.jsx
- withLockedTransaction
- constants.js
- contracts.controller.test.js
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
- addressTypes.service.js
- contractNotifications.service.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- workDashboard.utils.js
- ImageList.jsx
- ContactsEditor.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- extends
- @mui/icons-material
- EasyCrop.jsx
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- WorkDetailPage.jsx
- retentionTerms.js
- contractEndDateReconciliation.service.test.js
- app.routes.js
- react-router-dom
- workScope.service.js
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
9. `@tabler/icons-react` - 56 edges
10. `showSuccess()` - 55 edges

## Surprising Connections (you probably didn't know these)
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `previewWorkEndDate()` --calls--> `addTerm()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/term.utils.js

## Import Cycles
- None detected.

## Communities (211 total, 94 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (22): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DateTimePickerToolbar() (+14 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractTerms.js"
Cohesion: 0.04
Nodes (77): ADR-0015, ADR-0021, moneyText(), server_src_common_utils_money_utils_percentfor, percentText(), sumMoney(), amountsDto(), approvalSnapshot() (+69 more)

### Community 3 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (94): diffFields(), newOperationId(), FIELD_GROUPS, withContractAiu(), assertContractStillAdmits(), persistProfile(), activeSequence(), amendmentResult() (+86 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (38): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+30 more)

### Community 6 - "providers.service.js"
Cohesion: 0.07
Nodes (61): DIAN_WEIGHTS, GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, assertIdentification(), applyAssignmentTypes(), applyProviderTypes() (+53 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (50): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, client_src_api_requests_invoicesapi_previewcontractinvoiceapi (+42 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.08
Nodes (44): sendExport(), exportFormatRule(), accessOf(), approveInvoiceController, cancelInvoiceController, deleteInvoiceController, exportInvoicesController, getContractAdvanceController (+36 more)

### Community 9 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (52): contractConceptsApi, contractPoliciesApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006 (+44 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.09
Nodes (29): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+21 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (30): ADR-0001, THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController() (+22 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.05
Nodes (59): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+51 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (33): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+25 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, icons, other, icons (+7 more)

### Community 16 - "idempotency.service.js"
Cohesion: 0.07
Nodes (42): express, verifyToken(), requirePermission(), validate(), canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), IDEMPOTENCY_HEADER (+34 more)

### Community 17 - "DocumentManagement.jsx"
Cohesion: 0.14
Nodes (18): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+10 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.14
Nodes (21): jsonwebtoken, ACCESS_COOKIE_NAME, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken() (+13 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.05
Nodes (56): ADR-0013, ADR-0017, ADR-0023, ADR-0027, server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields (+48 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.06
Nodes (77): ADR-0011, ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile() (+69 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.09
Nodes (49): ADR-0007, writeAudit(), assertInScope(), PROGRESS_WARNING, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections() (+41 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.07
Nodes (21): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+13 more)

### Community 27 - "httpCliente.js"
Cohesion: 0.11
Nodes (25): getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, RETRY_503_HINT, pickWork(), useWorkScope(), WorkScopeContext (+17 more)

### Community 28 - "getIO"
Cohesion: 0.13
Nodes (16): getIO(), configurePolicyTypeBaseController, FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, deleteProfileController(), getModulesController() (+8 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "contracts.service.js"
Cohesion: 0.07
Nodes (51): ADR-0006, scopeWhere(), containsFilter(), dateRangeFilter(), filtersWhere(), idFilter(), USER_NAME_SELECT, userFullName() (+43 more)

### Community 31 - "billingTerms.js"
Cohesion: 0.36
Nodes (6): assertBillingFits(), BILLING_TYPES, billingDto(), httpError(), money(), ZERO

### Community 32 - "workScopeOf"
Cohesion: 0.07
Nodes (60): auditContext(), workScopeOf(), ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController, createLiquidationController (+52 more)

### Community 33 - "expirationNotice.service.js"
Cohesion: 0.15
Nodes (22): BUSINESS_RULES, getBusinessRulesController, saveBusinessRulesController, FIELD_BY_KEY, getBusinessRules(), getRuleValues(), httpError(), ADR-0002 (+14 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "AuthForgotPassword.jsx"
Cohesion: 0.12
Nodes (21): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI() (+13 more)

### Community 38 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 39 - "cron/index.js"
Cohesion: 0.18
Nodes (10): node-cron, cronJobs, ADR-0017, registeredTasks, startCronJobs(), wrapHandler(), contractBalanceReconciliationJob, contractEndDateReconciliationJob (+2 more)

### Community 40 - "AppBar.jsx"
Cohesion: 0.23
Nodes (10): client_src_assets_images_interadminpro, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthCardWrapper(), AuthWrapper1 (+2 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.06
Nodes (43): ADR-0016, ADR-0024, ADR-0025, ADR-0011, ADR-0012, ADR-0017, ADR-0018, ADR-0019 (+35 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.15
Nodes (13): client_src_assets_scss_style, config, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals() (+5 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.15
Nodes (30): Advances(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf(), drillLinkSx, Empty() (+22 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "MainCard"
Cohesion: 0.17
Nodes (21): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, useSchemePalette(), MainCard(), invoicePath(), AlertsCard(), Empty() (+13 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "AuthenticationRoutes.jsx"
Cohesion: 0.18
Nodes (11): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router (+3 more)

### Community 51 - "ExportButton.jsx"
Cohesion: 0.46
Nodes (6): download(), downloadExport(), errorMessage(), EXPORT_FORMATS, ExportButton(), ExportDialog()

### Community 52 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 53 - "ref_jest_globals"
Cohesion: 0.05
Nodes (22): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+14 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "App.jsx"
Cohesion: 0.13
Nodes (17): refreshSession(), App(), ThemedToastContainer(), CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext, NavigationScroll() (+9 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (36): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+28 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 59 - "session.service.test.js"
Cohesion: 0.09
Nodes (16): ref_crypto, deriveKey(), hashResetCode(), ADR-0001, verifyResetCode(), dbUser, mockDisconnectSockets, mockIn (+8 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "contractFields.js"
Cohesion: 0.06
Nodes (36): ref_fs, ref_path, ref_url, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3 (+28 more)

### Community 68 - "updateInvoice"
Cohesion: 0.17
Nodes (26): approveInvoice(), assertContractAdmitsCancel(), assertInvoiceVisible(), assertStage(), assertUniqueNumber(), assertWork(), auditable(), cancelInvoice() (+18 more)

### Community 70 - "simpleInvoiceTerms.js"
Cohesion: 0.13
Nodes (22): toMoney(), toPercent(), adjustableAmount(), amountPairOf(), isSimpleType(), optionalText(), previewSimpleInvoice(), requestedDetailChanges() (+14 more)

### Community 71 - "ProviderTypePage.jsx"
Cohesion: 0.14
Nodes (17): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+9 more)

### Community 88 - "server.js"
Cohesion: 0.11
Nodes (18): ref_http, socket.io, app, server, authenticateHandshake(), getCookieValue(), init(), allowedHosts (+10 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (87): addressTypesApi, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, insurersApi, reasonsApi (+79 more)

### Community 100 - "works.routes.js"
Cohesion: 0.12
Nodes (21): changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, previewWorkEndDateController, saveWorkController (+13 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "WorkSummaryTab.jsx"
Cohesion: 0.20
Nodes (22): contractRows(), DrillDownDialog(), invoiceRows(), num, useDrillDown(), dashboardTo, initialsOf(), plural() (+14 more)

### Community 108 - "users.service.js"
Cohesion: 0.06
Nodes (49): ADR-0004, adapter, prisma, ACTIVE_STATUS, INACTIVE_STATUS, runIdempotent(), capitalize(), createMasterService() (+41 more)

### Community 112 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "react"
Cohesion: 0.05
Nodes (89): getBusinessRulesAPI(), saveBusinessRulesAPI(), suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, getModulesAPI(), getProfilesAPI(), saveProfileAPI() (+81 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (51): exceljs, addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf(), buildPdfDocument() (+43 more)

### Community 118 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.10
Nodes (28): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+20 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): ALL, CONCEPTS, CONTRACT, INVOICES, OWN, prismaMock

### Community 123 - "transaction.service.test.js"
Cohesion: 0.26
Nodes (8): ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "@mui/material"
Cohesion: 0.06
Nodes (48): getWorksSummaryAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, SubCard(), ACTION_TONES, ActionButton() (+40 more)

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.24
Nodes (12): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS, findBalanceViolations() (+4 more)

### Community 129 - "ProfilePage.jsx"
Cohesion: 0.17
Nodes (19): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+11 more)

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "invoiceTerms.js"
Cohesion: 0.16
Nodes (18): isContractCreate(), isCreate(), isSimpleCreate(), assertTransition(), cancelTransitionFor(), hasContract(), historyRow(), httpError() (+10 more)

### Community 133 - "PoliciesTab.jsx"
Cohesion: 0.09
Nodes (30): getInsurersSelectAPI, configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, PolicyTypePage, POLICY_BASE_OPTIONS, policyBaseName() (+22 more)

### Community 134 - "withLockedTransaction"
Cohesion: 0.04
Nodes (66): bcrypt, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0027, protect(), REDACTED (+58 more)

### Community 136 - "constants.js"
Cohesion: 0.05
Nodes (49): contractsApi, exportContractsAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), useWorkFilterField(), ContractsPage, SocketContext, LinkedFilterNotice() (+41 more)

### Community 137 - "contracts.controller.test.js"
Cohesion: 0.14
Nodes (12): conceptsServiceMock, contractsServiceMock, emit, exportContractReport, exportContractSummary, getEffectivePermissionIds, ADR-0015, ADR-0016 (+4 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "invoiceEvidence.service.js"
Cohesion: 0.21
Nodes (12): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+4 more)

### Community 151 - "seed.js"
Cohesion: 0.11
Nodes (16): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+8 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.18
Nodes (16): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+8 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 155 - "decimal"
Cohesion: 0.12
Nodes (31): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE (+23 more)

### Community 156 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 157 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 159 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 173 - "workDashboard.utils.js"
Cohesion: 0.25
Nodes (7): CONTRACT_STATE_CHART_COLORS, INVOICE_TYPE_COLORS, MANAGER_ROLE_NAMES, MONTH_NAMES, monthLabel(), MONTHS, POLICY_STATUS_COLORS

### Community 174 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

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

### Community 181 - "@mui/icons-material"
Cohesion: 0.33
Nodes (5): menuItems, DatePicker(), Breadcrumbs(), BTitle(), @mui/icons-material

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
Nodes (82): getStatusesByScopeAPI(), exportContractAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, InvoiceDetailPage, ContactsList(), ADR-0009 (+74 more)

### Community 199 - "retentionTerms.js"
Cohesion: 0.15
Nodes (22): isBillingType(), balanceChange(), contractBalances(), getContractAdvance(), hasDetail(), resolveDetail(), revalidateOnApprove(), revalidateOnCancel() (+14 more)

### Community 202 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 203 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 206 - "react-router-dom"
Cohesion: 0.11
Nodes (30): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), setParentOpenedMenu(), useMenuCollapse() (+22 more)

### Community 212 - "workScope.service.js"
Cohesion: 0.07
Nodes (32): getEffectivePermissionIds(), hasEffectivePermission(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere() (+24 more)

## Knowledge Gaps
- **1017 isolated node(s):** `work`, `PAGES`, `PERMISSIONS`, `PERMISSIONS_NO_PAGE`, `VIEW_PERMISSIONS` (+1012 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1414 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **94 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0002` connect `MainCard` to `workDashboard.service.js`, `contracts.service.js`?**
  _High betweenness centrality (0.201) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `ProfilePage.jsx`, `server/package.json`, `PoliciesTab.jsx`, `InvoiceFormPage.jsx`, `constants.js`, `ConceptDialog.jsx`, `client/package.json`, `DocumentManagement.jsx`, `httpCliente.js`, `AuthForgotPassword.jsx`, `withAlpha`, `AppBar.jsx`, `WorkChartsTab.jsx`, `ImageList.jsx`, `ContactsEditor.jsx`, `MainCard`, `AuthenticationRoutes.jsx`, `ExportButton.jsx`, `@mui/icons-material`, `App.jsx`, `EasyCrop.jsx`, `WorkDetailPage.jsx`, `ProviderTypePage.jsx`, `react-router-dom`, `useAuth`, `WorkSummaryTab.jsx`, `react`, `NotificationSection/index.jsx`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **Why does `axios` connect `httpCliente.js` to `server/package.json`, `client/package.json`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **What connects `work`, `PAGES`, `PERMISSIONS` to the rest of the system?**
  _1017 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08985200845665962 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractTerms.js` be split into smaller, more focused modules?**
  _Cohesion score 0.04245709123757904 - nodes in this community are weakly interconnected._
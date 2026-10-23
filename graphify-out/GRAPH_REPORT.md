# Graph Report - WEBPAC-INTERVE  (2026-10-23)

## Corpus Check
- 630 files · ~332,066 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3659 nodes · 10060 edges · 219 communities (126 shown, 93 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 135 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d6a44765`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- workDashboard.service.js
- contractPolicies.service.js
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
- @tabler/icons-react
- masterRouter.utils.js
- httpCliente.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- dashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- WorkScopeContext.jsx
- InvoicesPage.jsx
- invoices.controller.test.js
- contracts.service.js
- billingTerms.js
- contracts.routes.js
- expirationNotice.service.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- authContext.jsx
- contractReports.service.js
- cron/index.js
- AuthenticationRoutes.jsx
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorkChartsTab.jsx
- scripts
- GeneralDashboard.jsx
- `tbl_invoices`
- ProviderDetailPage.jsx
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
- transaction.service.test.js
- updateInvoice
- simpleInvoiceTerms.js
- ProviderTypePage.jsx
- `tbl_contract_status_history`
- socket.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- WorkSummaryTab.jsx
- users.service.js
- browserslist
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- handleFirebase.js
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- error.middleware.test.js
- @mui/material
- balanceReconciliation.service.js
- ProfilePage.jsx
- serviceWorker.jsx
- `tbl_providers`
- invoiceEvidence.service.js
- PoliciesTab.jsx
- audit.service.js
- constants.js
- contracts.controller.test.js
- works.service.test.js
- formatTime.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- seed.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- decimal
- winston.config.js
- uniqueConstraints.constants.test.js
- contractNotifications.service.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- prismaClient.js
- ImageList.jsx
- ContactsEditor.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- extends
- contractReports.service.test.js
- DebouncedInput.jsx
- auth.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- images.js
- WorkDetailPage.jsx
- renderExport
- requestedDetailChanges
- contractSummaryReport.test.js
- contractEndDateReconciliation.service.test.js
- app.routes.js
- decisionReferences.guard.test.js
- react
- users.service.test.js
- expirationNotice.service.test.js
- getEffectivePermissionIds
- `tbl_invoices`
- `tbl_invoices`
- formatNumber.js
- identityDocuments.service.js

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
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js

## Import Cycles
- None detected.

## Communities (219 total, 93 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.05
Nodes (41): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Avatar() (+33 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "workDashboard.service.js"
Cohesion: 0.05
Nodes (88): ADR-0002, ADR-0011, ADR-0015, moneyText(), sumMoney(), addTerm(), dateOnlyText(), daysInMonth() (+80 more)

### Community 3 - "contractPolicies.service.js"
Cohesion: 0.07
Nodes (88): diffFields(), newOperationId(), writeAudit(), withLockedTransaction(), percentText(), toPercent(), configurePolicyTypeBase(), withContractAiu() (+80 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (62): assertInScope(), identificationError(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope() (+54 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.10
Nodes (38): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, client_src_api_requests_invoicesapi_previewcontractinvoiceapi (+30 more)

### Community 8 - "workScopeOf"
Cohesion: 0.09
Nodes (45): sendExport(), workScopeOf(), exportFormatRule(), accessOf(), approveInvoiceController, cancelInvoiceController, deleteInvoiceController, exportInvoicesController (+37 more)

### Community 9 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (48): contractConceptsApi, getContractFieldsAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+40 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.10
Nodes (26): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+18 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (30): jsonwebtoken, THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController() (+22 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.06
Nodes (53): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+45 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (34): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+26 more)

### Community 15 - "@tabler/icons-react"
Cohesion: 0.08
Nodes (25): updateThemeModeAPI(), ProfileSection(), HeaderAvatar(), MobileSearch(), SearchSection(), ThemeModeSection(), admin, icons (+17 more)

### Community 16 - "masterRouter.utils.js"
Cohesion: 0.07
Nodes (43): express, getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), ACCESS_COOKIE_NAME, createMasterControllers() (+35 more)

### Community 17 - "httpCliente.js"
Cohesion: 0.08
Nodes (37): deleteFileByPath(), uploadFile(), constructionCompaniesApi, getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, deleteDocApi(), paginationDocsApi(), saveDocApi() (+29 more)

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
Nodes (58): ADR-0013, ADR-0017, ADR-0021, ADR-0023, server_src_common_utils_money_utils_percentfor, server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice (+50 more)

### Community 22 - "dashboard.service.js"
Cohesion: 0.07
Nodes (50): scopeWhere(), percentOf(), containsFilter(), dateRangeFilter(), filtersWhere(), idFilter(), policyExpiringDays(), insuredValue() (+42 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (49): ADR-0007, toMoney(), PROGRESS_WARNING, defineContacts(), FIELDS, httpError(), ADR-0009, optionalText() (+41 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.06
Nodes (25): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+17 more)

### Community 27 - "WorkScopeContext.jsx"
Cohesion: 0.14
Nodes (25): getWorkDashboardAPI(), ADR-0002, getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), getMyWorksSelectAPI(), pickWork() (+17 more)

### Community 28 - "InvoicesPage.jsx"
Cohesion: 0.06
Nodes (36): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), worksApi, useWorkFilterField(), ADR-0002, useLinkedFilters(), InvoicesPage, ProvidersPage (+28 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "contracts.service.js"
Cohesion: 0.07
Nodes (47): ADR-0006, AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+39 more)

### Community 31 - "billingTerms.js"
Cohesion: 0.19
Nodes (12): assertBillingFits(), BILLING_TYPES, billingBalances(), billingDto(), httpError(), money(), ZERO, approvedOf() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.06
Nodes (63): auditContext(), optionalDate(), ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController, createLiquidationController (+55 more)

### Community 33 - "expirationNotice.service.js"
Cohesion: 0.14
Nodes (25): AUDIT_ENTITIES, BUSINESS_RULES, getBusinessRulesController, saveBusinessRulesController, FIELD_BY_KEY, getBusinessRules(), getRuleValues(), httpError() (+17 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "authContext.jsx"
Cohesion: 0.13
Nodes (21): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), AuthProvider() (+13 more)

### Community 38 - "contractReports.service.js"
Cohesion: 0.10
Nodes (27): ADVANCE_COLUMNS, advanceTotals(), authored(), balanceFields(), CONCEPT_COLUMNS, conceptLabel(), CONTRACT_COLUMNS, CONTRACT_REPORTS (+19 more)

### Community 39 - "cron/index.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+8 more)

### Community 40 - "AuthenticationRoutes.jsx"
Cohesion: 0.11
Nodes (20): client_src_assets_images_interadminpro, LogoSection(), MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage() (+12 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (51): ADR-0003, ADR-0016, ADR-0024, ADR-0025, ADR-0011, ADR-0012, ADR-0017, ADR-0018 (+43 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.11
Nodes (40): useSchemePalette(), fPercentText(), Advances(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf() (+32 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "GeneralDashboard.jsx"
Cohesion: 0.25
Nodes (14): getDashboardSummaryAPI(), invoicePath(), AlertsCard(), Empty(), LatestInvoicesCard(), num, QuickAccessCard(), UpcomingPoliciesCard() (+6 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "ProviderDetailPage.jsx"
Cohesion: 0.08
Nodes (43): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, getProviderTypesSelectAPI (+35 more)

### Community 51 - "ExportButton.jsx"
Cohesion: 0.46
Nodes (6): download(), downloadExport(), errorMessage(), EXPORT_FORMATS, ExportButton(), ExportDialog()

### Community 52 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 53 - "ref_jest_globals"
Cohesion: 0.05
Nodes (20): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+12 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "App.jsx"
Cohesion: 0.15
Nodes (14): refreshSession(), App(), ThemedToastContainer(), config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext (+6 more)

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

### Community 62 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "updateInvoice"
Cohesion: 0.17
Nodes (29): adjustableAmount(), approveInvoice(), assertContractAdmitsCancel(), assertInvoiceVisible(), assertStage(), assertUniqueNumber(), assertWork(), auditable() (+21 more)

### Community 70 - "simpleInvoiceTerms.js"
Cohesion: 0.16
Nodes (18): previewSimpleInvoice(), simpleSnapshot(), blank(), composeSimpleInvoice(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023 (+10 more)

### Community 71 - "ProviderTypePage.jsx"
Cohesion: 0.14
Nodes (17): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+9 more)

### Community 88 - "socket.js"
Cohesion: 0.31
Nodes (8): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), isSessionActive()

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.03
Nodes (64): addressTypesApi, contractTypesApi, identityDocumentsApi, insurersApi, reasonsApi, supervisionTypesApi, router, AddressTypePage (+56 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.09
Nodes (31): IDEMPOTENCY_HEADER, ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope() (+23 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "WorkSummaryTab.jsx"
Cohesion: 0.17
Nodes (27): MainCard(), fMoneyText(), PolicyStatusCard(), contractRows(), DrillDownDialog(), invoiceRows(), num, useDrillDown() (+19 more)

### Community 108 - "users.service.js"
Cohesion: 0.05
Nodes (62): ADR-0001, ADR-0004, ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, AUDIT_OPERATIONS, canonical(), EXCLUDED_FROM_FINGERPRINT (+54 more)

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
Cohesion: 0.07
Nodes (54): getBusinessRulesAPI(), saveBusinessRulesAPI(), getProfilesAPI(), getReasonsSelectAPI(), deleteUserAPI(), getBasicInformationAPI(), paginationUsersAPI(), saveUserAPI() (+46 more)

### Community 117 - "export.service.js"
Cohesion: 0.15
Nodes (30): addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf(), buildPdfDocument(), cellText() (+22 more)

### Community 118 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

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
Cohesion: 0.08
Nodes (36): getWorksSummaryAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, ACTION_TONES, ActionButton(), toneOf() (+28 more)

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.21
Nodes (14): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations() (+6 more)

### Community 129 - "ProfilePage.jsx"
Cohesion: 0.11
Nodes (19): getStatusesByScopeAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters(), ProfilesPage, UsersPage, FilterButton() (+11 more)

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "invoiceEvidence.service.js"
Cohesion: 0.10
Nodes (26): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+18 more)

### Community 133 - "PoliciesTab.jsx"
Cohesion: 0.13
Nodes (20): contractPoliciesApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, PercentField(), toText(), toValue(), ConfigPercent(), ADR-0018 (+12 more)

### Community 134 - "audit.service.js"
Cohesion: 0.07
Nodes (39): ADR-0027, bcrypt, ref_crypto, auditMisuse(), buildRows(), ADR-0027, protect(), REDACTED (+31 more)

### Community 136 - "constants.js"
Cohesion: 0.05
Nodes (45): contractsApi, exportContractsAPI(), getContractFilterProvidersAPI(), configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, ContractsPage, PolicyTypePage (+37 more)

### Community 137 - "contracts.controller.test.js"
Cohesion: 0.14
Nodes (12): conceptsServiceMock, contractsServiceMock, emit, exportContractReport, exportContractSummary, getEffectivePermissionIds, ADR-0015, ADR-0016 (+4 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "formatTime.js"
Cohesion: 0.11
Nodes (13): suspendContractAPI(), invoiceTransitionsApi, DateField(), toDate(), SHORT_MONTHS, ApproveInvoiceDialog(), ADR-0020, today() (+5 more)

### Community 151 - "seed.js"
Cohesion: 0.11
Nodes (16): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+8 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 155 - "decimal"
Cohesion: 0.09
Nodes (46): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent() (+38 more)

### Community 156 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 157 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 159 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 173 - "prismaClient.js"
Cohesion: 0.08
Nodes (26): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+18 more)

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

### Community 181 - "contractReports.service.test.js"
Cohesion: 0.20
Nodes (6): exceljs, COLUMNS, ROWS, concept(), contract(), prismaMock

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

### Community 194 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 197 - "WorkDetailPage.jsx"
Cohesion: 0.09
Nodes (54): exportContractAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), SubCard(), DataList(), Figure(), SummaryAside(), FormSection() (+46 more)

### Community 198 - "renderExport"
Cohesion: 0.29
Nodes (10): findExportRows(), httpError(), renderDocument(), renderExport(), renderWith(), exportInvoices(), contractOf(), exportContractReport() (+2 more)

### Community 199 - "requestedDetailChanges"
Cohesion: 0.27
Nodes (10): isBillingType(), approvalSnapshot(), detailChanges(), detailText(), isSimpleType(), requestedDetailChanges(), SNAPSHOT_AMOUNTS, snapshotText() (+2 more)

### Community 201 - "contractSummaryReport.test.js"
Cohesion: 0.22
Nodes (6): contract, contractBalances, contractInvoicesForReport, getContract, getContractPolicies, SCOPE

### Community 202 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 203 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 204 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 206 - "react"
Cohesion: 0.09
Nodes (36): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), ConfigContext, ConfigProvider(), useConfig() (+28 more)

### Community 209 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 211 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 212 - "getEffectivePermissionIds"
Cohesion: 0.15
Nodes (13): getEffectivePermissionIds(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes, ADR-0002, getMenu(), getSessionInfo() (+5 more)

### Community 217 - "formatNumber.js"
Cohesion: 0.19
Nodes (11): previewSimpleInvoiceAPI(), MoneyField(), moneyInputText(), parseMoneyInput(), MONEY, InvoiceDetailPanel(), FIELDS, moneyRules() (+3 more)

### Community 218 - "identityDocuments.service.js"
Cohesion: 0.18
Nodes (10): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, ADR-0008, identityDocumentsConfig, identityDocumentsService, ADR-0008 (+2 more)

## Knowledge Gaps
- **1012 isolated node(s):** `FILTER_FIELDS`, `ADR-0013`, `ADR-0027`, `USER_SORT_FIELDS`, `AUDITED_USER_FIELDS` (+1007 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1404 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **93 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0002` connect `workDashboard.service.js` to `GeneralDashboard.jsx`, `contracts.service.js`?**
  _High betweenness centrality (0.194) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `ProfilePage.jsx`, `PoliciesTab.jsx`, `InvoiceFormPage.jsx`, `constants.js`, `ConceptDialog.jsx`, `client/package.json`, `@tabler/icons-react`, `formatTime.js`, `httpCliente.js`, `WorkScopeContext.jsx`, `InvoicesPage.jsx`, `authContext.jsx`, `AuthenticationRoutes.jsx`, `WorkChartsTab.jsx`, `ImageList.jsx`, `ContactsEditor.jsx`, `GeneralDashboard.jsx`, `ProviderDetailPage.jsx`, `ExportButton.jsx`, `App.jsx`, `DebouncedInput.jsx`, `WorkDetailPage.jsx`, `ProviderTypePage.jsx`, `react`, `formatNumber.js`, `MainRoutes.jsx`, `WorkSummaryTab.jsx`, `showError`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Why does `axios` connect `httpCliente.js` to `server/package.json`, `client/package.json`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **What connects `FILTER_FIELDS`, `ADR-0013`, `ADR-0027` to the rest of the system?**
  _1012 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.054773082942097026 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `workDashboard.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.053303471444568866 - nodes in this community are weakly interconnected._
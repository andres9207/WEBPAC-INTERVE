# Graph Report - WEBPAC-INTERVE  (2026-10-23)

## Corpus Check
- 630 files · ~331,981 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3659 nodes · 10059 edges · 216 communities (123 shown, 93 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 135 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d0702051`
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
- invoices.routes.js
- workScopeOf
- ConceptDialog.jsx
- providers.routes.js
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
- GeneralDashboard.jsx
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
- @mui/material
- `tbl_invoices`
- NewProviderDialog.jsx
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
- volta
- permission
- devDependencies
- transaction.service.test.js
- updateInvoice
- simpleInvoiceTerms.js
- WorkDataForm.jsx
- `tbl_contract_status_history`
- socket.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- NotificationSection/index.jsx
- users.service.js
- browserslist
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- DocumentManagement.jsx
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- error.middleware.test.js
- ref_prop_types
- balanceReconciliation.service.js
- UsersPage.jsx
- serviceWorker.jsx
- `tbl_providers`
- invoiceEvidence.service.js
- PoliciesTab.jsx
- audit.service.js
- constants.js
- contracts.controller.test.js
- works.service.test.js
- getIO
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
- app.service.js
- decisionReferences.guard.test.js
- react
- users.service.test.js
- expirationNotice.service.test.js
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
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `previewWorkEndDate()` --calls--> `addTerm()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/term.utils.js

## Import Cycles
- None detected.

## Communities (216 total, 93 thin omitted)

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
Nodes (89): diffFields(), newOperationId(), writeAudit(), withLockedTransaction(), percentText(), toPercent(), configurePolicyTypeBase(), withContractAiu() (+81 more)

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
Cohesion: 0.07
Nodes (49): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, client_src_api_requests_invoicesapi_previewcontractinvoiceapi (+41 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.08
Nodes (38): sendExport(), exportFormatRule(), accessOf(), exportInvoicesController, getContractAdvanceController, getInvoiceController, getInvoiceEvidenceController, getInvoiceFormOptionsController (+30 more)

### Community 9 - "workScopeOf"
Cohesion: 0.08
Nodes (58): auditContext(), getEffectivePermissionIds(), workScopeOf(), approveInvoiceController, cancelInvoiceController, deleteInvoiceController, notify(), pick() (+50 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (52): contractConceptsApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+44 more)

### Community 11 - "providers.routes.js"
Cohesion: 0.07
Nodes (35): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+27 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.06
Nodes (53): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+45 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (34): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+26 more)

### Community 15 - "@tabler/icons-react"
Cohesion: 0.07
Nodes (26): admin, icons, billing, dashboard, icons, menuItems, icons, other (+18 more)

### Community 16 - "masterRouter.utils.js"
Cohesion: 0.07
Nodes (37): express, jsonwebtoken, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), ACCESS_COOKIE_NAME, createMasterControllers() (+29 more)

### Community 17 - "httpCliente.js"
Cohesion: 0.09
Nodes (23): getIdentityDocumentsSelectAPI, getModulesAPI(), getProfilesAPI(), saveProfileAPI(), saveUserAPI(), genericRequest, instance, NO_REFRESH_URLS (+15 more)

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
Nodes (50): ADR-0004, ADR-0007, toMoney(), PROGRESS_WARNING, defineContacts(), FIELDS, httpError(), ADR-0009 (+42 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.06
Nodes (25): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+17 more)

### Community 27 - "GeneralDashboard.jsx"
Cohesion: 0.10
Nodes (37): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, getMyWorksSelectAPI(), pickWork(), useWorkFilterField(), useWorkScope(), WorkScopeContext (+29 more)

### Community 28 - "InvoicesPage.jsx"
Cohesion: 0.08
Nodes (27): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), worksApi, ADR-0002, useLinkedFilters(), InvoicesPage, WorksPage, INVOICE_STATE_TABS (+19 more)

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
Cohesion: 0.08
Nodes (39): moneyRule(), optionalDate(), percentRule(), simpleAmountRules(), previewContractConceptController, contractsRoutes, ADR-0006, ADR-0016 (+31 more)

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
Nodes (21): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.04
Nodes (58): ADR-0016, ADR-0024, ADR-0025, ADR-0011, ADR-0012, ADR-0017, ADR-0018, ADR-0019 (+50 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.08
Nodes (71): useSchemePalette(), MainCard(), fMoneyText(), fPercentText(), InvoicesByWorkCard(), PolicyStatusCard(), contractRows(), DrillDownDialog() (+63 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "@mui/material"
Cohesion: 0.09
Nodes (19): MainContentStyled, closedMixin(), MiniDrawerStyled, openedMixin(), appDrawerWidth, drawerWidth, CardSecondaryAction(), headerStyle (+11 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "NewProviderDialog.jsx"
Cohesion: 0.15
Nodes (22): checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, workProvidersApi, getProviderTypesSelectAPI, SelectSocket(), STATUS (+14 more)

### Community 51 - "ContractsPage.jsx"
Cohesion: 0.10
Nodes (22): exportContractsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), ContractsPage, download(), downloadExport(), errorMessage(), EXPORT_FORMATS (+14 more)

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
Cohesion: 0.21
Nodes (10): refreshSession(), App(), ThemedToastContainer(), AuthContext, NavigationScroll(), SocketProvider(), ThemeCustomization(), Typography() (+2 more)

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

### Community 71 - "WorkDataForm.jsx"
Cohesion: 0.15
Nodes (16): constructionCompaniesApi, getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getProviderTypeFieldsAPI(), saveProviderTypeFieldsAPI(), getSupervisionTypesSelectAPI, createMasterApi(), DATA_TYPE_NAMES (+8 more)

### Community 88 - "socket.js"
Cohesion: 0.31
Nodes (8): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), isSessionActive()

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (82): addressTypesApi, contractTypesApi, identityDocumentsApi, insurersApi, policyTypesApi, providerTypesApi, reasonsApi, supervisionTypesApi (+74 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.09
Nodes (27): IDEMPOTENCY_HEADER, ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope() (+19 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "NotificationSection/index.jsx"
Cohesion: 0.29
Nodes (11): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+3 more)

### Community 108 - "users.service.js"
Cohesion: 0.06
Nodes (60): ADR-0001, ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, AUDIT_OPERATIONS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay() (+52 more)

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
Cohesion: 0.09
Nodes (46): getBusinessRulesAPI(), saveBusinessRulesAPI(), suspendContractAPI(), invoiceTransitionsApi, getReasonsSelectAPI(), getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI() (+38 more)

### Community 117 - "export.service.js"
Cohesion: 0.15
Nodes (30): addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf(), buildPdfDocument(), cellText() (+22 more)

### Community 118 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): ALL, CONCEPTS, CONTRACT, INVOICES, OWN, prismaMock

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "ref_prop_types"
Cohesion: 0.10
Nodes (27): getStatusesByScopeAPI(), getWorksSummaryAPI(), ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable(), CACHE_PENDING (+19 more)

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.21
Nodes (14): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations() (+6 more)

### Community 129 - "UsersPage.jsx"
Cohesion: 0.15
Nodes (22): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+14 more)

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
Cohesion: 0.17
Nodes (17): contractPoliciesApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, ADR-0018, PoliciesDraftEditor(), rowKey(), ADR-0017, ADR-0018 (+9 more)

### Community 134 - "audit.service.js"
Cohesion: 0.07
Nodes (39): ADR-0027, bcrypt, ref_crypto, auditMisuse(), buildRows(), ADR-0027, protect(), REDACTED (+31 more)

### Community 136 - "constants.js"
Cohesion: 0.11
Nodes (18): configurePolicyTypeBaseAPI(), ADR-0019, SocketContext, TooltipLongText(), CONTRACT_INVOICE_TYPES, CONTRACT_STATE_COLORS, ADR-0017, pathSocket (+10 more)

### Community 137 - "contracts.controller.test.js"
Cohesion: 0.14
Nodes (12): conceptsServiceMock, contractsServiceMock, emit, exportContractReport, exportContractSummary, getEffectivePermissionIds, ADR-0015, ADR-0016 (+4 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "getIO"
Cohesion: 0.13
Nodes (16): getIO(), configurePolicyTypeBaseController, FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, deleteProfileController(), getModulesController() (+8 more)

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
Cohesion: 0.05
Nodes (80): exportContractAPI(), providersApi, getWorkManagersSelectAPI(), previewWorkEndDateAPI(), SubCard(), ContactsList(), ADR-0009, DataList() (+72 more)

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

### Community 203 - "app.service.js"
Cohesion: 0.13
Nodes (16): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+8 more)

### Community 204 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 206 - "react"
Cohesion: 0.10
Nodes (34): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), updateThemeModeAPI(), config, CSS_VAR_PREFIX (+26 more)

### Community 209 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 211 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

## Knowledge Gaps
- **1014 isolated node(s):** `CONTRACT_STATE_FILTER`, `POLICIES_EXPIRING_TAB`, `CONTRACT_REPORTS`, `LINKED_KEYS`, `FILTER_FIELDS` (+1009 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1406 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **93 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0002` connect `workDashboard.service.js` to `@mui/material`, `contracts.service.js`?**
  _High betweenness centrality (0.192) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `UsersPage.jsx`, `PoliciesTab.jsx`, `InvoiceFormPage.jsx`, `constants.js`, `ConceptDialog.jsx`, `client/package.json`, `@tabler/icons-react`, `httpCliente.js`, `GeneralDashboard.jsx`, `InvoicesPage.jsx`, `authContext.jsx`, `AuthenticationRoutes.jsx`, `WorkChartsTab.jsx`, `ImageList.jsx`, `ContactsEditor.jsx`, `NewProviderDialog.jsx`, `ContractsPage.jsx`, `App.jsx`, `DebouncedInput.jsx`, `WorkDetailPage.jsx`, `WorkDataForm.jsx`, `react`, `useAuth`, `NotificationSection/index.jsx`, `showError`, `DocumentManagement.jsx`, `ref_prop_types`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Why does `axios` connect `httpCliente.js` to `server/package.json`, `client/package.json`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **What connects `CONTRACT_STATE_FILTER`, `POLICIES_EXPIRING_TAB`, `CONTRACT_REPORTS` to the rest of the system?**
  _1014 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.054773082942097026 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `workDashboard.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.053303471444568866 - nodes in this community are weakly interconnected._
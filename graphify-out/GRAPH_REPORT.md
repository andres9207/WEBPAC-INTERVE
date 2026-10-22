# Graph Report - WEBPAC-INTERVE  (2026-10-22)

## Corpus Check
- 598 files · ~305,904 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3503 nodes · 9647 edges · 205 communities (117 shown, 88 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 132 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `45e1da80`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- invoiceEvidence.service.js
- MainCard
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- workScopeOf
- ContractFormPage.jsx
- ProviderDetailPage.jsx
- contractPolicies.service.js
- auditContext
- contractTerms.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- providers.routes.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- invoices.service.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- constants.js
- transaction.service.js
- invoices.controller.test.js
- session.service.js
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- httpCliente.js
- contractReports.service.js
- server.js
- addressTypes.service.js
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorkSummaryTab.jsx
- scripts
- money.utils.js
- `tbl_invoices`
- audit.service.js
- status.constants.js
- ContactsEditor.jsx
- contractPolicies.service.test.js
- `tbl_contract_type_fields`
- ContractsPage.jsx
- transaction.mock.js
- scripts
- InvoiceDetailPage.jsx
- session.service.test.js
- compilerOptions
- excelJS.js
- invoiceTerms.js
- permission
- devDependencies
- uniqueConstraints.constants.test.js
- notifications.routes.js
- contracts.service.js
- react
- `tbl_contract_status_history`
- app.routes.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- showError
- idempotency.service.js
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- contractSuspensions.service.test.js
- export.service.js
- DocumentManagement.jsx
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- error.middleware.test.js
- contracts.controller.test.js
- balanceReconciliation.service.js
- eslint.config.mjs
- serviceWorker.jsx
- `tbl_providers`
- socket.js
- `tbl_identity_documents`
- auth.service.js
- users.service.js
- billingTerms.js
- works.service.test.js
- auth.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- `tbl_user_permissions`
- AuthenticationRoutes.jsx
- @mui/material
- decimal
- contractNotifications.service.test.js
- contractFields.js
- WorkDetailPage.jsx
- `tbl_contract_concepts`
- `tbl_reasons`
- themes/index.jsx
- browserslist
- volta
- `tbl_users`
- balanceReconciliation.service.test.js
- contractEndDateReconciliation.service.test.js
- dashboard.service.test.js
- ImageList.jsx
- auth.controller.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- users.service.test.js
- NotificationSection/index.jsx
- ProviderTypePage.jsx
- ref_jest_globals
- react-router-dom
- `tbl_invoices`
- `tbl_invoices`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 133 edges
2. `react` - 102 edges
3. `showError()` - 80 edges
4. `useAuth()` - 79 edges
5. `writeAudit()` - 58 edges
6. `workScopeOf()` - 58 edges
7. `withLockedTransaction()` - 57 edges
8. `dateOnlyText()` - 56 edges
9. `showSuccess()` - 55 edges
10. `@tabler/icons-react` - 54 edges

## Surprising Connections (you probably didn't know these)
- `getInvoiceFormOptions()` --calls--> `getContractFormOptions()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.service.js → server/src/modules/work/contracts/contracts.service.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js
- `previewWorkEndDate()` --calls--> `addTerm()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/term.utils.js

## Import Cycles
- None detected.

## Communities (205 total, 88 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.06
Nodes (35): createCustomShadow(), CustomShadows(), Alert(), Avatar(), Button(), CardActions(), CardContent(), CardHeader() (+27 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "invoiceEvidence.service.js"
Cohesion: 0.16
Nodes (13): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+5 more)

### Community 3 - "MainCard"
Cohesion: 0.13
Nodes (26): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, useWorkScope(), DashboardDefault, headerStyle, MainCard(), AlertsCard() (+18 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (42): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+34 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (61): assertInScope(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes() (+53 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.10
Nodes (37): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), ADR-0017, previewSimpleInvoiceAPI(), MoneyField() (+29 more)

### Community 8 - "workScopeOf"
Cohesion: 0.08
Nodes (52): workScopeOf(), exportFormatRule(), accessOf(), approveInvoiceController, cancelInvoiceController, deleteInvoiceController, exportInvoicesController, getContractAdvanceController (+44 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (44): contractConceptsApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+36 more)

### Community 10 - "ProviderDetailPage.jsx"
Cohesion: 0.08
Nodes (38): providersApi, getMyWorksSelectAPI(), pickWork(), useWorkFilterField(), WorkScopeContext, WorkScopeProvider(), ContactsList(), ADR-0009 (+30 more)

### Community 11 - "contractPolicies.service.js"
Cohesion: 0.04
Nodes (69): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+61 more)

### Community 12 - "auditContext"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "contractTerms.js"
Cohesion: 0.10
Nodes (27): ADR-0015, daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation(), previewContractEndDate(), chronologyError(), CONCEPT_TYPE_NAMES (+19 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (23): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+15 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.08
Nodes (17): admin, icons, billing, dashboard, icons, menuItems, icons, other (+9 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.12
Nodes (21): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+13 more)

### Community 17 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.15
Nodes (19): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider(), getStoredUser() (+11 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.07
Nodes (61): ADR-0013, ADR-0023, ADR-0025, adjustableAmount(), admittedContractsWhere(), admittedTypes(), approveInvoice(), assertContractAdmitsCancel() (+53 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.05
Nodes (92): scopeWhere(), percentText(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), termProgress() (+84 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.09
Nodes (44): ADR-0004, ADR-0007, PROGRESS_WARNING, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted() (+36 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.06
Nodes (24): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx, prismaMock (+16 more)

### Community 27 - "constants.js"
Cohesion: 0.05
Nodes (48): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), invoicesApi, configurePolicyTypeBaseAPI(), policyTypesApi, refreshSession(), PolicyTypePage, SocketContext (+40 more)

### Community 28 - "transaction.service.js"
Cohesion: 0.21
Nodes (11): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+3 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.06
Nodes (64): getEffectivePermissionIds(), sendExport(), optionalDate(), handleExport(), grantedViews(), updateUserPermissions(), ACT_FIELDS, cancelPolicyController (+56 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "httpCliente.js"
Cohesion: 0.08
Nodes (34): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), genericRequest, instance, NO_REFRESH_URLS (+26 more)

### Community 38 - "contractReports.service.js"
Cohesion: 0.08
Nodes (42): moneyText(), sumMoney(), amountsDto(), approvalSnapshot(), approvedOf(), balancesOf(), contractBalances(), contractInvoicesForReport() (+34 more)

### Community 39 - "server.js"
Cohesion: 0.13
Nodes (15): ref_http, node-cron, app, server, describeTarget(), testConnection(), verifyStatusCatalog(), cronJobs (+7 more)

### Community 40 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (47): ADR-0011, ADR-0012, ADR-0019, ADR-0016, ADR-0017, ADR-0018, ADR-0020, ADR-0024 (+39 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "WorkSummaryTab.jsx"
Cohesion: 0.12
Nodes (40): Advances(), CardTitle(), ContractsByState(), dayOf(), Empty(), InvoicedByContract(), InvoicedByMonth(), InvoicesByType() (+32 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "money.utils.js"
Cohesion: 0.10
Nodes (27): HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ROUNDING, toMoney(), toPercent() (+19 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "audit.service.js"
Cohesion: 0.12
Nodes (15): ADR-0001, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0027, protect(), REDACTED, SENSITIVE_FIELDS (+7 more)

### Community 51 - "status.constants.js"
Cohesion: 0.07
Nodes (35): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+27 more)

### Community 52 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 53 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "ContractsPage.jsx"
Cohesion: 0.13
Nodes (17): contractsApi, exportContractsAPI(), ContractsPage, ExportDialog(), CONTRACT_POLICY_STATUS_LABELS, CONTRACT_STATE_COLORS, CONTRACT_STATE_TABS, COLUMNS (+9 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): baseConfig, config, prismaMock, service, ADR-0027, loggerMock, prismaMock, lockedIdsOf() (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "InvoiceDetailPage.jsx"
Cohesion: 0.06
Nodes (55): contractPoliciesApi, exportContractAPI(), getInsurersSelectAPI, getPolicyTypesSelectAPI, ADR-0019, useSocket(), BaseDialog(), DataList() (+47 more)

### Community 59 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "invoiceTerms.js"
Cohesion: 0.17
Nodes (17): isContractCreate(), isCreate(), isSimpleCreate(), assertTransition(), cancelTransitionFor(), hasContract(), historyRow(), httpError() (+9 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "uniqueConstraints.constants.test.js"
Cohesion: 0.05
Nodes (38): ref_fs, ref_path, ref_url, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3 (+30 more)

### Community 68 - "notifications.routes.js"
Cohesion: 0.23
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 70 - "contracts.service.js"
Cohesion: 0.05
Nodes (121): main(), diffFields(), newOperationId(), writeAudit(), runIdempotent(), withLockedTransaction(), FIELD_GROUPS, typeAppliesAiu() (+113 more)

### Community 71 - "react"
Cohesion: 0.09
Nodes (25): ACTION_TONES, ActionButton(), toneOf(), ChipMultiSelect(), fold(), ConfirmDialog(), EditableList(), download() (+17 more)

### Community 88 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.14
Nodes (8): `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies`, `tbl_users`, `tbl_reasons`, `tbl_status`

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (74): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), reasonsApi, supervisionTypesApi (+66 more)

### Community 100 - "works.routes.js"
Cohesion: 0.10
Nodes (25): canViewAllWorks(), managedWhere(), resolveWorkScope(), selectMyWorks(), TERM_UNITS, changeWorkStatusController, deleteWorkController, getWorkController (+17 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "showError"
Cohesion: 0.06
Nodes (69): suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, getModulesAPI(), getProfilesAPI(), saveProfileAPI(), checkProviderIdentificationAPI(), getAssignableWorksAPI() (+61 more)

### Community 108 - "idempotency.service.js"
Cohesion: 0.09
Nodes (25): getIO(), canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), IDEMPOTENCY_HEADER, idempotencyMisuse(), keyReused(), requestFingerprint() (+17 more)

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.09
Nodes (32): express, verifyToken(), requirePermission(), validate(), createMasterControllers(), createMasterRouter(), ADR-0019, policyTypesRoutes (+24 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.17
Nodes (10): `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts`, `tbl_contracts`, `tbl_insurers` (+2 more)

### Community 116 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 117 - "export.service.js"
Cohesion: 0.07
Nodes (48): exceljs, addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf(), buildPdfDocument() (+40 more)

### Community 118 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.22
Nodes (5): ALL, CONCEPTS, INVOICES, OWN, prismaMock

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "contracts.controller.test.js"
Cohesion: 0.14
Nodes (12): conceptsServiceMock, contractsServiceMock, emit, exportContractReport, exportContractSummary, getEffectivePermissionIds, ADR-0015, ADR-0016 (+4 more)

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.21
Nodes (13): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), contractBalanceReconciliationJob, insertNotification(), balanceViolations(), CHECKS (+5 more)

### Community 129 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 133 - "`tbl_identity_documents`"
Cohesion: 0.50
Nodes (3): `tbl_users`, `tbl_identity_documents`, `tbl_users`

### Community 134 - "auth.service.js"
Cohesion: 0.11
Nodes (26): bcrypt, ref_crypto, withTransaction(), comparePassword(), hashPassword(), deriveKey(), generateResetCode(), hashResetCode() (+18 more)

### Community 136 - "users.service.js"
Cohesion: 0.05
Nodes (57): INACTIVE_STATUS, capitalize(), createMasterService(), httpError(), ADR-0004, ADR-0013, ADR-0027, containsFilter() (+49 more)

### Community 137 - "billingTerms.js"
Cohesion: 0.18
Nodes (9): BILLING_TYPES, billingBalances(), httpError(), isBillingType(), ZERO, SNAPSHOT_AMOUNTS, storedAmount(), storedDetail() (+1 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 151 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 153 - "AuthenticationRoutes.jsx"
Cohesion: 0.11
Nodes (21): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 154 - "@mui/material"
Cohesion: 0.07
Nodes (27): MainContentStyled, closedMixin(), MiniDrawerStyled, openedMixin(), PrivateRoute(), appDrawerWidth, drawerWidth, gridSpacing (+19 more)

### Community 155 - "decimal"
Cohesion: 0.10
Nodes (44): @prisma/client, decimal(), percentOf(), ratioPercent(), ratioText(), roundMoney(), roundRatio(), advanceBalances() (+36 more)

### Community 156 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 157 - "contractFields.js"
Cohesion: 0.26
Nodes (10): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+2 more)

### Community 159 - "WorkDetailPage.jsx"
Cohesion: 0.08
Nodes (36): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), getWorksSummaryAPI(), previewWorkEndDateAPI(), worksApi, createMasterApi() (+28 more)

### Community 173 - "themes/index.jsx"
Cohesion: 0.12
Nodes (16): App(), config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext, ConfigContext, ConfigProvider() (+8 more)

### Community 174 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 175 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 176 - "`tbl_users`"
Cohesion: 0.31
Nodes (7): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 181 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 183 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 186 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 197 - "NotificationSection/index.jsx"
Cohesion: 0.24
Nodes (13): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), getTimeAgo(), ListItemWrapper(), NotificationList() (+5 more)

### Community 201 - "ProviderTypePage.jsx"
Cohesion: 0.14
Nodes (17): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+9 more)

### Community 202 - "ref_jest_globals"
Cohesion: 0.06
Nodes (15): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+7 more)

### Community 206 - "react-router-dom"
Cohesion: 0.15
Nodes (25): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), setParentOpenedMenu(), useMenuCollapse() (+17 more)

## Knowledge Gaps
- **992 isolated node(s):** `ADR-0006`, `ADR-0016`, `ADR-0017`, `ADR-0018`, `IMAGE` (+987 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1352 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **88 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `contractPolicies.service.js`, `constants.js`?**
  _High betweenness centrality (0.267) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `MainCard`, `InvoiceFormPage.jsx`, `ContractFormPage.jsx`, `ProviderDetailPage.jsx`, `client/package.json`, `menu-items/index.js`, `AuthForgotPassword.jsx`, `AuthenticationRoutes.jsx`, `constants.js`, `WorkDetailPage.jsx`, `httpCliente.js`, `themes/index.jsx`, `WorkSummaryTab.jsx`, `ContactsEditor.jsx`, `ImageList.jsx`, `ContractsPage.jsx`, `InvoiceDetailPage.jsx`, `NotificationSection/index.jsx`, `react`, `ProviderTypePage.jsx`, `react-router-dom`, `useAuth`, `showError`, `DocumentManagement.jsx`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Why does `axios` connect `httpCliente.js` to `server/package.json`, `client/package.json`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `ADR-0006`, `ADR-0016`, `ADR-0017` to the rest of the system?**
  _992 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0629800307219662 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `MainCard` be split into smaller, more focused modules?**
  _Cohesion score 0.12941176470588237 - nodes in this community are weakly interconnected._
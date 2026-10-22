# Graph Report - WEBPAC-INTERVE  (2026-10-22)

## Corpus Check
- 594 files · ~300,330 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3434 nodes · 9442 edges · 204 communities (118 shown, 86 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 128 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2e79c5a9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- master.service.js
- GeneralDashboard.jsx
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- ContractFormPage.jsx
- ProviderDetailPage.jsx
- seed.volume.js
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
- contractPolicies.service.js
- `tbl_users`
- app.js
- works.service.js
- contractSuspensions.service.test.js
- constants.js
- transaction.service.js
- contracts.controller.test.js
- session.service.js
- mailerService.js
- workScopeOf
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- contracts.service.test.js
- dashboard.service.js
- server.js
- addressTypes.service.js
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorkSummaryTab.jsx
- scripts
- contractConcepts.service.test.js
- `tbl_invoices`
- seed.demo.js
- status.constants.js
- ContactsEditor.jsx
- contractPolicies.service.test.js
- `tbl_contract_type_fields`
- App.jsx
- transaction.mock.js
- scripts
- InvoiceDetailPage.jsx
- session.service.test.js
- compilerOptions
- excelJS.js
- invoices.controller.test.js
- permission
- devDependencies
- transaction.service.test.js
- notifications.routes.js
- contracts.service.js
- @mui/material
- `tbl_contract_status_history`
- main.routes.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- showError
- idempotency.service.js
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- contractReports.service.test.js
- contractReports.service.js
- handleFirebase.js
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- error.middleware.test.js
- images.js
- balanceReconciliation.service.js
- decisionReferences.guard.test.js
- serviceWorker.jsx
- `tbl_providers`
- WorkDetailPage.jsx
- `tbl_identity_documents`
- writeAudit
- users.service.js
- uniqueConstraints.constants.test.js
- works.service.test.js
- invoiceEvidence.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- `tbl_user_permissions`
- AuthenticationRoutes.jsx
- constant.js
- decimal
- contractNotifications.service.test.js
- contractFields.js
- httpCliente.js
- `tbl_contract_concepts`
- `tbl_reasons`
- themes/index.jsx
- browserslist
- volta
- `tbl_users`
- balanceReconciliation.service.test.js
- contractEndDateReconciliation.service.test.js
- volta
- ImageList.jsx
- winston.config.js
- invariants.check.js
- authjwt.middleware.test.js
- master.service.test.js
- users.service.test.js
- NotificationSection/index.jsx
- ProviderTypePage.jsx
- ref_jest_globals
- react-router-dom
- `tbl_invoices`
- `tbl_invoices`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 132 edges
2. `react` - 101 edges
3. `showError()` - 80 edges
4. `useAuth()` - 79 edges
5. `writeAudit()` - 58 edges
6. `withLockedTransaction()` - 57 edges
7. `workScopeOf()` - 57 edges
8. `showSuccess()` - 55 edges
9. `dateOnlyText()` - 54 edges
10. `@tabler/icons-react` - 53 edges

## Surprising Connections (you probably didn't know these)
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js

## Import Cycles
- None detected.

## Communities (204 total, 86 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.06
Nodes (39): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Avatar() (+31 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "master.service.js"
Cohesion: 0.09
Nodes (36): DELETED_STATUS, AUDIT_ENTITIES, AUDIT_OPERATIONS, capitalize(), createMasterService(), httpError(), ADR-0004, ADR-0013 (+28 more)

### Community 3 - "GeneralDashboard.jsx"
Cohesion: 0.13
Nodes (29): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, getMyWorksSelectAPI(), pickWork(), useWorkScope(), WorkScopeContext, WorkScopeProvider() (+21 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (32): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+24 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (62): ADR-0009, assertInScope(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope() (+54 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.12
Nodes (30): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), ADR-0017, previewSimpleInvoiceAPI(), AdjustableAmount() (+22 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.07
Nodes (55): sendExport(), exportFormatRule(), accessOf(), approveInvoiceController, cancelInvoiceController, deleteInvoiceController, exportInvoicesController, getContractAdvanceController (+47 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.09
Nodes (43): contractConceptsApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+35 more)

### Community 10 - "ProviderDetailPage.jsx"
Cohesion: 0.07
Nodes (50): checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, workProvidersApi, getProviderTypesSelectAPI, DateField(), toDate() (+42 more)

### Community 11 - "seed.volume.js"
Cohesion: 0.10
Nodes (31): ref_node_crypto, nit(), addDays(), ALL_FIELDS, concept(), dbName, END_DATES, firstActive() (+23 more)

### Community 12 - "auditContext"
Cohesion: 0.11
Nodes (27): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+19 more)

### Community 13 - "contractTerms.js"
Cohesion: 0.11
Nodes (23): ADR-0015, daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation(), derivedEndDate(), previewContractEndDate(), CONTRACT_STATES (+15 more)

### Community 14 - "client/package.json"
Cohesion: 0.06
Nodes (36): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+28 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.08
Nodes (17): admin, icons, billing, dashboard, icons, menuItems, icons, other (+9 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.11
Nodes (23): express-validator, EDITABLE_STATUS_VALUES, IDEMPOTENCY_HEADER, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+15 more)

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
Cohesion: 0.23
Nodes (13): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber(), hasSpecial() (+5 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.05
Nodes (99): ADR-0013, ADR-0020, ADR-0021, ADR-0023, ADR-0024, ADR-0025, admittedContractsWhere(), admittedTypes() (+91 more)

### Community 22 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (80): moneyText(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), TERM_UNITS, termProgress() (+72 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (49): ADR-0004, ADR-0007, PROGRESS_WARNING, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted() (+41 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.08
Nodes (17): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+9 more)

### Community 27 - "constants.js"
Cohesion: 0.08
Nodes (36): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), invoicesApi, useInvoiceViews(), InvoicesPage, SocketContext, LinkedFilterNotice(), TooltipLongText() (+28 more)

### Community 28 - "transaction.service.js"
Cohesion: 0.27
Nodes (9): buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES, toSortedIds() (+1 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.05
Nodes (33): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+25 more)

### Community 30 - "session.service.js"
Cohesion: 0.13
Nodes (23): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+15 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "workScopeOf"
Cohesion: 0.07
Nodes (61): workScopeOf(), moneyRule(), optionalDate(), percentRule(), simpleAmountRules(), ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS (+53 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 38 - "dashboard.service.js"
Cohesion: 0.12
Nodes (32): inScope(), scopeOf(), scopeWhere(), containsFilter(), dateRangeFilter(), filtersWhere(), idFilter(), contractsBlock() (+24 more)

### Community 39 - "server.js"
Cohesion: 0.14
Nodes (14): ref_http, node-cron, app, server, verifyStatusCatalog(), cronJobs, ADR-0017, registeredTasks (+6 more)

### Community 40 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.07
Nodes (35): ADR-0003, ADR-0011, ADR-0012, ADR-0019, ADR-0016, ADR-0017, ADR-0018, ADR-0020 (+27 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "WorkSummaryTab.jsx"
Cohesion: 0.13
Nodes (41): MainCard(), Advances(), CardTitle(), ContractsByState(), dayOf(), Empty(), InvoicedByContract(), InvoicedByMonth() (+33 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "contractConcepts.service.test.js"
Cohesion: 0.17
Nodes (6): ctx, ADR-0016, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "seed.demo.js"
Cohesion: 0.08
Nodes (26): ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC, ADR-0002 (+18 more)

### Community 51 - "status.constants.js"
Cohesion: 0.07
Nodes (37): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+29 more)

### Community 52 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 53 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "App.jsx"
Cohesion: 0.28
Nodes (7): refreshSession(), App(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (31): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+23 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "InvoiceDetailPage.jsx"
Cohesion: 0.06
Nodes (58): contractPoliciesApi, contractsApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, DataList(), Figure(), Pending(), LastModifiedCell() (+50 more)

### Community 59 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "invoices.controller.test.js"
Cohesion: 0.25
Nodes (6): emit, getEffectivePermissionIds, invoicesServiceMock, ADR-0020, SCOPE, workScopeOf

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 70 - "contracts.service.js"
Cohesion: 0.06
Nodes (105): main(), diffFields(), newOperationId(), runIdempotent(), withLockedTransaction(), typeAppliesAiu(), withContractAiu(), resolveContractTypeFields() (+97 more)

### Community 71 - "@mui/material"
Cohesion: 0.07
Nodes (33): PrivateRoute(), headerStyle, ACTION_TONES, ActionButton(), toneOf(), ChipMultiSelect(), fold(), ConfirmDialog() (+25 more)

### Community 88 - "main.routes.js"
Cohesion: 0.12
Nodes (17): express, STATUS_KEYS, getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes, ADR-0002, getMenuController() (+9 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.14
Nodes (8): `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies`, `tbl_users`, `tbl_reasons`, `tbl_status`

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (110): addressTypesApi, loginAPI(), logoutAPI(), verifyTokenAPI(), constructionCompaniesApi, exportContractsAPI(), contractTypesApi, identityDocumentsApi (+102 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.10
Nodes (28): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), managedWhere(), resolveWorkScope(), selectMyWorks(), WORK_HEADER (+20 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "showError"
Cohesion: 0.07
Nodes (61): suspendContractAPI(), invoiceTransitionsApi, configurePolicyTypeBaseAPI(), deleteProfileAPI(), getModulesAPI(), paginationProfilesAPI(), saveProfileAPI(), getReasonsSelectAPI() (+53 more)

### Community 108 - "idempotency.service.js"
Cohesion: 0.38
Nodes (6): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint()

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.05
Nodes (53): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), getIO() (+45 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.17
Nodes (10): `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts`, `tbl_contracts`, `tbl_insurers` (+2 more)

### Community 116 - "contractReports.service.test.js"
Cohesion: 0.33
Nodes (3): concept(), contract(), prismaMock

### Community 117 - "contractReports.service.js"
Cohesion: 0.08
Nodes (42): exceljs, pdfkit, buildExcel(), buildPdf(), cellText(), excelValue(), EXPORT_FORMATS, EXPORT_MAX_ROWS (+34 more)

### Community 118 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.22
Nodes (5): ALL, CONCEPTS, INVOICES, OWN, prismaMock

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.24
Nodes (12): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS, findBalanceViolations() (+4 more)

### Community 129 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "WorkDetailPage.jsx"
Cohesion: 0.12
Nodes (26): getWorkManagersSelectAPI(), previewWorkEndDateAPI(), useEndDatePreview(), showInfo(), showObligatorios(), ContactsList(), ADR-0009, contactChannels() (+18 more)

### Community 133 - "`tbl_identity_documents`"
Cohesion: 0.50
Nodes (3): `tbl_users`, `tbl_identity_documents`, `tbl_users`

### Community 134 - "writeAudit"
Cohesion: 0.07
Nodes (43): ADR-0001, bcrypt, ref_crypto, auditMisuse(), buildRows(), ADR-0027, protect(), REDACTED (+35 more)

### Community 136 - "users.service.js"
Cohesion: 0.06
Nodes (34): defineMaster(), constructionCompaniesRoutes, constructionCompaniesConfig, constructionCompaniesService, ADR-0004, DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT (+26 more)

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "invoiceEvidence.service.test.js"
Cohesion: 0.40
Nodes (3): prismaMock, state, user

### Community 151 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 153 - "AuthenticationRoutes.jsx"
Cohesion: 0.11
Nodes (21): client_src_assets_images_interve, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 154 - "constant.js"
Cohesion: 0.13
Nodes (20): MainContentStyled, closedMixin(), MiniDrawerStyled, openedMixin(), appDrawerWidth, drawerWidth, gridSpacing, CardSecondaryAction() (+12 more)

### Community 155 - "decimal"
Cohesion: 0.06
Nodes (66): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), percentText() (+58 more)

### Community 156 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 157 - "contractFields.js"
Cohesion: 0.26
Nodes (10): AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+2 more)

### Community 159 - "httpCliente.js"
Cohesion: 0.05
Nodes (42): deleteFileByPath(), uploadFile(), getStatusesByScopeAPI(), getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, deleteDocApi(), paginationDocsApi(), saveDocApi() (+34 more)

### Community 173 - "themes/index.jsx"
Cohesion: 0.18
Nodes (11): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage(), ThemeCustomization() (+3 more)

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

### Community 181 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 183 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 189 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 192 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 193 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 197 - "NotificationSection/index.jsx"
Cohesion: 0.35
Nodes (9): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+1 more)

### Community 201 - "ProviderTypePage.jsx"
Cohesion: 0.15
Nodes (16): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+8 more)

### Community 202 - "ref_jest_globals"
Cohesion: 0.06
Nodes (17): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+9 more)

### Community 206 - "react-router-dom"
Cohesion: 0.15
Nodes (26): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), setParentOpenedMenu(), useMenuCollapse() (+18 more)

## Knowledge Gaps
- **974 isolated node(s):** `ADR-0006`, `ADR-0016`, `ADR-0017`, `ADR-0018`, `FORMATS` (+969 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1329 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **86 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`, `contractPolicies.service.js`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **Why does `ADR-0002` connect `GeneralDashboard.jsx` to `contracts.service.js`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `GeneralDashboard.jsx`, `WorkDetailPage.jsx`, `InvoiceFormPage.jsx`, `ContractFormPage.jsx`, `ProviderDetailPage.jsx`, `client/package.json`, `menu-items/index.js`, `AuthForgotPassword.jsx`, `AuthenticationRoutes.jsx`, `constant.js`, `constants.js`, `httpCliente.js`, `themes/index.jsx`, `WorkSummaryTab.jsx`, `ContactsEditor.jsx`, `ImageList.jsx`, `InvoiceDetailPage.jsx`, `NotificationSection/index.jsx`, `ProviderTypePage.jsx`, `react-router-dom`, `useAuth`, `showError`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `ADR-0006`, `ADR-0016`, `ADR-0017` to the rest of the system?**
  _974 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.058384547848990345 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `master.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
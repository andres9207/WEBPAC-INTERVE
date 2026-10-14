# Graph Report - WEBPAC-INTERVE  (2026-10-14)

## Corpus Check
- 563 files · ~264,247 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3115 nodes · 8411 edges · 198 communities (118 shown, 80 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 117 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b7c9ea55`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- withLockedTransaction
- InvoiceFormPage.jsx
- dependencies
- server/package.json
- providers.service.js
- prismaClient.js
- auth.service.js
- ContractFormPage.jsx
- withAlpha
- contractPolicies.service.js
- auth.routes.js
- contracts.service.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- master.service.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- NewProviderDialog.jsx
- dashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contractConcepts.service.test.js
- contractConcepts.service.js
- providers.service.test.js
- contracts.controller.test.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.routes.js
- session.service.js
- Default/index.jsx
- server.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorkScopeContext.jsx
- scripts
- constant.js
- `tbl_invoices`
- ProviderTypePage.jsx
- workScopeOf
- showError
- @mui/material
- `tbl_contract_type_fields`
- formatTime.js
- transaction.mock.js
- scripts
- useAuth
- works.routes.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- floatingPoint.guard.test.js
- notifications.routes.js
- identityDocuments.service.js
- ContactsEditor.jsx
- `tbl_contract_status_history`
- app.routes.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- masterRouter.utils.js
- `tbl_provider_type_field_versions`
- constants.js
- App.jsx
- idempotency.service.js
- `tbl_works`
- `tbl_policies`
- react-router-dom
- invoices.routes.js
- auth.service.test.js
- error.middleware.js
- decimal
- `tbl_providers`
- transaction.service.test.js
- images.js
- contractEndDateReconciliation.service.js
- `tbl_contract_suspensions`
- providerTypeFields.service.js
- `tbl_providers`
- handleFirebase.js
- session.service.test.js
- httpError
- AppBar.jsx
- uniqueConstraints.constants.test.js
- invoiceTerms.js
- works.service.test.js
- AuthenticationRoutes.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- balanceReconciliation.service.test.js
- dashboard.service.test.js
- themes/index.jsx
- money.utils.js
- master.service.test.js
- invoiceViews.js
- workScope.service.js
- `tbl_contract_concepts`
- `tbl_reasons`
- volta
- addressTypes.contacts.js
- NotificationSection/index.jsx
- `tbl_users`
- contractSuspensions.service.test.js
- contractEndDateReconciliation.service.test.js
- contracts.service.test.js
- Sidebar/index.jsx
- winston.config.js
- works.controller.test.js
- invariants.check.js
- authjwt.middleware.test.js
- updateProvider
- DebouncedInput.jsx
- browserslist
- password-strength.js
- EasyCrop.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 126 edges
2. `react` - 97 edges
3. `useAuth()` - 77 edges
4. `showError()` - 72 edges
5. `writeAudit()` - 59 edges
6. `withLockedTransaction()` - 56 edges
7. `showSuccess()` - 53 edges
8. `workScopeOf()` - 49 edges
9. `@tabler/icons-react` - 49 edges
10. `auditContext()` - 48 edges

## Surprising Connections (you probably didn't know these)
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `UserDialog` --indirect_call--> `getProfilesAPI()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/api/requests/profilesApi.js
- `WorkView()` --indirect_call--> `previewWorkEndDateAPI()`  [INFERRED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/api/requests/worksApi.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js

## Import Cycles
- None detected.

## Communities (198 total, 80 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (22): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DateTimePickerToolbar() (+14 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "withLockedTransaction"
Cohesion: 0.06
Nodes (41): ADR-0013, bcrypt, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0027, protect() (+33 more)

### Community 3 - "InvoiceFormPage.jsx"
Cohesion: 0.12
Nodes (28): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, MoneyField(), moneyInputText() (+20 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.11
Nodes (25): ASSIGNMENT_IDEMPOTENCY, ASSIGNMENT_LIST_SELECT, AUDITED_HEADER, CLASSIFICATIONS_SELECT, contactsHelper, EXISTING_SELECT, getProvider(), HEADER_COLUMNS (+17 more)

### Community 7 - "prismaClient.js"
Cohesion: 0.09
Nodes (22): adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), ACTIVE_STATUS, INACTIVE_STATUS (+14 more)

### Community 8 - "auth.service.js"
Cohesion: 0.09
Nodes (35): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+27 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (49): getConstructionCompaniesSelectAPI, contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+41 more)

### Community 10 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 11 - "contractPolicies.service.js"
Cohesion: 0.05
Nodes (54): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+46 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.10
Nodes (27): jsonwebtoken, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+19 more)

### Community 13 - "contracts.service.js"
Cohesion: 0.06
Nodes (60): ADR-0021, sumMoney(), FIELD_GROUPS, assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork() (+52 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (34): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+26 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, icons, other, icons (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.13
Nodes (17): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+9 more)

### Community 17 - "master.service.js"
Cohesion: 0.11
Nodes (33): capitalize(), createMasterService(), httpError(), ADR-0027, containsFilter(), countByStatus(), dateRangeFilter(), DEFAULT_ROWS (+25 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.10
Nodes (19): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.16
Nodes (17): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider(), getStoredUser() (+9 more)

### Community 21 - "NewProviderDialog.jsx"
Cohesion: 0.08
Nodes (37): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, getProviderTypesSelectAPI (+29 more)

### Community 22 - "dashboard.service.js"
Cohesion: 0.11
Nodes (32): scopeWhere(), contractsBlock(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002, notDeleted, policiesBlock() (+24 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (64): ADR-0004, ADR-0007, writeAudit(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel() (+56 more)

### Community 26 - "contractConcepts.service.test.js"
Cohesion: 0.10
Nodes (14): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+6 more)

### Community 27 - "contractConcepts.service.js"
Cohesion: 0.12
Nodes (57): main(), diffFields(), newOperationId(), runIdempotent(), dateOnlyText(), assertContractStillAdmits(), createContractInvoice(), activeSequence() (+49 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.12
Nodes (14): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+6 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.05
Nodes (33): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+25 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.09
Nodes (47): ADR-0017, ADR-0023, ADR-0025, isBlank(), toMoney(), adjustableAmount(), amountsDto(), assertProviderAssigned() (+39 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.09
Nodes (31): moneyRule(), optionalDate(), percentRule(), contractsRoutes, ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+23 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "providers.routes.js"
Cohesion: 0.09
Nodes (33): INVOICE_MOVES, ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS (+25 more)

### Community 37 - "session.service.js"
Cohesion: 0.08
Nodes (34): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), ACCESS_COOKIE_NAME (+26 more)

### Community 38 - "Default/index.jsx"
Cohesion: 0.17
Nodes (20): getDashboardSummaryAPI(), ADR-0002, headerStyle, MainCard(), AlertsCard(), Empty(), LatestInvoicesCard(), num (+12 more)

### Community 39 - "server.js"
Cohesion: 0.15
Nodes (13): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+5 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (16): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, prismaMock (+8 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.06
Nodes (39): ADR-0011, ADR-0012, ADR-0016, ADR-0018, ADR-0019, ADR-0020, ADR-0026, ADR-0017 (+31 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "WorkScopeContext.jsx"
Cohesion: 0.16
Nodes (20): getMyWorksSelectAPI(), pickWork(), useWorkScope(), WorkScopeContext, WorkScopeProvider(), Footer(), Header(), WorkSection() (+12 more)

### Community 46 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, build, cron:run, db:check-invariants, db:seed, db:seed:demo, dev, pm2:logs (+7 more)

### Community 48 - "constant.js"
Cohesion: 0.16
Nodes (14): appDrawerWidth, drawerWidth, gridSpacing, CardSecondaryAction(), Avatar(), DashboardCards(), Indicator(), ADR-0002 (+6 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "ProviderTypePage.jsx"
Cohesion: 0.15
Nodes (16): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+8 more)

### Community 51 - "workScopeOf"
Cohesion: 0.15
Nodes (28): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, ADR-0002, ADR-0002, ACT_FIELDS, cancelPolicyController (+20 more)

### Community 52 - "showError"
Cohesion: 0.06
Nodes (64): contractPoliciesApi, suspendContractAPI(), getInsurersSelectAPI, invoiceTransitionsApi, getPolicyTypesSelectAPI, ADR-0019, getModulesAPI(), saveProfileAPI() (+56 more)

### Community 53 - "@mui/material"
Cohesion: 0.07
Nodes (49): deleteProfileAPI(), getProfilesAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS (+41 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "formatTime.js"
Cohesion: 0.12
Nodes (15): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+7 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (29): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+21 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "useAuth"
Cohesion: 0.07
Nodes (69): getStatusesByScopeAPI(), useAuth(), useInvoiceViewChange(), useInvoiceViews(), useSocket(), SubCard(), ContactsList(), ADR-0009 (+61 more)

### Community 59 - "works.routes.js"
Cohesion: 0.13
Nodes (19): changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, previewWorkEndDateController, saveWorkController (+11 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "floatingPoint.guard.test.js"
Cohesion: 0.12
Nodes (13): ref_fs, ref_url, ALLOWED, files(), lines, SRC, catalog, expected (+5 more)

### Community 68 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 70 - "identityDocuments.service.js"
Cohesion: 0.14
Nodes (15): nit(), DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, nitCheckDigit() (+7 more)

### Community 71 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 88 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.03
Nodes (79): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), reasonsApi, supervisionTypesApi (+71 more)

### Community 100 - "masterRouter.utils.js"
Cohesion: 0.09
Nodes (33): express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), ADR-0019 (+25 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "constants.js"
Cohesion: 0.04
Nodes (61): contractsApi, configurePolicyTypeBaseAPI(), policyTypesApi, useWorkFilterField(), ADR-0002, useLinkedFilters(), ContractsPage, InvoicesPage (+53 more)

### Community 108 - "App.jsx"
Cohesion: 0.28
Nodes (7): refreshSession(), App(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

### Community 112 - "idempotency.service.js"
Cohesion: 0.09
Nodes (24): ADR-0027, getIO(), canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), IDEMPOTENCY_HEADER, idempotencyMisuse(), keyReused() (+16 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "react-router-dom"
Cohesion: 0.23
Nodes (13): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName() (+5 more)

### Community 117 - "invoices.routes.js"
Cohesion: 0.11
Nodes (29): accessOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, getInvoiceFormOptionsController, grantedOf(), INVOICE_FIELDS (+21 more)

### Community 118 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "decimal"
Cohesion: 0.11
Nodes (41): @prisma/client, decimal(), moneyText(), ratioPercent(), ratioText(), roundMoney(), roundRatio(), advanceBalances() (+33 more)

### Community 123 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 124 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "contractEndDateReconciliation.service.js"
Cohesion: 0.14
Nodes (19): ADR-0015, findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), contractBalanceReconciliationJob, contractEndDateReconciliationJob, insertNotification() (+11 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.22
Nodes (7): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`, `tbl_invoice_liquidation_details`

### Community 130 - "providerTypeFields.service.js"
Cohesion: 0.13
Nodes (27): AIU_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, ADR-0026 (+19 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 133 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 134 - "httpError"
Cohesion: 0.20
Nodes (19): assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope(), assertTypeIds(), assertWorkAssignable(), assignmentText(), assignmentValuesOf(), assignProviderToWork() (+11 more)

### Community 136 - "AppBar.jsx"
Cohesion: 0.21
Nodes (11): client_src_assets_images_interve, LoginPage, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthCardWrapper() (+3 more)

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 139 - "invoiceTerms.js"
Cohesion: 0.13
Nodes (19): isContractCreate(), isCreate(), isSimpleCreate(), cancelTransitionFor(), hasContract(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS (+11 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "AuthenticationRoutes.jsx"
Cohesion: 0.19
Nodes (10): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router, MainRoutes (+2 more)

### Community 151 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 152 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 153 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 154 - "themes/index.jsx"
Cohesion: 0.26
Nodes (9): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+1 more)

### Community 155 - "money.utils.js"
Cohesion: 0.16
Nodes (12): HUNDRED, MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ROUNDING, ZERO, insuredValue() (+4 more)

### Community 156 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 157 - "invoiceViews.js"
Cohesion: 0.19
Nodes (20): applyInvoiceViewChange(), ADR-0010, ANY_CONTRACT_VIEW_PERMISSION, ANY_VIEW_PERMISSION, applyProviderViewChanges(), assertNotMixed(), assertViewGranted(), httpError() (+12 more)

### Community 159 - "workScope.service.js"
Cohesion: 0.15
Nodes (18): ALL, assertAnyInScope(), assertInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope() (+10 more)

### Community 173 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 174 - "addressTypes.contacts.js"
Cohesion: 0.47
Nodes (5): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText()

### Community 175 - "NotificationSection/index.jsx"
Cohesion: 0.28
Nodes (11): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), ProfileSection(), HeaderAvatar(), MobileSearch() (+3 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.39
Nodes (6): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "contractSuspensions.service.test.js"
Cohesion: 0.17
Nodes (5): ctx, initial, ADR-0017, prismaMock, state

### Community 179 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 181 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 183 - "Sidebar/index.jsx"
Cohesion: 0.20
Nodes (12): useConfig(), ElevationScroll(), HorizontalBar(), LogoSection(), Sidebar(), closedMixin(), MiniDrawerStyled, openedMixin() (+4 more)

### Community 186 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 189 - "works.controller.test.js"
Cohesion: 0.29
Nodes (5): emit, getEffectivePermissionIds, SCOPE, serviceMock, workScopeOf

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 192 - "updateProvider"
Cohesion: 0.31
Nodes (10): applyProviderTypes(), assertProviderTypes(), checkIdentification(), createProvider(), duplicateError(), findByIdentity(), findTypeIds(), masterLocksOf() (+2 more)

### Community 194 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 195 - "password-strength.js"
Cohesion: 0.43
Nodes (5): defaultColor, hasMixed(), hasNumber(), hasSpecial(), strengthIndicator()

## Knowledge Gaps
- **881 isolated node(s):** `name`, `version`, `description`, `main`, `type` (+876 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1213 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **80 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0016` connect `permissions.constants.js` to `ContractFormPage.jsx`, `contracts.service.js`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `InvoiceFormPage.jsx`, `AppBar.jsx`, `ContractFormPage.jsx`, `withAlpha`, `client/package.json`, `AuthenticationRoutes.jsx`, `AuthForgotPassword.jsx`, `NewProviderDialog.jsx`, `themes/index.jsx`, `Default/index.jsx`, `WorkScopeContext.jsx`, `NotificationSection/index.jsx`, `constant.js`, `ProviderTypePage.jsx`, `showError`, `formatTime.js`, `Sidebar/index.jsx`, `useAuth`, `DebouncedInput.jsx`, `EasyCrop.jsx`, `ContactsEditor.jsx`, `MainRoutes.jsx`, `constants.js`, `react-router-dom`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _881 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08985200845665962 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `withLockedTransaction` be split into smaller, more focused modules?**
  _Cohesion score 0.05878084179970972 - nodes in this community are weakly interconnected._
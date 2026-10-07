# Graph Report - WEBPAC-INTERVE  (2026-10-07)

## Corpus Check
- 498 files · ~218,688 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 2743 nodes · 7169 edges · 166 communities (105 shown, 61 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 105 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `169945c7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- WorkFormPage.jsx
- auth.service.js
- dependencies
- server/package.json
- providers.service.js
- server.js
- writeAudit
- master.service.js
- advanceTerms.js
- invoices.routes.js
- auditContext
- showError
- client/package.json
- menu-items/index.js
- validation.utils.js
- permissions.constants.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- providers.routes.js
- NotificationSection/index.jsx
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- @mui/material
- providers.service.test.js
- invoices.controller.test.js
- invoices.service.js
- mailerService.js
- workScopeOf
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- session.service.js
- updateInvoice
- works.service.test.js
- ref_jest_globals
- withAlpha
- devDependencies
- App.jsx
- invoiceTerms.js
- scripts
- volta
- `tbl_invoices`
- contractFields.js
- app.routes.js
- ContractFormPage.jsx
- users.service.js
- `tbl_contract_type_fields`
- InvoiceFormPage.jsx
- transaction.mock.js
- scripts
- WorkDetailPage.jsx
- UsersPage.jsx
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- transaction.service.test.js
- extends
- seed.demo.js
- prismaClient.js
- MainLayout/index.jsx
- `tbl_contract_status_history`
- masterRouter.utils.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- socket.js
- `tbl_providers`
- getIO
- contracts.service.js
- uniqueConstraints.constants.test.js
- `tbl_works`
- `tbl_insurers`
- ProviderFormPage.jsx
- httpCliente.js
- browserslist
- error.middleware.js
- themes/index.jsx
- `tbl_providers`
- error.middleware.test.js
- images.js
- providers.controller.test.js
- `tbl_contract_suspensions`
- idempotency.service.js
- `tbl_work_providers`
- money.utils.js
- contractSuspensions.service.test.js
- useGetMenuMaster
- ContractTypeFieldsDialog.jsx
- authjwt.middleware.test.js
- AuthenticationRoutes.jsx
- notifications.routes.js
- EasyCrop.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- contracts.service.test.js
- ForgotPassword.jsx
- ConfigContext.jsx
- master.service.test.js
- transaction.service.js
- addressTypes.service.js
- constants.js
- useConfig
- contracts.controller.test.js
- session.service.test.js
- auth.controller.test.js
- InputLabel.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 115 edges
2. `react` - 87 edges
3. `useAuth()` - 75 edges
4. `showError()` - 66 edges
5. `showSuccess()` - 51 edges
6. `writeAudit()` - 51 edges
7. `withLockedTransaction()` - 50 edges
8. `@tabler/icons-react` - 45 edges
9. `workScopeOf()` - 43 edges
10. `auditContext()` - 43 edges

## Surprising Connections (you probably didn't know these)
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `WorkFormPage()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkFormPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `WorkScopeProvider()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/contexts/WorkScopeContext.jsx → client/src/contexts/authContext.jsx

## Import Cycles
- None detected.

## Communities (166 total, 61 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "WorkFormPage.jsx"
Cohesion: 0.10
Nodes (28): constructionCompaniesApi, getConstructionCompaniesSelectAPI, getInsurersSelectAPI, insurersApi, getSupervisionTypesSelectAPI, supervisionTypesApi, getWorkManagersSelectAPI(), getWorksSummaryAPI() (+20 more)

### Community 3 - "auth.service.js"
Cohesion: 0.11
Nodes (26): bcrypt, REDACTED, withTransaction(), comparePassword(), hashPassword(), deriveKey(), generateResetCode(), hashResetCode() (+18 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.04
Nodes (43): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+35 more)

### Community 6 - "providers.service.js"
Cohesion: 0.10
Nodes (50): withLockedTransaction(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes(), assertTypeIds() (+42 more)

### Community 7 - "server.js"
Cohesion: 0.17
Nodes (12): ref_http, node-cron, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog(), cronJobs (+4 more)

### Community 8 - "writeAudit"
Cohesion: 0.09
Nodes (29): ADR-0013, ref_crypto, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0027, newOperationId() (+21 more)

### Community 9 - "master.service.js"
Cohesion: 0.13
Nodes (33): capitalize(), createMasterService(), httpError(), ADR-0004, ADR-0027, scopeWhere(), containsFilter(), countByStatus() (+25 more)

### Community 10 - "advanceTerms.js"
Cohesion: 0.15
Nodes (24): @prisma/client, toMoney(), advanceBalances(), appliedPct(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits(), balancesDto() (+16 more)

### Community 11 - "invoices.routes.js"
Cohesion: 0.11
Nodes (28): optionalDate(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, getInvoiceFormOptionsController, grantedOf(), INVOICE_FIELDS (+20 more)

### Community 12 - "auditContext"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "showError"
Cohesion: 0.06
Nodes (67): suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, getModulesAPI(), getProfilesAPI(), saveProfileAPI(), checkProviderIdentificationAPI(), getAssignableWorksAPI() (+59 more)

### Community 14 - "client/package.json"
Cohesion: 0.06
Nodes (35): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+27 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.12
Nodes (20): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+12 more)

### Community 17 - "permissions.constants.js"
Cohesion: 0.05
Nodes (50): ADR-0018, ADR-0006, ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0020, ADR-0024 (+42 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.11
Nodes (15): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+7 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.16
Nodes (19): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider(), getStoredUser() (+11 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 22 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.12
Nodes (14): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, app, __dirname (+6 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (57): addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress(), applyManagers() (+49 more)

### Community 26 - "works.routes.js"
Cohesion: 0.11
Nodes (24): IDEMPOTENCY_HEADER, canViewAllWorks(), managedWhere(), resolveWorkScope(), selectMyWorks(), changeWorkStatusController, deleteWorkController, getWorkController (+16 more)

### Community 27 - "@mui/material"
Cohesion: 0.07
Nodes (37): DashboardDefault, appDrawerWidth, gridSpacing, CardGrid(), CardSecondaryAction(), headerStyle, MainCard(), SubCard() (+29 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.13
Nodes (13): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+5 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.07
Nodes (23): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+15 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.10
Nodes (28): ADR-0023, amountsDto(), assertContractStillAdmits(), countByState(), DETAIL_AUDITED, detailChanges(), detailText(), documentValuesOf() (+20 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "workScopeOf"
Cohesion: 0.09
Nodes (41): getEffectivePermissionIds(), workScopeOf(), moneyRule(), percentRule(), ACT_FIELDS, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController (+33 more)

### Community 33 - "seed.js"
Cohesion: 0.17
Nodes (10): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES (+2 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 37 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 38 - "updateInvoice"
Cohesion: 0.21
Nodes (22): approveInvoice(), assertInvoiceInScope(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditable(), cancelInvoice() (+14 more)

### Community 39 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.05
Nodes (20): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, payload, hasEffectivePermission, prismaMock (+12 more)

### Community 41 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "App.jsx"
Cohesion: 0.12
Nodes (16): refreshSession(), App(), client_src_assets_scss_style, AuthContext, container, root, NavigationScroll(), reportWebVitals() (+8 more)

### Community 45 - "invoiceTerms.js"
Cohesion: 0.17
Nodes (16): assertTransition(), cancelTransitionFor(), historyRow(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS, INVOICE_TYPES, ADR-0020 (+8 more)

### Community 46 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart, pm2:start (+5 more)

### Community 48 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "contractFields.js"
Cohesion: 0.17
Nodes (14): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+6 more)

### Community 51 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.07
Nodes (51): contractConceptsApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+43 more)

### Community 53 - "users.service.js"
Cohesion: 0.08
Nodes (27): nit(), USER_NAME_SELECT, DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008 (+19 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "InvoiceFormPage.jsx"
Cohesion: 0.21
Nodes (18): getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, amountsPayload(), DOCUMENT_FIELDS, EMPTY_FORM (+10 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.07
Nodes (25): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+17 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkDetailPage.jsx"
Cohesion: 0.08
Nodes (49): getStatusesByScopeAPI(), getContractAdvanceAPI(), useSocket(), ContactsList(), ADR-0009, DataList(), Figure(), Pending() (+41 more)

### Community 59 - "UsersPage.jsx"
Cohesion: 0.15
Nodes (22): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+14 more)

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

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "seed.demo.js"
Cohesion: 0.09
Nodes (31): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+23 more)

### Community 70 - "prismaClient.js"
Cohesion: 0.10
Nodes (21): @prisma/adapter-mariadb, adapter, ADR-0013, ADR-0027, prisma, ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS (+13 more)

### Community 71 - "MainLayout/index.jsx"
Cohesion: 0.17
Nodes (17): handlerDrawerOpen(), useWorkScope(), Footer(), Header(), WorkSection(), MainLayout(), MainLayoutContent(), ScopedOutlet() (+9 more)

### Community 88 - "masterRouter.utils.js"
Cohesion: 0.10
Nodes (25): express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), getContractTypeFieldsSchema (+17 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (14): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+6 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (93): addressTypesApi, identityDocumentsApi, providerTypesApi, reasonsApi, useAuth(), useWorkFilterField(), WorkScopeContext, ProfileSection() (+85 more)

### Community 100 - "socket.js"
Cohesion: 0.23
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 104 - "`tbl_providers`"
Cohesion: 0.22
Nodes (7): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_providers`, `tbl_provider_classifications`, `tbl_identity_documents`, `tbl_provider_types`

### Community 105 - "getIO"
Cohesion: 0.14
Nodes (16): getIO(), FIELD_ATTRIBUTES, getContractTypeFieldsController, pickField(), saveContractTypeFieldsController, insertNotification(), deleteProfileController(), getModulesController() (+8 more)

### Community 108 - "contracts.service.js"
Cohesion: 0.05
Nodes (112): ADR-0016, ADR-0021, ADR-0026, diffFields(), moneyText(), sumMoney(), toPercent(), dateOnlyText() (+104 more)

### Community 112 - "uniqueConstraints.constants.test.js"
Cohesion: 0.14
Nodes (11): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, created, DATABASE, declared, dropped, inDatabase (+3 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 116 - "ProviderFormPage.jsx"
Cohesion: 0.14
Nodes (23): getAddressTypesSelectAPI, ProviderFormPage, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009 (+15 more)

### Community 117 - "httpCliente.js"
Cohesion: 0.11
Nodes (17): getPermissionsCatalogAPI(), getMyWorksSelectAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient, pickWork(), WorkScopeProvider() (+9 more)

### Community 118 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 119 - "error.middleware.js"
Cohesion: 0.27
Nodes (14): concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS, driverCause() (+6 more)

### Community 120 - "themes/index.jsx"
Cohesion: 0.33
Nodes (6): createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor, Typography()

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "providers.controller.test.js"
Cohesion: 0.29
Nodes (5): emit, getEffectivePermissionIds, SCOPE, serviceMock, workScopeOf

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.25
Nodes (6): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`

### Community 130 - "idempotency.service.js"
Cohesion: 0.15
Nodes (18): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+10 more)

### Community 131 - "`tbl_work_providers`"
Cohesion: 0.18
Nodes (8): `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers`, `tbl_work_contacts`, `tbl_address_types`, `tbl_works`

### Community 132 - "money.utils.js"
Cohesion: 0.20
Nodes (17): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), percentText(), RATIO_SCALE (+9 more)

### Community 133 - "contractSuspensions.service.test.js"
Cohesion: 0.07
Nodes (16): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, ADR-0006, prismaMock, state, ctx (+8 more)

### Community 134 - "useGetMenuMaster"
Cohesion: 0.29
Nodes (11): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), MenuList() (+3 more)

### Community 136 - "ContractTypeFieldsDialog.jsx"
Cohesion: 0.15
Nodes (16): contractTypesApi, getContractTypeFieldsAPI(), saveContractTypeFieldsAPI(), ContractTypePage, ContractTypeFieldsDialog(), DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+8 more)

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 139 - "AuthenticationRoutes.jsx"
Cohesion: 0.18
Nodes (11): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router (+3 more)

### Community 140 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 151 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 152 - "ForgotPassword.jsx"
Cohesion: 0.23
Nodes (10): client_src_assets_images_interve, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthCardWrapper(), AuthWrapper1 (+2 more)

### Community 153 - "ConfigContext.jsx"
Cohesion: 0.27
Nodes (7): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage()

### Community 154 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 155 - "transaction.service.js"
Cohesion: 0.21
Nodes (11): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+3 more)

### Community 156 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 157 - "constants.js"
Cohesion: 0.22
Nodes (9): SocketContext, TooltipLongText(), ADR-0017, pathSocket, STATUS_TABS, TERM_UNIT_NAMES, toNlBr(), truncateText() (+1 more)

### Community 159 - "useConfig"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 160 - "contracts.controller.test.js"
Cohesion: 0.18
Nodes (9): conceptsServiceMock, contractsServiceMock, emit, getEffectivePermissionIds, ADR-0015, ADR-0016, SCOPE, suspensionsServiceMock (+1 more)

### Community 161 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 162 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

## Knowledge Gaps
- **785 isolated node(s):** `WorkScopeContext`, `NO_FILTERS`, `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS`, `NO_FIELDS` (+780 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1076 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **61 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `server/package.json` to `writeAudit`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `WorkFormPage.jsx`, `server/package.json`, `useGetMenuMaster`, `ContractTypeFieldsDialog.jsx`, `AuthenticationRoutes.jsx`, `showError`, `client/package.json`, `EasyCrop.jsx`, `AuthForgotPassword.jsx`, `NotificationSection/index.jsx`, `ForgotPassword.jsx`, `constants.js`, `useConfig`, `InputLabel.jsx`, `DocumentManagement.jsx`, `withAlpha`, `ContractFormPage.jsx`, `InvoiceFormPage.jsx`, `WorkDetailPage.jsx`, `UsersPage.jsx`, `MainLayout/index.jsx`, `useAuth`, `ProviderFormPage.jsx`, `themes/index.jsx`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Why does `ADR-0003` connect `useAuth` to `master.service.js`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **What connects `WorkScopeContext`, `NO_FILTERS`, `STATUS_NAMES` to the rest of the system?**
  _785 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `WorkFormPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09716599190283401 - nodes in this community are weakly interconnected._
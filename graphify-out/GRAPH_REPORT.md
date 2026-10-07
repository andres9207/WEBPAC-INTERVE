# Graph Report - WEBPAC-INTERVE  (2026-10-07)

## Corpus Check
- 503 files · ~220,724 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 2768 nodes · 7238 edges · 165 communities (101 shown, 64 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 106 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7b8e365a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- WorkFormPage.jsx
- funciones.js
- dependencies
- server/package.json
- providers.service.js
- server.js
- auth.service.js
- contracts.service.js
- money.utils.js
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
- workScopeOf
- NotificationSection/index.jsx
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- @mui/material
- providers.service.test.js
- contracts.controller.test.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- session.service.js
- MainCard
- works.service.test.js
- ref_jest_globals
- withAlpha
- devDependencies
- src/index.jsx
- eslint.config.mjs
- scripts
- volta
- `tbl_invoices`
- Sidebar/index.jsx
- app.routes.js
- ContractFormPage.jsx
- identityDocuments.service.js
- `tbl_contract_type_fields`
- InvoiceFormPage.jsx
- transaction.mock.js
- scripts
- WorkDetailPage.jsx
- contractSuspensions.service.test.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- transaction.service.test.js
- extends
- seed.demo.js
- app.service.js
- MainLayout/index.jsx
- `tbl_contract_status_history`
- masterRouter.utils.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- socket.js
- `tbl_providers`
- contractEndDateReconciliation.service.js
- contractConcepts.service.js
- uniqueConstraints.constants.test.js
- `tbl_works`
- `tbl_insurers`
- permissions.service.js
- permissionsApi.js
- browserslist
- error.middleware.js
- themes/index.jsx
- `tbl_providers`
- error.middleware.test.js
- images.js
- auth.service.test.js
- `tbl_contract_suspensions`
- idempotency.service.js
- `tbl_work_providers`
- password-strength.js
- contractTypeFields.service.test.js
- useGetMenuMaster
- winston.config.js
- users.service.test.js
- AuthenticationRoutes.jsx
- notifications.routes.js
- EasyCrop.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- contracts.service.test.js
- ForgotPassword.jsx
- workScope.service.test.js
- master.service.test.js
- DebouncedInput.jsx
- addressTypes.service.js
- constants.js
- useConfig
- volta
- session.service.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 115 edges
2. `react` - 87 edges
3. `useAuth()` - 75 edges
4. `showError()` - 66 edges
5. `showSuccess()` - 51 edges
6. `writeAudit()` - 51 edges
7. `withLockedTransaction()` - 50 edges
8. `@tabler/icons-react` - 45 edges
9. `auditContext()` - 43 edges
10. `workScopeOf()` - 43 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js
- `ContractDetailPage()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/views/work/contracts/ContractDetailPage.jsx → client/src/contexts/authContext.jsx
- `ContractDetailPage()` --calls--> `showError()`  [EXTRACTED]
  client/src/views/work/contracts/ContractDetailPage.jsx → client/src/services/ToastService.js
- `ContractDetailPage()` --calls--> `showSuccess()`  [EXTRACTED]
  client/src/views/work/contracts/ContractDetailPage.jsx → client/src/services/ToastService.js

## Import Cycles
- None detected.

## Communities (165 total, 64 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (22): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DateTimePickerToolbar() (+14 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "WorkFormPage.jsx"
Cohesion: 0.06
Nodes (49): getAddressTypesSelectAPI, getConstructionCompaniesSelectAPI, getContractTypeFieldsAPI(), getContractTypesSelectAPI, saveContractTypeFieldsAPI(), getInsurersSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI() (+41 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (33): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+25 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (65): diffFields(), writeAudit(), withLockedTransaction(), assertInScope(), updateAccount(), updatePassword(), deleteUser(), applyProviderTypes() (+57 more)

### Community 7 - "server.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+8 more)

### Community 8 - "auth.service.js"
Cohesion: 0.04
Nodes (98): ADR-0013, @prisma/client, adapter, ADR-0013, ADR-0027, prisma, ACTIVE_STATUS, DELETED_STATUS (+90 more)

### Community 9 - "contracts.service.js"
Cohesion: 0.08
Nodes (57): ADR-0027, scopeWhere(), percentText(), toPercent(), containsFilter(), dateRangeFilter(), DEFAULT_ROWS, filtersWhere() (+49 more)

### Community 10 - "money.utils.js"
Cohesion: 0.09
Nodes (42): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ratioPercent() (+34 more)

### Community 11 - "invoices.routes.js"
Cohesion: 0.11
Nodes (28): approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, getInvoiceFormOptionsController, grantedOf(), INVOICE_FIELDS, notify() (+20 more)

### Community 12 - "auditContext"
Cohesion: 0.11
Nodes (28): jsonwebtoken, auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController() (+20 more)

### Community 13 - "showError"
Cohesion: 0.06
Nodes (79): suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, getModulesAPI(), getProfilesAPI(), saveProfileAPI(), checkProviderIdentificationAPI(), getAssignableWorksAPI() (+71 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (23): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+15 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.12
Nodes (21): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+13 more)

### Community 17 - "permissions.constants.js"
Cohesion: 0.05
Nodes (51): ADR-0011, ADR-0012, ADR-0018, ADR-0020, ADR-0024, express, ADR-0006, ADR-0016 (+43 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.11
Nodes (15): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+7 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.17
Nodes (16): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider(), getStoredUser() (+8 more)

### Community 21 - "workScopeOf"
Cohesion: 0.10
Nodes (33): workScopeOf(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS (+25 more)

### Community 22 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.06
Nodes (69): moneyText(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS (+61 more)

### Community 26 - "works.routes.js"
Cohesion: 0.11
Nodes (24): canViewAllWorks(), managedWhere(), resolveWorkScope(), selectMyWorks(), changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS (+16 more)

### Community 27 - "@mui/material"
Cohesion: 0.07
Nodes (41): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), getWorksSummaryAPI(), filterParams(), isEmptyValue(), NO_FILTERS (+33 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.13
Nodes (13): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+5 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.04
Nodes (37): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+29 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.07
Nodes (72): ADR-0023, toMoney(), approveInvoice(), assertInvoiceInScope(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork() (+64 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.08
Nodes (40): getEffectivePermissionIds(), moneyRule(), optionalDate(), percentRule(), ACT_FIELDS, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController (+32 more)

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

### Community 38 - "MainCard"
Cohesion: 0.14
Nodes (17): DashboardDefault, gridSpacing, CardGrid(), CardSecondaryAction(), headerStyle, MainCard(), Avatar(), Dashboard() (+9 more)

### Community 39 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (15): ref_jest_globals, buildRes(), mockFindFirst, runMiddleware(), validPayload, prismaMock, mockValidationResult, prismaMock (+7 more)

### Community 41 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 46 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, cron:run, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart (+6 more)

### Community 48 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "Sidebar/index.jsx"
Cohesion: 0.30
Nodes (8): LogoSection(), MainContentStyled, Sidebar(), closedMixin(), MiniDrawerStyled, openedMixin(), appDrawerWidth, drawerWidth

### Community 51 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (44): contractConceptsApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+36 more)

### Community 53 - "identityDocuments.service.js"
Cohesion: 0.15
Nodes (14): nit(), DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, nitCheckDigit() (+6 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "InvoiceFormPage.jsx"
Cohesion: 0.13
Nodes (26): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, MoneyField(), fPercentText() (+18 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (28): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+20 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkDetailPage.jsx"
Cohesion: 0.08
Nodes (53): getStatusesByScopeAPI(), workProvidersApi, useSocket(), SubCard(), ContactsList(), ADR-0009, DataList(), Figure() (+45 more)

### Community 59 - "contractSuspensions.service.test.js"
Cohesion: 0.17
Nodes (5): ctx, initial, ADR-0017, prismaMock, state

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

### Community 70 - "app.service.js"
Cohesion: 0.28
Nodes (5): getMenu(), getSessionInfo(), PAGE_SELECT, toChild(), toParent()

### Community 71 - "MainLayout/index.jsx"
Cohesion: 0.15
Nodes (20): handlerDrawerOpen(), getMyWorksSelectAPI(), pickWork(), useWorkScope(), WorkScopeProvider(), Footer(), Header(), WorkSection() (+12 more)

### Community 88 - "masterRouter.utils.js"
Cohesion: 0.09
Nodes (30): getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), ACCESS_COOKIE_NAME, createMasterControllers(), createMasterRouter() (+22 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (14): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+6 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (87): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, providerTypesApi, supervisionTypesApi, useAuth() (+79 more)

### Community 100 - "socket.js"
Cohesion: 0.31
Nodes (8): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), isSessionActive()

### Community 104 - "`tbl_providers`"
Cohesion: 0.22
Nodes (7): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_providers`, `tbl_provider_classifications`, `tbl_identity_documents`, `tbl_provider_types`

### Community 105 - "contractEndDateReconciliation.service.js"
Cohesion: 0.39
Nodes (8): findUsersWithPermission(), insertNotification(), daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), ADR-0015, reportEmails(), runEndDateReconciliation()

### Community 108 - "contractConcepts.service.js"
Cohesion: 0.08
Nodes (60): ADR-0021, sumMoney(), assertContractStillAdmits(), activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct() (+52 more)

### Community 112 - "uniqueConstraints.constants.test.js"
Cohesion: 0.14
Nodes (11): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, created, DATABASE, declared, dropped, inDatabase (+3 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 116 - "permissions.service.js"
Cohesion: 0.24
Nodes (5): auditPermissionChanges(), ADR-0013, ADR-0027, updateProfilePermissions(), updateUserPermissions()

### Community 118 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 119 - "error.middleware.js"
Cohesion: 0.27
Nodes (14): concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS, driverCause() (+6 more)

### Community 120 - "themes/index.jsx"
Cohesion: 0.46
Nodes (5): createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), Typography()

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.25
Nodes (6): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`

### Community 130 - "idempotency.service.js"
Cohesion: 0.14
Nodes (16): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), IDEMPOTENCY_HEADER, idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused() (+8 more)

### Community 131 - "`tbl_work_providers`"
Cohesion: 0.18
Nodes (8): `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers`, `tbl_work_contacts`, `tbl_address_types`, `tbl_works`

### Community 132 - "password-strength.js"
Cohesion: 0.43
Nodes (5): defaultColor, hasMixed(), hasNumber(), hasSpecial(), strengthIndicator()

### Community 133 - "contractTypeFields.service.test.js"
Cohesion: 0.10
Nodes (15): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+7 more)

### Community 134 - "useGetMenuMaster"
Cohesion: 0.25
Nodes (11): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), MenuList() (+3 more)

### Community 136 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 137 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 139 - "AuthenticationRoutes.jsx"
Cohesion: 0.19
Nodes (10): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router, MainRoutes (+2 more)

### Community 140 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 151 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 152 - "ForgotPassword.jsx"
Cohesion: 0.15
Nodes (14): client_src_assets_images_interve, config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, LoginPage, AppBar(), ElevationScroll() (+6 more)

### Community 153 - "workScope.service.test.js"
Cohesion: 0.40
Nodes (4): hasEffectivePermission, prismaMock, state, user

### Community 154 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 156 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 157 - "constants.js"
Cohesion: 0.06
Nodes (32): reasonsApi, genericRequest, instance, NO_REFRESH_URLS, refreshClient, refreshSession(), App(), AuthContext (+24 more)

### Community 159 - "useConfig"
Cohesion: 0.22
Nodes (10): ConfigContext, ConfigProvider(), useConfig(), useLocalStorage(), ElevationScroll(), HorizontalBar(), ImageList(), srcset() (+2 more)

### Community 160 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 161 - "session.service.test.js"
Cohesion: 0.14
Nodes (10): ref_crypto, deriveKey(), hashResetCode(), ADR-0001, verifyResetCode(), dbUser, mockDisconnectSockets, mockIn (+2 more)

## Knowledge Gaps
- **795 isolated node(s):** `TABS`, `CONTRACT_STATE_FILTER`, `FILTER_FIELDS`, `ADR-0015`, `name` (+790 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1088 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **64 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `auth.service.js`, `server/package.json`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `WorkFormPage.jsx`, `useGetMenuMaster`, `AuthenticationRoutes.jsx`, `showError`, `client/package.json`, `EasyCrop.jsx`, `AuthForgotPassword.jsx`, `NotificationSection/index.jsx`, `ForgotPassword.jsx`, `DebouncedInput.jsx`, `constants.js`, `useConfig`, `DocumentManagement.jsx`, `MainCard`, `withAlpha`, `Sidebar/index.jsx`, `ContractFormPage.jsx`, `InvoiceFormPage.jsx`, `WorkDetailPage.jsx`, `MainLayout/index.jsx`, `useAuth`, `themes/index.jsx`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Why does `axios` connect `constants.js` to `server/package.json`, `client/package.json`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **What connects `TABS`, `CONTRACT_STATE_FILTER`, `FILTER_FIELDS` to the rest of the system?**
  _795 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08985200845665962 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `WorkFormPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06394230769230769 - nodes in this community are weakly interconnected._
# Graph Report - WEBPAC-INTERVE  (2026-10-14)

## Corpus Check
- 557 files · ~261,076 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3080 nodes · 8338 edges · 198 communities (117 shown, 81 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 116 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7e766eb5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- writeAudit
- InvoiceFormPage.jsx
- dependencies
- server/package.json
- providers.service.js
- prismaClient.js
- auth.service.js
- ContractFormPage.jsx
- withAlpha
- seed.demo.js
- auditContext
- contracts.service.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- master.service.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- MainLayout/index.jsx
- dashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contractSuspensions.service.test.js
- contractTerms.js
- providers.service.test.js
- invoices.controller.test.js
- invoices.service.js
- mailerService.js
- workScopeOf
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- formatTime.js
- session.service.js
- Default/index.jsx
- server.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- contractPolicies.service.test.js
- scripts
- contractPolicies.service.js
- `tbl_invoices`
- ProviderTypePage.jsx
- providers.routes.js
- showError
- UsersPage.jsx
- `tbl_contract_type_fields`
- useAuth
- transaction.mock.js
- scripts
- @mui/material
- workScope.service.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- floatingPoint.guard.test.js
- notifications.routes.js
- users.service.js
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
- react-router-dom
- `tbl_works`
- `tbl_policies`
- useGetMenuMaster
- invoices.routes.js
- auth.service.test.js
- error.middleware.js
- decimal
- `tbl_providers`
- transaction.service.test.js
- images.js
- ForgotPassword.jsx
- `tbl_contract_suspensions`
- providerTypeFields.service.js
- `tbl_providers`
- handleFirebase.js
- session.service.test.js
- contractSuspensions.service.js
- contractConcepts.service.js
- uniqueConstraints.constants.test.js
- invoiceTerms.js
- works.service.test.js
- getIO
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- themes/index.jsx
- dashboard.service.test.js
- InputLabel.jsx
- retentionTerms.js
- master.service.test.js
- invoiceViews.js
- money.utils.js
- `tbl_contract_concepts`
- `tbl_reasons`
- volta
- Sidebar/index.jsx
- NotificationSection/index.jsx
- `tbl_users`
- contracts.service.test.js
- contracts.controller.test.js
- resolveDetail
- useConfig
- winston.config.js
- works.controller.test.js
- revalidateOnApprove
- users.service.test.js
- permissions.controller.test.js
- DebouncedInput.jsx
- browserslist
- useMenuCollapse.js
- EasyCrop.jsx
- volta

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
- `previewWorkEndDate()` --calls--> `addTerm()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/term.utils.js
- `WorkView()` --indirect_call--> `previewWorkEndDateAPI()`  [INFERRED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/api/requests/worksApi.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `createMasterService()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/common/services/master.service.js → server/src/common/services/idempotency.service.js

## Import Cycles
- None detected.

## Communities (198 total, 81 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "writeAudit"
Cohesion: 0.09
Nodes (34): AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0027, newOperationId(), protect() (+26 more)

### Community 3 - "InvoiceFormPage.jsx"
Cohesion: 0.05
Nodes (57): getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, getPermissionsCatalogAPI(), providersApi, getMyWorksSelectAPI() (+49 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (32): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+24 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (55): providerViewOf(), applyProviderTypes(), assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes(), assertTypeIds(), assertWorkAssignable() (+47 more)

### Community 7 - "prismaClient.js"
Cohesion: 0.07
Nodes (32): ADR-0027, @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection() (+24 more)

### Community 8 - "auth.service.js"
Cohesion: 0.08
Nodes (37): bcrypt, REDACTED, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS (+29 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (45): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+37 more)

### Community 10 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.07
Nodes (28): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+20 more)

### Community 12 - "auditContext"
Cohesion: 0.11
Nodes (27): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+19 more)

### Community 13 - "contracts.service.js"
Cohesion: 0.08
Nodes (47): ADR-0016, ADR-0018, ADR-0026, percentText(), sumMoney(), typeAppliesAiu(), versionDto(), assertHeader() (+39 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (34): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+26 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.08
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.13
Nodes (18): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+10 more)

### Community 17 - "master.service.js"
Cohesion: 0.11
Nodes (33): capitalize(), createMasterService(), defineMaster(), httpError(), ADR-0027, containsFilter(), countByStatus(), dateRangeFilter() (+25 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.10
Nodes (19): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.16
Nodes (19): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider(), getStoredUser() (+11 more)

### Community 21 - "MainLayout/index.jsx"
Cohesion: 0.22
Nodes (9): Footer(), MainLayout(), MainLayoutContent(), ScopedOutlet(), MainContentStyled, Breadcrumbs(), BTitle(), Loadable() (+1 more)

### Community 22 - "dashboard.service.js"
Cohesion: 0.12
Nodes (32): scopeWhere(), contractsBlock(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002, notDeleted, policiesBlock() (+24 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (54): ADR-0004, ADR-0007, assertInScope(), PROGRESS_WARNING, defineContacts(), FIELDS, httpError(), ADR-0009 (+46 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.07
Nodes (17): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), row(), ctx, prismaMock, state (+9 more)

### Community 27 - "contractTerms.js"
Cohesion: 0.09
Nodes (30): ADR-0021, findUsersWithPermission(), insertNotification(), daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), ADR-0015, reportEmails() (+22 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.12
Nodes (14): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+6 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.07
Nodes (23): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+15 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.10
Nodes (49): ADR-0017, ADR-0023, ADR-0025, approveInvoice(), assertInvoiceVisible(), assertProviderAssigned(), assertStage(), assertUniqueNumber() (+41 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "workScopeOf"
Cohesion: 0.07
Nodes (54): workScopeOf(), moneyRule(), optionalDate(), percentRule(), ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS, CONTRACT_FIELDS (+46 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "formatTime.js"
Cohesion: 0.14
Nodes (12): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+4 more)

### Community 37 - "session.service.js"
Cohesion: 0.08
Nodes (35): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+27 more)

### Community 38 - "Default/index.jsx"
Cohesion: 0.09
Nodes (37): getDashboardSummaryAPI(), ADR-0002, appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard() (+29 more)

### Community 39 - "server.js"
Cohesion: 0.14
Nodes (14): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+6 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (19): ref_jest_globals, buildRes(), mockFindFirst, runMiddleware(), validPayload, prismaMock, mockValidationResult, prismaMock (+11 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.06
Nodes (39): ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020, ADR-0024 (+31 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 46 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, cron:run, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart (+6 more)

### Community 48 - "contractPolicies.service.js"
Cohesion: 0.13
Nodes (35): main(), toPercent(), assertContractStillAdmits(), createContractInvoice(), assertMasters(), assertTypeFree(), auditable(), cancelPolicy() (+27 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "ProviderTypePage.jsx"
Cohesion: 0.14
Nodes (17): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+9 more)

### Community 51 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 52 - "showError"
Cohesion: 0.05
Nodes (91): suspendContractAPI(), getIdentityDocumentsSelectAPI, getInsurersSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, getModulesAPI() (+83 more)

### Community 53 - "UsersPage.jsx"
Cohesion: 0.15
Nodes (21): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+13 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "useAuth"
Cohesion: 0.10
Nodes (36): contractPoliciesApi, getContractAdvanceAPI(), useAuth(), PrivateRoute(), MoneyField(), fTerm(), fMoneyText(), fPercentText() (+28 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.07
Nodes (25): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+17 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "@mui/material"
Cohesion: 0.05
Nodes (79): getStatusesByScopeAPI(), contractsApi, useInvoiceViewChange(), useInvoiceViews(), ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog() (+71 more)

### Community 59 - "workScope.service.js"
Cohesion: 0.07
Nodes (38): getEffectivePermissionIds(), hasEffectivePermission(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere() (+30 more)

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

### Community 70 - "users.service.js"
Cohesion: 0.10
Nodes (21): ADR-0013, USER_NAME_SELECT, DIAN_WEIGHTS, GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, assertAssignableProfile() (+13 more)

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
Nodes (93): addressTypesApi, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, insurersApi, reasonsApi (+85 more)

### Community 100 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (36): express, verifyToken(), requirePermission(), validate(), isSessionActive(), createMasterControllers(), createMasterRouter(), constructionCompaniesRoutes (+28 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "constants.js"
Cohesion: 0.09
Nodes (21): policyTypesApi, PolicyTypePage, SocketContext, TooltipLongText(), CONTRACT_INVOICE_TYPES, ADR-0017, pathSocket, POLICY_BASE_OPTIONS (+13 more)

### Community 108 - "App.jsx"
Cohesion: 0.28
Nodes (7): refreshSession(), App(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

### Community 112 - "react-router-dom"
Cohesion: 0.20
Nodes (10): ADR-0002, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router (+2 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "useGetMenuMaster"
Cohesion: 0.35
Nodes (10): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), Header(), WorkSection(), NavCollapse(), NavGroup() (+2 more)

### Community 117 - "invoices.routes.js"
Cohesion: 0.12
Nodes (27): accessOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, getInvoiceFormOptionsController, grantedOf(), INVOICE_FIELDS (+19 more)

### Community 118 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "decimal"
Cohesion: 0.20
Nodes (19): decimal(), moneyText(), ratioPercent(), ratioText(), roundRatio(), advanceBalances(), appliedPct(), assertAdvanceCancellable() (+11 more)

### Community 123 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 124 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "ForgotPassword.jsx"
Cohesion: 0.19
Nodes (12): client_src_assets_images_interve, LogoSection(), LoginPage, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo() (+4 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.22
Nodes (7): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`, `tbl_invoice_liquidation_details`

### Community 130 - "providerTypeFields.service.js"
Cohesion: 0.12
Nodes (27): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+19 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 133 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 134 - "contractSuspensions.service.js"
Cohesion: 0.16
Nodes (24): addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), TERM_UNITS, termProgress(), toDateOnly() (+16 more)

### Community 136 - "contractConcepts.service.js"
Cohesion: 0.19
Nodes (26): withContractAiu(), activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget(), configuredConcept() (+18 more)

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 139 - "invoiceTerms.js"
Cohesion: 0.16
Nodes (16): isContractCreate(), isCreate(), isSimpleCreate(), cancelTransitionFor(), hasContract(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS (+8 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "getIO"
Cohesion: 0.15
Nodes (15): getIO(), FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, deleteProfileController(), getModulesController(), ADR-0027 (+7 more)

### Community 151 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 152 - "themes/index.jsx"
Cohesion: 0.21
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 153 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 155 - "retentionTerms.js"
Cohesion: 0.22
Nodes (13): @prisma/client, assertLiquidationCancellable(), assertRefundFits(), assertRetentionFits(), httpError(), ADR-0025, money(), retentionBalances() (+5 more)

### Community 156 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 157 - "invoiceViews.js"
Cohesion: 0.16
Nodes (22): applyInvoiceViewChange(), ADR-0010, providerTypesService, INVOICE_TYPES, ANY_CONTRACT_VIEW_PERMISSION, ANY_VIEW_PERMISSION, applyProviderViewChanges(), assertNotMixed() (+14 more)

### Community 159 - "money.utils.js"
Cohesion: 0.14
Nodes (14): HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ROUNDING, ZERO (+6 more)

### Community 173 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 174 - "Sidebar/index.jsx"
Cohesion: 0.27
Nodes (8): getMenuAPI(), getIconByName(), MenuList(), Sidebar(), closedMixin(), MiniDrawerStyled, openedMixin(), drawerWidth

### Community 175 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.39
Nodes (6): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 179 - "contracts.controller.test.js"
Cohesion: 0.17
Nodes (10): conceptsServiceMock, contractsServiceMock, emit, getEffectivePermissionIds, ADR-0015, ADR-0016, policiesServiceMock, SCOPE (+2 more)

### Community 181 - "resolveDetail"
Cohesion: 0.36
Nodes (9): roundMoney(), toMoney(), defaultAmortization(), adjustableAmount(), getContractAdvance(), liquidationConceptOf(), positiveMoney(), resolveDetail() (+1 more)

### Community 183 - "useConfig"
Cohesion: 0.27
Nodes (8): useConfig(), ProfileSection(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 186 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 189 - "works.controller.test.js"
Cohesion: 0.29
Nodes (5): emit, getEffectivePermissionIds, SCOPE, serviceMock, workScopeOf

### Community 190 - "revalidateOnApprove"
Cohesion: 0.53
Nodes (6): balanceChange(), contractBalances(), hasDetail(), revalidateOnApprove(), revalidateOnCancel(), storedAmount()

### Community 191 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 192 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 194 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 197 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **873 isolated node(s):** `EXCLUDED_FROM_FINGERPRINT`, `payload`, `axios`, `@azure/identity`, `bcrypt` (+868 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1199 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **81 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0016` connect `contracts.service.js` to `ContractFormPage.jsx`?**
  _High betweenness centrality (0.200) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `InvoiceFormPage.jsx`, `ContractFormPage.jsx`, `withAlpha`, `client/package.json`, `AuthForgotPassword.jsx`, `MainLayout/index.jsx`, `themes/index.jsx`, `InputLabel.jsx`, `formatTime.js`, `Default/index.jsx`, `Sidebar/index.jsx`, `NotificationSection/index.jsx`, `ProviderTypePage.jsx`, `showError`, `UsersPage.jsx`, `useAuth`, `useConfig`, `DebouncedInput.jsx`, `EasyCrop.jsx`, `ContactsEditor.jsx`, `MainRoutes.jsx`, `constants.js`, `react-router-dom`, `useGetMenuMaster`, `ForgotPassword.jsx`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `axios` connect `InvoiceFormPage.jsx` to `server/package.json`, `client/package.json`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **What connects `EXCLUDED_FROM_FINGERPRINT`, `payload`, `axios` to the rest of the system?**
  _873 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `writeAudit` be split into smaller, more focused modules?**
  _Cohesion score 0.09292929292929293 - nodes in this community are weakly interconnected._
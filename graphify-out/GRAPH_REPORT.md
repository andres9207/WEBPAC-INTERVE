# Graph Report - WEBPAC-INTERVE  (2026-10-14)

## Corpus Check
- 557 files · ~260,859 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3082 nodes · 8340 edges · 186 communities (109 shown, 77 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 116 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `504bda21`
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
- runIdempotent
- auth.service.js
- ContractFormPage.jsx
- withAlpha
- seed.demo.js
- auth.routes.js
- contracts.service.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- socket.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- MainLayout/index.jsx
- dashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- transaction.service.js
- providers.service.test.js
- contracts.controller.test.js
- invoices.service.js
- mailerService.js
- workScopeOf
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- newIdempotencyKey
- session.service.js
- Default/index.jsx
- server.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- contractPolicies.service.test.js
- scripts
- ContractsPage.jsx
- `tbl_invoices`
- constants.js
- providers.routes.js
- react
- contractFields.js
- `tbl_contract_type_fields`
- PoliciesTab.jsx
- transaction.mock.js
- scripts
- useAuth
- workScope.service.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- floatingPoint.guard.test.js
- notifications.service.js
- permissions.service.js
- NewProviderDialog.jsx
- `tbl_contract_status_history`
- app.routes.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- masterRouter.utils.js
- `tbl_provider_type_field_versions`
- PolicyTypePage.jsx
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
- AppBar.jsx
- `tbl_contract_suspensions`
- providerTypeFields.service.js
- `tbl_providers`
- handleFirebase.js
- session.service.test.js
- addressTypes.service.js
- Shadow.jsx
- uniqueConstraints.constants.test.js
- contractEndDateReconciliation.service.test.js
- works.service.test.js
- getIO
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- EasyCrop.jsx
- themes/index.jsx
- dashboard.service.test.js
- @mui/material
- providers.controller.test.js
- master.service.test.js
- master.service.js
- DashboardCards.jsx
- `tbl_contract_concepts`
- `tbl_reasons`
- volta
- authjwt.middleware.test.js
- NotificationSection/index.jsx
- `tbl_users`
- WorkScopeContext.jsx
- useConfig

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
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `FigureRow()` --calls--> `Figure()`  [EXTRACTED]
  client/src/views/billing/invoices/InvoiceDetailPage.jsx → client/src/ui-component/extended/DetailBlocks.jsx
- `InvoiceAmounts()` --calls--> `Pending()`  [EXTRACTED]
  client/src/views/billing/invoices/InvoiceDetailPage.jsx → client/src/ui-component/extended/DetailBlocks.jsx
- `InvoiceDetailPage()` --calls--> `showError()`  [EXTRACTED]
  client/src/views/billing/invoices/InvoiceDetailPage.jsx → client/src/services/ToastService.js

## Import Cycles
- None detected.

## Communities (186 total, 77 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "writeAudit"
Cohesion: 0.06
Nodes (53): @prisma/adapter-mariadb, adapter, ADR-0013, ADR-0027, prisma, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse() (+45 more)

### Community 3 - "InvoiceFormPage.jsx"
Cohesion: 0.09
Nodes (34): getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, useWorkFilterField(), INVOICE_STATE_COLORS, INVOICE_TYPE_OPTIONS (+26 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.04
Nodes (43): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+35 more)

### Community 6 - "providers.service.js"
Cohesion: 0.07
Nodes (74): withLockedTransaction(), assertInScope(), countByStatus(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS, paginate() (+66 more)

### Community 7 - "runIdempotent"
Cohesion: 0.14
Nodes (19): DELETED_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused() (+11 more)

### Community 8 - "auth.service.js"
Cohesion: 0.10
Nodes (26): bcrypt, REDACTED, writeAuditEvent(), comparePassword(), hashPassword(), deriveKey(), generateResetCode(), hashResetCode() (+18 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.09
Nodes (41): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+33 more)

### Community 10 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.07
Nodes (31): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+23 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "contracts.service.js"
Cohesion: 0.04
Nodes (139): ADR-0016, ADR-0018, ADR-0021, ADR-0026, moneyText(), percentText(), sumMoney(), toPercent() (+131 more)

### Community 14 - "client/package.json"
Cohesion: 0.06
Nodes (36): compat, __dirname, __filename, browserslist, development, production, name, packageManager (+28 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.08
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.09
Nodes (26): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+18 more)

### Community 17 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.10
Nodes (19): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.22
Nodes (14): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber(), hasSpecial() (+6 more)

### Community 21 - "MainLayout/index.jsx"
Cohesion: 0.16
Nodes (18): handlerDrawerOpen(), useWorkScope(), Footer(), Header(), WorkSection(), MainLayout(), MainLayoutContent(), ScopedOutlet() (+10 more)

### Community 22 - "dashboard.service.js"
Cohesion: 0.11
Nodes (37): scopeWhere(), dateRangeFilter(), todayDateOnly(), contractsBlock(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002 (+29 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (56): ADR-0007, containsFilter(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS (+48 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.05
Nodes (24): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+16 more)

### Community 27 - "transaction.service.js"
Cohesion: 0.15
Nodes (20): findUsersWithPermission(), backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+12 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.12
Nodes (14): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+6 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.05
Nodes (33): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+25 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.06
Nodes (73): ADR-0017, ADR-0023, ADR-0025, ADR-0027, toMoney(), adjustableAmount(), amountsDto(), approveInvoice() (+65 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "workScopeOf"
Cohesion: 0.08
Nodes (55): auditContext(), workScopeOf(), moneyRule(), optionalDate(), percentRule(), ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS (+47 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "newIdempotencyKey"
Cohesion: 0.07
Nodes (40): deleteFileByPath(), uploadFile(), suspendContractAPI(), deleteDocApi(), paginationDocsApi(), saveDocApi(), invoiceTransitionsApi, getAssignableWorksAPI() (+32 more)

### Community 37 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 38 - "Default/index.jsx"
Cohesion: 0.17
Nodes (20): getDashboardSummaryAPI(), ADR-0002, headerStyle, MainCard(), AlertsCard(), Empty(), LatestInvoicesCard(), num (+12 more)

### Community 39 - "server.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+8 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.08
Nodes (11): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, prismaMock (+3 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.07
Nodes (34): ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020, ADR-0024 (+26 more)

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

### Community 48 - "ContractsPage.jsx"
Cohesion: 0.09
Nodes (23): contractsApi, useLinkedFilters(), ContractsPage, WorksPage, LinkedFilterNotice(), CONTRACT_POLICY_STATUS_LABELS, CONTRACT_STATE_COLORS, CONTRACT_STATE_TABS (+15 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "constants.js"
Cohesion: 0.05
Nodes (43): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), reasonsApi, refreshSession(), useInvoiceViewChange(), ProviderTypePage, ReasonPage (+35 more)

### Community 51 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 52 - "react"
Cohesion: 0.06
Nodes (59): getPermissionsCatalogAPI(), deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), getBasicInformationAPI() (+51 more)

### Community 53 - "contractFields.js"
Cohesion: 0.18
Nodes (13): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+5 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "PoliciesTab.jsx"
Cohesion: 0.10
Nodes (37): contractPoliciesApi, getInsurersSelectAPI, getContractAdvanceAPI(), getPolicyTypesSelectAPI, MoneyField(), fMoneyText(), fPercentText(), moneyInputText() (+29 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (29): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+21 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "useAuth"
Cohesion: 0.07
Nodes (67): getStatusesByScopeAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, useAuth(), useInvoiceViews(), PrivateRoute(), useSocket() (+59 more)

### Community 59 - "workScope.service.js"
Cohesion: 0.08
Nodes (34): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+26 more)

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

### Community 68 - "notifications.service.js"
Cohesion: 0.38
Nodes (8): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), getNotificationCount(), listNotifications(), markAllAsRead(), markAsRead()

### Community 70 - "permissions.service.js"
Cohesion: 0.10
Nodes (13): getEffectivePermissionIds(), getDashboardSummaryController, ADR-0002, dashboardRoutes, ADR-0002, getMenu(), getSessionInfo(), PAGE_SELECT (+5 more)

### Community 71 - "NewProviderDialog.jsx"
Cohesion: 0.09
Nodes (36): getAddressTypesSelectAPI, getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getProviderTypesSelectAPI, getSupervisionTypesSelectAPI, createMasterApi() (+28 more)

### Community 88 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.03
Nodes (52): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, supervisionTypesApi, AddressTypePage, ConstructionCompanyPage (+44 more)

### Community 100 - "masterRouter.utils.js"
Cohesion: 0.07
Nodes (38): express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers(), createMasterRouter() (+30 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "PolicyTypePage.jsx"
Cohesion: 0.16
Nodes (14): configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, PolicyTypePage, POLICY_BASE_OPTIONS, policyBaseName(), ConfigureBaseDialog(), ADR-0019 (+6 more)

### Community 108 - "App.jsx"
Cohesion: 0.20
Nodes (10): loginAPI(), logoutAPI(), verifyTokenAPI(), App(), AuthContext, AuthProvider(), getStoredUser(), NavigationScroll() (+2 more)

### Community 112 - "react-router-dom"
Cohesion: 0.15
Nodes (13): ADR-0002, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+5 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "useGetMenuMaster"
Cohesion: 0.23
Nodes (12): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), MenuList() (+4 more)

### Community 117 - "invoices.routes.js"
Cohesion: 0.10
Nodes (32): accessOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, getInvoiceFormOptionsController, grantedOf(), INVOICE_FIELDS (+24 more)

### Community 118 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "decimal"
Cohesion: 0.09
Nodes (49): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE (+41 more)

### Community 123 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 124 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "AppBar.jsx"
Cohesion: 0.23
Nodes (10): client_src_assets_images_interve, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthCardWrapper(), AuthWrapper1 (+2 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.22
Nodes (7): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`, `tbl_invoice_liquidation_details`

### Community 130 - "providerTypeFields.service.js"
Cohesion: 0.27
Nodes (15): mergeTypeRows(), resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getProviderTypeFields(), httpError() (+7 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 133 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 134 - "addressTypes.service.js"
Cohesion: 0.27
Nodes (8): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesConfig, addressTypesService, ADR-0009

### Community 136 - "Shadow.jsx"
Cohesion: 0.31
Nodes (7): CardSecondaryAction(), Avatar(), ColorBox(), UIColor(), CustomShadowBox(), ShadowBox(), UtilitiesShadow()

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 139 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "getIO"
Cohesion: 0.13
Nodes (16): getIO(), configurePolicyTypeBaseController, FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, deleteProfileController(), getModulesController() (+8 more)

### Community 151 - "EasyCrop.jsx"
Cohesion: 0.24
Nodes (5): eslintConfig, extends, react-app, react-app/jest, react-easy-crop

### Community 152 - "themes/index.jsx"
Cohesion: 0.21
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 153 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 154 - "@mui/material"
Cohesion: 0.11
Nodes (23): getWorksSummaryAPI(), gridSpacing, SubCard(), ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable() (+15 more)

### Community 155 - "providers.controller.test.js"
Cohesion: 0.29
Nodes (5): emit, getEffectivePermissionIds, SCOPE, serviceMock, workScopeOf

### Community 156 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 157 - "master.service.js"
Cohesion: 0.09
Nodes (36): ADR-0004, ADR-0013, ACTIVE_STATUS, INACTIVE_STATUS, capitalize(), createMasterService(), defineMaster(), httpError() (+28 more)

### Community 159 - "DashboardCards.jsx"
Cohesion: 0.67
Nodes (3): DashboardCards(), Indicator(), ADR-0002

### Community 173 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 174 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 175 - "NotificationSection/index.jsx"
Cohesion: 0.28
Nodes (11): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), ProfileSection(), HeaderAvatar(), MobileSearch() (+3 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.39
Nodes (6): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 179 - "WorkScopeContext.jsx"
Cohesion: 0.11
Nodes (23): providersApi, getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, pickWork(), WorkScopeContext, WorkScopeProvider() (+15 more)

### Community 183 - "useConfig"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

## Knowledge Gaps
- **875 isolated node(s):** `CONTRACT_TYPES`, `TABS`, `ADR-0020`, `TITLES`, `INTERNAL_UNIQUE_CONSTRAINTS` (+870 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1201 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **77 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0016` connect `contracts.service.js` to `ContractFormPage.jsx`?**
  _High betweenness centrality (0.206) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `InvoiceFormPage.jsx`, `server/package.json`, `Shadow.jsx`, `ContractFormPage.jsx`, `withAlpha`, `client/package.json`, `AuthForgotPassword.jsx`, `MainLayout/index.jsx`, `EasyCrop.jsx`, `themes/index.jsx`, `DashboardCards.jsx`, `newIdempotencyKey`, `Default/index.jsx`, `NotificationSection/index.jsx`, `ContractsPage.jsx`, `constants.js`, `WorkScopeContext.jsx`, `react`, `useConfig`, `PoliciesTab.jsx`, `useAuth`, `NewProviderDialog.jsx`, `PolicyTypePage.jsx`, `react-router-dom`, `useGetMenuMaster`, `AppBar.jsx`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `ADR-0003` connect `MainRoutes.jsx` to `permissions.constants.js`, `master.service.js`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **What connects `CONTRACT_TYPES`, `TABS`, `ADR-0020` to the rest of the system?**
  _875 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `writeAudit` be split into smaller, more focused modules?**
  _Cohesion score 0.05888376856118792 - nodes in this community are weakly interconnected._
# Graph Report - WEBPAC-INTERVE  (2026-10-14)

## Corpus Check
- 556 files · ~260,182 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3081 nodes · 8333 edges · 189 communities (107 shown, 82 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 116 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `82a908f4`
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
- users.service.js
- auth.service.js
- contracts.service.js
- withAlpha
- seed.demo.js
- auditContext
- contractPolicies.service.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- socket.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- Sidebar/index.jsx
- dashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- contractTerms.js
- providers.service.test.js
- invoices.controller.test.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- session.service.js
- @mui/material
- server.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- contractPolicies.service.test.js
- scripts
- constants.js
- `tbl_invoices`
- ProviderTypePage.jsx
- workScopeOf
- showError
- contractFields.js
- `tbl_contract_type_fields`
- UsersPage.jsx
- transaction.mock.js
- scripts
- useAuth
- workScope.service.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- transaction.service.test.js
- notifications.routes.js
- invoiceTerms.js
- react
- `tbl_contract_status_history`
- app.routes.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- masterRouter.utils.js
- `tbl_provider_type_field_versions`
- PolicyDialog.jsx
- App.jsx
- users.controller.js
- `tbl_works`
- `tbl_policies`
- MainLayout/index.jsx
- invoices.routes.js
- auth.service.test.js
- error.middleware.js
- decimal
- `tbl_providers`
- error.middleware.test.js
- images.js
- eslint.config.mjs
- `tbl_contract_suspensions`
- resetCode.utils.js
- `tbl_providers`
- policyTypes.service.test.js
- session.service.test.js
- addressTypes.service.js
- winston.config.js
- uniqueConstraints.constants.test.js
- useMenuCollapse.js
- works.service.test.js
- getIO
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- themes/index.jsx
- browserslist
- ref_prop_types
- DebouncedInput.jsx
- users.service.test.js
- invoiceViews.js
- funciones.js
- `tbl_contract_concepts`
- `tbl_reasons`
- authjwt.middleware.test.js
- NotificationSection/index.jsx
- `tbl_users`
- EasyCrop.jsx
- InputLabel.jsx
- WorkScopeContext.jsx
- contracts.controller.test.js
- useConfig
- volta
- `tbl_invoice_liquidation_details`

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
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `previewWorkEndDate()` --calls--> `addTerm()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/term.utils.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js

## Import Cycles
- None detected.

## Communities (189 total, 82 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "writeAudit"
Cohesion: 0.05
Nodes (54): @prisma/adapter-mariadb, adapter, ADR-0013, ADR-0027, prisma, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse() (+46 more)

### Community 3 - "InvoiceFormPage.jsx"
Cohesion: 0.13
Nodes (28): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, MoneyField(), moneyInputText() (+20 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (32): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+24 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (60): identificationError(), identityDocumentsService, providerViewOf(), assertIdentification(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable() (+52 more)

### Community 7 - "users.service.js"
Cohesion: 0.05
Nodes (69): ADR-0013, ref_crypto, ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay() (+61 more)

### Community 8 - "auth.service.js"
Cohesion: 0.16
Nodes (21): REDACTED, withTransaction(), comparePassword(), hashPassword(), generateResetCode(), ACCOUNT_FIELDS, anonymous(), clearFailedLogins() (+13 more)

### Community 9 - "contracts.service.js"
Cohesion: 0.08
Nodes (44): ADR-0016, ADR-0018, ADR-0026, percentText(), FIELD_GROUPS, typeAppliesAiu(), assertHeader(), assertProviderAssigned() (+36 more)

### Community 10 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.07
Nodes (30): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+22 more)

### Community 12 - "auditContext"
Cohesion: 0.11
Nodes (27): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+19 more)

### Community 13 - "contractPolicies.service.js"
Cohesion: 0.08
Nodes (69): diffFields(), newOperationId(), withLockedTransaction(), toPercent(), insuredValue(), policyBaseValue(), withContractAiu(), updateAccount() (+61 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (27): name, packageManager, private, version, volta, node, yarn, apexcharts (+19 more)

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
Cohesion: 0.06
Nodes (40): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), client_src_assets_images_interve, AuthProvider() (+32 more)

### Community 21 - "Sidebar/index.jsx"
Cohesion: 0.30
Nodes (8): LogoSection(), MainContentStyled, Sidebar(), closedMixin(), MiniDrawerStyled, openedMixin(), appDrawerWidth, drawerWidth

### Community 22 - "dashboard.service.js"
Cohesion: 0.09
Nodes (38): scopeWhere(), contractsBlock(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002, notDeleted, policiesBlock() (+30 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (50): ADR-0004, ADR-0007, assertInScope(), PROGRESS_WARNING, getContractFormOptions(), applyManagers(), applyStages(), assertCollectionPermissions() (+42 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.05
Nodes (24): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+16 more)

### Community 27 - "contractTerms.js"
Cohesion: 0.07
Nodes (58): ADR-0021, findUsersWithPermission(), percentOf(), sumMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL (+50 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.12
Nodes (14): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+6 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.10
Nodes (49): ADR-0023, ADR-0025, ADR-0027, isBlank(), toMoney(), adjustableAmount(), approveInvoice(), assertInvoiceVisible() (+41 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.07
Nodes (52): moneyRule(), optionalDate(), percentRule(), ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController (+44 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (16): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+8 more)

### Community 37 - "session.service.js"
Cohesion: 0.15
Nodes (18): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+10 more)

### Community 38 - "@mui/material"
Cohesion: 0.10
Nodes (36): getDashboardSummaryAPI(), ADR-0002, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard(), Avatar() (+28 more)

### Community 39 - "server.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+8 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (18): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, prismaMock (+10 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.06
Nodes (44): ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020, ADR-0024 (+36 more)

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

### Community 48 - "constants.js"
Cohesion: 0.06
Nodes (44): contractsApi, useWorkFilterField(), useWorkScope(), useLinkedFilters(), ContractsPage, InvoicesPage, SocketContext, LinkedFilterNotice() (+36 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "ProviderTypePage.jsx"
Cohesion: 0.15
Nodes (16): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+8 more)

### Community 51 - "workScopeOf"
Cohesion: 0.08
Nodes (38): getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, ADR-0002, updateUserPermissions(), paginationContractsController, ASSIGNMENT_FIELDS, assignProviderController (+30 more)

### Community 52 - "showError"
Cohesion: 0.05
Nodes (93): contractConceptsApi, contractPoliciesApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+85 more)

### Community 53 - "contractFields.js"
Cohesion: 0.18
Nodes (14): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+6 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "UsersPage.jsx"
Cohesion: 0.15
Nodes (22): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+14 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.07
Nodes (25): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+17 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "useAuth"
Cohesion: 0.06
Nodes (75): getStatusesByScopeAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), useAuth(), useInvoiceViewChange(), useInvoiceViews(), PrivateRoute(), showInfo() (+67 more)

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

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 70 - "invoiceTerms.js"
Cohesion: 0.16
Nodes (18): isContractCreate(), isCreate(), isSimpleCreate(), assertTransition(), cancelTransitionFor(), hasContract(), historyRow(), httpError() (+10 more)

### Community 71 - "react"
Cohesion: 0.05
Nodes (56): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, getProviderTypesSelectAPI (+48 more)

### Community 88 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.03
Nodes (79): addressTypesApi, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, reasonsApi, getSupervisionTypesSelectAPI (+71 more)

### Community 100 - "masterRouter.utils.js"
Cohesion: 0.09
Nodes (30): express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers(), createMasterRouter() (+22 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "PolicyDialog.jsx"
Cohesion: 0.08
Nodes (28): getInsurersSelectAPI, insurersApi, configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, PolicyTypePage, PercentField() (+20 more)

### Community 108 - "App.jsx"
Cohesion: 0.28
Nodes (7): refreshSession(), App(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

### Community 112 - "users.controller.js"
Cohesion: 0.32
Nodes (7): revokeSession(), countUsersController(), deleteUserController(), ADR-0001, ADR-0027, paginationUsersController(), saveUserController()

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "MainLayout/index.jsx"
Cohesion: 0.17
Nodes (19): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), Footer(), Header(), WorkSection() (+11 more)

### Community 117 - "invoices.routes.js"
Cohesion: 0.11
Nodes (28): accessOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, getInvoiceFormOptionsController, grantedOf(), INVOICE_FIELDS (+20 more)

### Community 118 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "decimal"
Cohesion: 0.09
Nodes (49): @prisma/client, decimal(), HUNDRED, MONEY_SCALE, moneyText(), PERCENT_SCALE, RATIO_SCALE, ratioPercent() (+41 more)

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.25
Nodes (6): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`

### Community 130 - "resetCode.utils.js"
Cohesion: 0.47
Nodes (4): deriveKey(), hashResetCode(), ADR-0001, verifyResetCode()

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 133 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 134 - "addressTypes.service.js"
Cohesion: 0.27
Nodes (8): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesConfig, addressTypesService, ADR-0009

### Community 136 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "getIO"
Cohesion: 0.12
Nodes (18): getIO(), configurePolicyTypeBaseController, configurePolicyTypeBase(), httpError(), FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController (+10 more)

### Community 151 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 152 - "themes/index.jsx"
Cohesion: 0.20
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 153 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 154 - "ref_prop_types"
Cohesion: 0.15
Nodes (18): getAddressTypesSelectAPI, ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), channelsOf(), ContactDialog(), ContactsEditor() (+10 more)

### Community 156 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 157 - "invoiceViews.js"
Cohesion: 0.15
Nodes (23): applyInvoiceViewChange(), ADR-0010, providerTypesConfig, providerTypesService, ANY_CONTRACT_VIEW_PERMISSION, ANY_VIEW_PERMISSION, applyProviderViewChanges(), assertNotMixed() (+15 more)

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
Cohesion: 0.16
Nodes (14): getPermissionsCatalogAPI(), getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, pickWork(), WorkScopeContext, WorkScopeProvider() (+6 more)

### Community 181 - "contracts.controller.test.js"
Cohesion: 0.17
Nodes (10): conceptsServiceMock, contractsServiceMock, emit, getEffectivePermissionIds, ADR-0015, ADR-0016, policiesServiceMock, SCOPE (+2 more)

### Community 183 - "useConfig"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 186 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **878 isolated node(s):** `ADR-0017`, `STATUS_TABS`, `CONTRACT_INVOICE_TYPES`, `TERM_UNIT_NAMES`, `ADR-0017` (+873 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1205 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **82 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0003` connect `MainRoutes.jsx` to `permissions.constants.js`, `users.service.js`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Why does `axios` connect `client/package.json` to `WorkScopeContext.jsx`, `server/package.json`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `InvoiceFormPage.jsx`, `withAlpha`, `client/package.json`, `AuthForgotPassword.jsx`, `Sidebar/index.jsx`, `themes/index.jsx`, `ref_prop_types`, `DebouncedInput.jsx`, `DocumentManagement.jsx`, `NotificationSection/index.jsx`, `constants.js`, `EasyCrop.jsx`, `InputLabel.jsx`, `ProviderTypePage.jsx`, `showError`, `useConfig`, `UsersPage.jsx`, `useAuth`, `react`, `MainRoutes.jsx`, `PolicyDialog.jsx`, `MainLayout/index.jsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **What connects `ADR-0017`, `STATUS_TABS`, `CONTRACT_INVOICE_TYPES` to the rest of the system?**
  _878 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `writeAudit` be split into smaller, more focused modules?**
  _Cohesion score 0.05314685314685315 - nodes in this community are weakly interconnected._
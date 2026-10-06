# Graph Report - WEBPAC-INTERVE  (2026-10-06)

## Corpus Check
- 496 files · ~215,985 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 2713 nodes · 7079 edges · 159 communities (98 shown, 61 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 104 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `35dedd79`
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
- eslint.config.mjs
- money.utils.js
- workScopeOf
- auditContext
- react
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
- workScope.service.js
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
- updateInvoice
- works.service.test.js
- ref_jest_globals
- withAlpha
- devDependencies
- src/index.jsx
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
- useAuth
- winston.config.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- transaction.service.test.js
- extends
- seed.demo.js
- auth.service.test.js
- WorkScopeContext.jsx
- `tbl_contract_status_history`
- masterRouter.utils.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- socket.js
- `tbl_providers`
- getIO
- contracts.service.js
- uniqueConstraints.constants.test.js
- `tbl_works`
- `tbl_insurers`
- ProviderFormPage.jsx
- revalidateOnApprove
- browserslist
- error.middleware.js
- themes/index.jsx
- `tbl_providers`
- error.middleware.test.js
- images.js
- providers.controller.test.js
- `tbl_contract_suspensions`
- works.controller.test.js
- `tbl_work_providers`
- floatingPoint.guard.test.js
- contractSuspensions.service.test.js
- users.service.test.js
- httpCliente.js
- authjwt.middleware.test.js
- permissions.controller.test.js
- uniqueConstraints.constants.js
- EasyCrop.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- contracts.service.test.js
- ConfigContext.jsx
- master.service.test.js
- SocketProvider.jsx
- DebouncedInput.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 114 edges
2. `react` - 86 edges
3. `useAuth()` - 75 edges
4. `showError()` - 66 edges
5. `showSuccess()` - 51 edges
6. `writeAudit()` - 51 edges
7. `withLockedTransaction()` - 50 edges
8. `workScopeOf()` - 43 edges
9. `auditContext()` - 43 edges
10. `@tabler/icons-react` - 43 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `WorkFormPage()` --indirect_call--> `previewWorkEndDateAPI()`  [INFERRED]
  client/src/views/work/works/WorkFormPage.jsx → client/src/api/requests/worksApi.js
- `WorkScopeProvider()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/contexts/WorkScopeContext.jsx → client/src/contexts/authContext.jsx
- `WorkScopeProvider()` --calls--> `showError()`  [EXTRACTED]
  client/src/contexts/WorkScopeContext.jsx → client/src/services/ToastService.js
- `WorkScopeProvider()` --calls--> `useSocket()`  [EXTRACTED]
  client/src/contexts/WorkScopeContext.jsx → client/src/socket/SocketProvider.jsx

## Import Cycles
- None detected.

## Communities (159 total, 61 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "WorkFormPage.jsx"
Cohesion: 0.08
Nodes (37): getConstructionCompaniesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), previewWorkEndDateAPI(), useEndDatePreview(), EditableList(), FormSection(), TooltipLongText() (+29 more)

### Community 3 - "auth.service.js"
Cohesion: 0.08
Nodes (35): bcrypt, REDACTED, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS (+27 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (56): scopeWhere(), defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), applyProviderTypes(), assertAssignmentDate() (+48 more)

### Community 7 - "server.js"
Cohesion: 0.13
Nodes (14): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, registeredTasks (+6 more)

### Community 8 - "writeAudit"
Cohesion: 0.09
Nodes (37): ADR-0001, ADR-0013, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0027 (+29 more)

### Community 9 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 10 - "money.utils.js"
Cohesion: 0.12
Nodes (34): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, moneyText(), PERCENT_SCALE, percentOf() (+26 more)

### Community 11 - "workScopeOf"
Cohesion: 0.12
Nodes (28): workScopeOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, getInvoiceFormOptionsController, grantedOf(), INVOICE_FIELDS (+20 more)

### Community 12 - "auditContext"
Cohesion: 0.11
Nodes (27): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+19 more)

### Community 13 - "react"
Cohesion: 0.06
Nodes (61): invoiceTransitionsApi, deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI(), getReasonsSelectAPI(), deleteUserAPI() (+53 more)

### Community 14 - "client/package.json"
Cohesion: 0.08
Nodes (25): name, packageManager, private, version, apexcharts, axios, @emotion/react, @emotion/styled (+17 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.15
Nodes (16): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+8 more)

### Community 17 - "permissions.constants.js"
Cohesion: 0.04
Nodes (58): ADR-0018, ADR-0006, ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0020, ADR-0024 (+50 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.11
Nodes (15): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+7 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.07
Nodes (40): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), App() (+32 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 22 - "NotificationSection/index.jsx"
Cohesion: 0.35
Nodes (9): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+1 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (62): ADR-0004, assertInScope(), sumMoney(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel() (+54 more)

### Community 26 - "workScope.service.js"
Cohesion: 0.09
Nodes (32): getEffectivePermissionIds(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope() (+24 more)

### Community 27 - "@mui/material"
Cohesion: 0.10
Nodes (29): DashboardDefault, appDrawerWidth, gridSpacing, CardGrid(), CardSecondaryAction(), headerStyle, MainCard(), SubCard() (+21 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.13
Nodes (13): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+5 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.06
Nodes (27): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+19 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.11
Nodes (25): ADR-0023, amountsDto(), countByState(), DETAIL_AUDITED, documentValuesOf(), getInvoice(), getInvoiceFormOptions, IDEMPOTENCY_TARGET (+17 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.08
Nodes (38): moneyRule(), percentRule(), ACT_FIELDS, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController, createLiquidationController, deleteContractController (+30 more)

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
Cohesion: 0.23
Nodes (20): approveInvoice(), assertContractStillAdmits(), assertInvoiceInScope(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditable() (+12 more)

### Community 39 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (18): ref_crypto, ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload (+10 more)

### Community 41 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "invoiceTerms.js"
Cohesion: 0.15
Nodes (18): insertInvoice(), writeDetail(), assertTransition(), cancelTransitionFor(), historyRow(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS (+10 more)

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
Cohesion: 0.08
Nodes (45): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017, previewContractEndDateAPI() (+37 more)

### Community 53 - "users.service.js"
Cohesion: 0.05
Nodes (65): prisma, ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse() (+57 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "InvoiceFormPage.jsx"
Cohesion: 0.12
Nodes (30): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, MoneyField(), fMoneyText() (+22 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.08
Nodes (21): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+13 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "useAuth"
Cohesion: 0.08
Nodes (55): getStatusesByScopeAPI(), contractsApi, useAuth(), InvoicesPage, PrivateRoute(), showError(), useSocket(), ContactsList() (+47 more)

### Community 59 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

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
Cohesion: 0.20
Nodes (9): ref_fs, ref_url, ADR-0027, loggerMock, prismaMock, controllers, EXEMPT, handlers (+1 more)

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "seed.demo.js"
Cohesion: 0.07
Nodes (38): ref_node_crypto, @prisma/adapter-mariadb, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure() (+30 more)

### Community 70 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 71 - "WorkScopeContext.jsx"
Cohesion: 0.07
Nodes (46): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), getMyWorksSelectAPI(), pickWork(), useWorkScope() (+38 more)

### Community 88 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (31): express, jsonwebtoken, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), ACCESS_COOKIE_NAME, createMasterControllers() (+23 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (14): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+6 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.03
Nodes (74): addressTypesApi, constructionCompaniesApi, getContractTypesSelectAPI, identityDocumentsApi, insurersApi, providerTypesApi, reasonsApi, supervisionTypesApi (+66 more)

### Community 100 - "socket.js"
Cohesion: 0.31
Nodes (8): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), isSessionActive()

### Community 104 - "`tbl_providers`"
Cohesion: 0.22
Nodes (7): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_providers`, `tbl_provider_classifications`, `tbl_identity_documents`, `tbl_provider_types`

### Community 105 - "getIO"
Cohesion: 0.09
Nodes (29): getIO(), IDEMPOTENCY_HEADER, FIELD_ATTRIBUTES, getContractTypeFieldsController, pickField(), saveContractTypeFieldsController, getNotificationCountController(), listNotificationsController() (+21 more)

### Community 108 - "contracts.service.js"
Cohesion: 0.05
Nodes (112): ADR-0021, percentText(), dateOnlyText(), FIELD_GROUPS, typeAppliesAiu(), withContractAiu(), createContractInvoice(), activeSequence() (+104 more)

### Community 112 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (8): created, DATABASE, declared, dropped, inDatabase, MIGRATIONS, sql, withMessage

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 116 - "ProviderFormPage.jsx"
Cohesion: 0.07
Nodes (44): getAddressTypesSelectAPI, getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi (+36 more)

### Community 117 - "revalidateOnApprove"
Cohesion: 0.31
Nodes (9): contractAdvanceBalances(), detailChanges(), detailText(), hasDetail(), requestedDetailChanges(), revalidateOnApprove(), revalidateOnCancel(), storedAmount() (+1 more)

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
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "providers.controller.test.js"
Cohesion: 0.29
Nodes (5): emit, getEffectivePermissionIds, SCOPE, serviceMock, workScopeOf

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.25
Nodes (6): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`

### Community 130 - "works.controller.test.js"
Cohesion: 0.29
Nodes (5): emit, getEffectivePermissionIds, SCOPE, serviceMock, workScopeOf

### Community 131 - "`tbl_work_providers`"
Cohesion: 0.18
Nodes (8): `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers`, `tbl_work_contacts`, `tbl_address_types`, `tbl_works`

### Community 132 - "floatingPoint.guard.test.js"
Cohesion: 0.33
Nodes (4): ALLOWED, files(), lines, SRC

### Community 133 - "contractSuspensions.service.test.js"
Cohesion: 0.07
Nodes (16): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, ADR-0006, prismaMock, state, ctx (+8 more)

### Community 134 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 136 - "httpCliente.js"
Cohesion: 0.10
Nodes (20): contractTypesApi, getContractTypeFieldsAPI(), saveContractTypeFieldsAPI(), getInsurersSelectAPI, genericRequest, instance, NO_REFRESH_URLS, refreshClient (+12 more)

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 139 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 140 - "uniqueConstraints.constants.js"
Cohesion: 0.50
Nodes (3): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES

### Community 151 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 153 - "ConfigContext.jsx"
Cohesion: 0.27
Nodes (7): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage()

### Community 154 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 157 - "SocketProvider.jsx"
Cohesion: 0.16
Nodes (12): refreshSession(), AuthContext, SocketContext, SocketProvider(), FilterPopper(), normalizeOptions(), SocketDropdownFilter(), pathSocket (+4 more)

## Knowledge Gaps
- **765 isolated node(s):** `instance`, `refreshClient`, `NO_REFRESH_URLS`, `WorkScopeContext`, `__dirname` (+760 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1054 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **61 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@mui/material` connect `@mui/material` to `DebouncedInput.jsx`, `WorkFormPage.jsx`, `DocumentManagement.jsx`, `WorkScopeContext.jsx`, `httpCliente.js`, `withAlpha`, `react`, `client/package.json`, `EasyCrop.jsx`, `AuthForgotPassword.jsx`, `ProviderFormPage.jsx`, `NotificationSection/index.jsx`, `InvoiceFormPage.jsx`, `themes/index.jsx`, `ContractFormPage.jsx`, `useAuth`, `SocketProvider.jsx`, `MainRoutes.jsx`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `writeAudit`, `server/package.json`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Why does `ADR-0007` connect `MainRoutes.jsx` to `works.service.js`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **What connects `instance`, `refreshClient`, `NO_REFRESH_URLS` to the rest of the system?**
  _765 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `WorkFormPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07770582793709528 - nodes in this community are weakly interconnected._
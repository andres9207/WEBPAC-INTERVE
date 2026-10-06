# Graph Report - WEBPAC-INTERVE  (2026-10-06)

## Corpus Check
- 480 files · ~201,564 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 2556 nodes · 6545 edges · 156 communities (98 shown, 58 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 103 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `38bd0f69`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- invoices.service.js
- auth.service.js
- dependencies
- server/package.json
- providers.service.js
- seed.demo.js
- contractTypeFields.service.js
- eslint.config.mjs
- contractConcepts.service.js
- invoices.routes.js
- auth.routes.js
- ProviderFormPage.jsx
- client/package.json
- menu-items/index.js
- validation.utils.js
- permissions.constants.js
- writeAudit
- compilerOptions
- AuthForgotPassword.jsx
- providers.routes.js
- withAlpha
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- DebouncedInput.jsx
- providers.service.test.js
- contracts.controller.test.js
- session.service.js
- mailerService.js
- auditContext
- invoices.service.test.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- authjwt.middleware.js
- @mui/material
- constants.js
- ref_jest_globals
- react
- devDependencies
- src/index.jsx
- MainCard
- scripts
- volta
- `tbl_invoices`
- server.js
- app.routes.js
- ContractFormPage.jsx
- master.service.js
- `tbl_contract_type_fields`
- transaction.service.js
- transaction.mock.js
- scripts
- showError
- winston.config.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- contractSuspensions.service.test.js
- extends
- transaction.service.test.js
- auth.service.test.js
- useGetMenuMaster
- ContractsPage.jsx
- EasyCrop.jsx
- `tbl_status`
- useAuth
- `tbl_permissions`
- idempotency.service.js
- images.js
- `tbl_providers`
- notifications.routes.js
- contracts.service.js
- users.service.test.js
- `tbl_works`
- `tbl_insurers`
- WorkFormPage.jsx
- uniqueConstraints.constants.test.js
- browserslist
- error.middleware.js
- NotificationSection/index.jsx
- `tbl_providers`
- works.service.test.js
- contractFields.js
- masterRouter.utils.js
- `tbl_contract_suspensions`
- prismaClient.js
- `tbl_work_providers`
- MainLayout/index.jsx
- contracts.service.test.js
- `tbl_identity_documents`
- Sidebar/index.jsx
- authjwt.middleware.test.js
- `tbl_contract_concepts`
- InputLabel.jsx
- themes/index.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- useConfig
- Default/index.jsx
- PercentField.jsx
- useMenuCollapse.js
- compression.middleware.js
- volta

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 112 edges
2. `react` - 84 edges
3. `useAuth()` - 69 edges
4. `showError()` - 64 edges
5. `writeAudit()` - 51 edges
6. `showSuccess()` - 51 edges
7. `withLockedTransaction()` - 50 edges
8. `auditContext()` - 43 edges
9. `@tabler/icons-react` - 43 edges
10. `MasterPage()` - 36 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `ContactDialog()` --calls--> `BaseDialog()`  [EXTRACTED]
  client/src/ui-component/extended/ContactsEditor.jsx → client/src/ui-component/extended/BaseDialog.jsx
- `ContactDialog()` --calls--> `SelectSocket()`  [EXTRACTED]
  client/src/ui-component/extended/ContactsEditor.jsx → client/src/ui-component/extended/SelectSocket.jsx
- `ContactsEditor()` --calls--> `ActionButton()`  [EXTRACTED]
  client/src/ui-component/extended/ContactsEditor.jsx → client/src/ui-component/extended/ActionButton.jsx
- `ProviderFormPage()` --calls--> `ContactsEditor()`  [EXTRACTED]
  client/src/views/work/providers/ProviderFormPage.jsx → client/src/ui-component/extended/ContactsEditor.jsx

## Import Cycles
- None detected.

## Communities (156 total, 58 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "invoices.service.js"
Cohesion: 0.08
Nodes (58): ADR-0023, approveInvoice(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditable(), cancelInvoice() (+50 more)

### Community 3 - "auth.service.js"
Cohesion: 0.11
Nodes (23): bcrypt, ref_crypto, comparePassword(), deriveKey(), generateResetCode(), hashResetCode(), ADR-0001, verifyResetCode() (+15 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (32): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+24 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (58): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), applyProviderTypes(), assertAssignmentDate(), assertIdentification() (+50 more)

### Community 7 - "seed.demo.js"
Cohesion: 0.09
Nodes (23): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+15 more)

### Community 8 - "contractTypeFields.service.js"
Cohesion: 0.24
Nodes (15): resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getContractTypeFields(), httpError(), ADR-0006 (+7 more)

### Community 9 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 10 - "contractConcepts.service.js"
Cohesion: 0.07
Nodes (67): ADR-0021, ADR-0026, @prisma/client, diffFields(), newOperationId(), MONEY_SCALE, sumMoney(), assertContractStillAdmits() (+59 more)

### Community 11 - "invoices.routes.js"
Cohesion: 0.13
Nodes (22): approveInvoiceController, cancelInvoiceController, getInvoiceController, getInvoiceFormOptionsController, INVOICE_FIELDS, notify(), paginationInvoicesController, pick() (+14 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "ProviderFormPage.jsx"
Cohesion: 0.09
Nodes (42): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, getProviderTypesSelectAPI (+34 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (23): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+15 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (14): admin, icons, billing, dashboard, icons, icons, other, icons (+6 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.11
Nodes (21): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0009 (+13 more)

### Community 17 - "permissions.constants.js"
Cohesion: 0.09
Nodes (29): ADR-0018, ADR-0006, ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0020, PERMISSIONS (+21 more)

### Community 18 - "writeAudit"
Cohesion: 0.05
Nodes (60): ADR-0001, ADR-0013, ADR-0027, nit(), AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows() (+52 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.06
Nodes (44): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), App(), client_src_assets_images_interve (+36 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.09
Nodes (33): getEffectivePermissionIds(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS (+25 more)

### Community 22 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, allowedHosts, isOriginAllowed() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (62): ADR-0004, moneyText(), toMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING (+54 more)

### Community 26 - "works.routes.js"
Cohesion: 0.07
Nodes (35): getIO(), FIELD_ATTRIBUTES, getContractTypeFieldsController, pickField(), saveContractTypeFieldsController, insertNotification(), deleteProfileController(), getModulesController() (+27 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.17
Nodes (10): ALL, contact(), ctx, existingRow, input(), ADR-0012, prismaMock, state (+2 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.05
Nodes (29): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+21 more)

### Community 30 - "session.service.js"
Cohesion: 0.16
Nodes (19): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+11 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "auditContext"
Cohesion: 0.08
Nodes (39): auditContext(), moneyRule(), percentRule(), ACT_FIELDS, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController, createLiquidationController (+31 more)

### Community 33 - "invoices.service.test.js"
Cohesion: 0.14
Nodes (4): ctx, ADR-0020, prismaMock, state

### Community 34 - "`tbl_contracts`"
Cohesion: 0.20
Nodes (8): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contract_types`, `tbl_work_providers`

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 37 - "authjwt.middleware.js"
Cohesion: 0.17
Nodes (12): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), setIO(), ACCESS_COOKIE_NAME, isSessionActive() (+4 more)

### Community 38 - "@mui/material"
Cohesion: 0.11
Nodes (31): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), getWorksSummaryAPI(), ProfilesPage, UsersPage, ACTION_TONES (+23 more)

### Community 39 - "constants.js"
Cohesion: 0.07
Nodes (40): getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, refreshSession(), AuthContext, SocketContext (+32 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (16): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, dbUser (+8 more)

### Community 41 - "react"
Cohesion: 0.06
Nodes (47): suspendContractAPI(), invoiceTransitionsApi, getModulesAPI(), getProfilesAPI(), saveProfileAPI(), getReasonsSelectAPI(), getBasicInformationAPI(), saveUserAPI() (+39 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "MainCard"
Cohesion: 0.24
Nodes (12): CardSecondaryAction(), headerStyle, MainCard(), SubCard(), Avatar(), SamplePage(), ColorBox(), UIColor() (+4 more)

### Community 46 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart, pm2:start (+5 more)

### Community 48 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "server.js"
Cohesion: 0.19
Nodes (11): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, registeredTasks (+3 more)

### Community 51 - "app.routes.js"
Cohesion: 0.31
Nodes (8): getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001, getStatusesByScopeSchema

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.10
Nodes (38): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017, previewContractEndDateAPI() (+30 more)

### Community 53 - "master.service.js"
Cohesion: 0.07
Nodes (39): DELETED_STATUS, INACTIVE_STATUS, STATUS_KEYS, capitalize(), createMasterService(), defineMaster(), httpError(), ADR-0004 (+31 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "transaction.service.js"
Cohesion: 0.22
Nodes (12): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+4 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.07
Nodes (25): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+17 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "showError"
Cohesion: 0.10
Nodes (40): getStatusesByScopeAPI(), showError(), useSocket(), ContactsList(), ADR-0009, DataList(), Figure(), Pending() (+32 more)

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

### Community 66 - "contractSuspensions.service.test.js"
Cohesion: 0.17
Nodes (5): ctx, initial, ADR-0017, prismaMock, state

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "transaction.service.test.js"
Cohesion: 0.19
Nodes (11): ref_path, ref_url, status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT (+3 more)

### Community 70 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 71 - "useGetMenuMaster"
Cohesion: 0.29
Nodes (10): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), getIconByName(), MenuList(), NavCollapse() (+2 more)

### Community 73 - "ContractsPage.jsx"
Cohesion: 0.11
Nodes (12): contractsApi, ContractsPage, MoneyField(), CONTRACT_STATE_COLORS, CONTRACT_STATE_TABS, moneyInputText(), parseMoneyInput(), COLUMNS (+4 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.23
Nodes (7): `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies`, `tbl_status`, `tbl_users`

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (74): addressTypesApi, contractTypesApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), providerTypesApi, reasonsApi, supervisionTypesApi (+66 more)

### Community 100 - "idempotency.service.js"
Cohesion: 0.14
Nodes (19): ACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused() (+11 more)

### Community 101 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 104 - "`tbl_providers`"
Cohesion: 0.22
Nodes (7): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_providers`, `tbl_provider_classifications`, `tbl_identity_documents`, `tbl_provider_types`

### Community 105 - "notifications.routes.js"
Cohesion: 0.21
Nodes (13): express, getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount() (+5 more)

### Community 108 - "contracts.service.js"
Cohesion: 0.09
Nodes (44): ADR-0006, ADR-0015, ADR-0016, assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork() (+36 more)

### Community 112 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 116 - "WorkFormPage.jsx"
Cohesion: 0.08
Nodes (39): getAddressTypesSelectAPI, constructionCompaniesApi, getConstructionCompaniesSelectAPI, getContractTypeFieldsAPI(), getContractTypesSelectAPI, saveContractTypeFieldsAPI(), getInsurersSelectAPI, getSupervisionTypesSelectAPI (+31 more)

### Community 117 - "uniqueConstraints.constants.test.js"
Cohesion: 0.12
Nodes (12): ref_fs, created, DATABASE, declared, dropped, inDatabase, MIGRATIONS, sql (+4 more)

### Community 118 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), Header(), NotificationSection(), ProfileSection(), HeaderAvatar() (+4 more)

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 124 - "contractFields.js"
Cohesion: 0.20
Nodes (12): CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+4 more)

### Community 125 - "masterRouter.utils.js"
Cohesion: 0.09
Nodes (29): verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers(), createMasterRouter(), constructionCompaniesRoutes (+21 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.25
Nodes (6): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`

### Community 130 - "prismaClient.js"
Cohesion: 0.10
Nodes (17): @prisma/adapter-mariadb, ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES (+9 more)

### Community 131 - "`tbl_work_providers`"
Cohesion: 0.18
Nodes (8): `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers`, `tbl_work_contacts`, `tbl_address_types`, `tbl_works`

### Community 132 - "MainLayout/index.jsx"
Cohesion: 0.28
Nodes (8): Footer(), MainLayout(), MainContentStyled, menuItems, Breadcrumbs(), BTitle(), Loadable(), Loader()

### Community 133 - "contracts.service.test.js"
Cohesion: 0.08
Nodes (17): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, ADR-0006, prismaMock, state, ctx (+9 more)

### Community 134 - "`tbl_identity_documents`"
Cohesion: 0.50
Nodes (3): `tbl_users`, `tbl_identity_documents`, `tbl_users`

### Community 136 - "Sidebar/index.jsx"
Cohesion: 0.32
Nodes (7): LogoSection(), Sidebar(), closedMixin(), MiniDrawerStyled, openedMixin(), appDrawerWidth, drawerWidth

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 139 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 142 - "themes/index.jsx"
Cohesion: 0.21
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 150 - "useConfig"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 151 - "Default/index.jsx"
Cohesion: 0.38
Nodes (5): DashboardDefault, gridSpacing, CardGrid(), Dashboard(), testCards

### Community 152 - "PercentField.jsx"
Cohesion: 0.60
Nodes (4): PercentField(), toText(), toValue(), ConfigPercent()

### Community 155 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **703 isolated node(s):** `EMPTY`, `FIELDS`, `ADR-0009`, `ADR-0009`, `TEXT_FIELDS` (+698 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 993 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **58 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@mui/material` connect `@mui/material` to `MainLayout/index.jsx`, `Sidebar/index.jsx`, `InputLabel.jsx`, `ProviderFormPage.jsx`, `client/package.json`, `themes/index.jsx`, `AuthForgotPassword.jsx`, `withAlpha`, `useConfig`, `PercentField.jsx`, `Default/index.jsx`, `DebouncedInput.jsx`, `DocumentManagement.jsx`, `constants.js`, `react`, `MainCard`, `ContractFormPage.jsx`, `showError`, `useGetMenuMaster`, `ContractsPage.jsx`, `EasyCrop.jsx`, `useAuth`, `WorkFormPage.jsx`, `NotificationSection/index.jsx`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `ADR-0015` connect `contracts.service.js` to `ContractFormPage.jsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `ADR-0006` connect `contracts.service.js` to `ContractFormPage.jsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **What connects `EMPTY`, `FIELDS`, `ADR-0009` to the rest of the system?**
  _703 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `invoices.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07814207650273224 - nodes in this community are weakly interconnected._
# Graph Report - WEBPAC-INTERVE  (2026-10-05)

## Corpus Check
- 436 files · ~168,869 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 2238 nodes · 5548 edges · 144 communities (98 shown, 46 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 92 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ef8b7c1c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- transaction.service.test.js
- auth.service.js
- dependencies
- server/package.json
- providers.service.js
- AuthForgotPassword.jsx
- showError
- WorkFormPage.jsx
- withAlpha
- audit.service.js
- auditContext
- masterRouter.utils.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- session.service.js
- contractTypeFields.service.js
- compilerOptions
- react-router-dom
- providers.routes.js
- @mui/icons-material
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- eslint.config.mjs
- providers.service.test.js
- request.mock.js
- users.service.js
- mailerService.js
- contracts.routes.js
- ContactsEditor.jsx
- prismaClient.js
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- notifications.routes.js
- ProviderFormPage.jsx
- DataTable.jsx
- ref_jest_globals
- contractTerms.js
- devDependencies
- src/index.jsx
- themes/index.jsx
- scripts
- authContext.jsx
- session.service.test.js
- server.js
- app.routes.js
- ContractFormPage.jsx
- master.service.js
- `tbl_contract_type_fields`
- contractFields.js
- transaction.mock.js
- scripts
- useAuth
- winston.config.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- contractConcepts.service.js
- extends
- formatNumber.js
- browserslist
- volta
- dateOnlyText
- users.service.test.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- document.routes.js
- authjwt.middleware.js
- `tbl_contracts`
- getIO
- contracts.service.js
- AuthenticationRoutes.jsx
- `tbl_works`
- `tbl_insurers`
- @mui/material
- `tbl_contracts`
- AppBar.jsx
- error.middleware.js
- NotificationSection/index.jsx
- ContractTypeFieldsDialog.jsx
- react
- works.service.test.js
- images.js
- permissions.constants.js
- transaction.service.js
- seed.js
- contracts.service.test.js
- auth.service.test.js
- contractTypeFields.service.test.js
- contracts.controller.test.js
- Default/index.jsx
- ImageList.jsx
- authjwt.middleware.test.js
- status.service.test.js
- MiniDrawerStyled.jsx
- `tbl_work_stages`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 101 edges
2. `react` - 75 edges
3. `useAuth()` - 57 edges
4. `showError()` - 51 edges
5. `writeAudit()` - 43 edges
6. `showSuccess()` - 43 edges
7. `withLockedTransaction()` - 42 edges
8. `auditContext()` - 38 edges
9. `@tabler/icons-react` - 38 edges
10. `MasterPage()` - 35 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `insertNotification()` --calls--> `getIO()`  [EXTRACTED]
  server/src/modules/app/notifications/notifications.service.js → server/src/common/configs/socket.manager.js
- `createMasterRouter()` --indirect_call--> `verifyToken()`  [INFERRED]
  server/src/common/utils/masterRouter.utils.js → server/src/common/middlewares/authjwt.middleware.js
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js

## Import Cycles
- None detected.

## Communities (144 total, 46 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "transaction.service.test.js"
Cohesion: 0.21
Nodes (9): ref_url, status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock() (+1 more)

### Community 3 - "auth.service.js"
Cohesion: 0.11
Nodes (26): bcrypt, getEffectivePermissionIds(), withTransaction(), comparePassword(), hashPassword(), deriveKey(), generateResetCode(), hashResetCode() (+18 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (37): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+29 more)

### Community 6 - "providers.service.js"
Cohesion: 0.11
Nodes (45): applyContacts(), assertAddressTypes(), assertAssignmentDate(), assertContacts(), assertIdentification(), assertProviderAssignable(), assertWorkAssignable(), ASSIGNMENT_IDEMPOTENCY (+37 more)

### Community 7 - "AuthForgotPassword.jsx"
Cohesion: 0.23
Nodes (13): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber(), hasSpecial() (+5 more)

### Community 8 - "showError"
Cohesion: 0.12
Nodes (24): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), getBasicInformationAPI(), paginationUsersAPI(), updateAccountAPI(), updatePasswordAPI(), ProfilesPage (+16 more)

### Community 9 - "WorkFormPage.jsx"
Cohesion: 0.09
Nodes (34): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), SocketContext, EditableList(), SearchSelect(), SelectSocket() (+26 more)

### Community 10 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 11 - "audit.service.js"
Cohesion: 0.10
Nodes (33): ADR-0013, AUDIT_ENTITIES, auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0027, protect() (+25 more)

### Community 12 - "auditContext"
Cohesion: 0.11
Nodes (27): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+19 more)

### Community 13 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (32): express, requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), constructionCompaniesRoutes, constructionCompaniesConfig (+24 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (22): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+14 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (14): admin, icons, dashboard, icons, menuItems, icons, other, icons (+6 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.14
Nodes (16): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0001, ADR-0009 (+8 more)

### Community 17 - "session.service.js"
Cohesion: 0.11
Nodes (26): AUDIT_OPERATIONS, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME (+18 more)

### Community 18 - "contractTypeFields.service.js"
Cohesion: 0.24
Nodes (15): resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getContractTypeFields(), httpError(), ADR-0006 (+7 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "react-router-dom"
Cohesion: 0.18
Nodes (22): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), Footer(), Header() (+14 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 22 - "@mui/icons-material"
Cohesion: 0.27
Nodes (7): Breadcrumbs(), BTitle(), FilterPopper(), normalizeOptions(), SocketDropdownFilter(), lodash-es, @mui/icons-material

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.10
Nodes (41): toMoney(), applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted(), assertHeader(), assertManagerUsers() (+33 more)

### Community 26 - "works.routes.js"
Cohesion: 0.15
Nodes (16): changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, saveWorkController, selectWorkManagersController (+8 more)

### Community 27 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.17
Nodes (10): ALL, contact(), ctx, existingRow, input(), ADR-0012, prismaMock, state (+2 more)

### Community 29 - "request.mock.js"
Cohesion: 0.08
Nodes (18): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+10 more)

### Community 30 - "users.service.js"
Cohesion: 0.10
Nodes (25): ADR-0004, ADR-0008, ADR-0027, DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError() (+17 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.09
Nodes (32): moneyRule(), percentRule(), ACT_FIELDS, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController, createLiquidationController, deleteContractController (+24 more)

### Community 33 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 34 - "prismaClient.js"
Cohesion: 0.09
Nodes (21): @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), ACTIVE_STATUS (+13 more)

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 37 - "notifications.routes.js"
Cohesion: 0.22
Nodes (13): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), insertNotification() (+5 more)

### Community 38 - "ProviderFormPage.jsx"
Cohesion: 0.08
Nodes (45): getIdentityDocumentsSelectAPI, getModulesAPI(), getProfilesAPI(), saveProfileAPI(), checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012 (+37 more)

### Community 39 - "DataTable.jsx"
Cohesion: 0.56
Nodes (6): ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable(), TableActions()

### Community 40 - "ref_jest_globals"
Cohesion: 0.07
Nodes (12): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, baseConfig (+4 more)

### Community 41 - "contractTerms.js"
Cohesion: 0.10
Nodes (23): ADR-0026, @prisma/client, MONEY_SCALE, conceptsDto(), assertStateAllows(), chronologyError(), CONCEPT_TYPE_NAMES, CONCEPT_TYPES (+15 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "themes/index.jsx"
Cohesion: 0.21
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 48 - "authContext.jsx"
Cohesion: 0.13
Nodes (17): loginAPI(), logoutAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient (+9 more)

### Community 49 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 50 - "server.js"
Cohesion: 0.19
Nodes (11): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, registeredTasks (+3 more)

### Community 51 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (48): contractConceptsApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, DateField() (+40 more)

### Community 53 - "master.service.js"
Cohesion: 0.07
Nodes (43): ADR-0018, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused() (+35 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "contractFields.js"
Cohesion: 0.33
Nodes (8): enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, sameValue()

### Community 56 - "transaction.mock.js"
Cohesion: 0.08
Nodes (21): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+13 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "useAuth"
Cohesion: 0.08
Nodes (43): getStatusesByScopeAPI(), useAuth(), ContractsPage, useSocket(), DataList(), Figure(), Pending(), RouteDialog() (+35 more)

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

### Community 66 - "contractConcepts.service.js"
Cohesion: 0.22
Nodes (23): newOperationId(), activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget(), configuredConcept() (+15 more)

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "formatNumber.js"
Cohesion: 0.23
Nodes (3): MoneyField(), moneyInputText(), parseMoneyInput()

### Community 70 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 71 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 73 - "dateOnlyText"
Cohesion: 0.19
Nodes (19): ADR-0015, sumMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel() (+11 more)

### Community 88 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 89 - "`tbl_status`"
Cohesion: 0.16
Nodes (10): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+2 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.04
Nodes (59): addressTypesApi, constructionCompaniesApi, identityDocumentsApi, getInsurersSelectAPI, insurersApi, providersApi, providerTypesApi, supervisionTypesApi (+51 more)

### Community 100 - "document.routes.js"
Cohesion: 0.31
Nodes (7): deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema, paginationDocsSchema, saveDocSchema

### Community 101 - "authjwt.middleware.js"
Cohesion: 0.15
Nodes (15): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+7 more)

### Community 104 - "`tbl_contracts`"
Cohesion: 0.07
Nodes (24): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+16 more)

### Community 105 - "getIO"
Cohesion: 0.15
Nodes (15): getIO(), IDEMPOTENCY_HEADER, FIELD_ATTRIBUTES, pickField(), saveContractTypeFieldsController, deleteProfileController(), getModulesController(), ADR-0027 (+7 more)

### Community 108 - "contracts.service.js"
Cohesion: 0.10
Nodes (43): moneyText(), assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditableConcept(), auditableContract() (+35 more)

### Community 112 - "AuthenticationRoutes.jsx"
Cohesion: 0.18
Nodes (11): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router (+3 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 116 - "@mui/material"
Cohesion: 0.13
Nodes (20): PrivateRoute(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard(), Avatar() (+12 more)

### Community 118 - "AppBar.jsx"
Cohesion: 0.23
Nodes (10): client_src_assets_images_interve, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthCardWrapper(), AuthWrapper1 (+2 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.25
Nodes (12): concurrencyError(), errorMiddleware(), isMySqlCode(), ADR-0012, ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS, driverCause() (+4 more)

### Community 120 - "NotificationSection/index.jsx"
Cohesion: 0.35
Nodes (9): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+1 more)

### Community 121 - "ContractTypeFieldsDialog.jsx"
Cohesion: 0.17
Nodes (15): contractTypesApi, getContractTypeFieldsAPI(), saveContractTypeFieldsAPI(), ContractTypePage, ContractTypeFieldsDialog(), DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+7 more)

### Community 122 - "react"
Cohesion: 0.11
Nodes (9): ConfigContext, ConfigProvider(), useLocalStorage(), setParentOpenedMenu(), useMenuCollapse(), lodash, react, ref_react_currency_input_field (+1 more)

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 124 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "permissions.constants.js"
Cohesion: 0.08
Nodes (30): ADR-0006, ADR-0011, ADR-0006, ADR-0012, ADR-0016, PERMISSIONS, addressTypesRoutes, addressTypesConfig (+22 more)

### Community 129 - "transaction.service.js"
Cohesion: 0.21
Nodes (11): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+3 more)

### Community 130 - "seed.js"
Cohesion: 0.17
Nodes (10): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES (+2 more)

### Community 131 - "contracts.service.test.js"
Cohesion: 0.20
Nodes (6): ctx, ADR-0015, ADR-0017, prismaMock, state, storedContract

### Community 132 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 133 - "contractTypeFields.service.test.js"
Cohesion: 0.10
Nodes (15): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+7 more)

### Community 134 - "contracts.controller.test.js"
Cohesion: 0.29
Nodes (5): conceptsServiceMock, contractsServiceMock, emit, ADR-0015, ADR-0016

### Community 135 - "Default/index.jsx"
Cohesion: 0.47
Nodes (4): DashboardDefault, CardGrid(), Dashboard(), testCards

### Community 136 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 139 - "status.service.test.js"
Cohesion: 0.33
Nodes (4): ref_fs, catalog, expected, prismaMock

### Community 140 - "MiniDrawerStyled.jsx"
Cohesion: 0.83
Nodes (3): closedMixin(), MiniDrawerStyled, openedMixin()

## Knowledge Gaps
- **626 isolated node(s):** `USER_SORT_FIELDS`, `AUDITED_USER_FIELDS`, `USER_CREATE_IDEMPOTENCY`, `USER_CREATE_FIELDS`, `ADR-0004` (+621 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 873 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **46 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `react` to `master.service.js`, `server/package.json`?**
  _High betweenness centrality (0.202) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `AuthForgotPassword.jsx`, `ImageList.jsx`, `WorkFormPage.jsx`, `withAlpha`, `showError`, `MiniDrawerStyled.jsx`, `Default/index.jsx`, `client/package.json`, `react-router-dom`, `@mui/icons-material`, `ContactsEditor.jsx`, `DocumentManagement.jsx`, `ProviderFormPage.jsx`, `DataTable.jsx`, `themes/index.jsx`, `ContractFormPage.jsx`, `useAuth`, `formatNumber.js`, `MainRoutes.jsx`, `AuthenticationRoutes.jsx`, `AppBar.jsx`, `NotificationSection/index.jsx`, `ContractTypeFieldsDialog.jsx`, `react`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `AuthForgotPassword.jsx`, `showError`, `WorkFormPage.jsx`, `client/package.json`, `react-router-dom`, `@mui/icons-material`, `ContactsEditor.jsx`, `DocumentManagement.jsx`, `ProviderFormPage.jsx`, `DataTable.jsx`, `themes/index.jsx`, `authContext.jsx`, `ContractFormPage.jsx`, `useAuth`, `MainRoutes.jsx`, `AuthenticationRoutes.jsx`, `@mui/material`, `AppBar.jsx`, `NotificationSection/index.jsx`, `ContractTypeFieldsDialog.jsx`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **What connects `USER_SORT_FIELDS`, `AUDITED_USER_FIELDS`, `USER_CREATE_IDEMPOTENCY` to the rest of the system?**
  _626 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `auth.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1092436974789916 - nodes in this community are weakly interconnected._
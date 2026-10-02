# Graph Report - WEBPAC-INTERVE  (2026-10-02)

## Corpus Check
- 414 files · ~156,349 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 2119 nodes · 5206 edges · 146 communities (102 shown, 44 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 86 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1d00c008`
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
- showSuccess
- WorkFormPage.jsx
- useAuth
- audit.service.js
- auth.routes.js
- profiles.routes.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- session.service.js
- MainLayout/index.jsx
- compilerOptions
- @mui/material
- providers.routes.js
- FilterPopper.jsx
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- handleFirebase.js
- providers.service.test.js
- masterRouter.utils.test.js
- requests/index.js
- mailerService.js
- contracts.routes.js
- users.service.js
- idempotency.service.js
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- notifications.routes.js
- ProviderFormPage.jsx
- react
- ref_jest_globals
- contractConcepts.service.js
- devDependencies
- ContactsEditor.jsx
- src/index.jsx
- NotificationSection/index.jsx
- scripts
- contractTerms.js
- authContext.jsx
- session.service.test.js
- server.js
- app.routes.js
- ContractFormPage.jsx
- master.service.js
- SupervisionTypePage.jsx
- MasterPage
- transaction.mock.js
- scripts
- showError
- winston.config.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- DebouncedInput.jsx
- extends
- ConceptDialog.jsx
- browserslist
- volta
- volta
- users.service.test.js
- `tbl_status`
- MainRoutes.jsx
- auth.service.test.js
- document.routes.js
- AppBar.jsx
- `tbl_contracts`
- auth.controller.test.js
- react-router-dom
- contracts.service.js
- dateOnlyText
- `tbl_works`
- permissions.routes.js
- `tbl_insurers`
- InputLabel.jsx
- AuthenticationRoutes.jsx
- error.middleware.js
- ProviderTypePage.jsx
- images.js
- ContractTypePage.jsx
- useConfig.js
- works.service.test.js
- useConfig
- masterRouter.utils.js
- moneyText
- seed.js
- prismaClient.js
- createContract
- contracts.service.test.js
- IdentityDocumentPage.jsx
- contractConcepts.service.test.js
- ConstructionCompanyPage.jsx
- authjwt.middleware.test.js
- InsurerPage.jsx
- contracts.controller.test.js
- Default/index.jsx
- EasyCrop.jsx
- `tbl_work_stages`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 100 edges
2. `react` - 73 edges
3. `useAuth()` - 57 edges
4. `showError()` - 49 edges
5. `writeAudit()` - 41 edges
6. `showSuccess()` - 41 edges
7. `withLockedTransaction()` - 40 edges
8. `auditContext()` - 36 edges
9. `@tabler/icons-react` - 36 edges
10. `MasterPage()` - 35 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `createMasterRouter()` --indirect_call--> `verifyToken()`  [INFERRED]
  server/src/common/utils/masterRouter.utils.js → server/src/common/middlewares/authjwt.middleware.js
- `insertNotification()` --calls--> `getIO()`  [EXTRACTED]
  server/src/modules/app/notifications/notifications.service.js → server/src/common/configs/socket.manager.js
- `MenuList()` --calls--> `useGetMenuMaster()`  [EXTRACTED]
  client/src/layout/MainLayout/MenuList/index.jsx → client/src/api/menu.js
- `MenuList()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/layout/MainLayout/MenuList/index.jsx → client/src/contexts/authContext.jsx

## Import Cycles
- None detected.

## Communities (146 total, 44 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.05
Nodes (43): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), ThemeCustomization(), Alert() (+35 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "transaction.service.test.js"
Cohesion: 0.21
Nodes (9): ref_url, status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock() (+1 more)

### Community 3 - "auth.service.js"
Cohesion: 0.11
Nodes (24): bcrypt, comparePassword(), hashPassword(), deriveKey(), generateResetCode(), hashResetCode(), ADR-0001, verifyResetCode() (+16 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+26 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (54): ACTIVE_STATUS, applyContacts(), assertAddressTypes(), assertAssignmentDate(), assertContacts(), assertProviderAssignable(), assertWorkAssignable(), ASSIGNMENT_IDEMPOTENCY (+46 more)

### Community 7 - "AuthForgotPassword.jsx"
Cohesion: 0.22
Nodes (14): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber(), hasSpecial() (+6 more)

### Community 8 - "showSuccess"
Cohesion: 0.10
Nodes (34): deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), paginationUsersAPI(), saveUserAPI() (+26 more)

### Community 9 - "WorkFormPage.jsx"
Cohesion: 0.13
Nodes (25): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), useSocket(), EditableList(), filterOptions, SearchSelect() (+17 more)

### Community 10 - "useAuth"
Cohesion: 0.21
Nodes (15): getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), useAuth(), ProfileSection(), PrivateRoute(), Accordion(), findOption() (+7 more)

### Community 11 - "audit.service.js"
Cohesion: 0.09
Nodes (37): ADR-0013, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0027 (+29 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "profiles.routes.js"
Cohesion: 0.12
Nodes (22): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), getIO() (+14 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (32): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+24 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (14): admin, icons, dashboard, icons, menuItems, icons, other, icons (+6 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.11
Nodes (23): express-validator, createMasterSchemas(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0001, ADR-0009, ADR-0027 (+15 more)

### Community 17 - "session.service.js"
Cohesion: 0.10
Nodes (31): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+23 more)

### Community 18 - "MainLayout/index.jsx"
Cohesion: 0.23
Nodes (13): handlerDrawerOpen(), Footer(), Header(), MainLayout(), LogoSection(), MainContentStyled, Sidebar(), closedMixin() (+5 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "@mui/material"
Cohesion: 0.20
Nodes (16): appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard(), Avatar(), AuthCardWrapper() (+8 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.10
Nodes (30): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+22 more)

### Community 22 - "FilterPopper.jsx"
Cohesion: 0.60
Nodes (4): FilterPopper(), normalizeOptions(), SocketDropdownFilter(), lodash-es

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.12
Nodes (14): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, app, __dirname (+6 more)

### Community 25 - "works.service.js"
Cohesion: 0.11
Nodes (40): ACTIVE_STATUS, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted(), assertHeader(), assertManagerUsers() (+32 more)

### Community 26 - "works.routes.js"
Cohesion: 0.12
Nodes (19): requirePermission(), hasEffectivePermission(), changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController (+11 more)

### Community 27 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 28 - "providers.service.test.js"
Cohesion: 0.17
Nodes (10): ALL, contact(), ctx, existingRow, input(), ADR-0012, prismaMock, state (+2 more)

### Community 29 - "masterRouter.utils.test.js"
Cohesion: 0.07
Nodes (20): config, emit, forged, serviceMock, mockReq(), mockDelete, mockSave, forgedAuthor (+12 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.10
Nodes (29): moneyRule(), percentRule(), ACT_FIELDS, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController, createLiquidationController, deleteContractController (+21 more)

### Community 33 - "users.service.js"
Cohesion: 0.10
Nodes (22): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, nitCheckDigit(), assertAssignableProfile() (+14 more)

### Community 34 - "idempotency.service.js"
Cohesion: 0.15
Nodes (18): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+10 more)

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.32
Nodes (11): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+3 more)

### Community 37 - "notifications.routes.js"
Cohesion: 0.22
Nodes (13): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), insertNotification() (+5 more)

### Community 38 - "ProviderFormPage.jsx"
Cohesion: 0.12
Nodes (30): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, getProviderTypesSelectAPI, DateField() (+22 more)

### Community 39 - "react"
Cohesion: 0.13
Nodes (15): getWorksSummaryAPI(), worksApi, WorksPage, ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable() (+7 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.09
Nodes (10): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, forged (+2 more)

### Community 41 - "contractConcepts.service.js"
Cohesion: 0.17
Nodes (24): activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget(), createAmendment(), createLiquidation() (+16 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 43 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "contractTerms.js"
Cohesion: 0.11
Nodes (17): ADR-0026, @prisma/client, MONEY_SCALE, assertStateAllows(), CONCEPT_TYPE_NAMES, CONTRACT_STATES, CONTRACT_TRANSITIONS, DENIED (+9 more)

### Community 48 - "authContext.jsx"
Cohesion: 0.10
Nodes (22): loginAPI(), logoutAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), instance, NO_REFRESH_URLS, refreshClient, refreshSession() (+14 more)

### Community 49 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 50 - "server.js"
Cohesion: 0.27
Nodes (8): ref_http, node-cron, server, cronJobs, registeredTasks, startCronJobs(), stopCronJobs(), wrapHandler()

### Community 51 - "app.routes.js"
Cohesion: 0.26
Nodes (9): getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001, getStatusesByScopeSchema (+1 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (30): contractConceptsApi, contractsApi, getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0016, ContractFormPage, ContractsPage, TooltipLongText() (+22 more)

### Community 53 - "master.service.js"
Cohesion: 0.14
Nodes (23): ACTIVE_STATUS, capitalize(), createMasterService(), DELETED_STATUS, httpError(), INACTIVE_STATUS, ADR-0004, ADR-0027 (+15 more)

### Community 54 - "SupervisionTypePage.jsx"
Cohesion: 0.25
Nodes (6): supervisionTypesApi, SupervisionTypePage, COLUMNS, FORM_FIELDS, SupervisionTypePage(), ADR-0007

### Community 55 - "MasterPage"
Cohesion: 0.20
Nodes (9): addressTypesApi, AddressTypePage, MasterPage(), readView(), saveView(), AddressTypePage(), COLUMNS, FORM_FIELDS (+1 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.07
Nodes (25): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+17 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "showError"
Cohesion: 0.11
Nodes (32): getStatusesByScopeAPI(), showError(), DataList(), Figure(), Pending(), LastModifiedCell(), RouteDialog(), CACHE_PENDING (+24 more)

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

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "ConceptDialog.jsx"
Cohesion: 0.11
Nodes (17): MoneyField(), PercentField(), toText(), toValue(), moneyInputText(), parseMoneyInput(), ConceptDialog(), ADR-0016 (+9 more)

### Community 70 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 71 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 73 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 88 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 89 - "`tbl_status`"
Cohesion: 0.16
Nodes (10): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+2 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.14
Nodes (12): ContractDetailPage, ProfilesPage, ProviderDetailPage, ProviderFormPage, ProvidersPage, UsersPage, WorkDetailPage, WorkFormPage (+4 more)

### Community 95 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 100 - "document.routes.js"
Cohesion: 0.23
Nodes (9): IDEMPOTENCY_HEADER, deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema, DOC_TYPES, paginationDocsSchema (+1 more)

### Community 101 - "AppBar.jsx"
Cohesion: 0.21
Nodes (11): client_src_assets_images_interve, ForgotPasswordPage, LoginPage, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo() (+3 more)

### Community 104 - "`tbl_contracts`"
Cohesion: 0.07
Nodes (24): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+16 more)

### Community 105 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 106 - "react-router-dom"
Cohesion: 0.33
Nodes (10): endpoints, initialState, useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), NavCollapse(), NavGroup(), NavItem() (+2 more)

### Community 108 - "contracts.service.js"
Cohesion: 0.13
Nodes (21): toMoney(), ACTIVE_STATUS, conceptValuesOf(), CONTRACT_AUDITED, countByState(), headerValuesOf(), IDEMPOTENCY_TARGET, ADR-0015 (+13 more)

### Community 112 - "dateOnlyText"
Cohesion: 0.18
Nodes (20): ADR-0015, addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS (+12 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 114 - "permissions.routes.js"
Cohesion: 0.21
Nodes (14): PERMISSIONS, getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController() (+6 more)

### Community 117 - "AuthenticationRoutes.jsx"
Cohesion: 0.21
Nodes (9): MinimalLayout(), AuthenticationRoutes, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router, MainRoutes, Loadable() (+1 more)

### Community 118 - "error.middleware.js"
Cohesion: 0.25
Nodes (12): concurrencyError(), errorMiddleware(), isMySqlCode(), ADR-0012, ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS, driverCause() (+4 more)

### Community 119 - "ProviderTypePage.jsx"
Cohesion: 0.25
Nodes (6): providerTypesApi, ProviderTypePage, COLUMNS, FORM_FIELDS, ProviderTypePage(), ADR-0010

### Community 120 - "images.js"
Cohesion: 0.23
Nodes (8): ref_fs, ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 121 - "ContractTypePage.jsx"
Cohesion: 0.25
Nodes (6): contractTypesApi, ContractTypePage, COLUMNS, ContractTypePage(), FORM_FIELDS, ADR-0006

### Community 122 - "useConfig.js"
Cohesion: 0.24
Nodes (7): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage()

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 124 - "useConfig"
Cohesion: 0.21
Nodes (10): getMenuAPI(), useConfig(), ElevationScroll(), HorizontalBar(), getIconByName(), MenuList(), ImageList(), srcset() (+2 more)

### Community 125 - "masterRouter.utils.js"
Cohesion: 0.06
Nodes (40): ADR-0018, express, ADR-0011, ADR-0012, ADR-0016, validate(), defineMaster(), createMasterControllers() (+32 more)

### Community 129 - "moneyText"
Cohesion: 0.24
Nodes (12): moneyText(), sumMoney(), valueText(), conceptDto(), conceptsDto(), currentValueText(), getContract(), totalsDto() (+4 more)

### Community 130 - "seed.js"
Cohesion: 0.18
Nodes (9): ADDRESS_TYPES, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES, SUPERVISION_TYPES (+1 more)

### Community 131 - "prismaClient.js"
Cohesion: 0.13
Nodes (13): @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), getEffectivePermissionIds() (+5 more)

### Community 132 - "createContract"
Cohesion: 0.40
Nodes (11): assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditableContract(), createContract(), findLockedContract() (+3 more)

### Community 133 - "contracts.service.test.js"
Cohesion: 0.20
Nodes (6): ctx, ADR-0015, ADR-0017, prismaMock, state, storedContract

### Community 134 - "IdentityDocumentPage.jsx"
Cohesion: 0.25
Nodes (6): identityDocumentsApi, IdentityDocumentPage, COLUMNS, FORM_FIELDS, IdentityDocumentPage(), ADR-0008

### Community 135 - "contractConcepts.service.test.js"
Cohesion: 0.22
Nodes (4): ctx, ADR-0016, prismaMock, state

### Community 136 - "ConstructionCompanyPage.jsx"
Cohesion: 0.25
Nodes (6): constructionCompaniesApi, ConstructionCompanyPage, COLUMNS, ConstructionCompanyPage(), FORM_FIELDS, ADR-0004

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 139 - "InsurerPage.jsx"
Cohesion: 0.25
Nodes (6): insurersApi, InsurerPage, COLUMNS, FORM_FIELDS, InsurerPage(), ADR-0003

### Community 140 - "contracts.controller.test.js"
Cohesion: 0.29
Nodes (5): conceptsServiceMock, contractsServiceMock, emit, ADR-0015, ADR-0016

### Community 141 - "Default/index.jsx"
Cohesion: 0.47
Nodes (4): DashboardDefault, CardGrid(), Dashboard(), testCards

## Knowledge Gaps
- **606 isolated node(s):** `ADR-0016`, `work`, `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS`, `STATUS_TABS` (+601 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 830 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **44 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `audit.service.js`, `server/package.json`?**
  _High betweenness centrality (0.228) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `AuthForgotPassword.jsx`, `showSuccess`, `WorkFormPage.jsx`, `useAuth`, `Default/index.jsx`, `client/package.json`, `EasyCrop.jsx`, `MainLayout/index.jsx`, `FilterPopper.jsx`, `DocumentManagement.jsx`, `ProviderFormPage.jsx`, `react`, `ContactsEditor.jsx`, `NotificationSection/index.jsx`, `ContractFormPage.jsx`, `showError`, `DebouncedInput.jsx`, `ConceptDialog.jsx`, `MainRoutes.jsx`, `AppBar.jsx`, `react-router-dom`, `InputLabel.jsx`, `AuthenticationRoutes.jsx`, `useConfig.js`, `useConfig`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `overrides/index.js`, `AuthForgotPassword.jsx`, `showSuccess`, `WorkFormPage.jsx`, `useAuth`, `client/package.json`, `EasyCrop.jsx`, `MainLayout/index.jsx`, `FilterPopper.jsx`, `DocumentManagement.jsx`, `ProviderFormPage.jsx`, `ContactsEditor.jsx`, `NotificationSection/index.jsx`, `authContext.jsx`, `ContractFormPage.jsx`, `showError`, `DebouncedInput.jsx`, `ConceptDialog.jsx`, `MainRoutes.jsx`, `AppBar.jsx`, `react-router-dom`, `AuthenticationRoutes.jsx`, `useConfig.js`, `useConfig`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `ADR-0016`, `work`, `STATUS_NAMES` to the rest of the system?**
  _606 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05403508771929825 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `auth.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10984848484848485 - nodes in this community are weakly interconnected._
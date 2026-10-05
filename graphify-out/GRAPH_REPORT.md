# Graph Report - WEBPAC-INTERVE  (2026-10-05)

## Corpus Check
- 438 files · ~170,386 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 2255 nodes · 5580 edges · 141 communities (92 shown, 49 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 92 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `484e3456`
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
- react
- users.service.js
- auditContext
- masterRouter.utils.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- constants.js
- contractTypeFields.service.js
- compilerOptions
- MainLayout/index.jsx
- providers.routes.js
- FilterPopper.jsx
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- eslint.config.mjs
- providers.service.test.js
- contracts.controller.test.js
- main.routes.js
- mailerService.js
- contracts.routes.js
- ContactsEditor.jsx
- transaction.service.js
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- requests/index.js
- ProviderFormPage.jsx
- authContext.jsx
- ref_jest_globals
- AddressTypePage.jsx
- devDependencies
- src/index.jsx
- @mui/material
- scripts
- ContractTypeFieldsDialog.jsx
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
- IdentityDocumentPage.jsx
- extends
- WorksPage.jsx
- uniqueConstraints.constants.test.js
- InsurerPage.jsx
- ProviderTypePage.jsx
- uniqueConstraints.constants.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- SupervisionTypePage.jsx
- providerTypes.service.js
- `tbl_contracts`
- notifications.routes.js
- contracts.service.js
- users.service.test.js
- `tbl_works`
- `tbl_insurers`
- ref_prop_types
- `tbl_contracts`
- EasyCrop.jsx
- error.middleware.js
- document.routes.js
- DebouncedInput.jsx
- works.service.test.js
- images.js
- permissions.constants.js
- seed.js
- auth.service.test.js
- contracts.service.test.js
- authjwt.middleware.test.js
- status.service.test.js
- auth.controller.test.js
- `tbl_work_stages`
- browserslist
- volta
- volta

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
- `insertNotification()` --calls--> `getIO()`  [EXTRACTED]
  server/src/modules/app/notifications/notifications.service.js → server/src/common/configs/socket.manager.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `ProfileSection()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/layout/MainLayout/Header/ProfileSection/index.jsx → client/src/contexts/authContext.jsx
- `ProfileSection()` --calls--> `MainCard()`  [EXTRACTED]
  client/src/layout/MainLayout/Header/ProfileSection/index.jsx → client/src/ui-component/cards/MainCard.jsx

## Import Cycles
- None detected.

## Communities (141 total, 49 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.05
Nodes (43): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), ThemeCustomization(), Alert() (+35 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "transaction.service.test.js"
Cohesion: 0.19
Nodes (11): ref_path, ref_url, status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT (+3 more)

### Community 3 - "auth.service.js"
Cohesion: 0.06
Nodes (44): bcrypt, ref_crypto, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken() (+36 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.10
Nodes (49): applyContacts(), assertAddressTypes(), assertAssignmentDate(), assertContacts(), assertIdentification(), assertProviderAssignable(), assertWorkAssignable(), ASSIGNMENT_IDEMPOTENCY (+41 more)

### Community 7 - "AuthForgotPassword.jsx"
Cohesion: 0.09
Nodes (31): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), client_src_assets_images_interve, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage (+23 more)

### Community 8 - "showError"
Cohesion: 0.16
Nodes (27): deleteProfileAPI(), getModulesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), paginationUsersAPI(), genericRequest, showError() (+19 more)

### Community 9 - "WorkFormPage.jsx"
Cohesion: 0.13
Nodes (25): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), useSocket(), EditableList(), filterOptions, SearchSelect() (+17 more)

### Community 10 - "react"
Cohesion: 0.09
Nodes (18): getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), ProvidersPage, Accordion(), findOption(), flattenOptions(), GenericFormSection (+10 more)

### Community 11 - "users.service.js"
Cohesion: 0.07
Nodes (49): ADR-0004, ADR-0008, ADR-0013, ADR-0027, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows() (+41 more)

### Community 12 - "auditContext"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "masterRouter.utils.js"
Cohesion: 0.07
Nodes (39): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), getIO(), setIO(), verifyToken() (+31 more)

### Community 14 - "client/package.json"
Cohesion: 0.10
Nodes (20): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+12 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (14): admin, icons, dashboard, icons, menuItems, icons, other, icons (+6 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.13
Nodes (18): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0001, ADR-0009 (+10 more)

### Community 17 - "constants.js"
Cohesion: 0.13
Nodes (16): ContractsPage, TooltipLongText(), CONTRACT_STATE_COLORS, CONTRACT_STATE_TABS, ADR-0017, STATUS_TABS, TERM_UNIT_NAMES, TERM_UNIT_OPTIONS (+8 more)

### Community 18 - "contractTypeFields.service.js"
Cohesion: 0.24
Nodes (15): resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getContractTypeFields(), httpError(), ADR-0006 (+7 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "MainLayout/index.jsx"
Cohesion: 0.06
Nodes (51): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI() (+43 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 22 - "FilterPopper.jsx"
Cohesion: 0.60
Nodes (4): FilterPopper(), normalizeOptions(), SocketDropdownFilter(), lodash-es

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.11
Nodes (15): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, allowedHosts (+7 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (59): moneyText(), toMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel() (+51 more)

### Community 26 - "works.routes.js"
Cohesion: 0.12
Nodes (20): requirePermission(), getEffectivePermissionIds(), hasEffectivePermission(), changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify() (+12 more)

### Community 27 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.17
Nodes (10): ALL, contact(), ctx, existingRow, input(), ADR-0012, prismaMock, state (+2 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.06
Nodes (23): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+15 more)

### Community 30 - "main.routes.js"
Cohesion: 0.22
Nodes (10): express, mainRoutes, countUsersController(), deleteUserController(), ADR-0001, ADR-0027, paginationUsersController(), saveUserController() (+2 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.09
Nodes (32): moneyRule(), percentRule(), ACT_FIELDS, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController, createLiquidationController, deleteContractController (+24 more)

### Community 33 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 34 - "transaction.service.js"
Cohesion: 0.22
Nodes (12): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+4 more)

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 38 - "ProviderFormPage.jsx"
Cohesion: 0.10
Nodes (38): getIdentityDocumentsSelectAPI, getProfilesAPI(), checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, getProviderTypesSelectAPI (+30 more)

### Community 39 - "authContext.jsx"
Cohesion: 0.11
Nodes (21): loginAPI(), logoutAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), instance, NO_REFRESH_URLS, refreshClient, refreshSession() (+13 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.08
Nodes (11): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, prismaMock (+3 more)

### Community 41 - "AddressTypePage.jsx"
Cohesion: 0.25
Nodes (6): addressTypesApi, AddressTypePage, AddressTypePage(), COLUMNS, FORM_FIELDS, ADR-0009

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "@mui/material"
Cohesion: 0.15
Nodes (19): DashboardDefault, appDrawerWidth, gridSpacing, CardGrid(), CardSecondaryAction(), headerStyle, MainCard(), SubCard() (+11 more)

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 48 - "ContractTypeFieldsDialog.jsx"
Cohesion: 0.17
Nodes (15): contractTypesApi, getContractTypeFieldsAPI(), saveContractTypeFieldsAPI(), ContractTypePage, ContractTypeFieldsDialog(), DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+7 more)

### Community 49 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 50 - "server.js"
Cohesion: 0.18
Nodes (12): ref_http, node-cron, app, server, describeTarget(), testConnection(), verifyStatusCatalog(), cronJobs (+4 more)

### Community 51 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.09
Nodes (41): contractConceptsApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, DateField() (+33 more)

### Community 53 - "master.service.js"
Cohesion: 0.06
Nodes (55): adapter, ADR-0013, ADR-0027, prisma, ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, STATUS_IDS (+47 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "contractFields.js"
Cohesion: 0.22
Nodes (11): CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, sameValue() (+3 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.07
Nodes (25): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+17 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "useAuth"
Cohesion: 0.10
Nodes (35): getStatusesByScopeAPI(), workProvidersApi, useAuth(), PrivateRoute(), DataList(), Figure(), Pending(), RouteDialog() (+27 more)

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

### Community 66 - "IdentityDocumentPage.jsx"
Cohesion: 0.25
Nodes (6): identityDocumentsApi, IdentityDocumentPage, COLUMNS, FORM_FIELDS, IdentityDocumentPage(), ADR-0008

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "WorksPage.jsx"
Cohesion: 0.13
Nodes (10): getWorksSummaryAPI(), worksApi, WorksPage, MoneyField(), moneyInputText(), parseMoneyInput(), WorksSummary(), COLUMNS (+2 more)

### Community 70 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (8): created, DATABASE, declared, dropped, inDatabase, MIGRATIONS, sql, withMessage

### Community 71 - "InsurerPage.jsx"
Cohesion: 0.25
Nodes (6): insurersApi, InsurerPage, COLUMNS, FORM_FIELDS, InsurerPage(), ADR-0003

### Community 73 - "ProviderTypePage.jsx"
Cohesion: 0.25
Nodes (6): providerTypesApi, ProviderTypePage, COLUMNS, FORM_FIELDS, ProviderTypePage(), ADR-0010

### Community 88 - "uniqueConstraints.constants.js"
Cohesion: 0.50
Nodes (3): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES

### Community 89 - "`tbl_status`"
Cohesion: 0.16
Nodes (10): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+2 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.11
Nodes (16): constructionCompaniesApi, router, ConstructionCompanyPage, ContractDetailPage, ContractFormPage, MainRoutes, ProfilesPage, ProviderDetailPage (+8 more)

### Community 100 - "SupervisionTypePage.jsx"
Cohesion: 0.25
Nodes (6): supervisionTypesApi, SupervisionTypePage, COLUMNS, FORM_FIELDS, SupervisionTypePage(), ADR-0007

### Community 101 - "providerTypes.service.js"
Cohesion: 0.38
Nodes (5): ADR-0006, providerTypesRoutes, ADR-0010, providerTypesConfig, providerTypesService

### Community 104 - "`tbl_contracts`"
Cohesion: 0.07
Nodes (24): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+16 more)

### Community 105 - "notifications.routes.js"
Cohesion: 0.22
Nodes (13): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), insertNotification() (+5 more)

### Community 108 - "contracts.service.js"
Cohesion: 0.05
Nodes (90): ADR-0026, @prisma/client, newOperationId(), MONEY_SCALE, sumMoney(), FIELD_GROUPS, activeSequence(), amendmentResult() (+82 more)

### Community 112 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 116 - "ref_prop_types"
Cohesion: 0.24
Nodes (9): ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable(), BInputLabel, InputLabel(), TableActions() (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.24
Nodes (15): ADR-0012, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS (+7 more)

### Community 121 - "document.routes.js"
Cohesion: 0.23
Nodes (9): IDEMPOTENCY_HEADER, deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema, DOC_TYPES, paginationDocsSchema (+1 more)

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 124 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "permissions.constants.js"
Cohesion: 0.05
Nodes (46): ADR-0011, ADR-0018, ADR-0006, ADR-0012, ADR-0016, PERMISSIONS, defineMaster(), addressTypesRoutes (+38 more)

### Community 130 - "seed.js"
Cohesion: 0.17
Nodes (10): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES (+2 more)

### Community 132 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 133 - "contracts.service.test.js"
Cohesion: 0.08
Nodes (17): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, ADR-0006, prismaMock, state, ctx (+9 more)

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 139 - "status.service.test.js"
Cohesion: 0.33
Nodes (4): ref_fs, catalog, expected, prismaMock

### Community 141 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 149 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 150 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 151 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **630 isolated node(s):** `EMPTY_FORM`, `NO_DESCRIPTION`, `axios`, `@azure/identity`, `bcrypt` (+625 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 878 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **49 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `master.service.js`, `server/package.json`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `AuthForgotPassword.jsx`, `showError`, `WorkFormPage.jsx`, `react`, `client/package.json`, `constants.js`, `MainLayout/index.jsx`, `FilterPopper.jsx`, `ContactsEditor.jsx`, `DocumentManagement.jsx`, `ProviderFormPage.jsx`, `ContractTypeFieldsDialog.jsx`, `ContractFormPage.jsx`, `useAuth`, `WorksPage.jsx`, `ref_prop_types`, `EasyCrop.jsx`, `DebouncedInput.jsx`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `overrides/index.js`, `AuthForgotPassword.jsx`, `showError`, `WorkFormPage.jsx`, `client/package.json`, `constants.js`, `MainLayout/index.jsx`, `FilterPopper.jsx`, `ContactsEditor.jsx`, `DocumentManagement.jsx`, `ProviderFormPage.jsx`, `authContext.jsx`, `@mui/material`, `ContractTypeFieldsDialog.jsx`, `ContractFormPage.jsx`, `useAuth`, `WorksPage.jsx`, `MainRoutes.jsx`, `ref_prop_types`, `EasyCrop.jsx`, `DebouncedInput.jsx`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **What connects `EMPTY_FORM`, `NO_DESCRIPTION`, `axios` to the rest of the system?**
  _630 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05403508771929825 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `auth.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06453634085213032 - nodes in this community are weakly interconnected._
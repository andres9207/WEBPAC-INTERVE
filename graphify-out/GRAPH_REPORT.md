# Graph Report - WEBPAC-INTERVE  (2026-10-05)

## Corpus Check
- 450 files · ~180,299 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 2344 nodes · 5858 edges · 145 communities (97 shown, 48 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 94 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `966febde`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- contractConcepts.service.js
- auth.service.js
- dependencies
- server/package.json
- providers.service.js
- seed.demo.js
- showError
- WorkFormPage.jsx
- contractSuspensions.service.js
- users.service.js
- auditContext
- socket.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- permissions.routes.js
- contractTypeFields.service.js
- compilerOptions
- AuthForgotPassword.jsx
- providers.routes.js
- idempotency.service.js
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- userFullName
- providers.service.test.js
- contracts.controller.test.js
- session.service.js
- mailerService.js
- contracts.routes.js
- audit.service.js
- permissions.service.js
- client_src_assets_images_logo_interve
- handleFirebaseDocs.js
- getIO
- ProviderFormPage.jsx
- constants.js
- ref_jest_globals
- formatTime.js
- devDependencies
- src/index.jsx
- MainCard
- scripts
- ContractTypeFieldsDialog.jsx
- useGetMenuMaster
- server.js
- app.routes.js
- ContractFormPage.jsx
- master.service.js
- `tbl_contract_type_fields`
- contractFields.js
- transaction.mock.js
- scripts
- @mui/material
- winston.config.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- MainLayout/index.jsx
- extends
- transaction.service.test.js
- Sidebar/index.jsx
- NotificationSection/index.jsx
- eslint.config.mjs
- contractSuspensions.service.test.js
- `tbl_status`
- react
- `tbl_permissions`
- useConfig
- images.js
- `tbl_contracts`
- notifications.routes.js
- contracts.service.js
- users.service.test.js
- `tbl_works`
- `tbl_insurers`
- ContactsEditor.jsx
- uniqueConstraints.constants.test.js
- EasyCrop.jsx
- error.middleware.js
- session.service.test.js
- masterRouter.utils.js
- Default/index.jsx
- works.service.test.js
- status.service.test.js
- permissions.constants.js
- users.controller.test.js
- seed.js
- FilterPopper.jsx
- uniqueConstraints.constants.js
- contracts.service.test.js
- InputLabel.jsx
- authjwt.middleware.test.js
- transaction.service.js
- `tbl_work_stages`
- browserslist
- volta
- volta

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 103 edges
2. `react` - 77 edges
3. `useAuth()` - 61 edges
4. `showError()` - 53 edges
5. `writeAudit()` - 46 edges
6. `showSuccess()` - 45 edges
7. `withLockedTransaction()` - 44 edges
8. `auditContext()` - 39 edges
9. `@tabler/icons-react` - 39 edges
10. `MasterPage()` - 36 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `suspendContractAPI()` --calls--> `idempotencyConfig()`  [EXTRACTED]
  client/src/api/requests/contractsApi.js → client/src/utils/idempotency.js
- `HorizontalBar()` --calls--> `MenuList()`  [EXTRACTED]
  client/src/layout/MainLayout/HorizontalBar.jsx → client/src/layout/MainLayout/MenuList/index.jsx
- `MenuList()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/layout/MainLayout/MenuList/index.jsx → client/src/contexts/authContext.jsx
- `Sidebar()` --calls--> `MenuList()`  [EXTRACTED]
  client/src/layout/MainLayout/Sidebar/index.jsx → client/src/layout/MainLayout/MenuList/index.jsx

## Import Cycles
- None detected.

## Communities (145 total, 48 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.05
Nodes (46): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig (+38 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "contractConcepts.service.js"
Cohesion: 0.20
Nodes (26): activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget(), configuredConcept(), createAmendment() (+18 more)

### Community 3 - "auth.service.js"
Cohesion: 0.09
Nodes (34): bcrypt, ref_crypto, REDACTED, writeAudit(), backoff(), runTransaction(), withLockedTransaction(), withTransaction() (+26 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+26 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (52): applyContacts(), assertAddressTypes(), assertAssignmentDate(), assertContacts(), assertIdentification(), assertProviderAssignable(), assertWorkAssignable(), ASSIGNMENT_IDEMPOTENCY (+44 more)

### Community 7 - "seed.demo.js"
Cohesion: 0.09
Nodes (22): ref_node_crypto, ADDRESS_TYPE, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC, log() (+14 more)

### Community 8 - "showError"
Cohesion: 0.09
Nodes (32): getPermissionsCatalogAPI(), deleteProfileAPI(), getModulesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), paginationUsersAPI(), saveUserAPI() (+24 more)

### Community 9 - "WorkFormPage.jsx"
Cohesion: 0.13
Nodes (20): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getInsurersSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), createMasterApi(), EditableList(), STATUS_OPTIONS (+12 more)

### Community 10 - "contractSuspensions.service.js"
Cohesion: 0.11
Nodes (29): ADR-0026, dateOnlyText(), auditable(), findOpenSuspension(), ADR-0017, liftWithAmendment(), optionalText(), pastDate() (+21 more)

### Community 11 - "users.service.js"
Cohesion: 0.16
Nodes (15): ADR-0013, ADR-0027, identificationError(), assertAssignableProfile(), assertIdentification(), AUDITED_USER_FIELDS, checkIfUserExists(), ADR-0001 (+7 more)

### Community 12 - "auditContext"
Cohesion: 0.11
Nodes (27): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+19 more)

### Community 13 - "socket.js"
Cohesion: 0.26
Nodes (9): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+1 more)

### Community 14 - "client/package.json"
Cohesion: 0.10
Nodes (19): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+11 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (14): admin, icons, dashboard, icons, menuItems, icons, other, icons (+6 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.10
Nodes (25): express-validator, createMasterSchemas(), emailRule(), idempotencyKeyRule(), ADR-0001, ADR-0009, ADR-0027, moneyRule() (+17 more)

### Community 17 - "permissions.routes.js"
Cohesion: 0.21
Nodes (14): idArray(), getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController() (+6 more)

### Community 18 - "contractTypeFields.service.js"
Cohesion: 0.27
Nodes (14): resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getContractTypeFields(), httpError(), ADR-0006 (+6 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.06
Nodes (40): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), App(), client_src_assets_images_interve (+32 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 22 - "idempotency.service.js"
Cohesion: 0.15
Nodes (18): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+10 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.09
Nodes (48): @prisma/client, MONEY_SCALE, moneyText(), sumMoney(), toMoney(), applyManagers(), applyStages(), assertCollectionPermissions() (+40 more)

### Community 26 - "works.routes.js"
Cohesion: 0.13
Nodes (18): EDITABLE_STATUS_VALUES, changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, saveWorkController (+10 more)

### Community 27 - "userFullName"
Cohesion: 0.13
Nodes (26): countByStatus(), DEFAULT_ROWS, MAX_ROWS, paginate(), resolvePagination(), toInt(), addTerm(), daysInMonth() (+18 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.17
Nodes (10): ALL, contact(), ctx, existingRow, input(), ADR-0012, prismaMock, state (+2 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.07
Nodes (21): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+13 more)

### Community 30 - "session.service.js"
Cohesion: 0.11
Nodes (26): AUDIT_OPERATIONS, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME (+18 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.09
Nodes (32): ACT_FIELDS, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController, createLiquidationController, deleteContractController, getContractController, getContractFieldsController (+24 more)

### Community 33 - "audit.service.js"
Cohesion: 0.22
Nodes (13): ADR-0001, auditMisuse(), buildRows(), diffFields(), ADR-0013, ADR-0027, protect(), SENSITIVE_FIELDS (+5 more)

### Community 34 - "permissions.service.js"
Cohesion: 0.19
Nodes (8): AUDIT_ENTITIES, getEffectivePermissionIds(), getSessionInfo(), auditPermissionChanges(), ADR-0013, ADR-0027, updateProfilePermissions(), updateUserPermissions()

### Community 36 - "handleFirebaseDocs.js"
Cohesion: 0.18
Nodes (10): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+2 more)

### Community 37 - "getIO"
Cohesion: 0.13
Nodes (17): getIO(), IDEMPOTENCY_HEADER, FIELD_ATTRIBUTES, getContractTypeFieldsController, pickField(), saveContractTypeFieldsController, insertNotification(), deleteProfileController() (+9 more)

### Community 38 - "ProviderFormPage.jsx"
Cohesion: 0.07
Nodes (51): suspendContractAPI(), getIdentityDocumentsSelectAPI, getProfilesAPI(), checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, getProviderTypesSelectAPI (+43 more)

### Community 39 - "constants.js"
Cohesion: 0.07
Nodes (28): contractsApi, reasonsApi, refreshSession(), ReasonPage, SocketContext, SocketProvider(), TooltipLongText(), CONTRACT_STATE_COLORS (+20 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (17): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, prismaMock (+9 more)

### Community 41 - "formatTime.js"
Cohesion: 0.15
Nodes (8): paginationDocsApi(), showPromise(), DocumentManagement(), FileRow(), getFileIcon(), getFileSize(), formatNotificationDateTime(), SHORT_MONTHS

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "MainCard"
Cohesion: 0.20
Nodes (13): gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), Avatar(), AuthCardWrapper(), SamplePage(), ColorBox() (+5 more)

### Community 46 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart, pm2:start (+5 more)

### Community 48 - "ContractTypeFieldsDialog.jsx"
Cohesion: 0.17
Nodes (15): contractTypesApi, getContractTypeFieldsAPI(), saveContractTypeFieldsAPI(), ContractTypePage, ContractTypeFieldsDialog(), DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+7 more)

### Community 49 - "useGetMenuMaster"
Cohesion: 0.27
Nodes (10): useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), MenuList(), NavCollapse(), NavGroup() (+2 more)

### Community 50 - "server.js"
Cohesion: 0.19
Nodes (11): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, registeredTasks (+3 more)

### Community 51 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.07
Nodes (51): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017, ContractFormPage (+43 more)

### Community 53 - "master.service.js"
Cohesion: 0.10
Nodes (23): ADR-0004, ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, newOperationId(), capitalize(), createMasterService(), httpError() (+15 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "contractFields.js"
Cohesion: 0.33
Nodes (8): enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, sameValue()

### Community 56 - "transaction.mock.js"
Cohesion: 0.07
Nodes (25): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+17 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "@mui/material"
Cohesion: 0.07
Nodes (53): getStatusesByScopeAPI(), workProvidersApi, getWorksSummaryAPI(), worksApi, WorksPage, useSocket(), SubCard(), ACTION_TONES (+45 more)

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

### Community 66 - "MainLayout/index.jsx"
Cohesion: 0.23
Nodes (9): Footer(), MainLayout(), MainContentStyled, appDrawerWidth, drawerWidth, Breadcrumbs(), BTitle(), Loadable() (+1 more)

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "transaction.service.test.js"
Cohesion: 0.19
Nodes (11): ref_path, ref_url, status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT (+3 more)

### Community 70 - "Sidebar/index.jsx"
Cohesion: 0.27
Nodes (10): endpoints, handlerDrawerOpen(), initialState, Header(), ProfileSection(), LogoSection(), Sidebar(), closedMixin() (+2 more)

### Community 71 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 73 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 88 - "contractSuspensions.service.test.js"
Cohesion: 0.17
Nodes (5): ctx, initial, ADR-0017, prismaMock, state

### Community 89 - "`tbl_status`"
Cohesion: 0.10
Nodes (16): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+8 more)

### Community 94 - "react"
Cohesion: 0.04
Nodes (62): addressTypesApi, constructionCompaniesApi, identityDocumentsApi, insurersApi, providersApi, providerTypesApi, supervisionTypesApi, getBasicInformationAPI() (+54 more)

### Community 100 - "useConfig"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 101 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 104 - "`tbl_contracts`"
Cohesion: 0.07
Nodes (24): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+16 more)

### Community 105 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 108 - "contracts.service.js"
Cohesion: 0.09
Nodes (46): assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditableContract(), CONCEPT_AUDITED, CONCEPT_SELECT (+38 more)

### Community 112 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 116 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 117 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (8): created, DATABASE, declared, dropped, inDatabase, MIGRATIONS, sql, withMessage

### Community 119 - "error.middleware.js"
Cohesion: 0.24
Nodes (15): ADR-0012, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS (+7 more)

### Community 120 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 121 - "masterRouter.utils.js"
Cohesion: 0.15
Nodes (18): verifyToken(), requirePermission(), validate(), hasEffectivePermission(), isSessionActive(), createMasterControllers(), createMasterRouter(), contractTypesRoutes (+10 more)

### Community 122 - "Default/index.jsx"
Cohesion: 0.47
Nodes (4): DashboardDefault, CardGrid(), Dashboard(), testCards

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 124 - "status.service.test.js"
Cohesion: 0.33
Nodes (4): ref_fs, catalog, expected, prismaMock

### Community 125 - "permissions.constants.js"
Cohesion: 0.05
Nodes (45): ADR-0011, ADR-0018, express, ADR-0006, ADR-0012, ADR-0016, ADR-0017, PERMISSIONS (+37 more)

### Community 129 - "users.controller.test.js"
Cohesion: 0.33
Nodes (4): forgedAuthor, ADR-0013, mockRevokeSession, usersServiceMock

### Community 130 - "seed.js"
Cohesion: 0.17
Nodes (10): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES (+2 more)

### Community 131 - "FilterPopper.jsx"
Cohesion: 0.60
Nodes (4): FilterPopper(), normalizeOptions(), SocketDropdownFilter(), lodash-es

### Community 132 - "uniqueConstraints.constants.js"
Cohesion: 0.50
Nodes (3): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES

### Community 133 - "contracts.service.test.js"
Cohesion: 0.07
Nodes (21): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+13 more)

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 139 - "transaction.service.js"
Cohesion: 0.13
Nodes (16): @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), buildLockPlan() (+8 more)

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
- **661 isolated node(s):** `ADR-0006`, `ADR-0016`, `ADR-0017`, `STATUS_TABS`, `TERM_UNIT_NAMES` (+656 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 925 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **48 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `FilterPopper.jsx`, `InputLabel.jsx`, `showError`, `WorkFormPage.jsx`, `client/package.json`, `AuthForgotPassword.jsx`, `ProviderFormPage.jsx`, `constants.js`, `formatTime.js`, `MainCard`, `ContractTypeFieldsDialog.jsx`, `useGetMenuMaster`, `ContractFormPage.jsx`, `MainLayout/index.jsx`, `Sidebar/index.jsx`, `NotificationSection/index.jsx`, `react`, `useConfig`, `ContactsEditor.jsx`, `EasyCrop.jsx`, `Default/index.jsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `lodash` connect `server/package.json` to `master.service.js`, `react`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `axios` connect `showError` to `server/package.json`, `client/package.json`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **What connects `ADR-0006`, `ADR-0016`, `ADR-0017` to the rest of the system?**
  _661 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `auth.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09191583610188261 - nodes in this community are weakly interconnected._
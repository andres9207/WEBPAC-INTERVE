# Graph Report - WEBPAC-INTERVE  (2026-10-02)

## Corpus Check
- 429 files · ~166,985 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 2225 nodes · 5474 edges · 136 communities (90 shown, 46 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 92 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `475cd6ae`
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
- permissions.service.js
- auditContext
- getIO
- client/package.json
- menu-items/index.js
- validation.utils.js
- session.service.js
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
- request.mock.js
- socket.js
- mailerService.js
- contracts.routes.js
- users.service.js
- prismaClient.js
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- notifications.routes.js
- ProviderFormPage.jsx
- @mui/material
- ref_jest_globals
- contractConcepts.service.js
- devDependencies
- transaction.service.js
- src/index.jsx
- themes/index.jsx
- scripts
- contractTerms.js
- httpCliente.js
- session.service.test.js
- server.js
- main.routes.js
- ContractFormPage.jsx
- master.service.js
- `tbl_contract_type_fields`
- contractFields.js
- transaction.mock.js
- scripts
- ContractDetailPage.jsx
- winston.config.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- DebouncedInput.jsx
- extends
- WorksPage.jsx
- browserslist
- volta
- volta
- users.service.test.js
- `tbl_status`
- useAuth
- auth.service.test.js
- masterRouter.utils.js
- providerTypes.service.js
- `tbl_contracts`
- auth.controller.test.js
- contracts.service.js
- dateOnlyText
- `tbl_works`
- `tbl_insurers`
- InputLabel.jsx
- `tbl_contracts`
- ContractTypeFieldsDialog.jsx
- ConfigContext.jsx
- works.service.test.js
- permissions.constants.js
- seed.js
- createContract
- contracts.service.test.js
- contractConcepts.service.test.js
- authjwt.middleware.test.js
- contracts.controller.test.js
- EasyCrop.jsx
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
- `ContractFormPage()` --calls--> `getContractTypesSelectAPI`  [EXTRACTED]
  client/src/views/work/contracts/ContractFormPage.jsx → client/src/api/requests/contractTypesApi.js
- `GenericFormSection` --calls--> `SelectSocket()`  [EXTRACTED]
  client/src/ui-component/extended/GenericFormSection.jsx → client/src/ui-component/extended/SelectSocket.jsx
- `ConceptDialog()` --calls--> `GenericFormSection`  [EXTRACTED]
  client/src/views/work/contracts/components/ConceptDialog.jsx → client/src/ui-component/extended/GenericFormSection.jsx

## Import Cycles
- None detected.

## Communities (136 total, 46 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "transaction.service.test.js"
Cohesion: 0.08
Nodes (29): ref_fs, ref_path, ref_url, concurrencyError(), errorMiddleware(), isMySqlCode(), ADR-0012, ADR-0027 (+21 more)

### Community 3 - "auth.service.js"
Cohesion: 0.07
Nodes (44): ADR-0013, bcrypt, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0001 (+36 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+26 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (58): ACTIVE_STATUS, applyContacts(), assertAddressTypes(), assertAssignmentDate(), assertContacts(), assertIdentification(), assertProviderAssignable(), assertWorkAssignable() (+50 more)

### Community 7 - "AuthForgotPassword.jsx"
Cohesion: 0.06
Nodes (38): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), client_src_assets_images_interve (+30 more)

### Community 8 - "showError"
Cohesion: 0.11
Nodes (36): getModulesAPI(), getProfilesAPI(), saveProfileAPI(), deleteUserAPI(), getBasicInformationAPI(), paginationUsersAPI(), saveUserAPI(), updateAccountAPI() (+28 more)

### Community 9 - "WorkFormPage.jsx"
Cohesion: 0.10
Nodes (30): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), EditableList(), SearchSelect(), TooltipLongText(), CONTRACT_STATE_TABS (+22 more)

### Community 10 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 11 - "permissions.service.js"
Cohesion: 0.13
Nodes (11): getEffectivePermissionIds(), getMenu(), getSessionInfo(), PAGE_SELECT, toChild(), toParent(), auditPermissionChanges(), ADR-0013 (+3 more)

### Community 12 - "auditContext"
Cohesion: 0.16
Nodes (23): auditContext(), emailRule(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController() (+15 more)

### Community 13 - "getIO"
Cohesion: 0.15
Nodes (15): getIO(), FIELD_ATTRIBUTES, getContractTypeFieldsController, pickField(), saveContractTypeFieldsController, deleteProfileController(), getModulesController(), ADR-0027 (+7 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+13 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (14): admin, icons, dashboard, icons, menuItems, icons, other, icons (+6 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.15
Nodes (17): express-validator, createMasterSchemas(), idArray(), idempotencyKeyRule(), ADR-0001, ADR-0009, ADR-0027, nullable (+9 more)

### Community 17 - "session.service.js"
Cohesion: 0.12
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 18 - "contractTypeFields.service.js"
Cohesion: 0.24
Nodes (15): resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getContractTypeFields(), httpError(), ADR-0006 (+7 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "MainLayout/index.jsx"
Cohesion: 0.05
Nodes (62): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI() (+54 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.09
Nodes (33): IDEMPOTENCY_HEADER, ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS (+25 more)

### Community 22 - "FilterPopper.jsx"
Cohesion: 0.60
Nodes (4): FilterPopper(), normalizeOptions(), SocketDropdownFilter(), lodash-es

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.10
Nodes (44): withLockedTransaction(), deleteUser(), ACTIVE_STATUS, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted() (+36 more)

### Community 26 - "works.routes.js"
Cohesion: 0.14
Nodes (17): changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, saveWorkController, selectWorkManagersController (+9 more)

### Community 27 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.17
Nodes (10): ALL, contact(), ctx, existingRow, input(), ADR-0012, prismaMock, state (+2 more)

### Community 29 - "request.mock.js"
Cohesion: 0.08
Nodes (18): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+10 more)

### Community 30 - "socket.js"
Cohesion: 0.26
Nodes (9): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+1 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.09
Nodes (32): moneyRule(), percentRule(), ACT_FIELDS, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController, createLiquidationController, deleteContractController (+24 more)

### Community 33 - "users.service.js"
Cohesion: 0.09
Nodes (27): defineMaster(), DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, nitCheckDigit() (+19 more)

### Community 34 - "prismaClient.js"
Cohesion: 0.10
Nodes (25): @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), canonical() (+17 more)

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 37 - "notifications.routes.js"
Cohesion: 0.22
Nodes (13): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), insertNotification() (+5 more)

### Community 38 - "ProviderFormPage.jsx"
Cohesion: 0.09
Nodes (36): addressTypesApi, getAddressTypesSelectAPI, getIdentityDocumentsSelectAPI, getInsurersSelectAPI, insurersApi, checkProviderIdentificationAPI(), getProviderTypesSelectAPI, providerTypesApi (+28 more)

### Community 39 - "@mui/material"
Cohesion: 0.13
Nodes (19): deleteProfileAPI(), paginationProfilesAPI(), ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable(), LastModifiedCell() (+11 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.08
Nodes (11): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, baseConfig (+3 more)

### Community 41 - "contractConcepts.service.js"
Cohesion: 0.18
Nodes (26): activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget(), configuredConcept(), createAmendment() (+18 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 43 - "transaction.service.js"
Cohesion: 0.21
Nodes (11): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+3 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "themes/index.jsx"
Cohesion: 0.33
Nodes (6): createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor, Typography()

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "contractTerms.js"
Cohesion: 0.09
Nodes (21): ADR-0026, @prisma/client, MONEY_SCALE, sumMoney(), toMoney(), CONCEPT_TYPE_NAMES, CONCEPT_TYPES, CONTRACT_STATES (+13 more)

### Community 48 - "httpCliente.js"
Cohesion: 0.13
Nodes (16): instance, NO_REFRESH_URLS, refreshClient, refreshSession(), App(), AuthContext, NavigationScroll(), SocketContext (+8 more)

### Community 49 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 50 - "server.js"
Cohesion: 0.24
Nodes (9): ref_http, node-cron, app, server, cronJobs, registeredTasks, startCronJobs(), stopCronJobs() (+1 more)

### Community 51 - "main.routes.js"
Cohesion: 0.13
Nodes (16): express, supervisionTypesRoutes, ADR-0007, supervisionTypesConfig, supervisionTypesService, getMenuController(), getProfilesController(), getStatusesByScope() (+8 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.09
Nodes (40): contractConceptsApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, DateField() (+32 more)

### Community 53 - "master.service.js"
Cohesion: 0.11
Nodes (29): newOperationId(), ACTIVE_STATUS, capitalize(), createMasterService(), DELETED_STATUS, httpError(), INACTIVE_STATUS, ADR-0004 (+21 more)

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

### Community 58 - "ContractDetailPage.jsx"
Cohesion: 0.08
Nodes (45): getStatusesByScopeAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, ProviderDetailPage, useSocket() (+37 more)

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

### Community 68 - "WorksPage.jsx"
Cohesion: 0.14
Nodes (9): getWorksSummaryAPI(), worksApi, MoneyField(), moneyInputText(), parseMoneyInput(), WorksSummary(), COLUMNS, ADR-0011 (+1 more)

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

### Community 94 - "useAuth"
Cohesion: 0.05
Nodes (60): constructionCompaniesApi, identityDocumentsApi, supervisionTypesApi, useAuth(), AddressTypePage, ConstructionCompanyPage, ContractDetailPage, ContractFormPage (+52 more)

### Community 95 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 100 - "masterRouter.utils.js"
Cohesion: 0.10
Nodes (25): verifyToken(), requirePermission(), validate(), hasEffectivePermission(), isSessionActive(), createMasterControllers(), createMasterRouter(), getContractTypeFieldsSchema (+17 more)

### Community 101 - "providerTypes.service.js"
Cohesion: 0.38
Nodes (5): ADR-0006, providerTypesRoutes, ADR-0010, providerTypesConfig, providerTypesService

### Community 104 - "`tbl_contracts`"
Cohesion: 0.07
Nodes (24): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+16 more)

### Community 105 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 108 - "contracts.service.js"
Cohesion: 0.12
Nodes (27): moneyText(), ACTIVE_STATUS, conceptDto(), conceptsDto(), CONTRACT_AUDITED, countByState(), currentValueText(), derivedEndDate() (+19 more)

### Community 112 - "dateOnlyText"
Cohesion: 0.18
Nodes (19): ADR-0015, addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS (+11 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 121 - "ContractTypeFieldsDialog.jsx"
Cohesion: 0.18
Nodes (14): contractTypesApi, getContractTypeFieldsAPI(), saveContractTypeFieldsAPI(), ContractTypeFieldsDialog(), DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006, toggle() (+6 more)

### Community 122 - "ConfigContext.jsx"
Cohesion: 0.27
Nodes (7): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage()

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 125 - "permissions.constants.js"
Cohesion: 0.07
Nodes (34): ADR-0011, ADR-0018, ADR-0006, ADR-0012, ADR-0016, PERMISSIONS, addressTypesRoutes, addressTypesConfig (+26 more)

### Community 130 - "seed.js"
Cohesion: 0.17
Nodes (10): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES (+2 more)

### Community 132 - "createContract"
Cohesion: 0.25
Nodes (17): assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditableContract(), conceptValuesOf(), createContract() (+9 more)

### Community 133 - "contracts.service.test.js"
Cohesion: 0.09
Nodes (17): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+9 more)

### Community 135 - "contractConcepts.service.test.js"
Cohesion: 0.22
Nodes (4): ctx, ADR-0016, prismaMock, state

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 140 - "contracts.controller.test.js"
Cohesion: 0.29
Nodes (5): conceptsServiceMock, contractsServiceMock, emit, ADR-0015, ADR-0016

## Knowledge Gaps
- **632 isolated node(s):** `ADR-0006`, `ADR-0016`, `ADR-0012`, `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS` (+627 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 873 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **46 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `master.service.js`, `server/package.json`?**
  _High betweenness centrality (0.225) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `DebouncedInput.jsx`, `DocumentManagement.jsx`, `WorksPage.jsx`, `ProviderFormPage.jsx`, `AuthForgotPassword.jsx`, `showError`, `WorkFormPage.jsx`, `withAlpha`, `themes/index.jsx`, `client/package.json`, `EasyCrop.jsx`, `MainLayout/index.jsx`, `InputLabel.jsx`, `FilterPopper.jsx`, `ContractFormPage.jsx`, `ContractTypeFieldsDialog.jsx`, `ContractDetailPage.jsx`, `useAuth`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **Why does `react` connect `@mui/material` to `DebouncedInput.jsx`, `DocumentManagement.jsx`, `ContractDetailPage.jsx`, `ProviderFormPage.jsx`, `AuthForgotPassword.jsx`, `showError`, `WorkFormPage.jsx`, `WorksPage.jsx`, `themes/index.jsx`, `client/package.json`, `EasyCrop.jsx`, `httpCliente.js`, `MainLayout/index.jsx`, `ContractFormPage.jsx`, `FilterPopper.jsx`, `ContractTypeFieldsDialog.jsx`, `ConfigContext.jsx`, `useAuth`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **What connects `ADR-0006`, `ADR-0016`, `ADR-0012` to the rest of the system?**
  _632 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `transaction.service.test.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07804878048780488 - nodes in this community are weakly interconnected._
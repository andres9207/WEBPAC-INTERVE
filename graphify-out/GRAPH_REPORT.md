# Graph Report - WEBPAC-INTERVE  (2026-10-05)

## Corpus Check
- 439 files · ~171,118 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 2260 nodes · 5597 edges · 137 communities (88 shown, 49 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 93 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `edeebedc`
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
- AuthForgotPassword.jsx
- react
- WorkFormPage.jsx
- contractTerms.js
- users.service.js
- auditContext
- authjwt.middleware.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- permissions.routes.js
- contractTypeFields.service.js
- compilerOptions
- react-router-dom
- providers.routes.js
- idempotency.service.js
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- dateOnlyText
- providers.service.test.js
- contracts.controller.test.js
- session.service.js
- mailerService.js
- contracts.routes.js
- audit.service.js
- withLockedTransaction
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- getIO
- ProviderFormPage.jsx
- SocketProvider.jsx
- ref_jest_globals
- moneyText
- devDependencies
- src/index.jsx
- @mui/material
- scripts
- ContractTypeFieldsDialog.jsx
- httpCliente.js
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
- contracts.service.test.js
- extends
- formatNumber.js
- password-strength.js
- master.service.test.js
- compression.middleware.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
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
- masterRouter.utils.js
- DebouncedInput.jsx
- works.service.test.js
- permissions.constants.js
- seed.js
- auth.service.test.js
- contractTypeFields.service.test.js
- authjwt.middleware.test.js
- prismaClient.js
- auth.controller.test.js
- `tbl_work_stages`
- browserslist
- volta
- volta

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 102 edges
2. `react` - 76 edges
3. `useAuth()` - 59 edges
4. `showError()` - 51 edges
5. `writeAudit()` - 43 edges
6. `showSuccess()` - 43 edges
7. `withLockedTransaction()` - 42 edges
8. `@tabler/icons-react` - 39 edges
9. `auditContext()` - 38 edges
10. `MasterPage()` - 35 edges

## Surprising Connections (you probably didn't know these)
- `insertNotification()` --calls--> `getIO()`  [EXTRACTED]
  server/src/modules/app/notifications/notifications.service.js → server/src/common/configs/socket.manager.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `GenericFormSection` --calls--> `SelectSocket()`  [EXTRACTED]
  client/src/ui-component/extended/GenericFormSection.jsx → client/src/ui-component/extended/SelectSocket.jsx
- `ConceptDialog()` --calls--> `GenericFormSection`  [EXTRACTED]
  client/src/views/work/contracts/components/ConceptDialog.jsx → client/src/ui-component/extended/GenericFormSection.jsx

## Import Cycles
- None detected.

## Communities (137 total, 49 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.05
Nodes (46): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig (+38 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "contractConcepts.service.js"
Cohesion: 0.16
Nodes (27): newOperationId(), activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget(), configuredConcept() (+19 more)

### Community 3 - "auth.service.js"
Cohesion: 0.10
Nodes (30): bcrypt, writeAudit(), backoff(), runTransaction(), withTransaction(), comparePassword(), hashPassword(), deriveKey() (+22 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+26 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (54): applyContacts(), assertAddressTypes(), assertAssignmentDate(), assertContacts(), assertIdentification(), assertProviderAssignable(), assertWorkAssignable(), ASSIGNMENT_IDEMPOTENCY (+46 more)

### Community 7 - "AuthForgotPassword.jsx"
Cohesion: 0.19
Nodes (15): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider(), getStoredUser() (+7 more)

### Community 8 - "react"
Cohesion: 0.08
Nodes (44): deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), getBasicInformationAPI(), paginationUsersAPI() (+36 more)

### Community 9 - "WorkFormPage.jsx"
Cohesion: 0.13
Nodes (24): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), EditableList(), filterOptions, SearchSelect(), SelectSocket() (+16 more)

### Community 10 - "contractTerms.js"
Cohesion: 0.10
Nodes (19): ADR-0026, @prisma/client, MONEY_SCALE, sumMoney(), toMoney(), assertStateAllows(), CONCEPT_TYPE_NAMES, CONCEPT_TYPES (+11 more)

### Community 11 - "users.service.js"
Cohesion: 0.09
Nodes (27): ADR-0004, ADR-0027, DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008 (+19 more)

### Community 12 - "auditContext"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "authjwt.middleware.js"
Cohesion: 0.17
Nodes (12): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), setIO(), ACCESS_COOKIE_NAME, isSessionActive() (+4 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (33): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+25 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (14): admin, icons, dashboard, icons, menuItems, icons, other, icons (+6 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.09
Nodes (28): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), emailRule(), idempotencyKeyRule(), ADR-0001, ADR-0009, ADR-0027 (+20 more)

### Community 17 - "permissions.routes.js"
Cohesion: 0.14
Nodes (17): idArray(), getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController() (+9 more)

### Community 18 - "contractTypeFields.service.js"
Cohesion: 0.24
Nodes (15): resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getContractTypeFields(), httpError(), ADR-0006 (+7 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "react-router-dom"
Cohesion: 0.05
Nodes (62): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI() (+54 more)

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
Nodes (13): cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, allowedHosts, isOriginAllowed() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.11
Nodes (41): PROGRESS_WARNING, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted(), assertHeader(), assertManagerUsers() (+33 more)

### Community 26 - "works.routes.js"
Cohesion: 0.14
Nodes (17): changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, saveWorkController, selectWorkManagersController (+9 more)

### Community 27 - "dateOnlyText"
Cohesion: 0.22
Nodes (17): addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), TERM_UNITS, termProgress(), toDateOnly() (+9 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.17
Nodes (10): ALL, contact(), ctx, existingRow, input(), ADR-0012, prismaMock, state (+2 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.06
Nodes (23): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+15 more)

### Community 30 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.09
Nodes (33): moneyRule(), percentRule(), ACT_FIELDS, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController, createLiquidationController, deleteContractController (+25 more)

### Community 33 - "audit.service.js"
Cohesion: 0.15
Nodes (15): ADR-0013, auditMisuse(), buildRows(), ADR-0001, ADR-0027, protect(), REDACTED, SENSITIVE_FIELDS (+7 more)

### Community 34 - "withLockedTransaction"
Cohesion: 0.12
Nodes (17): AUDIT_ENTITIES, AUDIT_OPERATIONS, buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+9 more)

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.14
Nodes (18): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+10 more)

### Community 37 - "getIO"
Cohesion: 0.21
Nodes (11): getIO(), FIELD_ATTRIBUTES, getContractTypeFieldsController, pickField(), saveContractTypeFieldsController, deleteProfileController(), getModulesController(), ADR-0027 (+3 more)

### Community 38 - "ProviderFormPage.jsx"
Cohesion: 0.09
Nodes (34): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, getProviderTypesSelectAPI (+26 more)

### Community 39 - "SocketProvider.jsx"
Cohesion: 0.14
Nodes (15): refreshSession(), App(), AuthContext, NavigationScroll(), SocketContext, SocketProvider(), FilterPopper(), normalizeOptions() (+7 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.07
Nodes (12): ref_crypto, ref_jest_globals, prismaMock, mockValidationResult, prismaMock, payload, dbUser, mockDisconnectSockets (+4 more)

### Community 41 - "moneyText"
Cohesion: 0.23
Nodes (13): moneyText(), valueText(), conceptDto(), conceptsDto(), currentValueText(), getContract(), toListDto(), totalsDto() (+5 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "@mui/material"
Cohesion: 0.14
Nodes (20): DashboardDefault, appDrawerWidth, gridSpacing, CardGrid(), CardSecondaryAction(), headerStyle, MainCard(), SubCard() (+12 more)

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 48 - "ContractTypeFieldsDialog.jsx"
Cohesion: 0.17
Nodes (15): contractTypesApi, getContractTypeFieldsAPI(), saveContractTypeFieldsAPI(), ContractTypePage, ContractTypeFieldsDialog(), DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+7 more)

### Community 49 - "httpCliente.js"
Cohesion: 0.20
Nodes (6): getPermissionsCatalogAPI(), instance, NO_REFRESH_URLS, refreshClient, axios, js-cookie

### Community 50 - "server.js"
Cohesion: 0.21
Nodes (10): ref_http, node-cron, app, server, verifyStatusCatalog(), cronJobs, registeredTasks, startCronJobs() (+2 more)

### Community 51 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.09
Nodes (42): contractConceptsApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, PercentField() (+34 more)

### Community 53 - "master.service.js"
Cohesion: 0.12
Nodes (27): capitalize(), createMasterService(), httpError(), ADR-0004, ADR-0013, ADR-0027, countByStatus(), DEFAULT_ROWS (+19 more)

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
Cohesion: 0.07
Nodes (52): getStatusesByScopeAPI(), useAuth(), ContractsPage, PrivateRoute(), useSocket(), DataList(), Figure(), Pending() (+44 more)

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

### Community 66 - "contracts.service.test.js"
Cohesion: 0.20
Nodes (6): ctx, ADR-0015, ADR-0017, prismaMock, state, storedContract

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "formatNumber.js"
Cohesion: 0.23
Nodes (3): MoneyField(), moneyInputText(), parseMoneyInput()

### Community 70 - "password-strength.js"
Cohesion: 0.48
Nodes (5): defaultColor, hasMixed(), hasNumber(), hasSpecial(), strengthIndicator()

### Community 71 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 89 - "`tbl_status`"
Cohesion: 0.16
Nodes (10): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+2 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.04
Nodes (58): addressTypesApi, constructionCompaniesApi, identityDocumentsApi, getInsurersSelectAPI, insurersApi, providerTypesApi, supervisionTypesApi, getWorksSummaryAPI() (+50 more)

### Community 104 - "`tbl_contracts`"
Cohesion: 0.07
Nodes (24): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+16 more)

### Community 105 - "notifications.routes.js"
Cohesion: 0.20
Nodes (14): express, getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount() (+6 more)

### Community 108 - "contracts.service.js"
Cohesion: 0.13
Nodes (33): diffFields(), assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditableContract(), conceptValuesOf() (+25 more)

### Community 112 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 116 - "ref_prop_types"
Cohesion: 0.14
Nodes (19): getAddressTypesSelectAPI, ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), channelsOf(), ContactDialog(), ContactsEditor() (+11 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.06
Nodes (44): ADR-0012, ref_fs, ref_path, ref_url, DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError() (+36 more)

### Community 121 - "masterRouter.utils.js"
Cohesion: 0.10
Nodes (26): verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers(), createMasterRouter(), addressTypesRoutes (+18 more)

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 125 - "permissions.constants.js"
Cohesion: 0.12
Nodes (18): ADR-0011, ADR-0018, ADR-0006, ADR-0012, ADR-0016, PERMISSIONS, defineMaster(), addressTypesService (+10 more)

### Community 130 - "seed.js"
Cohesion: 0.17
Nodes (10): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES (+2 more)

### Community 132 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 133 - "contractTypeFields.service.test.js"
Cohesion: 0.10
Nodes (15): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+7 more)

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 139 - "prismaClient.js"
Cohesion: 0.09
Nodes (20): @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), ACTIVE_STATUS (+12 more)

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
- **632 isolated node(s):** `instance`, `refreshClient`, `NO_REFRESH_URLS`, `ADR-0001`, `ADR-0008` (+627 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 880 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **49 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `master.service.js`, `server/package.json`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `DocumentManagement.jsx`, `formatNumber.js`, `DebouncedInput.jsx`, `SocketProvider.jsx`, `react`, `WorkFormPage.jsx`, `AuthForgotPassword.jsx`, `ProviderFormPage.jsx`, `client/package.json`, `ContractTypeFieldsDialog.jsx`, `react-router-dom`, `ref_prop_types`, `EasyCrop.jsx`, `ContractFormPage.jsx`, `useAuth`, `MainRoutes.jsx`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `overrides/index.js`, `DocumentManagement.jsx`, `useAuth`, `ProviderFormPage.jsx`, `SocketProvider.jsx`, `AuthForgotPassword.jsx`, `WorkFormPage.jsx`, `src/index.jsx`, `@mui/material`, `client/package.json`, `ContractTypeFieldsDialog.jsx`, `react-router-dom`, `ref_prop_types`, `EasyCrop.jsx`, `ContractFormPage.jsx`, `DebouncedInput.jsx`, `MainRoutes.jsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **What connects `instance`, `refreshClient`, `NO_REFRESH_URLS` to the rest of the system?**
  _632 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `auth.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09986504723346828 - nodes in this community are weakly interconnected._
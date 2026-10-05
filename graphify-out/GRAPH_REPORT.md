# Graph Report - WEBPAC-INTERVE  (2026-10-05)

## Corpus Check
- 438 files · ~170,060 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 2256 nodes · 5579 edges · 136 communities (87 shown, 49 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 92 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0c12fa2a`
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
- createContract
- audit.service.js
- auth.routes.js
- masterRouter.utils.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- session.service.js
- contractTypeFields.service.js
- compilerOptions
- MainLayout/index.jsx
- auditContext
- FilterPopper.jsx
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- eslint.config.mjs
- providers.service.test.js
- contracts.controller.test.js
- users.service.js
- mailerService.js
- contracts.routes.js
- ContactsEditor.jsx
- transaction.service.js
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- idempotency.service.js
- ProviderFormPage.jsx
- SocketProvider.jsx
- ref_jest_globals
- contractTerms.js
- devDependencies
- src/index.jsx
- handleFirebase.js
- scripts
- httpCliente.js
- session.service.test.js
- server.js
- app.routes.js
- ContractFormPage.jsx
- master.service.js
- `tbl_contract_type_fields`
- contractFields.js
- transaction.mock.js
- scripts
- constants.js
- winston.config.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- contractConcepts.service.js
- extends
- WorksPage.jsx
- uniqueConstraints.constants.test.js
- users.controller.test.js
- dateOnlyText
- uniqueConstraints.constants.js
- `tbl_status`
- react
- `tbl_permissions`
- permissions.service.test.js
- socket.js
- `tbl_contracts`
- getIO
- contracts.service.js
- EasyCrop.jsx
- `tbl_works`
- `tbl_insurers`
- @mui/material
- `tbl_contracts`
- InputLabel.jsx
- error.middleware.js
- DebouncedInput.jsx
- works.service.test.js
- images.js
- permissions.constants.js
- seed.js
- auth.service.test.js
- contracts.service.test.js
- authjwt.middleware.test.js
- status.service.test.js
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
- `withTransaction()` --calls--> `isDeadlock()`  [EXTRACTED]
  server/src/common/services/transaction.service.js → server/src/common/utils/dbErrors.utils.js
- `ComponentsOverrides()` --indirect_call--> `CardActions()`  [INFERRED]
  client/src/themes/overrides/index.js → client/src/themes/overrides/CardActions.jsx
- `NotificationSection()` --calls--> `NotificationList()`  [EXTRACTED]
  client/src/layout/MainLayout/Header/NotificationSection/index.jsx → client/src/layout/MainLayout/Header/NotificationSection/NotificationList.jsx
- `verifyToken()` --calls--> `isSessionActive()`  [EXTRACTED]
  server/src/common/middlewares/authjwt.middleware.js → server/src/common/services/session.service.js

## Import Cycles
- None detected.

## Communities (136 total, 49 thin omitted)

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
Cohesion: 0.09
Nodes (29): bcrypt, ref_crypto, getEffectivePermissionIds(), backoff(), runTransaction(), withTransaction(), comparePassword(), hashPassword() (+21 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (37): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+29 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (50): applyContacts(), assertAddressTypes(), assertAssignmentDate(), assertContacts(), assertProviderAssignable(), assertWorkAssignable(), ASSIGNMENT_IDEMPOTENCY, ASSIGNMENT_LIST_SELECT (+42 more)

### Community 7 - "AuthForgotPassword.jsx"
Cohesion: 0.07
Nodes (38): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), client_src_assets_images_interve, AuthProvider() (+30 more)

### Community 8 - "showError"
Cohesion: 0.10
Nodes (31): deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), paginationUsersAPI(), saveUserAPI() (+23 more)

### Community 9 - "WorkFormPage.jsx"
Cohesion: 0.13
Nodes (24): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), EditableList(), filterOptions, SearchSelect(), SelectSocket() (+16 more)

### Community 10 - "createContract"
Cohesion: 0.20
Nodes (21): toMoney(), toDateOnly(), assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditableConcept() (+13 more)

### Community 11 - "audit.service.js"
Cohesion: 0.10
Nodes (35): ADR-0013, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0027 (+27 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "masterRouter.utils.js"
Cohesion: 0.10
Nodes (25): verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), getContractTypeFieldsSchema, saveContractTypeFieldsSchema (+17 more)

### Community 14 - "client/package.json"
Cohesion: 0.08
Nodes (26): browserslist, development, production, name, packageManager, private, version, volta (+18 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (14): admin, icons, dashboard, icons, menuItems, icons, other, icons (+6 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.12
Nodes (20): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0001, ADR-0009 (+12 more)

### Community 17 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 18 - "contractTypeFields.service.js"
Cohesion: 0.29
Nodes (13): CATALOG_SELECT, currentRows(), desiredRows(), findType(), getContractTypeFields(), httpError(), ADR-0006, loadCatalog() (+5 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "MainLayout/index.jsx"
Cohesion: 0.06
Nodes (51): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI() (+43 more)

### Community 21 - "auditContext"
Cohesion: 0.10
Nodes (33): auditContext(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS (+25 more)

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
Cohesion: 0.12
Nodes (36): applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted(), assertHeader(), assertManagerUsers(), assertMasters() (+28 more)

### Community 26 - "works.routes.js"
Cohesion: 0.13
Nodes (18): IDEMPOTENCY_HEADER, changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, saveWorkController (+10 more)

### Community 27 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.17
Nodes (10): ALL, contact(), ctx, existingRow, input(), ADR-0012, prismaMock, state (+2 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.07
Nodes (19): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+11 more)

### Community 30 - "users.service.js"
Cohesion: 0.09
Nodes (26): ADR-0004, ADR-0008, ADR-0027, DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError() (+18 more)

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
Cohesion: 0.13
Nodes (16): @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), buildLockPlan() (+8 more)

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.30
Nodes (12): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+4 more)

### Community 37 - "idempotency.service.js"
Cohesion: 0.15
Nodes (18): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+10 more)

### Community 38 - "ProviderFormPage.jsx"
Cohesion: 0.12
Nodes (31): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, getProviderTypesSelectAPI, DateField(), toDate() (+23 more)

### Community 39 - "SocketProvider.jsx"
Cohesion: 0.19
Nodes (11): refreshSession(), App(), AuthContext, NavigationScroll(), SocketContext, SocketProvider(), pathSocket, urlSocket (+3 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.08
Nodes (11): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, prismaMock (+3 more)

### Community 41 - "contractTerms.js"
Cohesion: 0.11
Nodes (16): ADR-0026, @prisma/client, MONEY_SCALE, CONCEPT_TYPE_NAMES, CONCEPT_TYPES, CONTRACT_STATES, CONTRACT_TRANSITIONS, DENIED (+8 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 48 - "httpCliente.js"
Cohesion: 0.10
Nodes (19): getContractTypeFieldsAPI(), saveContractTypeFieldsAPI(), identityDocumentsApi, getInsurersSelectAPI, getPermissionsCatalogAPI(), genericRequest, instance, NO_REFRESH_URLS (+11 more)

### Community 49 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 50 - "server.js"
Cohesion: 0.19
Nodes (11): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, registeredTasks (+3 more)

### Community 51 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.09
Nodes (43): contractConceptsApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, findOption() (+35 more)

### Community 53 - "master.service.js"
Cohesion: 0.09
Nodes (33): ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, capitalize(), createMasterService(), httpError(), ADR-0004, ADR-0013 (+25 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "contractFields.js"
Cohesion: 0.33
Nodes (8): enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, sameValue()

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (26): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+18 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "constants.js"
Cohesion: 0.07
Nodes (51): getStatusesByScopeAPI(), workProvidersApi, ContractsPage, useSocket(), DataList(), Figure(), Pending(), RouteDialog() (+43 more)

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
Cohesion: 0.17
Nodes (24): activeSequence(), amendmentResult(), assertStartDate(), auditAct(), conceptTarget(), configuredConcept(), createAmendment(), createLiquidation() (+16 more)

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "WorksPage.jsx"
Cohesion: 0.14
Nodes (9): getWorksSummaryAPI(), worksApi, MoneyField(), moneyInputText(), parseMoneyInput(), WorksSummary(), COLUMNS, ADR-0011 (+1 more)

### Community 70 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (8): created, DATABASE, declared, dropped, inDatabase, MIGRATIONS, sql, withMessage

### Community 71 - "users.controller.test.js"
Cohesion: 0.33
Nodes (4): forgedAuthor, ADR-0013, mockRevokeSession, usersServiceMock

### Community 73 - "dateOnlyText"
Cohesion: 0.17
Nodes (18): ADR-0015, sumMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel() (+10 more)

### Community 88 - "uniqueConstraints.constants.js"
Cohesion: 0.50
Nodes (3): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES

### Community 89 - "`tbl_status`"
Cohesion: 0.16
Nodes (10): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+2 more)

### Community 94 - "react"
Cohesion: 0.04
Nodes (68): addressTypesApi, constructionCompaniesApi, contractTypesApi, insurersApi, providersApi, providerTypesApi, supervisionTypesApi, getBasicInformationAPI() (+60 more)

### Community 100 - "permissions.service.test.js"
Cohesion: 0.50
Nodes (3): mockGetEffectivePermissionIds, mockGetIO, prismaMock

### Community 101 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 104 - "`tbl_contracts`"
Cohesion: 0.07
Nodes (24): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+16 more)

### Community 105 - "getIO"
Cohesion: 0.09
Nodes (28): getIO(), FIELD_ATTRIBUTES, getContractTypeFieldsController, pickField(), saveContractTypeFieldsController, getNotificationCountController(), listNotificationsController(), markAllAsReadController() (+20 more)

### Community 108 - "contracts.service.js"
Cohesion: 0.11
Nodes (30): moneyText(), valueText(), conceptDto(), conceptsDto(), CONTRACT_AUDITED, countByState(), currentValueText(), getContract() (+22 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 116 - "@mui/material"
Cohesion: 0.10
Nodes (26): DashboardDefault, appDrawerWidth, gridSpacing, CardGrid(), CardSecondaryAction(), headerStyle, MainCard(), SubCard() (+18 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.24
Nodes (15): ADR-0012, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS (+7 more)

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 124 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "permissions.constants.js"
Cohesion: 0.06
Nodes (44): ADR-0006, ADR-0011, ADR-0018, express, ADR-0006, ADR-0012, ADR-0016, PERMISSIONS (+36 more)

### Community 130 - "seed.js"
Cohesion: 0.17
Nodes (10): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES (+2 more)

### Community 132 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 133 - "contracts.service.test.js"
Cohesion: 0.07
Nodes (22): CONFIGURABLE_FIELDS, resolveFields(), CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row() (+14 more)

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 139 - "status.service.test.js"
Cohesion: 0.33
Nodes (4): ref_fs, catalog, expected, prismaMock

## Knowledge Gaps
- **635 isolated node(s):** `INTERNAL_UNIQUE_CONSTRAINTS`, `PRISMA_ERRORS`, `LOCK_WAIT_TIMEOUT`, `ADR-0027`, `ADR-0012` (+630 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 883 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **49 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `master.service.js`, `server/package.json`?**
  _High betweenness centrality (0.210) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `ContactsEditor.jsx`, `DocumentManagement.jsx`, `constants.js`, `WorksPage.jsx`, `AuthForgotPassword.jsx`, `showError`, `WorkFormPage.jsx`, `ProviderFormPage.jsx`, `client/package.json`, `EasyCrop.jsx`, `httpCliente.js`, `MainLayout/index.jsx`, `ContractFormPage.jsx`, `FilterPopper.jsx`, `InputLabel.jsx`, `DebouncedInput.jsx`, `react`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `overrides/index.js`, `ContactsEditor.jsx`, `DocumentManagement.jsx`, `constants.js`, `ProviderFormPage.jsx`, `SocketProvider.jsx`, `AuthForgotPassword.jsx`, `showError`, `WorkFormPage.jsx`, `WorksPage.jsx`, `client/package.json`, `EasyCrop.jsx`, `httpCliente.js`, `@mui/material`, `MainLayout/index.jsx`, `FilterPopper.jsx`, `ContractFormPage.jsx`, `DebouncedInput.jsx`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **What connects `INTERNAL_UNIQUE_CONSTRAINTS`, `PRISMA_ERRORS`, `LOCK_WAIT_TIMEOUT` to the rest of the system?**
  _635 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05403508771929825 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `auth.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09388335704125178 - nodes in this community are weakly interconnected._
# Graph Report - WEBPAC-INTERVE  (2026-09-30)

## Corpus Check
- 332 files · ~99,144 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 1485 nodes · 3174 edges · 118 communities (78 shown, 40 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f97f8e68`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- images.js
- auth.service.js
- dependencies
- server/package.json
- withAlpha
- authContext.jsx
- usersApi.js
- constants.js
- showError
- users.service.js
- auth.routes.js
- useAuth
- client/package.json
- menu-items/index.js
- validation.utils.js
- session.service.js
- master.service.js
- compilerOptions
- @mui/material
- themes/index.jsx
- ConfigContext.jsx
- `tbl_users`
- app.js
- permissions.routes.js
- EasyCrop.jsx
- MainLayout/index.jsx
- DocumentManagement.jsx
- masterRouter.utils.test.js
- requests/index.js
- mailerService.js
- error.middleware.js
- seed.js
- AddressTypePage.jsx
- UserDialog.jsx
- authjwt.middleware.test.js
- transaction.service.test.js
- audit.service.js
- react
- ref_jest_globals
- eslint.config.mjs
- devDependencies
- IdentityDocumentPage.jsx
- src/index.jsx
- MainRoutes.jsx
- scripts
- main.routes.js
- DebouncedInput.jsx
- identityDocuments.formats.js
- server.js
- app.routes.js
- masterRouter.utils.js
- transaction.service.js
- notifications.routes.js
- session.service.test.js
- transaction.mock.js
- scripts
- winston.config.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- ConstructionCompanyPage.jsx
- extends
- socket.js
- browserslist
- volta
- volta
- users.service.test.js
- `tbl_status`
- ProviderTypePage.jsx
- SupervisionTypePage.jsx
- auth.service.test.js
- insurers.service.js
- identityDocuments.service.js
- auth.controller.test.js
- Default/index.jsx
- permissions.service.test.js
- InputLabel.jsx
- `tbl_address_types`
- `tbl_construction_companies`
- `tbl_identity_documents`
- `tbl_insurers`
- `tbl_provider_types`
- `tbl_supervision_types`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 72 edges
2. `react` - 52 edges
3. `useAuth()` - 33 edges
4. `ComponentsOverrides()` - 27 edges
5. `@tabler/icons-react` - 24 edges
6. `writeAudit()` - 23 edges
7. `MasterPage()` - 22 edges
8. `showError()` - 21 edges
9. `react-router-dom` - 20 edges
10. `withLockedTransaction()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `ComponentsOverrides()` --indirect_call--> `CardActions()`  [INFERRED]
  client/src/themes/overrides/index.js → client/src/themes/overrides/CardActions.jsx
- `ThemeCustomization()` --calls--> `ComponentsOverrides()`  [EXTRACTED]
  client/src/themes/index.jsx → client/src/themes/overrides/index.js
- `ComponentsOverrides()` --calls--> `Alert()`  [EXTRACTED]
  client/src/themes/overrides/index.js → client/src/themes/overrides/Alert.jsx
- `ComponentsOverrides()` --calls--> `Chip()`  [EXTRACTED]
  client/src/themes/overrides/index.js → client/src/themes/overrides/Chip.jsx
- `DocumentManagement()` --calls--> `showError()`  [EXTRACTED]
  client/src/ui-component/DocumentManagement.jsx → client/src/services/ToastService.js

## Import Cycles
- None detected.

## Communities (118 total, 40 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "images.js"
Cohesion: 0.23
Nodes (8): ref_fs, ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 3 - "auth.service.js"
Cohesion: 0.10
Nodes (29): bcrypt, ref_crypto, getEffectivePermissionIds(), backoff(), runTransaction(), withTransaction(), comparePassword(), hashPassword() (+21 more)

### Community 4 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+27 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+27 more)

### Community 6 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 7 - "authContext.jsx"
Cohesion: 0.07
Nodes (43): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), refreshSession() (+35 more)

### Community 8 - "usersApi.js"
Cohesion: 0.13
Nodes (6): genericRequest, instance, NO_REFRESH_URLS, refreshClient, ref_axios, js-cookie

### Community 9 - "constants.js"
Cohesion: 0.14
Nodes (16): SocketContext, useSocket(), FilterPopper(), normalizeOptions(), SocketDropdownFilter(), RequiredLabel(), SelectSocket(), TooltipLongText() (+8 more)

### Community 10 - "showError"
Cohesion: 0.17
Nodes (20): getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), defaultConfig, showError(), showInfo(), showObligatorios(), showSuccess() (+12 more)

### Community 11 - "users.service.js"
Cohesion: 0.10
Nodes (25): AUDIT_ENTITIES, AUDIT_OPERATIONS, newOperationId(), withLockedTransaction(), deleteModuleDoc(), auditPermissionChanges(), ADR-0013, ADR-0027 (+17 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.16
Nodes (23): jsonwebtoken, auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController() (+15 more)

### Community 13 - "useAuth"
Cohesion: 0.24
Nodes (14): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), useAuth(), NotificationSection(), PrivateRoute(), MasterPage() (+6 more)

### Community 14 - "client/package.json"
Cohesion: 0.10
Nodes (20): axios, moment, name, packageManager, private, version, apexcharts, @emotion/react (+12 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.11
Nodes (13): admin, icons, dashboard, icons, menuItems, icons, other, icons (+5 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.11
Nodes (24): express-validator, createMasterSchemas(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0009, ADR-0027, nullable (+16 more)

### Community 17 - "session.service.js"
Cohesion: 0.16
Nodes (19): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+11 more)

### Community 18 - "master.service.js"
Cohesion: 0.07
Nodes (45): ADR-0003, ADR-0013, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027 (+37 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "@mui/material"
Cohesion: 0.17
Nodes (14): gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard(), Avatar(), SamplePage(), ColorBox() (+6 more)

### Community 21 - "themes/index.jsx"
Cohesion: 0.33
Nodes (6): createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor, Typography()

### Community 22 - "ConfigContext.jsx"
Cohesion: 0.27
Nodes (7): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage()

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (14): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, ref_url, __dirname (+6 more)

### Community 25 - "permissions.routes.js"
Cohesion: 0.23
Nodes (13): getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController(), permissionsRoutes (+5 more)

### Community 27 - "MainLayout/index.jsx"
Cohesion: 0.09
Nodes (42): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), setParentOpenedMenu(), useMenuCollapse() (+34 more)

### Community 28 - "DocumentManagement.jsx"
Cohesion: 0.09
Nodes (18): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+10 more)

### Community 29 - "masterRouter.utils.test.js"
Cohesion: 0.10
Nodes (14): config, emit, forged, serviceMock, mockReq(), mockDelete, mockSave, forgedAuthor (+6 more)

### Community 30 - "requests/index.js"
Cohesion: 0.31
Nodes (5): getAddressTypesSelectAPI, getInsurersSelectAPI, insurersApi, getProviderTypesSelectAPI, createMasterApi()

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "error.middleware.js"
Cohesion: 0.28
Nodes (11): concurrencyError(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS, driverCause(), driverErrorCode() (+3 more)

### Community 33 - "seed.js"
Cohesion: 0.18
Nodes (9): ADDRESS_TYPES, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES, SUPERVISION_TYPES (+1 more)

### Community 34 - "AddressTypePage.jsx"
Cohesion: 0.29
Nodes (5): addressTypesApi, AddressTypePage, COLUMNS, FORM_FIELDS, ADR-0009

### Community 35 - "UserDialog.jsx"
Cohesion: 0.20
Nodes (16): getIdentityDocumentsSelectAPI, getModulesAPI(), getProfilesAPI(), saveProfileAPI(), saveUserAPI(), fallbackUuid(), idempotencyConfig(), ADR-0027 (+8 more)

### Community 36 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 37 - "transaction.service.test.js"
Cohesion: 0.26
Nodes (7): ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout()

### Community 38 - "audit.service.js"
Cohesion: 0.19
Nodes (16): auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0013, ADR-0027, protect(), REDACTED (+8 more)

### Community 39 - "react"
Cohesion: 0.13
Nodes (24): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), ConfirmDialog(), DataTable(), LastModifiedCell() (+16 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.09
Nodes (10): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, forged (+2 more)

### Community 41 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 43 - "IdentityDocumentPage.jsx"
Cohesion: 0.29
Nodes (5): identityDocumentsApi, IdentityDocumentPage, COLUMNS, FORM_FIELDS, ADR-0008

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "MainRoutes.jsx"
Cohesion: 0.22
Nodes (7): InsurerPage, ProfilesPage, UsersPage, COLUMNS, FORM_FIELDS, ADR-0003, react-router

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "main.routes.js"
Cohesion: 0.10
Nodes (20): ADR-0006, ADR-0011, defineMaster(), addressTypesRoutes, addressTypesConfig, addressTypesService, ADR-0009, constructionCompaniesRoutes (+12 more)

### Community 49 - "identityDocuments.formats.js"
Cohesion: 0.24
Nodes (8): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, nitCheckDigit(), ADR-0008

### Community 50 - "server.js"
Cohesion: 0.24
Nodes (9): ref_http, node-cron, app, server, cronJobs, registeredTasks, startCronJobs(), stopCronJobs() (+1 more)

### Community 51 - "app.routes.js"
Cohesion: 0.26
Nodes (9): getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001, getStatusesByScopeSchema (+1 more)

### Community 52 - "masterRouter.utils.js"
Cohesion: 0.14
Nodes (22): ADR-0001, express, PERMISSIONS, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER (+14 more)

### Community 53 - "transaction.service.js"
Cohesion: 0.10
Nodes (20): @prisma/client, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), buildLockPlan() (+12 more)

### Community 54 - "notifications.routes.js"
Cohesion: 0.14
Nodes (19): getIO(), getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount() (+11 more)

### Community 55 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 56 - "transaction.mock.js"
Cohesion: 0.08
Nodes (20): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+12 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

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

### Community 66 - "ConstructionCompanyPage.jsx"
Cohesion: 0.25
Nodes (6): constructionCompaniesApi, getConstructionCompaniesSelectAPI, ConstructionCompanyPage, COLUMNS, FORM_FIELDS, ADR-0004

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "socket.js"
Cohesion: 0.31
Nodes (8): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), isSessionActive()

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

### Community 93 - "ProviderTypePage.jsx"
Cohesion: 0.29
Nodes (5): providerTypesApi, ProviderTypePage, COLUMNS, FORM_FIELDS, ADR-0010

### Community 94 - "SupervisionTypePage.jsx"
Cohesion: 0.25
Nodes (6): getSupervisionTypesSelectAPI, supervisionTypesApi, SupervisionTypePage, COLUMNS, FORM_FIELDS, ADR-0007

### Community 95 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 100 - "insurers.service.js"
Cohesion: 0.38
Nodes (5): ADR-0018, insurersRoutes, insurersConfig, insurersService, ADR-0003

### Community 101 - "identityDocuments.service.js"
Cohesion: 0.38
Nodes (5): identityDocumentsRoutes, identityDocumentsConfig, identityDocumentsService, ADR-0008, ADR-0013

### Community 104 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 105 - "Default/index.jsx"
Cohesion: 0.47
Nodes (4): DashboardDefault, CardGrid(), Dashboard(), testCards

### Community 106 - "permissions.service.test.js"
Cohesion: 0.50
Nodes (3): mockGetEffectivePermissionIds, mockGetIO, prismaMock

## Knowledge Gaps
- **455 isolated node(s):** `axios`, `@azure/identity`, `bcrypt`, `compression`, `cookie-parser` (+450 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 603 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `master.service.js`, `server/package.json`?**
  _High betweenness centrality (0.419) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `UserDialog.jsx`, `withAlpha`, `authContext.jsx`, `react`, `constants.js`, `showError`, `Default/index.jsx`, `InputLabel.jsx`, `useAuth`, `client/package.json`, `DebouncedInput.jsx`, `themes/index.jsx`, `EasyCrop.jsx`, `MainLayout/index.jsx`, `DocumentManagement.jsx`?**
  _High betweenness centrality (0.274) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `UserDialog.jsx`, `authContext.jsx`, `constants.js`, `showError`, `useAuth`, `client/package.json`, `MainRoutes.jsx`, `DebouncedInput.jsx`, `@mui/material`, `themes/index.jsx`, `ConfigContext.jsx`, `EasyCrop.jsx`, `MainLayout/index.jsx`, `DocumentManagement.jsx`?**
  _High betweenness centrality (0.226) - this node is a cross-community bridge._
- **What connects `axios`, `@azure/identity`, `bcrypt` to the rest of the system?**
  _455 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `auth.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09672830725462304 - nodes in this community are weakly interconnected._
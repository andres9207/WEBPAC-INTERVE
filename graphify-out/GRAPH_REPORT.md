# Graph Report - WEBPAC-INTERVE  (2026-09-29)

## Corpus Check
- 287 files · ~89,763 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 1333 nodes · 2886 edges · 104 communities (80 shown, 24 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f773e4da`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- images.js
- auth.service.js
- dependencies
- server/package.json
- ProfilePage.jsx
- authContext.jsx
- profiles.service.js
- ProfileDialog.jsx
- usersApi.js
- masterRouter.utils.js
- auth.routes.js
- idempotency.service.js
- client/package.json
- @tabler/icons-react
- validation.utils.js
- session.service.js
- master.service.js
- compilerOptions
- NotificationSection/index.jsx
- UserDialog.jsx
- react
- `tbl_users`
- app.js
- permissions.routes.js
- @mui/material
- MainLayout/index.jsx
- transaction.service.js
- users.controller.test.js
- auth.controller.test.js
- mailerService.js
- identityDocuments.service.js
- profiles.routes.js
- audit.service.js
- DocumentManagement.jsx
- SocketProvider.jsx
- users.service.js
- AuthenticationRoutes.jsx
- authjwt.middleware.test.js
- ref_jest_globals
- eslint.config.mjs
- devDependencies
- IdentityDocumentPage.jsx
- src/index.jsx
- ForgotPassword.jsx
- scripts
- socket.js
- handleFirebase.js
- formatTime.js
- server.js
- app.routes.js
- error.middleware.js
- prismaClient.js
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
- users.service.test.js
- extends
- DebouncedInput.jsx
- browserslist
- volta
- volta
- react-router-dom
- `tbl_identity_documents`
- transaction.service.test.js
- users.routes.js
- auth.service.test.js
- ProfileSection/index.jsx
- seed.js
- MenuList/index.jsx
- ImageList.jsx
- master.service.test.js
- permissions.controller.test.js
- StatusTabs.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 71 edges
2. `react` - 51 edges
3. `ComponentsOverrides()` - 27 edges
4. `writeAudit()` - 23 edges
5. `@tabler/icons-react` - 23 edges
6. `useAuth()` - 21 edges
7. `showError()` - 21 edges
8. `react-router-dom` - 20 edges
9. `auditContext()` - 19 edges
10. `MainCard()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `PrivateRoute()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/routes/PrivateRoute.jsx → client/src/contexts/authContext.jsx
- `saveIdentityDocumentAPI()` --calls--> `idempotencyConfig()`  [EXTRACTED]
  client/src/api/requests/identityDocumentsApi.js → client/src/utils/idempotency.js
- `IdentityDocumentPage()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/views/admin/identityDocuments/IdentityDocumentPage.jsx → client/src/contexts/authContext.jsx
- `IdentityDocumentPage()` --calls--> `showError()`  [EXTRACTED]
  client/src/views/admin/identityDocuments/IdentityDocumentPage.jsx → client/src/services/ToastService.js

## Import Cycles
- None detected.

## Communities (104 total, 24 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.06
Nodes (37): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Avatar() (+29 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "images.js"
Cohesion: 0.23
Nodes (8): ref_fs, ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 3 - "auth.service.js"
Cohesion: 0.13
Nodes (22): ref_crypto, REDACTED, getEffectivePermissionIds(), deriveKey(), generateResetCode(), hashResetCode(), ADR-0001, verifyResetCode() (+14 more)

### Community 4 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+27 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+27 more)

### Community 6 - "ProfilePage.jsx"
Cohesion: 0.17
Nodes (20): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), useAuth(), IdentityDocumentPage, ProfilesPage (+12 more)

### Community 7 - "authContext.jsx"
Cohesion: 0.10
Nodes (29): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), App() (+21 more)

### Community 8 - "profiles.service.js"
Cohesion: 0.13
Nodes (20): AUDIT_ENTITIES, AUDIT_OPERATIONS, newOperationId(), writeAudit(), withLockedTransaction(), updateAccount(), updatePassword(), auditPermissionChanges() (+12 more)

### Community 9 - "ProfileDialog.jsx"
Cohesion: 0.21
Nodes (18): getModulesAPI(), saveProfileAPI(), getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), showSuccess(), Accordion(), BaseDialog() (+10 more)

### Community 10 - "usersApi.js"
Cohesion: 0.12
Nodes (6): genericRequest, instance, NO_REFRESH_URLS, refreshClient, ref_axios, js-cookie

### Community 11 - "masterRouter.utils.js"
Cohesion: 0.17
Nodes (14): verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), deleteModuleDoc(), paginationModuleDocs() (+6 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "idempotency.service.js"
Cohesion: 0.15
Nodes (18): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+10 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (22): axios, moment, name, packageManager, private, version, apexcharts, @emotion/react (+14 more)

### Community 15 - "@tabler/icons-react"
Cohesion: 0.12
Nodes (16): admin, icons, dashboard, icons, menuItems, icons, other, icons (+8 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.13
Nodes (19): express-validator, createMasterSchemas(), idArray(), idempotencyKeyRule(), ADR-0001, ADR-0027, nullable, optionalId() (+11 more)

### Community 17 - "session.service.js"
Cohesion: 0.16
Nodes (19): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+11 more)

### Community 18 - "master.service.js"
Cohesion: 0.13
Nodes (19): ADR-0003, ACTIVE_STATUS, capitalize(), createMasterService(), DELETED_STATUS, httpError(), INACTIVE_STATUS, ADR-0013 (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "NotificationSection/index.jsx"
Cohesion: 0.13
Nodes (23): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), DashboardDefault, appDrawerWidth, gridSpacing (+15 more)

### Community 21 - "UserDialog.jsx"
Cohesion: 0.29
Nodes (8): getIdentityDocumentsSelectAPI(), getProfilesAPI(), saveUserAPI(), defaultConfig, showInfo(), showObligatorios(), ADR-0008, UserDialog

### Community 22 - "react"
Cohesion: 0.13
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage(), Typography() (+2 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (15): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, ref_url, __dirname (+7 more)

### Community 25 - "permissions.routes.js"
Cohesion: 0.21
Nodes (14): PERMISSIONS, getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController() (+6 more)

### Community 26 - "@mui/material"
Cohesion: 0.22
Nodes (7): PrivateRoute(), ConfirmDialog(), BInputLabel, InputLabel(), TableActions(), @mui/material, ref_prop_types

### Community 27 - "MainLayout/index.jsx"
Cohesion: 0.24
Nodes (14): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), Footer(), Header(), MainLayout(), LogoSection() (+6 more)

### Community 28 - "transaction.service.js"
Cohesion: 0.22
Nodes (12): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+4 more)

### Community 29 - "users.controller.test.js"
Cohesion: 0.14
Nodes (10): mockReq(), mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock, forgedAuthor, ADR-0013 (+2 more)

### Community 30 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "identityDocuments.service.js"
Cohesion: 0.27
Nodes (7): express, defineMaster(), identityDocumentsRoutes, identityDocumentsConfig, identityDocumentsService, ADR-0008, ADR-0013

### Community 33 - "profiles.routes.js"
Cohesion: 0.18
Nodes (13): getIO(), IDEMPOTENCY_HEADER, insertNotification(), deleteProfileController(), getModulesController(), ADR-0027, paginationProfilesController(), saveProfileController() (+5 more)

### Community 34 - "audit.service.js"
Cohesion: 0.22
Nodes (13): auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0013, ADR-0027, protect(), SENSITIVE_FIELDS (+5 more)

### Community 35 - "DocumentManagement.jsx"
Cohesion: 0.23
Nodes (15): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+7 more)

### Community 36 - "SocketProvider.jsx"
Cohesion: 0.15
Nodes (16): refreshSession(), SocketContext, SocketProvider(), useSocket(), FilterPopper(), normalizeOptions(), SocketDropdownFilter(), RequiredLabel() (+8 more)

### Community 37 - "users.service.js"
Cohesion: 0.12
Nodes (16): bcrypt, comparePassword(), hashPassword(), restorePassword(), assertAssignableProfile(), AUDITED_USER_FIELDS, checkIfUserExists(), ADR-0008 (+8 more)

### Community 38 - "AuthenticationRoutes.jsx"
Cohesion: 0.18
Nodes (11): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router (+3 more)

### Community 39 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 40 - "ref_jest_globals"
Cohesion: 0.11
Nodes (7): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload

### Community 41 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 43 - "IdentityDocumentPage.jsx"
Cohesion: 0.29
Nodes (9): changeStatusIdentityDocumentAPI(), deleteIdentityDocumentAPI(), paginationIdentityDocumentsAPI(), saveIdentityDocumentAPI(), EMPTY_FORM, IdentityDocumentDialog, ADR-0008, IdentityDocumentPage() (+1 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "ForgotPassword.jsx"
Cohesion: 0.33
Nodes (8): client_src_assets_images_logo_interve, AppBar(), ElevationScroll(), Logo(), AuthCardWrapper(), AuthWrapper1, ForgotPassword(), Login()

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 47 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 48 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 50 - "server.js"
Cohesion: 0.24
Nodes (9): ref_http, node-cron, app, server, cronJobs, registeredTasks, startCronJobs(), stopCronJobs() (+1 more)

### Community 51 - "app.routes.js"
Cohesion: 0.26
Nodes (9): getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001, getStatusesByScopeSchema (+1 more)

### Community 52 - "error.middleware.js"
Cohesion: 0.28
Nodes (11): concurrencyError(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS, driverCause(), driverErrorCode() (+3 more)

### Community 53 - "prismaClient.js"
Cohesion: 0.15
Nodes (11): @prisma/client, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), getMenu() (+3 more)

### Community 54 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 55 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 56 - "transaction.mock.js"
Cohesion: 0.19
Nodes (9): lockedIdsOf(), transactionRawMocks(), ADR-0008, prismaMock, mockGetEffectivePermissionIds, mockGetIO, prismaMock, ctx (+1 more)

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

### Community 66 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 70 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 71 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 73 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 88 - "react-router-dom"
Cohesion: 0.42
Nodes (8): useConfig(), setParentOpenedMenu(), useMenuCollapse(), NavCollapse(), NavGroup(), NavItem(), @mui/icons-material, react-router-dom

### Community 89 - "`tbl_identity_documents`"
Cohesion: 0.40
Nodes (4): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_status`

### Community 93 - "transaction.service.test.js"
Cohesion: 0.26
Nodes (7): ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout()

### Community 94 - "users.routes.js"
Cohesion: 0.33
Nodes (7): ADR-0001, countUsersController(), deleteUserController(), ADR-0027, paginationUsersController(), saveUserController(), usersRoutes

### Community 95 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 96 - "ProfileSection/index.jsx"
Cohesion: 0.50
Nodes (5): ProfileSection(), HeaderAvatar(), MobileSearch(), SearchSection(), Transitions()

### Community 97 - "seed.js"
Cohesion: 0.25
Nodes (6): IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, STATUSES, VIEW_PERMISSIONS

### Community 98 - "MenuList/index.jsx"
Cohesion: 0.48
Nodes (5): getMenuAPI(), ElevationScroll(), HorizontalBar(), getIconByName(), MenuList()

### Community 99 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 100 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 101 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 102 - "StatusTabs.jsx"
Cohesion: 1.00
Nodes (3): chipBg(), chipText(), StatusTabs()

## Knowledge Gaps
- **402 isolated node(s):** `initialFilters`, `EMPTY_FORM`, `ADR-0008`, `PAGES`, `PERMISSIONS` (+397 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 526 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `profiles.service.js`, `server/package.json`?**
  _High betweenness centrality (0.423) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `ProfilePage.jsx`, `authContext.jsx`, `ProfileDialog.jsx`, `client/package.json`, `@tabler/icons-react`, `NotificationSection/index.jsx`, `UserDialog.jsx`, `@mui/material`, `MainLayout/index.jsx`, `DocumentManagement.jsx`, `SocketProvider.jsx`, `AuthenticationRoutes.jsx`, `IdentityDocumentPage.jsx`, `ForgotPassword.jsx`, `DebouncedInput.jsx`, `react-router-dom`, `ProfileSection/index.jsx`, `MenuList/index.jsx`, `StatusTabs.jsx`?**
  _High betweenness centrality (0.243) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `ProfilePage.jsx`, `authContext.jsx`, `ProfileDialog.jsx`, `client/package.json`, `@tabler/icons-react`, `NotificationSection/index.jsx`, `UserDialog.jsx`, `react`, `MainLayout/index.jsx`, `DocumentManagement.jsx`, `SocketProvider.jsx`, `AuthenticationRoutes.jsx`, `IdentityDocumentPage.jsx`, `ForgotPassword.jsx`, `DebouncedInput.jsx`, `react-router-dom`, `ProfileSection/index.jsx`, `MenuList/index.jsx`, `ImageList.jsx`, `StatusTabs.jsx`?**
  _High betweenness centrality (0.237) - this node is a cross-community bridge._
- **What connects `initialFilters`, `EMPTY_FORM`, `ADR-0008` to the rest of the system?**
  _402 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `auth.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.13105413105413105 - nodes in this community are weakly interconnected._
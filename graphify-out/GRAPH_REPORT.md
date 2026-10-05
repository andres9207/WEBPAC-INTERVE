# Graph Report - WEBPAC-INTERVE  (2026-10-05)

## Corpus Check
- 438 files · ~170,336 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 2257 nodes · 5585 edges · 152 communities (104 shown, 48 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 92 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `73aba78e`
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
- AuthenticationRoutes.jsx
- showError
- WorkFormPage.jsx
- usersApi.js
- audit.service.js
- auditContext
- masterRouter.utils.js
- client/package.json
- Breadcrumbs.jsx
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
- AuthForgotPassword.jsx
- providers.service.test.js
- request.mock.js
- users.service.js
- mailerService.js
- contracts.routes.js
- ContactsEditor.jsx
- withLockedTransaction
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- idempotency.service.js
- ProviderFormPage.jsx
- SocketProvider.jsx
- ref_jest_globals
- contractTerms.js
- devDependencies
- src/index.jsx
- MainCard
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
- contractConcepts.service.js
- extends
- formatNumber.js
- uniqueConstraints.constants.test.js
- withAlpha
- dateOnlyText
- uniqueConstraints.constants.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- react-router-dom
- socket.js
- `tbl_contracts`
- getIO
- contracts.service.js
- NotificationSection/index.jsx
- `tbl_works`
- `tbl_insurers`
- @mui/material
- `tbl_contracts`
- InputLabel.jsx
- error.middleware.js
- constant.js
- main.routes.js
- DebouncedInput.jsx
- works.service.test.js
- images.js
- permissions.constants.js
- status.constants.js
- seed.js
- httpCliente.js
- auth.service.test.js
- contractTypeFields.service.test.js
- themes/index.jsx
- ConfigContext.jsx
- contracts.service.test.js
- authjwt.middleware.test.js
- status.service.test.js
- MenuList/index.jsx
- auth.controller.test.js
- contracts.controller.test.js
- `tbl_work_stages`
- ImageList.jsx
- master.service.test.js
- permissions.controller.test.js
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
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `activeSequence()` --calls--> `sortConcepts()`  [EXTRACTED]
  server/src/modules/work/contracts/contractConcepts.service.js → server/src/modules/work/contracts/contractTerms.js
- `valueText()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractConcepts.service.js → server/src/common/utils/money.utils.js
- `valueText()` --calls--> `contractTotals()`  [EXTRACTED]
  server/src/modules/work/contracts/contractConcepts.service.js → server/src/modules/work/contracts/contractTerms.js

## Import Cycles
- None detected.

## Communities (152 total, 48 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "transaction.service.test.js"
Cohesion: 0.19
Nodes (11): ref_path, ref_url, status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT (+3 more)

### Community 3 - "auth.service.js"
Cohesion: 0.12
Nodes (27): bcrypt, writeAudit(), revokeSession(), withTransaction(), comparePassword(), hashPassword(), deriveKey(), generateResetCode() (+19 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (34): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+26 more)

### Community 6 - "providers.service.js"
Cohesion: 0.10
Nodes (48): applyContacts(), assertAddressTypes(), assertAssignmentDate(), assertContacts(), assertProviderAssignable(), assertWorkAssignable(), ASSIGNMENT_IDEMPOTENCY, ASSIGNMENT_LIST_SELECT (+40 more)

### Community 7 - "AuthenticationRoutes.jsx"
Cohesion: 0.12
Nodes (19): client_src_assets_images_interve, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+11 more)

### Community 8 - "showError"
Cohesion: 0.16
Nodes (25): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), defaultConfig, showError(), showInfo(), showObligatorios() (+17 more)

### Community 9 - "WorkFormPage.jsx"
Cohesion: 0.18
Nodes (19): getConstructionCompaniesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), EditableList(), SearchSelect(), SelectSocket(), ManagerDialog(), ManagersTable() (+11 more)

### Community 10 - "usersApi.js"
Cohesion: 0.15
Nodes (14): getBasicInformationAPI(), saveUserAPI(), updateAccountAPI(), updatePasswordAPI(), Accordion(), BaseDialog(), findOption(), flattenOptions() (+6 more)

### Community 11 - "audit.service.js"
Cohesion: 0.08
Nodes (29): ADR-0013, @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection() (+21 more)

### Community 12 - "auditContext"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "masterRouter.utils.js"
Cohesion: 0.10
Nodes (25): verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), getContractTypeFieldsSchema, saveContractTypeFieldsSchema (+17 more)

### Community 14 - "client/package.json"
Cohesion: 0.06
Nodes (33): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+25 more)

### Community 15 - "Breadcrumbs.jsx"
Cohesion: 0.09
Nodes (16): admin, icons, dashboard, icons, menuItems, icons, other, icons (+8 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.12
Nodes (19): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0001, ADR-0009 (+11 more)

### Community 17 - "session.service.js"
Cohesion: 0.15
Nodes (18): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+10 more)

### Community 18 - "contractTypeFields.service.js"
Cohesion: 0.27
Nodes (12): CATALOG_SELECT, currentRows(), desiredRows(), findType(), getContractTypeFields(), httpError(), ADR-0006, loadCatalog() (+4 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "MainLayout/index.jsx"
Cohesion: 0.26
Nodes (11): handlerDrawerOpen(), useConfig(), Footer(), Header(), ProfileSection(), MainLayout(), LogoSection(), MainContentStyled (+3 more)

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
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.10
Nodes (43): toMoney(), applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted(), assertHeader(), assertManagerUsers() (+35 more)

### Community 26 - "works.routes.js"
Cohesion: 0.14
Nodes (17): changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, saveWorkController, selectWorkManagersController (+9 more)

### Community 27 - "AuthForgotPassword.jsx"
Cohesion: 0.22
Nodes (14): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber(), hasSpecial() (+6 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.17
Nodes (10): ALL, contact(), ctx, existingRow, input(), ADR-0012, prismaMock, state (+2 more)

### Community 29 - "request.mock.js"
Cohesion: 0.08
Nodes (18): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+10 more)

### Community 30 - "users.service.js"
Cohesion: 0.09
Nodes (26): ADR-0004, ADR-0008, ADR-0027, DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError() (+18 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.08
Nodes (34): IDEMPOTENCY_HEADER, moneyRule(), percentRule(), ACT_FIELDS, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController, createLiquidationController (+26 more)

### Community 33 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 34 - "withLockedTransaction"
Cohesion: 0.14
Nodes (19): diffFields(), backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+11 more)

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 37 - "idempotency.service.js"
Cohesion: 0.15
Nodes (18): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+10 more)

### Community 38 - "ProviderFormPage.jsx"
Cohesion: 0.10
Nodes (31): getIdentityDocumentsSelectAPI, getInsurersSelectAPI, getModulesAPI(), getProfilesAPI(), saveProfileAPI(), checkProviderIdentificationAPI(), ADR-0012, providersApi (+23 more)

### Community 39 - "SocketProvider.jsx"
Cohesion: 0.14
Nodes (16): loginAPI(), logoutAPI(), verifyTokenAPI(), refreshSession(), App(), AuthContext, AuthProvider(), getStoredUser() (+8 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.07
Nodes (12): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, prismaMock (+4 more)

### Community 41 - "contractTerms.js"
Cohesion: 0.09
Nodes (29): ADR-0026, @prisma/client, MONEY_SCALE, moneyText(), sumMoney(), conceptDto(), conceptsDto(), currentValueText() (+21 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "MainCard"
Cohesion: 0.21
Nodes (12): gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), Avatar(), SamplePage(), ColorBox(), UIColor() (+4 more)

### Community 46 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, db:seed, dev, pm2:logs, pm2:restart, pm2:start, pm2:stop (+4 more)

### Community 48 - "ContractTypeFieldsDialog.jsx"
Cohesion: 0.17
Nodes (15): contractTypesApi, getContractTypeFieldsAPI(), saveContractTypeFieldsAPI(), ContractTypePage, ContractTypeFieldsDialog(), DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+7 more)

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
Cohesion: 0.09
Nodes (42): contractConceptsApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, getContractTypesSelectAPI (+34 more)

### Community 53 - "master.service.js"
Cohesion: 0.12
Nodes (27): newOperationId(), capitalize(), createMasterService(), httpError(), ADR-0004, ADR-0013, ADR-0027, countByStatus() (+19 more)

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
Nodes (52): getStatusesByScopeAPI(), workProvidersApi, getWorksSummaryAPI(), worksApi, useAuth(), ContractsPage, WorksPage, PrivateRoute() (+44 more)

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
Cohesion: 0.19
Nodes (26): activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget(), configuredConcept(), createAmendment() (+18 more)

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "formatNumber.js"
Cohesion: 0.23
Nodes (3): MoneyField(), moneyInputText(), parseMoneyInput()

### Community 70 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (8): created, DATABASE, declared, dropped, inDatabase, MIGRATIONS, sql, withMessage

### Community 71 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 73 - "dateOnlyText"
Cohesion: 0.21
Nodes (17): ADR-0015, addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS (+9 more)

### Community 88 - "uniqueConstraints.constants.js"
Cohesion: 0.50
Nodes (3): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES

### Community 89 - "`tbl_status`"
Cohesion: 0.16
Nodes (10): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+2 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.04
Nodes (48): addressTypesApi, constructionCompaniesApi, identityDocumentsApi, insurersApi, providerTypesApi, supervisionTypesApi, AddressTypePage, ConstructionCompanyPage (+40 more)

### Community 100 - "react-router-dom"
Cohesion: 0.33
Nodes (10): endpoints, initialState, useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), NavCollapse(), NavGroup(), NavItem() (+2 more)

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
Nodes (37): resolveContractFields(), assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditableContract(), CONCEPT_AUDITED (+29 more)

### Community 112 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 116 - "@mui/material"
Cohesion: 0.10
Nodes (28): getAssignableWorksAPI(), getProvidersSelectAPI(), ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable(), filterOptions (+20 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.24
Nodes (15): ADR-0012, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS (+7 more)

### Community 120 - "constant.js"
Cohesion: 0.21
Nodes (9): closedMixin(), MiniDrawerStyled, openedMixin(), DashboardDefault, appDrawerWidth, drawerWidth, CardGrid(), Dashboard() (+1 more)

### Community 121 - "main.routes.js"
Cohesion: 0.21
Nodes (10): express, deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema, paginationDocsSchema, saveDocSchema (+2 more)

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 124 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "permissions.constants.js"
Cohesion: 0.06
Nodes (41): ADR-0006, ADR-0011, ADR-0018, ADR-0006, ADR-0012, ADR-0016, PERMISSIONS, defineMaster() (+33 more)

### Community 129 - "status.constants.js"
Cohesion: 0.23
Nodes (7): ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, getMenu(), PAGE_SELECT, toChild(), toParent()

### Community 130 - "seed.js"
Cohesion: 0.17
Nodes (10): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES (+2 more)

### Community 131 - "httpCliente.js"
Cohesion: 0.20
Nodes (7): getPermissionsCatalogAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient, axios, js-cookie

### Community 132 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 133 - "contractTypeFields.service.test.js"
Cohesion: 0.09
Nodes (16): CONFIGURABLE_FIELDS, resolveFields(), CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row() (+8 more)

### Community 134 - "themes/index.jsx"
Cohesion: 0.33
Nodes (6): createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor, Typography()

### Community 135 - "ConfigContext.jsx"
Cohesion: 0.27
Nodes (7): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage()

### Community 136 - "contracts.service.test.js"
Cohesion: 0.20
Nodes (6): ctx, ADR-0015, ADR-0017, prismaMock, state, storedContract

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 139 - "status.service.test.js"
Cohesion: 0.33
Nodes (4): ref_fs, catalog, expected, prismaMock

### Community 140 - "MenuList/index.jsx"
Cohesion: 0.36
Nodes (5): getMenuAPI(), ElevationScroll(), HorizontalBar(), getIconByName(), MenuList()

### Community 141 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 142 - "contracts.controller.test.js"
Cohesion: 0.29
Nodes (5): conceptsServiceMock, contractsServiceMock, emit, ADR-0015, ADR-0016

### Community 146 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 147 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 148 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

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
- **634 isolated node(s):** `ADR-0016`, `ADR-0015`, `ADR-0006`, `ADR-0017`, `ADR-0027` (+629 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 882 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **48 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `master.service.js`, `server/package.json`?**
  _High betweenness centrality (0.217) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `themes/index.jsx`, `AuthenticationRoutes.jsx`, `showError`, `WorkFormPage.jsx`, `usersApi.js`, `MenuList/index.jsx`, `client/package.json`, `Breadcrumbs.jsx`, `ImageList.jsx`, `MainLayout/index.jsx`, `FilterPopper.jsx`, `AuthForgotPassword.jsx`, `ContactsEditor.jsx`, `DocumentManagement.jsx`, `ProviderFormPage.jsx`, `MainCard`, `ContractTypeFieldsDialog.jsx`, `ContractFormPage.jsx`, `useAuth`, `formatNumber.js`, `withAlpha`, `MainRoutes.jsx`, `react-router-dom`, `NotificationSection/index.jsx`, `InputLabel.jsx`, `constant.js`, `DebouncedInput.jsx`?**
  _High betweenness centrality (0.166) - this node is a cross-community bridge._
- **Why does `react` connect `@mui/material` to `themes/index.jsx`, `ConfigContext.jsx`, `AuthenticationRoutes.jsx`, `showError`, `usersApi.js`, `WorkFormPage.jsx`, `MenuList/index.jsx`, `client/package.json`, `Breadcrumbs.jsx`, `MainLayout/index.jsx`, `FilterPopper.jsx`, `AuthForgotPassword.jsx`, `ContactsEditor.jsx`, `DocumentManagement.jsx`, `ProviderFormPage.jsx`, `SocketProvider.jsx`, `MainCard`, `ContractTypeFieldsDialog.jsx`, `ContractFormPage.jsx`, `useAuth`, `MainRoutes.jsx`, `react-router-dom`, `NotificationSection/index.jsx`, `DebouncedInput.jsx`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **What connects `ADR-0016`, `ADR-0015`, `ADR-0006` to the rest of the system?**
  _634 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `auth.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.11587301587301588 - nodes in this community are weakly interconnected._
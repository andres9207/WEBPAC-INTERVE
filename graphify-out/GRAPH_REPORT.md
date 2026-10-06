# Graph Report - WEBPAC-INTERVE  (2026-10-06)

## Corpus Check
- 475 files · ~199,570 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 2548 nodes · 6521 edges · 152 communities (96 shown, 56 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 104 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `204a0354`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- invoices.service.js
- writeAudit
- dependencies
- server/package.json
- providers.service.js
- seed.demo.js
- contractTypeFields.service.js
- eslint.config.mjs
- contractConcepts.service.js
- invoices.routes.js
- auditContext
- ToastService.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- permissions.constants.js
- auth.controller.test.js
- compilerOptions
- AuthForgotPassword.jsx
- providers.routes.js
- withAlpha
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- DebouncedInput.jsx
- providers.service.test.js
- request.mock.js
- session.service.js
- mailerService.js
- contracts.routes.js
- invoices.service.test.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- socket.js
- ProviderFormPage.jsx
- constants.js
- ref_jest_globals
- react
- devDependencies
- src/index.jsx
- @mui/material
- scripts
- volta
- `tbl_invoices`
- server.js
- app.routes.js
- ContractFormPage.jsx
- users.service.js
- `tbl_contract_type_fields`
- transaction.service.js
- transaction.mock.js
- scripts
- useAuth
- winston.config.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- contractSuspensions.service.test.js
- extends
- transaction.service.test.js
- auth.service.test.js
- MainLayout/index.jsx
- ContractTypeFieldsDialog.jsx
- EasyCrop.jsx
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- contracts.controller.test.js
- images.js
- `tbl_providers`
- notifications.routes.js
- contracts.service.js
- users.service.test.js
- `tbl_works`
- `tbl_insurers`
- WorkFormPage.jsx
- uniqueConstraints.constants.test.js
- browserslist
- error.middleware.js
- identityDocuments.service.js
- `tbl_providers`
- works.service.test.js
- status.service.test.js
- masterRouter.utils.js
- `tbl_contract_suspensions`
- seed.js
- `tbl_work_providers`
- uniqueConstraints.constants.js
- contracts.service.test.js
- `tbl_identity_documents`
- master.service.test.js
- authjwt.middleware.test.js
- `tbl_contract_concepts`
- InputLabel.jsx
- themes/index.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- masterRouter.utils.test.js
- FilterPopper.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 110 edges
2. `react` - 84 edges
3. `useAuth()` - 69 edges
4. `showError()` - 64 edges
5. `writeAudit()` - 51 edges
6. `showSuccess()` - 51 edges
7. `withLockedTransaction()` - 50 edges
8. `auditContext()` - 43 edges
9. `@tabler/icons-react` - 43 edges
10. `MasterPage()` - 36 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `InvoiceFormPage()` --calls--> `SearchSelect()`  [EXTRACTED]
  client/src/views/billing/invoices/InvoiceFormPage.jsx → client/src/ui-component/extended/SearchSelect.jsx
- `ConfigSelect()` --calls--> `SearchSelect()`  [EXTRACTED]
  client/src/views/work/contracts/components/configurableFields.jsx → client/src/ui-component/extended/SearchSelect.jsx
- `ContractFormPage()` --calls--> `SearchSelect()`  [EXTRACTED]
  client/src/views/work/contracts/ContractFormPage.jsx → client/src/ui-component/extended/SearchSelect.jsx
- `WorkProviderDialog()` --calls--> `SearchSelect()`  [EXTRACTED]
  client/src/views/work/providers/components/WorkProviderDialog.jsx → client/src/ui-component/extended/SearchSelect.jsx

## Import Cycles
- None detected.

## Communities (152 total, 56 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "invoices.service.js"
Cohesion: 0.08
Nodes (59): ADR-0023, approveInvoice(), assertContractStillAdmits(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditable() (+51 more)

### Community 3 - "writeAudit"
Cohesion: 0.06
Nodes (57): ADR-0001, ADR-0013, bcrypt, ref_crypto, auditMisuse(), buildRows(), diffFields(), ADR-0027 (+49 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (56): INACTIVE_STATUS, applyContacts(), applyProviderTypes(), assertAddressTypes(), assertAssignmentDate(), assertContacts(), assertIdentification(), assertProviderAssignable() (+48 more)

### Community 7 - "seed.demo.js"
Cohesion: 0.08
Nodes (24): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+16 more)

### Community 8 - "contractTypeFields.service.js"
Cohesion: 0.12
Nodes (22): AUDIT_ENTITIES, AUDIT_OPERATIONS, resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getContractTypeFields() (+14 more)

### Community 9 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 10 - "contractConcepts.service.js"
Cohesion: 0.13
Nodes (42): newOperationId(), activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget(), configuredConcept() (+34 more)

### Community 11 - "invoices.routes.js"
Cohesion: 0.12
Nodes (25): IDEMPOTENCY_HEADER, approveInvoiceController, cancelInvoiceController, getInvoiceController, getInvoiceFormOptionsController, INVOICE_FIELDS, notify(), paginationInvoicesController (+17 more)

### Community 12 - "auditContext"
Cohesion: 0.17
Nodes (22): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+14 more)

### Community 13 - "ToastService.js"
Cohesion: 0.07
Nodes (48): suspendContractAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, invoiceTransitionsApi, ADR-0017, getAssignableWorksAPI() (+40 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (22): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+14 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.12
Nodes (20): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0001, ADR-0009 (+12 more)

### Community 17 - "permissions.constants.js"
Cohesion: 0.05
Nodes (54): ADR-0018, express, ADR-0006, ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0020 (+46 more)

### Community 18 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.07
Nodes (39): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), App(), client_src_assets_images_interve (+31 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 22 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (59): ADR-0004, toMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel() (+51 more)

### Community 26 - "works.routes.js"
Cohesion: 0.12
Nodes (20): getEffectivePermissionIds(), changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, previewWorkEndDateController (+12 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.17
Nodes (10): ALL, contact(), ctx, existingRow, input(), ADR-0012, prismaMock, state (+2 more)

### Community 29 - "request.mock.js"
Cohesion: 0.06
Nodes (22): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+14 more)

### Community 30 - "session.service.js"
Cohesion: 0.11
Nodes (26): ACCESS_COOKIE_NAME, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME (+18 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.08
Nodes (38): moneyRule(), percentRule(), ACT_FIELDS, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController, createLiquidationController, deleteContractController (+30 more)

### Community 33 - "invoices.service.test.js"
Cohesion: 0.14
Nodes (4): ctx, ADR-0020, prismaMock, state

### Community 34 - "`tbl_contracts`"
Cohesion: 0.20
Nodes (8): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contract_types`, `tbl_providers`

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 37 - "socket.js"
Cohesion: 0.26
Nodes (9): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+1 more)

### Community 38 - "ProviderFormPage.jsx"
Cohesion: 0.11
Nodes (33): getAddressTypesSelectAPI, getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getProviderTypesSelectAPI, ProviderFormPage, channelsOf(), ContactDialog(), ContactsEditor() (+25 more)

### Community 39 - "constants.js"
Cohesion: 0.14
Nodes (15): refreshSession(), SocketContext, SocketProvider(), TooltipLongText(), INVOICE_TYPE_OPTIONS, ADR-0017, pathSocket, REASON_SCOPE_OPTIONS (+7 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (14): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, payload, dbUser, mockDisconnectSockets, mockIn (+6 more)

### Community 41 - "react"
Cohesion: 0.06
Nodes (51): getPermissionsCatalogAPI(), deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), getBasicInformationAPI() (+43 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "@mui/material"
Cohesion: 0.11
Nodes (27): DashboardDefault, appDrawerWidth, gridSpacing, CardGrid(), CardSecondaryAction(), headerStyle, MainCard(), SubCard() (+19 more)

### Community 46 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart, pm2:start (+5 more)

### Community 48 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "server.js"
Cohesion: 0.19
Nodes (11): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, registeredTasks (+3 more)

### Community 51 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.07
Nodes (43): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017, previewContractEndDateAPI() (+35 more)

### Community 53 - "users.service.js"
Cohesion: 0.05
Nodes (64): ADR-0027, prisma, ACTIVE_STATUS, DELETED_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse() (+56 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "transaction.service.js"
Cohesion: 0.14
Nodes (15): @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, testConnection(), buildLockPlan(), ISOLATION_LEVEL (+7 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.08
Nodes (21): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+13 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "useAuth"
Cohesion: 0.07
Nodes (61): getStatusesByScopeAPI(), contractsApi, useAuth(), ContractsPage, InvoicesPage, PrivateRoute(), showError(), useSocket() (+53 more)

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

### Community 66 - "contractSuspensions.service.test.js"
Cohesion: 0.17
Nodes (5): ctx, initial, ADR-0017, prismaMock, state

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "transaction.service.test.js"
Cohesion: 0.19
Nodes (11): ref_path, ref_url, status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT (+3 more)

### Community 70 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 71 - "MainLayout/index.jsx"
Cohesion: 0.07
Nodes (45): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI() (+37 more)

### Community 73 - "ContractTypeFieldsDialog.jsx"
Cohesion: 0.17
Nodes (15): contractTypesApi, getContractTypeFieldsAPI(), saveContractTypeFieldsAPI(), ContractTypePage, ContractTypeFieldsDialog(), DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+7 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.23
Nodes (7): `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies`, `tbl_status`, `tbl_users`

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.03
Nodes (65): addressTypesApi, constructionCompaniesApi, identityDocumentsApi, insurersApi, providersApi, providerTypesApi, supervisionTypesApi, getWorksSummaryAPI() (+57 more)

### Community 100 - "contracts.controller.test.js"
Cohesion: 0.22
Nodes (7): conceptsServiceMock, contractsServiceMock, emit, getEffectivePermissionIds, ADR-0015, ADR-0016, suspensionsServiceMock

### Community 101 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 104 - "`tbl_providers`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_providers`, `tbl_provider_classifications`, `tbl_address_types` (+2 more)

### Community 105 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 108 - "contracts.service.js"
Cohesion: 0.05
Nodes (71): ADR-0006, ADR-0015, ADR-0016, ADR-0021, ADR-0026, @prisma/client, MONEY_SCALE, moneyText() (+63 more)

### Community 112 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 116 - "WorkFormPage.jsx"
Cohesion: 0.11
Nodes (25): getConstructionCompaniesSelectAPI, getInsurersSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), previewWorkEndDateAPI(), createMasterApi(), useEndDatePreview(), EditableList() (+17 more)

### Community 117 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (8): created, DATABASE, declared, dropped, inDatabase, MIGRATIONS, sql, withMessage

### Community 118 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 119 - "error.middleware.js"
Cohesion: 0.24
Nodes (15): ADR-0012, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS (+7 more)

### Community 120 - "identityDocuments.service.js"
Cohesion: 0.36
Nodes (6): formatFor(), identityDocumentsRoutes, identityDocumentsConfig, identityDocumentsService, ADR-0008, ADR-0013

### Community 123 - "works.service.test.js"
Cohesion: 0.22
Nodes (6): ALL, ctx, existingWork, ADR-0011, prismaMock, state

### Community 124 - "status.service.test.js"
Cohesion: 0.33
Nodes (4): ref_fs, catalog, expected, prismaMock

### Community 125 - "masterRouter.utils.js"
Cohesion: 0.09
Nodes (33): getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), FIELD_ATTRIBUTES (+25 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.25
Nodes (6): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`

### Community 130 - "seed.js"
Cohesion: 0.17
Nodes (10): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES (+2 more)

### Community 131 - "`tbl_work_providers`"
Cohesion: 0.40
Nodes (4): `tbl_status`, `tbl_users`, `tbl_work_providers`, `tbl_works`

### Community 132 - "uniqueConstraints.constants.js"
Cohesion: 0.50
Nodes (3): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES

### Community 133 - "contracts.service.test.js"
Cohesion: 0.07
Nodes (21): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+13 more)

### Community 134 - "`tbl_identity_documents`"
Cohesion: 0.50
Nodes (3): `tbl_users`, `tbl_identity_documents`, `tbl_users`

### Community 136 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 137 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 139 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 142 - "themes/index.jsx"
Cohesion: 0.21
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 150 - "masterRouter.utils.test.js"
Cohesion: 0.33
Nodes (4): config, emit, forged, serviceMock

### Community 151 - "FilterPopper.jsx"
Cohesion: 0.60
Nodes (4): FilterPopper(), normalizeOptions(), SocketDropdownFilter(), lodash-es

## Knowledge Gaps
- **702 isolated node(s):** `ADR-0017`, `filterOptions`, `EMPTY_FORM`, `ADR-0020`, `TYPE_BY_ACTION` (+697 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 992 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **56 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@mui/material` connect `@mui/material` to `InputLabel.jsx`, `ToastService.js`, `client/package.json`, `themes/index.jsx`, `AuthForgotPassword.jsx`, `withAlpha`, `FilterPopper.jsx`, `DebouncedInput.jsx`, `DocumentManagement.jsx`, `ProviderFormPage.jsx`, `constants.js`, `react`, `ContractFormPage.jsx`, `useAuth`, `MainLayout/index.jsx`, `ContractTypeFieldsDialog.jsx`, `EasyCrop.jsx`, `MainRoutes.jsx`, `WorkFormPage.jsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `users.service.js`, `server/package.json`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `axios` connect `react` to `server/package.json`, `client/package.json`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **What connects `ADR-0017`, `filterOptions`, `EMPTY_FORM` to the rest of the system?**
  _702 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `invoices.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07826546800634585 - nodes in this community are weakly interconnected._
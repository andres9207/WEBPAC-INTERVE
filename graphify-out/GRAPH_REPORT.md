# Graph Report - WEBPAC-INTERVE  (2026-10-13)

## Corpus Check
- 555 files · ~258,260 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3074 nodes · 8302 edges · 187 communities (109 shown, 78 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 116 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `43fbc9a7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- WorksPage.jsx
- formatTime.js
- dependencies
- server/package.json
- providers.service.js
- users.service.js
- auth.service.js
- contracts.service.js
- withAlpha
- seed.demo.js
- auth.routes.js
- App.jsx
- client/package.json
- menu-items/index.js
- validation.utils.js
- prismaClient.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- workScopeOf
- dashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contractConcepts.service.test.js
- InvoiceFormPage.jsx
- providers.service.test.js
- invoices.controller.test.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- handleFirebase.js
- session.service.js
- Default/index.jsx
- server.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- constant.js
- scripts
- constants.js
- `tbl_invoices`
- ProviderTypePage.jsx
- workScope.service.js
- ContractFormPage.jsx
- providerTypeFields.service.js
- `tbl_contract_type_fields`
- showError
- transaction.mock.js
- scripts
- WorkDetailPage.jsx
- works.routes.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- floatingPoint.guard.test.js
- notifications.routes.js
- invoiceTerms.js
- NewProviderDialog.jsx
- `tbl_contract_status_history`
- app.routes.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- masterRouter.utils.js
- `tbl_provider_type_field_versions`
- PoliciesTab.jsx
- AuthenticationRoutes.jsx
- AppBar.jsx
- `tbl_works`
- `tbl_policies`
- MainLayout/index.jsx
- invoices.routes.js
- auth.service.test.js
- error.middleware.js
- decimal
- `tbl_providers`
- transaction.service.test.js
- images.js
- contracts.service.test.js
- `tbl_contract_suspensions`
- contractPolicies.service.js
- `tbl_providers`
- contractSuspensions.service.test.js
- session.service.test.js
- master.service.test.js
- winston.config.js
- uniqueConstraints.constants.test.js
- react-router-dom
- works.service.test.js
- socket.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- themes/index.jsx
- browserslist
- @mui/material
- DebouncedInput.jsx
- document.routes.js
- invoiceViews.js
- permissions.controller.test.js
- contractEndDateReconciliation.service.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- NotificationSection/index.jsx
- `tbl_users`
- EasyCrop.jsx
- httpCliente.js
- contracts.controller.test.js
- useConfig
- contractPolicies.service.test.js
- `tbl_invoice_liquidation_details`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 126 edges
2. `react` - 97 edges
3. `useAuth()` - 77 edges
4. `showError()` - 72 edges
5. `writeAudit()` - 59 edges
6. `withLockedTransaction()` - 56 edges
7. `showSuccess()` - 53 edges
8. `workScopeOf()` - 48 edges
9. `auditContext()` - 48 edges
10. `@tabler/icons-react` - 48 edges

## Surprising Connections (you probably didn't know these)
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `PrivateRoute()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/routes/PrivateRoute.jsx → client/src/contexts/authContext.jsx
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js

## Import Cycles
- None detected.

## Communities (187 total, 78 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "WorksPage.jsx"
Cohesion: 0.16
Nodes (14): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, identityDocumentsApi, getSupervisionTypesSelectAPI, worksApi, createMasterApi(), WorksPage, WorkDataForm() (+6 more)

### Community 3 - "formatTime.js"
Cohesion: 0.12
Nodes (15): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+7 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.07
Nodes (78): diffFields(), newOperationId(), writeAudit(), withLockedTransaction(), configurePolicyTypeBase(), updateAccount(), auditPermissionChanges(), updateProfilePermissions() (+70 more)

### Community 7 - "users.service.js"
Cohesion: 0.07
Nodes (52): ADR-0004, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused() (+44 more)

### Community 8 - "auth.service.js"
Cohesion: 0.05
Nodes (52): ADR-0013, bcrypt, ref_crypto, AUDIT_ENTITIES, auditMisuse(), buildRows(), ADR-0027, protect() (+44 more)

### Community 9 - "contracts.service.js"
Cohesion: 0.05
Nodes (112): ADR-0016, ADR-0018, ADR-0021, ADR-0026, dateOnlyText(), typeAppliesAiu(), withContractAiu(), activeSequence() (+104 more)

### Community 10 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.07
Nodes (29): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+21 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "App.jsx"
Cohesion: 0.29
Nodes (7): refreshSession(), App(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (34): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+26 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.08
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.11
Nodes (22): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+14 more)

### Community 17 - "prismaClient.js"
Cohesion: 0.07
Nodes (32): @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), ACTIVE_STATUS (+24 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.10
Nodes (19): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.16
Nodes (19): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider(), getStoredUser() (+11 more)

### Community 21 - "workScopeOf"
Cohesion: 0.10
Nodes (33): workScopeOf(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS (+25 more)

### Community 22 - "dashboard.service.js"
Cohesion: 0.09
Nodes (36): scopeWhere(), contractsBlock(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002, notDeleted, policiesBlock() (+28 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (65): ADR-0007, assertInScope(), sumMoney(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel() (+57 more)

### Community 26 - "contractConcepts.service.test.js"
Cohesion: 0.10
Nodes (14): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+6 more)

### Community 27 - "InvoiceFormPage.jsx"
Cohesion: 0.21
Nodes (17): getInvoiceContractsSelectAPI(), getInvoiceProvidersSelectAPI(), invoicesApi, ADR-0017, amountsPayload(), DOCUMENT_FIELDS, EMPTY_FORM, hasAmounts() (+9 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.12
Nodes (14): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+6 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.09
Nodes (53): ADR-0025, isBlank(), toMoney(), adjustableAmount(), amountsDto(), approveInvoice(), assertContractStillAdmits(), assertInvoiceVisible() (+45 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.07
Nodes (53): auditContext(), moneyRule(), optionalDate(), percentRule(), ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS, CONTRACT_FIELDS (+45 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 37 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 38 - "Default/index.jsx"
Cohesion: 0.17
Nodes (21): getDashboardSummaryAPI(), ADR-0002, headerStyle, MainCard(), invoicePath(), AlertsCard(), Empty(), LatestInvoicesCard() (+13 more)

### Community 39 - "server.js"
Cohesion: 0.14
Nodes (14): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+6 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.08
Nodes (12): ref_jest_globals, buildRes(), mockFindFirst, runMiddleware(), validPayload, prismaMock, mockValidationResult, prismaMock (+4 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (53): ADR-0003, ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020 (+45 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "constant.js"
Cohesion: 0.13
Nodes (18): MainContentStyled, closedMixin(), MiniDrawerStyled, openedMixin(), appDrawerWidth, drawerWidth, gridSpacing, CardSecondaryAction() (+10 more)

### Community 46 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, cron:run, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart (+6 more)

### Community 48 - "constants.js"
Cohesion: 0.09
Nodes (22): reasonsApi, ReasonPage, SocketContext, TooltipLongText(), CONTRACT_INVOICE_TYPES, INVOICE_TYPE_OPTIONS, ADR-0017, pathSocket (+14 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "ProviderTypePage.jsx"
Cohesion: 0.15
Nodes (16): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+8 more)

### Community 51 - "workScope.service.js"
Cohesion: 0.12
Nodes (20): getEffectivePermissionIds(), hasEffectivePermission(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere() (+12 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.09
Nodes (42): contractConceptsApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+34 more)

### Community 53 - "providerTypeFields.service.js"
Cohesion: 0.14
Nodes (25): AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+17 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "showError"
Cohesion: 0.06
Nodes (65): suspendContractAPI(), invoiceTransitionsApi, configurePolicyTypeBaseAPI(), deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI() (+57 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (29): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+21 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkDetailPage.jsx"
Cohesion: 0.05
Nodes (84): getStatusesByScopeAPI(), getContractAdvanceAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), useInvoiceViewChange(), useInvoiceViews(), useSocket(), SubCard() (+76 more)

### Community 59 - "works.routes.js"
Cohesion: 0.13
Nodes (20): changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, previewWorkEndDateController, saveWorkController (+12 more)

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

### Community 66 - "floatingPoint.guard.test.js"
Cohesion: 0.12
Nodes (13): ref_fs, ref_url, ALLOWED, files(), lines, SRC, catalog, expected (+5 more)

### Community 68 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 70 - "invoiceTerms.js"
Cohesion: 0.17
Nodes (14): cancelTransitionFor(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS, INVOICE_TYPES, ADR-0020, NOTE_COLUMNS, STATE_ALLOWS (+6 more)

### Community 71 - "NewProviderDialog.jsx"
Cohesion: 0.11
Nodes (29): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, workProvidersApi, getProviderTypesSelectAPI, DateField() (+21 more)

### Community 88 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (102): addressTypesApi, constructionCompaniesApi, contractTypesApi, insurersApi, getPermissionsCatalogAPI(), policyTypesApi, providersApi, supervisionTypesApi (+94 more)

### Community 100 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (35): express, getIO(), verifyToken(), requirePermission(), validate(), createMasterControllers(), createMasterRouter(), identityDocumentsRoutes (+27 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "PoliciesTab.jsx"
Cohesion: 0.12
Nodes (23): contractPoliciesApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, ADR-0019, PercentField(), toText(), toValue(), EMPTY (+15 more)

### Community 108 - "AuthenticationRoutes.jsx"
Cohesion: 0.18
Nodes (11): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router (+3 more)

### Community 112 - "AppBar.jsx"
Cohesion: 0.23
Nodes (10): client_src_assets_images_interve, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthCardWrapper(), AuthWrapper1 (+2 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "MainLayout/index.jsx"
Cohesion: 0.21
Nodes (16): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useWorkScope(), Footer(), Header() (+8 more)

### Community 117 - "invoices.routes.js"
Cohesion: 0.11
Nodes (29): accessOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, grantedOf(), INVOICE_FIELDS, notify() (+21 more)

### Community 118 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "decimal"
Cohesion: 0.09
Nodes (49): @prisma/client, decimal(), HUNDRED, MONEY_SCALE, moneyText(), PERCENT_SCALE, percentOf(), RATIO_SCALE (+41 more)

### Community 123 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 124 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.25
Nodes (6): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`

### Community 130 - "contractPolicies.service.js"
Cohesion: 0.11
Nodes (28): AUDIT_OPERATIONS, percentText(), toPercent(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES (+20 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "contractSuspensions.service.test.js"
Cohesion: 0.17
Nodes (5): ctx, initial, ADR-0017, prismaMock, state

### Community 133 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 134 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 136 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 139 - "react-router-dom"
Cohesion: 0.25
Nodes (10): setParentOpenedMenu(), useMenuCollapse(), NavCollapse(), NavGroup(), NavItem(), PrivateRoute(), Breadcrumbs(), BTitle() (+2 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 151 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 152 - "themes/index.jsx"
Cohesion: 0.21
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 153 - "browserslist"
Cohesion: 0.27
Nodes (6): browserslist, development, production, volta, node, yarn

### Community 154 - "@mui/material"
Cohesion: 0.07
Nodes (41): getAddressTypesSelectAPI, getWorksSummaryAPI(), ACTION_TONES, ActionButton(), toneOf(), ChipMultiSelect(), fold(), ConfirmDialog() (+33 more)

### Community 156 - "document.routes.js"
Cohesion: 0.23
Nodes (9): IDEMPOTENCY_HEADER, deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema, DOC_TYPES, paginationDocsSchema (+1 more)

### Community 157 - "invoiceViews.js"
Cohesion: 0.15
Nodes (24): applyInvoiceViewChange(), ADR-0010, providerTypesConfig, providerTypesService, createContractInvoice(), ANY_CONTRACT_VIEW_PERMISSION, ANY_VIEW_PERMISSION, applyProviderViewChanges() (+16 more)

### Community 159 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 163 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 175 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.39
Nodes (6): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 179 - "httpCliente.js"
Cohesion: 0.18
Nodes (16): getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, pickWork(), WorkScopeContext, WorkScopeProvider(), activeWorkHeader() (+8 more)

### Community 181 - "contracts.controller.test.js"
Cohesion: 0.17
Nodes (10): conceptsServiceMock, contractsServiceMock, emit, getEffectivePermissionIds, ADR-0015, ADR-0016, policiesServiceMock, SCOPE (+2 more)

### Community 183 - "useConfig"
Cohesion: 0.27
Nodes (8): useConfig(), ProfileSection(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 186 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

## Knowledge Gaps
- **876 isolated node(s):** `EMPTY_FORM`, `NO_DESCRIPTION`, `ADR-0015`, `ADR-0006`, `PAGES` (+871 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1203 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **78 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0003` connect `permissions.constants.js` to `useAuth`, `users.service.js`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `WorksPage.jsx`, `formatTime.js`, `withAlpha`, `react-router-dom`, `client/package.json`, `AuthForgotPassword.jsx`, `themes/index.jsx`, `DebouncedInput.jsx`, `InvoiceFormPage.jsx`, `Default/index.jsx`, `constant.js`, `NotificationSection/index.jsx`, `constants.js`, `EasyCrop.jsx`, `ProviderTypePage.jsx`, `ContractFormPage.jsx`, `showError`, `useConfig`, `WorkDetailPage.jsx`, `NewProviderDialog.jsx`, `useAuth`, `PoliciesTab.jsx`, `AuthenticationRoutes.jsx`, `AppBar.jsx`, `MainLayout/index.jsx`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `server/package.json`, `providers.service.js`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **What connects `EMPTY_FORM`, `NO_DESCRIPTION`, `ADR-0015` to the rest of the system?**
  _876 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `formatTime.js` be split into smaller, more focused modules?**
  _Cohesion score 0.11822660098522167 - nodes in this community are weakly interconnected._
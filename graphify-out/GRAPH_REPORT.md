# Graph Report - WEBPAC-INTERVE  (2026-10-09)

## Corpus Check
- 544 files · ~248,119 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3023 nodes · 8105 edges · 175 communities (102 shown, 73 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 115 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e0920431`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- WorkFormPage.jsx
- react
- dependencies
- server/package.json
- providers.service.js
- status.constants.js
- auth.service.js
- contracts.service.js
- users.service.js
- contractPolicies.service.js
- auth.routes.js
- showError
- client/package.json
- menu-items/index.js
- validation.utils.js
- master.service.js
- invoices.service.test.js
- compilerOptions
- idempotency.service.js
- providers.routes.js
- dashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- workScope.service.js
- Default/index.jsx
- providers.service.test.js
- contracts.controller.test.js
- invoices.service.js
- contractEndDateReconciliation.service.js
- contracts.routes.js
- prismaClient.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- handleFirebase.js
- session.service.js
- @mui/material
- works.service.test.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- App.jsx
- Shadow.jsx
- scripts
- contractEndDateReconciliation.service.test.js
- `tbl_invoices`
- ProviderTypeFieldsDialog.jsx
- main.routes.js
- ContractFormPage.jsx
- providerTypeFields.service.js
- `tbl_contract_type_fields`
- InvoiceFormPage.jsx
- transaction.mock.js
- scripts
- react-router-dom
- workScopeOf
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- transaction.service.test.js
- useGetMenuMaster
- `tbl_contract_status_history`
- masterRouter.utils.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- socket.js
- `tbl_provider_type_field_versions`
- contractConcepts.service.js
- uniqueConstraints.constants.test.js
- `tbl_works`
- `tbl_policies`
- invoices.routes.js
- WorkScopeContext.jsx
- error.middleware.js
- audit.service.js
- `tbl_providers`
- error.middleware.test.js
- images.js
- auth.service.test.js
- `tbl_contract_suspensions`
- `tbl_providers`
- decimal
- contracts.service.test.js
- winston.config.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- ConfigContext.jsx
- withAlpha
- contractPolicies.service.test.js
- DebouncedInput.jsx
- constants.js
- NotificationSection/index.jsx
- policyTypes.service.test.js
- uniqueConstraints.constants.js
- authjwt.middleware.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- AuthForgotPassword.jsx
- transaction.service.js
- MainLayout/index.jsx
- `tbl_users`
- InputLabel.jsx
- session.service.test.js
- invoices.controller.test.js
- useConfig
- permissions.controller.test.js
- volta
- `tbl_invoice_liquidation_details`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 125 edges
2. `react` - 95 edges
3. `useAuth()` - 81 edges
4. `showError()` - 76 edges
5. `writeAudit()` - 57 edges
6. `showSuccess()` - 57 edges
7. `withLockedTransaction()` - 56 edges
8. `workScopeOf()` - 49 edges
9. `auditContext()` - 48 edges
10. `@tabler/icons-react` - 48 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `ComponentsOverrides()` --indirect_call--> `CardActions()`  [INFERRED]
  client/src/themes/overrides/index.js → client/src/themes/overrides/CardActions.jsx

## Import Cycles
- None detected.

## Communities (175 total, 73 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (27): ThemeCustomization(), Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid() (+19 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "WorkFormPage.jsx"
Cohesion: 0.08
Nodes (43): getAddressTypesSelectAPI, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, getProviderTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), previewWorkEndDateAPI() (+35 more)

### Community 3 - "react"
Cohesion: 0.07
Nodes (31): getPermissionsCatalogAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), getBasicInformationAPI(), paginationUsersAPI(), updateAccountAPI(), genericRequest (+23 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (32): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+24 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (58): ADR-0009, assertInScope(), inScope(), getContractFormOptions(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable() (+50 more)

### Community 7 - "status.constants.js"
Cohesion: 0.09
Nodes (19): ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, deleteModuleDoc(), DOC_CREATE_IDEMPOTENCY, DOC_SELECT, DOC_SORT_FIELDS, enrichDocs() (+11 more)

### Community 8 - "auth.service.js"
Cohesion: 0.11
Nodes (26): bcrypt, ref_crypto, withTransaction(), comparePassword(), hashPassword(), deriveKey(), generateResetCode(), hashResetCode() (+18 more)

### Community 9 - "contracts.service.js"
Cohesion: 0.05
Nodes (79): ADR-0021, containsFilter(), dateRangeFilter(), filtersWhere(), idFilter(), toDateOnly(), typeAppliesAiu(), paginationInvoices() (+71 more)

### Community 10 - "users.service.js"
Cohesion: 0.11
Nodes (20): nit(), DIAN_WEIGHTS, GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, nitCheckDigit(), assertAssignableProfile() (+12 more)

### Community 11 - "contractPolicies.service.js"
Cohesion: 0.05
Nodes (47): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+39 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "showError"
Cohesion: 0.05
Nodes (85): deleteFileByPath(), uploadFile(), suspendContractAPI(), deleteDocApi(), paginationDocsApi(), saveDocApi(), getIdentityDocumentsSelectAPI, getInsurersSelectAPI (+77 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (44): compat, __dirname, __filename, browserslist, development, production, eslintConfig, extends (+36 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.13
Nodes (18): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0009 (+10 more)

### Community 17 - "master.service.js"
Cohesion: 0.10
Nodes (30): ADR-0013, capitalize(), createMasterService(), httpError(), ADR-0004, ADR-0027, countByStatus(), DEFAULT_ROWS (+22 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.11
Nodes (17): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+9 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "idempotency.service.js"
Cohesion: 0.13
Nodes (17): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), IDEMPOTENCY_HEADER, idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused() (+9 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 22 - "dashboard.service.js"
Cohesion: 0.13
Nodes (31): scopeWhere(), todayDateOnly(), contractsBlock(), getDashboardSummary(), invoicesBlock(), ADR-0002, notDeleted, policiesBlock() (+23 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (60): addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress(), defineContacts() (+52 more)

### Community 26 - "workScope.service.js"
Cohesion: 0.09
Nodes (28): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), managedWhere(), resolveWorkScope(), scopeOf(), selectMyWorks() (+20 more)

### Community 27 - "Default/index.jsx"
Cohesion: 0.14
Nodes (23): getDashboardSummaryAPI(), ADR-0002, headerStyle, MainCard(), DashboardCards(), Indicator(), ADR-0002, AlertsCard() (+15 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.13
Nodes (13): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+5 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.05
Nodes (32): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+24 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.07
Nodes (66): ADR-0023, adjustableAmount(), approveInvoice(), assertInvoiceInScope(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork() (+58 more)

### Community 31 - "contractEndDateReconciliation.service.js"
Cohesion: 0.09
Nodes (26): dotenv, imap-simple, node-cron, nodemailer, prisma, emailApp, nameApp, nameAppMail (+18 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.08
Nodes (34): moneyRule(), optionalDate(), percentRule(), getContractFieldsController, previewContractEndDateController, selectContractWorksController, contractsRoutes, ADR-0006 (+26 more)

### Community 33 - "prismaClient.js"
Cohesion: 0.08
Nodes (24): ref_http, @prisma/adapter-mariadb, app, ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS (+16 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 37 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 38 - "@mui/material"
Cohesion: 0.10
Nodes (28): getWorksSummaryAPI(), ACTION_TONES, ActionButton(), toneOf(), ChipMultiSelect(), fold(), ConfirmDialog(), DataTable() (+20 more)

### Community 39 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (16): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+8 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (50): ADR-0011, ADR-0019, ADR-0020, ADR-0024, ADR-0025, ADR-0012, ADR-0016, ADR-0017 (+42 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "App.jsx"
Cohesion: 0.13
Nodes (15): App(), client_src_assets_scss_style, AuthContext, container, root, NavigationScroll(), reportWebVitals(), SocketProvider() (+7 more)

### Community 45 - "Shadow.jsx"
Cohesion: 0.28
Nodes (10): gridSpacing, CardSecondaryAction(), SubCard(), Avatar(), ColorBox(), UIColor(), CustomShadowBox(), ShadowBox() (+2 more)

### Community 46 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, cron:run, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart (+6 more)

### Community 48 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "ProviderTypeFieldsDialog.jsx"
Cohesion: 0.16
Nodes (15): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006, ProviderTypeFieldsDialog() (+7 more)

### Community 51 - "main.routes.js"
Cohesion: 0.10
Nodes (20): express, STATUS_KEYS, getDashboardSummaryController, ADR-0002, dashboardRoutes, ADR-0002, getMenuController(), getProfilesController() (+12 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (45): contractConceptsApi, contractPoliciesApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+37 more)

### Community 53 - "providerTypeFields.service.js"
Cohesion: 0.11
Nodes (29): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+21 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "InvoiceFormPage.jsx"
Cohesion: 0.12
Nodes (28): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, MoneyField(), moneyInputText() (+20 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (29): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+21 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "react-router-dom"
Cohesion: 0.07
Nodes (61): getStatusesByScopeAPI(), contractsApi, useSocket(), ContactsList(), ADR-0009, DataList(), Figure(), Pending() (+53 more)

### Community 59 - "workScopeOf"
Cohesion: 0.13
Nodes (36): auditContext(), getEffectivePermissionIds(), workScopeOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, getInvoiceFormOptionsController (+28 more)

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

### Community 66 - "transaction.service.test.js"
Cohesion: 0.14
Nodes (14): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, ADR-0027 (+6 more)

### Community 71 - "useGetMenuMaster"
Cohesion: 0.27
Nodes (12): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), MenuList() (+4 more)

### Community 88 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (36): getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), ADR-0019 (+28 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (99): addressTypesApi, constructionCompaniesApi, identityDocumentsApi, insurersApi, supervisionTypesApi, useAuth(), useWorkFilterField(), ADR-0002 (+91 more)

### Community 100 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 108 - "contractConcepts.service.js"
Cohesion: 0.10
Nodes (68): main(), diffFields(), newOperationId(), writeAudit(), runIdempotent(), withLockedTransaction(), dateOnlyText(), withContractAiu() (+60 more)

### Community 112 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 117 - "invoices.routes.js"
Cohesion: 0.17
Nodes (15): invoicesRoutes, ADR-0017, approveInvoiceSchema, cancelInvoiceSchema, getContractAdvanceSchema, getInvoiceFormOptionsSchema, getInvoiceSchema, isContractCreate() (+7 more)

### Community 118 - "WorkScopeContext.jsx"
Cohesion: 0.29
Nodes (11): getMyWorksSelectAPI(), pickWork(), WorkScopeContext, WorkScopeProvider(), activeWorkHeader(), ALL_WORKS, readStoredWork(), setActiveWorkHeader() (+3 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.27
Nodes (14): concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS, driverCause() (+6 more)

### Community 120 - "audit.service.js"
Cohesion: 0.09
Nodes (24): ADR-0001, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0027, protect(), REDACTED (+16 more)

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.25
Nodes (6): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "decimal"
Cohesion: 0.08
Nodes (54): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, moneyText(), PERCENT_SCALE, percentOf() (+46 more)

### Community 133 - "contracts.service.test.js"
Cohesion: 0.05
Nodes (24): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+16 more)

### Community 136 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 152 - "ConfigContext.jsx"
Cohesion: 0.27
Nodes (7): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage()

### Community 153 - "withAlpha"
Cohesion: 0.14
Nodes (17): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Chip() (+9 more)

### Community 154 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 157 - "constants.js"
Cohesion: 0.07
Nodes (30): configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, reasonsApi, refreshSession(), PolicyTypePage, SocketContext, TooltipLongText() (+22 more)

### Community 159 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 160 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 163 - "uniqueConstraints.constants.js"
Cohesion: 0.50
Nodes (3): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES

### Community 166 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 173 - "AuthForgotPassword.jsx"
Cohesion: 0.06
Nodes (40): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), client_src_assets_images_interve, AuthProvider() (+32 more)

### Community 174 - "transaction.service.js"
Cohesion: 0.21
Nodes (11): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+3 more)

### Community 175 - "MainLayout/index.jsx"
Cohesion: 0.16
Nodes (18): handlerDrawerOpen(), useWorkScope(), Footer(), Header(), WorkSection(), MainLayout(), MainLayoutContent(), ScopedOutlet() (+10 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.39
Nodes (6): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 179 - "invoices.controller.test.js"
Cohesion: 0.25
Nodes (6): emit, getEffectivePermissionIds, invoicesServiceMock, ADR-0020, SCOPE, workScopeOf

### Community 181 - "useConfig"
Cohesion: 0.29
Nodes (8): useConfig(), ProfileSection(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 182 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 183 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **873 isolated node(s):** `PAGES`, `PERMISSIONS`, `PERMISSIONS_NO_PAGE`, `VIEW_PERMISSIONS`, `STATUSES` (+868 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1193 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **73 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `master.service.js`, `server/package.json`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `ADR-0003` connect `useAuth` to `master.service.js`, `permissions.constants.js`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `WorkFormPage.jsx`, `react`, `showError`, `client/package.json`, `withAlpha`, `DebouncedInput.jsx`, `Default/index.jsx`, `constants.js`, `NotificationSection/index.jsx`, `AuthForgotPassword.jsx`, `Shadow.jsx`, `MainLayout/index.jsx`, `InputLabel.jsx`, `ProviderTypeFieldsDialog.jsx`, `ContractFormPage.jsx`, `useConfig`, `InvoiceFormPage.jsx`, `react-router-dom`, `useGetMenuMaster`, `useAuth`, `WorkScopeContext.jsx`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **What connects `PAGES`, `PERMISSIONS`, `PERMISSIONS_NO_PAGE` to the rest of the system?**
  _873 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07541478129713423 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `WorkFormPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07864488808227466 - nodes in this community are weakly interconnected._
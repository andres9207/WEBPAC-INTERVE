# Graph Report - WEBPAC-INTERVE  (2026-10-07)

## Corpus Check
- 524 files · ~232,897 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 2907 nodes · 7710 edges · 173 communities (106 shown, 67 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 110 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5b1a6996`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- WorkFormPage.jsx
- auditContext
- dependencies
- server/package.json
- providers.service.js
- server.js
- writeAudit
- contracts.service.js
- decimal
- invoices.routes.js
- auth.routes.js
- react
- client/package.json
- menu-items/index.js
- validation.utils.js
- permissions.constants.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- providers.routes.js
- contractPolicies.service.js
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- @mui/material
- providers.service.test.js
- request.mock.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- session.service.js
- master.service.js
- works.service.test.js
- ref_jest_globals
- contractConcepts.service.js
- devDependencies
- src/index.jsx
- eslint.config.mjs
- scripts
- volta
- `tbl_invoices`
- updateInvoice
- app.routes.js
- ContractFormPage.jsx
- users.service.js
- `tbl_contract_type_fields`
- InvoiceFormPage.jsx
- transaction.mock.js
- scripts
- showError
- contractSuspensions.service.test.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- transaction.service.test.js
- extends
- seed.demo.js
- prismaClient.js
- httpCliente.js
- `tbl_contract_status_history`
- masterRouter.utils.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- socket.js
- `tbl_providers`
- contractEndDateReconciliation.service.js
- contractTerms.js
- uniqueConstraints.constants.test.js
- `tbl_works`
- `tbl_policies`
- withLockedTransaction
- invoiceTerms.js
- browserslist
- error.middleware.js
- contractTypeFields.service.js
- `tbl_providers`
- error.middleware.test.js
- images.js
- auth.service.test.js
- `tbl_contract_suspensions`
- document.routes.js
- `tbl_work_providers`
- money.utils.js
- contractTypeFields.service.test.js
- contractFields.js
- winston.config.js
- contracts.controller.test.js
- ContractTypeFieldsDialog.jsx
- notifications.routes.js
- EasyCrop.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- contracts.service.test.js
- runIdempotent
- workScope.service.test.js
- contractPolicies.service.test.js
- DebouncedInput.jsx
- contractEndDateReconciliation.service.test.js
- constants.js
- App.jsx
- invoices.controller.test.js
- session.service.test.js
- toMoney
- authjwt.middleware.test.js
- `tbl_contract_concepts`
- `tbl_reasons`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 119 edges
2. `react` - 92 edges
3. `useAuth()` - 79 edges
4. `showError()` - 74 edges
5. `writeAudit()` - 57 edges
6. `showSuccess()` - 57 edges
7. `withLockedTransaction()` - 56 edges
8. `auditContext()` - 48 edges
9. `workScopeOf()` - 47 edges
10. `@tabler/icons-react` - 47 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `ContractFormPage()` --indirect_call--> `previewContractEndDateAPI()`  [INFERRED]
  client/src/views/work/contracts/ContractFormPage.jsx → client/src/api/requests/contractsApi.js
- `suspendContractAPI()` --calls--> `idempotencyConfig()`  [EXTRACTED]
  client/src/api/requests/contractsApi.js → client/src/utils/idempotency.js
- `MasterPage()` --calls--> `statusTabsWithCounts()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/utils/constants.js
- `PolicyTypePage()` --calls--> `ConfigureBaseDialog()`  [EXTRACTED]
  client/src/views/admin/policyTypes/PolicyTypePage.jsx → client/src/views/admin/policyTypes/components/ConfigureBaseDialog.jsx

## Import Cycles
- None detected.

## Communities (173 total, 67 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.05
Nodes (46): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow() (+38 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "WorkFormPage.jsx"
Cohesion: 0.05
Nodes (68): getAddressTypesSelectAPI, getConstructionCompaniesSelectAPI, getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), ADR-0012, getProviderTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI() (+60 more)

### Community 3 - "auditContext"
Cohesion: 0.10
Nodes (46): auditContext(), workScopeOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, getInvoiceFormOptionsController, grantedOf() (+38 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (57): assertAnyInScope(), assertInScope(), httpError(), inScope(), scopeOf(), scopeWhere(), applyProviderTypes(), assertAssignmentDate() (+49 more)

### Community 7 - "server.js"
Cohesion: 0.14
Nodes (14): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+6 more)

### Community 8 - "writeAudit"
Cohesion: 0.08
Nodes (43): ADR-0013, bcrypt, ref_crypto, auditMisuse(), buildRows(), diffFields(), ADR-0027, protect() (+35 more)

### Community 9 - "contracts.service.js"
Cohesion: 0.09
Nodes (46): typeAppliesAiu(), withContractAiu(), assertContractInScope(), assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork() (+38 more)

### Community 10 - "decimal"
Cohesion: 0.15
Nodes (28): @prisma/client, decimal(), moneyText(), ratioPercent(), ratioText(), roundMoney(), roundRatio(), advanceBalances() (+20 more)

### Community 11 - "invoices.routes.js"
Cohesion: 0.17
Nodes (15): invoicesRoutes, ADR-0017, approveInvoiceSchema, cancelInvoiceSchema, getContractAdvanceSchema, getInvoiceFormOptionsSchema, getInvoiceSchema, isContractCreate() (+7 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "react"
Cohesion: 0.07
Nodes (48): deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), getBasicInformationAPI(), paginationUsersAPI() (+40 more)

### Community 14 - "client/package.json"
Cohesion: 0.08
Nodes (24): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+16 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.10
Nodes (25): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idempotencyKeyRule(), ADR-0009 (+17 more)

### Community 17 - "permissions.constants.js"
Cohesion: 0.05
Nodes (53): ADR-0011, ADR-0012, ADR-0020, ADR-0024, express, ADR-0006, ADR-0016, ADR-0017 (+45 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.11
Nodes (15): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+7 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.06
Nodes (39): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), client_src_assets_images_interve (+31 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.10
Nodes (27): ASSIGNMENT_FIELDS, assignProviderController, checkIdentificationController, getProviderController, INPUT_FIELDS, notifyAssignment(), paginationProvidersController, paginationWorkProvidersController (+19 more)

### Community 22 - "contractPolicies.service.js"
Cohesion: 0.09
Nodes (40): percentText(), toPercent(), insuredValue(), policyBaseValue(), assertMasters(), auditable(), cancelPolicy(), conceptLabel() (+32 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (50): INACTIVE_STATUS, defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), applyManagers(), applyStages() (+42 more)

### Community 26 - "works.routes.js"
Cohesion: 0.12
Nodes (20): canViewAllWorks(), managedWhere(), resolveWorkScope(), selectMyWorks(), getWorkController, INPUT_FIELDS, paginationWorksController, previewWorkEndDateController (+12 more)

### Community 27 - "@mui/material"
Cohesion: 0.09
Nodes (27): DashboardDefault, appDrawerWidth, gridSpacing, CardGrid(), CardSecondaryAction(), headerStyle, MainCard(), ACTION_TONES (+19 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.13
Nodes (13): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+5 more)

### Community 29 - "request.mock.js"
Cohesion: 0.07
Nodes (22): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+14 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.11
Nodes (22): ADR-0023, countByState(), DETAIL_AUDITED, documentValuesOf(), getInvoice(), getInvoiceFormOptions, IDEMPOTENCY_TARGET, INVOICE_AUDITED (+14 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.10
Nodes (30): moneyRule(), optionalDate(), percentRule(), ADR-0006, ADR-0016, ADR-0017, ADR-0018, cancelPolicySchema (+22 more)

### Community 33 - "seed.js"
Cohesion: 0.17
Nodes (10): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES (+2 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 37 - "session.service.js"
Cohesion: 0.13
Nodes (23): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+15 more)

### Community 38 - "master.service.js"
Cohesion: 0.13
Nodes (31): capitalize(), createMasterService(), httpError(), ADR-0004, ADR-0027, containsFilter(), countByStatus(), dateRangeFilter() (+23 more)

### Community 39 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (15): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, baseConfig (+7 more)

### Community 41 - "contractConcepts.service.js"
Cohesion: 0.19
Nodes (27): assertContractStillAdmits(), activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget(), configuredConcept() (+19 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.15
Nodes (13): client_src_assets_scss_style, config, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals() (+5 more)

### Community 45 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 46 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, cron:run, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart (+6 more)

### Community 48 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "updateInvoice"
Cohesion: 0.21
Nodes (22): approveInvoice(), assertInvoiceInScope(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditable(), cancelInvoice() (+14 more)

### Community 51 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.05
Nodes (74): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+66 more)

### Community 53 - "users.service.js"
Cohesion: 0.09
Nodes (25): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, identityDocumentsRoutes, identityDocumentsConfig (+17 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "InvoiceFormPage.jsx"
Cohesion: 0.13
Nodes (26): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, FormSection(), MoneyField() (+18 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (29): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+21 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "showError"
Cohesion: 0.07
Nodes (62): getStatusesByScopeAPI(), contractPoliciesApi, workProvidersApi, showError(), SocketContext, useSocket(), SubCard(), ContactsList() (+54 more)

### Community 59 - "contractSuspensions.service.test.js"
Cohesion: 0.17
Nodes (5): ctx, initial, ADR-0017, prismaMock, state

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
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "seed.demo.js"
Cohesion: 0.08
Nodes (28): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+20 more)

### Community 70 - "prismaClient.js"
Cohesion: 0.10
Nodes (24): adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), ACTIVE_STATUS, DELETED_STATUS (+16 more)

### Community 71 - "httpCliente.js"
Cohesion: 0.05
Nodes (63): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI() (+55 more)

### Community 88 - "masterRouter.utils.js"
Cohesion: 0.10
Nodes (29): getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), FIELD_ATTRIBUTES (+21 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (14): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+6 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (93): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, providersApi, providerTypesApi, reasonsApi (+85 more)

### Community 100 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 104 - "`tbl_providers`"
Cohesion: 0.22
Nodes (7): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_providers`, `tbl_provider_classifications`, `tbl_identity_documents`, `tbl_provider_types`

### Community 105 - "contractEndDateReconciliation.service.js"
Cohesion: 0.13
Nodes (25): findUsersWithPermission(), sumMoney(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS (+17 more)

### Community 108 - "contractTerms.js"
Cohesion: 0.12
Nodes (30): ADR-0021, dateOnlyText(), todayDateOnly(), auditable(), findOpenSuspension(), ADR-0017, liftWithAmendment(), optionalText() (+22 more)

### Community 112 - "uniqueConstraints.constants.test.js"
Cohesion: 0.14
Nodes (11): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, created, DATABASE, declared, dropped, inDatabase (+3 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "withLockedTransaction"
Cohesion: 0.08
Nodes (30): AUDIT_ENTITIES, AUDIT_OPERATIONS, newOperationId(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS (+22 more)

### Community 117 - "invoiceTerms.js"
Cohesion: 0.16
Nodes (17): assertTransition(), cancelTransitionFor(), historyRow(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS, INVOICE_TYPES, ADR-0020 (+9 more)

### Community 118 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 119 - "error.middleware.js"
Cohesion: 0.27
Nodes (14): concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS, driverCause() (+6 more)

### Community 120 - "contractTypeFields.service.js"
Cohesion: 0.27
Nodes (14): resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getContractTypeFields(), httpError(), ADR-0006 (+6 more)

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

### Community 130 - "document.routes.js"
Cohesion: 0.23
Nodes (9): IDEMPOTENCY_HEADER, deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema, DOC_TYPES, paginationDocsSchema (+1 more)

### Community 131 - "`tbl_work_providers`"
Cohesion: 0.18
Nodes (8): `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers`, `tbl_work_contacts`, `tbl_address_types`, `tbl_works`

### Community 132 - "money.utils.js"
Cohesion: 0.15
Nodes (12): HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ROUNDING, ZERO (+4 more)

### Community 133 - "contractTypeFields.service.test.js"
Cohesion: 0.10
Nodes (15): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+7 more)

### Community 134 - "contractFields.js"
Cohesion: 0.23
Nodes (11): AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+3 more)

### Community 136 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 137 - "contracts.controller.test.js"
Cohesion: 0.17
Nodes (10): conceptsServiceMock, contractsServiceMock, emit, getEffectivePermissionIds, ADR-0015, ADR-0016, policiesServiceMock, SCOPE (+2 more)

### Community 139 - "ContractTypeFieldsDialog.jsx"
Cohesion: 0.31
Nodes (9): getContractTypeFieldsAPI(), saveContractTypeFieldsAPI(), ContractTypeFieldsDialog(), DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006, toggle(), toRow() (+1 more)

### Community 140 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 151 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 152 - "runIdempotent"
Cohesion: 0.29
Nodes (10): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+2 more)

### Community 153 - "workScope.service.test.js"
Cohesion: 0.40
Nodes (4): hasEffectivePermission, prismaMock, state, user

### Community 154 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 156 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 157 - "constants.js"
Cohesion: 0.06
Nodes (39): contractsApi, configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, PolicyTypePage, TooltipLongText(), CONTRACT_STATE_COLORS, CONTRACT_STATE_TABS (+31 more)

### Community 159 - "App.jsx"
Cohesion: 0.29
Nodes (7): refreshSession(), App(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

### Community 160 - "invoices.controller.test.js"
Cohesion: 0.25
Nodes (6): emit, getEffectivePermissionIds, invoicesServiceMock, ADR-0020, SCOPE, workScopeOf

### Community 161 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 163 - "toMoney"
Cohesion: 0.38
Nodes (7): toMoney(), detailChanges(), detailText(), positiveMoney(), requestedDetailChanges(), resolveDetail(), storedDetail()

### Community 166 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

## Knowledge Gaps
- **846 isolated node(s):** `ADR-0006`, `ADR-0016`, `ADR-0017`, `ADR-0018`, `ADR-0019` (+841 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1153 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **67 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0003` connect `useAuth` to `permissions.constants.js`, `master.service.js`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `withLockedTransaction`, `server/package.json`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `WorkFormPage.jsx`, `DocumentManagement.jsx`, `httpCliente.js`, `ContractTypeFieldsDialog.jsx`, `react`, `client/package.json`, `EasyCrop.jsx`, `AuthForgotPassword.jsx`, `ContractFormPage.jsx`, `InvoiceFormPage.jsx`, `showError`, `DebouncedInput.jsx`, `constants.js`, `useAuth`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **What connects `ADR-0006`, `ADR-0016`, `ADR-0017` to the rest of the system?**
  _846 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05063291139240506 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `WorkFormPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05025712949976625 - nodes in this community are weakly interconnected._
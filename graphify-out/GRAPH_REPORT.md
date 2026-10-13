# Graph Report - WEBPAC-INTERVE  (2026-10-13)

## Corpus Check
- 555 files · ~258,339 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3073 nodes · 8306 edges · 190 communities (110 shown, 80 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 116 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a6e65132`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- withLockedTransaction
- formatTime.js
- dependencies
- server/package.json
- providers.service.js
- master.service.js
- writeAudit
- contracts.service.js
- withAlpha
- seed.demo.js
- auth.routes.js
- contractConcepts.service.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- prismaClient.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- providers.routes.js
- dashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- contractTerms.js
- providers.service.test.js
- request.mock.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- handleFirebaseDocs.js
- session.service.js
- @mui/material
- server.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- identityDocuments.service.js
- scripts
- constants.js
- `tbl_invoices`
- ProviderDetailPage.jsx
- auditContext
- ContractFormPage.jsx
- providerTypeFields.service.js
- `tbl_contract_type_fields`
- react
- transaction.mock.js
- scripts
- useAuth
- workScope.service.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- floatingPoint.guard.test.js
- notifications.routes.js
- invoiceTerms.js
- ToastService.js
- `tbl_contract_status_history`
- app.routes.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- masterRouter.utils.js
- `tbl_provider_type_field_versions`
- PolicyTypePage.jsx
- contractEndDateReconciliation.service.js
- advanceTerms.js
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
- eslint.config.mjs
- `tbl_contract_suspensions`
- contractPolicies.service.js
- `tbl_providers`
- transaction.service.js
- session.service.test.js
- addressTypes.service.js
- winston.config.js
- uniqueConstraints.constants.test.js
- useMenuCollapse.js
- works.service.test.js
- getIO
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- themes/index.jsx
- browserslist
- ContactsEditor.jsx
- DebouncedInput.jsx
- runIdempotent
- invoiceViews.js
- invoices.controller.test.js
- contractEndDateReconciliation.service.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- dashboard.service.test.js
- authjwt.middleware.test.js
- NotificationSection/index.jsx
- `tbl_users`
- EasyCrop.jsx
- InputLabel.jsx
- WorkScopeContext.jsx
- contracts.controller.test.js
- useConfig
- volta
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
- `PrivateRoute()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/routes/PrivateRoute.jsx → client/src/contexts/authContext.jsx
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `getContractFormOptions()` --calls--> `assertInScope()`  [EXTRACTED]
  server/src/modules/work/contracts/contracts.service.js → server/src/common/services/workScope.service.js
- `WorkView()` --indirect_call--> `previewWorkEndDateAPI()`  [INFERRED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/api/requests/worksApi.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx

## Import Cycles
- None detected.

## Communities (190 total, 80 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "withLockedTransaction"
Cohesion: 0.06
Nodes (45): ADR-0013, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0027, newOperationId() (+37 more)

### Community 3 - "formatTime.js"
Cohesion: 0.13
Nodes (10): uploadFile(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow(), getFileIcon(), getFileSize() (+2 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (32): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+24 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (58): identificationError(), assertIdentification(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes() (+50 more)

### Community 7 - "master.service.js"
Cohesion: 0.14
Nodes (23): capitalize(), createMasterService(), httpError(), ADR-0027, containsFilter(), countByStatus(), DEFAULT_ROWS, filtersWhere() (+15 more)

### Community 8 - "writeAudit"
Cohesion: 0.11
Nodes (27): bcrypt, writeAudit(), withTransaction(), comparePassword(), hashPassword(), deriveKey(), generateResetCode(), hashResetCode() (+19 more)

### Community 9 - "contracts.service.js"
Cohesion: 0.08
Nodes (51): ADR-0016, ADR-0018, ADR-0026, moneyText(), percentText(), sumMoney(), typeAppliesAiu(), assertHeader() (+43 more)

### Community 10 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.07
Nodes (27): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+19 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.10
Nodes (27): jsonwebtoken, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+19 more)

### Community 13 - "contractConcepts.service.js"
Cohesion: 0.14
Nodes (38): main(), activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget(), configuredConcept() (+30 more)

### Community 14 - "client/package.json"
Cohesion: 0.08
Nodes (26): name, packageManager, private, version, volta, node, yarn, apexcharts (+18 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.10
Nodes (24): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+16 more)

### Community 17 - "prismaClient.js"
Cohesion: 0.09
Nodes (22): @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), ACTIVE_STATUS (+14 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.10
Nodes (19): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.06
Nodes (42): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), App() (+34 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.15
Nodes (15): ADR-0012, providersRoutes, assignProviderSchema, changeProviderStatusSchema, checkIdentificationSchema, deleteProviderSchema, getProviderSchema, ADR-0012 (+7 more)

### Community 22 - "dashboard.service.js"
Cohesion: 0.12
Nodes (33): inScope(), scopeOf(), scopeWhere(), todayDateOnly(), contractsBlock(), getDashboardSummary(), invoicesBlock(), invoicesWhere() (+25 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.11
Nodes (15): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, allowedHosts (+7 more)

### Community 25 - "works.service.js"
Cohesion: 0.09
Nodes (48): ADR-0004, ADR-0007, assertInScope(), userFullName(), getSessionInfo(), applyManagers(), applyStages(), assertCollectionPermissions() (+40 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.05
Nodes (26): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), row(), ctx, prismaMock, state (+18 more)

### Community 27 - "contractTerms.js"
Cohesion: 0.12
Nodes (29): ADR-0021, dateOnlyText(), auditable(), findOpenSuspension(), ADR-0017, liftWithAmendment(), optionalText(), pastDate() (+21 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.12
Nodes (14): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+6 more)

### Community 29 - "request.mock.js"
Cohesion: 0.07
Nodes (22): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+14 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.09
Nodes (54): ADR-0025, dateRangeFilter(), amountsDto(), approveInvoice(), assertContractStillAdmits(), assertInvoiceVisible(), assertProviderActive(), assertUniqueNumber() (+46 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.09
Nodes (31): moneyRule(), optionalDate(), percentRule(), contractsRoutes, ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+23 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "handleFirebaseDocs.js"
Cohesion: 0.21
Nodes (8): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), deleteDocApi(), firebase

### Community 37 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 38 - "@mui/material"
Cohesion: 0.08
Nodes (48): getDashboardSummaryAPI(), ADR-0002, appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard() (+40 more)

### Community 39 - "server.js"
Cohesion: 0.14
Nodes (14): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+6 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (17): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+9 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.09
Nodes (26): ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020, ADR-0024 (+18 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "identityDocuments.service.js"
Cohesion: 0.09
Nodes (20): defineMaster(), constructionCompaniesRoutes, constructionCompaniesConfig, constructionCompaniesService, ADR-0004, DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT (+12 more)

### Community 46 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, cron:run, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart (+6 more)

### Community 48 - "constants.js"
Cohesion: 0.04
Nodes (65): contractsApi, getInvoiceContractsSelectAPI(), getInvoiceProvidersSelectAPI(), invoicesApi, ADR-0017, refreshSession(), ContractsPage, InvoicesPage (+57 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "ProviderDetailPage.jsx"
Cohesion: 0.07
Nodes (37): getProviderTypeFieldsAPI(), getProviderTypesSelectAPI, providerTypesApi, saveProviderTypeFieldsAPI(), useInvoiceViewChange(), ProviderTypePage, FormSection(), PROVIDER_INVOICE_VIEW_OPTIONS (+29 more)

### Community 51 - "auditContext"
Cohesion: 0.10
Nodes (44): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, ADR-0002, ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS (+36 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.06
Nodes (59): getConstructionCompaniesSelectAPI, contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+51 more)

### Community 53 - "providerTypeFields.service.js"
Cohesion: 0.12
Nodes (28): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+20 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "react"
Cohesion: 0.07
Nodes (38): deleteProfileAPI(), getModulesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), getBasicInformationAPI(), paginationUsersAPI(), updateAccountAPI() (+30 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (33): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+25 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "useAuth"
Cohesion: 0.06
Nodes (85): getStatusesByScopeAPI(), contractPoliciesApi, getContractAdvanceAPI(), getReasonsSelectAPI(), useAuth(), useInvoiceViews(), showError(), useSocket() (+77 more)

### Community 59 - "workScope.service.js"
Cohesion: 0.10
Nodes (28): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), managedWhere(), resolveWorkScope(), selectMyWorks(), WORK_HEADER (+20 more)

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
Cohesion: 0.15
Nodes (15): cancelTransitionFor(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS, INVOICE_TYPES, ADR-0020, NOTE_COLUMNS, STATE_ALLOWS (+7 more)

### Community 71 - "ToastService.js"
Cohesion: 0.06
Nodes (53): getIdentityDocumentsSelectAPI, invoiceTransitionsApi, getProfilesAPI(), checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, workProvidersApi (+45 more)

### Community 88 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.03
Nodes (74): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, getInsurersSelectAPI, insurersApi, reasonsApi, supervisionTypesApi (+66 more)

### Community 100 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (33): ADR-0003, express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers() (+25 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "PolicyTypePage.jsx"
Cohesion: 0.15
Nodes (15): configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, PolicyTypePage, POLICY_BASE_OPTIONS, policyBaseName(), ConfigureBaseDialog() (+7 more)

### Community 108 - "contractEndDateReconciliation.service.js"
Cohesion: 0.15
Nodes (24): findUsersWithPermission(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress() (+16 more)

### Community 112 - "advanceTerms.js"
Cohesion: 0.15
Nodes (22): advanceBalances(), appliedPct(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits(), balancesDto(), httpError(), ADR-0024 (+14 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "MainLayout/index.jsx"
Cohesion: 0.13
Nodes (25): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), Footer(), Header(), WorkSection() (+17 more)

### Community 117 - "invoices.routes.js"
Cohesion: 0.11
Nodes (28): accessOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, grantedOf(), INVOICE_FIELDS, notify() (+20 more)

### Community 118 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "decimal"
Cohesion: 0.10
Nodes (34): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE (+26 more)

### Community 123 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 124 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.25
Nodes (6): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`

### Community 130 - "contractPolicies.service.js"
Cohesion: 0.14
Nodes (20): toPercent(), insuredValue(), policyBaseValue(), conceptLabel(), getContractPolicies(), ADR-0017, ADR-0018, ADR-0019 (+12 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "transaction.service.js"
Cohesion: 0.21
Nodes (11): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+3 more)

### Community 133 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 134 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 136 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "getIO"
Cohesion: 0.10
Nodes (23): socket.io, authenticateHandshake(), getCookieValue(), init(), getIO(), setIO(), ACCESS_COOKIE_NAME, isSessionActive() (+15 more)

### Community 151 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 152 - "themes/index.jsx"
Cohesion: 0.20
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 153 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 154 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 156 - "runIdempotent"
Cohesion: 0.29
Nodes (10): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+2 more)

### Community 157 - "invoiceViews.js"
Cohesion: 0.15
Nodes (25): PERMISSIONS, applyInvoiceViewChange(), ADR-0010, createContractInvoice(), ANY_CONTRACT_VIEW_PERMISSION, ANY_VIEW_PERMISSION, applyProviderViewChanges(), assertNotMixed() (+17 more)

### Community 159 - "invoices.controller.test.js"
Cohesion: 0.25
Nodes (6): emit, getEffectivePermissionIds, invoicesServiceMock, ADR-0020, SCOPE, workScopeOf

### Community 163 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 173 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 174 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 175 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.39
Nodes (6): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 179 - "WorkScopeContext.jsx"
Cohesion: 0.09
Nodes (31): providersApi, getMyWorksSelectAPI(), getWorkManagersSelectAPI(), getWorksSummaryAPI(), previewWorkEndDateAPI(), worksApi, genericRequest, instance (+23 more)

### Community 181 - "contracts.controller.test.js"
Cohesion: 0.17
Nodes (10): conceptsServiceMock, contractsServiceMock, emit, getEffectivePermissionIds, ADR-0015, ADR-0016, policiesServiceMock, SCOPE (+2 more)

### Community 183 - "useConfig"
Cohesion: 0.22
Nodes (10): ConfigContext, ConfigProvider(), useConfig(), useLocalStorage(), ElevationScroll(), HorizontalBar(), ImageList(), srcset() (+2 more)

### Community 186 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **874 isolated node(s):** `TABS`, `axios`, `@azure/identity`, `bcrypt`, `compression` (+869 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1201 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **80 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0003` connect `masterRouter.utils.js` to `MainRoutes.jsx`, `master.service.js`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `withLockedTransaction`, `server/package.json`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `formatTime.js`, `withAlpha`, `client/package.json`, `AuthForgotPassword.jsx`, `themes/index.jsx`, `ContactsEditor.jsx`, `DebouncedInput.jsx`, `NotificationSection/index.jsx`, `constants.js`, `EasyCrop.jsx`, `ProviderDetailPage.jsx`, `WorkScopeContext.jsx`, `InputLabel.jsx`, `ContractFormPage.jsx`, `react`, `useConfig`, `useAuth`, `ToastService.js`, `MainRoutes.jsx`, `PolicyTypePage.jsx`, `MainLayout/index.jsx`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **What connects `TABS`, `axios`, `@azure/identity` to the rest of the system?**
  _874 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `withLockedTransaction` be split into smaller, more focused modules?**
  _Cohesion score 0.0647307924984876 - nodes in this community are weakly interconnected._
# Graph Report - WEBPAC-INTERVE  (2026-10-13)

## Corpus Check
- 550 files · ~253,431 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3055 nodes · 8226 edges · 181 communities (107 shown, 74 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 115 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2e46f03b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- WorkFormPage.jsx
- UsersPage.jsx
- dependencies
- server/package.json
- providers.service.js
- runIdempotent
- writeAudit
- contracts.service.js
- ProviderFormPage.jsx
- seed.demo.js
- auth.routes.js
- showSuccess
- client/package.json
- @tabler/icons-react
- validation.utils.js
- users.service.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- providers.routes.js
- dashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- retentionTerms.js
- Default/index.jsx
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
- @mui/material
- server.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorksSummary.jsx
- scripts
- contractEndDateReconciliation.service.test.js
- `tbl_invoices`
- ProviderTypeFieldsDialog.jsx
- app.service.js
- ContractFormPage.jsx
- providerTypeFields.service.js
- `tbl_contract_type_fields`
- InvoiceFormPage.jsx
- transaction.mock.js
- scripts
- showError
- auditContext
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- floatingPoint.guard.test.js
- notifications.routes.js
- invoiceTerms.js
- react
- `tbl_contract_status_history`
- masterRouter.utils.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- getIO
- `tbl_provider_type_field_versions`
- DocumentManagement.jsx
- contractPolicies.service.js
- AdvanceAmountsSection.jsx
- `tbl_works`
- `tbl_policies`
- eslint.config.mjs
- invoices.routes.js
- WorkScopeContext.jsx
- error.middleware.js
- addressTypes.service.js
- `tbl_providers`
- transaction.service.test.js
- images.js
- auth.service.test.js
- `tbl_contract_suspensions`
- contracts.controller.test.js
- `tbl_providers`
- decimal
- contracts.service.test.js
- contractSuspensions.service.test.js
- winston.config.js
- contractEndDateReconciliation.service.js
- master.service.test.js
- users.service.test.js
- workScope.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- themes/index.jsx
- browserslist
- contractPolicies.service.test.js
- DebouncedInput.jsx
- volta
- constants.js
- NotificationSection/index.jsx
- authjwt.middleware.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- AuthenticationRoutes.jsx
- `tbl_users`
- session.service.test.js
- ImageList.jsx
- `tbl_invoice_liquidation_details`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 125 edges
2. `react` - 96 edges
3. `useAuth()` - 81 edges
4. `showError()` - 76 edges
5. `writeAudit()` - 57 edges
6. `showSuccess()` - 57 edges
7. `withLockedTransaction()` - 56 edges
8. `auditContext()` - 48 edges
9. `workScopeOf()` - 48 edges
10. `@tabler/icons-react` - 47 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js
- `SamplePage()` --calls--> `MainCard()`  [EXTRACTED]
  client/src/views/sample-page/index.jsx → client/src/ui-component/cards/MainCard.jsx
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `PrivateRoute()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/routes/PrivateRoute.jsx → client/src/contexts/authContext.jsx

## Import Cycles
- None detected.

## Communities (181 total, 74 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.06
Nodes (35): createCustomShadow(), CustomShadows(), Alert(), Avatar(), Button(), CardActions(), CardContent(), CardHeader() (+27 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "WorkFormPage.jsx"
Cohesion: 0.07
Nodes (40): addressTypesApi, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, supervisionTypesApi, getWorkManagersSelectAPI() (+32 more)

### Community 3 - "UsersPage.jsx"
Cohesion: 0.13
Nodes (26): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+18 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (57): INACTIVE_STATUS, identificationError(), assertIdentification(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope() (+49 more)

### Community 7 - "runIdempotent"
Cohesion: 0.15
Nodes (18): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+10 more)

### Community 8 - "writeAudit"
Cohesion: 0.04
Nodes (77): bcrypt, ref_crypto, @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, prisma (+69 more)

### Community 9 - "contracts.service.js"
Cohesion: 0.05
Nodes (121): ADR-0021, inScope(), scopeOf(), moneyText(), sumMoney(), dateOnlyText(), FIELD_GROUPS, typeAppliesAiu() (+113 more)

### Community 10 - "ProviderFormPage.jsx"
Cohesion: 0.11
Nodes (33): getAddressTypesSelectAPI, getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), providersApi, getProviderTypesSelectAPI, ProviderFormPage, channelsOf(), ContactDialog() (+25 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.07
Nodes (29): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+21 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "showSuccess"
Cohesion: 0.08
Nodes (37): contractPoliciesApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, getModulesAPI(), getProfilesAPI(), saveProfileAPI(), getBasicInformationAPI(), saveUserAPI() (+29 more)

### Community 14 - "client/package.json"
Cohesion: 0.08
Nodes (24): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+16 more)

### Community 15 - "@tabler/icons-react"
Cohesion: 0.09
Nodes (19): admin, icons, billing, dashboard, icons, menuItems, icons, other (+11 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.09
Nodes (26): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+18 more)

### Community 17 - "users.service.js"
Cohesion: 0.08
Nodes (42): ADR-0013, capitalize(), createMasterService(), httpError(), ADR-0004, ADR-0027, containsFilter(), countByStatus() (+34 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.10
Nodes (19): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.16
Nodes (19): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider(), getStoredUser() (+11 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 22 - "dashboard.service.js"
Cohesion: 0.12
Nodes (34): ACTIVE_STATUS, DELETED_STATUS, scopeWhere(), todayDateOnly(), contractsBlock(), getDashboardSummary(), invoicesBlock(), invoicesWhere() (+26 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (60): ADR-0004, ADR-0007, diffFields(), assertInScope(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING (+52 more)

### Community 26 - "retentionTerms.js"
Cohesion: 0.15
Nodes (21): @prisma/client, ratioText(), amountsDto(), balanceChange(), contractBalances(), hasDetail(), revalidateOnApprove(), revalidateOnCancel() (+13 more)

### Community 27 - "Default/index.jsx"
Cohesion: 0.25
Nodes (16): getDashboardSummaryAPI(), ADR-0002, MainCard(), AlertsCard(), Empty(), LatestInvoicesCard(), num, QuickAccessCard() (+8 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.13
Nodes (13): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+5 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.10
Nodes (47): adjustableAmount(), approveInvoice(), assertInvoiceVisible(), assertProviderActive(), assertUniqueNumber(), auditable(), cancelInvoice(), countByState() (+39 more)

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

### Community 36 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 37 - "session.service.js"
Cohesion: 0.10
Nodes (30): jsonwebtoken, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME (+22 more)

### Community 38 - "@mui/material"
Cohesion: 0.08
Nodes (19): PrivateRoute(), headerStyle, ChipMultiSelect(), fold(), FilterPopper(), normalizeOptions(), BInputLabel, InputLabel() (+11 more)

### Community 39 - "server.js"
Cohesion: 0.14
Nodes (14): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+6 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.04
Nodes (25): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, ALL (+17 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (49): ADR-0003, ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020 (+41 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "WorksSummary.jsx"
Cohesion: 0.12
Nodes (18): MainContentStyled, closedMixin(), MiniDrawerStyled, openedMixin(), appDrawerWidth, drawerWidth, gridSpacing, CardSecondaryAction() (+10 more)

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
Cohesion: 0.31
Nodes (9): getProviderTypeFieldsAPI(), saveProviderTypeFieldsAPI(), DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006, ProviderTypeFieldsDialog(), toggle(), toRow() (+1 more)

### Community 51 - "app.service.js"
Cohesion: 0.13
Nodes (15): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+7 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.09
Nodes (42): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+34 more)

### Community 53 - "providerTypeFields.service.js"
Cohesion: 0.12
Nodes (28): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+20 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "InvoiceFormPage.jsx"
Cohesion: 0.08
Nodes (44): suspendContractAPI(), getInvoiceContractsSelectAPI(), getInvoiceProvidersSelectAPI(), invoiceTransitionsApi, ADR-0017, getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012 (+36 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.07
Nodes (25): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+17 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "showError"
Cohesion: 0.07
Nodes (65): getStatusesByScopeAPI(), invoicesApi, workProvidersApi, useInvoiceViews(), showError(), useSocket(), SubCard(), ContactsList() (+57 more)

### Community 59 - "auditContext"
Cohesion: 0.07
Nodes (62): auditContext(), getEffectivePermissionIds(), hasEffectivePermission(), IDEMPOTENCY_HEADER, ALL, assertAnyInScope(), canViewAllWorks(), httpError() (+54 more)

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
Nodes (14): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+6 more)

### Community 68 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 70 - "invoiceTerms.js"
Cohesion: 0.17
Nodes (14): cancelTransitionFor(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS, INVOICE_TYPES, ADR-0020, NOTE_COLUMNS, STATE_ALLOWS (+6 more)

### Community 71 - "react"
Cohesion: 0.12
Nodes (28): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), setParentOpenedMenu(), useMenuCollapse() (+20 more)

### Community 88 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (31): express, verifyToken(), requirePermission(), validate(), createMasterControllers(), createMasterRouter(), identityDocumentsRoutes, ADR-0019 (+23 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (107): contractsApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), providerTypesApi, reasonsApi, useAuth(), useWorkFilterField() (+99 more)

### Community 100 - "getIO"
Cohesion: 0.09
Nodes (25): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), getIO(), setIO() (+17 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "DocumentManagement.jsx"
Cohesion: 0.32
Nodes (11): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+3 more)

### Community 108 - "contractPolicies.service.js"
Cohesion: 0.11
Nodes (28): percentText(), toPercent(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, policyBaseValue() (+20 more)

### Community 112 - "AdvanceAmountsSection.jsx"
Cohesion: 0.27
Nodes (10): getContractAdvanceAPI(), MoneyField(), moneyInputText(), parseMoneyInput(), AdjustableAmount(), AdvanceAmountsSection(), Figures(), MONEY (+2 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 117 - "invoices.routes.js"
Cohesion: 0.10
Nodes (31): ADR-0022, server_src_modules_admin_contracttypes_contracttypes_service_contract_invoice_views, invoicesRoutes, ADR-0017, approveInvoiceSchema, cancelInvoiceSchema, getContractAdvanceSchema, getInvoiceSchema (+23 more)

### Community 118 - "WorkScopeContext.jsx"
Cohesion: 0.23
Nodes (13): getMyWorksSelectAPI(), pickWork(), useWorkScope(), WorkScopeContext, WorkScopeProvider(), WorkSection(), Loadable(), Loader() (+5 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.10
Nodes (28): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+20 more)

### Community 120 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 123 - "transaction.service.test.js"
Cohesion: 0.26
Nodes (8): ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.25
Nodes (6): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`

### Community 130 - "contracts.controller.test.js"
Cohesion: 0.17
Nodes (10): conceptsServiceMock, contractsServiceMock, emit, getEffectivePermissionIds, ADR-0015, ADR-0016, policiesServiceMock, SCOPE (+2 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "decimal"
Cohesion: 0.12
Nodes (31): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ratioPercent() (+23 more)

### Community 133 - "contracts.service.test.js"
Cohesion: 0.07
Nodes (19): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+11 more)

### Community 134 - "contractSuspensions.service.test.js"
Cohesion: 0.17
Nodes (5): ctx, initial, ADR-0017, prismaMock, state

### Community 136 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 137 - "contractEndDateReconciliation.service.js"
Cohesion: 0.36
Nodes (9): findUsersWithPermission(), insertNotification(), daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), ADR-0015, reportEmails(), runEndDateReconciliation() (+1 more)

### Community 139 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 140 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 142 - "workScope.service.test.js"
Cohesion: 0.40
Nodes (4): hasEffectivePermission, prismaMock, state, user

### Community 151 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 152 - "themes/index.jsx"
Cohesion: 0.13
Nodes (15): App(), config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext, ConfigContext, ConfigProvider() (+7 more)

### Community 153 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 154 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 156 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 157 - "constants.js"
Cohesion: 0.06
Nodes (34): configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, instance, NO_REFRESH_URLS, refreshClient, refreshSession(), PolicyTypePage (+26 more)

### Community 159 - "NotificationSection/index.jsx"
Cohesion: 0.24
Nodes (13): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), getTimeAgo(), ListItemWrapper(), NotificationList() (+5 more)

### Community 166 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 173 - "AuthenticationRoutes.jsx"
Cohesion: 0.12
Nodes (19): client_src_assets_images_interve, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+11 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.39
Nodes (6): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 181 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

## Knowledge Gaps
- **879 isolated node(s):** `ADR-0017`, `STATUS_TABS`, `CONTRACT_INVOICE_TYPES`, `CONTRACT_INVOICE_VIEW_OPTIONS`, `TERM_UNIT_NAMES` (+874 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1203 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **74 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `WorkFormPage.jsx`, `UsersPage.jsx`, `ProviderFormPage.jsx`, `showSuccess`, `client/package.json`, `@tabler/icons-react`, `AuthForgotPassword.jsx`, `themes/index.jsx`, `DebouncedInput.jsx`, `Default/index.jsx`, `constants.js`, `NotificationSection/index.jsx`, `WorksSummary.jsx`, `AuthenticationRoutes.jsx`, `ProviderTypeFieldsDialog.jsx`, `ContractFormPage.jsx`, `ImageList.jsx`, `InvoiceFormPage.jsx`, `showError`, `react`, `useAuth`, `DocumentManagement.jsx`, `AdvanceAmountsSection.jsx`, `WorkScopeContext.jsx`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `ADR-0003` connect `permissions.constants.js` to `users.service.js`, `useAuth`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `writeAudit`, `server/package.json`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **What connects `ADR-0017`, `STATUS_TABS`, `CONTRACT_INVOICE_TYPES` to the rest of the system?**
  _879 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0629800307219662 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `WorkFormPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
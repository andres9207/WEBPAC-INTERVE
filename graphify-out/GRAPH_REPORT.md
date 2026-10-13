# Graph Report - WEBPAC-INTERVE  (2026-10-13)

## Corpus Check
- 552 files · ~257,114 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3067 nodes · 8293 edges · 191 communities (114 shown, 77 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 116 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6cbe7f09`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- react
- UsersPage.jsx
- dependencies
- server/package.json
- providers.service.js
- prismaClient.js
- writeAudit
- contracts.service.js
- withAlpha
- seed.demo.js
- auth.routes.js
- SocketProvider.jsx
- client/package.json
- menu-items/index.js
- validation.utils.js
- master.service.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- providers.routes.js
- dashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contractSuspensions.service.test.js
- InvoiceFormPage.jsx
- providers.service.test.js
- masterRouter.utils.test.js
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
- contractTerms.js
- scripts
- constants.js
- `tbl_invoices`
- ProviderFormPage.jsx
- app.routes.js
- ContractFormPage.jsx
- contractFields.js
- `tbl_contract_type_fields`
- showError
- transaction.mock.js
- scripts
- useAuth
- works.routes.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- transaction.service.test.js
- notifications.routes.js
- invoiceTerms.js
- ContactsEditor.jsx
- `tbl_contract_status_history`
- masterRouter.utils.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- getIO
- `tbl_provider_type_field_versions`
- DocumentManagement.jsx
- contracts.service.test.js
- ConfigContext.jsx
- `tbl_works`
- `tbl_policies`
- MainLayout/index.jsx
- invoices.routes.js
- auth.service.test.js
- error.middleware.js
- decimal
- `tbl_providers`
- error.middleware.test.js
- images.js
- auditContext
- `tbl_contract_suspensions`
- invoices.controller.test.js
- `tbl_providers`
- retentionTerms.js
- money.utils.js
- works.controller.test.js
- winston.config.js
- uniqueConstraints.constants.test.js
- useGetMenuMaster
- works.service.test.js
- socket.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- themes/index.jsx
- browserslist
- revalidateOnApprove
- DebouncedInput.jsx
- users.service.test.js
- AppBar.jsx
- AuthenticationRoutes.jsx
- workScope.service.js
- authjwt.middleware.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- permissions.routes.js
- httpCliente.js
- NotificationSection/index.jsx
- `tbl_users`
- EasyCrop.jsx
- session.service.test.js
- WorkScopeContext.jsx
- contracts.controller.test.js
- useConfig
- contractPolicies.service.test.js
- `tbl_invoice_liquidation_details`
- auth.controller.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 126 edges
2. `react` - 97 edges
3. `useAuth()` - 81 edges
4. `showError()` - 76 edges
5. `writeAudit()` - 59 edges
6. `showSuccess()` - 57 edges
7. `withLockedTransaction()` - 56 edges
8. `workScopeOf()` - 48 edges
9. `auditContext()` - 48 edges
10. `@tabler/icons-react` - 48 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `MasterPage()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/contexts/authContext.jsx
- `MasterPage()` --calls--> `useListFilters()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/hooks/useListFilters.js
- `MasterPage()` --calls--> `showError()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/services/ToastService.js

## Import Cycles
- None detected.

## Communities (191 total, 77 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "react"
Cohesion: 0.06
Nodes (49): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, useEndDatePreview(), ProfileSection() (+41 more)

### Community 3 - "UsersPage.jsx"
Cohesion: 0.17
Nodes (20): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+12 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (51): applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes(), assertTypeIds(), assertWorkAssignable() (+43 more)

### Community 7 - "prismaClient.js"
Cohesion: 0.15
Nodes (20): @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, testConnection(), resolveFields(), CATALOG_SELECT (+12 more)

### Community 8 - "writeAudit"
Cohesion: 0.04
Nodes (79): ADR-0013, bcrypt, ref_crypto, prisma, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows() (+71 more)

### Community 9 - "contracts.service.js"
Cohesion: 0.06
Nodes (98): ADR-0016, ADR-0018, ADR-0026, main(), diffFields(), newOperationId(), percentText(), toPercent() (+90 more)

### Community 10 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.06
Nodes (29): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+21 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.16
Nodes (21): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+13 more)

### Community 13 - "SocketProvider.jsx"
Cohesion: 0.19
Nodes (11): refreshSession(), App(), AuthContext, NavigationScroll(), SocketContext, SocketProvider(), pathSocket, urlSocket (+3 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (34): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+26 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.09
Nodes (27): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+19 more)

### Community 17 - "master.service.js"
Cohesion: 0.05
Nodes (62): ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation() (+54 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.10
Nodes (19): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.17
Nodes (18): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider(), getStoredUser() (+10 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.13
Nodes (17): checkIdentificationController, selectProvidersController, ADR-0012, providersRoutes, assignProviderSchema, changeProviderStatusSchema, checkIdentificationSchema, deleteProviderSchema (+9 more)

### Community 22 - "dashboard.service.js"
Cohesion: 0.10
Nodes (36): scopeWhere(), contractsBlock(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002, notDeleted, policiesBlock() (+28 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.12
Nodes (14): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, app, __dirname (+6 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (53): ADR-0004, ADR-0007, assertInScope(), defineContacts(), FIELDS, httpError(), ADR-0009, optionalText() (+45 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.07
Nodes (15): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+7 more)

### Community 27 - "InvoiceFormPage.jsx"
Cohesion: 0.13
Nodes (27): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceProvidersSelectAPI(), invoicesApi, ADR-0017, MoneyField(), moneyInputText(), parseMoneyInput() (+19 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.12
Nodes (14): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+6 more)

### Community 29 - "masterRouter.utils.test.js"
Cohesion: 0.07
Nodes (21): config, emit, forged, serviceMock, mockReq(), emit, fieldsServiceMock, mockDelete (+13 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.10
Nodes (48): ADR-0025, adjustableAmount(), approveInvoice(), assertInvoiceVisible(), assertProviderActive(), assertUniqueNumber(), auditable(), cancelInvoice() (+40 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.08
Nodes (36): moneyRule(), optionalDate(), percentRule(), getContractController, getContractFieldsController, getContractFormOptionsController, getContractPoliciesController, previewContractEndDateController (+28 more)

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
Cohesion: 0.15
Nodes (18): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+10 more)

### Community 38 - "@mui/material"
Cohesion: 0.08
Nodes (40): getDashboardSummaryAPI(), ADR-0002, getWorksSummaryAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard() (+32 more)

### Community 39 - "server.js"
Cohesion: 0.15
Nodes (13): ref_http, node-cron, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017, registeredTasks (+5 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (18): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, prismaMock (+10 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (59): ADR-0003, ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020 (+51 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "contractTerms.js"
Cohesion: 0.06
Nodes (69): ADR-0021, findUsersWithPermission(), sumMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING (+61 more)

### Community 46 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, cron:run, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart (+6 more)

### Community 48 - "constants.js"
Cohesion: 0.06
Nodes (42): contractsApi, useWorkFilterField(), ADR-0002, useLinkedFilters(), ContractsPage, InvoicesPage, LinkedFilterNotice(), TooltipLongText() (+34 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "ProviderFormPage.jsx"
Cohesion: 0.07
Nodes (37): ADR-0012, providersApi, getProviderTypeFieldsAPI(), getProviderTypesSelectAPI, providerTypesApi, saveProviderTypeFieldsAPI(), useInvoiceViewChange(), ProvidersPage (+29 more)

### Community 51 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.09
Nodes (43): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+35 more)

### Community 53 - "contractFields.js"
Cohesion: 0.18
Nodes (14): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+6 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "showError"
Cohesion: 0.06
Nodes (73): contractPoliciesApi, suspendContractAPI(), getIdentityDocumentsSelectAPI, getInsurersSelectAPI, invoiceTransitionsApi, getPolicyTypesSelectAPI, getModulesAPI(), getProfilesAPI() (+65 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (29): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+21 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "useAuth"
Cohesion: 0.07
Nodes (61): getStatusesByScopeAPI(), workProvidersApi, useAuth(), useInvoiceViews(), PrivateRoute(), useSocket(), ContactsList(), ADR-0009 (+53 more)

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

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 70 - "invoiceTerms.js"
Cohesion: 0.14
Nodes (18): isContractCreate(), isCreate(), isSimpleCreate(), cancelTransitionFor(), hasContract(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS (+10 more)

### Community 71 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 88 - "masterRouter.utils.js"
Cohesion: 0.11
Nodes (29): express, verifyToken(), requirePermission(), validate(), IDEMPOTENCY_HEADER, revokeSession(), createMasterControllers(), createMasterRouter() (+21 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.03
Nodes (86): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi (+78 more)

### Community 100 - "getIO"
Cohesion: 0.13
Nodes (16): getIO(), configurePolicyTypeBaseController, FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, deleteProfileController(), getModulesController() (+8 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "DocumentManagement.jsx"
Cohesion: 0.32
Nodes (11): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+3 more)

### Community 108 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 112 - "ConfigContext.jsx"
Cohesion: 0.27
Nodes (7): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage()

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "MainLayout/index.jsx"
Cohesion: 0.18
Nodes (16): handlerDrawerOpen(), useWorkScope(), Footer(), Header(), WorkSection(), MainLayout(), MainLayoutContent(), ScopedOutlet() (+8 more)

### Community 117 - "invoices.routes.js"
Cohesion: 0.11
Nodes (27): accessOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, grantedOf(), INVOICE_FIELDS, notify() (+19 more)

### Community 118 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "decimal"
Cohesion: 0.18
Nodes (24): decimal(), moneyText(), ratioPercent(), ratioText(), roundMoney(), roundRatio(), advanceBalances(), appliedPct() (+16 more)

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "auditContext"
Cohesion: 0.12
Nodes (37): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, ADR-0002, ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS (+29 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.25
Nodes (6): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`

### Community 130 - "invoices.controller.test.js"
Cohesion: 0.25
Nodes (6): emit, getEffectivePermissionIds, invoicesServiceMock, ADR-0020, SCOPE, workScopeOf

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "retentionTerms.js"
Cohesion: 0.22
Nodes (13): @prisma/client, assertLiquidationCancellable(), assertRefundFits(), assertRetentionFits(), httpError(), ADR-0025, money(), retentionBalances() (+5 more)

### Community 133 - "money.utils.js"
Cohesion: 0.15
Nodes (14): HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ROUNDING, toMoney() (+6 more)

### Community 134 - "works.controller.test.js"
Cohesion: 0.29
Nodes (5): emit, getEffectivePermissionIds, SCOPE, serviceMock, workScopeOf

### Community 136 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 139 - "useGetMenuMaster"
Cohesion: 0.27
Nodes (12): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), MenuList() (+4 more)

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
Cohesion: 0.33
Nodes (6): createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor, Typography()

### Community 153 - "browserslist"
Cohesion: 0.27
Nodes (6): browserslist, development, production, volta, node, yarn

### Community 154 - "revalidateOnApprove"
Cohesion: 0.53
Nodes (6): balanceChange(), contractBalances(), hasDetail(), revalidateOnApprove(), revalidateOnCancel(), storedAmount()

### Community 156 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 157 - "AppBar.jsx"
Cohesion: 0.21
Nodes (11): client_src_assets_images_interve, LogoSection(), AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthCardWrapper() (+3 more)

### Community 159 - "AuthenticationRoutes.jsx"
Cohesion: 0.18
Nodes (11): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router (+3 more)

### Community 163 - "workScope.service.js"
Cohesion: 0.18
Nodes (15): hasEffectivePermission(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope() (+7 more)

### Community 166 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 173 - "permissions.routes.js"
Cohesion: 0.23
Nodes (13): getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController(), permissionsRoutes (+5 more)

### Community 174 - "httpCliente.js"
Cohesion: 0.15
Nodes (9): getPermissionsCatalogAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient, activeWorkHeader(), WORK_HEADER, axios (+1 more)

### Community 175 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.39
Nodes (6): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 179 - "WorkScopeContext.jsx"
Cohesion: 0.36
Nodes (9): getMyWorksSelectAPI(), pickWork(), WorkScopeContext, WorkScopeProvider(), ALL_WORKS, readStoredWork(), setActiveWorkHeader(), storageKey() (+1 more)

### Community 181 - "contracts.controller.test.js"
Cohesion: 0.17
Nodes (10): conceptsServiceMock, contractsServiceMock, emit, getEffectivePermissionIds, ADR-0015, ADR-0016, policiesServiceMock, SCOPE (+2 more)

### Community 183 - "useConfig"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 186 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 190 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

## Knowledge Gaps
- **876 isolated node(s):** `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS`, `NO_FIELDS`, `COLUMNS`, `FILTER_FIELDS` (+871 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1202 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **77 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0009` connect `react` to `providers.service.js`?**
  _High betweenness centrality (0.228) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `react`, `UsersPage.jsx`, `withAlpha`, `useGetMenuMaster`, `client/package.json`, `AuthForgotPassword.jsx`, `themes/index.jsx`, `DebouncedInput.jsx`, `InvoiceFormPage.jsx`, `AppBar.jsx`, `AuthenticationRoutes.jsx`, `NotificationSection/index.jsx`, `constants.js`, `EasyCrop.jsx`, `ProviderFormPage.jsx`, `WorkScopeContext.jsx`, `ContractFormPage.jsx`, `showError`, `useConfig`, `useAuth`, `ContactsEditor.jsx`, `MainRoutes.jsx`, `DocumentManagement.jsx`, `MainLayout/index.jsx`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `axios` connect `httpCliente.js` to `server/package.json`, `client/package.json`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **What connects `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS`, `NO_FIELDS` to the rest of the system?**
  _876 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.0627027027027027 - nodes in this community are weakly interconnected._
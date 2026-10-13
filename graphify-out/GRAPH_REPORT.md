# Graph Report - WEBPAC-INTERVE  (2026-10-13)

## Corpus Check
- 552 files · ~256,740 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3067 nodes · 8287 edges · 182 communities (104 shown, 78 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 116 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `91d6e6e3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- WorkFormPage.jsx
- @tabler/icons-react
- dependencies
- server/package.json
- providers.service.js
- prismaClient.js
- writeAudit
- contracts.service.js
- withAlpha
- seed.demo.js
- auth.routes.js
- httpCliente.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- users.service.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- workScopeOf
- dashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contractSuspensions.service.test.js
- InvoiceFormPage.jsx
- providers.service.test.js
- contracts.controller.test.js
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
- ProviderTypePage.jsx
- app.routes.js
- ContractFormPage.jsx
- contractFields.js
- `tbl_contract_type_fields`
- showError
- transaction.mock.js
- scripts
- react-router-dom
- workScope.service.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- floatingPoint.guard.test.js
- notifications.routes.js
- invoiceTerms.js
- ProviderFormPage.jsx
- `tbl_contract_status_history`
- masterRouter.utils.js
- `tbl_status`
- react
- `tbl_permissions`
- getIO
- `tbl_provider_type_field_versions`
- DocumentManagement.jsx
- contracts.service.test.js
- ConfigContext.jsx
- `tbl_works`
- `tbl_policies`
- WorkScopeContext.jsx
- invoiceViews.js
- auth.service.test.js
- error.middleware.js
- decimal
- `tbl_providers`
- transaction.service.test.js
- images.js
- contractEndDateReconciliation.service.test.js
- `tbl_contract_suspensions`
- invoices.controller.test.js
- `tbl_providers`
- retentionTerms.js
- money.utils.js
- works.controller.test.js
- winston.config.js
- uniqueConstraints.constants.test.js
- master.service.test.js
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
- authjwt.middleware.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- volta
- `tbl_users`
- EasyCrop.jsx
- session.service.test.js
- InputLabel.jsx
- `tbl_invoice_liquidation_details`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 126 edges
2. `react` - 97 edges
3. `useAuth()` - 81 edges
4. `showError()` - 76 edges
5. `writeAudit()` - 59 edges
6. `showSuccess()` - 57 edges
7. `withLockedTransaction()` - 56 edges
8. `auditContext()` - 48 edges
9. `workScopeOf()` - 48 edges
10. `@tabler/icons-react` - 47 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `getContractFormOptions()` --calls--> `assertInScope()`  [EXTRACTED]
  server/src/modules/work/contracts/contracts.service.js → server/src/common/services/workScope.service.js
- `WorkScopeProvider()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/contexts/WorkScopeContext.jsx → client/src/contexts/authContext.jsx
- `WorkScopeProvider()` --calls--> `showError()`  [EXTRACTED]
  client/src/contexts/WorkScopeContext.jsx → client/src/services/ToastService.js
- `WorkScopeProvider()` --calls--> `useSocket()`  [EXTRACTED]
  client/src/contexts/WorkScopeContext.jsx → client/src/socket/SocketProvider.jsx

## Import Cycles
- None detected.

## Communities (182 total, 78 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "WorkFormPage.jsx"
Cohesion: 0.10
Nodes (28): getConstructionCompaniesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), getWorksSummaryAPI(), previewWorkEndDateAPI(), worksApi, createMasterApi(), ADR-0002 (+20 more)

### Community 3 - "@tabler/icons-react"
Cohesion: 0.14
Nodes (23): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+15 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (65): ADR-0009, withLockedTransaction(), assertInScope(), identificationError(), createContractInvoice(), providerViewOf(), applyProviderTypes(), assertAssignmentDate() (+57 more)

### Community 7 - "prismaClient.js"
Cohesion: 0.06
Nodes (44): @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), AUDIT_ENTITIES (+36 more)

### Community 8 - "writeAudit"
Cohesion: 0.08
Nodes (40): ADR-0013, bcrypt, ref_crypto, auditMisuse(), buildRows(), ADR-0027, protect(), REDACTED (+32 more)

### Community 9 - "contracts.service.js"
Cohesion: 0.06
Nodes (98): ADR-0016, ADR-0018, ADR-0026, main(), diffFields(), percentText(), toPercent(), FIELD_GROUPS (+90 more)

### Community 10 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.07
Nodes (27): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+19 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "httpCliente.js"
Cohesion: 0.11
Nodes (18): instance, NO_REFRESH_URLS, refreshClient, refreshSession(), App(), AuthContext, NavigationScroll(), SocketContext (+10 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (34): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+26 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.10
Nodes (24): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+16 more)

### Community 17 - "users.service.js"
Cohesion: 0.05
Nodes (69): ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, newOperationId(), canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse() (+61 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.10
Nodes (19): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.07
Nodes (38): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), client_src_assets_images_interve (+30 more)

### Community 21 - "workScopeOf"
Cohesion: 0.10
Nodes (33): workScopeOf(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS (+25 more)

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
Cohesion: 0.07
Nodes (61): ADR-0004, ADR-0007, addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS (+53 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.07
Nodes (15): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+7 more)

### Community 27 - "InvoiceFormPage.jsx"
Cohesion: 0.12
Nodes (27): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceProvidersSelectAPI(), invoicesApi, ADR-0017, MoneyField(), moneyInputText(), parseMoneyInput() (+19 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.12
Nodes (14): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+6 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.06
Nodes (27): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+19 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.10
Nodes (48): ADR-0025, adjustableAmount(), approveInvoice(), assertInvoiceVisible(), assertProviderActive(), assertUniqueNumber(), auditable(), cancelInvoice() (+40 more)

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
Cohesion: 0.15
Nodes (18): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+10 more)

### Community 38 - "@mui/material"
Cohesion: 0.08
Nodes (45): getDashboardSummaryAPI(), ADR-0002, appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard() (+37 more)

### Community 39 - "server.js"
Cohesion: 0.15
Nodes (13): ref_http, node-cron, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017, registeredTasks (+5 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (15): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, ctx (+7 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.04
Nodes (55): ADR-0003, ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020 (+47 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "contractTerms.js"
Cohesion: 0.07
Nodes (58): ADR-0021, findUsersWithPermission(), sumMoney(), dateOnlyText(), userFullName(), insertNotification(), toListDto(), daysBetween() (+50 more)

### Community 46 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, cron:run, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart (+6 more)

### Community 48 - "constants.js"
Cohesion: 0.05
Nodes (46): contractsApi, ContractsPage, InvoicesPage, LinkedFilterNotice(), TooltipLongText(), CONTRACT_INVOICE_TYPES, CONTRACT_POLICY_STATUS_LABELS, CONTRACT_STATE_COLORS (+38 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "ProviderTypePage.jsx"
Cohesion: 0.13
Nodes (18): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), useInvoiceViewChange(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES (+10 more)

### Community 51 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (43): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+35 more)

### Community 53 - "contractFields.js"
Cohesion: 0.18
Nodes (14): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+6 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "showError"
Cohesion: 0.06
Nodes (71): contractPoliciesApi, suspendContractAPI(), getInsurersSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, getModulesAPI() (+63 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (26): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+18 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "react-router-dom"
Cohesion: 0.07
Nodes (58): getStatusesByScopeAPI(), useInvoiceViews(), useSocket(), ContactsList(), ADR-0009, DataList(), Figure(), Pending() (+50 more)

### Community 59 - "workScope.service.js"
Cohesion: 0.07
Nodes (39): getEffectivePermissionIds(), hasEffectivePermission(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere() (+31 more)

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
Cohesion: 0.14
Nodes (18): isContractCreate(), isCreate(), isSimpleCreate(), cancelTransitionFor(), hasContract(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS (+10 more)

### Community 71 - "ProviderFormPage.jsx"
Cohesion: 0.09
Nodes (37): getAddressTypesSelectAPI, getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getProviderTypesSelectAPI, ProviderFormPage, channelsOf(), ContactDialog(), ContactsEditor() (+29 more)

### Community 88 - "masterRouter.utils.js"
Cohesion: 0.09
Nodes (33): express, verifyToken(), requirePermission(), validate(), IDEMPOTENCY_HEADER, revokeSession(), createMasterControllers(), createMasterRouter() (+25 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "react"
Cohesion: 0.03
Nodes (91): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, policyTypesApi, providersApi, reasonsApi (+83 more)

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

### Community 116 - "WorkScopeContext.jsx"
Cohesion: 0.06
Nodes (56): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI() (+48 more)

### Community 117 - "invoiceViews.js"
Cohesion: 0.07
Nodes (47): applyInvoiceViewChange(), ADR-0010, providerTypesConfig, providerTypesService, accessOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController (+39 more)

### Community 118 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "decimal"
Cohesion: 0.18
Nodes (24): decimal(), moneyText(), ratioPercent(), ratioText(), roundMoney(), roundRatio(), advanceBalances(), appliedPct() (+16 more)

### Community 123 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 124 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

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

### Community 139 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

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
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 154 - "revalidateOnApprove"
Cohesion: 0.53
Nodes (6): balanceChange(), contractBalances(), hasDetail(), revalidateOnApprove(), revalidateOnCancel(), storedAmount()

### Community 156 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 166 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 173 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 176 - "`tbl_users`"
Cohesion: 0.39
Nodes (6): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

## Knowledge Gaps
- **876 isolated node(s):** `WorkScopeContext`, `EMPTY_FORM`, `axios`, `@azure/identity`, `bcrypt` (+871 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1202 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **78 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0009` connect `providers.service.js` to `WorkFormPage.jsx`?**
  _High betweenness centrality (0.215) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `WorkFormPage.jsx`, `@tabler/icons-react`, `withAlpha`, `client/package.json`, `AuthForgotPassword.jsx`, `themes/index.jsx`, `InvoiceFormPage.jsx`, `DebouncedInput.jsx`, `constants.js`, `EasyCrop.jsx`, `ProviderTypePage.jsx`, `InputLabel.jsx`, `ContractFormPage.jsx`, `showError`, `react-router-dom`, `ProviderFormPage.jsx`, `react`, `DocumentManagement.jsx`, `WorkScopeContext.jsx`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `WorkFormPage.jsx`, `@tabler/icons-react`, `httpCliente.js`, `client/package.json`, `AuthForgotPassword.jsx`, `themes/index.jsx`, `InvoiceFormPage.jsx`, `DebouncedInput.jsx`, `@mui/material`, `constants.js`, `EasyCrop.jsx`, `ProviderTypePage.jsx`, `ContractFormPage.jsx`, `showError`, `react-router-dom`, `ProviderFormPage.jsx`, `DocumentManagement.jsx`, `ConfigContext.jsx`, `WorkScopeContext.jsx`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **What connects `WorkScopeContext`, `EMPTY_FORM`, `axios` to the rest of the system?**
  _876 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `WorkFormPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09872241579558652 - nodes in this community are weakly interconnected._
# Graph Report - WEBPAC-INTERVE  (2026-10-13)

## Corpus Check
- 552 files · ~257,267 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3067 nodes · 8298 edges · 192 communities (114 shown, 78 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 116 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9ce2841b`
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
- users.service.js
- auth.service.js
- contracts.service.js
- withAlpha
- seed.demo.js
- auditContext
- SocketProvider.jsx
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
- contractTerms.js
- scripts
- constants.js
- `tbl_invoices`
- ProviderTypePage.jsx
- writeAudit
- ContractFormPage.jsx
- providerTypeFields.service.js
- `tbl_contract_type_fields`
- @mui/material
- transaction.mock.js
- scripts
- react-router-dom
- works.routes.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- floatingPoint.guard.test.js
- notifications.routes.js
- invoiceTerms.js
- showError
- `tbl_contract_status_history`
- main.routes.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- masterRouter.utils.js
- `tbl_provider_type_field_versions`
- PoliciesTab.jsx
- contractConcepts.service.js
- ConfigContext.jsx
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
- dateOnlyText
- `tbl_contract_suspensions`
- contractPolicies.service.js
- `tbl_providers`
- retentionTerms.js
- resolveDetail
- contractEndDateReconciliation.service.js
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
- ref_prop_types
- DebouncedInput.jsx
- idempotency.service.js
- invoiceViews.js
- transaction.service.js
- contractEndDateReconciliation.service.test.js
- authjwt.middleware.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- dashboard.service.test.js
- httpCliente.js
- NotificationSection/index.jsx
- `tbl_users`
- EasyCrop.jsx
- addressTypes.contacts.js
- WorkScopeContext.jsx
- contracts.controller.test.js
- useConfig
- contractPolicies.service.test.js
- `tbl_invoice_liquidation_details`
- policyTypes.service.test.js
- InputLabel.jsx

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
10. `@tabler/icons-react` - 48 edges

## Surprising Connections (you probably didn't know these)
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `getContractFormOptions()` --calls--> `assertInScope()`  [EXTRACTED]
  server/src/modules/work/contracts/contracts.service.js → server/src/common/services/workScope.service.js
- `createMasterRouter()` --indirect_call--> `verifyToken()`  [INFERRED]
  server/src/common/utils/masterRouter.utils.js → server/src/common/middlewares/authjwt.middleware.js

## Import Cycles
- None detected.

## Communities (192 total, 78 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "WorkFormPage.jsx"
Cohesion: 0.08
Nodes (36): getAddressTypesSelectAPI, getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, identityDocumentsApi, ADR-0017, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), previewWorkEndDateAPI() (+28 more)

### Community 3 - "@tabler/icons-react"
Cohesion: 0.10
Nodes (24): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+16 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (58): applyInvoiceViewChange(), ADR-0010, providerTypesService, applyProviderViewChanges(), assertNotMixed(), resolveProviderView(), applyProviderTypes(), assertAssignmentDate() (+50 more)

### Community 7 - "users.service.js"
Cohesion: 0.07
Nodes (42): ADR-0004, ADR-0013, capitalize(), createMasterService(), defineMaster(), httpError(), ADR-0027, countByStatus() (+34 more)

### Community 8 - "auth.service.js"
Cohesion: 0.10
Nodes (28): bcrypt, ref_crypto, REDACTED, backoff(), runTransaction(), withTransaction(), comparePassword(), hashPassword() (+20 more)

### Community 9 - "contracts.service.js"
Cohesion: 0.11
Nodes (36): ADR-0016, ADR-0018, ADR-0026, assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork() (+28 more)

### Community 10 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.08
Nodes (28): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+20 more)

### Community 12 - "auditContext"
Cohesion: 0.11
Nodes (27): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+19 more)

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
Cohesion: 0.11
Nodes (21): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+13 more)

### Community 17 - "prismaClient.js"
Cohesion: 0.07
Nodes (33): adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), ACTIVE_STATUS, DELETED_STATUS (+25 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.10
Nodes (19): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.07
Nodes (37): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), client_src_assets_images_interve, AuthProvider() (+29 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 22 - "dashboard.service.js"
Cohesion: 0.10
Nodes (41): scopeWhere(), containsFilter(), dateRangeFilter(), filtersWhere(), idFilter(), todayDateOnly(), contractsBlock(), getDashboardSummary() (+33 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.12
Nodes (14): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, app, __dirname (+6 more)

### Community 25 - "works.service.js"
Cohesion: 0.10
Nodes (42): ADR-0007, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted(), assertHeader(), assertManagerUsers() (+34 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.05
Nodes (26): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), row(), ctx, prismaMock, state (+18 more)

### Community 27 - "InvoiceFormPage.jsx"
Cohesion: 0.22
Nodes (16): getInvoiceContractsSelectAPI(), getInvoiceProvidersSelectAPI(), FormSection(), amountsPayload(), DOCUMENT_FIELDS, EMPTY_FORM, hasAmounts(), InvoiceFormPage() (+8 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.12
Nodes (14): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+6 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.10
Nodes (48): ADR-0025, approveInvoice(), assertInvoiceVisible(), assertProviderActive(), assertUniqueNumber(), auditable(), balanceChange(), cancelInvoice() (+40 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.07
Nodes (54): workScopeOf(), moneyRule(), optionalDate(), percentRule(), ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS, CONTRACT_FIELDS (+46 more)

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
Cohesion: 0.13
Nodes (20): jsonwebtoken, ACCESS_COOKIE_NAME, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken() (+12 more)

### Community 38 - "Default/index.jsx"
Cohesion: 0.10
Nodes (34): getDashboardSummaryAPI(), ADR-0002, appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), Avatar() (+26 more)

### Community 39 - "server.js"
Cohesion: 0.15
Nodes (13): ref_http, node-cron, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017, registeredTasks (+5 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.05
Nodes (20): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, dbUser (+12 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (44): ADR-0003, ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020 (+36 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "contractTerms.js"
Cohesion: 0.11
Nodes (29): ADR-0021, auditable(), findOpenSuspension(), ADR-0017, liftWithAmendment(), optionalText(), pastDate(), SUSPEND_TARGET (+21 more)

### Community 46 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, cron:run, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart (+6 more)

### Community 48 - "constants.js"
Cohesion: 0.10
Nodes (22): configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, TooltipLongText(), CONTRACT_INVOICE_TYPES, INVOICE_VIEWS, ADR-0017, POLICY_BASE_OPTIONS (+14 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "ProviderTypePage.jsx"
Cohesion: 0.15
Nodes (16): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+8 more)

### Community 51 - "writeAudit"
Cohesion: 0.09
Nodes (37): AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0027, newOperationId(), protect() (+29 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (44): contractConceptsApi, contractPoliciesApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+36 more)

### Community 53 - "providerTypeFields.service.js"
Cohesion: 0.12
Nodes (28): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+20 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "@mui/material"
Cohesion: 0.06
Nodes (64): deleteFileByPath(), uploadFile(), suspendContractAPI(), deleteDocApi(), paginationDocsApi(), saveDocApi(), invoiceTransitionsApi, getModulesAPI() (+56 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (29): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+21 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "react-router-dom"
Cohesion: 0.07
Nodes (60): getStatusesByScopeAPI(), contractsApi, invoicesApi, workProvidersApi, useInvoiceViews(), useSocket(), SubCard(), ContactsList() (+52 more)

### Community 59 - "works.routes.js"
Cohesion: 0.11
Nodes (24): canViewAllWorks(), managedWhere(), resolveWorkScope(), selectMyWorks(), changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS (+16 more)

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
Nodes (19): isContractCreate(), isCreate(), isSimpleCreate(), assertTransition(), cancelTransitionFor(), hasContract(), historyRow(), httpError() (+11 more)

### Community 71 - "showError"
Cohesion: 0.11
Nodes (34): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, getProviderTypesSelectAPI, useInvoiceViewChange() (+26 more)

### Community 88 - "main.routes.js"
Cohesion: 0.09
Nodes (27): express, STATUS_KEYS, verifyToken(), revokeSession(), dashboardRoutes, ADR-0002, getMenuController(), getProfilesController() (+19 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (106): addressTypesApi, constructionCompaniesApi, contractTypesApi, insurersApi, reasonsApi, supervisionTypesApi, useAuth(), useWorkFilterField() (+98 more)

### Community 100 - "masterRouter.utils.js"
Cohesion: 0.10
Nodes (29): getIO(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), configurePolicyTypeBaseController, ADR-0019 (+21 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "PoliciesTab.jsx"
Cohesion: 0.12
Nodes (27): getInsurersSelectAPI, getContractAdvanceAPI(), getPolicyTypesSelectAPI, MoneyField(), fPercentText(), moneyInputText(), parseMoneyInput(), AdjustableAmount() (+19 more)

### Community 108 - "contractConcepts.service.js"
Cohesion: 0.18
Nodes (28): runIdempotent(), withContractAiu(), activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget() (+20 more)

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
Cohesion: 0.16
Nodes (17): endpoints, handlerDrawerOpen(), initialState, Footer(), Header(), MainLayout(), MainLayoutContent(), ScopedOutlet() (+9 more)

### Community 117 - "invoices.routes.js"
Cohesion: 0.12
Nodes (26): accessOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, grantedOf(), INVOICE_FIELDS, notify() (+18 more)

### Community 118 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "decimal"
Cohesion: 0.11
Nodes (31): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ratioPercent() (+23 more)

### Community 123 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 124 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "dateOnlyText"
Cohesion: 0.15
Nodes (28): moneyText(), percentText(), sumMoney(), dateOnlyText(), userFullName(), getInvoice(), toListDto(), providerViewOf() (+20 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.25
Nodes (6): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`

### Community 130 - "contractPolicies.service.js"
Cohesion: 0.15
Nodes (27): toPercent(), policyTypesService, assertContractStillAdmits(), createContractInvoice(), assertMasters(), assertTypeFree(), auditable(), cancelPolicy() (+19 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "retentionTerms.js"
Cohesion: 0.22
Nodes (13): @prisma/client, assertLiquidationCancellable(), assertRefundFits(), assertRetentionFits(), httpError(), ADR-0025, money(), retentionBalances() (+5 more)

### Community 133 - "resolveDetail"
Cohesion: 0.43
Nodes (8): roundMoney(), toMoney(), defaultAmortization(), adjustableAmount(), getContractAdvance(), positiveMoney(), resolveDetail(), defaultRetention()

### Community 134 - "contractEndDateReconciliation.service.js"
Cohesion: 0.15
Nodes (23): findUsersWithPermission(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress() (+15 more)

### Community 136 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 139 - "useGetMenuMaster"
Cohesion: 0.51
Nodes (6): useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), NavCollapse(), NavGroup(), NavItem()

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "socket.js"
Cohesion: 0.31
Nodes (8): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), isSessionActive()

### Community 151 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 152 - "themes/index.jsx"
Cohesion: 0.33
Nodes (6): createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor, Typography()

### Community 153 - "browserslist"
Cohesion: 0.27
Nodes (6): browserslist, development, production, volta, node, yarn

### Community 154 - "ref_prop_types"
Cohesion: 0.19
Nodes (14): getWorksSummaryAPI(), ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable(), TableActions(), STATUS_OPTIONS (+6 more)

### Community 156 - "idempotency.service.js"
Cohesion: 0.14
Nodes (16): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), IDEMPOTENCY_HEADER, idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused() (+8 more)

### Community 157 - "invoiceViews.js"
Cohesion: 0.16
Nodes (17): selectInvoiceContracts(), INVOICE_TYPES, ANY_CONTRACT_VIEW_PERMISSION, ANY_VIEW_PERMISSION, assertViewGranted(), CONTRACT_VIEWS, httpError(), INVOICE_MOVES (+9 more)

### Community 159 - "transaction.service.js"
Cohesion: 0.27
Nodes (9): buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES, toSortedIds() (+1 more)

### Community 163 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 166 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 173 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 174 - "httpCliente.js"
Cohesion: 0.13
Nodes (12): getMenuAPI(), getPermissionsCatalogAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient, getIconByName(), MenuList() (+4 more)

### Community 175 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.39
Nodes (6): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "addressTypes.contacts.js"
Cohesion: 0.47
Nodes (5): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText()

### Community 179 - "WorkScopeContext.jsx"
Cohesion: 0.23
Nodes (13): getMyWorksSelectAPI(), pickWork(), useWorkScope(), WorkScopeContext, WorkScopeProvider(), WorkSection(), Loadable(), Loader() (+5 more)

### Community 181 - "contracts.controller.test.js"
Cohesion: 0.17
Nodes (10): conceptsServiceMock, contractsServiceMock, emit, getEffectivePermissionIds, ADR-0015, ADR-0016, policiesServiceMock, SCOPE (+2 more)

### Community 183 - "useConfig"
Cohesion: 0.29
Nodes (8): useConfig(), ProfileSection(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 186 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 190 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

## Knowledge Gaps
- **876 isolated node(s):** `EMPTY_FORM`, `NO_DESCRIPTION`, `ADR-0015`, `ADR-0006`, `axios` (+871 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1202 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **78 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0009` connect `WorkFormPage.jsx` to `providers.service.js`?**
  _High betweenness centrality (0.219) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `WorkFormPage.jsx`, `@tabler/icons-react`, `withAlpha`, `useGetMenuMaster`, `client/package.json`, `AuthForgotPassword.jsx`, `themes/index.jsx`, `ref_prop_types`, `DebouncedInput.jsx`, `InvoiceFormPage.jsx`, `Default/index.jsx`, `httpCliente.js`, `NotificationSection/index.jsx`, `constants.js`, `EasyCrop.jsx`, `ProviderTypePage.jsx`, `WorkScopeContext.jsx`, `ContractFormPage.jsx`, `useConfig`, `react-router-dom`, `InputLabel.jsx`, `showError`, `useAuth`, `PoliciesTab.jsx`, `MainLayout/index.jsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `react` connect `@mui/material` to `WorkFormPage.jsx`, `@tabler/icons-react`, `useGetMenuMaster`, `SocketProvider.jsx`, `client/package.json`, `AuthForgotPassword.jsx`, `themes/index.jsx`, `ref_prop_types`, `DebouncedInput.jsx`, `InvoiceFormPage.jsx`, `Default/index.jsx`, `httpCliente.js`, `NotificationSection/index.jsx`, `constants.js`, `EasyCrop.jsx`, `ProviderTypePage.jsx`, `WorkScopeContext.jsx`, `ContractFormPage.jsx`, `useConfig`, `react-router-dom`, `showError`, `useAuth`, `PoliciesTab.jsx`, `ConfigContext.jsx`, `MainLayout/index.jsx`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **What connects `EMPTY_FORM`, `NO_DESCRIPTION`, `ADR-0015` to the rest of the system?**
  _876 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `WorkFormPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08489795918367347 - nodes in this community are weakly interconnected._
# Graph Report - WEBPAC-INTERVE  (2026-10-13)

## Corpus Check
- 552 files · ~256,534 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3068 nodes · 8284 edges · 188 communities (108 shown, 80 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 116 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1c48192f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- WorkFormPage.jsx
- @mui/material
- dependencies
- server/package.json
- providers.service.js
- audit.service.js
- auth.service.js
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
- handleFirebaseDocs.js
- session.service.js
- Default/index.jsx
- server.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- prismaClient.js
- scripts
- updateInvoice
- `tbl_invoices`
- ProviderTypePage.jsx
- app.routes.js
- ContractFormPage.jsx
- providerTypeFields.service.js
- `tbl_contract_type_fields`
- showError
- transaction.mock.js
- scripts
- constants.js
- works.routes.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- floatingPoint.guard.test.js
- notifications.routes.js
- invoiceTerms.js
- useGetMenuMaster
- `tbl_contract_status_history`
- masterRouter.utils.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- auditContext
- `tbl_provider_type_field_versions`
- DocumentManagement.jsx
- contractPolicies.service.js
- PoliciesTab.jsx
- `tbl_works`
- `tbl_policies`
- MainLayout/index.jsx
- invoices.routes.js
- WorkScopeContext.jsx
- error.middleware.js
- advanceTerms.js
- `tbl_providers`
- transaction.service.test.js
- images.js
- workScope.service.js
- `tbl_contract_suspensions`
- contracts.controller.test.js
- `tbl_providers`
- decimal
- money.utils.js
- contractSuspensions.service.test.js
- winston.config.js
- uniqueConstraints.constants.test.js
- master.service.test.js
- works.service.test.js
- socket.manager.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- themes/index.jsx
- browserslist
- contractPolicies.service.test.js
- DebouncedInput.jsx
- SimpleBar.jsx
- policyTypes.service.test.js
- NotificationSection/index.jsx
- App.jsx
- authjwt.middleware.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- volta
- useMenuCollapse.js
- @mui/icons-material
- `tbl_users`
- EasyCrop.jsx
- session.service.test.js
- InputLabel.jsx
- useConfig
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
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `useInvoiceViewChange()` --calls--> `BaseDialog()`  [EXTRACTED]
  client/src/hooks/useInvoiceViewChange.jsx → client/src/ui-component/extended/BaseDialog.jsx
- `useInvoiceViewChange()` --calls--> `providerInvoiceViewName()`  [EXTRACTED]
  client/src/hooks/useInvoiceViewChange.jsx → client/src/utils/constants.js
- `ProviderFormPage()` --calls--> `useInvoiceViewChange()`  [EXTRACTED]
  client/src/views/work/providers/ProviderFormPage.jsx → client/src/hooks/useInvoiceViewChange.jsx

## Import Cycles
- None detected.

## Communities (188 total, 80 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (22): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DateTimePickerToolbar() (+14 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "WorkFormPage.jsx"
Cohesion: 0.09
Nodes (34): getAddressTypesSelectAPI, getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, useEndDatePreview() (+26 more)

### Community 3 - "@mui/material"
Cohesion: 0.07
Nodes (37): deleteUserAPI(), paginationUsersAPI(), getWorksSummaryAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters(), ACTION_TONES (+29 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.07
Nodes (65): ADR-0009, defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), identificationError(), providerViewOf() (+57 more)

### Community 7 - "audit.service.js"
Cohesion: 0.09
Nodes (25): ADR-0001, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0027, protect(), REDACTED (+17 more)

### Community 8 - "auth.service.js"
Cohesion: 0.08
Nodes (37): bcrypt, ref_crypto, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS (+29 more)

### Community 9 - "contracts.service.js"
Cohesion: 0.05
Nodes (116): ADR-0016, ADR-0018, ADR-0021, ADR-0026, main(), diffFields(), withLockedTransaction(), sumMoney() (+108 more)

### Community 10 - "withAlpha"
Cohesion: 0.28
Nodes (9): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), extendPaletteWithChannels(), hexToRgbChannel() (+1 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.07
Nodes (27): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+19 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.16
Nodes (21): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+13 more)

### Community 13 - "httpCliente.js"
Cohesion: 0.15
Nodes (9): getPermissionsCatalogAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient, activeWorkHeader(), WORK_HEADER, axios (+1 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (34): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+26 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.11
Nodes (22): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0009 (+14 more)

### Community 17 - "users.service.js"
Cohesion: 0.04
Nodes (76): ADR-0004, ADR-0013, ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay() (+68 more)

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
Cohesion: 0.13
Nodes (17): checkIdentificationController, selectProvidersController, ADR-0012, providersRoutes, assignProviderSchema, changeProviderStatusSchema, checkIdentificationSchema, deleteProviderSchema (+9 more)

### Community 22 - "dashboard.service.js"
Cohesion: 0.06
Nodes (57): scopeWhere(), applyInvoiceViewChange(), ADR-0010, providerTypesConfig, providerTypesService, contractsBlock(), getDashboardSummary(), invoicesBlock() (+49 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (61): ADR-0007, writeAudit(), assertInScope(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel() (+53 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.07
Nodes (21): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), row(), ctx, prismaMock, state (+13 more)

### Community 27 - "InvoiceFormPage.jsx"
Cohesion: 0.14
Nodes (25): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceProvidersSelectAPI(), MoneyField(), moneyInputText(), parseMoneyInput(), AdjustableAmount(), AdvanceAmountsSection() (+17 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.12
Nodes (14): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+6 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.10
Nodes (31): ADR-0025, isBlank(), toMoney(), adjustableAmount(), countByState(), DETAIL_AUDITED, detailChanges(), detailText() (+23 more)

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
Cohesion: 0.18
Nodes (10): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+2 more)

### Community 37 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 38 - "Default/index.jsx"
Cohesion: 0.09
Nodes (34): getDashboardSummaryAPI(), ADR-0002, appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), Avatar() (+26 more)

### Community 39 - "server.js"
Cohesion: 0.14
Nodes (14): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+6 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.05
Nodes (23): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, prismaMock (+15 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (53): ADR-0003, ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020 (+45 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "prismaClient.js"
Cohesion: 0.15
Nodes (19): @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), findUsersWithPermission() (+11 more)

### Community 46 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, cron:run, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart (+6 more)

### Community 48 - "updateInvoice"
Cohesion: 0.24
Nodes (20): approveInvoice(), assertInvoiceVisible(), assertProviderActive(), assertUniqueNumber(), auditable(), cancelInvoice(), createSimpleInvoice(), findImmutable() (+12 more)

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
Cohesion: 0.07
Nodes (50): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+42 more)

### Community 53 - "providerTypeFields.service.js"
Cohesion: 0.13
Nodes (26): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+18 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "showError"
Cohesion: 0.06
Nodes (77): suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, ADR-0017, deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI() (+69 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (31): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+23 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "constants.js"
Cohesion: 0.05
Nodes (75): getStatusesByScopeAPI(), invoicesApi, useInvoiceViews(), InvoicesPage, SocketContext, useSocket(), SubCard(), ContactsList() (+67 more)

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
Cohesion: 0.14
Nodes (18): isContractCreate(), isCreate(), isSimpleCreate(), cancelTransitionFor(), hasContract(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS (+10 more)

### Community 71 - "useGetMenuMaster"
Cohesion: 0.37
Nodes (9): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), getIconByName(), MenuList(), NavCollapse(), NavGroup() (+1 more)

### Community 88 - "masterRouter.utils.js"
Cohesion: 0.09
Nodes (33): express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), identityDocumentsRoutes (+25 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (108): addressTypesApi, constructionCompaniesApi, contractsApi, contractTypesApi, identityDocumentsApi, insurersApi, reasonsApi, supervisionTypesApi (+100 more)

### Community 100 - "auditContext"
Cohesion: 0.08
Nodes (51): getIO(), auditContext(), getEffectivePermissionIds(), IDEMPOTENCY_HEADER, workScopeOf(), FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField() (+43 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "DocumentManagement.jsx"
Cohesion: 0.46
Nodes (7): paginationDocsApi(), showPromise(), DocumentManagement(), FileRow(), getFileIcon(), getFileSize(), formatNotificationDateTime()

### Community 108 - "contractPolicies.service.js"
Cohesion: 0.14
Nodes (25): newOperationId(), percentText(), toPercent(), REASON_SCOPES, assertMasters(), assertTypeFree(), auditable(), cancelPolicy() (+17 more)

### Community 112 - "PoliciesTab.jsx"
Cohesion: 0.09
Nodes (32): contractPoliciesApi, getInsurersSelectAPI, configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, PolicyTypePage, POLICY_BASE_OPTIONS (+24 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "MainLayout/index.jsx"
Cohesion: 0.17
Nodes (17): handlerDrawerOpen(), useWorkScope(), Footer(), Header(), WorkSection(), MainLayout(), MainLayoutContent(), ScopedOutlet() (+9 more)

### Community 117 - "invoices.routes.js"
Cohesion: 0.12
Nodes (26): accessOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, grantedOf(), INVOICE_FIELDS, notify() (+18 more)

### Community 118 - "WorkScopeContext.jsx"
Cohesion: 0.26
Nodes (11): getMyWorksSelectAPI(), pickWork(), WorkScopeContext, WorkScopeProvider(), Loadable(), Loader(), ALL_WORKS, readStoredWork() (+3 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "advanceTerms.js"
Cohesion: 0.20
Nodes (15): ratioPercent(), roundRatio(), advanceBalances(), appliedPct(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits(), balancesDto() (+7 more)

### Community 123 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 124 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "workScope.service.js"
Cohesion: 0.18
Nodes (14): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+6 more)

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
Cohesion: 0.16
Nodes (28): @prisma/client, decimal(), moneyText(), ratioText(), roundMoney(), defaultAmortization(), amountsDto(), balanceChange() (+20 more)

### Community 133 - "money.utils.js"
Cohesion: 0.15
Nodes (13): HUNDRED, MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ROUNDING, ZERO, insuredValue() (+5 more)

### Community 134 - "contractSuspensions.service.test.js"
Cohesion: 0.17
Nodes (5): ctx, initial, ADR-0017, prismaMock, state

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

### Community 142 - "socket.manager.js"
Cohesion: 0.23
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 151 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 152 - "themes/index.jsx"
Cohesion: 0.21
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 153 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 154 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 156 - "SimpleBar.jsx"
Cohesion: 0.47
Nodes (5): RootStyle, SimpleBarScroll(), SimpleBarStyle, react-device-detect, simplebar-react

### Community 157 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 159 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 163 - "App.jsx"
Cohesion: 0.29
Nodes (7): refreshSession(), App(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

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

### Community 181 - "useConfig"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

## Knowledge Gaps
- **878 isolated node(s):** `STATUS_TABS`, `CONTRACT_INVOICE_TYPES`, `TERM_UNIT_NAMES`, `ADR-0017`, `ADR-0019` (+873 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1204 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **80 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0003` connect `permissions.constants.js` to `users.service.js`, `useAuth`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `users.service.js`, `server/package.json`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `WorkFormPage.jsx`, `withAlpha`, `client/package.json`, `AuthForgotPassword.jsx`, `themes/index.jsx`, `DebouncedInput.jsx`, `InvoiceFormPage.jsx`, `SimpleBar.jsx`, `NotificationSection/index.jsx`, `Default/index.jsx`, `EasyCrop.jsx`, `ProviderTypePage.jsx`, `InputLabel.jsx`, `ContractFormPage.jsx`, `useConfig`, `showError`, `constants.js`, `useGetMenuMaster`, `useAuth`, `DocumentManagement.jsx`, `PoliciesTab.jsx`, `MainLayout/index.jsx`, `WorkScopeContext.jsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **What connects `STATUS_TABS`, `CONTRACT_INVOICE_TYPES`, `TERM_UNIT_NAMES` to the rest of the system?**
  _878 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08985200845665962 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `WorkFormPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09146341463414634 - nodes in this community are weakly interconnected._
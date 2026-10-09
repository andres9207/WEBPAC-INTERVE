# Graph Report - WEBPAC-INTERVE  (2026-10-09)

## Corpus Check
- 543 files · ~247,580 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3021 nodes · 8104 edges · 189 communities (116 shown, 73 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 115 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5ea4c029`
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
- server.js
- auth.service.js
- contracts.service.js
- advanceTerms.js
- seed.demo.js
- auditContext
- showError
- client/package.json
- menu-items/index.js
- validation.utils.js
- users.service.js
- invoices.service.test.js
- compilerOptions
- updateInvoice
- providers.routes.js
- dashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- works.routes.js
- Default/index.jsx
- providers.service.test.js
- request.mock.js
- invoices.service.js
- contractEndDateReconciliation.service.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- handleFirebase.js
- session.service.js
- @mui/material
- works.service.test.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- Shadow.jsx
- scripts
- browserslist
- `tbl_invoices`
- ProviderTypeFieldsDialog.jsx
- app.routes.js
- ContractFormPage.jsx
- contractFields.js
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
- extends
- revalidateOnApprove
- providerTypeFields.service.js
- useGetMenuMaster
- `tbl_contract_status_history`
- masterRouter.utils.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- getIO
- `tbl_provider_type_field_versions`
- App.jsx
- contractConcepts.service.js
- uniqueConstraints.constants.test.js
- `tbl_works`
- `tbl_policies`
- permissions.service.js
- invoiceTerms.js
- WorkScopeContext.jsx
- error.middleware.js
- contractPolicies.service.js
- `tbl_providers`
- error.middleware.test.js
- images.js
- auth.service.test.js
- `tbl_contract_suspensions`
- cron/index.js
- `tbl_providers`
- decimal
- contracts.service.test.js
- money.utils.js
- winston.config.js
- addressTypes.service.js
- contracts.controller.test.js
- notifications.service.js
- EasyCrop.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- contractSuspensions.service.test.js
- themes/index.jsx
- withAlpha
- contractPolicies.service.test.js
- DebouncedInput.jsx
- funciones.js
- constants.js
- NotificationSection/index.jsx
- policyTypes.service.test.js
- workScope.service.js
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
- resetCode.utils.js
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
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `ContractFormPage()` --calls--> `getContractTypesSelectAPI`  [EXTRACTED]
  client/src/views/work/contracts/ContractFormPage.jsx → client/src/api/requests/contractTypesApi.js
- `ContractFormPage()` --indirect_call--> `previewContractEndDateAPI()`  [INFERRED]
  client/src/views/work/contracts/ContractFormPage.jsx → client/src/api/requests/contractsApi.js
- `NewProviderDialog()` --calls--> `getProviderTypesSelectAPI`  [EXTRACTED]
  client/src/views/work/providers/components/NewProviderDialog.jsx → client/src/api/requests/providerTypesApi.js

## Import Cycles
- None detected.

## Communities (189 total, 73 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

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
Cohesion: 0.09
Nodes (55): ADR-0009, applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes(), assertTypeIds() (+47 more)

### Community 7 - "server.js"
Cohesion: 0.14
Nodes (11): ref_http, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog(), stopCronJobs() (+3 more)

### Community 8 - "auth.service.js"
Cohesion: 0.19
Nodes (15): generateResetCode(), ACCOUNT_FIELDS, anonymous(), clearFailedLogins(), consumeResetAttempt(), forgotPassword(), invalidCode(), ADR-0027 (+7 more)

### Community 9 - "contracts.service.js"
Cohesion: 0.06
Nodes (55): ADR-0021, moneyText(), sumMoney(), userFullName(), FIELD_GROUPS, typeAppliesAiu(), CONCEPT_AUDITED, conceptDto() (+47 more)

### Community 10 - "advanceTerms.js"
Cohesion: 0.21
Nodes (14): ratioPercent(), roundRatio(), advanceBalances(), appliedPct(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits(), httpError() (+6 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.08
Nodes (23): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+15 more)

### Community 12 - "auditContext"
Cohesion: 0.11
Nodes (27): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+19 more)

### Community 13 - "showError"
Cohesion: 0.05
Nodes (85): deleteFileByPath(), uploadFile(), suspendContractAPI(), deleteDocApi(), paginationDocsApi(), saveDocApi(), getIdentityDocumentsSelectAPI, getInsurersSelectAPI (+77 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (34): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+26 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.10
Nodes (22): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0009 (+14 more)

### Community 17 - "users.service.js"
Cohesion: 0.04
Nodes (82): @prisma/adapter-mariadb, adapter, ADR-0013, ADR-0027, prisma, ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS (+74 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.11
Nodes (17): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+9 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "updateInvoice"
Cohesion: 0.21
Nodes (23): approveInvoice(), assertInvoiceInScope(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditable(), cancelInvoice() (+15 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 22 - "dashboard.service.js"
Cohesion: 0.14
Nodes (29): scopeWhere(), todayDateOnly(), contractsBlock(), getDashboardSummary(), invoicesBlock(), ADR-0002, notDeleted, policiesBlock() (+21 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (60): assertInScope(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress() (+52 more)

### Community 26 - "works.routes.js"
Cohesion: 0.13
Nodes (20): changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, previewWorkEndDateController, saveWorkController (+12 more)

### Community 27 - "Default/index.jsx"
Cohesion: 0.14
Nodes (23): getDashboardSummaryAPI(), ADR-0002, headerStyle, MainCard(), DashboardCards(), Indicator(), ADR-0002, AlertsCard() (+15 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.13
Nodes (13): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+5 more)

### Community 29 - "request.mock.js"
Cohesion: 0.07
Nodes (22): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+14 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.09
Nodes (29): ADR-0023, amountsDto(), countByState(), DETAIL_AUDITED, detailChanges(), detailText(), documentValuesOf(), getInvoice() (+21 more)

### Community 31 - "contractEndDateReconciliation.service.js"
Cohesion: 0.16
Nodes (16): imap-simple, nodemailer, emailApp, nameApp, nameAppMail, checkEmailBounces(), findUsersWithPermission(), saveToSent() (+8 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.07
Nodes (52): moneyRule(), optionalDate(), percentRule(), ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController (+44 more)

### Community 33 - "seed.js"
Cohesion: 0.17
Nodes (10): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES, STATUSES (+2 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 37 - "session.service.js"
Cohesion: 0.16
Nodes (19): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+11 more)

### Community 38 - "@mui/material"
Cohesion: 0.10
Nodes (28): getWorksSummaryAPI(), ACTION_TONES, ActionButton(), toneOf(), ChipMultiSelect(), fold(), ConfirmDialog(), DataTable() (+20 more)

### Community 39 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (16): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, baseConfig (+8 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (50): ADR-0011, ADR-0019, ADR-0020, ADR-0024, ADR-0025, ADR-0012, ADR-0016, ADR-0017 (+42 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "Shadow.jsx"
Cohesion: 0.28
Nodes (10): gridSpacing, CardSecondaryAction(), SubCard(), Avatar(), ColorBox(), UIColor(), CustomShadowBox(), ShadowBox() (+2 more)

### Community 46 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, cron:run, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart (+6 more)

### Community 48 - "browserslist"
Cohesion: 0.27
Nodes (6): browserslist, development, production, volta, node, yarn

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "ProviderTypeFieldsDialog.jsx"
Cohesion: 0.16
Nodes (15): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006, ProviderTypeFieldsDialog() (+7 more)

### Community 51 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (45): contractConceptsApi, contractPoliciesApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+37 more)

### Community 53 - "contractFields.js"
Cohesion: 0.18
Nodes (13): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+5 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "InvoiceFormPage.jsx"
Cohesion: 0.12
Nodes (28): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, MoneyField(), moneyInputText() (+20 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "react-router-dom"
Cohesion: 0.07
Nodes (61): getStatusesByScopeAPI(), contractsApi, useSocket(), ContactsList(), ADR-0009, DataList(), Figure(), Pending() (+53 more)

### Community 59 - "workScopeOf"
Cohesion: 0.13
Nodes (27): workScopeOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, getInvoiceFormOptionsController, grantedOf(), INVOICE_FIELDS (+19 more)

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

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "revalidateOnApprove"
Cohesion: 0.53
Nodes (6): balanceChange(), contractBalances(), hasDetail(), revalidateOnApprove(), revalidateOnCancel(), storedAmount()

### Community 70 - "providerTypeFields.service.js"
Cohesion: 0.27
Nodes (15): mergeTypeRows(), resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getProviderTypeFields(), httpError() (+7 more)

### Community 71 - "useGetMenuMaster"
Cohesion: 0.27
Nodes (12): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), MenuList() (+4 more)

### Community 88 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (37): express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers(), createMasterRouter() (+29 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (99): addressTypesApi, constructionCompaniesApi, identityDocumentsApi, insurersApi, supervisionTypesApi, useAuth(), useWorkFilterField(), ADR-0002 (+91 more)

### Community 100 - "getIO"
Cohesion: 0.10
Nodes (25): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), getIO() (+17 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "App.jsx"
Cohesion: 0.32
Nodes (6): App(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

### Community 108 - "contractConcepts.service.js"
Cohesion: 0.09
Nodes (80): main(), diffFields(), newOperationId(), writeAudit(), withLockedTransaction(), percentText(), dateOnlyText(), withContractAiu() (+72 more)

### Community 112 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "permissions.service.js"
Cohesion: 0.13
Nodes (11): getEffectivePermissionIds(), getDashboardSummaryController, ADR-0002, dashboardRoutes, ADR-0002, auditPermissionChanges(), ADR-0013, ADR-0027 (+3 more)

### Community 117 - "invoiceTerms.js"
Cohesion: 0.16
Nodes (16): isContractCreate(), isCreate(), isSimpleCreate(), cancelTransitionFor(), hasContract(), INVOICE_STATES, INVOICE_TRANSITIONS, ADR-0020 (+8 more)

### Community 118 - "WorkScopeContext.jsx"
Cohesion: 0.29
Nodes (11): getMyWorksSelectAPI(), pickWork(), WorkScopeContext, WorkScopeProvider(), activeWorkHeader(), ALL_WORKS, readStoredWork(), setActiveWorkHeader() (+3 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.27
Nodes (14): concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS, driverCause() (+6 more)

### Community 120 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (43): ADR-0001, ADR-0013, AUDIT_ENTITIES, auditMisuse(), buildRows(), ADR-0027, protect(), REDACTED (+35 more)

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

### Community 130 - "cron/index.js"
Cohesion: 0.18
Nodes (10): dotenv, node-cron, prisma, cronJobs, ADR-0017, registeredTasks, startCronJobs(), wrapHandler() (+2 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "decimal"
Cohesion: 0.18
Nodes (22): @prisma/client, decimal(), percentOf(), ratioText(), roundMoney(), balancesDto(), defaultAmortization(), getContractAdvance() (+14 more)

### Community 133 - "contracts.service.test.js"
Cohesion: 0.07
Nodes (19): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+11 more)

### Community 134 - "money.utils.js"
Cohesion: 0.18
Nodes (10): HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ROUNDING, toMoney(), ZERO (+2 more)

### Community 136 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 137 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 139 - "contracts.controller.test.js"
Cohesion: 0.17
Nodes (10): conceptsServiceMock, contractsServiceMock, emit, getEffectivePermissionIds, ADR-0015, ADR-0016, policiesServiceMock, SCOPE (+2 more)

### Community 140 - "notifications.service.js"
Cohesion: 0.38
Nodes (8): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), getNotificationCount(), listNotifications(), markAllAsRead(), markAsRead()

### Community 151 - "contractSuspensions.service.test.js"
Cohesion: 0.17
Nodes (5): ctx, initial, ADR-0017, prismaMock, state

### Community 152 - "themes/index.jsx"
Cohesion: 0.21
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 153 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 154 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 156 - "funciones.js"
Cohesion: 0.25
Nodes (5): bcrypt, comparePassword(), hashPassword(), restorePassword(), updatePassword()

### Community 157 - "constants.js"
Cohesion: 0.07
Nodes (30): configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, reasonsApi, refreshSession(), PolicyTypePage, SocketContext, TooltipLongText() (+22 more)

### Community 159 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 160 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 161 - "workScope.service.js"
Cohesion: 0.18
Nodes (14): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+6 more)

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
Cohesion: 0.22
Nodes (12): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+4 more)

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

### Community 180 - "resetCode.utils.js"
Cohesion: 0.38
Nodes (5): ref_crypto, deriveKey(), hashResetCode(), ADR-0001, verifyResetCode()

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
- **872 isolated node(s):** `ADR-0006`, `ADR-0016`, `ADR-0017`, `ADR-0018`, `STATUS_NAMES` (+867 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1191 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **73 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0003` connect `useAuth` to `users.service.js`, `permissions.constants.js`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `WorkFormPage.jsx`, `react`, `showError`, `client/package.json`, `EasyCrop.jsx`, `themes/index.jsx`, `withAlpha`, `DebouncedInput.jsx`, `Default/index.jsx`, `constants.js`, `NotificationSection/index.jsx`, `AuthForgotPassword.jsx`, `Shadow.jsx`, `MainLayout/index.jsx`, `InputLabel.jsx`, `ProviderTypeFieldsDialog.jsx`, `ContractFormPage.jsx`, `useConfig`, `InvoiceFormPage.jsx`, `react-router-dom`, `useGetMenuMaster`, `useAuth`, `WorkScopeContext.jsx`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `users.service.js`, `server/package.json`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **What connects `ADR-0006`, `ADR-0016`, `ADR-0017` to the rest of the system?**
  _872 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `WorkFormPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07864488808227466 - nodes in this community are weakly interconnected._
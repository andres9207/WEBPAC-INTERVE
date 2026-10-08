# Graph Report - WEBPAC-INTERVE  (2026-10-08)

## Corpus Check
- 539 files · ~243,505 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3009 nodes · 8051 edges · 190 communities (119 shown, 71 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 115 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `00b1ca3a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- WorkFormPage.jsx
- workScopeOf
- dependencies
- server/package.json
- providers.service.js
- server.js
- auth.service.js
- contracts.service.js
- advanceTerms.js
- showError
- auth.routes.js
- showSuccess
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
- workScope.service.js
- @mui/material
- providers.service.test.js
- request.mock.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- prismaClient.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- session.service.js
- react
- works.service.test.js
- ref_jest_globals
- permissions.routes.js
- devDependencies
- src/index.jsx
- eslint.config.mjs
- scripts
- volta
- `tbl_invoices`
- getIO
- app.routes.js
- ContractFormPage.jsx
- users.service.js
- `tbl_contract_type_fields`
- InvoiceFormPage.jsx
- transaction.mock.js
- scripts
- useAuth
- contractSuspensions.service.test.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- transaction.service.test.js
- extends
- seed.demo.js
- status.constants.js
- MainLayout/index.jsx
- `tbl_contract_status_history`
- masterRouter.utils.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- socket.js
- `tbl_providers`
- contractEndDateReconciliation.service.js
- contractPolicies.service.js
- uniqueConstraints.constants.test.js
- `tbl_works`
- `tbl_policies`
- writeAudit
- invoiceTerms.js
- browserslist
- error.middleware.js
- permissions.constants.js
- `tbl_providers`
- error.middleware.test.js
- images.js
- auth.service.test.js
- `tbl_contract_suspensions`
- document.routes.js
- `tbl_work_providers`
- decimal
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
- themes/index.jsx
- withAlpha
- contractPolicies.service.test.js
- DebouncedInput.jsx
- contractEndDateReconciliation.service.test.js
- constants.js
- NotificationSection/index.jsx
- invoices.controller.test.js
- session.service.test.js
- AppBar.jsx
- authjwt.middleware.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- AuthenticationRoutes.jsx
- transaction.service.js
- WorkScopeContext.jsx
- `tbl_users`
- resetCode.utils.js
- users.controller.js
- MiniDrawerStyled.jsx
- @mui/icons-material
- ImageList.jsx
- master.service.test.js
- dashboard.service.test.js
- users.service.test.js
- useMenuCollapse.js
- volta
- `tbl_invoice_liquidation_details`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 124 edges
2. `react` - 94 edges
3. `useAuth()` - 81 edges
4. `showError()` - 76 edges
5. `showSuccess()` - 57 edges
6. `writeAudit()` - 57 edges
7. `withLockedTransaction()` - 56 edges
8. `workScopeOf()` - 49 edges
9. `auditContext()` - 48 edges
10. `@tabler/icons-react` - 47 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js
- `MasterPage()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/contexts/authContext.jsx
- `MasterPage()` --calls--> `useListFilters()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/hooks/useListFilters.js
- `MasterPage()` --calls--> `showError()`  [EXTRACTED]
  client/src/ui-component/extended/MasterPage.jsx → client/src/services/ToastService.js

## Import Cycles
- None detected.

## Communities (190 total, 71 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DateTimePickerToolbar() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "WorkFormPage.jsx"
Cohesion: 0.09
Nodes (34): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, EditableList(), FilterPopper() (+26 more)

### Community 3 - "workScopeOf"
Cohesion: 0.10
Nodes (31): getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, ADR-0002, approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController (+23 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (32): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+24 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (60): userFullName(), getSessionInfo(), getContract(), suspensionDto(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable() (+52 more)

### Community 7 - "server.js"
Cohesion: 0.14
Nodes (14): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+6 more)

### Community 8 - "auth.service.js"
Cohesion: 0.14
Nodes (17): bcrypt, comparePassword(), hashPassword(), ACCOUNT_FIELDS, anonymous(), clearFailedLogins(), consumeResetAttempt(), invalidCode() (+9 more)

### Community 9 - "contracts.service.js"
Cohesion: 0.11
Nodes (35): typeAppliesAiu(), assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditableConcept(), auditableContract() (+27 more)

### Community 10 - "advanceTerms.js"
Cohesion: 0.22
Nodes (13): @prisma/client, advanceBalances(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits(), balancesDto(), httpError(), ADR-0024 (+5 more)

### Community 11 - "showError"
Cohesion: 0.06
Nodes (65): contractPoliciesApi, suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012 (+57 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "showSuccess"
Cohesion: 0.06
Nodes (55): getPermissionsCatalogAPI(), deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), getBasicInformationAPI() (+47 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+13 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.16
Nodes (15): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0009 (+7 more)

### Community 17 - "master.service.js"
Cohesion: 0.08
Nodes (38): ADR-0003, capitalize(), createMasterService(), defineMaster(), httpError(), ADR-0004, ADR-0027, containsFilter() (+30 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.11
Nodes (17): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+9 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.14
Nodes (20): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider(), getStoredUser() (+12 more)

### Community 21 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 22 - "dashboard.service.js"
Cohesion: 0.13
Nodes (30): scopeWhere(), todayDateOnly(), contractsBlock(), getDashboardSummary(), invoicesBlock(), ADR-0002, notDeleted, policiesBlock() (+22 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (51): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesService, applyManagers(), applyStages() (+43 more)

### Community 26 - "workScope.service.js"
Cohesion: 0.09
Nodes (32): ALL, assertAnyInScope(), assertInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope() (+24 more)

### Community 27 - "@mui/material"
Cohesion: 0.08
Nodes (40): getDashboardSummaryAPI(), ADR-0002, appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard() (+32 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.13
Nodes (13): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+5 more)

### Community 29 - "request.mock.js"
Cohesion: 0.07
Nodes (22): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+14 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.08
Nodes (57): ADR-0023, dateRangeFilter(), approveInvoice(), assertInvoiceInScope(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork() (+49 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.07
Nodes (53): auditContext(), moneyRule(), optionalDate(), percentRule(), ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS, CONTRACT_FIELDS (+45 more)

### Community 33 - "prismaClient.js"
Cohesion: 0.10
Nodes (17): @prisma/adapter-mariadb, ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, PROVIDER_TYPES (+9 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 37 - "session.service.js"
Cohesion: 0.15
Nodes (18): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+10 more)

### Community 38 - "react"
Cohesion: 0.15
Nodes (19): getAddressTypesSelectAPI, getWorksSummaryAPI(), ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), channelsOf(), ContactDialog() (+11 more)

### Community 39 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.08
Nodes (12): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+4 more)

### Community 41 - "permissions.routes.js"
Cohesion: 0.15
Nodes (16): getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController(), permissionsRoutes (+8 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

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
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "getIO"
Cohesion: 0.15
Nodes (15): getIO(), FIELD_ATTRIBUTES, getContractTypeFieldsController, pickField(), saveContractTypeFieldsController, deleteProfileController(), getModulesController(), ADR-0027 (+7 more)

### Community 51 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (44): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+36 more)

### Community 53 - "users.service.js"
Cohesion: 0.09
Nodes (25): USER_NAME_SELECT, DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, identityDocumentsConfig (+17 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "InvoiceFormPage.jsx"
Cohesion: 0.11
Nodes (32): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, createMasterApi(), MoneyField() (+24 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.07
Nodes (25): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+17 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "useAuth"
Cohesion: 0.08
Nodes (56): getStatusesByScopeAPI(), contractsApi, useAuth(), PrivateRoute(), useSocket(), ContactsList(), ADR-0009, DataList() (+48 more)

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
Cohesion: 0.10
Nodes (22): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+14 more)

### Community 70 - "status.constants.js"
Cohesion: 0.08
Nodes (30): ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation() (+22 more)

### Community 71 - "MainLayout/index.jsx"
Cohesion: 0.16
Nodes (22): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useWorkScope(), useConfig(), Footer() (+14 more)

### Community 88 - "masterRouter.utils.js"
Cohesion: 0.10
Nodes (27): express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), addressTypesRoutes (+19 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.15
Nodes (8): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_status`

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.03
Nodes (95): addressTypesApi, constructionCompaniesApi, identityDocumentsApi, getInsurersSelectAPI, insurersApi, providerTypesApi, supervisionTypesApi, useWorkFilterField() (+87 more)

### Community 100 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 104 - "`tbl_providers`"
Cohesion: 0.22
Nodes (7): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_providers`, `tbl_provider_classifications`, `tbl_identity_documents`, `tbl_provider_types`

### Community 105 - "contractEndDateReconciliation.service.js"
Cohesion: 0.14
Nodes (25): findUsersWithPermission(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress() (+17 more)

### Community 108 - "contractPolicies.service.js"
Cohesion: 0.05
Nodes (100): ADR-0021, diffFields(), percentText(), sumMoney(), dateOnlyText(), withContractAiu(), insuredValue(), policyBaseValue() (+92 more)

### Community 112 - "uniqueConstraints.constants.test.js"
Cohesion: 0.14
Nodes (11): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, created, DATABASE, declared, dropped, inDatabase (+3 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "writeAudit"
Cohesion: 0.06
Nodes (55): ADR-0001, ADR-0013, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0027, newOperationId() (+47 more)

### Community 117 - "invoiceTerms.js"
Cohesion: 0.16
Nodes (17): isContractCreate(), isCreate(), isSimpleCreate(), assertTransition(), hasContract(), historyRow(), httpError(), INVOICE_STATES (+9 more)

### Community 118 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 119 - "error.middleware.js"
Cohesion: 0.27
Nodes (14): concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS, driverCause() (+6 more)

### Community 120 - "permissions.constants.js"
Cohesion: 0.12
Nodes (17): ADR-0006, ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020 (+9 more)

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

### Community 132 - "decimal"
Cohesion: 0.12
Nodes (36): decimal(), HUNDRED, isBlank(), MONEY_SCALE, moneyText(), PERCENT_SCALE, percentOf(), RATIO_SCALE (+28 more)

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
Cohesion: 0.15
Nodes (16): contractTypesApi, getContractTypeFieldsAPI(), saveContractTypeFieldsAPI(), ContractTypePage, ContractTypeFieldsDialog(), DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+8 more)

### Community 140 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 151 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 152 - "themes/index.jsx"
Cohesion: 0.18
Nodes (12): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage(), createCustomShadow() (+4 more)

### Community 153 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 154 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 156 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 157 - "constants.js"
Cohesion: 0.05
Nodes (43): configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, reasonsApi, refreshSession(), App(), AuthContext (+35 more)

### Community 159 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 160 - "invoices.controller.test.js"
Cohesion: 0.25
Nodes (6): emit, getEffectivePermissionIds, invoicesServiceMock, ADR-0020, SCOPE, workScopeOf

### Community 161 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 163 - "AppBar.jsx"
Cohesion: 0.23
Nodes (9): client_src_assets_images_interve, ForgotPasswordPage, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthWrapper1 (+1 more)

### Community 166 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 173 - "AuthenticationRoutes.jsx"
Cohesion: 0.24
Nodes (8): MinimalLayout(), AuthenticationRoutes, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), Loadable(), Loader()

### Community 174 - "transaction.service.js"
Cohesion: 0.22
Nodes (12): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+4 more)

### Community 175 - "WorkScopeContext.jsx"
Cohesion: 0.36
Nodes (9): getMyWorksSelectAPI(), pickWork(), WorkScopeContext, WorkScopeProvider(), ALL_WORKS, readStoredWork(), setActiveWorkHeader(), storageKey() (+1 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.29
Nodes (7): `tbl_construction_companies`, idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 177 - "resetCode.utils.js"
Cohesion: 0.27
Nodes (8): ref_crypto, deriveKey(), generateResetCode(), hashResetCode(), ADR-0001, verifyResetCode(), forgotPassword(), sleep()

### Community 178 - "users.controller.js"
Cohesion: 0.32
Nodes (7): revokeSession(), countUsersController(), deleteUserController(), ADR-0001, ADR-0027, paginationUsersController(), saveUserController()

### Community 179 - "MiniDrawerStyled.jsx"
Cohesion: 0.38
Nodes (5): MainContentStyled, closedMixin(), MiniDrawerStyled, openedMixin(), drawerWidth

### Community 180 - "@mui/icons-material"
Cohesion: 0.40
Nodes (4): DatePicker(), Breadcrumbs(), BTitle(), @mui/icons-material

### Community 181 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 182 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 183 - "dashboard.service.test.js"
Cohesion: 0.33
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 184 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 186 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **874 isolated node(s):** `ADR-0002`, `ADR-0002`, `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS`, `NO_FIELDS` (+869 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1190 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **71 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0003` connect `master.service.js` to `MainRoutes.jsx`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `WorkFormPage.jsx`, `showError`, `ContractTypeFieldsDialog.jsx`, `showSuccess`, `client/package.json`, `EasyCrop.jsx`, `AuthForgotPassword.jsx`, `themes/index.jsx`, `withAlpha`, `DebouncedInput.jsx`, `constants.js`, `NotificationSection/index.jsx`, `AppBar.jsx`, `DocumentManagement.jsx`, `react`, `AuthenticationRoutes.jsx`, `WorkScopeContext.jsx`, `MiniDrawerStyled.jsx`, `@mui/icons-material`, `ImageList.jsx`, `ContractFormPage.jsx`, `InvoiceFormPage.jsx`, `useAuth`, `MainLayout/index.jsx`, `MainRoutes.jsx`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `writeAudit`, `server/package.json`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **What connects `ADR-0002`, `ADR-0002`, `STATUS_NAMES` to the rest of the system?**
  _874 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08686868686868687 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `WorkFormPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08970099667774087 - nodes in this community are weakly interconnected._
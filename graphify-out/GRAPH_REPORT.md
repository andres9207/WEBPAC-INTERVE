# Graph Report - WEBPAC-INTERVE  (2026-10-08)

## Corpus Check
- 540 files · ~245,372 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3016 nodes · 8089 edges · 183 communities (112 shown, 71 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 116 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6a1b1062`
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
- writeAudit
- contractTerms.js
- decimal
- ProviderFormPage.jsx
- auth.routes.js
- showError
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
- works.routes.js
- Default/index.jsx
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
- works.service.test.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- Shadow.jsx
- scripts
- volta
- `tbl_invoices`
- idempotency.service.js
- app.routes.js
- ContractFormPage.jsx
- identityDocuments.service.js
- `tbl_contract_type_fields`
- InvoiceFormPage.jsx
- transaction.mock.js
- scripts
- constants.js
- invoices.routes.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- transaction.service.test.js
- extends
- resolveDetail
- providerTypes.service.js
- useGetMenuMaster
- `tbl_contract_status_history`
- masterRouter.utils.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- socket.manager.js
- `tbl_providers`
- App.jsx
- contracts.service.js
- uniqueConstraints.constants.test.js
- `tbl_works`
- `tbl_policies`
- contractTypeFields.service.js
- invoiceTerms.js
- browserslist
- error.middleware.js
- contractPolicies.service.js
- `tbl_providers`
- error.middleware.test.js
- images.js
- auth.service.test.js
- `tbl_contract_suspensions`
- password-strength.js
- `tbl_work_providers`
- retentionTerms.js
- contractSuspensions.service.test.js
- contractFields.js
- winston.config.js
- auth.controller.test.js
- floatingPoint.guard.test.js
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
- httpCliente.js
- NotificationSection/index.jsx
- policyTypes.service.test.js
- workScope.service.test.js
- uniqueConstraints.constants.js
- authjwt.middleware.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- AuthenticationRoutes.jsx
- prismaClient.js
- WorkScopeContext.jsx
- `tbl_users`
- InputLabel.jsx
- Sidebar/index.jsx
- useConfig
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
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js
- `ContractFormPage()` --indirect_call--> `previewContractEndDateAPI()`  [INFERRED]
  client/src/views/work/contracts/ContractFormPage.jsx → client/src/api/requests/contractsApi.js
- `ContractFormPage()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/views/work/contracts/ContractFormPage.jsx → client/src/contexts/authContext.jsx

## Import Cycles
- None detected.

## Communities (183 total, 71 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (22): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DateTimePickerToolbar() (+14 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "WorkFormPage.jsx"
Cohesion: 0.08
Nodes (38): getAddressTypesSelectAPI, getConstructionCompaniesSelectAPI, getContractTypeFieldsAPI(), saveContractTypeFieldsAPI(), providerTypesApi, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), previewWorkEndDateAPI() (+30 more)

### Community 3 - "workScopeOf"
Cohesion: 0.11
Nodes (40): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, ADR-0002, approveInvoiceController, cancelInvoiceController, getContractAdvanceController (+32 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, bcrypt, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.05
Nodes (80): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+72 more)

### Community 7 - "server.js"
Cohesion: 0.10
Nodes (19): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+11 more)

### Community 8 - "writeAudit"
Cohesion: 0.09
Nodes (39): ref_crypto, auditMisuse(), buildRows(), diffFields(), ADR-0027, protect(), REDACTED, SENSITIVE_FIELDS (+31 more)

### Community 9 - "contractTerms.js"
Cohesion: 0.11
Nodes (32): ADR-0021, dateOnlyText(), toListDto(), auditable(), findOpenSuspension(), ADR-0017, liftWithAmendment(), optionalText() (+24 more)

### Community 10 - "decimal"
Cohesion: 0.14
Nodes (25): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent(), ratioText() (+17 more)

### Community 11 - "ProviderFormPage.jsx"
Cohesion: 0.10
Nodes (34): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, workProvidersApi, getProviderTypesSelectAPI, DateField() (+26 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.16
Nodes (21): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+13 more)

### Community 13 - "showError"
Cohesion: 0.05
Nodes (79): deleteFileByPath(), uploadFile(), suspendContractAPI(), deleteDocApi(), paginationDocsApi(), saveDocApi(), invoiceTransitionsApi, configurePolicyTypeBaseAPI() (+71 more)

### Community 14 - "client/package.json"
Cohesion: 0.06
Nodes (35): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+27 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.12
Nodes (20): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+12 more)

### Community 17 - "users.service.js"
Cohesion: 0.06
Nodes (61): ADR-0013, newOperationId(), runIdempotent(), capitalize(), createMasterService(), httpError(), ADR-0004, ADR-0027 (+53 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.11
Nodes (17): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+9 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.17
Nodes (16): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider(), getStoredUser() (+8 more)

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
Nodes (63): assertInScope(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress() (+55 more)

### Community 26 - "works.routes.js"
Cohesion: 0.13
Nodes (20): changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, previewWorkEndDateController, saveWorkController (+12 more)

### Community 27 - "Default/index.jsx"
Cohesion: 0.20
Nodes (18): getDashboardSummaryAPI(), ADR-0002, headerStyle, MainCard(), AlertsCard(), Empty(), LatestInvoicesCard(), num (+10 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.13
Nodes (13): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+5 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.04
Nodes (38): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+30 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.09
Nodes (52): ADR-0023, amountsDto(), approveInvoice(), assertInvoiceInScope(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork() (+44 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.09
Nodes (31): moneyRule(), optionalDate(), percentRule(), contractsRoutes, ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+23 more)

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
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 38 - "@mui/material"
Cohesion: 0.08
Nodes (30): getWorksSummaryAPI(), ACTION_TONES, ActionButton(), toneOf(), ChipMultiSelect(), fold(), ConfirmDialog(), DataTable() (+22 more)

### Community 39 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.05
Nodes (20): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, dbUser (+12 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.06
Nodes (40): ADR-0006, ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020 (+32 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "Shadow.jsx"
Cohesion: 0.20
Nodes (13): gridSpacing, CardSecondaryAction(), SubCard(), Avatar(), DashboardCards(), Indicator(), ADR-0002, ColorBox() (+5 more)

### Community 46 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, cron:run, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart (+6 more)

### Community 48 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "idempotency.service.js"
Cohesion: 0.10
Nodes (24): getIO(), canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), IDEMPOTENCY_HEADER, idempotencyMisuse(), isUniqueViolation(), ADR-0027 (+16 more)

### Community 51 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (44): contractConceptsApi, contractPoliciesApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+36 more)

### Community 53 - "identityDocuments.service.js"
Cohesion: 0.17
Nodes (11): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, ADR-0008, identityDocumentsRoutes, identityDocumentsConfig, identityDocumentsService (+3 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (52): getInsurersSelectAPI, getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, getPolicyTypesSelectAPI (+44 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (29): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+21 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "constants.js"
Cohesion: 0.06
Nodes (58): getStatusesByScopeAPI(), contractsApi, SocketContext, useSocket(), ContactsList(), ADR-0009, DataList(), Figure() (+50 more)

### Community 59 - "invoices.routes.js"
Cohesion: 0.18
Nodes (13): invoicesRoutes, ADR-0017, approveInvoiceSchema, cancelInvoiceSchema, getContractAdvanceSchema, getInvoiceFormOptionsSchema, getInvoiceSchema, ADR-0020 (+5 more)

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
Cohesion: 0.20
Nodes (9): ref_fs, ref_url, ADR-0027, loggerMock, prismaMock, controllers, EXEMPT, handlers (+1 more)

### Community 67 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 68 - "resolveDetail"
Cohesion: 0.25
Nodes (14): roundMoney(), toMoney(), defaultAmortization(), adjustableAmount(), balanceChange(), contractBalances(), getContractAdvance(), hasDetail() (+6 more)

### Community 70 - "providerTypes.service.js"
Cohesion: 0.38
Nodes (5): providerTypesRoutes, ADR-0006, ADR-0010, providerTypesConfig, providerTypesService

### Community 71 - "useGetMenuMaster"
Cohesion: 0.25
Nodes (11): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), MenuList() (+3 more)

### Community 88 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (34): express, verifyToken(), requirePermission(), validate(), createMasterControllers(), createMasterRouter(), getContractTypeFieldsSchema, saveContractTypeFieldsSchema (+26 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.15
Nodes (8): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_status`

### Community 94 - "useAuth"
Cohesion: 0.02
Nodes (118): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), providersApi, reasonsApi (+110 more)

### Community 100 - "socket.manager.js"
Cohesion: 0.23
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 104 - "`tbl_providers`"
Cohesion: 0.22
Nodes (7): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_providers`, `tbl_provider_classifications`, `tbl_identity_documents`, `tbl_provider_types`

### Community 105 - "App.jsx"
Cohesion: 0.29
Nodes (7): refreshSession(), App(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

### Community 108 - "contracts.service.js"
Cohesion: 0.07
Nodes (87): ADR-0002, ADR-0016, ADR-0026, withLockedTransaction(), toPercent(), typeAppliesAiu(), withContractAiu(), assertContractStillAdmits() (+79 more)

### Community 112 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (8): created, DATABASE, declared, dropped, inDatabase, MIGRATIONS, sql, withMessage

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "contractTypeFields.service.js"
Cohesion: 0.12
Nodes (21): AUDIT_ENTITIES, AUDIT_OPERATIONS, resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getContractTypeFields() (+13 more)

### Community 117 - "invoiceTerms.js"
Cohesion: 0.16
Nodes (16): isContractCreate(), isCreate(), isSimpleCreate(), cancelTransitionFor(), hasContract(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS (+8 more)

### Community 118 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 119 - "error.middleware.js"
Cohesion: 0.27
Nodes (14): concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS, driverCause() (+6 more)

### Community 120 - "contractPolicies.service.js"
Cohesion: 0.08
Nodes (37): defineMaster(), moneyText(), percentOf(), percentText(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES (+29 more)

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.25
Nodes (6): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`

### Community 130 - "password-strength.js"
Cohesion: 0.43
Nodes (5): defaultColor, hasMixed(), hasNumber(), hasSpecial(), strengthIndicator()

### Community 131 - "`tbl_work_providers`"
Cohesion: 0.18
Nodes (8): `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers`, `tbl_work_contacts`, `tbl_address_types`, `tbl_works`

### Community 132 - "retentionTerms.js"
Cohesion: 0.22
Nodes (13): @prisma/client, assertLiquidationCancellable(), assertRefundFits(), assertRetentionFits(), httpError(), ADR-0025, money(), retentionBalances() (+5 more)

### Community 133 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (20): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+12 more)

### Community 134 - "contractFields.js"
Cohesion: 0.23
Nodes (11): AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+3 more)

### Community 136 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 137 - "auth.controller.test.js"
Cohesion: 0.29
Nodes (5): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, sessionMock

### Community 139 - "floatingPoint.guard.test.js"
Cohesion: 0.33
Nodes (4): ALLOWED, files(), lines, SRC

### Community 140 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 151 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 152 - "themes/index.jsx"
Cohesion: 0.26
Nodes (9): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+1 more)

### Community 153 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 154 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 156 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 157 - "httpCliente.js"
Cohesion: 0.10
Nodes (17): ADR-0019, policyTypesApi, instance, NO_REFRESH_URLS, refreshClient, PolicyTypePage, POLICY_BASE_OPTIONS, policyBaseName() (+9 more)

### Community 159 - "NotificationSection/index.jsx"
Cohesion: 0.28
Nodes (11): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), ProfileSection(), HeaderAvatar(), MobileSearch() (+3 more)

### Community 160 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 161 - "workScope.service.test.js"
Cohesion: 0.40
Nodes (4): hasEffectivePermission, prismaMock, state, user

### Community 163 - "uniqueConstraints.constants.js"
Cohesion: 0.50
Nodes (3): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES

### Community 166 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 173 - "AuthenticationRoutes.jsx"
Cohesion: 0.12
Nodes (19): client_src_assets_images_interve, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+11 more)

### Community 174 - "prismaClient.js"
Cohesion: 0.07
Nodes (42): @prisma/adapter-mariadb, adapter, ADR-0013, ADR-0027, prisma, ACTIVE_STATUS, DELETED_STATUS, findUsersWithPermission() (+34 more)

### Community 175 - "WorkScopeContext.jsx"
Cohesion: 0.18
Nodes (19): handlerDrawerOpen(), getMyWorksSelectAPI(), pickWork(), useWorkScope(), WorkScopeContext, WorkScopeProvider(), Footer(), Header() (+11 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.29
Nodes (7): `tbl_construction_companies`, idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 179 - "Sidebar/index.jsx"
Cohesion: 0.28
Nodes (8): LogoSection(), MainContentStyled, Sidebar(), closedMixin(), MiniDrawerStyled, openedMixin(), appDrawerWidth, drawerWidth

### Community 181 - "useConfig"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

## Knowledge Gaps
- **875 isolated node(s):** `EMPTY_FORM`, `NO_DESCRIPTION`, `ADR-0015`, `ADR-0006`, `ADR-0018` (+870 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1191 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **71 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0003` connect `useAuth` to `users.service.js`, `permissions.constants.js`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `users.service.js`, `server/package.json`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `WorkFormPage.jsx`, `ProviderFormPage.jsx`, `showError`, `client/package.json`, `EasyCrop.jsx`, `AuthForgotPassword.jsx`, `themes/index.jsx`, `withAlpha`, `DebouncedInput.jsx`, `Default/index.jsx`, `NotificationSection/index.jsx`, `AuthenticationRoutes.jsx`, `Shadow.jsx`, `WorkScopeContext.jsx`, `InputLabel.jsx`, `Sidebar/index.jsx`, `ContractFormPage.jsx`, `useConfig`, `InvoiceFormPage.jsx`, `constants.js`, `useGetMenuMaster`, `useAuth`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **What connects `EMPTY_FORM`, `NO_DESCRIPTION`, `ADR-0015` to the rest of the system?**
  _875 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08985200845665962 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `WorkFormPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08144796380090498 - nodes in this community are weakly interconnected._
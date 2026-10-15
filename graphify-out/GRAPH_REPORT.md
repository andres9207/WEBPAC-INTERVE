# Graph Report - WEBPAC-INTERVE  (2026-10-15)

## Corpus Check
- 577 files · ~280,627 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3279 nodes · 9022 edges · 201 communities (122 shown, 79 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 121 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d0d33ad4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- constant.js
- providerTypeFields.service.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- auth.service.js
- ContractFormPage.jsx
- idempotency.service.js
- seed.demo.js
- auth.routes.js
- contractTerms.js
- client/package.json
- @mui/icons-material
- validation.utils.js
- status.constants.js
- invoices.service.test.js
- compilerOptions
- AuthenticationRoutes.jsx
- contracts.service.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- @tabler/icons-react
- permissions.routes.js
- contracts.controller.test.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- eslint.config.mjs
- session.service.js
- contractSuspensions.service.test.js
- server.js
- ref_jest_globals
- master.service.js
- devDependencies
- src/index.jsx
- dashboard.service.js
- scripts
- PoliciesTab.jsx
- `tbl_invoices`
- ProviderTypePage.jsx
- providers.routes.js
- showError
- socket.js
- `tbl_contract_type_fields`
- DocumentManagement.jsx
- transaction.mock.js
- scripts
- WorkSummaryTab.jsx
- workScopeOf
- compilerOptions
- excelJS.js
- contractPolicies.service.js
- permission
- devDependencies
- floatingPoint.guard.test.js
- notifications.routes.js
- users.service.js
- @mui/material
- `tbl_contract_status_history`
- main.routes.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_type_field_versions`
- GeneralDashboard.jsx
- AuthForgotPassword.jsx
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- react-router-dom
- ContactsEditor.jsx
- session.service.test.js
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- transaction.service.test.js
- images.js
- balanceReconciliation.service.js
- `tbl_contract_suspensions`
- resolveDetail
- `tbl_providers`
- constants.js
- transaction.service.js
- writeAudit
- prismaClient.js
- uniqueConstraints.constants.test.js
- contractConcepts.service.js
- works.service.test.js
- contractPolicies.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- addressTypes.contacts.js
- retentionTerms.js
- invoiceTerms.js
- themes/index.jsx
- decimal
- contractNotifications.service.test.js
- permissions.constants.js
- authContext.jsx
- `tbl_contract_concepts`
- `tbl_reasons`
- serviceWorker.jsx
- invoiceEvidence.service.js
- NotificationSection/index.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- contractEndDateReconciliation.service.test.js
- extends
- ImageList.jsx
- auth.service.test.js
- winston.config.js
- invariants.check.js
- authjwt.middleware.test.js
- browserslist
- volta
- react
- contractBalances
- master.service.test.js
- policyTypes.service.test.js
- workScope.service.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 129 edges
2. `react` - 98 edges
3. `useAuth()` - 79 edges
4. `showError()` - 74 edges
5. `writeAudit()` - 59 edges
6. `withLockedTransaction()` - 56 edges
7. `dateOnlyText()` - 54 edges
8. `showSuccess()` - 53 edges
9. `workScopeOf()` - 51 edges
10. `@tabler/icons-react` - 51 edges

## Surprising Connections (you probably didn't know these)
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `SamplePage()` --calls--> `MainCard()`  [EXTRACTED]
  client/src/views/sample-page/index.jsx → client/src/ui-component/cards/MainCard.jsx
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx

## Import Cycles
- None detected.

## Communities (201 total, 79 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.06
Nodes (39): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Avatar() (+31 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "constant.js"
Cohesion: 0.17
Nodes (13): getWorksSummaryAPI(), appDrawerWidth, gridSpacing, SubCard(), ACTION_TONES, FormSection(), DashboardCards(), Indicator() (+5 more)

### Community 3 - "providerTypeFields.service.js"
Cohesion: 0.11
Nodes (30): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+22 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (58): assertInScope(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes(), assertTypeIds() (+50 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.12
Nodes (28): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, MoneyField(), moneyInputText() (+20 more)

### Community 8 - "auth.service.js"
Cohesion: 0.11
Nodes (25): bcrypt, withTransaction(), comparePassword(), hashPassword(), deriveKey(), generateResetCode(), hashResetCode(), ADR-0001 (+17 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.07
Nodes (50): getConstructionCompaniesSelectAPI, contractConceptsApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016 (+42 more)

### Community 10 - "idempotency.service.js"
Cohesion: 0.15
Nodes (15): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), IDEMPOTENCY_HEADER, idempotencyMisuse(), keyReused(), requestFingerprint(), deleteModuleDoc() (+7 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.05
Nodes (46): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+38 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "contractTerms.js"
Cohesion: 0.11
Nodes (23): ADR-0015, daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation(), derivedEndDate(), previewContractEndDate(), CONCEPT_TYPE_NAMES (+15 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (22): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+14 more)

### Community 15 - "@mui/icons-material"
Cohesion: 0.07
Nodes (19): admin, icons, billing, dashboard, icons, menuItems, icons, other (+11 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.12
Nodes (20): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+12 more)

### Community 17 - "status.constants.js"
Cohesion: 0.16
Nodes (14): ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, runIdempotent(), deleteModuleDoc(), DOC_CREATE_IDEMPOTENCY, DOC_SELECT, DOC_SORT_FIELDS (+6 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.10
Nodes (19): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthenticationRoutes.jsx"
Cohesion: 0.11
Nodes (21): client_src_assets_images_interve, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 21 - "contracts.service.js"
Cohesion: 0.09
Nodes (40): ADR-0006, dateRangeFilter(), assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditableContract() (+32 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.07
Nodes (64): sumMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS (+56 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.10
Nodes (42): ADR-0004, ADR-0007, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted(), assertHeader() (+34 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.06
Nodes (23): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), row(), ctx, prismaMock, state (+15 more)

### Community 27 - "@tabler/icons-react"
Cohesion: 0.12
Nodes (21): getStatusesByScopeAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters(), FilterButton(), FilterPopper(), normalizeOptions() (+13 more)

### Community 28 - "permissions.routes.js"
Cohesion: 0.23
Nodes (13): getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController(), permissionsRoutes (+5 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.04
Nodes (38): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+30 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.08
Nodes (54): ADR-0021, ADR-0023, approveInvoice(), assertContractAdmitsCancel(), assertContractStillAdmits(), assertInvoiceVisible(), assertProviderAssigned(), assertStage() (+46 more)

### Community 31 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.09
Nodes (32): moneyRule(), optionalDate(), percentRule(), contractsRoutes, ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+24 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 37 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 38 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 39 - "server.js"
Cohesion: 0.13
Nodes (15): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+7 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.05
Nodes (19): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, ALL (+11 more)

### Community 41 - "master.service.js"
Cohesion: 0.08
Nodes (38): capitalize(), createMasterService(), defineMaster(), httpError(), ADR-0027, containsFilter(), countByStatus(), DEFAULT_ROWS (+30 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "dashboard.service.js"
Cohesion: 0.16
Nodes (23): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+15 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "PoliciesTab.jsx"
Cohesion: 0.09
Nodes (27): contractPoliciesApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, PolicyTypePage, POLICY_BASE_OPTIONS, policyBaseName() (+19 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "ProviderTypePage.jsx"
Cohesion: 0.15
Nodes (16): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+8 more)

### Community 51 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 52 - "showError"
Cohesion: 0.05
Nodes (91): getIdentityDocumentsSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI(), deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI() (+83 more)

### Community 53 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (39): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+31 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkSummaryTab.jsx"
Cohesion: 0.09
Nodes (52): MainCard(), fTerm(), fMoneyText(), fPercentText(), fDateOnly(), SHORT_MONTHS, Advances(), CardTitle() (+44 more)

### Community 59 - "workScopeOf"
Cohesion: 0.10
Nodes (44): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, ADR-0002, accessOf() (+36 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "contractPolicies.service.js"
Cohesion: 0.09
Nodes (50): main(), percentText(), toPercent(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES (+42 more)

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

### Community 70 - "users.service.js"
Cohesion: 0.10
Nodes (22): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, identityDocumentsRoutes, identityDocumentsConfig (+14 more)

### Community 71 - "@mui/material"
Cohesion: 0.08
Nodes (27): CardSecondaryAction(), headerStyle, ActionButton(), toneOf(), Avatar(), EditableList(), BInputLabel, InputLabel() (+19 more)

### Community 88 - "main.routes.js"
Cohesion: 0.13
Nodes (16): express, STATUS_KEYS, insurersRoutes, insurersConfig, insurersService, dashboardRoutes, getMenuController(), getProfilesController() (+8 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (100): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, reasonsApi, supervisionTypesApi, useAuth() (+92 more)

### Community 100 - "works.routes.js"
Cohesion: 0.13
Nodes (20): changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, previewWorkEndDateController, saveWorkController (+12 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "GeneralDashboard.jsx"
Cohesion: 0.08
Nodes (39): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, RETRY_503_HINT (+31 more)

### Community 108 - "AuthForgotPassword.jsx"
Cohesion: 0.22
Nodes (14): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber(), hasSpecial() (+6 more)

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (35): getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), configurePolicyTypeBaseController (+27 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "react-router-dom"
Cohesion: 0.12
Nodes (30): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), setParentOpenedMenu(), useMenuCollapse() (+22 more)

### Community 117 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 118 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.22
Nodes (5): ALL, CONCEPTS, INVOICES, OWN, prismaMock

### Community 123 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 124 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.21
Nodes (14): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations() (+6 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.22
Nodes (7): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`, `tbl_invoice_liquidation_details`

### Community 130 - "resolveDetail"
Cohesion: 0.33
Nodes (7): isBlank(), toMoney(), adjustableAmount(), createContractInvoice(), liquidationConceptOf(), positiveMoney(), resolveDetail()

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "constants.js"
Cohesion: 0.06
Nodes (75): getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, refreshSession(), useInvoiceViewChange(), useInvoiceViews(), SocketContext, SocketProvider() (+67 more)

### Community 133 - "transaction.service.js"
Cohesion: 0.21
Nodes (11): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+3 more)

### Community 134 - "writeAudit"
Cohesion: 0.09
Nodes (36): AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0027, newOperationId(), protect() (+28 more)

### Community 136 - "prismaClient.js"
Cohesion: 0.10
Nodes (17): ADR-0013, ADR-0027, @prisma/adapter-mariadb, adapter, describeTarget(), prisma, testConnection(), USER_NAME_SELECT (+9 more)

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 139 - "contractConcepts.service.js"
Cohesion: 0.16
Nodes (29): activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget(), configuredConcept(), createAmendment() (+21 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 151 - "addressTypes.contacts.js"
Cohesion: 0.47
Nodes (5): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText()

### Community 152 - "retentionTerms.js"
Cohesion: 0.22
Nodes (13): @prisma/client, assertLiquidationCancellable(), assertRefundFits(), assertRetentionFits(), httpError(), ADR-0025, money(), retentionBalances() (+5 more)

### Community 153 - "invoiceTerms.js"
Cohesion: 0.21
Nodes (14): assertTransition(), cancelTransitionFor(), hasContract(), historyRow(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS, ADR-0020 (+6 more)

### Community 154 - "themes/index.jsx"
Cohesion: 0.24
Nodes (8): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ThemeCustomization(), buildPalette(), defaultColor, Typography()

### Community 155 - "decimal"
Cohesion: 0.12
Nodes (32): decimal(), HUNDRED, MONEY_SCALE, moneyText(), PERCENT_SCALE, percentOf(), RATIO_SCALE, ratioPercent() (+24 more)

### Community 156 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 157 - "permissions.constants.js"
Cohesion: 0.07
Nodes (48): ADR-0011, ADR-0012, ADR-0016, ADR-0018, ADR-0019, ADR-0026, ADR-0017, ADR-0020 (+40 more)

### Community 159 - "authContext.jsx"
Cohesion: 0.16
Nodes (12): loginAPI(), logoutAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), App(), AuthContext, AuthProvider(), getStoredUser() (+4 more)

### Community 173 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 174 - "invoiceEvidence.service.js"
Cohesion: 0.21
Nodes (12): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+4 more)

### Community 175 - "NotificationSection/index.jsx"
Cohesion: 0.35
Nodes (9): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+1 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.39
Nodes (6): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 181 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 183 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 186 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 189 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 192 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 193 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 194 - "react"
Cohesion: 0.08
Nodes (14): ConfigContext, ConfigProvider(), ADR-0002, useLocalStorage(), ChipMultiSelect(), fold(), COLUMNS, describeNothing() (+6 more)

### Community 197 - "contractBalances"
Cohesion: 0.43
Nodes (7): balanceChange(), contractBalances(), hasDetail(), revalidateOnApprove(), revalidateOnCancel(), SNAPSHOT_AMOUNTS, storedAmount()

### Community 199 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 200 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 202 - "workScope.service.js"
Cohesion: 0.18
Nodes (14): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+6 more)

## Knowledge Gaps
- **936 isolated node(s):** `ADR-0002`, `LEVEL_COLORS`, `num`, `notDeleted`, `POLICY_STATUS_ORDER` (+931 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1278 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **79 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`, `contractPolicies.service.js`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `ADR-0006` connect `contracts.service.js` to `ContractFormPage.jsx`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `constant.js`, `constants.js`, `InvoiceFormPage.jsx`, `ContractFormPage.jsx`, `client/package.json`, `@mui/icons-material`, `AuthenticationRoutes.jsx`, `themes/index.jsx`, `@tabler/icons-react`, `authContext.jsx`, `NotificationSection/index.jsx`, `PoliciesTab.jsx`, `ProviderTypePage.jsx`, `showError`, `DocumentManagement.jsx`, `ImageList.jsx`, `WorkSummaryTab.jsx`, `react`, `useAuth`, `GeneralDashboard.jsx`, `AuthForgotPassword.jsx`, `react-router-dom`, `ContactsEditor.jsx`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **What connects `ADR-0002`, `LEVEL_COLORS`, `num` to the rest of the system?**
  _936 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.058384547848990345 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `providerTypeFields.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.11260504201680673 - nodes in this community are weakly interconnected._
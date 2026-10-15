# Graph Report - WEBPAC-INTERVE  (2026-10-15)

## Corpus Check
- 575 files · ~277,390 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3251 nodes · 8898 edges · 192 communities (108 shown, 84 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 122 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b52064d4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- useAuth
- WorkChartsTab.jsx
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- writeAudit
- ContractFormPage.jsx
- withAlpha
- seed.demo.js
- auth.routes.js
- contractSuspensions.service.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- status.constants.js
- invoices.service.test.js
- compilerOptions
- AuthenticationRoutes.jsx
- permissions.routes.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contractConcepts.service.test.js
- ContactsEditor.jsx
- providers.service.test.js
- invoices.controller.test.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- contracts.service.test.js
- session.service.js
- contractSuspensions.service.test.js
- server.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- eslint.config.mjs
- scripts
- PolicyTypePage.jsx
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
- contracts.service.js
- permission
- devDependencies
- floatingPoint.guard.test.js
- express
- identityDocuments.service.js
- @mui/material
- `tbl_contract_status_history`
- app.routes.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_type_field_versions`
- react-router-dom
- AuthForgotPassword.jsx
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- MainLayout/index.jsx
- invoices.routes.js
- contracts.controller.test.js
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- transaction.service.test.js
- images.js
- balanceReconciliation.service.js
- `tbl_contract_suspensions`
- dashboard.service.test.js
- `tbl_providers`
- WorkDetailPage.jsx
- session.service.test.js
- funciones.js
- volta
- uniqueConstraints.constants.test.js
- works.service.test.js
- contractPolicies.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- ConfigContext.jsx
- decimal
- contractNotifications.service.test.js
- invoiceViews.js
- browserslist
- `tbl_contract_concepts`
- `tbl_reasons`
- serviceWorker.jsx
- NotificationSection/index.jsx
- `tbl_users`
- contractEndDateReconciliation.service.test.js
- useMenuCollapse.js
- ImageList.jsx
- auth.service.test.js
- winston.config.js
- invariants.check.js
- authjwt.middleware.test.js
- EasyCrop.jsx
- InputLabel.jsx
- DebouncedInput.jsx

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
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `previewWorkEndDate()` --calls--> `addTerm()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/term.utils.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `GeneralDashboard()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/views/dashboard/Default/GeneralDashboard.jsx → client/src/contexts/authContext.jsx
- `GeneralDashboard()` --calls--> `useInvoiceViews()`  [EXTRACTED]
  client/src/views/dashboard/Default/GeneralDashboard.jsx → client/src/hooks/useInvoiceViews.js

## Import Cycles
- None detected.

## Communities (192 total, 84 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (25): ThemeCustomization(), Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid() (+17 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "useAuth"
Cohesion: 0.04
Nodes (61): getPermissionsCatalogAPI(), reasonsApi, refreshSession(), AuthContext, useAuth(), useInvoiceViews(), ProfileSection(), InvoicesPage (+53 more)

### Community 3 - "WorkChartsTab.jsx"
Cohesion: 0.19
Nodes (27): Advances(), CardTitle(), ContractsByState(), dayOf(), Empty(), InvoicedByContract(), InvoicedByMonth(), InvoicesByType() (+19 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.06
Nodes (73): assertInScope(), containsFilter(), countByStatus(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS, paginate() (+65 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.19
Nodes (19): getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, RouteDialog(), amountsPayload(), DOCUMENT_FIELDS (+11 more)

### Community 8 - "writeAudit"
Cohesion: 0.04
Nodes (96): ADR-0001, ADR-0004, adapter, ADR-0013, ADR-0027, prisma, INACTIVE_STATUS, AUDIT_ENTITIES (+88 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (46): contractConceptsApi, contractPoliciesApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016 (+38 more)

### Community 10 - "withAlpha"
Cohesion: 0.14
Nodes (17): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Chip() (+9 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.07
Nodes (41): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+33 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "contractSuspensions.service.js"
Cohesion: 0.08
Nodes (42): ADR-0015, daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation(), derivedEndDate(), previewContractEndDate(), auditable() (+34 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (22): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+14 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.07
Nodes (35): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0009 (+27 more)

### Community 17 - "status.constants.js"
Cohesion: 0.10
Nodes (23): ADR-0027, ACTIVE_STATUS, DELETED_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused() (+15 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.10
Nodes (19): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthenticationRoutes.jsx"
Cohesion: 0.10
Nodes (21): client_src_assets_images_interve, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 21 - "permissions.routes.js"
Cohesion: 0.15
Nodes (16): getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController(), permissionsRoutes (+8 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.07
Nodes (78): scopeWhere(), moneyText(), sumMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel() (+70 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.10
Nodes (41): ADR-0007, PROGRESS_WARNING, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted(), assertHeader() (+33 more)

### Community 26 - "contractConcepts.service.test.js"
Cohesion: 0.09
Nodes (16): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+8 more)

### Community 27 - "ContactsEditor.jsx"
Cohesion: 0.16
Nodes (16): addressTypesApi, getAddressTypesSelectAPI, AddressTypePage, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS (+8 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.12
Nodes (14): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+6 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.06
Nodes (73): ADR-0021, ADR-0023, toMoney(), dateRangeFilter(), AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError() (+65 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.09
Nodes (32): moneyRule(), optionalDate(), percentRule(), contractsRoutes, ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+24 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 37 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 38 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 39 - "server.js"
Cohesion: 0.11
Nodes (17): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+9 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (15): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+7 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (48): ADR-0011, ADR-0012, ADR-0016, ADR-0018, ADR-0019, ADR-0026, ADR-0017, ADR-0020 (+40 more)

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
Cohesion: 0.13
Nodes (15): scripts, build, cron:run, db:check-invariants, db:seed, db:seed:demo, dev, pm2:logs (+7 more)

### Community 48 - "PolicyTypePage.jsx"
Cohesion: 0.16
Nodes (14): configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, PolicyTypePage, POLICY_BASE_OPTIONS, policyBaseName(), ConfigureBaseDialog(), ADR-0019 (+6 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "ProviderTypePage.jsx"
Cohesion: 0.13
Nodes (19): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), useInvoiceViewChange(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, providerInvoiceViewName(), DATA_TYPE_NAMES (+11 more)

### Community 51 - "providers.routes.js"
Cohesion: 0.13
Nodes (17): checkIdentificationController, selectProvidersController, ADR-0012, providersRoutes, assignProviderSchema, changeProviderStatusSchema, checkIdentificationSchema, deleteProviderSchema (+9 more)

### Community 52 - "showError"
Cohesion: 0.05
Nodes (77): suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, getModulesAPI(), getProfilesAPI(), saveProfileAPI(), checkProviderIdentificationAPI(), getAssignableWorksAPI() (+69 more)

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
Nodes (33): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+25 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkSummaryTab.jsx"
Cohesion: 0.06
Nodes (60): getInsurersSelectAPI, getContractAdvanceAPI(), getPolicyTypesSelectAPI, InvoiceDetailPage, Figure(), MoneyField(), fTerm(), fMoneyText() (+52 more)

### Community 59 - "workScopeOf"
Cohesion: 0.08
Nodes (55): auditContext(), getEffectivePermissionIds(), IDEMPOTENCY_HEADER, workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, ADR-0002 (+47 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "contracts.service.js"
Cohesion: 0.05
Nodes (108): ADR-0002, percentText(), toPercent(), insuredValue(), policyBaseValue(), FIELD_GROUPS, typeAppliesAiu(), withContractAiu() (+100 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "floatingPoint.guard.test.js"
Cohesion: 0.12
Nodes (13): ref_fs, ref_url, ALLOWED, files(), lines, SRC, catalog, expected (+5 more)

### Community 68 - "express"
Cohesion: 0.22
Nodes (13): express, getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount() (+5 more)

### Community 70 - "identityDocuments.service.js"
Cohesion: 0.17
Nodes (11): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, ADR-0008, identityDocumentsRoutes, identityDocumentsConfig, identityDocumentsService (+3 more)

### Community 71 - "@mui/material"
Cohesion: 0.07
Nodes (48): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), getWorksSummaryAPI(), filterParams(), isEmptyValue() (+40 more)

### Community 88 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.04
Nodes (57): constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, insurersApi, getSupervisionTypesSelectAPI, supervisionTypesApi (+49 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.27
Nodes (11): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+3 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "react-router-dom"
Cohesion: 0.05
Nodes (74): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, providersApi, getMyWorksSelectAPI(), pickWork(), useWorkFilterField(), useWorkScope() (+66 more)

### Community 108 - "AuthForgotPassword.jsx"
Cohesion: 0.12
Nodes (23): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), App(), AuthProvider() (+15 more)

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.07
Nodes (42): getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), configurePolicyTypeBaseController (+34 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "MainLayout/index.jsx"
Cohesion: 0.12
Nodes (28): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), Footer(), Header() (+20 more)

### Community 117 - "invoices.routes.js"
Cohesion: 0.11
Nodes (31): accessOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, getInvoiceEvidenceController, getInvoiceFormOptionsController, grantedOf() (+23 more)

### Community 118 - "contracts.controller.test.js"
Cohesion: 0.17
Nodes (10): conceptsServiceMock, contractsServiceMock, emit, getEffectivePermissionIds, ADR-0015, ADR-0016, policiesServiceMock, SCOPE (+2 more)

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
Cohesion: 0.24
Nodes (12): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS, findBalanceViolations() (+4 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.22
Nodes (7): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`, `tbl_invoice_liquidation_details`

### Community 130 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "WorkDetailPage.jsx"
Cohesion: 0.08
Nodes (45): getProviderTypesSelectAPI, getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, showInfo(), showObligatorios(), ContactsList(), ADR-0009 (+37 more)

### Community 133 - "session.service.test.js"
Cohesion: 0.14
Nodes (10): ref_crypto, deriveKey(), hashResetCode(), ADR-0001, verifyResetCode(), dbUser, mockDisconnectSockets, mockIn (+2 more)

### Community 136 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 151 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 154 - "ConfigContext.jsx"
Cohesion: 0.25
Nodes (7): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage()

### Community 155 - "decimal"
Cohesion: 0.05
Nodes (67): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE (+59 more)

### Community 156 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 157 - "invoiceViews.js"
Cohesion: 0.15
Nodes (23): applyInvoiceViewChange(), ADR-0010, providerTypesConfig, providerTypesService, ANY_CONTRACT_VIEW_PERMISSION, ANY_VIEW_PERMISSION, applyProviderViewChanges(), assertNotMixed() (+15 more)

### Community 159 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 173 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 175 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.39
Nodes (6): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 179 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

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

## Knowledge Gaps
- **931 isolated node(s):** `ADR-0002`, `ADR-0002`, `ADR-0002`, `num`, `MONTHS` (+926 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1273 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **84 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `useAuth`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `useAuth`, `WorkChartsTab.jsx`, `WorkDetailPage.jsx`, `InvoiceFormPage.jsx`, `ContractFormPage.jsx`, `withAlpha`, `client/package.json`, `AuthenticationRoutes.jsx`, `ConfigContext.jsx`, `ContactsEditor.jsx`, `NotificationSection/index.jsx`, `PolicyTypePage.jsx`, `ProviderTypePage.jsx`, `showError`, `DocumentManagement.jsx`, `ImageList.jsx`, `WorkSummaryTab.jsx`, `EasyCrop.jsx`, `InputLabel.jsx`, `DebouncedInput.jsx`, `MainRoutes.jsx`, `react-router-dom`, `AuthForgotPassword.jsx`, `MainLayout/index.jsx`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Why does `ADR-0027` connect `status.constants.js` to `showError`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `ADR-0002`, `ADR-0002`, `ADR-0002` to the rest of the system?**
  _931 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08078231292517007 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `useAuth` be split into smaller, more focused modules?**
  _Cohesion score 0.04004817825956037 - nodes in this community are weakly interconnected._
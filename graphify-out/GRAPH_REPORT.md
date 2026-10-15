# Graph Report - WEBPAC-INTERVE  (2026-10-15)

## Corpus Check
- 577 files · ~279,845 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3277 nodes · 8999 edges · 203 communities (121 shown, 82 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 122 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `979744d0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- constants.js
- providerTypeFields.service.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- writeAudit
- ContractFormPage.jsx
- withAlpha
- seed.demo.js
- auth.routes.js
- contractTerms.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- runIdempotent
- invoices.service.test.js
- compilerOptions
- AuthenticationRoutes.jsx
- contracts.service.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- UsersPage.jsx
- providers.service.test.js
- invoices.controller.test.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- master.service.js
- session.service.js
- contractSuspensions.service.test.js
- server.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- dashboard.service.js
- scripts
- PolicyTypePage.jsx
- `tbl_invoices`
- ProviderTypePage.jsx
- providers.routes.js
- react
- socket.manager.js
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
- app.routes.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_type_field_versions`
- GeneralDashboard.jsx
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
- withLockedTransaction
- audit.service.js
- prismaClient.js
- uniqueConstraints.constants.test.js
- contractSuspensions.service.js
- works.service.test.js
- contractPolicies.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- httpCliente.js
- retentionTerms.js
- invoiceTerms.js
- themes/index.jsx
- decimal
- contractNotifications.service.test.js
- invoiceViews.js
- App.jsx
- `tbl_contract_concepts`
- `tbl_reasons`
- serviceWorker.jsx
- invoiceEvidence.service.js
- NotificationSection/index.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- contractEndDateReconciliation.service.test.js
- useMenuCollapse.js
- ImageList.jsx
- auth.service.test.js
- winston.config.js
- invariants.check.js
- authjwt.middleware.test.js
- handleFirebase.js
- InputLabel.jsx
- DebouncedInput.jsx
- contractBalances
- MiniDrawerStyled.jsx
- master.service.test.js
- policyTypes.service.test.js
- users.service.test.js
- workScope.service.test.js

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
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `previewWorkEndDate()` --calls--> `addTerm()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/term.utils.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js

## Import Cycles
- None detected.

## Communities (203 total, 82 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "constants.js"
Cohesion: 0.06
Nodes (45): contractsApi, useWorkFilterField(), useInvoiceViews(), InvoicesPage, LinkedFilterNotice(), TooltipLongText(), CONTRACT_INVOICE_TYPES, CONTRACT_POLICY_STATUS_LABELS (+37 more)

### Community 3 - "providerTypeFields.service.js"
Cohesion: 0.12
Nodes (27): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+19 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (57): applyProviderTypes(), assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes(), assertTypeIds(), assertWorkAssignable(), ASSIGNMENT_IDEMPOTENCY (+49 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.21
Nodes (18): getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, amountsPayload(), DOCUMENT_FIELDS, EMPTY_FORM (+10 more)

### Community 8 - "writeAudit"
Cohesion: 0.11
Nodes (29): bcrypt, ref_crypto, writeAudit(), revokeSession(), withTransaction(), comparePassword(), hashPassword(), deriveKey() (+21 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (46): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+38 more)

### Community 10 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.05
Nodes (45): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+37 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "contractTerms.js"
Cohesion: 0.11
Nodes (25): ADR-0015, daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation(), derivedEndDate(), previewContractEndDate(), chronologyError() (+17 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (45): compat, __dirname, __filename, browserslist, development, production, eslintConfig, extends (+37 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.08
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.09
Nodes (26): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0009 (+18 more)

### Community 17 - "runIdempotent"
Cohesion: 0.15
Nodes (17): ADR-0027, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent() (+9 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.10
Nodes (19): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthenticationRoutes.jsx"
Cohesion: 0.10
Nodes (21): client_src_assets_images_interve, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 21 - "contracts.service.js"
Cohesion: 0.10
Nodes (30): ADR-0002, containsFilter(), dateRangeFilter(), filtersWhere(), idFilter(), typeAppliesAiu(), paginationInvoices(), CONCEPT_AUDITED (+22 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.08
Nodes (67): moneyText(), percentText(), sumMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel() (+59 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (54): ADR-0004, ADR-0007, assertInScope(), PROGRESS_WARNING, defineContacts(), FIELDS, httpError(), ADR-0009 (+46 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.06
Nodes (23): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), row(), ctx, prismaMock, state (+15 more)

### Community 27 - "UsersPage.jsx"
Cohesion: 0.14
Nodes (23): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+15 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.12
Nodes (14): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+6 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.08
Nodes (58): ADR-0021, ADR-0023, amountsDto(), approvalSnapshot(), approveInvoice(), assertInvoiceVisible(), assertProviderAssigned(), assertStage() (+50 more)

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

### Community 36 - "master.service.js"
Cohesion: 0.13
Nodes (24): newOperationId(), capitalize(), createMasterService(), httpError(), ADR-0027, countByStatus(), DEFAULT_ROWS, MAX_ROWS (+16 more)

### Community 37 - "session.service.js"
Cohesion: 0.14
Nodes (19): jsonwebtoken, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME (+11 more)

### Community 38 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 39 - "server.js"
Cohesion: 0.13
Nodes (15): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+7 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (14): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, prismaMock (+6 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (43): ADR-0011, ADR-0012, ADR-0016, ADR-0018, ADR-0019, ADR-0026, ADR-0017, ADR-0020 (+35 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.15
Nodes (13): client_src_assets_scss_style, config, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals() (+5 more)

### Community 45 - "dashboard.service.js"
Cohesion: 0.14
Nodes (26): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+18 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

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
Cohesion: 0.15
Nodes (15): ADR-0012, providersRoutes, assignProviderSchema, changeProviderStatusSchema, checkIdentificationSchema, deleteProviderSchema, getProviderSchema, ADR-0012 (+7 more)

### Community 52 - "react"
Cohesion: 0.05
Nodes (92): contractPoliciesApi, suspendContractAPI(), getIdentityDocumentsSelectAPI, getInsurersSelectAPI, invoiceTransitionsApi, getPolicyTypesSelectAPI, getModulesAPI(), getProfilesAPI() (+84 more)

### Community 53 - "socket.manager.js"
Cohesion: 0.26
Nodes (9): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), ACCESS_COOKIE_NAME (+1 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "DocumentManagement.jsx"
Cohesion: 0.32
Nodes (11): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+3 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (26): dbUser, mockDisconnectSockets, mockIn, prismaMock, user, lockedIdsOf(), transactionRawMocks(), ADR-0009 (+18 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkSummaryTab.jsx"
Cohesion: 0.05
Nodes (85): getStatusesByScopeAPI(), getContractAdvanceAPI(), InvoiceDetailPage, MainCard(), Figure(), MoneyField(), CACHE_PENDING, STATUS_CACHE (+77 more)

### Community 59 - "workScopeOf"
Cohesion: 0.09
Nodes (49): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, ACT_FIELDS, cancelPolicyController (+41 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "contractPolicies.service.js"
Cohesion: 0.08
Nodes (69): main(), toPercent(), withContractAiu(), assertContractAdmitsCancel(), assertContractStillAdmits(), activeSequence(), amendmentResult(), assertChronology() (+61 more)

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
Cohesion: 0.09
Nodes (25): defineMaster(), DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, identityDocumentsConfig (+17 more)

### Community 71 - "@mui/material"
Cohesion: 0.08
Nodes (31): appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, SubCard(), ACTION_TONES, ActionButton(), toneOf() (+23 more)

### Community 88 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (92): addressTypesApi, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, insurersApi, reasonsApi (+84 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.10
Nodes (26): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+18 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "GeneralDashboard.jsx"
Cohesion: 0.11
Nodes (32): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, getMyWorksSelectAPI(), pickWork(), useWorkScope(), WorkScopeContext, WorkScopeProvider() (+24 more)

### Community 108 - "AuthForgotPassword.jsx"
Cohesion: 0.20
Nodes (15): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber(), hasSpecial() (+7 more)

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.07
Nodes (40): express, getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers() (+32 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "MainLayout/index.jsx"
Cohesion: 0.15
Nodes (23): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), Footer(), Header() (+15 more)

### Community 117 - "invoices.routes.js"
Cohesion: 0.11
Nodes (29): accessOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, getInvoiceEvidenceController, getInvoiceFormOptionsController, grantedOf() (+21 more)

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
Cohesion: 0.21
Nodes (14): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations() (+6 more)

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
Nodes (49): getAddressTypesSelectAPI, getWorkManagersSelectAPI(), previewWorkEndDateAPI(), channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS (+41 more)

### Community 133 - "withLockedTransaction"
Cohesion: 0.11
Nodes (19): AUDIT_ENTITIES, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+11 more)

### Community 134 - "audit.service.js"
Cohesion: 0.13
Nodes (20): ADR-0001, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0027, protect(), REDACTED (+12 more)

### Community 136 - "prismaClient.js"
Cohesion: 0.14
Nodes (13): ADR-0013, @prisma/adapter-mariadb, adapter, describeTarget(), prisma, testConnection(), ACTIVE_STATUS, INACTIVE_STATUS (+5 more)

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 139 - "contractSuspensions.service.js"
Cohesion: 0.22
Nodes (17): contractLabel(), ADR-0027, notifyWorkManagers(), auditable(), findOpenSuspension(), ADR-0017, ADR-0027, liftWithAmendment() (+9 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 151 - "httpCliente.js"
Cohesion: 0.12
Nodes (11): getPermissionsCatalogAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient, RETRY_503_HINT, IDEMPOTENCY_HEADER, activeWorkHeader() (+3 more)

### Community 152 - "retentionTerms.js"
Cohesion: 0.22
Nodes (13): @prisma/client, assertLiquidationCancellable(), assertRefundFits(), assertRetentionFits(), httpError(), ADR-0025, money(), retentionBalances() (+5 more)

### Community 153 - "invoiceTerms.js"
Cohesion: 0.17
Nodes (15): isContractCreate(), isCreate(), isSimpleCreate(), cancelTransitionFor(), hasContract(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS (+7 more)

### Community 154 - "themes/index.jsx"
Cohesion: 0.22
Nodes (9): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor (+1 more)

### Community 155 - "decimal"
Cohesion: 0.09
Nodes (40): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ratioPercent() (+32 more)

### Community 156 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 157 - "invoiceViews.js"
Cohesion: 0.16
Nodes (23): applyInvoiceViewChange(), ADR-0010, providerTypesConfig, providerTypesService, createContractInvoice(), ANY_CONTRACT_VIEW_PERMISSION, ANY_VIEW_PERMISSION, applyProviderViewChanges() (+15 more)

### Community 159 - "App.jsx"
Cohesion: 0.18
Nodes (12): loginAPI(), logoutAPI(), verifyTokenAPI(), refreshSession(), App(), AuthContext, AuthProvider(), getStoredUser() (+4 more)

### Community 173 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 174 - "invoiceEvidence.service.js"
Cohesion: 0.20
Nodes (11): USER_NAME_SELECT, AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027 (+3 more)

### Community 175 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.39
Nodes (6): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

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

### Community 192 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 197 - "contractBalances"
Cohesion: 0.36
Nodes (8): balanceChange(), contractBalances(), hasDetail(), revalidateOnApprove(), revalidateOnCancel(), SNAPSHOT_AMOUNTS, storedAmount(), storedDetail()

### Community 198 - "MiniDrawerStyled.jsx"
Cohesion: 0.38
Nodes (5): MainContentStyled, closedMixin(), MiniDrawerStyled, openedMixin(), drawerWidth

### Community 199 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 200 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 201 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 202 - "workScope.service.test.js"
Cohesion: 0.40
Nodes (4): hasEffectivePermission, prismaMock, state, user

## Knowledge Gaps
- **940 isolated node(s):** `name`, `version`, `description`, `main`, `type` (+935 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1282 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **82 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Why does `ADR-0027` connect `runIdempotent` to `prismaClient.js`, `react`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `constants.js`, `WorkDetailPage.jsx`, `InvoiceFormPage.jsx`, `ContractFormPage.jsx`, `withAlpha`, `client/package.json`, `AuthenticationRoutes.jsx`, `themes/index.jsx`, `UsersPage.jsx`, `NotificationSection/index.jsx`, `PolicyTypePage.jsx`, `ProviderTypePage.jsx`, `react`, `DocumentManagement.jsx`, `ImageList.jsx`, `WorkSummaryTab.jsx`, `InputLabel.jsx`, `DebouncedInput.jsx`, `MiniDrawerStyled.jsx`, `useAuth`, `GeneralDashboard.jsx`, `AuthForgotPassword.jsx`, `MainLayout/index.jsx`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _940 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `constants.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05868118572292801 - nodes in this community are weakly interconnected._
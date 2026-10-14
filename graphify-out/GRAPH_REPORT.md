# Graph Report - WEBPAC-INTERVE  (2026-10-14)

## Corpus Check
- 562 files · ~262,933 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3102 nodes · 8393 edges · 197 communities (116 shown, 81 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 117 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ec329663`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- writeAudit
- InvoiceFormPage.jsx
- dependencies
- server/package.json
- providers.service.js
- status.constants.js
- auth.service.js
- ContractFormPage.jsx
- withAlpha
- contractConcepts.service.js
- auth.routes.js
- contracts.service.js
- client/package.json
- menu-items/index.js
- providers.routes.js
- pagination.utils.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- UserDialog.jsx
- dashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- contractTerms.js
- providers.service.test.js
- contracts.controller.test.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- DocumentManagement.jsx
- session.service.js
- Default/index.jsx
- server.js
- ref_jest_globals
- permissions.routes.js
- devDependencies
- src/index.jsx
- master.service.js
- scripts
- contractPolicies.service.js
- `tbl_invoices`
- ProviderTypePage.jsx
- workScopeOf
- showError
- @mui/material
- `tbl_contract_type_fields`
- InvoiceDetailPage.jsx
- transaction.mock.js
- scripts
- WorkDetailPage.jsx
- works.routes.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- floatingPoint.guard.test.js
- notifications.routes.js
- users.service.js
- ContactsEditor.jsx
- `tbl_contract_status_history`
- app.routes.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- masterRouter.utils.js
- `tbl_provider_type_field_versions`
- constants.js
- App.jsx
- runIdempotent
- `tbl_works`
- `tbl_policies`
- MainLayout/index.jsx
- invoices.routes.js
- auth.service.test.js
- error.middleware.js
- advanceTerms.js
- `tbl_providers`
- transaction.service.test.js
- images.js
- balanceReconciliation.service.js
- `tbl_contract_suspensions`
- providerTypeFields.service.js
- `tbl_providers`
- handleFirebaseDocs.js
- session.service.test.js
- term.utils.js
- eslint.config.mjs
- uniqueConstraints.constants.test.js
- invoiceTerms.js
- works.service.test.js
- document.routes.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- balanceReconciliation.service.test.js
- dashboard.service.test.js
- InputLabel.jsx
- decimal
- master.service.test.js
- permissions.constants.js
- workScope.service.js
- `tbl_contract_concepts`
- `tbl_reasons`
- volta
- addressTypes.service.js
- NotificationSection/index.jsx
- `tbl_users`
- contractSuspensions.service.test.js
- contractEndDateReconciliation.service.test.js
- invoices.controller.test.js
- useConfig
- winston.config.js
- works.controller.test.js
- reasons.service.js
- authjwt.middleware.test.js
- policyTypes.service.test.js
- DebouncedInput.jsx
- browserslist
- useMenuCollapse.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 126 edges
2. `react` - 97 edges
3. `useAuth()` - 77 edges
4. `showError()` - 72 edges
5. `writeAudit()` - 59 edges
6. `withLockedTransaction()` - 56 edges
7. `showSuccess()` - 53 edges
8. `workScopeOf()` - 49 edges
9. `@tabler/icons-react` - 49 edges
10. `auditContext()` - 48 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `runEndDateReconciliation()` --calls--> `deliverReconciliationReport()`  [EXTRACTED]
  server/src/modules/work/contracts/contractEndDateReconciliation.service.js → server/src/common/services/reconciliationReport.service.js
- `balanceViolations()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/billing/invoices/balanceReconciliation.service.js → server/src/common/utils/money.utils.js
- `findBalanceViolations()` --calls--> `withTransaction()`  [EXTRACTED]
  server/src/modules/billing/invoices/balanceReconciliation.service.js → server/src/common/services/transaction.service.js
- `findBalanceViolations()` --calls--> `contractBalances()`  [EXTRACTED]
  server/src/modules/billing/invoices/balanceReconciliation.service.js → server/src/modules/billing/invoices/invoices.service.js

## Import Cycles
- None detected.

## Communities (197 total, 81 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (26): ThemeCustomization(), Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid() (+18 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "writeAudit"
Cohesion: 0.09
Nodes (35): prisma, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0027, newOperationId(), protect() (+27 more)

### Community 3 - "InvoiceFormPage.jsx"
Cohesion: 0.11
Nodes (32): getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), getMyWorksSelectAPI(), pickWork(), useWorkFilterField(), useWorkScope(), WorkScopeContext (+24 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (58): assertInScope(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes(), assertTypeIds() (+50 more)

### Community 7 - "status.constants.js"
Cohesion: 0.11
Nodes (16): @prisma/client, adapter, describeTarget(), ADR-0013, ADR-0027, testConnection(), ACTIVE_STATUS, DELETED_STATUS (+8 more)

### Community 8 - "auth.service.js"
Cohesion: 0.08
Nodes (36): bcrypt, REDACTED, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS (+28 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (48): contractConceptsApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+40 more)

### Community 10 - "withAlpha"
Cohesion: 0.14
Nodes (17): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Chip() (+9 more)

### Community 11 - "contractConcepts.service.js"
Cohesion: 0.08
Nodes (47): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+39 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "contracts.service.js"
Cohesion: 0.09
Nodes (44): PROVIDER_VIEW_SELECT, assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditableContract(), CONCEPT_AUDITED (+36 more)

### Community 14 - "client/package.json"
Cohesion: 0.08
Nodes (23): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+15 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.08
Nodes (18): admin, icons, billing, dashboard, icons, menuItems, icons, other (+10 more)

### Community 16 - "providers.routes.js"
Cohesion: 0.08
Nodes (31): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+23 more)

### Community 17 - "pagination.utils.js"
Cohesion: 0.20
Nodes (16): containsFilter(), countByStatus(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS, paginate(), resolvePagination() (+8 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.10
Nodes (19): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.06
Nodes (40): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), client_src_assets_images_interve, AuthProvider() (+32 more)

### Community 21 - "UserDialog.jsx"
Cohesion: 0.06
Nodes (41): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getIdentityDocumentsSelectAPI, ADR-0017, getPermissionsCatalogAPI(), getProfilesAPI(), saveProfileAPI(), getSupervisionTypesSelectAPI (+33 more)

### Community 22 - "dashboard.service.js"
Cohesion: 0.13
Nodes (32): scopeWhere(), todayDateOnly(), contractsBlock(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002, notDeleted (+24 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.10
Nodes (44): ADR-0007, diffFields(), applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted(), assertHeader() (+36 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.07
Nodes (19): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+11 more)

### Community 27 - "contractTerms.js"
Cohesion: 0.12
Nodes (29): ADR-0021, sumMoney(), dateOnlyText(), auditable(), findOpenSuspension(), ADR-0017, liftWithAmendment(), optionalText() (+21 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.12
Nodes (14): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+6 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.06
Nodes (27): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+19 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.09
Nodes (56): ADR-0017, ADR-0023, ADR-0025, ADR-0027, dateRangeFilter(), adjustableAmount(), approveInvoice(), assertContractStillAdmits() (+48 more)

### Community 31 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.09
Nodes (31): moneyRule(), optionalDate(), percentRule(), contractsRoutes, ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+23 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "DocumentManagement.jsx"
Cohesion: 0.46
Nodes (7): paginationDocsApi(), showPromise(), DocumentManagement(), FileRow(), getFileIcon(), getFileSize(), formatNotificationDateTime()

### Community 37 - "session.service.js"
Cohesion: 0.06
Nodes (43): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+35 more)

### Community 38 - "Default/index.jsx"
Cohesion: 0.10
Nodes (34): getDashboardSummaryAPI(), ADR-0002, appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard() (+26 more)

### Community 39 - "server.js"
Cohesion: 0.13
Nodes (15): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+7 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (17): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+9 more)

### Community 41 - "permissions.routes.js"
Cohesion: 0.15
Nodes (16): getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController(), permissionsRoutes (+8 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "master.service.js"
Cohesion: 0.10
Nodes (23): ADR-0004, ADR-0013, capitalize(), createMasterService(), defineMaster(), httpError(), ADR-0027, USER_NAME_SELECT (+15 more)

### Community 46 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, cron:run, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart (+6 more)

### Community 48 - "contractPolicies.service.js"
Cohesion: 0.13
Nodes (36): percentText(), toPercent(), insuredValue(), policyBaseValue(), policyTypesService, assertMasters(), assertTypeFree(), auditable() (+28 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "ProviderTypePage.jsx"
Cohesion: 0.13
Nodes (19): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), useInvoiceViewChange(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, providerInvoiceViewName(), DATA_TYPE_NAMES (+11 more)

### Community 51 - "workScopeOf"
Cohesion: 0.10
Nodes (44): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, ADR-0002, ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS (+36 more)

### Community 52 - "showError"
Cohesion: 0.06
Nodes (71): suspendContractAPI(), getInsurersSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, deleteProfileAPI() (+63 more)

### Community 53 - "@mui/material"
Cohesion: 0.08
Nodes (35): getStatusesByScopeAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters(), ACTION_TONES (+27 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "InvoiceDetailPage.jsx"
Cohesion: 0.07
Nodes (45): contractPoliciesApi, getContractAdvanceAPI(), DataList(), Figure(), LastModifiedCell(), MoneyField(), fTerm(), fMoneyText() (+37 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.07
Nodes (25): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+17 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkDetailPage.jsx"
Cohesion: 0.09
Nodes (46): getWorkManagersSelectAPI(), previewWorkEndDateAPI(), useInvoiceViews(), ContactsList(), ADR-0009, Pending(), EditableList(), FormSection() (+38 more)

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

### Community 70 - "users.service.js"
Cohesion: 0.11
Nodes (20): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, identityDocumentsConfig, assertAssignableProfile() (+12 more)

### Community 71 - "ContactsEditor.jsx"
Cohesion: 0.16
Nodes (16): addressTypesApi, getAddressTypesSelectAPI, AddressTypePage, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS (+8 more)

### Community 88 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (80): constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, reasonsApi, supervisionTypesApi, getBasicInformationAPI(), updateAccountAPI() (+72 more)

### Community 100 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (35): express, getIO(), verifyToken(), requirePermission(), validate(), createMasterControllers(), createMasterRouter(), identityDocumentsRoutes (+27 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "constants.js"
Cohesion: 0.06
Nodes (42): invoicesApi, ADR-0002, useLinkedFilters(), ContractsPage, InvoicesPage, SocketContext, LinkedFilterNotice(), TooltipLongText() (+34 more)

### Community 108 - "App.jsx"
Cohesion: 0.28
Nodes (7): refreshSession(), App(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

### Community 112 - "runIdempotent"
Cohesion: 0.15
Nodes (17): ref_crypto, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent() (+9 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "MainLayout/index.jsx"
Cohesion: 0.14
Nodes (24): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), Footer(), Header(), WorkSection() (+16 more)

### Community 117 - "invoices.routes.js"
Cohesion: 0.10
Nodes (31): accessOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, getInvoiceFormOptionsController, grantedOf(), INVOICE_FIELDS (+23 more)

### Community 118 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "advanceTerms.js"
Cohesion: 0.17
Nodes (22): ratioPercent(), advanceBalances(), appliedPct(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits(), balancesDto(), defaultAmortization() (+14 more)

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

### Community 130 - "providerTypeFields.service.js"
Cohesion: 0.11
Nodes (32): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+24 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "handleFirebaseDocs.js"
Cohesion: 0.18
Nodes (10): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+2 more)

### Community 133 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 134 - "term.utils.js"
Cohesion: 0.16
Nodes (21): ADR-0015, addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress() (+13 more)

### Community 136 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 139 - "invoiceTerms.js"
Cohesion: 0.15
Nodes (15): cancelTransitionFor(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS, INVOICE_TYPES, ADR-0020, NOTE_COLUMNS, STATE_ALLOWS (+7 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "document.routes.js"
Cohesion: 0.23
Nodes (9): IDEMPOTENCY_HEADER, deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema, DOC_TYPES, paginationDocsSchema (+1 more)

### Community 151 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 152 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 153 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 155 - "decimal"
Cohesion: 0.10
Nodes (34): decimal(), HUNDRED, isBlank(), MONEY_SCALE, moneyText(), PERCENT_SCALE, percentOf(), RATIO_SCALE (+26 more)

### Community 156 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 157 - "permissions.constants.js"
Cohesion: 0.10
Nodes (35): ADR-0011, ADR-0012, ADR-0016, ADR-0018, ADR-0019, ADR-0020, ADR-0026, ADR-0017 (+27 more)

### Community 159 - "workScope.service.js"
Cohesion: 0.29
Nodes (11): hasEffectivePermission(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope() (+3 more)

### Community 173 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 174 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 175 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.39
Nodes (6): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "contractSuspensions.service.test.js"
Cohesion: 0.17
Nodes (5): ctx, initial, ADR-0017, prismaMock, state

### Community 179 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 181 - "invoices.controller.test.js"
Cohesion: 0.25
Nodes (6): emit, getEffectivePermissionIds, invoicesServiceMock, ADR-0020, SCOPE, workScopeOf

### Community 183 - "useConfig"
Cohesion: 0.15
Nodes (14): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useConfig(), useLocalStorage() (+6 more)

### Community 186 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 189 - "works.controller.test.js"
Cohesion: 0.29
Nodes (5): emit, getEffectivePermissionIds, SCOPE, serviceMock, workScopeOf

### Community 190 - "reasons.service.js"
Cohesion: 0.38
Nodes (5): reasonsRoutes, ADR-0017, REASON_SCOPES, reasonsConfig, reasonsService

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 192 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 194 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

## Knowledge Gaps
- **876 isolated node(s):** `PAGES`, `PERMISSIONS`, `PERMISSIONS_NO_PAGE`, `VIEW_PERMISSIONS`, `STATUSES` (+871 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1206 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **81 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0016` connect `permissions.constants.js` to `ContractFormPage.jsx`, `contracts.service.js`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `InvoiceFormPage.jsx`, `ContractFormPage.jsx`, `withAlpha`, `client/package.json`, `menu-items/index.js`, `AuthForgotPassword.jsx`, `UserDialog.jsx`, `InputLabel.jsx`, `DocumentManagement.jsx`, `Default/index.jsx`, `NotificationSection/index.jsx`, `ProviderTypePage.jsx`, `showError`, `useConfig`, `InvoiceDetailPage.jsx`, `WorkDetailPage.jsx`, `DebouncedInput.jsx`, `ContactsEditor.jsx`, `useAuth`, `constants.js`, `MainLayout/index.jsx`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **What connects `PAGES`, `PERMISSIONS`, `PERMISSIONS_NO_PAGE` to the rest of the system?**
  _876 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07764705882352942 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `writeAudit` be split into smaller, more focused modules?**
  _Cohesion score 0.08792270531400966 - nodes in this community are weakly interconnected._
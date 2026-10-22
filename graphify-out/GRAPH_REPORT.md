# Graph Report - WEBPAC-INTERVE  (2026-10-22)

## Corpus Check
- 592 files · ~297,548 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3405 nodes · 9352 edges · 208 communities (120 shown, 88 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 125 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0ae2cb39`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- master.service.js
- httpCliente.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- ContractFormPage.jsx
- PoliciesTab.jsx
- seed.volume.js
- auditContext
- contractTerms.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- providers.routes.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- invoices.service.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- UsersPage.jsx
- withLockedTransaction
- invoices.controller.test.js
- httpError
- mailerService.js
- workScopeOf
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- socket.js
- contracts.service.js
- server.js
- policyTypes.service.test.js
- permissions.constants.js
- devDependencies
- App.jsx
- WorkChartsTab.jsx
- scripts
- simpleInvoiceTerms.js
- `tbl_invoices`
- seed.demo.js
- status.constants.js
- invoiceEvidence.service.js
- contractPolicies.service.js
- `tbl_contract_type_fields`
- DocumentManagement.jsx
- transaction.mock.js
- scripts
- InvoiceDetailPage.jsx
- toDateOnly
- compilerOptions
- excelJS.js
- getIO
- permission
- devDependencies
- transaction.service.test.js
- notifications.routes.js
- contractConcepts.service.js
- @mui/material
- `tbl_contract_status_history`
- app.routes.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- react
- contractSuspensions.service.test.js
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- useGetMenuMaster
- export.service.js
- handleFirebase.js
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- error.middleware.test.js
- images.js
- balanceReconciliation.service.js
- decisionReferences.guard.test.js
- dashboard.service.test.js
- `tbl_providers`
- WorkDetailPage.jsx
- `tbl_identity_documents`
- writeAudit
- users.service.js
- uniqueConstraints.constants.test.js
- works.service.test.js
- ForgotPassword.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- InputLabel.jsx
- `tbl_user_permissions`
- AuthenticationRoutes.jsx
- Sidebar/index.jsx
- decimal
- contractNotifications.service.test.js
- contractFields.js
- ContractsPage.jsx
- `tbl_contract_concepts`
- `tbl_reasons`
- ConfigContext.jsx
- contracts.controller.test.js
- SimpleBar.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- contractEndDateReconciliation.service.test.js
- MenuList/index.jsx
- useConfig
- auth.service.test.js
- winston.config.js
- invariants.check.js
- authjwt.middleware.test.js
- master.service.test.js
- users.service.test.js
- DebouncedInput.jsx
- NotificationSection/index.jsx
- NotificationList.jsx
- workScope.service.test.js
- ProviderTypePage.jsx
- ref_jest_globals
- MainLayout/index.jsx
- `tbl_invoices`
- `tbl_invoices`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 132 edges
2. `react` - 101 edges
3. `showError()` - 80 edges
4. `useAuth()` - 79 edges
5. `writeAudit()` - 58 edges
6. `workScopeOf()` - 57 edges
7. `withLockedTransaction()` - 57 edges
8. `showSuccess()` - 55 edges
9. `dateOnlyText()` - 54 edges
10. `@tabler/icons-react` - 53 edges

## Surprising Connections (you probably didn't know these)
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js
- `previewWorkEndDate()` --calls--> `addTerm()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/term.utils.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js

## Import Cycles
- None detected.

## Communities (208 total, 88 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.07
Nodes (33): createCustomShadow(), CustomShadows(), ThemeCustomization(), Alert(), Avatar(), Button(), CardActions(), CardContent() (+25 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "master.service.js"
Cohesion: 0.09
Nodes (34): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent(), capitalize() (+26 more)

### Community 3 - "httpCliente.js"
Cohesion: 0.08
Nodes (35): getWorkDashboardAPI(), ADR-0002, providersApi, getMyWorksSelectAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient (+27 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (68): assertInScope(), containsFilter(), filtersWhere(), idFilter(), userFullName(), invoiceListQuery(), applyAssignmentTypes(), applyProviderTypes() (+60 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.10
Nodes (35): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, previewSimpleInvoiceAPI() (+27 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.07
Nodes (56): sendExport(), exportFormatRule(), accessOf(), approveInvoiceController, cancelInvoiceController, deleteInvoiceController, exportInvoicesController, getContractAdvanceController (+48 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.10
Nodes (36): getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), previewContractEndDateAPI(), useEndDatePreview(), FormSection(), ConceptDialog(), ADR-0016 (+28 more)

### Community 10 - "PoliciesTab.jsx"
Cohesion: 0.14
Nodes (20): contractPoliciesApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, PercentField(), toText(), toValue(), ADR-0018, PoliciesDraftEditor() (+12 more)

### Community 11 - "seed.volume.js"
Cohesion: 0.10
Nodes (31): ref_node_crypto, nit(), addDays(), ALL_FIELDS, concept(), dbName, END_DATES, firstActive() (+23 more)

### Community 12 - "auditContext"
Cohesion: 0.11
Nodes (27): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+19 more)

### Community 13 - "contractTerms.js"
Cohesion: 0.09
Nodes (32): contractLabel(), ADR-0027, notifyWorkManagers(), auditable(), findOpenSuspension(), ADR-0017, ADR-0027, liftWithAmendment() (+24 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (45): compat, __dirname, __filename, browserslist, development, production, eslintConfig, extends (+37 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.09
Nodes (28): ADR-0009, express-validator, IDEMPOTENCY_HEADER, createMasterSchemas(), contactsRules(), emailRule(), idempotencyKeyRule(), ADR-0027 (+20 more)

### Community 17 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.11
Nodes (23): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), AuthProvider() (+15 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.06
Nodes (45): ADR-0013, ADR-0021, ADR-0023, admittedContractsWhere(), admittedTypes(), approvalSnapshot(), CONTRACT_GATED_ACTIONS, countByState() (+37 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.07
Nodes (61): scopeWhere(), sumMoney(), dateOnlyText(), contractsBlock(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002 (+53 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (52): ADR-0004, ADR-0007, diffFields(), PROGRESS_WARNING, defineContacts(), FIELDS, httpError(), ADR-0009 (+44 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.06
Nodes (24): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx, prismaMock (+16 more)

### Community 27 - "UsersPage.jsx"
Cohesion: 0.16
Nodes (21): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+13 more)

### Community 28 - "withLockedTransaction"
Cohesion: 0.08
Nodes (31): AUDIT_ENTITIES, newOperationId(), backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS (+23 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "httpError"
Cohesion: 0.20
Nodes (25): approveInvoice(), assertContractAdmitsCancel(), assertInvoiceVisible(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditable() (+17 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "workScopeOf"
Cohesion: 0.07
Nodes (61): workScopeOf(), moneyRule(), optionalDate(), percentRule(), simpleAmountRules(), ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS (+53 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 38 - "contracts.service.js"
Cohesion: 0.07
Nodes (55): ADR-0002, moneyText(), percentText(), typeAppliesAiu(), selectInvoiceProviders(), assertHeader(), assertProviderAssigned(), assertStage() (+47 more)

### Community 39 - "server.js"
Cohesion: 0.13
Nodes (15): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+7 more)

### Community 40 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 41 - "permissions.constants.js"
Cohesion: 0.06
Nodes (37): ADR-0011, ADR-0012, ADR-0019, ADR-0016, ADR-0017, ADR-0018, ADR-0020, ADR-0024 (+29 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "App.jsx"
Cohesion: 0.10
Nodes (21): refreshSession(), App(), client_src_assets_scss_style, AuthContext, container, root, NavigationScroll(), reportWebVitals() (+13 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.18
Nodes (28): Advances(), CardTitle(), ContractsByState(), dayOf(), Empty(), InvoicedByContract(), InvoicedByMonth(), InvoicesByType() (+20 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "simpleInvoiceTerms.js"
Cohesion: 0.14
Nodes (18): amountsDto(), getInvoice(), previewSimpleInvoice(), blank(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023 (+10 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "seed.demo.js"
Cohesion: 0.08
Nodes (25): ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC, ADR-0002 (+17 more)

### Community 51 - "status.constants.js"
Cohesion: 0.08
Nodes (35): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+27 more)

### Community 52 - "invoiceEvidence.service.js"
Cohesion: 0.10
Nodes (27): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+19 more)

### Community 53 - "contractPolicies.service.js"
Cohesion: 0.11
Nodes (25): percentOf(), toPercent(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, policyBaseValue() (+17 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "DocumentManagement.jsx"
Cohesion: 0.30
Nodes (12): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+4 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (26): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+18 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "InvoiceDetailPage.jsx"
Cohesion: 0.05
Nodes (69): getDashboardSummaryAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard(), Avatar() (+61 more)

### Community 59 - "toDateOnly"
Cohesion: 0.16
Nodes (23): ADR-0015, addTerm(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), TERM_UNITS, termProgress(), toDateOnly() (+15 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "getIO"
Cohesion: 0.13
Nodes (16): getIO(), EDITABLE_STATUS_VALUES, FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, deleteProfileController(), getModulesController() (+8 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 70 - "contractConcepts.service.js"
Cohesion: 0.13
Nodes (44): main(), withContractAiu(), resolveContractTypeFields(), assertContractStillAdmits(), createContractInvoice(), activeSequence(), amendmentResult(), assertChronology() (+36 more)

### Community 71 - "@mui/material"
Cohesion: 0.11
Nodes (27): addressTypesApi, getAddressTypesSelectAPI, ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), channelsOf(), ContactDialog() (+19 more)

### Community 88 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.14
Nodes (8): `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies`, `tbl_users`, `tbl_reasons`, `tbl_status`

### Community 94 - "useAuth"
Cohesion: 0.02
Nodes (112): constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), configurePolicyTypeBaseAPI(), ADR-0019 (+104 more)

### Community 100 - "works.routes.js"
Cohesion: 0.13
Nodes (20): changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, previewWorkEndDateController, saveWorkController (+12 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "react"
Cohesion: 0.05
Nodes (82): suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, getModulesAPI(), getProfilesAPI(), saveProfileAPI(), checkProviderIdentificationAPI(), getAssignableWorksAPI() (+74 more)

### Community 108 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (30): express, verifyToken(), requirePermission(), validate(), createMasterControllers(), createMasterRouter(), contractTypesRoutes, contractTypesConfig (+22 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.17
Nodes (10): `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts`, `tbl_contracts`, `tbl_insurers` (+2 more)

### Community 116 - "useGetMenuMaster"
Cohesion: 0.51
Nodes (6): useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), NavCollapse(), NavGroup(), NavItem()

### Community 117 - "export.service.js"
Cohesion: 0.18
Nodes (17): exceljs, pdfkit, buildExcel(), buildPdf(), cellText(), excelValue(), EXPORT_FORMATS, EXPORT_MAX_ROWS (+9 more)

### Community 118 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.22
Nodes (5): ALL, CONCEPTS, INVOICES, OWN, prismaMock

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.16
Nodes (19): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS, findBalanceViolations() (+11 more)

### Community 129 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 130 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "WorkDetailPage.jsx"
Cohesion: 0.07
Nodes (56): getStatusesByScopeAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), ContactsList(), ADR-0009, DataList(), Figure(), Pending() (+48 more)

### Community 133 - "`tbl_identity_documents`"
Cohesion: 0.50
Nodes (3): `tbl_users`, `tbl_identity_documents`, `tbl_users`

### Community 134 - "writeAudit"
Cohesion: 0.05
Nodes (66): ADR-0001, bcrypt, ref_crypto, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0027, protect() (+58 more)

### Community 136 - "users.service.js"
Cohesion: 0.09
Nodes (26): defineMaster(), USER_NAME_SELECT, DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008 (+18 more)

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "ForgotPassword.jsx"
Cohesion: 0.21
Nodes (11): client_src_assets_images_interve, ForgotPasswordPage, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthCardWrapper() (+3 more)

### Community 153 - "AuthenticationRoutes.jsx"
Cohesion: 0.19
Nodes (10): MinimalLayout(), AuthenticationRoutes, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router, MainRoutes (+2 more)

### Community 154 - "Sidebar/index.jsx"
Cohesion: 0.31
Nodes (7): LogoSection(), MainContentStyled, Sidebar(), closedMixin(), MiniDrawerStyled, openedMixin(), drawerWidth

### Community 155 - "decimal"
Cohesion: 0.09
Nodes (46): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent() (+38 more)

### Community 156 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 157 - "contractFields.js"
Cohesion: 0.23
Nodes (11): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+3 more)

### Community 159 - "ContractsPage.jsx"
Cohesion: 0.07
Nodes (38): getConstructionCompaniesSelectAPI, contractConceptsApi, contractsApi, exportContractsAPI(), getContractFilterProvidersAPI(), ADR-0006, ADR-0016, ADR-0017 (+30 more)

### Community 173 - "ConfigContext.jsx"
Cohesion: 0.27
Nodes (7): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage()

### Community 174 - "contracts.controller.test.js"
Cohesion: 0.17
Nodes (10): conceptsServiceMock, contractsServiceMock, emit, getEffectivePermissionIds, ADR-0015, ADR-0016, policiesServiceMock, SCOPE (+2 more)

### Community 175 - "SimpleBar.jsx"
Cohesion: 0.47
Nodes (5): RootStyle, SimpleBarScroll(), SimpleBarStyle, react-device-detect, simplebar-react

### Community 176 - "`tbl_users`"
Cohesion: 0.31
Nodes (7): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 181 - "MenuList/index.jsx"
Cohesion: 0.53
Nodes (3): getMenuAPI(), getIconByName(), MenuList()

### Community 183 - "useConfig"
Cohesion: 0.29
Nodes (8): useConfig(), ProfileSection(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

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

### Community 192 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 193 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 197 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 198 - "NotificationList.jsx"
Cohesion: 0.60
Nodes (4): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig

### Community 199 - "workScope.service.test.js"
Cohesion: 0.40
Nodes (4): hasEffectivePermission, prismaMock, state, user

### Community 201 - "ProviderTypePage.jsx"
Cohesion: 0.14
Nodes (17): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+9 more)

### Community 202 - "ref_jest_globals"
Cohesion: 0.05
Nodes (19): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, dbUser (+11 more)

### Community 206 - "MainLayout/index.jsx"
Cohesion: 0.24
Nodes (11): endpoints, handlerDrawerOpen(), initialState, Footer(), Header(), WorkSection(), MainLayout(), MainLayoutContent() (+3 more)

## Knowledge Gaps
- **965 isolated node(s):** `ADR-0006`, `ADR-0016`, `ADR-0017`, `ADR-0018`, `ADR-0017` (+960 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1317 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **88 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `contractPolicies.service.js`, `useAuth`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **Why does `ADR-0002` connect `contracts.service.js` to `InvoiceDetailPage.jsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `httpCliente.js`, `WorkDetailPage.jsx`, `InvoiceFormPage.jsx`, `ContractFormPage.jsx`, `PoliciesTab.jsx`, `client/package.json`, `ForgotPassword.jsx`, `AuthForgotPassword.jsx`, `InputLabel.jsx`, `AuthenticationRoutes.jsx`, `Sidebar/index.jsx`, `UsersPage.jsx`, `ContractsPage.jsx`, `WorkChartsTab.jsx`, `SimpleBar.jsx`, `MenuList/index.jsx`, `DocumentManagement.jsx`, `useConfig`, `InvoiceDetailPage.jsx`, `DebouncedInput.jsx`, `NotificationSection/index.jsx`, `NotificationList.jsx`, `ProviderTypePage.jsx`, `MainLayout/index.jsx`, `useAuth`, `react`, `useGetMenuMaster`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **What connects `ADR-0006`, `ADR-0016`, `ADR-0017` to the rest of the system?**
  _965 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06768905341089371 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `master.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09041835357624832 - nodes in this community are weakly interconnected._
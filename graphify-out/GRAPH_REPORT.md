# Graph Report - WEBPAC-INTERVE  (2026-10-19)

## Corpus Check
- 590 files · ~5,095,938 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: (none) 6, .csv 5, .template 1)

## Summary
- 3334 nodes · 9145 edges · 200 communities (116 shown, 84 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 120 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `df709c6c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- users.service.js
- fDateOnly
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- ContractFormPage.jsx
- fMoneyText
- seed.demo.js
- auth.routes.js
- dateOnlyText
- client/package.json
- menu-items/index.js
- validation.utils.js
- providers.routes.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- contracts.service.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contractSuspensions.service.test.js
- invoices.controller.test.js
- ContactsEditor.jsx
- contracts.controller.test.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- session.service.js
- users.service.test.js
- server.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- EasyCrop.jsx
- scripts
- simpleInvoiceTerms.js
- `tbl_invoices`
- App.jsx
- dashboard.service.js
- ProviderDetailPage.jsx
- policyTypes.service.js
- `tbl_contract_type_fields`
- formatTime.js
- transaction.mock.js
- scripts
- WorkSummaryTab.jsx
- workScopeOf
- compilerOptions
- excelJS.js
- withLockedTransaction
- permission
- devDependencies
- transaction.service.test.js
- notifications.service.js
- contractPolicies.service.js
- react
- `tbl_contract_status_history`
- app.routes.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- @mui/material
- document.routes.js
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- useGetMenuMaster
- contractConcepts.service.test.js
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
- useAuth
- `tbl_identity_documents`
- writeAudit
- status.constants.js
- uniqueConstraints.constants.test.js
- works.service.test.js
- contractPolicies.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- InputLabel.jsx
- `tbl_user_permissions`
- invoiceEvidence.service.js
- moneyText
- contractNotifications.service.test.js
- invoiceViews.js
- constants.js
- `tbl_contract_concepts`
- `tbl_reasons`
- serviceWorker.jsx
- withAlpha
- `tbl_users`
- balanceReconciliation.service.test.js
- contractEndDateReconciliation.service.test.js
- extends
- useConfig
- auth.service.test.js
- winston.config.js
- invariants.check.js
- authjwt.middleware.test.js
- browserslist
- volta
- DebouncedInput.jsx
- NotificationSection/index.jsx
- contracts.service.test.js
- ProviderTypePage.jsx
- themes/index.jsx
- MainLayout/index.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 130 edges
2. `react` - 98 edges
3. `useAuth()` - 79 edges
4. `showError()` - 74 edges
5. `writeAudit()` - 57 edges
6. `withLockedTransaction()` - 56 edges
7. `dateOnlyText()` - 54 edges
8. `showSuccess()` - 53 edges
9. `@tabler/icons-react` - 52 edges
10. `workScopeOf()` - 51 edges

## Surprising Connections (you probably didn't know these)
- `getUserPermissions()` --calls--> `getEffectivePermissionIds()`  [EXTRACTED]
  server/src/modules/app/general/app.service.js → server/src/common/services/effectivePermissions.service.js
- `getInvoiceFormOptions()` --calls--> `getContractFormOptions()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.service.js → server/src/modules/work/contracts/contracts.service.js
- `WorkView()` --indirect_call--> `previewWorkEndDateAPI()`  [INFERRED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/api/requests/worksApi.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js

## Import Cycles
- None detected.

## Communities (200 total, 84 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "users.service.js"
Cohesion: 0.07
Nodes (47): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent(), containsFilter() (+39 more)

### Community 3 - "fDateOnly"
Cohesion: 0.10
Nodes (35): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, getMyWorksSelectAPI(), pickWork(), useWorkScope(), WorkScopeContext, WorkScopeProvider() (+27 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (62): ADR-0009, identificationError(), assertIdentification(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable() (+54 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.11
Nodes (32): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, previewSimpleInvoiceAPI(), FormSection() (+24 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.15
Nodes (16): invoicesRoutes, ADR-0017, approveInvoiceSchema, cancelInvoiceSchema, getContractAdvanceSchema, getInvoiceFormOptionsSchema, getInvoiceSchema, isContractCreate() (+8 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (44): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+36 more)

### Community 10 - "fMoneyText"
Cohesion: 0.12
Nodes (28): getInsurersSelectAPI, getPolicyTypesSelectAPI, MoneyField(), fTerm(), fMoneyText(), fPercentText(), moneyInputText(), parseMoneyInput() (+20 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.05
Nodes (49): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+41 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "dateOnlyText"
Cohesion: 0.10
Nodes (39): ADR-0015, dateOnlyText(), toDateOnly(), daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation(), derivedEndDate() (+31 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (33): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+25 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.08
Nodes (30): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0009 (+22 more)

### Community 17 - "providers.routes.js"
Cohesion: 0.09
Nodes (27): ASSIGNMENT_FIELDS, assignProviderController, checkIdentificationController, getProviderController, INPUT_FIELDS, notifyAssignment(), paginationProvidersController, paginationWorkProvidersController (+19 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.07
Nodes (35): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), client_src_assets_images_interve, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage (+27 more)

### Community 21 - "contracts.service.js"
Cohesion: 0.08
Nodes (46): inScope(), FIELD_GROUPS, typeAppliesAiu(), isContractView(), assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber() (+38 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.08
Nodes (51): sumMoney(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), TERM_UNITS, termProgress(), todayDateOnly() (+43 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.11
Nodes (15): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, allowedHosts (+7 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (53): ADR-0004, ADR-0007, assertInScope(), PROGRESS_WARNING, defineContacts(), FIELDS, httpError(), ADR-0009 (+45 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (26): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+18 more)

### Community 27 - "invoices.controller.test.js"
Cohesion: 0.25
Nodes (6): emit, getEffectivePermissionIds, invoicesServiceMock, ADR-0020, SCOPE, workScopeOf

### Community 28 - "ContactsEditor.jsx"
Cohesion: 0.16
Nodes (16): addressTypesApi, getAddressTypesSelectAPI, AddressTypePage, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS (+8 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.05
Nodes (32): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+24 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.07
Nodes (70): ADR-0021, ADR-0023, ADR-0025, adjustableAmount(), approvalSnapshot(), approveInvoice(), assertContractAdmitsCancel(), assertContractStillAdmits() (+62 more)

### Community 31 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.09
Nodes (33): moneyRule(), optionalDate(), percentRule(), simpleAmountRules(), contractsRoutes, ADR-0006, ADR-0016, ADR-0017 (+25 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "session.service.js"
Cohesion: 0.09
Nodes (34): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), setIO(), ACCESS_COOKIE_NAME, baseCookieOptions (+26 more)

### Community 38 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 39 - "server.js"
Cohesion: 0.11
Nodes (17): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+9 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (16): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+8 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.10
Nodes (24): ADR-0011, ADR-0012, ADR-0018, ADR-0019, ADR-0017, ADR-0020, ADR-0024, ADR-0025 (+16 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "simpleInvoiceTerms.js"
Cohesion: 0.16
Nodes (12): blank(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023, ADR-0026, SIMPLE_FIELDS, SIMPLE_FORMULA_VERSION (+4 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "App.jsx"
Cohesion: 0.15
Nodes (11): loginAPI(), logoutAPI(), getPermissionsCatalogAPI(), App(), AuthContext, AuthProvider(), getStoredUser(), NavigationScroll() (+3 more)

### Community 51 - "dashboard.service.js"
Cohesion: 0.15
Nodes (24): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+16 more)

### Community 52 - "ProviderDetailPage.jsx"
Cohesion: 0.08
Nodes (44): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, getProviderTypesSelectAPI (+36 more)

### Community 53 - "policyTypes.service.js"
Cohesion: 0.17
Nodes (13): ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, configurePolicyTypeBaseController, ADR-0019, policyTypesRoutes, configurePolicyTypeBase() (+5 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "formatTime.js"
Cohesion: 0.13
Nodes (13): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+5 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (30): baseConfig, config, prismaMock, service, dbUser, mockDisconnectSockets, mockIn, prismaMock (+22 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkSummaryTab.jsx"
Cohesion: 0.08
Nodes (56): CardSecondaryAction(), headerStyle, MainCard(), Avatar(), ADR-0002, PolicyStatusCard(), Advances(), CardTitle() (+48 more)

### Community 59 - "workScopeOf"
Cohesion: 0.09
Nodes (52): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes, ADR-0002 (+44 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "withLockedTransaction"
Cohesion: 0.07
Nodes (42): adapter, prisma, AUDIT_ENTITIES, AUDIT_OPERATIONS, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027 (+34 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "notifications.service.js"
Cohesion: 0.38
Nodes (8): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), getNotificationCount(), listNotifications(), markAllAsRead(), markAsRead()

### Community 70 - "contractPolicies.service.js"
Cohesion: 0.09
Nodes (67): diffFields(), newOperationId(), percentText(), toPercent(), insuredValue(), policyBaseValue(), withContractAiu(), activeSequence() (+59 more)

### Community 71 - "react"
Cohesion: 0.10
Nodes (28): gridSpacing, ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable(), EditableList(), FilterButton() (+20 more)

### Community 88 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.14
Nodes (8): `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies`, `tbl_users`, `tbl_reasons`, `tbl_status`

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.03
Nodes (89): constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, insurersApi, ADR-0019, reasonsApi (+81 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.13
Nodes (23): requirePermission(), hasEffectivePermission(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), managedWhere(), resolveWorkScope() (+15 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "@mui/material"
Cohesion: 0.05
Nodes (69): contractPoliciesApi, suspendContractAPI(), invoiceTransitionsApi, deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI() (+61 more)

### Community 108 - "document.routes.js"
Cohesion: 0.23
Nodes (9): IDEMPOTENCY_HEADER, deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema, DOC_TYPES, paginationDocsSchema (+1 more)

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.06
Nodes (44): express, getIO(), verifyToken(), validate(), createMasterControllers(), createMasterRouter(), addressTypesRoutes, addressTypesConfig (+36 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.17
Nodes (10): `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts`, `tbl_contracts`, `tbl_insurers` (+2 more)

### Community 116 - "useGetMenuMaster"
Cohesion: 0.25
Nodes (11): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), MenuList() (+3 more)

### Community 117 - "contractConcepts.service.test.js"
Cohesion: 0.17
Nodes (6): ctx, ADR-0016, ADR-0027, notifyWorkManagers, prismaMock, state

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
Cohesion: 0.21
Nodes (14): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations() (+6 more)

### Community 129 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 130 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "useAuth"
Cohesion: 0.08
Nodes (59): getStatusesByScopeAPI(), contractsApi, useAuth(), useInvoiceViews(), useSocket(), SubCard(), ContactsList(), ADR-0009 (+51 more)

### Community 133 - "`tbl_identity_documents`"
Cohesion: 0.50
Nodes (3): `tbl_users`, `tbl_identity_documents`, `tbl_users`

### Community 134 - "writeAudit"
Cohesion: 0.08
Nodes (40): ADR-0001, bcrypt, ref_crypto, auditMisuse(), buildRows(), ADR-0027, protect(), REDACTED (+32 more)

### Community 136 - "status.constants.js"
Cohesion: 0.07
Nodes (36): ADR-0003, PERMISSIONS, ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, capitalize(), createMasterService(), defineMaster() (+28 more)

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 153 - "invoiceEvidence.service.js"
Cohesion: 0.08
Nodes (26): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+18 more)

### Community 155 - "moneyText"
Cohesion: 0.08
Nodes (58): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, moneyText(), PERCENT_SCALE, percentOf() (+50 more)

### Community 156 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 157 - "invoiceViews.js"
Cohesion: 0.27
Nodes (12): ANY_CONTRACT_VIEW_PERMISSION, ANY_VIEW_PERMISSION, assertViewGranted(), CONTRACT_VIEWS, grantedViews(), httpError(), INVOICE_VIEWS, NONE (+4 more)

### Community 159 - "constants.js"
Cohesion: 0.05
Nodes (50): configurePolicyTypeBaseAPI(), policyTypesApi, refreshSession(), useWorkFilterField(), ADR-0002, useLinkedFilters(), ContractsPage, PolicyTypePage (+42 more)

### Community 173 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 175 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.31
Nodes (7): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 181 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 183 - "useConfig"
Cohesion: 0.18
Nodes (12): config, ConfigContext, ConfigProvider(), useConfig(), useLocalStorage(), ProfileSection(), ElevationScroll(), HorizontalBar() (+4 more)

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

### Community 197 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 198 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 201 - "ProviderTypePage.jsx"
Cohesion: 0.14
Nodes (17): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+9 more)

### Community 203 - "themes/index.jsx"
Cohesion: 0.22
Nodes (9): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor (+1 more)

### Community 206 - "MainLayout/index.jsx"
Cohesion: 0.17
Nodes (17): handlerDrawerOpen(), Footer(), Header(), WorkSection(), MainLayout(), MainLayoutContent(), ScopedOutlet(), LogoSection() (+9 more)

## Knowledge Gaps
- **959 isolated node(s):** `ADR-0006`, `ADR-0016`, `ADR-0017`, `ADR-0018`, `STATUS_TABS` (+954 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1308 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **84 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `contractPolicies.service.js`, `constants.js`?**
  _High betweenness centrality (0.225) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `fDateOnly`, `useAuth`, `InvoiceFormPage.jsx`, `ContractFormPage.jsx`, `fMoneyText`, `client/package.json`, `AuthForgotPassword.jsx`, `InputLabel.jsx`, `ContactsEditor.jsx`, `constants.js`, `EasyCrop.jsx`, `withAlpha`, `ProviderDetailPage.jsx`, `formatTime.js`, `useConfig`, `WorkSummaryTab.jsx`, `DebouncedInput.jsx`, `NotificationSection/index.jsx`, `react`, `ProviderTypePage.jsx`, `themes/index.jsx`, `MainLayout/index.jsx`, `MainRoutes.jsx`, `useGetMenuMaster`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `axios` connect `MainRoutes.jsx` to `server/package.json`, `client/package.json`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `ADR-0006`, `ADR-0016`, `ADR-0017` to the rest of the system?**
  _959 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `users.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0660377358490566 - nodes in this community are weakly interconnected._
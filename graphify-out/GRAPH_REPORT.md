# Graph Report - WEBPAC-INTERVE  (2026-10-15)

## Corpus Check
- 583 files · ~285,746 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3321 nodes · 9163 edges · 203 communities (121 shown, 82 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 121 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `11e4eb15`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- users.service.js
- providerTypeFields.service.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- ContractFormPage.jsx
- WorkDataForm.jsx
- contractPolicies.service.js
- auditContext
- contractTerms.js
- client/package.json
- @tabler/icons-react
- validation.utils.js
- providers.routes.js
- invoices.service.test.js
- compilerOptions
- AuthenticationRoutes.jsx
- contracts.service.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contractSuspensions.service.test.js
- invoices.controller.test.js
- MainLayout/index.jsx
- contracts.controller.test.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- contractSuspensions.service.js
- session.service.js
- users.service.test.js
- server.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- EasyCrop.jsx
- scripts
- moneyText
- `tbl_invoices`
- authContext.jsx
- dashboard.service.js
- ProviderDetailPage.jsx
- getIO
- `tbl_contract_type_fields`
- DocumentManagement.jsx
- transaction.mock.js
- scripts
- WorkSummaryTab.jsx
- workScopeOf
- compilerOptions
- excelJS.js
- writeAudit
- permission
- devDependencies
- floatingPoint.guard.test.js
- notifications.routes.js
- contractConcepts.service.js
- ContactsEditor.jsx
- `tbl_contract_status_history`
- app.routes.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_type_field_versions`
- @mui/material
- AuthForgotPassword.jsx
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- react-router-dom
- seed.volume.js
- session.service.test.js
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- transaction.service.test.js
- images.js
- balanceReconciliation.service.js
- `tbl_contract_suspensions`
- ErrorBoundary.jsx
- `tbl_providers`
- WorkDetailPage.jsx
- policyTerms.js
- auth.service.js
- prismaClient.js
- uniqueConstraints.constants.test.js
- runIdempotent
- works.service.test.js
- contractPolicies.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- InputLabel.jsx
- advanceTerms.js
- invoiceTerms.js
- volta
- decimal
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
- MenuList/index.jsx
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
- master.service.test.js
- permissions.controller.test.js
- Sidebar/index.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 131 edges
2. `react` - 99 edges
3. `useAuth()` - 79 edges
4. `showError()` - 74 edges
5. `writeAudit()` - 59 edges
6. `withLockedTransaction()` - 56 edges
7. `dateOnlyText()` - 54 edges
8. `showSuccess()` - 53 edges
9. `@tabler/icons-react` - 52 edges
10. `workScopeOf()` - 51 edges

## Surprising Connections (you probably didn't know these)
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `previewWorkEndDate()` --calls--> `addTerm()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/term.utils.js
- `useRemoteOptions()` --calls--> `showError()`  [EXTRACTED]
  client/src/views/billing/invoices/InvoiceFormPage.jsx → client/src/services/ToastService.js

## Import Cycles
- None detected.

## Communities (203 total, 82 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "users.service.js"
Cohesion: 0.08
Nodes (42): ADR-0004, capitalize(), createMasterService(), defineMaster(), httpError(), ADR-0027, countByStatus(), DEFAULT_ROWS (+34 more)

### Community 3 - "providerTypeFields.service.js"
Cohesion: 0.11
Nodes (30): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+22 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (33): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+25 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (59): withLockedTransaction(), assertInScope(), applyProviderViewChanges(), getContractFormOptions(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable() (+51 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.11
Nodes (33): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), ADR-0017, previewSimpleInvoiceAPI(), FormSection(), MoneyField() (+25 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.15
Nodes (17): invoicesRoutes, ADR-0017, approveInvoiceSchema, cancelInvoiceSchema, getContractAdvanceSchema, getInvoiceFormOptionsSchema, getInvoiceSchema, isContractCreate() (+9 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.07
Nodes (50): contractConceptsApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+42 more)

### Community 10 - "WorkDataForm.jsx"
Cohesion: 0.19
Nodes (11): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getInsurersSelectAPI, getPolicyTypesSelectAPI, ADR-0019, getSupervisionTypesSelectAPI, createMasterApi(), TERM_UNIT_OPTIONS (+3 more)

### Community 11 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (47): ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC, ADR-0002 (+39 more)

### Community 12 - "auditContext"
Cohesion: 0.11
Nodes (27): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+19 more)

### Community 13 - "contractTerms.js"
Cohesion: 0.11
Nodes (23): ADR-0015, daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation(), derivedEndDate(), previewContractEndDate(), CONCEPT_TYPE_NAMES (+15 more)

### Community 14 - "client/package.json"
Cohesion: 0.06
Nodes (36): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+28 more)

### Community 15 - "@tabler/icons-react"
Cohesion: 0.06
Nodes (38): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+30 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.12
Nodes (20): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0009 (+12 more)

### Community 17 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthenticationRoutes.jsx"
Cohesion: 0.14
Nodes (16): client_src_assets_images_interve, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, router, MainRoutes, AppBar() (+8 more)

### Community 21 - "contracts.service.js"
Cohesion: 0.09
Nodes (48): containsFilter(), dateRangeFilter(), filtersWhere(), idFilter(), assertContractAdmitsCancel(), assertContractStillAdmits(), countByState(), paginationInvoices() (+40 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.12
Nodes (40): sumMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), TERM_UNITS, termProgress() (+32 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (49): ADR-0007, PROGRESS_WARNING, defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), applyManagers() (+41 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (21): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), row(), ctx, prismaMock, state (+13 more)

### Community 27 - "invoices.controller.test.js"
Cohesion: 0.25
Nodes (6): emit, getEffectivePermissionIds, invoicesServiceMock, ADR-0020, SCOPE, workScopeOf

### Community 28 - "MainLayout/index.jsx"
Cohesion: 0.20
Nodes (10): Footer(), MainLayout(), MainLayoutContent(), ScopedOutlet(), MainContentStyled, menuItems, Breadcrumbs(), BTitle() (+2 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.05
Nodes (32): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+24 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.08
Nodes (61): ADR-0013, ADR-0021, ADR-0025, amountsDto(), approveInvoice(), assertInvoiceVisible(), assertProviderAssigned(), assertStage() (+53 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.09
Nodes (33): moneyRule(), optionalDate(), percentRule(), simpleAmountRules(), contractsRoutes, ADR-0006, ADR-0016, ADR-0017 (+25 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "contractSuspensions.service.js"
Cohesion: 0.28
Nodes (14): auditable(), findOpenSuspension(), ADR-0017, ADR-0027, liftWithAmendment(), optionalText(), pastDate(), SUSPEND_TARGET (+6 more)

### Community 37 - "session.service.js"
Cohesion: 0.08
Nodes (35): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+27 more)

### Community 38 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 39 - "server.js"
Cohesion: 0.14
Nodes (14): ref_http, node-cron, app, server, verifyStatusCatalog(), cronJobs, ADR-0017, registeredTasks (+6 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.05
Nodes (20): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+12 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.06
Nodes (40): ADR-0003, ADR-0011, ADR-0012, ADR-0016, ADR-0018, ADR-0019, ADR-0026, ADR-0017 (+32 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "moneyText"
Cohesion: 0.12
Nodes (28): moneyText(), toMoney(), adjustableAmount(), approvalSnapshot(), detailText(), isSimpleType(), liquidationConceptOf(), positiveMoney() (+20 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "authContext.jsx"
Cohesion: 0.08
Nodes (33): loginAPI(), logoutAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), getMyWorksSelectAPI(), genericRequest, instance, NO_REFRESH_URLS (+25 more)

### Community 51 - "dashboard.service.js"
Cohesion: 0.13
Nodes (25): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+17 more)

### Community 52 - "ProviderDetailPage.jsx"
Cohesion: 0.12
Nodes (24): getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, STATUS, contactsToForm(), contactsToPayload() (+16 more)

### Community 53 - "getIO"
Cohesion: 0.13
Nodes (16): getIO(), configurePolicyTypeBaseController, FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, deleteProfileController(), getModulesController() (+8 more)

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
Cohesion: 0.05
Nodes (82): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, useWorkScope(), DashboardDefault, appDrawerWidth, gridSpacing, CardSecondaryAction() (+74 more)

### Community 59 - "workScopeOf"
Cohesion: 0.09
Nodes (44): getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, accessOf(), approveInvoiceController, cancelInvoiceController (+36 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "writeAudit"
Cohesion: 0.08
Nodes (35): ADR-0001, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0027, newOperationId(), protect() (+27 more)

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

### Community 70 - "contractConcepts.service.js"
Cohesion: 0.16
Nodes (31): activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget(), configuredConcept(), createAmendment() (+23 more)

### Community 71 - "ContactsEditor.jsx"
Cohesion: 0.17
Nodes (19): getAddressTypesSelectAPI, ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), channelsOf(), ContactDialog(), ContactsEditor() (+11 more)

### Community 88 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (91): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, reasonsApi, supervisionTypesApi, worksApi (+83 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.09
Nodes (30): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+22 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "@mui/material"
Cohesion: 0.05
Nodes (81): contractPoliciesApi, suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI(), getModulesAPI(), getProfilesAPI(), saveProfileAPI() (+73 more)

### Community 108 - "AuthForgotPassword.jsx"
Cohesion: 0.24
Nodes (13): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber(), hasSpecial() (+5 more)

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (35): express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), isSessionActive(), createMasterControllers(), createMasterRouter() (+27 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "react-router-dom"
Cohesion: 0.44
Nodes (8): useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), NavCollapse(), NavGroup(), NavItem(), @mui/icons-material, react-router-dom

### Community 117 - "seed.volume.js"
Cohesion: 0.10
Nodes (23): ref_node_crypto, nit(), addDays(), ALL_FIELDS, concept(), dbName, END_DATES, firstActive() (+15 more)

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
Cohesion: 0.24
Nodes (12): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS, findBalanceViolations() (+4 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.22
Nodes (7): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`, `tbl_invoice_liquidation_details`

### Community 130 - "ErrorBoundary.jsx"
Cohesion: 0.83
Nodes (3): ErrorBoundary(), ErrorMessage(), isStaleDeployError()

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "WorkDetailPage.jsx"
Cohesion: 0.06
Nodes (73): getStatusesByScopeAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), useInvoiceViews(), showInfo(), showObligatorios(), useSocket(), SubCard() (+65 more)

### Community 133 - "policyTerms.js"
Cohesion: 0.11
Nodes (28): percentText(), conceptLabel(), contractPolicies(), conceptLabel(), contractPolicyStatuses(), getContractPolicies(), versionDto(), conceptDto() (+20 more)

### Community 134 - "auth.service.js"
Cohesion: 0.08
Nodes (36): bcrypt, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+28 more)

### Community 136 - "prismaClient.js"
Cohesion: 0.08
Nodes (27): ADR-0027, adapter, describeTarget(), prisma, testConnection(), ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS (+19 more)

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 139 - "runIdempotent"
Cohesion: 0.16
Nodes (16): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent(), deleteModuleDoc() (+8 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 152 - "advanceTerms.js"
Cohesion: 0.20
Nodes (15): @prisma/client, ratioText(), advanceBalances(), appliedPct(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits(), balancesDto() (+7 more)

### Community 153 - "invoiceTerms.js"
Cohesion: 0.17
Nodes (14): cancelTransitionFor(), hasContract(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS, INVOICE_TYPES, ADR-0020, NOTE_COLUMNS (+6 more)

### Community 154 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 155 - "decimal"
Cohesion: 0.11
Nodes (32): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ratioPercent() (+24 more)

### Community 156 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 157 - "invoiceViews.js"
Cohesion: 0.17
Nodes (19): applyInvoiceViewChange(), createContractInvoice(), ANY_CONTRACT_VIEW_PERMISSION, ANY_VIEW_PERMISSION, assertNotMixed(), assertViewGranted(), CONTRACT_VIEWS, httpError() (+11 more)

### Community 159 - "constants.js"
Cohesion: 0.06
Nodes (36): invoicesApi, policyTypesApi, InvoicesPage, PolicyTypePage, TooltipLongText(), CONTRACT_INVOICE_TYPES, INVOICE_STATE_COLORS, INVOICE_STATE_TABS (+28 more)

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

### Community 183 - "MenuList/index.jsx"
Cohesion: 0.21
Nodes (10): getMenuAPI(), useConfig(), ElevationScroll(), HorizontalBar(), getIconByName(), MenuList(), ImageList(), srcset() (+2 more)

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
Cohesion: 0.29
Nodes (11): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), ProfileSection(), HeaderAvatar(), MobileSearch() (+3 more)

### Community 198 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 201 - "ProviderTypePage.jsx"
Cohesion: 0.13
Nodes (19): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), useInvoiceViewChange(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, providerInvoiceViewName(), DATA_TYPE_NAMES (+11 more)

### Community 203 - "themes/index.jsx"
Cohesion: 0.21
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 204 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 205 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 206 - "Sidebar/index.jsx"
Cohesion: 0.24
Nodes (11): endpoints, handlerDrawerOpen(), initialState, Header(), WorkSection(), LogoSection(), Sidebar(), closedMixin() (+3 more)

## Knowledge Gaps
- **945 isolated node(s):** `EMPTY_FORM`, `DOCUMENT_FIELDS`, `ADR-0020`, `axios`, `@azure/identity` (+940 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1289 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **82 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `contractPolicies.service.js`, `constants.js`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `ADR-0027` connect `prismaClient.js` to `@mui/material`, `runIdempotent`, `invoices.service.js`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `ErrorBoundary.jsx`, `WorkDetailPage.jsx`, `InvoiceFormPage.jsx`, `ContractFormPage.jsx`, `WorkDataForm.jsx`, `client/package.json`, `@tabler/icons-react`, `AuthenticationRoutes.jsx`, `InputLabel.jsx`, `MainLayout/index.jsx`, `constants.js`, `EasyCrop.jsx`, `withAlpha`, `authContext.jsx`, `ProviderDetailPage.jsx`, `DocumentManagement.jsx`, `MenuList/index.jsx`, `WorkSummaryTab.jsx`, `DebouncedInput.jsx`, `NotificationSection/index.jsx`, `ContactsEditor.jsx`, `ProviderTypePage.jsx`, `themes/index.jsx`, `Sidebar/index.jsx`, `useAuth`, `AuthForgotPassword.jsx`, `react-router-dom`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **What connects `EMPTY_FORM`, `DOCUMENT_FIELDS`, `ADR-0020` to the rest of the system?**
  _945 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `users.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07673469387755102 - nodes in this community are weakly interconnected._
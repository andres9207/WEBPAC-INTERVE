# Graph Report - WEBPAC-INTERVE  (2026-10-22)

## Corpus Check
- 622 files · ~317,094 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3621 nodes · 10017 edges · 216 communities (123 shown, 93 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 135 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2491d680`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- users.service.js
- httpCliente.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- providers.routes.js
- ConceptDialog.jsx
- seed.volume.js
- auth.routes.js
- contractPolicies.service.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- contracts.service.js
- invoices.service.test.js
- compilerOptions
- NotificationSection/index.jsx
- invoices.service.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contractSuspensions.service.test.js
- constants.js
- withLockedTransaction
- invoices.controller.test.js
- contractConcepts.service.js
- mailerService.js
- workScopeOf
- expirationNotice.service.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- dashboard.service.js
- contractReports.service.js
- cron/index.js
- httpError
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorkChartsTab.jsx
- scripts
- simpleInvoiceTerms.js
- `tbl_invoices`
- withAlpha
- master.service.test.js
- EasyCrop.jsx
- ref_jest_globals
- `tbl_contract_type_fields`
- profiles.service.js
- transaction.mock.js
- scripts
- ProviderDetailPage.jsx
- session.service.test.js
- compilerOptions
- excelJS.js
- AuthForgotPassword.jsx
- permission
- devDependencies
- uniqueConstraints.constants.test.js
- notifications.service.js
- contractTerms.js
- @mui/material
- `tbl_contract_status_history`
- socket.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- showError
- session.service.js
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- formatTime.js
- export.service.js
- DocumentManagement.jsx
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- transaction.service.test.js
- WorkSummaryTab.jsx
- balanceReconciliation.service.js
- runIdempotent
- serviceWorker.jsx
- `tbl_providers`
- invoiceTerms.js
- fDateOnly
- writeAudit
- useWorkScope
- contracts.service.test.js
- works.service.test.js
- auth.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- `tbl_user_permissions`
- AuthenticationRoutes.jsx
- constant.js
- decimal
- contractNotifications.service.test.js
- contractFields.js
- MainCard.jsx
- `tbl_contract_concepts`
- `tbl_reasons`
- themes/index.jsx
- browserslist
- volta
- `tbl_users`
- balanceReconciliation.service.test.js
- MainCard
- billingTerms.js
- ImageList.jsx
- App.jsx
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- invoiceEvidence.service.js
- WorkDetailPage.jsx
- contracts.controller.test.js
- DashboardCards.jsx
- ProviderTypePage.jsx
- contractEndDateReconciliation.service.test.js
- app.routes.js
- workScope.service.test.js
- react-router-dom
- invoiceEvidence.service.test.js
- `tbl_invoices`
- `tbl_invoices`
- getEffectivePermissionIds

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 140 edges
2. `react` - 107 edges
3. `showError()` - 84 edges
4. `useAuth()` - 79 edges
5. `workScopeOf()` - 62 edges
6. `writeAudit()` - 60 edges
7. `dateOnlyText()` - 59 edges
8. `withLockedTransaction()` - 59 edges
9. `@tabler/icons-react` - 57 edges
10. `showSuccess()` - 55 edges

## Surprising Connections (you probably didn't know these)
- `ContractsPage()` --indirect_call--> `exportContractsAPI()`  [INFERRED]
  client/src/views/work/contracts/ContractsPage.jsx → client/src/api/requests/contractsApi.js
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `App()` --calls--> `AuthProvider()`  [EXTRACTED]
  client/src/App.jsx → client/src/contexts/authContext.jsx

## Import Cycles
- None detected.

## Communities (216 total, 93 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "users.service.js"
Cohesion: 0.06
Nodes (45): prisma, ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, AUDIT_ENTITIES, AUDIT_OPERATIONS, capitalize(), createMasterService() (+37 more)

### Community 3 - "httpCliente.js"
Cohesion: 0.13
Nodes (19): getMyWorksSelectAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient, RETRY_503_HINT, pickWork(), WorkScopeContext (+11 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.04
Nodes (43): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+35 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (60): userFullName(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes() (+52 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.11
Nodes (33): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), previewSimpleInvoiceAPI(), MoneyField(), isBillingInvoiceType() (+25 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.06
Nodes (59): sendExport(), exportFormatRule(), accessOf(), approveInvoiceController, cancelInvoiceController, deleteInvoiceController, exportInvoicesController, getContractAdvanceController (+51 more)

### Community 9 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.08
Nodes (46): contractConceptsApi, contractPoliciesApi, exportContractsAPI(), getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006 (+38 more)

### Community 11 - "seed.volume.js"
Cohesion: 0.10
Nodes (31): ref_node_crypto, nit(), addDays(), ALL_FIELDS, concept(), dbName, END_DATES, firstActive() (+23 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "contractPolicies.service.js"
Cohesion: 0.05
Nodes (43): ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC, ADR-0002 (+35 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (33): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+25 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.08
Nodes (17): admin, icons, billing, dashboard, icons, menuItems, icons, other (+9 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.08
Nodes (30): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+22 more)

### Community 17 - "contracts.service.js"
Cohesion: 0.08
Nodes (59): main(), dateRangeFilter(), typeAppliesAiu(), resolveContractTypeFields(), assertContractStillAdmits(), createContractInvoice(), assertMasters(), assertTypeFree() (+51 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.07
Nodes (43): ADR-0013, ADR-0023, isBillingType(), admittedContractsWhere(), admittedTypes(), approvalSnapshot(), CONTRACT_GATED_ACTIONS, countByState() (+35 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.10
Nodes (41): ADR-0011, addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress() (+33 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (52): ADR-0004, ADR-0007, assertInScope(), defineContacts(), FIELDS, httpError(), ADR-0009, optionalText() (+44 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (23): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+15 more)

### Community 27 - "constants.js"
Cohesion: 0.05
Nodes (52): contractsApi, exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), invoicesApi, ADR-0017, useWorkFilterField(), useInvoiceViews(), ContractsPage (+44 more)

### Community 28 - "withLockedTransaction"
Cohesion: 0.07
Nodes (35): adapter, describeTarget(), testConnection(), newOperationId(), backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027 (+27 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "contractConcepts.service.js"
Cohesion: 0.11
Nodes (45): dateOnlyText(), withContractAiu(), activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget() (+37 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "workScopeOf"
Cohesion: 0.07
Nodes (65): auditContext(), workScopeOf(), moneyRule(), optionalDate(), percentRule(), simpleAmountRules(), grantedViews(), ACT_FIELDS (+57 more)

### Community 33 - "expirationNotice.service.js"
Cohesion: 0.11
Nodes (24): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+16 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "dashboard.service.js"
Cohesion: 0.10
Nodes (37): scopeWhere(), policyExpiringDays(), contractsBlock(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002, notDeleted (+29 more)

### Community 38 - "contractReports.service.js"
Cohesion: 0.06
Nodes (59): findExportRows(), renderExport(), moneyText(), percentText(), sumMoney(), amountsDto(), approvedOf(), balancesOf() (+51 more)

### Community 39 - "cron/index.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+8 more)

### Community 40 - "httpError"
Cohesion: 0.18
Nodes (27): approveInvoice(), assertContractAdmitsCancel(), assertInvoiceVisible(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditable() (+19 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.07
Nodes (35): ADR-0016, ADR-0024, ADR-0025, ADR-0026, ADR-0011, ADR-0012, ADR-0017, ADR-0018 (+27 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.14
Nodes (38): fMoneyText(), fPercentText(), contractRows(), DrillDownDialog(), invoiceRows(), num, useDrillDown(), Advances() (+30 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "simpleInvoiceTerms.js"
Cohesion: 0.13
Nodes (20): toMoney(), adjustableAmount(), liquidationConceptOf(), positiveMoney(), previewSimpleInvoice(), resolveDetail(), blank(), FORMULAS (+12 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 51 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 53 - "ref_jest_globals"
Cohesion: 0.05
Nodes (20): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, ALL (+12 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "profiles.service.js"
Cohesion: 0.16
Nodes (20): containsFilter(), countByStatus(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS, paginate(), resolvePagination() (+12 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "ProviderDetailPage.jsx"
Cohesion: 0.08
Nodes (49): getAddressTypesSelectAPI, getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi (+41 more)

### Community 59 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "AuthForgotPassword.jsx"
Cohesion: 0.20
Nodes (15): forgotPasswordAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber() (+7 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "uniqueConstraints.constants.test.js"
Cohesion: 0.05
Nodes (37): ref_fs, ref_path, ref_url, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3 (+29 more)

### Community 68 - "notifications.service.js"
Cohesion: 0.25
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), getNotificationCount(), listNotifications(), markAllAsRead(), markAsRead() (+4 more)

### Community 70 - "contractTerms.js"
Cohesion: 0.11
Nodes (24): ADR-0015, daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation(), previewContractEndDate(), CONCEPT_TYPE_NAMES, CONCEPT_TYPES (+16 more)

### Community 71 - "@mui/material"
Cohesion: 0.08
Nodes (37): getWorksSummaryAPI(), gridSpacing, ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), DataTable(), download() (+29 more)

### Community 88 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (110): addressTypesApi, loginAPI(), logoutAPI(), verifyTokenAPI(), constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI (+102 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.09
Nodes (31): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+23 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "showError"
Cohesion: 0.05
Nodes (72): getBusinessRulesAPI(), saveBusinessRulesAPI(), invoiceTransitionsApi, configurePolicyTypeBaseAPI(), deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI() (+64 more)

### Community 108 - "session.service.js"
Cohesion: 0.09
Nodes (28): getIO(), IDEMPOTENCY_HEADER, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken() (+20 more)

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.06
Nodes (47): express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), addressTypesRoutes (+39 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "formatTime.js"
Cohesion: 0.10
Nodes (20): suspendContractAPI(), getInsurersSelectAPI, getPolicyTypesSelectAPI, DateField(), toDate(), SHORT_MONTHS, fallbackUuid(), newIdempotencyKey() (+12 more)

### Community 117 - "export.service.js"
Cohesion: 0.07
Nodes (46): exceljs, pdfkit, addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+38 more)

### Community 118 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): ALL, CONCEPTS, CONTRACT, INVOICES, OWN, prismaMock

### Community 123 - "transaction.service.test.js"
Cohesion: 0.26
Nodes (8): ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "WorkSummaryTab.jsx"
Cohesion: 0.15
Nodes (17): Metric(), barPercent(), CONTRACT_STATE_CHART_COLORS, DASHBOARD_PATH, dashboardTo, initialsOf(), INVOICE_TYPE_COLORS, MANAGER_ROLE_NAMES (+9 more)

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.24
Nodes (12): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS, findBalanceViolations() (+4 more)

### Community 129 - "runIdempotent"
Cohesion: 0.16
Nodes (16): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent(), deleteModuleDoc() (+8 more)

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "invoiceTerms.js"
Cohesion: 0.18
Nodes (16): insertInvoice(), writeDetail(), assertTransition(), cancelTransitionFor(), historyRow(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS (+8 more)

### Community 133 - "fDateOnly"
Cohesion: 0.35
Nodes (13): getDashboardSummaryAPI(), invoicePath(), fDateOnly(), AlertsCard(), Empty(), LatestInvoicesCard(), num, QuickAccessCard() (+5 more)

### Community 134 - "writeAudit"
Cohesion: 0.08
Nodes (43): ADR-0001, ADR-0027, bcrypt, ref_crypto, auditMisuse(), buildRows(), diffFields(), ADR-0027 (+35 more)

### Community 136 - "useWorkScope"
Cohesion: 0.23
Nodes (11): getWorkDashboardAPI(), ADR-0002, useWorkScope(), WorkSection(), Dashboard(), ADR-0002, TABS, WorkDashboard() (+3 more)

### Community 137 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 151 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 153 - "AuthenticationRoutes.jsx"
Cohesion: 0.11
Nodes (21): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 154 - "constant.js"
Cohesion: 0.18
Nodes (11): MainContentStyled, appDrawerWidth, drawerWidth, CardSecondaryAction(), Avatar(), ColorBox(), UIColor(), CustomShadowBox() (+3 more)

### Community 155 - "decimal"
Cohesion: 0.09
Nodes (45): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE (+37 more)

### Community 156 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 157 - "contractFields.js"
Cohesion: 0.26
Nodes (10): AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+2 more)

### Community 159 - "MainCard.jsx"
Cohesion: 0.33
Nodes (6): useSchemePalette(), headerStyle, InvoicesByWorkCard(), PolicyStatusCard(), ADR-0002, react-apexcharts

### Community 173 - "themes/index.jsx"
Cohesion: 0.15
Nodes (13): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage(), createCustomShadow() (+5 more)

### Community 174 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 175 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 176 - "`tbl_users`"
Cohesion: 0.31
Nodes (7): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "MainCard"
Cohesion: 0.42
Nodes (9): MainCard(), AttentionCard(), Empty(), InvoicesCard(), ProvidersCard(), StagesCard(), WorkHero(), WorkSummaryTab() (+1 more)

### Community 181 - "billingTerms.js"
Cohesion: 0.27
Nodes (8): assertBillingFits(), BILLING_TYPES, billingBalances(), billingDto(), httpError(), money(), ZERO, INVOICE_TYPES

### Community 183 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 186 - "App.jsx"
Cohesion: 0.27
Nodes (8): refreshSession(), App(), ThemedToastContainer(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 194 - "invoiceEvidence.service.js"
Cohesion: 0.21
Nodes (12): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+4 more)

### Community 197 - "WorkDetailPage.jsx"
Cohesion: 0.05
Nodes (70): getStatusesByScopeAPI(), exportContractAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, useEndDatePreview(), SubCard(), ContactsList() (+62 more)

### Community 198 - "contracts.controller.test.js"
Cohesion: 0.14
Nodes (12): conceptsServiceMock, contractsServiceMock, emit, exportContractReport, exportContractSummary, getEffectivePermissionIds, ADR-0015, ADR-0016 (+4 more)

### Community 199 - "DashboardCards.jsx"
Cohesion: 0.47
Nodes (4): ContractBalanceCards(), DashboardCards(), Indicator(), ADR-0002

### Community 201 - "ProviderTypePage.jsx"
Cohesion: 0.15
Nodes (16): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+8 more)

### Community 202 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 203 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 204 - "workScope.service.test.js"
Cohesion: 0.40
Nodes (4): hasEffectivePermission, prismaMock, state, user

### Community 206 - "react-router-dom"
Cohesion: 0.13
Nodes (28): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), setParentOpenedMenu(), useMenuCollapse() (+20 more)

### Community 209 - "invoiceEvidence.service.test.js"
Cohesion: 0.40
Nodes (3): prismaMock, state, user

### Community 219 - "getEffectivePermissionIds"
Cohesion: 0.13
Nodes (18): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+10 more)

## Knowledge Gaps
- **1018 isolated node(s):** `typeConfig`, `EMPTY_FORM`, `DOCUMENT_FIELDS`, `ADR-0020`, `num` (+1013 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1389 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **93 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0002` connect `MainCard.jsx` to `workDashboard.service.js`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `httpCliente.js`, `server/package.json`, `fDateOnly`, `InvoiceFormPage.jsx`, `useWorkScope`, `ConceptDialog.jsx`, `client/package.json`, `menu-items/index.js`, `NotificationSection/index.jsx`, `AuthenticationRoutes.jsx`, `constant.js`, `constants.js`, `MainCard.jsx`, `themes/index.jsx`, `WorkChartsTab.jsx`, `withAlpha`, `MainCard`, `EasyCrop.jsx`, `ImageList.jsx`, `ProviderDetailPage.jsx`, `App.jsx`, `AuthForgotPassword.jsx`, `WorkDetailPage.jsx`, `DashboardCards.jsx`, `ProviderTypePage.jsx`, `react-router-dom`, `useAuth`, `showError`, `formatTime.js`, `DocumentManagement.jsx`, `WorkSummaryTab.jsx`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `axios` connect `httpCliente.js` to `server/package.json`, `client/package.json`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **What connects `typeConfig`, `EMPTY_FORM`, `DOCUMENT_FIELDS` to the rest of the system?**
  _1018 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `users.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05989110707803993 - nodes in this community are weakly interconnected._
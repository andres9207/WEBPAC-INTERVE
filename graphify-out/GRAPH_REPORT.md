# Graph Report - WEBPAC-INTERVE  (2026-10-22)

## Corpus Check
- 614 files · ~313,153 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3590 nodes · 9910 edges · 213 communities (119 shown, 94 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 134 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `517c0041`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- master.service.js
- GeneralDashboard.jsx
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- ContractFormPage.jsx
- contractPolicies.service.js
- seed.demo.js
- auth.routes.js
- dateOnlyText
- client/package.json
- menu-items/index.js
- providers.routes.js
- workScopeOf
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- invoices.service.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- constants.js
- withLockedTransaction
- contracts.controller.test.js
- contractConcepts.service.js
- mailerService.js
- contracts.routes.js
- businessRules.service.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- retentionTerms.js
- contractReports.service.js
- cron/index.js
- addressTypes.service.js
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorkChartsTab.jsx
- scripts
- moneyText
- `tbl_invoices`
- withAlpha
- status.constants.js
- httpError
- contractPolicies.service.test.js
- `tbl_contract_type_fields`
- providerTypeFields.service.js
- transaction.mock.js
- scripts
- WorkDetailPage.jsx
- session.service.test.js
- compilerOptions
- excelJS.js
- invoiceTerms.js
- permission
- devDependencies
- transaction.service.test.js
- notifications.routes.js
- contracts.service.js
- @mui/material
- `tbl_contract_status_history`
- authjwt.middleware.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- showError
- getIO
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- contractSuspensions.service.test.js
- export.service.js
- DocumentManagement.jsx
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- error.middleware.test.js
- uniqueConstraints.constants.test.js
- balanceReconciliation.service.js
- eslint.config.mjs
- serviceWorker.jsx
- `tbl_providers`
- images.js
- winston.config.js
- writeAudit
- users.service.js
- billingTerms.js
- works.service.test.js
- auth.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- `tbl_user_permissions`
- AuthenticationRoutes.jsx
- MainLayout/index.jsx
- decimal
- contractNotifications.service.test.js
- contractFields.js
- WorksPage.jsx
- `tbl_contract_concepts`
- `tbl_reasons`
- themes/index.jsx
- browserslist
- volta
- `tbl_users`
- balanceReconciliation.service.test.js
- decisionReferences.guard.test.js
- dashboard.service.test.js
- useConfig
- idempotency.service.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- floatingPoint.guard.test.js
- policyTypes.service.test.js
- NotificationSection/index.jsx
- expirationNotice.service.test.js
- DebouncedInput.jsx
- ProviderTypePage.jsx
- ref_jest_globals
- EasyCrop.jsx
- InputLabel.jsx
- useGetMenuMaster
- `tbl_invoices`
- `tbl_invoices`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 135 edges
2. `react` - 105 edges
3. `showError()` - 82 edges
4. `useAuth()` - 79 edges
5. `workScopeOf()` - 62 edges
6. `writeAudit()` - 60 edges
7. `withLockedTransaction()` - 59 edges
8. `dateOnlyText()` - 59 edges
9. `showSuccess()` - 57 edges
10. `@tabler/icons-react` - 55 edges

## Surprising Connections (you probably didn't know these)
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `createMasterRouter()` --indirect_call--> `verifyToken()`  [INFERRED]
  server/src/common/utils/masterRouter.utils.js → server/src/common/middlewares/authjwt.middleware.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `getUserPermissions()` --calls--> `getEffectivePermissionIds()`  [EXTRACTED]
  server/src/modules/app/general/app.service.js → server/src/common/services/effectivePermissions.service.js
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js

## Import Cycles
- None detected.

## Communities (213 total, 94 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "master.service.js"
Cohesion: 0.08
Nodes (36): ADR-0003, PERMISSIONS, DELETED_STATUS, AUDIT_ENTITIES, capitalize(), createMasterService(), defineMaster(), httpError() (+28 more)

### Community 3 - "GeneralDashboard.jsx"
Cohesion: 0.06
Nodes (51): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, providersApi, getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient (+43 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (64): containsFilter(), filtersWhere(), idFilter(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope() (+56 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.09
Nodes (39): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, previewSimpleInvoiceAPI() (+31 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.06
Nodes (62): sendExport(), getInvoiceEvidence(), httpError(), isApproval(), snapshotOf(), accessOf(), approveInvoiceController, cancelInvoiceController (+54 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.09
Nodes (42): contractConceptsApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+34 more)

### Community 10 - "contractPolicies.service.js"
Cohesion: 0.13
Nodes (32): idempotencyMisuse(), runIdempotent(), saveModuleDoc(), assertMasters(), assertTypeFree(), auditable(), cancelPolicy(), createPolicy() (+24 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.06
Nodes (45): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+37 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "dateOnlyText"
Cohesion: 0.09
Nodes (43): ADR-0015, dateOnlyText(), toDateOnly(), daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation(), derivedEndDate() (+35 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (22): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+14 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.08
Nodes (17): admin, icons, billing, dashboard, icons, menuItems, icons, other (+9 more)

### Community 16 - "providers.routes.js"
Cohesion: 0.07
Nodes (34): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+26 more)

### Community 17 - "workScopeOf"
Cohesion: 0.09
Nodes (48): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes, ADR-0002 (+40 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.12
Nodes (22): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), App() (+14 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.06
Nodes (54): ADR-0013, ADR-0023, dateRangeFilter(), admittedContractsWhere(), admittedTypes(), amountsDto(), assertInvoiceVisible(), CONTRACT_GATED_ACTIONS (+46 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.05
Nodes (77): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+69 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.09
Nodes (47): ADR-0004, ADR-0007, diffFields(), toText(), applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections() (+39 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.06
Nodes (25): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+17 more)

### Community 27 - "constants.js"
Cohesion: 0.04
Nodes (57): contractsApi, exportContractsAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), refreshSession(), AuthContext, ContractsPage, InvoicesPage (+49 more)

### Community 28 - "withLockedTransaction"
Cohesion: 0.07
Nodes (33): newOperationId(), backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+25 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.04
Nodes (40): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+32 more)

### Community 30 - "contractConcepts.service.js"
Cohesion: 0.18
Nodes (28): withContractAiu(), activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget(), configuredConcept() (+20 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.08
Nodes (37): exportFormatRule(), moneyRule(), optionalDate(), percentRule(), simpleAmountRules(), contractsRoutes, ADR-0006, ADR-0016 (+29 more)

### Community 33 - "businessRules.service.js"
Cohesion: 0.09
Nodes (26): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+18 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "retentionTerms.js"
Cohesion: 0.14
Nodes (22): @prisma/client, ratioText(), isBillingType(), balanceChange(), hasDetail(), revalidateOnApprove(), revalidateOnCancel(), SNAPSHOT_AMOUNTS (+14 more)

### Community 38 - "contractReports.service.js"
Cohesion: 0.07
Nodes (43): percentText(), sumMoney(), conceptLabel(), getContractPolicies(), versionDto(), ADVANCE_COLUMNS, advanceTotals(), authored() (+35 more)

### Community 39 - "cron/index.js"
Cohesion: 0.13
Nodes (15): ref_http, node-cron, app, server, verifyStatusCatalog(), cronJobs, ADR-0017, registeredTasks (+7 more)

### Community 40 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.09
Nodes (26): ADR-0016, ADR-0024, ADR-0025, ADR-0026, ADR-0011, ADR-0012, ADR-0017, ADR-0018 (+18 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.08
Nodes (66): MainCard(), fMoneyText(), fPercentText(), ContractBalanceCards(), DashboardCards(), Indicator(), contractRows(), DrillDownDialog() (+58 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "moneyText"
Cohesion: 0.14
Nodes (23): moneyText(), approvalSnapshot(), detailText(), isSimpleType(), previewSimpleInvoice(), requestedDetailChanges(), simpleSnapshot(), snapshotText() (+15 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 51 - "status.constants.js"
Cohesion: 0.09
Nodes (33): adapter, describeTarget(), prisma, testConnection(), ACTIVE_STATUS, INACTIVE_STATUS, STATUS_IDS, ALL (+25 more)

### Community 52 - "httpError"
Cohesion: 0.24
Nodes (16): adjustableAmount(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditable(), createContractInvoice(), createSimpleInvoice() (+8 more)

### Community 53 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "providerTypeFields.service.js"
Cohesion: 0.27
Nodes (14): resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getProviderTypeFields(), httpError(), ADR-0006 (+6 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkDetailPage.jsx"
Cohesion: 0.05
Nodes (82): getStatusesByScopeAPI(), exportContractAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), useInvoiceViews(), useSocket(), SubCard(), ContactsList() (+74 more)

### Community 59 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "invoiceTerms.js"
Cohesion: 0.13
Nodes (25): approveInvoice(), assertContractAdmitsCancel(), assertContractStillAdmits(), cancelInvoice(), deleteInvoice(), findImmutable(), findLockedInvoice(), locksOf() (+17 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.13
Nodes (13): ref_fs, ref_path, ref_url, catalog, expected, prismaMock, ADR-0027, loggerMock (+5 more)

### Community 68 - "notifications.routes.js"
Cohesion: 0.21
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 70 - "contracts.service.js"
Cohesion: 0.08
Nodes (44): findExportRows(), renderExport(), contractPolicyStatuses(), contractOf(), exportContractReport(), assertHeader(), assertProviderAssigned(), assertStage() (+36 more)

### Community 71 - "@mui/material"
Cohesion: 0.05
Nodes (65): getAddressTypesSelectAPI, client_src_assets_images_interadminpro, appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, ACTION_TONES, ActionButton() (+57 more)

### Community 88 - "authjwt.middleware.js"
Cohesion: 0.09
Nodes (25): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+17 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (93): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, policyTypesApi, deleteProfileAPI(), paginationProfilesAPI() (+85 more)

### Community 100 - "works.routes.js"
Cohesion: 0.11
Nodes (24): canViewAllWorks(), managedWhere(), resolveWorkScope(), selectMyWorks(), changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS (+16 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "showError"
Cohesion: 0.05
Nodes (93): getBusinessRulesAPI(), saveBusinessRulesAPI(), contractPoliciesApi, suspendContractAPI(), getIdentityDocumentsSelectAPI, getInsurersSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI() (+85 more)

### Community 108 - "getIO"
Cohesion: 0.13
Nodes (17): getIO(), IDEMPOTENCY_HEADER, configurePolicyTypeBaseController, FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, deleteProfileController() (+9 more)

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.07
Nodes (41): express, requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), businessRulesRoutes, constructionCompaniesRoutes (+33 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

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
Cohesion: 0.22
Nodes (5): ALL, CONCEPTS, INVOICES, OWN, prismaMock

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.26
Nodes (11): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), balanceViolations(), CHECKS, findBalanceViolations(), ADR-0024 (+3 more)

### Community 129 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 133 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 134 - "writeAudit"
Cohesion: 0.05
Nodes (62): ADR-0001, bcrypt, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0027, protect(), REDACTED (+54 more)

### Community 136 - "users.service.js"
Cohesion: 0.09
Nodes (25): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, identityDocumentsConfig, identityDocumentsService (+17 more)

### Community 137 - "billingTerms.js"
Cohesion: 0.19
Nodes (12): assertBillingFits(), BILLING_TYPES, billingBalances(), billingDto(), httpError(), money(), ZERO, approvedOf() (+4 more)

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
Cohesion: 0.18
Nodes (11): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router (+3 more)

### Community 154 - "MainLayout/index.jsx"
Cohesion: 0.20
Nodes (14): handlerDrawerOpen(), Footer(), Header(), ProfileSection(), MainLayout(), MainLayoutContent(), ScopedOutlet(), LogoSection() (+6 more)

### Community 155 - "decimal"
Cohesion: 0.10
Nodes (35): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ratioPercent() (+27 more)

### Community 156 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 157 - "contractFields.js"
Cohesion: 0.23
Nodes (11): AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+3 more)

### Community 159 - "WorksPage.jsx"
Cohesion: 0.12
Nodes (19): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorksSummaryAPI(), worksApi, createMasterApi(), ADR-0002, useLinkedFilters() (+11 more)

### Community 173 - "themes/index.jsx"
Cohesion: 0.21
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

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

### Community 179 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 181 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 183 - "useConfig"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 186 - "idempotency.service.js"
Cohesion: 0.38
Nodes (6): ref_crypto, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), keyReused(), requestFingerprint()

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "floatingPoint.guard.test.js"
Cohesion: 0.29
Nodes (5): ALLOWED, files(), lines, SRC, text()

### Community 194 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 197 - "NotificationSection/index.jsx"
Cohesion: 0.29
Nodes (11): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+3 more)

### Community 198 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 201 - "ProviderTypePage.jsx"
Cohesion: 0.14
Nodes (17): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+9 more)

### Community 202 - "ref_jest_globals"
Cohesion: 0.05
Nodes (24): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+16 more)

### Community 206 - "useGetMenuMaster"
Cohesion: 0.27
Nodes (12): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), MenuList() (+4 more)

## Knowledge Gaps
- **1017 isolated node(s):** `typeConfig`, `daysValidation`, `CONTRACT_TYPES`, `SIMPLE_CAPTURED`, `TABS` (+1012 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1385 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **94 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@mui/material` connect `@mui/material` to `GeneralDashboard.jsx`, `InvoiceFormPage.jsx`, `ContractFormPage.jsx`, `client/package.json`, `menu-items/index.js`, `AuthForgotPassword.jsx`, `AuthenticationRoutes.jsx`, `MainLayout/index.jsx`, `constants.js`, `WorksPage.jsx`, `themes/index.jsx`, `WorkChartsTab.jsx`, `withAlpha`, `useConfig`, `WorkDetailPage.jsx`, `NotificationSection/index.jsx`, `DebouncedInput.jsx`, `ProviderTypePage.jsx`, `EasyCrop.jsx`, `InputLabel.jsx`, `useGetMenuMaster`, `useAuth`, `showError`, `DocumentManagement.jsx`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `master.service.js`, `server/package.json`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Why does `ADR-0003` connect `master.service.js` to `useAuth`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **What connects `typeConfig`, `daysValidation`, `CONTRACT_TYPES` to the rest of the system?**
  _1017 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `master.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08244680851063829 - nodes in this community are weakly interconnected._
# Graph Report - WEBPAC-INTERVE  (2026-10-22)

## Corpus Check
- 615 files · ~314,556 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3598 nodes · 9949 edges · 230 communities (132 shown, 98 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 134 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `76b9c232`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- users.service.js
- WorkScopeContext.jsx
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- ContractFormPage.jsx
- ContractsPage.jsx
- seed.demo.js
- auth.routes.js
- NewProviderDialog.jsx
- client/package.json
- menu-items/index.js
- providers.routes.js
- workScopeOf
- invoices.service.test.js
- compilerOptions
- authContext.jsx
- invoices.service.js
- contractPolicies.service.js
- `tbl_users`
- app.js
- works.service.js
- contractSuspensions.service.test.js
- constants.js
- writeAudit
- invoices.controller.test.js
- contractConcepts.service.js
- mailerService.js
- contracts.routes.js
- expirationNotice.service.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- showError
- contractReports.service.js
- cron/index.js
- addressTypes.contacts.js
- permissions.constants.js
- devDependencies
- App.jsx
- WorkChartsTab.jsx
- scripts
- simpleInvoiceTerms.js
- `tbl_invoices`
- withAlpha
- session.service.js
- httpError
- contractPolicies.service.test.js
- `tbl_contract_type_fields`
- WorkSummaryTab.jsx
- ref_jest_globals
- scripts
- WorkDetailPage.jsx
- session.service.test.js
- compilerOptions
- excelJS.js
- invoiceTerms.js
- permission
- devDependencies
- ref_fs
- notifications.service.js
- contracts.service.js
- @mui/material
- `tbl_contract_status_history`
- socket.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- showSuccess
- getIO
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- PoliciesTab.jsx
- export.service.js
- DocumentManagement.jsx
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- transaction.service.test.js
- uniqueConstraints.constants.test.js
- balanceReconciliation.service.js
- formatNumber.js
- serviceWorker.jsx
- `tbl_providers`
- images.js
- MainCard
- auth.service.js
- ProfilePage.jsx
- billingTerms.js
- works.service.test.js
- auth.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- `tbl_user_permissions`
- AuthenticationRoutes.jsx
- WorkPoliciesTab.jsx
- decimal
- contractNotifications.service.test.js
- contractFields.js
- contractsApi.js
- `tbl_contract_concepts`
- `tbl_reasons`
- themes/index.jsx
- browserslist
- volta
- `tbl_users`
- balanceReconciliation.service.test.js
- decisionReferences.guard.test.js
- dashboard.service.test.js
- ImageList.jsx
- httpCliente.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- floatingPoint.guard.test.js
- invoiceEvidence.service.js
- fMoneyText
- contracts.controller.test.js
- DebouncedInput.jsx
- ProviderTypeFieldsDialog.jsx
- contractEndDateReconciliation.service.test.js
- app.routes.js
- document.routes.js
- react
- invoiceViews.js
- contracts.service.test.js
- handleFirebase.js
- ContactsEditor.jsx
- `tbl_invoices`
- `tbl_invoices`
- formatTime.js
- contractReports.service.test.js
- dashboard.measure.js
- renderExport
- contractSummaryReport.test.js
- workScope.guard.test.js
- workScope.service.test.js
- permissions.controller.test.js
- idempotency.service.test.js
- requirePermission.middleware.test.js
- validate.middleware.test.js
- audit.service.test.js
- document.service.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 136 edges
2. `react` - 106 edges
3. `showError()` - 82 edges
4. `useAuth()` - 79 edges
5. `workScopeOf()` - 62 edges
6. `writeAudit()` - 60 edges
7. `dateOnlyText()` - 59 edges
8. `withLockedTransaction()` - 59 edges
9. `showSuccess()` - 57 edges
10. `@tabler/icons-react` - 56 edges

## Surprising Connections (you probably didn't know these)
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js
- `getUserPermissions()` --calls--> `getEffectivePermissionIds()`  [EXTRACTED]
  server/src/modules/app/general/app.service.js → server/src/common/services/effectivePermissions.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `advanceTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js

## Import Cycles
- None detected.

## Communities (230 total, 98 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "users.service.js"
Cohesion: 0.04
Nodes (71): ADR-0001, ref_crypto, adapter, ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT (+63 more)

### Community 3 - "WorkScopeContext.jsx"
Cohesion: 0.11
Nodes (30): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), getMyWorksSelectAPI(), pickWork(), useWorkFilterField(), useWorkScope() (+22 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (42): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+34 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (66): containsFilter(), userFullName(), identificationError(), getSessionInfo(), assertIdentification(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate() (+58 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.20
Nodes (20): getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, isBillingInvoiceType(), amountsPayload() (+12 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.08
Nodes (38): sendExport(), exportFormatRule(), accessOf(), exportInvoicesController, getContractAdvanceController, getInvoiceController, getInvoiceEvidenceController, getInvoiceFormOptionsController (+30 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.09
Nodes (40): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), previewContractEndDateAPI(), useEndDatePreview(), PercentField(), toText() (+32 more)

### Community 10 - "ContractsPage.jsx"
Cohesion: 0.08
Nodes (32): getStatusesByScopeAPI(), contractsApi, exportContractAPI(), exportContractsAPI(), getContractFilterProvidersAPI(), ContractDetailPage, ContractsPage, download() (+24 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.05
Nodes (50): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+42 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "NewProviderDialog.jsx"
Cohesion: 0.11
Nodes (30): checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, getProviderTypesSelectAPI, DateField() (+22 more)

### Community 14 - "client/package.json"
Cohesion: 0.06
Nodes (35): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+27 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (14): admin, icons, billing, dashboard, icons, icons, other, icons (+6 more)

### Community 16 - "providers.routes.js"
Cohesion: 0.08
Nodes (30): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+22 more)

### Community 17 - "workScopeOf"
Cohesion: 0.08
Nodes (60): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, approveInvoiceController, cancelInvoiceController (+52 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "authContext.jsx"
Cohesion: 0.15
Nodes (19): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), AuthProvider() (+11 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.06
Nodes (54): ADR-0013, ADR-0023, isBillingType(), admittedContractsWhere(), admittedTypes(), approvalSnapshot(), balanceChange(), CONTRACT_GATED_ACTIONS (+46 more)

### Community 22 - "contractPolicies.service.js"
Cohesion: 0.04
Nodes (103): ADR-0002, ADR-0011, scopeWhere(), moneyText(), sumMoney(), toPercent(), todayDateOnly(), policyExpiringDays() (+95 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (62): ADR-0004, ADR-0007, assertInScope(), filtersWhere(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING (+54 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (22): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx, prismaMock (+14 more)

### Community 27 - "constants.js"
Cohesion: 0.05
Nodes (53): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), configurePolicyTypeBaseAPI(), policyTypesApi, useInvoiceViews(), ADR-0002, useLinkedFilters(), InvoicesPage (+45 more)

### Community 28 - "writeAudit"
Cohesion: 0.06
Nodes (50): AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0027, protect(), SENSITIVE_FIELDS, STANDALONE_EVENTS (+42 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "contractConcepts.service.js"
Cohesion: 0.09
Nodes (69): main(), diffFields(), newOperationId(), percentText(), dateOnlyText(), withContractAiu(), amountsDto(), assertContractStillAdmits() (+61 more)

### Community 31 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.08
Nodes (36): moneyRule(), optionalDate(), percentRule(), simpleAmountRules(), contractsRoutes, ADR-0006, ADR-0016, ADR-0017 (+28 more)

### Community 33 - "expirationNotice.service.js"
Cohesion: 0.06
Nodes (41): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+33 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "showError"
Cohesion: 0.14
Nodes (25): suspendContractAPI(), invoiceTransitionsApi, getReasonsSelectAPI(), showError(), useSocket(), BaseDialog(), MasterDialog, fallbackUuid() (+17 more)

### Community 38 - "contractReports.service.js"
Cohesion: 0.09
Nodes (28): contractInvoicesForReport(), ADVANCE_COLUMNS, advanceTotals(), authored(), balanceFields(), CONCEPT_COLUMNS, conceptLabel(), CONTRACT_COLUMNS (+20 more)

### Community 39 - "cron/index.js"
Cohesion: 0.11
Nodes (17): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+9 more)

### Community 40 - "addressTypes.contacts.js"
Cohesion: 0.47
Nodes (5): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText()

### Community 41 - "permissions.constants.js"
Cohesion: 0.06
Nodes (40): ADR-0003, ADR-0016, ADR-0024, ADR-0025, ADR-0026, ADR-0011, ADR-0012, ADR-0017 (+32 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "App.jsx"
Cohesion: 0.13
Nodes (14): App(), client_src_assets_scss_style, AuthContext, container, root, NavigationScroll(), reportWebVitals(), @fontsource/inter (+6 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.12
Nodes (38): fPercentText(), Advances(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf(), drillLinkSx (+30 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "simpleInvoiceTerms.js"
Cohesion: 0.14
Nodes (23): toMoney(), adjustableAmount(), isSimpleType(), positiveMoney(), previewSimpleInvoice(), requestedDetailChanges(), resolveDetail(), blank() (+15 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 51 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 52 - "httpError"
Cohesion: 0.18
Nodes (25): approveInvoice(), assertContractAdmitsCancel(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditable(), cancelInvoice() (+17 more)

### Community 53 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "WorkSummaryTab.jsx"
Cohesion: 0.20
Nodes (24): StatusChip(), fDateOnly(), contractRows(), DrillDownDialog(), invoiceRows(), num, useDrillDown(), dashboardTo (+16 more)

### Community 56 - "ref_jest_globals"
Cohesion: 0.05
Nodes (38): ref_jest_globals, prismaMock, baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks() (+30 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkDetailPage.jsx"
Cohesion: 0.08
Nodes (53): getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, ContactsList(), ADR-0009, DataList(), Figure(), Pending() (+45 more)

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
Cohesion: 0.14
Nodes (17): isContractCreate(), isCreate(), isSimpleCreate(), cancelTransitionFor(), hasContract(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS (+9 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "ref_fs"
Cohesion: 0.33
Nodes (4): ref_fs, catalog, expected, prismaMock

### Community 68 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 70 - "contracts.service.js"
Cohesion: 0.06
Nodes (59): ADR-0015, prisma, dateRangeFilter(), idFilter(), FIELD_GROUPS, typeAppliesAiu(), daysBetween(), discrepancyLine() (+51 more)

### Community 71 - "@mui/material"
Cohesion: 0.07
Nodes (28): HeaderAvatar(), MobileSearch(), SearchSection(), CardSecondaryAction(), headerStyle, SubCard(), Avatar(), BInputLabel (+20 more)

### Community 88 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (72): constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, providerTypesApi, reasonsApi, supervisionTypesApi, useAuth() (+64 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.09
Nodes (27): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+19 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "showSuccess"
Cohesion: 0.08
Nodes (40): getBusinessRulesAPI(), saveBusinessRulesAPI(), getIdentityDocumentsSelectAPI, getModulesAPI(), getProfilesAPI(), saveProfileAPI(), deleteUserAPI(), getBasicInformationAPI() (+32 more)

### Community 108 - "getIO"
Cohesion: 0.13
Nodes (16): getIO(), configurePolicyTypeBaseController, FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, deleteProfileController(), getModulesController() (+8 more)

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.09
Nodes (30): express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), businessRulesRoutes (+22 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "PoliciesTab.jsx"
Cohesion: 0.16
Nodes (18): contractPoliciesApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, ADR-0019, ADR-0018, PoliciesDraftEditor(), rowKey(), ADR-0017 (+10 more)

### Community 117 - "export.service.js"
Cohesion: 0.15
Nodes (30): addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf(), buildPdfDocument(), cellText() (+22 more)

### Community 118 - "DocumentManagement.jsx"
Cohesion: 0.32
Nodes (11): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+3 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): ALL, CONCEPTS, CONTRACT, INVOICES, OWN, prismaMock

### Community 123 - "transaction.service.test.js"
Cohesion: 0.26
Nodes (8): ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.18
Nodes (15): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), contractBalanceReconciliationJob, insertNotification() (+7 more)

### Community 129 - "formatNumber.js"
Cohesion: 0.19
Nodes (15): getContractAdvanceAPI(), previewSimpleInvoiceAPI(), MoneyField(), moneyInputText(), parseMoneyInput(), AdjustableAmount(), AdvanceAmountsSection(), MONEY (+7 more)

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 133 - "MainCard"
Cohesion: 0.26
Nodes (16): getDashboardSummaryAPI(), MainCard(), invoicePath(), AlertsCard(), Empty(), LatestInvoicesCard(), num, QuickAccessCard() (+8 more)

### Community 134 - "auth.service.js"
Cohesion: 0.11
Nodes (26): bcrypt, REDACTED, withTransaction(), comparePassword(), hashPassword(), deriveKey(), generateResetCode(), hashResetCode() (+18 more)

### Community 136 - "ProfilePage.jsx"
Cohesion: 0.19
Nodes (15): deleteProfileAPI(), paginationProfilesAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters(), ProfilesPage, FilterButton() (+7 more)

### Community 137 - "billingTerms.js"
Cohesion: 0.21
Nodes (11): assertBillingFits(), BILLING_TYPES, billingBalances(), billingDto(), httpError(), money(), ZERO, approvedOf() (+3 more)

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

### Community 154 - "WorkPoliciesTab.jsx"
Cohesion: 0.11
Nodes (24): getWorkDashboardAPI(), ADR-0002, getWorksSummaryAPI(), MainContentStyled, closedMixin(), MiniDrawerStyled, openedMixin(), appDrawerWidth (+16 more)

### Community 155 - "decimal"
Cohesion: 0.09
Nodes (43): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE (+35 more)

### Community 156 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 157 - "contractFields.js"
Cohesion: 0.26
Nodes (10): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+2 more)

### Community 159 - "contractsApi.js"
Cohesion: 0.18
Nodes (13): addressTypesApi, getConstructionCompaniesSelectAPI, ADR-0006, ADR-0016, ADR-0017, ADR-0018, getContractTypesSelectAPI, getSupervisionTypesSelectAPI (+5 more)

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
Cohesion: 0.18
Nodes (7): ALL, INVOICES, ADR-0002, OWN, prismaMock, emit, prismaMock

### Community 183 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 186 - "httpCliente.js"
Cohesion: 0.12
Nodes (15): instance, NO_REFRESH_URLS, refreshClient, refreshSession(), RETRY_503_HINT, SocketContext, SocketProvider(), pathSocket (+7 more)

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "floatingPoint.guard.test.js"
Cohesion: 0.33
Nodes (4): ALLOWED, files(), lines, SRC

### Community 194 - "invoiceEvidence.service.js"
Cohesion: 0.15
Nodes (14): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+6 more)

### Community 197 - "fMoneyText"
Cohesion: 0.23
Nodes (12): fTerm(), fMoneyText(), ContractBalanceCards(), InvoiceDetailPanel(), DashboardCards(), Indicator(), ConceptsTab(), money() (+4 more)

### Community 198 - "contracts.controller.test.js"
Cohesion: 0.14
Nodes (12): conceptsServiceMock, contractsServiceMock, emit, exportContractReport, exportContractSummary, getEffectivePermissionIds, ADR-0015, ADR-0016 (+4 more)

### Community 201 - "ProviderTypeFieldsDialog.jsx"
Cohesion: 0.31
Nodes (9): getProviderTypeFieldsAPI(), saveProviderTypeFieldsAPI(), DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006, ProviderTypeFieldsDialog(), toggle(), toRow() (+1 more)

### Community 202 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 203 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 204 - "document.routes.js"
Cohesion: 0.23
Nodes (9): IDEMPOTENCY_HEADER, deleteModuleDoc(), paginationModuleDocs(), saveModuleDoc(), moduleDocsRoutes, deleteDocSchema, DOC_TYPES, paginationDocsSchema (+1 more)

### Community 206 - "react"
Cohesion: 0.11
Nodes (32): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), ConfigContext, ConfigProvider(), useConfig() (+24 more)

### Community 209 - "invoiceViews.js"
Cohesion: 0.29
Nodes (11): ANY_CONTRACT_VIEW_PERMISSION, ANY_VIEW_PERMISSION, assertViewGranted(), CONTRACT_VIEWS, httpError(), INVOICE_VIEWS, isContractView(), NONE (+3 more)

### Community 210 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 211 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 212 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 218 - "contractReports.service.test.js"
Cohesion: 0.20
Nodes (6): exceljs, COLUMNS, ROWS, concept(), contract(), prismaMock

### Community 219 - "dashboard.measure.js"
Cohesion: 0.36
Nodes (8): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain()

### Community 220 - "renderExport"
Cohesion: 0.31
Nodes (9): findExportRows(), httpError(), renderDocument(), renderExport(), renderWith(), contractOf(), exportContractReport(), exportContracts() (+1 more)

### Community 221 - "contractSummaryReport.test.js"
Cohesion: 0.22
Nodes (6): contract, contractBalances, contractInvoicesForReport, getContract, getContractPolicies, SCOPE

### Community 222 - "workScope.guard.test.js"
Cohesion: 0.33
Nodes (5): ref_url, controllers, EXEMPT, handlers, MODULES

### Community 223 - "workScope.service.test.js"
Cohesion: 0.40
Nodes (4): hasEffectivePermission, prismaMock, state, user

### Community 224 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

## Knowledge Gaps
- **1020 isolated node(s):** `TABS`, `STATUS_OPTIONS`, `EXPIRING_TONE`, `notDeleted`, `VALIDITY_RANK` (+1015 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1388 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **98 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0003` connect `permissions.constants.js` to `users.service.js`, `useAuth`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `users.service.js`, `server/package.json`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `formatNumber.js`, `WorkScopeContext.jsx`, `MainCard`, `InvoiceFormPage.jsx`, `ProfilePage.jsx`, `ContractFormPage.jsx`, `ContractsPage.jsx`, `NewProviderDialog.jsx`, `client/package.json`, `authContext.jsx`, `AuthenticationRoutes.jsx`, `WorkPoliciesTab.jsx`, `constants.js`, `contractsApi.js`, `showError`, `themes/index.jsx`, `WorkChartsTab.jsx`, `withAlpha`, `ImageList.jsx`, `WorkSummaryTab.jsx`, `WorkDetailPage.jsx`, `fMoneyText`, `DebouncedInput.jsx`, `ProviderTypeFieldsDialog.jsx`, `react`, `ContactsEditor.jsx`, `useAuth`, `showSuccess`, `PoliciesTab.jsx`, `DocumentManagement.jsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **What connects `TABS`, `STATUS_OPTIONS`, `EXPIRING_TONE` to the rest of the system?**
  _1020 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `users.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.04244694132334582 - nodes in this community are weakly interconnected._
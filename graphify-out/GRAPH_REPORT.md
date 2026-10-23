# Graph Report - WEBPAC-INTERVE  (2026-10-23)

## Corpus Check
- 630 files · ~329,256 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3647 nodes · 10010 edges · 216 communities (123 shown, 93 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 135 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3d29430a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- contractTerms.js
- WorkPoliciesTab.jsx
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- providers.routes.js
- ConceptDialog.jsx
- updateInvoice
- auditContext
- seed.demo.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- contracts.service.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- httpCliente.js
- ProviderTypePage.jsx
- contracts.controller.test.js
- contractConcepts.service.js
- mailerService.js
- workScopeOf
- businessRules.service.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- audit.service.js
- contractPolicies.service.js
- cron/index.js
- formatNumber.js
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorkChartsTab.jsx
- scripts
- MainCard.jsx
- `tbl_invoices`
- withAlpha
- WorkSummaryTab.jsx
- contractSuspensions.service.test.js
- ref_jest_globals
- `tbl_contract_type_fields`
- eslint.config.mjs
- transaction.mock.js
- scripts
- contractFields.js
- session.service.test.js
- compilerOptions
- excelJS.js
- AuthForgotPassword.jsx
- permission
- devDependencies
- transaction.service.test.js
- notifications.service.js
- simpleInvoiceTerms.js
- @tabler/icons-react
- `tbl_contract_status_history`
- authjwt.middleware.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- react
- fDateOnly
- idempotency.service.js
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- DocumentManagement.jsx
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- error.middleware.test.js
- ref_prop_types
- balanceReconciliation.service.js
- transaction.service.js
- serviceWorker.jsx
- `tbl_providers`
- invoiceEvidence.service.js
- constants.js
- auth.service.js
- uniqueConstraints.constants.test.js
- expirationNotice.service.js
- works.service.test.js
- formatTime.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- images.js
- `tbl_user_permissions`
- money.utils.js
- auth.controller.test.js
- decimal
- winston.config.js
- decisionReferences.guard.test.js
- contractNotifications.service.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- billingTerms.js
- works.controller.test.js
- expirationNotice.service.test.js
- `tbl_users`
- balanceReconciliation.service.test.js
- extends
- requestedDetailChanges
- funciones.js
- auth.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- browserslist
- WorkDetailPage.jsx
- volta
- password-strength.js
- useSchemePalette
- contractEndDateReconciliation.service.test.js
- app.routes.js
- floatingPoint.guard.test.js
- @mui/material
- dashboard.service.test.js
- workScope.service.test.js
- `tbl_invoices`
- `tbl_invoices`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 141 edges
2. `react` - 108 edges
3. `showError()` - 86 edges
4. `useAuth()` - 77 edges
5. `workScopeOf()` - 62 edges
6. `writeAudit()` - 60 edges
7. `dateOnlyText()` - 59 edges
8. `withLockedTransaction()` - 59 edges
9. `@tabler/icons-react` - 57 edges
10. `showSuccess()` - 55 edges

## Surprising Connections (you probably didn't know these)
- `ContractsPage()` --indirect_call--> `exportContractsAPI()`  [INFERRED]
  client/src/views/work/contracts/ContractsPage.jsx → client/src/api/requests/contractsApi.js
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `createMasterRouter()` --indirect_call--> `verifyToken()`  [INFERRED]
  server/src/common/utils/masterRouter.utils.js → server/src/common/middlewares/authjwt.middleware.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js

## Import Cycles
- None detected.

## Communities (216 total, 93 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractTerms.js"
Cohesion: 0.09
Nodes (31): ADR-0015, amountsDto(), getInvoice(), daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation(), derivedEndDate() (+23 more)

### Community 3 - "WorkPoliciesTab.jsx"
Cohesion: 0.11
Nodes (22): getWorkDashboardAPI(), ADR-0002, DashboardDefault, Dashboard(), ADR-0002, TABS, CONTRACT_STATE_CHART_COLORS, DASHBOARD_PATH (+14 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (61): identificationError(), assertIdentification(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope() (+53 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (50): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), ADR-0017, client_src_api_requests_invoicesapi_previewcontractinvoiceapi, previewSimpleInvoiceAPI() (+42 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.08
Nodes (43): sendExport(), accessOf(), approveInvoiceController, cancelInvoiceController, deleteInvoiceController, exportInvoicesController, getContractAdvanceController, getInvoiceController (+35 more)

### Community 9 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (51): contractConceptsApi, contractPoliciesApi, exportContractsAPI(), getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006 (+43 more)

### Community 11 - "updateInvoice"
Cohesion: 0.20
Nodes (25): approveInvoice(), assertContractAdmitsCancel(), assertInvoiceVisible(), assertStage(), assertUniqueNumber(), assertWork(), auditable(), cancelInvoice() (+17 more)

### Community 12 - "auditContext"
Cohesion: 0.15
Nodes (24): THEME_MODES, auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController() (+16 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.04
Nodes (63): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+55 more)

### Community 14 - "client/package.json"
Cohesion: 0.08
Nodes (24): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+16 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.08
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.05
Nodes (54): ADR-0009, express-validator, getIO(), EDITABLE_STATUS_VALUES, requirePermission(), validate(), hasEffectivePermission(), createMasterControllers() (+46 more)

### Community 17 - "contracts.service.js"
Cohesion: 0.08
Nodes (37): ADR-0002, containsFilter(), dateRangeFilter(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS, resolvePagination() (+29 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.16
Nodes (19): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+11 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.05
Nodes (56): ADR-0017, ADR-0021, ADR-0023, server_src_common_utils_money_utils_percentfor, server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields (+48 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.06
Nodes (79): ADR-0011, ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile() (+71 more)

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
Cohesion: 0.07
Nodes (21): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+13 more)

### Community 27 - "httpCliente.js"
Cohesion: 0.05
Nodes (50): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), getMyWorksSelectAPI(), genericRequest, instance, NO_REFRESH_URLS (+42 more)

### Community 28 - "ProviderTypePage.jsx"
Cohesion: 0.15
Nodes (16): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+8 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.05
Nodes (35): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+27 more)

### Community 30 - "contractConcepts.service.js"
Cohesion: 0.08
Nodes (82): diffFields(), writeAudit(), runIdempotent(), withLockedTransaction(), typeAppliesAiu(), withContractAiu(), updateAccount(), assertContractStillAdmits() (+74 more)

### Community 31 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 32 - "workScopeOf"
Cohesion: 0.06
Nodes (66): workScopeOf(), moneyRule(), optionalDate(), percentRule(), simpleAmountRules(), ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS (+58 more)

### Community 33 - "businessRules.service.js"
Cohesion: 0.10
Nodes (25): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+17 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "audit.service.js"
Cohesion: 0.04
Nodes (90): ADR-0001, ADR-0013, @prisma/adapter-mariadb, adapter, describeTarget(), prisma, testConnection(), ACTIVE_STATUS (+82 more)

### Community 38 - "contractPolicies.service.js"
Cohesion: 0.05
Nodes (67): moneyText(), percentOf(), sumMoney(), toPercent(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES (+59 more)

### Community 39 - "cron/index.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+8 more)

### Community 40 - "formatNumber.js"
Cohesion: 0.16
Nodes (13): ACTION_TONES, fTerm(), fPercentText(), ContractBalanceCards(), DashboardCards(), Indicator(), ADR-0002, ConceptsTab() (+5 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (49): ADR-0016, ADR-0024, ADR-0025, ADR-0026, express, ADR-0011, ADR-0012, ADR-0017 (+41 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.14
Nodes (37): fMoneyText(), contractRows(), DrillDownDialog(), invoiceRows(), num, useDrillDown(), Advances(), CardTitle() (+29 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "MainCard.jsx"
Cohesion: 0.21
Nodes (11): appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, Avatar(), ColorBox(), UIColor(), CustomShadowBox() (+3 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "withAlpha"
Cohesion: 0.16
Nodes (16): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Chip() (+8 more)

### Community 51 - "WorkSummaryTab.jsx"
Cohesion: 0.24
Nodes (16): MainCard(), initialsOf(), AttentionCard(), Bar(), CONTRACT_NOUN, ContractCard(), Empty(), INVOICE_NOUN (+8 more)

### Community 52 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 53 - "ref_jest_globals"
Cohesion: 0.05
Nodes (18): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, ctx (+10 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "contractFields.js"
Cohesion: 0.18
Nodes (13): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+5 more)

### Community 59 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "AuthForgotPassword.jsx"
Cohesion: 0.29
Nodes (10): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, strengthColor(), ForgotPassword(), STEPS (+2 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.13
Nodes (13): ref_fs, ref_path, ref_url, catalog, expected, prismaMock, ADR-0027, loggerMock (+5 more)

### Community 68 - "notifications.service.js"
Cohesion: 0.18
Nodes (16): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+8 more)

### Community 70 - "simpleInvoiceTerms.js"
Cohesion: 0.18
Nodes (16): previewSimpleInvoice(), blank(), composeSimpleInvoice(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023, ADR-0026 (+8 more)

### Community 71 - "@tabler/icons-react"
Cohesion: 0.11
Nodes (30): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS (+22 more)

### Community 88 - "authjwt.middleware.js"
Cohesion: 0.14
Nodes (15): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+7 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (104): addressTypesApi, loginAPI(), logoutAPI(), verifyTokenAPI(), constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractsApi, contractTypesApi (+96 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.10
Nodes (29): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+21 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "react"
Cohesion: 0.10
Nodes (21): getBusinessRulesAPI(), saveBusinessRulesAPI(), getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), ProfileSection(), HeaderAvatar(), MobileSearch() (+13 more)

### Community 108 - "fDateOnly"
Cohesion: 0.36
Nodes (12): getDashboardSummaryAPI(), fDateOnly(), AlertsCard(), Empty(), LatestInvoicesCard(), num, QuickAccessCard(), UpcomingPoliciesCard() (+4 more)

### Community 112 - "idempotency.service.js"
Cohesion: 0.10
Nodes (22): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), IDEMPOTENCY_HEADER, idempotencyMisuse(), keyReused(), requestFingerprint(), deleteModuleDoc() (+14 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.07
Nodes (73): suspendContractAPI(), getIdentityDocumentsSelectAPI, getInsurersSelectAPI, invoiceTransitionsApi, getPolicyTypesSelectAPI, getModulesAPI(), getProfilesAPI(), saveProfileAPI() (+65 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (51): exceljs, addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf(), buildPdfDocument() (+43 more)

### Community 118 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): ALL, CONCEPTS, CONTRACT, INVOICES, OWN, prismaMock

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "ref_prop_types"
Cohesion: 0.11
Nodes (23): getAddressTypesSelectAPI, ActionButton(), toneOf(), ConfirmDialog(), channelsOf(), ContactDialog(), ContactsEditor(), EMPTY (+15 more)

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.21
Nodes (14): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations() (+6 more)

### Community 129 - "transaction.service.js"
Cohesion: 0.20
Nodes (13): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+5 more)

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "invoiceEvidence.service.js"
Cohesion: 0.10
Nodes (27): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+19 more)

### Community 133 - "constants.js"
Cohesion: 0.06
Nodes (46): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), invoicesApi, configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, InvoicesPage, PolicyTypePage (+38 more)

### Community 134 - "auth.service.js"
Cohesion: 0.15
Nodes (19): ADR-0027, deriveKey(), generateResetCode(), hashResetCode(), ADR-0001, verifyResetCode(), ACCOUNT_FIELDS, anonymous() (+11 more)

### Community 136 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 137 - "expirationNotice.service.js"
Cohesion: 0.33
Nodes (11): getRuleValues(), addDays(), alreadyNotified(), buildNotices(), daysUntil(), findExpiringContracts(), findExpiringPolicies(), managersByWork() (+3 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 151 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 153 - "money.utils.js"
Cohesion: 0.20
Nodes (9): HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ROUNDING, toMoney(), ZERO (+1 more)

### Community 154 - "auth.controller.test.js"
Cohesion: 0.25
Nodes (6): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, mockUpdateThemeMode, sessionMock

### Community 155 - "decimal"
Cohesion: 0.10
Nodes (44): @prisma/client, decimal(), ratioPercent(), ratioText(), roundMoney(), roundRatio(), advanceBalances(), appliedPct() (+36 more)

### Community 156 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 157 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 159 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 173 - "billingTerms.js"
Cohesion: 0.20
Nodes (8): BILLING_TYPES, billingBalances(), httpError(), ZERO, approvedOf(), balancesOf(), contractsBalances(), INVOICE_TYPES

### Community 174 - "works.controller.test.js"
Cohesion: 0.29
Nodes (5): emit, getEffectivePermissionIds, SCOPE, serviceMock, workScopeOf

### Community 175 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 176 - "`tbl_users`"
Cohesion: 0.31
Nodes (7): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 181 - "requestedDetailChanges"
Cohesion: 0.24
Nodes (10): isBillingType(), approvalSnapshot(), detailText(), isSimpleType(), requestedDetailChanges(), simpleSnapshot(), SNAPSHOT_AMOUNTS, snapshotText() (+2 more)

### Community 183 - "funciones.js"
Cohesion: 0.25
Nodes (5): bcrypt, comparePassword(), hashPassword(), restorePassword(), updatePassword()

### Community 186 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 194 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 197 - "WorkDetailPage.jsx"
Cohesion: 0.05
Nodes (78): exportContractAPI(), getWorkManagersSelectAPI(), getWorksSummaryAPI(), previewWorkEndDateAPI(), worksApi, useEndDatePreview(), InvoiceDetailPage, SubCard() (+70 more)

### Community 198 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 199 - "password-strength.js"
Cohesion: 0.43
Nodes (5): defaultColor, hasMixed(), hasNumber(), hasSpecial(), strengthIndicator()

### Community 201 - "useSchemePalette"
Cohesion: 0.52
Nodes (4): useSchemePalette(), InvoicesByWorkCard(), PolicyStatusCard(), react-apexcharts

### Community 202 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 203 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 204 - "floatingPoint.guard.test.js"
Cohesion: 0.29
Nodes (5): ALLOWED, files(), lines, SRC, text()

### Community 206 - "@mui/material"
Cohesion: 0.04
Nodes (75): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), updateThemeModeAPI(), client_src_assets_images_interadminpro, config (+67 more)

### Community 209 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 211 - "workScope.service.test.js"
Cohesion: 0.40
Nodes (4): hasEffectivePermission, prismaMock, state, user

## Knowledge Gaps
- **1015 isolated node(s):** `ADR-0006`, `ADR-0016`, `ADR-0017`, `ADR-0018`, `PERCENT_FIELDS` (+1010 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1407 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **93 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0002` connect `contracts.service.js` to `useSchemePalette`, `workDashboard.service.js`?**
  _High betweenness centrality (0.173) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `WorkPoliciesTab.jsx`, `constants.js`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `client/package.json`, `httpCliente.js`, `ProviderTypePage.jsx`, `formatNumber.js`, `WorkChartsTab.jsx`, `MainCard.jsx`, `withAlpha`, `WorkSummaryTab.jsx`, `AuthForgotPassword.jsx`, `WorkDetailPage.jsx`, `@tabler/icons-react`, `useSchemePalette`, `useAuth`, `react`, `fDateOnly`, `showError`, `DocumentManagement.jsx`, `ref_prop_types`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Why does `axios` connect `httpCliente.js` to `server/package.json`, `client/package.json`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **What connects `ADR-0006`, `ADR-0016`, `ADR-0017` to the rest of the system?**
  _1015 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractTerms.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09243697478991597 - nodes in this community are weakly interconnected._
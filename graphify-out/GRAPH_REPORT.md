# Graph Report - WEBPAC-INTERVE  (2026-10-29)

## Corpus Check
- 702 files · ~417,779 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4478 nodes · 12709 edges · 241 communities (127 shown, 114 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 166 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7ec12403`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- PoliciesTab.jsx
- providers.routes.js
- dependencies
- server/package.json
- providers.service.js
- constants.js
- workScopeOf
- InvoiceFormPage.jsx
- ContractDetailPage.jsx
- WorksPage.jsx
- auth.routes.js
- statements.service.js
- client/package.json
- @mui/material
- expirationNotice.service.js
- workDashboard.service.js
- invoices.service.test.js
- compilerOptions
- permissions.constants.js
- invoices.service.js
- contractInvoiceTerms.js
- `tbl_users`
- users.service.js
- authjwt.middleware.js
- contractSuspensions.service.test.js
- themes/index.jsx
- contractPolicies.service.js
- invoices.controller.test.js
- invoiceGlosses.service.js
- menu-items/index.js
- SimpleBar.jsx
- showError
- `tbl_contract_concepts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- fMoneyText
- contracts.controller.js
- cron/index.js
- works.service.js
- useMenuCollapse.js
- devDependencies
- GeneralDashboard.jsx
- MainLayout/index.jsx
- scripts
- AuthenticationRoutes.jsx
- `tbl_contracts`
- StatementReportDialog.jsx
- app.js
- decimal
- dateOnlyText
- `tbl_contract_type_fields`
- runIdempotent
- transaction.mock.js
- scripts
- App.jsx
- AuthForgotPassword.jsx
- compilerOptions
- excelJS.js
- transaction.service.js
- permission
- devDependencies
- ref_fs
- prisma-drift.mjs
- seed.demo.js
- auth.service.test.js
- `tbl_contract_status_history`
- status.constants.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- app.routes.js
- statements.service.test.js
- notifications.service.js
- `tbl_works`
- `tbl_policies`
- WorkDetailPage.jsx
- export.service.js
- works.service.test.js
- error.middleware.js
- app.service.js
- `tbl_providers`
- serviceWorker.jsx
- balanceReconciliation.service.js
- auth.service.js
- handleFirebase.js
- ImageList.jsx
- `tbl_providers`
- workScope.service.test.js
- ci-summary.mjs
- contracts.controller.test.js
- browserslist
- contractConcepts.service.js
- MenuList/index.jsx
- eslint.config.mjs
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- src/index.jsx
- `tbl_user_permissions`
- statements.routes.js
- mailerService.js
- health.service.js
- NotificationSection/index.jsx
- importCase.guard.test.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- seed.js
- `tbl_users`
- balanceReconciliation.service.test.js
- volta
- winston.config.js
- formatTime.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- invoiceEvidence.service.test.js
- EasyCrop.jsx
- decisionReferences.guard.test.js
- dashboardDetail.service.test.js
- session.service.test.js
- main.routes.js
- ref_jest_globals
- contracts.service.js
- `tbl_invoices`
- `tbl_invoices`
- writeAudit
- `tbl_statements`
- users.service.test.js
- invoiceGlosses.service.test.js
- invoiceFollowUps.service.test.js
- uniqueConstraints.constants.test.js
- providerTypeFields.service.js
- transaction.service.test.js
- extends
- `tbl_works`
- InputLabel.jsx
- `tbl_status`
- contractLiquidation.service.test.js
- `tbl_users`
- `tbl_work_stages`
- master.service.test.js
- DebouncedInput.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 154 edges
2. `react` - 120 edges
3. `showError()` - 104 edges
4. `workScopeOf()` - 94 edges
5. `moneyText()` - 91 edges
6. `dateOnlyText()` - 88 edges
7. `writeAudit()` - 81 edges
8. `useAuth()` - 79 edges
9. `withLockedTransaction()` - 77 edges
10. `fMoneyText()` - 72 edges

## Surprising Connections (you probably didn't know these)
- `getUserPermissions()` --calls--> `getEffectivePermissionIds()`  [EXTRACTED]
  server/src/modules/app/general/app.service.js → server/src/common/services/effectivePermissions.service.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `selectContractFilterStages()` --calls--> `scopeWhere()`  [EXTRACTED]
  server/src/modules/work/contracts/contracts.service.js → server/src/common/services/workScope.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `percentQuery()` --calls--> `decimal()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/money.utils.js

## Import Cycles
- None detected.

## Communities (241 total, 114 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (26): Alert(), Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), Chip() (+18 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "PoliciesTab.jsx"
Cohesion: 0.13
Nodes (20): contractPoliciesApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, complete(), PercentField(), toText(), toValue(), ADR-0018 (+12 more)

### Community 3 - "providers.routes.js"
Cohesion: 0.08
Nodes (35): canViewAllWorks(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, exportProvidersController, getProviderController (+27 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (39): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+31 more)

### Community 6 - "providers.service.js"
Cohesion: 0.07
Nodes (68): applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes(), assertTypeIds(), assertWorkAssignable() (+60 more)

### Community 7 - "constants.js"
Cohesion: 0.06
Nodes (46): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_usecanviewinvoices, client_src_hooks_useinvoicemenus_useinvoicemenu, SocketContext, LinkedFilterNotice() (+38 more)

### Community 8 - "workScopeOf"
Cohesion: 0.04
Nodes (90): workScopeOf(), CONTRACT_PAIRS, CONTRACT_TAX_FIELDS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController (+82 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (63): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoicesApi (+55 more)

### Community 10 - "ContractDetailPage.jsx"
Cohesion: 0.04
Nodes (86): contractConceptsApi, contractLiquidationApi, contractsApi, exportContractAPI(), exportContractsAPI(), getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI() (+78 more)

### Community 11 - "WorksPage.jsx"
Cohesion: 0.05
Nodes (51): getAddressTypesSelectAPI, getStatusesByScopeAPI(), getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, ADR-0019, getProviderTypeFieldsAPI(), saveProviderTypeFieldsAPI(), getSupervisionTypesSelectAPI (+43 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.06
Nodes (82): renderDocument(), capitalize(), createMasterService(), httpError(), ADR-0003, ADR-0004, ADR-0013, ADR-0027 (+74 more)

### Community 14 - "client/package.json"
Cohesion: 0.08
Nodes (25): axios, eslint, @eslint/js, eslint-plugin-sonarjs, moment, name, packageManager, private (+17 more)

### Community 15 - "@mui/material"
Cohesion: 0.05
Nodes (70): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+62 more)

### Community 16 - "expirationNotice.service.js"
Cohesion: 0.10
Nodes (33): AUDIT_OPERATIONS, BUSINESS_RULES, DEFAULT_EXPIRING_DAYS, MAX_RULE_DAYS, MIN_RULE_DAYS, getBusinessRulesController, saveBusinessRulesController, FIELD_BY_KEY (+25 more)

### Community 17 - "workDashboard.service.js"
Cohesion: 0.11
Nodes (44): moneyText(), sumMoney(), ADVANCE_LEVELS, advanceBar(), advanceLevel(), alertsOf(), balancesOf(), byProviderTypeBlock() (+36 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.05
Nodes (36): ADR-0024, ADR-0027, condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024 (+28 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "permissions.constants.js"
Cohesion: 0.06
Nodes (42): ADR-0011, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020, ADR-0025, ADR-0026 (+34 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.03
Nodes (148): ADR-0021, ADR-0023, renderExport(), toMoney(), isBillingType(), composeContractInvoice(), hasContractTaxes(), server_src_modules_billing_invoices_invoicemenus_simple_type_where (+140 more)

### Community 22 - "contractInvoiceTerms.js"
Cohesion: 0.10
Nodes (37): server_src_common_utils_money_utils_percentfor, percentOf(), percentText(), toPercent(), assertContractTotal(), blank(), composeWith(), CONTRACT_FORMULA_VERSION (+29 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "users.service.js"
Cohesion: 0.10
Nodes (22): ADR-0004, DIAN_WEIGHTS, GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, assertAssignableProfile(), assertIdentification() (+14 more)

### Community 25 - "authjwt.middleware.js"
Cohesion: 0.15
Nodes (14): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+6 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.05
Nodes (28): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+20 more)

### Community 27 - "themes/index.jsx"
Cohesion: 0.13
Nodes (15): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage(), createCustomShadow() (+7 more)

### Community 28 - "contractPolicies.service.js"
Cohesion: 0.04
Nodes (81): findExportRows(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, policyBaseValue(), server_src_modules_billing_invoices_invoicemenus_iscontractmode (+73 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "invoiceGlosses.service.js"
Cohesion: 0.11
Nodes (43): AUDIT_ENTITIES, glossTotal(), assertReleaser(), auditable(), findLockedOpenGloss(), httpError(), ADR-0027, RELEASE_AUDITED (+35 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 32 - "SimpleBar.jsx"
Cohesion: 0.47
Nodes (5): RootStyle, SimpleBarScroll(), SimpleBarStyle, react-device-detect, simplebar-react

### Community 33 - "showError"
Cohesion: 0.05
Nodes (101): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI(), getModulesAPI() (+93 more)

### Community 34 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "fMoneyText"
Cohesion: 0.05
Nodes (111): useSchemePalette(), MainCard(), AlertChips(), contractAlertOptions(), fMoneyText(), fPercentText(), ADVANCE_LEVELS, AdvanceBar() (+103 more)

### Community 38 - "contracts.controller.js"
Cohesion: 0.05
Nodes (83): auditContext(), getEffectivePermissionIds(), moneyRule(), optionalDate(), percentRule(), getDashboardDetailController, getDashboardSummaryController, getWorkDashboardController (+75 more)

### Community 39 - "cron/index.js"
Cohesion: 0.11
Nodes (17): ref_http, node-cron, app, server, describeTarget(), testConnection(), verifyStatusCatalog(), cronJobs (+9 more)

### Community 40 - "works.service.js"
Cohesion: 0.06
Nodes (65): ADR-0007, ADR-0009, INACTIVE_STATUS, assertInScope(), PROGRESS_WARNING, defineContacts(), FIELDS, httpError() (+57 more)

### Community 42 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+6 more)

### Community 44 - "GeneralDashboard.jsx"
Cohesion: 0.07
Nodes (51): getDashboardDetailAPI(), getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, paginationStatementGroupsAPI(), getMyWorksSelectAPI(), pickWork(), useWorkFilterField() (+43 more)

### Community 45 - "MainLayout/index.jsx"
Cohesion: 0.15
Nodes (23): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), useConfig(), Footer(), Header(), ThemeModeSection() (+15 more)

### Community 46 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+11 more)

### Community 48 - "AuthenticationRoutes.jsx"
Cohesion: 0.10
Nodes (21): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.12
Nodes (14): `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users` (+6 more)

### Community 50 - "StatementReportDialog.jsx"
Cohesion: 0.15
Nodes (20): exportStatementGroupAPI(), getStatementGroupReportAPI(), download(), downloadExport(), errorMessage(), EXPORT_FORMATS, ExportButton(), ExportDialog() (+12 more)

### Community 51 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 52 - "decimal"
Cohesion: 0.06
Nodes (69): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent(), ratioText() (+61 more)

### Community 53 - "dateOnlyText"
Cohesion: 0.09
Nodes (48): scopeWhere(), dateOnlyText(), todayDateOnly(), policyExpiringDays(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock() (+40 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "runIdempotent"
Cohesion: 0.16
Nodes (16): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent(), deleteModuleDoc() (+8 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.04
Nodes (39): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+31 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "App.jsx"
Cohesion: 0.27
Nodes (8): refreshSession(), App(), ThemedToastContainer(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

### Community 59 - "AuthForgotPassword.jsx"
Cohesion: 0.16
Nodes (19): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider() (+11 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "transaction.service.js"
Cohesion: 0.27
Nodes (9): buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES, toSortedIds() (+1 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-sonarjs, globals, jest, nodemon, pm2 (+2 more)

### Community 66 - "ref_fs"
Cohesion: 0.12
Nodes (13): ref_fs, ref_url, ALLOWED, files(), lines, SRC, catalog, expected (+5 more)

### Community 68 - "prisma-drift.mjs"
Cohesion: 0.18
Nodes (11): columnList(), database, dbForeignKeys, equivalent, isNoise(), prisma, real, rows (+3 more)

### Community 70 - "seed.demo.js"
Cohesion: 0.06
Nodes (41): ADR-0002, ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure() (+33 more)

### Community 71 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 88 - "status.constants.js"
Cohesion: 0.09
Nodes (30): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+22 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.02
Nodes (101): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), policyTypesApi, exportProvidersAPI() (+93 more)

### Community 100 - "works.routes.js"
Cohesion: 0.07
Nodes (40): sendExport(), managedWhere(), resolveWorkScope(), selectMyWorks(), handleExport(), handleExport(), handleExport(), handleExport() (+32 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "WorkDetailPage.jsx"
Cohesion: 0.07
Nodes (63): changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, InvoiceDetailPage, ContactsList(), ADR-0009, DataList() (+55 more)

### Community 117 - "export.service.js"
Cohesion: 0.09
Nodes (45): pdfkit, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+37 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.06
Nodes (21): exceljs, COLUMNS, ROWS, concept(), contract(), prismaMock, contract, contractBalances (+13 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.19
Nodes (18): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0012 (+10 more)

### Community 120 - "app.service.js"
Cohesion: 0.07
Nodes (29): assertModeUnchangedInUse(), httpError(), ADR-0010, providerTypesConfig, providerTypesService, getMenu(), getPagesMenu(), getSessionInfo() (+21 more)

### Community 123 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 124 - "balanceReconciliation.service.js"
Cohesion: 0.30
Nodes (10): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS, findBalanceViolations() (+2 more)

### Community 125 - "auth.service.js"
Cohesion: 0.05
Nodes (54): bcrypt, ref_crypto, REDACTED, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001 (+46 more)

### Community 129 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 130 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "workScope.service.test.js"
Cohesion: 0.40
Nodes (4): hasEffectivePermission, prismaMock, state, user

### Community 133 - "ci-summary.mjs"
Cohesion: 0.17
Nodes (20): args, buildSection(), cell(), COLORS, kb(), lineLink(), lintSection(), number() (+12 more)

### Community 134 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 136 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 137 - "contractConcepts.service.js"
Cohesion: 0.07
Nodes (83): main(), newOperationId(), withContractAiu(), CANCEL_TARGET, cancelContract(), ADR-0027, text(), activeSequence() (+75 more)

### Community 140 - "MenuList/index.jsx"
Cohesion: 0.24
Nodes (10): getMenuAPI(), ElevationScroll(), HorizontalBar(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts (+2 more)

### Community 142 - "eslint.config.mjs"
Cohesion: 0.12
Nodes (18): asWarnings(), compat, __dirname, __filename, isOff(), @eslint/compat, @eslint/eslintrc, ref_eslint_js (+10 more)

### Community 151 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 153 - "statements.routes.js"
Cohesion: 0.06
Nodes (49): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), exportFormatRule(), idArray(), idempotencyKeyRule() (+41 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 155 - "health.service.js"
Cohesion: 0.33
Nodes (5): DB_TIMEOUT_MS, getHealth(), SERVICE_NAME, withTimeout(), prismaMock

### Community 156 - "NotificationSection/index.jsx"
Cohesion: 0.19
Nodes (16): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), getTimeAgo() (+8 more)

### Community 157 - "importCase.guard.test.js"
Cohesion: 0.20
Nodes (14): clientRoots, entries(), files(), gitMismatches, listing, lookup(), mismatches, realName() (+6 more)

### Community 159 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "seed.js"
Cohesion: 0.14
Nodes (12): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+4 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.20
Nodes (10): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoice_gloss_fields`, `tbl_invoice_glosses` (+2 more)

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.14
Nodes (10): @prisma/client, CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients (+2 more)

### Community 179 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 181 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 183 - "formatTime.js"
Cohesion: 0.10
Nodes (20): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+12 more)

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 194 - "invoiceEvidence.service.test.js"
Cohesion: 0.40
Nodes (3): prismaMock, state, user

### Community 199 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 202 - "dashboardDetail.service.test.js"
Cohesion: 0.25
Nodes (4): ALL, EVERYTHING, OWN, prismaMock

### Community 204 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 206 - "main.routes.js"
Cohesion: 0.04
Nodes (64): express, supertest, getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER (+56 more)

### Community 211 - "ref_jest_globals"
Cohesion: 0.04
Nodes (25): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, payload, ALL, ADR-0002, OWN (+17 more)

### Community 212 - "contracts.service.js"
Cohesion: 0.04
Nodes (82): ADR-0006, addTerm(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), TERM_UNITS, termProgress(), toDateOnly() (+74 more)

### Community 217 - "writeAudit"
Cohesion: 0.07
Nodes (49): ADR-0013, auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0027, protect(), SENSITIVE_FIELDS (+41 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.13
Nodes (8): assertContractInScope, assertInvoiceVisible, ctx, getInvoice, prismaMock, SCOPE, state, VALUE_LINE

### Community 221 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 222 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 224 - "providerTypeFields.service.js"
Cohesion: 0.07
Nodes (36): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+28 more)

### Community 226 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 227 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 237 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 242 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

## Knowledge Gaps
- **1220 isolated node(s):** `STATUS_TABS`, `CONTRACT_ALERT_OPTIONS`, `CONTRACT_INVOICE_TYPES`, `TERM_UNIT_NAMES`, `CONTRACT_TYPES` (+1215 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1670 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **114 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0017` connect `permissions.constants.js` to `seed.demo.js`, `constants.js`?**
  _High betweenness centrality (0.188) - this node is a cross-community bridge._
- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `ImageList.jsx`, `PoliciesTab.jsx`, `constants.js`, `InvoiceFormPage.jsx`, `ContractDetailPage.jsx`, `WorksPage.jsx`, `MenuList/index.jsx`, `client/package.json`, `themes/index.jsx`, `NotificationSection/index.jsx`, `SimpleBar.jsx`, `showError`, `fMoneyText`, `GeneralDashboard.jsx`, `MainLayout/index.jsx`, `AuthenticationRoutes.jsx`, `StatementReportDialog.jsx`, `formatTime.js`, `App.jsx`, `AuthForgotPassword.jsx`, `EasyCrop.jsx`, `useAuth`, `InputLabel.jsx`, `WorkDetailPage.jsx`, `DebouncedInput.jsx`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **What connects `STATUS_TABS`, `CONTRACT_ALERT_OPTIONS`, `CONTRACT_INVOICE_TYPES` to the rest of the system?**
  _1220 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0784313725490196 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `PoliciesTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13405797101449277 - nodes in this community are weakly interconnected._
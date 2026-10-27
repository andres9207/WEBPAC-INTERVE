# Graph Report - WEBPAC-INTERVE  (2026-10-27)

## Corpus Check
- 676 files · ~380,979 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4147 nodes · 11724 edges · 229 communities (120 shown, 109 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 156 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `46bb4116`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- MasterPage.jsx
- AuthenticationRoutes.jsx
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- workScopeOf
- contracts.controller.js
- ConceptDialog.jsx
- validation.utils.js
- auth.routes.js
- statements.service.js
- client/package.json
- WorkContracts.jsx
- getIO
- auth.service.js
- invoices.service.test.js
- compilerOptions
- usersApi.js
- invoices.service.js
- themes/index.jsx
- `tbl_users`
- app.js
- works.service.js
- contractSuspensions.service.test.js
- advanceTerms.js
- dashboard.service.js
- contracts.controller.test.js
- GeneralDashboard.jsx
- menu-items/index.js
- providers.routes.js
- DocumentManagement.jsx
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- fMoneyText
- NotificationSection/index.jsx
- cron/index.js
- updateInvoice
- permissions.constants.js
- devDependencies
- src/index.jsx
- effectivePermissions.service.js
- scripts
- app.routes.js
- `tbl_invoices`
- @mui/material
- constant.js
- decimal
- contractLiquidation.service.test.js
- `tbl_contract_type_fields`
- invoiceTerms.js
- ref_jest_globals
- scripts
- invoiceEvidence.service.js
- constants.js
- compilerOptions
- excelJS.js
- dateOnlyText
- permission
- devDependencies
- decisionReferences.guard.test.js
- WorkChartsTab.jsx
- simpleInvoiceTerms.js
- statements.routes.js
- `tbl_contract_status_history`
- withLockedTransaction
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- WorkScopeContext.jsx
- contractBalances
- MenuList/index.jsx
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- retentionTerms.js
- error.middleware.js
- contracts.service.js
- `tbl_providers`
- transaction.service.test.js
- eslint.config.mjs
- WorkCosts.jsx
- serviceWorker.jsx
- AuthForgotPassword.jsx
- `tbl_providers`
- contracts.service.test.js
- session.service.test.js
- contractPolicies.service.js
- winston.config.js
- seed.demo.js
- works.service.test.js
- extends
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- browserslist
- volta
- contractNotifications.service.test.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- authContext.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- DebouncedInput.jsx
- auth.service.test.js
- invoiceFollowUps.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- useAuth
- MainLayout/index.jsx
- contractEndDateReconciliation.service.test.js
- liquidationTerms.js
- useMenuCollapse.js
- requirePermission.middleware.test.js
- validate.middleware.test.js
- audit.service.test.js
- EasyCrop.jsx
- getEffectivePermissionIds
- `tbl_invoices`
- `tbl_invoices`
- document.service.test.js
- `tbl_statements`
- workDashboard.service.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- contractFields.js
- `tbl_works`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 150 edges
2. `react` - 117 edges
3. `showError()` - 98 edges
4. `workScopeOf()` - 84 edges
5. `writeAudit()` - 80 edges
6. `dateOnlyText()` - 79 edges
7. `useAuth()` - 79 edges
8. `withLockedTransaction()` - 77 edges
9. `moneyText()` - 71 edges
10. `showSuccess()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `selectContractFilterStages()` --calls--> `scopeWhere()`  [EXTRACTED]
  server/src/modules/work/contracts/contracts.service.js → server/src/common/services/workScope.service.js
- `getInvoiceFormOptions()` --calls--> `getContractFormOptions()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.service.js → server/src/modules/work/contracts/contracts.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `WorkView()` --indirect_call--> `previewWorkEndDateAPI()`  [INFERRED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/api/requests/worksApi.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx

## Import Cycles
- None detected.

## Communities (229 total, 109 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "MasterPage.jsx"
Cohesion: 0.08
Nodes (37): deleteProfileAPI(), paginationProfilesAPI(), reasonsApi, deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS (+29 more)

### Community 3 - "AuthenticationRoutes.jsx"
Cohesion: 0.10
Nodes (21): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.06
Nodes (77): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT (+69 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.05
Nodes (69): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoicesApi (+61 more)

### Community 8 - "workScopeOf"
Cohesion: 0.05
Nodes (84): workScopeOf(), server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_contract_pairs, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController (+76 more)

### Community 9 - "contracts.controller.js"
Cohesion: 0.05
Nodes (73): auditContext(), moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), CONTRACT_REPORTS, ACT_FIELDS (+65 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (46): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), previewContractConceptAPI(), previewContractEndDateAPI(), useEndDatePreview(), complete() (+38 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.09
Nodes (28): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0027 (+20 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.04
Nodes (102): ADR-0004, adapter, prisma, ACTIVE_STATUS, INACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay() (+94 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+13 more)

### Community 15 - "WorkContracts.jsx"
Cohesion: 0.17
Nodes (25): fPercentText(), ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter(), AdvanceLegend(), matchesAdvanceFilter(), matchesAdvanceLegend(), num (+17 more)

### Community 16 - "getIO"
Cohesion: 0.09
Nodes (25): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), getIO() (+17 more)

### Community 17 - "auth.service.js"
Cohesion: 0.06
Nodes (51): bcrypt, REDACTED, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken() (+43 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (22): ADR-0020, concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0027 (+14 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "usersApi.js"
Cohesion: 0.13
Nodes (16): getBusinessRulesAPI(), saveBusinessRulesAPI(), getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), ProfileSection(), Accordion(), findOption() (+8 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (61): ADR-0023, server_src_common_utils_money_utils_percentfor, server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_money_columns, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_percent_columns, server_src_modules_billing_invoices_contractinvoiceterms_contractdraftof, server_src_modules_billing_invoices_contractinvoiceterms_contractpairsdto (+53 more)

### Community 22 - "themes/index.jsx"
Cohesion: 0.13
Nodes (17): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useConfig(), useLocalStorage() (+9 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (52): ADR-0007, ADR-0009, writeAudit(), updateAccount(), applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections() (+44 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (23): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+15 more)

### Community 27 - "advanceTerms.js"
Cohesion: 0.15
Nodes (22): ratioPercent(), ratioText(), advanceBalances(), appliedPct(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits(), balancesDto() (+14 more)

### Community 28 - "dashboard.service.js"
Cohesion: 0.10
Nodes (41): scopeWhere(), todayDateOnly(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002 (+33 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.04
Nodes (44): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+36 more)

### Community 30 - "GeneralDashboard.jsx"
Cohesion: 0.15
Nodes (22): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, client_src_hooks_useinvoicemenus_useinvoicemenus, useSchemePalette(), headerStyle, MainCard(), AlertsCard() (+14 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.09
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 32 - "providers.routes.js"
Cohesion: 0.08
Nodes (33): canViewAllWorks(), resolveWorkScope(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController (+25 more)

### Community 33 - "DocumentManagement.jsx"
Cohesion: 0.14
Nodes (18): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+10 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "fMoneyText"
Cohesion: 0.22
Nodes (23): fMoneyText(), contractRows(), daysOpenText(), DrillDownDialog(), followUpRows(), followUpsDrill(), invoiceRows(), num (+15 more)

### Community 38 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 39 - "cron/index.js"
Cohesion: 0.11
Nodes (18): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+10 more)

### Community 40 - "updateInvoice"
Cohesion: 0.20
Nodes (20): assertStage(), assertStatement(), assertUniqueNumber(), assertWork(), auditable(), createContractInvoice(), createSimpleInvoice(), detailChanges() (+12 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.04
Nodes (73): ADR-0012, ADR-0017, ADR-0019, ADR-0025, ADR-0026, express, ADR-0011, ADR-0016 (+65 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "effectivePermissions.service.js"
Cohesion: 0.18
Nodes (14): ADR-0024, findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification() (+6 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "@mui/material"
Cohesion: 0.05
Nodes (56): getAddressTypesSelectAPI, getStatusesByScopeAPI(), ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), channelsOf(), ContactDialog() (+48 more)

### Community 51 - "constant.js"
Cohesion: 0.18
Nodes (15): appDrawerWidth, gridSpacing, CardSecondaryAction(), SubCard(), Avatar(), ContractBalanceCards(), DashboardCards(), Indicator() (+7 more)

### Community 52 - "decimal"
Cohesion: 0.13
Nodes (25): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE (+17 more)

### Community 53 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "invoiceTerms.js"
Cohesion: 0.10
Nodes (26): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+18 more)

### Community 56 - "ref_jest_globals"
Cohesion: 0.04
Nodes (42): ref_jest_globals, baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009 (+34 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "invoiceEvidence.service.js"
Cohesion: 0.14
Nodes (15): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+7 more)

### Community 59 - "constants.js"
Cohesion: 0.05
Nodes (54): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenu (+46 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "dateOnlyText"
Cohesion: 0.07
Nodes (51): ADR-0021, addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS (+43 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "decisionReferences.guard.test.js"
Cohesion: 0.09
Nodes (20): ref_fs, ref_path, ref_url, citations, DECISIONS, files(), ROOT, SELF (+12 more)

### Community 68 - "WorkChartsTab.jsx"
Cohesion: 0.10
Nodes (36): CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf(), drillLinkSx, Empty(), INVOICE_NOUN (+28 more)

### Community 70 - "simpleInvoiceTerms.js"
Cohesion: 0.17
Nodes (14): blank(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023, ADR-0026, SIMPLE_FIELDS, SIMPLE_FORMULA_VERSION (+6 more)

### Community 71 - "statements.routes.js"
Cohesion: 0.11
Nodes (25): sendExport(), exportFormatRule(), handleExport(), changeStatementStatusController, deleteStatementController, exportStatementController, getStatementController, getStatementReportController (+17 more)

### Community 88 - "withLockedTransaction"
Cohesion: 0.09
Nodes (57): backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+49 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.02
Nodes (105): addressTypesApi, constructionCompaniesApi, getConstructionCompaniesSelectAPI, cancelContractAPI(), contractLiquidationApi, contractsApi, exportContractsAPI(), getContractFilterProvidersAPI() (+97 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.08
Nodes (35): ALL, assertAnyInScope(), httpError(), managedWhere(), scopeOf(), selectMyWorks(), WORK_HEADER, changeWorkStateController (+27 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "WorkScopeContext.jsx"
Cohesion: 0.07
Nodes (41): providersApi, exportStatementAPI(), getStatementReportAPI(), statementsApi, getMyWorksSelectAPI(), pickWork(), useWorkFilterField(), useWorkScope() (+33 more)

### Community 108 - "contractBalances"
Cohesion: 0.50
Nodes (5): approvedOf(), balancesOf(), contractBalances(), contractIdsByAdvance(), contractsBalances()

### Community 112 - "MenuList/index.jsx"
Cohesion: 0.26
Nodes (8): getMenuAPI(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts, setContractMenus(), work

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.06
Nodes (84): getIdentityDocumentsSelectAPI, getInsurersSelectAPI, invoiceTransitionsApi, getPolicyTypesSelectAPI, getModulesAPI(), getProfilesAPI(), saveProfileAPI(), checkProviderIdentificationAPI() (+76 more)

### Community 117 - "export.service.js"
Cohesion: 0.05
Nodes (65): exceljs, ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile() (+57 more)

### Community 118 - "retentionTerms.js"
Cohesion: 0.22
Nodes (14): resolveDetail(), assertLiquidationCancellable(), assertRefundFits(), assertRetentionFits(), defaultRetention(), httpError(), ADR-0025, money() (+6 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.10
Nodes (28): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+20 more)

### Community 120 - "contracts.service.js"
Cohesion: 0.05
Nodes (117): ADR-0006, main(), diffFields(), newOperationId(), inScope(), FIELD_GROUPS, typeAppliesAiu(), withContractAiu() (+109 more)

### Community 123 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 124 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 125 - "WorkCosts.jsx"
Cohesion: 0.23
Nodes (12): CardTitle(), clickableChartSx, DonutWithLegend(), drillLinkSx, INVOICE_NOUN, ADR-0002, MENU_COLORS, menuColor() (+4 more)

### Community 129 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 130 - "AuthForgotPassword.jsx"
Cohesion: 0.17
Nodes (16): forgotPasswordAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), defaultColor, AnimateButton(), CustomFormControl, hasMixed() (+8 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (10): ctx, input(), ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock (+2 more)

### Community 133 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 134 - "contractPolicies.service.js"
Cohesion: 0.05
Nodes (58): ADR-0001, ref_crypto, DELETED_STATUS, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0013 (+50 more)

### Community 136 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 137 - "seed.demo.js"
Cohesion: 0.05
Nodes (64): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+56 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 151 - "expirationNotice.service.js"
Cohesion: 0.06
Nodes (42): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+34 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.18
Nodes (16): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+8 more)

### Community 154 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 155 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 156 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 157 - "contractNotifications.service.test.js"
Cohesion: 0.07
Nodes (14): payload, ALL, ADR-0002, OWN, prismaMock, forged, ADR-0013, permissionsServiceMock (+6 more)

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "authContext.jsx"
Cohesion: 0.06
Nodes (39): loginAPI(), logoutAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, instance (+31 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 181 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 183 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 194 - "withAlpha"
Cohesion: 0.16
Nodes (16): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Chip() (+8 more)

### Community 197 - "useAuth"
Cohesion: 0.06
Nodes (75): contractPoliciesApi, exportContractAPI(), useAuth(), ContactsList(), ADR-0009, DataList(), Figure(), Pending() (+67 more)

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.16
Nodes (21): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), Footer(), Header(), ThemeModeSection(), MainLayout() (+13 more)

### Community 199 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 201 - "liquidationTerms.js"
Cohesion: 0.14
Nodes (13): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+5 more)

### Community 212 - "getEffectivePermissionIds"
Cohesion: 0.06
Nodes (40): getEffectivePermissionIds(), hasEffectivePermission(), assertModeUnchangedInUse(), httpError(), ADR-0010, providerTypesConfig, providerTypesService, getDashboardSummaryController (+32 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "workDashboard.service.js"
Cohesion: 0.05
Nodes (92): ADR-0011, moneyText(), percentText(), sumMoney(), ADVANCE_LEVELS, advanceBar(), advanceLevel(), alertsOf() (+84 more)

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (5): assertInvoiceVisible, ctx, prismaMock, SCOPE, state

### Community 221 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 222 - "contractFields.js"
Cohesion: 0.13
Nodes (15): AIU_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, ADR-0026 (+7 more)

## Knowledge Gaps
- **1136 isolated node(s):** `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS`, `NO_FIELDS`, `STATUS_TABS`, `CONTRACT_ALERT_OPTIONS` (+1131 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1574 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **109 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **Why does `ADR-0012` connect `permissions.constants.js` to `providers.routes.js`, `showError`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `react` connect `@mui/material` to `MasterPage.jsx`, `AuthenticationRoutes.jsx`, `AuthForgotPassword.jsx`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `client/package.json`, `WorkContracts.jsx`, `usersApi.js`, `themes/index.jsx`, `GeneralDashboard.jsx`, `menu-items/index.js`, `DocumentManagement.jsx`, `fMoneyText`, `NotificationSection/index.jsx`, `authContext.jsx`, `DebouncedInput.jsx`, `constants.js`, `WorkChartsTab.jsx`, `useAuth`, `MainLayout/index.jsx`, `useMenuCollapse.js`, `EasyCrop.jsx`, `MainRoutes.jsx`, `WorkScopeContext.jsx`, `MenuList/index.jsx`, `showError`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **What connects `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS`, `NO_FIELDS` to the rest of the system?**
  _1136 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `MasterPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08140610545790934 - nodes in this community are weakly interconnected._
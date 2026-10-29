# Graph Report - WEBPAC-INTERVE  (2026-10-29)

## Corpus Check
- 697 files · ~407,898 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4395 nodes · 12479 edges · 248 communities (138 shown, 110 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 162 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b5792a71`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- WorkContracts.jsx
- providers.routes.js
- dependencies
- server/package.json
- providers.service.js
- constants.js
- invoices.routes.js
- InvoiceFormPage.jsx
- ConceptDialog.jsx
- contracts.controller.js
- auditContext
- statements.service.js
- client/package.json
- @mui/material
- usersApi.js
- workDashboard.service.js
- invoices.service.test.js
- compilerOptions
- main.routes.js
- invoices.service.js
- contractInvoiceTerms.js
- `tbl_users`
- App.jsx
- contracts.service.js
- contractConcepts.service.test.js
- AuthForgotPassword.jsx
- contractPolicies.service.js
- contracts.controller.test.js
- writeAudit
- menu-items/index.js
- WorkScopeContext.jsx
- showError
- `tbl_contract_concepts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- WorkChartsTab.jsx
- contracts.routes.js
- cron/index.js
- works.service.js
- auth.service.js
- devDependencies
- workScopeOf
- handleFirebase.js
- scripts
- app.js
- `tbl_contracts`
- StatementReportDialog.jsx
- GeneralDashboard.jsx
- decimal
- dateOnlyText
- `tbl_contract_type_fields`
- ContactsEditor.jsx
- transaction.mock.js
- scripts
- WorkSummaryTab.jsx
- simpleInvoiceTerms.js
- compilerOptions
- excelJS.js
- permissions.constants.js
- permission
- devDependencies
- ref_fs
- audit.service.js
- seed.demo.js
- contractEndDateReconciliation.service.test.js
- `tbl_contract_status_history`
- invoiceTerms.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- session.service.js
- statements.service.test.js
- notifications.service.js
- `tbl_works`
- `tbl_policies`
- ContractDetailPage.jsx
- export.service.js
- works.service.test.js
- error.middleware.js
- getEffectivePermissionIds
- `tbl_providers`
- advanceFilters.js
- balanceReconciliation.service.js
- providerTypes.routes.js
- contractSuspensions.service.test.js
- themes/index.jsx
- `tbl_providers`
- liquidationTerms.js
- ci-summary.mjs
- getIO
- WorkCosts.jsx
- contractFields.js
- invoiceFollowUps.service.test.js
- MenuList/index.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- src/index.jsx
- `tbl_user_permissions`
- validation.utils.js
- mailerService.js
- health.service.js
- workScope.service.js
- importCase.guard.test.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_users`
- balanceReconciliation.service.test.js
- serviceWorker.jsx
- socket.manager.js
- formatTime.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- WorkPoliciesTab.jsx
- MainLayout/index.jsx
- auth.service.test.js
- users.controller.js
- dashboardDetail.service.test.js
- seed.js
- session.service.test.js
- funciones.js
- ref_jest_globals
- contractReports.service.js
- `tbl_invoices`
- `tbl_invoices`
- users.service.js
- `tbl_statements`
- invoiceEvidence.service.js
- invoiceGlosses.service.test.js
- floatingPoint.guard.test.js
- uniqueConstraints.constants.test.js
- contractReports.service.test.js
- transaction.service.test.js
- extends
- `tbl_works`
- contractNotifications.service.test.js
- `tbl_status`
- users.service.test.js
- NotificationSection/index.jsx
- `tbl_users`
- `tbl_work_stages`
- browserslist
- winston.config.js
- master.service.test.js
- expirationNotice.service.test.js
- EasyCrop.jsx
- `tbl_invoice_status_history`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 153 edges
2. `react` - 119 edges
3. `showError()` - 103 edges
4. `workScopeOf()` - 92 edges
5. `moneyText()` - 87 edges
6. `dateOnlyText()` - 86 edges
7. `writeAudit()` - 80 edges
8. `useAuth()` - 79 edges
9. `withLockedTransaction()` - 77 edges
10. `fMoneyText()` - 67 edges

## Surprising Connections (you probably didn't know these)
- `WorkView()` --indirect_call--> `previewWorkEndDateAPI()`  [INFERRED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/api/requests/worksApi.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `balances()` --calls--> `advanceBalances()`  [EXTRACTED]
  server/test/modules/billing/invoices/advanceFilters.test.js → server/src/modules/billing/invoices/advanceTerms.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx

## Import Cycles
- None detected.

## Communities (248 total, 110 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "WorkContracts.jsx"
Cohesion: 0.15
Nodes (29): useSchemePalette(), AlertChips(), fPercentText(), ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter(), AdvanceLegend(), matchesAdvanceFilter() (+21 more)

### Community 3 - "providers.routes.js"
Cohesion: 0.09
Nodes (30): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+22 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.04
Nodes (44): @azure/identity, bcrypt, compression, cross-env, dayjs, @eslint/js, excel4node, fs-extra (+36 more)

### Community 6 - "providers.service.js"
Cohesion: 0.07
Nodes (70): containsFilter(), dateRangeFilter(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS, identificationError(), invoiceListQuery() (+62 more)

### Community 7 - "constants.js"
Cohesion: 0.04
Nodes (69): contractsApi, exportContractsAPI(), getContractMenuAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), invoicesApi, client_src_hooks_useinvoicemenus (+61 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.04
Nodes (92): moneyRule(), percentRule(), CONTRACT_PAIRS, CONTRACT_TAX_FIELDS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController (+84 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (60): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, ADR-0017 (+52 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (48): contractConceptsApi, contractLiquidationApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006 (+40 more)

### Community 11 - "contracts.controller.js"
Cohesion: 0.07
Nodes (41): sendExport(), handleExport(), handleExport(), getContractMenu(), toMenuDto(), ACT_FIELDS, cancelContractController, cancelPolicyController (+33 more)

### Community 12 - "auditContext"
Cohesion: 0.09
Nodes (30): THEME_MODES, auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController() (+22 more)

### Community 13 - "statements.service.js"
Cohesion: 0.08
Nodes (49): resolvePagination(), toInt(), GLOSS_FIELD_NAMES, statementsGlosses(), statementsWithGlosses(), paginationInvoices(), statementInvoices(), statementsInvoices() (+41 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (33): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+25 more)

### Community 15 - "@mui/material"
Cohesion: 0.06
Nodes (50): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+42 more)

### Community 16 - "usersApi.js"
Cohesion: 0.13
Nodes (16): getBusinessRulesAPI(), saveBusinessRulesAPI(), getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), ProfileSection(), Accordion(), findOption() (+8 more)

### Community 17 - "workDashboard.service.js"
Cohesion: 0.11
Nodes (41): ADR-0002, ADR-0011, moneyText(), sumMoney(), ADVANCE_LEVELS, advanceBar(), advanceLevel(), alertsOf() (+33 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (22): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+14 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "main.routes.js"
Cohesion: 0.05
Nodes (44): express, supertest, STATUS_KEYS, verifyToken(), validate(), createMasterControllers(), createMasterRouter(), defineContacts() (+36 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.05
Nodes (92): ADR-0021, ADR-0023, ADR-0026, billingBalances(), isBillingType(), CONTRACT_TAX_MONEY_COLUMNS, CONTRACT_TAX_PERCENT_COLUMNS, server_src_modules_billing_invoices_invoicemenus_issimplemode (+84 more)

### Community 22 - "contractInvoiceTerms.js"
Cohesion: 0.10
Nodes (41): ref_node_fs, percentOf(), percentText(), toMoney(), toPercent(), assertContractTotal(), blank(), composeContractInvoice() (+33 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "App.jsx"
Cohesion: 0.21
Nodes (10): refreshSession(), App(), ThemedToastContainer(), AuthContext, NavigationScroll(), SocketProvider(), ThemeCustomization(), Typography() (+2 more)

### Community 25 - "contracts.service.js"
Cohesion: 0.04
Nodes (82): ADR-0006, inScope(), scopeOf(), server_src_common_utils_money_utils_percentfor, FIELD_GROUPS, typeAppliesAiu(), contractsWithPendingAdvanceWhere(), daysBetween() (+74 more)

### Community 26 - "contractConcepts.service.test.js"
Cohesion: 0.06
Nodes (25): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+17 more)

### Community 27 - "AuthForgotPassword.jsx"
Cohesion: 0.07
Nodes (39): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), client_src_assets_images_interadminpro, AuthProvider() (+31 more)

### Community 28 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (97): newOperationId(), withContractAiu(), ADR-0017, REASON_SCOPES, reasonsService, assertContractStillAdmits(), createContractInvoice(), CANCEL_TARGET (+89 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.04
Nodes (44): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+36 more)

### Community 30 - "writeAudit"
Cohesion: 0.08
Nodes (73): diffFields(), writeAudit(), withLockedTransaction(), updateAccount(), glossFieldFor(), assertNotCancelled(), auditable(), AUDITED (+65 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 32 - "WorkScopeContext.jsx"
Cohesion: 0.07
Nodes (37): paginationStatementGroupsAPI(), getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, RETRY_503_HINT, pickWork(), useWorkFilterField() (+29 more)

### Community 33 - "showError"
Cohesion: 0.05
Nodes (98): cancelContractAPI(), contractPoliciesApi, suspendContractAPI(), getIdentityDocumentsSelectAPI, getInsurersSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI (+90 more)

### Community 34 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "WorkChartsTab.jsx"
Cohesion: 0.09
Nodes (44): glossRows(), advanceDrill(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf(), drillLinkSx (+36 more)

### Community 38 - "contracts.routes.js"
Cohesion: 0.08
Nodes (38): optionalDate(), contractsRoutes, ADR-0006, ADR-0016, ADR-0017, ADR-0018, cancelContractSchema, cancelPolicySchema (+30 more)

### Community 39 - "cron/index.js"
Cohesion: 0.11
Nodes (17): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+9 more)

### Community 40 - "works.service.js"
Cohesion: 0.06
Nodes (71): ADR-0007, ADR-0009, assertInScope(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel() (+63 more)

### Community 41 - "auth.service.js"
Cohesion: 0.13
Nodes (23): REDACTED, backoff(), runTransaction(), withTransaction(), deriveKey(), generateResetCode(), hashResetCode(), ADR-0001 (+15 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "workScopeOf"
Cohesion: 0.12
Nodes (29): workScopeOf(), STATEMENT_GLOSS_FILTERS, STATEMENT_VOUCHER_FILTERS, changeStatementStatusController, deleteStatementController, exportStatementController, exportStatementGroupController, getStatementController (+21 more)

### Community 45 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 46 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+11 more)

### Community 48 - "app.js"
Cohesion: 0.21
Nodes (9): cookie-parser, cors, express-fileupload, express-rate-limit, __dirname, cleanData(), cleanRequestData(), authRateLimit (+1 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (11): `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_work_provider_types`, `tbl_contract_types` (+3 more)

### Community 50 - "StatementReportDialog.jsx"
Cohesion: 0.15
Nodes (20): exportStatementGroupAPI(), getStatementGroupReportAPI(), download(), downloadExport(), errorMessage(), EXPORT_FORMATS, ExportButton(), ExportDialog() (+12 more)

### Community 51 - "GeneralDashboard.jsx"
Cohesion: 0.13
Nodes (29): getDashboardDetailAPI(), getDashboardSummaryAPI(), ADR-0002, useWorkScope(), client_src_hooks_useinvoicemenus_useinvoicemenus, MainCard(), AlertsCard(), Empty() (+21 more)

### Community 52 - "decimal"
Cohesion: 0.08
Nodes (51): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent() (+43 more)

### Community 53 - "dateOnlyText"
Cohesion: 0.07
Nodes (67): DELETED_STATUS, scopeWhere(), dateOnlyText(), todayDateOnly(), policyExpiringDays(), insuredValue(), policyBaseValue(), contractsBlock() (+59 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkSummaryTab.jsx"
Cohesion: 0.21
Nodes (22): contractRows(), daysOpenText(), DrillDownDialog(), followUpRows(), followUpsDrill(), invoiceRows(), num, useDrillDown() (+14 more)

### Community 59 - "simpleInvoiceTerms.js"
Cohesion: 0.15
Nodes (18): previewSimpleInvoice(), blank(), composeSimpleInvoice(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023, ADR-0026 (+10 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "permissions.constants.js"
Cohesion: 0.06
Nodes (37): ADR-0012, ADR-0019, ADR-0025, ADR-0011, ADR-0016, ADR-0018, PERMISSIONS, nitField() (+29 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, @eslint/js, globals, jest, nodemon, pm2, prisma (+1 more)

### Community 66 - "ref_fs"
Cohesion: 0.11
Nodes (15): ref_fs, ref_url, citations, DECISIONS, files(), ROOT, SELF, SOURCES (+7 more)

### Community 68 - "audit.service.js"
Cohesion: 0.04
Nodes (58): ADR-0001, ref_crypto, adapter, prisma, ACTIVE_STATUS, INACTIVE_STATUS, AUDIT_ENTITIES, auditMisuse() (+50 more)

### Community 70 - "seed.demo.js"
Cohesion: 0.05
Nodes (57): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+49 more)

### Community 71 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 88 - "invoiceTerms.js"
Cohesion: 0.11
Nodes (23): assertTransition(), cancelTransitionFor(), GLOSS_FILTER_NAMES, GLOSS_FILTERS, glossWhere(), historyRow(), httpError(), INVOICE_ALERT_NAMES (+15 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.02
Nodes (114): addressTypesApi, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI() (+106 more)

### Community 100 - "works.routes.js"
Cohesion: 0.09
Nodes (32): exportFormatRule(), changeWorkStateController, changeWorkStatusController, deleteWorkController, exportWorksController, getWorkController, INPUT_FIELDS, notify() (+24 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "session.service.js"
Cohesion: 0.15
Nodes (18): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+10 more)

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "notifications.service.js"
Cohesion: 0.18
Nodes (16): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+8 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "ContractDetailPage.jsx"
Cohesion: 0.05
Nodes (105): getStatusesByScopeAPI(), exportContractAPI(), useSocket(), SubCard(), ActionButton(), toneOf(), ConfirmDialog(), ContactsList() (+97 more)

### Community 117 - "export.service.js"
Cohesion: 0.10
Nodes (44): addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcelDocument(), buildPdf(), buildPdfDocument(), CELL_BORDER (+36 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.08
Nodes (18): exceljs, COLUMNS, ROWS, contract, contractBalances, contractInvoicesForReport, getContract, getContractPolicies (+10 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.19
Nodes (18): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0012 (+10 more)

### Community 120 - "getEffectivePermissionIds"
Cohesion: 0.07
Nodes (34): captured, explain(), main(), measure(), parseParams(), percentile(), plain(), requirePermission() (+26 more)

### Community 123 - "advanceFilters.js"
Cohesion: 0.13
Nodes (15): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+7 more)

### Community 124 - "balanceReconciliation.service.js"
Cohesion: 0.25
Nodes (11): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), contractBalanceReconciliationJob, insertNotification(), balanceViolations(), CHECKS (+3 more)

### Community 125 - "providerTypes.routes.js"
Cohesion: 0.16
Nodes (14): FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, getProviderTypeFieldsSchema, saveProviderTypeFieldsSchema, providerTypesRoutes, assertModeUnchangedInUse() (+6 more)

### Community 129 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 130 - "themes/index.jsx"
Cohesion: 0.15
Nodes (14): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useConfig(), useLocalStorage() (+6 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "liquidationTerms.js"
Cohesion: 0.14
Nodes (13): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+5 more)

### Community 133 - "ci-summary.mjs"
Cohesion: 0.22
Nodes (14): args, buildSection(), cell(), COLORS, kb(), lintSection(), number(), pie() (+6 more)

### Community 134 - "getIO"
Cohesion: 0.18
Nodes (12): getIO(), configurePolicyTypeBaseController, deleteProfileController(), getModulesController(), ADR-0027, paginationProfilesController(), saveProfileController(), profilesRoutes (+4 more)

### Community 136 - "WorkCosts.jsx"
Cohesion: 0.18
Nodes (11): ADR-0002, CardTitle(), clickableChartSx, drillLinkSx, INVOICE_NOUN, ADR-0002, MENU_COLORS, menuColor() (+3 more)

### Community 137 - "contractFields.js"
Cohesion: 0.13
Nodes (15): AIU_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, ADR-0026 (+7 more)

### Community 140 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 142 - "MenuList/index.jsx"
Cohesion: 0.26
Nodes (8): getMenuAPI(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts, setContractMenus(), work

### Community 151 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 153 - "validation.utils.js"
Cohesion: 0.09
Nodes (28): express-validator, EDITABLE_STATUS_VALUES, IDEMPOTENCY_HEADER, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+20 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 155 - "health.service.js"
Cohesion: 0.33
Nodes (5): DB_TIMEOUT_MS, getHealth(), SERVICE_NAME, withTimeout(), prismaMock

### Community 156 - "workScope.service.js"
Cohesion: 0.18
Nodes (13): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), managedWhere(), resolveWorkScope(), selectMyWorks(), WORK_HEADER (+5 more)

### Community 157 - "importCase.guard.test.js"
Cohesion: 0.18
Nodes (15): ref_child_process, clientRoots, entries(), files(), gitMismatches, listing, lookup(), mismatches (+7 more)

### Community 159 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "expirationNotice.service.js"
Cohesion: 0.15
Nodes (22): getBusinessRulesController, saveBusinessRulesController, contractAlertWheres(), CLOSED_STATES, POLICY_ALERTS, addDays(), alreadyNotified(), buildNotices() (+14 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.23
Nodes (9): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoice_glosses`, `tbl_invoices` (+1 more)

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 181 - "socket.manager.js"
Cohesion: 0.23
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 183 - "formatTime.js"
Cohesion: 0.14
Nodes (12): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+4 more)

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
Cohesion: 0.14
Nodes (18): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Chip() (+10 more)

### Community 197 - "WorkPoliciesTab.jsx"
Cohesion: 0.12
Nodes (22): getWorkDashboardAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), Avatar(), DashboardCards(), Indicator(), ADR-0002 (+14 more)

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.12
Nodes (26): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), updateThemeModeAPI(), setParentOpenedMenu(), useMenuCollapse(), Footer() (+18 more)

### Community 199 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 201 - "users.controller.js"
Cohesion: 0.32
Nodes (7): revokeSession(), countUsersController(), deleteUserController(), ADR-0001, ADR-0027, paginationUsersController(), saveUserController()

### Community 202 - "dashboardDetail.service.test.js"
Cohesion: 0.25
Nodes (4): ALL, EVERYTHING, OWN, prismaMock

### Community 203 - "seed.js"
Cohesion: 0.11
Nodes (17): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+9 more)

### Community 204 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 206 - "funciones.js"
Cohesion: 0.29
Nodes (4): comparePassword(), hashPassword(), restorePassword(), updatePassword()

### Community 211 - "ref_jest_globals"
Cohesion: 0.05
Nodes (21): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, payload, ALL, ADR-0002 (+13 more)

### Community 212 - "contractReports.service.js"
Cohesion: 0.08
Nodes (41): buildExcel(), findExportRows(), renderExport(), server_src_modules_billing_invoices_invoicemenus_iscontractmode, contractInvoicesForReport(), exportInvoices(), ADVANCE_COLUMNS, authored() (+33 more)

### Community 217 - "users.service.js"
Cohesion: 0.06
Nodes (54): ADR-0004, AUDIT_OPERATIONS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint() (+46 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "invoiceEvidence.service.js"
Cohesion: 0.14
Nodes (15): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+7 more)

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (6): assertInvoiceVisible, ctx, getInvoice, prismaMock, SCOPE, state

### Community 221 - "floatingPoint.guard.test.js"
Cohesion: 0.29
Nodes (5): ALLOWED, files(), lines, SRC, text()

### Community 222 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 224 - "contractReports.service.test.js"
Cohesion: 0.33
Nodes (3): concept(), contract(), prismaMock

### Community 226 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 227 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 233 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 235 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 237 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 241 - "browserslist"
Cohesion: 0.27
Nodes (6): browserslist, development, production, volta, node, yarn

### Community 242 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 243 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 244 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 251 - "`tbl_invoice_status_history`"
Cohesion: 0.50
Nodes (3): `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`

## Knowledge Gaps
- **1199 isolated node(s):** `COLORS`, `RULE_COLORS`, `args`, `sections`, `axios` (+1194 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1645 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **110 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0012` connect `permissions.constants.js` to `providers.routes.js`, `ContractDetailPage.jsx`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `WorkContracts.jsx`, `themes/index.jsx`, `server/package.json`, `constants.js`, `WorkCosts.jsx`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `client/package.json`, `MenuList/index.jsx`, `usersApi.js`, `App.jsx`, `AuthForgotPassword.jsx`, `WorkScopeContext.jsx`, `showError`, `WorkChartsTab.jsx`, `StatementReportDialog.jsx`, `GeneralDashboard.jsx`, `ContactsEditor.jsx`, `formatTime.js`, `WorkSummaryTab.jsx`, `withAlpha`, `WorkPoliciesTab.jsx`, `MainLayout/index.jsx`, `useAuth`, `NotificationSection/index.jsx`, `ContractDetailPage.jsx`, `EasyCrop.jsx`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **What connects `COLORS`, `RULE_COLORS`, `args` to the rest of the system?**
  _1199 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `providers.routes.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08902439024390243 - nodes in this community are weakly interconnected._
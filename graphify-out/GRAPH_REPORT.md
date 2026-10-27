# Graph Report - WEBPAC-INTERVE  (2026-10-27)

## Corpus Check
- 674 files · ~379,744 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4142 nodes · 11706 edges · 229 communities (126 shown, 103 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 156 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ccd2459c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- NewProviderDialog.jsx
- AuthenticationRoutes.jsx
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- contracts.routes.js
- ConceptDialog.jsx
- validation.utils.js
- auth.routes.js
- status.constants.js
- client/package.json
- fMoneyText
- main.routes.js
- auth.service.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- themes/index.jsx
- `tbl_users`
- app.js
- works.service.js
- contractSuspensions.service.test.js
- formatTime.js
- dashboard.service.js
- invoices.controller.test.js
- GeneralDashboard.jsx
- advanceFilters.js
- providers.routes.js
- DocumentManagement.jsx
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- statements.service.js
- NotificationSection/index.jsx
- cron/index.js
- updateInvoice
- permissions.constants.js
- devDependencies
- src/index.jsx
- contractEndDateReconciliation.service.js
- scripts
- app.routes.js
- `tbl_invoices`
- @mui/material
- seed.js
- decimal
- ref_jest_globals
- `tbl_contract_type_fields`
- invoiceTerms.js
- transaction.mock.js
- scripts
- contracts.controller.test.js
- constants.js
- compilerOptions
- excelJS.js
- contracts.service.js
- permission
- devDependencies
- transaction.service.test.js
- WorkChartsTab.jsx
- simpleInvoiceTerms.js
- statements.routes.js
- `tbl_contract_status_history`
- writeAudit
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- httpCliente.js
- workScopeOf
- MenuList/index.jsx
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- uniqueConstraints.constants.test.js
- error.middleware.js
- contractPolicies.service.js
- `tbl_providers`
- error.middleware.test.js
- addressTypes.service.js
- ContactsEditor.jsx
- serviceWorker.jsx
- AuthForgotPassword.jsx
- `tbl_providers`
- socket.js
- contractConcepts.service.test.js
- audit.service.js
- contractReports.service.js
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
- App.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- dashboard.measure.js
- auth.service.test.js
- invoiceFollowUps.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- ContractDetailPage.jsx
- MainLayout/index.jsx
- contractEndDateReconciliation.service.test.js
- liquidationTerms.js
- decisionReferences.guard.test.js
- floatingPoint.guard.test.js
- policyTypes.service.test.js
- users.service.test.js
- EasyCrop.jsx
- app.service.js
- `tbl_invoices`
- `tbl_invoices`
- `tbl_statements`
- workDashboard.service.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- contractFields.js
- statements.service.test.js
- `tbl_works`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 149 edges
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
- `getUserPermissions()` --calls--> `getEffectivePermissionIds()`  [EXTRACTED]
  server/src/modules/app/general/app.service.js → server/src/common/services/effectivePermissions.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `getInvoiceFormOptions()` --calls--> `getContractFormOptions()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.service.js → server/src/modules/work/contracts/contracts.service.js
- `balances()` --calls--> `advanceBalances()`  [EXTRACTED]
  server/test/modules/billing/invoices/advanceFilters.test.js → server/src/modules/billing/invoices/advanceTerms.js

## Import Cycles
- None detected.

## Communities (229 total, 103 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "NewProviderDialog.jsx"
Cohesion: 0.08
Nodes (39): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, getProviderTypeFieldsAPI() (+31 more)

### Community 3 - "AuthenticationRoutes.jsx"
Cohesion: 0.11
Nodes (21): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.04
Nodes (44): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+36 more)

### Community 6 - "providers.service.js"
Cohesion: 0.07
Nodes (68): containsFilter(), filtersWhere(), idFilter(), userFullName(), identificationError(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate() (+60 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (53): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, ADR-0017 (+45 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.04
Nodes (71): server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_contract_pairs, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, closeInvoiceFollowUpController, deleteInvoiceFollowUpController, deleteInvoiceGlossController, exportInvoicesController (+63 more)

### Community 9 - "contracts.routes.js"
Cohesion: 0.07
Nodes (43): moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), previewContractConceptController, ADR-0006, ADR-0016 (+35 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.06
Nodes (58): getConstructionCompaniesSelectAPI, contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), previewContractConceptAPI(), previewContractEndDateAPI(), getContractTypesSelectAPI (+50 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.11
Nodes (22): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+14 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "status.constants.js"
Cohesion: 0.04
Nodes (71): ADR-0001, ADR-0004, ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay() (+63 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (33): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+25 more)

### Community 15 - "fMoneyText"
Cohesion: 0.10
Nodes (33): contractPoliciesApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, InvoiceDetailPage, fMoneyText(), fPercentText(), InvoiceDetailPanel(), CONTRACT_CAPTURED (+25 more)

### Community 16 - "main.routes.js"
Cohesion: 0.05
Nodes (57): express, getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers() (+49 more)

### Community 17 - "auth.service.js"
Cohesion: 0.10
Nodes (28): bcrypt, REDACTED, backoff(), runTransaction(), withTransaction(), comparePassword(), hashPassword(), deriveKey() (+20 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (22): ADR-0020, concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0027 (+14 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (77): ADR-0023, invoiceAdvanceWhere(), isBillingType(), server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_money_columns, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_percent_columns, server_src_modules_billing_invoices_contractinvoiceterms_contractdraftof (+69 more)

### Community 22 - "themes/index.jsx"
Cohesion: 0.15
Nodes (13): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage(), createCustomShadow() (+5 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (66): ADR-0007, assertInScope(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel() (+58 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.05
Nodes (27): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+19 more)

### Community 27 - "formatTime.js"
Cohesion: 0.10
Nodes (14): exportStatementAPI(), getStatementReportAPI(), statementsApi, StatementsPage, SHORT_MONTHS, GLOSS_COLUMNS, GlossesSection(), INVOICE_COLUMNS (+6 more)

### Community 28 - "dashboard.service.js"
Cohesion: 0.07
Nodes (50): scopeOf(), scopeWhere(), policyExpiringDays(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock(), invoicesWhere() (+42 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "GeneralDashboard.jsx"
Cohesion: 0.09
Nodes (40): getDashboardSummaryAPI(), client_src_hooks_useinvoicemenus_useinvoicemenus, appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard() (+32 more)

### Community 31 - "advanceFilters.js"
Cohesion: 0.13
Nodes (15): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, isAdvance, ADR-0024 (+7 more)

### Community 32 - "providers.routes.js"
Cohesion: 0.09
Nodes (25): ASSIGNMENT_FIELDS, assignProviderController, checkIdentificationController, getProviderController, INPUT_FIELDS, notifyAssignment(), paginationWorkProvidersController, pick() (+17 more)

### Community 33 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "statements.service.js"
Cohesion: 0.15
Nodes (28): assertUniqueNumber(), assertValues(), auditable(), AUDITED, changeStatementStatus(), createStatement(), deleteStatement(), exportStatement() (+20 more)

### Community 38 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 39 - "cron/index.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+8 more)

### Community 40 - "updateInvoice"
Cohesion: 0.19
Nodes (26): approveInvoice(), assertContractAdmitsCancel(), assertStage(), assertStatement(), assertUniqueNumber(), assertWork(), auditable(), cancelInvoice() (+18 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (42): ADR-0012, ADR-0017, ADR-0019, ADR-0025, ADR-0026, ADR-0011, ADR-0016, ADR-0018 (+34 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "contractEndDateReconciliation.service.js"
Cohesion: 0.19
Nodes (16): ADR-0015, ADR-0024, findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations() (+8 more)

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
Cohesion: 0.04
Nodes (65): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), getWorksSummaryAPI(), filterParams(), isEmptyValue(), NO_FILTERS (+57 more)

### Community 51 - "seed.js"
Cohesion: 0.11
Nodes (17): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+9 more)

### Community 52 - "decimal"
Cohesion: 0.08
Nodes (54): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent() (+46 more)

### Community 53 - "ref_jest_globals"
Cohesion: 0.05
Nodes (23): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+15 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "invoiceTerms.js"
Cohesion: 0.10
Nodes (27): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+19 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (33): baseConfig, config, prismaMock, service, dbUser, mockDisconnectSockets, mockIn, prismaMock (+25 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 59 - "constants.js"
Cohesion: 0.04
Nodes (69): contractsApi, exportContractAPI(), exportContractsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractMenuAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI() (+61 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "contracts.service.js"
Cohesion: 0.04
Nodes (81): ADR-0021, inScope(), server_src_common_utils_money_utils_percentfor, FIELD_GROUPS, typeAppliesAiu(), contractsWithPendingAdvanceWhere(), getInvoice(), advanceWhereOf() (+73 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.13
Nodes (13): ref_fs, ref_path, ref_url, catalog, expected, prismaMock, ADR-0027, loggerMock (+5 more)

### Community 68 - "WorkChartsTab.jsx"
Cohesion: 0.05
Nodes (100): useSchemePalette(), chipBg(), chipText(), StatusTabs(), PolicyStatusCard(), ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter() (+92 more)

### Community 70 - "simpleInvoiceTerms.js"
Cohesion: 0.20
Nodes (13): toPercent(), blank(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023, ADR-0026, SIMPLE_FORMULA_VERSION (+5 more)

### Community 71 - "statements.routes.js"
Cohesion: 0.14
Nodes (20): exportFormatRule(), changeStatementStatusController, deleteStatementController, exportStatementController, getStatementController, getStatementReportController, notify(), paginationStatementsController (+12 more)

### Community 88 - "writeAudit"
Cohesion: 0.11
Nodes (52): diffFields(), writeAudit(), withLockedTransaction(), updateAccount(), assertNotCancelled(), auditable(), AUDITED, closeFollowUp() (+44 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (92): constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), policyTypesApi, reasonsApi, supervisionTypesApi (+84 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.08
Nodes (33): sendExport(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), managedWhere(), resolveWorkScope(), selectMyWorks() (+25 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "httpCliente.js"
Cohesion: 0.07
Nodes (36): getWorkDashboardAPI(), ADR-0002, getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, RETRY_503_HINT, pickWork() (+28 more)

### Community 108 - "workScopeOf"
Cohesion: 0.08
Nodes (63): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, approveInvoiceController, cancelInvoiceController (+55 more)

### Community 112 - "MenuList/index.jsx"
Cohesion: 0.18
Nodes (13): getMenuAPI(), useConfig(), ElevationScroll(), HorizontalBar(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus (+5 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.06
Nodes (79): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), contractLiquidationApi, ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+71 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (51): exceljs, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+43 more)

### Community 118 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (92): AUDIT_ENTITIES, AUDIT_OPERATIONS, newOperationId(), withContractAiu(), ADR-0017, REASON_SCOPES, reasonsService, assertContractStillAdmits() (+84 more)

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 125 - "ContactsEditor.jsx"
Cohesion: 0.28
Nodes (11): addressTypesApi, getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009 (+3 more)

### Community 129 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 130 - "AuthForgotPassword.jsx"
Cohesion: 0.15
Nodes (20): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider() (+12 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 133 - "contractConcepts.service.test.js"
Cohesion: 0.17
Nodes (6): ctx, ADR-0016, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 134 - "audit.service.js"
Cohesion: 0.07
Nodes (35): ref_crypto, adapter, describeTarget(), prisma, testConnection(), auditMisuse(), buildRows(), ADR-0013 (+27 more)

### Community 136 - "contractReports.service.js"
Cohesion: 0.07
Nodes (49): findExportRows(), percentOf(), insuredValue(), ADR-0019, ADR-0026, policyBaseValue(), server_src_modules_billing_invoices_invoicemenus_iscontractmode, contractInvoicesForReport() (+41 more)

### Community 137 - "seed.demo.js"
Cohesion: 0.05
Nodes (57): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+49 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 151 - "expirationNotice.service.js"
Cohesion: 0.12
Nodes (26): todayDateOnly(), getBusinessRulesController, saveBusinessRulesController, getBusinessRules(), getRuleValues(), listTabsOf(), contractListQuery(), addDays() (+18 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.35
Nodes (10): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), getNotificationCount(), listNotifications(), markAllAsRead(), markAsRead() (+2 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 155 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 156 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 157 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "App.jsx"
Cohesion: 0.27
Nodes (8): refreshSession(), App(), ThemedToastContainer(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "dashboard.measure.js"
Cohesion: 0.36
Nodes (8): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain()

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
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 197 - "ContractDetailPage.jsx"
Cohesion: 0.07
Nodes (68): getStatusesByScopeAPI(), changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, ContactsList(), ADR-0009, DataList() (+60 more)

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.13
Nodes (26): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), Footer(), Header() (+18 more)

### Community 199 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 201 - "liquidationTerms.js"
Cohesion: 0.14
Nodes (13): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+5 more)

### Community 202 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 203 - "floatingPoint.guard.test.js"
Cohesion: 0.29
Nodes (5): ALLOWED, files(), lines, SRC, text()

### Community 204 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 206 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 212 - "app.service.js"
Cohesion: 0.07
Nodes (29): assertModeUnchangedInUse(), httpError(), ADR-0010, providerTypesConfig, providerTypesService, getMenu(), getPagesMenu(), getSessionInfo() (+21 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "workDashboard.service.js"
Cohesion: 0.10
Nodes (45): ADR-0011, moneyText(), percentText(), sumMoney(), ADVANCE_LEVELS, advanceBar(), advanceLevel(), balancesOf() (+37 more)

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (5): assertInvoiceVisible, ctx, prismaMock, SCOPE, state

### Community 221 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 222 - "contractFields.js"
Cohesion: 0.13
Nodes (15): AIU_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, ADR-0026 (+7 more)

### Community 223 - "statements.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, OTHER, OWN, prismaMock, state

## Knowledge Gaps
- **1135 isolated node(s):** `num`, `swatchSx`, `num`, `RUNNING_STATES`, `SORTS` (+1130 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1573 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **103 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0015` connect `contractEndDateReconciliation.service.js` to `contractPolicies.service.js`, `constants.js`?**
  _High betweenness centrality (0.196) - this node is a cross-community bridge._
- **Why does `ADR-0012` connect `permissions.constants.js` to `providers.routes.js`, `NewProviderDialog.jsx`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `AuthForgotPassword.jsx`, `AuthenticationRoutes.jsx`, `NewProviderDialog.jsx`, `server/package.json`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `client/package.json`, `fMoneyText`, `themes/index.jsx`, `formatTime.js`, `GeneralDashboard.jsx`, `DocumentManagement.jsx`, `NotificationSection/index.jsx`, `App.jsx`, `constants.js`, `withAlpha`, `WorkChartsTab.jsx`, `ContractDetailPage.jsx`, `MainLayout/index.jsx`, `EasyCrop.jsx`, `useAuth`, `httpCliente.js`, `MenuList/index.jsx`, `showError`, `ContactsEditor.jsx`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **What connects `num`, `swatchSx`, `num` to the rest of the system?**
  _1135 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `NewProviderDialog.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07673469387755102 - nodes in this community are weakly interconnected._
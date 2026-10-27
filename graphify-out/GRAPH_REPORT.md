# Graph Report - WEBPAC-INTERVE  (2026-10-27)

## Corpus Check
- 681 files · ~385,699 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4195 nodes · 11922 edges · 241 communities (134 shown, 107 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 157 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6ea89357`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- moneyText
- writeAudit
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- contracts.routes.js
- ConceptDialog.jsx
- validation.utils.js
- auth.routes.js
- statements.service.js
- client/package.json
- users.service.js
- getIO
- audit.service.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- useConfig.js
- `tbl_users`
- contracts.controller.test.js
- invoiceTerms.js
- contractConcepts.service.test.js
- WorkDetailPage.jsx
- workDashboard.service.js
- invoices.controller.test.js
- ContractDetailPage.jsx
- menu-items/index.js
- providers.routes.js
- DocumentManagement.jsx
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- app.routes.js
- NotificationSection/index.jsx
- cron/index.js
- works.service.js
- permissions.constants.js
- devDependencies
- statements.routes.js
- WorkContracts.jsx
- scripts
- app.js
- `tbl_invoices`
- react
- uniqueConstraints.constants.test.js
- decimal
- contractLiquidation.service.test.js
- `tbl_contract_type_fields`
- constants.js
- transaction.mock.js
- scripts
- WorkChartsTab.jsx
- httpCliente.js
- compilerOptions
- excelJS.js
- contracts.service.js
- permission
- devDependencies
- transaction.service.test.js
- useWorkScope
- money.utils.js
- workScopeOf
- `tbl_contract_status_history`
- invoiceEvidence.service.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- GeneralDashboard.jsx
- statements.service.test.js
- MenuList/index.jsx
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- works.service.test.js
- error.middleware.js
- contractPolicies.service.js
- `tbl_providers`
- error.middleware.test.js
- workDashboard.service.test.js
- WorkSummaryTab.jsx
- serviceWorker.jsx
- App.jsx
- `tbl_providers`
- winston.config.js
- session.service.test.js
- AuthForgotPassword.jsx
- WorkDataForm.jsx
- seed.demo.js
- floatingPoint.guard.test.js
- liquidationTerms.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- AppBar.jsx
- balanceReconciliation.service.js
- seed.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- AuthenticationRoutes.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- constant.js
- decisionReferences.guard.test.js
- contractSuspensions.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- fMoneyText
- MainLayout/index.jsx
- advanceFilters.js
- dashboard.service.test.js
- requestedDetailChanges
- ref_jest_globals
- app.service.test.js
- WorkCosts.jsx
- invoiceFollowUps.service.test.js
- status.constants.js
- `tbl_invoices`
- `tbl_invoices`
- @mui/material
- `tbl_statements`
- contractEndDateReconciliation.service.test.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- policyTypes.service.test.js
- react-router-dom
- `tbl_invoice_glosses`
- exportContractSummary
- `tbl_works`
- contractNotifications.service.test.js
- auth.service.test.js
- expirationNotice.service.test.js
- workScope.service.test.js
- extends
- DebouncedInput.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 151 edges
2. `react` - 117 edges
3. `showError()` - 100 edges
4. `workScopeOf()` - 87 edges
5. `writeAudit()` - 80 edges
6. `dateOnlyText()` - 80 edges
7. `useAuth()` - 79 edges
8. `moneyText()` - 79 edges
9. `withLockedTransaction()` - 77 edges
10. `showSuccess()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `getInvoiceFormOptions()` --calls--> `getContractFormOptions()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.service.js → server/src/modules/work/contracts/contracts.service.js
- `percentQuery()` --calls--> `decimal()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/money.utils.js
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `selectContractFilterStages()` --calls--> `scopeWhere()`  [EXTRACTED]
  server/src/modules/work/contracts/contracts.service.js → server/src/common/services/workScope.service.js

## Import Cycles
- None detected.

## Communities (241 total, 107 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DateTimePickerToolbar() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "moneyText"
Cohesion: 0.11
Nodes (42): moneyText(), percentOf(), percentText(), toPercent(), insuredValue(), ADR-0019, ADR-0026, policyBaseValue() (+34 more)

### Community 3 - "writeAudit"
Cohesion: 0.08
Nodes (65): AUDIT_ENTITIES, diffFields(), writeAudit(), withLockedTransaction(), updateAccount(), GLOSS_FIELD_NAMES, assertNotCancelled(), auditable() (+57 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.05
Nodes (78): ADR-0009, defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), DIAN_WEIGHTS, formatFor() (+70 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (53): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoicesApi (+45 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.04
Nodes (80): CONTRACT_PAIRS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, server_src_modules_billing_invoices_invoicemenus_listinvoicemenus, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController, deleteInvoiceController (+72 more)

### Community 9 - "contracts.routes.js"
Cohesion: 0.07
Nodes (43): moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), previewContractConceptController, ADR-0006, ADR-0016 (+35 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.06
Nodes (54): cancelContractAPI(), contractConceptsApi, contractLiquidationApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016 (+46 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.10
Nodes (23): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0027 (+15 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.10
Nodes (43): assertInScope(), statementGlosses(), statementInvoices(), assertUniqueNumber(), assertValues(), auditable(), AUDITED, buildReport() (+35 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (48): compat, __dirname, __filename, browserslist, development, production, name, packageManager (+40 more)

### Community 15 - "users.service.js"
Cohesion: 0.07
Nodes (44): ADR-0004, AUDIT_OPERATIONS, capitalize(), createMasterService(), httpError(), ADR-0003, ADR-0004, ADR-0013 (+36 more)

### Community 16 - "getIO"
Cohesion: 0.13
Nodes (16): getIO(), configurePolicyTypeBaseController, FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, deleteProfileController(), getModulesController() (+8 more)

### Community 17 - "audit.service.js"
Cohesion: 0.06
Nodes (50): ADR-0001, bcrypt, ref_crypto, auditMisuse(), buildRows(), ADR-0013, ADR-0027, protect() (+42 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (23): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+15 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.08
Nodes (36): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+28 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.05
Nodes (64): ADR-0013, ADR-0021, ADR-0023, ADR-0024, server_src_common_utils_money_utils_percentfor, dateRangeFilter(), matchesContractAdvance(), billingBalances() (+56 more)

### Community 22 - "useConfig.js"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 25 - "invoiceTerms.js"
Cohesion: 0.11
Nodes (41): adjustableAmount(), approveInvoice(), assertContractAdmitsCancel(), assertStage(), assertUniqueNumber(), assertWork(), auditable(), cancelInvoice() (+33 more)

### Community 26 - "contractConcepts.service.test.js"
Cohesion: 0.06
Nodes (26): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+18 more)

### Community 27 - "WorkDetailPage.jsx"
Cohesion: 0.07
Nodes (53): getIdentityDocumentsSelectAPI, getProviderTypesSelectAPI, changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, ContactsList(), ADR-0009 (+45 more)

### Community 28 - "workDashboard.service.js"
Cohesion: 0.03
Nodes (146): ADR-0011, findExportRows(), scopeWhere(), sumMoney(), containsFilter(), filtersWhere(), idFilter(), addTerm() (+138 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "ContractDetailPage.jsx"
Cohesion: 0.07
Nodes (46): contractsApi, exportContractAPI(), exportContractsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractMenuAPI(), Pending(), download() (+38 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.09
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 32 - "providers.routes.js"
Cohesion: 0.09
Nodes (31): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+23 more)

### Community 33 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 38 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 39 - "cron/index.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, describeTarget(), testConnection(), verifyStatusCatalog(), cronJobs (+8 more)

### Community 40 - "works.service.js"
Cohesion: 0.08
Nodes (47): ADR-0007, PROGRESS_WARNING, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted(), assertHeader() (+39 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.04
Nodes (73): ADR-0012, ADR-0017, ADR-0019, ADR-0025, ADR-0026, express, ADR-0011, ADR-0016 (+65 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "statements.routes.js"
Cohesion: 0.10
Nodes (30): sendExport(), handleExport(), changeStatementStatusController, deleteStatementController, exportStatementController, exportStatementGroupController, getStatementController, getStatementGroupReportController (+22 more)

### Community 45 - "WorkContracts.jsx"
Cohesion: 0.16
Nodes (26): CONTRACT_STATE_TABS, fPercentText(), ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter(), AdvanceLegend(), matchesAdvanceFilter(), matchesAdvanceLegend() (+18 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "react"
Cohesion: 0.06
Nodes (48): getStatusesByScopeAPI(), getBusinessRulesAPI(), saveBusinessRulesAPI(), deleteProfileAPI(), getProfilesAPI(), paginationProfilesAPI(), deleteUserAPI(), getBasicInformationAPI() (+40 more)

### Community 51 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 52 - "decimal"
Cohesion: 0.10
Nodes (42): @prisma/client, decimal(), ratioPercent(), ratioText(), roundMoney(), roundRatio(), advanceBalances(), appliedPct() (+34 more)

### Community 53 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "constants.js"
Cohesion: 0.03
Nodes (70): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, getProviderTypeFieldsAPI() (+62 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkChartsTab.jsx"
Cohesion: 0.14
Nodes (30): CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf(), drillLinkSx, Empty(), INVOICE_NOUN (+22 more)

### Community 59 - "httpCliente.js"
Cohesion: 0.09
Nodes (27): getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, RETRY_503_HINT, pickWork(), useWorkFilterField(), WorkScopeContext (+19 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "contracts.service.js"
Cohesion: 0.04
Nodes (74): ADR-0006, ADR-0016, ADR-0018, AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue() (+66 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.13
Nodes (13): ref_fs, ref_path, ref_url, catalog, expected, prismaMock, ADR-0027, loggerMock (+5 more)

### Community 68 - "useWorkScope"
Cohesion: 0.11
Nodes (22): getWorkDashboardAPI(), ADR-0002, useWorkScope(), WorkSection(), DashboardDefault, Dashboard(), ADR-0002, TABS (+14 more)

### Community 70 - "money.utils.js"
Cohesion: 0.10
Nodes (22): HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ROUNDING, toMoney(), ZERO (+14 more)

### Community 71 - "workScopeOf"
Cohesion: 0.10
Nodes (45): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes, ADR-0002 (+37 more)

### Community 88 - "invoiceEvidence.service.js"
Cohesion: 0.14
Nodes (15): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+7 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (89): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, getInsurersSelectAPI, insurersApi, getPermissionsCatalogAPI(), reasonsApi (+81 more)

### Community 100 - "works.routes.js"
Cohesion: 0.11
Nodes (25): exportFormatRule(), changeWorkStateController, changeWorkStatusController, deleteWorkController, exportWorksController, getWorkController, INPUT_FIELDS, notify() (+17 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "GeneralDashboard.jsx"
Cohesion: 0.19
Nodes (20): getDashboardSummaryAPI(), client_src_hooks_useinvoicemenus_useinvoicemenus, useSchemePalette(), MainCard(), invoicePath(), AlertsCard(), Empty(), LatestInvoicesCard() (+12 more)

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "MenuList/index.jsx"
Cohesion: 0.23
Nodes (9): getMenuAPI(), genericRequest, getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts, setContractMenus() (+1 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.08
Nodes (66): contractPoliciesApi, invoiceTransitionsApi, getModulesAPI(), saveProfileAPI(), checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012 (+58 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (51): exceljs, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+43 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (106): main(), newOperationId(), canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint() (+98 more)

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): percent(), ALL, CONCEPTS, CONTRACT, OWN, prismaMock

### Community 125 - "WorkSummaryTab.jsx"
Cohesion: 0.21
Nodes (22): contractRows(), daysOpenText(), DrillDownDialog(), followUpRows(), followUpsDrill(), invoiceRows(), num, useDrillDown() (+14 more)

### Community 129 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 130 - "App.jsx"
Cohesion: 0.11
Nodes (19): refreshSession(), App(), ThemedToastContainer(), config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext (+11 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 133 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 134 - "AuthForgotPassword.jsx"
Cohesion: 0.14
Nodes (21): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider(), getStoredUser() (+13 more)

### Community 136 - "WorkDataForm.jsx"
Cohesion: 0.19
Nodes (16): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, DateField(), toDate(), FilterPopper(), normalizeOptions(), RemoteFilterSelect() (+8 more)

### Community 137 - "seed.demo.js"
Cohesion: 0.05
Nodes (53): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+45 more)

### Community 140 - "floatingPoint.guard.test.js"
Cohesion: 0.29
Nodes (5): ALLOWED, files(), lines, SRC, text()

### Community 142 - "liquidationTerms.js"
Cohesion: 0.13
Nodes (14): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+6 more)

### Community 151 - "expirationNotice.service.js"
Cohesion: 0.16
Nodes (21): getBusinessRulesController, saveBusinessRulesController, contractAlertWheres(), CONTRACT_ALERTS, addDays(), alreadyNotified(), buildNotices(), contractsWithExpiredPoliciesWhere() (+13 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 155 - "AppBar.jsx"
Cohesion: 0.20
Nodes (12): client_src_assets_images_interadminpro, ForgotPasswordPage, LoginPage, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo() (+4 more)

### Community 156 - "balanceReconciliation.service.js"
Cohesion: 0.22
Nodes (13): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), contractBalanceReconciliationJob, insertNotification() (+5 more)

### Community 157 - "seed.js"
Cohesion: 0.12
Nodes (15): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+7 more)

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "AuthenticationRoutes.jsx"
Cohesion: 0.21
Nodes (9): MinimalLayout(), AuthenticationRoutes, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router, MainRoutes, Loadable() (+1 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "constant.js"
Cohesion: 0.20
Nodes (11): appDrawerWidth, gridSpacing, CardSecondaryAction(), Avatar(), DashboardCards(), Indicator(), ADR-0002, CustomShadowBox() (+3 more)

### Community 181 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 183 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

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

### Community 197 - "fMoneyText"
Cohesion: 0.05
Nodes (46): exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), InvoiceDetailPage, StatementsPage, MoneyField(), fTerm(), STATEMENTS_PATH (+38 more)

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.22
Nodes (13): handlerDrawerOpen(), Footer(), Header(), MainLayout(), MainLayoutContent(), ScopedOutlet(), LogoSection(), MainContentStyled (+5 more)

### Community 199 - "advanceFilters.js"
Cohesion: 0.08
Nodes (24): ref_node_fs, amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere() (+16 more)

### Community 201 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 202 - "requestedDetailChanges"
Cohesion: 0.21
Nodes (13): isBillingType(), approvalSnapshot(), balanceChange(), detailChanges(), detailText(), hasDetail(), isSimpleType(), requestedDetailChanges() (+5 more)

### Community 203 - "ref_jest_globals"
Cohesion: 0.06
Nodes (14): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, prismaMock (+6 more)

### Community 204 - "app.service.test.js"
Cohesion: 0.22
Nodes (6): BILLING, CONTRACTS, DASHBOARD, HOME, prismaMock, state

### Community 206 - "WorkCosts.jsx"
Cohesion: 0.23
Nodes (11): CardTitle(), clickableChartSx, DonutWithLegend(), drillLinkSx, INVOICE_NOUN, MENU_COLORS, menuColor(), num (+3 more)

### Community 211 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 212 - "status.constants.js"
Cohesion: 0.06
Nodes (49): captured, explain(), main(), measure(), parseParams(), percentile(), plain(), adapter (+41 more)

### Community 217 - "@mui/material"
Cohesion: 0.08
Nodes (35): getAddressTypesSelectAPI, updateThemeModeAPI(), getWorksSummaryAPI(), ThemeModeSection(), headerStyle, SubCard(), ACTION_TONES, ActionButton() (+27 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.20
Nodes (5): assertInvoiceVisible, ctx, prismaMock, SCOPE, state

### Community 221 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 222 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 224 - "react-router-dom"
Cohesion: 0.36
Nodes (9): endpoints, initialState, useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), NavCollapse(), NavGroup(), NavItem() (+1 more)

### Community 227 - "exportContractSummary"
Cohesion: 0.32
Nodes (8): contractInvoicesForReport(), authored(), balanceFields(), contractFields(), dateTime(), exportContractSummary(), field(), valueFields()

### Community 233 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 234 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 235 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 237 - "workScope.service.test.js"
Cohesion: 0.40
Nodes (4): hasEffectivePermission, prismaMock, state, user

### Community 238 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

## Knowledge Gaps
- **1137 isolated node(s):** `STATUS_TABS`, `CONTRACT_ALERT_OPTIONS`, `CONTRACT_INVOICE_TYPES`, `TERM_UNIT_NAMES`, `ADR-0017` (+1132 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1570 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **107 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `ADR-0002` connect `WorkCosts.jsx` to `contracts.service.js`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `App.jsx`, `AuthForgotPassword.jsx`, `InvoiceFormPage.jsx`, `WorkDataForm.jsx`, `ConceptDialog.jsx`, `client/package.json`, `useConfig.js`, `WorkDetailPage.jsx`, `AppBar.jsx`, `ContractDetailPage.jsx`, `menu-items/index.js`, `DocumentManagement.jsx`, `NotificationSection/index.jsx`, `WorkContracts.jsx`, `AuthenticationRoutes.jsx`, `react`, `constant.js`, `constants.js`, `WorkChartsTab.jsx`, `httpCliente.js`, `withAlpha`, `useWorkScope`, `fMoneyText`, `MainLayout/index.jsx`, `WorkCosts.jsx`, `useAuth`, `react-router-dom`, `GeneralDashboard.jsx`, `DebouncedInput.jsx`, `MenuList/index.jsx`, `showError`, `WorkSummaryTab.jsx`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **What connects `STATUS_TABS`, `CONTRACT_ALERT_OPTIONS`, `CONTRACT_INVOICE_TYPES` to the rest of the system?**
  _1137 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08686868686868687 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `moneyText` be split into smaller, more focused modules?**
  _Cohesion score 0.10531400966183575 - nodes in this community are weakly interconnected._
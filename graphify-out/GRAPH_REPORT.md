# Graph Report - WEBPAC-INTERVE  (2026-10-23)

## Corpus Check
- 636 files · ~340,546 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3763 nodes · 10366 edges · 221 communities (124 shown, 97 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 138 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3d4254f4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- contractTerms.js
- contracts.service.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- workScopeOf
- ConceptDialog.jsx
- validation.utils.js
- auditContext
- seed.demo.js
- client/package.json
- menu-items/index.js
- masterRouter.utils.js
- DocumentManagement.jsx
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- updateInvoice
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- contractConcepts.service.js
- workDashboard.service.js
- masterRouter.utils.test.js
- WorkScopeContext.jsx
- invoiceEvidence.service.js
- providers.routes.js
- NewProviderDialog.jsx
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- ContactsEditor.jsx
- withAlpha
- cron/index.js
- contractFields.js
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorkChartsTab.jsx
- scripts
- contractReports.service.js
- `tbl_invoices`
- AuthForgotPassword.jsx
- constants.js
- seed.js
- ref_jest_globals
- `tbl_contract_type_fields`
- invoiceFollowUps.service.js
- transaction.mock.js
- scripts
- dashboard.service.test.js
- InvoicesPage.jsx
- compilerOptions
- excelJS.js
- NotificationSection/index.jsx
- permission
- devDependencies
- floatingPoint.guard.test.js
- eslint.config.mjs
- money.utils.js
- ProviderTypePage.jsx
- `tbl_contract_status_history`
- renderExport
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- themes/index.jsx
- contractPolicies.service.js
- contractSuspensions.service.test.js
- `tbl_works`
- `tbl_policies`
- httpCliente.js
- export.service.js
- uniqueConstraints.constants.test.js
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- transaction.service.test.js
- @mui/material
- balanceReconciliation.service.js
- images.js
- serviceWorker.jsx
- `tbl_providers`
- invoiceTerms.js
- AuthenticationRoutes.jsx
- auth.service.js
- fMoneyText
- contracts.controller.test.js
- works.service.test.js
- users.service.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- status.constants.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- decimal
- socket.js
- prismaClient.js
- session.service.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- decisionReferences.guard.test.js
- ImageList.jsx
- addressTypes.service.js
- `tbl_users`
- balanceReconciliation.service.test.js
- extends
- contractReports.service.test.js
- invoiceFollowUps.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- expirationNotice.service.test.js
- showError
- requestedDetailChanges
- contractEndDateReconciliation.service.test.js
- contractSummaryReport.test.js
- useMenuCollapse.js
- app.routes.js
- EasyCrop.jsx
- MainLayout/index.jsx
- contractNotifications.service.test.js
- app.service.js
- `tbl_invoices`
- `tbl_invoices`
- uniqueConstraints.constants.js
- browserslist
- volta
- InputLabel.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 142 edges
2. `react` - 110 edges
3. `showError()` - 89 edges
4. `useAuth()` - 77 edges
5. `workScopeOf()` - 66 edges
6. `writeAudit()` - 65 edges
7. `withLockedTransaction()` - 64 edges
8. `dateOnlyText()` - 64 edges
9. `showSuccess()` - 58 edges
10. `@tabler/icons-react` - 58 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `percentQuery()` --calls--> `decimal()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/money.utils.js
- `WorkView()` --indirect_call--> `previewWorkEndDateAPI()`  [INFERRED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/api/requests/worksApi.js

## Import Cycles
- None detected.

## Communities (221 total, 97 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (24): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractTerms.js"
Cohesion: 0.10
Nodes (31): ADR-0015, toDateOnly(), daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation(), derivedEndDate(), previewContractConcept() (+23 more)

### Community 3 - "contracts.service.js"
Cohesion: 0.08
Nodes (58): ADR-0002, ADR-0006, containsFilter(), dateRangeFilter(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS (+50 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.04
Nodes (44): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+36 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (54): assertInScope(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertProviderAssignable(), assertProviderTypes(), assertTypeIds(), assertWorkAssignable() (+46 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.08
Nodes (45): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoicesApi, ADR-0017 (+37 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.05
Nodes (68): sendExport(), server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_contract_pairs, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController (+60 more)

### Community 9 - "workScopeOf"
Cohesion: 0.06
Nodes (68): getEffectivePermissionIds(), workScopeOf(), exportFormatRule(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes, ADR-0002 (+60 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.08
Nodes (45): contractConceptsApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016 (+37 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.10
Nodes (26): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+18 more)

### Community 12 - "auditContext"
Cohesion: 0.09
Nodes (30): THEME_MODES, auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController() (+22 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.05
Nodes (55): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+47 more)

### Community 14 - "client/package.json"
Cohesion: 0.09
Nodes (22): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+14 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.08
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 16 - "masterRouter.utils.js"
Cohesion: 0.06
Nodes (48): express, getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers() (+40 more)

### Community 17 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (62): ADR-0021, ADR-0023, server_src_common_utils_money_utils_percentfor, server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_money_columns, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_percent_columns, server_src_modules_billing_invoices_contractinvoiceterms_contractdraftof (+54 more)

### Community 22 - "updateInvoice"
Cohesion: 0.17
Nodes (27): adjustableAmount(), approveInvoice(), assertContractAdmitsCancel(), assertInvoiceVisible(), assertStage(), assertUniqueNumber(), assertWork(), auditable() (+19 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.10
Nodes (43): ADR-0007, PROGRESS_WARNING, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted(), assertHeader() (+35 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.07
Nodes (21): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+13 more)

### Community 27 - "contractConcepts.service.js"
Cohesion: 0.10
Nodes (49): FIELD_GROUPS, assertContractStillAdmits(), createContractInvoice(), activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct() (+41 more)

### Community 28 - "workDashboard.service.js"
Cohesion: 0.06
Nodes (91): scopeWhere(), moneyText(), percentText(), sumMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL (+83 more)

### Community 29 - "masterRouter.utils.test.js"
Cohesion: 0.05
Nodes (34): config, emit, forged, serviceMock, mockReq(), emit, fieldsServiceMock, mockDelete (+26 more)

### Community 30 - "WorkScopeContext.jsx"
Cohesion: 0.13
Nodes (23): getMyWorksSelectAPI(), pickWork(), useWorkScope(), WorkScopeContext, WorkScopeProvider(), WorkSection(), DashboardDefault, ProvidersPage (+15 more)

### Community 31 - "invoiceEvidence.service.js"
Cohesion: 0.19
Nodes (13): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+5 more)

### Community 32 - "providers.routes.js"
Cohesion: 0.09
Nodes (33): canViewAllWorks(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS (+25 more)

### Community 33 - "NewProviderDialog.jsx"
Cohesion: 0.10
Nodes (30): getIdentityDocumentsSelectAPI, identityDocumentsApi, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi (+22 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "ContactsEditor.jsx"
Cohesion: 0.10
Nodes (30): getAddressTypesSelectAPI, getBusinessRulesAPI(), saveBusinessRulesAPI(), updatePasswordAPI(), channelsOf(), ContactDialog(), ContactsEditor(), EMPTY (+22 more)

### Community 38 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 39 - "cron/index.js"
Cohesion: 0.09
Nodes (21): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+13 more)

### Community 40 - "contractFields.js"
Cohesion: 0.18
Nodes (13): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+5 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.06
Nodes (39): ADR-0011, ADR-0012, ADR-0016, ADR-0018, ADR-0019, ADR-0017, ADR-0020, ADR-0024 (+31 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.08
Nodes (58): contractRows(), invoiceRows(), Advances(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf() (+50 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "contractReports.service.js"
Cohesion: 0.09
Nodes (28): contractInvoicesForReport(), ADVANCE_COLUMNS, advanceTotals(), authored(), balanceFields(), CONCEPT_COLUMNS, conceptLabel(), CONTRACT_COLUMNS (+20 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "AuthForgotPassword.jsx"
Cohesion: 0.13
Nodes (20): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI() (+12 more)

### Community 51 - "constants.js"
Cohesion: 0.09
Nodes (23): refreshSession(), SocketContext, SocketProvider(), TooltipLongText(), CONTRACT_INVOICE_TYPES, CONTRACT_POLICY_STATUS_LABELS, CONTRACT_STATE_TABS, INVOICE_TYPE_OPTIONS (+15 more)

### Community 52 - "seed.js"
Cohesion: 0.12
Nodes (15): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+7 more)

### Community 53 - "ref_jest_globals"
Cohesion: 0.04
Nodes (26): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+18 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "invoiceFollowUps.service.js"
Cohesion: 0.27
Nodes (18): assertNotCancelled(), auditable(), AUDITED, closeFollowUp(), deleteFollowUp(), findLockedInvoice(), findLockedOpen(), FOLLOW_UP_SELECT (+10 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (36): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+28 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "dashboard.service.test.js"
Cohesion: 0.33
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 59 - "InvoicesPage.jsx"
Cohesion: 0.06
Nodes (44): contractsApi, exportContractAPI(), exportContractsAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), useWorkFilterField(), client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenu (+36 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "floatingPoint.guard.test.js"
Cohesion: 0.29
Nodes (5): ALLOWED, files(), lines, SRC, text()

### Community 68 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 70 - "money.utils.js"
Cohesion: 0.09
Nodes (32): HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ROUNDING, toMoney() (+24 more)

### Community 71 - "ProviderTypePage.jsx"
Cohesion: 0.14
Nodes (17): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+9 more)

### Community 88 - "renderExport"
Cohesion: 0.18
Nodes (15): buildPdf(), buildPdfDocument(), findExportRows(), httpError(), newPdf(), pdfBuffer(), pdfHeading(), renderDocument() (+7 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (102): addressTypesApi, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, insurersApi, configurePolicyTypeBaseAPI(), ADR-0019 (+94 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.09
Nodes (29): ALL, assertAnyInScope(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf(), selectMyWorks() (+21 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "themes/index.jsx"
Cohesion: 0.12
Nodes (16): App(), ThemedToastContainer(), config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider() (+8 more)

### Community 108 - "contractPolicies.service.js"
Cohesion: 0.05
Nodes (85): ADR-0001, INACTIVE_STATUS, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0013 (+77 more)

### Community 112 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "httpCliente.js"
Cohesion: 0.05
Nodes (44): getMenuAPI(), deleteProfileAPI(), getModulesAPI(), getProfilesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), paginationUsersAPI() (+36 more)

### Community 117 - "export.service.js"
Cohesion: 0.17
Nodes (25): addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), cellText(), drawFields(), drawSectionTitle() (+17 more)

### Community 118 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.27
Nodes (14): concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS, driverCause() (+6 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.22
Nodes (5): ALL, CONCEPTS, CONTRACT, OWN, prismaMock

### Community 123 - "transaction.service.test.js"
Cohesion: 0.26
Nodes (8): ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "@mui/material"
Cohesion: 0.05
Nodes (69): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, client_src_hooks_useinvoicemenus_useinvoicemenus, ADR-0002, useSchemePalette(), ElevationScroll(), HorizontalBar() (+61 more)

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.21
Nodes (14): findUsersWithPermission(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), balanceViolations(), CHECKS, findBalanceViolations() (+6 more)

### Community 129 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "invoiceTerms.js"
Cohesion: 0.11
Nodes (23): BILLING_TYPES, httpError(), ZERO, insertInvoice(), writeDetail(), isContractCreate(), isCreate(), isSimpleCreate() (+15 more)

### Community 133 - "AuthenticationRoutes.jsx"
Cohesion: 0.11
Nodes (21): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 134 - "auth.service.js"
Cohesion: 0.10
Nodes (28): bcrypt, REDACTED, backoff(), runTransaction(), withTransaction(), comparePassword(), hashPassword(), deriveKey() (+20 more)

### Community 136 - "fMoneyText"
Cohesion: 0.07
Nodes (36): getInsurersSelectAPI, getPolicyTypesSelectAPI, MoneyField(), complete(), PercentField(), toText(), toValue(), fMoneyText() (+28 more)

### Community 137 - "contracts.controller.test.js"
Cohesion: 0.14
Nodes (12): conceptsServiceMock, contractsServiceMock, emit, exportContractReport, exportContractSummary, getEffectivePermissionIds, ADR-0015, ADR-0016 (+4 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "users.service.js"
Cohesion: 0.09
Nodes (28): ADR-0004, defineMaster(), DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008 (+20 more)

### Community 151 - "status.constants.js"
Cohesion: 0.12
Nodes (25): ACTIVE_STATUS, DELETED_STATUS, getBusinessRulesController, saveBusinessRulesController, getBusinessRules(), getRuleValues(), toDto(), ADR-0010 (+17 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.18
Nodes (11): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+3 more)

### Community 155 - "decimal"
Cohesion: 0.11
Nodes (40): decimal(), ratioPercent(), ratioText(), roundMoney(), roundRatio(), advanceBalances(), appliedPct(), assertAdvanceCancellable() (+32 more)

### Community 156 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 157 - "prismaClient.js"
Cohesion: 0.07
Nodes (35): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+27 more)

### Community 159 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 173 - "decisionReferences.guard.test.js"
Cohesion: 0.15
Nodes (12): ref_fs, ref_url, citations, DECISIONS, files(), ROOT, SELF, SOURCES (+4 more)

### Community 174 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 175 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.14
Nodes (10): @prisma/client, CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients (+2 more)

### Community 179 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 181 - "contractReports.service.test.js"
Cohesion: 0.20
Nodes (6): exceljs, COLUMNS, ROWS, concept(), contract(), prismaMock

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

### Community 194 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 197 - "showError"
Cohesion: 0.05
Nodes (104): getStatusesByScopeAPI(), contractPoliciesApi, suspendContractAPI(), invoiceTransitionsApi, getReasonsSelectAPI(), defaultConfig, showError(), showInfo() (+96 more)

### Community 198 - "requestedDetailChanges"
Cohesion: 0.24
Nodes (11): isBillingType(), approvalSnapshot(), detailChanges(), detailText(), isSimpleType(), requestedDetailChanges(), simpleSnapshot(), SNAPSHOT_AMOUNTS (+3 more)

### Community 199 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 201 - "contractSummaryReport.test.js"
Cohesion: 0.22
Nodes (6): contract, contractBalances, contractInvoicesForReport, getContract, getContractPolicies, SCOPE

### Community 203 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 206 - "MainLayout/index.jsx"
Cohesion: 0.16
Nodes (23): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), useConfig(), Footer(), Header(), ThemeModeSection() (+15 more)

### Community 211 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 212 - "app.service.js"
Cohesion: 0.11
Nodes (15): getMenu(), getPagesMenu(), getSessionInfo(), getUserPermissions(), PAGE_SELECT, toChild(), toParent(), withInvoiceMenus() (+7 more)

### Community 217 - "uniqueConstraints.constants.js"
Cohesion: 0.50
Nodes (3): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES

### Community 218 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 219 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **1043 isolated node(s):** `CONTRACT_TYPES`, `SIMPLE_CAPTURED`, `CONTRACT_CAPTURED`, `TABS`, `ADR-0020` (+1038 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1446 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **97 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `AuthenticationRoutes.jsx`, `server/package.json`, `InvoiceFormPage.jsx`, `fMoneyText`, `ConceptDialog.jsx`, `client/package.json`, `DocumentManagement.jsx`, `WorkScopeContext.jsx`, `NewProviderDialog.jsx`, `ContactsEditor.jsx`, `withAlpha`, `WorkChartsTab.jsx`, `ImageList.jsx`, `AuthForgotPassword.jsx`, `constants.js`, `InvoicesPage.jsx`, `NotificationSection/index.jsx`, `showError`, `ProviderTypePage.jsx`, `EasyCrop.jsx`, `MainLayout/index.jsx`, `InputLabel.jsx`, `useAuth`, `themes/index.jsx`, `httpCliente.js`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `ADR-0002` connect `contracts.service.js` to `@mui/material`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **What connects `CONTRACT_TYPES`, `SIMPLE_CAPTURED`, `CONTRACT_CAPTURED` to the rest of the system?**
  _1043 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08325624421831637 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractTerms.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09915966386554621 - nodes in this community are weakly interconnected._
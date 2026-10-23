# Graph Report - WEBPAC-INTERVE  (2026-10-23)

## Corpus Check
- 639 files · ~343,921 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3783 nodes · 10437 edges · 235 communities (137 shown, 98 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 140 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `85dc715d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- contractPolicies.service.js
- users.service.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- workScopeOf
- contracts.routes.js
- ConceptDialog.jsx
- validation.utils.js
- auditContext
- seed.demo.js
- client/package.json
- @mui/icons-material
- masterRouter.utils.js
- handleFirebaseDocs.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- updateInvoice
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- contracts.service.js
- workDashboard.service.js
- invoices.controller.test.js
- WorkScopeContext.jsx
- billingTerms.js
- providers.routes.js
- formatTime.js
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
- WorkDetailPage.jsx
- `tbl_invoices`
- ProfilePage.jsx
- ContractsPage.jsx
- seed.js
- ref_jest_globals
- `tbl_contract_type_fields`
- invoiceFollowUps.service.js
- transaction.mock.js
- scripts
- dashboard.service.test.js
- constants.js
- compilerOptions
- excelJS.js
- policyTypes.service.js
- permission
- devDependencies
- transaction.service.test.js
- WorkSummaryTab.jsx
- moneyText
- ProviderTypeFieldsDialog.jsx
- `tbl_contract_status_history`
- providerTypeFields.service.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- App.jsx
- audit.service.js
- contractSuspensions.service.test.js
- `tbl_works`
- `tbl_policies`
- react
- export.service.js
- uniqueConstraints.constants.test.js
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- error.middleware.test.js
- @mui/material
- status.constants.js
- images.js
- serviceWorker.jsx
- `tbl_providers`
- invoiceTerms.js
- AuthForgotPassword.jsx
- auth.service.js
- contractReports.service.js
- contracts.controller.test.js
- works.service.test.js
- seed.volume.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- decimal
- socket.manager.js
- transaction.service.js
- GeneralDashboard.jsx
- `tbl_contract_concepts`
- `tbl_reasons`
- decisionReferences.guard.test.js
- ImageList.jsx
- invoiceEvidence.service.js
- `tbl_users`
- balanceReconciliation.service.test.js
- extends
- MenuList/index.jsx
- invoiceFollowUps.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- expirationNotice.service.test.js
- showError
- react-router-dom
- contractEndDateReconciliation.service.test.js
- AppBar.jsx
- app.service.test.js
- app.routes.js
- auth.service.test.js
- MainLayout/index.jsx
- winston.config.js
- app.service.js
- `tbl_invoices`
- `tbl_invoices`
- NotificationSection/index.jsx
- money.utils.js
- prismaClient.js
- contractReports.service.test.js
- renderExport
- document.service.js
- workScope.service.js
- contractSummaryReport.test.js
- master.service.test.js
- identityDocuments.service.js
- DebouncedInput.jsx
- auth.controller.test.js
- contractNotifications.service.test.js
- users.service.test.js
- useMenuCollapse.js
- volta
- notifications.service.test.js

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
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `percentQuery()` --calls--> `decimal()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/money.utils.js
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `WorkView()` --indirect_call--> `validateManagers()`  [INFERRED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/views/work/works/components/workForm.js

## Import Cycles
- None detected.

## Communities (235 total, 98 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (24): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (49): percentText(), insuredValue(), policyBaseValue(), REASON_SCOPES, conceptLabel(), getContractPolicies(), ADR-0002, ADR-0017 (+41 more)

### Community 3 - "users.service.js"
Cohesion: 0.06
Nodes (63): ADR-0004, INACTIVE_STATUS, AUDIT_OPERATIONS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused() (+55 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (33): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+25 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (67): ADR-0009, writeAudit(), withLockedTransaction(), assertInScope(), identificationError(), updateAccount(), updatePassword(), deleteProfile() (+59 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.05
Nodes (70): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, ADR-0017, previewContractInvoiceAPI() (+62 more)

### Community 8 - "workScopeOf"
Cohesion: 0.05
Nodes (70): sendExport(), workScopeOf(), server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_contract_pairs, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, server_src_modules_billing_invoices_invoicemenus_listinvoicemenus, approveInvoiceController (+62 more)

### Community 9 - "contracts.routes.js"
Cohesion: 0.05
Nodes (77): ADR-0018, getEffectivePermissionIds(), exportFormatRule(), moneyRule(), optionalDate(), percentRule(), getDashboardSummaryController, getWorkDashboardController (+69 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (51): contractConceptsApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016 (+43 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.13
Nodes (19): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0027 (+11 more)

### Community 12 - "auditContext"
Cohesion: 0.13
Nodes (25): jsonwebtoken, THEME_MODES, auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit() (+17 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.10
Nodes (19): ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC, ADR-0002 (+11 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (39): compat, __dirname, __filename, browserslist, development, production, name, packageManager (+31 more)

### Community 15 - "@mui/icons-material"
Cohesion: 0.09
Nodes (17): admin, icons, billing, dashboard, icons, menuItems, icons, other (+9 more)

### Community 16 - "masterRouter.utils.js"
Cohesion: 0.07
Nodes (43): express, getIO(), verifyToken(), requirePermission(), validate(), IDEMPOTENCY_HEADER, createMasterControllers(), createMasterRouter() (+35 more)

### Community 17 - "handleFirebaseDocs.js"
Cohesion: 0.21
Nodes (8): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), deleteDocApi(), firebase

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
Nodes (58): ADR-0021, ADR-0023, server_src_common_utils_money_utils_percentfor, server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_money_columns, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_percent_columns, server_src_modules_billing_invoices_contractinvoiceterms_contractdraftof (+50 more)

### Community 22 - "updateInvoice"
Cohesion: 0.17
Nodes (26): approveInvoice(), assertContractAdmitsCancel(), assertStage(), assertUniqueNumber(), assertWork(), auditable(), cancelInvoice(), contractBalances() (+18 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (48): ADR-0007, PROGRESS_WARNING, defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), applyManagers() (+40 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.06
Nodes (24): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx, prismaMock (+16 more)

### Community 27 - "contracts.service.js"
Cohesion: 0.06
Nodes (112): ADR-0006, ADR-0017, main(), diffFields(), newOperationId(), FIELD_GROUPS, typeAppliesAiu(), withContractAiu() (+104 more)

### Community 28 - "workDashboard.service.js"
Cohesion: 0.06
Nodes (76): inScope(), scopeOf(), scopeWhere(), sumMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL (+68 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "WorkScopeContext.jsx"
Cohesion: 0.12
Nodes (25): getMyWorksSelectAPI(), pickWork(), useWorkFilterField(), useWorkScope(), WorkScopeContext, WorkScopeProvider(), WorkSection(), DashboardDefault (+17 more)

### Community 31 - "billingTerms.js"
Cohesion: 0.24
Nodes (9): assertBillingFits(), BILLING_TYPES, billingBalances(), billingDto(), httpError(), money(), ZERO, balancesOf() (+1 more)

### Community 32 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 33 - "formatTime.js"
Cohesion: 0.07
Nodes (22): uploadFile(), paginationDocsApi(), saveDocApi(), saveProfileAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient (+14 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 38 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 39 - "cron/index.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+8 more)

### Community 40 - "contractFields.js"
Cohesion: 0.26
Nodes (10): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+2 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (52): ADR-0011, ADR-0012, ADR-0020, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0026 (+44 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.15
Nodes (13): client_src_assets_scss_style, config, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals() (+5 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.11
Nodes (38): Advances(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf(), drillLinkSx, Empty() (+30 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "WorkDetailPage.jsx"
Cohesion: 0.09
Nodes (30): getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, ADR-0009, STATUS, STATUS_OPTIONS, contactChannels(), contactsToForm() (+22 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "ProfilePage.jsx"
Cohesion: 0.13
Nodes (24): getStatusesByScopeAPI(), deleteProfileAPI(), getModulesAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue() (+16 more)

### Community 51 - "ContractsPage.jsx"
Cohesion: 0.10
Nodes (25): contractsApi, exportContractsAPI(), getContractMenuAPI(), ContractsPage, download(), downloadExport(), errorMessage(), EXPORT_FORMATS (+17 more)

### Community 52 - "seed.js"
Cohesion: 0.14
Nodes (12): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+4 more)

### Community 53 - "ref_jest_globals"
Cohesion: 0.05
Nodes (21): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, dbUser (+13 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "invoiceFollowUps.service.js"
Cohesion: 0.24
Nodes (21): assertNotCancelled(), auditable(), AUDITED, closeFollowUp(), deleteFollowUp(), findLockedInvoice(), findLockedOpen(), FOLLOW_UP_SELECT (+13 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (28): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+20 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "dashboard.service.test.js"
Cohesion: 0.33
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 59 - "constants.js"
Cohesion: 0.04
Nodes (60): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), invoicesApi, configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, providerTypesApi (+52 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "policyTypes.service.js"
Cohesion: 0.17
Nodes (11): ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, configurePolicyTypeBaseController, configurePolicyTypeBase(), httpError(), ADR-0019 (+3 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (18): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+10 more)

### Community 68 - "WorkSummaryTab.jsx"
Cohesion: 0.17
Nodes (26): MainCard(), contractRows(), daysOpenText(), DrillDownDialog(), followUpRows(), followUpsDrill(), invoiceRows(), num (+18 more)

### Community 70 - "moneyText"
Cohesion: 0.11
Nodes (30): moneyText(), isBillingType(), amountsDto(), approvalSnapshot(), balanceChange(), contractSnapshot(), detailText(), isSimpleType() (+22 more)

### Community 71 - "ProviderTypeFieldsDialog.jsx"
Cohesion: 0.31
Nodes (9): getProviderTypeFieldsAPI(), saveProviderTypeFieldsAPI(), DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006, ProviderTypeFieldsDialog(), toggle(), toRow() (+1 more)

### Community 88 - "providerTypeFields.service.js"
Cohesion: 0.29
Nodes (13): resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getProviderTypeFields(), httpError(), ADR-0006 (+5 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (87): addressTypesApi, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, getInsurersSelectAPI, insurersApi (+79 more)

### Community 100 - "works.routes.js"
Cohesion: 0.13
Nodes (20): changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, previewWorkEndDateController, saveWorkController (+12 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "App.jsx"
Cohesion: 0.13
Nodes (17): refreshSession(), App(), ThemedToastContainer(), CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext, NavigationScroll() (+9 more)

### Community 108 - "audit.service.js"
Cohesion: 0.20
Nodes (13): ADR-0001, AUDIT_ENTITIES, auditMisuse(), buildRows(), ADR-0013, ADR-0027, protect(), SENSITIVE_FIELDS (+5 more)

### Community 112 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "react"
Cohesion: 0.05
Nodes (47): getBusinessRulesAPI(), saveBusinessRulesAPI(), contractPoliciesApi, getIdentityDocumentsSelectAPI, invoiceTransitionsApi, getProfilesAPI(), getBasicInformationAPI(), saveUserAPI() (+39 more)

### Community 117 - "export.service.js"
Cohesion: 0.15
Nodes (30): addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf(), buildPdfDocument(), cellText() (+22 more)

### Community 118 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.22
Nodes (5): ALL, CONCEPTS, CONTRACT, OWN, prismaMock

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "@mui/material"
Cohesion: 0.07
Nodes (41): getWorksSummaryAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, SubCard(), ACTION_TONES, ActionButton() (+33 more)

### Community 125 - "status.constants.js"
Cohesion: 0.15
Nodes (20): ADR-0015, ADR-0024, ADR-0025, ACTIVE_STATUS, DELETED_STATUS, findUsersWithPermission(), sendEmail(), deliverReconciliationReport() (+12 more)

### Community 129 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "invoiceTerms.js"
Cohesion: 0.17
Nodes (17): isContractCreate(), isCreate(), isSimpleCreate(), assertTransition(), cancelTransitionFor(), hasContract(), historyRow(), httpError() (+9 more)

### Community 133 - "AuthForgotPassword.jsx"
Cohesion: 0.15
Nodes (20): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider() (+12 more)

### Community 134 - "auth.service.js"
Cohesion: 0.10
Nodes (28): bcrypt, ref_crypto, REDACTED, backoff(), runTransaction(), withTransaction(), comparePassword(), hashPassword() (+20 more)

### Community 136 - "contractReports.service.js"
Cohesion: 0.09
Nodes (28): contractInvoicesForReport(), ADVANCE_COLUMNS, advanceTotals(), authored(), balanceFields(), CONCEPT_COLUMNS, conceptLabel(), CONTRACT_COLUMNS (+20 more)

### Community 137 - "contracts.controller.test.js"
Cohesion: 0.14
Nodes (12): conceptsServiceMock, contractsServiceMock, emit, exportContractReport, exportContractSummary, getEffectivePermissionIds, ADR-0015, ADR-0016 (+4 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "seed.volume.js"
Cohesion: 0.10
Nodes (23): ref_node_crypto, nit(), addDays(), ALL_FIELDS, concept(), dbName, END_DATES, firstActive() (+15 more)

### Community 151 - "expirationNotice.service.js"
Cohesion: 0.12
Nodes (28): BUSINESS_RULES, DEFAULT_EXPIRING_DAYS, MAX_RULE_DAYS, MIN_RULE_DAYS, getBusinessRulesController, saveBusinessRulesController, FIELD_BY_KEY, getBusinessRules() (+20 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.18
Nodes (11): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+3 more)

### Community 155 - "decimal"
Cohesion: 0.12
Nodes (37): @prisma/client, decimal(), percentOf(), ratioPercent(), ratioText(), roundMoney(), advanceBalances(), appliedPct() (+29 more)

### Community 156 - "socket.manager.js"
Cohesion: 0.26
Nodes (9): socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), ACCESS_COOKIE_NAME (+1 more)

### Community 157 - "transaction.service.js"
Cohesion: 0.12
Nodes (15): prisma, buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES (+7 more)

### Community 159 - "GeneralDashboard.jsx"
Cohesion: 0.16
Nodes (21): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, client_src_hooks_useinvoicemenus_useinvoicemenus, useSchemePalette(), invoicePath(), AlertsCard(), Empty() (+13 more)

### Community 173 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 174 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 175 - "invoiceEvidence.service.js"
Cohesion: 0.13
Nodes (16): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+8 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 181 - "MenuList/index.jsx"
Cohesion: 0.20
Nodes (11): getMenuAPI(), ElevationScroll(), HorizontalBar(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts (+3 more)

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
Cohesion: 0.07
Nodes (89): exportContractAPI(), suspendContractAPI(), checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi (+81 more)

### Community 198 - "react-router-dom"
Cohesion: 0.18
Nodes (12): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router (+4 more)

### Community 199 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 201 - "AppBar.jsx"
Cohesion: 0.22
Nodes (10): client_src_assets_images_interadminpro, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthCardWrapper(), AuthWrapper1 (+2 more)

### Community 202 - "app.service.test.js"
Cohesion: 0.22
Nodes (6): BILLING, CONTRACTS, DASHBOARD, HOME, prismaMock, state

### Community 203 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 204 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 206 - "MainLayout/index.jsx"
Cohesion: 0.17
Nodes (21): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), useConfig(), Footer(), Header(), ThemeModeSection() (+13 more)

### Community 211 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 212 - "app.service.js"
Cohesion: 0.20
Nodes (13): hasEffectivePermission(), getMenu(), getPagesMenu(), PAGE_SELECT, toChild(), toParent(), withContractMenus(), withInvoiceMenus() (+5 more)

### Community 217 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 218 - "money.utils.js"
Cohesion: 0.15
Nodes (13): HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ROUNDING, roundRatio(), toMoney() (+5 more)

### Community 219 - "prismaClient.js"
Cohesion: 0.21
Nodes (11): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+3 more)

### Community 220 - "contractReports.service.test.js"
Cohesion: 0.20
Nodes (6): exceljs, COLUMNS, ROWS, concept(), contract(), prismaMock

### Community 221 - "renderExport"
Cohesion: 0.24
Nodes (10): findExportRows(), httpError(), renderDocument(), renderExport(), renderWith(), approvedOf(), contractsBalances(), exportInvoices() (+2 more)

### Community 222 - "document.service.js"
Cohesion: 0.22
Nodes (9): deleteModuleDoc(), DOC_CREATE_IDEMPOTENCY, DOC_SELECT, DOC_SORT_FIELDS, enrichDocs(), ADR-0013, ADR-0027, paginationModuleDocs() (+1 more)

### Community 223 - "workScope.service.js"
Cohesion: 0.36
Nodes (8): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), managedWhere(), resolveWorkScope(), selectMyWorks(), WORK_HEADER

### Community 224 - "contractSummaryReport.test.js"
Cohesion: 0.22
Nodes (6): contract, contractBalances, contractInvoicesForReport, getContract, getContractPolicies, SCOPE

### Community 225 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 226 - "identityDocuments.service.js"
Cohesion: 0.36
Nodes (6): formatFor(), identityDocumentsRoutes, identityDocumentsConfig, identityDocumentsService, ADR-0008, ADR-0013

### Community 229 - "auth.controller.test.js"
Cohesion: 0.25
Nodes (6): mockGetBasicInformation, mockLogin, mockUpdateAccount, mockUpdatePassword, mockUpdateThemeMode, sessionMock

### Community 230 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 231 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 233 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **1043 isolated node(s):** `TITLES`, `ECONOMIC_INPUTS`, `ADR-0016`, `ADR-0027`, `CHECKS` (+1038 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1445 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **98 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0020` connect `permissions.constants.js` to `InvoiceFormPage.jsx`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Why does `ADR-0002` connect `GeneralDashboard.jsx` to `contracts.service.js`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `AuthForgotPassword.jsx`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `client/package.json`, `@mui/icons-material`, `WorkScopeContext.jsx`, `GeneralDashboard.jsx`, `formatTime.js`, `ContactsEditor.jsx`, `withAlpha`, `WorkChartsTab.jsx`, `ImageList.jsx`, `WorkDetailPage.jsx`, `ProfilePage.jsx`, `ContractsPage.jsx`, `MenuList/index.jsx`, `constants.js`, `WorkSummaryTab.jsx`, `showError`, `react-router-dom`, `ProviderTypeFieldsDialog.jsx`, `AppBar.jsx`, `MainLayout/index.jsx`, `NotificationSection/index.jsx`, `useAuth`, `DebouncedInput.jsx`, `App.jsx`, `react`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **What connects `TITLES`, `ECONOMIC_INPUTS`, `ADR-0016` to the rest of the system?**
  _1043 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08325624421831637 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractPolicies.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06386066763425254 - nodes in this community are weakly interconnected._
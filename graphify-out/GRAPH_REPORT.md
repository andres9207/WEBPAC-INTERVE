# Graph Report - WEBPAC-INTERVE  (2026-10-28)

## Corpus Check
- 683 files · ~390,864 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4232 nodes · 12043 edges · 244 communities (134 shown, 110 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 157 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `17b23aab`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- moneyText
- approveInvoice
- dependencies
- server/package.json
- providers.service.js
- constants.js
- workScopeOf
- InvoiceFormPage.jsx
- ContractsPage.jsx
- validation.utils.js
- auth.routes.js
- statements.service.js
- client/package.json
- ProfilePage.jsx
- main.routes.js
- status.constants.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- seed.demo.js
- `tbl_users`
- contracts.service.js
- contractReports.service.js
- contractConcepts.service.test.js
- ContractDetailPage.jsx
- master.service.js
- invoices.controller.test.js
- invoiceGlosses.service.js
- menu-items/index.js
- providers.routes.js
- DocumentManagement.jsx
- `tbl_contract_concepts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- app.routes.js
- contracts.controller.js
- cron/index.js
- works.service.js
- contractPolicies.service.js
- devDependencies
- statements.routes.js
- users.service.js
- scripts
- app.js
- `tbl_contracts`
- workDashboard.service.js
- uniqueConstraints.constants.test.js
- decimal
- contractLiquidation.service.test.js
- `tbl_contract_type_fields`
- GeneralDashboard.jsx
- transaction.mock.js
- scripts
- fMoneyText
- contractTerms.js
- compilerOptions
- excelJS.js
- permissions.constants.js
- permission
- devDependencies
- transaction.service.test.js
- audit.service.js
- invoiceTerms.js
- AdvanceAmountsSection.jsx
- `tbl_contract_status_history`
- invoiceEvidence.service.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- StatementsPage.jsx
- statements.service.test.js
- ContactsEditor.jsx
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- works.service.test.js
- error.middleware.js
- contractSuspensions.service.js
- `tbl_providers`
- liquidationTerms.js
- balanceReconciliation.service.js
- AuthenticationRoutes.jsx
- serviceWorker.jsx
- useConfig.js
- `tbl_providers`
- simpleInvoiceTerms.js
- App.jsx
- dashboard.service.test.js
- contractSuspensions.service.test.js
- contractConcepts.service.js
- glossFields.js
- MenuList/index.jsx
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- AmountPercentField.jsx
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- AuthForgotPassword.jsx
- contracts.controller.test.js
- handleFirebase.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_users`
- balanceReconciliation.service.test.js
- advanceFilters.js
- ContractTaxesSection.jsx
- runIdempotent
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- themes/index.jsx
- SimpleAmountsSection.jsx
- MainLayout/index.jsx
- workDashboard.service.test.js
- auth.service.test.js
- src/index.jsx
- expirationNotice.service.test.js
- session.service.test.js
- writeAudit
- ref_jest_globals
- app.service.js
- `tbl_invoices`
- `tbl_invoices`
- @mui/material
- `tbl_statements`
- contractEndDateReconciliation.service.test.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- invoiceFollowUps.service.test.js
- master.service.test.js
- `tbl_invoice_glosses`
- extends
- `tbl_works`
- contractNotifications.service.test.js
- `tbl_status`
- users.service.test.js
- `tbl_users`
- `tbl_work_stages`
- policyTypes.service.test.js
- browserslist
- volta
- EasyCrop.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 152 edges
2. `react` - 118 edges
3. `showError()` - 100 edges
4. `workScopeOf()` - 88 edges
5. `moneyText()` - 83 edges
6. `writeAudit()` - 80 edges
7. `dateOnlyText()` - 80 edges
8. `useAuth()` - 79 edges
9. `withLockedTransaction()` - 77 edges
10. `showSuccess()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `percentQuery()` --calls--> `decimal()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/money.utils.js
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `selectContractFilterStages()` --calls--> `scopeWhere()`  [EXTRACTED]
  server/src/modules/work/contracts/contracts.service.js → server/src/common/services/workScope.service.js

## Import Cycles
- None detected.

## Communities (244 total, 110 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "moneyText"
Cohesion: 0.11
Nodes (41): moneyText(), percentOf(), percentText(), toMoney(), toPercent(), assertContractTotal(), blank(), composeContractInvoice() (+33 more)

### Community 3 - "approveInvoice"
Cohesion: 0.11
Nodes (42): isBillingType(), adjustableAmount(), approveInvoice(), assertContractAdmitsCancel(), assertStage(), assertUniqueNumber(), assertWork(), auditable() (+34 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.04
Nodes (44): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+36 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (55): ADR-0009, applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes() (+47 more)

### Community 7 - "constants.js"
Cohesion: 0.03
Nodes (71): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), exportWorksAPI(), getWorksSummaryAPI(), client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenu, ADR-0002 (+63 more)

### Community 8 - "workScopeOf"
Cohesion: 0.05
Nodes (80): workScopeOf(), CONTRACT_PAIRS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController, deleteInvoiceController (+72 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.14
Nodes (25): getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoicesApi, ADR-0017 (+17 more)

### Community 10 - "ContractsPage.jsx"
Cohesion: 0.05
Nodes (70): contractConceptsApi, contractLiquidationApi, contractsApi, exportContractAPI(), exportContractsAPI(), getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI() (+62 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.08
Nodes (31): express-validator, EDITABLE_STATUS_VALUES, IDEMPOTENCY_HEADER, createMasterSchemas(), contactsRules(), emailRule(), exportFormatRule(), idempotencyKeyRule() (+23 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (30): ADR-0001, THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController() (+22 more)

### Community 13 - "statements.service.js"
Cohesion: 0.09
Nodes (45): GLOSS_FIELD_NAMES, statementGlosses(), statementsGlosses(), INVOICE_STATES, amountColumnsOf(), amountTotalsOf(), assertUniqueNumber(), assertValues() (+37 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (33): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+25 more)

### Community 15 - "ProfilePage.jsx"
Cohesion: 0.12
Nodes (26): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS (+18 more)

### Community 16 - "main.routes.js"
Cohesion: 0.05
Nodes (54): express, getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), canViewAllWorks(), createMasterControllers() (+46 more)

### Community 17 - "status.constants.js"
Cohesion: 0.07
Nodes (37): adapter, describeTarget(), prisma, testConnection(), ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, buildLockPlan() (+29 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (23): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+15 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.08
Nodes (35): jsonwebtoken, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO(), ACCESS_COOKIE_NAME (+27 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.05
Nodes (66): ADR-0013, ADR-0021, ADR-0023, server_src_common_utils_money_utils_percentfor, dateRangeFilter(), invoiceAdvanceWhere(), CONTRACT_TAX_FIELDS, CONTRACT_TAX_MONEY_COLUMNS (+58 more)

### Community 22 - "seed.demo.js"
Cohesion: 0.06
Nodes (51): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+43 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "contracts.service.js"
Cohesion: 0.09
Nodes (52): ADR-0006, ADR-0016, ADR-0018, dateOnlyText(), contractsWithPendingAdvanceWhere(), contractOf(), advanceWhereOf(), assertContractType() (+44 more)

### Community 25 - "contractReports.service.js"
Cohesion: 0.05
Nodes (84): findExportRows(), renderExport(), policyExpiringDays(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES (+76 more)

### Community 26 - "contractConcepts.service.test.js"
Cohesion: 0.06
Nodes (26): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+18 more)

### Community 27 - "ContractDetailPage.jsx"
Cohesion: 0.06
Nodes (84): changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, showInfo(), showObligatorios(), SubCard(), ContactsList() (+76 more)

### Community 28 - "master.service.js"
Cohesion: 0.10
Nodes (37): capitalize(), createMasterService(), httpError(), ADR-0003, ADR-0004, ADR-0013, ADR-0027, scopeWhere() (+29 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "invoiceGlosses.service.js"
Cohesion: 0.16
Nodes (31): glossFieldFor(), assertFieldFor(), assertNotCancelled(), auditable(), AUDITED, createGloss(), deleteGloss(), findLockedInvoice() (+23 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 32 - "providers.routes.js"
Cohesion: 0.09
Nodes (30): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+22 more)

### Community 33 - "DocumentManagement.jsx"
Cohesion: 0.32
Nodes (11): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+3 more)

### Community 34 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 38 - "contracts.controller.js"
Cohesion: 0.04
Nodes (84): auditContext(), getEffectivePermissionIds(), moneyRule(), optionalDate(), percentRule(), getDashboardSummaryController, getWorkDashboardController, ADR-0002 (+76 more)

### Community 39 - "cron/index.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+8 more)

### Community 40 - "works.service.js"
Cohesion: 0.06
Nodes (73): ADR-0007, diffFields(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS (+65 more)

### Community 41 - "contractPolicies.service.js"
Cohesion: 0.14
Nodes (26): assertMasters(), assertTypeFree(), auditable(), cancelPolicy(), conceptLabel(), createPolicy(), createPolicyVersion(), findCurrentLocked() (+18 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "statements.routes.js"
Cohesion: 0.10
Nodes (30): sendExport(), handleExport(), changeStatementStatusController, deleteStatementController, exportStatementController, exportStatementGroupController, getStatementController, getStatementGroupReportController (+22 more)

### Community 45 - "users.service.js"
Cohesion: 0.07
Nodes (29): ADR-0004, bcrypt, defineMaster(), hashPassword(), DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS (+21 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.12
Nodes (14): `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users` (+6 more)

### Community 50 - "workDashboard.service.js"
Cohesion: 0.10
Nodes (39): ADR-0011, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+31 more)

### Community 51 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 52 - "decimal"
Cohesion: 0.08
Nodes (46): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent() (+38 more)

### Community 53 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "GeneralDashboard.jsx"
Cohesion: 0.05
Nodes (59): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), getMyWorksSelectAPI() (+51 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.07
Nodes (24): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+16 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "fMoneyText"
Cohesion: 0.06
Nodes (103): useSchemePalette(), MainCard(), contractAlertOptions(), fMoneyText(), fPercentText(), FigureRow(), InvoiceAmounts(), LiquidationRetention() (+95 more)

### Community 59 - "contractTerms.js"
Cohesion: 0.12
Nodes (23): derivedEndDate(), previewContractConcept(), previewContractEndDate(), blank(), conceptDraftOf(), CONTRACT_ALERT_NAMES, CONTRACT_STATES, CONTRACT_TRANSITIONS (+15 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "permissions.constants.js"
Cohesion: 0.06
Nodes (39): ADR-0012, ADR-0019, ADR-0025, ADR-0026, ADR-0011, ADR-0016, ADR-0018, PERMISSIONS (+31 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.07
Nodes (30): ref_fs, ref_path, ref_url, status(), citations, DECISIONS, files(), ROOT (+22 more)

### Community 68 - "audit.service.js"
Cohesion: 0.08
Nodes (38): ref_crypto, auditMisuse(), buildRows(), ADR-0013, ADR-0027, protect(), REDACTED, SENSITIVE_FIELDS (+30 more)

### Community 70 - "invoiceTerms.js"
Cohesion: 0.12
Nodes (20): isContractCreate(), isCreate(), isSimpleCreate(), cancelTransitionFor(), GLOSS_FILTER_NAMES, GLOSS_FILTERS, hasContract(), httpError() (+12 more)

### Community 71 - "AdvanceAmountsSection.jsx"
Cohesion: 0.29
Nodes (13): getContractAdvanceAPI(), AdjustableAmount(), AdvanceAmountsSection(), amountLimit(), cents(), exceeds(), isEmpty(), isPositive() (+5 more)

### Community 88 - "invoiceEvidence.service.js"
Cohesion: 0.21
Nodes (12): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+4 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (88): identityDocumentsApi, getPermissionsCatalogAPI(), policyTypesApi, providerTypesApi, reasonsApi, useAuth(), AddressTypePage, ConstructionCompanyPage (+80 more)

### Community 100 - "works.routes.js"
Cohesion: 0.10
Nodes (27): managedWhere(), resolveWorkScope(), selectMyWorks(), changeWorkStateController, changeWorkStatusController, deleteWorkController, exportWorksController, getWorkController (+19 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "StatementsPage.jsx"
Cohesion: 0.10
Nodes (29): exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), StatementsPage, ActionButton(), toneOf(), ConfirmDialog(), DataTable() (+21 more)

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "ContactsEditor.jsx"
Cohesion: 0.09
Nodes (28): addressTypesApi, getAddressTypesSelectAPI, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, insurersApi, getProviderTypeFieldsAPI() (+20 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.05
Nodes (99): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), contractPoliciesApi, suspendContractAPI(), getIdentityDocumentsSelectAPI, getInsurersSelectAPI, invoiceTransitionsApi (+91 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (51): exceljs, pdfkit, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument() (+43 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "contractSuspensions.service.js"
Cohesion: 0.10
Nodes (40): newOperationId(), ADR-0017, REASON_SCOPES, reasonsService, assertContractStillAdmits(), CANCEL_TARGET, cancelContract(), ADR-0027 (+32 more)

### Community 123 - "liquidationTerms.js"
Cohesion: 0.14
Nodes (13): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+5 more)

### Community 124 - "balanceReconciliation.service.js"
Cohesion: 0.28
Nodes (10): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS, findBalanceViolations() (+2 more)

### Community 125 - "AuthenticationRoutes.jsx"
Cohesion: 0.18
Nodes (11): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router (+3 more)

### Community 129 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 130 - "useConfig.js"
Cohesion: 0.22
Nodes (10): ConfigContext, ConfigProvider(), useConfig(), useLocalStorage(), ElevationScroll(), HorizontalBar(), ImageList(), srcset() (+2 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "simpleInvoiceTerms.js"
Cohesion: 0.20
Nodes (15): previewSimpleInvoice(), blank(), composeSimpleInvoice(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023, ADR-0026 (+7 more)

### Community 133 - "App.jsx"
Cohesion: 0.17
Nodes (13): loginAPI(), logoutAPI(), verifyTokenAPI(), refreshSession(), App(), ThemedToastContainer(), AuthContext, AuthProvider() (+5 more)

### Community 134 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 136 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 137 - "contractConcepts.service.js"
Cohesion: 0.12
Nodes (39): AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+31 more)

### Community 140 - "glossFields.js"
Cohesion: 0.21
Nodes (10): ref_node_fs, CONTRACT_LINES, BY_TYPE, fieldAmount(), glossFieldsFor(), NOT_A_FIELD, OTHER_FIELD, INVOICE_TYPES (+2 more)

### Community 142 - "MenuList/index.jsx"
Cohesion: 0.17
Nodes (15): useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), menuEntries(), MenuList(), NavCollapse() (+7 more)

### Community 151 - "AmountPercentField.jsx"
Cohesion: 0.32
Nodes (9): AmountPercentField(), isZero(), MoneyField(), complete(), PercentField(), toText(), toValue(), moneyInputText() (+1 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.25
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), getNotificationCount(), listNotifications(), markAllAsRead(), markAsRead() (+4 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 155 - "AuthForgotPassword.jsx"
Cohesion: 0.18
Nodes (16): forgotPasswordAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), defaultColor, AnimateButton(), CustomFormControl, hasMixed() (+8 more)

### Community 156 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 157 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "expirationNotice.service.js"
Cohesion: 0.07
Nodes (46): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+38 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "advanceFilters.js"
Cohesion: 0.11
Nodes (19): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, isAdvance, ADR-0024 (+11 more)

### Community 181 - "ContractTaxesSection.jsx"
Cohesion: 0.24
Nodes (9): previewContractInvoiceAPI(), MONEY, CONTRACT_TAX_FIELDS, FIELDS, FIELDS_BY_NAME, moneyRules, percentRules(), useContractTaxFields() (+1 more)

### Community 183 - "runIdempotent"
Cohesion: 0.43
Nodes (7): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent()

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 194 - "themes/index.jsx"
Cohesion: 0.11
Nodes (23): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig (+15 more)

### Community 197 - "SimpleAmountsSection.jsx"
Cohesion: 0.43
Nodes (6): previewSimpleInvoiceAPI(), FIELDS, moneyRules(), percentRules(), SIMPLE_AMOUNT_FIELDS, SimpleAmountsSection()

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.15
Nodes (19): endpoints, handlerDrawerOpen(), initialState, Footer(), Header(), ThemeModeSection(), WorkSection(), MainLayout() (+11 more)

### Community 199 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): percent(), ALL, CONCEPTS, CONTRACT, OWN, prismaMock

### Community 201 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 202 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 203 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 204 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 206 - "writeAudit"
Cohesion: 0.12
Nodes (33): AUDIT_ENTITIES, AUDIT_OPERATIONS, writeAudit(), withLockedTransaction(), ADR-0019, updateAccount(), assertNotCancelled(), auditable() (+25 more)

### Community 211 - "ref_jest_globals"
Cohesion: 0.06
Nodes (18): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+10 more)

### Community 212 - "app.service.js"
Cohesion: 0.07
Nodes (28): assertModeUnchangedInUse(), httpError(), ADR-0010, providerTypesConfig, getMenu(), getPagesMenu(), getSessionInfo(), getUserPermissions() (+20 more)

### Community 217 - "@mui/material"
Cohesion: 0.05
Nodes (57): client_src_assets_images_interadminpro, ProfileSection(), HeaderAvatar(), MobileSearch(), SearchSection(), appDrawerWidth, gridSpacing, CardSecondaryAction() (+49 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (6): assertInvoiceVisible, ctx, getInvoice, prismaMock, SCOPE, state

### Community 221 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 222 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 224 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 227 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 233 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 235 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 243 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 245 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 246 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **1142 isolated node(s):** `STATUS_TABS`, `CONTRACT_ALERT_OPTIONS`, `CONTRACT_INVOICE_TYPES`, `TERM_UNIT_NAMES`, `ADR-0017` (+1137 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1577 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **110 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Why does `ADR-0002` connect `fMoneyText` to `contracts.service.js`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `useConfig.js`, `App.jsx`, `server/package.json`, `constants.js`, `InvoiceFormPage.jsx`, `ContractsPage.jsx`, `client/package.json`, `MenuList/index.jsx`, `ProfilePage.jsx`, `AmountPercentField.jsx`, `AuthForgotPassword.jsx`, `ContractDetailPage.jsx`, `DocumentManagement.jsx`, `ContractTaxesSection.jsx`, `GeneralDashboard.jsx`, `fMoneyText`, `themes/index.jsx`, `SimpleAmountsSection.jsx`, `MainLayout/index.jsx`, `AdvanceAmountsSection.jsx`, `useAuth`, `StatementsPage.jsx`, `ContactsEditor.jsx`, `showError`, `EasyCrop.jsx`, `AuthenticationRoutes.jsx`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **What connects `STATUS_TABS`, `CONTRACT_ALERT_OPTIONS`, `CONTRACT_INVOICE_TYPES` to the rest of the system?**
  _1142 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `moneyText` be split into smaller, more focused modules?**
  _Cohesion score 0.10823311748381129 - nodes in this community are weakly interconnected._
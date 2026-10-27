# Graph Report - WEBPAC-INTERVE  (2026-10-27)

## Corpus Check
- 678 files · ~384,095 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4177 nodes · 11870 edges · 234 communities (128 shown, 106 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 157 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6631e583`
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
- statements.routes.js
- auth.routes.js
- statements.service.js
- client/package.json
- status.constants.js
- main.routes.js
- auth.service.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- useConfig.js
- `tbl_users`
- contracts.controller.test.js
- invoiceFollowUps.service.js
- contractSuspensions.service.test.js
- WorkDetailPage.jsx
- contractReports.service.js
- invoices.controller.test.js
- constants.js
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
- src/index.jsx
- contractPolicies.service.js
- scripts
- app.js
- `tbl_invoices`
- ProfilePage.jsx
- uniqueConstraints.constants.test.js
- decimal
- contractLiquidation.service.test.js
- `tbl_contract_type_fields`
- InvoicesPage.jsx
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
- assertInScope
- simpleInvoiceTerms.js
- workScopeOf
- `tbl_contract_status_history`
- invoiceEvidence.service.js
- `tbl_status`
- authContext.jsx
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- ProviderTypePage.jsx
- statements.service.test.js
- MenuList/index.jsx
- `tbl_works`
- `tbl_policies`
- react
- export.service.js
- works.service.test.js
- error.middleware.js
- contractConcepts.service.js
- `tbl_providers`
- error.middleware.test.js
- contractFields.js
- ContactsEditor.jsx
- serviceWorker.jsx
- App.jsx
- `tbl_providers`
- winston.config.js
- session.service.test.js
- AuthForgotPassword.jsx
- pagination.utils.js
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
- ForgotPassword.jsx
- balanceReconciliation.service.js
- identityDocuments.service.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- AuthenticationRoutes.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- socket.js
- decisionReferences.guard.test.js
- contractConcepts.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- useAuth
- MainLayout/index.jsx
- workDashboard.service.js
- dashboard.service.test.js
- workScope.service.js
- ref_jest_globals
- app.service.test.js
- Sidebar/index.jsx
- addressTypes.contacts.js
- app.service.js
- `tbl_invoices`
- `tbl_invoices`
- @mui/material
- `tbl_statements`
- master.service.test.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- policyTypes.service.test.js
- useMenuCollapse.js
- `tbl_invoice_glosses`
- `tbl_works`
- auth.service.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 151 edges
2. `react` - 117 edges
3. `showError()` - 100 edges
4. `workScopeOf()` - 87 edges
5. `writeAudit()` - 80 edges
6. `dateOnlyText()` - 80 edges
7. `useAuth()` - 79 edges
8. `moneyText()` - 78 edges
9. `withLockedTransaction()` - 77 edges
10. `showSuccess()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `percentQuery()` --calls--> `decimal()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/money.utils.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `getUserPermissions()` --calls--> `getEffectivePermissionIds()`  [EXTRACTED]
  server/src/modules/app/general/app.service.js → server/src/common/services/effectivePermissions.service.js
- `PrivateRoute()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/routes/PrivateRoute.jsx → client/src/contexts/authContext.jsx

## Import Cycles
- None detected.

## Communities (234 total, 106 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DateTimePickerToolbar() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "moneyText"
Cohesion: 0.10
Nodes (40): HUNDRED, isBlank(), MONEY_SCALE, moneyText(), PERCENT_SCALE, percentOf(), percentText(), RATIO_SCALE (+32 more)

### Community 3 - "writeAudit"
Cohesion: 0.06
Nodes (64): ADR-0001, ADR-0027, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0013, ADR-0027 (+56 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (37): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+29 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (36): ADR-0009, applyProviderTypes(), ASSIGNMENT_IDEMPOTENCY, ASSIGNMENT_LIST_SELECT, AUDITED_HEADER, checkIdentification(), CLASSIFICATIONS_SELECT, contactsHelper (+28 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (55): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoicesApi (+47 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.04
Nodes (81): INVOICE_ADVANCE_FILTERS, CONTRACT_PAIRS, CONTRACT_TAX_FIELDS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController (+73 more)

### Community 9 - "contracts.routes.js"
Cohesion: 0.08
Nodes (42): moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), ADR-0006, ADR-0016, ADR-0017 (+34 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.05
Nodes (64): getConstructionCompaniesSelectAPI, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), previewContractConceptAPI(), previewContractEndDateAPI(), getContractTypesSelectAPI, getInsurersSelectAPI (+56 more)

### Community 11 - "statements.routes.js"
Cohesion: 0.06
Nodes (46): express-validator, EDITABLE_STATUS_VALUES, IDEMPOTENCY_HEADER, revokeSession(), createMasterSchemas(), contactsRules(), emailRule(), idempotencyKeyRule() (+38 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.10
Nodes (43): statementGlosses(), statementsGlosses(), statementInvoices(), assertUniqueNumber(), assertValues(), auditable(), AUDITED, buildReport() (+35 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (43): compat, __dirname, __filename, browserslist, development, production, eslintConfig, extends (+35 more)

### Community 15 - "status.constants.js"
Cohesion: 0.06
Nodes (45): ADR-0004, @prisma/adapter-mariadb, adapter, describeTarget(), prisma, testConnection(), ACTIVE_STATUS, DELETED_STATUS (+37 more)

### Community 16 - "main.routes.js"
Cohesion: 0.06
Nodes (44): express, getIO(), verifyToken(), requirePermission(), validate(), createMasterControllers(), createMasterRouter(), businessRulesRoutes (+36 more)

### Community 17 - "auth.service.js"
Cohesion: 0.08
Nodes (35): bcrypt, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+27 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (23): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+15 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "session.service.js"
Cohesion: 0.15
Nodes (18): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+10 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.05
Nodes (100): ADR-0013, ADR-0023, server_src_common_utils_money_utils_percentfor, dateRangeFilter(), isBillingType(), CONTRACT_TAX_MONEY_COLUMNS, CONTRACT_TAX_PERCENT_COLUMNS, server_src_modules_billing_invoices_invoicemenus_issimplemode (+92 more)

### Community 22 - "useConfig.js"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 25 - "invoiceFollowUps.service.js"
Cohesion: 0.25
Nodes (20): todayDateOnly(), assertNotCancelled(), auditable(), AUDITED, closeFollowUp(), deleteFollowUp(), findLockedInvoice(), findLockedOpen() (+12 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.05
Nodes (27): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+19 more)

### Community 27 - "WorkDetailPage.jsx"
Cohesion: 0.08
Nodes (40): changeWorkStateAPI(), exportWorksAPI(), getWorkManagersSelectAPI(), getWorksSummaryAPI(), previewWorkEndDateAPI(), worksApi, ADR-0002, useLinkedFilters() (+32 more)

### Community 28 - "contractReports.service.js"
Cohesion: 0.05
Nodes (69): findExportRows(), inScope(), scopeOf(), scopeWhere(), FIELD_BY_KEY, getRuleValues(), httpError(), ADR-0002 (+61 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "constants.js"
Cohesion: 0.05
Nodes (47): contractConceptsApi, contractLiquidationApi, contractPoliciesApi, contractsApi, exportContractsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractMenuAPI() (+39 more)

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
Cohesion: 0.13
Nodes (15): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+7 more)

### Community 40 - "works.service.js"
Cohesion: 0.07
Nodes (64): ADR-0007, MAX_ROWS, addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel() (+56 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (44): ADR-0012, ADR-0017, ADR-0019, ADR-0025, ADR-0026, ADR-0011, ADR-0016, ADR-0018 (+36 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.15
Nodes (13): client_src_assets_scss_style, config, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals() (+5 more)

### Community 45 - "contractPolicies.service.js"
Cohesion: 0.07
Nodes (50): AUDIT_ENTITIES, insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, policyBaseValue(), configurePolicyTypeBase() (+42 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "ProfilePage.jsx"
Cohesion: 0.12
Nodes (23): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS (+15 more)

### Community 51 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 52 - "decimal"
Cohesion: 0.09
Nodes (47): decimal(), ratioText(), roundMoney(), advanceBalances(), appliedPct(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits() (+39 more)

### Community 53 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "InvoicesPage.jsx"
Cohesion: 0.11
Nodes (21): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenu, LinkedFilterNotice(), INVOICE_ADVANCE_FILTER_OPTIONS, INVOICE_MODE_TYPES (+13 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (35): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+27 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkChartsTab.jsx"
Cohesion: 0.05
Nodes (96): useSchemePalette(), MainCard(), CONTRACT_ADVANCE_FILTER_OPTIONS, ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter(), AdvanceLegend(), matchesAdvanceFilter() (+88 more)

### Community 59 - "httpCliente.js"
Cohesion: 0.08
Nodes (31): getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, RETRY_503_HINT, pickWork(), useWorkFilterField(), useWorkScope() (+23 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "contracts.service.js"
Cohesion: 0.05
Nodes (79): ADR-0006, ADR-0016, ADR-0018, userFullName(), FIELD_GROUPS, typeAppliesAiu(), contractsWithPendingAdvanceWhere(), daysBetween() (+71 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.13
Nodes (13): ref_fs, ref_path, ref_url, catalog, expected, prismaMock, ADR-0027, loggerMock (+5 more)

### Community 68 - "assertInScope"
Cohesion: 0.19
Nodes (24): assertInScope(), applyAssignmentTypes(), assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes(), assertTypeIds(), assertWorkAssignable() (+16 more)

### Community 70 - "simpleInvoiceTerms.js"
Cohesion: 0.18
Nodes (16): previewSimpleInvoice(), blank(), composeSimpleInvoice(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023, ADR-0026 (+8 more)

### Community 71 - "workScopeOf"
Cohesion: 0.07
Nodes (58): auditContext(), getEffectivePermissionIds(), sendExport(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, handleExport() (+50 more)

### Community 88 - "invoiceEvidence.service.js"
Cohesion: 0.15
Nodes (14): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+6 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "authContext.jsx"
Cohesion: 0.03
Nodes (84): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), ADR-0019, policyTypesApi (+76 more)

### Community 100 - "works.routes.js"
Cohesion: 0.11
Nodes (25): exportFormatRule(), changeWorkStateController, changeWorkStatusController, deleteWorkController, exportWorksController, getWorkController, INPUT_FIELDS, notify() (+17 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "ProviderTypePage.jsx"
Cohesion: 0.13
Nodes (19): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, INVOICE_MODE_OPTIONS, INVOICE_MODES, invoiceModeName(), DATA_TYPE_NAMES (+11 more)

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "MenuList/index.jsx"
Cohesion: 0.29
Nodes (9): getMenuAPI(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts, setContractMenus(), work (+1 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "react"
Cohesion: 0.05
Nodes (97): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI(), getModulesAPI() (+89 more)

### Community 117 - "export.service.js"
Cohesion: 0.05
Nodes (59): exceljs, ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile() (+51 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "contractConcepts.service.js"
Cohesion: 0.09
Nodes (68): newOperationId(), withContractAiu(), resolveContractTypeFields(), CANCEL_TARGET, cancelContract(), ADR-0027, text(), activeSequence() (+60 more)

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "contractFields.js"
Cohesion: 0.13
Nodes (15): AIU_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, ADR-0026 (+7 more)

### Community 125 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 129 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 130 - "App.jsx"
Cohesion: 0.13
Nodes (17): refreshSession(), App(), ThemedToastContainer(), CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext, NavigationScroll() (+9 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 133 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 134 - "AuthForgotPassword.jsx"
Cohesion: 0.13
Nodes (22): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider() (+14 more)

### Community 136 - "pagination.utils.js"
Cohesion: 0.22
Nodes (15): containsFilter(), countByStatus(), DEFAULT_ROWS, filtersWhere(), idFilter(), paginate(), resolvePagination(), searchWhere() (+7 more)

### Community 137 - "seed.demo.js"
Cohesion: 0.05
Nodes (56): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+48 more)

### Community 140 - "floatingPoint.guard.test.js"
Cohesion: 0.29
Nodes (5): ALLOWED, files(), lines, SRC, text()

### Community 142 - "liquidationTerms.js"
Cohesion: 0.13
Nodes (14): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+6 more)

### Community 151 - "expirationNotice.service.js"
Cohesion: 0.06
Nodes (44): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+36 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 155 - "ForgotPassword.jsx"
Cohesion: 0.19
Nodes (12): client_src_assets_images_interadminpro, LogoSection(), LoginPage, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo() (+4 more)

### Community 156 - "balanceReconciliation.service.js"
Cohesion: 0.22
Nodes (13): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), contractBalanceReconciliationJob, insertNotification() (+5 more)

### Community 157 - "identityDocuments.service.js"
Cohesion: 0.14
Nodes (14): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, identityDocumentsRoutes, identityDocumentsConfig (+6 more)

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "AuthenticationRoutes.jsx"
Cohesion: 0.19
Nodes (10): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router, MainRoutes (+2 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.14
Nodes (10): @prisma/client, CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients (+2 more)

### Community 179 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 181 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 183 - "contractConcepts.service.test.js"
Cohesion: 0.17
Nodes (6): ctx, ADR-0016, ADR-0027, notifyWorkManagers, prismaMock, state

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

### Community 197 - "useAuth"
Cohesion: 0.05
Nodes (82): exportContractAPI(), exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), useAuth(), ActionButton(), DataTable(), DataList() (+74 more)

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.23
Nodes (14): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), Footer(), Header(), ThemeModeSection(), MainLayout() (+6 more)

### Community 199 - "workDashboard.service.js"
Cohesion: 0.06
Nodes (62): ADR-0011, ratioPercent(), sumMoney(), ADVANCE_LEVELS, advanceBar(), advanceLevel(), alertsOf(), balancesOf() (+54 more)

### Community 201 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 202 - "workScope.service.js"
Cohesion: 0.33
Nodes (9): hasEffectivePermission(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), managedWhere(), resolveWorkScope(), selectMyWorks() (+1 more)

### Community 203 - "ref_jest_globals"
Cohesion: 0.04
Nodes (30): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+22 more)

### Community 204 - "app.service.test.js"
Cohesion: 0.22
Nodes (6): BILLING, CONTRACTS, DASHBOARD, HOME, prismaMock, state

### Community 206 - "Sidebar/index.jsx"
Cohesion: 0.52
Nodes (5): Sidebar(), closedMixin(), MiniDrawerStyled, openedMixin(), drawerWidth

### Community 211 - "addressTypes.contacts.js"
Cohesion: 0.47
Nodes (5): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText()

### Community 212 - "app.service.js"
Cohesion: 0.11
Nodes (22): assertModeUnchangedInUse(), httpError(), ADR-0010, providerTypesConfig, providerTypesService, getMenu(), getPagesMenu(), getSessionInfo() (+14 more)

### Community 217 - "@mui/material"
Cohesion: 0.04
Nodes (72): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, client_src_hooks_useinvoicemenus_useinvoicemenus, PrivateRoute(), appDrawerWidth, gridSpacing, CardSecondaryAction() (+64 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.20
Nodes (5): assertInvoiceVisible, ctx, prismaMock, SCOPE, state

### Community 221 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 222 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 234 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

## Knowledge Gaps
- **1134 isolated node(s):** `CONTRACT_TYPES`, `SIMPLE_CAPTURED`, `CONTRACT_CAPTURED`, `TABS`, `ADR-0020` (+1129 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1565 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **106 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0002` connect `WorkChartsTab.jsx` to `contracts.service.js`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `ADR-0017` connect `permissions.constants.js` to `invoices.service.js`, `contracts.service.js`, `InvoiceFormPage.jsx`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `App.jsx`, `server/package.json`, `AuthForgotPassword.jsx`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `client/package.json`, `useConfig.js`, `WorkDetailPage.jsx`, `ForgotPassword.jsx`, `constants.js`, `menu-items/index.js`, `DocumentManagement.jsx`, `NotificationSection/index.jsx`, `AuthenticationRoutes.jsx`, `ProfilePage.jsx`, `InvoicesPage.jsx`, `WorkChartsTab.jsx`, `httpCliente.js`, `withAlpha`, `useAuth`, `MainLayout/index.jsx`, `Sidebar/index.jsx`, `authContext.jsx`, `ProviderTypePage.jsx`, `MenuList/index.jsx`, `react`, `ContactsEditor.jsx`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **What connects `CONTRACT_TYPES`, `SIMPLE_CAPTURED`, `CONTRACT_CAPTURED` to the rest of the system?**
  _1134 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08686868686868687 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `moneyText` be split into smaller, more focused modules?**
  _Cohesion score 0.10404040404040404 - nodes in this community are weakly interconnected._
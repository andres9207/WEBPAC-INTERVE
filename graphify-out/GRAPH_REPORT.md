# Graph Report - WEBPAC-INTERVE  (2026-10-29)

## Corpus Check
- 701 files · ~415,529 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4462 nodes · 12660 edges · 247 communities (136 shown, 111 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 167 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fc3b1c70`
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
- formatTime.js
- WorksPage.jsx
- auth.routes.js
- statements.service.js
- client/package.json
- @mui/material
- workScopeOf
- workDashboard.service.js
- invoices.service.test.js
- compilerOptions
- permissions.constants.js
- invoices.service.js
- contractInvoiceTerms.js
- `tbl_users`
- simpleInvoiceTerms.js
- contractTerms.js
- contractSuspensions.service.test.js
- contractSuspensions.service.js
- contractPolicies.service.js
- invoices.controller.test.js
- invoiceGlosses.service.js
- @tabler/icons-react
- dateOnlyText
- showError
- `tbl_contract_concepts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- fMoneyText
- contracts.routes.js
- cron/index.js
- works.service.js
- auth.service.js
- devDependencies
- WorkScopeContext.jsx
- master.service.js
- scripts
- httpError
- `tbl_contracts`
- StatementReportDialog.jsx
- app.js
- decimal
- dashboard.service.js
- `tbl_contract_type_fields`
- liquidationTerms.js
- transaction.mock.js
- scripts
- WorkSummaryTab.jsx
- AuthContext.jsx
- compilerOptions
- excelJS.js
- GeneralDashboard.jsx
- permission
- devDependencies
- transaction.service.test.js
- renderExport
- seed.demo.js
- getIO
- `tbl_contract_status_history`
- invoiceTerms.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- main.routes.js
- statements.service.test.js
- notifications.service.js
- `tbl_works`
- `tbl_policies`
- ContractDetailPage.jsx
- export.service.js
- works.service.test.js
- error.middleware.js
- app.service.js
- `tbl_providers`
- advanceFilters.js
- effectivePermissions.service.js
- session.service.js
- addressTypes.service.js
- contractConcepts.service.test.js
- `tbl_providers`
- requestedDetailChanges
- ci-summary.mjs
- contracts.controller.test.js
- WorkCosts.jsx
- contracts.service.js
- invoiceEvidence.service.js
- eslint.config.mjs
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- src/index.jsx
- `tbl_user_permissions`
- statements.routes.js
- mailerService.js
- health.service.js
- dashboard.measure.js
- importCase.guard.test.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- businessRules.service.js
- `tbl_users`
- balanceReconciliation.service.test.js
- contractEndDateReconciliation.service.test.js
- serviceWorker.jsx
- DocumentManagement.jsx
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- invoiceEvidence.service.test.js
- workDashboard.utils.js
- react
- auth.service.test.js
- socket.js
- dashboardDetail.service.test.js
- browserslist
- session.service.test.js
- validation.utils.js
- ref_jest_globals
- contractReports.service.js
- `tbl_invoices`
- `tbl_invoices`
- writeAudit
- `tbl_statements`
- invoiceFollowUps.service.js
- invoiceGlosses.service.test.js
- invoiceFollowUps.service.test.js
- uniqueConstraints.constants.test.js
- contractFields.js
- error.middleware.test.js
- extends
- `tbl_works`
- volta
- `tbl_status`
- contractLiquidation.service.test.js
- `tbl_users`
- `tbl_work_stages`
- contractCancellation.service.test.js
- master.service.test.js
- contractNotifications.service.test.js
- expirationNotice.service.js
- DebouncedInput.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 154 edges
2. `react` - 120 edges
3. `showError()` - 104 edges
4. `workScopeOf()` - 94 edges
5. `moneyText()` - 90 edges
6. `dateOnlyText()` - 88 edges
7. `writeAudit()` - 81 edges
8. `useAuth()` - 79 edges
9. `withLockedTransaction()` - 77 edges
10. `fMoneyText()` - 71 edges

## Surprising Connections (you probably didn't know these)
- `percentQuery()` --calls--> `decimal()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/money.utils.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `getUserPermissions()` --calls--> `getEffectivePermissionIds()`  [EXTRACTED]
  server/src/modules/app/general/app.service.js → server/src/common/services/effectivePermissions.service.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js

## Import Cycles
- None detected.

## Communities (247 total, 111 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.05
Nodes (45): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Avatar() (+37 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "WorkContracts.jsx"
Cohesion: 0.20
Nodes (20): AlertChips(), contractAlertOptions(), fPercentText(), ADVANCE_LEVELS, AdvanceFilter(), matchesAdvanceFilter(), matchesAdvanceLegend(), ContractCard() (+12 more)

### Community 3 - "providers.routes.js"
Cohesion: 0.08
Nodes (36): canViewAllWorks(), exportFormatRule(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, exportProvidersController (+28 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.04
Nodes (45): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+37 more)

### Community 6 - "providers.service.js"
Cohesion: 0.07
Nodes (71): ADR-0009, filtersWhere(), idFilter(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope() (+63 more)

### Community 7 - "constants.js"
Cohesion: 0.03
Nodes (88): contractConceptsApi, contractLiquidationApi, contractsApi, exportContractAPI(), exportContractsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractMenuAPI() (+80 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.04
Nodes (73): CONTRACT_PAIRS, CONTRACT_TAX_FIELDS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, closeInvoiceFollowUpController, deleteInvoiceFollowUpController, deleteInvoiceGlossController, exportInvoicesController, getContractAdvanceController (+65 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.05
Nodes (66): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoicesApi (+58 more)

### Community 10 - "formatTime.js"
Cohesion: 0.06
Nodes (47): getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), previewContractConceptAPI(), previewContractEndDateAPI(), useEndDatePreview(), TERM_UNIT_OPTIONS, SHORT_MONTHS (+39 more)

### Community 11 - "WorksPage.jsx"
Cohesion: 0.07
Nodes (38): getAddressTypesSelectAPI, getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getProviderTypeFieldsAPI(), saveProviderTypeFieldsAPI(), getSupervisionTypesSelectAPI, exportWorksAPI(), getWorkFilterManagersAPI() (+30 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.08
Nodes (58): renderDocument(), assertInScope(), containsFilter(), statementGlosses(), statementsWithGlosses(), statementInvoices(), statementsInvoices(), affectingValueOf() (+50 more)

### Community 14 - "client/package.json"
Cohesion: 0.08
Nodes (25): axios, eslint, @eslint/js, eslint-plugin-sonarjs, moment, name, packageManager, private (+17 more)

### Community 15 - "@mui/material"
Cohesion: 0.07
Nodes (39): getWorksSummaryAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, SubCard(), ACTION_TONES, ActionButton() (+31 more)

### Community 16 - "workScopeOf"
Cohesion: 0.08
Nodes (60): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardDetailController, getDashboardSummaryController, getWorkDashboardController, ADR-0002, approveInvoiceController (+52 more)

### Community 17 - "workDashboard.service.js"
Cohesion: 0.10
Nodes (51): moneyText(), ratioPercent(), sumMoney(), ADVANCE_LEVELS, advanceBar(), advanceLevel(), alertsOf(), balancesOf() (+43 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (22): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+14 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "permissions.constants.js"
Cohesion: 0.08
Nodes (32): ADR-0011, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020, ADR-0024, ADR-0025 (+24 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.06
Nodes (55): ADR-0013, ADR-0021, ADR-0023, server_src_modules_billing_invoices_invoicemenus_issimplemode, server_src_modules_billing_invoices_invoicemenus_simple_type_where, admittedContractsWhere(), admittedTypes(), amountRange() (+47 more)

### Community 22 - "contractInvoiceTerms.js"
Cohesion: 0.11
Nodes (35): percentOf(), percentText(), toPercent(), assertContractTotal(), blank(), composeContractInvoice(), composeWith(), CONTRACT_FORMULA_VERSION (+27 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "simpleInvoiceTerms.js"
Cohesion: 0.16
Nodes (15): previewSimpleInvoice(), blank(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023, ADR-0026, SIMPLE_FIELDS (+7 more)

### Community 25 - "contractTerms.js"
Cohesion: 0.10
Nodes (23): server_src_common_utils_money_utils_percentfor, previewContractConcept(), blank(), conceptDraftOf(), CONTRACT_ALERT_NAMES, CONTRACT_TRANSITIONS, DENIED, INVOICE_ACTIONS (+15 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (24): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx, prismaMock (+16 more)

### Community 27 - "contractSuspensions.service.js"
Cohesion: 0.10
Nodes (34): adapter, describeTarget(), prisma, testConnection(), reasonsRoutes, ADR-0017, REASON_SCOPES, reasonsConfig (+26 more)

### Community 28 - "contractPolicies.service.js"
Cohesion: 0.09
Nodes (36): newOperationId(), POLICY_BASE_NAMES, configurePolicyTypeBase(), httpError(), ADR-0019, policyTypesService, evaluateLiquidation(), ADR-0017 (+28 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "invoiceGlosses.service.js"
Cohesion: 0.09
Nodes (52): BY_TYPE, byCatalog(), CATALOG_ORDER, fieldAmount(), GLOSS_FIELD_NAMES, GLOSS_LINES_SELECT, glossFieldFor(), glossFieldsFor() (+44 more)

### Community 31 - "@tabler/icons-react"
Cohesion: 0.08
Nodes (26): admin, icons, billing, dashboard, icons, menuItems, icons, other (+18 more)

### Community 32 - "dateOnlyText"
Cohesion: 0.12
Nodes (34): addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress() (+26 more)

### Community 33 - "showError"
Cohesion: 0.04
Nodes (116): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), contractPoliciesApi, suspendContractAPI(), getIdentityDocumentsSelectAPI, getInsurersSelectAPI, invoiceTransitionsApi (+108 more)

### Community 34 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "fMoneyText"
Cohesion: 0.15
Nodes (34): fMoneyText(), contractRows(), glossRows(), invoiceRows(), advanceDrill(), Advances(), CardTitle(), clickableChartSx (+26 more)

### Community 38 - "contracts.routes.js"
Cohesion: 0.07
Nodes (44): moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), previewContractConceptController, contractsRoutes, ADR-0006 (+36 more)

### Community 39 - "cron/index.js"
Cohesion: 0.17
Nodes (11): node-cron, cronJobs, ADR-0017, registeredTasks, startCronJobs(), stopCronJobs(), wrapHandler(), contractBalanceReconciliationJob (+3 more)

### Community 40 - "works.service.js"
Cohesion: 0.08
Nodes (48): ADR-0007, dateRangeFilter(), applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted(), assertHeader() (+40 more)

### Community 41 - "auth.service.js"
Cohesion: 0.08
Nodes (37): bcrypt, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+29 more)

### Community 42 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+6 more)

### Community 44 - "WorkScopeContext.jsx"
Cohesion: 0.05
Nodes (55): getStatusesByScopeAPI(), getWorkDashboardAPI(), getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), exportProvidersAPI(), paginationStatementGroupsAPI() (+47 more)

### Community 45 - "master.service.js"
Cohesion: 0.05
Nodes (55): INACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent() (+47 more)

### Community 46 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+11 more)

### Community 48 - "httpError"
Cohesion: 0.17
Nodes (29): approveInvoice(), assertContractAdmitsCancel(), assertNoReleasedGlossLinks(), assertReleasesNoGlosses(), assertStage(), assertUniqueNumber(), assertWork(), auditable() (+21 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.12
Nodes (14): `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users` (+6 more)

### Community 50 - "StatementReportDialog.jsx"
Cohesion: 0.15
Nodes (20): exportStatementGroupAPI(), getStatementGroupReportAPI(), download(), downloadExport(), errorMessage(), EXPORT_FORMATS, ExportButton(), ExportDialog() (+12 more)

### Community 51 - "app.js"
Cohesion: 0.09
Nodes (20): compression, cookie-parser, cors, dotenv, express-fileupload, express-rate-limit, helmet, ref_http (+12 more)

### Community 52 - "decimal"
Cohesion: 0.07
Nodes (54): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioText() (+46 more)

### Community 53 - "dashboard.service.js"
Cohesion: 0.09
Nodes (40): scopeWhere(), getRuleValues(), policyExpiringDays(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock(), invoicesWhere() (+32 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "liquidationTerms.js"
Cohesion: 0.14
Nodes (13): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+5 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkSummaryTab.jsx"
Cohesion: 0.17
Nodes (22): MainCard(), daysOpenText(), followUpRows(), followUpsDrill(), num, initialsOf(), MANAGER_ROLE_NAMES, plural() (+14 more)

### Community 59 - "AuthContext.jsx"
Cohesion: 0.11
Nodes (25): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), refreshSession() (+17 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "GeneralDashboard.jsx"
Cohesion: 0.11
Nodes (31): getDashboardDetailAPI(), getDashboardSummaryAPI(), ADR-0002, client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenus, invoicePath(), ContractBalanceCards(), DashboardCards() (+23 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-sonarjs, globals, jest, nodemon, pm2 (+2 more)

### Community 66 - "transaction.service.test.js"
Cohesion: 0.08
Nodes (23): ref_fs, ref_path, ref_url, citations, DECISIONS, files(), ROOT, SELF (+15 more)

### Community 68 - "renderExport"
Cohesion: 0.18
Nodes (13): findExportRows(), renderExport(), exportInvoices(), invoiceExportTotals(), toListDto(), contractOf(), contractsOfRows(), exportContractReport() (+5 more)

### Community 70 - "seed.demo.js"
Cohesion: 0.05
Nodes (57): ADR-0002, ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure() (+49 more)

### Community 71 - "getIO"
Cohesion: 0.11
Nodes (19): getIO(), configurePolicyTypeBaseController, FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, getProviderTypeFieldsSchema, saveProviderTypeFieldsSchema (+11 more)

### Community 88 - "invoiceTerms.js"
Cohesion: 0.13
Nodes (19): isContractCreate(), isCreate(), isSimpleCreate(), cancelTransitionFor(), GLOSS_FILTER_NAMES, GLOSS_FILTERS, hasContract(), httpError() (+11 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (98): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, policyTypesApi, deleteProfileAPI(), paginationProfilesAPI() (+90 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.08
Nodes (35): ALL, assertAnyInScope(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf(), selectMyWorks() (+27 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "main.routes.js"
Cohesion: 0.05
Nodes (61): express, supertest, STATUS_KEYS, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER (+53 more)

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
Nodes (83): changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, InvoiceDetailPage, ContactsList(), ADR-0009, DataList() (+75 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (57): exceljs, pdfkit, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument() (+49 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.19
Nodes (18): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0012 (+10 more)

### Community 120 - "app.service.js"
Cohesion: 0.09
Nodes (22): getMenu(), getPagesMenu(), getSessionInfo(), getUserPermissions(), PAGE_SELECT, toChild(), toParent(), withContractMenus() (+14 more)

### Community 123 - "advanceFilters.js"
Cohesion: 0.11
Nodes (20): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+12 more)

### Community 124 - "effectivePermissions.service.js"
Cohesion: 0.23
Nodes (11): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS, findBalanceViolations() (+3 more)

### Community 125 - "session.service.js"
Cohesion: 0.15
Nodes (18): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+10 more)

### Community 129 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 130 - "contractConcepts.service.test.js"
Cohesion: 0.17
Nodes (6): ctx, ADR-0016, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "requestedDetailChanges"
Cohesion: 0.24
Nodes (10): isBillingType(), approvalSnapshot(), detailChanges(), detailText(), isSimpleType(), requestedDetailChanges(), simpleSnapshot(), SNAPSHOT_AMOUNTS (+2 more)

### Community 133 - "ci-summary.mjs"
Cohesion: 0.17
Nodes (20): args, buildSection(), cell(), COLORS, kb(), lineLink(), lintSection(), number() (+12 more)

### Community 134 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 136 - "WorkCosts.jsx"
Cohesion: 0.17
Nodes (19): useSchemePalette(), AdvanceBar(), AdvanceLegend(), num, pendingStripes(), swatchSx, CardTitle(), clickableChartSx (+11 more)

### Community 137 - "contracts.service.js"
Cohesion: 0.08
Nodes (72): ADR-0006, typeAppliesAiu(), withContractAiu(), resolveContractTypeFields(), contractsWithPendingAdvanceWhere(), activeSequence(), amendmentResult(), assertBalancesHold() (+64 more)

### Community 140 - "invoiceEvidence.service.js"
Cohesion: 0.21
Nodes (12): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+4 more)

### Community 142 - "eslint.config.mjs"
Cohesion: 0.12
Nodes (18): asWarnings(), compat, __dirname, __filename, isOff(), @eslint/compat, @eslint/eslintrc, ref_eslint_js (+10 more)

### Community 151 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 153 - "statements.routes.js"
Cohesion: 0.09
Nodes (30): sendExport(), handleExport(), STATEMENT_GLOSS_FILTERS, STATEMENT_VOUCHER_FILTERS, exportStatementController, exportStatementGroupController, getStatementController, getStatementGroupReportController (+22 more)

### Community 154 - "mailerService.js"
Cohesion: 0.22
Nodes (10): imap-simple, nodemailer, emailApp, nameApp, nameAppMail, checkEmailBounces(), saveToSent(), sendEmail() (+2 more)

### Community 155 - "health.service.js"
Cohesion: 0.33
Nodes (5): DB_TIMEOUT_MS, getHealth(), SERVICE_NAME, withTimeout(), prismaMock

### Community 156 - "dashboard.measure.js"
Cohesion: 0.36
Nodes (8): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain()

### Community 157 - "importCase.guard.test.js"
Cohesion: 0.18
Nodes (15): ref_child_process, clientRoots, entries(), files(), gitMismatches, listing, lookup(), mismatches (+7 more)

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "businessRules.service.js"
Cohesion: 0.09
Nodes (26): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+18 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.20
Nodes (10): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoice_gloss_fields`, `tbl_invoice_glosses` (+2 more)

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 181 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 183 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

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

### Community 197 - "workDashboard.utils.js"
Cohesion: 0.15
Nodes (12): Metric(), barPercent(), CONTRACT_STATE_CHART_COLORS, GLOSS_CHART_COLORS, INVOICE_TYPE_COLORS, MENU_CHART_COLORS, menuColor(), MONTH_NAMES (+4 more)

### Community 198 - "react"
Cohesion: 0.04
Nodes (73): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), updateThemeModeAPI(), client_src_assets_images_interadminpro, config (+65 more)

### Community 199 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 201 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 202 - "dashboardDetail.service.test.js"
Cohesion: 0.25
Nodes (4): ALL, EVERYTHING, OWN, prismaMock

### Community 203 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 204 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 206 - "validation.utils.js"
Cohesion: 0.11
Nodes (20): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0027 (+12 more)

### Community 211 - "ref_jest_globals"
Cohesion: 0.06
Nodes (18): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, payload, hasEffectivePermission, prismaMock (+10 more)

### Community 212 - "contractReports.service.js"
Cohesion: 0.06
Nodes (61): insuredValue(), policyBaseValue(), server_src_modules_billing_invoices_invoicemenus_iscontractmode, contractInvoicesForReport(), conceptLabel(), contractInvoices(), liquidationFacts(), conceptLabel() (+53 more)

### Community 217 - "writeAudit"
Cohesion: 0.06
Nodes (53): ADR-0004, ref_crypto, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0001 (+45 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "invoiceFollowUps.service.js"
Cohesion: 0.23
Nodes (21): todayDateOnly(), assertNotCancelled(), auditable(), AUDITED, closeFollowUp(), deleteFollowUp(), findLockedInvoice(), findLockedOpen() (+13 more)

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.13
Nodes (8): assertContractInScope, assertInvoiceVisible, ctx, getInvoice, prismaMock, SCOPE, state, VALUE_LINE

### Community 221 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 222 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 224 - "contractFields.js"
Cohesion: 0.12
Nodes (17): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+9 more)

### Community 226 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 227 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 233 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 237 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 241 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 242 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 243 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 244 - "expirationNotice.service.js"
Cohesion: 0.13
Nodes (24): contractAlertWheres(), CLOSED_STATES, CONTRACT_ALERTS, POLICY_ALERTS, addDays(), alreadyNotified(), buildNotices(), contractsWithExpiredPoliciesWhere() (+16 more)

## Knowledge Gaps
- **1221 isolated node(s):** `ADR-0017`, `EMPTY_FORM`, `DOCUMENT_FIELDS`, `ADR-0020`, `MENU_COLUMNS` (+1216 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1670 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **111 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.222) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `master.service.js`, `server/package.json`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `WorkContracts.jsx`, `constants.js`, `WorkCosts.jsx`, `InvoiceFormPage.jsx`, `formatTime.js`, `WorksPage.jsx`, `client/package.json`, `@tabler/icons-react`, `showError`, `fMoneyText`, `WorkScopeContext.jsx`, `StatementReportDialog.jsx`, `DocumentManagement.jsx`, `WorkSummaryTab.jsx`, `AuthContext.jsx`, `GeneralDashboard.jsx`, `react`, `useAuth`, `ContractDetailPage.jsx`, `DebouncedInput.jsx`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **What connects `ADR-0017`, `EMPTY_FORM`, `DOCUMENT_FIELDS` to the rest of the system?**
  _1221 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05092276144907724 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `providers.routes.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07678075855689177 - nodes in this community are weakly interconnected._
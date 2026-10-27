# Graph Report - WEBPAC-INTERVE  (2026-10-27)

## Corpus Check
- 683 files · ~386,644 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4205 nodes · 11962 edges · 225 communities (117 shown, 108 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 157 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2ea8bf64`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- money.utils.js
- writeAudit
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- contracts.routes.js
- ContractDetailPage.jsx
- validation.utils.js
- auth.routes.js
- statements.service.js
- client/package.json
- master.service.js
- getIO
- auth.service.js
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- ImageList.jsx
- `tbl_users`
- contracts.controller.test.js
- dateOnlyText
- contractConcepts.service.test.js
- WorkDetailPage.jsx
- workDashboard.service.js
- masterRouter.utils.test.js
- invoiceGlosses.service.js
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
- workScopeOf
- users.service.js
- scripts
- app.js
- `tbl_invoices`
- ProfilePage.jsx
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
- idempotency.service.js
- audit.service.js
- ContactsEditor.jsx
- `tbl_contract_status_history`
- invoiceEvidence.service.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- users.service.test.js
- statements.service.test.js
- MenuList/index.jsx
- `tbl_works`
- `tbl_policies`
- react
- export.service.js
- works.service.test.js
- error.middleware.js
- contractPolicies.service.js
- `tbl_providers`
- error.middleware.test.js
- workDashboard.service.test.js
- notifications.service.test.js
- serviceWorker.jsx
- App.jsx
- `tbl_providers`
- winston.config.js
- AuthForgotPassword.jsx
- @tabler/icons-react
- seed.volume.js
- contractLiquidation.service.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- AuthenticationRoutes.jsx
- effectivePermissions.service.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- `tbl_users`
- balanceReconciliation.service.test.js
- decisionReferences.guard.test.js
- contractSuspensions.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- MainLayout/index.jsx
- ref_jest_globals
- invoiceFollowUps.service.test.js
- getEffectivePermissionIds
- `tbl_invoices`
- `tbl_invoices`
- @mui/material
- `tbl_statements`
- contractEndDateReconciliation.service.test.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- policyTypes.service.test.js
- `tbl_invoice_glosses`
- `tbl_works`
- contractNotifications.service.test.js
- auth.service.test.js
- DebouncedInput.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 151 edges
2. `react` - 117 edges
3. `showError()` - 100 edges
4. `workScopeOf()` - 87 edges
5. `moneyText()` - 81 edges
6. `dateOnlyText()` - 80 edges
7. `writeAudit()` - 80 edges
8. `useAuth()` - 79 edges
9. `withLockedTransaction()` - 77 edges
10. `showSuccess()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `percentQuery()` --calls--> `decimal()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/money.utils.js
- `invoiceColumnsOf()` --calls--> `fMoneyText()`  [EXTRACTED]
  client/src/views/billing/statements/components/StatementReportDialog.jsx → client/src/utils/formatNumber.js
- `invoiceColumnsOf()` --calls--> `fDateOnly()`  [EXTRACTED]
  client/src/views/billing/statements/components/StatementReportDialog.jsx → client/src/utils/formatTime.js

## Import Cycles
- None detected.

## Communities (225 total, 108 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (25): Alert(), Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), Chip() (+17 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "money.utils.js"
Cohesion: 0.06
Nodes (61): HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, server_src_common_utils_money_utils_percentfor, percentOf(), percentText(), RATIO_SCALE (+53 more)

### Community 3 - "writeAudit"
Cohesion: 0.13
Nodes (29): AUDIT_OPERATIONS, writeAudit(), withLockedTransaction(), updateAccount(), assertNotCancelled(), auditable(), AUDITED, closeFollowUp() (+21 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (59): applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes(), assertTypeIds() (+51 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (51): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, previewContractInvoiceAPI() (+43 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.05
Nodes (75): server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController, deleteInvoiceController, deleteInvoiceFollowUpController, deleteInvoiceGlossController (+67 more)

### Community 9 - "contracts.routes.js"
Cohesion: 0.07
Nodes (46): moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), exportContractsController, listFiltersOf(), paginationContractsController (+38 more)

### Community 10 - "ContractDetailPage.jsx"
Cohesion: 0.04
Nodes (98): getConstructionCompaniesSelectAPI, contractConceptsApi, contractLiquidationApi, contractsApi, exportContractAPI(), exportContractsAPI(), getContractFieldsAPI(), getContractFilterProvidersAPI() (+90 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.06
Nodes (35): ADR-0001, ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), exportFormatRule() (+27 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.10
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.09
Nodes (53): diffFields(), assertInScope(), statementGlosses(), statementsGlosses(), statementInvoices(), amountColumnsOf(), amountTotalsOf(), assertUniqueNumber() (+45 more)

### Community 14 - "client/package.json"
Cohesion: 0.04
Nodes (53): compat, __dirname, __filename, browserslist, development, production, eslintConfig, extends (+45 more)

### Community 15 - "master.service.js"
Cohesion: 0.09
Nodes (39): INACTIVE_STATUS, capitalize(), createMasterService(), httpError(), ADR-0003, ADR-0004, ADR-0013, ADR-0027 (+31 more)

### Community 16 - "getIO"
Cohesion: 0.09
Nodes (25): getIO(), configurePolicyTypeBaseController, ADR-0019, policyTypesRoutes, configurePolicyTypeBase(), httpError(), ADR-0019, policyTypesConfig (+17 more)

### Community 17 - "auth.service.js"
Cohesion: 0.08
Nodes (37): bcrypt, ref_crypto, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS (+29 more)

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
Cohesion: 0.04
Nodes (104): ADR-0013, ADR-0020, ADR-0021, ADR-0023, ADR-0024, ADR-0027, isBillingType(), server_src_modules_billing_invoices_invoicemenus_issimplemode (+96 more)

### Community 22 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 25 - "dateOnlyText"
Cohesion: 0.12
Nodes (33): captured, explain(), main(), measure(), parseParams(), percentile(), plain(), DELETED_STATUS (+25 more)

### Community 26 - "contractConcepts.service.test.js"
Cohesion: 0.06
Nodes (26): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+18 more)

### Community 27 - "WorkDetailPage.jsx"
Cohesion: 0.07
Nodes (56): changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, InvoiceDetailPage, ContactsList(), ADR-0009, DataList() (+48 more)

### Community 28 - "workDashboard.service.js"
Cohesion: 0.04
Nodes (102): ADR-0011, moneyText(), sumMoney(), toDateOnly(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES (+94 more)

### Community 29 - "masterRouter.utils.test.js"
Cohesion: 0.05
Nodes (34): config, emit, forged, serviceMock, mockReq(), emit, fieldsServiceMock, mockDelete (+26 more)

### Community 30 - "invoiceGlosses.service.js"
Cohesion: 0.18
Nodes (29): assertFieldFor(), assertNotCancelled(), auditable(), AUDITED, createGloss(), deleteGloss(), findLockedInvoice(), findLockedOpen() (+21 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

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
Nodes (16): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+8 more)

### Community 40 - "works.service.js"
Cohesion: 0.07
Nodes (62): ADR-0007, addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress() (+54 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.04
Nodes (75): ADR-0012, ADR-0017, ADR-0019, ADR-0025, ADR-0026, ADR-0011, ADR-0016, ADR-0018 (+67 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "workScopeOf"
Cohesion: 0.07
Nodes (61): auditContext(), sendExport(), workScopeOf(), handleExport(), changeStatementStatusController, deleteStatementController, exportStatementController, exportStatementGroupController (+53 more)

### Community 45 - "users.service.js"
Cohesion: 0.16
Nodes (16): ADR-0004, identificationError(), assertAssignableProfile(), assertIdentification(), AUDITED_USER_FIELDS, checkIfUserExists(), deleteUser(), forbidden() (+8 more)

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
Cohesion: 0.13
Nodes (24): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS (+16 more)

### Community 51 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 52 - "decimal"
Cohesion: 0.06
Nodes (63): decimal(), ratioPercent(), ratioText(), roundMoney(), roundRatio(), amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS (+55 more)

### Community 53 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "constants.js"
Cohesion: 0.04
Nodes (69): getDashboardSummaryAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), invoicesApi, exportWorksAPI(), client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenu (+61 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (29): baseConfig, config, prismaMock, service, dbUser, mockDisconnectSockets, mockIn, prismaMock (+21 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkChartsTab.jsx"
Cohesion: 0.05
Nodes (104): useSchemePalette(), MainCard(), AlertChips(), contractAlertOptions(), fPercentText(), InvoicesByWorkCard(), PolicyStatusCard(), ADVANCE_LEVELS (+96 more)

### Community 59 - "httpCliente.js"
Cohesion: 0.06
Nodes (50): getWorkDashboardAPI(), ADR-0002, exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), getMyWorksSelectAPI(), instance, NO_REFRESH_URLS (+42 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "contracts.service.js"
Cohesion: 0.05
Nodes (79): ADR-0006, ADR-0016, ADR-0018, findExportRows(), renderExport(), typeAppliesAiu(), contractsWithPendingAdvanceWhere(), exportInvoices() (+71 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "idempotency.service.js"
Cohesion: 0.13
Nodes (16): ACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), deleteModuleDoc() (+8 more)

### Community 70 - "audit.service.js"
Cohesion: 0.22
Nodes (12): auditMisuse(), buildRows(), ADR-0013, ADR-0027, protect(), REDACTED, SENSITIVE_FIELDS, STANDALONE_EVENTS (+4 more)

### Community 71 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 88 - "invoiceEvidence.service.js"
Cohesion: 0.14
Nodes (15): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+7 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (103): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), ADR-0019, policyTypesApi (+95 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.09
Nodes (34): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+26 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "MenuList/index.jsx"
Cohesion: 0.19
Nodes (11): getMenuAPI(), genericRequest, ElevationScroll(), HorizontalBar(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus (+3 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "react"
Cohesion: 0.06
Nodes (75): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), suspendContractAPI(), invoiceTransitionsApi, configurePolicyTypeBaseAPI(), getModulesAPI(), getProfilesAPI() (+67 more)

### Community 117 - "export.service.js"
Cohesion: 0.05
Nodes (60): exceljs, ref_node_fs, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument() (+52 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "contractPolicies.service.js"
Cohesion: 0.05
Nodes (113): ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC, ADR-0002 (+105 more)

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): percent(), ALL, CONCEPTS, CONTRACT, OWN, prismaMock

### Community 129 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 130 - "App.jsx"
Cohesion: 0.12
Nodes (18): refreshSession(), App(), ThemedToastContainer(), config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext (+10 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 134 - "AuthForgotPassword.jsx"
Cohesion: 0.15
Nodes (20): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider() (+12 more)

### Community 136 - "@tabler/icons-react"
Cohesion: 0.07
Nodes (44): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, getProviderTypesSelectAPI (+36 more)

### Community 137 - "seed.volume.js"
Cohesion: 0.07
Nodes (43): ref_node_crypto, nit(), addDays(), ALL_FIELDS, concept(), dbName, END_DATES, firstActive() (+35 more)

### Community 142 - "contractLiquidation.service.js"
Cohesion: 0.11
Nodes (22): conceptLabel(), contractInvoices(), evaluateLiquidation(), ADR-0017, ADR-0027, liquidationFacts(), CONCEPT_TYPE_NAMES, sortConcepts() (+14 more)

### Community 151 - "expirationNotice.service.js"
Cohesion: 0.06
Nodes (50): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+42 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 155 - "AuthenticationRoutes.jsx"
Cohesion: 0.11
Nodes (21): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 156 - "effectivePermissions.service.js"
Cohesion: 0.20
Nodes (12): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), CHECKS (+4 more)

### Community 159 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.14
Nodes (10): @prisma/client, CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients (+2 more)

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
Cohesion: 0.17
Nodes (15): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), defaultColor, RootStyle (+7 more)

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.14
Nodes (26): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), useConfig(), setParentOpenedMenu(), useMenuCollapse(), Footer() (+18 more)

### Community 203 - "ref_jest_globals"
Cohesion: 0.06
Nodes (18): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, payload, hasEffectivePermission, prismaMock (+10 more)

### Community 211 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 212 - "getEffectivePermissionIds"
Cohesion: 0.06
Nodes (32): express, getEffectivePermissionIds(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes, ADR-0002, getMenu() (+24 more)

### Community 217 - "@mui/material"
Cohesion: 0.05
Nodes (62): contractPoliciesApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, getWorksSummaryAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle (+54 more)

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

### Community 233 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 234 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

## Knowledge Gaps
- **1135 isolated node(s):** `MENU_COLUMNS`, `GLOSS_COLUMNS`, `GLOSS_FIELD_COLUMNS`, `INVOICE_AUDITED`, `LOCKED_SELECT` (+1130 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1569 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **108 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@mui/material` connect `@mui/material` to `App.jsx`, `AuthForgotPassword.jsx`, `InvoiceFormPage.jsx`, `@tabler/icons-react`, `ContractDetailPage.jsx`, `client/package.json`, `ImageList.jsx`, `WorkDetailPage.jsx`, `AuthenticationRoutes.jsx`, `DocumentManagement.jsx`, `NotificationSection/index.jsx`, `ProfilePage.jsx`, `constants.js`, `WorkChartsTab.jsx`, `httpCliente.js`, `withAlpha`, `MainLayout/index.jsx`, `ContactsEditor.jsx`, `useAuth`, `DebouncedInput.jsx`, `MenuList/index.jsx`, `react`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `ADR-0017` connect `permissions.constants.js` to `invoices.service.js`, `contracts.service.js`, `InvoiceFormPage.jsx`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **What connects `MENU_COLUMNS`, `GLOSS_COLUMNS`, `GLOSS_FIELD_COLUMNS` to the rest of the system?**
  _1135 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07918367346938776 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `money.utils.js` be split into smaller, more focused modules?**
  _Cohesion score 0.060362173038229376 - nodes in this community are weakly interconnected._
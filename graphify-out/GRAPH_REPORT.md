# Graph Report - WEBPAC-INTERVE  (2026-10-23)

## Corpus Check
- 639 files · ~343,045 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3782 nodes · 10422 edges · 229 communities (131 shown, 98 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 140 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `96ab9734`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- contractTerms.js
- master.service.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- workScopeOf
- ConceptDialog.jsx
- validation.utils.js
- auth.routes.js
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
- contracts.service.js
- contractPolicies.service.js
- invoices.controller.test.js
- GeneralDashboard.jsx
- advanceTerms.js
- auditContext
- NewProviderDialog.jsx
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- WorkPoliciesTab.jsx
- NotificationSection/index.jsx
- cron/index.js
- contractFields.js
- permissions.routes.js
- devDependencies
- src/index.jsx
- WorkChartsTab.jsx
- scripts
- getIO
- `tbl_invoices`
- PolicyTypePage.jsx
- App.jsx
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
- PERMISSIONS
- permission
- devDependencies
- transaction.service.test.js
- eslint.config.mjs
- simpleInvoiceTerms.js
- ProviderTypePage.jsx
- `tbl_contract_status_history`
- providerTypeFields.service.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- themes/index.jsx
- audit.service.js
- contractSuspensions.service.test.js
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- uniqueConstraints.constants.test.js
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- error.middleware.test.js
- @mui/material
- balanceReconciliation.service.js
- images.js
- serviceWorker.jsx
- `tbl_providers`
- invoiceTerms.js
- AuthForgotPassword.jsx
- auth.service.js
- PoliciesTab.jsx
- contracts.controller.test.js
- works.service.test.js
- users.service.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- expirationNotice.service.js
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
- useConfig.js
- addressTypes.service.js
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
- ContractDetailPage.jsx
- requestedDetailChanges
- contractEndDateReconciliation.service.test.js
- permissions.constants.js
- app.service.test.js
- app.routes.js
- auth.service.test.js
- MainLayout/index.jsx
- winston.config.js
- app.service.js
- `tbl_invoices`
- `tbl_invoices`
- providerTypes.service.js
- browserslist
- volta
- InputLabel.jsx
- resetCode.utils.js
- constructionCompanies.service.js
- contractTypes.service.js
- supervisionTypes.service.js
- master.service.test.js
- funciones.js
- DebouncedInput.jsx

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
- `getUserPermissions()` --calls--> `getEffectivePermissionIds()`  [EXTRACTED]
  server/src/modules/app/general/app.service.js → server/src/common/services/effectivePermissions.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `percentQuery()` --calls--> `decimal()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/money.utils.js

## Import Cycles
- None detected.

## Communities (229 total, 98 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractTerms.js"
Cohesion: 0.04
Nodes (93): ADR-0015, findExportRows(), moneyText(), percentText(), sumMoney(), amountsDto(), approvalSnapshot(), approvedOf() (+85 more)

### Community 3 - "master.service.js"
Cohesion: 0.21
Nodes (15): capitalize(), createMasterService(), httpError(), ADR-0004, ADR-0013, ADR-0027, countByStatus(), DEFAULT_ROWS (+7 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (63): ADR-0009, assertInScope(), userFullName(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope() (+55 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (49): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoicesApi, ADR-0017 (+41 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.04
Nodes (77): sendExport(), moneyRule(), percentRule(), server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_contract_pairs, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields, getInvoiceEvidence(), httpError() (+69 more)

### Community 9 - "workScopeOf"
Cohesion: 0.05
Nodes (72): getEffectivePermissionIds(), workScopeOf(), exportFormatRule(), optionalDate(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes (+64 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.09
Nodes (40): contractConceptsApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016 (+32 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.11
Nodes (21): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0027 (+13 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.06
Nodes (41): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+33 more)

### Community 14 - "client/package.json"
Cohesion: 0.08
Nodes (23): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+15 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 16 - "masterRouter.utils.js"
Cohesion: 0.09
Nodes (34): express, verifyToken(), requirePermission(), validate(), IDEMPOTENCY_HEADER, createMasterControllers(), createMasterRouter(), businessRulesRoutes (+26 more)

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
Cohesion: 0.16
Nodes (19): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+11 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (54): ADR-0021, ADR-0023, server_src_common_utils_money_utils_percentfor, server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_money_columns, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_percent_columns, server_src_modules_billing_invoices_contractinvoiceterms_contractdraftof (+46 more)

### Community 22 - "updateInvoice"
Cohesion: 0.14
Nodes (33): amountRange(), approveInvoice(), assertContractAdmitsCancel(), assertStage(), assertUniqueNumber(), assertWork(), auditable(), cancelInvoice() (+25 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.09
Nodes (19): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, ref_http, app (+11 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (65): ADR-0007, INACTIVE_STATUS, containsFilter(), filtersWhere(), idFilter(), addTerm(), daysInMonth(), PROGRESS_CRITICAL (+57 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.07
Nodes (21): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+13 more)

### Community 27 - "contracts.service.js"
Cohesion: 0.06
Nodes (109): ADR-0002, main(), diffFields(), newOperationId(), writeAudit(), withLockedTransaction(), typeAppliesAiu(), withContractAiu() (+101 more)

### Community 28 - "contractPolicies.service.js"
Cohesion: 0.05
Nodes (88): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+80 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "GeneralDashboard.jsx"
Cohesion: 0.07
Nodes (38): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, getMyWorksSelectAPI(), getWorkManagersSelectAPI(), getWorksSummaryAPI(), previewWorkEndDateAPI(), genericRequest (+30 more)

### Community 31 - "advanceTerms.js"
Cohesion: 0.13
Nodes (25): @prisma/client, ratioPercent(), roundRatio(), advanceBalances(), appliedPct(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits() (+17 more)

### Community 32 - "auditContext"
Cohesion: 0.10
Nodes (32): auditContext(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS (+24 more)

### Community 33 - "NewProviderDialog.jsx"
Cohesion: 0.14
Nodes (25): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, getProviderTypesSelectAPI (+17 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "WorkPoliciesTab.jsx"
Cohesion: 0.11
Nodes (29): getAddressTypesSelectAPI, filterParams(), isEmptyValue(), NO_FILTERS, useListFilters(), ACTION_TONES, ActionButton(), toneOf() (+21 more)

### Community 38 - "NotificationSection/index.jsx"
Cohesion: 0.21
Nodes (14): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), getTimeAgo() (+6 more)

### Community 39 - "cron/index.js"
Cohesion: 0.17
Nodes (11): node-cron, cronJobs, ADR-0017, registeredTasks, startCronJobs(), stopCronJobs(), wrapHandler(), contractBalanceReconciliationJob (+3 more)

### Community 40 - "contractFields.js"
Cohesion: 0.17
Nodes (14): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+6 more)

### Community 41 - "permissions.routes.js"
Cohesion: 0.15
Nodes (16): getAllPagesController(), getPermissionsCatalogController(), getProfilePermissionsController(), getProfileWindowsController(), getUserPermissionsController(), updateProfilePermissionsController(), updateUserPermissionsController(), permissionsRoutes (+8 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.07
Nodes (78): useSchemePalette(), MainCard(), AlertsCard(), Empty(), LatestInvoicesCard(), num, QuickAccessCard(), UpcomingPoliciesCard() (+70 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "getIO"
Cohesion: 0.12
Nodes (18): getIO(), configurePolicyTypeBaseController, configurePolicyTypeBase(), httpError(), FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController (+10 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "PolicyTypePage.jsx"
Cohesion: 0.16
Nodes (14): configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, PolicyTypePage, POLICY_BASE_OPTIONS, policyBaseName(), ConfigureBaseDialog(), ADR-0019 (+6 more)

### Community 51 - "App.jsx"
Cohesion: 0.28
Nodes (8): refreshSession(), App(), ThemedToastContainer(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

### Community 52 - "seed.js"
Cohesion: 0.14
Nodes (12): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+4 more)

### Community 53 - "ref_jest_globals"
Cohesion: 0.05
Nodes (21): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, payload, hasEffectivePermission, prismaMock, state (+13 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "invoiceFollowUps.service.js"
Cohesion: 0.16
Nodes (25): AUDIT_ENTITIES, USER_NAME_SELECT, AUDIT_SELECT, groupOperations(), ADR-0013, ADR-0027, assertNotCancelled(), auditable() (+17 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "dashboard.service.test.js"
Cohesion: 0.33
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 59 - "constants.js"
Cohesion: 0.05
Nodes (54): contractsApi, exportContractsAPI(), getContractMenuAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), client_src_hooks_useinvoicemenus_useinvoicemenu, ContractsPage, SocketContext (+46 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "PERMISSIONS"
Cohesion: 0.15
Nodes (13): ADR-0003, PERMISSIONS, defineMaster(), insurersConfig, insurersService, ADR-0019, ADR-0026, POLICY_BASE_NAMES (+5 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.10
Nodes (17): ref_fs, ref_path, ref_url, ALLOWED, files(), lines, SRC, catalog (+9 more)

### Community 68 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 70 - "simpleInvoiceTerms.js"
Cohesion: 0.16
Nodes (15): previewSimpleInvoice(), blank(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023, ADR-0026, SIMPLE_FIELDS (+7 more)

### Community 71 - "ProviderTypePage.jsx"
Cohesion: 0.13
Nodes (19): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, INVOICE_MODE_OPTIONS, INVOICE_MODES, invoiceModeName(), DATA_TYPE_NAMES (+11 more)

### Community 88 - "providerTypeFields.service.js"
Cohesion: 0.29
Nodes (13): resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getProviderTypeFields(), httpError(), ADR-0006 (+5 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (96): addressTypesApi, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, insurersApi, reasonsApi (+88 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.09
Nodes (32): hasEffectivePermission(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope() (+24 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "themes/index.jsx"
Cohesion: 0.13
Nodes (16): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor (+8 more)

### Community 108 - "audit.service.js"
Cohesion: 0.15
Nodes (15): ADR-0001, auditMisuse(), buildRows(), ADR-0013, ADR-0027, protect(), REDACTED, SENSITIVE_FIELDS (+7 more)

### Community 112 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.06
Nodes (70): getBusinessRulesAPI(), saveBusinessRulesAPI(), contractPoliciesApi, suspendContractAPI(), invoiceTransitionsApi, deleteProfileAPI(), getModulesAPI(), getProfilesAPI() (+62 more)

### Community 117 - "export.service.js"
Cohesion: 0.07
Nodes (46): exceljs, addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf(), buildPdfDocument() (+38 more)

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
Cohesion: 0.06
Nodes (41): HeaderAvatar(), MobileSearch(), SearchSection(), CardSecondaryAction(), headerStyle, Avatar(), ChipMultiSelect(), fold() (+33 more)

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.21
Nodes (13): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), balanceViolations(), CHECKS (+5 more)

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
Cohesion: 0.12
Nodes (20): assertBillingFits(), BILLING_TYPES, billingDto(), httpError(), money(), ZERO, isContractCreate(), isCreate() (+12 more)

### Community 133 - "AuthForgotPassword.jsx"
Cohesion: 0.06
Nodes (42): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI() (+34 more)

### Community 134 - "auth.service.js"
Cohesion: 0.17
Nodes (20): withTransaction(), comparePassword(), hashPassword(), generateResetCode(), ACCOUNT_FIELDS, anonymous(), clearFailedLogins(), consumeResetAttempt() (+12 more)

### Community 136 - "PoliciesTab.jsx"
Cohesion: 0.14
Nodes (20): getInsurersSelectAPI, getPolicyTypesSelectAPI, complete(), PercentField(), toText(), toValue(), ADR-0018, PoliciesDraftEditor() (+12 more)

### Community 137 - "contracts.controller.test.js"
Cohesion: 0.14
Nodes (12): conceptsServiceMock, contractsServiceMock, emit, exportContractReport, exportContractSummary, getEffectivePermissionIds, ADR-0015, ADR-0016 (+4 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "users.service.js"
Cohesion: 0.09
Nodes (27): ADR-0004, DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, identityDocumentsConfig (+19 more)

### Community 151 - "expirationNotice.service.js"
Cohesion: 0.11
Nodes (30): dateRangeFilter(), BUSINESS_RULES, DEFAULT_EXPIRING_DAYS, MAX_RULE_DAYS, MIN_RULE_DAYS, getBusinessRulesController, saveBusinessRulesController, FIELD_BY_KEY (+22 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

### Community 155 - "decimal"
Cohesion: 0.11
Nodes (32): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ratioText() (+24 more)

### Community 156 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 157 - "prismaClient.js"
Cohesion: 0.05
Nodes (41): adapter, prisma, STATUS_IDS, AUDIT_OPERATIONS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse() (+33 more)

### Community 159 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 173 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 174 - "useConfig.js"
Cohesion: 0.20
Nodes (11): config, ConfigContext, ConfigProvider(), useConfig(), useLocalStorage(), ElevationScroll(), HorizontalBar(), ImageList() (+3 more)

### Community 175 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

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
Cohesion: 0.26
Nodes (8): getMenuAPI(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts, setContractMenus(), work

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

### Community 197 - "ContractDetailPage.jsx"
Cohesion: 0.05
Nodes (92): getStatusesByScopeAPI(), exportContractAPI(), useSocket(), SubCard(), ContactsList(), ADR-0009, DataList(), Figure() (+84 more)

### Community 198 - "requestedDetailChanges"
Cohesion: 0.33
Nodes (7): isBillingType(), detailChanges(), detailText(), isSimpleType(), requestedDetailChanges(), SNAPSHOT_AMOUNTS, storedDetail()

### Community 199 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 201 - "permissions.constants.js"
Cohesion: 0.18
Nodes (10): ADR-0011, ADR-0012, ADR-0020, ADR-0024, ADR-0025, ADR-0016, ADR-0017, ADR-0018 (+2 more)

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
Cohesion: 0.15
Nodes (23): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), Footer(), Header() (+15 more)

### Community 211 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 212 - "app.service.js"
Cohesion: 0.14
Nodes (16): getMenu(), getPagesMenu(), getSessionInfo(), getUserPermissions(), PAGE_SELECT, toChild(), toParent(), withContractMenus() (+8 more)

### Community 217 - "providerTypes.service.js"
Cohesion: 0.32
Nodes (7): assertModeUnchangedInUse(), httpError(), ADR-0010, providerTypesConfig, providerTypesService, server_src_modules_billing_invoices_invoicemenus, server_src_modules_billing_invoices_invoicemenus_invoice_modes

### Community 218 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 219 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 221 - "resetCode.utils.js"
Cohesion: 0.47
Nodes (4): deriveKey(), hashResetCode(), ADR-0001, verifyResetCode()

### Community 222 - "constructionCompanies.service.js"
Cohesion: 0.47
Nodes (4): constructionCompaniesRoutes, constructionCompaniesConfig, constructionCompaniesService, ADR-0004

### Community 223 - "contractTypes.service.js"
Cohesion: 0.47
Nodes (4): contractTypesRoutes, contractTypesConfig, contractTypesService, ADR-0006

### Community 224 - "supervisionTypes.service.js"
Cohesion: 0.47
Nodes (4): supervisionTypesRoutes, ADR-0007, supervisionTypesConfig, supervisionTypesService

### Community 225 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

## Knowledge Gaps
- **1047 isolated node(s):** `ADR-0006`, `ADR-0016`, `ADR-0017`, `ADR-0018`, `contracts` (+1042 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1449 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **98 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0020` connect `permissions.constants.js` to `ContractDetailPage.jsx`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `AuthForgotPassword.jsx`, `InvoiceFormPage.jsx`, `PoliciesTab.jsx`, `ConceptDialog.jsx`, `client/package.json`, `menu-items/index.js`, `DocumentManagement.jsx`, `GeneralDashboard.jsx`, `NewProviderDialog.jsx`, `WorkPoliciesTab.jsx`, `NotificationSection/index.jsx`, `WorkChartsTab.jsx`, `useConfig.js`, `PolicyTypePage.jsx`, `App.jsx`, `MenuList/index.jsx`, `constants.js`, `ContractDetailPage.jsx`, `ProviderTypePage.jsx`, `MainLayout/index.jsx`, `InputLabel.jsx`, `useAuth`, `DebouncedInput.jsx`, `themes/index.jsx`, `showError`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `ADR-0002` connect `contracts.service.js` to `@mui/material`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **What connects `ADR-0006`, `ADR-0016`, `ADR-0017` to the rest of the system?**
  _1047 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractTerms.js` be split into smaller, more focused modules?**
  _Cohesion score 0.03871239217336419 - nodes in this community are weakly interconnected._
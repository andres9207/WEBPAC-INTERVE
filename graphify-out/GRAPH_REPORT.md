# Graph Report - WEBPAC-INTERVE  (2026-10-27)

## Corpus Check
- 672 files · ~376,510 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4115 nodes · 11572 edges · 222 communities (119 shown, 103 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 154 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `94947259`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- UserDialog.jsx
- AuthenticationRoutes.jsx
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- contracts.routes.js
- useContractForm.js
- validation.utils.js
- auth.routes.js
- seed.demo.js
- client/package.json
- httpCliente.js
- main.routes.js
- WorkDetailPage.jsx
- invoices.service.test.js
- compilerOptions
- session.service.js
- invoices.service.js
- themes/index.jsx
- `tbl_users`
- app.js
- works.service.js
- contractConcepts.service.test.js
- ProviderTypePage.jsx
- contractTerms.js
- contracts.controller.test.js
- ref_prop_types
- advanceFilters.js
- providers.routes.js
- DocumentManagement.jsx
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- statements.service.js
- NotificationSection/index.jsx
- cron/index.js
- contractSuspensions.service.test.js
- permissions.constants.js
- devDependencies
- src/index.jsx
- balanceReconciliation.service.js
- scripts
- app.routes.js
- `tbl_invoices`
- menu-items/index.js
- eslint.config.mjs
- decimal
- ref_jest_globals
- `tbl_contract_type_fields`
- invoiceTerms.js
- transaction.mock.js
- scripts
- dashboard.service.test.js
- constants.js
- compilerOptions
- excelJS.js
- contracts.service.js
- permission
- devDependencies
- decisionReferences.guard.test.js
- WorkChartsTab.jsx
- moneyText
- statements.routes.js
- `tbl_contract_status_history`
- withLockedTransaction
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- react-router-dom
- workScopeOf
- MenuList/index.jsx
- `tbl_works`
- `tbl_policies`
- @mui/material
- export.service.js
- uniqueConstraints.constants.test.js
- error.middleware.js
- contractPolicies.service.js
- `tbl_providers`
- transaction.service.test.js
- addressTypes.service.js
- ExportButton.jsx
- serviceWorker.jsx
- AuthForgotPassword.jsx
- `tbl_providers`
- ImageList.jsx
- permissions.controller.test.js
- writeAudit
- contractReports.service.js
- seed.volume.js
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
- useMenuCollapse.js
- `tbl_contract_concepts`
- `tbl_reasons`
- `tbl_users`
- balanceReconciliation.service.test.js
- session.service.test.js
- invoiceFollowUps.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- withAlpha
- ContractDetailPage.jsx
- MainLayout/index.jsx
- liquidationTerms.js
- app.service.js
- `tbl_invoices`
- `tbl_invoices`
- `tbl_statements`
- workDashboard.service.js
- invoiceGlosses.service.test.js
- contractCancellation.service.test.js
- contractFields.js
- statements.service.test.js
- contractLiquidation.service.test.js
- `tbl_works`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 147 edges
2. `react` - 117 edges
3. `showError()` - 98 edges
4. `workScopeOf()` - 84 edges
5. `writeAudit()` - 80 edges
6. `dateOnlyText()` - 79 edges
7. `useAuth()` - 79 edges
8. `withLockedTransaction()` - 77 edges
9. `moneyText()` - 68 edges
10. `showSuccess()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `getInvoiceFormOptions()` --calls--> `getContractFormOptions()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.service.js → server/src/modules/work/contracts/contracts.service.js
- `getUserPermissions()` --calls--> `getEffectivePermissionIds()`  [EXTRACTED]
  server/src/modules/app/general/app.service.js → server/src/common/services/effectivePermissions.service.js
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `balances()` --calls--> `advanceBalances()`  [EXTRACTED]
  server/test/modules/billing/invoices/advanceFilters.test.js → server/src/modules/billing/invoices/advanceTerms.js

## Import Cycles
- None detected.

## Communities (222 total, 103 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (22): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DateTimePickerToolbar() (+14 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "UserDialog.jsx"
Cohesion: 0.09
Nodes (35): getIdentityDocumentsSelectAPI, identityDocumentsApi, getProfilesAPI(), checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi (+27 more)

### Community 3 - "AuthenticationRoutes.jsx"
Cohesion: 0.11
Nodes (21): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.04
Nodes (43): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+35 more)

### Community 6 - "providers.service.js"
Cohesion: 0.06
Nodes (81): containsFilter(), countByStatus(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS, paginate(), resolvePagination() (+73 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (55): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, ADR-0017 (+47 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.04
Nodes (82): server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_contract_pairs, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController (+74 more)

### Community 9 - "contracts.routes.js"
Cohesion: 0.07
Nodes (43): moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), previewContractConceptController, ADR-0006, ADR-0016 (+35 more)

### Community 10 - "useContractForm.js"
Cohesion: 0.10
Nodes (30): getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), previewContractEndDateAPI(), useEndDatePreview(), complete(), PercentField(), toText() (+22 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.10
Nodes (25): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, IDEMPOTENCY_HEADER, createMasterSchemas(), contactsRules(), emailRule(), idArray() (+17 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (30): ADR-0001, THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController() (+22 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.05
Nodes (48): ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC, ADR-0002 (+40 more)

### Community 14 - "client/package.json"
Cohesion: 0.08
Nodes (22): name, packageManager, private, version, apexcharts, @emotion/react, @emotion/styled, eslint (+14 more)

### Community 15 - "httpCliente.js"
Cohesion: 0.06
Nodes (33): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), genericRequest, instance, NO_REFRESH_URLS (+25 more)

### Community 16 - "main.routes.js"
Cohesion: 0.05
Nodes (59): express, jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed() (+51 more)

### Community 17 - "WorkDetailPage.jsx"
Cohesion: 0.10
Nodes (34): changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, ContactsList(), ADR-0009, EditableList(), STATUS (+26 more)

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
Cohesion: 0.05
Nodes (89): ADR-0023, server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_money_columns, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_percent_columns, server_src_modules_billing_invoices_contractinvoiceterms_contractdraftof, server_src_modules_billing_invoices_contractinvoiceterms_contractpairsdto, server_src_modules_billing_invoices_contractinvoiceterms_contracttaxdetailof (+81 more)

### Community 22 - "themes/index.jsx"
Cohesion: 0.19
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (71): ADR-0007, addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS (+63 more)

### Community 26 - "contractConcepts.service.test.js"
Cohesion: 0.06
Nodes (26): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+18 more)

### Community 27 - "ProviderTypePage.jsx"
Cohesion: 0.13
Nodes (18): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, INVOICE_MODE_OPTIONS, INVOICE_MODES, invoiceModeName(), DATA_TYPE_NAMES (+10 more)

### Community 28 - "contractTerms.js"
Cohesion: 0.05
Nodes (65): ADR-0015, ADR-0021, DELETED_STATUS, server_src_common_utils_money_utils_percentfor, insuredValue(), policyBaseValue(), INVOICE_TYPES, daysBetween() (+57 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.04
Nodes (44): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+36 more)

### Community 30 - "ref_prop_types"
Cohesion: 0.06
Nodes (49): getAddressTypesSelectAPI, getWorksSummaryAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, SubCard(), ACTION_TONES (+41 more)

### Community 31 - "advanceFilters.js"
Cohesion: 0.13
Nodes (14): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+6 more)

### Community 32 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): canViewAllWorks(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS (+24 more)

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
Cohesion: 0.10
Nodes (39): renderDocument(), ALL, assertAnyInScope(), assertInScope(), httpError(), inScope(), scopeOf(), WORK_HEADER (+31 more)

### Community 38 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 39 - "cron/index.js"
Cohesion: 0.11
Nodes (18): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+10 more)

### Community 40 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (45): ADR-0012, ADR-0017, ADR-0019, ADR-0025, ADR-0026, ADR-0011, ADR-0016, ADR-0018 (+37 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "balanceReconciliation.service.js"
Cohesion: 0.25
Nodes (12): ADR-0024, findUsersWithPermission(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations() (+4 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 51 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 52 - "decimal"
Cohesion: 0.10
Nodes (47): @prisma/client, decimal(), ratioPercent(), ratioText(), roundMoney(), roundRatio(), advanceBalances(), appliedPct() (+39 more)

### Community 53 - "ref_jest_globals"
Cohesion: 0.05
Nodes (21): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+13 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "invoiceTerms.js"
Cohesion: 0.11
Nodes (25): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+17 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.04
Nodes (39): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+31 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 59 - "constants.js"
Cohesion: 0.03
Nodes (85): contractConceptsApi, contractLiquidationApi, contractPoliciesApi, contractsApi, exportContractAPI(), exportContractsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI() (+77 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "contracts.service.js"
Cohesion: 0.06
Nodes (63): findExportRows(), renderExport(), scopeWhere(), dateRangeFilter(), policyExpiringDays(), typeAppliesAiu(), contractsBlock(), finishedWorksToLiquidate() (+55 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "decisionReferences.guard.test.js"
Cohesion: 0.07
Nodes (26): ref_fs, ref_path, ref_url, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3 (+18 more)

### Community 68 - "WorkChartsTab.jsx"
Cohesion: 0.06
Nodes (94): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, client_src_hooks_useinvoicemenus_useinvoicemenus, useSchemePalette(), MainCard(), fPercentText(), AlertsCard() (+86 more)

### Community 70 - "moneyText"
Cohesion: 0.08
Nodes (44): HUNDRED, isBlank(), MONEY_SCALE, moneyText(), PERCENT_SCALE, percentText(), RATIO_SCALE, ROUNDING (+36 more)

### Community 71 - "statements.routes.js"
Cohesion: 0.12
Nodes (24): sendExport(), handleExport(), changeStatementStatusController, deleteStatementController, exportStatementController, getStatementController, getStatementReportController, handleExport() (+16 more)

### Community 88 - "withLockedTransaction"
Cohesion: 0.11
Nodes (47): withLockedTransaction(), USER_NAME_SELECT, assertNotCancelled(), auditable(), AUDITED, closeFollowUp(), deleteFollowUp(), findLockedInvoice() (+39 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (96): addressTypesApi, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, insurersApi, getPermissionsCatalogAPI(), ADR-0019 (+88 more)

### Community 100 - "works.routes.js"
Cohesion: 0.10
Nodes (29): managedWhere(), resolveWorkScope(), selectMyWorks(), exportFormatRule(), changeWorkStateController, changeWorkStatusController, deleteWorkController, exportWorksController (+21 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "react-router-dom"
Cohesion: 0.07
Nodes (42): exportStatementAPI(), getStatementReportAPI(), statementsApi, getMyWorksSelectAPI(), pickWork(), useWorkFilterField(), useWorkScope(), WorkScopeContext (+34 more)

### Community 108 - "workScopeOf"
Cohesion: 0.11
Nodes (41): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes, ADR-0002 (+33 more)

### Community 112 - "MenuList/index.jsx"
Cohesion: 0.24
Nodes (10): getMenuAPI(), ElevationScroll(), HorizontalBar(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts (+2 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "@mui/material"
Cohesion: 0.05
Nodes (92): updateThemeModeAPI(), getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), previewContractConceptAPI(), suspendContractAPI(), getInsurersSelectAPI, invoiceTransitionsApi (+84 more)

### Community 117 - "export.service.js"
Cohesion: 0.05
Nodes (58): exceljs, ref_node_fs, pdfkit, captured, explain(), main(), measure(), parseParams() (+50 more)

### Community 118 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (110): main(), diffFields(), newOperationId(), canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused() (+102 more)

### Community 123 - "transaction.service.test.js"
Cohesion: 0.26
Nodes (8): ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 125 - "ExportButton.jsx"
Cohesion: 0.46
Nodes (6): download(), downloadExport(), errorMessage(), EXPORT_FORMATS, ExportButton(), ExportDialog()

### Community 129 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 130 - "AuthForgotPassword.jsx"
Cohesion: 0.14
Nodes (21): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider(), getStoredUser() (+13 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 133 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 134 - "writeAudit"
Cohesion: 0.04
Nodes (77): ADR-0004, bcrypt, adapter, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0013 (+69 more)

### Community 136 - "contractReports.service.js"
Cohesion: 0.08
Nodes (36): sumMoney(), toLiquidateOf(), server_src_modules_billing_invoices_invoicemenus_iscontractmode, approvedOf(), contractInvoicesForReport(), contractsBalances(), ADVANCE_COLUMNS, advanceTotals() (+28 more)

### Community 137 - "seed.volume.js"
Cohesion: 0.08
Nodes (36): ref_node_crypto, nit(), addDays(), ALL_FIELDS, concept(), dbName, END_DATES, firstActive() (+28 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 151 - "expirationNotice.service.js"
Cohesion: 0.06
Nodes (42): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+34 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.18
Nodes (11): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+3 more)

### Community 155 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 156 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 157 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 181 - "session.service.test.js"
Cohesion: 0.09
Nodes (16): ref_crypto, deriveKey(), hashResetCode(), ADR-0001, verifyResetCode(), dbUser, mockDisconnectSockets, mockIn (+8 more)

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
Cohesion: 0.06
Nodes (62): DataList(), Figure(), Pending(), SummaryAside(), FormSection(), RouteDialog(), useRouteDialogAside(), fTerm() (+54 more)

### Community 198 - "MainLayout/index.jsx"
Cohesion: 0.16
Nodes (22): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), useConfig(), Footer(), Header(), MainLayout() (+14 more)

### Community 201 - "liquidationTerms.js"
Cohesion: 0.13
Nodes (14): percentOf(), condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025 (+6 more)

### Community 212 - "app.service.js"
Cohesion: 0.08
Nodes (25): hasEffectivePermission(), getMenu(), getPagesMenu(), getSessionInfo(), getUserPermissions(), PAGE_SELECT, toChild(), toParent() (+17 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "workDashboard.service.js"
Cohesion: 0.10
Nodes (37): ADVANCE_LEVELS, advanceBar(), advanceLevel(), balancesOf(), byUrgency(), conceptLabel(), contractPolicies(), contractsBlock() (+29 more)

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.18
Nodes (5): assertInvoiceVisible, ctx, prismaMock, SCOPE, state

### Community 221 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 222 - "contractFields.js"
Cohesion: 0.12
Nodes (16): AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+8 more)

### Community 223 - "statements.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, OTHER, OWN, prismaMock, state

### Community 224 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

## Knowledge Gaps
- **1130 isolated node(s):** `CONTRACT_STATE_FILTER`, `POLICIES_EXPIRING_TAB`, `NO_POLICIES_TAB`, `CONTRACT_REPORTS`, `POLICY_REPORT` (+1125 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1569 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **103 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0012` connect `permissions.constants.js` to `providers.routes.js`, `UserDialog.jsx`?**
  _High betweenness centrality (0.199) - this node is a cross-community bridge._
- **Why does `react` connect `@mui/material` to `UserDialog.jsx`, `AuthenticationRoutes.jsx`, `AuthForgotPassword.jsx`, `server/package.json`, `InvoiceFormPage.jsx`, `useContractForm.js`, `client/package.json`, `httpCliente.js`, `WorkDetailPage.jsx`, `themes/index.jsx`, `ProviderTypePage.jsx`, `ref_prop_types`, `useMenuCollapse.js`, `DocumentManagement.jsx`, `NotificationSection/index.jsx`, `src/index.jsx`, `constants.js`, `WorkChartsTab.jsx`, `ContractDetailPage.jsx`, `MainLayout/index.jsx`, `useAuth`, `react-router-dom`, `MenuList/index.jsx`, `ExportButton.jsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `UserDialog.jsx`, `AuthenticationRoutes.jsx`, `AuthForgotPassword.jsx`, `server/package.json`, `ImageList.jsx`, `InvoiceFormPage.jsx`, `useContractForm.js`, `client/package.json`, `httpCliente.js`, `WorkDetailPage.jsx`, `themes/index.jsx`, `ProviderTypePage.jsx`, `ref_prop_types`, `DocumentManagement.jsx`, `NotificationSection/index.jsx`, `constants.js`, `withAlpha`, `WorkChartsTab.jsx`, `ContractDetailPage.jsx`, `MainLayout/index.jsx`, `useAuth`, `react-router-dom`, `MenuList/index.jsx`, `ExportButton.jsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **What connects `CONTRACT_STATE_FILTER`, `POLICIES_EXPIRING_TAB`, `NO_POLICIES_TAB` to the rest of the system?**
  _1130 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08985200845665962 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `UserDialog.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09292929292929293 - nodes in this community are weakly interconnected._
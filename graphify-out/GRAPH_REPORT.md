# Graph Report - WEBPAC-INTERVE  (2026-10-23)

## Corpus Check
- 636 files · ~339,611 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3756 nodes · 10330 edges · 216 communities (119 shown, 97 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 138 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0b815d3a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- contracts.service.js
- contractConcepts.service.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- workScopeOf
- providers.routes.js
- ConceptDialog.jsx
- validation.utils.js
- auditContext
- seed.volume.js
- client/package.json
- menu-items/index.js
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
- authContext.jsx
- contractPolicies.service.js
- invoices.controller.test.js
- WorkScopeContext.jsx
- invoiceFollowUps.service.js
- contracts.routes.js
- seed.demo.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- UserDialog.jsx
- themes/index.jsx
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
- ProfilePage.jsx
- usersApi.js
- ref_jest_globals
- `tbl_contract_type_fields`
- WorksPage.jsx
- transaction.mock.js
- scripts
- dashboard.service.test.js
- InvoicesPage.jsx
- compilerOptions
- excelJS.js
- SearchSection/index.jsx
- permission
- devDependencies
- transaction.service.test.js
- eslint.config.mjs
- moneyText
- WorkDataForm.jsx
- `tbl_contract_status_history`
- money.utils.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- invoicesApi.js
- users.service.js
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
- contractEndDateReconciliation.service.test.js
- audit.service.js
- constants.js
- auth.service.test.js
- works.service.test.js
- contracts.controller.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- businessRules.service.js
- `tbl_user_permissions`
- notifications.service.js
- mailerService.js
- decimal
- socket.js
- ContractTaxesSection.jsx
- contractNotifications.service.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- decisionReferences.guard.test.js
- useConfig.js
- floatingPoint.guard.test.js
- `tbl_users`
- balanceReconciliation.service.test.js
- extends
- formatTime.js
- invoiceFollowUps.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- expirationNotice.service.test.js
- WorkDetailPage.jsx
- DebouncedInput.jsx
- AdvanceAmountsSection.jsx
- master.service.test.js
- useMenuCollapse.js
- app.routes.js
- EasyCrop.jsx
- MainLayout/index.jsx
- getEffectivePermissionIds
- `tbl_invoices`
- `tbl_invoices`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 142 edges
2. `react` - 109 edges
3. `showError()` - 89 edges
4. `useAuth()` - 77 edges
5. `workScopeOf()` - 66 edges
6. `writeAudit()` - 65 edges
7. `withLockedTransaction()` - 64 edges
8. `dateOnlyText()` - 63 edges
9. `showSuccess()` - 58 edges
10. `@tabler/icons-react` - 58 edges

## Surprising Connections (you probably didn't know these)
- `percentQuery()` --calls--> `decimal()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.validation.js → server/src/common/utils/money.utils.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `previewWorkEndDate()` --calls--> `addTerm()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/term.utils.js
- `InvoicesPage()` --indirect_call--> `exportInvoicesAPI()`  [INFERRED]
  client/src/views/billing/invoices/InvoicesPage.jsx → client/src/api/requests/invoicesApi.js
- `InvoiceFormPage()` --calls--> `getInvoiceWorksSelectAPI()`  [EXTRACTED]
  client/src/views/billing/invoices/InvoiceFormPage.jsx → client/src/api/requests/invoicesApi.js

## Import Cycles
- None detected.

## Communities (216 total, 97 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contracts.service.js"
Cohesion: 0.05
Nodes (65): ADR-0002, ADR-0006, FIELD_GROUPS, typeAppliesAiu(), CONCEPT_AUDITED, conceptDto(), conceptsDto(), CONTRACT_AUDITED (+57 more)

### Community 3 - "contractConcepts.service.js"
Cohesion: 0.08
Nodes (84): main(), diffFields(), newOperationId(), writeAudit(), withLockedTransaction(), configurePolicyTypeBase(), withContractAiu(), updateAccount() (+76 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (41): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+33 more)

### Community 6 - "providers.service.js"
Cohesion: 0.05
Nodes (80): nit(), assertInScope(), defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), DIAN_WEIGHTS (+72 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.19
Nodes (19): getInvoiceContractsSelectAPI(), client_src_utils_constants_invoice_mode_types, isBillingInvoiceType(), InvoiceDetailPanel(), amountsPayload(), contractTypeChoices(), DOCUMENT_FIELDS, EMPTY_FORM (+11 more)

### Community 8 - "workScopeOf"
Cohesion: 0.05
Nodes (71): workScopeOf(), exportFormatRule(), server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_contract_pairs, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_fields, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController (+63 more)

### Community 9 - "providers.routes.js"
Cohesion: 0.09
Nodes (33): canViewAllWorks(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS (+25 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (48): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+40 more)

### Community 11 - "validation.utils.js"
Cohesion: 0.09
Nodes (26): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+18 more)

### Community 12 - "auditContext"
Cohesion: 0.09
Nodes (30): THEME_MODES, auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController() (+22 more)

### Community 13 - "seed.volume.js"
Cohesion: 0.10
Nodes (31): ref_node_crypto, addDays(), ALL_FIELDS, concept(), dbName, END_DATES, firstActive(), main() (+23 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (27): browserslist, development, production, name, packageManager, private, version, volta (+19 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.08
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 16 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (40): express, getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers() (+32 more)

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
Nodes (64): ADR-0021, ADR-0023, server_src_common_utils_money_utils_percentfor, isBillingType(), server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal, server_src_modules_billing_invoices_contractinvoiceterms_composecontractinvoice, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_money_columns, server_src_modules_billing_invoices_contractinvoiceterms_contract_tax_percent_columns (+56 more)

### Community 22 - "updateInvoice"
Cohesion: 0.13
Nodes (33): adjustableAmount(), amountRange(), approveInvoice(), assertContractAdmitsCancel(), assertStage(), assertUniqueNumber(), assertWork(), auditable() (+25 more)

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
Cohesion: 0.06
Nodes (24): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx, prismaMock (+16 more)

### Community 27 - "authContext.jsx"
Cohesion: 0.09
Nodes (24): loginAPI(), logoutAPI(), updateThemeModeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), instance, NO_REFRESH_URLS, refreshClient (+16 more)

### Community 28 - "contractPolicies.service.js"
Cohesion: 0.05
Nodes (93): scopeWhere(), percentText(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), TERM_UNITS (+85 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "WorkScopeContext.jsx"
Cohesion: 0.16
Nodes (23): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), getMyWorksSelectAPI(), pickWork(), useWorkScope(), WorkScopeContext (+15 more)

### Community 31 - "invoiceFollowUps.service.js"
Cohesion: 0.12
Nodes (34): USER_NAME_SELECT, userFullName(), AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013 (+26 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.05
Nodes (70): sendExport(), moneyRule(), optionalDate(), percentRule(), handleExport(), contractTaxOnlyRules(), simpleAmountRules(), ACT_FIELDS (+62 more)

### Community 33 - "seed.demo.js"
Cohesion: 0.05
Nodes (54): ADR-0015, ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile() (+46 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "UserDialog.jsx"
Cohesion: 0.17
Nodes (16): getIdentityDocumentsSelectAPI, getProfilesAPI(), saveUserAPI(), showInfo(), showObligatorios(), ChipMultiSelect(), fold(), DIAN_WEIGHTS (+8 more)

### Community 38 - "themes/index.jsx"
Cohesion: 0.11
Nodes (22): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow() (+14 more)

### Community 39 - "cron/index.js"
Cohesion: 0.09
Nodes (21): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+13 more)

### Community 40 - "contractFields.js"
Cohesion: 0.26
Nodes (10): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+2 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (48): ADR-0003, ADR-0011, ADR-0012, ADR-0016, ADR-0018, ADR-0019, ADR-0017, ADR-0020 (+40 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.06
Nodes (88): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, useSchemePalette(), MainCard(), invoicePath(), fMoneyText(), fPercentText() (+80 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "contractReports.service.js"
Cohesion: 0.08
Nodes (38): findExportRows(), renderExport(), sumMoney(), approvedOf(), contractInvoicesForReport(), contractsBalances(), exportFilterLines(), exportInvoices() (+30 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "AuthForgotPassword.jsx"
Cohesion: 0.07
Nodes (36): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage (+28 more)

### Community 51 - "ProfilePage.jsx"
Cohesion: 0.13
Nodes (25): deleteProfileAPI(), getModulesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue() (+17 more)

### Community 52 - "usersApi.js"
Cohesion: 0.12
Nodes (15): getBusinessRulesAPI(), saveBusinessRulesAPI(), getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), Accordion(), findOption(), flattenOptions() (+7 more)

### Community 53 - "ref_jest_globals"
Cohesion: 0.04
Nodes (25): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, dbUser (+17 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "WorksPage.jsx"
Cohesion: 0.12
Nodes (17): ADR-0002, useLinkedFilters(), WorksPage, MoneyField(), fTerm(), moneyInputText(), parseMoneyInput(), ConceptsTab() (+9 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 59 - "InvoicesPage.jsx"
Cohesion: 0.10
Nodes (21): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenu, InvoicesPage, LinkedFilterNotice(), client_src_utils_constants_invoice_modes, INVOICE_STATE_TABS (+13 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "SearchSection/index.jsx"
Cohesion: 0.48
Nodes (6): ProfileSection(), HeaderAvatar(), MobileSearch(), SearchSection(), Transitions(), material-ui-popup-state

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.20
Nodes (9): ref_path, ref_url, ADR-0027, loggerMock, prismaMock, controllers, EXEMPT, handlers (+1 more)

### Community 68 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): compat, __dirname, __filename, @eslint/compat, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+4 more)

### Community 70 - "moneyText"
Cohesion: 0.12
Nodes (27): moneyText(), amountsDto(), approvalSnapshot(), contractSnapshot(), detailText(), isSimpleType(), listAmounts(), previewSimpleInvoice() (+19 more)

### Community 71 - "WorkDataForm.jsx"
Cohesion: 0.16
Nodes (16): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getProviderTypeFieldsAPI(), saveProviderTypeFieldsAPI(), getSupervisionTypesSelectAPI, supervisionTypesApi, createMasterApi(), DATA_TYPE_NAMES (+8 more)

### Community 88 - "money.utils.js"
Cohesion: 0.15
Nodes (14): HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ROUNDING, toMoney() (+6 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (84): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, providerTypesApi, reasonsApi, useAuth() (+76 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.09
Nodes (29): ALL, assertAnyInScope(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf(), selectMyWorks() (+21 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "invoicesApi.js"
Cohesion: 0.16
Nodes (12): getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoicesApi, ADR-0017, previewSimpleInvoiceAPI(), FIELDS (+4 more)

### Community 108 - "users.service.js"
Cohesion: 0.05
Nodes (61): ADR-0004, INACTIVE_STATUS, AUDIT_ENTITIES, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused() (+53 more)

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
Cohesion: 0.07
Nodes (70): contractPoliciesApi, suspendContractAPI(), getInsurersSelectAPI, invoiceTransitionsApi, getPolicyTypesSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI() (+62 more)

### Community 117 - "export.service.js"
Cohesion: 0.07
Nodes (46): exceljs, pdfkit, addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+38 more)

### Community 118 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): ALL, CONCEPTS, CONTRACT, INVOICES, OWN, prismaMock

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "@mui/material"
Cohesion: 0.06
Nodes (53): getWorksSummaryAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, SubCard(), ACTION_TONES, ActionButton() (+45 more)

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.29
Nodes (9): RECONCILIATION_NOTIFICATION_LINES, balanceViolations(), CHECKS, findBalanceViolations(), ADR-0024, ADR-0025, runBalanceReconciliation(), violationLine() (+1 more)

### Community 129 - "images.js"
Cohesion: 0.26
Nodes (7): ref_fs, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "invoiceTerms.js"
Cohesion: 0.14
Nodes (18): assertBillingFits(), BILLING_TYPES, billingDto(), httpError(), money(), ZERO, assertTransition(), historyRow() (+10 more)

### Community 133 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 134 - "audit.service.js"
Cohesion: 0.05
Nodes (56): ADR-0001, bcrypt, ref_crypto, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0013, ADR-0027 (+48 more)

### Community 136 - "constants.js"
Cohesion: 0.05
Nodes (41): contractsApi, exportContractsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, PolicyTypePage (+33 more)

### Community 137 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "contracts.controller.test.js"
Cohesion: 0.14
Nodes (12): conceptsServiceMock, contractsServiceMock, emit, exportContractReport, exportContractSummary, getEffectivePermissionIds, ADR-0015, ADR-0016 (+4 more)

### Community 151 - "businessRules.service.js"
Cohesion: 0.09
Nodes (26): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+18 more)

### Community 153 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 155 - "decimal"
Cohesion: 0.11
Nodes (38): @prisma/client, decimal(), ratioPercent(), ratioText(), roundMoney(), roundRatio(), advanceBalances(), appliedPct() (+30 more)

### Community 156 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 157 - "ContractTaxesSection.jsx"
Cohesion: 0.20
Nodes (10): previewContractInvoiceAPI(), client_src_ui_component_extended_amountpercentfield, MONEY, CONTRACT_TAX_FIELDS, FIELDS, FIELDS_BY_NAME, moneyRules, percentRules() (+2 more)

### Community 159 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 173 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 174 - "useConfig.js"
Cohesion: 0.20
Nodes (11): config, ConfigContext, ConfigProvider(), useConfig(), useLocalStorage(), ElevationScroll(), HorizontalBar(), ImageList() (+3 more)

### Community 175 - "floatingPoint.guard.test.js"
Cohesion: 0.29
Nodes (5): ALLOWED, files(), lines, SRC, text()

### Community 176 - "`tbl_users`"
Cohesion: 0.26
Nodes (8): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 181 - "formatTime.js"
Cohesion: 0.13
Nodes (11): uploadFile(), paginationDocsApi(), saveDocApi(), genericRequest, showPromise(), DocumentManagement(), FileRow(), getFileIcon() (+3 more)

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

### Community 197 - "WorkDetailPage.jsx"
Cohesion: 0.05
Nodes (86): getAddressTypesSelectAPI, getStatusesByScopeAPI(), exportContractAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, useEndDatePreview(), channelsOf() (+78 more)

### Community 199 - "AdvanceAmountsSection.jsx"
Cohesion: 0.38
Nodes (6): getContractAdvanceAPI(), AdjustableAmount(), AdvanceAmountsSection(), SUBTITLES, TAXES_AFTER_RETENTION, TAXES_BEFORE_ADVANCE

### Community 201 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 203 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 206 - "MainLayout/index.jsx"
Cohesion: 0.14
Nodes (26): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), Footer(), Header(), ThemeModeSection() (+18 more)

### Community 212 - "getEffectivePermissionIds"
Cohesion: 0.08
Nodes (24): findUsersWithPermission(), getEffectivePermissionIds(), deliverReconciliationReport(), reportEmails(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes (+16 more)

## Knowledge Gaps
- **1043 isolated node(s):** `ADR-0017`, `CONTRACT_TYPES`, `SIMPLE_CAPTURED`, `CONTRACT_CAPTURED`, `TABS` (+1038 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1446 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **97 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Why does `ADR-0002` connect `contracts.service.js` to `contractPolicies.service.js`, `WorkChartsTab.jsx`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `InvoiceFormPage.jsx`, `constants.js`, `ConceptDialog.jsx`, `client/package.json`, `authContext.jsx`, `ContractTaxesSection.jsx`, `WorkScopeContext.jsx`, `UserDialog.jsx`, `themes/index.jsx`, `WorkChartsTab.jsx`, `useConfig.js`, `AuthForgotPassword.jsx`, `ProfilePage.jsx`, `usersApi.js`, `formatTime.js`, `WorksPage.jsx`, `InvoicesPage.jsx`, `SearchSection/index.jsx`, `WorkDetailPage.jsx`, `DebouncedInput.jsx`, `WorkDataForm.jsx`, `AdvanceAmountsSection.jsx`, `EasyCrop.jsx`, `MainLayout/index.jsx`, `useAuth`, `invoicesApi.js`, `showError`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **What connects `ADR-0017`, `CONTRACT_TYPES`, `SIMPLE_CAPTURED` to the rest of the system?**
  _1043 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contracts.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05328218243819267 - nodes in this community are weakly interconnected._
# Graph Report - WEBPAC-INTERVE  (2026-10-22)

## Corpus Check
- 617 files · ~315,659 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3607 nodes · 9977 edges · 209 communities (115 shown, 94 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 134 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7850e897`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- users.service.js
- httpCliente.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- providers.routes.js
- ContractDetailPage.jsx
- seed.demo.js
- auth.routes.js
- contractPolicies.service.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- workScopeOf
- invoices.service.test.js
- compilerOptions
- NotificationSection/index.jsx
- invoices.service.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- constants.js
- writeAudit
- invoices.controller.test.js
- contractConcepts.service.js
- mailerService.js
- contracts.routes.js
- expirationNotice.service.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- contractSuspensions.service.test.js
- contractReports.service.js
- cron/index.js
- winston.config.js
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorkChartsTab.jsx
- scripts
- simpleInvoiceTerms.js
- `tbl_invoices`
- withAlpha
- master.service.test.js
- EasyCrop.jsx
- ref_jest_globals
- `tbl_contract_type_fields`
- InputLabel.jsx
- transaction.mock.js
- scripts
- ProviderDetailPage.jsx
- session.service.test.js
- compilerOptions
- excelJS.js
- permission
- devDependencies
- transaction.service.test.js
- notifications.service.js
- contracts.service.js
- @mui/material
- `tbl_contract_status_history`
- socket.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- react
- getIO
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- PoliciesTab.jsx
- export.service.js
- formatTime.js
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- error.middleware.test.js
- uniqueConstraints.constants.test.js
- contractEndDateReconciliation.service.js
- serviceWorker.jsx
- `tbl_providers`
- images.js
- auth.service.js
- works.service.test.js
- auth.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- `tbl_user_permissions`
- AuthForgotPassword.jsx
- MainLayout/index.jsx
- moneyText
- contractNotifications.service.test.js
- contractFields.js
- `tbl_contract_concepts`
- `tbl_reasons`
- LogoSection/index.jsx
- browserslist
- volta
- `tbl_users`
- balanceReconciliation.service.test.js
- decisionReferences.guard.test.js
- ImageList.jsx
- App.jsx
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- floatingPoint.guard.test.js
- invoiceEvidence.service.js
- WorkDetailPage.jsx
- contracts.controller.test.js
- DebouncedInput.jsx
- ProviderTypeFieldsDialog.jsx
- contractEndDateReconciliation.service.test.js
- app.routes.js
- Sidebar/index.jsx
- handleFirebase.js
- @tabler/icons-react
- `tbl_invoices`
- `tbl_invoices`
- status.constants.js
- permissions.controller.test.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 136 edges
2. `react` - 106 edges
3. `showError()` - 82 edges
4. `useAuth()` - 79 edges
5. `workScopeOf()` - 62 edges
6. `writeAudit()` - 60 edges
7. `withLockedTransaction()` - 59 edges
8. `dateOnlyText()` - 59 edges
9. `@tabler/icons-react` - 56 edges
10. `showSuccess()` - 55 edges

## Surprising Connections (you probably didn't know these)
- `getUserPermissions()` --calls--> `getEffectivePermissionIds()`  [EXTRACTED]
  server/src/modules/app/general/app.service.js → server/src/common/services/effectivePermissions.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `previewWorkEndDate()` --calls--> `addTerm()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/term.utils.js

## Import Cycles
- None detected.

## Communities (209 total, 94 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (27): ThemeCustomization(), Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid() (+19 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "users.service.js"
Cohesion: 0.05
Nodes (58): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent(), capitalize() (+50 more)

### Community 3 - "httpCliente.js"
Cohesion: 0.08
Nodes (35): getWorkDashboardAPI(), ADR-0002, getMyWorksSelectAPI(), instance, NO_REFRESH_URLS, refreshClient, RETRY_503_HINT, pickWork() (+27 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (58): assertInScope(), identificationError(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope() (+50 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.08
Nodes (46): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, previewSimpleInvoiceAPI() (+38 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.09
Nodes (33): exportFormatRule(), invoicesRoutes, ADR-0017, approveInvoiceSchema, cancelInvoiceSchema, contractSelectRules, deleteInvoiceSchema, exportInvoicesSchema (+25 more)

### Community 9 - "providers.routes.js"
Cohesion: 0.09
Nodes (27): ASSIGNMENT_FIELDS, assignProviderController, checkIdentificationController, getProviderController, INPUT_FIELDS, notifyAssignment(), paginationProvidersController, paginationWorkProvidersController (+19 more)

### Community 10 - "ContractDetailPage.jsx"
Cohesion: 0.05
Nodes (77): contractConceptsApi, contractPoliciesApi, contractsApi, exportContractAPI(), exportContractsAPI(), getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFormOptionsAPI() (+69 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.05
Nodes (56): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+48 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "contractPolicies.service.js"
Cohesion: 0.13
Nodes (21): percentOf(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, policyBaseValue(), REASON_SCOPES, ADR-0002 (+13 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (34): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+26 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.08
Nodes (31): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, IDEMPOTENCY_HEADER, createMasterSchemas(), contactsRules(), emailRule(), idArray() (+23 more)

### Community 17 - "workScopeOf"
Cohesion: 0.08
Nodes (63): auditContext(), getEffectivePermissionIds(), sendExport(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, accessOf() (+55 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "NotificationSection/index.jsx"
Cohesion: 0.22
Nodes (14): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), Header(), inActiveWork(), NotificationSection(), targetOf() (+6 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.06
Nodes (86): ADR-0023, isBlank(), toMoney(), dateRangeFilter(), adjustableAmount(), admittedContractsWhere(), admittedTypes(), approveInvoice() (+78 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.07
Nodes (74): ADR-0002, ADR-0011, scopeWhere(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel() (+66 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (50): ADR-0004, ADR-0007, INACTIVE_STATUS, PROGRESS_WARNING, defineContacts(), FIELDS, httpError(), ADR-0009 (+42 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.06
Nodes (24): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx, prismaMock (+16 more)

### Community 27 - "constants.js"
Cohesion: 0.07
Nodes (49): getDashboardSummaryAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), useInvoiceViews(), InvoicesPage, SocketContext, LinkedFilterNotice(), TooltipLongText() (+41 more)

### Community 28 - "writeAudit"
Cohesion: 0.08
Nodes (42): ADR-0001, ADR-0013, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0027 (+34 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "contractConcepts.service.js"
Cohesion: 0.08
Nodes (73): newOperationId(), withContractAiu(), resolveContractTypeFields(), assertContractStillAdmits(), activeSequence(), amendmentResult(), assertChronology(), assertStartDate() (+65 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.08
Nodes (36): moneyRule(), optionalDate(), percentRule(), simpleAmountRules(), contractsRoutes, ADR-0006, ADR-0016, ADR-0017 (+28 more)

### Community 33 - "expirationNotice.service.js"
Cohesion: 0.06
Nodes (41): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+33 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 38 - "contractReports.service.js"
Cohesion: 0.08
Nodes (38): percentText(), sumMoney(), approvedOf(), contractInvoicesForReport(), contractsBalances(), conceptLabel(), getContractPolicies(), ADVANCE_COLUMNS (+30 more)

### Community 39 - "cron/index.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+8 more)

### Community 40 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 41 - "permissions.constants.js"
Cohesion: 0.06
Nodes (40): ADR-0016, ADR-0024, ADR-0025, ADR-0026, ADR-0011, ADR-0012, ADR-0017, ADR-0018 (+32 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.09
Nodes (65): MainCard(), fMoneyText(), fPercentText(), LiquidationRetention(), contractRows(), DrillDownDialog(), invoiceRows(), num (+57 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "simpleInvoiceTerms.js"
Cohesion: 0.18
Nodes (17): toPercent(), previewSimpleInvoice(), blank(), composeSimpleInvoice(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023 (+9 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "withAlpha"
Cohesion: 0.14
Nodes (17): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Chip() (+9 more)

### Community 51 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 53 - "ref_jest_globals"
Cohesion: 0.04
Nodes (25): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+17 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "ProviderDetailPage.jsx"
Cohesion: 0.07
Nodes (55): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi, getProviderTypesSelectAPI (+47 more)

### Community 59 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "transaction.service.test.js"
Cohesion: 0.13
Nodes (13): ref_fs, ref_path, ref_url, catalog, expected, prismaMock, ADR-0027, loggerMock (+5 more)

### Community 68 - "notifications.service.js"
Cohesion: 0.18
Nodes (16): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+8 more)

### Community 70 - "contracts.service.js"
Cohesion: 0.05
Nodes (59): USER_NAME_SELECT, userFullName(), selectInvoiceProviders(), contractOf(), CONTRACT_AUDITED, countByState(), currentValueText(), derivedEndDate() (+51 more)

### Community 71 - "@mui/material"
Cohesion: 0.08
Nodes (36): getWorksSummaryAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, SubCard(), ACTION_TONES, ActionButton() (+28 more)

### Community 88 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (83): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, policyTypesApi, providerTypesApi, reasonsApi (+75 more)

### Community 100 - "works.routes.js"
Cohesion: 0.13
Nodes (20): changeWorkStatusController, deleteWorkController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController, previewWorkEndDateController, saveWorkController (+12 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "react"
Cohesion: 0.05
Nodes (80): getBusinessRulesAPI(), saveBusinessRulesAPI(), suspendContractAPI(), invoiceTransitionsApi, configurePolicyTypeBaseAPI(), deleteProfileAPI(), getModulesAPI(), getProfilesAPI() (+72 more)

### Community 108 - "getIO"
Cohesion: 0.13
Nodes (17): getIO(), configurePolicyTypeBaseController, FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, updateUserPermissions(), deleteProfileController() (+9 more)

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.08
Nodes (34): express, verifyToken(), requirePermission(), validate(), createMasterControllers(), createMasterRouter(), businessRulesRoutes, identityDocumentsRoutes (+26 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "PoliciesTab.jsx"
Cohesion: 0.16
Nodes (17): getInsurersSelectAPI, getPolicyTypesSelectAPI, ADR-0019, ADR-0018, PoliciesDraftEditor(), rowKey(), ADR-0017, ADR-0018 (+9 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (50): exceljs, addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf(), buildPdfDocument() (+42 more)

### Community 118 - "formatTime.js"
Cohesion: 0.14
Nodes (12): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+4 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): ALL, CONCEPTS, CONTRACT, INVOICES, OWN, prismaMock

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 125 - "contractEndDateReconciliation.service.js"
Cohesion: 0.18
Nodes (17): ADR-0015, findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS (+9 more)

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 134 - "auth.service.js"
Cohesion: 0.05
Nodes (55): bcrypt, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME (+47 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 151 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 153 - "AuthForgotPassword.jsx"
Cohesion: 0.06
Nodes (41): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), client_src_assets_images_interadminpro (+33 more)

### Community 154 - "MainLayout/index.jsx"
Cohesion: 0.19
Nodes (11): Footer(), MainLayout(), MainLayoutContent(), ScopedOutlet(), MainContentStyled, closedMixin(), MiniDrawerStyled, openedMixin() (+3 more)

### Community 155 - "moneyText"
Cohesion: 0.07
Nodes (63): decimal(), HUNDRED, MONEY_SCALE, moneyText(), PERCENT_SCALE, RATIO_SCALE, ratioPercent(), ratioText() (+55 more)

### Community 156 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 157 - "contractFields.js"
Cohesion: 0.21
Nodes (12): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+4 more)

### Community 173 - "LogoSection/index.jsx"
Cohesion: 0.40
Nodes (4): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE

### Community 174 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 175 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 176 - "`tbl_users`"
Cohesion: 0.31
Nodes (7): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.14
Nodes (10): @prisma/client, CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients (+2 more)

### Community 179 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 183 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 186 - "App.jsx"
Cohesion: 0.28
Nodes (7): refreshSession(), App(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "floatingPoint.guard.test.js"
Cohesion: 0.29
Nodes (5): ALLOWED, files(), lines, SRC, text()

### Community 194 - "invoiceEvidence.service.js"
Cohesion: 0.21
Nodes (12): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+4 more)

### Community 197 - "WorkDetailPage.jsx"
Cohesion: 0.06
Nodes (43): getStatusesByScopeAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, useEndDatePreview(), ADR-0002, useLinkedFilters(), WorksPage (+35 more)

### Community 198 - "contracts.controller.test.js"
Cohesion: 0.14
Nodes (12): conceptsServiceMock, contractsServiceMock, emit, exportContractReport, exportContractSummary, getEffectivePermissionIds, ADR-0015, ADR-0016 (+4 more)

### Community 201 - "ProviderTypeFieldsDialog.jsx"
Cohesion: 0.31
Nodes (9): getProviderTypeFieldsAPI(), saveProviderTypeFieldsAPI(), DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006, ProviderTypeFieldsDialog(), toggle(), toRow() (+1 more)

### Community 202 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 203 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 206 - "Sidebar/index.jsx"
Cohesion: 0.21
Nodes (17): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), setParentOpenedMenu(), useMenuCollapse() (+9 more)

### Community 211 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 212 - "@tabler/icons-react"
Cohesion: 0.13
Nodes (25): getAddressTypesSelectAPI, getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY (+17 more)

### Community 219 - "status.constants.js"
Cohesion: 0.09
Nodes (31): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+23 more)

### Community 224 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

## Knowledge Gaps
- **1020 isolated node(s):** `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS`, `NO_FIELDS`, `LEVEL_COLORS`, `num` (+1015 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1388 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **94 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lodash` connect `DebouncedInput.jsx` to `writeAudit`, `server/package.json`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `httpCliente.js`, `InvoiceFormPage.jsx`, `ContractDetailPage.jsx`, `client/package.json`, `NotificationSection/index.jsx`, `AuthForgotPassword.jsx`, `MainLayout/index.jsx`, `constants.js`, `LogoSection/index.jsx`, `WorkChartsTab.jsx`, `withAlpha`, `EasyCrop.jsx`, `InputLabel.jsx`, `ImageList.jsx`, `ProviderDetailPage.jsx`, `WorkDetailPage.jsx`, `DebouncedInput.jsx`, `ProviderTypeFieldsDialog.jsx`, `Sidebar/index.jsx`, `@tabler/icons-react`, `useAuth`, `react`, `PoliciesTab.jsx`, `formatTime.js`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `axios` connect `httpCliente.js` to `server/package.json`, `client/package.json`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **What connects `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS`, `NO_FIELDS` to the rest of the system?**
  _1020 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07541478129713423 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `users.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05472636815920398 - nodes in this community are weakly interconnected._
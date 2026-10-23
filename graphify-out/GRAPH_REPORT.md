# Graph Report - WEBPAC-INTERVE  (2026-10-23)

## Corpus Check
- 630 files · ~327,961 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3638 nodes · 9975 edges · 214 communities (122 shown, 92 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 135 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1d417d91`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- users.service.js
- UsersPage.jsx
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- providers.routes.js
- ConceptDialog.jsx
- providerTypeFields.service.js
- auth.routes.js
- seed.demo.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- contracts.service.js
- invoices.service.test.js
- compilerOptions
- NotificationSection/index.jsx
- invoices.service.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
- ContractsPage.jsx
- getIO
- invoices.controller.test.js
- contractPolicies.service.js
- mailerService.js
- contracts.routes.js
- expirationNotice.service.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- dashboard.service.js
- contractReports.service.js
- cron/index.js
- useGetMenuMaster
- permissions.constants.js
- devDependencies
- src/index.jsx
- WorkChartsTab.jsx
- scripts
- moneyText
- `tbl_invoices`
- withAlpha
- master.service.test.js
- contractSuspensions.service.test.js
- ref_jest_globals
- `tbl_contract_type_fields`
- master.service.js
- transaction.mock.js
- scripts
- ContractDetailPage.jsx
- session.service.test.js
- compilerOptions
- excelJS.js
- AuthForgotPassword.jsx
- permission
- devDependencies
- transaction.service.test.js
- notifications.service.js
- addressTypes.service.js
- @mui/material
- `tbl_contract_status_history`
- socket.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScopeOf
- `tbl_provider_types`
- UserDialog.jsx
- session.service.js
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- showError
- export.service.js
- httpCliente.js
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- error.middleware.test.js
- WorkSummaryTab.jsx
- balanceReconciliation.service.js
- status.constants.js
- serviceWorker.jsx
- `tbl_providers`
- invoiceEvidence.service.js
- GeneralDashboard.jsx
- writeAudit
- uniqueConstraints.constants.test.js
- handleFirebase.js
- works.service.test.js
- auth.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- images.js
- `tbl_user_permissions`
- AuthenticationRoutes.jsx
- MainCard
- decimal
- winston.config.js
- decisionReferences.guard.test.js
- react-router-dom
- `tbl_contract_concepts`
- `tbl_reasons`
- App.jsx
- floatingPoint.guard.test.js
- dashboard.service.test.js
- `tbl_users`
- balanceReconciliation.service.test.js
- users.service.test.js
- permissions.controller.test.js
- useConfig.js
- Breadcrumbs.jsx
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- react
- contracts.controller.test.js
- WorkPoliciesTab.jsx
- ProviderTypePage.jsx
- contractEndDateReconciliation.service.test.js
- app.service.js
- MainLayout/index.jsx
- invoiceEvidence.service.test.js
- `tbl_invoices`
- `tbl_invoices`
- dashboard.measure.js

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 141 edges
2. `react` - 107 edges
3. `showError()` - 84 edges
4. `useAuth()` - 77 edges
5. `workScopeOf()` - 62 edges
6. `writeAudit()` - 60 edges
7. `withLockedTransaction()` - 59 edges
8. `dateOnlyText()` - 59 edges
9. `@tabler/icons-react` - 57 edges
10. `showSuccess()` - 55 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `WorkView()` --indirect_call--> `previewWorkEndDateAPI()`  [INFERRED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/api/requests/worksApi.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `getUserPermissions()` --calls--> `getEffectivePermissionIds()`  [EXTRACTED]
  server/src/modules/app/general/app.service.js → server/src/common/services/effectivePermissions.service.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js

## Import Cycles
- None detected.

## Communities (214 total, 92 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (24): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "users.service.js"
Cohesion: 0.08
Nodes (27): ADR-0001, USER_NAME_SELECT, DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008 (+19 more)

### Community 3 - "UsersPage.jsx"
Cohesion: 0.15
Nodes (23): deleteProfileAPI(), getModulesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue() (+15 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (37): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+29 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (57): applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes(), assertTypeIds(), assertWorkAssignable() (+49 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.07
Nodes (52): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, client_src_api_requests_invoicesapi_previewcontractinvoiceapi (+44 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.07
Nodes (48): sendExport(), exportFormatRule(), accessOf(), approveInvoiceController, cancelInvoiceController, deleteInvoiceController, exportInvoicesController, getContractAdvanceController (+40 more)

### Community 9 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.09
Nodes (41): contractConceptsApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+33 more)

### Community 11 - "providerTypeFields.service.js"
Cohesion: 0.27
Nodes (14): resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getProviderTypeFields(), httpError(), ADR-0006 (+6 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "seed.demo.js"
Cohesion: 0.05
Nodes (46): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+38 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (43): compat, __dirname, __filename, browserslist, development, production, eslintConfig, extends (+35 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, icons, other, icons (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.09
Nodes (27): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+19 more)

### Community 17 - "contracts.service.js"
Cohesion: 0.07
Nodes (51): toDateOnly(), AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+43 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.05
Nodes (83): ADR-0013, ADR-0017, ADR-0021, ADR-0023, ADR-0027, server_src_common_utils_money_utils_percentfor, server_src_modules_billing_invoices_contractinvoiceterms, server_src_modules_billing_invoices_contractinvoiceterms_assertcontracttotal (+75 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.10
Nodes (46): ADR-0011, addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS (+38 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.09
Nodes (46): ADR-0004, ADR-0007, assertInScope(), applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted() (+38 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.06
Nodes (25): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+17 more)

### Community 27 - "ContractsPage.jsx"
Cohesion: 0.05
Nodes (56): exportContractAPI(), exportContractsAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), providersApi, getMyWorksSelectAPI(), pickWork(), useWorkFilterField() (+48 more)

### Community 28 - "getIO"
Cohesion: 0.13
Nodes (16): getIO(), configurePolicyTypeBaseController, FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, deleteProfileController(), getModulesController() (+8 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (90): withContractAiu(), assertContractStillAdmits(), activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget() (+82 more)

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

### Community 37 - "dashboard.service.js"
Cohesion: 0.09
Nodes (43): scopeWhere(), percentOf(), policyExpiringDays(), insuredValue(), ADR-0019, ADR-0026, policyBaseValue(), contractsBlock() (+35 more)

### Community 38 - "contractReports.service.js"
Cohesion: 0.08
Nodes (41): findExportRows(), renderExport(), sumMoney(), approvedOf(), contractInvoicesForReport(), contractsBalances(), exportInvoices(), ADVANCE_COLUMNS (+33 more)

### Community 39 - "cron/index.js"
Cohesion: 0.13
Nodes (15): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+7 more)

### Community 40 - "useGetMenuMaster"
Cohesion: 0.23
Nodes (12): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), MenuList() (+4 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.07
Nodes (35): ADR-0016, ADR-0024, ADR-0025, ADR-0026, ADR-0011, ADR-0012, ADR-0017, ADR-0018 (+27 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.15
Nodes (13): client_src_assets_scss_style, config, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals() (+5 more)

### Community 45 - "WorkChartsTab.jsx"
Cohesion: 0.14
Nodes (32): fPercentText(), Advances(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf(), drillLinkSx (+24 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "moneyText"
Cohesion: 0.11
Nodes (32): moneyText(), percentText(), toPercent(), isBillingType(), amountPairOf(), approvalSnapshot(), contractSnapshot(), detailChanges() (+24 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 51 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 52 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 53 - "ref_jest_globals"
Cohesion: 0.06
Nodes (18): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+10 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "master.service.js"
Cohesion: 0.14
Nodes (27): INACTIVE_STATUS, capitalize(), createMasterService(), httpError(), ADR-0004, ADR-0013, ADR-0027, containsFilter() (+19 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (28): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+20 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "ContractDetailPage.jsx"
Cohesion: 0.11
Nodes (31): checkProviderIdentificationAPI(), SubCard(), DataList(), Figure(), FormSection(), LastModifiedCell(), providerInvoiceViewName(), fDateTime() (+23 more)

### Community 59 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "AuthForgotPassword.jsx"
Cohesion: 0.15
Nodes (20): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider() (+12 more)

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

### Community 70 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 71 - "@mui/material"
Cohesion: 0.07
Nodes (43): getAddressTypesSelectAPI, getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorksSummaryAPI(), ActionButton(), toneOf(), ConfirmDialog() (+35 more)

### Community 88 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (86): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), policyTypesApi, reasonsApi (+78 more)

### Community 100 - "workScopeOf"
Cohesion: 0.08
Nodes (54): auditContext(), getEffectivePermissionIds(), hasEffectivePermission(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope() (+46 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "UserDialog.jsx"
Cohesion: 0.10
Nodes (24): getBusinessRulesAPI(), saveBusinessRulesAPI(), getIdentityDocumentsSelectAPI, getProfilesAPI(), getBasicInformationAPI(), saveUserAPI(), updateAccountAPI(), updatePasswordAPI() (+16 more)

### Community 108 - "session.service.js"
Cohesion: 0.15
Nodes (18): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+10 more)

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.07
Nodes (44): express, verifyToken(), requirePermission(), validate(), IDEMPOTENCY_HEADER, revokeSession(), createMasterControllers(), createMasterRouter() (+36 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "showError"
Cohesion: 0.07
Nodes (66): contractPoliciesApi, suspendContractAPI(), getInsurersSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, getAssignableWorksAPI() (+58 more)

### Community 117 - "export.service.js"
Cohesion: 0.07
Nodes (46): exceljs, pdfkit, addFieldsSheet(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+38 more)

### Community 118 - "httpCliente.js"
Cohesion: 0.07
Nodes (28): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), ADR-0012, getWorkManagersSelectAPI(), previewWorkEndDateAPI() (+20 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): ALL, CONCEPTS, CONTRACT, INVOICES, OWN, prismaMock

### Community 123 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "WorkSummaryTab.jsx"
Cohesion: 0.14
Nodes (29): fMoneyText(), InvoiceDetailPanel(), contractRows(), DrillDownDialog(), invoiceRows(), num, useDrillDown(), dashboardTo (+21 more)

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.21
Nodes (13): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), contractBalanceReconciliationJob, insertNotification(), balanceViolations(), CHECKS (+5 more)

### Community 129 - "status.constants.js"
Cohesion: 0.09
Nodes (30): ADR-0015, adapter, describeTarget(), prisma, testConnection(), ACTIVE_STATUS, DELETED_STATUS, canonical() (+22 more)

### Community 130 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "invoiceEvidence.service.js"
Cohesion: 0.11
Nodes (25): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+17 more)

### Community 133 - "GeneralDashboard.jsx"
Cohesion: 0.16
Nodes (21): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, useWorkScope(), WorkSection(), DashboardDefault, AlertsCard(), Empty() (+13 more)

### Community 134 - "writeAudit"
Cohesion: 0.05
Nodes (73): bcrypt, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0027, newOperationId() (+65 more)

### Community 136 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 137 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 151 - "images.js"
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 153 - "AuthenticationRoutes.jsx"
Cohesion: 0.12
Nodes (19): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+11 more)

### Community 154 - "MainCard"
Cohesion: 0.20
Nodes (13): appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), Avatar(), SamplePage(), ColorBox() (+5 more)

### Community 155 - "decimal"
Cohesion: 0.07
Nodes (59): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent() (+51 more)

### Community 156 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 157 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 159 - "react-router-dom"
Cohesion: 0.39
Nodes (6): useSchemePalette(), InvoicesByWorkCard(), PolicyStatusCard(), ADR-0002, react-apexcharts, react-router-dom

### Community 173 - "App.jsx"
Cohesion: 0.13
Nodes (16): App(), ThemedToastContainer(), CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext, NavigationScroll(), SocketProvider() (+8 more)

### Community 174 - "floatingPoint.guard.test.js"
Cohesion: 0.29
Nodes (5): ALLOWED, files(), lines, SRC, text()

### Community 175 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 176 - "`tbl_users`"
Cohesion: 0.31
Nodes (7): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 181 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 183 - "useConfig.js"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 186 - "Breadcrumbs.jsx"
Cohesion: 0.67
Nodes (3): menuItems, Breadcrumbs(), BTitle()

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 197 - "react"
Cohesion: 0.04
Nodes (73): getStatusesByScopeAPI(), contractsApi, useEndDatePreview(), InvoiceDetailPage, SocketContext, ContactsList(), ADR-0009, Pending() (+65 more)

### Community 198 - "contracts.controller.test.js"
Cohesion: 0.14
Nodes (12): conceptsServiceMock, contractsServiceMock, emit, exportContractReport, exportContractSummary, getEffectivePermissionIds, ADR-0015, ADR-0016 (+4 more)

### Community 199 - "WorkPoliciesTab.jsx"
Cohesion: 0.21
Nodes (11): ACTION_TONES, ContractBalanceCards(), DashboardCards(), Indicator(), ADR-0002, POLICY_STATUS_COLORS, EXPIRING_TONE, includesText() (+3 more)

### Community 201 - "ProviderTypePage.jsx"
Cohesion: 0.14
Nodes (17): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+9 more)

### Community 202 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 203 - "app.service.js"
Cohesion: 0.13
Nodes (16): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+8 more)

### Community 206 - "MainLayout/index.jsx"
Cohesion: 0.20
Nodes (14): handlerDrawerOpen(), Footer(), Header(), ThemeModeSection(), MainLayout(), MainLayoutContent(), ScopedOutlet(), LogoSection() (+6 more)

### Community 209 - "invoiceEvidence.service.test.js"
Cohesion: 0.40
Nodes (3): prismaMock, state, user

### Community 219 - "dashboard.measure.js"
Cohesion: 0.36
Nodes (8): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain()

## Knowledge Gaps
- **1018 isolated node(s):** `EMPTY_FORM`, `DOCUMENT_FIELDS`, `ADR-0020`, `TAXES_BEFORE_ADVANCE`, `TAXES_AFTER_RETENTION` (+1013 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1412 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **92 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@mui/material` connect `@mui/material` to `UsersPage.jsx`, `server/package.json`, `GeneralDashboard.jsx`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `client/package.json`, `NotificationSection/index.jsx`, `AuthenticationRoutes.jsx`, `MainCard`, `ContractsPage.jsx`, `react-router-dom`, `useGetMenuMaster`, `App.jsx`, `WorkChartsTab.jsx`, `withAlpha`, `useConfig.js`, `ContractDetailPage.jsx`, `Breadcrumbs.jsx`, `AuthForgotPassword.jsx`, `react`, `WorkPoliciesTab.jsx`, `ProviderTypePage.jsx`, `MainLayout/index.jsx`, `useAuth`, `UserDialog.jsx`, `showError`, `httpCliente.js`, `WorkSummaryTab.jsx`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Why does `ADR-0002` connect `react-router-dom` to `workDashboard.service.js`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `axios` connect `httpCliente.js` to `server/package.json`, `client/package.json`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **What connects `EMPTY_FORM`, `DOCUMENT_FIELDS`, `ADR-0020` to the rest of the system?**
  _1018 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08325624421831637 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `users.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08199643493761141 - nodes in this community are weakly interconnected._
# Graph Report - WEBPAC-INTERVE  (2026-10-15)

## Corpus Check
- 583 files · ~285,557 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3321 nodes · 9166 edges · 207 communities (126 shown, 81 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 121 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `355dff73`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- users.service.js
- providerTypeFields.service.js
- dependencies
- server/package.json
- providers.service.js
- InvoiceFormPage.jsx
- invoices.routes.js
- ContractFormPage.jsx
- WorkDataForm.jsx
- contractPolicies.service.js
- auth.routes.js
- contractTerms.js
- client/package.json
- @tabler/icons-react
- providers.routes.js
- WorkDetailPage.jsx
- invoices.service.test.js
- compilerOptions
- AuthenticationRoutes.jsx
- contracts.service.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contractSuspensions.service.test.js
- invoices.controller.test.js
- showSuccess
- contracts.controller.test.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- react
- session.service.js
- users.service.test.js
- server.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- EasyCrop.jsx
- scripts
- moneyText
- `tbl_invoices`
- WorkScopeContext.jsx
- dashboard.service.js
- showError
- socket.manager.js
- `tbl_contract_type_fields`
- httpCliente.js
- transaction.mock.js
- scripts
- fMoneyText
- workScopeOf
- compilerOptions
- excelJS.js
- withLockedTransaction
- permission
- devDependencies
- floatingPoint.guard.test.js
- notifications.routes.js
- contractConcepts.service.js
- @mui/material
- `tbl_contract_status_history`
- app.routes.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_type_field_versions`
- SuspendDialog.jsx
- AuthForgotPassword.jsx
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- react-router-dom
- seed.volume.js
- session.service.test.js
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- transaction.service.test.js
- images.js
- contractEndDateReconciliation.service.js
- `tbl_contract_suspensions`
- GeneralDashboard.jsx
- `tbl_providers`
- ProviderDetailPage.jsx
- policyTerms.js
- writeAudit
- prismaClient.js
- uniqueConstraints.constants.test.js
- runIdempotent
- works.service.test.js
- contractPolicies.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- addressTypes.contacts.js
- retentionTerms.js
- invoiceTerms.js
- PolicyDialog.jsx
- decimal
- contractNotifications.service.test.js
- invoiceViews.js
- constants.js
- `tbl_contract_concepts`
- `tbl_reasons`
- serviceWorker.jsx
- invoiceEvidence.service.js
- withAlpha
- `tbl_users`
- balanceReconciliation.service.test.js
- contractEndDateReconciliation.service.test.js
- extends
- ImageList.jsx
- auth.service.test.js
- winston.config.js
- invariants.check.js
- authjwt.middleware.test.js
- browserslist
- volta
- DebouncedInput.jsx
- NotificationSection/index.jsx
- contracts.service.test.js
- handleFirebase.js
- ContactsEditor.jsx
- ProviderTypeFieldsDialog.jsx
- dashboard.measure.js
- LogoSection/index.jsx
- master.service.test.js
- permissions.controller.test.js
- MiniDrawerStyled.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 131 edges
2. `react` - 99 edges
3. `useAuth()` - 79 edges
4. `showError()` - 74 edges
5. `writeAudit()` - 59 edges
6. `withLockedTransaction()` - 56 edges
7. `dateOnlyText()` - 54 edges
8. `showSuccess()` - 53 edges
9. `@tabler/icons-react` - 52 edges
10. `workScopeOf()` - 51 edges

## Surprising Connections (you probably didn't know these)
- `nit()` --calls--> `nitCheckDigit()`  [EXTRACTED]
  server/prisma/seed.demo.js → server/src/modules/admin/identityDocuments/identityDocuments.formats.js
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `previewWorkEndDate()` --calls--> `addTerm()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/term.utils.js

## Import Cycles
- None detected.

## Communities (207 total, 81 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (26): ThemeCustomization(), Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid() (+18 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "users.service.js"
Cohesion: 0.08
Nodes (42): newOperationId(), capitalize(), createMasterService(), defineMaster(), httpError(), ADR-0027, countByStatus(), DEFAULT_ROWS (+34 more)

### Community 3 - "providerTypeFields.service.js"
Cohesion: 0.11
Nodes (30): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+22 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (58): applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes(), assertTypeIds(), assertWorkAssignable() (+50 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.11
Nodes (33): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), ADR-0017, previewSimpleInvoiceAPI(), FormSection(), MoneyField() (+25 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.10
Nodes (29): accessOf(), getContractAdvanceController, getInvoiceController, getInvoiceEvidenceController, getInvoiceFormOptionsController, grantedOf(), INVOICE_FIELDS, paginationInvoicesController (+21 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.10
Nodes (38): contractConceptsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+30 more)

### Community 10 - "WorkDataForm.jsx"
Cohesion: 0.28
Nodes (7): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, createMasterApi(), TERM_UNIT_OPTIONS, WorkDataForm(), moneyRules()

### Community 11 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (49): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+41 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "contractTerms.js"
Cohesion: 0.09
Nodes (35): assertContractAdmitsCancel(), assertContractStillAdmits(), contractLabel(), ADR-0027, notifyWorkManagers(), findLockedContract(), auditable(), findOpenSuspension() (+27 more)

### Community 14 - "client/package.json"
Cohesion: 0.06
Nodes (36): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+28 more)

### Community 15 - "@tabler/icons-react"
Cohesion: 0.08
Nodes (23): admin, icons, billing, dashboard, icons, menuItems, icons, other (+15 more)

### Community 16 - "providers.routes.js"
Cohesion: 0.07
Nodes (35): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0009 (+27 more)

### Community 17 - "WorkDetailPage.jsx"
Cohesion: 0.12
Nodes (28): getWorkManagersSelectAPI(), previewWorkEndDateAPI(), showInfo(), showObligatorios(), ContactsList(), ADR-0009, EditableList(), STATUS (+20 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthenticationRoutes.jsx"
Cohesion: 0.13
Nodes (18): client_src_assets_images_interve, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+10 more)

### Community 21 - "contracts.service.js"
Cohesion: 0.10
Nodes (47): ADR-0006, percentText(), assertContractInScope(), assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork() (+39 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.11
Nodes (43): sumMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), TERM_UNITS, termProgress() (+35 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (52): ADR-0004, ADR-0007, diffFields(), assertInScope(), PROGRESS_WARNING, getContractFormOptions(), applyManagers(), applyStages() (+44 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (21): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), row(), ctx, prismaMock, state (+13 more)

### Community 27 - "invoices.controller.test.js"
Cohesion: 0.25
Nodes (6): emit, getEffectivePermissionIds, invoicesServiceMock, ADR-0020, SCOPE, workScopeOf

### Community 28 - "showSuccess"
Cohesion: 0.14
Nodes (17): configurePolicyTypeBaseAPI(), getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), showSuccess(), Accordion(), BaseDialog(), findOption() (+9 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.05
Nodes (32): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+24 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.09
Nodes (52): ADR-0013, ADR-0021, ADR-0025, amountsDto(), approveInvoice(), assertInvoiceVisible(), assertProviderAssigned(), assertStage() (+44 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.09
Nodes (33): moneyRule(), optionalDate(), percentRule(), simpleAmountRules(), contractsRoutes, ADR-0006, ADR-0016, ADR-0017 (+25 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "react"
Cohesion: 0.13
Nodes (22): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+14 more)

### Community 37 - "session.service.js"
Cohesion: 0.15
Nodes (18): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+10 more)

### Community 38 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 39 - "server.js"
Cohesion: 0.15
Nodes (13): ref_http, node-cron, app, server, verifyStatusCatalog(), cronJobs, ADR-0017, registeredTasks (+5 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.05
Nodes (20): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+12 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (44): ADR-0003, ADR-0011, ADR-0012, ADR-0016, ADR-0018, ADR-0019, ADR-0026, ADR-0017 (+36 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "moneyText"
Cohesion: 0.12
Nodes (28): moneyText(), toMoney(), adjustableAmount(), approvalSnapshot(), detailText(), isSimpleType(), liquidationConceptOf(), positiveMoney() (+20 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "WorkScopeContext.jsx"
Cohesion: 0.14
Nodes (21): getWorkDashboardAPI(), ADR-0002, getMyWorksSelectAPI(), pickWork(), useWorkScope(), WorkScopeContext, WorkScopeProvider(), DashboardDefault (+13 more)

### Community 51 - "dashboard.service.js"
Cohesion: 0.13
Nodes (27): scopeWhere(), containsFilter(), dateRangeFilter(), filtersWhere(), idFilter(), contractsBlock(), getDashboardSummary(), invoicesBlock() (+19 more)

### Community 52 - "showError"
Cohesion: 0.13
Nodes (26): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, getProviderTypesSelectAPI, defaultConfig (+18 more)

### Community 53 - "socket.manager.js"
Cohesion: 0.15
Nodes (14): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+6 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "httpCliente.js"
Cohesion: 0.10
Nodes (30): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), getModulesAPI(), getProfilesAPI(), saveProfileAPI() (+22 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (39): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+31 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "fMoneyText"
Cohesion: 0.07
Nodes (62): fTerm(), fMoneyText(), fPercentText(), fDateOnly(), SHORT_MONTHS, Advances(), CardTitle(), ContractsByState() (+54 more)

### Community 59 - "workScopeOf"
Cohesion: 0.08
Nodes (56): getIO(), auditContext(), getEffectivePermissionIds(), workScopeOf(), configurePolicyTypeBaseController, getDashboardSummaryController, getWorkDashboardController, ADR-0002 (+48 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "withLockedTransaction"
Cohesion: 0.09
Nodes (24): AUDIT_ENTITIES, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+16 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "floatingPoint.guard.test.js"
Cohesion: 0.12
Nodes (13): ref_fs, ref_url, ALLOWED, files(), lines, SRC, catalog, expected (+5 more)

### Community 68 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 70 - "contractConcepts.service.js"
Cohesion: 0.17
Nodes (27): activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget(), configuredConcept(), createAmendment() (+19 more)

### Community 71 - "@mui/material"
Cohesion: 0.07
Nodes (36): getWorksSummaryAPI(), MainContentStyled, appDrawerWidth, drawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, SubCard() (+28 more)

### Community 88 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (111): addressTypesApi, loginAPI(), logoutAPI(), verifyTokenAPI(), constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi (+103 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.10
Nodes (26): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+18 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "SuspendDialog.jsx"
Cohesion: 0.12
Nodes (20): contractPoliciesApi, suspendContractAPI(), invoiceTransitionsApi, getReasonsSelectAPI(), DateField(), toDate(), ApproveInvoiceDialog(), ADR-0020 (+12 more)

### Community 108 - "AuthForgotPassword.jsx"
Cohesion: 0.18
Nodes (15): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), defaultColor, AnimateButton(), CustomFormControl, hasMixed(), hasNumber() (+7 more)

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.07
Nodes (41): express, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), IDEMPOTENCY_HEADER, createMasterControllers(), createMasterRouter() (+33 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "react-router-dom"
Cohesion: 0.14
Nodes (26): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), setParentOpenedMenu(), useMenuCollapse() (+18 more)

### Community 117 - "seed.volume.js"
Cohesion: 0.12
Nodes (21): addDays(), ALL_FIELDS, concept(), dbName, END_DATES, firstActive(), main(), nit() (+13 more)

### Community 118 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "workDashboard.service.test.js"
Cohesion: 0.22
Nodes (5): ALL, CONCEPTS, INVOICES, OWN, prismaMock

### Community 123 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 124 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "contractEndDateReconciliation.service.js"
Cohesion: 0.16
Nodes (18): ADR-0015, findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), contractBalanceReconciliationJob, insertNotification(), balanceViolations() (+10 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.22
Nodes (7): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`, `tbl_invoice_liquidation_details`

### Community 130 - "GeneralDashboard.jsx"
Cohesion: 0.20
Nodes (19): getDashboardSummaryAPI(), MainCard(), invoicePath(), AlertsCard(), Empty(), LatestInvoicesCard(), num, QuickAccessCard() (+11 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "ProviderDetailPage.jsx"
Cohesion: 0.08
Nodes (47): getStatusesByScopeAPI(), invoicesApi, workProvidersApi, useInvoiceViewChange(), useInvoiceViews(), useSocket(), DataList(), Figure() (+39 more)

### Community 133 - "policyTerms.js"
Cohesion: 0.15
Nodes (18): contractPolicyStatuses(), assertPolicyStatus(), CONTRACT_POLICY_STATUS, CONTRACT_POLICY_STATUS_NAMES, contractPolicyStatus(), decidingPolicy(), ADR-0002, ADR-0018 (+10 more)

### Community 134 - "writeAudit"
Cohesion: 0.07
Nodes (47): ADR-0001, bcrypt, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0027, protect(), REDACTED (+39 more)

### Community 136 - "prismaClient.js"
Cohesion: 0.11
Nodes (17): ADR-0027, adapter, describeTarget(), prisma, testConnection(), ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS (+9 more)

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 139 - "runIdempotent"
Cohesion: 0.16
Nodes (16): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent(), deleteModuleDoc() (+8 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 151 - "addressTypes.contacts.js"
Cohesion: 0.47
Nodes (5): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText()

### Community 152 - "retentionTerms.js"
Cohesion: 0.15
Nodes (21): @prisma/client, balanceChange(), contractBalances(), hasDetail(), revalidateOnApprove(), revalidateOnCancel(), SNAPSHOT_AMOUNTS, storedAmount() (+13 more)

### Community 153 - "invoiceTerms.js"
Cohesion: 0.17
Nodes (14): cancelTransitionFor(), hasContract(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS, INVOICE_TYPES, ADR-0020, NOTE_COLUMNS (+6 more)

### Community 154 - "PolicyDialog.jsx"
Cohesion: 0.22
Nodes (11): getInsurersSelectAPI, getPolicyTypesSelectAPI, ADR-0019, PercentField(), toText(), toValue(), ConfigPercent(), EMPTY (+3 more)

### Community 155 - "decimal"
Cohesion: 0.10
Nodes (34): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ratioPercent() (+26 more)

### Community 156 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 157 - "invoiceViews.js"
Cohesion: 0.16
Nodes (20): applyInvoiceViewChange(), createContractInvoice(), ANY_CONTRACT_VIEW_PERMISSION, ANY_VIEW_PERMISSION, assertNotMixed(), assertViewGranted(), CONTRACT_VIEWS, httpError() (+12 more)

### Community 159 - "constants.js"
Cohesion: 0.05
Nodes (39): contractsApi, policyTypesApi, refreshSession(), App(), AuthContext, NavigationScroll(), ContractsPage, PolicyTypePage (+31 more)

### Community 173 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 174 - "invoiceEvidence.service.js"
Cohesion: 0.25
Nodes (10): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+2 more)

### Community 175 - "withAlpha"
Cohesion: 0.16
Nodes (16): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Chip() (+8 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.31
Nodes (7): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 181 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 183 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 186 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 189 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 192 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 193 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 197 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 198 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 199 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 200 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 201 - "ProviderTypeFieldsDialog.jsx"
Cohesion: 0.31
Nodes (9): getProviderTypeFieldsAPI(), saveProviderTypeFieldsAPI(), DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006, ProviderTypeFieldsDialog(), toggle(), toRow() (+1 more)

### Community 202 - "dashboard.measure.js"
Cohesion: 0.36
Nodes (8): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain()

### Community 203 - "LogoSection/index.jsx"
Cohesion: 0.40
Nodes (4): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE

### Community 204 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 205 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 206 - "MiniDrawerStyled.jsx"
Cohesion: 0.83
Nodes (3): closedMixin(), MiniDrawerStyled, openedMixin()

## Knowledge Gaps
- **945 isolated node(s):** `ADR-0017`, `CONTRACT_TYPES`, `SIMPLE_CAPTURED`, `TABS`, `ADR-0020` (+940 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1289 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **81 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `contractPolicies.service.js`, `constants.js`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `ADR-0027` connect `prismaClient.js` to `runIdempotent`, `invoices.service.js`, `httpCliente.js`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `GeneralDashboard.jsx`, `ProviderDetailPage.jsx`, `InvoiceFormPage.jsx`, `ContractFormPage.jsx`, `WorkDataForm.jsx`, `client/package.json`, `@tabler/icons-react`, `WorkDetailPage.jsx`, `AuthenticationRoutes.jsx`, `PolicyDialog.jsx`, `showSuccess`, `constants.js`, `react`, `EasyCrop.jsx`, `withAlpha`, `WorkScopeContext.jsx`, `showError`, `httpCliente.js`, `ImageList.jsx`, `fMoneyText`, `DebouncedInput.jsx`, `NotificationSection/index.jsx`, `ContactsEditor.jsx`, `ProviderTypeFieldsDialog.jsx`, `LogoSection/index.jsx`, `MiniDrawerStyled.jsx`, `useAuth`, `SuspendDialog.jsx`, `AuthForgotPassword.jsx`, `react-router-dom`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **What connects `ADR-0017`, `CONTRACT_TYPES`, `SIMPLE_CAPTURED` to the rest of the system?**
  _945 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07764705882352942 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `users.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0784313725490196 - nodes in this community are weakly interconnected._
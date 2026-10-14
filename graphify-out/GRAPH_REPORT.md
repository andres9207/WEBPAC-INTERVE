# Graph Report - WEBPAC-INTERVE  (2026-10-14)

## Corpus Check
- 568 files · ~268,651 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3170 nodes · 8534 edges · 197 communities (114 shown, 83 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 118 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5086d566`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- constants.js
- assertInScope
- dependencies
- server/package.json
- providers.service.js
- updateInvoice
- writeAudit
- ContractFormPage.jsx
- withAlpha
- seed.demo.js
- auth.routes.js
- contracts.service.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- users.service.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- showSuccess
- dashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contractSuspensions.service.test.js
- prismaClient.js
- providers.service.test.js
- contracts.controller.test.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- contracts.service.test.js
- session.service.js
- ContractsPage.jsx
- server.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- constant.js
- scripts
- PolicyTypePage.jsx
- `tbl_invoices`
- ProviderTypePage.jsx
- providers.routes.js
- showError
- resolveDetail
- `tbl_contract_type_fields`
- httpCliente.js
- transaction.mock.js
- scripts
- InvoiceDetailPage.jsx
- workScope.service.js
- compilerOptions
- excelJS.js
- contractPolicies.service.js
- permission
- devDependencies
- floatingPoint.guard.test.js
- notifications.routes.js
- identityDocuments.service.js
- @mui/material
- `tbl_contract_status_history`
- app.routes.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- addressTypes.service.js
- `tbl_provider_type_field_versions`
- Default/index.jsx
- App.jsx
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- MainLayout/index.jsx
- workScopeOf
- handleFirebase.js
- error.middleware.js
- moneyText
- `tbl_providers`
- transaction.service.test.js
- images.js
- balanceReconciliation.service.js
- `tbl_contract_suspensions`
- providerTypeFields.service.js
- `tbl_providers`
- WorkDetailPage.jsx
- session.service.test.js
- @mui/icons-material
- updateProvider
- uniqueConstraints.constants.test.js
- invoiceTerms.js
- works.service.test.js
- contractPolicies.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- balanceReconciliation.service.test.js
- providers.controller.test.js
- ConfigContext.jsx
- decimal
- contractNotifications.service.test.js
- invoiceViews.js
- browserslist
- `tbl_contract_concepts`
- `tbl_reasons`
- serviceWorker.jsx
- invoiceEvidence.service.js
- NotificationSection/index.jsx
- `tbl_users`
- policyTypes.service.test.js
- contractEndDateReconciliation.service.test.js
- useMenuCollapse.js
- ImageList.jsx
- auth.service.test.js
- winston.config.js
- invariants.check.js
- authjwt.middleware.test.js
- EasyCrop.jsx
- InputLabel.jsx
- DebouncedInput.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 126 edges
2. `react` - 97 edges
3. `useAuth()` - 79 edges
4. `showError()` - 72 edges
5. `writeAudit()` - 59 edges
6. `withLockedTransaction()` - 56 edges
7. `showSuccess()` - 53 edges
8. `workScopeOf()` - 50 edges
9. `@tabler/icons-react` - 49 edges
10. `auditContext()` - 48 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js
- `SocketProvider()` --calls--> `refreshSession()`  [EXTRACTED]
  client/src/socket/SocketProvider.jsx → client/src/api/services/httpCliente.js
- `uploadFile()` --calls--> `newIdempotencyKey()`  [EXTRACTED]
  client/src/api/firebase/handleFirebaseDocs.js → client/src/utils/idempotency.js
- `ProfileDialog` --calls--> `newIdempotencyKey()`  [EXTRACTED]
  client/src/views/security/profiles/components/ProfileDialog.jsx → client/src/utils/idempotency.js

## Import Cycles
- None detected.

## Communities (197 total, 83 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (25): ThemeCustomization(), Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid() (+17 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "constants.js"
Cohesion: 0.09
Nodes (29): useInvoiceViews(), InvoicesPage, SocketContext, TooltipLongText(), CONTRACT_INVOICE_TYPES, INVOICE_STATE_COLORS, INVOICE_STATE_TABS, INVOICE_TYPE_OPTIONS (+21 more)

### Community 3 - "assertInScope"
Cohesion: 0.19
Nodes (21): assertInScope(), getContractFormOptions(), assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope(), assertTypeIds(), assertWorkAssignable(), assignmentText() (+13 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.11
Nodes (27): ASSIGNMENT_IDEMPOTENCY, ASSIGNMENT_LIST_SELECT, AUDITED_HEADER, checkIdentification(), CLASSIFICATIONS_SELECT, contactsHelper, EXISTING_SELECT, getProvider() (+19 more)

### Community 7 - "updateInvoice"
Cohesion: 0.24
Nodes (20): approveInvoice(), assertInvoiceVisible(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditable(), cancelInvoice() (+12 more)

### Community 8 - "writeAudit"
Cohesion: 0.05
Nodes (62): bcrypt, ref_crypto, auditMisuse(), buildRows(), ADR-0027, protect(), REDACTED, SENSITIVE_FIELDS (+54 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (49): contractConceptsApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+41 more)

### Community 10 - "withAlpha"
Cohesion: 0.14
Nodes (17): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Chip() (+9 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.07
Nodes (30): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+22 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "contracts.service.js"
Cohesion: 0.05
Nodes (60): ADR-0002, ADR-0015, sumMoney(), providerViewOf(), daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation() (+52 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (33): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+25 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, icons, other, icons (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.11
Nodes (22): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+14 more)

### Community 17 - "users.service.js"
Cohesion: 0.05
Nodes (63): ADR-0003, ADR-0004, ADR-0027, DELETED_STATUS, AUDIT_ENTITIES, AUDIT_OPERATIONS, canonical(), EXCLUDED_FROM_FINGERPRINT (+55 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.10
Nodes (19): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.07
Nodes (35): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), client_src_assets_images_interve, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage (+27 more)

### Community 21 - "showSuccess"
Cohesion: 0.11
Nodes (34): getStatusesByScopeAPI(), deleteProfileAPI(), getModulesAPI(), paginationProfilesAPI(), saveProfileAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams() (+26 more)

### Community 22 - "dashboard.service.js"
Cohesion: 0.09
Nodes (38): scopeWhere(), contractsBlock(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002, notDeleted, policiesBlock() (+30 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.07
Nodes (61): ADR-0007, containsFilter(), filtersWhere(), idFilter(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING (+53 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (21): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), row(), ctx, prismaMock, state (+13 more)

### Community 27 - "prismaClient.js"
Cohesion: 0.15
Nodes (13): adapter, ADR-0013, ADR-0027, prisma, ACTIVE_STATUS, INACTIVE_STATUS, getEffectivePermissionIds(), getMenu() (+5 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.12
Nodes (14): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+6 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.05
Nodes (33): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+25 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.08
Nodes (35): ADR-0021, ADR-0023, dateRangeFilter(), amountsDto(), CANCEL_ACTIONS, countByState(), DETAIL_AUDITED, detailChanges() (+27 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.07
Nodes (55): auditContext(), moneyRule(), optionalDate(), percentRule(), ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS, CONTRACT_FIELDS (+47 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 37 - "session.service.js"
Cohesion: 0.08
Nodes (35): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+27 more)

### Community 38 - "ContractsPage.jsx"
Cohesion: 0.10
Nodes (30): getMyWorksSelectAPI(), pickWork(), useWorkFilterField(), useWorkScope(), WorkScopeContext, WorkScopeProvider(), ADR-0002, useLinkedFilters() (+22 more)

### Community 39 - "server.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+8 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (15): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+7 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.07
Nodes (35): ADR-0011, ADR-0012, ADR-0016, ADR-0018, ADR-0019, ADR-0026, ADR-0017, ADR-0020 (+27 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 45 - "constant.js"
Cohesion: 0.33
Nodes (6): MainContentStyled, closedMixin(), MiniDrawerStyled, openedMixin(), appDrawerWidth, drawerWidth

### Community 46 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, build, cron:run, db:check-invariants, db:seed, db:seed:demo, dev, pm2:logs (+7 more)

### Community 48 - "PolicyTypePage.jsx"
Cohesion: 0.15
Nodes (15): configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, PolicyTypePage, POLICY_BASE_OPTIONS, policyBaseName(), ConfigureBaseDialog() (+7 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "ProviderTypePage.jsx"
Cohesion: 0.13
Nodes (19): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), useInvoiceViewChange(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, providerInvoiceViewName(), DATA_TYPE_NAMES (+11 more)

### Community 51 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 52 - "showError"
Cohesion: 0.06
Nodes (77): contractPoliciesApi, suspendContractAPI(), getIdentityDocumentsSelectAPI, getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, invoiceTransitionsApi (+69 more)

### Community 53 - "resolveDetail"
Cohesion: 0.24
Nodes (12): toMoney(), adjustableAmount(), balanceChange(), contractBalances(), hasDetail(), liquidationConceptOf(), positiveMoney(), resolveDetail() (+4 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "httpCliente.js"
Cohesion: 0.07
Nodes (26): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), getPermissionsCatalogAPI(), updatePasswordAPI(), genericRequest (+18 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (29): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+21 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "InvoiceDetailPage.jsx"
Cohesion: 0.07
Nodes (49): getContractAdvanceAPI(), DataList(), Figure(), Pending(), MoneyField(), RouteDialog(), fTerm(), fMoneyText() (+41 more)

### Community 59 - "workScope.service.js"
Cohesion: 0.09
Nodes (31): hasEffectivePermission(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope() (+23 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "contractPolicies.service.js"
Cohesion: 0.07
Nodes (89): diffFields(), newOperationId(), percentText(), toPercent(), dateOnlyText(), assertContractAdmitsCancel(), assertContractStillAdmits(), createContractInvoice() (+81 more)

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

### Community 70 - "identityDocuments.service.js"
Cohesion: 0.15
Nodes (14): nit(), DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, nitCheckDigit() (+6 more)

### Community 71 - "@mui/material"
Cohesion: 0.08
Nodes (34): getAddressTypesSelectAPI, getContractTypesSelectAPI, getWorksSummaryAPI(), ACTION_TONES, ActionButton(), toneOf(), ConfirmDialog(), channelsOf() (+26 more)

### Community 88 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (79): addressTypesApi, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, identityDocumentsApi, getInsurersSelectAPI, insurersApi, reasonsApi (+71 more)

### Community 100 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "Default/index.jsx"
Cohesion: 0.10
Nodes (32): getDashboardSummaryAPI(), ADR-0002, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), Avatar(), DashboardCards() (+24 more)

### Community 108 - "App.jsx"
Cohesion: 0.19
Nodes (11): loginAPI(), logoutAPI(), verifyTokenAPI(), App(), AuthContext, AuthProvider(), getStoredUser(), NavigationScroll() (+3 more)

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.06
Nodes (46): express, getIO(), verifyToken(), requirePermission(), validate(), isSessionActive(), createMasterControllers(), createMasterRouter() (+38 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "MainLayout/index.jsx"
Cohesion: 0.17
Nodes (21): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), getMenuAPI(), useConfig(), Footer(), Header() (+13 more)

### Community 117 - "workScopeOf"
Cohesion: 0.12
Nodes (29): workScopeOf(), accessOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, getInvoiceEvidenceController, getInvoiceFormOptionsController (+21 more)

### Community 118 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "moneyText"
Cohesion: 0.19
Nodes (17): moneyText(), approvalSnapshot(), getContractAdvance(), snapshotText(), assertLiquidationCancellable(), assertRefundFits(), assertRetentionFits(), defaultRetention() (+9 more)

### Community 123 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 124 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.21
Nodes (13): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), contractBalanceReconciliationJob, insertNotification(), balanceViolations(), CHECKS (+5 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.22
Nodes (7): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`, `tbl_invoice_liquidation_details`

### Community 130 - "providerTypeFields.service.js"
Cohesion: 0.11
Nodes (30): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+22 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "WorkDetailPage.jsx"
Cohesion: 0.07
Nodes (50): getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, useEndDatePreview(), SubCard(), ContactsList(), ADR-0009, EditableList() (+42 more)

### Community 133 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 134 - "@mui/icons-material"
Cohesion: 0.33
Nodes (5): menuItems, DatePicker(), Breadcrumbs(), BTitle(), @mui/icons-material

### Community 136 - "updateProvider"
Cohesion: 0.31
Nodes (11): applyProviderTypes(), assertIdentification(), assertProviderTypes(), createProvider(), duplicateError(), findByIdentity(), findTypeIds(), masterLocksOf() (+3 more)

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 139 - "invoiceTerms.js"
Cohesion: 0.16
Nodes (18): isContractCreate(), isCreate(), isSimpleCreate(), assertTransition(), cancelTransitionFor(), hasContract(), historyRow(), httpError() (+10 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 151 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 152 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 153 - "providers.controller.test.js"
Cohesion: 0.29
Nodes (5): emit, getEffectivePermissionIds, SCOPE, serviceMock, workScopeOf

### Community 154 - "ConfigContext.jsx"
Cohesion: 0.25
Nodes (7): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage()

### Community 155 - "decimal"
Cohesion: 0.11
Nodes (33): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE (+25 more)

### Community 156 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 157 - "invoiceViews.js"
Cohesion: 0.15
Nodes (23): applyInvoiceViewChange(), ADR-0010, providerTypesConfig, providerTypesService, ANY_CONTRACT_VIEW_PERMISSION, ANY_VIEW_PERMISSION, applyProviderViewChanges(), assertNotMixed() (+15 more)

### Community 159 - "browserslist"
Cohesion: 0.27
Nodes (6): browserslist, development, production, volta, node, yarn

### Community 173 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 174 - "invoiceEvidence.service.js"
Cohesion: 0.21
Nodes (12): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+4 more)

### Community 175 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.39
Nodes (6): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 179 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

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

## Knowledge Gaps
- **914 isolated node(s):** `instance`, `refreshClient`, `NO_REFRESH_URLS`, `RETRY_503_HINT`, `axios` (+909 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1253 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **83 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `ADR-0027` connect `users.service.js` to `showError`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `constants.js`, `WorkDetailPage.jsx`, `@mui/icons-material`, `ContractFormPage.jsx`, `withAlpha`, `client/package.json`, `AuthForgotPassword.jsx`, `showSuccess`, `ConfigContext.jsx`, `ContractsPage.jsx`, `constant.js`, `NotificationSection/index.jsx`, `PolicyTypePage.jsx`, `ProviderTypePage.jsx`, `showError`, `httpCliente.js`, `ImageList.jsx`, `InvoiceDetailPage.jsx`, `EasyCrop.jsx`, `InputLabel.jsx`, `DebouncedInput.jsx`, `useAuth`, `Default/index.jsx`, `MainLayout/index.jsx`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **What connects `instance`, `refreshClient`, `NO_REFRESH_URLS` to the rest of the system?**
  _914 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08078231292517007 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `constants.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08819345661450925 - nodes in this community are weakly interconnected._
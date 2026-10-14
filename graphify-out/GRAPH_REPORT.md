# Graph Report - WEBPAC-INTERVE  (2026-10-14)

## Corpus Check
- 565 files · ~266,860 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3151 nodes · 8488 edges · 193 communities (113 shown, 80 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 117 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `67cb14f0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- contractPolicies.service.js
- InvoiceFormPage.jsx
- dependencies
- server/package.json
- providers.service.js
- WorkDetailPage.jsx
- auth.service.js
- ContractFormPage.jsx
- withAlpha
- seed.demo.js
- auth.routes.js
- contracts.service.js
- client/package.json
- menu-items/index.js
- providers.routes.js
- users.service.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- UsersPage.jsx
- dateOnlyText
- `tbl_users`
- app.js
- works.service.js
- contractSuspensions.service.test.js
- contractSuspensions.service.js
- providers.service.test.js
- contracts.controller.test.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- react
- session.service.js
- main.routes.js
- server.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- MainLayout/index.jsx
- scripts
- PolicyTypePage.jsx
- `tbl_invoices`
- ProviderDetailPage.jsx
- workScopeOf
- showError
- @mui/material
- `tbl_contract_type_fields`
- DocumentManagement.jsx
- transaction.mock.js
- scripts
- InvoiceDetailPage.jsx
- workScope.service.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- floatingPoint.guard.test.js
- notifications.routes.js
- identityDocuments.service.js
- ContactsEditor.jsx
- `tbl_contract_status_history`
- app.routes.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- idempotency.service.js
- `tbl_provider_type_field_versions`
- constants.js
- App.jsx
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- useGetMenuMaster
- invoices.routes.js
- socket.js
- error.middleware.js
- moneyText
- `tbl_providers`
- transaction.service.test.js
- images.js
- balanceReconciliation.service.js
- `tbl_contract_suspensions`
- providerTypeFields.service.js
- `tbl_providers`
- handleFirebase.js
- session.service.test.js
- contractConcepts.service.test.js
- transaction.service.js
- uniqueConstraints.constants.test.js
- invoiceTerms.js
- works.service.test.js
- contractPolicies.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- balanceReconciliation.service.test.js
- dashboard.service.test.js
- themes/index.jsx
- decimal
- contractNotifications.service.test.js
- invoiceViews.js
- providers.controller.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- volta
- policyTypes.service.test.js
- NotificationSection/index.jsx
- `tbl_users`
- users.service.test.js
- contractEndDateReconciliation.service.test.js
- InputLabel.jsx
- useConfig
- invariants.check.js
- authjwt.middleware.test.js
- browserslist
- EasyCrop.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 126 edges
2. `react` - 97 edges
3. `useAuth()` - 79 edges
4. `showError()` - 72 edges
5. `writeAudit()` - 59 edges
6. `withLockedTransaction()` - 56 edges
7. `showSuccess()` - 53 edges
8. `workScopeOf()` - 49 edges
9. `@tabler/icons-react` - 49 edges
10. `auditContext()` - 48 edges

## Surprising Connections (you probably didn't know these)
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `ConceptDialog()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/views/work/contracts/components/ConceptDialog.jsx → client/src/contexts/authContext.jsx

## Import Cycles
- None detected.

## Communities (193 total, 80 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "contractPolicies.service.js"
Cohesion: 0.07
Nodes (57): ADR-0001, auditMisuse(), buildRows(), diffFields(), ADR-0027, newOperationId(), protect(), SENSITIVE_FIELDS (+49 more)

### Community 3 - "InvoiceFormPage.jsx"
Cohesion: 0.09
Nodes (36): getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, getMyWorksSelectAPI(), genericRequest, instance (+28 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.04
Nodes (43): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+35 more)

### Community 6 - "providers.service.js"
Cohesion: 0.08
Nodes (61): assertInScope(), inScope(), identificationError(), assertIdentification(), getContractFormOptions(), applyProviderTypes(), assertAssignmentDate(), assertIdentification() (+53 more)

### Community 7 - "WorkDetailPage.jsx"
Cohesion: 0.10
Nodes (28): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, supervisionTypesApi, getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, createMasterApi() (+20 more)

### Community 8 - "auth.service.js"
Cohesion: 0.10
Nodes (28): bcrypt, ref_crypto, REDACTED, backoff(), runTransaction(), withTransaction(), comparePassword(), hashPassword() (+20 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (44): contractConceptsApi, contractPoliciesApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016 (+36 more)

### Community 10 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.08
Nodes (28): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+20 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "contracts.service.js"
Cohesion: 0.06
Nodes (87): ADR-0002, percentText(), sumMoney(), FIELD_GROUPS, typeAppliesAiu(), withContractAiu(), assertContractAdmitsCancel(), assertContractStillAdmits() (+79 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (33): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+25 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.08
Nodes (18): admin, icons, billing, dashboard, icons, menuItems, icons, other (+10 more)

### Community 16 - "providers.routes.js"
Cohesion: 0.08
Nodes (33): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0009 (+25 more)

### Community 17 - "users.service.js"
Cohesion: 0.05
Nodes (65): ADR-0013, @prisma/adapter-mariadb, adapter, ADR-0013, ADR-0027, prisma, ACTIVE_STATUS, DELETED_STATUS (+57 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.10
Nodes (19): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.06
Nodes (41): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), client_src_assets_images_interve (+33 more)

### Community 21 - "UsersPage.jsx"
Cohesion: 0.13
Nodes (25): getStatusesByScopeAPI(), deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS (+17 more)

### Community 22 - "dateOnlyText"
Cohesion: 0.09
Nodes (48): scopeWhere(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS (+40 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.10
Nodes (43): ADR-0004, ADR-0007, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted(), assertHeader() (+35 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.06
Nodes (24): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), row(), ctx, prismaMock, state (+16 more)

### Community 27 - "contractSuspensions.service.js"
Cohesion: 0.07
Nodes (44): reasonsRoutes, ADR-0017, REASON_SCOPES, reasonsConfig, reasonsService, daysBetween(), discrepancyLine(), findEndDateDiscrepancies() (+36 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.12
Nodes (14): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+6 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.05
Nodes (33): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+25 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.08
Nodes (53): ADR-0023, ADR-0025, amountsDto(), approveInvoice(), assertInvoiceVisible(), assertProviderAssigned(), assertStage(), assertUniqueNumber() (+45 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.09
Nodes (32): moneyRule(), optionalDate(), percentRule(), contractsRoutes, ADR-0006, ADR-0016, ADR-0017, ADR-0018 (+24 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "react"
Cohesion: 0.12
Nodes (13): getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), ProfileSection(), Accordion(), findOption(), flattenOptions(), GenericFormSection (+5 more)

### Community 37 - "session.service.js"
Cohesion: 0.11
Nodes (25): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+17 more)

### Community 38 - "main.routes.js"
Cohesion: 0.13
Nodes (11): express, getDashboardSummaryController, ADR-0002, dashboardRoutes, ADR-0002, mainRoutes, usersRoutes, deleteUserSchema (+3 more)

### Community 39 - "server.js"
Cohesion: 0.11
Nodes (17): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+9 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.05
Nodes (21): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+13 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.07
Nodes (35): ADR-0011, ADR-0012, ADR-0016, ADR-0018, ADR-0019, ADR-0020, ADR-0026, ADR-0017 (+27 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "MainLayout/index.jsx"
Cohesion: 0.20
Nodes (14): handlerDrawerOpen(), Footer(), Header(), WorkSection(), MainLayout(), MainLayoutContent(), ScopedOutlet(), LogoSection() (+6 more)

### Community 46 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, build, cron:run, db:check-invariants, db:seed, db:seed:demo, dev, pm2:logs (+7 more)

### Community 48 - "PolicyTypePage.jsx"
Cohesion: 0.17
Nodes (10): ADR-0019, policyTypesApi, PolicyTypePage, POLICY_BASE_OPTIONS, policyBaseName(), BASE_CHOICES, COLUMNS, FILTER_FIELDS (+2 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "ProviderDetailPage.jsx"
Cohesion: 0.07
Nodes (41): getProviderTypeFieldsAPI(), getProviderTypesSelectAPI, providerTypesApi, saveProviderTypeFieldsAPI(), useInvoiceViewChange(), ProviderTypePage, ContactsList(), ADR-0009 (+33 more)

### Community 51 - "workScopeOf"
Cohesion: 0.11
Nodes (42): auditContext(), getEffectivePermissionIds(), workScopeOf(), ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS, CONTRACT_FIELDS, createAmendmentController (+34 more)

### Community 52 - "showError"
Cohesion: 0.07
Nodes (71): suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI(), getModulesAPI(), getProfilesAPI(), saveProfileAPI(), checkProviderIdentificationAPI() (+63 more)

### Community 53 - "@mui/material"
Cohesion: 0.09
Nodes (34): getWorksSummaryAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard(), ACTION_TONES (+26 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "DocumentManagement.jsx"
Cohesion: 0.32
Nodes (11): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+3 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.07
Nodes (25): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+17 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "InvoiceDetailPage.jsx"
Cohesion: 0.07
Nodes (50): getInsurersSelectAPI, getContractAdvanceAPI(), getPolicyTypesSelectAPI, DataList(), Figure(), Pending(), LastModifiedCell(), MoneyField() (+42 more)

### Community 59 - "workScope.service.js"
Cohesion: 0.09
Nodes (30): hasEffectivePermission(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), managedWhere(), resolveWorkScope(), scopeOf() (+22 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

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
Cohesion: 0.10
Nodes (21): defineMaster(), defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig (+13 more)

### Community 71 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 88 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (100): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, reasonsApi, useAuth(), useWorkFilterField() (+92 more)

### Community 100 - "idempotency.service.js"
Cohesion: 0.14
Nodes (16): ADR-0027, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), IDEMPOTENCY_HEADER, idempotencyMisuse(), keyReused(), requestFingerprint() (+8 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "constants.js"
Cohesion: 0.06
Nodes (50): getDashboardSummaryAPI(), ADR-0002, useInvoiceViews(), InvoicesPage, SocketContext, TooltipLongText(), CONTRACT_INVOICE_TYPES, INVOICE_STATE_COLORS (+42 more)

### Community 108 - "App.jsx"
Cohesion: 0.29
Nodes (7): refreshSession(), App(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.09
Nodes (30): getIO(), verifyToken(), requirePermission(), validate(), createMasterControllers(), createMasterRouter(), configurePolicyTypeBaseController, ADR-0019 (+22 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "useGetMenuMaster"
Cohesion: 0.23
Nodes (12): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), MenuList() (+4 more)

### Community 117 - "invoices.routes.js"
Cohesion: 0.12
Nodes (26): accessOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, getInvoiceFormOptionsController, grantedOf(), INVOICE_FIELDS (+18 more)

### Community 118 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "moneyText"
Cohesion: 0.13
Nodes (28): moneyText(), ratioText(), advanceBalances(), appliedPct(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits(), balancesDto() (+20 more)

### Community 123 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 124 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.24
Nodes (12): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS, findBalanceViolations() (+4 more)

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.22
Nodes (7): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`, `tbl_invoice_liquidation_details`

### Community 130 - "providerTypeFields.service.js"
Cohesion: 0.13
Nodes (26): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+18 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 133 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 134 - "contractConcepts.service.test.js"
Cohesion: 0.17
Nodes (6): ctx, ADR-0016, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 136 - "transaction.service.js"
Cohesion: 0.27
Nodes (9): buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE, MAX_DEADLOCK_RETRIES, toSortedIds() (+1 more)

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 139 - "invoiceTerms.js"
Cohesion: 0.14
Nodes (19): isContractCreate(), isCreate(), isSimpleCreate(), assertTransition(), hasContract(), historyRow(), httpError(), INVOICE_STATES (+11 more)

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

### Community 153 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 154 - "themes/index.jsx"
Cohesion: 0.21
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 155 - "decimal"
Cohesion: 0.11
Nodes (33): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE (+25 more)

### Community 156 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 157 - "invoiceViews.js"
Cohesion: 0.14
Nodes (25): applyInvoiceViewChange(), ADR-0010, providerTypesConfig, providerTypesService, ANY_CONTRACT_VIEW_PERMISSION, ANY_VIEW_PERMISSION, applyProviderViewChanges(), assertNotMixed() (+17 more)

### Community 159 - "providers.controller.test.js"
Cohesion: 0.29
Nodes (5): emit, getEffectivePermissionIds, SCOPE, serviceMock, workScopeOf

### Community 173 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 174 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 175 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.39
Nodes (6): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 179 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 183 - "useConfig"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 194 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

## Knowledge Gaps
- **910 isolated node(s):** `TITLES`, `ADR-0016`, `ADR-0027`, `INVOICE_AUDITED`, `LOCKED_SELECT` (+905 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1245 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **80 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.170) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `InvoiceFormPage.jsx`, `server/package.json`, `WorkDetailPage.jsx`, `ContractFormPage.jsx`, `withAlpha`, `client/package.json`, `menu-items/index.js`, `AuthForgotPassword.jsx`, `UsersPage.jsx`, `themes/index.jsx`, `react`, `MainLayout/index.jsx`, `NotificationSection/index.jsx`, `ProviderDetailPage.jsx`, `showError`, `InputLabel.jsx`, `DocumentManagement.jsx`, `useConfig`, `InvoiceDetailPage.jsx`, `EasyCrop.jsx`, `ContactsEditor.jsx`, `useAuth`, `constants.js`, `useGetMenuMaster`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `InvoiceFormPage.jsx`, `server/package.json`, `WorkDetailPage.jsx`, `ContractFormPage.jsx`, `client/package.json`, `menu-items/index.js`, `AuthForgotPassword.jsx`, `UsersPage.jsx`, `themes/index.jsx`, `src/index.jsx`, `MainLayout/index.jsx`, `NotificationSection/index.jsx`, `PolicyTypePage.jsx`, `ProviderDetailPage.jsx`, `showError`, `@mui/material`, `useConfig`, `DocumentManagement.jsx`, `InvoiceDetailPage.jsx`, `EasyCrop.jsx`, `ContactsEditor.jsx`, `useAuth`, `constants.js`, `useGetMenuMaster`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **What connects `TITLES`, `ADR-0016`, `ADR-0027` to the rest of the system?**
  _910 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `contractPolicies.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06597222222222222 - nodes in this community are weakly interconnected._
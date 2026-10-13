# Graph Report - WEBPAC-INTERVE  (2026-10-13)

## Corpus Check
- 550 files · ~253,431 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3056 nodes · 8229 edges · 188 communities (111 shown, 77 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 116 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fc51911e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- WorkFormPage.jsx
- @tabler/icons-react
- dependencies
- server/package.json
- providers.service.js
- runIdempotent
- writeAudit
- contracts.service.js
- withAlpha
- AuthenticationRoutes.jsx
- auditContext
- react
- client/package.json
- menu-items/index.js
- validation.utils.js
- users.service.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- workScopeOf
- dashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contractFields.test.js
- InvoiceFormPage.jsx
- providers.service.test.js
- invoices.controller.test.js
- invoices.service.js
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- handleFirebase.js
- session.service.js
- @mui/material
- server.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- Sidebar/index.jsx
- scripts
- contractEndDateReconciliation.service.test.js
- `tbl_invoices`
- ProviderTypeFieldsDialog.jsx
- app.routes.js
- ContractFormPage.jsx
- providerTypeFields.service.js
- `tbl_contract_type_fields`
- showError
- transaction.mock.js
- scripts
- InvoiceDetailPage.jsx
- workScope.service.js
- compilerOptions
- excelJS.js
- serviceWorker.jsx
- permission
- devDependencies
- status.service.test.js
- notifications.routes.js
- invoiceTerms.js
- react-router-dom
- `tbl_contract_status_history`
- masterRouter.utils.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- getIO
- `tbl_provider_type_field_versions`
- DocumentManagement.jsx
- contractPolicies.service.js
- PoliciesTab.jsx
- `tbl_works`
- `tbl_policies`
- MainLayout/index.jsx
- invoices.routes.js
- WorkScopeContext.jsx
- error.middleware.js
- addressTypes.service.js
- `tbl_providers`
- transaction.service.test.js
- images.js
- auth.service.test.js
- `tbl_contract_suspensions`
- contracts.controller.test.js
- `tbl_providers`
- decimal
- contracts.service.test.js
- contractSuspensions.service.test.js
- winston.config.js
- uniqueConstraints.constants.test.js
- master.service.test.js
- works.service.test.js
- contractFields.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- themes/index.jsx
- browserslist
- contractPolicies.service.test.js
- DebouncedInput.jsx
- contractConcepts.service.test.js
- constants.js
- NotificationSection/index.jsx
- App.jsx
- authjwt.middleware.test.js
- `tbl_contract_concepts`
- `tbl_reasons`
- AppBar.jsx
- floatingPoint.guard.test.js
- uniqueConstraints.constants.js
- `tbl_users`
- EasyCrop.jsx
- session.service.test.js
- InputLabel.jsx
- volta
- useConfig
- `tbl_invoice_liquidation_details`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 125 edges
2. `react` - 96 edges
3. `useAuth()` - 81 edges
4. `showError()` - 76 edges
5. `showSuccess()` - 57 edges
6. `writeAudit()` - 57 edges
7. `withLockedTransaction()` - 56 edges
8. `auditContext()` - 48 edges
9. `workScopeOf()` - 48 edges
10. `@tabler/icons-react` - 47 edges

## Surprising Connections (you probably didn't know these)
- `getContractFormOptions()` --calls--> `assertInScope()`  [EXTRACTED]
  server/src/modules/work/contracts/contracts.service.js → server/src/common/services/workScope.service.js
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `MainLayoutContent()` --calls--> `MainContentStyled`  [EXTRACTED]
  client/src/layout/MainLayout/index.jsx → client/src/layout/MainLayout/MainContentStyled.js

## Import Cycles
- None detected.

## Communities (188 total, 77 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "WorkFormPage.jsx"
Cohesion: 0.09
Nodes (36): addressTypesApi, getAddressTypesSelectAPI, getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi (+28 more)

### Community 3 - "@tabler/icons-react"
Cohesion: 0.16
Nodes (22): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+14 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (33): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+25 more)

### Community 6 - "providers.service.js"
Cohesion: 0.07
Nodes (67): assertInScope(), containsFilter(), dateRangeFilter(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS, paginate() (+59 more)

### Community 7 - "runIdempotent"
Cohesion: 0.15
Nodes (18): canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), isUniqueViolation(), ADR-0027, keyReused(), requestFingerprint() (+10 more)

### Community 8 - "writeAudit"
Cohesion: 0.05
Nodes (69): bcrypt, ref_crypto, AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0027 (+61 more)

### Community 9 - "contracts.service.js"
Cohesion: 0.05
Nodes (112): ADR-0021, moneyText(), sumMoney(), dateOnlyText(), FIELD_GROUPS, typeAppliesAiu(), withContractAiu(), assertContractStillAdmits() (+104 more)

### Community 10 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 11 - "AuthenticationRoutes.jsx"
Cohesion: 0.18
Nodes (11): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router (+3 more)

### Community 12 - "auditContext"
Cohesion: 0.11
Nodes (27): auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+19 more)

### Community 13 - "react"
Cohesion: 0.08
Nodes (19): getPermissionsCatalogAPI(), getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient (+11 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (34): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+26 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.08
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.11
Nodes (21): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+13 more)

### Community 17 - "users.service.js"
Cohesion: 0.05
Nodes (56): ADR-0004, ADR-0013, adapter, ADR-0013, ADR-0027, prisma, ACTIVE_STATUS, DELETED_STATUS (+48 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.10
Nodes (19): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.17
Nodes (18): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider(), getStoredUser() (+10 more)

### Community 21 - "workScopeOf"
Cohesion: 0.08
Nodes (46): workScopeOf(), accessOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, grantedOf(), INVOICE_FIELDS (+38 more)

### Community 22 - "dashboard.service.js"
Cohesion: 0.07
Nodes (51): ADR-0022, scopeWhere(), CONTRACT_INVOICE_VIEWS, contractsBlock(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002 (+43 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (55): ADR-0007, addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress() (+47 more)

### Community 26 - "contractFields.test.js"
Cohesion: 0.16
Nodes (10): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+2 more)

### Community 27 - "InvoiceFormPage.jsx"
Cohesion: 0.25
Nodes (15): getInvoiceContractsSelectAPI(), getInvoiceProvidersSelectAPI(), amountsPayload(), DOCUMENT_FIELDS, EMPTY_FORM, hasAmounts(), InvoiceFormPage(), isSimple() (+7 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.13
Nodes (13): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+5 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.10
Nodes (50): ADR-0025, isBlank(), toMoney(), adjustableAmount(), approveInvoice(), assertInvoiceVisible(), assertProviderActive(), assertUniqueNumber() (+42 more)

### Community 31 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.06
Nodes (56): getEffectivePermissionIds(), moneyRule(), optionalDate(), percentRule(), getDashboardSummaryController, ADR-0002, ACT_FIELDS, cancelPolicyController (+48 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.14
Nodes (11): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+3 more)

### Community 36 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 37 - "session.service.js"
Cohesion: 0.07
Nodes (41): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+33 more)

### Community 38 - "@mui/material"
Cohesion: 0.07
Nodes (49): getDashboardSummaryAPI(), ADR-0002, getWorksSummaryAPI(), gridSpacing, CardSecondaryAction(), headerStyle, MainCard(), SubCard() (+41 more)

### Community 39 - "server.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+8 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.07
Nodes (12): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, ctx (+4 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.04
Nodes (54): ADR-0011, ADR-0012, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020, ADR-0024 (+46 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.16
Nodes (12): client_src_assets_scss_style, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals(), @fontsource/inter (+4 more)

### Community 45 - "Sidebar/index.jsx"
Cohesion: 0.20
Nodes (11): LogoSection(), MainContentStyled, Sidebar(), closedMixin(), MiniDrawerStyled, openedMixin(), appDrawerWidth, drawerWidth (+3 more)

### Community 46 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, cron:run, db:seed, db:seed:demo, dev, pm2:logs, pm2:restart (+6 more)

### Community 48 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "ProviderTypeFieldsDialog.jsx"
Cohesion: 0.16
Nodes (15): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006, ProviderTypeFieldsDialog() (+7 more)

### Community 51 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 52 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (46): contractConceptsApi, contractPoliciesApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+38 more)

### Community 53 - "providerTypeFields.service.js"
Cohesion: 0.27
Nodes (15): mergeTypeRows(), resolveFields(), CATALOG_SELECT, currentRows(), desiredRows(), findType(), getProviderTypeFields(), httpError() (+7 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "showError"
Cohesion: 0.07
Nodes (74): suspendContractAPI(), getIdentityDocumentsSelectAPI, invoiceTransitionsApi, ADR-0017, getModulesAPI(), getProfilesAPI(), saveProfileAPI(), checkProviderIdentificationAPI() (+66 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.07
Nodes (25): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ADR-0004, prismaMock, ADR-0006, prismaMock (+17 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "InvoiceDetailPage.jsx"
Cohesion: 0.07
Nodes (47): getStatusesByScopeAPI(), contractsApi, invoicesApi, useInvoiceViews(), InvoiceDetailPage, WorkDetailPage, ContactsList(), ADR-0009 (+39 more)

### Community 59 - "workScope.service.js"
Cohesion: 0.08
Nodes (35): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+27 more)

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

### Community 66 - "status.service.test.js"
Cohesion: 0.17
Nodes (9): ref_fs, ref_url, catalog, expected, prismaMock, controllers, EXEMPT, handlers (+1 more)

### Community 68 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 70 - "invoiceTerms.js"
Cohesion: 0.18
Nodes (13): cancelTransitionFor(), INVOICE_STATES, INVOICE_TRANSITIONS, INVOICE_TYPES, ADR-0020, NOTE_COLUMNS, STATE_ALLOWS, STATE_NAMES (+5 more)

### Community 71 - "react-router-dom"
Cohesion: 0.23
Nodes (13): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), MenuList() (+5 more)

### Community 88 - "masterRouter.utils.js"
Cohesion: 0.10
Nodes (27): express, requirePermission(), validate(), hasEffectivePermission(), createMasterControllers(), createMasterRouter(), identityDocumentsRoutes, ADR-0019 (+19 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (101): constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, supervisionTypesApi, useAuth(), useWorkFilterField(), ADR-0002 (+93 more)

### Community 100 - "getIO"
Cohesion: 0.13
Nodes (16): getIO(), configurePolicyTypeBaseController, FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, deleteProfileController(), getModulesController() (+8 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "DocumentManagement.jsx"
Cohesion: 0.32
Nodes (11): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+3 more)

### Community 108 - "contractPolicies.service.js"
Cohesion: 0.05
Nodes (66): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+58 more)

### Community 112 - "PoliciesTab.jsx"
Cohesion: 0.11
Nodes (34): getInsurersSelectAPI, getContractAdvanceAPI(), getPolicyTypesSelectAPI, MoneyField(), fMoneyText(), fPercentText(), moneyInputText(), parseMoneyInput() (+26 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "MainLayout/index.jsx"
Cohesion: 0.28
Nodes (10): handlerDrawerOpen(), useWorkScope(), Footer(), Header(), WorkSection(), MainLayout(), MainLayoutContent(), ScopedOutlet() (+2 more)

### Community 117 - "invoices.routes.js"
Cohesion: 0.16
Nodes (16): invoicesRoutes, ADR-0017, approveInvoiceSchema, cancelInvoiceSchema, getContractAdvanceSchema, getInvoiceSchema, isContractCreate(), isCreate() (+8 more)

### Community 118 - "WorkScopeContext.jsx"
Cohesion: 0.29
Nodes (11): getMyWorksSelectAPI(), pickWork(), WorkScopeContext, WorkScopeProvider(), activeWorkHeader(), ALL_WORKS, readStoredWork(), setActiveWorkHeader() (+3 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.27
Nodes (14): concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027, LOCK_WAIT_TIMEOUT, PRISMA_ERRORS, driverCause() (+6 more)

### Community 120 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 123 - "transaction.service.test.js"
Cohesion: 0.26
Nodes (8): ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 124 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 125 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 129 - "`tbl_contract_suspensions`"
Cohesion: 0.25
Nodes (6): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_contracts`

### Community 130 - "contracts.controller.test.js"
Cohesion: 0.17
Nodes (10): conceptsServiceMock, contractsServiceMock, emit, getEffectivePermissionIds, ADR-0015, ADR-0016, policiesServiceMock, SCOPE (+2 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "decimal"
Cohesion: 0.09
Nodes (49): @prisma/client, decimal(), HUNDRED, MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE, ratioPercent() (+41 more)

### Community 133 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 134 - "contractSuspensions.service.test.js"
Cohesion: 0.17
Nodes (5): ctx, initial, ADR-0017, prismaMock, state

### Community 136 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 139 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "contractFields.js"
Cohesion: 0.29
Nodes (9): AIU_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, ADR-0026 (+1 more)

### Community 151 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 152 - "themes/index.jsx"
Cohesion: 0.21
Nodes (10): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette() (+2 more)

### Community 153 - "browserslist"
Cohesion: 0.27
Nodes (6): browserslist, development, production, volta, node, yarn

### Community 154 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 156 - "contractConcepts.service.test.js"
Cohesion: 0.22
Nodes (4): ctx, ADR-0016, prismaMock, state

### Community 157 - "constants.js"
Cohesion: 0.07
Nodes (32): configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, reasonsApi, PolicyTypePage, ReasonPage, SocketContext, TooltipLongText() (+24 more)

### Community 159 - "NotificationSection/index.jsx"
Cohesion: 0.31
Nodes (10): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), HeaderAvatar(), MobileSearch(), SearchSection() (+2 more)

### Community 163 - "App.jsx"
Cohesion: 0.29
Nodes (7): refreshSession(), App(), AuthContext, NavigationScroll(), SocketProvider(), @mui/x-date-pickers, react-toastify

### Community 166 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 173 - "AppBar.jsx"
Cohesion: 0.23
Nodes (10): client_src_assets_images_interve, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthCardWrapper(), AuthWrapper1 (+2 more)

### Community 174 - "floatingPoint.guard.test.js"
Cohesion: 0.33
Nodes (4): ALLOWED, files(), lines, SRC

### Community 175 - "uniqueConstraints.constants.js"
Cohesion: 0.50
Nodes (3): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES

### Community 176 - "`tbl_users`"
Cohesion: 0.39
Nodes (6): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoices`, `tbl_users`

### Community 178 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 180 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

### Community 181 - "useConfig"
Cohesion: 0.29
Nodes (8): useConfig(), ProfileSection(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

## Knowledge Gaps
- **876 isolated node(s):** `STATUS_TABS`, `CONTRACT_INVOICE_TYPES`, `TERM_UNIT_NAMES`, `ADR-0017`, `ADR-0019` (+871 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1200 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **77 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0003` connect `useAuth` to `users.service.js`, `permissions.constants.js`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `users.service.js`, `server/package.json`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `axios` connect `react` to `server/package.json`, `client/package.json`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **What connects `STATUS_TABS`, `CONTRACT_INVOICE_TYPES`, `TERM_UNIT_NAMES` to the rest of the system?**
  _876 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `WorkFormPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08571428571428572 - nodes in this community are weakly interconnected._
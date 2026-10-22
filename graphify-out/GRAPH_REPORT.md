# Graph Report - WEBPAC-INTERVE  (2026-10-22)

## Corpus Check
- 588 files · ~293,861 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3361 nodes · 9235 edges · 217 communities (124 shown, 93 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 120 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `037b2b3b`
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
- ContractFormPage.jsx
- PolicyTypePage.jsx
- seed.demo.js
- auth.routes.js
- contractTerms.js
- client/package.json
- menu-items/index.js
- validation.utils.js
- providers.routes.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- invoices.service.js
- workDashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contractConcepts.service.test.js
- UsersPage.jsx
- usersApi.js
- invoices.controller.test.js
- updateInvoice
- mailerService.js
- contracts.routes.js
- seed.js
- `tbl_contracts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- session.service.js
- pagination.utils.js
- cron/index.js
- policyTypes.service.test.js
- permissions.constants.js
- devDependencies
- src/index.jsx
- EasyCrop.jsx
- scripts
- simpleInvoiceTerms.js
- `tbl_invoices`
- App.jsx
- status.constants.js
- invoiceTerms.js
- contractPolicies.service.js
- `tbl_contract_type_fields`
- formatTime.js
- ref_jest_globals
- scripts
- fMoneyText
- workScopeOf
- compilerOptions
- excelJS.js
- retentionTerms.js
- permission
- devDependencies
- ref_fs
- notifications.routes.js
- contracts.service.js
- @mui/material
- `tbl_contract_status_history`
- app.service.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- showError
- contractSuspensions.service.test.js
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- useGetMenuMaster
- addressTypes.service.js
- handleFirebase.js
- error.middleware.js
- workDashboard.service.test.js
- `tbl_providers`
- transaction.service.test.js
- images.js
- balanceReconciliation.service.js
- decisionReferences.guard.test.js
- dashboard.service.test.js
- `tbl_providers`
- WorkDetailPage.jsx
- `tbl_identity_documents`
- writeAudit
- identityDocuments.service.js
- uniqueConstraints.constants.test.js
- works.service.test.js
- contractPolicies.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- InputLabel.jsx
- `tbl_user_permissions`
- invoiceEvidence.service.js
- httpError
- decimal
- contractNotifications.service.test.js
- contractFields.js
- useAuth
- `tbl_contract_concepts`
- `tbl_reasons`
- serviceWorker.jsx
- contracts.controller.test.js
- withAlpha
- `tbl_users`
- balanceReconciliation.service.test.js
- contractEndDateReconciliation.service.test.js
- extends
- useConfig
- auth.service.test.js
- winston.config.js
- invariants.check.js
- authjwt.middleware.test.js
- browserslist
- volta
- DebouncedInput.jsx
- NotificationSection/index.jsx
- contracts.service.test.js
- createProvider
- updateWorkProvider
- ProviderTypePage.jsx
- session.service.test.js
- contractBalances
- workScope.guard.test.js
- floatingPoint.guard.test.js
- MainLayout/index.jsx
- invoiceEvidence.service.test.js
- idempotency.service.test.js
- requirePermission.middleware.test.js
- validate.middleware.test.js
- audit.service.test.js
- document.service.test.js
- `tbl_invoices`
- `tbl_invoices`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 131 edges
2. `react` - 100 edges
3. `useAuth()` - 79 edges
4. `showError()` - 78 edges
5. `writeAudit()` - 58 edges
6. `withLockedTransaction()` - 57 edges
7. `showSuccess()` - 55 edges
8. `workScopeOf()` - 55 edges
9. `dateOnlyText()` - 54 edges
10. `@tabler/icons-react` - 52 edges

## Surprising Connections (you probably didn't know these)
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `getUserPermissions()` --calls--> `getEffectivePermissionIds()`  [EXTRACTED]
  server/src/modules/app/general/app.service.js → server/src/common/services/effectivePermissions.service.js
- `saveModuleDoc()` --calls--> `runIdempotent()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/idempotency.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js

## Import Cycles
- None detected.

## Communities (217 total, 93 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (26): ThemeCustomization(), Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid() (+18 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "users.service.js"
Cohesion: 0.07
Nodes (45): ADR-0001, INACTIVE_STATUS, newOperationId(), canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused() (+37 more)

### Community 3 - "httpCliente.js"
Cohesion: 0.09
Nodes (30): getMyWorksSelectAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient, RETRY_503_HINT, pickWork(), useWorkScope() (+22 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (36): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+28 more)

### Community 6 - "providers.service.js"
Cohesion: 0.11
Nodes (26): ADR-0009, ASSIGNMENT_IDEMPOTENCY, ASSIGNMENT_LIST_SELECT, assignmentValuesOf(), AUDITED_HEADER, CLASSIFICATIONS_SELECT, contactsHelper, EXISTING_SELECT (+18 more)

### Community 7 - "InvoiceFormPage.jsx"
Cohesion: 0.11
Nodes (31): getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, previewSimpleInvoiceAPI(), MoneyField() (+23 more)

### Community 8 - "invoices.routes.js"
Cohesion: 0.10
Nodes (30): invoicesRoutes, ADR-0017, approveInvoiceSchema, cancelInvoiceSchema, contractSelectRules, deleteInvoiceSchema, getContractAdvanceSchema, getInvoiceFormOptionsSchema (+22 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (46): contractConceptsApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+38 more)

### Community 10 - "PolicyTypePage.jsx"
Cohesion: 0.15
Nodes (15): configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, PolicyTypePage, POLICY_BASE_OPTIONS, policyBaseName(), ConfigureBaseDialog() (+7 more)

### Community 11 - "seed.demo.js"
Cohesion: 0.05
Nodes (61): ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure(), ID_DOC (+53 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.11
Nodes (26): forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController(), requestContext() (+18 more)

### Community 13 - "contractTerms.js"
Cohesion: 0.11
Nodes (23): ADR-0015, daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), runEndDateReconciliation(), derivedEndDate(), previewContractEndDate(), CONCEPT_TYPE_NAMES (+15 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (33): compat, __dirname, __filename, name, packageManager, private, version, apexcharts (+25 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, menuItems, icons, other (+7 more)

### Community 16 - "validation.utils.js"
Cohesion: 0.09
Nodes (27): express-validator, EDITABLE_STATUS_VALUES, IDEMPOTENCY_HEADER, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+19 more)

### Community 17 - "providers.routes.js"
Cohesion: 0.09
Nodes (32): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, getProviderController, INPUT_FIELDS, notifyAssignment() (+24 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.09
Nodes (20): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.07
Nodes (39): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), validateCodeAPI(), verifyTokenAPI(), client_src_assets_images_interve, AuthProvider() (+31 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.08
Nodes (31): ADR-0013, ADR-0023, admittedContractsWhere(), admittedTypes(), CONTRACT_GATED_ACTIONS, countByState(), DETAIL_AUDITED, getInvoiceFormOptions() (+23 more)

### Community 22 - "workDashboard.service.js"
Cohesion: 0.06
Nodes (86): main(), scopeWhere(), moneyText(), sumMoney(), addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL (+78 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.08
Nodes (22): compression, cookie-parser, cors, dotenv, express-fileupload, express-rate-limit, helmet, ref_http (+14 more)

### Community 25 - "works.service.js"
Cohesion: 0.09
Nodes (48): ADR-0004, ADR-0007, assertInScope(), PROGRESS_WARNING, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections() (+40 more)

### Community 26 - "contractConcepts.service.test.js"
Cohesion: 0.09
Nodes (15): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx, prismaMock (+7 more)

### Community 27 - "UsersPage.jsx"
Cohesion: 0.14
Nodes (23): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+15 more)

### Community 28 - "usersApi.js"
Cohesion: 0.15
Nodes (11): getBasicInformationAPI(), updateAccountAPI(), updatePasswordAPI(), Accordion(), findOption(), flattenOptions(), GenericFormSection, PendingDropdownField() (+3 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (28): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, getEffectivePermissionIds, invoicesServiceMock (+20 more)

### Community 30 - "updateInvoice"
Cohesion: 0.16
Nodes (29): approveInvoice(), assertContractAdmitsCancel(), assertInvoiceVisible(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditable() (+21 more)

### Community 31 - "mailerService.js"
Cohesion: 0.22
Nodes (10): imap-simple, nodemailer, emailApp, nameApp, nameAppMail, checkEmailBounces(), saveToSent(), sendEmail() (+2 more)

### Community 32 - "contracts.routes.js"
Cohesion: 0.09
Nodes (34): moneyRule(), optionalDate(), percentRule(), simpleAmountRules(), contractsRoutes, ADR-0006, ADR-0016, ADR-0017 (+26 more)

### Community 33 - "seed.js"
Cohesion: 0.15
Nodes (11): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+3 more)

### Community 34 - "`tbl_contracts`"
Cohesion: 0.15
Nodes (10): `tbl_status`, `tbl_users`, `tbl_work_stages`, `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users` (+2 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "session.service.js"
Cohesion: 0.08
Nodes (35): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+27 more)

### Community 38 - "pagination.utils.js"
Cohesion: 0.18
Nodes (16): containsFilter(), dateRangeFilter(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS, paginate(), resolvePagination() (+8 more)

### Community 39 - "cron/index.js"
Cohesion: 0.19
Nodes (10): node-cron, cronJobs, ADR-0017, registeredTasks, startCronJobs(), stopCronJobs(), wrapHandler(), contractBalanceReconciliationJob (+2 more)

### Community 40 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 41 - "permissions.constants.js"
Cohesion: 0.07
Nodes (35): ADR-0011, ADR-0019, ADR-0012, ADR-0016, ADR-0017, ADR-0018, ADR-0020, ADR-0024 (+27 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.15
Nodes (13): client_src_assets_scss_style, config, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals() (+5 more)

### Community 46 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+9 more)

### Community 48 - "simpleInvoiceTerms.js"
Cohesion: 0.11
Nodes (26): toMoney(), adjustableAmount(), approvalSnapshot(), isSimpleType(), liquidationConceptOf(), positiveMoney(), previewSimpleInvoice(), requestedDetailChanges() (+18 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_providers`, `tbl_work_stages`

### Community 50 - "App.jsx"
Cohesion: 0.33
Nodes (5): App(), AuthContext, NavigationScroll(), @mui/x-date-pickers, react-toastify

### Community 51 - "status.constants.js"
Cohesion: 0.12
Nodes (21): ref_node_fs, captured, explain(), measure(), parseParams(), percentile(), plain(), adapter (+13 more)

### Community 52 - "invoiceTerms.js"
Cohesion: 0.16
Nodes (18): isContractCreate(), isCreate(), isSimpleCreate(), assertTransition(), cancelTransitionFor(), hasContract(), historyRow(), httpError() (+10 more)

### Community 53 - "contractPolicies.service.js"
Cohesion: 0.10
Nodes (28): AUDIT_ENTITIES, percentOf(), toPercent(), insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES (+20 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "formatTime.js"
Cohesion: 0.15
Nodes (8): paginationDocsApi(), showPromise(), DocumentManagement(), FileRow(), getFileIcon(), getFileSize(), formatNotificationDateTime(), SHORT_MONTHS

### Community 56 - "ref_jest_globals"
Cohesion: 0.06
Nodes (31): ref_jest_globals, prismaMock, baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks() (+23 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "fMoneyText"
Cohesion: 0.07
Nodes (75): getDashboardSummaryAPI(), getWorkDashboardAPI(), ADR-0002, getContractAdvanceAPI(), headerStyle, MainCard(), invoicePath(), fMoneyText() (+67 more)

### Community 59 - "workScopeOf"
Cohesion: 0.10
Nodes (49): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, getWorkDashboardController, ADR-0002, accessOf(), approveInvoiceController (+41 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "retentionTerms.js"
Cohesion: 0.22
Nodes (13): @prisma/client, assertLiquidationCancellable(), assertRefundFits(), assertRetentionFits(), httpError(), ADR-0025, money(), retentionBalances() (+5 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, jest, nodemon, pm2, prisma, supertest

### Community 66 - "ref_fs"
Cohesion: 0.33
Nodes (4): ref_fs, catalog, expected, prismaMock

### Community 68 - "notifications.routes.js"
Cohesion: 0.24
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+4 more)

### Community 70 - "contracts.service.js"
Cohesion: 0.06
Nodes (99): diffFields(), withLockedTransaction(), percentText(), FIELD_GROUPS, typeAppliesAiu(), withContractAiu(), resolveContractTypeFields(), assertContractStillAdmits() (+91 more)

### Community 71 - "@mui/material"
Cohesion: 0.06
Nodes (57): getAddressTypesSelectAPI, getWorksSummaryAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), SubCard(), ACTION_TONES, ActionButton() (+49 more)

### Community 88 - "app.service.js"
Cohesion: 0.13
Nodes (16): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+8 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.14
Nodes (8): `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies`, `tbl_users`, `tbl_reasons`, `tbl_status`

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.04
Nodes (64): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, reasonsApi, supervisionTypesApi, createMasterApi() (+56 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.08
Nodes (35): hasEffectivePermission(), ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope() (+27 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "showError"
Cohesion: 0.06
Nodes (76): deleteFileByPath(), uploadFile(), contractPoliciesApi, suspendContractAPI(), deleteDocApi(), saveDocApi(), getInsurersSelectAPI, invoiceTransitionsApi (+68 more)

### Community 108 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.07
Nodes (43): express, getIO(), verifyToken(), requirePermission(), validate(), createMasterControllers(), createMasterRouter(), insurersRoutes (+35 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.17
Nodes (10): `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts`, `tbl_contracts`, `tbl_insurers` (+2 more)

### Community 116 - "useGetMenuMaster"
Cohesion: 0.21
Nodes (13): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), getStatusesByScopeAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName() (+5 more)

### Community 117 - "addressTypes.service.js"
Cohesion: 0.22
Nodes (10): defineMaster(), defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig (+2 more)

### Community 118 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

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

### Community 125 - "balanceReconciliation.service.js"
Cohesion: 0.24
Nodes (12): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS, findBalanceViolations() (+4 more)

### Community 129 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 130 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (5): ALL, INVOICES, ADR-0002, OWN, prismaMock

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "WorkDetailPage.jsx"
Cohesion: 0.08
Nodes (48): getConstructionCompaniesSelectAPI, getIdentityDocumentsSelectAPI, getSupervisionTypesSelectAPI, getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, ContactsList(), ADR-0009 (+40 more)

### Community 133 - "`tbl_identity_documents`"
Cohesion: 0.50
Nodes (3): `tbl_users`, `tbl_identity_documents`, `tbl_users`

### Community 134 - "writeAudit"
Cohesion: 0.05
Nodes (56): bcrypt, ref_crypto, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0027, protect(), REDACTED (+48 more)

### Community 136 - "identityDocuments.service.js"
Cohesion: 0.17
Nodes (12): DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, identityDocumentsRoutes, identityDocumentsConfig (+4 more)

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 140 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 142 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 153 - "invoiceEvidence.service.js"
Cohesion: 0.21
Nodes (12): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+4 more)

### Community 154 - "httpError"
Cohesion: 0.32
Nodes (13): assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope(), assertTypeIds(), assertWorkAssignable(), assignmentTypeIdsOf(), assignProviderToWork(), changeProviderStatus() (+5 more)

### Community 155 - "decimal"
Cohesion: 0.13
Nodes (28): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent(), ratioText() (+20 more)

### Community 156 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 157 - "contractFields.js"
Cohesion: 0.26
Nodes (10): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+2 more)

### Community 159 - "useAuth"
Cohesion: 0.04
Nodes (87): contractsApi, getInvoiceFilterProvidersAPI(), getPermissionsCatalogAPI(), refreshSession(), useAuth(), useWorkFilterField(), useInvoiceViews(), ADR-0002 (+79 more)

### Community 173 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 174 - "contracts.controller.test.js"
Cohesion: 0.17
Nodes (10): conceptsServiceMock, contractsServiceMock, emit, getEffectivePermissionIds, ADR-0015, ADR-0016, policiesServiceMock, SCOPE (+2 more)

### Community 175 - "withAlpha"
Cohesion: 0.14
Nodes (17): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Chip() (+9 more)

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

### Community 183 - "useConfig"
Cohesion: 0.31
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

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
Cohesion: 0.29
Nodes (11): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), NotificationSection(), ProfileSection(), HeaderAvatar(), MobileSearch() (+3 more)

### Community 198 - "contracts.service.test.js"
Cohesion: 0.15
Nodes (9): ctx, ADR-0015, ADR-0017, NONE, OTHER, OWN, prismaMock, state (+1 more)

### Community 199 - "createProvider"
Cohesion: 0.31
Nodes (10): applyProviderTypes(), assertIdentification(), checkIdentification(), createProvider(), duplicateError(), findByIdentity(), findTypeIds(), masterLocksOf() (+2 more)

### Community 200 - "updateWorkProvider"
Cohesion: 0.36
Nodes (9): applyAssignmentTypes(), assertProviderTypes(), assignmentText(), auditAssignment(), findAssignmentTypeIds(), findLockedAssignment(), insertAssignment(), unassignProviderFromWork() (+1 more)

### Community 201 - "ProviderTypePage.jsx"
Cohesion: 0.14
Nodes (17): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+9 more)

### Community 202 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 203 - "contractBalances"
Cohesion: 0.36
Nodes (8): balanceChange(), contractBalances(), hasDetail(), revalidateOnApprove(), revalidateOnCancel(), SNAPSHOT_AMOUNTS, storedAmount(), storedDetail()

### Community 204 - "workScope.guard.test.js"
Cohesion: 0.33
Nodes (5): ref_url, controllers, EXEMPT, handlers, MODULES

### Community 205 - "floatingPoint.guard.test.js"
Cohesion: 0.33
Nodes (4): ALLOWED, files(), lines, SRC

### Community 206 - "MainLayout/index.jsx"
Cohesion: 0.14
Nodes (19): handlerDrawerOpen(), CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, Footer(), Header(), WorkSection(), MainLayout() (+11 more)

### Community 207 - "invoiceEvidence.service.test.js"
Cohesion: 0.40
Nodes (3): prismaMock, state, user

## Knowledge Gaps
- **959 isolated node(s):** `ADR-0006`, `ADR-0016`, `ADR-0017`, `ADR-0018`, `ADR-0017` (+954 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1311 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **93 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `contractPolicies.service.js`, `useAuth`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `ADR-0002` connect `fMoneyText` to `contracts.service.js`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `overrides/index.js`, `httpCliente.js`, `WorkDetailPage.jsx`, `InvoiceFormPage.jsx`, `ContractFormPage.jsx`, `PolicyTypePage.jsx`, `client/package.json`, `AuthForgotPassword.jsx`, `InputLabel.jsx`, `UsersPage.jsx`, `usersApi.js`, `useAuth`, `EasyCrop.jsx`, `withAlpha`, `formatTime.js`, `useConfig`, `fMoneyText`, `DebouncedInput.jsx`, `NotificationSection/index.jsx`, `ProviderTypePage.jsx`, `MainLayout/index.jsx`, `MainRoutes.jsx`, `showError`, `useGetMenuMaster`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **What connects `ADR-0006`, `ADR-0016`, `ADR-0017` to the rest of the system?**
  _959 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07764705882352942 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `users.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07111756168359942 - nodes in this community are weakly interconnected._
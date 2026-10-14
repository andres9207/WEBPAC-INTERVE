# Graph Report - WEBPAC-INTERVE  (2026-10-14)

## Corpus Check
- 568 files · ~268,430 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 3167 nodes · 8528 edges · 197 communities (117 shown, 80 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 118 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `77ee1b7e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- writeAudit
- WorkScopeContext.jsx
- dependencies
- server/package.json
- providers.service.js
- WorksPage.jsx
- auth.service.js
- ContractFormPage.jsx
- withAlpha
- seed.demo.js
- auth.routes.js
- contracts.service.js
- client/package.json
- menu-items/index.js
- providers.routes.js
- prismaClient.js
- invoices.service.test.js
- compilerOptions
- AuthForgotPassword.jsx
- StatusTabs.jsx
- dashboard.service.js
- `tbl_users`
- app.js
- works.service.js
- contracts.service.test.js
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
- ContractsPage.jsx
- server.js
- ref_jest_globals
- permissions.constants.js
- devDependencies
- src/index.jsx
- MainLayout/index.jsx
- scripts
- constants.js
- `tbl_invoices`
- ProviderTypePage.jsx
- workScopeOf
- showError
- Shadow.jsx
- `tbl_contract_type_fields`
- DocumentManagement.jsx
- transaction.mock.js
- scripts
- @mui/material
- workScope.service.js
- compilerOptions
- excelJS.js
- contractPolicies.service.js
- permission
- devDependencies
- floatingPoint.guard.test.js
- notifications.routes.js
- master.service.js
- ContactsEditor.jsx
- `tbl_contract_status_history`
- app.routes.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- idempotency.service.js
- `tbl_provider_type_field_versions`
- Default/index.jsx
- App.jsx
- masterRouter.utils.js
- `tbl_works`
- `tbl_policies`
- react-router-dom
- invoices.routes.js
- InvoiceFormPage.jsx
- error.middleware.js
- retentionTerms.js
- `tbl_providers`
- transaction.service.test.js
- images.js
- balanceReconciliation.service.js
- `tbl_contract_suspensions`
- providerTypeFields.service.js
- `tbl_providers`
- ProviderDataForm.jsx
- session.service.test.js
- contractConcepts.service.js
- users.service.js
- uniqueConstraints.constants.test.js
- invoiceTerms.js
- works.service.test.js
- contractPolicies.service.test.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- extends
- balanceReconciliation.service.test.js
- term.utils.js
- themes/index.jsx
- decimal
- contractNotifications.service.test.js
- invoiceViews.js
- AuthenticationRoutes.jsx
- `tbl_contract_concepts`
- `tbl_reasons`
- AppBar.jsx
- invoiceEvidence.service.js
- NotificationSection/index.jsx
- `tbl_users`
- users.service.test.js
- contractEndDateReconciliation.service.test.js
- contractSuspensions.service.test.js
- useConfig
- auth.service.test.js
- winston.config.js
- invariants.check.js
- authjwt.middleware.test.js
- invoices.controller.test.js
- permissions.controller.test.js
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
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `UserDialog` --indirect_call--> `ChipMultiSelect()`  [INFERRED]
  client/src/views/security/users/components/UserDialog.jsx → client/src/ui-component/extended/ChipMultiSelect.jsx
- `WorkView()` --indirect_call--> `previewWorkEndDateAPI()`  [INFERRED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/api/requests/worksApi.js
- `WorkView()` --indirect_call--> `validateManagers()`  [INFERRED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/views/work/works/components/workForm.js

## Import Cycles
- None detected.

## Communities (197 total, 80 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (24): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (44): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+36 more)

### Community 2 - "writeAudit"
Cohesion: 0.11
Nodes (31): AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0027, newOperationId(), protect() (+23 more)

### Community 3 - "WorkScopeContext.jsx"
Cohesion: 0.12
Nodes (20): getPermissionsCatalogAPI(), getMyWorksSelectAPI(), genericRequest, instance, NO_REFRESH_URLS, refreshClient, pickWork(), useWorkScope() (+12 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.06
Nodes (35): @azure/identity, cross-env, dayjs, excel4node, exceljs, fs-extra, generic-pool, isomorphic-fetch (+27 more)

### Community 6 - "providers.service.js"
Cohesion: 0.09
Nodes (53): assertInScope(), applyProviderTypes(), assertAssignmentDate(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes(), assertTypeIds(), assertWorkAssignable() (+45 more)

### Community 7 - "WorksPage.jsx"
Cohesion: 0.12
Nodes (21): getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, supervisionTypesApi, getWorkManagersSelectAPI(), getWorksSummaryAPI(), previewWorkEndDateAPI() (+13 more)

### Community 8 - "auth.service.js"
Cohesion: 0.08
Nodes (36): bcrypt, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+28 more)

### Community 9 - "ContractFormPage.jsx"
Cohesion: 0.08
Nodes (43): contractConceptsApi, contractsApi, getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006, ADR-0016, ADR-0017 (+35 more)

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
Cohesion: 0.08
Nodes (46): ADR-0002, assertHeader(), assertProviderAssigned(), assertStage(), assertUniqueNumber(), assertWork(), auditableContract(), CONCEPT_AUDITED (+38 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (41): compat, __dirname, __filename, browserslist, development, production, name, packageManager (+33 more)

### Community 15 - "menu-items/index.js"
Cohesion: 0.09
Nodes (15): admin, icons, billing, dashboard, icons, icons, other, icons (+7 more)

### Community 16 - "providers.routes.js"
Cohesion: 0.07
Nodes (38): ADR-0001, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idempotencyKeyRule(), ADR-0009 (+30 more)

### Community 17 - "prismaClient.js"
Cohesion: 0.07
Nodes (32): @prisma/adapter-mariadb, adapter, describeTarget(), ADR-0013, ADR-0027, prisma, testConnection(), ACTIVE_STATUS (+24 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.10
Nodes (19): concept(), CONCEPTS, contractInput(), ctx, D(), ADR-0020, ADR-0024, liquidationInput() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "AuthForgotPassword.jsx"
Cohesion: 0.22
Nodes (14): forgotPasswordAPI(), restorePasswordAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber(), hasSpecial() (+6 more)

### Community 21 - "StatusTabs.jsx"
Cohesion: 1.00
Nodes (3): chipBg(), chipText(), StatusTabs()

### Community 22 - "dashboard.service.js"
Cohesion: 0.10
Nodes (34): scopeWhere(), contractsBlock(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002, notDeleted, policiesBlock() (+26 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "app.js"
Cohesion: 0.11
Nodes (15): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, allowedHosts (+7 more)

### Community 25 - "works.service.js"
Cohesion: 0.08
Nodes (50): ADR-0004, ADR-0007, sumMoney(), defineContacts(), FIELDS, httpError(), ADR-0009, optionalText() (+42 more)

### Community 26 - "contracts.service.test.js"
Cohesion: 0.06
Nodes (23): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), row(), ctx, prismaMock, state (+15 more)

### Community 27 - "contractSuspensions.service.js"
Cohesion: 0.10
Nodes (33): dateOnlyText(), contractLabel(), ADR-0027, notifyWorkManagers(), auditable(), findOpenSuspension(), ADR-0017, ADR-0027 (+25 more)

### Community 28 - "providers.service.test.js"
Cohesion: 0.12
Nodes (14): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+6 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.05
Nodes (32): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, forgedAuthor, ADR-0013, profilesServiceMock (+24 more)

### Community 30 - "invoices.service.js"
Cohesion: 0.08
Nodes (59): ADR-0021, ADR-0023, moneyText(), adjustableAmount(), amountsDto(), approvalSnapshot(), approveInvoice(), assertProviderAssigned() (+51 more)

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
Cohesion: 0.15
Nodes (20): baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, ADR-0001, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+12 more)

### Community 38 - "ContractsPage.jsx"
Cohesion: 0.05
Nodes (31): useWorkFilterField(), ADR-0002, useLinkedFilters(), InvoicesPage, LinkedFilterNotice(), CONTRACT_POLICY_STATUS_LABELS, CONTRACT_STATE_COLORS, CONTRACT_STATE_TABS (+23 more)

### Community 39 - "server.js"
Cohesion: 0.14
Nodes (14): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+6 more)

### Community 40 - "ref_jest_globals"
Cohesion: 0.06
Nodes (15): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+7 more)

### Community 41 - "permissions.constants.js"
Cohesion: 0.05
Nodes (49): ADR-0011, ADR-0012, ADR-0016, ADR-0018, ADR-0019, ADR-0026, express, ADR-0017 (+41 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+5 more)

### Community 44 - "src/index.jsx"
Cohesion: 0.12
Nodes (18): client_src_assets_scss_style, config, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals() (+10 more)

### Community 45 - "MainLayout/index.jsx"
Cohesion: 0.16
Nodes (17): handlerDrawerOpen(), Footer(), Header(), MainLayout(), MainLayoutContent(), ScopedOutlet(), LogoSection(), MainContentStyled (+9 more)

### Community 46 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, build, cron:run, db:check-invariants, db:seed, db:seed:demo, dev, pm2:logs (+7 more)

### Community 48 - "constants.js"
Cohesion: 0.07
Nodes (30): configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, reasonsApi, PolicyTypePage, SocketContext, TooltipLongText(), CONTRACT_INVOICE_TYPES (+22 more)

### Community 49 - "`tbl_invoices`"
Cohesion: 0.20
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`, `tbl_work_providers`, `tbl_work_stages`

### Community 50 - "ProviderTypePage.jsx"
Cohesion: 0.15
Nodes (16): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, PROVIDER_INVOICE_VIEW_OPTIONS, DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006 (+8 more)

### Community 51 - "workScopeOf"
Cohesion: 0.09
Nodes (48): auditContext(), getEffectivePermissionIds(), workScopeOf(), getDashboardSummaryController, ADR-0002, ACT_FIELDS, cancelPolicyController, CONCEPT_FIELDS (+40 more)

### Community 52 - "showError"
Cohesion: 0.06
Nodes (81): contractPoliciesApi, suspendContractAPI(), getIdentityDocumentsSelectAPI, getInsurersSelectAPI, invoiceTransitionsApi, getPolicyTypesSelectAPI, deleteProfileAPI(), getModulesAPI() (+73 more)

### Community 53 - "Shadow.jsx"
Cohesion: 0.20
Nodes (13): gridSpacing, CardSecondaryAction(), SubCard(), Avatar(), DashboardCards(), Indicator(), ADR-0002, ColorBox() (+5 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (29): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+21 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "@mui/material"
Cohesion: 0.06
Nodes (86): getStatusesByScopeAPI(), useInvoiceViewChange(), useInvoiceViews(), InvoiceDetailPage, useSocket(), ACTION_TONES, ActionButton(), toneOf() (+78 more)

### Community 59 - "workScope.service.js"
Cohesion: 0.10
Nodes (26): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+18 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "contractPolicies.service.js"
Cohesion: 0.14
Nodes (34): percentText(), toPercent(), assertContractAdmitsCancel(), assertContractStillAdmits(), assertMasters(), assertTypeFree(), auditable(), cancelPolicy() (+26 more)

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

### Community 70 - "master.service.js"
Cohesion: 0.10
Nodes (38): capitalize(), createMasterService(), httpError(), ADR-0027, containsFilter(), countByStatus(), dateRangeFilter(), DEFAULT_ROWS (+30 more)

### Community 71 - "ContactsEditor.jsx"
Cohesion: 0.21
Nodes (15): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+7 more)

### Community 88 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.04
Nodes (68): addressTypesApi, constructionCompaniesApi, identityDocumentsApi, insurersApi, providersApi, useAuth(), AddressTypePage, ConstructionCompanyPage (+60 more)

### Community 100 - "idempotency.service.js"
Cohesion: 0.14
Nodes (15): ADR-0027, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), deleteModuleDoc() (+7 more)

### Community 104 - "`tbl_provider_type_field_versions`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "Default/index.jsx"
Cohesion: 0.15
Nodes (21): getDashboardSummaryAPI(), ADR-0002, headerStyle, MainCard(), AlertsCard(), Empty(), LatestInvoicesCard(), num (+13 more)

### Community 108 - "App.jsx"
Cohesion: 0.18
Nodes (12): loginAPI(), logoutAPI(), verifyTokenAPI(), refreshSession(), App(), AuthContext, AuthProvider(), getStoredUser() (+4 more)

### Community 112 - "masterRouter.utils.js"
Cohesion: 0.06
Nodes (46): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), getIO(), setIO(), verifyToken() (+38 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.33
Nodes (5): `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_insurers`, `tbl_policy_types`

### Community 116 - "react-router-dom"
Cohesion: 0.28
Nodes (12): endpoints, initialState, useGetMenuMaster(), getMenuAPI(), setParentOpenedMenu(), useMenuCollapse(), getIconByName(), MenuList() (+4 more)

### Community 117 - "invoices.routes.js"
Cohesion: 0.10
Nodes (32): accessOf(), approveInvoiceController, cancelInvoiceController, getContractAdvanceController, getInvoiceController, getInvoiceEvidenceController, getInvoiceFormOptionsController, grantedOf() (+24 more)

### Community 118 - "InvoiceFormPage.jsx"
Cohesion: 0.12
Nodes (28): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, MoneyField(), moneyInputText() (+20 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.20
Nodes (17): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0027 (+9 more)

### Community 120 - "retentionTerms.js"
Cohesion: 0.15
Nodes (22): balanceChange(), contractBalances(), getContractAdvance(), hasDetail(), revalidateOnApprove(), revalidateOnCancel(), SNAPSHOT_AMOUNTS, storedAmount() (+14 more)

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
Cohesion: 0.12
Nodes (28): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+20 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (12): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+4 more)

### Community 132 - "ProviderDataForm.jsx"
Cohesion: 0.11
Nodes (24): getProviderTypesSelectAPI, contactsToForm(), contactsToPayload(), ADR-0009, text(), TEXT_FIELDS, ADR-0012, ProviderDataForm() (+16 more)

### Community 133 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 134 - "contractConcepts.service.js"
Cohesion: 0.18
Nodes (27): withContractAiu(), activeSequence(), amendmentResult(), assertChronology(), assertStartDate(), auditAct(), conceptTarget(), configuredConcept() (+19 more)

### Community 136 - "users.service.js"
Cohesion: 0.11
Nodes (19): DIAN_WEIGHTS, GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, assertAssignableProfile(), assertIdentification(), AUDITED_USER_FIELDS (+11 more)

### Community 137 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 139 - "invoiceTerms.js"
Cohesion: 0.18
Nodes (15): assertTransition(), hasContract(), historyRow(), httpError(), INVOICE_STATES, INVOICE_TRANSITIONS, INVOICE_TYPES, ADR-0020 (+7 more)

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

### Community 153 - "term.utils.js"
Cohesion: 0.19
Nodes (18): ADR-0015, addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress() (+10 more)

### Community 154 - "themes/index.jsx"
Cohesion: 0.23
Nodes (9): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor (+1 more)

### Community 155 - "decimal"
Cohesion: 0.10
Nodes (35): @prisma/client, decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), RATIO_SCALE (+27 more)

### Community 156 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 157 - "invoiceViews.js"
Cohesion: 0.17
Nodes (21): applyInvoiceViewChange(), ADR-0010, createContractInvoice(), ANY_CONTRACT_VIEW_PERMISSION, ANY_VIEW_PERMISSION, applyProviderViewChanges(), assertNotMixed(), assertViewGranted() (+13 more)

### Community 159 - "AuthenticationRoutes.jsx"
Cohesion: 0.19
Nodes (10): MinimalLayout(), AuthenticationRoutes, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router, MainRoutes (+2 more)

### Community 173 - "AppBar.jsx"
Cohesion: 0.23
Nodes (10): client_src_assets_images_interve, ForgotPasswordPage, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo(), AuthWrapper1 (+2 more)

### Community 174 - "invoiceEvidence.service.js"
Cohesion: 0.18
Nodes (14): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+6 more)

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

### Community 181 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 183 - "useConfig"
Cohesion: 0.33
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

### Community 192 - "invoices.controller.test.js"
Cohesion: 0.25
Nodes (6): emit, getEffectivePermissionIds, invoicesServiceMock, ADR-0020, SCOPE, workScopeOf

### Community 193 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

## Knowledge Gaps
- **915 isolated node(s):** `PAGES`, `PERMISSIONS`, `PERMISSIONS_NO_PAGE`, `VIEW_PERMISSIONS`, `STATUSES` (+910 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1252 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **80 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.172) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `WorkScopeContext.jsx`, `ProviderDataForm.jsx`, `WorksPage.jsx`, `ContractFormPage.jsx`, `withAlpha`, `client/package.json`, `AuthForgotPassword.jsx`, `StatusTabs.jsx`, `themes/index.jsx`, `AuthenticationRoutes.jsx`, `react`, `ContractsPage.jsx`, `MainLayout/index.jsx`, `AppBar.jsx`, `NotificationSection/index.jsx`, `constants.js`, `ProviderTypePage.jsx`, `showError`, `Shadow.jsx`, `DocumentManagement.jsx`, `useConfig`, `DebouncedInput.jsx`, `ContactsEditor.jsx`, `useAuth`, `Default/index.jsx`, `react-router-dom`, `InvoiceFormPage.jsx`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Why does `ADR-0015` connect `term.utils.js` to `ContractFormPage.jsx`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **What connects `PAGES`, `PERMISSIONS`, `PERMISSIONS_NO_PAGE` to the rest of the system?**
  _915 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08325624421831637 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `writeAudit` be split into smaller, more focused modules?**
  _Cohesion score 0.10810810810810811 - nodes in this community are weakly interconnected._
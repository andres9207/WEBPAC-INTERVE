import { lazy } from 'react';
import { Navigate } from 'react-router';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoute from './PrivateRoute';
import ErrorBoundary from './ErrorBoundary';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// security routing
const ProfilesPage = Loadable(lazy(() => import('views/security/profiles/ProfilePage')));
const UsersPage = Loadable(lazy(() => import('views/security/users/UsersPage')));

// admin routing
const IdentityDocumentPage = Loadable(lazy(() => import('views/admin/identityDocuments/IdentityDocumentPage')));
const ProviderTypePage = Loadable(lazy(() => import('views/admin/providerTypes/ProviderTypePage')));
const AddressTypePage = Loadable(lazy(() => import('views/admin/addressTypes/AddressTypePage')));
const InsurerPage = Loadable(lazy(() => import('views/admin/insurers/InsurerPage')));
const SupervisionTypePage = Loadable(lazy(() => import('views/admin/supervisionTypes/SupervisionTypePage')));
const ConstructionCompanyPage = Loadable(lazy(() => import('views/admin/constructionCompanies/ConstructionCompanyPage')));
const ContractTypePage = Loadable(lazy(() => import('views/admin/contractTypes/ContractTypePage')));
const ReasonPage = Loadable(lazy(() => import('views/admin/reasons/ReasonPage')));
const PolicyTypePage = Loadable(lazy(() => import('views/admin/policyTypes/PolicyTypePage')));
const WorksPage = Loadable(lazy(() => import('views/work/works/WorksPage')));
const WorkDetailPage = Loadable(lazy(() => import('views/work/works/WorkDetailPage')));
const ProvidersPage = Loadable(lazy(() => import('views/work/providers/ProvidersPage')));
const ProviderDetailPage = Loadable(lazy(() => import('views/work/providers/ProviderDetailPage')));
const ContractsPage = Loadable(lazy(() => import('views/work/contracts/ContractsPage')));
const ContractDetailPage = Loadable(lazy(() => import('views/work/contracts/ContractDetailPage')));
const InvoicesPage = Loadable(lazy(() => import('views/billing/invoices/InvoicesPage')));
const InvoiceDetailPage = Loadable(lazy(() => import('views/billing/invoices/InvoiceDetailPage')));
const InvoiceFormPage = Loadable(lazy(() => import('views/billing/invoices/InvoiceFormPage')));
const StatementsPage = Loadable(lazy(() => import('views/billing/statements/StatementsPage')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <PrivateRoute />,
  errorElement: <ErrorBoundary />,
  children: [
    {
      element: <MainLayout />,
      children: [
        { path: '/', element: <Navigate to="/home/default" replace /> },
        {
          path: 'home',
          children: [
            {
              path: 'default',
              element: <DashboardDefault />,
              // Expedientes abiertos desde el tablero (DEC-063): el mismo modal
              // con dirección propia, sobre el tablero; cerrar vuelve a él.
              children: [
                { path: 'works/:wrkId', element: <WorkDetailPage /> },
                { path: 'providers/:prvId', element: <ProviderDetailPage /> },
                { path: 'contracts/:ctrId', element: <ContractDetailPage /> },
                { path: 'invoices/:invId', element: <InvoiceDetailPage /> }
              ]
            }
          ]
        },
        {
          path: 'security',
          children: [
            { path: 'profiles', element: <ProfilesPage /> },
            { path: 'users', element: <UsersPage /> }
          ]
        },
        {
          path: 'admin',
          children: [
            { path: 'identityDocuments', element: <IdentityDocumentPage /> },
            { path: 'providerTypes', element: <ProviderTypePage /> },
            { path: 'addressTypes', element: <AddressTypePage /> },
            { path: 'insurers', element: <InsurerPage /> },
            { path: 'supervisionTypes', element: <SupervisionTypePage /> },
            { path: 'constructionCompanies', element: <ConstructionCompanyPage /> },
            { path: 'contractTypes', element: <ContractTypePage /> },
            { path: 'reasons', element: <ReasonPage /> },
            { path: 'policyTypes', element: <PolicyTypePage /> }
          ]
        },
        {
          path: 'work',
          // Obras y proveedores (DEC-030, DEC-031): alta, detalle y edición
          // son rutas hijas del listado y se abren en un modal sobre él, con
          // dirección propia (DEC-034). Las tres abren la misma vista con
          // pestañas (DEC-057); la edición, en la pestaña de datos.
          children: [
            {
              path: 'works',
              element: <WorksPage />,
              children: [
                { path: 'new', element: <WorkDetailPage /> },
                { path: ':wrkId', element: <WorkDetailPage /> },
                { path: ':wrkId/edit', element: <WorkDetailPage /> }
              ]
            },
            {
              path: 'providers',
              element: <ProvidersPage />,
              children: [
                { path: 'new', element: <ProviderDetailPage /> },
                { path: ':prvId', element: <ProviderDetailPage /> },
                { path: ':prvId/edit', element: <ProviderDetailPage /> }
              ]
            },
            {
              // Contratos (DEC-035), con el mismo patrón: una sola vista (DEC-057).
              path: 'contracts',
              element: <ContractsPage />,
              children: [
                { path: 'new', element: <ContractDetailPage /> },
                { path: ':ctrId', element: <ContractDetailPage /> },
                { path: ':ctrId/edit', element: <ContractDetailPage /> }
              ]
            },
            {
              // Menús de contratos (DEC-077): el mismo listado, con el tipo de
              // proveedor del menú. Sin el menú, "Todos" (la ruta de arriba).
              path: 'contracts/menu/:pvtId',
              element: <ContractsPage />,
              children: [
                { path: 'new', element: <ContractDetailPage /> },
                { path: ':ctrId', element: <ContractDetailPage /> },
                { path: ':ctrId/edit', element: <ContractDetailPage /> }
              ]
            }
          ]
        },
        {
          path: 'billing',
          // Facturación (DEC-042), con el mismo patrón: alta, detalle y
          // edición en un modal con dirección propia sobre el listado. Los
          // menús son dinámicos (DEC-074): una sola ruta, con el tipo de
          // proveedor del menú.
          children: [
            {
              path: 'invoices/:pvtId',
              element: <InvoicesPage />,
              children: [
                { path: 'new', element: <InvoiceFormPage /> },
                { path: ':invId', element: <InvoiceDetailPage /> },
                { path: ':invId/edit', element: <InvoiceFormPage /> }
              ]
            },
            // Extractos de la obra (DEC-084): listado con su formulario y su reporte en diálogos.
            { path: 'statements', element: <StatementsPage /> }
          ]
        }
      ]
    }
  ]
};

export default MainRoutes;

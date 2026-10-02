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
const WorksPage = Loadable(lazy(() => import('views/work/works/WorksPage')));
const WorkDetailPage = Loadable(lazy(() => import('views/work/works/WorkDetailPage')));
const WorkFormPage = Loadable(lazy(() => import('views/work/works/WorkFormPage')));
const ProvidersPage = Loadable(lazy(() => import('views/work/providers/ProvidersPage')));
const ProviderDetailPage = Loadable(lazy(() => import('views/work/providers/ProviderDetailPage')));
const ProviderFormPage = Loadable(lazy(() => import('views/work/providers/ProviderFormPage')));
const ContractsPage = Loadable(lazy(() => import('views/work/contracts/ContractsPage')));
const ContractDetailPage = Loadable(lazy(() => import('views/work/contracts/ContractDetailPage')));
const ContractFormPage = Loadable(lazy(() => import('views/work/contracts/ContractFormPage')));

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
          children: [{ path: 'default', element: <DashboardDefault /> }]
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
            { path: 'contractTypes', element: <ContractTypePage /> }
          ]
        },
        {
          path: 'work',
          // Obras y proveedores (DEC-030, DEC-031): alta, detalle y edición
          // son rutas hijas del listado y se abren en un modal sobre él, con
          // dirección propia (DEC-034).
          children: [
            {
              path: 'works',
              element: <WorksPage />,
              children: [
                { path: 'new', element: <WorkFormPage /> },
                { path: ':wrkId', element: <WorkDetailPage /> },
                { path: ':wrkId/edit', element: <WorkFormPage /> }
              ]
            },
            {
              path: 'providers',
              element: <ProvidersPage />,
              children: [
                { path: 'new', element: <ProviderFormPage /> },
                { path: ':prvId', element: <ProviderDetailPage /> },
                { path: ':prvId/edit', element: <ProviderFormPage /> }
              ]
            },
            {
              // Contratos (DEC-035), con el mismo patrón.
              path: 'contracts',
              element: <ContractsPage />,
              children: [
                { path: 'new', element: <ContractFormPage /> },
                { path: ':ctrId', element: <ContractDetailPage /> },
                { path: ':ctrId/edit', element: <ContractFormPage /> }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export default MainRoutes;

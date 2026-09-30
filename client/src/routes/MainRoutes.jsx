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
const UsersPage    = Loadable(lazy(() => import('views/security/users/UsersPage')));

// admin routing
const IdentityDocumentPage = Loadable(lazy(() => import('views/admin/identityDocuments/IdentityDocumentPage')));
const ProviderTypePage = Loadable(lazy(() => import('views/admin/providerTypes/ProviderTypePage')));
const AddressTypePage = Loadable(lazy(() => import('views/admin/addressTypes/AddressTypePage')));
const InsurerPage = Loadable(lazy(() => import('views/admin/insurers/InsurerPage')));
const SupervisionTypePage = Loadable(lazy(() => import('views/admin/supervisionTypes/SupervisionTypePage')));
const ConstructionCompanyPage = Loadable(lazy(() => import('views/admin/constructionCompanies/ConstructionCompanyPage')));
const ContractTypePage = Loadable(lazy(() => import('views/admin/contractTypes/ContractTypePage')));
const WorksPage = Loadable(lazy(() => import('views/work/works/WorksPage')));

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
            { path: 'default', element: <DashboardDefault /> }
          ]
        },
        {
          path: 'security',
          children: [
            { path: 'profiles', element: <ProfilesPage /> },
            { path: 'users',    element: <UsersPage /> }
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
          children: [{ path: 'works', element: <WorksPage /> }]
        }
      ]
    }
  ]
};

export default MainRoutes;
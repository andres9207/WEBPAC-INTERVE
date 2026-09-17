import { lazy } from 'react';
import { Navigate } from 'react-router';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoute from './PrivateRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// security routing
const ProfilesPage = Loadable(lazy(() => import('views/security/profiles/ProfilePage')));
const UsersPage    = Loadable(lazy(() => import('views/security/users/UsersPage')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <PrivateRoute />,
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
        }
      ]
    }
  ]
};

export default MainRoutes;
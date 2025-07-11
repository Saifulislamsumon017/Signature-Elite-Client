import LogIn from '@/Authentication/LogIn/LogIn';
import Register from '@/Authentication/Register/Register';
import AuthLayout from '@/Layout/AuthLayout/AuthLayout';
import DashboardLayout from '@/Layout/DashboardLayout/DashboardLayout';
import MainLayout from '@/Layout/MainLayout/MainLayout';
import AllProperties from '@/Pages/AllProperties/AllProperties ';

import ErrorPage from '@/Pages/Error/ErrorPage';
import Home from '@/Pages/Home/Home';
import { createBrowserRouter } from 'react-router';
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';
import PropertyDetailsPage from '@/Pages/AllProperties/PropertyDetailsPage';
import WishlistPage from '@/Pages/WishListPage/WishlistPage';

export const Routes = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'all-properties',
        element: <AllProperties />,
      },
      {
        path: '/property/:id',
        element: (
          <PrivateRoutes>
            <PropertyDetailsPage />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: LogIn,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
      },

      {
        path: '/dashboard/wishlist',
        element: (
          <PrivateRoutes>
            <WishlistPage />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

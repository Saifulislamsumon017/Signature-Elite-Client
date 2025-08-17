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
import PaymentPage from '@/Pages/PaymentPage/PaymentPage';
import MakeOfferPage from '@/Pages/MakeOfferPage/MakeOfferPage';
import WishlistPage from '@/DashboardPages/UserDashboard/WishlistPage';
import Profile from '@/DashboardPages/ProfilePage/Profile';
import MyReviewsPage from '@/DashboardPages/UserDashboard/MyReviewsPage';
import AgentProfilePage from '@/DashboardPages/AgentDashboard/AgentProfilePage';
import AddPropertyPage from '@/DashboardPages/AgentDashboard/AddPropertyPage';
import AdminProfilePage from '@/DashboardPages/AdminDashboard/AdminProfilePage';
import ManagePropertiesPage from '@/DashboardPages/AdminDashboard/ManagePropertiesPage';
import ManageUsersPage from '@/DashboardPages/AdminDashboard/ManageUsersPage';
import AdvertisePropertyPage from '@/DashboardPages/AdminDashboard/AdvertisePropertyPage';
import MyOffersPage from '@/DashboardPages/UserDashboard/MyOffersPage';
import PaymentSuccessPage from '@/Pages/PaymentPage/PaymentSuccessPage';
import MySoldProperties from '@/DashboardPages/AgentDashboard/MySoldProperties';
import MyAddedPropertiesPage from '@/DashboardPages/AgentDashboard/MyAddedPropertiesPage';
import UpdatePropertyPage from '@/DashboardPages/AgentDashboard/UpdatePropertyPage';
import ManageReviewsPage from '@/DashboardPages/AdminDashboard/ManageReviewsPage';
import PropertyBoughtPage from '@/DashboardPages/UserDashboard/PropertyBoughtPage';
import RequestedOffersPage from '@/DashboardPages/AgentDashboard/RequestedOffersPage';
import AgentRoute from '../DashBoardRoute/AgentRoute';
import AdminRoute from '../DashBoardRoute/AdminRoute';
import Forbidden from '@/Pages/Error/Forbidden';
import Statistics from '@/DashboardPages/Statisticspage/Statistics';

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
        element: (
          <PrivateRoutes>
            <AllProperties />,
          </PrivateRoutes>
        ),
      },
      {
        path: '/property/:id',
        element: (
          <PrivateRoutes>
            <PropertyDetailsPage />
            //{' '}
          </PrivateRoutes>
        ),
      },

      {
        path: '/make-offer',
        element: (
          <PrivateRoutes>
            <MakeOfferPage />
          </PrivateRoutes>
        ),
      },

      {
        path: 'forbidden',
        Component: Forbidden,
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
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoutes>
            <Statistics />
          </PrivateRoutes>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        ),
      },
      {
        path: 'wishlist',
        element: (
          <PrivateRoutes>
            <WishlistPage />
          </PrivateRoutes>
        ),
      },
      {
        path: 'property-bought',
        element: (
          <PrivateRoutes>
            <PropertyBoughtPage />
          </PrivateRoutes>
        ),
      },

      {
        path: 'my-reviews',
        element: (
          <PrivateRoutes>
            <MyReviewsPage />
          </PrivateRoutes>
        ),
      },
      {
        path: 'my-offers',
        element: (
          <PrivateRoutes>
            <MyOffersPage />
          </PrivateRoutes>
        ),
      },

      {
        path: 'payment/:id',
        element: (
          <PrivateRoutes>
            <PaymentPage />
          </PrivateRoutes>
        ),
      },
      {
        path: 'payment-success',
        element: (
          <PrivateRoutes>
            <PaymentSuccessPage />
          </PrivateRoutes>
        ),
      },
      {
        path: 'agent-profile',
        element: (
          <PrivateRoutes>
            <AgentProfilePage />
          </PrivateRoutes>
        ),
      },
      {
        path: 'add-property',
        element: (
          <AgentRoute>
            <AddPropertyPage />
          </AgentRoute>
        ),
      },
      {
        path: 'my-properties',
        element: (
          <AgentRoute>
            <MyAddedPropertiesPage />
          </AgentRoute>
        ),
      },
      {
        path: 'update-property/:id',
        element: (
          <AgentRoute>
            <UpdatePropertyPage />
          </AgentRoute>
        ),
      },
      {
        path: 'my-sold-properties',
        element: (
          <AgentRoute>
            <MySoldProperties />
          </AgentRoute>
        ),
      },
      {
        path: 'requested-properties',
        element: (
          <AgentRoute>
            <RequestedOffersPage />
          </AgentRoute>
        ),
      },

      {
        path: 'admin-profile',
        element: (
          <PrivateRoutes>
            <AdminProfilePage />
          </PrivateRoutes>
        ),
      },
      {
        path: 'manage-properties',
        element: (
          <AdminRoute>
            <ManagePropertiesPage />
          </AdminRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <AdminRoute>
            <ManageUsersPage />
          </AdminRoute>
        ),
      },
      {
        path: 'manage-reviews',
        element: (
          <AdminRoute>
            <ManageReviewsPage />
          </AdminRoute>
        ),
      },
      {
        path: 'advertise-property',
        element: (
          <AdminRoute>
            <AdvertisePropertyPage />
          </AdminRoute>
        ),
      },
    ],
  },
]);

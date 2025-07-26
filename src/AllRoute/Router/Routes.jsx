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
import AgentRequestsPage from '@/DashboardPages/AgentDashboard/AgentRequestsPage';
import AdminProfilePage from '@/DashboardPages/AdminDashboard/AdminProfilePage';
import ManagePropertiesPage from '@/DashboardPages/AdminDashboard/ManagePropertiesPage';
import ManageUsersPage from '@/DashboardPages/AdminDashboard/ManageUsersPage';
import AdvertisePropertyPage from '@/DashboardPages/AdminDashboard/AdvertisePropertyPage';
import AgentOffersPage from '@/DashboardPages/AgentDashboard/AgentOffersPage';
import MyOffersPage from '@/DashboardPages/UserDashboard/MyOffersPage';
import PaymentSuccessPage from '@/Pages/PaymentPage/PaymentSuccessPage';
import MyBoughtProperties from '@/DashboardPages/UserDashboard/MyBoughtProperties';
import MySoldProperties from '@/DashboardPages/AgentDashboard/MySoldProperties';
import RequestedProperties from '@/DashboardPages/AgentDashboard/RequestedProperties';
import MyAddedPropertiesPage from '@/DashboardPages/AgentDashboard/MyAddedPropertiesPage';
import UpdatePropertyPage from '@/DashboardPages/AgentDashboard/UpdatePropertyPage';
import AdminManageReviewsPage from '@/DashboardPages/AdminDashboard/AdminManageReviewsPage';

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
          // <PrivateRoutes>
          <PropertyDetailsPage />
          // </PrivateRoutes>
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
            <MyBoughtProperties />
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
        path: 'payment/:offerId',
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
          <PrivateRoutes>
            <AddPropertyPage />
          </PrivateRoutes>
        ),
      },
      {
        path: 'my-properties',
        element: (
          <PrivateRoutes>
            <MyAddedPropertiesPage />
          </PrivateRoutes>
        ),
      },
      {
        path: 'update-property/:id',
        element: (
          <PrivateRoutes>
            <UpdatePropertyPage />
          </PrivateRoutes>
        ),
      },
      {
        path: 'my-sold-properties',
        element: (
          <PrivateRoutes>
            <MySoldProperties />
          </PrivateRoutes>
        ),
      },
      {
        path: 'requested-properties',
        element: (
          <PrivateRoutes>
            <RequestedProperties />
          </PrivateRoutes>
        ),
      },
      {
        path: 'agent-offers',
        element: <AgentOffersPage />,
        // Add private/role-based route guards as needed
      },

      {
        path: 'agent-requests',
        element: (
          <PrivateRoutes>
            <AgentRequestsPage />
          </PrivateRoutes>
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
          <PrivateRoutes>
            <ManagePropertiesPage />
          </PrivateRoutes>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoutes>
            <ManageUsersPage />
          </PrivateRoutes>
        ),
      },
      {
        path: 'manage-reviews',
        element: (
          <PrivateRoutes>
            <AdminManageReviewsPage />
          </PrivateRoutes>
        ),
      },
      {
        path: 'advertise-property',
        element: (
          <PrivateRoutes>
            <AdvertisePropertyPage />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

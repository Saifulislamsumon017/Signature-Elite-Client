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
import PropertyBoughtPage from '@/DashboardPages/UserDashboard/PropertyBoughtPage ';
import Profile from '@/DashboardPages/ProfilePage/Profile';
import MyReviewsPage from '@/DashboardPages/UserDashboard/MyReviewsPage';
import AgentProfilePage from '@/DashboardPages/AgentDashboard/AgentProfilePage';
import AddPropertyPage from '@/DashboardPages/AgentDashboard/AddPropertyPage';
import MyPropertiesPage from '@/DashboardPages/AgentDashboard/MyPropertiesPage';
import PropertyUpdatePage from '@/DashboardPages/AgentDashboard/PropertyUpdatePage';
import MySoldPropertiesPage from '@/DashboardPages/AgentDashboard/MySoldPropertiesPage';
import RequestedOffersPage from '@/DashboardPages/AgentDashboard/RequestedOffersPage';
import AgentRequestsPage from '@/DashboardPages/AgentDashboard/AgentRequestsPage';
import AdminProfilePage from '@/DashboardPages/AdminDashboard/AdminProfilePage';
import ManagePropertiesPage from '@/DashboardPages/AdminDashboard/ManagePropertiesPage';
import ManageUsersPage from '@/DashboardPages/AdminDashboard/ManageUsersPage';
import ManageReviewsPage from '@/DashboardPages/AdminDashboard/ManageReviewsPage';
import AdvertisePropertyPage from '@/DashboardPages/AdminDashboard/AdvertisePropertyPage';
import MyOffersPage from '@/DashboardPages/UserDashboard/MyOffersPage';
import AgentOffersPage from '@/DashboardPages/AgentDashboard/AgentOffersPage';

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
        index: true,
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
        path: 'make-offer/:id',
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
            <MyPropertiesPage />
          </PrivateRoutes>
        ),
      },
      {
        path: 'update-property/:id',
        element: (
          <PrivateRoutes>
            <PropertyUpdatePage />
          </PrivateRoutes>
        ),
      },
      {
        path: 'my-sold-properties',
        element: (
          <PrivateRoutes>
            <MySoldPropertiesPage />
          </PrivateRoutes>
        ),
      },
      {
        path: 'requested-properties',
        element: (
          <PrivateRoutes>
            <RequestedOffersPage />
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
            <ManageReviewsPage />
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

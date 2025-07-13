import useAuth from '@/hooks/useAuth';
import useUserRole from '@/hooks/useUserRole';
import LoadingSpinner from '@/SheardComponents/LoadingSpinner';
import React from 'react';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <LoadingSpinner />;
  }

  if (!user || role !== 'admin') {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  }

  return children;
};

export default AdminRoute;

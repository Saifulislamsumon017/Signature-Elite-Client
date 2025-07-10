import useAuth from '@/hoocks/useAuth';
import React from 'react';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return;
  }

  if (!user) {
    return <Navigate to="/logIn" state={location.pathname}></Navigate>;
  }

  return children;
};

export default PrivateRoutes;

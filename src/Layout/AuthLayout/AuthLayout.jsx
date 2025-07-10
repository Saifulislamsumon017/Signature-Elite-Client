import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster position="top-right" duration={4000} />
    </>
  );
};

export default AuthLayout;

import React from 'react';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default DashboardLayout;

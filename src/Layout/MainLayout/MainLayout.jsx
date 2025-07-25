import Navbar from '@/SheardComponents/Navbar';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
        <Toaster />
      </main>
      <footer></footer>
    </>
  );
};

export default MainLayout;

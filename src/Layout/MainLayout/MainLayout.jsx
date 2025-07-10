import Navbar from '@/SheardComponents/Navbar';
import React from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default MainLayout;

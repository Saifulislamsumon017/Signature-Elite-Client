import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router';
import { Routes } from './AllRoute/Router/Routes';
import AuthProvider from './Context/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Routes}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);

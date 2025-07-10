import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router';
import { Routes } from './AllRoute/Router/Routes';
import AuthProvider from './Context/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Aos from 'aos';

Aos.init();
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={Routes}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

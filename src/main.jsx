import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router';
import { Routes } from './AllRoute/Router/Routes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Routes}></RouterProvider>
  </StrictMode>
);

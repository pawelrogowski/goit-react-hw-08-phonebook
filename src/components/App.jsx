import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Notification from './Notification/Notification';
import Auth from './Auth/Auth';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';

const Register = lazy(() => import('./Register/Register'));

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/*"
          element={
            <Auth>
              <Outlet />
            </Auth>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Register />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Notification />
    </div>
  );
}

export default App;

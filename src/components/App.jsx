import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Header from './Header/Header';
import Notification from './Notification/Notification';
import Auth from './Auth/Auth';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';

const Register = lazy(() => import('./Register/Register'));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#c531b9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
}

export default App;

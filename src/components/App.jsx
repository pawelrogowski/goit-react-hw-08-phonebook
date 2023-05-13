import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Header from './Header/Header';
import Notification from './Notification/Notification';
import Auth from './Auth/Auth';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import eventEmitter from 'eventEmiter';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'redux/features/auth/authSlice';

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
      paper: '#000000',
    },
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const onLogout = () => {
      dispatch(logoutUser());
    };

    eventEmitter.on('logout', onLogout);

    return () => {
      eventEmitter.off('logout', onLogout);
    };
  }, [dispatch]);

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

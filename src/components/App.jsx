import { Route, Routes, Navigate, Outlet, useNavigate } from 'react-router-dom';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import Register from './Register/Register';
import Login from './Login/Login';
import styles from './app.module.css';
import Header from './Header/Header';
import Notification from './Notification/Notification';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Auth from './Auth/Auth';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Routes>
        <Route
          path="/auth/*"
          element={
            <Auth>
              <Outlet />
            </Auth>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
      <Notification />
    </div>
  );
}

export default App;

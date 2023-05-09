import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import Login from '../Login/Login';
import styles from '../app.module.css';

function Auth() {
  const user = useSelector(state => state.auth.user);

  if (!user) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/contacts" />} />
      <Route path="/login" element={<Navigate to="/contacts" />} />
      <Route
        path="/contacts"
        element={
          <>
            <div className={styles.phonebook}>
              <ContactForm />
            </div>
            <div className={styles.contacts}>
              <Filter />
              <ContactList />
            </div>
          </>
        }
      />
    </Routes>
  );
}

export default Auth;

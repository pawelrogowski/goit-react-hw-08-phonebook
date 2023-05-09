import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import Login from '../Login/Login';

function Auth() {
  const user = useSelector(state => state.auth.user);

  if (!user) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/goit-react-hw-08-phonebook/" element={<Navigate to="/contacts" />} />
      <Route
        path="/contacts"
        element={
          <>
            <div>
              <ContactForm />
            </div>
            <div>
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

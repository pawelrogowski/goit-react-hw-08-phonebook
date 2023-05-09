import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import Navigation from './Navigation/Navigation';
import Register from './Register/Register';
import Login from './Login/Login';
import UserMenu from './UserMenu/UserMenu';
import styles from './app.module.css';

function App() {
  return (
    <Router>
      <div className={styles.container}>
        <Navigation />
        <UserMenu />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
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
          <Route path="*" element={<Navigate to="/contacts" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

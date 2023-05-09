import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Register from './Register/Register';
import styles from './app.module.css';
import Header from './Header/Header';
import Notification from './Notification/Notification';
import Auth from './Auth/Auth';

function App() {
  return (
    <div className={styles.container}>
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
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Notification />
    </div>
  );
}

export default App;

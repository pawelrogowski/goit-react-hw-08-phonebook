import { NavLink } from 'react-router-dom';
// import styles from './navigation.module.css';

const Navigation = () => (
  <nav>
    <NavLink to="/register">Register</NavLink>
    <NavLink to="/login">Login</NavLink>
    <NavLink to="/contacts">Contacts</NavLink>
  </nav>
);

export default Navigation;

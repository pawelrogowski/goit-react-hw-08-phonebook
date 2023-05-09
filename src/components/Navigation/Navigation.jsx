import { NavLink } from 'react-router-dom';
import { Container, Box, Link } from '@mui/material';

const Navigation = () => (
  <Container maxWidth="sm">
    <Box component="nav" sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
      <Link component={NavLink} to="/register" color="inherit" underline="hover">
        Register
      </Link>
      <Link component={NavLink} to="/login" color="inherit" underline="hover">
        Login
      </Link>
      <Link component={NavLink} to="/contacts" color="inherit" underline="hover">
        Contacts
      </Link>
    </Box>
  </Container>
);

export default Navigation;

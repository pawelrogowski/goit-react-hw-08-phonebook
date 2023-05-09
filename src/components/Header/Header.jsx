import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from 'redux/features/auth/authSlice';
import { clearContacts } from 'redux/features/contacts/contactsSlice';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Link, Button } from '@mui/material';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearContacts());
    navigate('/login');
  };

  const activeLinkStyle = {
    textDecoration: 'underline',
    textDecorationThickness: '2px',
    textDecorationColor: 'currentColor',
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="nav"
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 2,
        }}
      >
        {user ? (
          <Link component="span" color="inherit" underline="none">
            {user.email}
          </Link>
        ) : (
          <Link
            component={NavLink}
            to="/register"
            color="inherit"
            underline="hover"
            activeStyle={activeLinkStyle}
          >
            Register
          </Link>
        )}
        {user ? (
          <Button
            variant="text"
            color="inherit"
            onClick={handleLogout}
            activeStyle={activeLinkStyle}
          >
            Logout
          </Button>
        ) : (
          <Link
            component={NavLink}
            to="/login"
            color="inherit"
            underline="hover"
            activeStyle={activeLinkStyle}
          >
            Login
          </Link>
        )}
      </Box>
    </Container>
  );
};

export default Header;

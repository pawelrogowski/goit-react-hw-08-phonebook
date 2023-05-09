import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from 'redux/features/auth/authSlice';
import { clearContacts } from 'redux/features/contacts/contactsSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearContacts());
    navigate('/login');
  };

  return user ? (
    <Box>
      <Typography>{user.email}</Typography>
      <Button variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  ) : null;
};

export default UserMenu;

import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from 'redux/features/auth/authSlice';
import { clearContacts } from 'redux/features/contacts/contactsSlice';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <p>{user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : null;
};

export default UserMenu;

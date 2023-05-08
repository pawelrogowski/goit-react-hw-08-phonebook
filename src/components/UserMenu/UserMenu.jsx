import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from 'redux/features/auth/authSlice';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <p>{user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;

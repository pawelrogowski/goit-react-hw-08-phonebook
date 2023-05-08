import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';
import contactsReducer from './features/contacts/contactsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contacts: contactsReducer,
  },
});

export default store;

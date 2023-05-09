import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';
import contactsReducer from './features/contacts/contactsSlice';
import notificationReducer from './features/notification/notificationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contacts: contactsReducer,
    notification: notificationReducer,
  },
});

export default store;

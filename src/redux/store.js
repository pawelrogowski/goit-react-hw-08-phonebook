import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactSlice';
import thunkMiddleware from 'redux-thunk';

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
  middleware: [thunkMiddleware],
});

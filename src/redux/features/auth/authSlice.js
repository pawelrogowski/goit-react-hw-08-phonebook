import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api';

export const registerUser = createAsyncThunk('auth/registerUser', async userData => {
  const response = await axiosInstance.post('/users/signup', userData);
  localStorage.setItem('token', response.data.token);
  return response.data.user;
});

export const loginUser = createAsyncThunk('auth/loginUser', async userData => {
  const response = await axiosInstance.post('/users/login', userData);
  localStorage.setItem('token', response.data.token);
  return response.data.user;
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  localStorage.removeItem('token');
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  extraReducers: builder => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    // Add more cases for other action types
  },
});

export default authSlice.reducer;

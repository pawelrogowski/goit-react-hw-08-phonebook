import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api';

export const fetchCurrentUser = createAsyncThunk('user/fetchCurrentUser', async () => {
  const response = await axiosInstance.get('/users/current');
  return response.data;
});

export const updateUser = createAsyncThunk('user/updateUser', async userData => {
  const response = await axiosInstance.patch('/users/current', userData);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    status: 'idle',
    error: null,
  },
  extraReducers: builder => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    // Add more cases for other action types
  },
});

export default userSlice.reducer;

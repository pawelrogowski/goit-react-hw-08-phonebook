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
    builder
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        alert('200: Information found.'); // Add browser alert for code 200
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
        if (action.error.code === 401) {
          alert('401: Missing header with authorization token.'); // Add browser alert for code 401
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        alert('200: The contact was successfully updated.'); // Add browser alert for code 200
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        if (action.error.code === 400) {
          alert('400: Contact update failed.'); // Add browser alert for code 400
        } else if (action.error.code === 401) {
          alert('401: Missing header with authorization token.'); // Add browser alert for code 401
        }
      });
  },
});

export default userSlice.reducer;

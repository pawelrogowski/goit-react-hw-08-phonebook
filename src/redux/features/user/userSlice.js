import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api';
import { showNotification } from '../notification/notificationSlice';

export const fetchCurrentUser = createAsyncThunk('user/fetchCurrentUser', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get('/users/current');
    thunkAPI.dispatch(showNotification('Information found.'));
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(showNotification('Error fetching current user.'));
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async (userData, thunkAPI) => {
  try {
    const response = await axiosInstance.patch('/users/current', userData);
    thunkAPI.dispatch(showNotification('The contact was successfully updated.'));
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(showNotification('Error updating contact.'));
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  extraReducers: builder => {
    builder
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

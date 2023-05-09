import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showNotification } from '../notification/notificationSlice';
import axiosInstance from '../../api';

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/users/signup', userData);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    thunkAPI.dispatch(showNotification('Account Creation Successful'));
    return response.data.user;
  } catch (error) {
    if (error.response.data.code === 11000) {
      thunkAPI.dispatch(showNotification('The email is already registered.'));
      return thunkAPI.rejectWithValue('The email is already registered.');
    }
    thunkAPI.dispatch(showNotification('Error Creating a user'));
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/users/login', userData);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    thunkAPI.dispatch(showNotification('Successfully Logged In.'));
    return response.data.user;
  } catch (error) {
    thunkAPI.dispatch(showNotification('Login error.'));
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (arg, thunkAPI) => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    thunkAPI.dispatch(showNotification('Successfully Logged Out.'));
  } catch (error) {
    thunkAPI.dispatch(showNotification('Error Logging Out.'));
    return thunkAPI.rejectWithValue(error.message);
  }
});

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getUserFromLocalStorage(),
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.status = 'idle';
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showNotification } from '../notification/notificationSlice';
import axiosInstance from '../../api';

const handleAuthLocalStorage = (token, user) => {
  if (token && user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/users/signup', userData);
    handleAuthLocalStorage(response.data.token, response.data.user);
    thunkAPI.dispatch(showNotification('Account Creation Successful'));
    return response.data.user;
  } catch (error) {
    const errorMessage =
      error.response.data.code === 11000
        ? 'The email is already registered.'
        : 'Error Creating a user';
    thunkAPI.dispatch(showNotification(errorMessage));
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/users/login', userData);
    handleAuthLocalStorage(response.data.token, response.data.user);
    thunkAPI.dispatch(showNotification('Successfully Logged In.'));
    return response.data.user;
  } catch (error) {
    thunkAPI.dispatch(showNotification('Login error.'));
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (arg, thunkAPI) => {
  try {
    handleAuthLocalStorage(null, null);
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

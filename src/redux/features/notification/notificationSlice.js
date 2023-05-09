import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    open: false,
  },
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload;
      state.open = true;
    },
    closeNotification: state => {
      state.open = false;
    },
  },
});

export const { showNotification, closeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

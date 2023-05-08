import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await axiosInstance.get('/contacts');
  return response.data;
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact, { getState }) => {
  try {
    const state = getState();
    const existingContact = state.contacts.contacts.find(c => c.phone === contact.phone);
    if (existingContact) {
      alert(`Contact with phone number \${contact.phone} already exists`);
      return;
    }

    const response = await axiosInstance.post('/contacts', contact);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async contactId => {
  try {
    await axiosInstance.delete(`/contacts/\${contactId}`);
    return contactId;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    searchTerm: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });
    // Add more cases for other action types
  },
});

export const { setSearchTerm } = contactsSlice.actions;

export default contactsSlice.reducer;

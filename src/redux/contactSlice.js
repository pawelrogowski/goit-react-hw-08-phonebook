import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiEndpoint = 'https://644bb9ef4bdbc0cc3a98d0ff.mockapi.io/contacts';
const initialState = {
  contacts: [],
  searchTerm: '',
  status: 'idle',
  error: null,
};

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await axios.get(apiEndpoint);
  return response.data;
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact, { getState }) => {
  try {
    const state = getState();
    const existingContact = state.contacts.contacts.find(c => c.phone === contact.phone);
    if (existingContact) {
      alert(`Contact with phone number ${contact.phone} already exists`);
      return;
    }

    const response = await axios.post(apiEndpoint, contact);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async contactId => {
  try {
    await axios.delete(`${apiEndpoint}/${contactId}`);
    return contactId;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContact.pending, state => {
        state.status = 'loading';
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.contacts.push(action.payload);
        }
      })
      .addCase(addContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteContact.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.contacts.findIndex(contact => contact.id === action.payload);
        if (index !== -1) {
          state.contacts.splice(index, 1);
        }
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { setSearchTerm } = contactSlice.actions;

export default contactSlice.reducer;

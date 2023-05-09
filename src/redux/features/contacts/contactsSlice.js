import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await axiosInstance.get('/contacts');
  return response.data;
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact, { getState }) => {
  try {
    const state = getState();
    const existingContact = state.contacts.contacts.find(c => c.number === contact.number);
    if (existingContact) {
      alert(`Contact with phone number ${contact.number} already exists`);
      return;
    }

    const response = await axiosInstance.post('/contacts', {
      name: contact.name,
      number: contact.number,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async contactId => {
  try {
    await axiosInstance.delete(`/contacts/${contactId}`);
    return contactId;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async (contactId, contactData) => {
    try {
      const response = await axiosInstance.patch(`/contacts/${contactId}`, contactData);
      return { contactId, contactData: response.data };
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

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
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        // alert('Contacts found.');
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.error = action.payload;
        if (action.error.code === 401) {
          alert('401: Missing header with authorization token.');
        } else if (action.error.code === 404) {
          alert('404: There is no such user collection.');
        } else if (action.error.code === 500) {
          alert('500: Server error.');
        }
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        alert('201: The contact was successfully created.');
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.payload;
        if (action.error.code === 400) {
          alert('400: Error creating contact.');
        } else if (action.error.code === 401) {
          alert('401: Missing header with authorization token.');
        }
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact._id !== action.payload);
        alert('200: The contact was successfully deleted.');
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.error = action.payload;
        if (action.error.code === 401) {
          alert('401: Missing header with authorization token.');
        } else if (action.error.code === 404) {
          alert('404: There is no such user collection.');
        } else if (action.error.code === 500) {
          alert('500: Server error.');
        }
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const indexToUpdate = state.contacts.findIndex(
          contact => contact._id === action.payload.contactId
        );
        if (indexToUpdate >= 0) {
          state.contacts[indexToUpdate] = action.payload.contactData;
        }
        alert('200: The contact was successfully updated.');
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.error = action.payload;
        if (action.error.code === 400) {
          alert('400: Contact update failed.');
        } else if (action.error.code === 401) {
          alert('401: Missing header with authorization token.');
        }
      });
  },
});

export const { setSearchTerm } = contactsSlice.actions;

export default contactsSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api';
import { showNotification } from '../notification/notificationSlice';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await axiosInstance.get('/contacts');
  return response.data;
});

const handleNotification = (thunkAPI, message) => {
  thunkAPI.dispatch(showNotification(message));
};

export const addContact = createAsyncThunk('contacts/addContact', async (contact, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/contacts', {
      name: contact.name,
      number: contact.number,
    });
    handleNotification(thunkAPI, 'The contact was successfully created.');
    return response.data;
  } catch (error) {
    handleNotification(thunkAPI, 'Error creating contact.');
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await axiosInstance.delete(`/contacts/${contactId}`);
      handleNotification(thunkAPI, 'The contact was successfully deleted.');
      return contactId;
    } catch (error) {
      handleNotification(thunkAPI, 'Error deleting contact.');
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ contactId, contactData }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/contacts/${contactId}`, contactData);
      handleNotification(thunkAPI, 'The contact was successfully updated.');
      return { contactId, contactData: response.data };
    } catch (error) {
      handleNotification(thunkAPI, 'Error updating contact.');
      return thunkAPI.rejectWithValue(error.response.data.message);
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
    clearContacts: state => {
      state.contacts = [];
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const indexToUpdate = state.contacts.findIndex(
          contact => contact._id === action.payload.contactId
        );
        if (indexToUpdate >= 0) {
          state.contacts[indexToUpdate] = action.payload.contactData;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, clearContacts } = contactsSlice.actions;

export default contactsSlice.reducer;

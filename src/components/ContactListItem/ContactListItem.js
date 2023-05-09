import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact, updateContact } from 'redux/features/contacts/contactsSlice';
import {
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchContacts } from 'redux/features/contacts/contactsSlice';

function ContactListItem({ contact }) {
  const dispatch = useDispatch();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(contact.name);
  const [updatedNumber, setUpdatedNumber] = useState(contact.number);
  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const validateName = name => {
    const namePattern = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
    return namePattern.test(name);
  };

  const validateNumber = number => {
    const numberPattern =
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
    return numberPattern.test(number);
  };

  const handleUpdateSubmit = () => {
    if (validateName(updatedName) && validateNumber(updatedNumber)) {
      dispatch(
        updateContact({
          contactId: contact.id,
          contactData: { name: updatedName, number: updatedNumber },
        })
      ).then(() => {
        // Force an update of the contacts list
        dispatch(fetchContacts());
      });
      setEditDialogOpen(false);
    }
  };

  return (
    <>
      <ListItem>
        <ListItemText primary={contact.name} secondary={contact.number} />
        <ListItemSecondaryAction>
          <IconButton edge="end" color="info" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={updatedName}
            onChange={e => {
              setUpdatedName(e.target.value);
              setNameError(!validateName(e.target.value));
            }}
            error={nameError}
            helperText={
              nameError ? 'Name may contain only letters, apostrophe, dash and spaces.' : ''
            }
            required
          />
          <TextField
            margin="dense"
            label="Number"
            type="text"
            fullWidth
            value={updatedNumber}
            onChange={e => {
              setUpdatedNumber(e.target.value);
              setNumberError(!validateNumber(e.target.value));
            }}
            error={numberError}
            helperText={
              numberError
                ? 'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
                : ''
            }
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSubmit} color="primary" disabled={nameError || numberError}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ContactListItem;

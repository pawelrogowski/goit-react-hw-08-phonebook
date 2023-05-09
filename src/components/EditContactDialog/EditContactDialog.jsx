import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

function validateName(name) {
  const namePattern = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я])*$/;
  return namePattern.test(name);
}

function validateNumber(number) {
  const numberPattern =
    /^\+?\d{1,4}?[-.\s]?(\(?\d{1,3}?\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  return numberPattern.test(number);
}

function EditContactDialog({ open, onClose, contact, onUpdate }) {
  const [updatedName, setUpdatedName] = useState(contact.name);
  const [updatedNumber, setUpdatedNumber] = useState(contact.number);
  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);

  const handleUpdateSubmit = () => {
    if (validateName(updatedName) && validateNumber(updatedNumber)) {
      onUpdate(updatedName, updatedNumber);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateSubmit} color="primary" disabled={nameError || numberError}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditContactDialog.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.any,
    number: PropTypes.any,
  }),
  onClose: PropTypes.any,
  onUpdate: PropTypes.func,
  open: PropTypes.any,
};

export default EditContactDialog;

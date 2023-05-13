import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, fetchContacts } from 'redux/features/contacts/contactsSlice';
import { TextField, Button, Box, Container, FormControl, Collapse } from '@mui/material';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const nameInputRef = useRef();

  useEffect(() => {
    if (showForm) {
      nameInputRef.current.focus();
    }
  }, [showForm]);

  const validateName = name => {
    const namePattern = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
    return namePattern.test(name);
  };

  const validateNumber = number => {
    const numberPattern =
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
    return numberPattern.test(number);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (validateName(name) && validateNumber(number)) {
      try {
        await dispatch(addContact({ name, number }));
        dispatch(fetchContacts());
      } catch (error) {
        console.error('Error adding contact:', error);
      }
      setName('');
      setNumber('');
      setShowForm(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(!showForm)}
        sx={{ mt: 2 }}
        fullWidth
      >
        {showForm ? 'Hide Form' : 'New Contact'}
      </Button>
      <Collapse in={showForm} timeout={300}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <FormControl fullWidth>
            <TextField
              label="Name"
              variant="outlined"
              type="text"
              placeholder="Name"
              name="name"
              required
              value={name}
              inputRef={nameInputRef}
              onChange={e => {
                setName(e.target.value);
                setNameError(!validateName(e.target.value));
              }}
              margin="normal"
              error={nameError}
              helperText={
                nameError ? 'Name may contain only letters, apostrophe, dash and spaces.' : ''
              }
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Number"
              variant="outlined"
              type="tel"
              placeholder="Number"
              name="number"
              required
              value={number}
              onChange={e => {
                setNumber(e.target.value);
                setNumberError(!validateNumber(e.target.value));
              }}
              margin="normal"
              error={numberError}
              helperText={
                numberError
                  ? 'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
                  : ''
              }
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
            fullWidth
            disabled={nameError || numberError}
          >
            Add Contact
          </Button>
        </Box>
      </Collapse>
    </Container>
  );
}

export default ContactForm;

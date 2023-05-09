import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, fetchContacts } from 'redux/features/contacts/contactsSlice';
import { TextField, Button, Box, Container, FormControl } from '@mui/material';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(addContact({ name, number }));
      dispatch(fetchContacts());
    } catch (error) {
      console.error('Error adding contact:', error);
    }
    setName('');
    setNumber('');
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <FormControl fullWidth>
          <TextField
            label="Name"
            variant="outlined"
            type="text"
            placeholder="Name"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            margin="normal"
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Number"
            variant="outlined"
            type="tel"
            placeholder="Number"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            required
            value={number}
            onChange={e => setNumber(e.target.value)}
            margin="normal"
          />
        </FormControl>
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }} fullWidth>
          Add Contact
        </Button>
      </Box>
    </Container>
  );
}

export default ContactForm;

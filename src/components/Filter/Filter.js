import { useDispatch } from 'react-redux';
import { setSearchTerm } from 'redux/features/contacts/contactsSlice';
import { TextField, Container } from '@mui/material';

export const Filter = () => {
  const dispatch = useDispatch();

  const handleInputChange = e => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <Container maxWidth="sm">
      <TextField
        label="Find contacts by name"
        variant="outlined"
        fullWidth
        inputProps={{
          pattern: "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
          title:
            "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
        }}
        onChange={handleInputChange}
      />
    </Container>
  );
};

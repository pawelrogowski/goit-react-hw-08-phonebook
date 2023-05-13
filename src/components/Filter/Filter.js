import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from 'redux/features/contacts/contactsSlice';
import { TextField, Container, Box, Collapse, Button } from '@mui/material';

export const Filter = () => {
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    if (showFilter) {
      inputRef.current.focus();
    }
  }, [showFilter]);

  const handleInputChange = e => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <Container maxWidth="sm">
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowFilter(!showFilter)}
        sx={{ mt: 4 }}
        fullWidth
      >
        {showFilter ? 'Hide Search' : 'Search'}
      </Button>
      <Collapse in={showFilter} timeout={300}>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Find contacts by name"
            variant="outlined"
            fullWidth
            inputRef={inputRef}
            inputProps={{
              pattern: "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
              title:
                "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
            }}
            onChange={handleInputChange}
          />
        </Box>
      </Collapse>
    </Container>
  );
};

import { useSelector, useDispatch } from 'react-redux';
import ContactListItem from '../ContactListItem/ContactListItem';
import { List, Box, CircularProgress, Container } from '@mui/material';

function ContactList() {
  const contacts = useSelector(state => state.contacts.contacts);
  const searchTerm = useSelector(state => state.contacts.searchTerm);
  const status = useSelector(state => state.contacts.status);
  const dispatch = useDispatch();

  const filteredContacts =
    contacts &&
    contacts.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 3 }}>
        {status === 'loading' ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {filteredContacts.map(contact => (
              <ContactListItem key={contact.id} contact={contact} />
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}

export default ContactList;

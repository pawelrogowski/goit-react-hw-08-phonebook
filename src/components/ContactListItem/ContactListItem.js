import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/features/contacts/contactsSlice';
import { ListItem, ListItemText, IconButton, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ContactListItem({ contact }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <ListItem>
      <ListItemText primary={contact.name} secondary={contact.number} />
      <ListItemSecondaryAction>
        <IconButton edge="end" color="error" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default ContactListItem;

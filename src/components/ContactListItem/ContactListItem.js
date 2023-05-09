import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact, updateContact, fetchContacts } from 'redux/features/contacts/contactsSlice';
import { ListItem, ListItemText, IconButton, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditContactDialog from '../EditContactDialog/EditContactDialog';

function ContactListItem({ contact }) {
  const dispatch = useDispatch();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleUpdateSubmit = (updatedName, updatedNumber) => {
    dispatch(
      updateContact({
        contactId: contact.id,
        contactData: { name: updatedName, number: updatedNumber },
      })
    ).then(() => {
      dispatch(fetchContacts());
    });
    setEditDialogOpen(false);
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
      <EditContactDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        contact={contact}
        onUpdate={handleUpdateSubmit}
      />
    </>
  );
}

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.any,
    number: PropTypes.any,
  }),
};

export default ContactListItem;

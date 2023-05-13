import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact, updateContact, fetchContacts } from 'redux/features/contacts/contactsSlice';
import {
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Collapse,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditContactDialog from '../EditContactDialog/EditContactDialog';

function ContactListItem({ contact }) {
  const dispatch = useDispatch();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      setIsExpanded(true);
    }
  }, []);

  const handleDelete = () => {
    setIsExpanded(false);
    setTimeout(() => {
      dispatch(deleteContact(contact.id));
    }, 300);
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleUpdateSubmit = (updatedName, updatedNumber) => {
    setIsExpanded(false);
    setTimeout(() => {
      dispatch(
        updateContact({
          contactId: contact.id,
          contactData: { name: updatedName, number: updatedNumber },
        })
      ).then(() => {
        dispatch(fetchContacts());
      });
      setIsExpanded(true);
    }, 300);
    setEditDialogOpen(false);
  };

  return (
    <>
      <Collapse in={isExpanded}>
        <ListItem>
          <IconButton edge="start" color="info" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <ListItemText primary={contact.name} secondary={contact.number} />
          <ListItemSecondaryAction>
            <IconButton edge="end" color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Collapse>
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

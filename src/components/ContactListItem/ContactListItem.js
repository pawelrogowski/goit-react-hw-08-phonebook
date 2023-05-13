import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact, updateContact, fetchContacts } from 'redux/features/contacts/contactsSlice';
import { ListItem, ListItemText, Button, ListItemSecondaryAction, Collapse } from '@mui/material';
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
          <ListItemText primary={contact.name} secondary={contact.number} />
          <ListItemSecondaryAction>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEdit}
              sx={{
                minWidth: 48,
                minHeight: 48,
                mr: 1,
                borderRadius: 1,
              }}
            >
              <EditIcon />
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              sx={{
                minWidth: 48,
                minHeight: 48,
                borderRadius: 1,
              }}
            >
              <DeleteIcon />
            </Button>
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

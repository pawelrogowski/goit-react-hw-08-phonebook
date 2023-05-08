import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/features/contacts/contactsSlice';
import styles from './contactListItem.module.css';

function ContactListItem({ contact }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <li className={styles['item']}>
      <button className={styles['delete-button']} type="button" onClick={handleDelete}>
        ❌
      </button>
      <span>
        {contact.name}: {contact.phone}
      </span>
    </li>
  );
}

export default ContactListItem;

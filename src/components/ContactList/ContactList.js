import { useSelector, useDispatch } from 'react-redux';
import ContactListItem from '../ContactListItem/ContactListItem';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contactSlice';
import styles from './contactList.module.css';

function ContactList() {
  const contacts = useSelector(state => state.contacts.contacts);
  const searchTerm = useSelector(state => state.contacts.searchTerm);
  const status = useSelector(state => state.contacts.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts =
    contacts &&
    contacts.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={styles.container}>
      {status === 'loading' ? (
        <div className={styles.spinner}></div>
      ) : (
        <ul className={styles.list}>
          {filteredContacts.map(contact => (
            <ContactListItem key={contact.id} contact={contact} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactList;

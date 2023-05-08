import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm />
      </div>

      <div className={styles.contacts}>
        <h2>Contacts</h2>
        <Filter />

        <ContactList />
      </div>
    </div>
  );
}

export default App;

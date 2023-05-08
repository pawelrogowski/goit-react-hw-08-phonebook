import { useDispatch } from 'react-redux';
import { setSearchTerm } from 'redux/features/contacts/contactsSlice';
import styles from './filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();

  const handleInputChange = e => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div>
      <label className={styles['label']}>
        Find contacts by name:
        <input
          className={styles['filter-input']}
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
};

import styles from './ContactList.module.css';
import ContactListItem from './ContactListItem/ContactListItem';
import { deleteContact, getContacts } from 'redux/contactsSlice';
import { getFilter } from 'redux/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';

const ContactList = () => {
  // const contacts = useSelector(state => state.items);
  // const filter = useSelector(state => state.filter);

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const makeFilteredMarkup = () => {
    const lowerCaseFilter = filter.toLocaleLowerCase();
    const filteredArray = [...contacts].filter(contact =>
      contact.name.toLocaleLowerCase().includes(lowerCaseFilter)
    );
    return filteredArray;
  };

  const filteredArray = makeFilteredMarkup();

  if (filteredArray.length === 0) {
    return <p className={styles.emptyFilter}>No contact with this name</p>;
  }
  return (
    <ul className={styles.list}>
      {filteredArray.map(({ id, name, number }) => (
        <li key={id} className={styles.item}>
          <ContactListItem
            id={id}
            name={name}
            number={number}
            onClick={() => dispatch(deleteContact(id))}
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

import styles from './ContactForm.module.css';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleChange = event => {
    switch (event.currentTarget.name) {
      case 'name':
        setName(event.currentTarget.value);
        break;
      case 'number':
        setNumber(event.currentTarget.value);
        break;
      default:
        throw new Error('Worng state type!');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    // For deal array of contacts in lower case
    const allContacts = contacts.reduce((acc, contact) => {
      acc.push(contact.name.toLocaleLowerCase());
      return acc;
    }, []);

    // Check if the contact is already in the contact list
    if (allContacts.includes(name.toLocaleLowerCase())) {
      alert(`${name} already in contacts.`);
      return;
    }

    const contactData = { id: nanoid(), name, number };

    dispatch(addContact(contactData));
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <label htmlFor="name" className={styles.label}>
          Name:
        </label>
        <input
          className={styles.inputName}
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className={styles.wrapper}>
        <label htmlFor="number" className={styles.label}>
          Number:
        </label>
        <input
          className={styles.inputNumber}
          onChange={handleChange}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button type="submit" className={styles.addBtn}>
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;

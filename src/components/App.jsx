import ContactForm from './ContactForm';
import ContactList from './ContactList';
import EmptyMessage from './EmptyMessage';
import Filter from './Filter';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/contactsSlice';

export function App() {
  const contacts = useSelector(getContacts);
  console.log(contacts);

  return (
    <div className="wrapper">
      <div className="header-section">
        <h1>Phonebook</h1>
      </div>
      <div className="main-section">
        <ContactForm />
        <div className="contacts-secton">
          <h2 className="page-title">Your contacts</h2>
          {contacts.length > 0 ? (
            <>
              <Filter />

              <ContactList />
            </>
          ) : (
            <EmptyMessage />
          )}
        </div>
      </div>
    </div>
  );
}

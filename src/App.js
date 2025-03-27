import { useState, useEffect } from 'react';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);

  //retrieve the contacts when the application loads
  useEffect(function() {
    async function fetchContacts() {
        try{
            const response = await axios.get ('http://localhost:4000/contacts');
            setContacts(response.data);
        } catch (error) {
            console.error ("Error fetching the contacts", error);
        }
    }
        fetchContacts();
}, []); // the effect runs only once when the component mounts

//handle adding a new contact
  function handleContactAdded(newContact) {
    setContacts ((prevContacts) => [...prevContacts, newContact]);
  }


  return (
    <div>
      <h1>Manage Your Contacts</h1>
      <AddContact onContactAdded={handleContactAdded}/>
      <ContactList contacts={contacts}/>
    </div>
  );
}

export default App;

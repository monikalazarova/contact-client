import {useState, useEffect} from 'react';
import axios from 'axios';

function ContactList ({ handleContactDeleted, setEditContactId }) {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(function() {
        async function fetchContacts() {
            try{
                const response = await axios.get ('http://localhost:4000/contacts');
                setContacts(response.data);
            } catch (error) {
                console.error ("Error fetching the contacts", error);
            } finally {
                setLoading(false);
            }
        }
            fetchContacts();
    }, []); // the effect runs only once when the component mounts

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Contact List</h2>
            <ul>
                {contacts.map(function(contact){
                    return (
                        <li key={contact.id}>
                            {contact.firstname} {contact.lastname} - {contact.email}
                        </li>
                    );
                })}
            </ul>
        </div>
    );

}

export default ContactList;


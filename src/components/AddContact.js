import {useState} from 'react';
import axios from 'axios';

function AddContact({ onContactAdded }) {
    const [contact, setContact] = useState({
        firstname: '',
        lastname: '',
        email: '',
        homephone: '',
        mobile: '',
        address: '',
        birthday: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setContact({
            ...contact,
            [name]: value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/contacts', contact);
            onContactAdded(response.data);// Callback to update the contact list
            setContact({
                firstname: '',
                lastname: '',
                email: '',
                homephone: '',
                mobile: '',
                address: '',
                birthday: '',
            });
        } catch (error) {
            console.error("Error adding the customer", error)
        }
    }

    return (
        <div>
            <h2>Add Another Contact</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstname"
                    value={contact.firstname}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    name="lastname"
                    value={contact.lastname}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="homephone"
                    value={contact.homephone}
                    onChange={handleChange}
                    placeholder="Home Phone"
                />
                <input
                    type="text"
                    name="mobile"
                    value={contact.mobile}
                    onChange={handleChange}
                    placeholder="Mobile Phone"
                />
                <input
                    type="text"
                    name="address"
                    value={contact.address}
                    onChange={handleChange}
                    placeholder="Address"
                />
                <input
                    type="date"
                    name="birthday"
                    value={contact.birthday}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add New Contact</button>
            </form>
        </div>
    );
}

export default AddContact;
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import ContactList from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = contactData => {
    if (
      this.state.contacts.some(contact => contact.name === contactData.name)
    ) {
      toast.error(`Contact with ${contactData.name} already exists`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contactData],
    }));
  };

  getContact = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getContact();
    return (
      <div>
        <PhonebookForm onSubmit={this.addContact}></PhonebookForm>
        <Filter value={filter} onChange={this.handleFilter} />
        <ContactList
          contacts={filteredContacts}
          onDelete={this.deleteContact}
        ></ContactList>
        <ToastContainer />
      </div>
    );
  }
}

import React, { useState, useEffect } from 'react';
import { ticketFields } from '../../constants/formFields';
import Input from '../Common/Input';
import FormAction from '../Common/FormAction';
import useApiRequest from '../../hooks/useApiRequest';

const fields = ticketFields;

function EditTicketForm(props) {
  const initialFormState = {
    id: null,
    name: '',
    status: '',
    assigned_to: '',
  };

  const [filteredTickets, setFilteredTickets] = useState(
    props.editing ? props.currentTicket : initialFormState
  );
  const [alert, setAlert] = useState({ type: '', message: '' });
  const { sendRequest, error} = useApiRequest();

  const handleChange = (e) => {
      setFilteredTickets({ ...filteredTickets, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    setFilteredTickets(props.currentTicket);
  }, [props]);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({ type: '', message: '' });
    }, 2000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!filteredTickets.name || !filteredTickets.description) return;

    try {
      if (props.editing) {
        await editTicket();
        await props.updateTicket(filteredTickets.id, filteredTickets);
      } else {
        await createTicket();
        await props.addTicket(filteredTickets);
      }

      resetAddTicket();
    } catch (error) {
      console.error('Error during form submission:', error);
      showAlert('error', 'An error occurred');
    }
  };

  const resetAddTicket = () => {
    props.setEditing(false);
    setFilteredTickets(initialFormState);
  };

  const createTicket = async () => {
    try {
      await sendRequest('http://localhost:3001/tickets/', 'POST', {}, filteredTickets);

      if (!error) {
        showAlert('success', 'Ticket added successfully');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        console.error('Failed to add Ticket');
        showAlert('error', 'Failed to add Ticket');
      }
    } catch (error) {
      console.error('Error during add Ticket:', error);
      showAlert('error', 'An error occurred');
    }
  };

  const editTicket = async () => {
    try {
      await sendRequest(`http://localhost:3001/tickets/${filteredTickets.ticketid}`, 'PATCH', {}, filteredTickets);

      if (!error) {
        showAlert('success', 'Ticket updated successfully');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        console.error('Failed to update Ticket');
        showAlert('error', 'Failed to update Ticket');
      }
    } catch (error) {
      console.error('Error during update Ticket:', error);
      showAlert('error', 'An error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
      {alert.type === 'success' && (
        <div className="mt-4 bg-green-200 border-green-400 border p-2 rounded">
          {alert.message}
        </div>
      )}
      {alert.type === 'error' && (
        <div className="mt-4 bg-red-200 border-red-400 border p-2 rounded">
          {alert.message}
        </div>
      )}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={filteredTickets[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
          <FormAction
            handleSubmit={handleSubmit}
            text={props.editing ? 'Update Ticket' : 'Add Ticket'}
          />

          <div className="my-2">
            {props.editing && (
              <button
                onClick={resetAddTicket}
                className="w-full bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-purple-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditTicketForm;

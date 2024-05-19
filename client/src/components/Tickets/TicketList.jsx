import React, { useState, useEffect } from 'react';
import Ticket from './Ticket';
import useApiRequest from '../../hooks/useApiRequest';
import TicketModal from './TicketModal';

function TicketList() {
  const [apiTickets, setApiTickets] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const { error, sendRequest } = useApiRequest();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest('http://localhost:3001/tickets', 'GET');
        setApiTickets(responseData);
        setFilteredTickets(responseData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sendRequest]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = apiTickets.filter((ticket) =>
      ticket.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTickets(filteredItems);
  };

  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedFilter(selectedValue);

    const sortedTickets = [...filteredTickets];

    if (selectedValue === 'name') {
      sortedTickets.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedValue === 'status') {
      sortedTickets.sort((a, b) => a.status.localeCompare(b.status));
    }

    setFilteredTickets(sortedTickets);
  };

  const initialFormState = {
    ticketid: null,
    name: '',
    status: '',
    assigned_to: '',
  };

  const [editing, setEditing] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(initialFormState);

  const addTicket = async (ticket) => {
    try {
      const responseData = await sendRequest('http://localhost:3001/tickets', 'POST', {
        'Content-Type': 'application/json',
      }, ticket);

      if (!error) {
        setFilteredTickets([...filteredTickets, responseData]);
      }
    } catch (error) {
      console.error('Error adding ticket:', error);
    }
  };

  const deleteTicket = async (id) => {
    try {
      await sendRequest(`http://localhost:3001/tickets/${id}`, 'DELETE');

      if (!error) {
        setFilteredTickets(filteredTickets.filter((ticket) => ticket.ticketid !== id));
      } else {
        console.error('delete ticket failed');
      }

      setEditing(false);
    } catch (error) {
      console.error('Error during delete ticket:', error);
    }
  };

  const editRow = (ticket) => {
    setEditing(true);
    setCurrentTicket(ticket);
  };

  const updateTicket = async (id, updatedTicket) => {
    try {
      const responseData = await sendRequest(`http://localhost:3001/tickets/${id}`, 'PUT', {
        'Content-Type': 'application/json',
      }, updatedTicket);

      if (!error) {
        setFilteredTickets(
          filteredTickets.map((ticket) => (ticket.ticketid === id ? responseData : ticket))
        );
        setEditing(false);
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto flex mb-8">
        <div className="flex-1 mr-4">
          <input
            className="p-2 w-full bg-white-200 border-2 border-slate-200 rounded-lg flex flex-row mx-auto mt-6"
            type="text"
            value={searchItem}
            onChange={handleInputChange}
            placeholder="Type to search"
          />
        </div>
        <div className="p-2 bg-white-200 border-2 border-slate-200 rounded-lg flex flex-row mx-auto mt-6">
          <select onChange={handleFilterChange} value={selectedFilter}>
            <option value="none">Select Filter</option>
            <option value="name">Sort by Name</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
        <div className='p-2 px-2 flex flex-row mx-auto mt-6'>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded"
            onClick={openModal}
          >
            Add Ticket
          </button>

          <TicketModal
            isOpen={isModalOpen}
            closeModal={closeModal}
            editing={editing}
            currentTicket={currentTicket}
            updateTicket={updateTicket}
            addTicket={addTicket}
          />
        </div>
      </div>
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {filteredTickets.map((e) => (
          <Ticket
            key={e.ticketid}
            openModal={openModal}
            data={e}
            editRow={editRow}
            deleteTicket={deleteTicket}
          />
        ))}
      </div>
    </div>
  );
}

export default TicketList;

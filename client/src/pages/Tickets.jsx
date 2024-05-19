import React from 'react';
import Header from '../components/Common/Header';
import TicketList from '../components/Tickets/TicketList';

export default function TicketsPage() {
  return (
    <div className="px-4 w-full space-y-8">
      <Header
        heading="Tickets List"
        paragraph="List of all the Tickets "
      />
      <TicketList />
    </div>
  );
}

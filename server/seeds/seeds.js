exports.seed = async (knex) => {
  await knex('users').del();
  await knex('users').insert([
    { id: 1, first_name: 'Aldrich', last_name: 'Halim', email: 'aldrich@example.com', password: 'password1' },
    { id: 2, first_name: 'John', last_name: 'Doe', email: 'john@example.com', password: 'password2' },
  ]);

  await knex('tickets').del();
  await knex('tickets').insert([
    { ticketid: 1, name: 'Book', status: 'open', assigned_to: 1 },
    { ticketid: 2, name: 'Smartphone', status: 'in_progress', assigned_to: 2 },
    { ticketid: 3, name: 'Laptop', status: 'closed', assigned_to: 1 }
  ]);
};

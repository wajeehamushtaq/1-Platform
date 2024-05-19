exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('first_name', 255).notNullable();
    table.string('last_name', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('password', 255).notNullable();
  });

  await knex.schema.createTable('tickets', (table) => {
    table.increments('ticketid');
    table.string('name', 1000).notNullable();
    table.string('status', 255).notNullable();
    table.integer('assigned_to').unsigned().references('id').inTable('users');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("tickets");
  await knex.schema.dropTable("users");
};

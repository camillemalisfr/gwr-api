import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('clients', (table) => {
    table.increments('id');
    table.string('email').unique();
    table.string('language');
    table.string('country_of_origin');
    table.string('country_of_destination');
    table.date('travel_date_start');
    table.date('travel_date_end');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('clients');
}

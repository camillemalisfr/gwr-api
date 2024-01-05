require('dotenv').config({ path: '../../.env' });
import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
const { env } = process;

const databaseConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: env.POSTGRES_HOST,
    port: Number(env.POSTGRES_PORT),
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DATABASE,
  },
  migrations: {
    directory: './migrations',
  },
  ...knexSnakeCaseMappers(),
};
export default databaseConfig;

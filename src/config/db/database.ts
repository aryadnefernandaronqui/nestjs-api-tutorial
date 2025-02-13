import * as dotenv from 'dotenv';
import knex from 'knex';
import config from 'knexfile';

dotenv.config({ path: './.env' });

const db = knex(config.development);
export default db;

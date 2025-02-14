import * as dotenv from 'dotenv';
import knex from 'knex';
import config from '../../../knexfile';

dotenv.config({ path: './.env' });

// Força o ambiente para 'development'
const environment =
  process.env.NODE_ENV === 'test'
    ? 'development'
    : process.env.NODE_ENV || 'development';

const db = knex(config[environment]); // Agora sempre teremos um ambiente válido
export default db;

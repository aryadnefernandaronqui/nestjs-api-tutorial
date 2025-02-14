import db from '../src/config/db/database';

const db = require('../src/config/db/database'); // Usando require no lugar de import

beforeAll(async () => {
  await db.migrate.latest(); 
});
beforeEach(async () => {
  await db.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
});

afterAll(async () => {
  await db.destroy();
});

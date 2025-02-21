import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Criação da tabela 'users'
  await knex.schema.createTable('users', (table) => {
    table.uuid('uid').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('first_name', 255).notNullable();
    table.string('last_name', 255).notNullable();
    table.string('password', 255).notNullable();
    table.string('email', 255).notNullable().unique();
  });

  // Criação da tabela 'shelves'
  await knex.schema.createTable('shelves', (table) => {
    table.uuid('uid').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name', 255).notNullable();
    table.text('description').nullable();
    table
      .uuid('user_id')
      .notNullable()
      .references('uid')
      .inTable('users')
      .onDelete('CASCADE');

    table.timestamps(true, true); // Cria os campos created_at e updated_at
  });

  // Criação da tabela 'bookmarks'
  await knex.schema.createTable('bookmarks', (table) => {
    table.uuid('uid').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('title', 255).notNullable();
    table.string('author', 255).notNullable();
    table.string('description', 255).notNullable();
    table.string('genre', 100).notNullable();
    table.string('link', 255).notNullable();

    // Chave estrangeira referenciando 'users.uid'
    table
      .uuid('user_id')
      .nullable()
      .references('uid')
      .inTable('users')
      .onDelete('CASCADE');

    // Chave estrangeira referenciando 'shelves.uid'
    table
      .uuid('shelf_id')
      .nullable()
      .references('uid')
      .inTable('shelves')
      .onDelete('CASCADE');

    table.timestamps(true, true); // Cria os campos created_at e updated_at
  });

  // Criação da tabela 'favorites'
  await knex.schema.createTable('favorites', (table) => {
    table.uuid('uid').primary().defaultTo(knex.raw('gen_random_uuid()'));

    // Referência ao usuário que favoritou o livro
    table
      .uuid('user_id')
      .notNullable()
      .references('uid')
      .inTable('users')
      .onDelete('CASCADE');

    // Referência ao livro favoritado
    table
      .uuid('bookmark_id')
      .notNullable()
      .references('uid')
      .inTable('bookmarks')
      .onDelete('CASCADE');

    table.timestamps(true, true); // Campos created_at e updated_at

    // Garantir que um usuário só pode favoritar um livro uma vez
    table.unique(['user_id', 'bookmark_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  // Remover tabelas na ordem reversa para evitar conflitos
  await knex.schema.dropTableIfExists('bookmarks');
  await knex.schema.dropTableIfExists('shelves');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('favorites');
}

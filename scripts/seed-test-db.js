const { Client } = require('pg');
require('dotenv').config();

// Default local Supabase connection strings
const client = new Client({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'postgres',
  port: 54322,
});

async function seed() {
  try {
    await client.connect();
    console.log('Connected to local Supabase database.');

    // Creating a simple prompts table with JSONB
    await client.query(`
      CREATE TABLE IF NOT EXISTS prompts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        content JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Inserting dummy data
    await client.query(`
      INSERT INTO prompts (name, content) 
      VALUES 
      ('Supabase Test Prompt 1', '{"text": "Hello world from Supabase", "version": 1}'::jsonb),
      ('Supabase Test Prompt 2', '{"text": "Translate this with Supabase", "version": 1}'::jsonb)
    `);

    console.log('Local Supabase database seeded successfully.');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await client.end();
  }
}

seed();

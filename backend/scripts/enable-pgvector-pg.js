const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://user:password@localhost:5432/smartsupport?schema=public"
});

async function main() {
  try {
    await client.connect();
    await client.query('CREATE EXTENSION IF NOT EXISTS vector;');
    console.log('pgvector extension enabled successfully');
  } catch (e) {
    console.error('Failed to enable pgvector:', e);
  } finally {
    await client.end();
  }
}

main();

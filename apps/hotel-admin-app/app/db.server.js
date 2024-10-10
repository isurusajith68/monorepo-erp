import pkg from 'pg';
const {Client} = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL, // PostgreSQL connection string from environment variable
});

// Connect to the database
client.connect();

export { client };

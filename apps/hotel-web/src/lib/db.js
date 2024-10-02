import { Client } from 'pg'

export const connectToDatabase = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })

  await client.connect()
  return client
}

import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const hasDbConnection = Boolean(process.env.DATABASE_URL);

export const pool = hasDbConnection
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    })
  : null;

if (pool) {
  pool.on('error', (err) => {
    console.error('Error imprevisto en el cliente de PostgreSQL:', err);
  });
}

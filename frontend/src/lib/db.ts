import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://akademia:akademia_secret@localhost:5433/akademia_db';

export const pool = new Pool({
  connectionString,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

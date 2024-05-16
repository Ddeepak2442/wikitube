import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM users ORDER BY id DESC LIMIT 10');
      client.release();
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching prompts:', error);
      res.status(500).json({ success: false, message: 'Error fetching prompts' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
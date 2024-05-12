import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { wikipedia_link } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT code FROM prompts WHERE wikipedia_link = $1', [wikipedia_link]);
      client.release();

      if (result.rows.length > 0) {
        res.status(200).json({ code: result.rows[0].code });
      } else {
        res.status(404).json({ message: "Couldn't find record with this link in database." });
      }
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
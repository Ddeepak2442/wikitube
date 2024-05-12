// pages/api/savePrompt.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false // Required for Vercel deployment
  }
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt_name, prompt, wikipedia_link, code, imageBase64 } = req.body;
    console.log('Received body:', req.body); // Log the received body for debugging

    try {
      const queryText = 'INSERT INTO prompts(prompt_name, prompt, wikipedia_link, code, imageBase64) VALUES($1, $2, $3, $4, $5) RETURNING id';
      const values = [prompt_name, prompt, wikipedia_link, code, imageBase64];
      console.log('Executing query with values:', values); // Log the values for debugging

      const client = await pool.connect();
      const result = await client.query(queryText, values);
      client.release();

      console.log('Insert result:', result.rows[0]); // Log the result for debugging
      res.status(200).json({ success: true, id: result.rows[0].id });
    } catch (error) {
      console.error('Failed to save prompt:', error);
      res.status(500).json({ success: false, message: 'Failed to save prompt', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
import { Pool } from 'pg';
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false // Required for Vercel deployment
  }
});

// This should be an exported async function that handles the request
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Extract user data from request body
    const { firstName, lastName, dateOfBirth, gender, email, password } = req.body;
    console.log('Received body:', req.body); // Log the received body for debugging

    try {
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // SQL query with parameter placeholders
      const queryText = `
        INSERT INTO users (first_name, last_name, date_of_birth, gender, email, password)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id;`; // RETURNING id will return the id of the newly inserted record

      const values = [firstName, lastName, dateOfBirth, gender, email, hashedPassword];
      console.log('Executing query with values:', values); // Log the values for debugging

      const client = await pool.connect();
      const result = await client.query(queryText, values);
      client.release();

      console.log('Insert result:', result.rows[0]); // Log the result for debugging
      res.status(200).json({ success: true, id: result.rows[0].id });

    } catch (error) {
      // If an error occurs, log it and send back a 500 error
      console.error('Error saving user to database', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
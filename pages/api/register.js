const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Vercel deployment
  }
});

// This should be an exported async function that handles the request
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Extract user data from request body
    const { firstName, lastName, dateOfBirth, gender, email, password } = req.body;

    try {
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // SQL query with parameter placeholders
      const queryText = `
        INSERT INTO users (first_name, last_name, date_of_birth, gender, email, password)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id;`; // RETURNING id will return the id of the newly inserted record

      // Get a client from the connection pool
      const client = await pool.connect();

      // Execute the query with the user data
      const { rows } = await client.query(queryText, [firstName, lastName, dateOfBirth, gender, email, hashedPassword]);

      // Release the client back to the pool
      client.release();

      // Send back the ID of the newly created user
      res.status(201).json({ id: rows[0].id });
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
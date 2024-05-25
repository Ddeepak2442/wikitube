import { compare } from 'bcryptjs';
import { Pool } from 'pg';

// Initialize a connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { emailOrPhone, password } = req.body;

    try {
      const client = await pool.connect();
      // Query to find the user with the given email or phone
      const userResult = await client.query('SELECT * FROM users WHERE email = $1 OR phone = $1', [emailOrPhone]);
      
      if (userResult.rows.length > 0) {
        const user = userResult.rows[0];
        // Compare the hashed password
        const passwordMatch = await compare(password, user.password);
        
        if (passwordMatch) {
          // Passwords match
          res.status(200).json({ success: true, message: 'Login successful' });
        } else {
          // Passwords do not match
          res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
      } else {
        // No user found with that email or phone
        res.status(404).json({ success: false, message: 'User not found' });
      }
      
      client.release();
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    // Handle any requests that aren't POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


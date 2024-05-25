// pages/api/auth/session.js
export default (req, res) => {
    if (req.method === 'GET') {
      res.status(200).json({ session: null }); // Example response
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };
  
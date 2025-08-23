const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.NEON_CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email, message } = JSON.parse(event.body);

  const result = await pool.query(
    'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id',
    [name, email, message]
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, id: result.rows[0].id })
  };
};

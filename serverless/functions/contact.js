const { Client } = require('pg');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const { name, email, message } = JSON.parse(event.body);
  const client = new Client({
    connectionString: process.env.NEON_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    await client.query('INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)', [name, email, message]);
    await client.end();
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Database error' }) };
  }
};

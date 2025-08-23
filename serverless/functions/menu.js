const { Client } = require('pg');

exports.handler = async () => {
  const client = new Client({
    connectionString: process.env.NEON_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    const result = await client.query('SELECT id, name, description, price, category, image_url FROM menu_items ORDER BY id ASC');
    await client.end();
    return { statusCode: 200, body: JSON.stringify(result.rows) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Database error' }) };
  }
};

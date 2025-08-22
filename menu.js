const { Client } = require('pg');

exports.handler = async () => {
  try {
    const client = new Client({ connectionString: process.env.NEON_CONNECTION_STRING, ssl: { rejectUnauthorized: false } });
    await client.connect();
    const result = await client.query('SELECT * FROM menu_items ORDER BY category, sort_order');
    await client.end();
    const grouped = {};
    result.rows.forEach(item => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });
    return { statusCode: 200, body: JSON.stringify(grouped) };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};

const { Client } = require('pg');

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const client = new Client({ connectionString: process.env.NEON_CONNECTION_STRING, ssl: { rejectUnauthorized: false } });
    await client.connect();
    await client.query(`INSERT INTO reservations (name, phone, party_size, reservation_date, reservation_time, notes) 
                        VALUES ($1,$2,$3,$4,$5,$6)`, 
                        [data.name, data.phone, data.party_size, data.reservation_date, data.reservation_time, data.notes]);
    await client.end();
    return { statusCode: 200, body: JSON.stringify({ message: 'Reservation saved!' }) };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};

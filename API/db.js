// db.js - module for connecting to the database
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // use encryption
    trustServerCertificate: true, // for Azure
  },
};

async function connect() {
  try {
    await sql.connect(config);
    console.log('Database connected');
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  sql,
  connect,
};
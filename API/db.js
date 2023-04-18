const dotenv = require('dotenv');
const sql = require('mssql');

dotenv.config();

/*
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    //trustServerCertificate: true,
  },
};
*/

const config = {
  user: 'usuarioazure', // better stored in an app setting such as process.env.DB_USER
  password: 'Password123', // better stored in an app setting such as process.env.DB_PASSWORD
  server: 'miservidorsql-a00828096.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
  //port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
  database: 'TC3005B-RecSportsOpenDB', // better stored in an app setting such as process.env.DB_NAME
  authentication: {
      type: 'default'
  },
  options: {
      encrypt: true
  }
}

//const pool = new sql.ConnectionPool(config).connect();

// Gracias a https://stackoverflow.com/questions/47480289/pool-query-is-not-a-function-using-npm-mysql-package-to-use-connection-pool 
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool1 => {
    console.log('Connected to MSSQL')
    return pool1
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}

//module.exports = pool;
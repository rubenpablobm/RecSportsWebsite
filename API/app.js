const express = require("express");
const cors = require("cors");
const router = require("./routes");
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");

//connection to DB SQL
const dbConfig = {
    host: 'your_host_name',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database_name',
  };
  
const pool = mysql.createPool(dbConfig);

const app = express();

//midedleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
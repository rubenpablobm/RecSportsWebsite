const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const edificioRoutes = require('./routes/edificio');

const sql = require('mssql');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/edificio', edificioRoutes);

app.use((req,res,next) =>{
    console.log(`Request del cliente URL: ${req.get('host')}${req.originalUrl} >>> ${SERVER_TAG}`);
    next();
})

const port = process.env.PORT || 5040;
app.listen(port, () => console.log(`Server running on port ${port}`));
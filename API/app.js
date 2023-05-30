const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const edificioRoutes = require('./routes/edificio');
const areaRoutes = require('./routes/area');
const estadisticaRoutes = require('./routes/estadistica');
const alumnoRoutes = require('./routes/alumno');

const adminRoutes = require('./routes/admin');

const sql = require('mssql');
const bcrypt = require("bcrypt");

const schedule = require('node-schedule');
const axios = require('axios');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/edificio', edificioRoutes);
app.use('/area', areaRoutes);
app.use('/estadistica', estadisticaRoutes);
app.use('/alumno', alumnoRoutes);

app.use('/admin', adminRoutes);

app.use((req,res,next) =>{
    console.log(`Request del cliente URL: ${req.get('host')}${req.originalUrl}`);
    next();
})

//posible soln https://stackoverflow.com/questions/43234272/azure-functions-azure-sql-node-js-and-connection-pooling-between-requests

const port = process.env.PORT || 5040;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);

    //https://node-schedule-calculator.firebaseapp.com/
    var PorHora = schedule.scheduleJob('40 * * * *', function(){ //xx:40
        console.log("Creacion de reporte por hora");
        axios.get('http://localhost:5040/estadistica/crearhora')
            .then(response => {
            console.log(response.data);
            })
            .catch(error => {
            console.error(error);
        });
    });

});


//estadistica

// TODO: Todavia no funciona, pero tampoco genera error


//var k = schedule.scheduleJob(' */24 * *', function(){ //cada hora hace el calculo

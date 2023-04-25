const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {sql, poolPromise} = require('../db');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// llamar SP para screenshot
// https://www.zentut.com/sql-tutorial/sql-insert/ 
// Default Timestamp https://www.tutorialsteacher.com/sqlserver/current-timestamp#:~:text=In%20SQL%20Server%2C%20the%20CURRENT_TIMESTAMP,to%20the%20GETDATE()%20function.
app.get('/crearhora/', async (req, res) => {
    try {
      const pool = await poolPromise;
      const query = 'INSERT INTO Hora(IdArea, Aforo, Capacidad) SELECT IdArea, Aforo, Capacidad FROM Aforo;';
      const result = await pool.request().query(query);
      res.send('CrearHora OK');
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
});
  
//sacar fecha completa y numero de hora para que pueda graficar correctamente
// https://learn.microsoft.com/en-us/sql/t-sql/functions/datepart-transact-sql?redirectedfrom=MSDN&view=sql-server-ver16
app.get('/hora', async (req, res) => {
  try {
    const pool = await poolPromise;
    const { horaInicio, horaFin } = req.body;
    const query = 'SELECT * FROM Hora WHERE Hora > @horaInicio AND Hora < @horaFin;';
    const result = await pool.request()
      .input('horaInicio', sql.DateTime, horaInicio)
      .input('horaFin', sql.DateTime, horaFin)
      .query(query);
    res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/hora/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const id = req.params.id;
    const { horaInicio, horaFin } = req.body;
    const query = 'SELECT * FROM Hora WHERE Hora > @horaInicio AND Hora < @horaFin AND idArea=@id;';
    const result = await pool.request()
      .input('horaInicio', sql.DateTime, horaInicio)
      .input('horaFin', sql.DateTime, horaFin)
      .input('id', sql.DateTime, id)
      .query(query);
    res.send(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

//DATOS ESTADISTICOS DE DIA
app.get('/dia/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const id = req.params.id;
    const { diaInicio, diaFin } = req.body;
    const query = 'SELECT * FROM Dia WHERE Dia > @diaInicio AND Dia < @diaFin AND idDia=@id;';
    const result = await pool.request()
      .input('diaInicio', sql.DateTime, diaInicio)
      .input('diaFin', sql.DateTime, diaFin)
      .input('id', sql.DateTime, id)
      .query(query);
    res.send(result.recordset[0]);
  } catch (error) {``
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = app;
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
app.post('/crearhora/', async (req, res) => {
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

//crearDia ya existe gracias al SP MasAforo

//sacar fecha completa y numero de hora para que pueda graficar correctamente
// https://learn.microsoft.com/en-us/sql/t-sql/functions/datepart-transact-sql?redirectedfrom=MSDN&view=sql-server-ver16
app.post('/hora', async (req, res) => {
  try {
    const pool = await poolPromise;
    const { diaInicio, diaFin } = req.body;
    // debe ser LEFT JOIN la consulta, debido a que habra historicos de areas eliminadas, estas no tendran nombre
    const query = 'SELECT h.*, a.Nombre FROM Hora h LEFT JOIN Area a ON h.IdArea = a.IdArea WHERE h.Hora >= @diaInicio AND h.Hora <= @diaFin;';
    const result = await pool.request()
      .input('diaInicio', sql.DateTime, diaInicio)
      .input('diaFin', sql.DateTime, diaFin)
      .query(query);
    res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


app.post('/hora/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const id = req.params.id;
    const { diaInicio, diaFin } = req.body;
    const query = 'SELECT h.*, a.Nombre FROM Hora h LEFT JOIN Area a ON h.IdArea = a.IdArea WHERE h.Hora >= @diaInicio AND h.Hora <= @diaFin AND h.idArea=@id;';
    const result = await pool.request()
      .input('diaInicio', sql.DateTime, diaInicio)
      .input('diaFin', sql.DateTime, diaFin)
      .input('id', sql.Int, id)
      .query(query);
    res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

//DATOS ESTADISTICOS DE DIA
app.post('/dia', async (req, res) => {
  try {
    const pool = await poolPromise;
    const { diaInicio, diaFin } = req.body;
    const query = 'SELECT d.*, a.Nombre FROM Dia d LEFT JOIN Area a ON d.IdArea = a.IdArea WHERE d.Dia >= @diaInicio AND d.Dia <= @diaFin;';
    const result = await pool.request()
      .input('diaInicio', sql.DateTime, diaInicio)
      .input('diaFin', sql.DateTime, diaFin)
      .query(query);
    res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post('/dia/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const id = req.params.id;
    const { diaInicio, diaFin } = req.body;
    const query = 'SELECT d.*, a.Nombre FROM Dia d LEFT JOIN Area a ON d.IdArea = a.IdArea WHERE d.Dia >= @diaInicio AND d.Dia <= @diaFin AND d.idArea=@id;';
    const result = await pool.request()
      .input('diaInicio', sql.DateTime, diaInicio)
      .input('diaFin', sql.DateTime, diaFin)
      .input('id', sql.Int, id)
      .query(query);
    res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = app;
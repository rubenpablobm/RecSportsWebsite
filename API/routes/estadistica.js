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
app.post('/hora', async (req, res) => {
try {
    const pool = await poolPromise;
    const { Nombre, Foto, LinkMaps } = req.body;
    const query = 'INSERT INTO Edificio ( Nombre, Foto, LinkMaps) VALUES (@Nombre, @Foto, @LinkMaps)';
    await pool.request()
    /*.input('IdEdificio', sql.Int, IdEdificio)*/
    .input('Nombre', sql.VarChar, Nombre)
    .input('Foto', sql.VarChar, Foto)
    .input('LinkMaps', sql.VarChar, LinkMaps)
    .query(query);
    res.sendStatus(201);
} catch (error) {
    console.error(error);
    res.sendStatus(500);
}
});

module.exports = app;
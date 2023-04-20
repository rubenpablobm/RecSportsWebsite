const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {sql, poolPromise} = require('../db');

const app = express();
//const sql = require('mssql');

app.use(bodyParser.json());
app.use(cors());

// get all edificios
app.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const query = 'SELECT * FROM Edificio';
    const result = await pool.request().query(query);
    res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// get an edificio by id
app.get('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const id = req.params.id;
    const query = 'SELECT * FROM Edificio WHERE IdEdificio = @id';
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(query);
    res.send(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// create a new edificio
app.post('/', async (req, res) => {
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

// update an edificio by id
app.put('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const id = req.params.id;
    const { Nombre, Foto, LinkMaps } = req.body;
    const query = 'UPDATE Edificio SET Nombre = @Nombre, Foto = @Foto, LinkMaps = @LinkMaps WHERE IdEdificio = @id';
    await pool.request()
      .input('Nombre', sql.VarChar, Nombre)
      .input('Foto', sql.VarChar, Foto)
      .input('LinkMaps', sql.VarChar, LinkMaps)
      .input('id', sql.Int, id)
      .query(query);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// delete an edificio by id
app.delete('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const id = req.params.id;
    const query = 'DELETE FROM Edificio WHERE IdEdificio = @id';
    await pool.request()
      .input('id', sql.Int, id)
      .query(query);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
    
module.exports = app;
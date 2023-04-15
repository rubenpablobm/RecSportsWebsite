const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('../db');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// get all areas
app.get('/api/areas', async (req, res) => {
    try {
      const query = 'SELECT * FROM Area';
      const result = await pool.request().query(query);
      res.send(result.recordset);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
  
  // get an area by id
  app.get('/api/areas/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const query = 'SELECT * FROM Area WHERE IdArea = @id';
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query(query);
      res.send(result.recordset[0]);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
  
  // create a new area
  app.post('/api/areas', async (req, res) => {
    try {
      const { IdArea, Nombre, Foto, Croquis, Tipo, LinkCalendar, Descripcion, Horarios, Avisos, IdEdificio, idAforo } = req.body;
      const query = 'INSERT INTO Area (IdArea, Nombre, Foto, Croquis, Tipo, LinkCalendar, Descripcion, Horarios, Avisos, IdEdificio, idAforo) VALUES (@IdArea, @Nombre, @Foto, @Croquis, @Tipo, @LinkCalendar, @Descripcion, @Horarios, @Avisos, @IdEdificio, @idAforo)';
      await pool.request()
        .input('IdArea', sql.Int, IdArea)
        .input('Nombre', sql.VarChar, Nombre)
        .input('Foto', sql.VarChar, Foto)
        .input('Croquis', sql.VarChar, Croquis)
        .input('Tipo', sql.VarChar, Tipo)
        .input('LinkCalendar', sql.VarChar, LinkCalendar)
        .input('Descripcion', sql.VarChar, Descripcion)
        .input('Horarios', sql.VarChar, Horarios)
        .input('Avisos', sql.VarChar, Avisos)
        .input('IdEdificio', sql.Int, IdEdificio)
        .input('idAforo', sql.Int, idAforo)
        .query(query);
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
  
// update an area by id
app.put('/api/areas/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { Nombre, Foto, Croquis, Tipo, LinkCalendar, Descripcion, Horarios, Avisos, IdEdificio, idAforo } = req.body;
      const query = 'UPDATE Area SET Nombre = @Nombre, Foto = @Foto, Croquis = @Croquis, Tipo = @Tipo, LinkCalendar = @LinkCalendar, Descripcion = @Descripcion, Horarios = @Horarios, Avisos = @Avisos, IdEdificio = @IdEdificio, idAforo = @idAforo WHERE IdArea = @id';
      await pool.request()
        .input('Nombre', sql.VarChar, Nombre)
        .input('Foto', sql.VarChar, Foto)
        .input('Croquis', sql.VarChar, Croquis)
        .input('Tipo', sql.VarChar, Tipo)
        .input('LinkCalendar', sql.VarChar, LinkCalendar)
        .input('Descripcion', sql.VarChar, Descripcion)
        .input('Horarios', sql.VarChar, Horarios)
        .input('Avisos', sql.VarChar, Avisos)
        .input('IdEdificio', sql.Int, IdEdificio)
        .input('idAforo', sql.Int, idAforo)
        .input('id', sql.Int, id)
        .query(query);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
  
  // delete an area by id
  app.delete('/api/areas/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const query = 'DELETE FROM Area WHERE IdArea = @id';
      await pool.request()
        .input('id', sql.Int, id)
        .query(query);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {sql, poolPromise} = require('../db');

const app = express();
//const sql = require('mssql');

//DOCUMENTACION: es Id cuando es una identidad clave. Si es una var de un SP, id.

app.use(bodyParser.json());
app.use(cors());

// get all areas
app.get('/', async (req, res) => {
    try {
      const pool = await poolPromise;
      const query = 'SELECT * FROM Area';
      const result = await pool.request().query(query);
      res.send(result.recordset);
      //res.json(result.recordset);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
  
  // get an area by id
  app.get('/:id', async (req, res) => {
    try {
      const pool = await poolPromise;
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
  app.post('/', async (req, res) => {
    try {
      const pool = await poolPromise;
      const { Nombre, Foto, Croquis, Tipo, LinkCalendar, Descripcion, Horarios, Avisos, IdEdificio, Capacidad } = req.body;
      await pool.request()
          //.input('IdArea', sql.Int, IdArea)
          .input('Nombre', sql.VarChar, Nombre)
          .input('Foto', sql.VarChar, Foto)
          .input('Croquis', sql.VarChar, Croquis)
          .input('Tipo', sql.VarChar, Tipo)
          .input('LinkCalendar', sql.VarChar, LinkCalendar)
          .input('Descripcion', sql.VarChar, Descripcion)
          .input('Horarios', sql.VarChar, Horarios)
          .input('Avisos', sql.VarChar, Avisos)
          .input('IdEdificio', sql.Int, IdEdificio)
          /*.input('idAforo', sql.Int, idAforo)*/
          .input('Capacidad',sql.Int, Capacidad)
          .execute('CrearArea');
        //res.sendStatus(201);
        res.send('CrearArea OK');
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
  
// update an area by id. NO INFLUYE AFORO
app.put('/:id', async (req, res) => {
    try {
      const pool = await poolPromise;
      const id = req.params.id;
      const { Nombre, Foto, Croquis, Tipo, LinkCalendar, Descripcion, Horarios, Avisos, IdEdificio, idAforo } = req.body;
      const query = 'UPDATE Area SET Nombre = @Nombre, Foto = @Foto, Croquis = @Croquis, Tipo = @Tipo, LinkCalendar = @LinkCalendar, Descripcion = @Descripcion, Horarios = @Horarios, Avisos = @Avisos, IdEdificio = @IdEdificio WHERE IdArea = @id';
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
        /*.input('idAforo', sql.Int, idAforo)*/
        .query(query);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
  
  // delete an area by id
  app.delete('/:id', async (req, res) => {
    try {
      const pool = await poolPromise;
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

  // API PERSONALIZADA

  // pagina principal, sacar por edificio
  app.get('/xedificio/:id', async (req, res) => {
    try {
      const pool = await poolPromise;
      const id = req.params.id;
      const query = 'SELECT a.idArea, a.Tipo, a.Nombre, a.Foto, a.Avisos, af.Aforo, af.Capacidad FROM Area a FULL JOIN Aforo af ON a.idArea = af.idArea WHERE a.idEdificio = @id';
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query(query);
        res.send(result.recordset);
        //res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  //MasAforo
  app.get('/masaforo/:id', async (req, res) => {
    try {
      const pool = await poolPromise;
      const id = req.params.id;
      await pool.connect();
      const result = await pool.request()
          .input('current_idArea', sql.Int, id)
          //.input('current_idArea', req.query.id)
          .execute('MasAforo');
      //res.send(result.recordset[0]);
      res.send('MasAforo OK');
    } catch (error) {
      console.error(error.RequestError);
      res.status(500).json(error.message);
    }
  });
  //MenosAforo
  app.get('/menosaforo/:id', async (req, res) => {
    try {
      const pool = await poolPromise;
      const id = req.params.id;
      await pool.connect();
      const result = await pool.request()
          .input('current_idArea', sql.Int, id)
          .execute('MenosAforo');
      //res.send(result.recordset[0]);
      res.send('MenosAforo OK');
    } catch (error) {
      console.error(error.RequestError);
      res.status(500).json(error.message);
    }
  });

  module.exports = app;
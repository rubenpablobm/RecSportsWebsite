
const express = require('express');
const app = express();
const cors = require('cors');
const {sql, poolPromise} = require('../db');

app.use(express.json());
app.use(cors());

//subir una tabla https://stackoverflow.com/questions/62995713/inserting-multiple-rows-into-sql-server-from-node-js
app.post('/subir', async (req, res) => {
    try {
        const pool = await poolPromise;
        const input_body = req.body;
        table = new sql.Table("Alumno");
        table.create = true;
        table.columns.add("Matricula", sql.Char(9), { nullable: false});
        // add here rows to insert into the table
        for (r of input_body) {
            table.rows.add(r.Matricula);
            console.log(r.Matricula);
        }
        await pool.request().bulk(table);
        res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.delete('/eliminar', async (req, res) => {
    try {
      const pool = await poolPromise;
      const id = req.params.id;
      const query = 'DROP TABLE Alumno;';
      await pool.request()
        .query(query);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  module.exports = app;
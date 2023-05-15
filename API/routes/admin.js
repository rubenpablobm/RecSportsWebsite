const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {sql, poolPromise} = require('../db');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const bcrypt = require("bcryptjs");

app.post('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const { Email, Contrasena, RepContrasena} = req.body;
        let tContrasena = await bcrypt.hash(Contrasena+"Recsports",8);
        let tRepContrasena = await bcrypt.hash(Contrasena+"Recsports",8);
        await pool.request()
            .input('Email', sql.VarChar, Email)
            .input('Contrasena', sql.VarChar, tContrasena)
            .input('RepContrasena', sql.VarChar, tRepContrasena)
            .execute('CrearAdmin');
        res.send('Administrador creado');
    }
    catch{
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/', async (req, res) => {
    const pool = await poolPromise;
    const { Email, Contrasena, RepContrasena} = req.body;
    const query = 'SELECT * FROM Admin WHERE Email=@tEmail AND Contrasena=@tContrasena';
    await pool.request()
            .input('Email', sql.VarChar, tEmail)
            .input('Contrasena', sql.VarChar, tContrasena)
            .query(query);
        res.send('Administrador iniciado sesion');
});
module.exports = app;
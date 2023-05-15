const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {sql, poolPromise} = require('../db');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const bcrypt = require("bcryptjs");

app.post('/registro', async (req, res) => {
    try {
        const pool = await poolPromise;
        const { Email, Contrasena, RepContrasena} = req.body;
        //https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
        const patternContraInvalida = new RegExp("^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$");
        if(Contrasena!=RepContrasena){
            throw {message:"Contraseñas no son iguales"};
        }
        else if(Contrasena.match(patternContraInvalida)){ //si es invalida
            throw {message:"La contraseña debe tener minimo 8 caracteres. Al menos una mayuscula, minuscula, caracter especial y numero de cada uno"};
        }
        const tContrasena = await bcrypt.hash(Contrasena+"Recsports",8);
        console.log(tContrasena);
        const query = 'INSERT INTO Admin (Email, Contrasena) VALUES (@Email, @tContrasena)';
        //validacion de contraseñas, como tambien si no existe registro trodavia, esta en SP
        await pool.request()
            .input('Email', sql.VarChar, Email)
            .input('tContrasena', sql.VarChar, tContrasena)
            .query(query);
        res.send('Admin registro exitoso');
    }catch(error) {
        console.error(error);
        const patternUnique = "UNIQUE"
        if(error.message.indexOf(patternUnique) != 0)
            res.status(500).json("Email ya existente");
        else
            res.status(500).json(error.message);
    }
});

app.get('/iniciosesion', async (req, res) => {
    try{
    const pool = await poolPromise;
    const { Email, Contrasena, RepContrasena} = req.body;
    let tContrasena = await bcrypt.hash(Contrasena+"Recsports",8);
    const query = 'SELECT * FROM Admin WHERE Email=@tEmail AND Contrasena=@tContrasena';
    await pool.request()
        .input('Email', sql.VarChar, tEmail)
        .input('Contrasena', sql.VarChar, tContrasena)
        .query(query);
    res.send('Admin login exitoso');
    }catch(error) {
        console.error(error);
        res.status(500).json("Email o contraseña invalidos");
    }
});

app.put('/cambiocontra', async (req, res) => {
    try{
    const pool = await poolPromise;
    const { Email, Contrasena, RepContrasena} = req.body;
    let tContrasena = await bcrypt.hash(Contrasena+"Recsports",8);
    const query = 'SELECT * FROM Admin WHERE Email=@tEmail AND Contrasena=@tContrasena';
    await pool.request()
            .input('Email', sql.VarChar, tEmail)
            .input('Contrasena', sql.VarChar, tContrasena)
            .query(query);
        res.send('Admin login exitoso');
    }catch(error) {
        console.error(error);
        res.sendStatus(500).json(error);
    }
});
module.exports = app;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {sql, poolPromise} = require('../db');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const bcrypt = require("bcrypt");

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
        const salt = await bcrypt.genSalt()
        const tContrasena = await bcrypt.hash(Contrasena,salt);
        
        const query = 'INSERT INTO Admin (Email, Contrasena) VALUES (@Email, @tContrasena)';
        await pool.request()
            .input('Email', sql.VarChar, Email.toLowerCase())
            .input('tContrasena', sql.VarChar, tContrasena)
            .query(query);
        res.send({error:'Admin registro exitoso'});
    }catch(error) {
        const patternUnique = "UNIQUE"
        if(error.message.indexOf(patternUnique) != 0)
            res.status(500).json("Email ya existente");
        else
            res.status(500).json(error.message);
        console.error(error);
    }
});

app.post('/iniciosesion', async (req, res) => {
    try{
        const pool = await poolPromise;
        const { Email, Contrasena, RepContrasena} = req.body;
        //let tContrasena = await bcrypt.hash(Contrasena+"Recsports",8);
        //const query = 'SELECT COUNT(*) FROM Admin WHERE Email=@Email AND Contrasena=@tContrasena';
        const query = 'SELECT * FROM Admin WHERE Email=@Email';
        const result = await pool.request()
            .input('Email', sql.VarChar, Email.toLowerCase())
            //.input('tContrasena', sql.VarChar, tContrasena)
            .query(query);
        //const count = result.recordset[0].count;
        if (!result.recordset[0]) {
            res.status(400).send('Usuario no existente');
          } else {
            const resContrasena = result.recordset[0].Contrasena;
            const valid = await bcrypt.compare(Contrasena, resContrasena);
            valid ? res.send({message:"Login exitoso"}) : res.status(400).send('La contraseña es inválida');
          }
        //count > 0 ? res.send('Admin login exitoso') : res.status(500).json('Usuario no existete');
        //res.send(count > 0 );
    }catch(error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

app.put('/cambiocontra', async (req, res) => {
    try{
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

        const query = 'UPDATE Admin SET Contrasena=@tContrasena WHERE Email=@Email';
        await pool.request()
                .input('Email', sql.VarChar, Email.toLowerCase())
                .input('tContrasena', sql.VarChar, tContrasena)
                .query(query);
            res.send('Contraseña cambiada exitosamente');
    }catch(error) {
        console.error(error);
        res.status(500).json(error.message);
    }
});
module.exports = app;
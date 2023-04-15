// edificio.js - module for CRUD operations on the Edificio table
const { sql } = require('./db');

async function getEdificios() {
  try {
    const result = await sql.query('SELECT * FROM Edificio');
    return result.recordset;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getEdificioById(id) {
  try {
    const result = await sql.query(`SELECT * FROM Edificio WHERE IdEdificio = ${id}`);
    return result.recordset[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function createEdificio(edificio) {
  const { IdEdificio, Nombre, Foto, LinkMaps } = edificio;
  const query = `INSERT INTO Edificio (IdEdificio, Nombre, Foto, LinkMaps) VALUES (${IdEdificio}, '${Nombre}', '${Foto}', '${LinkMaps}')`;

  try {
    await sql.query(query);
    return 'Edificio created';
  } catch (err) {
    console.log(err);
    return 'Error creating Edificio';
  }
}

async function updateEdificio(id, edificio) {
  const { Nombre, Foto, LinkMaps } = edificio;
  const query = `UPDATE Edificio SET Nombre = '${Nombre}', Foto = '${Foto}', LinkMaps = '${LinkMaps}' WHERE IdEdificio = ${id}`;

  try {
    const result = await sql.query(query);
    if (result.rowsAffected.length === 0) {
      return 'Edificio not found';
    } else {
      return 'Edificio updated';
    }
  } catch (err) {
    console.log(err);
    return 'Error updating Edificio';
  }
}

async function deleteEdificio(id) {
  const query = `DELETE FROM Edificio WHERE IdEdificio = ${id}`;

  try {
    const result = await sql.query(query);
    if (result.rowsAffected.length === 0) {
      return 'Edificio not found';
    } else {
      return 'Edificio deleted';
    }
  } catch (err) {
    console.log(err);
    return 'Error deleting Edificio';
  }
}

module.exports = {
  getEdificios,
  getEdificioById,
  createEdificio,
  updateEdificio,
  deleteEdificio,
};

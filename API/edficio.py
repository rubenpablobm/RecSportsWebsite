from flask import Blueprint, jsonify, request
from db import get_db

bp = Blueprint('edificio', __name__, url_prefix='/edificios')

@bp.route('/', methods=['GET'])
def get_edificios():
    connection = get_db()
    cursor = connection.cursor()

    query = "SELECT * FROM Edificio"
    cursor.execute(query)

    edificios = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(edificios)

@bp.route('/', methods=['POST'])
def create_edificio():
    connection = get_db()
    cursor = connection.cursor()

    query = "INSERT INTO Edificio (IdEdificio, Nombre, Foto, LinkMaps) VALUES (?, ?, ?, ?)"
    values = (request.json['IdEdificio'], request.json['Nombre'], request.json['Foto'], request.json['LinkMaps'])
    cursor.execute(query, values)

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({'message': 'Edificio created successfully'})

@bp.route('/<int:id>', methods=['PUT'])
def update_edificio(id):
    connection = get_db()
    cursor = connection.cursor()

    query = "UPDATE Edificio SET Nombre = ?, Foto = ?, LinkMaps = ? WHERE IdEdificio = ?"
    values = (request.json['Nombre'], request.json['Foto'], request.json['LinkMaps'], id)
    cursor.execute(query, values)

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({'message': 'Edificio updated successfully'})

@bp.route('/<int:id>', methods=['DELETE'])
def delete_edificio(id):
    connection = get_db()
    cursor = connection.cursor()

    query = "DELETE FROM Edificio WHERE IdEdificio = ?"
    cursor.execute(query, id)

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({'message': 'Edificio deleted successfully'})

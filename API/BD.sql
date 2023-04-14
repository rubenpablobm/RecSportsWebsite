/*CREACION DE LA BASE DE DATOS*/
/*https://chartio.com/resources/tutorials/how-to-define-an-auto-increment-primary-key-in-sql-server/ */
USE tc3005b;

CREATE TABLE Edificio
(
  IdEdificio INT NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(255) NOT NULL,
  Foto VARCHAR(255) NOT NULL,
  LinkMaps VARCHAR(255) NOT NULL,
  PRIMARY KEY (IdEdificio)
);

CREATE TABLE Admin
(
  IdAdmin INT NOT NULL AUTO_INCREMENT,
  Correo VARCHAR(255) NOT NULL,
  Contraseña VARCHAR(255) NOT NULL,
  PRIMARY KEY (IdAdmin)
);

CREATE TABLE Alumno
(
  Matricula CHAR(9) NOT NULL,
  IdAlumno INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (IdAlumno)
);

CREATE TABLE Aforo
(
  idAforo INT NOT NULL AUTO_INCREMENT,
  Aforo INT NOT NULL,
  Capacidad INT NOT NULL,
  PRIMARY KEY (idAforo)
);

CREATE TABLE Area
(
  IdArea INT NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(255) NOT NULL,
  Foto VARCHAR(255) NOT NULL,
  Croquis VARCHAR(255) NOT NULL,
  Tipo VARCHAR(255) NOT NULL,
  LinkCalendar VARCHAR(255),
  Descripcion VARCHAR(255) NOT NULL,
  Horarios VARCHAR(255) NOT NULL,
  Avisos VARCHAR(255),
  IdEdificio INT NOT NULL,
  idAforo INT,
  PRIMARY KEY (IdArea),
  FOREIGN KEY (IdEdificio) REFERENCES Edificio(IdEdificio),
  FOREIGN KEY (idAforo) REFERENCES Aforo(idAforo),
  UNIQUE (idAforo)
);

CREATE TABLE Hora
(
  IdHora INT NOT NULL AUTO_INCREMENT,
  Timestamp INT NOT NULL,
  Aforo INT NOT NULL,
  Capacidad INT NOT NULL,
  IdArea INT NOT NULL,
  PRIMARY KEY (IdHora),
  FOREIGN KEY (IdArea) REFERENCES Area(IdArea)
);

CREATE TABLE Dia
(
  IdDia INT NOT NULL AUTO_INCREMENT,
  Dia INT NOT NULL,
  TotalPersonas INT NOT NULL,
  IdArea INT NOT NULL,
  PRIMARY KEY (IdDia),
  FOREIGN KEY (IdArea) REFERENCES Area(IdArea)
);

/* STORED PROCEDURES */
--1
CREATE DEFINER=`sebas`@`%` PROCEDURE `MasAforo`(IN current_idArea INT)
sp:BEGIN
	DECLARE current_total INT;
    DECLARE current_idAforo INT;
	SELECT TotalPersonas INTO current_total FROM Dia WHERE IdArea = current_idArea AND Dia = CURDATE();
    SELECT idAforo INTO current_idAforo FROM Area WHERE IdArea = current_idArea;
    
    IF current_idAforo IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Area no encontrada';
        leave sp;
	ELSEIF (SELECT Aforo FROM Aforo WHERE idAforo = current_idAforo) >= (SELECT Capacidad FROM Aforo WHERE idAforo = current_idAforo) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Area llena, intente mas tarde';
        leave sp;
    ELSEIF current_total IS NULL THEN
        INSERT INTO Dia (Dia, TotalPersonas, IdArea) VALUES (CURDATE(), 1, current_idArea);
    ELSE
        START TRANSACTION;
        UPDATE Dia SET TotalPersonas = TotalPersonas + 1 WHERE IdArea = current_idArea AND Dia = CURDATE();
        UPDATE Aforo SET Aforo = Aforo + 1 WHERE idAforo = current_idAforo;
        COMMIT;
    END IF;
END

--2
CREATE PROCEDURE `MenosAforo`(IN current_idAforo INT)
BEGIN
    DECLARE current_aforo INT;
    SELECT Aforo INTO current_aforo FROM Aforo WHERE idAforo = current_idAforo;
    
    IF current_aforo=0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Area vacia, no hay gente que eliminar';
    ELSE
        SET current_aforo = current_aforo - 1;
        UPDATE Aforo SET Aforo = current_aforo WHERE idAforo = current_idAforo; 
    END IF;
END


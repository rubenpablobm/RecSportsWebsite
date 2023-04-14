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


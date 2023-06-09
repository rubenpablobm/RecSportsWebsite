/*CREACION DE LA BASE DE DATOS*/
/*https://chartio.com/resources/tutorials/how-to-define-an-auto-increment-primary-key-in-sql-server/ */
-- TSQL

CREATE TABLE Edificio
(
  IdEdificio INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Nombre NVARCHAR(255) NOT NULL,
  Foto NVARCHAR(255) NOT NULL,
  LinkMaps NVARCHAR(255) NOT NULL
);

CREATE TABLE Admin
(
  IdAdmin INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Correo NVARCHAR(255) NOT NULL,
  Contraseña NVARCHAR(255) NOT NULL
);

CREATE TABLE Alumno
(
  Matricula CHAR(9) NOT NULL PRIMARY KEY,
  --IdAlumno INT IDENTITY(1,1) NOT NULL PRIMARY KEY
);

CREATE TABLE Aforo
(
  Aforo INT NOT NULL,
  Capacidad INT NOT NULL,
  IdArea INT NOT NULL UNIQUE,
  PRIMARY KEY (IdArea),
  FOREIGN KEY (IdArea) REFERENCES Area(IdArea) ON DELETE CASCADE
);

CREATE TABLE Area
(
  IdArea INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Nombre NVARCHAR(255) NOT NULL,
  Foto NVARCHAR(255) NOT NULL,
  Croquis NVARCHAR(255) NOT NULL,
  Tipo NVARCHAR(255) NOT NULL,
  LinkCalendar NVARCHAR(255),
  Descripcion NVARCHAR(255) NOT NULL,
  Horarios NVARCHAR(255) NOT NULL,
  Avisos NVARCHAR(255),
  IdEdificio INT NOT NULL,
  idAforo INT,
  FOREIGN KEY (IdEdificio) REFERENCES Edificio(IdEdificio) ON DELETE CASCADE,
);

CREATE TABLE Hora
(
  IdHora INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Aforo INT NOT NULL,
  Capacidad INT NOT NULL,
  IdArea INT NOT NULL,
  FOREIGN KEY (IdArea) REFERENCES Area(IdArea)
);

CREATE TABLE Dia
(
  IdDia INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Dia INT NOT NULL,
  TotalPersonas INT NOT NULL,
  IdArea INT NOT NULL,
  FOREIGN KEY (IdArea) REFERENCES Area(IdArea)
);
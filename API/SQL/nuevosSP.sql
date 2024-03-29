--XACT_ABORT

CREATE PROCEDURE MasAforo
@current_idArea INT
AS
BEGIN

DECLARE @current_total INT;
DECLARE @current_idAforo INT; --es un idArea validada

SELECT @current_total = TotalPersonas FROM Dia WHERE IdArea = @current_idArea AND Dia = CONVERT(date, GETDATE());

SELECT @current_idAforo = idArea FROM Area WHERE IdArea = @current_idArea;

IF @current_idAforo IS NULL 
    BEGIN
    RAISERROR('Area no encontrada o no es de tipo Aforo', 16, 1);
    RETURN;
    END;
IF (SELECT Aforo FROM Aforo WHERE idArea = @current_idAforo) >= (SELECT Capacidad FROM Aforo WHERE idArea = @current_idAforo) 
    BEGIN
    RAISERROR('Area llena, intente mas tarde', 16, 1);
    RETURN;
    END;
IF @current_total IS NULL 
    BEGIN
        BEGIN TRANSACTION;
        INSERT INTO Dia (Dia, TotalPersonas, IdArea) VALUES (CAST(GETDATE() AS date), 1, @current_idArea);
        UPDATE Aforo SET Aforo = Aforo + 1 WHERE idArea = @current_idAforo;
        COMMIT TRANSACTION;
    END;
ELSE
    BEGIN
        BEGIN TRANSACTION;
        UPDATE Dia SET TotalPersonas = TotalPersonas + 1 WHERE IdArea = @current_idArea AND Dia = CAST(GETDATE() AS date);
        UPDATE Aforo SET Aforo = Aforo + 1 WHERE idArea = @current_idAforo;
        COMMIT TRANSACTION;
    END;
END;

/*TSQL 2*/

CREATE PROCEDURE MenosAforo
@current_idArea INT
AS
BEGIN
DECLARE @current_idAforo INT; --es un idArea validada
DECLARE @current_aforo INT;
SELECT @current_idAforo = idArea FROM Area WHERE IdArea = @current_idArea;
SELECT @current_aforo = Aforo FROM Aforo WHERE idArea = @current_idArea;

IF @current_idAforo IS NULL 
    BEGIN
    RAISERROR('Area no encontrada o no es de tipo Aforo', 16, 1);
    RETURN;
END;

IF @current_aforo = 0 
BEGIN
    RAISERROR('Area vacia, no hay gente que eliminar', 16, 1);
    RETURN;
END; 

SET @current_aforo = @current_aforo - 1;
UPDATE Aforo SET Aforo = @current_aforo WHERE idArea = @current_idAforo;
END;




CREATE PROCEDURE `ConsultaDato`
@current_idEdificio INT AS
BEGIN
    SELECT
END;


/*SP 3*/
CREATE PROCEDURE CrearArea
    @Nombre NVARCHAR(255),
    @Foto NVARCHAR(255),
    @Croquis NVARCHAR(255),
    @Tipo NVARCHAR(255),
    @LinkCalendar NVARCHAR(255),
    @Descripcion NVARCHAR(255),
    @Horarios NVARCHAR(255),
    @Avisos NVARCHAR(255),
    @IdEdificio INT,
    @Capacidad INT
AS
BEGIN
DECLARE @siAforo_IdArea INT;
        INSERT INTO Area (Nombre, Foto, Croquis, Tipo, LinkCalendar, Descripcion, Horarios, Avisos, IdEdificio) VALUES (@Nombre, @Foto, @Croquis, @Tipo, @LinkCalendar, @Descripcion, @Horarios, @Avisos, @IdEdificio); 
        SET @siAforo_IdArea = SCOPE_IDENTITY();
        IF @Capacidad>0
            BEGIN
            INSERT INTO Aforo (IdArea, Aforo, Capacidad) VALUES (@siAforo_IdArea, 0, @Capacidad)
            END;
END;

/*
SP 4
https://stackoverflow.com/questions/18371968/sql-variable-to-hold-list-of-integers
*/

/*TSQL*/
CREATE PROCEDURE MasAforo
@current_idArea INT
AS
BEGIN

DECLARE @current_total INT;
DECLARE @current_idAforo INT;

SELECT @current_total = TotalPersonas 
FROM Dia 
WHERE IdArea = @current_idArea AND Dia = CONVERT(date, GETDATE());

SELECT @current_idAforo = idAforo 
FROM Area 
WHERE IdArea = @current_idArea;

IF @current_idAforo IS NULL 
    BEGIN
    RAISERROR('Area no encontrada o no es de tipo Aforo', 16, 1);
    RETURN;
    END;
IF (SELECT Aforo FROM Aforo WHERE idAforo = @current_idAforo) >= (SELECT Capacidad FROM Aforo WHERE idAforo = @current_idAforo) 
    BEGIN
    RAISERROR('Area llena, intente mas tarde', 16, 1);
    RETURN;
    END;
IF @current_total IS NULL 
    BEGIN TRANSACTION;
    INSERT INTO Dia (Dia, TotalPersonas, IdArea) VALUES (CONVERT(date, GETDATE()), 1, @current_idArea);
    UPDATE Aforo SET Aforo = Aforo + 1 WHERE idAforo = @current_idAforo;
    COMMIT TRANSACTION;
ELSE
    BEGIN TRANSACTION;
    UPDATE Dia SET TotalPersonas = TotalPersonas + 1 WHERE IdArea = @current_idArea AND Dia = CONVERT(date, GETDATE());
    UPDATE Aforo SET Aforo = Aforo + 1 WHERE idAforo = @current_idAforo;
    COMMIT TRANSACTION;
END;

/*TSQL 2*/

CREATE PROCEDURE MenosAforo
@current_idAforo INT
AS
BEGIN

DECLARE @current_aforo INT;
SELECT @current_aforo = Aforo FROM Aforo WHERE idAforo = @current_idAforo;
IF @current_aforo = 0 
BEGIN
    RAISERROR('Area vacia, no hay gente que eliminar', 16, 1);
    RETURN;
END;
ELSE
BEGIN
    SET @current_aforo = @current_aforo - 1;
    UPDATE Aforo SET Aforo = @current_aforo WHERE idAforo = @current_idAforo; 
END;
END;

/* STORED PROCEDURES MYSQL */
--1
CREATE DEFINER=`sebas`@`%` PROCEDURE `MasAforo`(IN current_idArea INT)
sp:BEGIN
	DECLARE current_total INT;
    DECLARE current_idAforo INT;
	SELECT TotalPersonas INTO current_total FROM Dia WHERE IdArea = current_idArea AND Dia = CURDATE();
    SELECT idAforo INTO current_idAforo FROM Area WHERE IdArea = current_idArea;
    
    IF current_idAforo IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Area no encontrada o no es de tipo Aforo';
        leave sp;
	ELSEIF (SELECT Aforo FROM Aforo WHERE idAforo = current_idAforo) >= (SELECT Capacidad FROM Aforo WHERE idAforo = current_idAforo) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Area llena, intente mas tarde';
        leave sp;
    ELSEIF current_total IS NULL THEN
        START TRANSACTION;
        INSERT INTO Dia (Dia, TotalPersonas, IdArea) VALUES (CURDATE(), 1, current_idArea);
        UPDATE Aforo SET Aforo = Aforo + 1 WHERE idAforo = current_idAforo;
        COMMIT;
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


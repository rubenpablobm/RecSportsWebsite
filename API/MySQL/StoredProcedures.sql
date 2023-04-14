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


DELIMITER //
CREATE OR REPLACE PROCEDURE sp_RegisterUser(IN username varchar(50), IN password varchar(50))
BEGIN
    IF NOT EXISTS (SELECT * FROM Users WHERE Username=username AND Password=password) THEN
        INSERT INTO Users (Username, Password) VALUES (username, password);
    END IF;
END; //
DELIMITER ;

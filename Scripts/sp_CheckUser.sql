DELIMITER //
CREATE OR REPLACE PROCEDURE sp_CheckUser(username varchar(50), password varchar(50))
BEGIN
    SELECT COUNT(*) FROM Users WHERE Username=username AND Password=password;
END //
DELIMITER ;

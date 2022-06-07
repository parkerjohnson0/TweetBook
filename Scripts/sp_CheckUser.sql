DELIMITER //
CREATE OR REPLACE PROCEDURE sp_CheckUser(user_name varchar(50))
BEGIN
    SELECT Username,Avatar, UserID, Hash, Salt FROM Users WHERE Username=user_name;
END //
DELIMITER ;

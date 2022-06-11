DELIMITER //
CREATE OR REPLACE PROCEDURE sp_CheckUserByToken(user_id int)
BEGIN
    SELECT Username,Avatar, UserID, Hash, Salt FROM Users WHERE UserID=user_id;
END //
DELIMITER ;

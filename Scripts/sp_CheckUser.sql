DELIMITER //
CREATE OR REPLACE PROCEDURE sp_CheckUser(user_name varchar(50), pass_word varchar(50))
BEGIN
    SELECT Username,Avatar, UserID FROM Users WHERE Username=user_name AND Password=pass_word;
END //
DELIMITER ;

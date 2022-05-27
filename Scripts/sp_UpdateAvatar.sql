DELIMITER //
CREATE OR REPLACE PROCEDURE sp_UpdateAvatar(IN avatar_file varchar(50), IN user_id INT)
BEGIN
    UPDATE Users SET Avatar = avatar_file WHERE UserID = user_id;
END; //
DELIMITER ;

DELIMITER //
CREATE OR REPLACE PROCEDURE sp_RegisterUser(IN user_name varchar(50), IN pass_word varchar(50))
BEGIN
        INSERT INTO Users (Username, Password, Avatar) VALUES (user_name, pass_word, "guest.png");
        SELECT UserID
        FROM Users
        WHERE Username=user_name;
END; //
DELIMITER ;

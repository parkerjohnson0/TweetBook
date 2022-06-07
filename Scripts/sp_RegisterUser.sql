DELIMITER //
CREATE OR REPLACE PROCEDURE sp_RegisterUser(IN user_name varchar(50), IN salt_param varchar(200), IN hash_param varchar(200))
BEGIN
        INSERT INTO Users (Username, Hash, Salt, Avatar) VALUES (user_name, hash_param, salt_param,"guest.png");
        SELECT UserID
        FROM Users
        WHERE Username=user_name;
END; //
DELIMITER ;

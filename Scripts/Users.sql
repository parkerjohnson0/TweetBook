DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
  UserID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Username varchar(50) DEFAULT NULL UNIQUE,
  Password varchar(100) DEFAULT NULL,
Avatar varchar(50));

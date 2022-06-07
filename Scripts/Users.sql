DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
  UserID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Username varchar(50) DEFAULT NULL UNIQUE,
  Hash varchar(200) DEFAULT NULL,
    Salt varchar(200),
Avatar varchar(50));

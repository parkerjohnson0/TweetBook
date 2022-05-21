USE TweetBook;
CREATE TABLE Posts (PostID int PRIMARY KEY AUTO_INCREMENT,
ParentPostID int, Username varchar(50), Content varchar(280), Avatar varchar(50),
TimePosted datetime);

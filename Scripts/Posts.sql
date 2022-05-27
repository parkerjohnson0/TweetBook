USE TweetBook;
DROP TABLE IF EXISTS Posts;
CREATE TABLE Posts (PostID int PRIMARY KEY AUTO_INCREMENT,
ParentPostID int, UserID int, Content varchar(280),
TimePosted datetime);

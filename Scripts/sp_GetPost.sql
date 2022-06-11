DELIMITER //
CREATE OR REPLACE PROCEDURE sp_GetPost(IN post_id INT)
BEGIN
    SELECT Posts.PostID, Posts.ParentPostID, Posts.UserID, Posts.Content,
    Posts.TimePosted, Users.UserID, Users.Username, Users.Avatar
    FROM Posts
    JOIN Users ON Posts.UserID = Users.UserID
    WHERE Posts.PostID=post_id;


END //
DELIMITER ;

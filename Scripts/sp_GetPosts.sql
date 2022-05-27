DELIMITER //
CREATE OR REPLACE PROCEDURE sp_GetPosts(IN post_id INT)
BEGIN
    IF (post_id =  null) THEN
        SELECT Posts.PostID, Posts.ParentPostID, Posts.UserID, Posts.Content,
        Posts.TimePosted, Users.UserID, Users.Username, Users.Avatar
        FROM Posts
        JOIN Users ON Posts.UserID = Users.UserID;
    ELSE
        SELECT Posts.PostID, Posts.ParentPostID, Posts.UserID, Posts.Content,
        Posts.TimePosted, Users.UserID, Users.Username, Users.Avatar
        FROM Posts
        JOIN Users ON Posts.UserID = Users.UserID;
    END IF;

END //
DELIMITER ;

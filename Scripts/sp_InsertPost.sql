DELIMITER //
CREATE OR REPLACE PROCEDURE sp_InsertPost(IN parent_post_id INT, IN username varchar(50) ,IN content varchar(280) , IN avatar varchar(50))
BEGIN
    INSERT INTO Posts (ParentPostID, Username, Content, Avatar,TimePosted) VALUES (parent_post_id, username, content, avatar, Now());
END //
DELIMITER ;


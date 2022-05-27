DELIMITER //
CREATE OR REPLACE PROCEDURE sp_InsertPost(IN parent_post_id INT, IN user_id int ,IN content varchar(280))
BEGIN
    INSERT INTO Posts (ParentPostID, UserID,Content,TimePosted) VALUES (parent_post_id, user_id, content,  Now());
END //
DELIMITER ;


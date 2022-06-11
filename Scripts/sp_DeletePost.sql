DELIMITER //
CREATE OR REPLACE PROCEDURE sp_DeletePost(IN post_id INT)
BEGIN

    DELETE FROM Posts WHERE post_id=PostID OR post_id=ParentPostID;
END //
DELIMITER ;

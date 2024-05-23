DELIMITER //

CREATE TRIGGER update_onDelete
BEFORE DELETE ON prods
FOR EACH ROW
BEGIN
    DELETE FROM dirprods WHERE prod_id = OLD.prod_id;  
    DELETE FROM aucprods WHERE prod_id = OLD.prod_id;  
END//

DELIMITER ;

drop trigger update_onDelete;
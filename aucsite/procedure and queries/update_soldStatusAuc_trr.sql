


DELIMITER //
CREATE TRIGGER update_aucsoldStatus
AFTER UPDATE ON aucprods
FOR EACH ROW
BEGIN
    IF NEW.payment_status = 'success' THEN
        UPDATE prods 
        SET sold_status = 'true' 
        WHERE prod_id = NEW.prod_id;
    END IF;
END//
DELIMITER ;

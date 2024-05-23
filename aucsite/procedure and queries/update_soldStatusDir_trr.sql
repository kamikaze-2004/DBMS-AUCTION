


DELIMITER //
CREATE TRIGGER update_soldStatus
AFTER UPDATE ON dirprods
FOR EACH ROW
BEGIN
    IF NEW.payment_status = 'success' THEN
        UPDATE prods 
        SET sold_status = 'true' 
        WHERE prod_id = NEW.prod_id;
    END IF;
END//
DELIMITER ;

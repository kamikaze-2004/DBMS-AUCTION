DELIMITER //

CREATE PROCEDURE get_userInfo (
    IN uname VARCHAR(25),
    OUT p_username VARCHAR(25),
    OUT p_email VARCHAR(50),
    OUT p_password VARCHAR(50),
    OUT p_firstname VARCHAR(50),
    OUT p_lastname VARCHAR(50),
    OUT p_address VARCHAR(100),
    OUT p_address2 VARCHAR(100),
    OUT p_city VARCHAR(50),
    OUT p_state VARCHAR(25),
    OUT p_zipcode VARCHAR(10)
)
BEGIN
    -- Attempt to select the user info into the OUT parameters.
    SELECT username, email, password, firstname, lastname, address, address2, city, state, zipcode
    INTO p_username, p_email, p_password, p_firstname, p_lastname, p_address, p_address2, p_city, p_state, p_zipcode
    FROM users
    WHERE username = uname;

    -- Handle the case where no user is found by setting output parameters to NULL.
    IF ROW_COUNT() = 0 THEN
        SET p_username = NULL;
        SET p_email = NULL;
        SET p_password = NULL;
        SET p_firstname = NULL;
        SET p_lastname = NULL;
        SET p_address = NULL;
        SET p_address2 = NULL;
        SET p_city = NULL;
        SET p_state = NULL;
        SET p_zipcode = NULL;
    END IF;
END //

DELIMITER ;

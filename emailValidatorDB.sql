DROP DATABASE IF EXISTS email_validator;

CREATE DATABASE email_validator;
USE email_validator;

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE email (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    isVerified BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE phone (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(255) NOT NULL UNIQUE,
    isVerified BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE email_user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    email_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (email_id) REFERENCES email(id)
);

CREATE TABLE phone_user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    phone_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (phone_id) REFERENCES phone(id)
);


-- SPs
DELIMITER //

CREATE PROCEDURE sp_register_user(
    IN userName VARCHAR(255), 
    IN userEmail VARCHAR(255), 
    IN userPhone VARCHAR(255)
)
BEGIN
    DECLARE last_user_id INT;
    DECLARE last_email_id INT;
    DECLARE last_phone_id INT;

    -- Declare an exit handler for SQL exceptions
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback changes on exception
        ROLLBACK;

        -- Return an error message
        SELECT 'Error: Registration failed; changes rolled back' AS error_message;
    END;

    -- Main logic
    BEGIN
        -- Start a transaction
        START TRANSACTION;

        -- Insert into user table
        INSERT INTO user (name) VALUES(userName);
        SET last_user_id = LAST_INSERT_ID();

        -- Insert into email table
        INSERT INTO email (email) VALUES(userEmail);
        SET last_email_id = LAST_INSERT_ID();

        -- Insert into phone table
        INSERT INTO phone (phone) VALUES(userPhone);
        SET last_phone_id = LAST_INSERT_ID();

        -- Insert into email_user and phone_user tables
        INSERT INTO email_user (user_id, email_id) VALUES(last_user_id, last_email_id);
        INSERT INTO phone_user (user_id, phone_id) VALUES(last_user_id, last_phone_id);

        -- Commit the transaction
        COMMIT;

        -- Return a success message
        SELECT 'Registration successful' AS success_message;
    END;
END//

DELIMITER ;
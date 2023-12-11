DROP DATABASE IF EXISTS email_validator;

CREATE DATABASE email_validator;
USE email_validator;

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

CREATE TABLE email (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255),
    isVerified BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE phone (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(255),
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

-- JOINS
-- SELECT name, email, phone 
-- FROM user 
-- LEFT JOIN email_user ON user.id = email_user.user_id
-- LEFT JOIN email ON email_user.email_id = email.id
-- LEFT JOIN phone_user ON user.id = phone_user.user_id
-- LEFT JOIN phone ON phone_user.phone_id = phone.id
-- WHERE email = 'arturo@mail.com';

-- INSERT INTO email (email) VALUES ("arturo2@mail.com");
-- INSERT INTO email_user (user_id, email_id) VALUES (1, 3);

-- UPDATE email SET isVerified = true WHERE email = "daniel@mail.com"
-- UPDATE email SET isValidated = true WHERE email = "daniel@mail.com";

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

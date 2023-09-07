DROP DATABASE eassetdb;
CREATE DATABASE eassetdb;
USE eassetdb;
-- Create the USER table
CREATE TABLE USER (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    role VARCHAR(10) CHECK (role IN ('Admin', 'Borrower')),
    telephone VARCHAR(255),
    email VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255)
);

-- Create the CATEGORY table
CREATE TABLE CATEGORY (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    lendingPeriod INT,
    lateFeesPerDay FLOAT,
    banningPeriod INT
);

-- Create the ASSET table
CREATE TABLE ASSET (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    categoryId INT,
    description VARCHAR(255),
    dateAdded DATE,
    isAvailable BOOLEAN,
    FOREIGN KEY (categoryId) REFERENCES CATEGORY(id)
);

-- Create the BORROWEDASSET table
CREATE TABLE BORROWEDASSET (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    assetId INT,
    userId INT,
    borrowingDate DATE,
    FOREIGN KEY (assetId) REFERENCES ASSET(id),
    FOREIGN KEY (userId) REFERENCES USER(id)
);

-- Insert data into the CATEGORY table
INSERT INTO CATEGORY (id, name, lendingPeriod, lateFeesPerDay, banningPeriod)
VALUES
    (1, 'Laptop', 10, 100.0, 14),
    (2, 'Books', 7, 15.0, 0),
    (3, 'Mobile', 15, 75.0, 10);

-- Insert data into the USER table
INSERT INTO USER (id, name, role, telephone, email, username, password)
VALUES
    (1, 'John Doe', 'Admin', '+123456789', 'john.doe@example.com', 'johndoe', 'password123'),
    (2, 'Alice Smith', 'Borrower', '+987654321', 'alice.smith@example.com', 'alicesmith', 'mypassword'),
     (3, 'Jane Smith', 'Borrower', '+987654321', 'jane.smith@example.com', 'janesmith', 'mypassword'),
      (4, 'Jack Smith', 'Borrower', '+987654321', 'jack.smith@example.com', 'jacksmith', 'mypassword');

-- Insert data into the ASSET table
INSERT INTO ASSET (id, name, categoryId, description, dateAdded, isAvailable)
VALUES
    (1, 'Laptop', 1, 'Dell XPS 13', '2023-09-07', FALSE),
    (2, 'Nokia 030', 3, 'Heavy-duty', '2023-09-07', TRUE),
    (3, 'Book - The Great Gatsby', 2, 'Classic novel', '2023-09-07', FALSE);

-- Insert data into the BORROWEDASSET table
INSERT INTO BORROWEDASSET (id, assetId, userId, borrowingDate)
VALUES
    (1, 1, 2, '2023-09-08'),
    (2, 3, 1, '2023-09-10');

SELECT * FROM BORROWEDASSET;
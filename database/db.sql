CREATE DATABASE ng_notes_db;

USE ng_notes_db;

CREATE TABLE categories(
    categoryId INT AUTO_INCREMENT PRIMARY KEY,
    categoryName VARCHAR(100) NOT NULL,
    categoryDescription VARCHAR(255)
);

CREATE TABLE notes(
    noteId INT AUTO_INCREMENT PRIMARY KEY,
    noteName VARCHAR(100) NOT NULL,
    noteText TEXT,
    categoryId INT,
    FOREIGN KEY (categoryId)
        REFERENCES categories(categoryId)
            ON UPDATE CASCADE
            ON DELETE CASCADE
);
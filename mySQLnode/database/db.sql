CREATE DATABASE database_links;

USE database_links;

CREATE TABLE users(
   id INT(11) NOT null,
   username VARCHAR(16) not null,
   password VARCHAR(60) not null,
   fullname VARCHAR(100) NOT NULL

);

ALTER TABLE users
   ADD PRIMARY KEY (id);

ALTER TABLE users
   modify id INT(11) NOT NULL auto_increment, auto_increment = 2;

describe users;
/* LINKS table */

CREATE TABLE links(
   id int(11) not NULL,
   title VARCHAR(150) NOT NULL,
   url VARCHAR(255) NOT NULL,
   description TEXT,
   user_id INT(11),
   created_at timestamp NOT NULL DEFAULT  current_timestamp,
   constraint fk_user FOREIGN KEY (user_id) references users(id)
)

alter TABLE links
   ADD PRIMARY KEY (id);

ALTER TABLE links 
   modify ID INT(11) not null auto_increment, auto_increment =2;
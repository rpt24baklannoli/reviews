-- Run with time psql reviews --username=postgres --file=database/database_postgres/postgres.sql
-- To avoid entering password every time, I added a file to the home directory ~/.pgpass
-- and in this file I wrote: localhost:5432:reviews:postgres:admin

-- run it only on the first time you use this database
--DROP DATABASE IF EXISTS reviews;
--CREATE DATABASE reviews;

DROP TABLE IF EXISTS Reviews;
--CREATE DATABASE Reviews;

DROP TABLE IF EXISTS Items;
CREATE TABLE Items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  item_name TEXT
);

CREATE TABLE Reviews (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY ,
  customer_name VARCHAR(255) NOT NULL,
  date_of_review VARCHAR(100),
  rating INTEGER,
  review_content TEXT,
  image_url VARCHAR(255),
  item_option VARCHAR(200),
  ItemId INTEGER,
  CONSTRAINT fk_item
      FOREIGN KEY(ItemId)
	  REFERENCES Items(id),
  CONSTRAINT valid_rating CHECK (rating >= 1 AND rating <= 5)
);

CREATE  INDEX itemId_idx ON Reviews (ItemId);

/*
// copy command for uploading the postgreSQL database
 \COPY Items(item_name) FROM PROGRAM 'cat ./database/items.csv' WITH (FORMAT CSV, HEADER)

\COPY Reviews(customer_name,date_of_review,rating,review_content,image_url,ItemId,item_option) FROM PROGRAM 'cat ./database/reviews.csv' WITH (FORMAT CSV, HEADER)*/

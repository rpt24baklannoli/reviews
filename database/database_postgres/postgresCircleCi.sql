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


 INSERT INTO
    Items (item_name)
VALUES
    ('Baby Girl Coming Home Outfit, Rainbow baby, Newborn Girl Coming Home Outfit Baby Girl Clothes Personalized Outfit' ),
    ('Silky Woman pajams long sleeve pajama Bridesmaid Pajama, Bridesmaid, Bridal, gifts for her, holiday gifts for her'),
    ('Paper Love Tulips Pop Up Card, 3D Popup Greeting Cards, for Mothers Day, Fathers Day, Spring, Birthday, Wedding, Anniversary, Thank You'),
    ('Corduroy jacket/Velvet jacket/Pink women jacket/OFFON CLOTHING'),
    ('Organic Cotton/Bamboo Turtleneck in Lapis Chandelier'),
    ('PLeather drawer pulls | Leather drawer handles | Kitchen cabinet handles | Leather cabinet pulls | Leather cabinet handle | Black drawer pull'),
    ('Tulips from Amsterdam – springlike flower ring with colourful plastic mini-tulips on a green ring made of resin from Geschmeide unter Teck'),
    ('Spice & Pantry Label Bundle (Minimal Collection) • Water Resistant • Durable • Kitchen Organization'),
    ('Personalised Reach for the Stars Space Canvas Height Chart, Kids growth chart, wall hanging, blue, purple or grey, in feet, inches & cms')
    ;
INSERT INTO
    Reviews (customer_name, date_of_review, rating, review_content, image_url, item_option, ItemId)
VALUES
    ('Jennifer Stewart', 'Oct 31 2020', 5, '', 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/269.jpg','Hot Pink', 1),
    ('thebec69', 'Nov 11 2020', 5, '', 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/280.jpg', 'Black', 2),
    ('Beverly Smith','Nov 10 2020', 5, 'Really love this mask in black! I received a lot of compliments. It was delivered on time .', 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/269.jpg', 'Yellow', 4),
    ('Kazza', 'Nov 11 2020', 2, 'Speedy delivery Item nice Recommend', 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/222.jpg', 'Christmas tree+bow', 2),
    ('Angela Naylor', 'Oct 21 2020', 4, 'Absolutely beautiful will definitely be purchasing some more . Delivery time outstanding so quick thank you so much xx 💜', 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/666.jpg','RED', 1),
    ('Laura Hendricks', 'Sep 3 2019', 1, 'do not buy this', 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/898.jpg', 'Pink', 7),
    ('Sharon Joe', 'May 1 2018', 3, 'I would not but it again but the quality is okay', 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/898.jpg', 'Blue', 7),
    ('Ezra Hazan', 'Sep 15 2018', 5, 'Just greart', 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/898.jpg', 'Black', 8),
    ('Shlomi Harazi', 'Jan 3 2020', 1, 'low quality', 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/899.jpg', 'Blue', 5),
    ('Shalom Elimelech', 'April 7 2020', 4, 'nice product', 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/555.jpg', 'Black', 3),
    ('Shuki Ben Zaken', 'Feb 1 2019', 5, 'Great Great', 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/666.jpg', 'Black', 2),
    ('Shuki Ben Zaken', 'Feb 1 2019', 5, 'Great Great', 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/666.jpg', 'Black', 7),
    ('Chen Ben Zaken', 'Feb 1 2018', 5, 'Great Great', 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/666.jpg', 'Black', 6),
    ('Dror Ben Zaken', 'Feb 1 2019', 5, 'Great Great', 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/666.jpg', 'Black', 2),
    ('Haled Cohen', 'Feb 1 2019', 5, 'Great Great', 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/666.jpg', 'Black', 9)
    ;

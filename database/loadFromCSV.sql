SET foreign_key_checks = 0;
LOAD DATA LOCAL INFILE './database/items.csv' INTO TABLE Items FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (item_name, createdAt, updatedAt,id);

LOAD DATA LOCAL INFILE './database/reviews.csv' INTO TABLE Reviews FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (customer_name,date_of_review,rating,review_content,image_url,ItemId,item_option,createdAt,updatedAt,id);

SET foreign_key_checks = 1;
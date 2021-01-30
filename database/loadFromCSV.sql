LOAD DATA LOCAL INFILE './items.csv' INTO TABLE Items FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (item_name, @createdAt, @updatedAt,id) SET createdAt = STR_TO_DATE(@createdAt, '%Y-%c-%e'),  updatedAt = STR_TO_DATE(@updatedAt, '%Y-%c-%e');

SET foreign_key_checks = 0;
LOAD DATA LOCAL INFILE './reviews.csv' INTO TABLE Reviews FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (customer_name,date_of_review,rating,review_content,image_url,ItemId,item_option,@createdAt,@updatedAt,id) SET createdAt = STR_TO_DATE(@createdAt, '%Y-%c-%e'),  updatedAt = STR_TO_DATE(@updatedAt, '%Y-%c-%e');

SET foreign_key_checks = 1;
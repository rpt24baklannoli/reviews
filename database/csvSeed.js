const fs = require('fs');
//const csvWriter = require('csv-write-stream');
const { Review, Item, sequelize} = require('./model.js');

const { getFakeItem } = require('./utils/itemsSeed.js');
const { getFakeReview } = require('./utils/reviewsSeed.js');

// creating the items and review tables (empty)
sequelize.sync({ force: true })
  .then(() => {
    //console.log('mysql tables were created');
  })
  .catch((err) => {
    console.log('could not create');
  })
  .finally(() => {
    sequelize.close();
  });


const itemsToGenerate = 10000000;

const reviewsToGenerate = 50000000;

// Items
/*
LOAD DATA LOCAL INFILE './items.csv' INTO TABLE Items FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (item_name, @createdAt, @updatedAt,id) SET createdAt = STR_TO_DATE(@createdAt, '%Y-%c-%e'),  updatedAt = STR_TO_DATE(@updatedAt, '%Y-%c-%e');
*/
const createItems = () => {
  console.log("Creating items");
  var numItems = itemsToGenerate;
  const writer = fs.createWriteStream('./database/items.csv');
  writer.write('item_name\n');
  function writeItems() {
    var ok = true;
    do {
      numItems -= 1;
      if (numItems === 0) {
        // last time!
        let item = getFakeItem();
        item.id = numItems;
        writer.write(`${item.item_name}\n`);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        let item = getFakeItem();
        item.id = numItems;
        ok = writer.write(`${item.item_name}\n`);
        if (numItems % 100000 === 0) {console.log(`Writing ${numItems}`);}
      }
    } while (numItems > 0 && ok);
    if (numItems > 0) {
      // had to stop early!
      // write some more once it drains
      //console.log("Needs drain...");
      writer.once('drain', writeItems);
    }
    // writer.end();
  }

  writeItems();
}


// Reviews
/*
LOAD DATA LOCAL INFILE './reviews.csv' INTO TABLE Reviews FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (customer_name,date_of_review,rating,review_content,image_url,ItemId,item_option,@createdAt,@updatedAt,id) SET createdAt = STR_TO_DATE(@createdAt, '%Y-%c-%e'),  updatedAt = STR_TO_DATE(@updatedAt, '%Y-%c-%e');

*/
const createReviews = () => {
  console.log("Creating reviews");
  var numReviews = reviewsToGenerate;


  const writer = fs.createWriteStream('./database/reviews.csv');
  writer.write('customer_name,date_of_review,rating,review_content,image_url,ItemId,item_option\n');

  function writeReviews() {
    var ok = true;
    do {
      numReviews -= 1;
      if (numReviews === 0) {
        // last time!
        let review = getFakeReview(itemsToGenerate);
        review.id = numReviews;
        writer.write(`${review.customer_name},"${review.date_of_review}",${review.rating},${review.review_content},${review.image_url},${review.ItemId},${review.item_option}\n`);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        let review = getFakeReview(itemsToGenerate);
        review.id = numReviews;
        ok = writer.write(`${review.customer_name},"${review.date_of_review}",${review.rating},${review.review_content},${review.image_url},${review.ItemId},${review.item_option}\n`);
        if (numReviews % 100000 === 0) { console.log(`Writing ${numReviews}`);}
      }
    } while (numReviews > 0 && ok);
    if (numReviews > 0) {
      // had to stop early!
      // write some more once it drains
      //console.log("Needs drain...");
      writer.once('drain', writeReviews);
    }
  }
  writeReviews();
};

const createReviewsWithFilename = (numReviews, filename) => {
  console.log("Creating reviews in ", filename);
  var numReviews = numReviews;


  const writer = fs.createWriteStream(filename);
  writer.write('customer_name,date_of_review,rating,review_content,image_url,ItemId,item_option\n');

  function writeReviews() {
    var ok = true;
    do {
      numReviews -= 1;
      if (numReviews === 0) {
        // last time!
        let review = getFakeReview(itemsToGenerate);
        review.id = numReviews;
        writer.write(`${review.customer_name},"${review.date_of_review}",${review.rating},${review.review_content},${review.image_url},${review.ItemId},${review.item_option}\n`);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        let review = getFakeReview(itemsToGenerate);
        review.id = numReviews;
        ok = writer.write(`${review.customer_name},"${review.date_of_review}",${review.rating},${review.review_content},${review.image_url},${review.ItemId},${review.item_option}\n`);
        if (numReviews % 100000 === 0) { console.log(`Writing ${numReviews}`);}
      }
    } while (numReviews > 0 && ok);
    if (numReviews > 0) {
      // had to stop early!
      // write some more once it drains
      //console.log("Needs drain...");
      writer.once('drain', writeReviews);
    }
  }
  writeReviews();
};


createItems();
//createReviews();

createReviewsWithFilename(10000000, './database/reviews1.csv');
createReviewsWithFilename(10000000, './database/reviews2.csv');
createReviewsWithFilename(10000000, './database/reviews3.csv');
createReviewsWithFilename(10000000, './database/reviews4.csv');
createReviewsWithFilename(10000000, './database/reviews5.csv');

// ,${review.createdAt},${review.updatedAt},${review.id}
// ,${item.updatedAt},${item.id}
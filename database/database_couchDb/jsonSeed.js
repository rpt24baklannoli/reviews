const faker = require('faker');
const fs = require('fs');
const { getFakeItem } = require('../utils/itemsSeed.js');
const { getFakeReview } = require('../utils/reviewsSeed.js');

const generateItem = () => {
  const reviewsPerItem = faker.random.number({
    min: 1,
    max: 10,
  });
  let item = getFakeItem();
  item.reviews = [];
  for (let i = 0; i < reviewsPerItem; i++) {
    let review = getFakeReview();
    delete review.ItemId;
    review.id = i + 1;
    item.reviews.push(review);
  }
  //console.log(item);
  return item;
};

const itemsToGenerate = 10000000;
const numPartitions = 10;


const createItems = () => {
  //console.log("Creating items");
  var numItems = itemsToGenerate;
  const writer = fs.createWriteStream('./database/items.json');
  let writeItems = () => {
    var ok = true;
    do {
      let itemObj = generateItem();
      let partition = numItems % numPartitions;
      itemObj._id = `${partition}:${numItems}`;
      //console.log(itemObj._id);

      let item = `${JSON.stringify(itemObj)}\n`;
      //item.id = numItems;
      numItems -= 1;
      if (numItems === 0) {
        // last time!
        writer.write(item);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(item);
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
  };

  writeItems();
};

createItems();
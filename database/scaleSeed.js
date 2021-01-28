const Sequelize = require('sequelize')
const faker = require('faker');

const { getFakeItem } = require('./utils/itemsSeed.js');
const { getFakeReview } = require('./utils/reviewsSeed.js');

const { Review, Item, sequelize} = require('./model.js');

const numItems = 10000;
const numReviews = 100000;

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`);
    // insert Items
    async function createItems() {
      let itemsPromises = [];
      for (let i = 0; i < numItems; ++i) {
        itemsPromises.push(Item.create(getFakeItem()));
      }
      const itemsResult = await Promise.all(itemsPromises);
      return itemsResult;
    }

    createItems();
    console.log("done items");
  }).then( () => {
    // insert reviews
    let batchSize = 1000;

    async function insertBatch() {
      let promisesArr = [];
      for (let j = 0; j < batchSize; ++j) {
        promisesArr.push(Review.create(getFakeReview(numItems)));
      }
      const batchResult = await Promise.all(promisesArr)
      console.log(`Done inserting batch`);
      return batchResult;
    }

    let numOfBatches = numReviews / batchSize;
    console.log(`Dividing ${numReviews} reviews into ${numOfBatches} batches of ${batchSize}`);

    for (let batchNum = 0; batchNum < numOfBatches; ++batchNum) {
      insertBatch();
      console.log(`Done inserting batch ${batchNum} , inserted ${batchNum * batchSize} reviews`);
    }
  })
  .then(() => {
    console.log('reviews created');
  })
  .catch((err) => {
    console.log('failed to create reviews in bulk');
    console.log(err);
  })
  .finally(() => {
    //sequelize.close();
  });


/*
A different approach for reviews: Transactions with createBulk:

async function createInBulk() {
      let reviewsArr = [];
      for (let k = 0; k < batchSize; k++) {
        let curReview = getFakeReview();
        //console.log(curReview);
        reviewsArr.push(curReview);
      }

      // create a transaction for the bulk create that will commit when the bulk create is done.

      try {
        await sequelize.transaction((t) => {
          return Review.bulkCreate(reviewsArr, { validate: true, transaction: t });
        });
      } catch(err) {
        console.log("bulk error" + err);
      }
      //await Review.bulkCreate(reviewsArr, { validate: true })
    }

    let numOfBatches = numReviews / batchSize;
    console.log(`Dividing ${numReviews} reviews into ${numOfBatches} batches of ${batchSize}`);

    for (let batchNum = 0; batchNum < numOfBatches; ++batchNum) {
      createInBulk();
      console.log(`Done inserting batch ${batchNum} , inserted ${batchNum * batchSize} reviews`);
    }
*/
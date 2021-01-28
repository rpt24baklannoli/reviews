/*
 * DEFECTIVE FILE , NOT IN USE
 */


// const { Sequelize } = require('sequelize');
const itemsData = require('./itemsSeed');
const { reviewsData, getFakeReview } = require('./reviewsSeed');

const { db, Item, Review } = require('..');

// db
//     .sequelize
//     .query('SET FOREIGN_KEY_CHECKS = 0', {raw: true})
//     .then((results) => {
//         db.sequelize.sync({force: true});
//     });

db.query('SET FOREIGN_KEY_CHECKS = 0')
  .then(() => db.sync({ force: true }))
  .then(() => db.query('SET FOREIGN_KEY_CHECKS = 1'))
  .then(() => {
    const addItem = (name) => {
      Item.findOrCreate({ where: { item_name: name } }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    };
    itemsData.forEach((item) => {
      addItem(item.item_name);
    });

    const addReview = (name, date, rating, content, imgurl, itemId, option) => {
      Review.findOrCreate({
        where: {
          customer_name: name,
          date_of_review: date,
          rating,
          review_content: content,
          image_url: imgurl,
          ItemId: itemId,
          item_option: option,
        },
      });
    };

    reviewsData.forEach((review) => {
      // eslint-disable-next-line max-len
      addReview(review.customer_name, review.date_of_review, review.rating, review.review_content, review.image_url, review.ItemId, review.item_option);
    });


    // for (let i = 0; i < 10000000; i++) {
    //   if (i % 10000 === 0) {
    //     console.log(`Inserted ${i} reviews`);
    //   }
    //   let review = getFakeReview();
    //   addReview(review.customer_name, review.date_of_review,
    //     review.rating, review.review_content, review.image_url,
    //     review.ItemId, review.item_option);
    // }
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });


  // exp
  console.log("trying");
  let review = getFakeReview();
  let cur = Review.create(review)
    .then( () => { console.log("Success")})
    .catch( (err) => {console.log("Error in insert " + err)} );

  // db.query('SET FOREIGN_KEY_CHECKS = 0')
  // //.then(() => db.query('SET FOREIGN_KEY_CHECKS = 1'))
  // .then(() => {
  //   const addReview = (name, date, rating, content, imgurl, itemId, option) => {
  //     Review.findOrCreate({
  //       where: {
  //         customer_name: name,
  //         date_of_review: date,
  //         rating,
  //         review_content: content,
  //         image_url: imgurl,
  //         ItemId: itemId,
  //         item_option: option,
  //       },
  //     });
  //   };

  //   for (let i = 0; i < 100000; i++) {
  //     if (i % 10000 === 0) {
  //       console.log(`Inserted ${i} reviews`);
  //     }
  //     let review = getFakeReview();
  //     addReview(review.customer_name, review.date_of_review,
  //       review.rating, review.review_content, review.image_url,
  //       review.ItemId, review.item_option);
  //   }
  // })
  // .catch((err) => {
  //   // eslint-disable-next-line no-console
  //   console.log(err);
  // });



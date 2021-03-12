//const { Review } = require('../database/model.js'); MySQL
//const { items } = require('../database/database_couchDb/index.js'); CouchDB
const { pgPool } = require('../database/database_postgres/index.js');

// for batching insert with postgresql
const numOfRecordsToInsertInBatch = 100;
var recordsArr = [];

// MySQL + Sequalize
const model = {
  mysqlSequalize: {
    // GET
    findAll: (itemId) => Review.findAll({
      where: {
        ItemId: itemId,
      },
    }),
    // POST
    create: (newReview) => Review.create(newReview),
    // DELETE
    destroy: (reviewId) => Review.destroy({
      where: { id: reviewId },
    }),
    // UPDATE
    update: (updatedFields, reviewId) => Review.update(updatedFields, {
      where: { id: reviewId },
    }),
  },

  couchDb: {
    // GET - '/api/items/:itemId/reviews'
    findAll: (itemId) => {
      let itemBuild = itemId[itemId.length - 1];
      // console.log('searching ' + `${itemBuild}:${itemId}`);
      return items.get(`${itemBuild}:${itemId}`)
        .then((result) => {
          // console.log(result);
          return result.reviews;
        });
    },
    // POST - '/api/items/:itemId/reviews'
    create: (newReview) => {
      let itemId = newReview.ItemId;
      let itemBuild = itemId[itemId.length - 1];
      //console.log('searching ' + `${itemBuild}:${itemId}`);
      return items.get(`${itemBuild}:${itemId}`)
        .then((item) => {
          let idArr = item.reviews.map((review) => {
          return review.id;
        });
          newReview.id = Math.max(...idArr) + 1;
          item.reviews.push(newReview);
          return items.insert(item);
        });
    },
    // DELETE - '/api/items/:itemId/reviews/:reviewId'
    destroy: (reviewId, itemId) => {
      let itemBuild = itemId[itemId.length - 1];
      //console.log('delete ' + `${itemBuild}:${itemId} , review ${reviewId}`);
      return items.get(`${itemBuild}:${itemId}`)
        .then ((item) => {
        //console.log('found item');
          for (let j = 0; j < item.reviews.length; j++) {
            if (item.reviews[j].id === Number(reviewId)) {
              item.reviews.splice(j, 1);
              return items.insert(item);
            }
          }
          console.log("not found");
          return { ok: false };
        })
        .then((couchRes) => {
          if (couchRes.ok === true) {
            return 1;
          }
          return `${reviewId} for ${itemId} couldn't be deleted`;
        });
    },
    // UPDATE - '/api/items/:itemId/reviews/:reviewId'
    update: (updatedFields, reviewId, itemId) => {
      let itemBuild = itemId[itemId.length - 1];
      let itemIdWithPartition = `${itemBuild}:${itemId}`;
      //console.log('update ' + `${itemIdWithPartition} , review ${reviewId}`);
      return items.get(itemIdWithPartition)
        .then((item) => {
          for (let k = 0; k < item.reviews.length; k++) {
            let review = item.reviews[k];
            if (review.id === Number(reviewId)) {
              for (let key in updatedFields) {
                review[key] = updatedFields[key];
              }
              //console.log("About to insert", item._id);
              return items.insert(item);
            }
          }
          console.log("not found");
          return { ok: false };
        })
        .then((couchRes) => {
          if (couchRes.ok === true) {
            return 1;
          }
          return `${reviewId} for ${itemId} couldn't be updated`;
        });
    },
  },
  postgreSQL: {
    // GET - '/api/items/:itemId/reviews'
    findAll: (itemId) => {
      return pgPool.connect()
        .then((client) => {
          return client.query(`SELECT * FROM Reviews WHERE itemId = ${itemId}`)
            .then(res => {
              client.release();
              return res.rows;
            })
        })
      },
    // POST - '/api/items/:itemId/reviews'
    create: (newReview) => {
      // batching up to 100 records insert
      recordsArr.push(newReview);
      if (recordsArr.length < numOfRecordsToInsertInBatch) {
        // the controller.js is expecting a promise that resolve with a number of inserts
        // since I am batching the insert I need to show the controller that the insert
        // process was sucessful.
        return Promise.resolve(1);
      }
      let text = 'INSERT INTO reviews (customer_name,date_of_review,rating,review_content,image_url,item_option,ItemId) VALUES ';
      let values = [];
      let counter = 0;

      for (let i = 0; i < recordsArr.length; i++) {
        // Writing the ($1, $2, $3, $4, $5, $6, $7) with the counter
        let recText = `($${counter+1}, $${counter+2}, $${counter+3}, $${counter+4}, $${counter+5}, $${counter+6}, $${counter+7})`;
        text += recText;

        values.push(newReview.customer_name,
          newReview.date_of_review,
          newReview.rating,
          newReview.review_content,
          newReview.image_url,
          newReview.item_option,
          newReview.ItemId);

        counter += 7;

        if (i < recordsArr.length - 1) {
          text += ',';
        }
      }
      const query = {
        text: text,
        values: values,
      };
      // Empty the batch array
      recordsArr = [];
      return pgPool.connect()
        .then((client) => {
          return client.query(query)
            .then(res => {
              client.release();
              // console.log("Postgres batch insert inserted reviews:", res.rowCount);
              return 1;
            });
        })
    },
   // UPDATE - '/api/items/:itemId/reviews/:reviewId'
    update: (updatedFields, reviewId, itemId) => {
      const query = {
        text: 'UPDATE reviews SET customer_name = $1 ,date_of_review = $2,rating = $3,review_content= $4,image_url =$5,item_option=$6 WHERE id=$7',
        values: [updatedFields.customer_name,updatedFields.date_of_review,updatedFields.rating,updatedFields.review_content,updatedFields.image_url,updatedFields.item_option,reviewId]

      };
      return pgPool.connect()
      .then((client) => {
        return client.query(query)
        .then(res => {
          client.release();
          return (res.rowCount);
        });
      })
    },
    // DELETE - '/api/items/:itemId/reviews/:reviewId'
    destroy: (reviewId, itemId) => {
      const query = {
        text: 'DELETE FROM reviews WHERE id=$1',
        values: [reviewId],
      };
      return pgPool.connect()
        .then((client) => {
          return client.query(query)
          .then(res => {
            client.release();
            return (res.rowCount);
          });
        })

    },

  },
};

// module.exports = model.mysqlSequalize;
// module.exports = model.couchDb;
module.exports = model.postgreSQL;

//const _ = require('underscore');
const { Review } = require('../database/model.js');
const { reviews } = require('../database/database_couchDb/index.js');

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
    // GET
    findAll: (itemId) => reviews.find({
      selector: { ItemId: itemId } })
      .then((result) => {
        return result.docs;
    }),
    // POST
    create: (newReview) => reviews.insert(newReview),

    // DELETE
    destroy: (reviewId) => reviews.get(reviewId)
      .then((review) => reviews.destroy(reviewId, review._rev))
      .then((couchRes) => {
        if (couchRes.ok === true) {
          return 1;
        }
        return `${reviewId} couldn't be deleted`;
      }),
    // UPDATE
    // _.extend(destination, *sources)
    update: (updatedFields, reviewId) => reviews.get(reviewId)
      .then((review) => {
        for (let key in updatedFields) {
          review[key] = updatedFields[key];
        }
        return reviews.insert(review, review._rev);
      })
      .then((couchRes) => {
        if (couchRes.ok === true) {
          return 1;
        }
        return `${reviewId} couldn't be updated`;
      }),
  },

};

//module.exports = model.mysqlSequalize;
module.exports = model.couchDb;

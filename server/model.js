const { Review } = require('../database/model.js');

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

  mongoDb: {

  },
};

module.exports = model.mysqlSequalize;

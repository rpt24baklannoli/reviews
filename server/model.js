//const _ = require('underscore');
const { Review } = require('../database/model.js');
const { items } = require('../database/database_couchDb/index.js');

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
      //console.log('searching ' + `${itemBuild}:${itemId}`);
      return items.get(`${itemBuild}:${itemId}`)
      .then((result) => {
        //console.log(result);
        return result.reviews;
      })
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
      })
    },
    // DELETE - '/api/items/:itemId/reviews/:reviewId'
    destroy: (reviewId, itemId) => {
      let itemBuild = itemId[itemId.length - 1];
      console.log('delete ' + `${itemBuild}:${itemId} , review ${reviewId}`);
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
      })
    },
    // UPDATE

    update: (updatedFields, reviewId, itemId) => {
      let itemBuild = itemId[itemId.length - 1];
      let itemIdWithPartition = `${itemBuild}:${itemId}`;
      console.log('update ' + `${itemIdWithPartition} , review ${reviewId}`);
      return items.get(itemIdWithPartition)
      .then((item) => {
        for (let k = 0; k < item.reviews.length; k++) {
          let review = item.reviews[k];
          if (review.id === Number(reviewId)) {
            for (let key in updatedFields) {
              review[key] = updatedFields[key];
            }
            console.log("About to insert", item._id);
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
};

//module.exports = model.mysqlSequalize;
module.exports = model.couchDb;

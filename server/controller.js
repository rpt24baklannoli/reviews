const model = require('./model.js');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache({ stdTTL: 3600 });

const controller = {
  reviews: {
    // FEC GET
    get: (req, res) => {
      // for testing what is the issue with the stress tests
      // res.status(200);
      let itemId = req.params.itemId;
      // get from cache. if not in cache send axios request
      // key it itemId and the reviews are the value
      let value = myCache.get(itemId);
      if (value == undefined) {
        model.findAll(req.params.itemId)
          .then((items) => {
            // set in cache
            myCache.set(itemId, items);
            res.status(200).json(items);
          })
          .catch((err) => {
            res.status(404).send(err);
          });
      } else {
        res.status(200).send(value);
      }
    },
    // Cache STATS node-cache
    stats: (req, res) => {
      res.status(200).send(myCache.getStats());
    },
    // POST
    post: (req, res) => {
      // validate request
      if (!req.params.itemId) {
        res.status(400).send({
          message: 'Review cannot be created!',
        });
        return;
      }
      // create new review
      const newReview = {
        customer_name: req.body.customer_name,
        date_of_review: req.body.date_of_review,
        rating: req.body.rating,
        review_content: req.body.review_content,
        image_url: req.body.image_url,
        item_option: req.body.item_option,
        ItemId: req.params.itemId,
      };
      model.create(newReview)
        .then((num) => {
          if (num === 1) {
            res.send({
              message: `A new review for itemId ${newReview.ItemId} was inserted succesfuly`,
            });
          } else {
            res.send({
              message: `A new review for itemId ${newReview.ItemId} could not be inserted`,
            });
          }
        })
        .catch((err) => {
          console.log("post error", err, "GOT:", newReview);
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating the review.',
          });
        });
    },
    // DELETE
    delete: (req, res) => {
      const reviewId = req.params.reviewId;
      // for couchDb
      const itemId = req.params.itemId;
      model.destroy(reviewId, itemId)
        .then((num) => {
          if (num === 1) {
            res.send({
              message: `Review with id ${reviewId} was deleted successfully!`,
            });
          } else {
            console.log(num);
            res.send({
              message: `Cannot delete Review with id ${reviewId}. ${num}`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || `Could not delete Review with id ${reviewId}`,
          });
        });
    },
    // UPDATE/PUT
    put: (req, res) => {
      // for couchDb
      const itemId = req.params.itemId;
      const reviewId = req.params.reviewId;
      model.update(req.body, reviewId, itemId)
        .then((num) => {
          // console.log(num);
          // it requires "==" instead of "==="
          if (num == 1) {
            res.send({
              message: `Review ${reviewId} was updated successfully.`,
            });
          } else {
            res.send({
              message: `Cannot update a review with id ${reviewId}`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || `Error updating a Review with id ${reviewId}`,
          });
        });
    },
  },
};

module.exports = controller;

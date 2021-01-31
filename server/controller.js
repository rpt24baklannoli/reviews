const model = require('./model.js');

const controller = {
  reviews: {
    // FEC GET
    get: (req, res) => {
      model.findAll(req.params.itemId)
        .then((items) => {
          res.status(200).json(items);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
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
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating the review.',
          });
        });
    },
    // DELETE
    delete: (req, res) => {
      const reviewId = req.params.reviewId;
      // const itemId = req.params.itemId;
      model.destroy(reviewId)
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
      // const itemId = req.params.itemId;
      const reviewId = req.params.reviewId;
      model.update(req.body, reviewId)
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

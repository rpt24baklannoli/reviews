const { Review } = require('../database');

const controller = {
  reviews: {
    // FEC GET
    get: (req, res) => {
      Review.findAll({
        where: {
          ItemId: req.params.itemId,
        },
      })
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
      Review.create(newReview)
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
    // '/api/items/:itemsId/reviews/:reviewId'
    delete: (req, res) => {
      const reviewId = req.params.reviewId;
      // const itemId = req.params.itemId;
      Review.destroy({
        where: { id: reviewId },
      })
        .then((num) => {
          if (num === 1) {
            res.send({
              message: 'Review was deleted successfully!',
            });
          } else {
            res.send({
              message: `Cannot delete Review with id ${reviewId}.`,
            });
          }
        })
        .catch((err)=> {
          res.status(500).send({
            message: err.message || `Could not delete Review with id ${reviewId}`,
          });
        });
    },
    // update/put
    // '/api/items/:itemId/reviews/:reviewId'
    put: (req, res) => {
      // const itemId = req.params.itemId;
      const reviewId = req.params.reviewId;
      Review.update(req.body, {
        where: { id: reviewId },
      })
        .then((num) => {
          // console.log(num);
          // it requires "==" instead of "==="
          if (num == 1) {
            res.send({
              message: 'Review was updated succeddfully.',
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

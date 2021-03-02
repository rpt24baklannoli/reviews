const supertest = require('supertest');
const app = require('./app.js');
const { pgPool } = require('../database/database_postgres/index.js');


const request = supertest(app);

describe('testing-server-endpoints', () => {
  it('GET all the item reviews by itemId', (done) => {
    request.get('/api/items/5/reviews')
      .expect(200, [
        {
          id: 9,
          customer_name: 'Shlomi Harazi',
          date_of_review: 'Jan 3 2020',
          rating: 1,
          review_content: 'low quality',
          image_url: 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/899.jpg',
          item_option: 'Blue',
          itemid: 5
        }
      ], done);
  }); // it

  it('POST a new review to a specific item by the itemId', (done) => {
    let itemId = 9;
    request
      .post(`/api/items/${itemId}/reviews`)
      .send({
        customer_name: 'Shalom Meshulam',
        date_of_review: 'May 3 2020',
        rating: 5,
        review_content: 'I would buy it again. It is highly recommended',
        image_url: 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/588.jpg',
        item_option: 'Blue',
      })
      .expect(200, {
        message: `A new review for itemId ${itemId} was inserted succesfuly`,
      })
      .end((err, res) => {
        if (err) return done(err);
          return done();
      });
  });

  it('UPDATE/PUT an item review by the itemId and review id', (done) => {
    request
    // UPDATE - '/api/items/:itemId/reviews/:reviewId'
      .put('/api/items/8/reviews/8')
      .send({
        customer_name: 'Rick Morar',
        date_of_review: 'July 10 2020',
        rating: 1,
        review_content: 'I would not buy it',
        image_url: 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/139.jpg',
        item_option: 'culpa et nesciunt',
      })
      .expect(200, {
        message: 'Review 8 was updated successfully.',
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('Delete a review from a specific item by using itemId and review id', (done) => {
    request
      .get('/api/items/2/reviews')
      .then(response => {
        //console.log(response.body[0].id);
        let reviewId = response.body[0].id;
        return request
          .delete(`/api/items/2/reviews/${reviewId}`)
          .expect(200, {
            message: `Review with id ${reviewId} was deleted successfully!`,
          })
      })
      .finally((err) => {
        if (err) return done(err);
        return done();
      });
  });
}); // describe

afterAll(() => { pgPool.end(); });

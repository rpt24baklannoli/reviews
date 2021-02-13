const supertest = require('supertest');
const app = require('./app.js');

const request = supertest(app);

describe('testing-server-endpoints', () => {
  it('GET all the item reviews by itemId', (done) => {
    request.get('/api/items/5/reviews')
      .expect(200, [
        {
          id: 15745511,
          customer_name: 'Clifford Flatley',
          date_of_review: 'May 5 2020',
          rating: 1,
          review_content: 'Voluptates nulla facilis qui cumque reprehenderit ipsum repudiandae perspiciatis.',
          image_url: 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/479.jpg',
          item_option: 'dicta itaque reiciendis',
          itemid: 5,
        },
        {
          id: 41474819,
          customer_name: 'Constance Parker',
          date_of_review: 'Nov 1 2020',
          rating: 2,
          review_content: 'Libero ratione accusamus.',
          image_url: 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/847.jpg',
          item_option: 'aut magnam aut',
          itemid: 5,
        },
      ], done);
  }); // it

  it('POST a new review to a specific item by the itemId', (done) => {
    request
      .post('/api/items/30/reviews')
      .send({
        customer_name: 'Shalom Meshulam',
        date_of_review: 'May 3 2020',
        rating: 5,
        review_content: 'I would buy it again. It is highly recommended',
        image_url: 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/588.jpg',
        item_option: 'Blue',
      })
      .expect(200, {
        message: 'A new review for itemId 30 was inserted succesfuly',
      })
      .end((err, res) => {
        if (err) return done(err);
          return done();
      });
  });

  it('UPDATE/PUT an item review by the itemId and review id', (done) => {
    request
    // UPDATE - '/api/items/:itemId/reviews/:reviewId'
      .put('/api/items/15/reviews/12665511')
      .send({
        customer_name: 'Rick Morar',
        date_of_review: 'July 10 2020',
        rating: 1,
        review_content: 'I would not buy it',
        image_url: 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/139.jpg',
        item_option: 'culpa et nesciunt',
      })
      .expect(200, {
        message: 'Review 12665511 was updated successfully.',
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('Delete a review from a specific item by using itemId and review id', (done) => {
    request
      .delete('/api/items/60/reviews/9451349')
      .expect(200, {
        message: 'Review with id 9451349 was deleted successfully!',
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
}); // describe


// afterAll(() => {
//   mongoose.connection.close();
//   //server.close();
// });


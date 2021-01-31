const nano = require('nano')('http://admin:admin@localhost:5984');

const dbCreate = async () => {
  try {
    const response = await nano.db.create('reviews')
    // succeeded
    console.log('success', response);
  } catch (error) {
    // failed
    console.error('fail', error);
  }
};
// only when creating the database in the first time
// dbCreate();
const reviews = nano.db.use('reviews');
module.exports.reviews = reviews;
// const geety = async () => {
// let response = await reviews.insert({ happy: true });
// response = await reviews.insert({ happy: false , itemName: "bobo"});

// reviews.find({
//     selector: {happy: false}, // parameters can be added to query specific documents.
// })
// .then((data) => {
//   console.log('getting data', data);
// })
// .catch((error) => {
//   console.log('error', error);
// })

// geety();
const nano = require('nano')('http://admin:admin@localhost:5984');

// DB is created by the seeding script. No need to have code to create the DB here.
// const dbCreate = async () => {
//   try {
//     const response = await nano.db.create('items')
//     // succeeded
//     console.log('success', response);
//   } catch (error) {
//     // failed
//     console.error('fail', error);
//   }
// };
// only when creating the database in the first time
// dbCreate();
const items = nano.db.use('items');
module.exports.items = items;

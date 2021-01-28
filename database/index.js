const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('Reviews', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false,

// });

//create the sequelize instance, omitting the database-name arg
const sequelize = new Sequelize("", "root", "", {
  dialect: "mysql"
});

let Item;
let Review;
let db;

sequelize.query("CREATE DATABASE IF NOT EXISTS `REVIEWS`;")
  .then((data) => {
    console.log('REVIEWS was created');
  })
  .then( () => {

    db = new Sequelize('REVIEWS', 'root', '', {
      host: 'localhost',
      dialect: 'mysql',
      //logging: false,
    });

    db
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
        console.log('Unable to connect to the database:', err);
      });

    // db.query('CREATE DATABASE IF NOT EXISTS REVIEWS');

    Item = db.define('Items', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      item_name: Sequelize.STRING,
    });

    Review = db.define('Reviews', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      customer_name: Sequelize.STRING,
      date_of_review: Sequelize.STRING,
      rating: { type: Sequelize.INTEGER, min: 0, max: 5 },
      review_content: Sequelize.STRING,
      image_url: Sequelize.STRING,
      item_option: Sequelize.STRING,
    });

    //Item.hasMany(Review);
    Review.belongsTo(Item);
    Item.hasMany(Review, { foreignKey: 'iItemId', foreignKeyConstraint: true }); // Set one to many relationship


    // await Item.sync();
    // await Review.sync();

    const init = async () => {
      await Item.sync({ force: true });
      await Review.sync({ force: true }); // force true will drop the table if it already exists
      console.log('Tables have synced!');
    };

    init();
  });
exports.Item = Item;
exports.Review = Review;

exports.db = db;

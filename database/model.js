const Sequelize = require('sequelize');

const sequelize = new Sequelize('Reviews', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 20000,
  }
});

let Item = sequelize.define('Items', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  item_name: Sequelize.STRING,
});

let Review = sequelize.define('Reviews', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  customer_name: Sequelize.STRING,
  date_of_review: Sequelize.STRING,
  rating: { type: Sequelize.INTEGER, min: 0, max: 5 },
  review_content: Sequelize.STRING,
  image_url: Sequelize.STRING,
  item_option: Sequelize.STRING,
});

// Define foreign key
Review.belongsTo(Item);
Item.hasMany(Review, { foreignKey: 'ItemId', foreignKeyConstraint: true });

module.exports.Review = Review;
module.exports.Item = Item;
module.exports.sequelize = sequelize;

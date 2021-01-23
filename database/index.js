const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Reviews', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.query('CREATE DATABASE IF NOT EXISTS REVIEWS');

const db = new Sequelize('REVIEWS', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Item = db.define('Item', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  item_name: Sequelize.STRING,
});

const Review = db.define('Review', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  customer_name: Sequelize.STRING,
  date_of_review: Sequelize.STRING,
  rating: { type: Sequelize.INTEGER, min: 0, max: 5 },
  review_content: Sequelize.STRING,
  image_url: Sequelize.STRING,
  item_option: Sequelize.STRING,
});

Item.hasMany(Review);
Review.belongsTo(Item);

Item.sync();
Review.sync();

exports.Item = Item;
exports.Review = Review;

exports.db = db;

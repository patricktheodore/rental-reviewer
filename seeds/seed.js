const sequelize = require('../config/connection');
const { User, Property, Review } = require('../models');

const userData = require('./userData.json');
const propertyData = require('./propertyData.json');
const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Property.bulkCreate(propertyData, {
    individualHooks: true,
    returning: true,
  });

  await Review.bulkCreate(reviewData, {
    individualHooks: true,
    returning: true,
  });  

  process.exit(0);
};

seedDatabase();

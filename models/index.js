const User = require('./User');
const Property = require('./Property');
const Review = require('./Review');

User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Property.hasMany(Review, {
  foreignKey: 'property_id',
  onDelete: 'CASCADE'
});

Review.belongsTo(User);

Review.belongsTo(Property);

User.belongsToMany(Property, {
  through: {
    model: Review,
    foreignKey: 'property_id'
  },
  as: 'property_users'
});

Property.belongsToMany(User, {
  through: {
    model: Review,
    foreignKey: 'user_id'
  },
  as: 'user_property'
});

module.exports = { User, Property, Review };
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

Review.belongsTo(Property);

module.exports = { User, Property, Review }; 
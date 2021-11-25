const router = require('express').Rounter();

const userRoutes = require('./user-routes');
const propertyRoutes = require('./property-routes');
const reviewRoutes = require('./review-routes');

router.use('/users', userRoutes);
router.use('/property', propertyRoutes);
router.use('/reviews', reviewRoutes);

module.exports = rounter;
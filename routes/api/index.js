const router = require('express').Router();
const userRoutes = require('./user-routes');
// const thoughtRoutes = require('./thought-routes');

// gives the user routes
router.use('/users', userRoutes);
// gives the /thoughts prefix to all routes in the thoughtRoutes file
// router.use('/thoughts', thoughtRoutes);

module.exports = router;
const router = require('express').Router();
const apiRoutes = require('./api');

// Adds the prefix of /api to all routes pulled from the api directory
router.use('/api', apiRoutes)

router.use((req, res) => {
  res.status(404).send('404 Error! Page not found');
});

module.exports = router;
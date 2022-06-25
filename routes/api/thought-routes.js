const router = require('express').Router();
// Holds all the route values in an object
const { allThought, makeThought, singleThought } = require('../../controllers/thought-controller');


//  /api/thoughts routes for pulling and creating
router.route('/')
    .get(allThought)
    .post(makeThought);

// /api/thoughts/:id routes for pulling and updating
router.route('/:id')
    .get(singleThought);
    

module.exports = router;  
const router = require('express').Router();
// Holds all the route values in an object
const { allThought, makeThought, singleThought, updateThought, removeThought, makeReaction, removeReaction } = require('../../controllers/thought-controller');


//  /api/thoughts routes for pulling and creating
router.route('/')
    .get(allThought)
    .post(makeThought);

// /api/thoughts/:id routes for pulling and updating
router.route('/:id')
    .get(singleThought)
    .put(updateThought)
    .delete(removeThought);

// /api/thoughts/:thoughtId/reactions route for creating reactions
router.route('/:thoughtId/reactions')
    .post(makeReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId route for deleting reactions
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;  
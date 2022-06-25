const router = require('express').Router();
// Holds all the route values in an object
const { getUsers, makeUser, userId, updateUser } = require('../../controllers/user-controller');


//  /api/users routes for pulling and creating
router.route('/')
    .get(getUsers)
    .post(makeUser);

// /api/users/:id routes for pulling and updating
router.route('/:id')
    .get(userId)
    .put(updateUser);

module.exports = router;                       
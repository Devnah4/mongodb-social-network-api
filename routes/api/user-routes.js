const router = require('express').Router();
// Holds all the route values in an object
const { getUsers, makeUser } = require('../../controllers/user-controller');


//  /api/users routes for pulling and creating
router.route('/')
    .get(getUsers)
    .post(makeUser);

module.exports = router;                       
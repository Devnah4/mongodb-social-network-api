const router = require('express').Router();
// Holds all the route values in an object
const { getUsers, makeUser, userId, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/user-controller');


//  /api/users routes for pulling and creating
router.route('/')
    .get(getUsers)
    .post(makeUser);

// /api/users/:id routes for pulling and updating
router.route('/:id')
    .get(userId)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:id/friends routes for adding and deleting
router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;                       
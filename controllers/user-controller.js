// Connects to the User model
const { User } = require('../models');

// Route logic
const userController = {
    // Makes a new user
    makeUser({ body }, res) {
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    // GET /users - returns all users
    getUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            }
        )}
}

module.exports = userController;
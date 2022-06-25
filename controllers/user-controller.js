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
            })
    },

    // GET /users/:id - returns a single user
    userId({ params }, res) {
        User.findOne({ _id: params.id })
            .populate('friends')
            .populate({
                path: 'thoughts',
                select: '__v',
            })
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                res.json(userData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    // PUT /users/:id - updates a user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { runValidators: true, new: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                res.json(userData);
            }).catch(err => {
                console.log(err);
                res.status(500).json(err);
            }
            )
    },

    // DELETE /users/:id - deletes a user


}

module.exports = userController;
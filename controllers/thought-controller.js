const { Thought, User } = require('../models');

const thoughtController = {
    // Makes a new thought
    makeThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { runValidators: true, new: true }
                );
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No User to connect to!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    // GET /thoughts - returns all thoughts
    allThought(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    // GET /thoughts/:id - returns a single thought
    singleThought({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'Thought not found!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    // PUT /thoughts/:id - updates a single thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // DELETE /thoughts/:id - deletes a single thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'Cannot delete this thought!' });
                    return;
                }
                return User.findOneAndUpdate(
                    { thoughts: params.id }, 
                    { $pull: { thoughts: params.id } }, 
                    { new: true, runValidators: true })
                    .then(userData => {
                        if (!userData) {
                            res.status(404).json({ message: 'No User for this thought!' });
                            return;
                        }
                        res.json(userData);
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
}

module.exports = thoughtController;
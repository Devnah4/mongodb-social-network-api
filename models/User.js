const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: 'A valid username is required',
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: 'A valid email is required',
        unique: true,
        validate: [validateEmail, 'Please enterl a valid email address'],
        match: [/^.+@(?:[\w-]+\.)+\w+$/, 'Please enter a valid email address'],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
})


// Creates the virtual for the friend relation
UserSchema.virtual('friendCount').get(function() {
    // Returns the number of friends the user has
    return this.friends.length;;
})

// Creates a User model using UserSchema
const User = model('User', UserSchema);

// Exports the user model
module.exports = User;
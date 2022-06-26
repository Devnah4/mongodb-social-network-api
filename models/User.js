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
        validate: {
            validator: function(email) {
                return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
            }
        }
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friend: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});


// Creates the virtual for the friend relation
UserSchema.virtual('friendCount').get(function() {
    // Returns the number of friends the user has
    return this.friend.length;;
})

// Creates a User model using UserSchema
const User = model('User', UserSchema);

// Exports the user model
module.exports = User;
const {
    Schema,
    model
} = require('mongoose');

const thoughtSchema = require("./Thought_copy")
//schema to create User model with references
const userSchema = new Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            email: {
                $regex: /@mongodb\.com$/
            }
        },

        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user',
        }],
        thoughts:
        [
            thoughtSchema
        ],

    },

    {
        //the data needs to convert to json, including virtuals of model properties
        toJson: {
            virtuals: true,
        },
        id: false,
    }
);

// returns number of their friends
userSchema
    .virtual('friendCount')
    .get(function () {
        return `${this.friends.length}`;
    });

const User = model('user', userSchema);

module.exports = User;
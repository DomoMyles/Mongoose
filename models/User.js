const { Schema, model } = require('mongoose');

//schema to create User model with references
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            email: { $regex: /@mongodb\.com$/ }
        },

        //next two properties are references
        thoughts:
            [{
                type: Schema.Types.ObjectId,
                ref: 'thought',
            }],

        friends:
            [{
                type: Schema.Types.ObjectId,
                ref: 'user',
            }],

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
const { Schema, model} = require('mongoose');
const reactionSchema = require("./Reaction")
//schema to create Thought model with references
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            //aggregate to format date
        },

        //next two properties are references
        username:
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },

        reactions:
            [
                reactionSchema
            ],

    },

    {
        toJson: {
            virtuals: true,
        },
        id: false,
    }
);
module.exports = thoughtSchema

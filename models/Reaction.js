const { Schema, model } = require('mongoose');
// const { ObjectId } = require('mongodb');

//schema to create Thought model with references
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },

        responseBody: {
            type: String,
            required: true,
            maxlength: 280,
          },

        //next two properties are references
        username:
            [{
                type: Schema.Types.ObjectId,
                ref: 'user',
            }],

        createdAt: {
            type: Date,
            default: Date.now,
            //aggregate to format date
        },

    },
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
const { Schema, model } = require('mongoose');

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
            [{
                type: Schema.Types.ObjectId,
                ref: 'user',
            }],

        reactions:
            [{
                type: Schema.Types.ObjectId,
                ref: 'reactions',
            }],

    },

    {
        toJson: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return `${this.reactions.length}`;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;

const {
    Schema,
    model,
    Types
} = require('mongoose');
// const { ObjectId } = require('mongodb');

//schema to create Thought model with references
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },

    responseBody: {
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
    username: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
}, );

module.exports = reactionSchema;
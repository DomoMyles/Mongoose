
const Thought = require('../models/Thought');module.exports = {

    //do the request to get all the thoughts
    getThought(req, res) {
        //get this to be able to get the thought of a certain thought???
        Thought.find()
        .populate('reactions')

            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    //Get A specific thought
    getSingleThought(req, res) {
        //find how to get thoughts (change the objectID to username when figured it out??!?!)
        Thought.findOne({
            objectId: req.params.objectId
            })
            .then((thought) =>
                !thought ?
                res.status(404).json({
                    message: 'No thought with that ID'
                }) :
                res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)

            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
                //find a way to select specific thought ( so basically we dont have an id and a thought can have more then one thought there isnt any distinguishable paramaters in this exept for the created at)
                { objectId: req.params.thoughtId },
                {
                    $set: req.body
                }, {
                    runValidators: true,
                    new: true
                }
            )
            .then((thought) =>
                !thought ?
                res.status(404).json({
                    message: 'No thought with this id!'
                }) :
                res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            )
            .then((thought) =>
                !thought ?
                res.status(404).json({
                    message: 'No thought with this id!'
                }) :
                res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteThought(req, res) {
        //find how it relates to itself
        Thought.findOneAndRemove({
                objectId: req.params.objectId
            })
            .then((thought) =>
                !thought ?
                res.status(404).json({
                    message: 'No thought with this id!'
                })
                // check if findand update is requried

                :
                Thought.findOneAndUpdate({
                    //find
                    thoughts: req.params.objectId
                }, {
                    $pull: {
                        //find
                        thoughts: req.params.objectId
                    }
                }, {
                    new: true
                })
            )
            .then((thought) =>
                !thought ?
                res
                .status(404)
                .json({
                    message: 'thought created but no thought with this id!'
                }) :
                res.json({
                    message: 'thought successfully deleted!'
                })
            )
            .catch((err) => res.status(500).json(err));
    },

}
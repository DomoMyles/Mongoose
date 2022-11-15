const Reaction = require('../models/Reaction');

module.exports = {
    //do the request to get all the Reactions
    getReaction(req, res) {
        //get this to be able to get the Reaction of a certain Reaction???
        Reaction.find()
        .populate('username')

            .then((Reaction) => res.json(Reaction))
            .catch((err) => res.status(500), json(err));
    },
    //Get A specific Reaction
    getSingleReaction(req, res) {
        //find how to get Reactions (change the objectID to username when figured it out??!?!)
        Reaction.findOne({
            objectId: req.params.objectId
            })
            .then((Reaction) =>
                !Reaction ?
                res.status(404).json({
                    message: 'No Reaction with that ID'
                }) :
                res.json(Reaction)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a Reaction
    createReaction(req, res) {
        Reaction.create(req.body)

            .then((dbReactionData) => res.json(dbReactionData))
            .catch((err) => res.status(500).json(err));
    },
    updateReaction(req, res) {
        Reaction.findOneAndUpdate(
                //find a way to select specific Reaction ( so basically we dont have an id and a Reaction can have more then one Reaction there isnt any distinguishable paramaters in this exept for the created at)
                { objectId: req.params.ReactionId },
                {
                    $set: req.body
                }, {
                    runValidators: true,
                    new: true
                }
            )
            .then((Reaction) =>
                !Reaction ?
                res.status(404).json({
                    message: 'No Reaction with this id!'
                }) :
                res.json(Reaction)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteReaction(req, res) {
        //find how it relates to itself
        Reaction.findOneAndRemove({
                objectId: req.params.objectId
            })
            .then((Reaction) =>
                !Reaction ?
                res.status(404).json({
                    message: 'No Reaction with this id!'
                })
                // check if findand update is requried

                :Reaction.findOneAndUpdate({
                    //find
                    Reactions: req.params.objectId
                }, {
                    $pull: {
                        //find
                        Reactions: req.params.objectId
                    }
                }, {
                    new: true
                })
            )
            .then((Reaction) =>
                !Reaction ?
                res
                .status(404)
                .json({
                    message: 'Reaction created but no Reaction with this id!'
                }) :
                res.json({
                    message: 'Reaction successfully deleted!'
                })
            )
            .catch((err) => res.status(500).json(err));
    },

}
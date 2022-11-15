const router = require('express').Router();
const {
    createReaction,
    getReaction,
    getSingleReaction,
    updateReaction,
    deleteReaction
} = require('../../controllers/reactionController');

router.route('/')
    .get(getReaction)
    .post(createReaction);

router.route('/:reactionId')
    .get(getSingleReaction)
    .put(updateReaction)
    .delete(deleteReaction);

module.exports = router;
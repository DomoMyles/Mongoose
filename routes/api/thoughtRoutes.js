const router = require('express').Router();
const {
    createThought,
    getThought,
    getSingleThought,
    updateThought,
    deleteThought,
    addReaction
} = require('../../controllers/thoughtController');

router.route('/')
    .get(getThought)
    .post(createThought);

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

router.route("/:thoughtId/reactions")
    .post(addReaction)

module.exports = router;
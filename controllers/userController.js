const User = require('../models/User');

module.exports = {
    //create find method to find all users
    //should work as a get method through insomnia
//find all users because its blank
    getUsers(req, res) {
        User.find()

        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    //gets the single user from in insomnia from the table.
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      // create a new user
      createUser(req, res) {
        User.create(req.body)

          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(500).json(err));
      },

      //update a selected user
      updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          )
            .then((user) =>
              !user
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(user)
            )
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
        },
        deleteUser(req, res) {
            User.findOneAndRemove({ _id: req.params.userId })
              .then((user) =>
                !user
                  ? res.status(404).json({ message: 'No user with this id!' })
                  // check if findand update is requried
                  
                  : User.findOneAndUpdate(
                      { users: req.params.userId },
                      { $pull: { users: req.params.userId } },
                      { new: true }
                    )
              )
              .then((user) =>
                !user
                  ? res
                      .status(404)
                      .json({ message: 'user created but no user with this id!' })
                  : res.json({ message: 'user successfully deleted!' })
              )
              .catch((err) => res.status(500).json(err));
          },
    };

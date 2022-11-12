const { connect, connection } = require('mongoose');

//connects to the js
connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;

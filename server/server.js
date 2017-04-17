let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let routes = require('./routes');

// Mongoose setup
mongoose.connect('mongodb://localhost/cognitiveBiases');
mongoose.Promise = global.Promise;

// Express setup
var app = express(); // Create a new instance of the server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Routes
app.use(routes);

// Handle errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: 'invalid token'});
  }
});

// Start server
app.listen(3000, function (err){ // Start the server on port 5000
  console.log('running server on port ' + 3000); // This code is exectued when server it up and running. We just print a message
});

let express = require('express')
let expressJwt= require('express-jwt')
let usersController = require('./controllers/users.controller.js')
let biasesController = require('./controllers/biases.controller.js')
let config = require('./config');

let routes = express.Router();
var jwtCheck = expressJwt({
  secret: config.server.jwtSecret
});

// Endpoints
routes.post('/api/signup', usersController.signup)
routes.post('/api/signin', usersController.signin)
routes.post('/api/favorites',jwtCheck, biasesController.addFavorite)
routes.delete('/api/favorites', jwtCheck, biasesController.removeFavorite)

module.exports = routes;

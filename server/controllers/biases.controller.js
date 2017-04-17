const User = require('../models/user.model')

function addFavorite (req, res, next) {
  User.getUserByEmail(req.user.email).then((user) => {
    if (user.favorites.indexOf(req.body.bias) === -1) {
      user.favorites.push(req.body.bias)

      user.save().then(() => {
        res.status(200).json({})
        next()
      })
    } else {
      res.status(200).json({})
      next()
    }
  })
}

function removeFavorite (req, res, next) {
  User.getUserByEmail(req.user.email).then((user) => {
    const biasIndex = user.favorites.indexOf(req.body.bias)
    if (biasIndex !== -1) { // Item found
      user.favorites.splice(biasIndex, 1)

      user.save().then(() => {
        res.status(200).json({})
        next()
      })
    } else {
      res.status(404).json({})
      next()
    }
  })
}

module.exports = {
  addFavorite,
  removeFavorite
}

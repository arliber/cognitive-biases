const crypto = require('crypto')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const config = require('../config')

function _extractuserData(body) {
  if(!body.password || !body.email) {
    return false;
  } else {
    return {
      email: body.email,
      password: body.password
    }
  }
}

function _getUserPayload(user) {
  return {
    email: user.email
  }
}

function _getUser(userData) {
  const token = jwt.sign(_getUserPayload(userData), config.server.jwtSecret, { expiresIn: 60*60*5 })
  return {
    token,
    email: userData.email,
    favorites: userData.favorites
  }
}

function signup(req, res, next) {

  let error = ''
  const userData = _extractuserData(req.body)

  if (!userData) {
    error = 'missing email or password fields'
    res.status(400).json({error})
    next()
  } else {
    User.getUserByEmail(userData.email).then((user) => {
      if (user) {
        error = 'user already exists'
        res.status(400).json({error})
        next()
      } else {
        let newUser = new User(userData)
        newUser.save((err) => {
          if (err) {
            error = 'unable to save new user'
            res.status(500).json({error})
          } else {
            res.status(200).json(_getUser(newUser))
          }
          next()
        })
      }
    });
  }
}

function signin(req, res, next) {
  let error = ''
  const userForm = _extractuserData(req.body)

  if (!userForm) {
    error = 'missing email or password fields';
    res.status(400).json({error})
    next()
  } else {
    User.getUserByEmail(userForm.email).then((user) => {
      if (!user) {
        error = 'no such user'
        res.status(400).json({error})
      } else {
        if (user.password === crypto.createHash('sha256').update(userForm.password).digest('base64')) {
          res.status(200).json(_getUser(user))
        } else {
          error = 'unauthorized'
          res.status(401).json({error})
        }
      }
      next()
    })
  }
}

module.exports = {
  signup,
  signin
};

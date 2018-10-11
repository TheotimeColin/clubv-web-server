const mongoose = require('mongoose')
const User = require('../entities/User')

module.exports = function (req, res) {
  if (req.body.firstName && req.body.lastName && req.body.password) {
    User.create({ ...req.body }, (err, user) => {
      console.log(user)
    })
  }
}
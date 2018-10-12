const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  phone: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  }
})

UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err)
    this.password = hash
    next()
  })
})

const User = mongoose.model('User', UserSchema);

// User.deleteMany({}, () => console.log('deleted'))
/*User.find((err, res) => {
  console.log(res)
})*/

module.exports = User

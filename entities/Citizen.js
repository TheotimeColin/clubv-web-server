const mongoose = require('mongoose')
const CitizenFixtures = require('../fixtures/Citizens')

const CitizenSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  firstName: String,
  lastName: String,
  phone: String
})

// User.deleteMany({}, () => console.log('deleted'))

const Citizen = mongoose.model('Citizen', CitizenSchema);

/*CitizenFixtures.forEach((user) => {
  var query = { id: user.id }
  Citizen.findOneAndUpdate(query, user, { upsert: true }, (err, user) => {
    if (err) return console.error(err);
  })
})*/

module.exports = Citizen

const Sequelize = require('sequelize')

const User = {
  user_id: { type: Sequelize.INTEGER, primaryKey: true },
  firstname: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
  phone: { type: Sequelize.STRING }
}

module.exports = User
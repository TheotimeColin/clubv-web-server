const mongoose = require('mongoose')
const User = require('../entities/User')

module.exports = async function (req, res) {
  let errors = []
  
  try {
    var params = req.body
    
    if (!params.firstName || !params.lastName || !params.password || !params.phone) throw { code: 9900, errmsg: 'Missing Field Error' }
      
    let duplicateUsers = await User.find({ phone: params.phone })
      
    if (duplicateUsers.length > 0) throw { code: 9900, errmsg: 'Duplicate user' }

    let newUser = await User.create(params)
  } catch (err) {
    errors.push({ code: err.code, message: err.errmsg })
  }
  
  res.send({
    status: errors.length > 0 ? 0 : 1,
    errors
  })
}
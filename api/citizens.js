const mongoose = require('mongoose')
const Citizen = require('../entities/Citizen')

module.exports = async function (req, res) {
  let errors = []
  
  if (req.body.phone) {
    let citizen
    
    try {
      let citizens = await Citizen.find(req.body)
      if (citizens.length == 0) throw { code: 9900, errmsg: 'Citizen not found' }
      
      citizen = citizens[0]
    } catch (err) {
      errors.push({ code: err.code, message: err.errmsg })
    }
    
    res.send({
      status: errors.length > 0 ? 0 : 1,
      errors,
      citizen
    })
  } else {
    let options = {
      search: {},
      limit: 30,
      page: 0,
      ...req.body
    }

    let query = {
      firstName: new RegExp(options.search.firstName, 'i'),
      lastName: new RegExp(options.search.lastName, 'i')
    }

    Citizen.count(query, (err, count) => {
      let pages = Math.ceil(count / options.limit) - 1
      let offset = options.limit * options.page

      let params = {
        sort: { id: -1 },
        limit: options.limit,
        skip: offset
      }

      Citizen.find(query, null, params, (err, citizens) => {
        res.send({
          citizens: citizens,
          pages: pages,
          items: (pages * options.limit) - offset
        })
      })
    })
  }
  
}
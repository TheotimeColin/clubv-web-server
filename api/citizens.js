const mongoose = require('mongoose')
const Citizen = require('../entities/Citizen')

module.exports = function (req, res) {
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
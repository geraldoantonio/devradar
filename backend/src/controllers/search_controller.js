const Dev = require('../models/dev')

module.exports = {

  async index(req, res) {
    const { techs, latitude, longitude } = req.query
    
    const techsArray = techs.split(',').map(tech => tech.trim())

    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    })

    res.json(devs)
  }

}
const { mongoose } = require('../services/mongoose')
const PointSchema = require('./utils/point.js')

const devSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
})

module.exports = mongoose.model('Dev', devSchema)
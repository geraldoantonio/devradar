const axios = require('axios')
const Dev = require('../models/dev')
const { findConnections, sendMessage } = require('../services/websocket')

module.exports = {

  async index(req, res) {
    const devs = await Dev.find()
    return res.json(devs)
  },

  async show(req, res) {
    const { github_username } = req.params
    const dev = await set_dev(github_username)
    return res.json(dev)
  },

  async create(req, res) {
    const { github_username, latitude, longitude, techs } = req.body
    let dev = await set_dev(github_username)

    if (!dev) {

      const githubResponse = await axios(`https://api.github.com/users/${github_username}`)

      let { name = login, avatar_url, bio } = githubResponse.data

      const techsArray = techs.split(',').map(tech => tech.trim())

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude]
        }

      })

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray,
      )
      sendMessage(sendSocketMessageTo, 'new-dev', dev)

    }

    return res.json(dev)

  },

  async destroy(req, res) {
    const github_username = req.params.github_username
    const response = await Dev.findOneAndDelete({ github_username })
    res.json(response)
  },

  update(req, res) {
    return res.send("dev#update")
  }

}

async function set_dev(github_username) {
  const dev = await Dev.findOne({ github_username })
  return dev
}
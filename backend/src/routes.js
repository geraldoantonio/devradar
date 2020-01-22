const { Router } = require('express')
const DevsController = require('./controllers/devs_controller')
const SearchController = require('./controllers/search_controller')

const routes = Router()

routes.get('/devs', DevsController.index)
routes.post('/devs', DevsController.create)
routes.get('/devs/:github_username', DevsController.show)
routes.delete('/devs/:github_username', DevsController.destroy)
routes.get('/search', SearchController.index)

module.exports = routes
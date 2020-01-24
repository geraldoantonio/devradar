const express = require('express')
const cors = require('cors')
const http = require('http')
const { mongoose } = require('./services/mongoose')
const routes = require('./routes')
const { setupWebsocket } = require('./services/websocket')

const app = express()
const port = 3333

const server = http.Server(app)
setupWebsocket(server)

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`)
})


const express = require('express')
const cors = require('cors')
const { mongoose } = require('./services/mongoose')

const routes = require('./routes')
const app = express()
const port = 3333

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`)
})


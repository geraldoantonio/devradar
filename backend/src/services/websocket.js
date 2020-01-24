const socketio = require('socket.io')
const parseStringAsArray = require('../utils/parseStringAsArray')
const calculateDistance = require('../utils/calculateDistance')

// Armazenar as conexões do socket... 
// Ideal utilizar Banco de Dados (Redis...outros)
const conections = []
let io

exports.setupWebsocket = (server) => {
  io = socketio(server)

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query

    conections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs),
    })

  })

}

exports.findConnections = (coordinates, techs) => {
  return conections.filter(conection => {
    return calculateDistance(coordinates, conection.coordinates) < 10
      && conection.techs.some(item => techs.includes(item))
  })
}

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data)
  });
}
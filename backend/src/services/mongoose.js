require('dotenv/config');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect( process.env.MONGO_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Database server on connected!')
});

module.exports = { mongoose };
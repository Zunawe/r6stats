const mongoose = require('mongoose')

const { players } = require('../config/config')
const { logger } = require('./util')
const pollUbisoftApi = require('./jobs/pollUbisoftApi')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

logger.info('Starting worker')

// Connect to the database
mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).catch((err) => {
  logger.error(err.stack)
})

const db = mongoose.connection

db.once('open', () => {
  logger.info('Worker connected to database')
  start()
})

const start = () => {
  const pollerStoppers = players.reduce((acc, username) => {
    acc[username] = pollUbisoftApi.start(username)
    return acc
  }, {})
}

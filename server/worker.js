const mongoose = require('mongoose')

const { players } = require('../config/config')
const { logger } = require('./util')
const R6DataFetcher = require('./lib/fetcher/R6DataFetcher')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

logger.info('Starting worker')

// Connect to the database
mongoose.connect('mongodb://localhost/siegestats', {
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
  const fetchers = players.map((username) => new R6DataFetcher(username))
  fetchers.forEach((fetcher) => fetcher.start())
}

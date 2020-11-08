const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')

const { httpLogger, errorLogger } = require('./middleware')
const { logger } = require('./util')
const schema = require('./graphql/schema')
const indexRouter = require('./routes/index')

logger.info('Starting server')

const PORT = process.env.PORT || 8000
const app = express()

// Hot module replacement setup
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const webpackConfig = require('../webpack.development.config')

  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath
  }))
  app.use(require('webpack-hot-middleware')(compiler))
}

// Middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', '.build')))

app.use(httpLogger)

app.use('/', indexRouter)
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.use(errorLogger)

// Starting the server
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

// Connect to the database
mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).catch((err) => {
  logger.error(err.stack)
  server.close()
})

const db = mongoose.connection

db.once('open', () => {
  logger.info('Server connected to database')
})

module.exports = app

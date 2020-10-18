const { GraphQLObjectType } = require('graphql')

const GeneralStats = require('./GeneralStats')

const Stats = new GraphQLObjectType({
  name: 'Stats',
  fields: () => ({
    general: { type: GeneralStats }
  })
})

module.exports = Stats

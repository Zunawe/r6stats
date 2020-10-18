const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require('graphql')

const Stats = require('./Stats')

const Player = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    username: { type: GraphQLString },
    currentStats: {
      type: Stats,
      resolve: (source, args) => {
        return source.records[0].pvp
      }
    }
  })
})

module.exports = Player

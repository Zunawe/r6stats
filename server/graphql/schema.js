const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')

const PlayerDataService = require('../services/PlayerDataService')
const Player = require('./types/Player')

const root = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    player: {
      type: Player,
      args: {
        username: { type: GraphQLString }
      },
      resolve: (source, args) => {
        return PlayerDataService.getPlayer(args.username).then((player) => {
          return player
        })
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: root
})

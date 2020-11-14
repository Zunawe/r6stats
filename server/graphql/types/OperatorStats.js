const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql')

const GadgetStats = require('./GadgetStats')

const OperatorStats = new GraphQLObjectType({
  name: 'OperatorStats',
  fields: () => ({
    name: { type: GraphQLString },
    kills: { type: GraphQLInt, resolve: ({ kills }) => kills || 0 },
    deaths: { type: GraphQLInt, resolve: ({ deaths }) => deaths || 0 },
    headshots: { type: GraphQLInt, resolve: ({ headshots }) => headshots || 0 },
    wins: { type: GraphQLInt, resolve: ({ wins }) => wins || 0 },
    losses: { type: GraphQLInt, resolve: ({ losses }) => losses || 0 },
    meleeKills: { type: GraphQLInt, resolve: ({ meleeKills }) => meleeKills || 0 },
    playtime: { type: GraphQLInt, resolve: ({ playtime }) => playtime || 0 },
    gadget: { type: GraphQLList(GadgetStats) }
  })
})

module.exports = OperatorStats

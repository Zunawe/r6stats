const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql')

const GadgetStats = require('./GadgetStats')

const OperatorStats = new GraphQLObjectType({
  name: 'OperatorStats',
  fields: () => ({
    name: { type: GraphQLString },
    kills: { type: GraphQLInt },
    deaths: { type: GraphQLInt },
    headshots: { type: GraphQLInt },
    wins: { type: GraphQLInt },
    losses: { type: GraphQLInt },
    meleeKills: { type: GraphQLInt },
    playtime: { type: GraphQLInt },
    gadget: { type: GraphQLList(GadgetStats) }
  })
})

module.exports = OperatorStats

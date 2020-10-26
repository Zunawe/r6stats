const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql')

const WeaponStats = new GraphQLObjectType({
  name: 'WeaponStats',
  fields: () => ({
    name: { type: GraphQLString },
    kills: { type: GraphQLInt, resolve: ({ kills }) => kills || 0 },
    headshots: { type: GraphQLInt, resolve: ({ headshots }) => headshots || 0 }
  })
})

module.exports = WeaponStats

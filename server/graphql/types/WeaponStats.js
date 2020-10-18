const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql')

const WeaponStats = new GraphQLObjectType({
  name: 'WeaponStats',
  fields: () => ({
    name: { type: GraphQLString },
    kills: { type: GraphQLInt },
    deaths: { type: GraphQLInt },
    headshots: { type: GraphQLInt }
  })
})

module.exports = WeaponStats

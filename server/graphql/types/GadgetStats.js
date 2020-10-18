const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql')

const GadgetStats = new GraphQLObjectType({
  name: 'GadgetStats',
  fields: () => ({
    name: { type: GraphQLString },
    value: { type: GraphQLInt }
  })
})

module.exports = GadgetStats

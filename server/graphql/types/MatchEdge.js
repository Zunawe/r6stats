const { GraphQLObjectType, GraphQLString } = require('graphql')

const Match = require('./Match')

const MatchEdge = new GraphQLObjectType({
  name: 'MatchEdge',
  fields: () => ({
    cursor: { type: GraphQLString },
    node: { type: Match }
  })
})

module.exports = MatchEdge

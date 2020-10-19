const { GraphQLObjectType, GraphQLList } = require('graphql')

const PageInfo = require('./PageInfo')
const MatchEdge = require('./MatchEdge')

const MatchConnection = new GraphQLObjectType({
  name: 'MatchConnection',
  fields: () => ({
    pageInfo: { type: PageInfo },
    edges: { type: GraphQLList(MatchEdge) }
  })
})

module.exports = MatchConnection

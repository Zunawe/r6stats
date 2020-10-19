const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require('graphql')

const PageInfo = new GraphQLObjectType({
  name: 'PageInfo',
  fields: () => ({
    hasNextPage: { type: GraphQLBoolean },
    hasPreviousPage: { type: GraphQLBoolean },
    startCursor: { type: GraphQLString },
    endCursor: { type: GraphQLString }
  })
})

module.exports = PageInfo

const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql')

const GeneralStats = require('./GeneralStats')

const Match = new GraphQLObjectType({
  name: 'Match',
  fields: () => ({
    date: { type: GraphQLString },
    mode: { type: GraphQLString },
    queue: { type: GraphQLString },
    general: { type: GeneralStats }
  })
})

module.exports = Match

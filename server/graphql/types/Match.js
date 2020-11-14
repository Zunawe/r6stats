const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql')

const GeneralStats = require('./GeneralStats')
const OperatorStats = require('./OperatorStats')
const WeaponStats = require('./WeaponStats')

const Match = new GraphQLObjectType({
  name: 'Match',
  fields: () => ({
    date: { type: GraphQLString },
    mode: { type: GraphQLString },
    queue: { type: GraphQLString },
    general: { type: GeneralStats },
    weapons: { type: GraphQLList(WeaponStats) },
    operators: { type: GraphQLList(OperatorStats) }
  })
})

module.exports = Match

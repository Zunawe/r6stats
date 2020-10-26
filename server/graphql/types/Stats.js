const { GraphQLObjectType, GraphQLList } = require('graphql')

const GeneralStats = require('./GeneralStats')
const WeaponStats = require('./WeaponStats')

const Stats = new GraphQLObjectType({
  name: 'Stats',
  fields: () => ({
    general: { type: GeneralStats },
    weapons: { type: GraphQLList(WeaponStats) }
  })
})

module.exports = Stats

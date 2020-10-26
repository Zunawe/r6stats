const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql')

const Stats = require('./Stats')
const MatchConnection = require('./MatchConnection')
const createMatch = require('../../lib/createMatch')
const map2List = require('../../lib/map2List')

const Player = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    username: { type: GraphQLString },
    currentStats: {
      type: Stats,
      resolve: (source, args) => {
        return {
          ...source.records[0].pvp,
          weapons: map2List(source.records[0].pvp.weapons, 'name')
        }
      }
    },
    matches: {
      type: MatchConnection,
      args: {
        first: { type: GraphQLInt },
        after: { type: GraphQLString }
      },
      resolve: (source, args) => {
        const records = source.records
        let matches = []
        let recordIndex = 0
        while (matches.length < args.first && recordIndex < records.length - 1) {
          const match = createMatch(records[recordIndex], records[recordIndex + 1])
          if (match) {
            matches.push(match)
          }
          ++recordIndex
        }

        matches = matches.map((match) => ({
          ...match,
          weapons: match.weapons.filter(({ kills }) => kills)
        }))

        const edges = matches.map((match) => ({
          cursor: match.date,
          node: match
        }))

        const pageInfo = {}

        return {
          pageInfo,
          edges
        }
      }
    }
  })
})

module.exports = Player

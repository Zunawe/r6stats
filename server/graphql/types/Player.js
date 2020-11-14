const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql')
const moment = require('moment')

const Stats = require('./Stats')
const MatchConnection = require('./MatchConnection')
const GroupBy = require('./GroupBy')
const createMatch = require('../../lib/createMatch')
const map2List = require('../../lib/map2List')
const { base64Encode, base64Decode } = require('../../util')

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
        after: { type: GraphQLString },
        groupBy: { type: GroupBy }
      },
      resolve: (source, args) => {
        const records = source.records
        let matches = []

        let recordIndex = args.after ? records.findIndex(({ dateAdded }) => dateAdded <= base64Decode(args.after)) : 0
        while (matches.length < args.first && recordIndex < records.length - 1) {
          const lastRecord = records[recordIndex]
          ++recordIndex

          while (recordIndex < records.length) {
            if (!args.groupBy || args.groupBy === 'INDIVIDUAL') {
              break
            }

            if (moment(lastRecord.dateAdded).isSame(records[recordIndex].dateAdded, args.groupBy.toLowerCase())) {
              ++recordIndex
            } else {
              break
            }
          }
          const firstRecord = records[recordIndex] || records[recordIndex - 1]

          const match = createMatch(lastRecord, firstRecord)
          if (match) {
            matches.push(match)
          }
        }

        matches = matches.map((match) => ({
          ...match,
          date: args.groupBy && args.groupBy !== 'INDIVIDUAL' ? moment(match.date).startOf(args.groupBy.toLowerCase()).valueOf() : match.date,
          mode: args.groupBy && args.groupBy !== 'INDIVIDUAL' ? null : match.mode,
          queue: args.groupBy && args.groupBy !== 'INDIVIDUAL' ? null : match.queue,
          weapons: match.weapons.filter(({ kills }) => kills)
        }))

        const edges = matches.map((match) => ({
          cursor: base64Encode(match.date.toString()),
          node: match
        }))

        const pageInfo = {
          hasNextPage: recordIndex < records.length - 1,
          startCursor: edges[0].cursor,
          endCursor: edges[edges.length - 1].cursor
        }

        return {
          pageInfo,
          edges
        }
      }
    }
  })
})

module.exports = Player

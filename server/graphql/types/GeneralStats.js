const { GraphQLObjectType, GraphQLInt } = require('graphql')

const GeneralStats = new GraphQLObjectType({
  name: 'GeneralStats',
  fields: () => ({
    kills: { type: GraphQLInt },
    deaths: { type: GraphQLInt },
    assists: { type: GraphQLInt },
    suicides: { type: GraphQLInt },
    meleeKills: { type: GraphQLInt },
    penetrationKills: { type: GraphQLInt },
    blindKills: { type: GraphQLInt },
    dbno: { type: GraphQLInt },
    dbnoAssists: { type: GraphQLInt },
    revives: { type: GraphQLInt },
    matches: { type: GraphQLInt },
    wins: { type: GraphQLInt },
    losses: { type: GraphQLInt },
    playtime: { type: GraphQLInt },
    gadgetsDestroyed: { type: GraphQLInt },
    rappelBreaches: { type: GraphQLInt },
    barricadesDeployed: { type: GraphQLInt },
    reinforcementsDeployed: { type: GraphQLInt },
    distanceTravelled: { type: GraphQLInt }
  })
})

module.exports = GeneralStats

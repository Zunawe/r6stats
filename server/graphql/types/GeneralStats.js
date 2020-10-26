const { GraphQLObjectType, GraphQLInt } = require('graphql')

const GeneralStats = new GraphQLObjectType({
  name: 'GeneralStats',
  fields: () => ({
    kills: { type: GraphQLInt, resolve: ({ kills }) => kills || 0 },
    deaths: { type: GraphQLInt, resolve: ({ deaths }) => deaths || 0 },
    assists: { type: GraphQLInt, resolve: ({ assists }) => assists || 0 },
    suicides: { type: GraphQLInt, resolve: ({ suicides }) => suicides || 0 },
    meleeKills: { type: GraphQLInt, resolve: ({ melleKills }) => melleKills || 0 },
    penetrationKills: { type: GraphQLInt, resolve: ({ penetrationKills }) => penetrationKills || 0 },
    blindKills: { type: GraphQLInt, resolve: ({ blindKills }) => blindKills || 0 },
    dbno: { type: GraphQLInt, resolve: ({ dbno }) => dbno || 0 },
    dbnoAssists: { type: GraphQLInt, resolve: ({ dbnoAssists }) => dbnoAssists || 0 },
    revives: { type: GraphQLInt, resolve: ({ revives }) => revives || 0 },
    matches: { type: GraphQLInt, resolve: ({ matches }) => matches || 0 },
    wins: { type: GraphQLInt, resolve: ({ wins }) => wins || 0 },
    losses: { type: GraphQLInt, resolve: ({ losses }) => losses || 0 },
    playtime: { type: GraphQLInt, resolve: ({ playtime }) => playtime || 0 },
    gadgetsDestroyed: { type: GraphQLInt, resolve: ({ gadgetsDestroyed }) => gadgetsDestroyed || 0 },
    rappelBreaches: { type: GraphQLInt, resolve: ({ rappelBreaches }) => rappelBreaches || 0 },
    barricadesDeployed: { type: GraphQLInt, resolve: ({ barricadesDeployed }) => barricadesDeployed || 0 },
    reinforcementsDeployed: { type: GraphQLInt, resolve: ({ reinforcementsDeployed }) => reinforcementsDeployed || 0 },
    distanceTravelled: { type: GraphQLInt, resolve: ({ distanceTravelled }) => distanceTravelled || 0 }
  })
})

module.exports = GeneralStats

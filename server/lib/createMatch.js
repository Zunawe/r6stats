const _ = require('lodash')

const recordDiff = require('./recordDiff')
const map2List = require('../lib/map2List')

const createMatch = (record1, record2) => {
  [record1, record2] = record1.dateAdded < record2.dateAdded ? [record1, record2] : [record2, record1]
  const diff = recordDiff(record1, record2)
  let match = null

  if (diff.pvp) {
    match = {
      date: record1.dateAdded,
      mode: Object.keys(diff.pvp.modes)[0].toUpperCase(),
      queue: Object.keys(diff.pvp.queues)[0].toUpperCase(),
      general: {
        kills: diff.pvp.general.kills,
        deaths: diff.pvp.general.deaths,
        assists: diff.pvp.general.assists,
        suicides: diff.pvp.general.suicides,
        headshots: diff.pvp.general.headshots,
        meleeKills: diff.pvp.general.meleeKills,
        penetrationKills: diff.pvp.general.penetrationKills,
        blindKills: diff.pvp.general.blindKills,
        dbno: diff.pvp.general.dbno,
        dbnoAssists: diff.pvp.general.dbnoAssists,
        revives: diff.pvp.general.revives,
        playtime: diff.pvp.general.playtime,
        gadgetsDestroyed: diff.pvp.general.gadgetsDestroyed,
        rappelBreaches: diff.pvp.general.rappelBreaches,
        barricadesDeployed: diff.pvp.general.barricadesDeployed,
        reinforcementsDeployed: diff.pvp.general.reinforcementsDeployed,
        distanceTravelled: diff.pvp.general.distanceTravelled,
      },
      weapons: map2List(diff.pvp.weapons, 'name'),
      operators: map2List(diff.pvp.operators, 'name').map((operator) => ({
        ...operator,
        gadget: map2List(operator.gadget, 'name')
      }))
    }
  }

  return match
}

module.exports = createMatch

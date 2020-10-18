const R6API = require('r6api.js')

const { logger } = require('../util')
const PlayerDataService = require('../services/PlayerDataService')
const { ubisoftCredentials: { email, password } } = require('../../config/config')

const r6api = new R6API(email, password)

const start = (username) => {
  let userId = null
  let previousRecord = ''
  let running = true

  const initializeAndRun = async () => {
    if (!await PlayerDataService.playerExists(username)) {
      await PlayerDataService.createPlayer(username)
    }
    userId = await r6api.getId('uplay', username).then((response) => response[0].userId)
    previousRecord = JSON.stringify(await PlayerDataService.getMostRecentRecord(username)) || ''

    run()
  }

  const run = async () => {
    const newRecord = await fetch()
    if (newRecord) {
      await PlayerDataService.addRecord(username, newRecord)
      logger.info(`${(new Date(Date.now())).toISOString()} - Added new record for player [${username}]`)
    }
    if (running) setTimeout(run, 60000)
  }

  const fetch = async () => {
    const stats = await r6api.getStats('uplay', userId).then((response) => response[0])
    const record = buildRecord(stats)

    if (!recordsAreEquivalent(record, previousRecord)) {
      previousRecord = JSON.stringify(record)
      return record
    }
    return null
  }

  initializeAndRun()

  return () => {
    running = false
  }
}

const buildRecord = (data) => {
  const record = { pvp: {}, pve: {} }
  Object.keys(record).forEach((key) => {
    record[key].general = {
      kills: data[key].general.kills,
      deaths: data[key].general.deaths,
      assists: data[key].general.assists,
      suicides: data[key].general.suicides,
      headshots: data[key].general.headshots,
      meleeKills: data[key].general.meleeKills,
      penetrationKills: data[key].general.penetrationKills,
      blindKills: data[key].general.blindKills,
      dbno: data[key].general.dbno,
      dbnoAssists: data[key].general.dbnoAssists,
      revives: data[key].general.revives,
      matches: data[key].general.matches,
      wins: data[key].general.wins,
      losses: data[key].general.losses,
      playtime: data[key].general.playtime,
      gadgetsDestroyed: data[key].general.gadgetsDestroyed,
      rappelBreaches: data[key].general.rappelBreaches,
      barricadesDeployed: data[key].general.barricadesDeployed,
      reinforcementsDeployed: data[key].general.reinforcementsDeployed,
      distanceTravelled: data[key].general.distanceTravelled
    }

    record[key].modes = {}
    for (const modeType in data[key].modes) {
      const mode = data[key].modes[modeType]
      record[key].modes[modeType] = {
        ...mode
      }

      try {
        delete record[key].modes[modeType].name
      } catch (error) { }
    }

    record[key].queues = {}
    for (const queueType in data[key].queue) {
      const queue = data[key].queue[queueType]
      record[key].queues[queueType] = {
        kills: queue.kills,
        deaths: queue.deaths,
        wins: queue.wins,
        losses: queue.losses,
        matches: queue.matches,
        playtime: queue.playtime
      }
    }

    record[key].weapons = {}
    for (const weaponType in data[key].weapons) {
      data[key].weapons[weaponType].list.forEach((weapon) => {
        record[key].weapons[weapon.name] = {
          type: weaponType,
          kills: weapon.kills,
          deaths: weapon.deaths,
          headshots: weapon.headshots
        }
      })
    }

    record[key].operators = {}
    for (const operatorKey in data[key].operators) {
      const operator = data[key].operators[operatorKey]
      record[key].operators[operatorKey] = {
        name: operator.name,
        ctu: operator.ctu,
        role: operator.role,
        kills: operator.kills,
        deaths: operator.deaths,
        wins: operator.wins,
        losses: operator.losses,
        headshots: operator.headshots,
        meleeKills: operator.meleeKills,
        playtime: operator.playtime,
        gadget: (operator.gadget || []).reduce((acc, gadget) => {
          return {
            ...acc,
            [gadget.name]: gadget.value
          }
        }, {})
      }
    }
  })

  return record
}

const recordsAreEquivalent = (data1, data2) => {
  data1 = typeof data1 === 'string' ? JSON.parse(data1 || '{}') : data1
  data2 = typeof data2 === 'string' ? JSON.parse(data2 || '{}') : data2

  delete data1.dateAdded
  delete data2.dateAdded

  return JSON.stringify(data1) === JSON.stringify(data2)
}

module.exports = {
  start
}

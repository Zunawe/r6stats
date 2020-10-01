const R6API = require('r6api.js')

const { logger } = require('../../util')
const PlayerDataService = require('../../services/PlayerDataService')
const { ubisoftCredentials: { email, password }} = require('../../../config/config')

const r6api = new R6API(email, password)

class R6DataFetcher {
  constructor (username) {
    this._username = username
    this._userId = null
    this._running = false
    this._prevStats = ''
    this._initialized = false
  }

  async initialize () {
    this._userId = await this.fetchUserId()
    if (!await PlayerDataService.playerExists(this._username)) {
      await PlayerDataService.createPlayer(this._username)
    }
    const lastRecord = await PlayerDataService.getMostRecentRawRecord(this._username)
    if (lastRecord) {
      this._prevStats = JSON.stringify(lastRecord)
    }
    this._initialized = true
  }

  async start () {
    if (!this._initialized) {
      await this.initialize()
    }
    this._running = true
    this.fetchStats()
  }

  stop () {
    this._running = false
  }

  async fetchUserId () {
    return await r6api.getId('uplay', this._username).then((response) => response[0].userId)
  }

  async fetchStats () {
    const stats = await r6api.getStats('uplay', this._userId).then((response) => response[0])
    trimResponse(stats)

    if (!statsAreEquivalent(stats, this._prevStats)) {
      this._prevStats = JSON.stringify(stats)
      await PlayerDataService.addRawRecord(this._username, stats)
      logger.info(`${(new Date(Date.now())).toISOString()} - Added new raw data for player [${this._username}]`)
    }

    if (this._running) {
      setTimeout(this.fetchStats.bind(this), 60000)
    }
  }
}

const trimResponse = (data) => {
  try {
    for (const type in data.pvp.weapons) {
      data.pvp.weapons[type].list.forEach((weapon) => {
        delete weapon.image
      })
    }
    for (const type in data.pve.weapons) {
      data.pve.weapons[type].list.forEach((weapon) => {
        delete weapon.image
      })
    }
    for (const operator in data.pvp.operators) {
      delete data.pvp.operators[operator].badge
      delete data.pvp.operators[operator].name
      delete data.pvp.operators[operator].role
      delete data.pvp.operators[operator].ctu
    }
    for (const operator in data.pve.operators) {
      delete data.pve.operators[operator].badge
      delete data.pve.operators[operator].name
      delete data.pve.operators[operator].role
      delete data.pve.operators[operator].ctu
    }
    for (const mode in data.pvp.modes) {
      delete data.pvp.modes[mode].name
    }
    for (const mode in data.pve.modes) {
      delete data.pve.modes[mode].name
    }
  } catch (error) {
    logger.error('Something happened while trimming raw data. Continuing with extraneous data.')
  }
}

const statsAreEquivalent = (data1, data2) => {
  data1 = typeof data1 === 'string' ? JSON.parse(data1 || '{}') : data1
  data2 = typeof data2 === 'string' ? JSON.parse(data2 || '{}') : data2

  delete data1.dateAdded
  delete data2.dateAdded

  return JSON.stringify(data1) === JSON.stringify(data2)
}

module.exports = R6DataFetcher

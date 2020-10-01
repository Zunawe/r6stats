const { PlayerModel } = require('../models/Player')

const addRawRecord = async (username, rawData) => {
  const player = await PlayerModel.findOne({ username })

  rawData.dateAdded = Date.now()
  player.raw.unshift(rawData)
  player.save()
}

const createPlayer = async (username) => {
  await PlayerModel.create({ username })
}

const getPlayer = async (username) => {
  return await (PlayerModel.findOne({ username }).lean())
}

const playerExists = async (username) => {
  return await PlayerModel.exists({ username })
}

const getMostRecentRawRecord = async (username) => {
  const player = await PlayerModel.findOne({ username })
  if (!player) {
    return null
  }

  return player.raw[0]
}

module.exports = {
  addRawRecord,
  createPlayer,
  getPlayer,
  playerExists,
  getMostRecentRawRecord
}

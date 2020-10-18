const { PlayerModel } = require('../models/Player')

const addRecord = async (username, data) => {
  const player = await PlayerModel.findOne({ username })

  data.dateAdded = Date.now()
  player.records.unshift(data)
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

const getMostRecentRecord = async (username) => {
  const player = await PlayerModel.findOne({ username })
  if (!player) {
    return null
  }

  return player.records[0]
}

module.exports = {
  addRecord,
  createPlayer,
  getPlayer,
  playerExists,
  getMostRecentRecord
}

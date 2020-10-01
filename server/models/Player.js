const { Schema, model } = require('mongoose')

const PlayerSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  raw: {
    type: []
  }
})

const PlayerModel = model('Player', PlayerSchema)

module.exports = { PlayerModel, PlayerSchema }

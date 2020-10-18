const { Schema, model } = require('mongoose')

const PlayerSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  records: {
    type: []
  }
})

const PlayerModel = model('Player', PlayerSchema)

module.exports = { PlayerModel, PlayerSchema }

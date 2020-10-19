const mongoose = require('mongoose')

const { players } = require('./config/config')
const PlayerDataService = require('./server/services/PlayerDataService')
const statDiff = require('./server/lib/timeline/statDiff')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

// Connect to the database
mongoose.connect('mongodb://localhost/siegestats', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).catch((err) => {
})

const db = mongoose.connection

db.once('open', () => {
  start()
})

const start = () => {
  players.forEach((username) => {
    PlayerDataService.getPlayer(username).then((player) => {
      // return player.raw.reduce((acc, record, i, arr) => {
      //   if (!i) return acc
      //   acc.push(statDiff(arr[i], arr[i - 1]))
      //   return acc
      // }, [])
      // console.log(Object.values(player.raw[0].pvp.operators).reduce((acc, entry) => {
      //   return acc + entry.kills
      // }, 0))
      // console.log(player.raw[0].pvp.general)
      // console.log(player.raw[0].pvp.operators.kaid)
      // console.log(player.raw[1].pvp.operators.kaid)
      // console.log(player.raw[2].pvp.operators.kaid)
      // console.log(player.raw[3].pvp.operators.kaid)
      // console.log(player.raw[0].pvp.weapons['T-5 SMG'])
      // console.log(player.raw[1].pvp.weapons['T-5 SMG'])
      return statDiff(player.raw[1], player.raw[0])
      // return statDiff(player.raw[1], player.raw[0])
    }).then((stuff) => {
      console.log(username)
      console.log(JSON.stringify(stuff))
    })
  })
}

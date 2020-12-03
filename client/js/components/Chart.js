import axios from 'axios'
import c3 from 'c3'
import React, { useEffect, useState } from 'react'

const Chart = (props) => {
  const {
    username
  } = props

  const [data, setData] = useState({})
  const [chart, setChart] = useState()

  useEffect(() => {
    if (!Object.values(data).length) return

    if (!chart) {
      setChart(c3.generate({
        data: {
          x: 'x',
          xFormat: '%Q',
          columns: [
            data[username].reduce((acc, [date]) => acc.concat(date), ['x']),
            data[username].reduce((acc, [, kdr]) => acc.concat(kdr), ['KDR'])
          ]
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m-%d'
            }
          },
          y: {
            min: 0
          }
        }
      }))
    } else {
      chart.load({
        columns: [
          data[username].reduce((acc, [date]) => acc.concat(date), ['x']),
          data[username].reduce((acc, [, kdr]) => acc.concat(kdr), ['KDR'])
        ]
      })
    }
  }, [data])

  useEffect(() => {
    if (!username) return

    axios.post('/graphql', {
      query: `query {
        player(username: "${username}") {
          matches(first: 7, groupBy: DAY) {
            edges {
              node {
                date,
                general {
                  kills,
                  deaths
                }
              }
            }
          }
        }
      }`
    }).then((response) => {
      if (response.data.errors) {
        throw response.data.errors
      }
      return response.data.data
    }).then((newData) => {
      if (!newData || !newData.player) {
        return null
      }

      return newData.player.matches.edges.map(({ node }) => {
        return [node.date, node.general.kills / node.general.deaths]
      })
    }).then((newEntry) => {
      setData({
        ...data,
        [username]: newEntry
      })
    })
      .catch((error) => console.error(error))
  }, [username])

  if (!username) return null

  return (
    <div id='chart' />
  )
}

export default Chart

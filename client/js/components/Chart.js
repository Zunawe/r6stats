import axios from 'axios'
import c3 from 'c3'
import React, { useEffect, useState } from 'react'

const Chart = (props) => {
  const {
    username
  } = props

  const [data, setData] = useState()

  useEffect(() => {
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
    }).then((data) => {
      return data.player.matches.edges.map(({ node }) => {
        return [node.date, node.general.kills / node.general.deaths]
      })
    }).then(setData)
      .catch((error) => console.error(error))
  }, [username])

  useEffect(() => {
    if (!data) return

    c3.generate({
      data: {
        x: 'x',
        xFormat: '%Q',
        columns: [
          data.reduce((acc, [date]) => acc.concat(date), ['x']),
          data.reduce((acc, [, kdr]) => acc.concat(kdr), ['Kill/Death Ratio'])
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
    })
  }, [data])

  return (
    <div id="chart" />
  )
}

export default Chart

import React, { useContext, useEffect } from 'react'

import { DataContext } from './context/data'
import { refreshCurrentStats } from './actions/data'
import Chart from './components/Chart'

const App = () => {
  const [state, dispatch] = useContext(DataContext)

  useEffect(() => {
    dispatch(refreshCurrentStats())
  }, [])

  return (
    <Chart />
  )
}

export default App

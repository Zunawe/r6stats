import React, { useContext, useEffect } from 'react'

import { DataContext } from './context/data'
import { refreshCurrentStats } from './actions/data'

const App = () => {
  const [state, dispatch] = useContext(DataContext)

  useEffect(() => {
    dispatch(refreshCurrentStats())
  }, [])

  return (
    <p>{JSON.stringify(state)}</p>
  )
}

export default App

import React, { createContext, useReducer } from 'react'

import reducer from '../reducers/data'

const initialState = {
  currentStats: {}
}

export const DataContext = createContext()

export const DataContextProvider = (props) => {
  const { children } = props

  const [state, dispatch] = useReducer(reducer, initialState)
  const combinedDispatch = (action) => {
    if (typeof action === 'function') {
      action(combinedDispatch)
    } else {
      dispatch(action)
    }
  }

  return (
    <DataContext.Provider value={[state, combinedDispatch]}>
      {children}
    </DataContext.Provider>
  )
}

import React from 'react'

import { DataContextProvider } from './data'

const ContextProvider = ({ children }) => {
  return (
    <DataContextProvider>
      {children}
    </DataContextProvider>
  )
}

export default ContextProvider

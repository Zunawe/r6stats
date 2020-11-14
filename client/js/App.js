import React, { useCallback, useState } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import { ArrowForward } from '@material-ui/icons'

// import { DataContext } from './context/data'
import Chart from './components/Chart'

const App = () => {
  // const [state, dispatch] = useContext(DataContext)

  const [username, setUsername] = useState('')
  const handleChange = useCallback((event) => setUsername(event.target.value))

  const [stickyUsername, setStickyUsername] = useState(username)
  const handleClick = useCallback((event) => {
    event.preventDefault()
    setStickyUsername(username)
  })

  return (
    <>
      <form onSubmit={handleClick}>
        <TextField id='username' label='Username' value={username} onChange={handleChange} />
        <IconButton type='submit'>
          <ArrowForward />
        </IconButton>
      </form>
      <Chart username={stickyUsername} />
    </>
  )
}

export default App

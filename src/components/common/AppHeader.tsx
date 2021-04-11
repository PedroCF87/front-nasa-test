import React from 'react'
import './style.css'

const AppHeader: React.FC = () => {
  return (
    <header className="App-header">
      <img src="/images/logo_NASA.png" className="App-logo" alt="logo" />
      <h1>{process.env.REACT_APP_NAME}</h1>
    </header>
  )
}

export default AppHeader

import React from 'react'
import AppHeader from './components/common/AppHeader'
import RoverAdminForm from './components/RoverAdminForm/index'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <AppHeader />
      <RoverAdminForm />
    </div>
  )
}

export default App

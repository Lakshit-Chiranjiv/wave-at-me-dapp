import { useState } from 'react'
import './../node_modules/purecss/build/pure.css'
import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'
import WaveInput from './components/WaveInput'

function App() {

  return (
    <div className="pure-g App">
      <Header/>
      <Nav/>
      <WaveInput/>
      <div className="pure-u-1 waveList">

      </div>
      <div className="pure-u-1 about">
        
      </div>
    </div>
  )
}

export default App

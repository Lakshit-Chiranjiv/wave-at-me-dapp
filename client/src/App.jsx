import { useState } from 'react'
import './../node_modules/purecss/build/pure.css'
import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'

function App() {

  return (
    <div className="pure-g App">
      <Header/>
      <Nav/>
      <div className='pure-u-1 waveDiv'>
        <label htmlFor="waveMsg" className='myText'>Enter your Wave Message</label><br />
        <textarea name="waveMsg" className='myText' cols="30" rows="10" placeholder='Waving Hello from Far Away!!'></textarea>
        <button className='pure-button'>Wave your Message 👋</button>
      </div>
    </div>
  )
}

export default App

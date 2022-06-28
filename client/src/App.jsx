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
    </div>
  )
}

export default App

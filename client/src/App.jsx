import { useState } from 'react'
import './../node_modules/purecss/build/pure.css'
import './App.css'
import Header from './components/Header'

function App() {

  return (
    <div className="pure-g App">
      <Header/>
      <div className="pure-u-1-2 pure-menu pure-menu-horizontal nav">
        <ul className="pure-menu-list">
        
        
          <li className="pure-menu-item">
            <a href="#" className="pure-menu-link"><h3>See All Waves</h3></a>
          </li>
          <li className="pure-menu-item">
            <a href="#" className="pure-menu-link"><h3>Lets Wave</h3></a>
          </li>
          <li className="pure-menu-item">
            <a href="#" className="pure-menu-link"><h3>About us</h3></a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default App

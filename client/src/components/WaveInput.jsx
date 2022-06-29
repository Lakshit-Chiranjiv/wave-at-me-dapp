import React from 'react'

const WaveInput = ({waveHandler}) => {
  return (
    <div className='pure-u-1 waveDiv'>
        <label htmlFor="waveMsg" className='myText'>Enter your Wave Message</label><br />
        <textarea name="waveMsg" className='myText' cols="30" rows="10" placeholder='Waving Hello from Far Away!!'></textarea>
        <button className='pure-button' onClick={waveHandler}>Wave your Message 👋</button>
    </div>
  )
}

export default WaveInput
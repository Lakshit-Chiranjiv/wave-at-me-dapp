import React from 'react'
import Loader from './Loader'

const WaveInput = ({waveHandler,setWaveMsg,waveBtnLoading,wavingLog}) => {
  return (
    <div className='pure-u-1 waveDiv'>
        <label htmlFor="waveMsg" className='myText'>Enter your Wave Message</label><br />
        <textarea name="waveMsg" className='myText' cols="30" rows="10" placeholder='Waving Hello from Far Away!!' onChange={(e) => {setWaveMsg(e.target.value)}}></textarea>
        {
          waveBtnLoading ? 
          <Loader/> :
          <button className='pure-button myText' onClick={waveHandler}>Wave your Message 👋</button>
        }
        <p>Wave Log : {wavingLog}</p>
    </div>
  )
}

export default WaveInput
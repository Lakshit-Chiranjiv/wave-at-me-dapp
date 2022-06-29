import React from 'react'

const WaveBar = ({wave: {waver, message, timestamp}}) => {
  return (
    <div className="wavebar myText">
        <div className="barleft">
            <h2>Waver</h2>
            <h4>{waver.slice(0,5)+"..."+waver.slice(-4)}</h4>
        </div>
        <div className="barcentre">
            <h2>Message</h2>
            <p>{message}</p>
        </div>
        <div className="barright">
            <h2>Waved At</h2>
            <p className='wavedAt'>{timestamp.toDateString()+", "} <br />At {timestamp.toTimeString().slice(0,8)+" (IST)"}</p>
        </div>
    </div>
  )
}

export default WaveBar
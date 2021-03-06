import { ethers } from 'ethers'
import { useState,useEffect } from 'react'
import './../node_modules/purecss/build/pure.css'
import './App.css'
import Header from './components/Header'
import Loader from './components/Loader'
import Nav from './components/Nav'
import WaveBar from './components/WaveBar'
import WaveInput from './components/WaveInput'
import WaveContractAbi from './utils/WaveContract.json'

function App() {

  const waveContractAddress = '0xC4D8EFc70cc9BFD047C325FACA0d66E42d2925A0'

  const waveContractABI = WaveContractAbi.abi

  const [currentAccount,setCurrentAccount] = useState('')
  const [connectionMessage,setConnectionMessage] = useState('')
  const [allWaves,setAllWaves] = useState([])
  const [waveMsg,setWaveMsg] = useState('')
  const [wavingLog,setWavingLog] = useState('')
  const [listLoading,setListLoading] = useState(true)
  const [waveBtnLoading,setWaveBtnLoading] = useState(false)

  const checkWalletConnection = async () => {
    try {
      const { ethereum } = window

      if(ethereum){
        console.log("ethereum object exists : ",ethereum)
      }
      else{
        console.log("ethereum object doesn't exists, No wallet found")
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if(accounts.length != 0){
        const userAccount = accounts[0]
        console.log("User connected and authorized with account : "+userAccount)
        setConnectionMessage(userAccount+" connected")
        setCurrentAccount(userAccount)
        getAllWaves()
      }
      else{
        console.log("No user accounts connected or authorized")
      }

    } catch (error) {
      console.log("Message : "+error)
    }
  }

  const waveHandler = async () => {
    try {
      const { ethereum } = window

      if(ethereum){
        if(waveMsg.length>0){
          setWaveBtnLoading(true)
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const wavePortalContract = new ethers.Contract(waveContractAddress,waveContractABI,signer)
    
          let waveCount = await wavePortalContract.getTotalWaves()
          console.log("Total waves : "+waveCount.toNumber())

          let waveTxn = await wavePortalContract.wave(waveMsg)
          console.log("Mining wave txn : "+waveTxn.hash)
          await waveTxn.wait()
          console.log("Mined wave txn : "+waveTxn.hash)

          waveCount = await wavePortalContract.getTotalWaves()
          console.log("Total waves : "+waveCount.toNumber())
          getAllWaves()
          setWaveBtnLoading(false)
        }
        else{
          console.log("No message entered")
        }
      }
      else{
        console.log("Ethereum object not found, Install Metamask")
      }

    } catch (error) {
        console.log("Some error occured : "+error)
    }
  }


  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if(!ethereum){
        console.log("No Wallet found, Install Metamask")
        setConnectionMessage("No Wallet found, Install Metamask")
      }
      else{
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        const userAccount = accounts[0]
        console.log("Connected account : "+userAccount)
        setConnectionMessage(userAccount+" connected")
        setCurrentAccount(userAccount)
        getAllWaves()
      }
    } catch (error) {
      console.log(error)
      setConnectionMessage("Some error occured")
    }

  }

  const getAllWaves = async () => {
    try {
      const { ethereum } = window

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(waveContractAddress,waveContractABI,signer)

        const waveList = await wavePortalContract.getAllWaves()

        const furnishedWaveList = waveList.map(wave => (
          {
            waver: wave.waver,
            message: wave.message,
            timestamp: new Date(wave.timestamp * 1000),
          }
        ))
        console.log(furnishedWaveList)
        setAllWaves(furnishedWaveList.reverse())
        setListLoading(false)
      }
      else{
        console.log("Ethereum object not found, Install Metamask")
      }

    } catch (error) {
        console.log("Some error occured : "+error)
    }    
  }

  useEffect(()=>{
    checkWalletConnection()
  },[])

  return (
    <div className="pure-g App">
      <Header/>
      <Nav/>
      <div className="pure-u-1 connectDiv">
        {
          !currentAccount &&
          <button className="pure-button pure-button-primary" onClick={connectWallet}>Connect your Wallet ????</button>
        }
        <p>Connection Message : {connectionMessage}</p>
      </div>
      <WaveInput waveHandler={waveHandler} setWaveMsg={setWaveMsg} waveBtnLoading={waveBtnLoading} wavingLog={wavingLog}/>
      <div className="pure-u-1 waveList">

      </div>
      <div className="pure-u-1 about">
        
      </div>
      <div className="pure-u-1 waveList">
        <h1 className='myText'>Waves List</h1>
        {
          listLoading ?
          <Loader/> :
          allWaves.map((wave,i) => (
            <WaveBar key={i} wave={wave}/>
          ))
        }
      </div>
    </div>
  )
}

export default App

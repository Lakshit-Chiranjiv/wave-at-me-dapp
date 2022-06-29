import { ethers } from 'ethers'
import { useState,useEffect } from 'react'
import './../node_modules/purecss/build/pure.css'
import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'
import WaveInput from './components/WaveInput'
import WaveContractAbi from './utils/WaveContract.json'

function App() {

  const waveContractAddress = '0x0e3aa99D659c9178b7c6dd93605dD45861bF808b'

  const waveContractABI = WaveContractAbi.abi

  const [currentAccount,setCurrentAccount] = useState('')
  const [connectionMessage,setConnectionMessage] = useState('')

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
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(waveContractAddress,waveContractABI,signer)
  
        let waveCount = await wavePortalContract.getTotalWaves()
        console.log("Total waves : "+waveCount.toNumber())

        let waveTxn = await wavePortalContract.wave()
        console.log("Mining wave txn : "+waveTxn.hash)
        await waveTxn.wait()
        console.log("Mined wave txn : "+waveTxn.hash)

        waveCount = await wavePortalContract.getTotalWaves()
        console.log("Total waves : "+waveCount.toNumber())
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
      }
    } catch (error) {
      console.log(error)
      setConnectionMessage("Some error occured")
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
          <button className="pure-button pure-button-primary" onClick={connectWallet}>Connect your Wallet 👛</button>
        }
        <p>Connection Message : {connectionMessage}</p>
      </div>
      <WaveInput waveHandler={waveHandler}/>
      <div className="pure-u-1 waveList">

      </div>
      <div className="pure-u-1 about">
        
      </div>
    </div>
  )
}

export default App


const main = async() => {
    const [deployer] = await hre.ethers.getSigners()
    const deployerAccountBalance = await deployer.getBalance()
    console.log("Deployer address : "+deployer.address)
    console.log("Deployer balance : "+deployerAccountBalance.toString())
    

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal")
    const waveContract = await waveContractFactory.deploy()
    await waveContract.deployed()
    console.log(`Wave Portal contract deployed to ${waveContract.address}`)
}

const runMain = async() => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.log("Some error occured : "+error)
        process.exit(1)
    }
}

runMain()
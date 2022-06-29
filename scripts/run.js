
const main = async() => {
    const [owner, somePerson] = await hre.ethers.getSigners()
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal")
    const waveContract = await waveContractFactory.deploy()
    await waveContract.deployed()
    console.log(`Wave Portal contract deployed to ${waveContract.address}`)
    console.log(`the contract deployed by ${owner.address}`)

    let waveCount;
    waveCount = await waveContract.getTotalWaves()
    
    let waveTxn;
    waveTxn = await waveContract.wave('Owner Message')
    await waveTxn.wait()

    waveCount = await waveContract.getTotalWaves()

    waveTxn = await waveContract.connect(somePerson).wave('some Person message')
    await waveTxn.wait();
    
    waveCount = await waveContract.getTotalWaves()

    const allWaves = await waveContract.getAllWaves()
    console.log(allWaves)
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
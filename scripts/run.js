
const main = async() => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal")
    getC
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
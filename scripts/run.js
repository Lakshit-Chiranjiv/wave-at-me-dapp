const { getContractFactory } = require("hardhat/types")

const main = async() => {
    const waveContractFactory = await getContractFactory("WavePortal")
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
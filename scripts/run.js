
const main = async() => {
    const [owner, somePerson] = await hre.ethers.getSigners()
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal")
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.01"),
    })
    await waveContract.deployed()
    console.log(`Wave Portal contract deployed to ${waveContract.address}`)
    console.log(`the contract deployed by ${owner.address}`)

    let waveCount;
    waveCount = await waveContract.getTotalWaves()

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log("Contract Balance : "+hre.ethers.utils.formatEther(contractBalance))
    let ownerBalance = await hre.ethers.provider.getBalance(owner.address)
    console.log("Owner Balance : "+hre.ethers.utils.formatEther(ownerBalance))
    let waveTxn;
    waveTxn = await waveContract.wave('Owner Message')
    await waveTxn.wait()

    waveCount = await waveContract.getTotalWaves()

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log("Contract Balance : "+hre.ethers.utils.formatEther(contractBalance))

    ownerBalance = await hre.ethers.provider.getBalance(owner.address)
    console.log("Owner Balance : "+hre.ethers.utils.formatEther(ownerBalance))

    let somePersonBalance = await hre.ethers.provider.getBalance(somePerson.address)
    console.log("somePerson Balance : "+hre.ethers.utils.formatEther(somePersonBalance))

    waveTxn = await waveContract.connect(somePerson).wave('some Person message')
    await waveTxn.wait();
    
    waveCount = await waveContract.getTotalWaves()

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log("Contract Balance : "+hre.ethers.utils.formatEther(contractBalance))

    somePersonBalance = await hre.ethers.provider.getBalance(somePerson.address)
    console.log("somePerson Balance : "+hre.ethers.utils.formatEther(somePersonBalance))

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
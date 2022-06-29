// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    
    event Waved(address indexed waver, string message, uint timestamp);

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    uint totalWaves;

    function wave() public{
        totalWaves += 1;
        console.log("%s has waved on portal",msg.sender);
    }

    function getTotalWaves() public view returns(uint){
        console.log("Total Waves = %d",totalWaves);
        return totalWaves;
    }
}
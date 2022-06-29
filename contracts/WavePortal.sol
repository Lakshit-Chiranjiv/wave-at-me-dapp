// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    
    event Waved(address indexed waver, string message, uint timestamp);

    struct Wave{
        address waver;
        string message;
        uint timestamp;
    }

    Wave[] allWaves;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    uint totalWaves;

    function wave(string memory _message) public{
        totalWaves += 1;
        console.log("%s has waved on portal with message : %s",msg.sender,_message);

        allWaves.push(Wave(msg.sender,_message,block.timestamp));

        emit Waved(msg.sender,_message,block.timestamp);
    }

    function getTotalWaves() public view returns(uint){
        console.log("Total Waves = %d",totalWaves);
        return totalWaves;
    }

    function getAllWaves() public view returns(Wave[] memory){
        return allWaves;
    }
}
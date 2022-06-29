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

    uint private seed;

    constructor() payable {
        console.log("Yo yo, I am a contract and I am smart");

        uint instance1 = (block.timestamp * block.difficulty) % 1000;
        uint instance2 = (block.timestamp + block.difficulty * 25) % 1000;
        uint instance3 = (block.timestamp / block.difficulty) % 1000;
        uint instance4 = (block.timestamp - block.difficulty) % 1000;

        seed = (block.timestamp + instance1 * instance2 + instance3 - instance4 + block.difficulty) % 100;
        console.log("random seed : %d",seed);
    }

    uint totalWaves;

    function wave(string memory _message) public payable{
        totalWaves += 1;
        console.log("%s has waved on portal with message : %s",msg.sender,_message);

        allWaves.push(Wave(msg.sender,_message,block.timestamp));

        emit Waved(msg.sender,_message,block.timestamp);

        uint prize = 0.0001 ether;

        uint inst1 = (block.timestamp * block.difficulty) % 1000;
        uint inst2 = (block.timestamp * block.difficulty) % 1000;

        seed = (inst1 + inst2 + block.timestamp + block.difficulty + seed) % 100;

        if(seed < 50){
            require(address(this).balance >= prize,"Contract doesn't has enough ether to reward");

            (bool success,) = (msg.sender).call{value: prize}("");
            require(success,"Rewarding wasn't successfull");
        }
    }

    function getTotalWaves() public view returns(uint){
        console.log("Total Waves = %d",totalWaves);
        return totalWaves;
    }

    function getAllWaves() public view returns(Wave[] memory){
        return allWaves;
    }
}
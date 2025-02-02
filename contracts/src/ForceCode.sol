// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ForceCode {
    address[] public players;
    uint256 public prizePool;
    bool public isDistributed;
    
    event PlayerRegistered(address indexed player);
    event PrizesDistributed(address indexed first, address indexed second, address indexed third);

    function register() external payable {
        require(msg.value > 0.001 ether, "Must send exactly 0.001 ETH");
        require(players.length <= 30, "Contest is full");
        
        players.push(msg.sender);
        prizePool += msg.value;
        
        emit PlayerRegistered(msg.sender);
    }
    
    function distributePrizes(address first, address second, address third) external {
        require(players.length == 3, "Need 3 players");
        require(!isDistributed, "Prizes already distributed");
        
        uint256 firstPrize = (prizePool * 50) / 100;    // 50%
        uint256 secondPrize = (prizePool * 30) / 100;   // 30%
        uint256 thirdPrize = (prizePool * 15) / 100;    // 15%
        
        payable(first).transfer(firstPrize);
        payable(second).transfer(secondPrize);
        payable(third).transfer(thirdPrize);
        
        isDistributed = true;
        emit PrizesDistributed(first, second, third);
    }
    
    function getPlayers() external view returns (address[] memory) {
        return players;
    }
}
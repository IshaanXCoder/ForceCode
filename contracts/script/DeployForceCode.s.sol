// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/ForceCode.sol";

contract DeployCodeForce is Script {
    function run() external {
        // Retrieve private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the contract
        ForceCode contest = new ForceCode();
        
        // Stop broadcasting transactions
        vm.stopBroadcast();

        // Log the contract address
        console.log("ForceCode deployed to:", address(contest));
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../src/ForceCode.sol";

contract ForceCodeTest is Test {
    ForceCode forceCode;
    address constant MANAGER = address(0x123);
    address constant PLAYER1 = address(0x456);
    address constant PLAYER2 = address(0x789);
    address constant PLAYER3 = address(0xABC);

    function setUp() public {
        // Deploy new contract for each test
        forceCode = new ForceCode();
        
        // Fund test addresses
        vm.deal(PLAYER1, 1 ether);
        vm.deal(PLAYER2, 1 ether);
        vm.deal(PLAYER3, 1 ether);
    }

    // Test basic deployment
    function testEntryFee() public {
        assertEq(forceCode.ENTRY_FEE(), 0.001 ether);
    }

    // Test contest creation
    function testCreateContest() public {
        vm.prank(MANAGER);
        uint256 contestId = forceCode.createContest();
        
        assertEq(contestId, 0);
        assertEq(forceCode.nextContestId(), 1);
    }

    // Test full contest flow
    function testFullContestFlow() public {
        // Create contest
        vm.prank(MANAGER);
        uint256 contestId = forceCode.createContest();

        // Register players
        _registerPlayer(contestId, PLAYER1, "cf1", "discord1", 1500);
        _registerPlayer(contestId, PLAYER2, "cf2", "discord2", 1600);
        _registerPlayer(contestId, PLAYER3, "cf3", "discord3", 1700);

        // Update ranks
        address[] memory players = new address[](3);
        players[0] = PLAYER1;
        players[1] = PLAYER2;
        players[2] = PLAYER3;

        uint256[] memory ranks = new uint256[](3);
        ranks[0] = 1550; // Player1 improved by 50
        ranks[1] = 1650; // Player2 improved by 50
        ranks[2] = 1680; // Player3 improved by 20

        vm.prank(MANAGER);
        forceCode.updateFinalRanks(contestId, players, ranks);

        // Distribute prizes
        vm.prank(MANAGER);
        forceCode.distributePrizes(contestId);

        // Verify prize distribution
        assertEq(PLAYER1.balance, 1 ether - forceCode.ENTRY_FEE() + (0.001 ether * 3 * 50) / 100);
        assertEq(PLAYER2.balance, 1 ether - forceCode.ENTRY_FEE() + (0.001 ether * 3 * 30) / 100);
        assertEq(PLAYER3.balance, 1 ether - forceCode.ENTRY_FEE() + (0.001 ether * 3 * 15) / 100);
    }

    function _registerPlayer(
        uint256 contestId,
        address player,
        string memory cfId,
        string memory discordId,
        uint256 initialRank
    ) internal {
        vm.startPrank(player);
        forceCode.registerPlayer{value: forceCode.ENTRY_FEE()}(
            contestId,
            cfId,
            discordId,
            initialRank
        );
        vm.stopPrank();
    }
}
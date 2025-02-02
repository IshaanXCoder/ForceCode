"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const user_1 = __importDefault(require("./user"));
const ethers_1 = require("ethers");
const CONTRACT_ABI = [
    "function createContest() external returns (uint256)",
    "function registerPlayer(uint256 contestId, string calldata codeforcesId, string calldata discordId, uint256 initialRank) external payable",
    "function updateFinalRanks(uint256 contestId, address[] calldata playerAddresses, uint256[] calldata finalRanks) external",
    "function distributePrizes(uint256 contestId) external",
    "function setContestDuration(uint256 contestId, uint256 newDuration) external",
    "function getContestPlayers(uint256 contestId) external view returns (address[] memory)",
    "function getPlayerInfo(uint256 contestId, address player) external view returns (string memory codeforcesId, string memory discordId, uint256 initialRank, uint256 finalRank, bool hasRegistered)",
    "function ENTRY_FEE() public view returns (uint256)"
];
(0, dotenv_1.config)();
async function main() {
    const service = new user_1.default({
        providerUrl: process.env.PROVIDER_URL,
        contractAddress: process.env.CONTRACT_ADDRESS,
        privateKey: process.env.PRIVATE_KEY,
    });
    try {
        console.log("Starting ForceCode contract tests...\n");
        // Test 1: Get Entry Fee
        console.log("Test 1: Getting Entry Fee...");
        const entryFee = await service.ENTRY_FEE();
        console.log(`Entry Fee: ${(0, ethers_1.formatEther)(entryFee.toString())} ETH\n`);
        // Test 2: Create Contest
        console.log("Test 2: Creating a new contest...");
        const createContestReceipt = await service.createContest();
        if (!createContestReceipt) {
            throw new Error('Failed to create contest - no transaction receipt');
        }
        const contractInterface = new ethers_1.Interface(CONTRACT_ABI);
        let contestId;
        for (const log of createContestReceipt.logs) {
            try {
                const parsedLog = contractInterface.parseLog(log);
                if (parsedLog?.name === 'ContestCreated') {
                    contestId = Number(parsedLog.args.contestId);
                    break;
                }
            }
            catch (e) {
                // Skip logs that can't be parsed
                continue;
            }
        }
        if (!contestId) {
            throw new Error('Contest ID not found in transaction logs');
        }
        console.log(`Contest created with ID: ${contestId}`);
        console.log(`Transaction hash: ${createContestReceipt.hash}\n`);
        // Test 3: Register Players
        console.log("Test 3: Registering players...");
        const players = [
            {
                codeforcesId: "player1_cf",
                discordId: "player1#1234",
                initialRank: 1500,
            },
            // Additional players would require separate wallet addresses
        ];
        // Assuming current wallet is player1 for testing; in reality, use different wallets
        for (const player of players) {
            const registerTx = await service.registerPlayer({
                contestId,
                ...player,
            });
            console.log(`Registered player ${player.codeforcesId}`);
            console.log(`Transaction hash: ${registerTx?.hash}`);
        }
        console.log();
        // Test 4: Get Contest Players
        console.log("Test 4: Getting contest players...");
        const registeredPlayers = await service.getContestPlayers(contestId);
        console.log("Registered player addresses:", registeredPlayers);
        for (const playerAddress of registeredPlayers) {
            const playerInfo = await service.getPlayerInfo(contestId, playerAddress);
            console.log(`\nPlayer Info for ${playerAddress}:`);
            console.log({
                ...playerInfo,
                initialRank: Number(playerInfo.initialRank),
                finalRank: Number(playerInfo.finalRank),
            });
        }
        console.log();
        // Test 5: Update Final Ranks
        console.log("Test 5: Updating final ranks...");
        const finalRanks = [1550];
        const updateRanksTx = await service.updateFinalRanks({
            contestId,
            playerAddresses: registeredPlayers,
            finalRanks,
        });
        console.log(`Transaction hash: ${updateRanksTx?.hash}\n`);
        // Test 6: Distribute Prizes
        console.log("Test 6: Distributing prizes...");
        const distributeTx = await service.distributePrizes(contestId);
        console.log(`Transaction hash: ${distributeTx?.hash}\n`);
        // Test 7: Verify Final Player States
        console.log("Test 7: Verifying final player states...");
        for (const playerAddress of registeredPlayers) {
            const finalPlayerInfo = await service.getPlayerInfo(contestId, playerAddress);
            console.log(`\nFinal Player Info for ${playerAddress}:`);
            console.log({
                ...finalPlayerInfo,
                initialRank: Number(finalPlayerInfo.initialRank),
                finalRank: Number(finalPlayerInfo.finalRank),
            });
        }
    }
    catch (error) {
        console.error("Error occurred during testing:");
        console.error(error);
    }
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});

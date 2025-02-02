"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const CONTRACT_ABI = [
    "function createContest() external returns (uint256)",
    "function registerPlayer(uint256 contestId, string calldata codeforcesId, string calldata discordId, uint256 initialRank) external payable",
    "function updateFinalRanks(uint256 contestId, address[] calldata playerAddresses, uint256[] calldata finalRanks) external",
    "function distributePrizes(uint256 contestId) external",
    "function setContestDuration(uint256 contestId, uint256 newDuration) external",
    "function getContestPlayers(uint256 contestId) external view returns (address[] memory)",
    "function getPlayerInfo(uint256 contestId, address player) external view returns (string memory codeforcesId, string memory discordId, uint256 initialRank, uint256 finalRank, bool hasRegistered)",
    "function ENTRY_FEE() external view returns (uint256)"
];
class ForceCodeService {
    provider;
    wallet;
    contract;
    constructor(config) {
        this.provider = new ethers_1.JsonRpcProvider(config.providerUrl);
        this.wallet = new ethers_1.Wallet(config.privateKey, this.provider);
        this.contract = new ethers_1.Contract(config.contractAddress, CONTRACT_ABI, this.wallet);
    }
    async ENTRY_FEE() {
        return await this.contract.ENTRY_FEE();
    }
    async createContest() {
        const tx = await this.contract.createContest();
        return await tx.wait();
    }
    async registerPlayer(params) {
        const entryFee = await this.contract.ENTRY_FEE();
        const tx = await this.contract.registerPlayer(params.contestId, params.codeforcesId, params.discordId, params.initialRank, { value: entryFee.toString() });
        return await tx.wait();
    }
    async updateFinalRanks(params) {
        const tx = await this.contract.updateFinalRanks(params.contestId, params.playerAddresses, params.finalRanks);
        return await tx.wait();
    }
    async distributePrizes(contestId) {
        const tx = await this.contract.distributePrizes(contestId);
        return await tx.wait();
    }
    async setContestDuration(contestId, durationInSeconds) {
        const tx = await this.contract.setContestDuration(contestId, durationInSeconds);
        return await tx.wait();
    }
    async getContestPlayers(contestId) {
        return await this.contract.getContestPlayers(contestId);
    }
    async getPlayerInfo(contestId, playerAddress) {
        const [codeforcesId, discordId, initialRank, finalRank, hasRegistered] = await this.contract.getPlayerInfo(contestId, playerAddress);
        return {
            walletAddress: playerAddress,
            codeforcesId,
            discordId,
            initialRank: Number(initialRank),
            finalRank: Number(finalRank),
            hasRegistered
        };
    }
}
exports.default = ForceCodeService;

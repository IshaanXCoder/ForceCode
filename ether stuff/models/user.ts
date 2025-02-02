import {
  ethers,
  Contract,
  JsonRpcProvider,
  Wallet,
  ContractTransactionResponse,
  TransactionReceipt,
  formatEther,
  BigNumberish,
  BaseContract
} from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

// Types and Interfaces
interface Player {
  walletAddress: string;
  codeforcesId: string;
  discordId: string;
  initialRank: number;
  finalRank: number;
  hasRegistered: boolean;
}

interface ForceCodeConfig {
  providerUrl: string;
  contractAddress: string;
  privateKey: string;
}

interface ForceCodeInterface extends BaseContract {
  createContest(): Promise<ContractTransactionResponse>;
  ENTRY_FEE():Promise<BigInt>;
  registerPlayer(
    contestId: BigNumberish,
    codeforcesId: string,
    discordId: string,
    initialRank: BigNumberish,
    overrides?: { value: BigNumberish }
  ): Promise<ContractTransactionResponse>;
  
  updateFinalRanks(
    contestId: BigNumberish,
    playerAddresses: string[],
    finalRanks: BigNumberish[]
  ): Promise<ContractTransactionResponse>;
  
  distributePrizes(
    contestId: BigNumberish
  ): Promise<ContractTransactionResponse>;
  
  setContestDuration(
    contestId: BigNumberish,
    newDuration: BigNumberish
  ): Promise<ContractTransactionResponse>;
  
  getContestPlayers(
    contestId: BigNumberish
  ): Promise<string[]>;
  
  getPlayerInfo(
    contestId: BigNumberish,
    player: string
  ): Promise<[string, string, bigint, bigint, boolean]>;
}

const CONTRACT_ABI = [
  "function createContest() external returns (uint256)",
  "function registerPlayer(uint256 contestId, string calldata codeforcesId, string calldata discordId, uint256 initialRank) external payable",
  "function updateFinalRanks(uint256 contestId, address[] calldata playerAddresses, uint256[] calldata finalRanks) external",
  "function distributePrizes(uint256 contestId) external",
  "function setContestDuration(uint256 contestId, uint256 newDuration) external",
  "function getContestPlayers(uint256 contestId) external view returns (address[] memory)",
  "function getPlayerInfo(uint256 contestId, address player) external view returns (string memory codeforcesId, string memory discordId, uint256 initialRank, uint256 finalRank, bool hasRegistered)",
  "function ENTRY_FEE() external view returns (uint256)"

] as const;

class ForceCodeService {
  private provider: JsonRpcProvider;
  private wallet: Wallet;
  private contract: ForceCodeInterface;

  constructor(config: ForceCodeConfig) {
    this.provider = new JsonRpcProvider(config.providerUrl);
    this.wallet = new Wallet(config.privateKey, this.provider);
    this.contract = new Contract(
      config.contractAddress,
      CONTRACT_ABI,
      this.wallet
    ) as unknown as ForceCodeInterface;
  }

  public async ENTRY_FEE(): Promise<BigInt> {
    return await this.contract.ENTRY_FEE();
}

  public async createContest(): Promise<TransactionReceipt | null> {
    const tx = await this.contract.createContest();
    return await tx.wait();
  }

  public async registerPlayer(params: {
    contestId: number;
    codeforcesId: string;
    discordId: string;
    initialRank: number;
  }): Promise<TransactionReceipt | null> {
    const entryFee = await this.contract.ENTRY_FEE();
    
    const tx = await this.contract.registerPlayer(
      params.contestId,
      params.codeforcesId,
      params.discordId,
      params.initialRank,
      { value: entryFee.toString() }
    );
    
    return await tx.wait();
  }

  public async updateFinalRanks(params: {
    contestId: number;
    playerAddresses: string[];
    finalRanks: number[];
  }): Promise<TransactionReceipt | null> {
    const tx = await this.contract.updateFinalRanks(
      params.contestId,
      params.playerAddresses,
      params.finalRanks
    );
    return await tx.wait();
  }

  public async distributePrizes(
    contestId: number
  ): Promise<TransactionReceipt | null> {
    const tx = await this.contract.distributePrizes(contestId);
    return await tx.wait();
  }

  public async setContestDuration(
    contestId: number,
    durationInSeconds: number
  ): Promise<TransactionReceipt | null> {
    const tx = await this.contract.setContestDuration(contestId, durationInSeconds);
    return await tx.wait();
  }

  public async getContestPlayers(contestId: number): Promise<string[]> {
    return await this.contract.getContestPlayers(contestId);
  }

  public async getPlayerInfo(
    contestId: number,
    playerAddress: string
  ): Promise<Player> {
    const [codeforcesId, discordId, initialRank, finalRank, hasRegistered] = 
      await this.contract.getPlayerInfo(contestId, playerAddress);
    
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

export default ForceCodeService;

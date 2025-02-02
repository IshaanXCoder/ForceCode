import {
  Contract,
  JsonRpcProvider,
  Wallet,
  parseEther
} from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

const CONTRACT_ABI = [
  "function register() external payable",
  "function distributePrizes(address, address, address) external",
  "function getPlayers() external view returns (address[])",
  "function prizePool() external view returns (uint256)",
  "function isDistributed() external view returns (bool)"
];

class ForceCodeService {
  constructor(config) {
      this.provider = new JsonRpcProvider(config.providerUrl);
      this.wallet = new Wallet(config.privateKey, this.provider);
      this.contract = new Contract(
          config.contractAddress,
          CONTRACT_ABI,
          this.wallet
      );
  }

  async register() {
      const tx = await this.contract.register({
          value: parseEther("0.0015") // Sending required 0.001 ETH
      });
      return await tx.wait();
  }

  async distributePrizes(first, second, third) {
      const tx = await this.contract.distributePrizes(first, second, third);
      return await tx.wait();
  }

  async getPlayers() {
      return await this.contract.getPlayers();
  }

  async getPrizePool() {
      return await this.contract.prizePool();
  }

  async isDistributed() {
      return await this.contract.isDistributed();
  }
}

export default ForceCodeService;
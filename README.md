
# ForceCode - Blockchain-Based Competitive Platform

## 🚀 Overview
This project is a blockchain-based competitive platform where friends can challenge each other to solve problems on CodeForces and compete for a prize pool. The platform integrates **Solidity** (with Foundry for smart contracts), **Next.js** for the frontend, **C#** for backend functionality, and **Tailwind CSS with shadcn** for styling. Additionally we've even added a discord bot functionality to give live informaition of the problems solved by others.

**Ethereum Deployment address -** 0xD6F93be0563844d8a925503fcf9b5937c0abE58E

**Polygon Deployment address -** 0x920b931fe1792Fa5B179Cfaec191dA1a03c4949b
## 💡 Video Demo



## 🛠️ Tech Stack
- **Smart Contract**: Solidity (Foundry)
- **Frontend**: Next.js (React)
- **Backend**: C#
- **Styling**: Tailwind CSS & shadcn
- **Blockchain Interaction**: ethers.js
- **Database**: PostgreSQL
- **Notifications and live informaition**: Discord Bot
- **Codeforces API**: To fetch problem-solving statistics

## 🔥 Features
- 🏆 **Leaderboard**: Tracks user progress on CodeForces
- 🔔 **Real-time Notifications**: Updates on Discord when a participant solves a problem
- 💰 **Automated Prize Distribution**: Fortnightly rewards based on change in ranks
- 🔄 **Transparent & Decentralized**: Ensures fair distribution of funds

## 🎮 How It Works
1. **Registration**:
   - Users deposit **0.001 Sepolia ETH**
   - Enter Ethereum Wallet Address, CodeForces ID, and Discord ID
2. **Leaderboard**:
   - Leaderboard chanegs on basis of change in innitial and final ranks
   - Leaderboard updates via API integration
3. **Notifications**:
   - Every solved problem is announced on Discord
4. **Prize Distribution**:
   - **50%** → Rank 1
   - **25%** → Rank 2
   - **15%** → Rank 3
   - Funds are transferred automatically to winners' wallet addresses



## 💡 Setup & Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo-link.git
   cd your-repo-folder
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env` file):
   ```plaintext
   NEXT_PUBLIC_CONTRACT_ADDRESS=your_smart_contract_address
   CODEFORCES_API_KEY=your_codeforces_api_key
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   DISCORD_BOT_TOKEN=your_discord_bot_token
   ```
4. Run the frontend:
   ```sh
   npm run dev
   ```
5. Deploy the smart contract (Foundry):
   ```sh
   forge script script/Deploy.s.sol --rpc-url your_rpc_url --private-key your_private_key --broadcast
   ```
6. Run the backend:
   ```sh
   npm start
   ```

## 🤝 Contributors
- **@IshaanXCoder** (Ishaan Kesarwani)
- **@anshKarwasara** (Ansh Karwasara)

## 📜 License
This project is open-source and available under the **MIT License**.

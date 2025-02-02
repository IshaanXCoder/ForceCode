

"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useWallet } from "../../store/walletContext";
import { ethers,BrowserProvider } from "ethers";
import * as dotenv from 'dotenv'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { ArrowRight, Loader2, Plus, Users } from "lucide-react";
import ForceCodeService from '../../models/blockChain'
dotenv.config();
async function handleClick() {
  if (window.ethereum) {
      try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); 
      } catch (error) {
          console.error(error);
      }
  } else {
      alert('Please install MetaMask!');
  }
}

const checkOutTransaction = async () => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      // 1. Connect to MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // 2. Create provider and signer from MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // 3. Create contract client WITH METAMASK SIGNER
      const contractClient = new ForceCodeService({
        providerUrl:process.env.PROVIDER_URL,
        privateKey: process.env.PRIVATE_KEY, 
        contractAddress: process.env.CONTRACT_ADDRESS,
      });

      // 4. Send transaction
      const tx = await contractClient.register();

      console.log('Transaction sent:', tx.hash);
      
      // 5. Wait for confirmation
      // const receipt = await tx.wait();
      // console.log('Transaction confirmed:', receipt);
    } else {
      console.error('Please install MetaMask!');
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
}


export function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [contestOption, setContestOption] = useState(null);

  const [codeForceId, setCodeForceId] = useState("");
  const [discordId, setDiscordId] = useState("");
  const [etheriumAddr, setEtheriumAddr] = useState("");
  const { isConnected, setIsConnected } = useWallet();
  const [walletAddress, setWalletAddress] = useState("");
  const [Status, setStatus] = useState("Register");
  const [teamCodes, setTeamCodes] = useState([]);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("walletAddress");
    setWalletAddress(JSON.parse(data));
  });

  
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default in all cases
    console.log(isConnected);
    if (isConnected) {
      let data;
      if (contestOption == "join") {
        data = {
          codeForcesId: codeForceId,
          DiscordId: discordId,
          etheriumAddr: etheriumAddr,
          teamName: teamCodes.includes(teamName) ? teamName : null,
        };
      } else if (contestOption == "create") {
        data = {
          codeForceId: codeForceId,
          DiscordId: discordId,
          etheriumAddr: etheriumAddr,
          teamName: teamCodes,
        };
      }

      setIsLoading(true);
      if (data.teamName === null) {
        console.log(`please enter a valid teamname`);
        setIsLoading(false);
      } else {
        console.log(`user with codeforce id ${codeForceId} is registered`);
        
        setIsLoading(false);
      }
    } else {
      setStatus("connect metaMask first!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus("Register");
    }
  };
  return (
    <Card className="w-full max-w-md mx-auto card-glow glassmorphic">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          Register for ForceCode
        </CardTitle>
        <CardDescription className="text-gray-400">
          Join the ultimate competitive programming platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="codeforces-id" className="text-gray-300">
              Codeforces ID
            </Label>
            <Input
              id="codeforces-id"
              placeholder="Enter your Codeforces ID"
              required
              value={codeForceId}
              onChange={(e)=> setCodeForceId(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discord-id" className="text-gray-300">
              Discord ID
            </Label>
            <Input
              id="discord-id"
              placeholder="Enter your Discord ID"
              required
              value={discordId}
              onChange={(e)=> setDiscordId(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ethereum-address" className="text-gray-300">
              Ethereum Address
            </Label>
            <Input
              id="ethereum-address"
              placeholder="Enter your Ethereum address"
              readOnly
              value={walletAddress}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">Contest Option</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={contestOption === "create" ? "default" : "outline"}
                className={
                  'flex-1 ${contestOption === "create" ? "bg-purple-700 hover:bg-purple-600" : "bg-gray-800 hover:bg-gray-700"}'
                }
                onClick={() => setContestOption("create")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Contest
              </Button>
              <Button
                type="button"
                variant={contestOption === "join" ? "default" : "outline"}
                className={
                  'flex-1 ${contestOption === "join" ? "bg-purple-700 hover:bg-purple-600" : "bg-gray-800 hover:bg-gray-700"}'
                }
                onClick={() => setContestOption("join")}
              >
                <Users className="mr-2 h-4 w-4" />
                Join Contest
              </Button>
            </div>
          </div>
          {contestOption === "create" && (
            <div className="space-y-2">
              <Label htmlFor="contest-name" className="text-gray-300">
                Contest Name
              </Label>
              <Input
                id="contest-name"
                placeholder="Enter your contest name"
                onChange={(e) => setTeamName(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          )}
          {contestOption === "join" && (
            <div className="space-y-2">
              <Label htmlFor="contest-code" className="text-gray-300">
                Contest Name
              </Label>
              <Input
                id="contest-code"
                placeholder="Enter the contest Name"
                onChange={(e) => setTeamName(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          )}
          <Button
            onClick={checkOutTransaction}
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-600"
            disabled={isLoading || !contestOption}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              <>
                Register
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

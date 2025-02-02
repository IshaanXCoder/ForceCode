// app/store/walletContext.js
"use client"
import { createContext, useContext, useState } from "react";

// Initialize context with default values (optional but recommended)
const WalletContext = createContext({
  isConnected: false,
  setIsConnected: () => {},
});

export function WalletProvider({ children }) {
  
  const [isConnected, setIsConnected] = useState(false);

  return (
    <WalletContext.Provider value={{ isConnected, setIsConnected }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  return context; // Will use defaults if provider is missing
};
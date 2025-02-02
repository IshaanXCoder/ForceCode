import { Inter } from "next/font/google";
import "./globals.css";
import React from "react"; // Import React
import { WalletProvider } from './store/walletContext'

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "ForceCode - Competitive Programming with Crypto Rewards",
  description: "Compete on Codeforces, pool Ethereum, win rewards based on your rank",
};

const RootLayout = ({ children,pageProps }) => {
  return (
    <html lang="en" className="dark">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
     <body className={inter.className}>
      <WalletProvider>
      {children}
      </WalletProvider>
     </body>
    
    </html>
  );
};

export default RootLayout;
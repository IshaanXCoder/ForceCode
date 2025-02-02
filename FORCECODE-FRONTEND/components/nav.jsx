"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Code2, Trophy, Users, Wallet, UserPlus } from "lucide-react"
import { Button } from "../components/ui/button"
import { ToastContainer,toast,Bounce } from "react-toastify"
import { useWallet } from '../app/store/walletContext'

export function Nav() {
  const { isConnected, setIsConnected } = useWallet();
  const walletCTx = useWallet();
  console.log(walletCTx)
  const notify = (text) => toast.error(text)
  const connectToMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        if(!isConnected){
        // Request account access
          const res = await window.ethereum.request({ method: "eth_requestAccounts" })
          localStorage.setItem('walletAddress',JSON.stringify(res[0]));
          setIsConnected(true)
          console.log('conn successfull')
        }
      } catch (error) {
        notify("User denied account access")
        console.error("User denied account access",error)
        localStorage.setItem('walletConnection',JSON.stringify(isConnected))
      }
    } else {
      notify('MetaMask is not installed')
      console.log("MetaMask is not installed")
      localStorage.setItem('walletConnection',JSON.stringify(isConnected))
    }
  }

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 w-full z-50 glassmorphism">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Code2 className="h-6 w-6 text-primary" />
          <span>ForceCode</span>
        </Link>
        <div className="flex gap-6 px-2">
          {[
            { href: "/register-player", icon: UserPlus, label: "Register Yourself" },
            // { href: "/register-team", icon: UserPlus, label: "Register Team" },
            { href: "/dashboard", icon: Users, label: "Dashboard" },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>
        <div className="flex gap-4">
          <Button onClick={connectToMetaMask} variant="outline">
            <Wallet className="mr-2 h-4 w-4" />
            {isConnected ? "Connected" : "Connect Wallet"}
          </Button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            draggable
            theme="dark"
            transition={Bounce}
          />
        </div>
      </div>
    </motion.nav>
  )
}


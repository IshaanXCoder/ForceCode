"use client"

import { Button } from "../components/ui/button"
import { ArrowRight, Code2, Flame } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="min-h-screen pt-24 pb-12 grid-bg">
      <div className="container relative p-20">
        <div className="gradient-bg absolute inset-0" />
        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary/20 text-primary px-4 py-1.5 rounded-full font-semibold flex items-center gap-2">
                <Flame className="h-4 w-4" />
                Live Competitions
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
              Code. Compete.
              <br />
              <span className="text-primary">Earn Crypto.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              Join the ultimate competitive programming platform where your skills are rewarded with Ethereum. Compete
              in real-time, climb the leaderboard, and win from the prize pool.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="hover-glow text-lg">
                Start Competing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="secondary" className="text-lg">
                View Competitions
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="float"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg blur-3xl" />
              <div className="relative glassmorphism rounded-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                  <Code2 className="h-8 w-8 text-primary" />
                  <div className="text-sm">
                    <div className="font-semibold">Current Competition</div>
                    <div className="text-muted-foreground">Division 1 - Round 892</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-background/50 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-2">Prize Pool</div>
                    <div className="text-3xl font-bold">12.5 ETH</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="text-sm text-muted-foreground mb-2">Participants</div>
                      <div className="text-2xl font-bold">234</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="text-sm text-muted-foreground mb-2">Time Left</div>
                      <div className="text-2xl font-bold">2:45:30</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


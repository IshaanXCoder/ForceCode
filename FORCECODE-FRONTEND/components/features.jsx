"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "../components/ui/card"
import { Code2, Trophy, Wallet, Zap } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Competitive Coding",
    description: "Solve challenging problems from Codeforces in real-time competitions",
  },
  {
    icon: Wallet,
    title: "Crypto Rewards",
    description: "Win Ethereum rewards based on your performance and ranking",
  },
  {
    icon: Trophy,
    title: "Global Leaderboard",
    description: "Compete with developers worldwide and climb the rankings",
  },
  {
    icon: Zap,
    title: "Smart Contracts",
    description: "Automated and transparent reward distribution via blockchain",
  },
]

export function Features() {
  return (
    <section className="py-20 relative pl-12">
      <div className="gradient-bg absolute inset-0" />
      <div className="container relative px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Future of Competitive Programming</h2>
          <p className="text-xl text-muted-foreground">
            Combining the thrill of coding challenges with the power of blockchain technology
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover-glow h-full border-primary/20">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


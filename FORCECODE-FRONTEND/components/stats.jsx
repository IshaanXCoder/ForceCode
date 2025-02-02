"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "../components/ui/card"
import { Award, Code, Users } from "lucide-react"

const stats = [
  {
    icon: Award,
    value: "$124.5k",
    label: "Total Prize Pool",
    description: "Distributed among winners",
  },
  {
    icon: Users,
    value: "1,234",
    label: "Active Participants",
    description: "From 50+ countries",
  },
  {
    icon: Code,
    value: "98.2%",
    label: "Success Rate",
    description: "In smart contracts",
  },
]

export function Stats() {
  return (
    <section className="py-20 pl-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover-glow border-primary/20">
                <CardContent className="p-6">
                  <stat.icon className="h-12 w-12 text-primary mb-4" />
                  <div className="space-y-2">
                    <div className="text-4xl font-bold">{stat.value}</div>
                    <div className="text-lg font-medium">{stat.label}</div>
                    <div className="text-muted-foreground">{stat.description}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


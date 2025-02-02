"use client";

import { Nav } from "../components/nav"
import { Hero } from "../components/hero"
import { Features } from "../components/features"
import { Stats } from "../components/stats"
import { Footer } from "../components/footer"


export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <Footer />
    </main>
  )
}


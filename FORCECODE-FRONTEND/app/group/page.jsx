"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Nav } from "../../components/nav"
import { Footer } from "../../components/footer"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Search } from 'lucide-react'

export default function GroupHomePage() {
  const [teamCode, setTeamCode] = useState("")
  const router = useRouter()

  const handleFindTeam = async (e) => {
    e.preventDefault()
    // Here you would typically verify the team code with your backend
    // For now, we'll just simulate a successful verification
    console.log("Finding team with code:", teamCode)
    // Redirect to dashboard after successful verification
    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-grow container max-w-4xl mx-auto py-16">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Login to Your Team</CardTitle>
            <CardDescription>Enter your team code to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFindTeam} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="team-code"
                  placeholder="Enter your team code"
                  value={teamCode}
                  onChange={(e) => setTeamCode(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Find Team
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </main>
  )
}

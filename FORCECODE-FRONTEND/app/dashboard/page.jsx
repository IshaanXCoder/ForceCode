"use client"
import { useState,useEffect } from "react"
import { Nav } from "../../components/nav"
import { Footer } from "../../components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

let GROUP_FETCH_URL;
let USER_FETCH_URL;
let DELTA_FETCH_URL;

const TeamMembers = [
  { name: "Alice", codeforcesId: "alice123", ethAddress: "0x1234...5678" },
  { name: "Bob", codeforcesId: "bob456", ethAddress: "0x2345...6789" },
  { name: "Charlie", codeforcesId: "charlie789", ethAddress: "0x3456...7890" },
]

const Rankings = [
  { name: "Alice", initialRank: 1500, currentRank: 1650, change: 150 },
  { name: "Bob", initialRank: 1600, currentRank: 1700, change: 100 },
  { name: "Charlie", initialRank: 1400, currentRank: 1600, change: 200 },
].sort((a, b) => b.change - a.change)



const COLORS = ["#3B82F6", "#8B5CF6", "#60A5FA"]

export default function DashboardPage() {
  const [teamMembers, setTeamMembers] = useState(TeamMembers)
  const [rankings, setRankings] = useState(Rankings)

  useEffect(()=>{
    const featchGroupName = async ()=>{
      // const res = await fetch(GROUP_FETCH_URL,{
      //   method:'GET'
      // });
      // const data = await res.json();
      //below is a sample data for testing 
      const userIdArr=  ['ox235','cg22ddR','Oy4E53'];
      const preProcessedUsers = Promise.all(
        userIdArr.map(async (eli,index)=>{
          //first get the delta  rating
          // const res = await fetch(DELTA_FETCH_URL+`?codeForcesId=${eli}`);
          // const data  = await res.json();
          //below is the sample data for testing 
          const currentUserDelta = 20
  
          // const res = await fetch(USER_FETCH_URL+`?codeForcesId=${eli}`);
          // const data = await res.json();
          //above code would give a user's info with that codeforces id
          //example code below(for testing)

          const rating = Math.round((2000 - 1000)*Math.random());
          return {
          teammMem: {
            name:`player-${index}`,
            CodeForcesRating:rating ,
            EthereumAddress: `Oxffeeii${Math.round(index*Math.random())}`,
            DiscordUsername: `HorseLover-${index}`,
            EthereumBalance:Math.random(),
          },
          memRankings: {
            name: `player-${index}`,
            initialRank: rating - currentUserDelta,
            currentRank: rating,
            change: currentUserDelta,
          }
        }
  
        })
      )
      const newTeamMems = (await preProcessedUsers).map(u => u.teammMem);
      const updatedRankings = (await preProcessedUsers).map(u => u.memRankings).sort((a,b)=> b.change = a.change);
      setTeamMembers(newTeamMems);
      setRankings(updatedRankings);
      // console.log('updated team:',teamMemArr);
      // console.log('updated Rankings:',teamRankingArr)
    }
    featchGroupName();
  },[])
  const pieData = rankings.map((member) => ({
    name: member.name,
    value: member.change,
  }))

  return (
    <main className="min-h-screen flex flex-col bg-[#050505] bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#111111]">
      <Nav />
      <div className="flex-grow container max-w-7xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]">
          Team Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {teamMembers.map((member, index) => (
            <Card key={index} className="backdrop-blur-sm bg-white/5 border border-white/10 
              shadow-[0_0_15px_rgba(59,130,246,0.15),0_0_15px_rgba(139,92,246,0.15)] 
              hover:shadow-[0_0_25px_rgba(59,130,246,0.25),0_0_25px_rgba(139,92,246,0.25)] 
              hover:border-blue-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {member.name}
                </CardTitle>
                <CardDescription className="text-blue-200/60">Team Member {index + 1}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-300">
                  <strong className="text-blue-400">Codeforces ID:</strong> {member.codeforcesId}
                </p>
                <p className="text-gray-300">
                  <strong className="text-purple-400">ETH Address:</strong> {member.ethAddress}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 backdrop-blur-sm bg-white/5 border border-white/10 
            shadow-[0_0_15px_rgba(59,130,246,0.15),0_0_15px_rgba(139,92,246,0.15)]">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Team Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-white/10">
                    <TableHead className="font-semibold text-blue-400">Name</TableHead>
                    <TableHead className="font-semibold text-purple-400">Initial Rank</TableHead>
                    <TableHead className="font-semibold text-blue-400">Current Rank</TableHead>
                    <TableHead className="font-semibold text-purple-400">Change in Rank</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankings.map((member, index) => (
                    <TableRow 
                      key={index}
                      className="border-b border-white/5 hover:bg-white/5 
                        hover:shadow-[0_0_15px_rgba(59,130,246,0.1),0_0_15px_rgba(139,92,246,0.1)] 
                        transition-all duration-200"
                    >
                      <TableCell className="font-medium text-gray-300">{member.name}</TableCell>
                      <TableCell className="text-gray-400">{member.initialRank}</TableCell>
                      <TableCell className="text-gray-400">{member.currentRank}</TableCell>
                      <TableCell>
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          +{member.change}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/5 border border-white/10 
            shadow-[0_0_15px_rgba(59,130,246,0.15),0_0_15px_rgba(139,92,246,0.15)]">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Rank Changes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        className="hover:opacity-80 transition-opacity duration-300"
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  )
}
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Nav } from "../../components/nav";

const players = [
  {
    rank: 1,
    name: "Player 1",
    score: 2800,
    competitions: 15,
    winRate: "76%",
  },
  {
    rank: 2,
    name: "Player 2",
    score: 2650,
    competitions: 12,
    winRate: "71%",
  },
  {
    rank: 3,
    name: "Player 3",
    score: 2400,
    competitions: 10,
    winRate: "65%",
  },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background my-16">
      <Nav />
      <main className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Leaderboard</h1>
          <p className="mt-2 text-muted-foreground">Top performers in ForceCode competitions</p>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Competitions</TableHead>
                <TableHead>Win Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.rank}>
                  <TableCell>
                    <Badge
                      variant={player.rank === 1 ? "default" : "secondary"}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      {player.rank}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell>{player.score}</TableCell>
                  <TableCell>{player.competitions}</TableCell>
                  <TableCell>{player.winRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
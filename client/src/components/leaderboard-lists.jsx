import { useState, useEffect } from "react"
import {
  GitCommitIcon,
  UsersIcon,
  FolderGitIcon,
  StarIcon,
  GitPullRequestIcon,
  AlertCircleIcon,
  GitForkIcon,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"

// Mock data for GitHub users
const mockUsers = [
  {
    id: 1,
    username: "techmaster",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=80&width=80",
    score: 98,
    commits: 1243,
    followers: 542,
    repositories: 87,
    stars: 2341,
    forks: 432,
    pullRequests: 321,
    issues: 154,
    trend: "up",
  },
  {
    id: 2,
    username: "codewarrior",
    name: "Samantha Lee",
    avatar: "/placeholder.svg?height=80&width=80",
    score: 95,
    commits: 987,
    followers: 621,
    repositories: 65,
    stars: 1876,
    forks: 321,
    pullRequests: 287,
    issues: 132,
    trend: "up",
  },
  {
    id: 3,
    username: "devninja",
    name: "Marcus Chen",
    avatar: "/placeholder.svg?height=80&width=80",
    score: 92,
    commits: 876,
    followers: 432,
    repositories: 54,
    stars: 1654,
    forks: 287,
    pullRequests: 243,
    issues: 121,
    trend: "down",
  },
  {
    id: 4,
    username: "pixelcoder",
    name: "Jamie Wilson",
    avatar: "/placeholder.svg?height=80&width=80",
    score: 89,
    commits: 765,
    followers: 387,
    repositories: 43,
    stars: 1432,
    forks: 254,
    pullRequests: 198,
    issues: 98,
    trend: "up",
  },
  {
    id: 5,
    username: "bytebender",
    name: "Taylor Rodriguez",
    avatar: "/placeholder.svg?height=80&width=80",
    score: 86,
    commits: 654,
    followers: 321,
    repositories: 38,
    stars: 1287,
    forks: 198,
    pullRequests: 176,
    issues: 87,
    trend: "same",
  },
]

export function Leaderboard() {
  const [users, setUsers] = useState(mockUsers)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-cyan-400/20 mb-4"></div>
          <div className="h-4 w-48 bg-slate-700 rounded mb-2"></div>
          <div className="h-3 w-32 bg-slate-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-slate-700 hover:bg-slate-800/50">
            <TableHead className="w-12 text-center">Rank</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-1">
                <StarIcon className="h-4 w-4 text-amber-300" />
                <span>Score</span>
              </div>
            </TableHead>
            <TableHead className="hidden md:table-cell text-center">
              <div className="flex items-center justify-center gap-1">
                <GitCommitIcon className="h-4 w-4 text-cyan-400" />
                <span>Commits</span>
              </div>
            </TableHead>
            <TableHead className="hidden md:table-cell text-center">
              <div className="flex items-center justify-center gap-1">
                <UsersIcon className="h-4 w-4 text-blue-400" />
                <span>Followers</span>
              </div>
            </TableHead>
            <TableHead className="hidden lg:table-cell text-center">
              <div className="flex items-center justify-center gap-1">
                <FolderGitIcon className="h-4 w-4 text-purple-400" />
                <span>Repos</span>
              </div>
            </TableHead>
            <TableHead className="hidden lg:table-cell text-center">
              <div className="flex items-center justify-center gap-1">
                <GitForkIcon className="h-4 w-4 text-green-400" />
                <span>Forks</span>
              </div>
            </TableHead>
            <TableHead className="hidden lg:table-cell text-center">
              <div className="flex items-center justify-center gap-1">
                <GitPullRequestIcon className="h-4 w-4 text-orange-400" />
                <span>PRs</span>
              </div>
            </TableHead>
            <TableHead className="hidden lg:table-cell text-center">
              <div className="flex items-center justify-center gap-1">
                <AlertCircleIcon className="h-4 w-4 text-red-400" />
                <span>Issues</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user.id}
              className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors duration-200"
            >
              <TableCell className="font-medium text-center">
                <Badge
                  variant="outline"
                  className={`
                    ${
                      index === 0
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                        : index === 1
                          ? "bg-slate-400/20 text-slate-300 border-slate-400/50"
                          : index === 2
                            ? "bg-amber-700/20 text-amber-600 border-amber-700/50"
                            : "bg-slate-800 text-slate-400 border-slate-700"
                    }
                  `}
                >
                  {index + 1}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="border border-slate-700">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-slate-800">
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-slate-400">@{user.username}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-lg font-bold text-cyan-400">{user.score}</span>
                  {user.trend === "up" && <span className="text-green-400 text-xs">▲</span>}
                  {user.trend === "down" && <span className="text-red-400 text-xs">▼</span>}
                  {user.trend === "same" && <span className="text-slate-400 text-xs">■</span>}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">{user.commits.toLocaleString()}</TableCell>
              <TableCell className="hidden md:table-cell text-center">{user.followers.toLocaleString()}</TableCell>
              <TableCell className="hidden lg:table-cell text-center">{user.repositories.toLocaleString()}</TableCell>
              <TableCell className="hidden lg:table-cell text-center">{user.forks.toLocaleString()}</TableCell>
              <TableCell className="hidden lg:table-cell text-center">{user.pullRequests.toLocaleString()}</TableCell>
              <TableCell className="hidden lg:table-cell text-center">{user.issues.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


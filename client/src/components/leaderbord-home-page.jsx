import { GithubIcon } from "lucide-react"
import { Leaderboard } from "./leaderboard-lists"
import { UsernameInput } from "./username-input"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-slate-200 font-mono">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GithubIcon className="h-10 w-10 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-amber-300 to-blue-500 text-transparent bg-clip-text">
              CommitKombat Leaderboard
            </h1>
          </div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-400 leading-relaxed">
            Track and compare GitHub activity with our AI-powered ranking system. See who's leading the development
            world based on commits, stars, and contributions.
          </p>
        </header>

        <div className="mt-8 mb-12 border border-slate-800 rounded-lg p-1 bg-slate-900/50 backdrop-blur-sm">
          <Leaderboard />
        </div>

        <UsernameInput />
      </div>
    </main>
  )
}


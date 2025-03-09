import React from "react"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { GithubIcon } from "lucide-react"

export function UsernameInput() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsLoading(true)
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-slate-200">Join the Leaderboard</h2>
        <p className="text-slate-400 text-sm">Enter your GitHub username to track your stats</p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <GithubIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Your GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-10 bg-slate-900 border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-blue-700/20 transition-all duration-200 hover:shadow-blue-700/40"
        >
          {isLoading ? (
            <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
          ) : (
            "Set Username"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-slate-500">
          Data is refreshed every 24 hours. Your ranking is calculated based on your public GitHub activity.
        </p>
      </div>
    </div>
  )
}


import React from "react"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Code2Icon, ClockIcon } from "lucide-react";

export function UsernameInput() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-slate-200">Join the CommitKombat Leaderboard</h2>
        <p className="text-slate-400 text-sm">Enter your GitHub and LeetCode usernames to track your combined stats</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Code2Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Your Github and LeetCode usernames"
            className="pl-10 bg-slate-900 border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20"
          />
        </div>
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-blue-700/20 transition-all duration-200 hover:shadow-blue-700/40"
        >
          {isLoading ? (
            <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
          ) : (
            "Track My Progress"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-amber-300 bg-amber-300/10 p-3 rounded-lg border border-amber-300/20">
          <ClockIcon className="h-5 w-5" />
          <p className="text-sm font-medium">
            24-hour score board updates coming soon!
          </p>
        </div>
        <p className="text-xs text-slate-500">
          Data is refreshed every 24 hours. Your ranking is calculated based on your public GitHub and LeetCode activity.
        </p>
      </div>
    </div>
  );
}
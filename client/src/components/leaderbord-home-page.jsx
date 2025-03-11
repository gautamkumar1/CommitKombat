import { useState } from "react";
import { GithubIcon, Calculator, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { Leaderboard } from "./leaderboard-lists";
import { UsernameInput } from "./username-input";

export default function Home() {
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const [showScoring, setShowScoring] = useState(false);

  return (
    <main className="min-h-screen bg-black text-slate-200 font-mono">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-amber-300 to-blue-500 text-transparent bg-clip-text">
              CommitKombat Leaderboard
            </h1>
          </div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-400 leading-relaxed">
            Track and compare GitHub and LeetCode activity with our AI-powered ranking system. See who's leading the development
            world based on commits, stars,contributions and problem solving skills.
          </p>
        </header>

        {/* Scoring System Explanation */}
        <div className="mb-8">
          <button 
            onClick={() => setShowScoring(!showScoring)}
            className="w-full flex items-center justify-between bg-slate-800/60 hover:bg-slate-800/80 transition-colors p-4 rounded-lg border border-slate-700 text-cyan-300 mb-2"
          >
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              <span className="text-xl font-bold">How Score Is Calculated</span>
            </div>
            {showScoring ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          
          {showScoring && (
            <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-700 rounded-lg p-6 text-slate-300 shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-cyan-400 border-b border-slate-700 pb-2">Positive Points</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="flex items-center gap-2 text-lg font-semibold text-green-400">
                        <span className="text-green-400">✅</span> GitHub Activity:
                      </h4>
                      <ul className="ml-6 space-y-1 mt-1 text-slate-300">
                        <li>• <span className="text-amber-300">Commits:</span> +1 point per commit</li>
                        <li>• <span className="text-amber-300">Pull Requests:</span> +10 points per PR</li>
                        <li>• <span className="text-amber-300">Followers:</span> +5 points per follower</li>
                        <li>• <span className="text-amber-300">Contributions:</span> +2 points per contribution</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="flex items-center gap-2 text-lg font-semibold text-green-400">
                        <span className="text-green-400">✅</span> LeetCode Performance:
                      </h4>
                      <ul className="ml-6 space-y-1 mt-1 text-slate-300">
                        <li>• <span className="text-amber-300">Easy problems solved:</span> +3 points per problem</li>
                        <li>• <span className="text-amber-300">Medium problems solved:</span> +5 points per problem</li>
                        <li>• <span className="text-amber-300">Hard problems solved:</span> +10 points per problem</li>
                        <li>• <span className="text-amber-300">Reputation:</span> +5 points per reputation point</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="flex items-center gap-2 text-lg font-semibold text-green-400">
                        <span className="text-green-400">✅</span> LeetCode Ranking Bonus:
                      </h4>
                      <ul className="ml-6 space-y-1 mt-1 text-slate-300">
                        <li>• <span className="text-amber-300">Top 100,000:</span> +100 points</li>
                        <li>• <span className="text-amber-300">100,001 - 200,000:</span> +50 points</li>
                        <li>• <span className="text-amber-300">200,001 - 500,000:</span> +20 points</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-red-400 border-b border-slate-700 pb-2">Negative Points</h3>
                  
                  <div className="space-y-3">
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">❌</span> 
                        <span><span className="text-amber-300">Following too many people:</span> -2 points per person followed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">❌</span> 
                        <span><span className="text-amber-300">Low LeetCode acceptance rate (&lt;60%):</span> -10 points penalty</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-700">
                    <h3 className="text-xl font-bold text-cyan-400 mb-2">Final Score Calculation</h3>
                    <p className="text-slate-300">
                      The total score is determined by summing up all positive points and subtracting negative points.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Leaderboard Toggle Button */}
        <button 
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          className="w-full flex items-center justify-between bg-slate-800/60 hover:bg-slate-800/80 transition-colors p-4 rounded-lg border border-slate-700 text-cyan-300 mb-2"
        >
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            <span className="text-xl font-bold">Leaderboard</span>
          </div>
          {showLeaderboard ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>

        {showLeaderboard && (
          <div className="mt-2 mb-12 border border-slate-800 rounded-lg p-1 bg-slate-900/50 backdrop-blur-sm">
            <Leaderboard />
          </div>
        )}
        <div className="mt-5"><UsernameInput /></div>
      </div>
    </main>
  );
}
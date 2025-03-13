import { useState } from "react"
import { Github, MapPin, Share2, Twitter } from "lucide-react"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip"

export default function ProfileCard() {
  const [copied, setCopied] = useState(false)

  // This would typically come from an API or props
  const user = {
    name: "Alex Johnson",
    username: "@alexjohnson",
    avatar: "/placeholder.svg?height=120&width=120",
    followers: 1248,
    following: 567,
    bio: "Full-stack developer passionate about UI/UX and building meaningful products. Coffee enthusiast and occasional hiker.",
    location: "San Francisco, CA",
    rank: "Diamond",
    roast: "Writes code so clean it makes soap jealous",
    emoji: "🚀",
    nickname: "Code Wizard",
    github: "https://github.com/alexjohnson",
    twitter: "https://twitter.com/alexjohnson",
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <TooltipProvider>
      <Card className="w-full max-w-md mx-auto overflow-hidden bg-zinc-900 border-zinc-800 text-zinc-100">
        <CardHeader className="relative pb-0">
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-zinc-800 text-emerald-400 border-emerald-500/50 font-medium">
              {user.rank}
            </Badge>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-zinc-700">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-zinc-800 rounded-full p-1 border border-zinc-700">
                <span className="text-xl">{user.emoji}</span>
              </div>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-zinc-400">{user.username}</p>
            <p className="mt-1 text-sm italic text-zinc-500 font-medium">"{user.nickname}"</p>
          </div>
        </CardHeader>
        <CardContent className="pt-4 pb-2">
          <div className="flex justify-center space-x-8 mb-4">
            <div className="text-center">
              <p className="text-xl font-bold text-white">{user.followers.toLocaleString()}</p>
              <p className="text-xs text-zinc-400">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-white">{user.following.toLocaleString()}</p>
              <p className="text-xs text-zinc-400">Following</p>
            </div>
          </div>

          <p className="text-zinc-300 text-sm line-clamp-2 mb-3">{user.bio}</p>

          <div className="flex items-center text-zinc-400 text-sm mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{user.location}</span>
          </div>

          <div className="bg-zinc-800/50 rounded-lg p-3 mt-2">
            <p className="text-zinc-400 text-sm italic">
              <span className="text-emerald-400 font-medium">AI Roast:</span> {user.roast}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-zinc-800 pt-4">
          <div className="flex space-x-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={user.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={user.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Twitter</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <Tooltip open={copied} onOpenChange={setCopied}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{copied ? "Copied!" : "Copy profile link"}</p>
            </TooltipContent>
          </Tooltip>
        </CardFooter>
      </Card>
    </TooltipProvider>
  )
}


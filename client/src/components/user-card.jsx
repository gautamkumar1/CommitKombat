import { useState } from "react";
import { Github, MapPin, Share2, Twitter, X } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";

export default function ProfileCard({ userDetails, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!userDetails) return null;

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCardClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70" onClick={onClose}>
      <TooltipProvider>
        <Card
          className="w-full max-w-md mx-auto overflow-hidden bg-zinc-900 border-zinc-800 text-zinc-100 relative"
          onClick={handleCardClick}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full z-10"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          <CardHeader className="relative pb-0">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-zinc-700">
                <img src={userDetails.avatar_url || "/placeholder.svg"} alt={userDetails.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="mt-2 text-2xl font-bold text-white">{userDetails.name}</h2>
              <p className="text-zinc-400">@{userDetails.username}</p>
              <p className="mt-1 text-sm italic text-zinc-500 font-medium">"{userDetails.aiNickname}"</p> <br />
              <Badge variant="outline" className="bg-zinc-800 text-emerald-400 border-emerald-500/50 font-medium">
                Rank: {userDetails.rank}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4 pb-2">
            <div className="flex justify-center space-x-8 mb-4">
              <div className="text-center">
                <p className="text-xl font-bold text-white">{userDetails.followers.toLocaleString()}</p>
                <p className="text-xs text-zinc-400">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-white">{userDetails.following.toLocaleString()}</p>
                <p className="text-xs text-zinc-400">Following</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-white">{userDetails.score.toLocaleString()}</p>
                <p className="text-xs text-zinc-400">Score</p>
              </div>
            </div>
            <p className="text-zinc-300 text-sm line-clamp-2 mb-3">{userDetails.bio ||  "🚨 Too lazy to write a bio, probably too lazy to write clean code. 🗑️" }</p>
            <div className="flex items-center text-zinc-400 text-sm mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{userDetails.location}</span>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-3 mt-2">
            <p className="text-purple-400 text-sm italic">AI-Generated Nickname: {userDetails.aiNickname}</p> <br />
            <p className="text-yellow-400 text-sm italic">Signature Emoji: {userDetails.aiEmoji}</p> <br />
              <p className="text-red-400 text-sm italic">
              💀 Brutal Roast: {userDetails.aiGeneratedRoast}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-zinc-800 pt-4">
            <div className="flex space-x-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={userDetails.githubLink}
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

              {userDetails.twitter_username && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={`https://twitter.com/${userDetails.twitter_username}`}
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
              )}
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
    </div>
  );
}

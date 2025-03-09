import { useState } from "react"
import { BellIcon, Music2Icon, MessageSquareIcon, ListIcon } from "lucide-react"
import { Switch } from "../../components/ui/switch"
import { Label } from "../../components/ui/label"
import { cn } from "../lib/utils"

export function ToggleControls() {
  const [notifications, setNotifications] = useState(false)
  const [music, setMusic] = useState(false)
  const [viewMode, setViewMode] = useState<"chat" | "scoreboard">("scoreboard")

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
      <div className="flex items-center space-x-2">
        <Switch
          id="notifications"
          checked={notifications}
          onCheckedChange={setNotifications}
          className="data-[state=checked]:bg-cyan-400"
        />
        <Label htmlFor="notifications" className="flex items-center gap-1 cursor-pointer">
          <BellIcon className={cn("h-4 w-4 transition-colors", notifications ? "text-cyan-400" : "text-slate-400")} />
          <span>Notifications</span>
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="music" checked={music} onCheckedChange={setMusic} className="data-[state=checked]:bg-amber-400" />
        <Label htmlFor="music" className="flex items-center gap-1 cursor-pointer">
          <Music2Icon className={cn("h-4 w-4 transition-colors", music ? "text-amber-400" : "text-slate-400")} />
          <span>Background Music</span>
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="viewMode"
          checked={viewMode === "chat"}
          onCheckedChange={(checked) => setViewMode(checked ? "chat" : "scoreboard")}
          className="data-[state=checked]:bg-blue-500"
        />
        <Label htmlFor="viewMode" className="flex items-center gap-1 cursor-pointer">
          {viewMode === "chat" ? (
            <>
              <MessageSquareIcon className="h-4 w-4 text-blue-500" />
              <span>Chat View</span>
            </>
          ) : (
            <>
              <ListIcon className="h-4 w-4 text-slate-400" />
              <span>Scoreboard View</span>
            </>
          )}
        </Label>
      </div>
    </div>
  )
}


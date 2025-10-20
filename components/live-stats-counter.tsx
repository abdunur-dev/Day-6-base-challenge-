"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Sparkles, TrendingUp, Users } from "lucide-react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function LiveStatsCounter() {
  const [mounted, setMounted] = useState(false)

  // Fetch stats every 5 seconds
  const { data: stats, error } = useSWR("/api/stats", fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: true,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || error) {
    return null
  }

  return (
    <Card className="bg-card border-4 border-foreground rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 animate-slide-in-up">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="bg-primary rounded-full p-2 border-2 border-foreground">
            <TrendingUp className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold opacity-70">Packs Sold Today</span>
            <span className="text-2xl font-black tabular-nums">{stats?.packsSoldToday || "..."}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1">
          <div className="bg-accent rounded-full p-2 border-2 border-foreground">
            <Users className="w-4 h-4 text-accent-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold opacity-70">Active Now</span>
            <span className="text-2xl font-black tabular-nums">{stats?.activeUsers || "..."}</span>
          </div>
        </div>

        <div className="animate-pulse">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
      </div>

      {stats?.lastUpdated && (
        <div className="text-xs text-center mt-2 opacity-50 font-mono">Live • Updates every 5s</div>
      )}
    </Card>
  )
}

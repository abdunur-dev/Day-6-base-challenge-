"use client"

import { Star, Heart, Sparkles, Circle, Triangle, Zap } from "lucide-react"
import { useEffect, useState } from "react"

export function DecorativeStickers() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Top decorations */}
      <div className="fixed top-10 left-10 animate-float pointer-events-none z-50">
        <Star className="w-8 h-8 fill-[oklch(0.85_0.15_110)] stroke-foreground opacity-40" />
      </div>
      <div className="fixed top-20 right-20 animate-spin-slow pointer-events-none z-50">
        <Sparkles className="w-10 h-10 stroke-[oklch(0.75_0.15_220)] opacity-40" />
      </div>
      <div className="fixed top-32 left-1/4 animate-bounce-slow pointer-events-none z-50">
        <Circle className="w-6 h-6 fill-[oklch(0.7_0.18_290)] stroke-foreground opacity-30" />
      </div>

      {/* Middle decorations */}
      <div className="fixed top-1/2 left-16 animate-float pointer-events-none z-50" style={{ animationDelay: "0.5s" }}>
        <Zap className="w-7 h-7 fill-[oklch(0.7_0.2_40)] stroke-foreground opacity-35" />
      </div>
      <div
        className="fixed top-1/2 right-16 animate-pulse-scale pointer-events-none z-50"
        style={{ animationDelay: "1s" }}
      >
        <Triangle className="w-8 h-8 fill-[oklch(0.8_0.18_280)] stroke-foreground opacity-35" />
      </div>

      {/* Bottom decorations */}
      <div className="fixed bottom-20 left-20 animate-pulse-scale pointer-events-none z-50">
        <Heart className="w-12 h-12 fill-[oklch(0.85_0.12_340)] stroke-foreground opacity-40" />
      </div>
      <div className="fixed bottom-10 right-10 animate-float pointer-events-none z-50" style={{ animationDelay: "1s" }}>
        <Star className="w-6 h-6 fill-[oklch(0.85_0.15_110)] stroke-foreground opacity-40" />
      </div>
      <div
        className="fixed bottom-32 right-1/4 animate-bounce-slow pointer-events-none z-50"
        style={{ animationDelay: "0.7s" }}
      >
        <Sparkles className="w-5 h-5 stroke-[oklch(0.75_0.15_220)] opacity-35" />
      </div>

      {/* Additional scattered decorations */}
      <div
        className="fixed top-1/4 right-1/3 animate-float pointer-events-none z-50"
        style={{ animationDelay: "1.5s" }}
      >
        <Circle className="w-4 h-4 fill-[oklch(0.85_0.12_340)] stroke-foreground opacity-25" />
      </div>
      <div
        className="fixed bottom-1/3 left-1/3 animate-spin-slow pointer-events-none z-50"
        style={{ animationDelay: "2s" }}
      >
        <Star className="w-5 h-5 fill-[oklch(0.7_0.2_40)] stroke-foreground opacity-30" />
      </div>
    </>
  )
}

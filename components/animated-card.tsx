"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  rotation?: number
  delay?: number
}

export function AnimatedCard({ children, className, rotation = 0, delay = 0 }: AnimatedCardProps) {
  return (
    <Card
      className={cn(
        "bg-card border-4 border-foreground rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden",
        "hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px]",
        "transition-all duration-300 animate-slide-in-up",
        className,
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </Card>
  )
}

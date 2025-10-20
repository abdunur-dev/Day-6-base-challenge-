"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export function FloatingActionButton() {
  return (
    <Link href="/explore">
      <Button
        size="icon"
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all z-50 animate-pulse-scale"
      >
        <Plus className="w-8 h-8" />
      </Button>
    </Link>
  )
}

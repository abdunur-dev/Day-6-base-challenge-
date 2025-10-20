import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t-4 border-foreground bg-card py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2 text-sm font-bold">
            <span>Built with</span>
            <Heart className="w-4 h-4 fill-[oklch(0.85_0.12_340)] stroke-foreground animate-pulse-scale" />
            <span>by</span>
            <Link
              href="https://abdudev.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              abdudev.vercel.app
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">NFT Social - Base Mini App</p>
        </div>
      </div>
    </footer>
  )
}

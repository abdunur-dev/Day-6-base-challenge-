import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Heart, Star } from "lucide-react"
import { FloatingActionButton } from "@/components/floating-action-button"
import { AppHeader } from "@/components/app-header"
import { LiveStatsCounter } from "@/components/live-stats-counter"

export default function HomePage() {
  return (
    <>
      <AppHeader />
      <div className="min-h-screen bg-[oklch(0.92_0.18_110)] relative overflow-hidden">
        {/* Decorative stickers */}
        <div className="absolute top-10 left-10 animate-float">
          <Star className="w-8 h-8 fill-foreground stroke-foreground" />
        </div>
        <div className="absolute top-20 right-20 animate-spin-slow">
          <Sparkles className="w-10 h-10 stroke-foreground" />
        </div>
        <div className="absolute bottom-20 left-20 animate-pulse-scale">
          <Heart className="w-12 h-12 fill-[oklch(0.85_0.12_340)] stroke-foreground" />
        </div>
        <div className="absolute bottom-10 right-10 animate-float" style={{ animationDelay: "1s" }}>
          <Star className="w-6 h-6 fill-foreground stroke-foreground" />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[90vh] gap-8">
            <div className="w-full max-w-md">
              <LiveStatsCounter />
            </div>

            {/* Main NFT Pack Card */}
            <Card className="w-full max-w-md bg-card border-4 border-foreground rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-transform animate-slide-in-up">
              <div className="p-6 space-y-6">
                {/* NFT Image Container */}
                <div className="relative bg-[oklch(0.75_0.15_220)] rounded-2xl border-4 border-foreground p-6 aspect-square flex items-center justify-center">
                  <div className="absolute top-4 left-4 animate-float">
                    <div className="w-3 h-3 bg-foreground rounded-full" />
                  </div>
                  <div className="absolute top-6 right-6 animate-float" style={{ animationDelay: "0.5s" }}>
                    <Star className="w-4 h-4 fill-foreground stroke-foreground" />
                  </div>

                  {/* Cute NFT Character */}
                  <div className="relative">
                    <img
                      src="/cute-kawaii-character-in-jar-pastel-colors.jpg"
                      alt="NFT Character"
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                </div>

                {/* Info Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">Lewis Webber</span>
                    <span className="text-xs font-mono">15h : 36m : 08s</span>
                  </div>

                  <div className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-center font-bold text-xl border-4 border-foreground">
                    0.001 ETH
                  </div>
                </div>

                {/* Title */}
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-black leading-tight text-balance">
                    Buy <span className="inline-block">Random NFT</span> Packs, Broaden Your{" "}
                    <span className="text-[oklch(0.85_0.15_110)]">Collection</span>
                  </h1>
                </div>

                {/* CTA Button */}
                <Link href="/explore">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                    Start Now!
                  </Button>
                </Link>

                {/* Pagination dots */}
                <div className="flex justify-center gap-2 pt-2">
                  <div className="w-2 h-2 bg-foreground rounded-full" />
                  <div className="w-2 h-2 bg-foreground/30 rounded-full" />
                  <div className="w-2 h-2 bg-foreground/30 rounded-full" />
                </div>
              </div>
            </Card>

            {/* Quick Links */}
            <div className="flex gap-4 animate-slide-in-up" style={{ animationDelay: "200ms" }}>
              <Link href="/profile">
                <Button
                  variant="outline"
                  className="border-4 border-foreground rounded-full font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-transparent"
                >
                  View Profile
                </Button>
              </Link>
              <Link href="/nft/1">
                <Button
                  variant="outline"
                  className="border-4 border-foreground rounded-full font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-transparent"
                >
                  NFT Details
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <FloatingActionButton />
      </div>
    </>
  )
}

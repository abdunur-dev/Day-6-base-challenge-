"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Heart, Share2, Star, Sparkles, TrendingUp, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const nftDetails = {
  1: {
    name: "Kawaii Star #123",
    image: "/cute-kawaii-character-in-jar-pastel-colors.jpg",
    rarity: "Common",
    color: "oklch(0.85 0.15 110)",
    currentBid: "12.34",
    owner: "Lewis Webber",
    ownerAvatar: "/placeholder.svg?height=40&width=40",
    description: "A delightful kawaii character sealed in a magical jar, radiating positive energy and charm.",
    attributes: [
      { trait: "Background", value: "Pastel Green" },
      { trait: "Character", value: "Star" },
      { trait: "Container", value: "Glass Jar" },
      { trait: "Rarity", value: "Common" },
    ],
    bids: [
      { bidder: "Alice", amount: "12.34", time: "2 mins ago" },
      { bidder: "Bob", amount: "11.50", time: "15 mins ago" },
      { bidder: "Charlie", amount: "10.80", time: "1 hour ago" },
    ],
  },
  2: {
    name: "Premium Gem #456",
    image: "/cute-kawaii-premium-nft-character-with-sparkles.jpg",
    rarity: "Rare",
    color: "oklch(0.75 0.15 220)",
    currentBid: "25.67",
    owner: "Alice Wonder",
    ownerAvatar: "/placeholder.svg?height=40&width=40",
    description: "A premium kawaii gem character with sparkling details and rare attributes.",
    attributes: [
      { trait: "Background", value: "Sky Blue" },
      { trait: "Character", value: "Gem" },
      { trait: "Sparkle", value: "Premium" },
      { trait: "Rarity", value: "Rare" },
    ],
    bids: [
      { bidder: "Diana", amount: "25.67", time: "5 mins ago" },
      { bidder: "Eve", amount: "24.00", time: "20 mins ago" },
    ],
  },
  3: {
    name: "Legendary Crown #789",
    image: "/cute-kawaii-legendary-character-with-golden-crown.jpg",
    rarity: "Legendary",
    color: "oklch(0.85 0.12 340)",
    currentBid: "89.99",
    owner: "Bob Builder",
    ownerAvatar: "/placeholder.svg?height=40&width=40",
    description: "An ultra-rare legendary character adorned with a majestic crown, symbolizing royalty.",
    attributes: [
      { trait: "Background", value: "Royal Pink" },
      { trait: "Character", value: "Crown Bearer" },
      { trait: "Accessory", value: "Golden Crown" },
      { trait: "Rarity", value: "Legendary" },
    ],
    bids: [
      { bidder: "Frank", amount: "89.99", time: "1 min ago" },
      { bidder: "Grace", amount: "85.00", time: "10 mins ago" },
      { bidder: "Henry", amount: "80.50", time: "30 mins ago" },
    ],
  },
  4: {
    name: "Mystery Box #321",
    image: "/cute-kawaii-mystery-box-character-with-question-ma.jpg",
    rarity: "Mystery",
    color: "oklch(0.7 0.18 290)",
    currentBid: "15.20",
    owner: "Charlie Chain",
    ownerAvatar: "/placeholder.svg?height=40&width=40",
    description: "A mysterious box character filled with surprises and unknown treasures.",
    attributes: [
      { trait: "Background", value: "Purple Haze" },
      { trait: "Character", value: "Mystery Box" },
      { trait: "Effect", value: "Unknown" },
      { trait: "Rarity", value: "Mystery" },
    ],
    bids: [
      { bidder: "Ivy", amount: "15.20", time: "3 mins ago" },
      { bidder: "Jack", amount: "14.50", time: "25 mins ago" },
    ],
  },
}

export default function NFTDetailPage({ params }: { params: { id: string } }) {
  const nftId = Number.parseInt(params.id)
  const nft = nftDetails[nftId as keyof typeof nftDetails] || nftDetails[1]

  const [bidAmount, setBidAmount] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const { toast } = useToast()

  const handlePlaceBid = () => {
    const bid = Number.parseFloat(bidAmount)
    const currentBid = Number.parseFloat(nft.currentBid)

    if (!bidAmount || bid <= currentBid) {
      toast({
        title: "Invalid Bid",
        description: `Your bid must be higher than ${nft.currentBid} ETH`,
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Bid Placed Successfully!",
      description: `Your bid of ${bidAmount} ETH has been placed`,
    })
    setBidAmount("")
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked ? "NFT removed from your favorites" : "NFT added to your favorites",
    })
  }

  const handleShare = () => {
    toast({
      title: "Shared!",
      description: `${nft.name} shared to your social feed`,
    })
  }

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.02_110)] relative overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/profile">
            <Button
              variant="outline"
              size="icon"
              className="border-4 border-foreground rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-card"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-black">NFT Details</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - NFT Image */}
          <div className="space-y-6">
            <Card className="bg-card border-4 border-foreground rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden transform rotate-[-1deg]">
              <div className="p-6">
                <div
                  className="relative rounded-2xl border-4 border-foreground p-8 aspect-square flex items-center justify-center"
                  style={{ backgroundColor: nft.color }}
                >
                  <div className="absolute top-4 right-4">
                    <Badge className="border-2 border-foreground font-bold text-base px-3 py-1">{nft.rarity}</Badge>
                  </div>
                  <div className="absolute top-4 left-4 animate-float">
                    <Star className="w-4 h-4 fill-foreground stroke-foreground" />
                  </div>
                  <div className="absolute bottom-4 right-4 animate-float" style={{ animationDelay: "1s" }}>
                    <Sparkles className="w-5 h-5 stroke-foreground" />
                  </div>
                  <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-64 h-64 object-contain" />
                </div>
              </div>
            </Card>

            {/* Attributes */}
            <Card className="bg-card border-4 border-foreground rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-black">Attributes</h3>
                <div className="grid grid-cols-2 gap-3">
                  {nft.attributes.map((attr, index) => (
                    <div
                      key={index}
                      className="bg-muted border-2 border-foreground rounded-xl p-3 text-center space-y-1"
                    >
                      <p className="text-xs text-muted-foreground font-bold uppercase">{attr.trait}</p>
                      <p className="text-sm font-black">{attr.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Details & Bidding */}
          <div className="space-y-6">
            {/* NFT Info */}
            <Card className="bg-card border-4 border-foreground rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden transform rotate-[1deg]">
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-black leading-tight text-balance">{nft.name}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{nft.description}</p>
                </div>

                {/* Owner Info */}
                <div className="flex items-center justify-between p-4 bg-muted border-2 border-foreground rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border-2 border-foreground">
                      <AvatarImage src={nft.ownerAvatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary text-primary-foreground font-black">
                        {nft.owner[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs text-muted-foreground font-bold">Owned by</p>
                      <p className="font-black">{nft.owner}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2 border-foreground rounded-full font-bold bg-card"
                  >
                    View Profile
                  </Button>
                </div>

                {/* Current Bid */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="font-bold">Auction ends in 15h 36m</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-bold">{nft.bids.length} bids</span>
                    </div>
                  </div>

                  <div className="bg-primary text-primary-foreground p-4 rounded-2xl border-4 border-foreground text-center space-y-1">
                    <p className="text-sm font-bold">Current Bid</p>
                    <p className="text-3xl font-black">{nft.currentBid} ETH</p>
                  </div>
                </div>

                {/* Bid Input */}
                <div className="space-y-3">
                  <Input
                    type="number"
                    placeholder="Enter your bid (ETH)"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="border-4 border-foreground rounded-2xl h-12 text-center font-bold text-lg"
                  />
                  <Button
                    onClick={handlePlaceBid}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6 rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    Place Bid
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleLike}
                    variant="outline"
                    className={`flex-1 border-4 border-foreground rounded-full font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                      isLiked ? "bg-[oklch(0.85_0.12_340)] text-white" : "bg-card"
                    }`}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                    {isLiked ? "Liked" : "Like"}
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1 border-4 border-foreground rounded-full font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-card"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </Card>

            {/* Bid History */}
            <Card className="bg-card border-4 border-foreground rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-black">Bid History</h3>
                <div className="space-y-3">
                  {nft.bids.map((bid, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted border-2 border-foreground rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 border-2 border-foreground">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-black">
                            {bid.bidder[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-black text-sm">{bid.bidder}</p>
                          <p className="text-xs text-muted-foreground">{bid.time}</p>
                        </div>
                      </div>
                      <p className="font-black">{bid.amount} ETH</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/3 left-10 animate-float pointer-events-none">
        <Star className="w-6 h-6 fill-foreground stroke-foreground opacity-30" />
      </div>
      <div className="absolute bottom-1/4 right-10 animate-pulse-scale pointer-events-none">
        <Sparkles className="w-8 h-8 stroke-foreground opacity-30" />
      </div>
    </div>
  )
}

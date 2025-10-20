"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Heart, Share2, Users, Star, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { EditProfileDialog } from "@/components/edit-profile-dialog"
import { AppHeader } from "@/components/app-header"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const userNFTs = [
  {
    id: 1,
    name: "Kawaii Star #123",
    image: "/cute-kawaii-character-in-jar-pastel-colors.jpg",
    likes: 42,
    rarity: "Common",
    color: "oklch(0.85 0.15 110)",
  },
  {
    id: 2,
    name: "Premium Gem #456",
    image: "/cute-kawaii-premium-nft-character-with-sparkles.jpg",
    likes: 89,
    rarity: "Rare",
    color: "oklch(0.75 0.15 220)",
  },
  {
    id: 3,
    name: "Legendary Crown #789",
    image: "/cute-kawaii-legendary-character-with-golden-crown.jpg",
    likes: 234,
    rarity: "Legendary",
    color: "oklch(0.85 0.12 340)",
  },
  {
    id: 4,
    name: "Mystery Box #321",
    image: "/cute-kawaii-mystery-box-character-with-question-ma.jpg",
    likes: 67,
    rarity: "Mystery",
    color: "oklch(0.7 0.18 290)",
  },
]

const followers = [
  { id: 1, name: "Alice", avatar: "/placeholder.svg?height=40&width=40", nfts: 23 },
  { id: 2, name: "Bob", avatar: "/placeholder.svg?height=40&width=40", nfts: 45 },
  { id: 3, name: "Charlie", avatar: "/placeholder.svg?height=40&width=40", nfts: 12 },
  { id: 4, name: "Diana", avatar: "/placeholder.svg?height=40&width=40", nfts: 67 },
]

export default function ProfilePage() {
  const [likedNFTs, setLikedNFTs] = useState<Set<number>>(new Set())
  const { toast } = useToast()

  const { data: stats } = useSWR("/api/stats", fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: true,
    revalidateOnMount: false,
  })

  const handleLike = useCallback(
    (nftId: number) => {
      setLikedNFTs((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(nftId)) {
          newSet.delete(nftId)
        } else {
          newSet.add(nftId)
          setTimeout(() => {
            toast({
              title: "Liked!",
              description: "Added to your favorites",
            })
          }, 0)
        }
        return newSet
      })
    },
    [toast],
  )

  const handleShare = useCallback(
    async (nftName: string) => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: nftName,
            text: `Check out ${nftName} on NFT Social!`,
            url: window.location.href,
          })
          toast({
            title: "Shared!",
            description: `${nftName} shared successfully`,
          })
        } catch (error) {
          if ((error as Error).name !== "AbortError") {
            toast({
              title: "Share failed",
              description: "Could not share at this time",
              variant: "destructive",
            })
          }
        }
      } else {
        navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link Copied!",
          description: "Share link copied to clipboard",
        })
      }
    },
    [toast],
  )

  const handleProfileShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Lewis Webber's Profile",
          text: "Check out my NFT collection on NFT Social!",
          url: window.location.href,
        })
        toast({
          title: "Profile Shared!",
          description: "Your profile has been shared",
        })
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          toast({
            title: "Share failed",
            description: "Could not share at this time",
            variant: "destructive",
          })
        }
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied!",
        description: "Profile link copied to clipboard",
      })
    }
  }, [toast])

  return (
    <>
      <AppHeader />
      <div className="min-h-screen bg-[oklch(0.98_0.02_110)] relative overflow-hidden">
        {/* Header */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button
                variant="outline"
                size="icon"
                className="border-4 border-foreground rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-card"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-black">My Profile</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="container mx-auto px-4 pb-8 space-y-6">
          {/* Profile Card */}
          <Card className="bg-card border-4 border-foreground rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden transform rotate-[-1deg]">
            <div className="p-6 space-y-6">
              {/* Profile Header */}
              <div className="flex items-start gap-4">
                <Avatar className="w-24 h-24 border-4 border-foreground">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-black">LW</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <h2 className="text-2xl font-black">Lewis Webber</h2>
                  <p className="text-sm text-muted-foreground">@lewiswebber</p>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="font-bold">{stats?.activeUsers || 234}</span>{" "}
                      <span className="text-muted-foreground">Followers</span>
                    </div>
                    <div>
                      <span className="font-bold">189</span> <span className="text-muted-foreground">Following</span>
                    </div>
                    <div>
                      <span className="font-bold">{userNFTs.length}</span>{" "}
                      <span className="text-muted-foreground">NFTs</span>
                    </div>
                  </div>
                  {stats && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="font-mono">Live updates</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm leading-relaxed">
                NFT collector and enthusiast. Love discovering unique digital art and building my collection. Always
                looking for rare finds!
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <EditProfileDialog />
                <Button
                  variant="outline"
                  onClick={handleProfileShare}
                  className="border-4 border-foreground rounded-full font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-card"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Tabs Section */}
          <Tabs defaultValue="collection" className="w-full">
            <TabsList className="w-full border-4 border-foreground rounded-full bg-card p-1">
              <TabsTrigger
                value="collection"
                className="flex-1 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold"
              >
                Collection
              </TabsTrigger>
              <TabsTrigger
                value="followers"
                className="flex-1 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold"
              >
                <Users className="w-4 h-4 mr-2" />
                Social
              </TabsTrigger>
            </TabsList>

            {/* Collection Tab */}
            <TabsContent value="collection" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userNFTs.map((nft, index) => (
                  <Card
                    key={nft.id}
                    className="bg-card border-4 border-foreground rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
                    style={{
                      transform: `rotate(${index % 2 === 0 ? "-1deg" : "1deg"})`,
                    }}
                  >
                    <div className="p-4 space-y-4">
                      {/* NFT Image */}
                      <Link href={`/nft/${nft.id}`}>
                        <div
                          className="relative rounded-2xl border-4 border-foreground p-4 aspect-square flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                          style={{ backgroundColor: nft.color }}
                        >
                          <div className="absolute top-2 right-2">
                            <Badge className="border-2 border-foreground font-bold">{nft.rarity}</Badge>
                          </div>
                          <div className="absolute top-3 left-3 animate-float">
                            <Star className="w-3 h-3 fill-foreground stroke-foreground" />
                          </div>
                          <img
                            src={nft.image || "/placeholder.svg"}
                            alt={nft.name}
                            className="w-32 h-32 object-contain"
                          />
                        </div>
                      </Link>

                      {/* NFT Info */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-black">{nft.name}</h3>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleLike(nft.id)}
                              className={`border-2 border-foreground rounded-full font-bold ${
                                likedNFTs.has(nft.id) ? "bg-[oklch(0.85_0.12_340)] text-white" : "bg-card"
                              }`}
                            >
                              <Heart className={`w-4 h-4 mr-1 ${likedNFTs.has(nft.id) ? "fill-current" : ""}`} />
                              {nft.likes + (likedNFTs.has(nft.id) ? 1 : 0)}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShare(nft.name)}
                              className="border-2 border-foreground rounded-full font-bold bg-card"
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <Link href={`/nft/${nft.id}`}>
                            <Button
                              size="sm"
                              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full border-2 border-foreground"
                            >
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Followers Tab */}
            <TabsContent value="followers" className="mt-6">
              <div className="space-y-4">
                {followers.map((follower) => (
                  <Card
                    key={follower.id}
                    className="bg-card border-4 border-foreground rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 border-4 border-foreground">
                          <AvatarImage src={follower.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-primary text-primary-foreground font-black">
                            {follower.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-black">{follower.name}</h3>
                          <p className="text-sm text-muted-foreground">{follower.nfts} NFTs</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                      >
                        Following
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 right-10 animate-float pointer-events-none">
          <Sparkles className="w-6 h-6 stroke-foreground opacity-30" />
        </div>
      </div>
    </>
  )
}

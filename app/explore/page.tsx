"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Sparkles, Wallet } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseEther } from "viem"
import { NFT_MARKETPLACE_ADDRESS, NFT_MARKETPLACE_ABI } from "@/lib/contract"
import { AppHeader } from "@/components/app-header"

const nftPacks = [
  {
    id: 1,
    name: "Starter Pack",
    price: "0.001",
    priceDisplay: "0.001 ETH",
    image: "cute-kawaii-character-in-jar-pastel-colors.jpg",
    rarity: "Common",
    color: "oklch(0.85 0.15 110)",
    items: 3,
  },
  {
    id: 2,
    name: "Premium Pack",
    price: "0.002",
    priceDisplay: "0.002 ETH",
    image: "cute-kawaii-premium-nft-character-with-sparkles.jpg",
    rarity: "Rare",
    color: "oklch(0.75 0.15 220)",
    items: 5,
  },
  {
    id: 3,
    name: "Legendary Pack",
    price: "0.005",
    priceDisplay: "0.005 ETH",
    image: "cute-kawaii-legendary-character-with-golden-crown.jpg",
    rarity: "Legendary",
    color: "oklch(0.85 0.12 340)",
    items: 10,
  },
  {
    id: 4,
    name: "Mystery Pack",
    price: "0.0015",
    priceDisplay: "0.0015 ETH",
    image: "cute-kawaii-mystery-box-character-with-question-ma.jpg",
    rarity: "Mystery",
    color: "oklch(0.7 0.18 290)",
    items: 4,
  },
  {
    id: 5,
    name: "Collector's Pack",
    price: "0.003",
    priceDisplay: "0.003 ETH",
    image: "cute-kawaii-collector-character-with-gems-and-trea.jpg",
    rarity: "Epic",
    color: "oklch(0.7 0.2 40)",
    items: 7,
  },
  {
    id: 6,
    name: "Deluxe Pack",
    price: "0.0025",
    priceDisplay: "0.0025 ETH",
    image: "cute-kawaii-deluxe-character-with-stars-and-moon.jpg",
    rarity: "Rare",
    color: "oklch(0.8 0.18 280)",
    items: 6,
  },
]

export default function ExplorePage() {
  const [selectedPack, setSelectedPack] = useState<number | null>(null)
  const { toast } = useToast()
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handlePurchase = async (pack: (typeof nftPacks)[0]) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to purchase NFT packs",
        variant: "destructive",
      })
      return
    }

    setSelectedPack(pack.id)

    try {
      writeContract({
        address: NFT_MARKETPLACE_ADDRESS as `0x${string}`,
        abi: NFT_MARKETPLACE_ABI,
        functionName: "purchasePack",
        args: [BigInt(pack.id), BigInt(1)],
        value: parseEther(pack.price),
      })

      toast({
        title: "Transaction Submitted! 🚀",
        description: "Your purchase is being processed on Base Sepolia...",
      })
    } catch (err) {
      toast({
        title: "Transaction Failed",
        description: err instanceof Error ? err.message : "Failed to process purchase",
        variant: "destructive",
      })
      setSelectedPack(null)
    }
  }

  useEffect(() => {
    if (isSuccess && selectedPack) {
      const pack = nftPacks.find((p) => p.id === selectedPack)
      toast({
        title: "Purchase Successful! 🎉",
        description: `You've purchased the ${pack?.name}! Check your profile to see your new NFTs.`,
      })
      setSelectedPack(null)
    }
  }, [isSuccess, selectedPack, hash, toast])

  useEffect(() => {
    if (error) {
      toast({
        title: "Transaction Failed",
        description: error.message || "Failed to process purchase",
        variant: "destructive",
      })
      setSelectedPack(null)
    }
  }, [error, toast])

  return (
    <>
      <AppHeader />
      <div className="min-h-screen bg-[oklch(0.98_0.02_110)] relative overflow-hidden">
        {/* NFT Packs Grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center space-y-2">
            <h1 className="text-4xl font-black">Explore NFT Packs</h1>
            <p className="text-muted-foreground">
              {isConnected
                ? "Choose a pack and purchase with your connected wallet on Base Sepolia"
                : "Connect your wallet to start purchasing NFT packs"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nftPacks.map((pack, index) => (
              <Card
                key={pack.id}
                className="bg-card border-4 border-foreground rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
                style={{
                  transform: `rotate(${index % 2 === 0 ? "-1deg" : "1deg"})`,
                }}
              >
                <div className="p-4 space-y-4">
                  {/* Pack Image */}
                  <div
                    className="relative rounded-2xl border-4 border-foreground p-4 aspect-square flex items-center justify-center"
                    style={{ backgroundColor: pack.color }}
                  >
                    <div className="absolute top-2 right-2">
                      <Badge className="border-2 border-foreground font-bold">{pack.rarity}</Badge>
                    </div>
                    <div className="absolute top-3 left-3 animate-float">
                      <Star className="w-3 h-3 fill-foreground stroke-foreground" />
                    </div>
                    <img src={pack.image || "/placeholder.svg"} alt={pack.name} className="w-32 h-32 object-contain" />
                  </div>

                  {/* Pack Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-black">{pack.name}</h3>
                      <span className="text-sm font-mono font-bold">{pack.items} items</span>
                    </div>

                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-center font-bold border-4 border-foreground">
                      {pack.priceDisplay}
                    </div>

                    <Button
                      onClick={() => handlePurchase(pack)}
                      disabled={!isConnected || selectedPack === pack.id || isPending || isConfirming}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-5 rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50"
                    >
                      {!isConnected ? (
                        <>
                          <Wallet className="w-4 h-4 mr-2" />
                          Connect Wallet
                        </>
                      ) : selectedPack === pack.id && (isPending || isConfirming) ? (
                        "Processing..."
                      ) : (
                        "Buy Now"
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-10 animate-float pointer-events-none">
          <Sparkles className="w-6 h-6 stroke-foreground opacity-30" />
        </div>
        <div className="absolute top-1/3 right-10 animate-pulse-scale pointer-events-none">
          <Heart className="w-8 h-8 fill-[oklch(0.85_0.12_340)] stroke-foreground opacity-30" />
        </div>
      </div>
    </>
  )
}

import { NextResponse } from "next/server"

// Mock NFT data
const nfts = [
  {
    id: 1,
    name: "Cute Jar Friend",
    description: "An adorable character living in a magical jar",
    price: "2.5",
    image: "/cute-jar-character.jpg",
    owner: "Lewis Webber",
    bids: 23,
    timeLeft: "12d 15h 35m",
  },
  {
    id: 2,
    name: "Too Much Rainbow",
    description: "A vibrant rainbow abstract masterpiece",
    price: "0.30",
    image: "/rainbow-abstract.jpg",
    owner: "Lewis Webber",
    bids: 41,
    timeLeft: "12d 15h 35m",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (id) {
    const nft = nfts.find((n) => n.id === Number.parseInt(id))
    if (!nft) {
      return NextResponse.json({ error: "NFT not found" }, { status: 404 })
    }
    return NextResponse.json(nft)
  }

  return NextResponse.json(nfts)
}

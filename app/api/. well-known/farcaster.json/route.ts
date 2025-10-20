import { NextResponse } from "next/server"

// Serve the Farcaster manifest from the API route
// This ensures the manifest is accessible at /.well-known/farcaster.json
export async function GET() {
  const manifest = {
    accountAssociation: {
      header:
        "eyJmaWQiOjEyMzQ1LCJ0eXBlIjoiY3VzdG9keSIsImtleSI6IjB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCJ9",
      payload: "eyJkb21haW4iOiJiYXNlZHJvcC1taW5pYXBwLnZlcmNlbC5hcHAifQ",
      signature: "MHg...",
    },
    frame: {
      version: "1",
      name: "NFT Social - Base Mini App",
      iconUrl: `${process.env.NEXT_PUBLIC_URL || "https://basedrop-miniapp.vercel.app"}/cute-kawaii-character-in-jar-pastel-colors.jpg`,
      homeUrl: process.env.NEXT_PUBLIC_URL || "https://basedrop-miniapp.vercel.app",
      imageUrl: `${process.env.NEXT_PUBLIC_URL || "https://basedrop-miniapp.vercel.app"}/cute-kawaii-character-in-jar-pastel-colors.jpg`,
      buttonTitle: "Explore NFTs",
      splashImageUrl: `${process.env.NEXT_PUBLIC_URL || "https://basedrop-miniapp.vercel.app"}/cute-kawaii-character-in-jar-pastel-colors.jpg`,
      splashBackgroundColor: "#E8F5E9",
      webhookUrl: `${process.env.NEXT_PUBLIC_URL || "https://basedrop-miniapp.vercel.app"}/api/frame`,
    },
    miniapp: {
      version: "1",
      name: "NFT Social - Base Mini App",
      iconUrl: `${process.env.NEXT_PUBLIC_URL || "https://basedrop-miniapp.vercel.app"}/cute-kawaii-character-in-jar-pastel-colors.jpg`,
      homeUrl: process.env.NEXT_PUBLIC_URL || "https://basedrop-miniapp.vercel.app",
      imageUrl: `${process.env.NEXT_PUBLIC_URL || "https://basedrop-miniapp.vercel.app"}/cute-kawaii-character-in-jar-pastel-colors.jpg`,
      buttonTitle: "Explore NFTs",
      splashImageUrl: `${process.env.NEXT_PUBLIC_URL || "https://basedrop-miniapp.vercel.app"}/cute-kawaii-character-in-jar-pastel-colors.jpg`,
      splashBackgroundColor: "#E8F5E9",
      webhookUrl: `${process.env.NEXT_PUBLIC_URL || "https://basedrop-miniapp.vercel.app"}/api/frame`,
    },
  }

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  })
}

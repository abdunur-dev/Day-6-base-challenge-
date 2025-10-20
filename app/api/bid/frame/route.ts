import { NextResponse } from "next/server"

// Frame API endpoint for Farcaster/Base App integration
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Get current stats
    const stats = {
      packsSoldToday: Math.floor(Math.random() * 100) + 50, // Mock data
      totalUsers: 1234,
      activeNow: 42,
    }

    // Return frame response with updated image and stats
    return NextResponse.json({
      version: "vNext",
      image: `${process.env.NEXT_PUBLIC_URL || "https://your-app-url.vercel.app"}/api/frame/image?stats=${stats.packsSoldToday}`,
      buttons: [
        {
          label: "Explore NFTs",
          action: "link",
          target: `${process.env.NEXT_PUBLIC_URL || "https://your-app-url.vercel.app"}/explore`,
        },
        {
          label: `${stats.packsSoldToday} Packs Sold Today!`,
          action: "post",
        },
      ],
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid frame request" }, { status: 400 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Frame endpoint active",
    version: "vNext",
  })
}

import { NextResponse } from "next/server"

// Live stats API endpoint
export async function GET() {
  // Simulate real-time data - in production, this would come from a database
  const now = new Date()
  const baseCount = 150
  const variance = Math.floor(Math.sin(now.getTime() / 10000) * 20)

  const stats = {
    packsSoldToday: baseCount + variance + Math.floor(Math.random() * 10),
    totalSales: 12847,
    activeUsers: 42 + Math.floor(Math.random() * 20),
    totalNFTs: 5432,
    lastUpdated: now.toISOString(),
  }

  return NextResponse.json(stats)
}

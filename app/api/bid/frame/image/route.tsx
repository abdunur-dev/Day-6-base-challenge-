import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const stats = searchParams.get("stats") || "0"

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f9ff",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 900 }}>NFT Social</div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#3b82f6",
            }}
          >
            {stats} Packs Sold Today!
          </div>
          <div style={{ fontSize: 28, color: "#64748b" }}>Buy Random NFT Packs, Broaden Your Collection</div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}

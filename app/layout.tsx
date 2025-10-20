import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { DecorativeStickers } from "@/components/decorative-stickers"
import { Providers } from "@/components/providers"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NFT Social - Base Mini App",
  description: "A viral social NFT marketplace built with MiniKit for Base App",
  generator: "v0.app",
  openGraph: {
    title: "NFT Social - Base Mini App",
    description: "Buy Random NFT Packs, Broaden Your Collection",
    images: ["/cute-kawaii-character-in-jar-pastel-colors.jpg"],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": `${process.env.NEXT_PUBLIC_URL || "https://your-app-url.vercel.app"}/cute-kawaii-character-in-jar-pastel-colors.jpg`,
    "fc:frame:button:1": "Explore NFTs",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": `${process.env.NEXT_PUBLIC_URL || "https://your-app-url.vercel.app"}/explore`,
    "fc:frame:button:2": "View Stats",
    "fc:frame:button:2:action": "post",
    "fc:frame:post_url": `${process.env.NEXT_PUBLIC_URL || "https://your-app-url.vercel.app"}/api/frame`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Providers>
          {children}
          <DecorativeStickers />
          <Footer />
          <Toaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}

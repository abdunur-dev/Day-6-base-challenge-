"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, User, ShoppingBag } from "lucide-react"
import { usePathname } from "next/navigation"
import { WalletButton } from "@/components/wallet-button"

export function AppHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b-4 border-foreground bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full border-4 border-foreground flex items-center justify-center font-black text-primary-foreground">
              N
            </div>
            <span className="text-xl font-black hidden sm:inline">NFT Social</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Link href="/">
              <Button
                variant={pathname === "/" ? "default" : "ghost"}
                size="sm"
                className={`rounded-full font-bold ${
                  pathname === "/" ? "border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : ""
                }`}
              >
                <Home className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
            <Link href="/explore">
              <Button
                variant={pathname === "/explore" ? "default" : "ghost"}
                size="sm"
                className={`rounded-full font-bold ${
                  pathname === "/explore" ? "border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : ""
                }`}
              >
                <ShoppingBag className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Explore</span>
              </Button>
            </Link>
            <Link href="/profile">
              <Button
                variant={pathname === "/profile" ? "default" : "ghost"}
                size="sm"
                className={`rounded-full font-bold ${
                  pathname === "/profile" ? "border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : ""
                }`}
              >
                <User className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Profile</span>
              </Button>
            </Link>
          </nav>

          {/* Wallet Connect */}
          <WalletButton />
        </div>
      </div>
    </header>
  )
}

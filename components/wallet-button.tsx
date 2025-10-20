"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function WalletButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        size="sm"
        className="rounded-full font-bold border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-primary text-primary-foreground"
      >
        <Wallet className="w-4 h-4 mr-2" />
        Connect
      </Button>
    )
  }

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            className="rounded-full font-bold border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-primary text-primary-foreground"
          >
            <Wallet className="w-4 h-4 mr-2" />
            {address.slice(0, 6)}...{address.slice(-4)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <DropdownMenuItem onClick={() => disconnect()} className="font-bold cursor-pointer">
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          className="rounded-full font-bold border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-primary text-primary-foreground"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {connectors.map((connector) => (
          <DropdownMenuItem
            key={connector.id}
            onClick={() => connect({ connector })}
            className="font-bold cursor-pointer"
          >
            <Wallet className="w-4 h-4 mr-2" />
            {connector.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

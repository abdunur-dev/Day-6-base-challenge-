"use client"

import { http, createConfig } from "wagmi"
import { baseSepolia } from "wagmi/chains"
import { injected, walletConnect } from "wagmi/connectors"

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    injected(),
    walletConnect({
      projectId: "0e462099b4e261111657d8cd75739fe6",
    }),
  ],
  transports: {
    [baseSepolia.id]: http(),
  },
  ssr: false,
})

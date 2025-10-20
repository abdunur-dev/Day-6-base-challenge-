export const NFT_MARKETPLACE_ADDRESS = "0x1234567890123456789012345678901234567890" // Replace with your deployed contract

export const NFT_MARKETPLACE_ABI = [
  {
    name: "purchasePack",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "packId", type: "uint256" },
      { name: "quantity", type: "uint256" },
    ],
    outputs: [{ name: "tokenIds", type: "uint256[]" }],
  },
  {
    name: "PackPurchased",
    type: "event",
    inputs: [
      { name: "buyer", type: "address", indexed: true },
      { name: "packId", type: "uint256", indexed: true },
      { name: "quantity", type: "uint256", indexed: false },
      { name: "totalPrice", type: "uint256", indexed: false },
    ],
  },
  {
    name: "getPackPrice",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "packId", type: "uint256" }],
    outputs: [{ name: "price", type: "uint256" }],
  },
] as const

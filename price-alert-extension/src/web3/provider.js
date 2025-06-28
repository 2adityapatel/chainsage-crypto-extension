import { ethers } from "ethers";

const alchemyUrl = import.meta.env.VITE_ALCHEMY_SEPOLIA_RPC_URL;
const publicSepolia = "https://ethereum-sepolia-rpc.publicnode.com";

export function getProvider() {
  if (alchemyUrl && alchemyUrl.includes("alchemy")) {
    return new ethers.JsonRpcProvider(alchemyUrl);
  }
  return new ethers.JsonRpcProvider(publicSepolia);
}

import { useEffect, useState, useRef } from "react";
import { getProvider } from "./provider";
import { CHAINLINK_FEEDS } from "./chainlinkFeeds";
import { ethers } from "ethers";

export default function useChainlinkPriceFeed(token) {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef();

  useEffect(() => {
    let isMounted = true;
    const fetchPrice = async () => {
      setLoading(true);
      setError(null);
      try {
        const feed = CHAINLINK_FEEDS[token];
        if (!feed) throw new Error("Unsupported token");
        const provider = getProvider();
        const abi = ["function latestRoundData() view returns (uint80,int256,uint256,uint256,uint80)"];
        const contract = new ethers.Contract(feed.address, abi, provider);
        const data = await contract.latestRoundData();
        const rawPrice = data[1];
        const formatted = Number(rawPrice) / 10 ** feed.decimals;
        if (isMounted) setPrice(formatted.toLocaleString(undefined, { maximumFractionDigits: 2 }));
      } catch (err) {
        console.log(err);
        
        if (isMounted) setError("Failed to fetch price");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchPrice();
    intervalRef.current = setInterval(fetchPrice, 60000); // 1 min
    return () => {
      isMounted = false;
      clearInterval(intervalRef.current);
    };
  }, [token]);

  return { price, loading, error };
} 
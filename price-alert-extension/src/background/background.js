import { ethers } from "ethers";

console.log('Service worker started!')
// Chainlink Sepolia feeds
const FEEDS = {
  ETH: {
    address: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    decimals: 8,
  },
  BTC: {
    address: "0xA39434A63A52E749F02807ae27335515BA4b07F7",
    decimals: 8,
  },
  LINK: {
    address: "0xDFAa4714C0D2bBf8FF8e2b2d9C72eF7c1eA1e3e1",
    decimals: 8,
  },
};

const ALCHEMY_URL = (typeof importScripts !== 'undefined' && self) ? undefined : undefined;
const PUBLIC_SEPOLIA = "https://ethereum-sepolia-rpc.publicnode.com";

function getProvider() {
  console.log('Getting provider...');
  // For now, always use public Sepolia in background
  return new ethers.JsonRpcProvider(PUBLIC_SEPOLIA);
}

// Use chrome.storage.local for alerts
async function getAlerts() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["alerts"], (result) => {
      resolve(result.alerts || []);
    });
  });
}

async function setAlerts(alerts) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ alerts }, () => {
      resolve();
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('Chainlink Price Sentinel extension installed.');
});

// Listen for alerts sent from popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('Received message:', msg);
  if (msg.type === "UPDATE_ALERTS") {
    setAlerts(msg.alerts || []).then(() => {
      console.log('Updated alerts in chrome.storage:', msg.alerts);
      sendResponse({ status: "ok" });
    });
    // Return true to indicate async response
    return true;
  }
});

async function fetchPrice(token) {
  const feed = FEEDS[token];
  if (!feed) {
    console.log('No feed found for token:', token);
    return null;
  }
  const abi = ["function latestRoundData() view returns (uint80,int256,uint256,uint256,uint80)"];
  const provider = getProvider();
  const contract = new ethers.Contract(feed.address, abi, provider);
  let data;
  try {
    data = await contract.latestRoundData();
    console.log(`Fetched price for ${token}:`, data[1].toString());
  } catch (e) {
    console.error(`Error fetching price for ${token}:`, e);
    return null;
  }
  const rawPrice = data[1];
  return Number(rawPrice) / 10 ** feed.decimals;
}

async function pollAlerts() {
  const alerts = await getAlerts();
  console.log('Polling alerts. Current alerts:', alerts);
  if (!alerts.length) return;
  // Group alerts by token
  const tokens = [...new Set(alerts.map(a => a.token))];
  const prices = {};
  for (const token of tokens) {
    try {
      prices[token] = await fetchPrice(token);
      console.log(`Price for ${token}:`, prices[token]);
    } catch (e) {
      prices[token] = null;
      console.error(`Error getting price for ${token}:`, e);
    }
  }
  // Check alerts
  const remaining = [];
  for (const alert of alerts) {
    const price = prices[alert.token];
    console.log(`Checking alert:`, alert, 'Current price:', price);
    if (price == null) {
      remaining.push(alert);
      continue;
    }
    if (
      (alert.direction === "above" && price > alert.price) ||
      (alert.direction === "below" && price < alert.price)
    ) {
      // Trigger notification
      console.log('Triggering notification for alert:', alert, 'Current price:', price);
      chrome.notifications.create({
        type: "basic",
        iconUrl: "/icons/icon128.png",
        title: `Price Alert: ${alert.token}`,
        message: `${alert.token} is ${alert.direction} $${alert.price} (now $${price.toLocaleString(undefined, { maximumFractionDigits: 2 })})`,
        priority: 2,
      }, (notificationId) => {
        console.log('Notification created with ID:', notificationId);
      });
    } else {
      remaining.push(alert);
    }
  }
  await setAlerts(remaining);
  console.log('Remaining alerts after poll:', remaining);
}

setInterval(pollAlerts, 60000); // Poll every 1 min 
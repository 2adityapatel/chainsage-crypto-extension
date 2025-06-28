# Chainsage - Crypto Price Alert Extension

> **Smarter crypto alerts powered by Chainlink and AI.**

A Chrome extension that provides real-time cryptocurrency price monitoring, intelligent alerts, and AI-powered crypto guidance. Built for the Chromium Hackathon.

![Chainsage Extension](https://img.shields.io/badge/Chainsage-Crypto%20Alerts-blue?style=for-the-badge&logo=bitcoin)

## 🚀 Features

### 💰 Price Monitoring
- **Real-time Price Feeds** - Powered by Chainlink Price Feeds on Sepolia testnet
- **Multiple Cryptocurrencies** - ETH, BTC, LINK with expandable support
- **Live Price Updates** - Automatic price refresh and display
- **Price History** - Track price movements over time

### 🔔 Smart Alerts
- **Custom Price Alerts** - Set alerts for specific price targets
- **Above/Below Thresholds** - Alert when price goes above or below your target
- **Persistent Storage** - Alerts saved across browser sessions
- **Background Monitoring** - Continuous price checking in background

### 🤖 AI-Powered Chat
- **Crypto-Savvy Eliza Bot** - AI assistant specialized in cryptocurrency
- **Gemini AI Integration** - Powered by Google's latest AI model
- **Contextual Responses** - Intelligent crypto guidance and analysis
- **Quick Suggestions** - Pre-built questions for common crypto queries

### 🎨 Modern UI/UX
- **Dark Theme** - Sleek, modern interface optimized for crypto trading
- **Responsive Design** - Works perfectly in extension popup
- **Tabbed Interface** - Separate tabs for alerts and AI chat
- **Real-time Updates** - Live price feeds and status indicators

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Chakra UI** - Beautiful, accessible component library
- **React Icons** - Comprehensive icon library

### Web3 & Blockchain
- **Ethers.js** - Ethereum library for blockchain interaction
- **Chainlink Price Feeds** - Decentralized price data
- **Sepolia Testnet** - Ethereum test network

### AI & Backend
- **Google Gemini AI** - Advanced AI model for crypto guidance
- **Node.js/Express** - Backend API server
- **WebSocket** - Real-time communication

## 📋 Prerequisites

- **Chrome Browser** (or Chromium-based browsers)
- **Node.js** (v16 or higher) - for development
- **MetaMask** - for Web3 connectivity (optional)
- **Sepolia Testnet** - for testing price feeds

## 🔧 Installation

### For Users

1. **Download the Extension**
   - Clone this repository
   - Or download the built extension files

2. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `price-alert-extension` folder

3. **Start Using**
   - Click the Chainsage icon in your browser toolbar
   - Set up your first price alert
   - Chat with Eliza about crypto!

### For Developers

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd price-alert-extension
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Add your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Usage Guide

### Setting Up Price Alerts

1. **Select a Token**
   - Choose from ETH, BTC, or LINK
   - View current price in real-time

2. **Create an Alert**
   - Enter your target price
   - Choose "Above" or "Below" threshold
   - Click "Add Alert"

3. **Monitor Alerts**
   - View all active alerts in the list
   - Remove alerts you no longer need
   - Alerts trigger automatically in background

### Using AI Chat

1. **Open Chat Tab**
   - Click "Chat with AI" tab
   - Meet Eliza, your crypto assistant

2. **Ask Questions**
   - Type your crypto questions
   - Use suggestion buttons for quick queries
   - Get intelligent, contextual responses

3. **Get Guidance**
   - Ask about price trends
   - Get alert recommendations
   - Learn about different cryptocurrencies

## 🔌 API Integration

### Chainlink Price Feeds

The extension connects to Chainlink Price Feeds on Sepolia testnet:

```javascript
// Supported tokens and their feed addresses
const CHAINLINK_FEEDS = {
  ETH: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  BTC: "0x1b44F3514812d835EB1BDB0acB33d3fA3351eE43",
  LINK: "0xc59E3633BAAC79493d908e63626716e204A45EdF"
};
```

### AI Chat API

Communicates with the backend server for AI responses:

```javascript
// Example API call
const response = await fetch('http://localhost:3001/api/gemini-chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: "How is ETH performing?",
    systemInstruction: "You are Eliza, a crypto-savvy assistant..."
  })
});
```

## 🏗️ Project Structure

```
price-alert-extension/
├── public/
│   ├── manifest.json          # Extension manifest
│   ├── icons/                 # Extension icons
│   └── popup.html            # Popup entry point
├── src/
│   ├── popup/                # Popup components
│   │   ├── Popup.jsx         # Main popup component
│   │   ├── TokenSelector.jsx # Token selection
│   │   ├── PriceDisplay.jsx  # Price display
│   │   ├── AlertForm.jsx     # Alert creation
│   │   ├── AlertList.jsx     # Alert management
│   │   └── CryptoElizaChat.jsx # AI chat interface
│   ├── web3/                 # Web3 utilities
│   │   ├── chainlinkFeeds.js # Price feed addresses
│   │   ├── provider.js       # Web3 provider setup
│   │   └── useChainlinkPriceFeed.js # Price feed hook
│   ├── background/           # Background scripts
│   └── main.jsx             # Main entry point
├── package.json
└── vite.config.js
```

## ⚙️ Configuration

### Environment Variables

```bash
# Development
VITE_BACKEND_URL=http://localhost:3001
VITE_CHAINLINK_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
```

### Extension Settings

- **Popup Size**: 370px × 520px (optimized for alerts and chat)
- **Background Scripts**: Price monitoring and alert checking
- **Permissions**: Web3 access, storage, notifications

## 🔒 Security Features

- **Secure API Communication** - HTTPS for all external calls
- **Input Validation** - Sanitized user inputs
- **Error Handling** - Graceful error recovery
- **No Sensitive Data Storage** - API keys stored securely

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

### Publishing to Chrome Web Store

1. Build the extension
2. Create a ZIP file of the `dist` folder
3. Upload to Chrome Web Store Developer Dashboard
4. Submit for review

## 🐛 Troubleshooting

### Common Issues

1. **"Price not loading"**
   - Check internet connection
   - Verify Sepolia testnet access
   - Ensure MetaMask is connected

2. **"AI chat not working"**
   - Verify backend server is running
   - Check API endpoint configuration
   - Ensure Gemini API key is valid

3. **"Alerts not triggering"**
   - Check background script permissions
   - Verify alert storage is working
   - Ensure price feed is updating

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

### Development Guidelines

- Follow React best practices
- Use TypeScript for new components
- Add tests for new features
- Update documentation

## 📄 License

This project is built for the Chromium Hackathon.

## 🔗 Related Projects

- [Chainsage Backend](../chat-server/) - AI chat server
- [Chainlink Documentation](https://docs.chain.link/) - Price feed docs
- [Google Gemini API](https://ai.google.dev/) - AI documentation

## 🙏 Acknowledgments

- **Chainlink** - For decentralized price feeds
- **Google Gemini** - For AI capabilities
- **Chakra UI** - For beautiful components
- **Chromium Team** - For the hackathon opportunity

---

**Built with ❤️ for the Chromium Hackathon**

*Chainsage - Where crypto meets intelligence*

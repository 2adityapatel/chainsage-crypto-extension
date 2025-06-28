# Chainsage - Crypto Price Alert Extension

> **Smarter crypto alerts powered by Chainlink and AI.**

A complete Chrome extension solution that provides real-time cryptocurrency price monitoring, intelligent alerts, and AI-powered crypto guidance. Built for the Chromium Hackathon.

![Chainsage](https://img.shields.io/badge/Chainsage-Crypto%20Alerts-blue?style=for-the-badge&logo=bitcoin)
![Built for Chromium Hackathon](https://img.shields.io/badge/Built%20for-Chromium%20Hackathon-green?style=for-the-badge)

## 🚀 Project Overview

Chainsage combines the power of **Chainlink Price Feeds** with **Google Gemini AI** to create an intelligent crypto monitoring and guidance system. The project consists of two main components:

### 📱 **Frontend Extension** (`price-alert-extension/`)
- Chrome extension with real-time price monitoring
- Custom price alerts with background checking
- AI-powered chat interface with crypto-savvy Eliza bot
- Modern, responsive UI built with React and Chakra UI

### 🤖 **Backend Server** (`chat-server/`)
- Node.js/Express API server
- Google Gemini AI integration
- Response length optimization
- CORS-enabled for browser extension communication

## 🎯 Key Features

- **💰 Real-time Price Feeds** - Powered by Chainlink on Sepolia testnet
- **🔔 Smart Alerts** - Custom price thresholds with background monitoring
- **🤖 AI Chat Assistant** - Crypto-savvy Eliza powered by Gemini AI
- **🎨 Modern UI** - Dark theme optimized for crypto trading
- **🔒 Secure** - API key protection and input validation

## 🛠️ Tech Stack

### Frontend
- **React 18** + **Vite** - Modern development
- **Chakra UI** - Beautiful components
- **Ethers.js** - Web3 integration
- **Chainlink Price Feeds** - Decentralized price data

### Backend
- **Node.js** + **Express** - API server
- **@google/genai** - Gemini AI integration
- **CORS** - Cross-origin support

## 📋 Quick Start

### Prerequisites
- Node.js (v16+)
- Chrome browser
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/chainsage-crypto-extension.git
   cd chainsage-crypto-extension
   ```

2. **Set up the backend**
   ```bash
   cd chat-server
   npm install
   cp .env.example .env
   # Add your GEMINI_API_KEY to .env
   npm start
   ```

3. **Set up the frontend**
   ```bash
   cd ../price-alert-extension
   npm install
   npm run build
   ```

4. **Load the extension**
   - Open Chrome → `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" → Select `price-alert-extension/dist`

## 🎯 Usage

### Price Alerts
1. Select a cryptocurrency (ETH, BTC, LINK)
2. Set your target price and threshold
3. Alerts trigger automatically in the background

### AI Chat
1. Click "Chat with AI" tab
2. Ask Eliza about crypto trends, prices, or alerts
3. Get intelligent, contextual responses

## 📁 Project Structure

```
chainsage-crypto-extension/
├── price-alert-extension/     # Chrome extension frontend
│   ├── src/
│   │   ├── popup/            # Extension popup components
│   │   ├── web3/             # Web3 utilities
│   │   └── background/       # Background scripts
│   ├── public/               # Extension assets
│   └── README.md             # Frontend documentation
├── chat-server/              # AI backend server
│   ├── index.js              # Main server file
│   ├── package.json          # Backend dependencies
│   └── README.md             # Backend documentation
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🔧 Configuration

### Environment Variables

**Backend** (`chat-server/.env`):
```bash
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

**Frontend** (`price-alert-extension/.env`):
```bash
VITE_BACKEND_URL=http://localhost:3001
```

## 🚀 Deployment

### Backend
- Deploy to Vercel, Railway, or any Node.js hosting
- Set environment variables
- Update frontend API URL

### Frontend
- Build with `npm run build`
- Upload to Chrome Web Store
- Or distribute as unpacked extension

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is built for the Chromium Hackathon.

## 🔗 Links

- [Frontend Documentation](price-alert-extension/README.md)
- [Backend Documentation](chat-server/README.md)
- [Chainlink Documentation](https://docs.chain.link/)
- [Google Gemini API](https://ai.google.dev/)

## 🙏 Acknowledgments

- **Chainlink** - For decentralized price feeds
- **Google Gemini** - For AI capabilities
- **Chromium Team** - For the hackathon opportunity
- **Chakra UI** - For beautiful components

---

**Built with ❤️ for the Chromium Hackathon**

*Chainsage - Where crypto meets intelligence* 
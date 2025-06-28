# Chainsage Backend - AI Chat Server

> **Smarter crypto alerts powered by Chainlink and AI.**

A Node.js/Express backend server that provides AI-powered chat functionality for the Chainsage browser extension, built for the Chromium Hackathon.

## 🚀 Features

- **Gemini AI Integration** - Powered by Google's Gemini 2.5 Flash model
- **Crypto-Savvy Eliza Bot** - Specialized AI assistant for cryptocurrency discussions
- **Response Length Control** - Optimized for concise, focused responses
- **System Instruction Support** - Customizable AI personality and behavior
- **CORS Enabled** - Ready for browser extension integration

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **@google/genai** - Official Google Gemini AI SDK
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your Gemini API key to `.env`:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3001
   ```

4. **Start the server**
   ```bash
   npm start
   # or
   node index.js
   ```

## 🔌 API Endpoints

### POST `/api/gemini-chat`

Send a message to the AI assistant and receive a response.

**Request Body:**
```json
{
  "prompt": "How is ETH going?",
  "systemInstruction": "You are Eliza, a crypto-savvy assistant..."
}
```

**Response:**
```json
{
  "text": "Ethereum is showing strong momentum! The current price..."
}
```

**Parameters:**
- `prompt` (string, required) - User's message
- `systemInstruction` (string, optional) - AI personality/context

## ⚙️ Configuration

### Response Limits
- **Max Tokens**: 100 (approximately 2-3 sentences)
- **Max Characters**: 200 (fallback limit)
- **Temperature**: 0.7 (balanced creativity)

### Environment Variables
- `GEMINI_API_KEY` - Your Google Gemini API key
- `PORT` - Server port (default: 3001)

## 🔒 Security

- API key stored in environment variables
- CORS configured for browser extension
- Input validation and error handling
- Rate limiting recommended for production

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]
```

## 📝 Usage Examples

### Basic Chat Request
```javascript
const response = await fetch('http://localhost:3001/api/gemini-chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: "What's the current Bitcoin price trend?",
    systemInstruction: "You are Eliza, a crypto-savvy assistant..."
  })
});

const data = await response.json();
console.log(data.text);
```

## 🐛 Troubleshooting

### Common Issues

1. **"API key not found"**
   - Ensure `GEMINI_API_KEY` is set in `.env`
   - Restart the server after adding the key

2. **"CORS error"**
   - Check that the frontend origin is allowed
   - Verify CORS configuration

3. **"Contents is not specified"**
   - Ensure the request body format is correct
   - Check that `prompt` field is included

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is built for the Chromium Hackathon.

## 🔗 Related

- [Chainsage Frontend](../price-alert-extension/) - Browser extension
- [Google Gemini API](https://ai.google.dev/gemini-api/docs) - AI documentation
- [Chainlink Price Feeds](https://docs.chain.link/data-feeds/price-feeds) - Price data

---

**Built with ❤️ for the Chromium Hackathon** 
# FraudCtrl Backend

Express.js backend server for the AI-Based Fake Review Detection System, powered by Openrouter's free LLM.

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and add your Openrouter API key:

```bash
cp .env.example .env
```

Edit `.env` and add:
```
OPENROUTER_API_KEY=your_api_key_here
CLIENT_URL=http://localhost:3000
PORT=5000
```

Get your free API key from [Openrouter.ai](https://openrouter.ai)

### 3. Run the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST /api/analyze
Analyzes a review text for fraud indicators.

**Request:**
```json
{
  "text": "This is the review text to analyze..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "text": "Review text...",
    "analysis": {
      "isFraudulent": boolean,
      "fraudScore": 0-100,
      "confidence": 0-100,
      "indicators": ["indicator1", "indicator2"],
      "reasoning": "Explanation..."
    },
    "timestamp": "ISO timestamp"
  }
}
```

### GET /health
Health check endpoint to verify server is running.

## Project Structure

```
server/
├── server.js              # Main server entry point
├── package.json           # Dependencies
├── .env.example           # Environment template
├── routes/
│   └── analyze.js         # Analysis endpoint
├── services/
│   └── fraudDetection.js  # AI integration logic
└── utils/
    └── validators.js      # Input validation
```

## Features

- ✅ Express.js web server
- ✅ CORS enabled for React client
- ✅ Openrouter LLM integration (free models)
- ✅ Fraud detection analysis
- ✅ Input validation
- ✅ Error handling
- ✅ Environment configuration

## Connecting to Frontend

Update your client's API calls to hit the backend:

```javascript
const response = await axios.post('http://localhost:5000/api/analyze', {
  text: reviewText
});
```

## Notes

- Uses free Mistral 7B model from Openrouter
- No database - analysis is stateless
- Review text limited to 5000 characters
- minimum 5 characters required

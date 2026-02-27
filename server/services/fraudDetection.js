const axios = require('axios');

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Fraud detection prompt
const FRAUD_DETECTION_PROMPT = `You are an expert fraud detection analyst specializing in identifying fake reviews. Analyze the following review text and determine if it shows signs of being fraudulent.

Consider the following indicators:
- Repetitive language or patterns
- Unusual grammar or phrasing
- Excessive emotional language
- Vague or generic praise/criticism
- Presence of competitor mentions
- Suspicious purchase history references
- Inconsistent or contradictory statements
- Links or promotional content
- AI-generated characteristics

Provide your analysis in the following JSON format:
{
  "isFraudulent": boolean,
  "fraudScore": number (0-100),
  "confidence": number (0-100),
  "indicators": [list of detected fraud indicators],
  "reasoning": "Brief explanation of the analysis"
}

Review to analyze:
`;

async function analyzeReview(reviewText) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not configured');
    }

    const response = await axios.post(OPENROUTER_API_URL, {
      model: 'qwen/qwen3.5-35b-a3b',
      messages: [
        {
          role: 'user',
          content: FRAUD_DETECTION_PROMPT + reviewText
        }
      ],
      temperature: 0.2,
      max_tokens: 500
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'FraudCtrl'
      },
      timeout: 30000
    });

    // Validate response structure
    if (!response.data || !response.data.choices || !Array.isArray(response.data.choices) || response.data.choices.length === 0) {
      throw new Error(`Invalid API response structure. Response data: ${JSON.stringify(response.data)}`);
    }

    // Extract the response content
    const content = response.data.choices[0].message.content;
    
    if (!content) {
      throw new Error('No content in API response');
    }
    
    // Parse JSON from response - try multiple approaches
    let analysis;
    try {
      // Try parsing as direct JSON first
      analysis = JSON.parse(content);
    } catch (e) {
      // Try extracting JSON block from markdown or text
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error(`Invalid response format. Response: ${content.substring(0, 200)}`);
      }
      analysis = JSON.parse(jsonMatch[0]);
    }

    return {
      text: reviewText,
      analysis: analysis,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    // Better error logging for debugging
    if (error.response) {
      console.error('API Error Response:', error.response.status, error.response.data);
      throw new Error(`OpenRouter API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      console.error('No response from API:', error.request);
      throw new Error('No response from OpenRouter API - check your connection');
    } else {
      console.error('Fraud detection error:', error.message);
      throw error;
    }
  }
}

module.exports = {
  analyzeReview
};

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

function clampScore(value) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return 0;
  return Math.max(0, Math.min(100, Math.round(numeric)));
}

function normalizeIndicators(indicators) {
  if (!Array.isArray(indicators)) return [];
  return indicators
    .filter((item) => typeof item === 'string' && item.trim().length > 0)
    .map((item) => item.trim());
}

function extractJsonObject(text) {
  if (typeof text !== 'string') return null;
  const trimmed = text.trim();
  if (!trimmed) return null;

  try {
    return JSON.parse(trimmed);
  } catch (error) {
    // fall through and try bracket-based extraction
  }

  const firstBrace = trimmed.indexOf('{');
  if (firstBrace === -1) return null;

  let depth = 0;
  let inString = false;
  let isEscaped = false;

  for (let i = firstBrace; i < trimmed.length; i += 1) {
    const ch = trimmed[i];

    if (inString) {
      if (isEscaped) {
        isEscaped = false;
      } else if (ch === '\\') {
        isEscaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
      continue;
    }

    if (ch === '{') {
      depth += 1;
    } else if (ch === '}') {
      depth -= 1;
      if (depth === 0) {
        const candidate = trimmed.slice(firstBrace, i + 1);
        try {
          return JSON.parse(candidate);
        } catch (error) {
          return null;
        }
      }
    }
  }

  return null;
}

function normalizeAnalysis(rawAnalysis) {
  if (!rawAnalysis || typeof rawAnalysis !== 'object') return null;

  const reasoning = typeof rawAnalysis.reasoning === 'string' && rawAnalysis.reasoning.trim().length > 0
    ? rawAnalysis.reasoning.trim()
    : 'Model output did not include detailed reasoning.';

  return {
    isFraudulent: Boolean(rawAnalysis.isFraudulent),
    fraudScore: clampScore(rawAnalysis.fraudScore),
    confidence: clampScore(rawAnalysis.confidence),
    indicators: normalizeIndicators(rawAnalysis.indicators),
    reasoning
  };
}

async function requestAnalysisCompletion(reviewText, strictJsonOnly = false) {
  const strictInstruction = strictJsonOnly
    ? '\nIMPORTANT: Return only a valid JSON object with the required keys. Do not include thinking steps, labels, markdown, or extra text.'
    : '\nReturn a valid JSON object only.';

  return axios.post(OPENROUTER_API_URL, {
    model: 'qwen/qwen3.5-35b-a3b',
    messages: [
      {
        role: 'user',
        content: FRAUD_DETECTION_PROMPT + reviewText + strictInstruction
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
}

async function analyzeReview(reviewText) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not configured');
    }

    let response = await requestAnalysisCompletion(reviewText, false);

    // Retry once with stricter instruction if first output is malformed.
    for (let attempt = 0; attempt < 2; attempt += 1) {
      if (!response.data || !response.data.choices || !Array.isArray(response.data.choices) || response.data.choices.length === 0) {
        throw new Error(`Invalid API response structure. Response data: ${JSON.stringify(response.data)}`);
      }

      const content = response.data.choices[0]?.message?.content || '';
      const parsed = extractJsonObject(content);
      const normalized = normalizeAnalysis(parsed);

      if (normalized) {
        return {
          text: reviewText,
          analysis: normalized,
          timestamp: new Date().toISOString()
        };
      }

      if (attempt === 0) {
        response = await requestAnalysisCompletion(reviewText, true);
      } else {
        throw new Error(`Invalid response format from model. Response: ${String(content).substring(0, 200)}`);
      }
    }

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

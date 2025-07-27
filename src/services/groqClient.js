import OpenAI from 'openai';

/**
 * Initializes the Groq client using OpenAI-compatible API
 * Groq provides OpenAI-compatible endpoints
 */
const groq = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
  dangerouslyAllowBrowser: true, // Required for client-side usage in React
});

export default groq;
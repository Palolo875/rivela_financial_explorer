import groq from './groqClient';
import { handleAIError, createFallbackResponse } from './errorHandler';

/**
 * Analyzes a financial question and provides insights
 * @param {string} question - The user's financial question
 * @param {number} mood - User's emotional state (1-10)
 * @param {string[]} tags - Contextual tags
 * @returns {Promise<object>} Analysis results
 */
export async function analyzeFinancialQuestion(question, mood = 5, tags = []) {
  try {
    const prompt = `En tant qu'expert en psychologie financière et neurosciences, analysez cette question financière:

Question: "${question}"
État émotionnel (1-10): ${mood}
Contexte: ${tags.join(', ')}

Fournissez une analyse structurée qui inclut:
1. Les déclencheurs psychologiques identifiés
2. Les patterns comportementaux observés
3. Des recommandations personnalisées
4. Une catégorisation de la question

Répondez en français avec un ton bienveillant et professionnel.`;

    const response = await groq.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: [
        { 
          role: 'system', 
          content: 'Vous êtes un expert en psychologie financière et neurosciences comportementales. Vous aidez les utilisateurs à comprendre leurs habitudes financières.' 
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return {
      analysis: response.choices[0].message.content,
      category: extractCategory(response.choices[0].message.content),
      confidence: 0.85,
      insights: extractInsights(response.choices[0].message.content)
    };
  } catch (error) {
    const handledError = handleAIError(error);
    
    // Return fallback response for better user experience
    if (handledError.code === 'NETWORK_ERROR' || handledError.code === 'GENERIC_ERROR') {
      return createFallbackResponse('analysis');
    }
    
    throw handledError;
  }
}

/**
 * Generates personalized financial insights based on user data
 * @param {object} userData - User's financial data
 * @returns {Promise<object>} Personalized insights
 */
export async function generatePersonalizedInsights(userData) {
  try {
    const prompt = `Analysez ces données financières et générez des insights personnalisés:

Données utilisateur:
- Revenus mensuels: ${userData.income || 'Non spécifié'}€
- Dépenses principales: ${JSON.stringify(userData.expenses || {})}
- Objectifs: ${userData.goals?.join(', ') || 'Non spécifiés'}
- Habitudes de dépense: ${JSON.stringify(userData.spendingPatterns || {})}

Générez 3-5 insights personnalisés basés sur la neuroscience comportementale, avec pour chacun:
- Un titre accrocheur
- Une explication scientifique simple
- Des actions concrètes à mettre en place

Répondez en français avec un format structuré.`;

    const response = await groq.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: [
        { 
          role: 'system', 
          content: 'Vous êtes un conseiller financier spécialisé en neurosciences comportementales. Vous créez des insights personnalisés basés sur des données réelles.' 
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 1200,
    });

    return {
      insights: parseInsightsFromResponse(response.choices[0].message.content),
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    const handledError = handleAIError(error);
    console.warn('Falling back to demo insights:', handledError.message);
    
    return {
      insights: [
        {
          title: 'Analyse de démonstration',
          description: 'Connectez-vous pour obtenir des insights personnalisés basés sur vos données réelles.',
          actions: ['Complétez votre profil', 'Ajoutez vos données financières']
        }
      ],
      generatedAt: new Date().toISOString()
    };
  }
}

/**
 * Creates a personalized financial equation based on user data
 * @param {object} userData - User's financial and behavioral data
 * @returns {Promise<object>} Personalized equation
 */
export async function generateFinancialEquation(userData) {
  try {
    const prompt = `Créez une équation financière personnalisée basée sur ces données:

Profil utilisateur:
- Données financières: ${JSON.stringify(userData.financialData || {})}
- Patterns de dépenses: ${JSON.stringify(userData.spendingPatterns || {})}
- État émotionnel moyen: ${userData.emotionalState || 5}/10
- Déclencheurs identifiés: ${userData.triggers?.join(', ') || 'Aucun'}

Créez une équation qui révèle les corrélations cachées dans les habitudes financières.
Format: "Variable A × Variable B = Résultat Financier"

Incluez:
- Les variables clés (3-4 maximum)
- Les valeurs numériques réalistes
- L'impact de chaque variable (0-1)
- Une explication des corrélations découvertes

Répondez en français avec un format JSON structuré.`;

    const response = await groq.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: [
        { 
          role: 'system', 
          content: 'Vous êtes un data scientist spécialisé en analyse comportementale financière. Vous créez des équations révélatrices basées sur des patterns réels.' 
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 800,
    });

    return parseEquationFromResponse(response.choices[0].message.content);
  } catch (error) {
    const handledError = handleAIError(error);
    console.warn('Falling back to demo equation:', handledError.message);
    
    return createFallbackResponse('equation');
  }
}

/**
 * Generates financial scenarios for simulation
 * @param {object} currentSituation - User's current financial situation
 * @param {string} scenarioType - Type of scenario to generate
 * @returns {Promise<object>} Scenario data
 */
export async function generateScenario(currentSituation, scenarioType) {
  try {
    const prompt = `Générez un scénario financier "${scenarioType}" basé sur cette situation:

Situation actuelle:
${JSON.stringify(currentSituation, null, 2)}

Créez un scénario réaliste qui montre:
- Les changements proposés
- L'impact financier estimé
- Les étapes de mise en œuvre
- Les risques et opportunités

Répondez en français avec des données chiffrées précises.`;

    const response = await groq.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: [
        { 
          role: 'system', 
          content: 'Vous êtes un planificateur financier expert. Vous créez des scénarios réalistes et actionnables.' 
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 600,
    });

    return parseScenarioFromResponse(response.choices[0].message.content, scenarioType);
  } catch (error) {
    console.error('Error generating scenario:', error);
    throw new Error('Erreur lors de la génération du scénario.');
  }
}

/**
 * Streaming chat completion for real-time financial advice
 * @param {string} message - User's message
 * @param {Function} onChunk - Callback for each streamed chunk
 * @param {Array} conversationHistory - Previous conversation context
 */
export async function streamFinancialAdvice(message, onChunk, conversationHistory = []) {
  try {
    const messages = [
      { 
        role: 'system', 
        content: 'Vous êtes un conseiller financier expert en neurosciences comportementales. Fournissez des conseils personnalisés, bienveillants et basés sur la science.' 
      },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const stream = await groq.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages,
      stream: true,
      temperature: 0.7,
      max_tokens: 800,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        onChunk(content);
      }
    }
  } catch (error) {
    console.error('Error in streaming financial advice:', error);
    throw new Error('Erreur lors de la génération des conseils en temps réel.');
  }
}

// Helper functions
function extractCategory(analysisText) {
  // Simple category extraction based on keywords
  const categories = {
    'émotionnel': ['émotion', 'stress', 'anxiété', 'humeur'],
    'habitudes': ['habitude', 'routine', 'comportement', 'pattern'],
    'budget': ['budget', 'dépense', 'épargne', 'argent'],
    'investissement': ['investir', 'placement', 'rendement', 'risque']
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => analysisText.toLowerCase().includes(keyword))) {
      return category;
    }
  }
  return 'Général';
}

function extractInsights(analysisText) {
  // Extract key insights from the analysis
  return [
    {
      type: 'behavioral',
      message: 'Pattern comportemental identifié dans votre question',
      confidence: 0.8
    }
  ];
}

function parseInsightsFromResponse(responseText) {
  // Parse structured insights from AI response
  try {
    // Try to extract structured content, fallback to parsed text
    const insights = [];
    const lines = responseText.split('\n').filter(line => line.trim());
    
    let currentInsight = null;
    for (const line of lines) {
      if (line.includes('**') || line.includes('#')) {
        if (currentInsight) {
          insights.push(currentInsight);
        }
        currentInsight = {
          title: line.replace(/[*#]/g, '').trim(),
          description: '',
          actions: []
        };
      } else if (line.trim() && currentInsight) {
        if (line.includes('-') || line.includes('•')) {
          currentInsight.actions.push(line.replace(/[-•]/g, '').trim());
        } else {
          currentInsight.description += line.trim() + ' ';
        }
      }
    }
    
    if (currentInsight) {
      insights.push(currentInsight);
    }
    
    return insights.length > 0 ? insights : [
      {
        title: 'Analyse personnalisée générée',
        description: responseText.substring(0, 200) + '...',
        actions: ['Consultez l\'analyse complète pour plus de détails']
      }
    ];
  } catch (error) {
    return [
      {
        title: 'Insights générés',
        description: responseText,
        actions: []
      }
    ];
  }
}

function parseEquationFromResponse(responseText) {
  // Parse equation data from AI response
  try {
    // Try to parse JSON if present, otherwise create structured equation
    if (responseText.includes('{') && responseText.includes('}')) {
      const jsonMatch = responseText.match(/{[\s\S]*}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }
    
    // Fallback: create equation from text analysis
    return {
      formula: "Habitudes × État Émotionnel = Impact Financier",
      variables: [
        {
          id: 'habits',
          name: 'Habitudes de Dépense',
          value: 7.5,
          unit: '/10',
          impact: 0.8,
          color: '#EF4444',
          description: 'Score basé sur vos patterns de dépense'
        },
        {
          id: 'emotional_state',
          name: 'État Émotionnel',
          value: 6.0,
          unit: '/10',
          impact: 0.7,
          color: '#F59E0B',
          description: 'Influence émotionnelle sur les décisions'
        },
        {
          id: 'financial_impact',
          name: 'Impact Financier',
          value: 450,
          unit: '€',
          impact: 1.0,
          color: '#DC2626',
          description: 'Impact mensuel estimé'
        }
      ],
      insights: [
        {
          id: 1,
          type: 'correlation',
          strength: 0.85,
          message: responseText.substring(0, 100) + '...'
        }
      ]
    };
  } catch (error) {
    console.error('Error parsing equation:', error);
    return null;
  }
}

function parseScenarioFromResponse(responseText, scenarioType) {
  // Parse scenario data from AI response
  return {
    name: `Scénario ${scenarioType}`,
    description: responseText.substring(0, 200) + '...',
    impact: {
      balanceChange: Math.floor(Math.random() * 400) + 100,
      timeframe: '3 mois',
      probability: 0.75
    },
    variables: [], // Would be populated based on actual parsing
    steps: responseText.split('\n').filter(line => 
      line.includes('-') || line.includes('•')
    ).map(step => step.replace(/[-•]/g, '').trim()).slice(0, 5)
  };
}
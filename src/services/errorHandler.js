/**
 * Centralized error handling for AI services
 */

// Environment-aware logging
const isDevelopment = process.env.NODE_ENV === 'development';

// Simple logger that respects environment
const logger = {
  error: (message, error) => {
    if (isDevelopment) {
      console.error(message, error);
    }
    // In production, you could send to monitoring service
    // Example: sendToMonitoring({ level: 'error', message, error });
  },
  warn: (message, data) => {
    if (isDevelopment) {
      console.warn(message, data);
    }
  },
  info: (message, data) => {
    if (isDevelopment) {
      console.info(message, data);
    }
  }
};

export class AIServiceError extends Error {
  constructor(message, code = 'AI_ERROR', details = null) {
    super(message);
    this.name = 'AIServiceError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

export function handleAIError(error) {
  logger.error('AI Service Error:', error);
  
  // Network errors
  if (error.message?.includes('fetch')) {
    return new AIServiceError(
      'Problème de connexion. Vérifiez votre connexion internet.',
      'NETWORK_ERROR'
    );
  }
  
  // API key errors
  if (error.status === 401 || error.message?.includes('API key')) {
    return new AIServiceError(
      'Problème d\'authentification avec le service IA.',
      'AUTH_ERROR'
    );
  }
  
  // Rate limiting
  if (error.status === 429) {
    return new AIServiceError(
      'Trop de requêtes. Veuillez patienter quelques instants.',
      'RATE_LIMIT'
    );
  }
  
  // Quota exceeded
  if (error.status === 403 && error.message?.includes('quota')) {
    return new AIServiceError(
      'Quota dépassé. Veuillez réessayer plus tard.',
      'QUOTA_EXCEEDED'
    );
  }
  
  // Generic error
  return new AIServiceError(
    'Une erreur est survenue avec le service IA. Veuillez réessayer.',
    'GENERIC_ERROR',
    error
  );
}

export function createFallbackResponse(type = 'analysis') {
  switch (type) {
    case 'analysis':
      return {
        analysis: 'Analyse en mode de démonstration. Connectez-vous pour une analyse personnalisée.',
        category: 'Général',
        confidence: 0.5,
        insights: [{
          type: 'demo',
          message: 'Ceci est une réponse de démonstration'
        }]
      };
    
    case 'equation':
      return {
        formula: "Démonstration × Mode = Exemple",
        variables: [
          {
            id: 'demo',
            name: 'Mode Démonstration',
            value: 1,
            unit: 'demo',
            impact: 0.5,
            color: '#6B7280',
            description: 'Données de démonstration'
          }
        ],
        insights: [{
          id: 1,
          type: 'demo',
          strength: 0.5,
          message: 'Ceci est un exemple de démonstration'
        }]
      };
    
    default:
      return null;
  }
}

// Export logger for use in other modules
export { logger };
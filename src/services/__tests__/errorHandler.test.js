import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AIServiceError, handleAIError, createFallbackResponse, logger } from '../errorHandler';

describe('errorHandler', () => {
  let originalNodeEnv;

  beforeEach(() => {
    originalNodeEnv = process.env.NODE_ENV;
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  describe('AIServiceError', () => {
    it('creates error with default values', () => {
      const error = new AIServiceError('Test message');
      
      expect(error.name).toBe('AIServiceError');
      expect(error.message).toBe('Test message');
      expect(error.code).toBe('AI_ERROR');
      expect(error.details).toBeNull();
      expect(error.timestamp).toBeDefined();
    });

    it('creates error with custom values', () => {
      const details = { extra: 'info' };
      const error = new AIServiceError('Custom message', 'CUSTOM_CODE', details);
      
      expect(error.message).toBe('Custom message');
      expect(error.code).toBe('CUSTOM_CODE');
      expect(error.details).toBe(details);
    });
  });

  describe('handleAIError', () => {
    it('handles network errors', () => {
      const networkError = new Error('fetch failed');
      const result = handleAIError(networkError);
      
      expect(result).toBeInstanceOf(AIServiceError);
      expect(result.code).toBe('NETWORK_ERROR');
      expect(result.message).toContain('connexion');
    });

    it('handles authentication errors', () => {
      const authError = { status: 401 };
      const result = handleAIError(authError);
      
      expect(result.code).toBe('AUTH_ERROR');
      expect(result.message).toContain('authentification');
    });

    it('handles rate limiting errors', () => {
      const rateLimitError = { status: 429 };
      const result = handleAIError(rateLimitError);
      
      expect(result.code).toBe('RATE_LIMIT');
      expect(result.message).toContain('requêtes');
    });

    it('handles quota exceeded errors', () => {
      const quotaError = { status: 403, message: 'quota exceeded' };
      const result = handleAIError(quotaError);
      
      expect(result.code).toBe('QUOTA_EXCEEDED');
      expect(result.message).toContain('Quota');
    });

    it('handles generic errors', () => {
      const genericError = new Error('Unknown error');
      const result = handleAIError(genericError);
      
      expect(result.code).toBe('GENERIC_ERROR');
      expect(result.message).toContain('erreur est survenue');
    });
  });

  describe('createFallbackResponse', () => {
    it('creates analysis fallback response', () => {
      const response = createFallbackResponse('analysis');
      
      expect(response).toHaveProperty('analysis');
      expect(response).toHaveProperty('category');
      expect(response).toHaveProperty('confidence');
      expect(response).toHaveProperty('insights');
      expect(response.confidence).toBe(0.5);
    });

    it('creates equation fallback response', () => {
      const response = createFallbackResponse('equation');
      
      expect(response).toHaveProperty('formula');
      expect(response).toHaveProperty('variables');
      expect(response).toHaveProperty('insights');
      expect(response.variables).toHaveLength(1);
    });

    it('returns null for unknown types', () => {
      const response = createFallbackResponse('unknown');
      expect(response).toBeNull();
    });
  });

  describe('logger', () => {
    it('logs in development mode', async () => {
      // Reset the module to ensure fresh imports
      vi.resetModules();
      
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      // Re-import the module after setting NODE_ENV
      const { logger } = await import('../errorHandler');
      
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      logger.error('Test message', new Error('Test error'));
      
      expect(consoleSpy).toHaveBeenCalledWith('Test message', expect.any(Error));
      consoleSpy.mockRestore();
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('does not log in production mode', () => {
      process.env.NODE_ENV = 'production';
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      logger.error('Test message', new Error('Test error'));
      
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
import * as Sentry from '@sentry/react';
import { ENV, APP_CONFIG } from '../utils/constants';

/**
 * Initialize Sentry monitoring service
 */
export function initializeMonitoring() {
  // Only initialize Sentry in production
  if (ENV.isProduction && import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: ENV.isProduction ? 'production' : 'development',
      
      // Application info
      release: `${APP_CONFIG.NAME}@${APP_CONFIG.VERSION}`,
      
      // Performance monitoring
      tracesSampleRate: ENV.isProduction ? 0.1 : 1.0,
      
      // Session replay
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      
      // Error filtering
      beforeSend(event, hint) {
        // Don't send errors in development
        if (ENV.isDevelopment) {
          return null;
        }
        
        // Filter out known non-critical errors
        const error = hint.originalException;
        if (error && typeof error.message === 'string') {
          // Skip network errors that are user-related
          if (error.message.includes('NetworkError') || 
              error.message.includes('Failed to fetch')) {
            return null;
          }
          
          // Skip extension-related errors
          if (error.message.includes('Extension') || 
              error.message.includes('chrome-extension')) {
            return null;
          }
        }
        
        return event;
      },
      
      // Additional configuration
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
      ],
    });
  }
}

/**
 * Capture an error to Sentry
 */
export function captureError(error, context = {}) {
  if (ENV.isProduction) {
    Sentry.withScope((scope) => {
      // Add context information
      Object.keys(context).forEach(key => {
        scope.setTag(key, context[key]);
      });
      
      // Add user context if available
      const userProfile = localStorage.getItem('rivela_user_profile');
      if (userProfile) {
        try {
          const profile = JSON.parse(userProfile);
          scope.setUser({
            id: profile.id || 'anonymous',
            email: profile.email || 'unknown',
          });
        } catch (e) {
          // Ignore parsing errors
        }
      }
      
      Sentry.captureException(error);
    });
  } else {
    // In development, just log to console
    console.error('Error captured:', error, context);
  }
}

/**
 * Capture a message to Sentry
 */
export function captureMessage(message, level = 'info', context = {}) {
  if (ENV.isProduction) {
    Sentry.withScope((scope) => {
      Object.keys(context).forEach(key => {
        scope.setTag(key, context[key]);
      });
      
      Sentry.captureMessage(message, level);
    });
  } else {
    console.log(`[${level.toUpperCase()}] ${message}`, context);
  }
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(message, category = 'custom', level = 'info', data = {}) {
  if (ENV.isProduction) {
    Sentry.addBreadcrumb({
      message,
      category,
      level,
      data,
      timestamp: Date.now() / 1000,
    });
  }
}

/**
 * Set user context
 */
export function setUserContext(user) {
  if (ENV.isProduction) {
    Sentry.setUser(user);
  }
}

/**
 * Performance monitoring
 */
export function startTransaction(name, operation = 'navigation') {
  if (ENV.isProduction) {
    return Sentry.startSpan({
      name,
      op: operation,
    }, (span) => span);
  }
  
  // Mock transaction for development
  return {
    setTag: () => {},
    setData: () => {},
    finish: () => {},
  };
}

export default {
  initializeMonitoring,
  captureError,
  captureMessage,
  addBreadcrumb,
  setUserContext,
  startTransaction,
};
/**
 * Application Constants
 * Centralized configuration and constants for Rivela Financial Explorer
 */

// Application Information
export const APP_CONFIG = {
  NAME: 'Rivela Financial Explorer',
  VERSION: '0.1.0',
  DESCRIPTION: 'Plateforme d\'analyse financière avec intelligence artificielle',
  AUTHOR: 'Rivela Team'
};

// Environment Configuration
export const ENV = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  enableAI: import.meta.env.VITE_ENABLE_AI_FEATURES !== 'false',
  enableDebug: import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true'
};

// API Endpoints
export const API_ENDPOINTS = {
  FINANCIAL_ANALYSIS: '/financial/analyze',
  USER_PROFILE: '/user/profile',
  SCENARIOS: '/scenarios',
  INSIGHTS: '/insights',
  HEALTH_DASHBOARD: '/dashboard/health'
};

// UI Constants
export const UI_CONSTANTS = {
  SIDEBAR_WIDTH: 280,
  HEADER_HEIGHT: 64,
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
  DESKTOP_BREAKPOINT: 1280
};

// Color Palette
export const COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#6B7280',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#06B6D4'
};

// Animation Durations (in milliseconds)
export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_PROFILE: 'rivela_user_profile',
  DASHBOARD_DATA: 'rivela_dashboard_data',
  QUESTION_HISTORY: 'rivela_question_history',
  FINANCIAL_DATA: 'rivela_financial_data',
  PREFERENCES: 'rivela_user_preferences',
  THEME: 'rivela_theme'
};

// Error Codes
export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  RATE_LIMIT: 'RATE_LIMIT',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  GENERIC_ERROR: 'GENERIC_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR'
};

// Financial Categories
export const FINANCIAL_CATEGORIES = {
  INCOME: 'Revenus',
  EXPENSES: 'Dépenses',
  SAVINGS: 'Épargne',
  INVESTMENTS: 'Investissements',
  DEBTS: 'Dettes',
  GOALS: 'Objectifs'
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Chart Colors
export const CHART_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
  '#8B5CF6', '#06B6D4', '#84CC16', '#F97316',
  '#EC4899', '#6B7280', '#14B8A6', '#F43F5E'
];

// Default Values
export const DEFAULTS = {
  CURRENCY: 'EUR',
  LOCALE: 'fr-FR',
  TIMEZONE: 'Europe/Paris',
  DATE_FORMAT: 'dd/MM/yyyy',
  DECIMAL_PLACES: 2
};

// Feature Flags
export const FEATURES = {
  AI_ANALYSIS: ENV.enableAI,
  DARK_MODE: true,
  EXPORT_FUNCTIONALITY: true,
  REAL_TIME_UPDATES: true,
  ADVANCED_CHARTS: true,
  VOICE_SYNTHESIS: true
};

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_INPUT_LENGTH: 1000,
  MIN_AGE: 18,
  MAX_AGE: 120,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^(\+33|0)[1-9](\d{8})$/
};
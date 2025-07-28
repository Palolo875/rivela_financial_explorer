import { describe, it, expect } from 'vitest';
import {
  APP_CONFIG,
  ENV,
  API_ENDPOINTS,
  UI_CONSTANTS,
  COLORS,
  ANIMATIONS,
  STORAGE_KEYS,
  ERROR_CODES,
  FINANCIAL_CATEGORIES,
  NOTIFICATION_TYPES,
  CHART_COLORS,
  DEFAULTS,
  FEATURES,
  VALIDATION
} from '../constants';

describe('constants', () => {
  describe('APP_CONFIG', () => {
    it('has all required properties', () => {
      expect(APP_CONFIG).toHaveProperty('NAME');
      expect(APP_CONFIG).toHaveProperty('VERSION');
      expect(APP_CONFIG).toHaveProperty('DESCRIPTION');
      expect(APP_CONFIG).toHaveProperty('AUTHOR');
    });

    it('has correct values', () => {
      expect(APP_CONFIG.NAME).toBe('Rivela Financial Explorer');
      expect(APP_CONFIG.VERSION).toBe('0.1.0');
      expect(typeof APP_CONFIG.DESCRIPTION).toBe('string');
      expect(APP_CONFIG.AUTHOR).toBe('Rivela Team');
    });
  });

  describe('ENV', () => {
    it('has environment configuration', () => {
      expect(ENV).toHaveProperty('isDevelopment');
      expect(ENV).toHaveProperty('isProduction');
      expect(ENV).toHaveProperty('apiBaseUrl');
      expect(ENV).toHaveProperty('enableAI');
      expect(ENV).toHaveProperty('enableDebug');
    });

    it('has boolean environment flags', () => {
      expect(typeof ENV.isDevelopment).toBe('boolean');
      expect(typeof ENV.isProduction).toBe('boolean');
      expect(typeof ENV.enableAI).toBe('boolean');
      expect(typeof ENV.enableDebug).toBe('boolean');
    });
  });

  describe('API_ENDPOINTS', () => {
    it('has all required endpoints', () => {
      expect(API_ENDPOINTS).toHaveProperty('FINANCIAL_ANALYSIS');
      expect(API_ENDPOINTS).toHaveProperty('USER_PROFILE');
      expect(API_ENDPOINTS).toHaveProperty('SCENARIOS');
      expect(API_ENDPOINTS).toHaveProperty('INSIGHTS');
      expect(API_ENDPOINTS).toHaveProperty('HEALTH_DASHBOARD');
    });

    it('all endpoints start with /', () => {
      Object.values(API_ENDPOINTS).forEach(endpoint => {
        expect(endpoint).toMatch(/^\/.*$/);
      });
    });
  });

  describe('UI_CONSTANTS', () => {
    it('has numeric values', () => {
      expect(typeof UI_CONSTANTS.SIDEBAR_WIDTH).toBe('number');
      expect(typeof UI_CONSTANTS.HEADER_HEIGHT).toBe('number');
      expect(typeof UI_CONSTANTS.MOBILE_BREAKPOINT).toBe('number');
      expect(typeof UI_CONSTANTS.TABLET_BREAKPOINT).toBe('number');
      expect(typeof UI_CONSTANTS.DESKTOP_BREAKPOINT).toBe('number');
    });

    it('has reasonable breakpoint values', () => {
      expect(UI_CONSTANTS.MOBILE_BREAKPOINT).toBeLessThan(UI_CONSTANTS.TABLET_BREAKPOINT);
      expect(UI_CONSTANTS.TABLET_BREAKPOINT).toBeLessThan(UI_CONSTANTS.DESKTOP_BREAKPOINT);
    });
  });

  describe('COLORS', () => {
    it('has all required colors', () => {
      expect(COLORS).toHaveProperty('PRIMARY');
      expect(COLORS).toHaveProperty('SECONDARY');
      expect(COLORS).toHaveProperty('SUCCESS');
      expect(COLORS).toHaveProperty('WARNING');
      expect(COLORS).toHaveProperty('ERROR');
      expect(COLORS).toHaveProperty('INFO');
    });

    it('all colors are valid hex codes', () => {
      Object.values(COLORS).forEach(color => {
        expect(color).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });
  });

  describe('ANIMATIONS', () => {
    it('has all animation durations', () => {
      expect(ANIMATIONS).toHaveProperty('FAST');
      expect(ANIMATIONS).toHaveProperty('NORMAL');
      expect(ANIMATIONS).toHaveProperty('SLOW');
      expect(ANIMATIONS).toHaveProperty('VERY_SLOW');
    });

    it('has increasing duration values', () => {
      expect(ANIMATIONS.FAST).toBeLessThan(ANIMATIONS.NORMAL);
      expect(ANIMATIONS.NORMAL).toBeLessThan(ANIMATIONS.SLOW);
      expect(ANIMATIONS.SLOW).toBeLessThan(ANIMATIONS.VERY_SLOW);
    });
  });

  describe('STORAGE_KEYS', () => {
    it('all keys start with rivela_', () => {
      Object.values(STORAGE_KEYS).forEach(key => {
        expect(key).toMatch(/^rivela_.+$/);
      });
    });
  });

  describe('CHART_COLORS', () => {
    it('is an array of hex colors', () => {
      expect(Array.isArray(CHART_COLORS)).toBe(true);
      expect(CHART_COLORS.length).toBeGreaterThan(0);
      
      CHART_COLORS.forEach(color => {
        expect(color).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });
  });

  describe('VALIDATION', () => {
    it('has regex patterns', () => {
      expect(VALIDATION.EMAIL_REGEX).toBeInstanceOf(RegExp);
      expect(VALIDATION.PHONE_REGEX).toBeInstanceOf(RegExp);
    });

    it('has numeric limits', () => {
      expect(typeof VALIDATION.MIN_PASSWORD_LENGTH).toBe('number');
      expect(typeof VALIDATION.MAX_INPUT_LENGTH).toBe('number');
      expect(typeof VALIDATION.MIN_AGE).toBe('number');
      expect(typeof VALIDATION.MAX_AGE).toBe('number');
    });

    it('email regex works correctly', () => {
      expect(VALIDATION.EMAIL_REGEX.test('test@example.com')).toBe(true);
      expect(VALIDATION.EMAIL_REGEX.test('invalid-email')).toBe(false);
    });
  });
});
/**
 * LocalStorage utilities with error handling
 */

export function setItem(key: string, value: unknown): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Failed to set item ${key}:`, error);
  }
}

export function getItem<T>(key: string, defaultValue?: T): T | null {
  try {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue ?? null;
    }
    return defaultValue ?? null;
  } catch (error) {
    console.error(`Failed to get item ${key}:`, error);
    return defaultValue ?? null;
  }
}

export function removeItem(key: string): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error(`Failed to remove item ${key}:`, error);
  }
}

export function clear(): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}

// Specific storage keys
export const STORAGE_KEYS = {
  THEME: 'webutils_theme',
  RECENT_TOOLS: 'webutils_recent_tools',
  FAVORITES: 'webutils_favorites',
  PREFERENCES: 'webutils_preferences',
} as const;

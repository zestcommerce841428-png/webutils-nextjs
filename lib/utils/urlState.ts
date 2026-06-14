/**
 * Save state to URL hash
 */
export function saveStateToUrl<T>(state: T): void {
  try {
    const encoded = btoa(JSON.stringify(state));
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${encoded}`);
    }
  } catch (error) {
    console.error('Failed to save state to URL:', error);
  }
}

/**
 * Load state from URL hash
 */
export function loadStateFromUrl<T>(): T | null {
  try {
    if (typeof window === 'undefined') return null;
    
    const hash = window.location.hash.slice(1);
    if (!hash) return null;
    
    const decoded = atob(hash);
    return JSON.parse(decoded) as T;
  } catch (error) {
    console.error('Failed to load state from URL:', error);
    return null;
  }
}

/**
 * Clear URL hash
 */
export function clearUrlState(): void {
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', window.location.pathname);
  }
}

/**
 * Generate shareable URL with state
 */
export function generateShareUrl<T>(state: T): string {
  try {
    const encoded = btoa(JSON.stringify(state));
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.hash = encoded;
      return url.toString();
    }
    return '';
  } catch (error) {
    console.error('Failed to generate share URL:', error);
    return '';
  }
}

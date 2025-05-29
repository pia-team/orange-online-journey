import opportunityHeaders from '../assets/i18n/en.json';

/**
 * Gets a translated value from en.json
 * @param key The key in dot notation (e.g., 'HEADERS.KEY_OPPORTUNITY_INFORMATION')
 * @returns The translated value or the key itself if not found
 */
export function getTranslatedHeader(key: string): string {
  if (!key) return '';
  
  const parts = key.split('.');
  let current: Record<string, unknown> = opportunityHeaders.data;
  
  for (const part of parts) {
    if (current && current[part] !== undefined) {
      current = current[part];
    } else {
      // If we can't find the key, return the original key
      return key;
    }
  }
  
  return typeof current === 'string' ? current : key;
}

/**
 * Higher-order component for rendering header text
 * @param key The key to translate
 * @returns The translated header text
 */
export function Header({ keyName }: { keyName: string }): string {
  return getTranslatedHeader(keyName);
}

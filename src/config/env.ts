

interface EnvironmentConfig {
  apiBaseUrl: string;
  authBaseUrl: string;
  environment: string;
  isProduction: boolean;
  isDevelopment: boolean;
  isTest: boolean;
  isStaging: boolean;
  geographicSiteApiUrl: string;
  quoteApiUrl: string;
  customerApiUrl: string;
  giniApiUrl: string;
  keycloakUrl: string;
}


const getEnvVar = (name: string, defaultValue: string = ''): string => {
  return import.meta.env[name] || defaultValue;
};


const environment = getEnvVar('NODE_ENV', 'development');


export const env: EnvironmentConfig = {
  apiBaseUrl: getEnvVar('VITE_API_BASE_URL', 'http://localhost:3000'),
  authBaseUrl: getEnvVar('VITE_AUTH_BASE_URL', 'http://localhost:8080'),
  environment,
  isProduction: environment === 'production',
  isDevelopment: environment === 'development',
  isTest: environment === 'test',
  isStaging: environment === 'staging',
  geographicSiteApiUrl: getEnvVar('VITE_GEOGRAPHIC_SITE_API', 'https://orange-si-geographic-site.dnextdev-orange.com/api'),
  quoteApiUrl: getEnvVar('VITE_QUOTE_API', 'https://quote-api.dnextdev-orange.com/api'),
  customerApiUrl: getEnvVar('VITE_CUSTOMER_API', 'https://dcm-api.dnextdev-orange.com/api'),
  giniApiUrl: getEnvVar('VITE_GINI_API', 'https://orange-adapter.dnextdev-orange.com/api/orange-adapter/gini/tmf645'),
  keycloakUrl: getEnvVar('VITE_KEYCLOAK_URL', 'https://diam.dnextdev-orange.com'),
};

export default env;

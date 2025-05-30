
import env from './env';


export const quoteEndpoints = {
  BASE: env.quoteApiUrl,
  QUOTES: `${env.quoteApiUrl}/quoteManagement/v4/quote`,
  QUOTE_BY_ID: (id: string) => `${env.quoteApiUrl}/quoteManagement/v4/quote/${id}`,
};


export const geographicSiteEndpoints = {
  BASE: env.geographicSiteApiUrl,
  SITES: `${env.geographicSiteApiUrl}/geographicSiteManagement/v4/geographicSite`,
  SITE_BY_ID: (id: string) => `${env.geographicSiteApiUrl}/geographicSiteManagement/v4/geographicSite/${id}`,
  POP_LOCATIONS: `${env.geographicSiteApiUrl}/geographicSiteManagement/v4/geographicSite`,
};


export const customerEndpoints = {
  BASE: env.customerApiUrl,
  CUSTOMERS: `${env.customerApiUrl}/customerManagement/v4/customer`,
  CUSTOMER_BY_ID: (id: string) => `${env.customerApiUrl}/customerManagement/v4/customer/${id}`,
};


export const giniEndpoints = {
  BASE: env.giniApiUrl,
  CHECK_CUSTOMER_INTERFACE: `${env.giniApiUrl}/check-customer-interface`,
};


export const authEndpoints = {
  BASE: env.authBaseUrl,
  KEYCLOAK: env.keycloakUrl,
};


export const api = {
  quote: quoteEndpoints,
  geographicSite: geographicSiteEndpoints,
  customer: customerEndpoints,
  gini: giniEndpoints,
  auth: authEndpoints,
};

export default api;

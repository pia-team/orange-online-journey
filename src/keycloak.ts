import Keycloak from 'keycloak-js';

const keycloakConfig = {
  realm: 'orbitant-realm',
  clientId: 'orbitant-ui-client',
  url: 'https://diam.dnextdev-orange.com',
  // responseType: 'code', 
  // scope: 'openid',
  // strictDiscoveryDocumentValidation: false, 
  // dummyClientSecret: '782de635-5719-4236-8285-8c2fc495b851'
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;

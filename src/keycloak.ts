import Keycloak from 'keycloak-js';
import { env } from './config/env';

const keycloakConfig = {
  realm: 'orbitant-realm',
  clientId: 'orbitant-ui-client',
  url: env.keycloakUrl,
  // responseType: 'code', 
  // scope: 'openid',
  // strictDiscoveryDocumentValidation: false, 
  // dummyClientSecret: '782de635-5719-4236-8285-8c2fc495b851'
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;

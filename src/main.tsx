import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { Provider } from 'react-redux';
import { store } from './store'; // Assuming store.ts is in src
import keycloak from './keycloak'; // Your Keycloak instance
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './ThemeProvider.tsx';

const keycloakInitOptions = {
  onLoad: 'login-required',
  // silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html', 
  redirectUri: window.location.origin + window.location.pathname,
  scope: 'openid',
  // pkceMethod: 'S256' 
};

const onKeycloakEvent = (event: unknown, error: unknown) => {
  console.log('onKeycloakEvent', event, error);
};

const onKeycloakTokens = (tokens: { token?: string }) => {
  console.log('onKeycloakTokens', tokens);
  // if (tokens.token) {
  //   localStorage.setItem('kc_token', tokens.token);
  // }
};

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={keycloakInitOptions}
      onEvent={onKeycloakEvent}
      onTokens={onKeycloakTokens}
      LoadingComponent={<div style={{display: 'flex', justifyContent: 'center'}}>Authenticating with Keycloak... Please wait.</div>} 
    >
      <ThemeProvider>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </ThemeProvider>
    </ReactKeycloakProvider>
  // </StrictMode>,
);

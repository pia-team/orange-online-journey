# Environment Configuration System

This directory contains the environment configuration system for the Online Journey application, implemented similar to the osiris-ui project.

## Structure

- `env.ts` - Provides type-safe access to environment variables with defaults
- `api.ts` - Centralizes all API endpoints in one place
- `index.ts` - Exports all configuration from a single entry point

## Usage

### Environment Variables

All environment variables are accessed through the `env` object:

```typescript
import { env } from '../config';

console.log(env.apiBaseUrl); // Access a variable
console.log(env.isProduction); // Check environment
```

### API Endpoints

All API endpoints are centralized and accessed through the `api` object:

```typescript
import { api } from '../config';

// Use in API calls
axios.get(api.quote.QUOTES);
axios.get(api.quote.QUOTE_BY_ID(quoteId));
```

## Environment Files

The application uses different environment files for different deployment environments:

- `.env.development` - Local development settings
- `.env.staging` - Staging environment settings
- `.env.production` - Production environment settings 

## Adding New APIs

To add a new API endpoint, update the `api.ts` file with your new endpoints:

```typescript
export const newApiEndpoints = {
  BASE: env.newApiUrl,
  RESOURCE: `${env.newApiUrl}/resource`,
  RESOURCE_BY_ID: (id: string) => `${env.newApiUrl}/resource/${id}`,
};

// Then add to the api object
export const api = {
  // existing endpoints...
  newApi: newApiEndpoints,
};
```

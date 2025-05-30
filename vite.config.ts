import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '');

  console.log(`Running in ${mode} mode with API URL: ${env.VITE_API_BASE_URL}`);

  return {

    define: {

      'process.env': Object.fromEntries(
        Object.entries(env).filter(([key]) => key.startsWith('VITE_'))
      ),
    },
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: true,
              fileName: true,
            },
          ],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  }
})

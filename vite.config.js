import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: {
      clientPort: 443
    }
  },
  // Add this section to allow Replit's dynamic hosts
  preview: {
    host: '0.0.0.0',
    port: 3000
  },
  // Add the allowedHosts configuration
  server: {
    allowedHosts: [
      '.replit.dev',
      'replit.dev',
      '*.replit.dev'
    ]
  }
})
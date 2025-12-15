import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png', 'student.png'], // Ensure your images are cached
      manifest: {
        name: 'Loyola Student Portal',
        short_name: 'Loyola ERP',
        description: 'Modern Student ERP for Loyola Academy',
        theme_color: '#09090b', // Dark background color
        background_color: '#09090b',
        display: 'standalone', // Hides browser address bar
        orientation: 'portrait',
        icons: [
          {
            src: '/logo.png', // We'll use your existing logo for now
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
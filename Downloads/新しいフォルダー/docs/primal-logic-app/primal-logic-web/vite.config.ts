import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  server: {
    host: true,
    port: 5174,
    hmr: {
      overlay: false,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ai-vendor': ['@google/generative-ai'],
          'chart-vendor': ['recharts'],
          'supabase-vendor': ['@supabase/supabase-js'],
        },
      },
    },
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
  },
})

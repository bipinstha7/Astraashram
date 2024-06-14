import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
    setupFiles: ['./setupTests.ts'],
  },
});

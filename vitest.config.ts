import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.tsx'],
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    typecheck: {
      include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.next', 'out'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'src/test/**',
        'src/types/**',
        'src/studio/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/node_modules/**',
        '.next/**',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    env: {
      NEXT_PUBLIC_SANITY_PROJECT_ID: 'test-project',
      NEXT_PUBLIC_SANITY_DATASET: 'test',
      NEXT_PUBLIC_SANITY_API_VERSION: '2024-01-01',
      NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
      SANITY_API_READ_TOKEN: 'test-token',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'modules/*/vitest.config.js',
  {
    test: {
      include: ['modules/*/tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      environment: 'node',
      globals: true
    }
  }
])

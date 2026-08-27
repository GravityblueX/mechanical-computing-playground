import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/mechanical-computing-playground/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
});

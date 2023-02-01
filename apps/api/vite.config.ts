import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globalSetup: ['./testSetup.ts'],
    maxConcurrency: 1,
    maxThreads: 1,
    minThreads: 1,
    threads: false,
  },
});

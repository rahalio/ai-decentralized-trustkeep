import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    '@trustkeep/core',
    '@trustkeep/services',
    '@trustkeep/adapters',
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/lib-dynamodb',
  ],
});

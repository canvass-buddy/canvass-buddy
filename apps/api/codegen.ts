import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '**/*.graphql',
  generates: {
    './resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: './src/Context#Context',
      },
    },
  },
};
export default config;

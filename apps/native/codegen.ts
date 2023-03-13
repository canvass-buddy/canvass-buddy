import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/**/*.tsx', '!src/__generated__/**/*'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
    },
  },
  ignoreNoDocuments: true,
};

export default config;

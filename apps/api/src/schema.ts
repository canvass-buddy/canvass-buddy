import { loadFiles } from 'graphql-import-files';
import { createSchema } from 'graphql-yoga';
import { resolvers } from './models';

export const schema = createSchema({
  typeDefs: loadFiles('**/*.graphql') as any,
  resolvers: resolvers,
});

import { Resolvers } from 'resolvers-types';

export const UserResolvers: Resolvers = {
  Query: {
    hello() {
      return 'girl';
    },
  },
};

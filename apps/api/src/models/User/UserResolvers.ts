import { Resolvers } from 'resolvers-types';

export const UserResolvers: Resolvers = {
  Query: {
    async home() {
      return {
        title: 'Home',
      };
    },
  },
};

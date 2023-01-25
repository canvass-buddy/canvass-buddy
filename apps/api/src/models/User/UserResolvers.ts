import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Resolvers } from 'resolvers-types';
import { APP_SECRET } from '../../constants';

const client = new PrismaClient();

export const UserResolvers: Resolvers = {
  Mutation: {
    async signUp(_, args) {
      const password = await hash(args.password, 10);
      const user = await client.user.create({
        data: {
          name: args.name,
          email: args.email,
          password,
        },
      });
      const token = sign({ userId: user.id }, APP_SECRET);

      return {
        token,
        user,
      };
    },
    async login(_, args) {
      const user = await client.user.findFirst({
        where: {
          email: args.email,
        },
      });

      if (!user) throw new Error('User does not exist');

      const isValid = compare(args.password, user?.password);
      if (!isValid) throw new Error('Invalid Password');

      const token = sign({ userId: user.id }, APP_SECRET);

      return {
        token,
        user,
      };
    },
  },
  Query: {
    async user(_, _args, context) {
      const user = await client.user.findFirst({
        where: {
          id: context.userId,
        },
      });
      if (!user) throw new Error('User Not Found');
      return user;
    },
  },
};

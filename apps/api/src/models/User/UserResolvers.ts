import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Resolvers, User } from '@resolvers-types';
import { uploadFile } from 'src/helpers';
import { APP_SECRET } from '../../constants';

const client = new PrismaClient();

export const UserResolvers: Resolvers = {
  Mutation: {
    async signUp(_, args) {
      const profileImage = args.profileImage as File;

      const password = await hash(args.password, 10);
      const user = await client.user.create({
        data: {
          name: args.name,
          email: args.email,
          password,
          profile: {
            create: {
              image: args.profileImage
                ? await uploadFile(
                    profileImage,
                    process.env.MINIO_PROFILE_BUCKET ?? ''
                  )
                : '',
            },
          },
        },
      });
      const token = jwt.sign({ userId: user.id }, APP_SECRET);

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

      const token = jwt.sign({ userId: user.id }, APP_SECRET);

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
        include: {
          profile: {},
        },
      });
      if (!user) throw new Error('User Not Found');
      return user;
    },
    async users(_, args) {
      const users = await client.user.findMany({
        where: {
          name: {
            contains: args.name ?? '',
            mode: 'insensitive',
          },
        },
        include: {
          profile: {},
        },
      });
      return users as User[];
    },
  },
  User: {
    async profile(parent) {
      const profile = await client.profile.findFirst({
        where: {
          userId: parent.id,
        },
      });
      return profile;
    },
  },
};

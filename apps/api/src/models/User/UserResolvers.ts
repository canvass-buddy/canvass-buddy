import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Profile, Resolvers, User } from '@resolvers-types';
import { uploadFile } from 'src/helpers';
import { APP_SECRET } from '../../constants';

const client = new PrismaClient();

export const UserResolvers: Resolvers = {
  Mutation: {
    async signUp(_, { user }) {
      const profileImage = user.profileImage as File;

      const password = await hash(user.password, 10);
      const newUser = await client.user.create({
        data: {
          email: user.email,
          password,
          profile: {
            create: {
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username,
              image: user.profileImage
                ? await uploadFile(
                    profileImage,
                    process.env.MINIO_PROFILE_BUCKET ?? ''
                  )
                : '',
            },
          },
        },
        include: {
          profile: {},
        },
      });
      const token = jwt.sign({ userId: newUser.id }, APP_SECRET);

      return {
        token,
        user: newUser as User,
      };
    },
    async login(_, args) {
      const user = await client.user.findFirst({
        where: {
          email: args.email,
        },
        include: {
          profile: {},
        },
      });

      if (!user) throw new Error('User does not exist');

      const isValid = compare(args.password, user?.password);
      if (!isValid) throw new Error('Invalid Password');

      const token = jwt.sign({ userId: user.id }, APP_SECRET);

      return {
        token,
        user: user as User,
      };
    },
  },
  Query: {
    async validUsername(_, args) {
      const profile = await client.profile.findFirst({
        where: {
          username: args.username,
        },
      });
      return !profile;
    },
    async validEmail(_, args) {
      const user = await client.user.findFirst({
        where: {
          email: args.email,
        },
      });
      return !user;
    },
    async user(_, _args, context) {
      if (!context.userId) throw new Error('auth required');
      const user = await client.user.findFirst({
        where: {
          id: context.userId,
        },
        include: {
          profile: {},
        },
      });
      if (!user) throw new Error('User Not Found');
      return user as User;
    },
    async users(_, args) {
      const users = await client.user.findMany({
        take: args.size,
        where: {
          profile: {
            OR: [
              {
                firstName: {
                  contains: args.name ?? '',
                  mode: 'insensitive',
                },
              },
              {
                lastName: {
                  contains: args.name ?? '',
                  mode: 'insensitive',
                },
              },
              {
                username: {
                  contains: args.name ?? '',
                  mode: 'insensitive',
                },
              },
            ],
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
        include: {
          user: {},
        },
      });
      return profile as Profile;
    },
  },
};

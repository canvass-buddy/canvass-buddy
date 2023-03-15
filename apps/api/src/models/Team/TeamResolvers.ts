import { Resolvers } from '@resolvers-types';
import { prismaClient } from 'src/clients';
import { uploadFile } from 'src/helpers';

export const TeamResolvers: Resolvers = {
  Mutation: {
    async createTeam(_, args, context) {
      const team = await prismaClient.team.create({
        data: {
          private: args.team.private,
          title: args.team.title,
          description: args.team.description,
          longitude: args.team.longitude,
          latitude: args.team.latitude,
          image: args.team.image
            ? await uploadFile(args.team.image as File, 'team-images')
            : '',
          members: {
            create: {
              userId: context.userId ?? 'abcd',
            },
          },
        },
      });
      return team;
    },
    async updateTeamMembers(_, args) {
      const team = await prismaClient.team.findFirst({
        where: {
          id: args.teamId,
        },
      });

      if (!team) throw new Error('Team does not exist');

      await prismaClient.teamMember.deleteMany({
        where: {
          teamId: args.teamId,
        },
      });

      await prismaClient.teamMember.createMany({
        data: args.memberIds.map((userId) => ({
          userId: userId as string,
          teamId: args.teamId as string,
        })),
      });

      return team;
    },
    async deleteTeam(_, args) {
      await prismaClient.teamMember.deleteMany({
        where: {
          teamId: args.teamId,
        },
      });
      await prismaClient.project.deleteMany({
        where: {
          teamId: args.teamId,
        },
      });
      await prismaClient.team.delete({
        where: {
          id: args.teamId,
        },
      });
      return true;
    },
    async updateTeam(_, args) {
      const team = await prismaClient.team.update({
        where: {
          id: args.team.id,
        },

        data: {
          image: args.team.image
            ? await uploadFile(args.team.image, 'team-images')
            : undefined,
          title: args.team.title,
          description: args.team.description,
          longitude: args.team.longitude,
          latitude: args.team.latitude,
        },
      });

      return team;
    },
  },
  User: {
    async teams(parent) {
      const teamMembers = await prismaClient.teamMember.findMany({
        where: {
          userId: parent.id,
        },
        include: {
          team: {},
        },
      });

      return teamMembers.map((team) => team.team);
    },
    async team(parent, { teamId }) {
      const teamMember = await prismaClient.teamMember.findFirst({
        where: {
          userId: parent.id,
          teamId,
        },
        include: {
          team: {},
        },
      });
      return teamMember?.team ?? null;
    },
  },
  Team: {
    async users(parent) {
      const members = await prismaClient.teamMember.findMany({
        where: {
          teamId: parent.id,
        },
        include: {
          user: true,
        },
      });
      return members.map((member) => member.user);
    },
  },
  Query: {
    async teams(_, args) {
      const teams = await prismaClient.team.findMany({
        take: args.size,
        where: {
          private: false,
          title: {
            contains: args.title ?? '',
            mode: 'insensitive',
          },
        },
      });
      return teams;
    },
    async team(_, args, context) {
      const team = await prismaClient.team.findFirst({
        where: {
          id: args.id,
          members: {
            some: {
              userId: context.userId,
            },
          },
        },
      });
      return team;
    },
  },
};

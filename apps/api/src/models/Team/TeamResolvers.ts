import { Resolvers } from '@resolvers-types';
import { prismaClient } from 'src/clients';
import { uploadFile } from 'src/helpers';

export const TeamResolvers: Resolvers = {
  Mutation: {
    async createTeam(_, args, context) {
      const team = await prismaClient.team.create({
        data: {
          title: args.team.title,
          description: args.team.description,
          longitude: args.team.longitude,
          latitude: args.team.latitude,
          image: args.team.image
            ? await uploadFile(args.team.image as File, 'team-images')
            : '',
        },
      });
      await prismaClient.teamMember.create({
        data: {
          teamId: team.id,
          userId: context.userId ?? '',
        },
      });
      return team;
    },
    async addTeamMembers(_, args) {
      await prismaClient.teamMember.createMany({
        data: args.memberIds.map((userId) => ({
          userId: userId as string,
          teamId: args.teamId as string,
        })),
      });

      return true;
    },
    async deleteTeam(_, args) {
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
};

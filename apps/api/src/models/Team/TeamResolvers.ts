import { Resolvers } from '@resolvers-types';
import { prismaClient } from 'src/clients';
import { uploadFile } from 'src/helpers';

export const TeamResolvers: Resolvers = {
  Mutation: {
    async createTeam(_, args) {
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
      return team.id;
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
};

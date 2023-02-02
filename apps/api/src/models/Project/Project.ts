import { Project, Resolvers } from 'src/../resolvers-types';
import { prismaClient } from 'src/clients';

export const ProjectResolvers: Resolvers = {
  Mutation: {
    async createProject(_, args) {
      const project = await prismaClient.project.create({
        data: {
          teamId: args.teamId,
          title: args.project.title,
          area: {
            create: {
              ...args.project.area,
            },
          },
        },
        include: {
          area: {},
        },
      });
      return project as Project;
    },
    async deleteProject(_, args) {
      await prismaClient.projectArea.delete({
        where: {
          projectId: args.projectId,
        },
      });
      await prismaClient.project.delete({
        where: {
          id: args.projectId,
        },
      });
      return true;
    },
    async updateProject(_, args) {
      const project = await prismaClient.project.update({
        where: {
          id: args.project.id,
        },
        data: {
          title: args.project.title,
          area: {
            update: args.project.area,
          },
        },
        include: {
          area: {},
        },
      });
      return project as Project;
    },
  },
  User: {
    async projects(parent) {
      const memberships = await prismaClient.teamMember.findMany({
        where: {
          userId: parent.id,
        },
        include: {
          team: {
            include: {
              projects: {
                include: {
                  area: {},
                },
              },
            },
          },
        },
      });

      const projects = memberships
        .map((membership) => membership.team.projects)
        .flat();
      return projects as Project[];
    },
  },
  Team: {
    async projects(parent) {
      const projects = await prismaClient.project.findMany({
        where: {
          teamId: parent.id,
        },
        include: {
          area: {},
        },
      });
      return projects as Project[];
    },
  },
};

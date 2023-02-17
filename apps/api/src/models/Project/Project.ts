import { format } from 'path';
import { Project, Resolvers } from 'src/../resolvers-types';
import { prismaClient } from 'src/clients';

export const ProjectResolvers: Resolvers = {
  Mutation: {
    async createProject(_, args, context) {
      const project = await prismaClient.project.create({
        data: {
          teamId: args.teamId,
          title: args.project.title,
          area: {
            create: {
              ...args.project.area,
            },
          },
          members: {
            create: {
              userId: context.userId ?? '',
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
      const memberships = await prismaClient.projectMember.findMany({
        where: {
          userId: parent.id,
        },
        include: {
          project: {
            include: {
              area: {},
            },
          },
        },
      });

      return memberships.map((membership) => membership.project) as Project[];
    },
    async project(parent, { id }) {
      const project = await prismaClient.project.findFirst({
        where: {
          id,
          team: {
            members: {
              some: {
                userId: parent.id,
              },
            },
          },
        },
        include: {
          area: {},
        },
      });
      return project as unknown as Project;
    },
  },
  Project: {
    async users(parent) {
      const members = await prismaClient.projectMember.findMany({
        where: {
          projectId: parent.id,
        },
        include: {
          user: {},
        },
      });

      return members.map((member) => member.user);
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

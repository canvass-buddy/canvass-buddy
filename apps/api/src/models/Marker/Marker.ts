import { Marker, Resolvers } from 'src/../resolvers-types';
import { prismaClient } from 'src/clients';
import { ResourceNotFoundError } from 'src/errors';

export const MarkerResolvers: Resolvers = {
  Mutation: {
    async createMarker(_, { projectId, marker }, context) {
      const project = await prismaClient.project.findFirst({
        where: {
          id: projectId,
        },
      });

      if (!project)
        throw new ResourceNotFoundError(`project ${projectId} does not exist`);

      const dbMarker = await prismaClient.marker.create({
        data: {
          longitude: marker.longitude,
          latitude: marker.latitude,
          userId: context.userId ?? '',
          projectId,
          completedTasks: {
            // createMany: {},
          },
        },
        include: {
          completedTasks: {
            include: {
              task: {},
            },
          },
          user: {},
        },
      });

      const resMarker: Marker = {
        ...dbMarker,
        completedTasks: dbMarker.completedTasks.map((task) => task.task),
      };

      return resMarker;
    },
    async updateMarker(_, { marker }) {
      await prismaClient.completedTask.deleteMany({
        where: {
          markerId: marker.id,
          NOT: {
            id: {
              in: marker.completedTasks,
            },
          },
        },
      });
      const tasks = await prismaClient.completedTask.findMany({
        where: {
          markerId: marker.id,
        },
      });

      const taskIds = tasks.map((task) => task.taskId);
      await prismaClient.completedTask.createMany({
        data: marker.completedTasks
          .filter((task) => !taskIds.includes(task))
          .map((task) => ({
            markerId: marker.id,
            taskId: task,
          })),
      });

      const newMarker = await prismaClient.marker.update({
        where: {
          id: marker.id,
        },
        data: {
          longitude: marker.longitude,
          latitude: marker.latitude,
        },
        include: {
          completedTasks: {
            include: {
              task: {},
            },
          },
          user: {},
        },
      });

      const resMarker: Marker = {
        ...newMarker,
        completedTasks: newMarker.completedTasks.map((task) => task.task),
      };

      return resMarker;
    },
    async deleteMarker(_, { markerId }) {
      await prismaClient.marker.delete({
        where: {
          id: markerId,
        },
      });

      return true;
    },
  },
  Project: {
    async markers(parent, _args) {
      const markers = await prismaClient.marker.findMany({
        where: {
          projectId: parent.id,
        },
        include: {
          completedTasks: {
            include: {
              task: {},
            },
          },
          user: {},
        },
      });
      return markers.map((dbMarker) => {
        const resMarker: Marker = {
          ...dbMarker,
          completedTasks: dbMarker.completedTasks.map((task) => task.task),
        };
        return resMarker;
      });
    },
  },
};

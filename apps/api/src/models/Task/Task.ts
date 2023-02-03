import { Resolvers, Task } from '@resolvers-types';
import { prismaClient } from 'src/clients';
import { ResourceNotFoundError } from 'src/errors';

export const TaskResolves: Resolvers = {
  Mutation: {
    async createTask(_, { projectId, task }) {
      const project = prismaClient.project.findFirst({
        where: {
          id: projectId,
        },
      });

      if (!project)
        throw new ResourceNotFoundError(`Project ${projectId} does not exist`);

      const dbTask = await prismaClient.task.create({
        data: {
          projectId,
          type: task.type,
          title: task.title,
          description: task.description,
        },
      });

      return dbTask as Task;
    },
    async updateTask(_, { task }) {
      if (
        !(await prismaClient.task.findFirst({
          where: {
            id: task.id,
          },
        }))
      ) {
        throw new ResourceNotFoundError(`Task ${task.id} does not exist`);
      }

      const updatedTask = await prismaClient.task.update({
        data: {
          title: task.title,
          description: task.description,
        },
        where: {
          id: task.id,
        },
      });

      return updatedTask as Task;
    },
    async deleteTask(_, { taskId }) {
      await prismaClient.task.delete({
        where: {
          id: taskId,
        },
      });

      return true;
    },
  },
  Project: {
    async tasks(context) {
      const tasks = await prismaClient.task.findMany({
        where: {
          projectId: context.id,
        },
      });

      return tasks as Task[];
    },
  },
};

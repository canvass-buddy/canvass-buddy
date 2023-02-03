import { ProjectResolvers } from './Project';
import { TaskResolves } from './Task';
import { TeamResolvers } from './Team';
import { UserResolvers } from './User';

export const resolvers = [
  UserResolvers,
  TeamResolvers,
  ProjectResolvers,
  TaskResolves,
];

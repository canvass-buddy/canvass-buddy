import { ProjectResolvers } from './Project';
import { TeamResolvers } from './Team';
import { UserResolvers } from './User';

export const resolvers = [UserResolvers, TeamResolvers, ProjectResolvers];

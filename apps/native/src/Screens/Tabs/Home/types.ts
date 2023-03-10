import { ProjectDetailsFragment, Team } from '../../../__generated__/graphql';

export type HomeStackParamList = {
  HomeRoot: undefined;
  Profile: {
    id?: string;
  };
  TeamCreate: undefined;
  Team: {
    id: string;
    team?: Partial<Team>;
  };
  Project: {
    id: string;
    project?: ProjectDetailsFragment;
  };
  ProjectCreate: {
    id: string;
  };
  InviteUser: {
    teamId: string;
  };
  GroundView: {
    id: string;
  };
};

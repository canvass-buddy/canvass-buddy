import { InviteUser } from './InviteUser';

export type HomeStackParamList = {
  HomeRoot: undefined;
  Profile: {
    id?: string;
  };
  TeamCreate: undefined;
  Team: {
    id: string;
  };
  Project: {
    id: string;
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

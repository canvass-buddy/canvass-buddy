import {
  ProjectTitle_ProjectFragment,
  TeamCard_TeamFragment,
} from '../../../Components';
import { FragmentType } from '../../../__generated__';

export type HomeStackParamList = {
  HomeRoot: undefined;
  Profile: {
    id?: string;
  };
  TeamCreate: undefined;
  Team: {
    id: string;
    team?: FragmentType<typeof TeamCard_TeamFragment>;
  };
  Project: {
    id: string;
    project?: FragmentType<typeof ProjectTitle_ProjectFragment>;
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

/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Geo: any;
  ProfileImage: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type CreateMarker = {
  completedTasks: Array<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type CreateProject = {
  area: ProjectAreaInput;
  title: Scalars['String'];
};

export type CreateTask = {
  description: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export type CreateTeam = {
  description: Scalars['String'];
  image?: InputMaybe<Scalars['ProfileImage']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  title: Scalars['String'];
};

export type Marker = {
  __typename?: 'Marker';
  completedTasks: Array<Task>;
  id: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  user: User;
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMarker: Marker;
  createProject: Project;
  createTask: Task;
  createTeam: Team;
  deleteMarker: Scalars['Boolean'];
  deleteProject: Scalars['Boolean'];
  deleteTask: Scalars['Boolean'];
  deleteTeam: Scalars['Boolean'];
  login: AuthPayload;
  signUp: AuthPayload;
  updateMarker: Marker;
  updateProject: Project;
  updateTask: Task;
  updateTeam: Team;
  updateTeamMembers: Team;
};


export type MutationCreateMarkerArgs = {
  marker: CreateMarker;
  projectId: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  project: CreateProject;
  teamId: Scalars['String'];
};


export type MutationCreateTaskArgs = {
  projectId: Scalars['String'];
  task: CreateTask;
};


export type MutationCreateTeamArgs = {
  team: CreateTeam;
};


export type MutationDeleteMarkerArgs = {
  markerId: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['String'];
};


export type MutationDeleteTaskArgs = {
  taskId: Scalars['String'];
};


export type MutationDeleteTeamArgs = {
  teamId: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignUpArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  profileImage?: InputMaybe<Scalars['ProfileImage']>;
};


export type MutationUpdateMarkerArgs = {
  marker: UpdateMarker;
};


export type MutationUpdateProjectArgs = {
  project: UpdateProject;
};


export type MutationUpdateTaskArgs = {
  task: UpdateTask;
};


export type MutationUpdateTeamArgs = {
  team: UpdateTeam;
};


export type MutationUpdateTeamMembersArgs = {
  memberIds: Array<InputMaybe<Scalars['String']>>;
  teamId: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  image?: Maybe<Scalars['String']>;
};

export type Project = {
  __typename?: 'Project';
  area: ProjectArea;
  id: Scalars['String'];
  markers?: Maybe<Array<Maybe<Marker>>>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  title: Scalars['String'];
};

export type ProjectArea = {
  __typename?: 'ProjectArea';
  x1: Scalars['Float'];
  x2: Scalars['Float'];
  y1: Scalars['Float'];
  y2: Scalars['Float'];
};

export type ProjectAreaInput = {
  x1: Scalars['Float'];
  x2: Scalars['Float'];
  y1: Scalars['Float'];
  y2: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  teams: Array<Maybe<Team>>;
  user?: Maybe<User>;
};

export type Task = {
  __typename?: 'Task';
  description: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export type Team = {
  __typename?: 'Team';
  description: Scalars['String'];
  id: Scalars['String'];
  image: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  projects?: Maybe<Array<Project>>;
  title: Scalars['String'];
  users?: Maybe<Array<User>>;
};

export type UpdateMarker = {
  completedTasks: Array<Scalars['String']>;
  id: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type UpdateProject = {
  area: ProjectAreaInput;
  id: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateTask = {
  description: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export type UpdateTeam = {
  description: Scalars['String'];
  id: Scalars['String'];
  image?: InputMaybe<Scalars['ProfileImage']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  projects?: Maybe<Array<Project>>;
  teams?: Maybe<Array<Team>>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthPayload', token: string } };

export type SignUpMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthPayload', token: string } };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"auth"},"name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"auth"},"name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
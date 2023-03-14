import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './src/Context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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
  private: Scalars['Boolean'];
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
  tasks: Array<CreateTask>;
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
  tasks?: Maybe<Array<Task>>;
  title: Scalars['String'];
  users?: Maybe<Array<User>>;
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
  team?: Maybe<Team>;
  teams: Array<Team>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryTeamArgs = {
  id: Scalars['String'];
};


export type QueryTeamsArgs = {
  title?: InputMaybe<Scalars['String']>;
};


export type QueryUsersArgs = {
  name?: InputMaybe<Scalars['String']>;
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
  private: Scalars['Boolean'];
  project?: Maybe<Project>;
  projects?: Maybe<Array<Project>>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  title: Scalars['String'];
  users?: Maybe<Array<User>>;
};


export type TeamProjectArgs = {
  id: Scalars['String'];
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
  private: Scalars['Boolean'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  profile?: Maybe<Profile>;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Project>>;
  team?: Maybe<Team>;
  teams?: Maybe<Array<Maybe<Team>>>;
};


export type UserProjectArgs = {
  id: Scalars['String'];
};


export type UserTeamArgs = {
  teamId: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateMarker: CreateMarker;
  CreateProject: CreateProject;
  CreateTask: CreateTask;
  CreateTeam: CreateTeam;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Marker: ResolverTypeWrapper<Marker>;
  Mutation: ResolverTypeWrapper<{}>;
  Profile: ResolverTypeWrapper<Profile>;
  ProfileImage: ResolverTypeWrapper<Scalars['ProfileImage']>;
  Project: ResolverTypeWrapper<Project>;
  ProjectArea: ResolverTypeWrapper<ProjectArea>;
  ProjectAreaInput: ProjectAreaInput;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Task: ResolverTypeWrapper<Task>;
  Team: ResolverTypeWrapper<Team>;
  UpdateMarker: UpdateMarker;
  UpdateProject: UpdateProject;
  UpdateTask: UpdateTask;
  UpdateTeam: UpdateTeam;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean'];
  CreateMarker: CreateMarker;
  CreateProject: CreateProject;
  CreateTask: CreateTask;
  CreateTeam: CreateTeam;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Marker: Marker;
  Mutation: {};
  Profile: Profile;
  ProfileImage: Scalars['ProfileImage'];
  Project: Project;
  ProjectArea: ProjectArea;
  ProjectAreaInput: ProjectAreaInput;
  Query: {};
  String: Scalars['String'];
  Task: Task;
  Team: Team;
  UpdateMarker: UpdateMarker;
  UpdateProject: UpdateProject;
  UpdateTask: UpdateTask;
  UpdateTeam: UpdateTeam;
  User: User;
};

export type AuthPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarkerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Marker'] = ResolversParentTypes['Marker']> = {
  completedTasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createMarker?: Resolver<ResolversTypes['Marker'], ParentType, ContextType, RequireFields<MutationCreateMarkerArgs, 'marker' | 'projectId'>>;
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'project' | 'tasks' | 'teamId'>>;
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'projectId' | 'task'>>;
  createTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'team'>>;
  deleteMarker?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteMarkerArgs, 'markerId'>>;
  deleteProject?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'projectId'>>;
  deleteTask?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'taskId'>>;
  deleteTeam?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTeamArgs, 'teamId'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  signUp?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'email' | 'name' | 'password'>>;
  updateMarker?: Resolver<ResolversTypes['Marker'], ParentType, ContextType, RequireFields<MutationUpdateMarkerArgs, 'marker'>>;
  updateProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'project'>>;
  updateTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'task'>>;
  updateTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationUpdateTeamArgs, 'team'>>;
  updateTeamMembers?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationUpdateTeamMembersArgs, 'memberIds' | 'teamId'>>;
};

export type ProfileResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = {
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ProfileImageScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ProfileImage'], any> {
  name: 'ProfileImage';
}

export type ProjectResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  area?: Resolver<ResolversTypes['ProjectArea'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  markers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Marker']>>>, ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<ResolversTypes['Task']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectAreaResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProjectArea'] = ResolversParentTypes['ProjectArea']> = {
  x1?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  x2?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  y1?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  y2?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType, RequireFields<QueryTeamArgs, 'id'>>;
  teams?: Resolver<Array<ResolversTypes['Team']>, ParentType, ContextType, Partial<QueryTeamsArgs>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, Partial<QueryUsersArgs>>;
};

export type TaskResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  private?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<TeamProjectArgs, 'id'>>;
  projects?: Resolver<Maybe<Array<ResolversTypes['Project']>>, ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<UserProjectArgs, 'id'>>;
  projects?: Resolver<Maybe<Array<ResolversTypes['Project']>>, ParentType, ContextType>;
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType, RequireFields<UserTeamArgs, 'teamId'>>;
  teams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Marker?: MarkerResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  ProfileImage?: GraphQLScalarType;
  Project?: ProjectResolvers<ContextType>;
  ProjectArea?: ProjectAreaResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


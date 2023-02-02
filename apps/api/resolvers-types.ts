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
  Geo: any;
  ProfileImage: any;
  Task: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type CreateProject = {
  area: ProjectAreaInput;
  title: Scalars['String'];
};

export type CreateTeam = {
  description: Scalars['String'];
  image?: InputMaybe<Scalars['ProfileImage']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  createTeam: Team;
  deleteProject: Scalars['Boolean'];
  deleteTeam: Scalars['Boolean'];
  login: AuthPayload;
  signUp: AuthPayload;
  updateProject: Project;
  updateTeam: Team;
  updateTeamMembers: Team;
};


export type MutationCreateProjectArgs = {
  project: CreateProject;
  teamId: Scalars['String'];
};


export type MutationCreateTeamArgs = {
  team: CreateTeam;
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['String'];
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


export type MutationUpdateProjectArgs = {
  project: UpdateProject;
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

export type UpdateProject = {
  area: ProjectAreaInput;
  id: Scalars['String'];
  title: Scalars['String'];
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
  CreateProject: CreateProject;
  CreateTeam: CreateTeam;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Geo: ResolverTypeWrapper<Scalars['Geo']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Profile: ResolverTypeWrapper<Profile>;
  ProfileImage: ResolverTypeWrapper<Scalars['ProfileImage']>;
  Project: ResolverTypeWrapper<Project>;
  ProjectArea: ResolverTypeWrapper<ProjectArea>;
  ProjectAreaInput: ProjectAreaInput;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Task: ResolverTypeWrapper<Scalars['Task']>;
  Team: ResolverTypeWrapper<Team>;
  UpdateProject: UpdateProject;
  UpdateTeam: UpdateTeam;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean'];
  CreateProject: CreateProject;
  CreateTeam: CreateTeam;
  Float: Scalars['Float'];
  Geo: Scalars['Geo'];
  ID: Scalars['ID'];
  Mutation: {};
  Profile: Profile;
  ProfileImage: Scalars['ProfileImage'];
  Project: Project;
  ProjectArea: ProjectArea;
  ProjectAreaInput: ProjectAreaInput;
  Query: {};
  String: Scalars['String'];
  Task: Scalars['Task'];
  Team: Team;
  UpdateProject: UpdateProject;
  UpdateTeam: UpdateTeam;
  User: User;
};

export type AuthPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GeoScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Geo'], any> {
  name: 'Geo';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'project' | 'teamId'>>;
  createTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'team'>>;
  deleteProject?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'projectId'>>;
  deleteTeam?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTeamArgs, 'teamId'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  signUp?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'email' | 'name' | 'password'>>;
  updateProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'project'>>;
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
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  teams?: Resolver<Array<Maybe<ResolversTypes['Team']>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export interface TaskScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Task'], any> {
  name: 'Task';
}

export type TeamResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<ResolversTypes['Project']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<ResolversTypes['Project']>>, ParentType, ContextType>;
  teams?: Resolver<Maybe<Array<ResolversTypes['Team']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Geo?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  ProfileImage?: GraphQLScalarType;
  Project?: ProjectResolvers<ContextType>;
  ProjectArea?: ProjectAreaResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Task?: GraphQLScalarType;
  Team?: TeamResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


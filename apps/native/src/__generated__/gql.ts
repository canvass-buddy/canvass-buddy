/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query TasksQuery($teamId: String!) {\n    user {\n      team(teamId: $teamId) {\n        tasks {\n          id\n          title\n          description\n          type\n        }\n      }\n    }\n  }\n": types.TasksQueryDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    auth: login(email: $email, password: $password) {\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation SignUp(\n    $email: String!\n    $password: String!\n    $name: String!\n    $profileImage: ProfileImage\n  ) {\n    auth: signUp(\n      password: $password\n      name: $name\n      email: $email\n      profileImage: $profileImage\n    ) {\n      token\n    }\n  }\n": types.SignUpDocument,
    "\n  mutation CreateMarker($marker: CreateMarker!, $projectId: String!) {\n    createMarker(marker: $marker, projectId: $projectId) {\n      id\n    }\n  }\n": types.CreateMarkerDocument,
    "\n  query HomeQuery {\n    user {\n      id\n      name\n      profile {\n        image\n      }\n      teams {\n        id\n        title\n      }\n      projects {\n        id\n        title\n      }\n    }\n  }\n": types.HomeQueryDocument,
    "\n  query UserQuery {\n    user {\n      id\n      name\n      profile {\n        image\n      }\n    }\n  }\n": types.UserQueryDocument,
    "\n  mutation DeleteProject($projectId: String!) {\n    deleteProject(projectId: $projectId)\n  }\n": types.DeleteProjectDocument,
    "\n  mutation CreateProject(\n    $teamId: String!\n    $project: CreateProject!\n    $tasks: [CreateTask!]!\n  ) {\n    createProject(teamId: $teamId, project: $project, tasks: $tasks) {\n      id\n    }\n  }\n": types.CreateProjectDocument,
    "\n  query TeamPage($id: String!) {\n    user {\n      team(teamId: $id) {\n        id\n        title\n        description\n        image\n        users {\n          id\n          name\n          profile {\n            image\n          }\n        }\n        projects {\n          id\n          title\n        }\n      }\n    }\n  }\n": types.TeamPageDocument,
    "\n  mutation DeleteTeam($teamId: String!) {\n    deleteTeam(teamId: $teamId)\n  }\n": types.DeleteTeamDocument,
    "\n  mutation CreateTeam($team: CreateTeam!) {\n    createTeam(team: $team) {\n      id\n    }\n  }\n": types.CreateTeamDocument,
    "\n  query Project($id: String!) {\n    user {\n      project(id: $id) {\n        title\n        tasks {\n          id\n          title\n          description\n          type\n        }\n        markers {\n          id\n          longitude\n          latitude\n        }\n        area {\n          x1\n          y1\n          x2\n          y2\n        }\n        users {\n          id\n          name\n          profile {\n            image\n          }\n        }\n      }\n    }\n  }\n": types.ProjectDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TasksQuery($teamId: String!) {\n    user {\n      team(teamId: $teamId) {\n        tasks {\n          id\n          title\n          description\n          type\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query TasksQuery($teamId: String!) {\n    user {\n      team(teamId: $teamId) {\n        tasks {\n          id\n          title\n          description\n          type\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($email: String!, $password: String!) {\n    auth: login(email: $email, password: $password) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    auth: login(email: $email, password: $password) {\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignUp(\n    $email: String!\n    $password: String!\n    $name: String!\n    $profileImage: ProfileImage\n  ) {\n    auth: signUp(\n      password: $password\n      name: $name\n      email: $email\n      profileImage: $profileImage\n    ) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp(\n    $email: String!\n    $password: String!\n    $name: String!\n    $profileImage: ProfileImage\n  ) {\n    auth: signUp(\n      password: $password\n      name: $name\n      email: $email\n      profileImage: $profileImage\n    ) {\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateMarker($marker: CreateMarker!, $projectId: String!) {\n    createMarker(marker: $marker, projectId: $projectId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateMarker($marker: CreateMarker!, $projectId: String!) {\n    createMarker(marker: $marker, projectId: $projectId) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query HomeQuery {\n    user {\n      id\n      name\n      profile {\n        image\n      }\n      teams {\n        id\n        title\n      }\n      projects {\n        id\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query HomeQuery {\n    user {\n      id\n      name\n      profile {\n        image\n      }\n      teams {\n        id\n        title\n      }\n      projects {\n        id\n        title\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserQuery {\n    user {\n      id\n      name\n      profile {\n        image\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserQuery {\n    user {\n      id\n      name\n      profile {\n        image\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteProject($projectId: String!) {\n    deleteProject(projectId: $projectId)\n  }\n"): (typeof documents)["\n  mutation DeleteProject($projectId: String!) {\n    deleteProject(projectId: $projectId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateProject(\n    $teamId: String!\n    $project: CreateProject!\n    $tasks: [CreateTask!]!\n  ) {\n    createProject(teamId: $teamId, project: $project, tasks: $tasks) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProject(\n    $teamId: String!\n    $project: CreateProject!\n    $tasks: [CreateTask!]!\n  ) {\n    createProject(teamId: $teamId, project: $project, tasks: $tasks) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TeamPage($id: String!) {\n    user {\n      team(teamId: $id) {\n        id\n        title\n        description\n        image\n        users {\n          id\n          name\n          profile {\n            image\n          }\n        }\n        projects {\n          id\n          title\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query TeamPage($id: String!) {\n    user {\n      team(teamId: $id) {\n        id\n        title\n        description\n        image\n        users {\n          id\n          name\n          profile {\n            image\n          }\n        }\n        projects {\n          id\n          title\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteTeam($teamId: String!) {\n    deleteTeam(teamId: $teamId)\n  }\n"): (typeof documents)["\n  mutation DeleteTeam($teamId: String!) {\n    deleteTeam(teamId: $teamId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateTeam($team: CreateTeam!) {\n    createTeam(team: $team) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTeam($team: CreateTeam!) {\n    createTeam(team: $team) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Project($id: String!) {\n    user {\n      project(id: $id) {\n        title\n        tasks {\n          id\n          title\n          description\n          type\n        }\n        markers {\n          id\n          longitude\n          latitude\n        }\n        area {\n          x1\n          y1\n          x2\n          y2\n        }\n        users {\n          id\n          name\n          profile {\n            image\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Project($id: String!) {\n    user {\n      project(id: $id) {\n        title\n        tasks {\n          id\n          title\n          description\n          type\n        }\n        markers {\n          id\n          longitude\n          latitude\n        }\n        area {\n          x1\n          y1\n          x2\n          y2\n        }\n        users {\n          id\n          name\n          profile {\n            image\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
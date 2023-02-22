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
    "\n  mutation Login($email: String!, $password: String!) {\n    auth: login(email: $email, password: $password) {\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation SignUp(\n    $email: String!\n    $password: String!\n    $name: String!\n    $profileImage: ProfileImage\n  ) {\n    auth: signUp(\n      password: $password\n      name: $name\n      email: $email\n      profileImage: $profileImage\n    ) {\n      token\n    }\n  }\n": types.SignUpDocument,
    "\n  query HomeQuery {\n    user {\n      id\n      name\n      profile {\n        image\n      }\n      teams {\n        id\n        title\n      }\n      projects {\n        id\n        title\n      }\n    }\n  }\n": types.HomeQueryDocument,
    "\n  query UserQuery {\n    user {\n      id\n      name\n      profile {\n        image\n      }\n    }\n  }\n": types.UserQueryDocument,
    "\n  query Project($id: String!) {\n    user {\n      project(id: $id) {\n        title\n        area {\n          x1\n          y1\n          x2\n          y2\n        }\n        users {\n          id\n          name\n          profile {\n            image\n          }\n        }\n      }\n    }\n  }\n": types.ProjectDocument,
    "\n  mutation CreateProject($teamId: String!, $project: CreateProject!) {\n    createProject(teamId: $teamId, project: $project) {\n      id\n    }\n  }\n": types.CreateProjectDocument,
    "\n  query TeamPage($id: String!) {\n    user {\n      team(teamId: $id) {\n        id\n        title\n        description\n        image\n        users {\n          id\n          name\n          profile {\n            image\n          }\n        }\n        projects {\n          id\n          title\n        }\n      }\n    }\n  }\n": types.TeamPageDocument,
    "\n  mutation CreateTeam($team: CreateTeam!) {\n    createTeam(team: $team) {\n      id\n    }\n  }\n": types.CreateTeamDocument,
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
export function gql(source: "\n  mutation Login($email: String!, $password: String!) {\n    auth: login(email: $email, password: $password) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    auth: login(email: $email, password: $password) {\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignUp(\n    $email: String!\n    $password: String!\n    $name: String!\n    $profileImage: ProfileImage\n  ) {\n    auth: signUp(\n      password: $password\n      name: $name\n      email: $email\n      profileImage: $profileImage\n    ) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp(\n    $email: String!\n    $password: String!\n    $name: String!\n    $profileImage: ProfileImage\n  ) {\n    auth: signUp(\n      password: $password\n      name: $name\n      email: $email\n      profileImage: $profileImage\n    ) {\n      token\n    }\n  }\n"];
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
export function gql(source: "\n  query Project($id: String!) {\n    user {\n      project(id: $id) {\n        title\n        area {\n          x1\n          y1\n          x2\n          y2\n        }\n        users {\n          id\n          name\n          profile {\n            image\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Project($id: String!) {\n    user {\n      project(id: $id) {\n        title\n        area {\n          x1\n          y1\n          x2\n          y2\n        }\n        users {\n          id\n          name\n          profile {\n            image\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateProject($teamId: String!, $project: CreateProject!) {\n    createProject(teamId: $teamId, project: $project) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProject($teamId: String!, $project: CreateProject!) {\n    createProject(teamId: $teamId, project: $project) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TeamPage($id: String!) {\n    user {\n      team(teamId: $id) {\n        id\n        title\n        description\n        image\n        users {\n          id\n          name\n          profile {\n            image\n          }\n        }\n        projects {\n          id\n          title\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query TeamPage($id: String!) {\n    user {\n      team(teamId: $id) {\n        id\n        title\n        description\n        image\n        users {\n          id\n          name\n          profile {\n            image\n          }\n        }\n        projects {\n          id\n          title\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateTeam($team: CreateTeam!) {\n    createTeam(team: $team) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTeam($team: CreateTeam!) {\n    createTeam(team: $team) {\n      id\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
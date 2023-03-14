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
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment ProjectList_ProjectFragment on Project {\n    id\n    ...ProjectTitle_ProjectFragment\n  }\n": types.ProjectList_ProjectFragmentFragmentDoc,
    "\n  fragment ProjectTitle_ProjectFragment on Project {\n    id\n    title\n  }\n": types.ProjectTitle_ProjectFragmentFragmentDoc,
    "\n  query TasksQuery($teamId: String!) {\n    user {\n      team(teamId: $teamId) {\n        tasks {\n          id\n          title\n          description\n          type\n        }\n      }\n    }\n  }\n": types.TasksQueryDocument,
    "\n  fragment TeamCard_TeamFragment on Team {\n    id\n    private\n    image\n    title\n  }\n": types.TeamCard_TeamFragmentFragmentDoc,
    "\n  fragment UserList_UserFragment on User {\n    id\n    name\n    profile {\n      image\n    }\n  }\n": types.UserList_UserFragmentFragmentDoc,
    "\n  mutation Login($email: String!, $password: String!) {\n    auth: login(email: $email, password: $password) {\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation SignUp(\n    $email: String!\n    $password: String!\n    $name: String!\n    $profileImage: ProfileImage\n  ) {\n    auth: signUp(\n      password: $password\n      name: $name\n      email: $email\n      profileImage: $profileImage\n    ) {\n      token\n    }\n  }\n": types.SignUpDocument,
    "\n  mutation CreateMarker($marker: CreateMarker!, $projectId: String!) {\n    createMarker(marker: $marker, projectId: $projectId) {\n      id\n    }\n  }\n": types.CreateMarkerDocument,
    "\n  query GroundViewQuery($id: String!) {\n    user {\n      project(id: $id) {\n        id\n        title\n        tasks {\n          id\n          title\n          description\n          type\n        }\n        markers {\n          id\n          longitude\n          latitude\n        }\n        area {\n          x1\n          y1\n          x2\n          y2\n        }\n        users {\n          id\n          name\n          profile {\n            image\n          }\n        }\n      }\n    }\n  }\n": types.GroundViewQueryDocument,
    "\n  query HomeQuery {\n    user {\n      id\n      name\n      profile {\n        image\n      }\n      teams {\n        id\n        ...TeamCard_TeamFragment\n      }\n      projects {\n        id\n        ...ProjectTitle_ProjectFragment\n        ...ProjectList_ProjectFragment\n      }\n    }\n  }\n": types.HomeQueryDocument,
    "\n  query InviteUserQuery($id: String!) {\n    team(id: $id) {\n      ...TeamCard_TeamFragment\n    }\n  }\n": types.InviteUserQueryDocument,
    "\n  query UserQuery {\n    user {\n      id\n      name\n      profile {\n        image\n      }\n    }\n  }\n": types.UserQueryDocument,
    "\n  mutation DeleteProject($projectId: String!) {\n    deleteProject(projectId: $projectId)\n  }\n": types.DeleteProjectDocument,
    "\n  query ProjectQuery($id: String!) {\n    user {\n      project(id: $id) {\n        ...ProjectTitle_ProjectFragment\n        users {\n          ...UserList_UserFragment\n        }\n      }\n    }\n  }\n": types.ProjectQueryDocument,
    "\n  mutation CreateProject(\n    $teamId: String!\n    $project: CreateProject!\n    $tasks: [CreateTask!]!\n  ) {\n    createProject(teamId: $teamId, project: $project, tasks: $tasks) {\n      id\n    }\n  }\n": types.CreateProjectDocument,
    "\n  mutation DeleteTeam($teamId: String!) {\n    deleteTeam(teamId: $teamId)\n  }\n": types.DeleteTeamDocument,
    "\n  query TeamQuery($id: String!) {\n    team(id: $id) {\n      ...TeamCard_TeamFragment\n      users {\n        ...UserList_UserFragment\n      }\n      projects {\n        id\n        ...ProjectList_ProjectFragment\n      }\n    }\n  }\n": types.TeamQueryDocument,
    "\n  mutation CreateTeam($team: CreateTeam!) {\n    createTeam(team: $team) {\n      id\n    }\n  }\n": types.CreateTeamDocument,
    "\n  query TeamsSearch($title: String!) {\n    teams(title: $title) {\n      id\n      ...TeamCard_TeamFragment\n    }\n  }\n": types.TeamsSearchDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProjectList_ProjectFragment on Project {\n    id\n    ...ProjectTitle_ProjectFragment\n  }\n"): (typeof documents)["\n  fragment ProjectList_ProjectFragment on Project {\n    id\n    ...ProjectTitle_ProjectFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProjectTitle_ProjectFragment on Project {\n    id\n    title\n  }\n"): (typeof documents)["\n  fragment ProjectTitle_ProjectFragment on Project {\n    id\n    title\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TasksQuery($teamId: String!) {\n    user {\n      team(teamId: $teamId) {\n        tasks {\n          id\n          title\n          description\n          type\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query TasksQuery($teamId: String!) {\n    user {\n      team(teamId: $teamId) {\n        tasks {\n          id\n          title\n          description\n          type\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TeamCard_TeamFragment on Team {\n    id\n    private\n    image\n    title\n  }\n"): (typeof documents)["\n  fragment TeamCard_TeamFragment on Team {\n    id\n    private\n    image\n    title\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserList_UserFragment on User {\n    id\n    name\n    profile {\n      image\n    }\n  }\n"): (typeof documents)["\n  fragment UserList_UserFragment on User {\n    id\n    name\n    profile {\n      image\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($email: String!, $password: String!) {\n    auth: login(email: $email, password: $password) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    auth: login(email: $email, password: $password) {\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignUp(\n    $email: String!\n    $password: String!\n    $name: String!\n    $profileImage: ProfileImage\n  ) {\n    auth: signUp(\n      password: $password\n      name: $name\n      email: $email\n      profileImage: $profileImage\n    ) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp(\n    $email: String!\n    $password: String!\n    $name: String!\n    $profileImage: ProfileImage\n  ) {\n    auth: signUp(\n      password: $password\n      name: $name\n      email: $email\n      profileImage: $profileImage\n    ) {\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateMarker($marker: CreateMarker!, $projectId: String!) {\n    createMarker(marker: $marker, projectId: $projectId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateMarker($marker: CreateMarker!, $projectId: String!) {\n    createMarker(marker: $marker, projectId: $projectId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroundViewQuery($id: String!) {\n    user {\n      project(id: $id) {\n        id\n        title\n        tasks {\n          id\n          title\n          description\n          type\n        }\n        markers {\n          id\n          longitude\n          latitude\n        }\n        area {\n          x1\n          y1\n          x2\n          y2\n        }\n        users {\n          id\n          name\n          profile {\n            image\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GroundViewQuery($id: String!) {\n    user {\n      project(id: $id) {\n        id\n        title\n        tasks {\n          id\n          title\n          description\n          type\n        }\n        markers {\n          id\n          longitude\n          latitude\n        }\n        area {\n          x1\n          y1\n          x2\n          y2\n        }\n        users {\n          id\n          name\n          profile {\n            image\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query HomeQuery {\n    user {\n      id\n      name\n      profile {\n        image\n      }\n      teams {\n        id\n        ...TeamCard_TeamFragment\n      }\n      projects {\n        id\n        ...ProjectTitle_ProjectFragment\n        ...ProjectList_ProjectFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query HomeQuery {\n    user {\n      id\n      name\n      profile {\n        image\n      }\n      teams {\n        id\n        ...TeamCard_TeamFragment\n      }\n      projects {\n        id\n        ...ProjectTitle_ProjectFragment\n        ...ProjectList_ProjectFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query InviteUserQuery($id: String!) {\n    team(id: $id) {\n      ...TeamCard_TeamFragment\n    }\n  }\n"): (typeof documents)["\n  query InviteUserQuery($id: String!) {\n    team(id: $id) {\n      ...TeamCard_TeamFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserQuery {\n    user {\n      id\n      name\n      profile {\n        image\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserQuery {\n    user {\n      id\n      name\n      profile {\n        image\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteProject($projectId: String!) {\n    deleteProject(projectId: $projectId)\n  }\n"): (typeof documents)["\n  mutation DeleteProject($projectId: String!) {\n    deleteProject(projectId: $projectId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProjectQuery($id: String!) {\n    user {\n      project(id: $id) {\n        ...ProjectTitle_ProjectFragment\n        users {\n          ...UserList_UserFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ProjectQuery($id: String!) {\n    user {\n      project(id: $id) {\n        ...ProjectTitle_ProjectFragment\n        users {\n          ...UserList_UserFragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProject(\n    $teamId: String!\n    $project: CreateProject!\n    $tasks: [CreateTask!]!\n  ) {\n    createProject(teamId: $teamId, project: $project, tasks: $tasks) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProject(\n    $teamId: String!\n    $project: CreateProject!\n    $tasks: [CreateTask!]!\n  ) {\n    createProject(teamId: $teamId, project: $project, tasks: $tasks) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteTeam($teamId: String!) {\n    deleteTeam(teamId: $teamId)\n  }\n"): (typeof documents)["\n  mutation DeleteTeam($teamId: String!) {\n    deleteTeam(teamId: $teamId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TeamQuery($id: String!) {\n    team(id: $id) {\n      ...TeamCard_TeamFragment\n      users {\n        ...UserList_UserFragment\n      }\n      projects {\n        id\n        ...ProjectList_ProjectFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query TeamQuery($id: String!) {\n    team(id: $id) {\n      ...TeamCard_TeamFragment\n      users {\n        ...UserList_UserFragment\n      }\n      projects {\n        id\n        ...ProjectList_ProjectFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTeam($team: CreateTeam!) {\n    createTeam(team: $team) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTeam($team: CreateTeam!) {\n    createTeam(team: $team) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TeamsSearch($title: String!) {\n    teams(title: $title) {\n      id\n      ...TeamCard_TeamFragment\n    }\n  }\n"): (typeof documents)["\n  query TeamsSearch($title: String!) {\n    teams(title: $title) {\n      id\n      ...TeamCard_TeamFragment\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
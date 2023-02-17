import { AbortSignal } from 'node-abort-controller';
import { prismaClient } from 'src/clients';
import { authedQuery, query } from 'src/testHelpers';
import { TestUserKey, TEST_USER_LIST } from 'src/testHelpers/user';
import { Project, Task, Team } from './resolvers-types';

globalThis.AbortSignal = AbortSignal as any;

const createEnv = async ({
  email,
  name,
  password,
  user,
}: {
  email?: string;
  name?: string;
  password?: string;
  user: TestUserKey;
}) => {
  await query<{ signUp: { token: string } }>({
    query: /* GraphQL */ `
      mutation SignUp($email: String!, $password: String!, $name: String!) {
        signUp(email: $email, password: $password, name: $name) {
          token
        }
      }
    `,
    variables: {
      email,
      password,
      name,
    },
    user,
  });
  const { team } = await authedQuery<{ team: Team }>({
    query: /* GraphQL */ `
      mutation CreateTeam($team: CreateTeam!) {
        team: createTeam(team: $team) {
          id
        }
      }
    `,
    variables: {
      team: {
        title: `${name}-TEST_TEAM`,
        description: 'A_TEST_TEAM',
        longitude: 0,
        latitude: 0,
      },
    },
    user,
  });
  const { project } = await authedQuery<{ project: Project }>({
    query: /* GraphQL */ `
      mutation CreateProject($teamId: String!, $project: CreateProject!) {
        project: createProject(teamId: $teamId, project: $project) {
          title
          id
        }
      }
    `,
    variables: {
      teamId: team.id,
      project: {
        title: `${name}-TEST_PROJECT`,
        area: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 0,
        },
      },
    },
    user,
  });

  await authedQuery<{ task: Task }>({
    query: /* GraphQL */ `
      mutation CreateTask($projectId: String!, $task: CreateTask!) {
        task: createTask(projectId: $projectId, task: $task) {
          id
          title
          description
        }
      }
    `,
    variables: {
      projectId: project.id,
      task: {
        title: `${name}-TEST_TASK`,
        description: 'A_TEST_TASK',
        type: 'checkbox',
      },
    },
    user,
  });
};

export const setup = async () => {
  await teardown();
  for (const key in TEST_USER_LIST) {
    const user = TEST_USER_LIST[key as TestUserKey];
    await createEnv({
      email: user.email,
      name: user.name,
      password: user.password,
      user: key as TestUserKey,
    });
  }
};

export const teardown = async () => {
  for (const key in TEST_USER_LIST) {
    const userCreds = TEST_USER_LIST[key as TestUserKey];
    const user = await prismaClient.user.findFirst({
      where: {
        email: userCreds.email,
      },
      include: {
        teamMembers: {
          include: {
            team: {},
          },
        },
        profile: {},
      },
    });
    if (!user) continue;
    await prismaClient.team.deleteMany({
      where: {
        id: {
          in: user.teamMembers.map((team) => team.id),
        },
      },
    });
    await prismaClient.profile.deleteMany({
      where: {
        user: {
          email: userCreds.email,
        },
      },
    });
    await prismaClient.user.delete({
      where: {
        email: userCreds.email,
      },
    });

    const projects = await prismaClient.project.findMany({
      where: {
        teamId: {
          in:
            user.teamMembers
              ?.map((team) => team.team)
              .flat()
              .map((team) => team.id) ?? [],
        },
      },
    });

    const projectIds = projects.map((p) => p.id);

    await prismaClient.task.deleteMany({
      where: {
        projectId: {
          in: projectIds,
        },
      },
    });

    await prismaClient.projectArea.deleteMany({
      where: {
        projectId: {
          in: projectIds,
        },
      },
    });

    await prismaClient.project.deleteMany({
      where: {
        id: {
          in: projectIds,
        },
      },
    });
  }
};

export default setup;

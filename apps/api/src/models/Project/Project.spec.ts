import { Project, User } from 'src/../resolvers-types';
import { prismaClient } from 'src/clients';
import { authedQuery, genTestName } from 'src/testHelpers';
import { fetchUserData } from 'src/testHelpers/user';

afterEach(async () => {
  const projects = await prismaClient.project.findMany({
    where: {
      title: {
        contains: 'TEST-',
      },
    },
  });

  const ids = projects.map((project) => project.id);

  await prismaClient.projectArea.deleteMany({
    where: {
      projectId: {
        in: ids,
      },
    },
  });
  await prismaClient.project.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
});

const createProject = async (teamId: string): Promise<Project> => {
  const res = await authedQuery<{ project: Project }>({
    query: /* GraphQL */ `
      mutation CreateProject($teamId: String!, $project: CreateProject!) {
        project: createProject(teamId: $teamId, project: $project) {
          title
          id
        }
      }
    `,
    variables: {
      teamId,
      project: {
        title: genTestName(),
        area: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 0,
        },
      },
    },
  });
  return res.project;
};

test('fetch team projects', async () => {
  const { user } = await authedQuery<{ user: User }>({
    query: /* GraphQL */ `
      query {
        user {
          teams {
            projects {
              id
            }
          }
        }
      }
    `,
  });
  expect(user.teams?.[0].projects).toHaveLength(1);
});

test('fetch user projects', async () => {
  const { user } = await authedQuery<{ user: User }>({
    query: /* GraphQL */ `
      query {
        user {
          projects {
            id
          }
        }
      }
    `,
  });
  expect(user.projects).toHaveLength(1);
});

test('create project', async () => {
  const { teams } = await fetchUserData('USER_1');
  await expect(createProject(teams?.[0].id ?? '')).resolves.toBeTruthy();
  await expect(
    prismaClient.project.findMany({
      where: {
        title: {
          contains: 'TEST-',
        },
      },
    })
  ).resolves.toHaveLength(1);
});

test('delete project', async () => {
  const { teams } = await fetchUserData('USER_1');
  const project = await createProject(teams?.[0].id ?? '');

  await expect(
    authedQuery<{ project: Project }>({
      query: /* GraphQL */ `
        mutation DeleteProject($projectId: String!) {
          project: deleteProject(projectId: $projectId)
        }
      `,
      variables: {
        projectId: project.id,
      },
    })
  ).resolves.not.toThrowError();

  expect(
    prismaClient.project.findMany({
      where: {
        title: {
          contains: 'TEST-',
        },
      },
    })
  ).resolves.toHaveLength(0);
});

test('update project', async () => {
  const { teams } = await fetchUserData('USER_1');
  const project = await createProject(teams?.[0].id ?? '');
  const title = genTestName();
  await authedQuery<{ project: Project }>({
    query: /* GraphQL */ `
      mutation UpdateProject($project: UpdateProject!) {
        project: updateProject(project: $project) {
          id
        }
      }
    `,
    variables: {
      project: {
        ...project,
        title,
        area: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 0,
        },
      },
    },
  });

  await expect(
    prismaClient.project.findFirst({
      where: {
        title,
      },
    })
  ).resolves.toBeTruthy();

  await expect(
    prismaClient.project.findFirst({
      where: {
        title: project.title,
      },
    })
  ).resolves.toBeFalsy();
});

import { Task, User } from 'src/../resolvers-types';
import { prismaClient } from 'src/clients';
import { authedQuery, genTestName } from 'src/testHelpers';
import { fetchUserData } from 'src/testHelpers/user';

const createTask = async (): Promise<Task> => {
  const { projects } = await fetchUserData('USER_1');
  return (
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
        projectId: projects?.[0].id,
        task: {
          title: genTestName(),
          description: 'A_TEST_TASK',
          type: 'checkbox',
        },
      },
    })
  ).task;
};

afterEach(async () => {
  await prismaClient.task.deleteMany({
    where: {
      title: {
        contains: 'TEST-',
      },
    },
  });
});

test('Project Tasks', async () => {
  const { user } = await authedQuery<{ user: User }>({
    query: /* GraphQL */ `
      query {
        user {
          projects {
            tasks {
              id
            }
          }
        }
      }
    `,
  });
  expect(user.projects?.[0].tasks).toHaveLength(1);
});

test('Team Tasks', async () => {
  const { teams } = await fetchUserData('USER_1');
  const { user } = await authedQuery<{ user: User }>({
    variables: {
      teamId: teams?.[0]?.id,
    },
    query: /* GraphQL */ `
      query Tasks($teamId: String!) {
        user {
          team(teamId: $teamId) {
            tasks {
              id
            }
          }
        }
      }
    `,
  });
  expect(user.team?.tasks).toHaveLength(1);
});

test('Create Task', async () => {
  await expect(createTask()).resolves.toBeTruthy();

  await expect(
    prismaClient.task.findMany({
      where: {
        title: {
          contains: 'TEST-',
        },
      },
    })
  ).resolves.toHaveLength(1);
});

test('Update Task', async () => {
  const task = await createTask();
  const title = genTestName();

  await expect(
    authedQuery<{ task: Task }>({
      query: /* GraphQL */ `
        mutation UpdateTask($task: UpdateTask!) {
          task: updateTask(task: $task) {
            id
            title
            description
          }
        }
      `,
      variables: {
        task: {
          id: task.id,
          title,
          description: 'A_TEST_TASK',
          type: 'checkbox',
        },
      },
    })
  ).resolves.toBeTruthy();

  await expect(
    prismaClient.task.findMany({
      where: {
        title: {
          contains: 'TEST-',
        },
      },
    })
  ).resolves.toHaveLength(1);
});

test('Delete Task', async () => {
  const task = await createTask();
  await expect(
    prismaClient.task.findMany({
      where: {
        title: {
          contains: 'TEST-',
        },
      },
    })
  ).resolves.toHaveLength(1);

  await expect(
    authedQuery<{ task: Task }>({
      query: /* GraphQL */ `
        mutation DeleteTask($taskId: String!) {
          deleteTask(taskId: $taskId)
        }
      `,
      variables: {
        taskId: task.id,
      },
    })
  ).resolves.toBeTruthy();
  await expect(
    prismaClient.task.findMany({
      where: {
        title: {
          contains: 'TEST-',
        },
      },
    })
  ).resolves.toHaveLength(0);
});

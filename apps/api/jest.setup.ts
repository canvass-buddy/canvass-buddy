import { prismaClient } from 'src/clients';
import { authedQuery, query } from 'src/testHelpers';
import { TestUserKey, TEST_USER_LIST } from 'src/testHelpers/user';

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
  await authedQuery({
    query: /* GraphQL */ `
      mutation CreateTeam($team: CreateTeam!) {
        createTeam(team: $team) {
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
        teams: {},
        profile: {},
      },
    });
    if (!user) continue;
    await prismaClient.team.deleteMany({
      where: {
        id: {
          in: user.teams.map((team) => team.id),
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
  }
};

export default setup;

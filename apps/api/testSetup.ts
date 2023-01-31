import { prismaClient } from 'src/clients';
import { query } from 'src/testHelpers';

const email = process.env.TEST_USER_1_EMAIL;
const password = process.env.TEST_USER_1_PASSWORD;
const name = process.env.TEST_USER_1_NAME;

const createEnv = async ({ email }: { email: string }) => {
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
  });
};

export const setup = async () => {
  await teardown();
  await createEnv({
    email: 'app+test@test.com',
  });
};

export const teardown = async () => {
  await prismaClient.profile.deleteMany({
    where: {
      user: {
        email,
      },
    },
  });

  await prismaClient.user.deleteMany({
    where: {
      email,
    },
  });
};

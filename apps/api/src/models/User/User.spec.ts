import { User } from 'src/../resolvers-types';
import { prismaClient } from 'src/clients';
import { authedQuery, query } from 'src/testHelpers';
import { TEST_USER_LIST } from 'src/testHelpers/user';

const email = 'abcd1234@booboo.com';

beforeEach(async () => {
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
});

test('Sign Up', async () => {
  const res = await query<{ signUp: { token: string } }>({
    query: /* GraphQL */ `
      mutation SignUp($email: String!, $password: String!, $name: String!) {
        signUp(email: $email, password: $password, name: $name) {
          token
        }
      }
    `,
    variables: {
      email,
      password: 'MY_PASSWORD',
      name: 'Hello',
    },
  });
  expect(res.signUp.token).toBeTruthy();
});

test('Login', async () => {
  const res = await query<{ login: { token: string } }>({
    query: /* GraphQL */ `
      mutation LogIn($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `,
    variables: {
      email: TEST_USER_LIST.USER_1.email,
      password: TEST_USER_LIST.USER_1.password,
    },
  });
  expect(res.login.token).toBeTruthy();
});

test('User', async () => {
  const { user } = await authedQuery<{ user: User }>({
    query: /* GraphQL */ `
      query User {
        user {
          id
          name
          email
        }
      }
    `,
  });

  expect(user.id).toBeTruthy();
  expect(user.name).toBeTruthy();
  expect(user.email).toBeTruthy();
});
